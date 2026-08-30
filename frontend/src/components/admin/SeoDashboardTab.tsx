'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Globe, Save, Search, Share2, Code, FileText, CheckCircle2, 
  AlertCircle, ExternalLink, Link2, Plus, Edit, Trash2, 
  RefreshCw, Check, Eye, Smartphone, Monitor, Shield, Layers, HelpCircle,
  X, Sparkles, Image as ImageIcon
} from 'lucide-react';
import { 
  GlobalSeoSettings, 
  SeoPageConfig, 
  RedirectItem, 
  GalleryItem,
  apiFetchRedirects,
  apiCreateRedirect,
  apiUpdateRedirect,
  apiDeleteRedirect,
  apiUpdateSeo,
  apiUpdateGlobalSeo,
  fetchSitemapRoutes
} from '@/data/faisalHillsData';

interface SeoDashboardTabProps {
  seoSettings: GlobalSeoSettings;
  setSeoSettings: React.Dispatch<React.SetStateAction<GlobalSeoSettings>>;
  selectedSeoPageSlug: string;
  setSelectedSeoPageSlug: (slug: string) => void;
  token: string | null;
  galleryList: GalleryItem[];
  onNotify: (message: string) => void;
}

export default function SeoDashboardTab({
  seoSettings,
  setSeoSettings,
  selectedSeoPageSlug,
  setSelectedSeoPageSlug,
  token,
  galleryList,
  onNotify
}: SeoDashboardTabProps) {
  const [seoSubTab, setSeoSubTab] = useState<'pages' | 'redirects' | 'global' | 'sitemap'>('pages');
  const [serpDevice, setSerpDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [isSaving, setIsSaving] = useState(false);

  // Redirects State
  const [redirects, setRedirects] = useState<RedirectItem[]>([]);
  const [redirectSearch, setRedirectSearch] = useState('');
  const [isAddRedirectOpen, setIsAddRedirectOpen] = useState(false);
  const [isEditRedirectOpen, setIsEditRedirectOpen] = useState(false);
  const [editingRedirect, setEditingRedirect] = useState<RedirectItem | null>(null);
  const [redirectForm, setRedirectForm] = useState({
    source_url: '',
    destination_url: '',
    status_code: 301,
    is_active: true,
    notes: ''
  });

  // Media picker modal for OG image
  const [isOgGalleryPickerOpen, setIsOgGalleryPickerOpen] = useState(false);
  const [schemaJsonValid, setSchemaJsonValid] = useState<boolean | null>(null);

  // Dynamic sitemap routes count
  const [sitemapRoutesCount, setSitemapRoutesCount] = useState<number>(0);

  const selectedPageSeo = seoSettings.pages.find(p => p.pageSlug === selectedSeoPageSlug) || seoSettings.pages[0] || {
    pageSlug: 'home',
    pageTitle: 'Home Page',
    metaTitle: '',
    h1Heading: '',
    metaDescription: '',
    canonicalUrl: '',
    robotsIndex: true,
    robotsFollow: true,
    metaKeywords: '',
    focusKeyword: '',
    secondaryKeywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
    schemaType: 'WebPage',
    customSchemaJson: '',
    author: 'Faisal Hills Team'
  };

  // Load redirects and sitemap count
  useEffect(() => {
    if (token) {
      apiFetchRedirects(token)
        .then(data => setRedirects(data))
        .catch(console.error);
    }
    fetchSitemapRoutes()
      .then(routes => setSitemapRoutesCount(routes.length))
      .catch(console.error);
  }, [token]);

  const handleSeoFieldChange = (field: keyof SeoPageConfig, value: any) => {
    setSeoSettings(prev => ({
      ...prev,
      pages: prev.pages.map(p => {
        if (p.pageSlug === selectedSeoPageSlug) {
          const updated = { ...p, [field]: value };
          if (field === 'metaTitle' && (!p.ogTitle || p.ogTitle === p.metaTitle)) {
            updated.ogTitle = value;
          }
          if (field === 'metaDescription' && (!p.ogDescription || p.ogDescription === p.metaDescription)) {
            updated.ogDescription = value;
          }
          return updated;
        }
        return p;
      })
    }));
  };

  const handleGlobalSeoChange = (field: keyof GlobalSeoSettings, value: any) => {
    setSeoSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSavePageSeo = async () => {
    if (!token) {
      alert('Please log in as admin to save SEO settings.');
      return;
    }
    setIsSaving(true);
    try {
      await apiUpdateSeo(selectedSeoPageSlug, {
        title: selectedPageSeo.metaTitle || selectedPageSeo.pageTitle,
        h1_heading: selectedPageSeo.h1Heading || null,
        meta_description: selectedPageSeo.metaDescription,
        canonical_url: selectedPageSeo.canonicalUrl || null,
        robots_index: selectedPageSeo.robotsIndex !== false,
        robots_follow: selectedPageSeo.robotsFollow !== false,
        keywords: selectedPageSeo.metaKeywords,
        focus_keyword: selectedPageSeo.focusKeyword || null,
        secondary_keywords: selectedPageSeo.secondaryKeywords || null,
        og_title: selectedPageSeo.ogTitle || selectedPageSeo.metaTitle,
        og_description: selectedPageSeo.ogDescription || selectedPageSeo.metaDescription,
        og_image: selectedPageSeo.ogImage || null,
        twitter_title: selectedPageSeo.twitterTitle || selectedPageSeo.ogTitle || selectedPageSeo.metaTitle,
        twitter_description: selectedPageSeo.twitterDescription || selectedPageSeo.ogDescription || selectedPageSeo.metaDescription,
        twitter_image: selectedPageSeo.twitterImage || selectedPageSeo.ogImage || null,
        schema_type: selectedPageSeo.schemaType || 'WebPage',
        custom_schema_json: selectedPageSeo.customSchemaJson || null,
      }, token);

      if (typeof window !== 'undefined') {
        localStorage.setItem('faisal_seo_settings', JSON.stringify(seoSettings));
        window.dispatchEvent(new Event('faisal_seo_updated'));
      }

      onNotify(`SEO Configuration for "${selectedPageSeo.pageTitle}" published successfully!`);
    } catch (err) {
      console.error('Failed to save SEO config:', err);
      alert('Failed to save SEO config. Check server connection.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveGlobalSeo = async () => {
    if (!token) return;
    setIsSaving(true);
    try {
      await apiUpdateGlobalSeo({
        siteName: seoSettings.siteName,
        siteUrl: seoSettings.siteUrl || 'https://faisalhills.com.pk',
        titleSeparator: seoSettings.titleSeparator || '|',
        defaultMetaTitle: seoSettings.defaultMetaTitle,
        defaultMetaDescription: seoSettings.defaultMetaDescription,
        defaultKeywords: seoSettings.defaultMetaKeywords,
        defaultOgImage: seoSettings.defaultOgImage || '/images/imgi_38_Faisal-Hills-site-home-page-header.webp',
        googleSiteVerification: seoSettings.googleSiteVerification,
        bingSiteVerification: seoSettings.bingSiteVerification,
        gtmId: seoSettings.gtmId || '',
        gaMeasurementId: seoSettings.gaMeasurementId || '',
        facebookAppId: seoSettings.facebookAppId,
        twitterHandle: seoSettings.twitterHandle,
        organizationName: seoSettings.organizationName || 'Zedem International (Pvt) Ltd - Faisal Hills',
        organizationPhone: seoSettings.organizationPhone || '+92 304 4811717',
        organizationEmail: seoSettings.organizationEmail || 'info@faisalhills.com.pk',
        organizationAddress: seoSettings.organizationAddress || 'Main GT Road, Taxila / Rawalpindi',
        defaultRobotsIndex: seoSettings.defaultRobotsIndex !== false,
        defaultRobotsFollow: seoSettings.defaultRobotsFollow !== false,
      }, token);

      if (typeof window !== 'undefined') {
        localStorage.setItem('faisal_seo_settings', JSON.stringify(seoSettings));
        window.dispatchEvent(new Event('faisal_seo_updated'));
      }

      onNotify('Global Website SEO & Search Verification settings saved successfully!');
    } catch (err) {
      console.error('Failed to save global SEO:', err);
      alert('Failed to save Global SEO settings.');
    } finally {
      setIsSaving(false);
    }
  };

  // Redirect Handlers
  const handleOpenAddRedirect = () => {
    setRedirectForm({
      source_url: '',
      destination_url: '',
      status_code: 301,
      is_active: true,
      notes: ''
    });
    setIsAddRedirectOpen(true);
  };

  const handleCreateRedirect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !redirectForm.source_url || !redirectForm.destination_url) return;

    try {
      const created = await apiCreateRedirect(redirectForm, token);
      setRedirects(prev => [created, ...prev]);
      setIsAddRedirectOpen(false);
      onNotify(`301 Redirect for ${created.source_url} created successfully!`);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to create redirect.');
    }
  };

  const handleOpenEditRedirect = (red: RedirectItem) => {
    setEditingRedirect(red);
    setRedirectForm({
      source_url: red.source_url,
      destination_url: red.destination_url,
      status_code: red.status_code || 301,
      is_active: red.is_active !== false,
      notes: red.notes || ''
    });
    setIsEditRedirectOpen(true);
  };

  const handleUpdateRedirect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editingRedirect) return;

    try {
      const updated = await apiUpdateRedirect(editingRedirect.id, redirectForm, token);
      setRedirects(prev => prev.map(r => r.id === editingRedirect.id ? updated : r));
      setIsEditRedirectOpen(false);
      setEditingRedirect(null);
      onNotify(`Redirect rule updated successfully!`);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to update redirect.');
    }
  };

  const handleToggleRedirectActive = async (red: RedirectItem) => {
    if (!token) return;
    try {
      const updated = await apiUpdateRedirect(red.id, {
        source_url: red.source_url,
        destination_url: red.destination_url,
        status_code: red.status_code,
        is_active: !red.is_active
      }, token);
      setRedirects(prev => prev.map(r => r.id === red.id ? updated : r));
      onNotify(`Redirect ${red.source_url} is now ${updated.is_active ? 'Active' : 'Disabled'}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteRedirect = async (id: number) => {
    if (!token) return;
    if (!confirm('Are you sure you want to delete this redirect rule?')) return;

    try {
      await apiDeleteRedirect(id, token);
      setRedirects(prev => prev.filter(r => r.id !== id));
      onNotify('Redirect rule removed successfully.');
    } catch (err) {
      console.error(err);
      alert('Failed to delete redirect.');
    }
  };

  // Validate custom schema JSON
  const handleValidateSchema = () => {
    if (!selectedPageSeo.customSchemaJson?.trim()) {
      setSchemaJsonValid(null);
      return;
    }
    try {
      JSON.parse(selectedPageSeo.customSchemaJson);
      setSchemaJsonValid(true);
    } catch (e) {
      setSchemaJsonValid(false);
    }
  };

  const filteredRedirects = redirects.filter(r => 
    r.source_url.toLowerCase().includes(redirectSearch.toLowerCase()) ||
    r.destination_url.toLowerCase().includes(redirectSearch.toLowerCase()) ||
    (r.notes && r.notes.toLowerCase().includes(redirectSearch.toLowerCase()))
  );

  return (
    <div className="space-y-8 font-sans">
      
      {/* Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7b002c] uppercase tracking-wider">
            <Globe className="w-4 h-4 text-[#7b002c]" />
            <span>Search Engine Optimization & Technical SEO Control Hub</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            SEO, Metadata & Technical SEO Management
          </h2>
          <p className="text-slate-600 text-xs max-w-3xl leading-relaxed">
            Manage page-level meta tags, OpenGraph cards, Twitter cards, 301 redirects, Google Search Console verification, and dynamic XML sitemaps without developer assistance.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={seoSubTab === 'global' ? handleSaveGlobalSeo : handleSavePageSeo}
            disabled={isSaving}
            className="px-6 py-3 bg-[#7b002c] hover:bg-[#9e1245] disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition cursor-pointer"
          >
            <Save className="w-4 h-4 text-white" />
            <span>{isSaving ? 'Publishing...' : 'Save & Publish Live'}</span>
          </button>
        </div>
      </div>

      {/* SEO Sub-Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setSeoSubTab('pages')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
            seoSubTab === 'pages'
              ? 'bg-[#7b002c] text-white shadow'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Page-Level SEO & SERP Previews</span>
          <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">
            {seoSettings.pages.length}
          </span>
        </button>

        <button
          onClick={() => setSeoSubTab('redirects')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
            seoSubTab === 'redirects'
              ? 'bg-[#7b002c] text-white shadow'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Link2 className="w-3.5 h-3.5" />
          <span>301 Redirect Manager</span>
          <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">
            {redirects.length}
          </span>
        </button>

        <button
          onClick={() => setSeoSubTab('global')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
            seoSubTab === 'global'
              ? 'bg-[#7b002c] text-white shadow'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          <span>Global SEO, Verification & Analytics</span>
        </button>

        <button
          onClick={() => setSeoSubTab('sitemap')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
            seoSubTab === 'sitemap'
              ? 'bg-[#7b002c] text-white shadow'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>XML Sitemap & Robots Status</span>
          <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">
            {sitemapRoutesCount} URLs
          </span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* SUB-TAB 1: PAGE-LEVEL SEO & SERP PREVIEWS                     */}
      {/* ============================================================ */}
      {seoSubTab === 'pages' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Page Route Selector Card */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                <span>Select Page / URL Route to Configure:</span>
                <span className="text-[11px] font-semibold text-[#7b002c] bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                  {seoSettings.pages.length} Pages Configured
                </span>
              </label>
              <select
                value={selectedSeoPageSlug}
                onChange={(e) => setSelectedSeoPageSlug(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 hover:border-[#7b002c] rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-[#7b002c] cursor-pointer shadow-xs transition-colors"
              >
                <optgroup label="🏠 Main Website Pages">
                  <option value="home">Home Page (/)</option>
                  <option value="about-us">About Us (/about-us)</option>
                  <option value="master-plan">Master Plan Map (/master-plan)</option>
                  <option value="payment-plan">Payment Plans (/faisal-hills-payment-plan)</option>
                  <option value="plots">Plot Inventory & Search (/plots)</option>
                  <option value="blogs">News & Blog Articles (/blogs)</option>
                  <option value="contact">Contact Us (/contact)</option>
                </optgroup>
                <optgroup label="🏙️ Society Blocks & Sectors">
                  <option value="faisal-hills-blocks">All Blocks Overview (/faisal-hills-blocks)</option>
                  <option value="executive-block">Executive Block (/blocks/executive-block)</option>
                  <option value="block-a">Block A (/blocks/block-a)</option>
                  <option value="block-b">Block B (/blocks/block-b)</option>
                  <option value="block-b1-extension">Block B1 Extension (/blocks/block-b1-extension)</option>
                  <option value="block-c">Block C (/blocks/block-c)</option>
                  <option value="block-d">Block D (/blocks/block-d)</option>
                  <option value="prime-block">Prime Block (/blocks/prime-block)</option>
                </optgroup>
                <optgroup label="🏢 High-Rise & Commercial">
                  <option value="faisal-jewel-islamabad">Faisal Jewel Skyscraper (/blocks/faisal-jewel-islamabad)</option>
                  <option value="hills-walk">Hills Walk Commercial (/blocks/hills-walk)</option>
                  <option value="faisal-hills-commercial">Commercial Plots (/faisal-hills-commercial)</option>
                </optgroup>
                <optgroup label="📜 Legal & Compliance">
                  <option value="terms-of-service">Terms of Service (/terms-of-service)</option>
                  <option value="privacy-policy">Privacy Policy (/privacy-policy)</option>
                </optgroup>
                {seoSettings.pages.filter(p => ![
                  'home', 'about-us', 'master-plan', 'payment-plan', 'plots', 'blogs', 'contact',
                  'faisal-hills-blocks', 'executive-block', 'block-a', 'block-b', 'block-b1-extension', 'block-c', 'block-d', 'prime-block',
                  'faisal-jewel-islamabad', 'hills-walk', 'faisal-hills-commercial',
                  'terms-of-service', 'privacy-policy'
                ].includes(p.pageSlug)).length > 0 && (
                  <optgroup label="✨ Custom Pages">
                    {seoSettings.pages.filter(p => ![
                      'home', 'about-us', 'master-plan', 'payment-plan', 'plots', 'blogs', 'contact',
                      'faisal-hills-blocks', 'executive-block', 'block-a', 'block-b', 'block-b1-extension', 'block-c', 'block-d', 'prime-block',
                      'faisal-jewel-islamabad', 'hills-walk', 'faisal-hills-commercial',
                      'terms-of-service', 'privacy-policy'
                    ].includes(p.pageSlug)).map(p => (
                      <option key={p.pageSlug} value={p.pageSlug}>
                        {p.pageTitle} (/{p.pageSlug})
                      </option>
                    ))}
                  </optgroup>
                )}
              </select>
            </div>

            {/* Editable Page SEO Fields */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-serif font-bold text-lg text-[#7b002c] flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#7b002c]" />
                  <span>Configuring: {selectedPageSeo.pageTitle}</span>
                </h3>
                <span className="text-[10px] bg-slate-100 text-slate-700 font-mono px-2.5 py-1 rounded-full border border-slate-200">
                  Slug: {selectedPageSeo.pageSlug}
                </span>
              </div>

              {/* 1. Meta Title */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span>SEO / Meta Title (`&lt;title&gt;`)</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <span className={`font-bold ${
                    (selectedPageSeo.metaTitle || '').length >= 50 && (selectedPageSeo.metaTitle || '').length <= 60
                      ? 'text-emerald-600'
                      : (selectedPageSeo.metaTitle || '').length > 60 ? 'text-red-500' : 'text-amber-600'
                  }`}>
                    {(selectedPageSeo.metaTitle || '').length} / 60 chars (Recommended: 50-60)
                  </span>
                </div>
                <input
                  type="text"
                  value={selectedPageSeo.metaTitle || ''}
                  onChange={(e) => handleSeoFieldChange('metaTitle', e.target.value)}
                  placeholder="e.g. Faisal Hills Executive Block – Plots, Prices & Map"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#7b002c]"
                />
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all ${
                      (selectedPageSeo.metaTitle || '').length >= 50 && (selectedPageSeo.metaTitle || '').length <= 60
                        ? 'bg-emerald-500'
                        : (selectedPageSeo.metaTitle || '').length > 60 ? 'bg-red-500' : 'bg-amber-400'
                    }`}
                    style={{ width: `${Math.min(100, ((selectedPageSeo.metaTitle || '').length / 60) * 100)}%` }}
                  />
                </div>
              </div>

              {/* 2. Independent H1 Heading */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>H1 Heading (Primary On-Page Header)</span>
                  <span className="text-[10px] text-slate-400 font-normal">Editable independently from SEO title</span>
                </label>
                <input
                  type="text"
                  value={selectedPageSeo.h1Heading || ''}
                  onChange={(e) => handleSeoFieldChange('h1Heading', e.target.value)}
                  placeholder={selectedPageSeo.metaTitle || selectedPageSeo.pageTitle}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#7b002c]"
                />
              </div>

              {/* 3. Meta Description */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span>Meta Description (`&lt;meta name="description"&gt;`)</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <span className={`font-bold ${
                    (selectedPageSeo.metaDescription || '').length >= 140 && (selectedPageSeo.metaDescription || '').length <= 160
                      ? 'text-emerald-600'
                      : (selectedPageSeo.metaDescription || '').length > 160 ? 'text-red-500' : 'text-amber-600'
                  }`}>
                    {(selectedPageSeo.metaDescription || '').length} / 160 chars (Recommended: 140-160)
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={selectedPageSeo.metaDescription || ''}
                  onChange={(e) => handleSeoFieldChange('metaDescription', e.target.value)}
                  placeholder="Short, persuasive summary for search engine result snippets and social shares..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#7b002c]"
                />
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all ${
                      (selectedPageSeo.metaDescription || '').length >= 140 && (selectedPageSeo.metaDescription || '').length <= 160
                        ? 'bg-emerald-500'
                        : (selectedPageSeo.metaDescription || '').length > 160 ? 'bg-red-500' : 'bg-amber-400'
                    }`}
                    style={{ width: `${Math.min(100, ((selectedPageSeo.metaDescription || '').length / 160) * 100)}%` }}
                  />
                </div>
              </div>

              {/* 4. Target Keywords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Primary / Focus Keyword</label>
                  <input
                    type="text"
                    value={selectedPageSeo.focusKeyword || ''}
                    onChange={(e) => handleSeoFieldChange('focusKeyword', e.target.value)}
                    placeholder="e.g. Faisal Hills Executive Block"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Secondary Target Keywords</label>
                  <input
                    type="text"
                    value={selectedPageSeo.secondaryKeywords || ''}
                    onChange={(e) => handleSeoFieldChange('secondaryKeywords', e.target.value)}
                    placeholder="e.g. plot prices, 5 marla plot, map"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>
              </div>

              {/* 5. Canonical URL & Robots Directives */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>Canonical URL (`rel="canonical"`)</span>
                    <span className="text-[10px] text-slate-500 font-normal">
                      Default: https://faisalhills.com.pk/{selectedPageSeo.pageSlug === 'home' ? '' : selectedPageSeo.pageSlug}
                    </span>
                  </label>
                  <input
                    type="text"
                    value={selectedPageSeo.canonicalUrl || ''}
                    onChange={(e) => handleSeoFieldChange('canonicalUrl', e.target.value)}
                    placeholder={`https://faisalhills.com.pk/${selectedPageSeo.pageSlug === 'home' ? '' : selectedPageSeo.pageSlug}`}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="block text-xs font-bold text-slate-800">Robots Indexing (`robots: index`)</span>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                        <input
                          type="radio"
                          name="robotsIndex"
                          checked={selectedPageSeo.robotsIndex !== false}
                          onChange={() => handleSeoFieldChange('robotsIndex', true)}
                          className="text-[#7b002c]"
                        />
                        <span>Index (Allow Google)</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-red-600 cursor-pointer">
                        <input
                          type="radio"
                          name="robotsIndex"
                          checked={selectedPageSeo.robotsIndex === false}
                          onChange={() => handleSeoFieldChange('robotsIndex', false)}
                          className="text-red-600"
                        />
                        <span>Noindex (Hide)</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="block text-xs font-bold text-slate-800">Robots Following (`robots: follow`)</span>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                        <input
                          type="radio"
                          name="robotsFollow"
                          checked={selectedPageSeo.robotsFollow !== false}
                          onChange={() => handleSeoFieldChange('robotsFollow', true)}
                          className="text-[#7b002c]"
                        />
                        <span>Follow Links</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-red-600 cursor-pointer">
                        <input
                          type="radio"
                          name="robotsFollow"
                          checked={selectedPageSeo.robotsFollow === false}
                          onChange={() => handleSeoFieldChange('robotsFollow', false)}
                          className="text-red-600"
                        />
                        <span>Nofollow</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. OpenGraph & Twitter Social Cards */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-[#7b002c]" />
                  <span>Social Media & OpenGraph Customization</span>
                </h4>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">OG / Facebook / WhatsApp Title</label>
                  <input
                    type="text"
                    value={selectedPageSeo.ogTitle || ''}
                    onChange={(e) => handleSeoFieldChange('ogTitle', e.target.value)}
                    placeholder={selectedPageSeo.metaTitle || 'Social share title'}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">OG Description</label>
                  <textarea
                    rows={2}
                    value={selectedPageSeo.ogDescription || ''}
                    onChange={(e) => handleSeoFieldChange('ogDescription', e.target.value)}
                    placeholder={selectedPageSeo.metaDescription || 'Social share description'}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>Featured OG Social Image (`og:image`)</span>
                    <button
                      type="button"
                      onClick={() => setIsOgGalleryPickerOpen(true)}
                      className="text-[11px] font-bold text-[#7b002c] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Select from Gallery ({galleryList.length})</span>
                    </button>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={selectedPageSeo.ogImage || ''}
                      onChange={(e) => handleSeoFieldChange('ogImage', e.target.value)}
                      placeholder="/images/imgi_38_Faisal-Hills-site-home-page-header.webp"
                      className="flex-grow px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:border-[#7b002c]"
                    />
                    {selectedPageSeo.ogImage && (
                      <div className="w-12 h-10 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                        <img src={selectedPageSeo.ogImage} alt="OG Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 7. Schema Markup (JSON-LD) */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <Code className="w-4 h-4 text-[#7b002c]" />
                    <span>Structured Data / JSON-LD Schema</span>
                  </h4>
                  <select
                    value={selectedPageSeo.schemaType || 'WebPage'}
                    onChange={(e) => handleSeoFieldChange('schemaType', e.target.value)}
                    className="px-2.5 py-1 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
                  >
                    <option value="WebPage">WebPage Schema</option>
                    <option value="RealEstateListing">RealEstateListing Schema</option>
                    <option value="AboutPage">AboutPage Schema</option>
                    <option value="ContactPage">ContactPage Schema</option>
                    <option value="FAQPage">FAQPage Schema</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-700">Custom JSON-LD Schema (Optional)</label>
                    <button
                      type="button"
                      onClick={handleValidateSchema}
                      className="text-[10px] font-bold text-slate-600 hover:text-slate-900 underline cursor-pointer"
                    >
                      Validate JSON
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={selectedPageSeo.customSchemaJson || ''}
                    onChange={(e) => handleSeoFieldChange('customSchemaJson', e.target.value)}
                    placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "WebPage",\n  "name": "${selectedPageSeo.pageTitle}"\n}`}
                    className="w-full p-3 bg-slate-950 text-emerald-400 font-mono text-[11px] rounded-xl border border-slate-800 focus:outline-none"
                  />
                  {schemaJsonValid === true && (
                    <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Valid JSON-LD Structured Data
                    </p>
                  )}
                  {schemaJsonValid === false && (
                    <p className="text-[11px] text-red-500 font-bold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Syntax Error: Invalid JSON structure
                    </p>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleSavePageSeo}
                disabled={isSaving}
                className="w-full py-3.5 bg-[#7b002c] hover:bg-[#9e1245] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Save className="w-4 h-4 text-white" />
                <span>{isSaving ? 'Publishing...' : 'Save & Publish Page Meta Tags'}</span>
              </button>

            </div>

          </div>

          {/* Right Column: Live Google & Social SERP Previews */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            {/* 1. Google Search Result Snippet Simulation */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#7b002c]" />
                  <h3 className="font-serif font-bold text-sm sm:text-base text-slate-900">
                    Google Search Result Simulation
                  </h3>
                </div>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setSerpDevice('desktop')}
                    className={`p-1.5 rounded text-xs font-semibold cursor-pointer ${
                      serpDevice === 'desktop' ? 'bg-white shadow text-slate-900' : 'text-slate-500'
                    }`}
                    title="Desktop Preview"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSerpDevice('mobile')}
                    className={`p-1.5 rounded text-xs font-semibold cursor-pointer ${
                      serpDevice === 'mobile' ? 'bg-white shadow text-slate-900' : 'text-slate-500'
                    }`}
                    title="Mobile Preview"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* SERP Box */}
              <div className={`p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 ${
                serpDevice === 'mobile' ? 'max-w-[340px] mx-auto shadow-md' : 'w-full shadow-xs'
              }`}>
                {/* URL line */}
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-5 h-5 rounded-full bg-[#7b002c] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    F
                  </div>
                  <div className="min-w-0">
                    <span className="font-medium text-slate-800 text-xs block truncate">Faisal Hills Real Estate</span>
                    <span className="text-[11px] text-slate-500 block truncate">
                      https://faisalhills.com.pk/{selectedPageSeo.pageSlug === 'home' ? '' : selectedPageSeo.pageSlug}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-[#1a0dab] hover:underline font-medium text-base sm:text-lg cursor-pointer leading-snug line-clamp-2">
                  {selectedPageSeo.metaTitle || selectedPageSeo.pageTitle || 'Page Title for Search Results'}
                </h4>

                {/* Snippet */}
                <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-3 font-sans">
                  {selectedPageSeo.metaDescription || 'Add an informative meta description for high click-through rates.'}
                </p>
              </div>

              {/* Guideline note */}
              <div className="text-[11px] text-slate-600 bg-amber-50/80 p-3 rounded-xl border border-amber-200/80 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Titles between <strong>50–60 characters</strong> and descriptions between <strong>140–160 characters</strong> display fully without being cut off on Google.
                </span>
              </div>
            </div>

            {/* 2. Social Media OpenGraph Card Preview */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Share2 className="w-4 h-4 text-[#7b002c]" />
                <h3 className="font-serif font-bold text-sm sm:text-base text-slate-900">
                  Social Sharing Card (Facebook &amp; WhatsApp)
                </h3>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs bg-slate-50">
                <div 
                  className="h-44 bg-cover bg-center bg-slate-800 relative"
                  style={{ backgroundImage: `url('${selectedPageSeo.ogImage || '/images/imgi_38_Faisal-Hills-site-home-page-header.webp'}')` }}
                >
                  <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                    faisalhills.com.pk
                  </span>
                </div>

                <div className="p-4 space-y-1 bg-white">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    FAISALHILLS.COM.PK
                  </span>
                  <h5 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                    {selectedPageSeo.ogTitle || selectedPageSeo.metaTitle || selectedPageSeo.pageTitle}
                  </h5>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {selectedPageSeo.ogDescription || selectedPageSeo.metaDescription || 'Explore official Faisal Hills real estate master plan, plot inventory and prices.'}
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Twitter / X Card Preview */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="text-slate-900 font-bold text-sm">𝕏</span>
                <h3 className="font-serif font-bold text-sm sm:text-base text-slate-900">
                  Twitter / X Large Image Card Preview
                </h3>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
                <div 
                  className="h-36 bg-cover bg-center bg-slate-800"
                  style={{ backgroundImage: `url('${selectedPageSeo.twitterImage || selectedPageSeo.ogImage || '/images/imgi_38_Faisal-Hills-site-home-page-header.webp'}')` }}
                />
                <div className="p-3 bg-slate-50 border-t border-slate-200 space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-medium">faisalhills.com.pk</span>
                  <h5 className="font-bold text-xs text-slate-900 truncate">
                    {selectedPageSeo.twitterTitle || selectedPageSeo.ogTitle || selectedPageSeo.metaTitle}
                  </h5>
                  <p className="text-[11px] text-slate-600 line-clamp-1">
                    {selectedPageSeo.twitterDescription || selectedPageSeo.ogDescription || selectedPageSeo.metaDescription}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* SUB-TAB 2: 301 REDIRECT MANAGER                              */}
      {/* ============================================================ */}
      {seoSubTab === 'redirects' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                <Link2 className="w-5 h-5 text-[#7b002c]" />
                <span>301 &amp; 302 URL Redirect Manager</span>
              </h3>
              <p className="text-slate-600 text-xs max-w-2xl">
                Prevent 404 broken link penalties by forwarding outdated URLs and changed slugs to active pages with permanent 301 redirects.
              </p>
            </div>

            <button
              onClick={handleOpenAddRedirect}
              className="px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl shadow flex items-center gap-2 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Redirect</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={redirectSearch}
              onChange={(e) => setRedirectSearch(e.target.value)}
              placeholder="Search redirects by source URL, target path or notes..."
              className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
            />
          </div>

          {/* Redirects Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Source URL (Old Path)</th>
                    <th className="py-3.5 px-4">Destination URL (Target)</th>
                    <th className="py-3.5 px-4">Type</th>
                    <th className="py-3.5 px-4">Hits</th>
                    <th className="py-3.5 px-4">Notes</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRedirects.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400">
                        No redirect rules found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredRedirects.map((red) => (
                      <tr key={red.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4">
                          <button
                            type="button"
                            onClick={() => handleToggleRedirectActive(red)}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition ${
                              red.is_active
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                            }`}
                          >
                            {red.is_active ? 'Active' : 'Disabled'}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                          {red.source_url}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[#7b002c]">
                          {red.destination_url}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 text-[10px]">
                            HTTP {red.status_code || 301}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">
                          {red.hits || 0}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 text-[11px] max-w-xs truncate">
                          {red.notes || '—'}
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEditRedirect(red)}
                            className="p-1.5 text-slate-600 hover:text-[#7b002c] hover:bg-rose-50 rounded-lg transition cursor-pointer"
                            title="Edit Redirect"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteRedirect(red.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                            title="Delete Redirect"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SUB-TAB 3: GLOBAL SEO, VERIFICATION & ANALYTICS              */}
      {/* ============================================================ */}
      {seoSubTab === 'global' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-6">
            
            {/* Website Identity & Brand Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Globe className="w-5 h-5 text-[#7b002c]" />
                <span>Website Brand &amp; Default SEO Metadata</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Website Brand Name</label>
                  <input
                    type="text"
                    value={seoSettings.siteName}
                    onChange={(e) => handleGlobalSeoChange('siteName', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Canonical Base URL</label>
                  <input
                    type="text"
                    value={seoSettings.siteUrl || 'https://faisalhills.com.pk'}
                    onChange={(e) => handleGlobalSeoChange('siteUrl', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">Default Meta Description</label>
                <textarea
                  rows={3}
                  value={seoSettings.defaultMetaDescription}
                  onChange={(e) => handleGlobalSeoChange('defaultMetaDescription', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">Default Fallback Keywords</label>
                <input
                  type="text"
                  value={seoSettings.defaultMetaKeywords}
                  onChange={(e) => handleGlobalSeoChange('defaultMetaKeywords', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                />
              </div>
            </div>

            {/* Webmaster Verifications Card */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-lg space-y-6">
              <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Code className="w-5 h-5 text-amber-400" />
                <span>Search Engine Verification &amp; Tracking Codes</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-300">Google Search Console Verification Tag</label>
                  <input
                    type="text"
                    value={seoSettings.googleSiteVerification}
                    onChange={(e) => handleGlobalSeoChange('googleSiteVerification', e.target.value)}
                    placeholder="google-site-verification-id"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                  />
                  <p className="text-[10px] text-slate-400">Renders `&lt;meta name="google-site-verification" content="..."&gt;`</p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-300">Bing Webmaster Verification ID</label>
                  <input
                    type="text"
                    value={seoSettings.bingSiteVerification}
                    onChange={(e) => handleGlobalSeoChange('bingSiteVerification', e.target.value)}
                    placeholder="msvalidate.01 ID"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                  />
                  <p className="text-[10px] text-slate-400">Renders `&lt;meta name="msvalidate.01" content="..."&gt;`</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-300">Google Tag Manager Container ID</label>
                  <input
                    type="text"
                    value={seoSettings.gtmId || ''}
                    onChange={(e) => handleGlobalSeoChange('gtmId', e.target.value)}
                    placeholder="GTM-XXXXXXX"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-300">Google Analytics 4 Measurement ID</label>
                  <input
                    type="text"
                    value={seoSettings.gaMeasurementId || ''}
                    onChange={(e) => handleGlobalSeoChange('gaMeasurementId', e.target.value)}
                    placeholder="G-XXXXXXXXXX"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveGlobalSeo}
              disabled={isSaving}
              className="w-full py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Save className="w-4 h-4 text-white" />
              <span>Save Global Settings</span>
            </button>

          </div>

          {/* Right Info Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#7b002c]" />
                <span>Organization Structured Data</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Global organization details are compiled automatically into root JSON-LD schemas to enhance your Google Knowledge Graph badge.
              </p>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2 font-mono">
                <div><strong>Org:</strong> {seoSettings.organizationName || 'Zedem International'}</div>
                <div><strong>Phone:</strong> {seoSettings.organizationPhone || '+92 304 4811717'}</div>
                <div><strong>Coordinates:</strong> 33.7431° N, 72.7844° E</div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* SUB-TAB 4: SITEMAP & ROBOTS STATUS                           */}
      {/* ============================================================ */}
      {seoSubTab === 'sitemap' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#7b002c]" />
              <span>Dynamic XML Sitemap &amp; Robots.txt Inspector</span>
            </h3>
            <p className="text-slate-600 text-xs max-w-2xl mt-1">
              Your sitemap automatically includes all published pages, sector blocks, commercial zones, blog articles, and plots with proper modification timestamps and priorities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-base text-slate-900">XML Sitemap Feed</h4>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                  Live &amp; Auto-Updating
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                URL: <code className="font-mono text-[#7b002c] font-bold">/sitemap.xml</code>
              </p>
              <p className="text-xs text-slate-500">
                Currently indexing <strong>{sitemapRoutesCount}</strong> verified live URLs.
              </p>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl shadow transition"
              >
                <span>Open /sitemap.xml in Browser</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-base text-slate-900">Robots.txt Rules</h4>
                <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-full">
                  Configured
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                URL: <code className="font-mono text-[#7b002c] font-bold">/robots.txt</code>
              </p>
              <p className="text-xs text-slate-500">
                Allows search crawlers while disallowing private admin routes (`/ubaid/admin/*`).
              </p>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow transition"
              >
                <span>Open /robots.txt in Browser</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: ADD 301 REDIRECT                                      */}
      {/* ============================================================ */}
      {isAddRedirectOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#7b002c]" />
                <span>Create New 301/302 Redirect</span>
              </h3>
              <button
                onClick={() => setIsAddRedirectOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRedirect} className="space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <label className="block font-bold text-slate-800">Source URL Path (Old URL) *</label>
                <input
                  type="text"
                  required
                  placeholder="/old-page-name or /plots-for-sale"
                  value={redirectForm.source_url}
                  onChange={(e) => setRedirectForm(prev => ({ ...prev, source_url: e.target.value }))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono focus:outline-none focus:border-[#7b002c]"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-800">Destination URL (Target Path or Full URL) *</label>
                <input
                  type="text"
                  required
                  placeholder="/new-page-name or /plots"
                  value={redirectForm.destination_url}
                  onChange={(e) => setRedirectForm(prev => ({ ...prev, destination_url: e.target.value }))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono focus:outline-none focus:border-[#7b002c]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-800">HTTP Status Code</label>
                  <select
                    value={redirectForm.status_code}
                    onChange={(e) => setRedirectForm(prev => ({ ...prev, status_code: Number(e.target.value) }))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  >
                    <option value={301}>301 (Permanent Redirect)</option>
                    <option value={302}>302 (Temporary Redirect)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-800">Redirect State</label>
                  <select
                    value={redirectForm.is_active ? '1' : '0'}
                    onChange={(e) => setRedirectForm(prev => ({ ...prev, is_active: e.target.value === '1' }))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  >
                    <option value="1">Active</option>
                    <option value="0">Disabled</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-800">Internal Notes / Reason</label>
                <input
                  type="text"
                  placeholder="e.g. Changed URL slug from old promotional campaign"
                  value={redirectForm.notes}
                  onChange={(e) => setRedirectForm(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddRedirectOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold rounded-xl shadow"
                >
                  Create Redirect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: EDIT 301 REDIRECT                                     */}
      {/* ============================================================ */}
      {isEditRedirectOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                <Edit className="w-5 h-5 text-[#7b002c]" />
                <span>Edit Redirect Rule</span>
              </h3>
              <button
                onClick={() => setIsEditRedirectOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateRedirect} className="space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <label className="block font-bold text-slate-800">Source URL Path *</label>
                <input
                  type="text"
                  required
                  value={redirectForm.source_url}
                  onChange={(e) => setRedirectForm(prev => ({ ...prev, source_url: e.target.value }))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono focus:outline-none focus:border-[#7b002c]"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-800">Destination URL *</label>
                <input
                  type="text"
                  required
                  value={redirectForm.destination_url}
                  onChange={(e) => setRedirectForm(prev => ({ ...prev, destination_url: e.target.value }))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono focus:outline-none focus:border-[#7b002c]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-800">HTTP Status Code</label>
                  <select
                    value={redirectForm.status_code}
                    onChange={(e) => setRedirectForm(prev => ({ ...prev, status_code: Number(e.target.value) }))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  >
                    <option value={301}>301 (Permanent)</option>
                    <option value={302}>302 (Temporary)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-800">Redirect State</label>
                  <select
                    value={redirectForm.is_active ? '1' : '0'}
                    onChange={(e) => setRedirectForm(prev => ({ ...prev, is_active: e.target.value === '1' }))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  >
                    <option value="1">Active</option>
                    <option value="0">Disabled</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-800">Internal Notes</label>
                <input
                  type="text"
                  value={redirectForm.notes}
                  onChange={(e) => setRedirectForm(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditRedirectOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold rounded-xl shadow"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: GALLERY PICKER FOR OG IMAGE                           */}
      {/* ============================================================ */}
      {isOgGalleryPickerOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl animate-fadeIn max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#7b002c]" />
                <span>Select Social Share / OG Image from Gallery</span>
              </h3>
              <button
                onClick={() => setIsOgGalleryPickerOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-grow grid grid-cols-2 sm:grid-cols-3 gap-3 p-1">
              {galleryList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    handleSeoFieldChange('ogImage', item.imageUrl);
                    handleSeoFieldChange('twitterImage', item.imageUrl);
                    setIsOgGalleryPickerOpen(false);
                  }}
                  className="group relative rounded-xl overflow-hidden border border-slate-200 hover:border-[#7b002c] cursor-pointer aspect-video bg-slate-100"
                >
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-bold">
                    Select Image
                  </div>
                  <span className="absolute bottom-1 left-1 right-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded truncate">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 text-right">
              <button
                onClick={() => setIsOgGalleryPickerOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
