'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, ShieldCheck, MapPin, Database, CheckCircle2, Edit, Save, 
  Trash2, Plus, Users, DollarSign, Calendar, Eye, Layers, ArrowUpRight, ArrowLeft,
  Lock, KeyRound, LogOut, Shield, Globe, Search, Share2, Code, FileText, Camera, Image as ImageIcon,
  CreditCard, BookOpen, PhoneCall, ExternalLink, Sparkles
} from 'lucide-react';
import RichTextEditor from '@/components/ui/RichTextEditor';
import {
  blocksData,
  plotInventoryData,
  societyStats,
  PlotItem,
  initialSeoConfig,
  GlobalSeoSettings,
  SeoPageConfig,
  initialGalleryData,
  GalleryItem,
  LeadItem,
  initialLeadsData,
  adminLogin,
  adminLogout,
  fetchPlots,
  fetchBlocks,
  fetchGallery,
  fetchSettings,
  fetchSeo,
  apiFetchLeads,
  apiDeleteLead,
  apiUpdatePlot,
  apiCreatePlot,
  apiDeletePlot,
  apiAddGalleryItem,
  apiDeleteGalleryItem,
  apiUpdateBlock,
  apiUpdateSetting,
  apiUpdateSeo,
  apiUpdateGlobalSeo,
  API_URL,
  BlogItem,
  apiFetchAllBlogs,
  apiCreateBlog,
  apiUpdateBlog,
  apiDeleteBlog,
  BlockInfo,
  LegalPolicyData,
  BankAccountItem,
  SocialLinksData,
  ContactInfoData,
  defaultTermsOfService,
  defaultPrivacyPolicy,
  defaultBankAccounts,
  defaultSocialLinks,
  defaultContactInfo,
  fetchSettingByKey
} from '@/data/faisalHillsData';


export default function AdminLoginPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('ubaid');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [token, setToken] = useState<string | null>(null);

  // Dashboard states
  const [activeTab, setActiveTab] = useState<'plots' | 'blocks' | 'legal' | 'accounts' | 'verification' | 'leads' | 'seo' | 'gallery' | 'blogs'>('plots');
  const [plots, setPlots] = useState<PlotItem[]>(plotInventoryData);
  const [plotFilterBlock, setPlotFilterBlock] = useState<string>('all');
  const [plotSearchQuery, setPlotSearchQuery] = useState<string>('');
  const [verifiedDate, setVerifiedDate] = useState(societyStats.lastVerifiedDate);
  const [leadsList, setLeadsList] = useState<LeadItem[]>(initialLeadsData);
  const [saveNotification, setSaveNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('Changes successfully published to live database!');

  // Blocks Manager State
  const [blocksList, setBlocksList] = useState<BlockInfo[]>(blocksData);
  const [selectedBlockSlug, setSelectedBlockSlug] = useState<string>('executive-block');
  const [editingBlock, setEditingBlock] = useState<Partial<BlockInfo>>({ ...blocksData[0] });

  // Legal Policies State
  const [termsOfService, setTermsOfService] = useState<LegalPolicyData>(defaultTermsOfService);
  const [privacyPolicy, setPrivacyPolicy] = useState<LegalPolicyData>(defaultPrivacyPolicy);
  const [legalSubTab, setLegalSubTab] = useState<'terms' | 'privacy'>('terms');

  // Bank Accounts & Social/Contact State
  const [bankAccounts, setBankAccounts] = useState<BankAccountItem[]>(defaultBankAccounts);
  const [socialLinks, setSocialLinks] = useState<SocialLinksData>(defaultSocialLinks);
  const [contactInfo, setContactInfo] = useState<ContactInfoData>(defaultContactInfo);

  // Blogs state
  const [blogsList, setBlogsList] = useState<BlogItem[]>([]);
  const [isAddBlogModalOpen, setIsAddBlogModalOpen] = useState(false);
  const [isEditBlogModalOpen, setIsEditBlogModalOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  // Blog Form states
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogSummary, setBlogSummary] = useState('');
  const [blogImageUrl, setBlogImageUrl] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('Admin');
  const [blogCategory, setBlogCategory] = useState('Market Update');
  const [blogReadTime, setBlogReadTime] = useState('3 min read');
  const [blogPublished, setBlogPublished] = useState(true);
  const [blogMetaTitle, setBlogMetaTitle] = useState('');
  const [blogMetaDescription, setBlogMetaDescription] = useState('');
  const [blogKeywords, setBlogKeywords] = useState('');
  const [blogFaqs, setBlogFaqs] = useState<{ question: string; answer: string }[]>([]);


  // Add Plot Modal state
  const [isAddPlotModalOpen, setIsAddPlotModalOpen] = useState(false);
  const [newPlotNumber, setNewPlotNumber] = useState('');
  const [newPlotBlockSlug, setNewPlotBlockSlug] = useState('executive-block');
  const [newPlotCategory, setNewPlotCategory] = useState<'Residential' | 'Commercial' | 'Apartment'>('Residential');
  const [newPlotSize, setNewPlotSize] = useState('5 Marla');
  const [newPlotDimensions, setNewPlotDimensions] = useState('25 x 50');
  const [newPlotPrice, setNewPlotPrice] = useState<number>(5500000);
  const [newPlotFacing, setNewPlotFacing] = useState<'Park Facing' | 'Corner' | 'Main Boulevard' | 'Standard' | 'Hill View'>('Standard');
  const [newPlotDescription, setNewPlotDescription] = useState('');
  const [newPlotImage, setNewPlotImage] = useState('');
  const [newPlotFeatures, setNewPlotFeatures] = useState('');


  // Photo Gallery State
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(initialGalleryData);
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState<'Infrastructure' | 'Towers' | 'Amenities' | 'Entrance'>('Infrastructure');
  const [newPhotoDescription, setNewPhotoDescription] = useState('');

  // SEO Dashboard State
  const [seoSettings, setSeoSettings] = useState<GlobalSeoSettings>(initialSeoConfig);
  const [selectedSeoPageSlug, setSelectedSeoPageSlug] = useState<string>('home');

  const selectedPageSeo = seoSettings.pages.find(p => p.pageSlug === selectedSeoPageSlug) || seoSettings.pages[0];

  // 1. Initial State Loading & API sync
  React.useEffect(() => {
    // Load local token if exists
    if (typeof window !== 'undefined') {
      const savedToken = sessionStorage.getItem('faisal_admin_token');
      if (savedToken) {
        setToken(savedToken);
        setIsAuthenticated(true);
      }
    }

    // Load initial frontend data from API
    fetchPlots().then(data => setPlots(data)).catch(console.error);
    fetchBlocks().then(data => {
      if (data && data.length > 0) {
        setBlocksList(data);
        const match = data.find(b => b.slug === selectedBlockSlug) || data[0];
        setEditingBlock({ ...match });
      }
    }).catch(console.error);
    fetchGallery().then(data => setGalleryList(data)).catch(console.error);
    fetchSettings().then(data => {
      if (data.last_verified_date) setVerifiedDate(data.last_verified_date);
    }).catch(console.error);
    fetchSettingByKey<LegalPolicyData>('terms_of_service').then(data => {
      if (data && data.sections) setTermsOfService(data);
    }).catch(console.error);
    fetchSettingByKey<LegalPolicyData>('privacy_policy').then(data => {
      if (data && data.sections) setPrivacyPolicy(data);
    }).catch(console.error);
    fetchSettingByKey<BankAccountItem[]>('bank_accounts').then(data => {
      if (data && data.length > 0) setBankAccounts(data);
    }).catch(console.error);
    fetchSettingByKey<SocialLinksData>('social_links').then(data => {
      if (data) setSocialLinks(data);
    }).catch(console.error);
    fetchSettingByKey<ContactInfoData>('contact_info').then(data => {
      if (data) setContactInfo(data);
    }).catch(console.error);
    
    // Fetch all pages SEO
    fetch(`${API_URL}/seo`)
      .then(res => res.json())
      .then(seoData => {
        if (seoData && seoData.pages) {
          setSeoSettings({
            ...initialSeoConfig,
            siteName: seoData.siteName,
            defaultMetaDescription: seoData.defaultMetaDescription,
            defaultMetaKeywords: seoData.defaultKeywords || '',
            pages: seoData.pages.map((p: any) => ({
              pageSlug: p.page_slug,
              pageTitle: p.title,
              metaTitle: p.title,
              metaDescription: p.meta_description,
              metaKeywords: p.keywords || '',
              ogTitle: p.og_title || '',
              ogDescription: p.og_description || ''
            }))
          });
        }
      }).catch(console.error);
  }, []);

  // 2. Fetch Leads & Blogs when authenticated
  React.useEffect(() => {
    if (isAuthenticated && token) {
      apiFetchLeads(token)
        .then(data => setLeadsList(data))
        .catch(console.error);

      apiFetchAllBlogs(token)
        .then(data => setBlogsList(data))
        .catch(console.error);
    }
  }, [isAuthenticated, token]);


  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoTitle || !newPhotoUrl || !token) return;

    apiAddGalleryItem({
      title: newPhotoTitle,
      category: newPhotoCategory,
      imageUrl: newPhotoUrl,
      description: newPhotoDescription
    }, token)
      .then(newItem => {
        setGalleryList(prev => [newItem, ...prev]);
        setNewPhotoTitle('');
        setNewPhotoUrl('');
        setNewPhotoDescription('');
        setSaveNotification(true);
        setTimeout(() => setSaveNotification(false), 3000);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('faisal_gallery_updated'));
        }
      })
      .catch(err => {
        console.error("Failed to add photo:", err);
      });
  };

  const handleCreatePlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlotNumber || !newPlotPrice || !token) return;

    const block = blocksData.find(b => b.slug === newPlotBlockSlug) || blocksData[0];

    const plotData: Partial<PlotItem> = {
      plotNumber: newPlotNumber,
      blockSlug: newPlotBlockSlug,
      blockName: block.name,
      category: newPlotCategory,
      size: newPlotSize,
      dimensions: newPlotDimensions,
      price: Number(newPlotPrice),
      facing: newPlotFacing,
      description: newPlotDescription,
      image: newPlotImage || undefined,
      features: newPlotFeatures ? newPlotFeatures.split(',').map(f => f.trim()).filter(Boolean) : [],
      mapCoords: { x: 50, y: 50 } // default map coords
    };

    apiCreatePlot(plotData, token)
      .then(newPlot => {
        setPlots(prev => [newPlot, ...prev]);
        setIsAddPlotModalOpen(false);
        // Reset form
        setNewPlotNumber('');
        setNewPlotPrice(5500000);
        setNewPlotDescription('');
        setNewPlotImage('');
        setNewPlotFeatures('');
        setSaveNotification(true);
        setTimeout(() => setSaveNotification(false), 3000);
      })
      .catch(err => {
        console.error("Failed to add listing:", err);
        alert("Failed to add listing. Please check required fields or permissions.");
      });
  };

  const handleDeletePhoto = (id: string) => {
    if (!token) return;
    apiDeleteGalleryItem(id, token)
      .then(() => {
        setGalleryList(prev => prev.filter(item => item.id !== id));
        setSaveNotification(true);
        setTimeout(() => setSaveNotification(false), 3000);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('faisal_gallery_updated'));
        }
      })
      .catch(err => {
        console.error("Failed to delete photo:", err);
      });
  };

  const handleSeoFieldChange = (field: keyof SeoPageConfig, value: string) => {
    setSeoSettings(prev => ({
      ...prev,
      pages: prev.pages.map(p => p.pageSlug === selectedSeoPageSlug ? { ...p, [field]: value } : p)
    }));
  };

  const handleGlobalSeoChange = (field: keyof GlobalSeoSettings, value: string) => {
    setSeoSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    adminLogin(username, password)
      .then(res => {
        setToken(res.token);
        setIsAuthenticated(true);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('faisal_admin_token', res.token);
        }
        setErrorMsg('');
      })
      .catch(err => {
        setErrorMsg(err.message || 'The provided credentials are incorrect.');
      });
  };

  const handleQuickDemoLogin = () => {
    adminLogin('ubaid', 'admin123')
      .then(res => {
        setToken(res.token);
        setIsAuthenticated(true);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('faisal_admin_token', res.token);
        }
        setErrorMsg('');
      })
      .catch(err => {
        setErrorMsg('Failed to login. Please ensure Laravel backend is running.');
      });
  };

  // Quick edit state for plot status
  const handleStatusChange = (plotId: string, newStatus: 'Available' | 'Reserved' | 'Sold') => {
    setPlots(prev => prev.map(p => p.id === plotId ? { ...p, status: newStatus } : p));
  };

  const handlePriceChange = (plotId: string, newPrice: number) => {
    setPlots(prev => prev.map(p => p.id === plotId ? {
      ...p,
      price: newPrice,
      priceFormatted: `PKR ${(newPrice / 100000).toFixed(1)} Lacs`
    } : p));
  };

  const handleDeletePlot = async (id: string) => {
    if (!confirm('Are you sure you want to remove this plot listing?')) return;
    try {
      if (token) {
        await apiDeletePlot(id, token);
      }
      setPlots(prev => prev.filter(p => p.id !== id));
      setNotificationMsg('Plot listing removed successfully.');
      setSaveNotification(true);
      setTimeout(() => setSaveNotification(false), 3000);
    } catch (e) {
      console.error(e);
      alert('Failed to delete plot.');
    }
  };

  const handleSelectBlockToEdit = (slug: string) => {
    setSelectedBlockSlug(slug);
    const found = blocksList.find(b => b.slug === slug) || blocksData.find(b => b.slug === slug);
    if (found) {
      setEditingBlock({ ...found });
    }
  };

  const handleSaveBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editingBlock || !editingBlock.id) return;
    try {
      const updated = await apiUpdateBlock(editingBlock.id, editingBlock, token);
      setBlocksList(prev => prev.map(b => b.id === updated.id ? updated : b));
      setEditingBlock(updated);
      setNotificationMsg(`Block "${updated.name}" updated successfully in database!`);
      setSaveNotification(true);
      setTimeout(() => setSaveNotification(false), 3500);
    } catch (e) {
      console.error(e);
      alert('Failed to update block in database.');
    }
  };

  const handleSaveLegalPolicies = async () => {
    if (!token) return;
    try {
      if (legalSubTab === 'terms') {
        await apiUpdateSetting('terms_of_service', termsOfService, token);
        setNotificationMsg('Terms of Service policy updated and published live in database!');
      } else {
        await apiUpdateSetting('privacy_policy', privacyPolicy, token);
        setNotificationMsg('Privacy Policy updated and published live in database!');
      }
      setSaveNotification(true);
      setTimeout(() => setSaveNotification(false), 3500);
    } catch (e) {
      console.error(e);
      alert('Failed to save legal policy to database.');
    }
  };

  const handleAddPolicySection = () => {
    if (legalSubTab === 'terms') {
      setTermsOfService(prev => ({
        ...prev,
        sections: [
          ...prev.sections,
          { title: `${prev.sections.length + 1}. New Policy Clause`, content: 'Enter policy terms details here...' }
        ]
      }));
    } else {
      setPrivacyPolicy(prev => ({
        ...prev,
        sections: [
          ...prev.sections,
          { title: `${prev.sections.length + 1}. Privacy Clause`, content: 'Enter privacy statement details here...' }
        ]
      }));
    }
  };

  const handleRemovePolicySection = (index: number) => {
    if (legalSubTab === 'terms') {
      setTermsOfService(prev => ({
        ...prev,
        sections: prev.sections.filter((_, i) => i !== index)
      }));
    } else {
      setPrivacyPolicy(prev => ({
        ...prev,
        sections: prev.sections.filter((_, i) => i !== index)
      }));
    }
  };

  const handlePolicySectionChange = (index: number, field: 'title' | 'content', val: string) => {
    if (legalSubTab === 'terms') {
      setTermsOfService(prev => ({
        ...prev,
        sections: prev.sections.map((sec, i) => i === index ? { ...sec, [field]: val } : sec)
      }));
    } else {
      setPrivacyPolicy(prev => ({
        ...prev,
        sections: prev.sections.map((sec, i) => i === index ? { ...sec, [field]: val } : sec)
      }));
    }
  };

  const handleSaveBankAndContact = async () => {
    if (!token) return;
    try {
      await apiUpdateSetting('bank_accounts', bankAccounts, token);
      await apiUpdateSetting('social_links', socialLinks, token);
      await apiUpdateSetting('contact_info', contactInfo, token);
      setNotificationMsg('Bank accounts, official numbers, and social links saved to database!');
      setSaveNotification(true);
      setTimeout(() => setSaveNotification(false), 3500);
    } catch (e) {
      console.error(e);
      alert('Failed to save bank and contact settings.');
    }
  };

  const handleAddBankAccount = () => {
    setBankAccounts(prev => [
      ...prev,
      {
        id: `bank-${Date.now()}`,
        bankName: 'New Bank Limited',
        accountTitle: 'Zedem International (Pvt) Ltd',
        accountNumber: '00000000000000',
        iban: 'PK00XXXX0000000000000000',
        branchCode: '0000',
        branchName: 'Main Branch Islamabad',
        instructions: 'Please mention your Registration / Plot File Number on the deposit slip.'
      }
    ]);
  };

  const handleRemoveBankAccount = (id: string) => {
    setBankAccounts(prev => prev.filter(b => b.id !== id));
  };

  const handleBankAccountChange = (id: string, field: keyof BankAccountItem, val: string) => {
    setBankAccounts(prev => prev.map(b => b.id === id ? { ...b, [field]: val } : b));
  };

  const triggerSave = () => {
    if (!token) return;
    
    // Save last verified date
    const datePromise = apiUpdateSetting('last_verified_date', verifiedDate, token);

    // Save modified plots
    const plotPromises = plots.map(plot => apiUpdatePlot(plot.id, { status: plot.status, price: plot.price }, token));

    // Save page SEO config
    const seoPromises = seoSettings.pages.map(p => apiUpdateSeo(p.pageSlug, {
      title: p.metaTitle || p.pageTitle,
      meta_description: p.metaDescription,
      keywords: p.metaKeywords,
      og_title: p.ogTitle,
      og_description: p.ogDescription
    }, token));

    // Save global SEO settings
    const globalSeoPromise = apiUpdateGlobalSeo({
      siteName: seoSettings.siteName,
      defaultMetaDescription: seoSettings.defaultMetaDescription,
      defaultKeywords: seoSettings.defaultMetaKeywords
    }, token);

    Promise.all([datePromise, ...plotPromises, ...seoPromises, globalSeoPromise])
      .then(() => {
        setSaveNotification(true);
        setTimeout(() => setSaveNotification(false), 3000);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('faisal_verified_date_updated'));
          window.dispatchEvent(new Event('faisal_plots_updated'));
        }
      })
      .catch(err => {
        console.error("Failed to save changes:", err);
      });
  };

  const handleDeleteLead = (leadId: string | number) => {
    if (!token) return;
    apiDeleteLead(leadId, token)
      .then(() => {
        setLeadsList(prev => prev.filter(item => item.id !== leadId));
        setSaveNotification(true);
        setTimeout(() => setSaveNotification(false), 3000);
      })
      .catch(err => {
        console.error("Failed to delete lead:", err);
      });
  };

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogContent || !token) return;

    apiCreateBlog({
      title: blogTitle,
      content: blogContent,
      summary: blogSummary || undefined,
      imageUrl: blogImageUrl || undefined,
      author: blogAuthor,
      category: blogCategory,
      readTime: blogReadTime,
      published: blogPublished,
      metaTitle: blogMetaTitle || undefined,
      metaDescription: blogMetaDescription || undefined,
      keywords: blogKeywords || undefined,
      faqs: blogFaqs
    }, token)
      .then(newBlog => {
        setBlogsList(prev => [newBlog, ...prev]);
        setIsAddBlogModalOpen(false);
        // Reset states
        setBlogTitle('');
        setBlogContent('');
        setBlogSummary('');
        setBlogImageUrl('');
        setBlogAuthor('Admin');
        setBlogCategory('Market Update');
        setBlogReadTime('3 min read');
        setBlogPublished(true);
        setBlogMetaTitle('');
        setBlogMetaDescription('');
        setBlogKeywords('');
        setBlogFaqs([]);
        setSaveNotification(true);
        setTimeout(() => setSaveNotification(false), 3000);
      })
      .catch(err => {
        console.error("Failed to create blog post:", err);
        alert("Failed to create blog post. Please check fields or permissions.");
      });
  };

  const handleOpenEditBlogModal = (blog: BlogItem) => {
    setEditingBlogId(blog.id);
    setBlogTitle(blog.title);
    setBlogContent(blog.content);
    setBlogSummary(blog.summary);
    setBlogImageUrl(blog.imageUrl);
    setBlogAuthor(blog.author);
    setBlogCategory(blog.category);
    setBlogReadTime(blog.readTime);
    setBlogPublished(blog.published);
    setBlogMetaTitle(blog.metaTitle);
    setBlogMetaDescription(blog.metaDescription);
    setBlogKeywords(blog.keywords);
    setBlogFaqs(blog.faqs || []);
    setIsEditBlogModalOpen(true);
  };

  const handleUpdateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlogId || !blogTitle || !blogContent || !token) return;

    apiUpdateBlog(editingBlogId, {
      title: blogTitle,
      content: blogContent,
      summary: blogSummary,
      imageUrl: blogImageUrl,
      author: blogAuthor,
      category: blogCategory,
      readTime: blogReadTime,
      published: blogPublished,
      metaTitle: blogMetaTitle,
      metaDescription: blogMetaDescription,
      keywords: blogKeywords,
      faqs: blogFaqs
    }, token)
      .then(updatedBlog => {
        setBlogsList(prev => prev.map(b => b.id === editingBlogId ? updatedBlog : b));
        setIsEditBlogModalOpen(false);
        setEditingBlogId(null);
        // Reset states
        setBlogTitle('');
        setBlogContent('');
        setBlogSummary('');
        setBlogImageUrl('');
        setBlogAuthor('Admin');
        setBlogCategory('Market Update');
        setBlogReadTime('3 min read');
        setBlogPublished(true);
        setBlogMetaTitle('');
        setBlogMetaDescription('');
        setBlogKeywords('');
        setBlogFaqs([]);
        setSaveNotification(true);
        setTimeout(() => setSaveNotification(false), 3000);
      })
      .catch(err => {
        console.error("Failed to update blog post:", err);
        alert("Failed to update blog post. Please check fields or permissions.");
      });
  };

  const handleDeleteBlog = (id: string) => {
    if (!token || !window.confirm("Are you sure you want to delete this blog post?")) return;
    apiDeleteBlog(id, token)
      .then(() => {
        setBlogsList(prev => prev.filter(b => b.id !== id));
        setSaveNotification(true);
        setTimeout(() => setSaveNotification(false), 3000);
      })
      .catch(err => {
        console.error("Failed to delete blog:", err);
        alert("Failed to delete blog. Please try again.");
      });
  };

  const handleBlogPublishToggle = (blog: BlogItem) => {
    if (!token) return;
    const nextPublished = !blog.published;
    
    // Optimistic UI update
    setBlogsList(prev => prev.map(b => b.id === blog.id ? { ...b, published: nextPublished } : b));

    apiUpdateBlog(blog.id, { published: nextPublished }, token)
      .catch(err => {
        console.error("Failed to toggle publish status:", err);
        // Rollback optimistic state
        setBlogsList(prev => prev.map(b => b.id === blog.id ? { ...b, published: blog.published } : b));
      });
  };

  const handleLogout = () => {

    if (token) {
      adminLogout(token).catch(console.error);
    }
    setToken(null);
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('faisal_admin_token');
    }
  };

  // -------------------------------------------------------------
  // 1. UNAUTHENTICATED LOGIN SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-slate-950 border border-slate-800 rounded-3xl p-8 space-y-8 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#4c050d] via-[#7b002c] to-amber-600" />

          {/* Header Branding */}
          <div className="text-center space-y-3 pt-2">
            <div className="w-16 h-16 bg-[#7b002c] text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg border border-white/10">
              <Building2 className="w-9 h-9 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-400 tracking-[0.25em] uppercase block">
                FAISAL HILLS • SECURE PORTAL
              </span>
              <h1 className="font-serif font-bold text-2xl text-white mt-1">
                Admin Management Login
              </h1>
              <p className="text-slate-400 text-xs mt-1">
                Authorised access for site management & inventory control
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs font-semibold text-center">
                {errorMsg}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">Admin Username</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username (e.g. ubaid)"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-[#7b002c] transition"
                />
                <Shield className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">Password / Security Key</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-[#7b002c] transition"
                />
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 border border-white/10 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-white" />
              <span>Login to Control Panel</span>
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="pt-4 border-t border-slate-900 text-center space-y-3">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 cursor-pointer"
            >
              Instant Admin Authorization (1-Click Login)
            </button>
            
            <div>
              <Link 
                href="/" 
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Public Website</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8 font-sans">
      
      {/* Top Action Bar */}
      <div className="flex justify-between items-center">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bold text-[#7b002c] hover:text-[#9e1245] bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200 transition-all hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4 text-[#7b002c]" />
          <span>Back to Main Portal</span>
        </Link>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-red-600 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout (Admin: {username})</span>
        </button>
      </div>

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#4c050d] text-white p-5 sm:p-8 rounded-2xl border border-[#7b002c] shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-3.5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white text-[#7b002c] rounded-xl font-bold flex items-center justify-center shadow-lg shrink-0">
            <Database className="w-6 h-6 sm:w-7 sm:h-7 text-[#7b002c]" />
          </div>
          <div>
            <span className="label-caps text-[10px] sm:text-xs text-slate-200 font-bold tracking-widest block">Management Control Panel • Logged in as: {username}</span>
            <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
              Faisal Hills Admin Dashboard
            </h1>
          </div>
        </div>

        <div className="relative z-10 flex flex-wrap items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-white/20">
          <div className="text-left md:text-right text-xs">
            <span className="text-slate-200 block text-[9px] sm:text-[10px] uppercase font-semibold">Data Verification Date</span>
            <strong className="text-white font-bold text-xs">{verifiedDate}</strong>
          </div>
          <button
            onClick={triggerSave}
            className="px-4 sm:px-5 py-2.5 sm:py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all hover:scale-105 btn-shimmer active:scale-95 shrink-0 border border-white/20 cursor-pointer"
          >
            <Save className="w-4 h-4 text-white" />
            <span>Publish Updates</span>
          </button>
        </div>
      </div>

      {saveNotification && (
        <div className="bg-slate-900 border border-[#7b002c] text-white px-4 sm:px-5 py-3.5 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span>All plot availability, SEO meta tags, and verification timestamps published live!</span>
        </div>
      )}

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-200 gap-1 sm:gap-4 text-xs font-bold overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setActiveTab('plots')}
          className={`py-3 px-3 sm:px-4 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'plots' ? 'border-[#7b002c] text-[#7b002c] font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4 text-[#7b002c]" />
          <span>Plots Inventory ({plots.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('blocks')}
          className={`py-3 px-3 sm:px-4 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'blocks' ? 'border-[#7b002c] text-[#7b002c] font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-4 h-4 text-[#7b002c]" />
          <span>Blocks & BG Images ({blocksList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('legal')}
          className={`py-3 px-3 sm:px-4 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'legal' ? 'border-[#7b002c] text-[#7b002c] font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#7b002c]" />
          <span>Legal Policies (Terms & Privacy)</span>
        </button>

        <button
          onClick={() => setActiveTab('accounts')}
          className={`py-3 px-3 sm:px-4 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'accounts' ? 'border-[#7b002c] text-[#7b002c] font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <CreditCard className="w-4 h-4 text-[#7b002c]" />
          <span>Bank Accounts & Contacts</span>
        </button>

        <button
          onClick={() => setActiveTab('gallery')}
          className={`py-3 px-3 sm:px-4 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'gallery' ? 'border-[#7b002c] text-[#7b002c] font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Camera className="w-4 h-4 text-[#7b002c]" />
          <span>Photo Gallery ({galleryList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('seo')}
          className={`py-3 px-3 sm:px-4 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'seo' ? 'border-[#7b002c] text-[#7b002c] font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Globe className="w-4 h-4 text-[#7b002c]" />
          <span>SEO & Meta Tags ({seoSettings.pages.length} Pages)</span>
        </button>

        <button
          onClick={() => setActiveTab('verification')}
          className={`py-3 px-3 sm:px-4 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'verification' ? 'border-[#7b002c] text-[#7b002c] font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#7b002c]" />
          <span>Verification Date</span>
        </button>

        <button
          onClick={() => setActiveTab('leads')}
          className={`py-3 px-3 sm:px-4 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'leads' ? 'border-[#7b002c] text-[#7b002c] font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4 text-[#7b002c]" />
          <span>Inquiries Log</span>
        </button>

        <button
          onClick={() => setActiveTab('blogs')}
          className={`py-3 px-3 sm:px-4 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'blogs' ? 'border-[#7b002c] text-[#7b002c] font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4 text-[#7b002c]" />
          <span>Blogs CMS ({blogsList.length})</span>
        </button>
      </div>


      {/* TAB 1: PLOTS INVENTORY & FOR SALE */}
      {activeTab === 'plots' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            {/* Search & Filter bar */}
            <div className="flex flex-wrap items-center gap-2.5 flex-1">
              <div className="relative min-w-[200px] flex-1 max-w-xs">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={plotSearchQuery}
                  onChange={(e) => setPlotSearchQuery(e.target.value)}
                  placeholder="Search plot #, size, facing..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                />
              </div>

              <select
                value={plotFilterBlock}
                onChange={(e) => setPlotFilterBlock(e.target.value)}
                className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c] cursor-pointer"
              >
                <option value="all">All Blocks & Sectors</option>
                {blocksList.map((b) => (
                  <option key={b.slug} value={b.slug}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <button 
              onClick={() => setIsAddPlotModalOpen(true)}
              className="px-4 py-2 bg-[#7b002c] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#9e1245] transition shadow self-start md:self-auto cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5 text-white" /> Add New Plot Listing
            </button>
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden md:block bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[760px]">
                <thead className="bg-[#4c050d] text-white uppercase text-[10px] tracking-wider border-b border-[#7b002c]">
                  <tr>
                    <th className="p-3.5">Plot Image</th>
                    <th className="p-3.5">Plot / Unit #</th>
                    <th className="p-3.5">Block Sector</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Size & Facing</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Demand Price (PKR)</th>
                    <th className="p-3.5">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {plots
                    .filter((plot) => {
                      const matchesBlock = plotFilterBlock === 'all' || plot.blockSlug === plotFilterBlock;
                      const matchesQuery = !plotSearchQuery || 
                        plot.plotNumber.toLowerCase().includes(plotSearchQuery.toLowerCase()) ||
                        plot.size.toLowerCase().includes(plotSearchQuery.toLowerCase()) ||
                        (plot.facing && plot.facing.toLowerCase().includes(plotSearchQuery.toLowerCase())) ||
                        plot.blockName.toLowerCase().includes(plotSearchQuery.toLowerCase());
                      return matchesBlock && matchesQuery;
                    })
                    .map((plot) => (
                    <tr key={plot.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5">
                        <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <img
                            src={plot.image || '/faisal-jewel.jpg'}
                            alt={plot.plotNumber}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="p-3.5 font-bold font-serif text-[#7b002c] text-sm">{plot.plotNumber}</td>
                      <td className="p-3.5 font-medium">{plot.blockName}</td>
                      <td className="p-3.5">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-300`}>
                          {plot.category === 'Apartment' ? 'Luxury Flat' : plot.category}
                        </span>
                      </td>
                      <td className="p-3.5 font-medium">
                        <div>{plot.size}</div>
                        <span className="text-[10px] text-slate-500 font-semibold">{plot.facing || 'Standard'}</span>
                      </td>
                      <td className="p-3.5">
                        <select
                          value={plot.status}
                          onChange={(e) => handleStatusChange(plot.id, e.target.value as any)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                            plot.status === 'Available' ? 'bg-[#7b002c] text-white border-[#7b002c]' : 'bg-slate-100 text-slate-700 border-slate-300'
                          }`}
                        >
                          <option value="Available">Available</option>
                          <option value="Reserved">Reserved</option>
                          <option value="Sold">Sold</option>
                        </select>
                      </td>
                      <td className="p-3.5">
                        <input
                          type="number"
                          value={plot.price}
                          onChange={(e) => handlePriceChange(plot.id, Number(e.target.value))}
                          className="w-32 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg font-serif font-bold text-xs text-[#7b002c] focus:outline-none focus:border-[#7b002c]"
                        />
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <button onClick={triggerSave} className="text-[#7b002c] hover:text-[#9e1245] font-bold text-xs flex items-center gap-1 cursor-pointer" title="Save">
                            <Save className="w-3.5 h-3.5" /> Save
                          </button>
                          <button onClick={() => handleDeletePlot(plot.id)} className="text-slate-400 hover:text-red-600 transition p-1 cursor-pointer" title="Delete Plot">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards View */}
          <div className="block md:hidden space-y-3">
            {plots
              .filter((plot) => {
                const matchesBlock = plotFilterBlock === 'all' || plot.blockSlug === plotFilterBlock;
                const matchesQuery = !plotSearchQuery || 
                  plot.plotNumber.toLowerCase().includes(plotSearchQuery.toLowerCase()) ||
                  plot.size.toLowerCase().includes(plotSearchQuery.toLowerCase()) ||
                  plot.blockName.toLowerCase().includes(plotSearchQuery.toLowerCase());
                return matchesBlock && matchesQuery;
              })
              .map((plot) => (
              <div key={plot.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <img
                      src={plot.image || '/faisal-jewel.jpg'}
                      alt={plot.plotNumber}
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                    />
                    <div>
                      <span className="font-serif font-bold text-base text-[#7b002c] block">{plot.plotNumber}</span>
                      <span className="text-xs font-medium text-slate-500">{plot.blockName} • {plot.size}</span>
                    </div>
                  </div>
                  <select
                    value={plot.status}
                    onChange={(e) => handleStatusChange(plot.id, e.target.value as any)}
                    className={`text-xs font-bold px-2 py-1 rounded-lg border focus:outline-none ${
                      plot.status === 'Available' ? 'bg-[#7b002c] text-white border-[#7b002c]' : 'bg-slate-100 text-slate-700 border-slate-300'
                    }`}
                  >
                    <option value="Available">Available</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Demand Price</span>
                    <input
                      type="number"
                      value={plot.price}
                      onChange={(e) => handlePriceChange(plot.id, Number(e.target.value))}
                      className="w-32 px-2.5 py-1 bg-slate-50 border border-slate-300 rounded font-serif font-bold text-xs text-[#7b002c]"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={triggerSave} 
                      className="px-3 py-1.5 bg-[#7b002c] text-white rounded-lg font-bold text-xs flex items-center gap-1 shadow shrink-0 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" /> Save
                    </button>
                    <button 
                      onClick={() => handleDeletePlot(plot.id)} 
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg border border-slate-200 hover:border-red-300 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Listing Modal */}
          {isAddPlotModalOpen && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden my-auto animate-fade-up">
                
                {/* Header */}
                <div className="bg-[#7b002c] text-white p-5 flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg">Add New Property Listing</h3>
                  <button 
                    onClick={() => setIsAddPlotModalOpen(false)}
                    className="text-white/80 hover:text-white text-xs font-semibold px-2.5 py-1 rounded bg-black/10 hover:bg-black/20 transition cursor-pointer"
                  >
                    Close
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleCreatePlot} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Plot Number */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Plot / Flat Number</label>
                      <input 
                        type="text" 
                        required
                        value={newPlotNumber}
                        onChange={(e) => setNewPlotNumber(e.target.value)}
                        placeholder="e.g. A-125 or FJ-402"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-350 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                      />
                    </div>

                    {/* Block Name */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Select Block</label>
                      <select
                        value={newPlotBlockSlug}
                        onChange={(e) => setNewPlotBlockSlug(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-350 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c] cursor-pointer"
                      >
                        {blocksData.map((b) => (
                          <option key={b.slug} value={b.slug}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Category */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Category</label>
                      <select
                        value={newPlotCategory}
                        onChange={(e) => setNewPlotCategory(e.target.value as any)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-350 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c] cursor-pointer"
                      >
                        <option value="Residential">Residential Plot</option>
                        <option value="Commercial">Commercial Plot</option>
                        <option value="Apartment">Luxury Flat / Apartment</option>
                      </select>
                    </div>

                    {/* Size */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Size</label>
                      <input 
                        type="text" 
                        required
                        value={newPlotSize}
                        onChange={(e) => setNewPlotSize(e.target.value)}
                        placeholder="e.g. 5 Marla, 10 Marla, 1 Kanal"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-350 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                      />
                    </div>

                    {/* Dimensions */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Dimensions</label>
                      <input 
                        type="text" 
                        required
                        value={newPlotDimensions}
                        onChange={(e) => setNewPlotDimensions(e.target.value)}
                        placeholder="e.g. 25 x 50 or 1,150 Sq Ft"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-350 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                      />
                    </div>

                    {/* Price */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Demand Price (PKR)</label>
                      <input 
                        type="number" 
                        required
                        value={newPlotPrice}
                        onChange={(e) => setNewPlotPrice(Number(e.target.value))}
                        placeholder="e.g. 5500000"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-350 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                      />
                    </div>

                    {/* Facing */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Facing / Location View</label>
                      <select
                        value={newPlotFacing}
                        onChange={(e) => setNewPlotFacing(e.target.value as any)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-350 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c] cursor-pointer"
                      >
                        <option value="Standard">Standard</option>
                        <option value="Corner">Corner</option>
                        <option value="Park Facing">Park Facing</option>
                        <option value="Main Boulevard">Main Boulevard</option>
                        <option value="Hill View">Hill View</option>
                      </select>
                    </div>

                    {/* Image URL */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Image URL (Optional)</label>
                      <input 
                        type="text" 
                        value={newPlotImage}
                        onChange={(e) => setNewPlotImage(e.target.value)}
                        placeholder="e.g. /faisal-jewel.jpg"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-350 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                      />
                    </div>

                  </div>

                  {/* Features */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-800">Key Features (comma-separated)</label>
                    <input 
                      type="text" 
                      value={newPlotFeatures}
                      onChange={(e) => setNewPlotFeatures(e.target.value)}
                      placeholder="e.g. Solid Land Ground, Near Mosque, Corner Plot"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-350 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-800">Description</label>
                    <textarea 
                      rows={3}
                      value={newPlotDescription}
                      onChange={(e) => setNewPlotDescription(e.target.value)}
                      placeholder="Enter detailed property description..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-350 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>

                  {/* Submit button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAddPlotModalOpen(false)}
                      className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl shadow flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-white" />
                      <span>Add Listing</span>
                    </button>
                  </div>

                </form>

              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 2: SEO & META TAGS MANAGER */}
      {activeTab === 'seo' && (
        <div className="space-y-8">
          
          {/* SEO Header Banner */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#7b002c] uppercase tracking-wider">
                <Globe className="w-4 h-4 text-[#7b002c]" />
                <span>Search Engine Optimization & Social Sharing Metadata</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Page Meta Tags & OpenGraph Control Panel
              </h2>
              <p className="text-slate-600 text-xs max-w-2xl">
                Edit Meta Titles, Meta Descriptions, Meta Keywords, and OpenGraph social cards across your website pages to boost Google search rankings and social media previews.
              </p>
            </div>

            <button
              onClick={triggerSave}
              className="px-5 py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl shadow flex items-center gap-2 transition shrink-0 cursor-pointer"
            >
              <Save className="w-4 h-4 text-white" />
              <span>Save & Publish All Meta Tags</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Controls Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Page Selection Bar */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Page to Edit SEO Meta Tags:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {seoSettings.pages.map((p) => (
                    <button
                      key={p.pageSlug}
                      type="button"
                      onClick={() => setSelectedSeoPageSlug(p.pageSlug)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
                        selectedSeoPageSlug === p.pageSlug
                          ? 'bg-[#7b002c] text-white border-[#7b002c] shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {p.pageTitle}
                    </button>
                  ))}
                </div>
              </div>

              {/* Editable Fields Card */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-serif font-bold text-lg text-[#7b002c] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#7b002c]" />
                    <span>Editing SEO Meta Tags: {selectedPageSeo.pageTitle}</span>
                  </h3>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-bold border border-slate-200">
                    URL: {selectedPageSeo.pageSlug}
                  </span>
                </div>

                {/* 1. Meta Title */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-800">Meta Title (`&lt;title&gt;` Tag)</label>
                    <span className={`font-bold ${
                      selectedPageSeo.metaTitle.length >= 50 && selectedPageSeo.metaTitle.length <= 65
                        ? 'text-emerald-600'
                        : 'text-amber-600'
                    }`}>
                      {selectedPageSeo.metaTitle.length} / 60 characters (Recommended: 50-60)
                    </span>
                  </div>
                  <input
                    type="text"
                    value={selectedPageSeo.metaTitle}
                    onChange={(e) => handleSeoFieldChange('metaTitle', e.target.value)}
                    placeholder="Page Title for Search Engines"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                  <p className="text-[10px] text-slate-500">
                    The primary title displayed on Google Search Result pages and browser tabs.
                  </p>
                </div>

                {/* 2. Meta Description */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-800">Meta Description (`&lt;meta name="description"&gt;`)</label>
                    <span className={`font-bold ${
                      selectedPageSeo.metaDescription.length >= 120 && selectedPageSeo.metaDescription.length <= 160
                        ? 'text-emerald-600'
                        : 'text-amber-600'
                    }`}>
                      {selectedPageSeo.metaDescription.length} / 160 characters (Recommended: 150-160)
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={selectedPageSeo.metaDescription}
                    onChange={(e) => handleSeoFieldChange('metaDescription', e.target.value)}
                    placeholder="Short informative description for Google search snippets"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                  <p className="text-[10px] text-slate-500">
                    Short snippet shown under the title on search engines. High CTR descriptions attract more clicks.
                  </p>
                </div>

                {/* 3. Meta Keywords */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Meta Keywords (`&lt;meta name="keywords"&gt;`)</label>
                  <input
                    type="text"
                    value={selectedPageSeo.metaKeywords}
                    onChange={(e) => handleSeoFieldChange('metaKeywords', e.target.value)}
                    placeholder="Faisal Hills, Plot Prices, Taxila, Executive Block"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                  <p className="text-[10px] text-slate-500">
                    Target search terms separated by commas for indexers & directory crawlers.
                  </p>
                </div>

                {/* 4. OpenGraph Social Title & Description */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">OpenGraph Title (`og:title`)</label>
                    <input
                      type="text"
                      value={selectedPageSeo.ogTitle}
                      onChange={(e) => handleSeoFieldChange('ogTitle', e.target.value)}
                      placeholder="Title for WhatsApp / Facebook"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">Canonical URL (`rel="canonical"`)</label>
                    <input
                      type="text"
                      value={selectedPageSeo.canonicalUrl}
                      onChange={(e) => handleSeoFieldChange('canonicalUrl', e.target.value)}
                      placeholder="https://faisalhills.com/page"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">OpenGraph Description (`og:description`)</label>
                  <input
                    type="text"
                    value={selectedPageSeo.ogDescription}
                    onChange={(e) => handleSeoFieldChange('ogDescription', e.target.value)}
                    placeholder="Social sharing card summary"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <button
                  onClick={triggerSave}
                  className="w-full py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Save className="w-4 h-4 text-white" />
                  <span>Update Page Meta Tags</span>
                </button>

              </div>

              {/* Global Search Verification Tags */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-lg space-y-5">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Code className="w-5 h-5 text-amber-400" />
                  <h3 className="font-serif font-bold text-lg text-white">Global Search Console Verification Tags</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-300">Google Site Verification ID</label>
                    <input
                      type="text"
                      value={seoSettings.googleSiteVerification}
                      onChange={(e) => handleGlobalSeoChange('googleSiteVerification', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-300">Bing Webmaster Verification ID</label>
                    <input
                      type="text"
                      value={seoSettings.bingSiteVerification}
                      onChange={(e) => handleGlobalSeoChange('bingSiteVerification', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-300">Facebook App ID (og:app_id)</label>
                    <input
                      type="text"
                      value={seoSettings.facebookAppId}
                      onChange={(e) => handleGlobalSeoChange('facebookAppId', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-300">Twitter Handle (@username)</label>
                    <input
                      type="text"
                      value={seoSettings.twitterHandle}
                      onChange={(e) => handleGlobalSeoChange('twitterHandle', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Right Live Snippet Previews Column */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* 1. Google Search Live Result Preview Simulation */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Search className="w-4 h-4 text-[#7b002c]" />
                  <h3 className="font-serif font-bold text-base text-slate-900">
                    Live Google Search Snippet Simulation
                  </h3>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="w-4 h-4 rounded-full bg-[#7b002c] text-white flex items-center justify-center font-bold text-[9px]">
                      F
                    </div>
                    <span className="font-semibold text-slate-700">Faisal Hills Real Estate</span>
                    <span className="text-slate-400">›</span>
                    <span className="text-slate-500 text-[11px] truncate max-w-[200px]">{selectedPageSeo.canonicalUrl}</span>
                  </div>

                  <h4 className="text-blue-800 hover:underline font-normal text-lg cursor-pointer leading-snug line-clamp-2">
                    {selectedPageSeo.metaTitle || 'Meta Title Placeholder'}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {selectedPageSeo.metaDescription || 'Meta description snippet placeholder. Add a compelling description for higher search clicks.'}
                  </p>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-2 bg-amber-50 p-3 rounded-lg border border-amber-200/80">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Google typically displays up to 60 characters for titles and 160 characters for meta descriptions.</span>
                </div>
              </div>

              {/* 2. Social Card (WhatsApp / Facebook) Preview */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Share2 className="w-4 h-4 text-[#7b002c]" />
                  <h3 className="font-serif font-bold text-base text-slate-900">
                    Social Sharing Card Preview (WhatsApp / FB)
                  </h3>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-slate-50">
                  <div 
                    className="h-40 bg-cover bg-center bg-slate-800 relative"
                    style={{ backgroundImage: `url('${selectedPageSeo.ogImage}')` }}
                  >
                    <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                      faisalhills.com
                    </span>
                  </div>

                  <div className="p-4 space-y-1 bg-white">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">FAISALHILLS.COM</span>
                    <h5 className="font-bold text-sm text-slate-900 truncate">
                      {selectedPageSeo.ogTitle || selectedPageSeo.metaTitle}
                    </h5>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {selectedPageSeo.ogDescription || selectedPageSeo.metaDescription}
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* TAB: PHOTO GALLERY MANAGER */}
      {activeTab === 'gallery' && (
        <div className="space-y-8">
          
          {/* Upload New Photo Form */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-[#7b002c]">
                <Camera className="w-5 h-5" />
                <h3 className="font-serif font-bold text-xl text-slate-900">Upload / Add New Site Photo to Home Gallery</h3>
              </div>
              <span className="text-xs text-slate-500 font-semibold">{galleryList.length} Photos in Gallery</span>
            </div>

            <form onSubmit={handleAddPhoto} className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-6 space-y-1">
                <label className="block text-xs font-bold text-slate-800">Photo Title</label>
                <input
                  type="text"
                  required
                  value={newPhotoTitle}
                  onChange={(e) => setNewPhotoTitle(e.target.value)}
                  placeholder="e.g., Sector A Central Park Landscape"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                />
              </div>

              <div className="md:col-span-6 space-y-1">
                <label className="block text-xs font-bold text-slate-800">Category Tag</label>
                <select
                  value={newPhotoCategory}
                  onChange={(e) => setNewPhotoCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c] cursor-pointer"
                >
                  <option value="Infrastructure">Infrastructure (Roads, Cables, Utilities)</option>
                  <option value="Towers">Towers & Commercial (Faisal Jewels, Plazas)</option>
                  <option value="Amenities">Amenities (Parks, Jamia Mosque, Sports)</option>
                  <option value="Entrance">Entrance & Monuments (GT Road Entrance Gate)</option>
                </select>
              </div>

              <div className="md:col-span-12 space-y-1">
                <label className="block text-xs font-bold text-slate-800">Image URL / File Path</label>
                <input
                  type="text"
                  required
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  placeholder="e.g. /faisal-jewel.jpg or https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                />
              </div>

              <div className="md:col-span-12 space-y-1">
                <label className="block text-xs font-bold text-slate-800">Description (Optional)</label>
                <input
                  type="text"
                  value={newPhotoDescription}
                  onChange={(e) => setNewPhotoDescription(e.target.value)}
                  placeholder="Brief caption describing the progress or feature..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                />
              </div>

              <div className="md:col-span-12 pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-white" />
                  <span>Add Photo to Home Gallery</span>
                </button>
              </div>
            </form>
          </div>

          {/* Existing Gallery Photos Grid */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-serif font-bold text-xl text-slate-900">Current Home Gallery Photos</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {galleryList.map((photo) => (
                <div key={photo.id} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between space-y-3 p-3">
                  <div className="h-44 rounded-xl overflow-hidden bg-slate-900 relative">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-[#7b002c] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow">
                      {photo.category}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-sm text-slate-900 line-clamp-1">{photo.title}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{photo.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-semibold">{photo.dateAdded || 'August 2026'}</span>
                    <button
                      type="button"
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="text-red-600 hover:text-red-800 text-xs font-bold flex items-center gap-1 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: BLOCKS & HERO BACKGROUND IMAGES MANAGER */}
      {activeTab === 'blocks' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#7b002c] uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-[#7b002c]" />
                <span>Society Blocks & Sectors Management</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Edit Block Hero Background Images, NOC Status & Price Rates
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
              {blocksList.length} Society Blocks Configured
            </span>
          </div>

          {/* Block Selection Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {blocksList.map((b) => (
              <button
                key={b.id || b.slug}
                onClick={() => handleSelectBlockToEdit(b.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                  selectedBlockSlug === b.slug
                    ? 'bg-[#7b002c] text-white border-[#7b002c] shadow-md scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>

          {/* Active Block Edit Form */}
          {editingBlock && (
            <form onSubmit={handleSaveBlock} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center font-bold font-serif text-lg">
                    {editingBlock.name?.replace('Block ', '').charAt(0) || 'B'}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900">
                      Editing: {editingBlock.name}
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">
                      Slug: <code className="text-[#7b002c] bg-slate-100 px-1.5 py-0.5 rounded font-mono">{editingBlock.slug}</code>
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs rounded-xl shadow flex items-center gap-2 transition cursor-pointer"
                >
                  <Save className="w-4 h-4 text-white" />
                  <span>Save & Publish Block</span>
                </button>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Hero Background Image URL */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>Hero Background Image URL</span>
                    <span className="text-[10px] text-slate-400 font-normal">Displayed at top of block page</span>
                  </label>
                  <input
                    type="text"
                    value={editingBlock.heroImage || ''}
                    onChange={(e) => setEditingBlock(prev => ({ ...prev, heroImage: e.target.value }))}
                    placeholder="e.g. /images/hero-bg.jpg or https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                  />
                  {editingBlock.heroImage && (
                    <div className="h-32 rounded-xl overflow-hidden border border-slate-200 relative bg-slate-900">
                      <img
                        src={editingBlock.heroImage}
                        alt="Hero Background Preview"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                        Hero Background Preview
                      </span>
                    </div>
                  )}
                </div>

                {/* Master Plan Map Image URL */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>Master Plan / Layout Map Image URL</span>
                    <span className="text-[10px] text-slate-400 font-normal">High-res layout map</span>
                  </label>
                  <input
                    type="text"
                    value={editingBlock.masterPlanImage || ''}
                    onChange={(e) => setEditingBlock(prev => ({ ...prev, masterPlanImage: e.target.value }))}
                    placeholder="e.g. /images/block-a-map.jpg"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                  />
                  {editingBlock.masterPlanImage && (
                    <div className="h-32 rounded-xl overflow-hidden border border-slate-200 relative bg-slate-900">
                      <img
                        src={editingBlock.masterPlanImage}
                        alt="Master Plan Preview"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                        Master Plan Map Preview
                      </span>
                    </div>
                  )}
                </div>

                {/* Block Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Block Name</label>
                  <input
                    type="text"
                    required
                    value={editingBlock.name || ''}
                    onChange={(e) => setEditingBlock(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                {/* Subtitle */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Tagline / Subtitle</label>
                  <input
                    type="text"
                    value={editingBlock.subtitle || ''}
                    onChange={(e) => setEditingBlock(prev => ({ ...prev, subtitle: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                {/* NOC Approval Status */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">NOC Approval Status</label>
                  <input
                    type="text"
                    value={editingBlock.nocStatus || ''}
                    onChange={(e) => setEditingBlock(prev => ({ ...prev, nocStatus: e.target.value }))}
                    placeholder="e.g. RDA Approved (Rawalpindi Development Authority)"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                {/* Verification Date */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Last Verified Date</label>
                  <input
                    type="text"
                    value={editingBlock.verificationDate || 'August 2026'}
                    onChange={(e) => setEditingBlock(prev => ({ ...prev, verificationDate: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                {/* Residential Rates */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Residential Price Range</label>
                  <input
                    type="text"
                    value={editingBlock.priceRange?.residential || ''}
                    onChange={(e) => setEditingBlock(prev => ({
                      ...prev,
                      priceRange: { ...prev.priceRange, residential: e.target.value, commercial: prev.priceRange?.commercial || '' }
                    }))}
                    placeholder="e.g. PKR 48 Lacs - 1.85 Crore"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                {/* Commercial Rates */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Commercial Price Range</label>
                  <input
                    type="text"
                    value={editingBlock.priceRange?.commercial || ''}
                    onChange={(e) => setEditingBlock(prev => ({
                      ...prev,
                      priceRange: { ...prev.priceRange, commercial: e.target.value, residential: prev.priceRange?.residential || '' }
                    }))}
                    placeholder="e.g. PKR 1.2 Crore - 4.5 Crore"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                {/* Total Plots Count */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Total Plots Count</label>
                  <input
                    type="number"
                    value={editingBlock.totalPlots || 1200}
                    onChange={(e) => setEditingBlock(prev => ({ ...prev, totalPlots: Number(e.target.value) }))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Category</label>
                  <select
                    value={editingBlock.category || 'developed'}
                    onChange={(e) => setEditingBlock(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c] cursor-pointer"
                  >
                    <option value="developed">Developed (Possession Ready)</option>
                    <option value="upcoming">Upcoming (Fast-Paced Development)</option>
                    <option value="commercial">Commercial Hub</option>
                  </select>
                </div>

                {/* Detailed Description */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Block Overview & Description</label>
                  <textarea
                    rows={4}
                    value={editingBlock.description || ''}
                    onChange={(e) => setEditingBlock(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter detailed description of this sector/block..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs rounded-xl shadow flex items-center gap-2 transition cursor-pointer"
                >
                  <Save className="w-4 h-4 text-white" />
                  <span>Save & Publish Block Updates</span>
                </button>
              </div>
            </form>
          )}

        </div>
      )}


      {/* TAB 3: LEGAL POLICIES (TERMS & PRIVACY POLICY) */}
      {activeTab === 'legal' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#7b002c] uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-[#7b002c]" />
                <span>Legal Content & Compliance Management</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Edit Terms of Service & Privacy Policy Clauses
              </h2>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setLegalSubTab('terms')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  legalSubTab === 'terms' ? 'bg-[#7b002c] text-white shadow' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Terms of Service ({termsOfService.sections.length} Clauses)
              </button>
              <button
                type="button"
                onClick={() => setLegalSubTab('privacy')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  legalSubTab === 'privacy' ? 'bg-[#7b002c] text-white shadow' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Privacy Policy ({privacyPolicy.sections.length} Clauses)
              </button>
            </div>
          </div>

          {/* Active Policy Editor */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  {legalSubTab === 'terms' ? 'Terms of Service Page' : 'Privacy Policy Page'}
                </h3>
                <span className="text-xs text-slate-500">Live URL: <code className="text-[#7b002c] font-mono">/{legalSubTab === 'terms' ? 'terms-of-service' : 'privacy-policy'}</code></span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleAddPolicySection}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#7b002c]" /> Add New Clause
                </button>
                <button
                  type="button"
                  onClick={handleSaveLegalPolicies}
                  className="px-5 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs rounded-xl shadow flex items-center gap-2 transition cursor-pointer"
                >
                  <Save className="w-4 h-4 text-white" />
                  <span>Save Policy</span>
                </button>
              </div>
            </div>

            {/* Title & Last Updated Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">Page Headline</label>
                <input
                  type="text"
                  value={legalSubTab === 'terms' ? termsOfService.title : privacyPolicy.title}
                  onChange={(e) => {
                    if (legalSubTab === 'terms') {
                      setTermsOfService(prev => ({ ...prev, title: e.target.value }));
                    } else {
                      setPrivacyPolicy(prev => ({ ...prev, title: e.target.value }));
                    }
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">Last Updated Timestamp</label>
                <input
                  type="text"
                  value={legalSubTab === 'terms' ? termsOfService.lastUpdated : privacyPolicy.lastUpdated}
                  onChange={(e) => {
                    if (legalSubTab === 'terms') {
                      setTermsOfService(prev => ({ ...prev, lastUpdated: e.target.value }));
                    } else {
                      setPrivacyPolicy(prev => ({ ...prev, lastUpdated: e.target.value }));
                    }
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                />
              </div>
            </div>

            {/* Sections Repeater */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Policy Clauses & Sections</span>
              {(legalSubTab === 'terms' ? termsOfService.sections : privacyPolicy.sections).map((sec, idx) => (
                <div key={idx} className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <input
                      type="text"
                      value={sec.title}
                      onChange={(e) => handlePolicySectionChange(idx, 'title', e.target.value)}
                      placeholder="e.g. 1. Terms of Use"
                      className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-bold focus:outline-none focus:border-[#7b002c]"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePolicySection(idx)}
                      className="text-slate-400 hover:text-red-600 p-1.5 rounded transition cursor-pointer"
                      title="Remove Clause"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <textarea
                    rows={3}
                    value={sec.content}
                    onChange={(e) => handlePolicySectionChange(idx, 'content', e.target.value)}
                    placeholder="Enter detailed clause statement..."
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                  />
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                type="button"
                onClick={handleSaveLegalPolicies}
                className="px-6 py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs rounded-xl shadow flex items-center gap-2 transition cursor-pointer"
              >
                <Save className="w-4 h-4 text-white" />
                <span>Save & Publish Legal Policies</span>
              </button>
            </div>
          </div>
        </div>
      )}


      {/* TAB 4: BANK ACCOUNTS & SOCIAL/CONTACT LINKS */}
      {activeTab === 'accounts' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#7b002c] uppercase tracking-wider">
                <CreditCard className="w-4 h-4 text-[#7b002c]" />
                <span>Financial & Official Contact Management</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Bank Accounts for Bookings, Social Links & Helpline Numbers
              </h2>
            </div>

            <button
              type="button"
              onClick={handleSaveBankAndContact}
              className="px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs rounded-xl shadow flex items-center gap-2 transition cursor-pointer self-start md:self-auto"
            >
              <Save className="w-4 h-4 text-white" />
              <span>Save & Publish All</span>
            </button>
          </div>

          {/* Section 1: Bank Accounts for Booking */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-[#7b002c]">
                <CreditCard className="w-5 h-5" />
                <h3 className="font-serif font-bold text-lg text-slate-900">Official Society Bank Accounts (Booking & Installments)</h3>
              </div>
              <button
                type="button"
                onClick={handleAddBankAccount}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 flex items-center gap-1.5 transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#7b002c]" /> Add Bank Account
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {bankAccounts.map((b) => (
                <div key={b.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <input
                      type="text"
                      value={b.bankName}
                      onChange={(e) => handleBankAccountChange(b.id, 'bankName', e.target.value)}
                      placeholder="Bank Name"
                      className="font-serif font-bold text-sm text-[#7b002c] bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#7b002c] focus:outline-none flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveBankAccount(b.id)}
                      className="text-slate-400 hover:text-red-600 p-1 transition cursor-pointer"
                      title="Delete Bank"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Account Title</label>
                      <input
                        type="text"
                        value={b.accountTitle}
                        onChange={(e) => handleBankAccountChange(b.id, 'accountTitle', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Account Number</label>
                      <input
                        type="text"
                        value={b.accountNumber}
                        onChange={(e) => handleBankAccountChange(b.id, 'accountNumber', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">IBAN Number</label>
                      <input
                        type="text"
                        value={b.iban}
                        onChange={(e) => handleBankAccountChange(b.id, 'iban', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Branch Name</label>
                      <input
                        type="text"
                        value={b.branchName}
                        onChange={(e) => handleBankAccountChange(b.id, 'branchName', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Branch Code</label>
                      <input
                        type="text"
                        value={b.branchCode}
                        onChange={(e) => handleBankAccountChange(b.id, 'branchCode', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Payment Instructions</label>
                      <input
                        type="text"
                        value={b.instructions}
                        onChange={(e) => handleBankAccountChange(b.id, 'instructions', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Social Media Links */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-[#7b002c] border-b border-slate-100 pb-3">
              <Share2 className="w-5 h-5" />
              <h3 className="font-serif font-bold text-lg text-slate-900">Official Social Media Links & Channels</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-800">WhatsApp Number</label>
                <input
                  type="text"
                  value={socialLinks.whatsapp || ''}
                  onChange={(e) => setSocialLinks(prev => ({ ...prev, whatsapp: e.target.value }))}
                  placeholder="+923044811717"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:outline-none focus:border-[#7b002c]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-800">Facebook URL</label>
                <input
                  type="text"
                  value={socialLinks.facebook || ''}
                  onChange={(e) => setSocialLinks(prev => ({ ...prev, facebook: e.target.value }))}
                  placeholder="https://facebook.com/..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:outline-none focus:border-[#7b002c]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-800">Instagram URL</label>
                <input
                  type="text"
                  value={socialLinks.instagram || ''}
                  onChange={(e) => setSocialLinks(prev => ({ ...prev, instagram: e.target.value }))}
                  placeholder="https://instagram.com/..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:outline-none focus:border-[#7b002c]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-800">YouTube Channel URL</label>
                <input
                  type="text"
                  value={socialLinks.youtube || ''}
                  onChange={(e) => setSocialLinks(prev => ({ ...prev, youtube: e.target.value }))}
                  placeholder="https://youtube.com/@..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:outline-none focus:border-[#7b002c]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-800">LinkedIn URL</label>
                <input
                  type="text"
                  value={socialLinks.linkedin || ''}
                  onChange={(e) => setSocialLinks(prev => ({ ...prev, linkedin: e.target.value }))}
                  placeholder="https://linkedin.com/company/..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:outline-none focus:border-[#7b002c]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-800">Twitter / X URL</label>
                <input
                  type="text"
                  value={socialLinks.twitter || ''}
                  onChange={(e) => setSocialLinks(prev => ({ ...prev, twitter: e.target.value }))}
                  placeholder="https://twitter.com/..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:outline-none focus:border-[#7b002c]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Official Contact Details */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-[#7b002c] border-b border-slate-100 pb-3">
              <PhoneCall className="w-5 h-5" />
              <h3 className="font-serif font-bold text-lg text-slate-900">Official Society Contact Numbers & Office Addresses</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-800">Sales Hotline (Navbar & Footer)</label>
                <input
                  type="text"
                  value={contactInfo.salesHotline || ''}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, salesHotline: e.target.value }))}
                  placeholder="+92 304 4811 717"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:outline-none focus:border-[#7b002c]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-800">Official Support Email</label>
                <input
                  type="email"
                  value={contactInfo.email || ''}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="info@faisalhillsislamabadfh.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:outline-none focus:border-[#7b002c]"
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="block font-bold text-slate-800">Head Office Address</label>
                <input
                  type="text"
                  value={contactInfo.headOffice || ''}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, headOffice: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:outline-none focus:border-[#7b002c]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-800">Site Office Address</label>
                <input
                  type="text"
                  value={contactInfo.siteOffice || ''}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, siteOffice: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:outline-none focus:border-[#7b002c]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-800">Sales Desk Address</label>
                <input
                  type="text"
                  value={contactInfo.salesDesk || ''}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, salesDesk: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:outline-none focus:border-[#7b002c]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                type="button"
                onClick={handleSaveBankAndContact}
                className="px-6 py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs rounded-xl shadow flex items-center gap-2 transition cursor-pointer"
              >
                <Save className="w-4 h-4 text-white" />
                <span>Save All Financial & Contact Settings</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DATA VERIFICATION TIMESTAMP */}
      {activeTab === 'verification' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm max-w-xl space-y-5">
          <div className="space-y-1">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#7b002c]">Verification Date Requirement</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real estate prices, NOC approvals, and development statuses change frequently. Update the last verification date displayed across all website sections.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1.5">Current Verified Date</label>
            <input
              type="text"
              value={verifiedDate}
              onChange={(e) => setVerifiedDate(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 font-bold focus:outline-none focus:border-[#7b002c]"
            />
          </div>

          <button
            onClick={triggerSave}
            className="w-full py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-2 transition-all btn-shimmer active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4 text-white" />
            <span>Update Verification Timestamp</span>
          </button>
        </div>
      )}

      {/* TAB 5: LEADS LOG */}
      {activeTab === 'leads' && (
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#7b002c]">Recent WhatsApp & Form Inquiries</h3>
              <p className="text-xs text-slate-500 font-medium">Real-time incoming customer lead submissions ({leadsList.length})</p>
            </div>
            {leadsList.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setLeadsList([]);
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('faisal_leads_data', JSON.stringify([]));
                    window.dispatchEvent(new Event('faisal_leads_updated'));
                  }
                }}
                className="text-xs text-red-600 hover:text-red-800 font-bold flex items-center gap-1 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All Leads
              </button>
            )}
          </div>

          <div className="space-y-3">
            {leadsList.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-xs">
                No customer inquiries logged yet. Submissions from the website forms will appear here in real-time.
              </div>
            ) : (
              leadsList.map((lead) => (
                <div key={lead.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-[#7b002c] font-serif text-sm block">{lead.name}</strong>
                      <span className="bg-[#7b002c]/10 text-[#7b002c] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#7b002c]/20">
                        {lead.interest || 'General Inquiry'}
                      </span>
                    </div>
                    <p className="text-slate-700 text-xs font-semibold">Phone: {lead.phone}</p>
                    {lead.message && (
                      <p className="text-slate-600 text-xs bg-white p-2 rounded border border-slate-200 mt-1 italic">
                        "{lead.message}"
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
                    <span className="text-slate-400 font-medium text-[11px]">{lead.submittedAt}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteLead(lead.id)}
                      className="text-slate-400 hover:text-red-600 transition p-1 cursor-pointer"
                      title="Delete Lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 7: BLOGS CMS */}
      {activeTab === 'blogs' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="text-slate-655 font-medium">Create, publish & update Faisal Hills real estate blog posts</span>
            <button 
              onClick={() => {
                setBlogTitle('');
                setBlogContent('');
                setBlogSummary('');
                setBlogImageUrl('');
                setBlogAuthor('Admin');
                setBlogCategory('Market Update');
                setBlogReadTime('3 min read');
                setBlogPublished(true);
                setBlogMetaTitle('');
                setBlogMetaDescription('');
                setBlogKeywords('');
                setIsAddBlogModalOpen(true);
              }}
              className="px-4 py-2 bg-[#7b002c] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#9e1245] transition shadow self-start sm:self-auto cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-white" /> Add New Blog Post
            </button>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[800px]">
                <thead className="bg-[#4c050d] text-white uppercase text-[10px] tracking-wider border-b border-[#7b002c]">
                  <tr>
                    <th className="p-4">Cover</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Author</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date Created</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {blogsList.map((blog) => (
                    <tr key={blog.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                          <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover animate-fadeIn" />
                        </div>
                      </td>
                      <td className="p-4 font-bold text-slate-900 max-w-sm truncate" title={blog.title}>
                        {blog.title}
                      </td>
                      <td className="p-4 font-medium">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-300">
                          {blog.category}
                        </span>
                      </td>
                      <td className="p-4 font-medium text-slate-655">{blog.author}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleBlogPublishToggle(blog)}
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                            blog.published
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          {blog.published ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td className="p-4 text-slate-400 font-medium">
                        {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US') : 'N/A'}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleOpenEditBlogModal(blog)}
                            className="text-[#7b002c] hover:text-[#9e1245] font-bold text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="text-red-600 hover:text-red-800 font-bold text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards View */}
          <div className="block md:hidden space-y-3">
            {blogsList.map((blog) => (
              <div key={blog.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 line-clamp-1">{blog.title}</h4>
                      <span className="text-[10px] font-bold text-slate-500">{blog.category} • By {blog.author}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleBlogPublishToggle(blog)}
                    className={`text-[9px] font-bold px-2 py-0.5 rounded border whitespace-nowrap shrink-0 ${
                      blog.published
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-100 text-slate-650 border-slate-300'
                    }`}
                  >
                    {blog.published ? 'Published' : 'Draft'}
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-medium">
                    {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleOpenEditBlogModal(blog)}
                      className="text-[#7b002c] hover:text-[#9e1245] font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="text-red-600 hover:text-red-800 font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD BLOG MODAL */}
      {isAddBlogModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full overflow-hidden my-auto animate-fade-up">
            <div className="bg-[#7b002c] text-white p-5 flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg">Add New Blog Post</h3>
              <button 
                onClick={() => setIsAddBlogModalOpen(false)}
                className="text-white/80 hover:text-white text-xs font-semibold px-2.5 py-1 rounded bg-black/10 hover:bg-black/20 transition cursor-pointer"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreateBlog} className="p-6 space-y-4 max-h-[85vh] overflow-y-auto font-sans text-xs">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-12 space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Blog Title</label>
                  <input 
                    type="text" 
                    required
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    placeholder="e.g. Faisal Hills NOC Approval & NOC Updates"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-350 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="md:col-span-6 space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Category</label>
                  <select
                    value={blogCategory}
                    onChange={(e) => setBlogCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-355 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c] cursor-pointer"
                  >
                    <option value="Market Update">Market Update</option>
                    <option value="Development Update">Development Update</option>
                    <option value="Investment Guide">Investment Guide</option>
                    <option value="Project Launch">Project Launch</option>
                  </select>
                </div>

                <div className="md:col-span-6 space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Author</label>
                  <input 
                    type="text" 
                    value={blogAuthor}
                    onChange={(e) => setBlogAuthor(e.target.value)}
                    placeholder="e.g. Ubaid Khan"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-355 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="md:col-span-6 space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Read Time</label>
                  <input 
                    type="text" 
                    value={blogReadTime}
                    onChange={(e) => setBlogReadTime(e.target.value)}
                    placeholder="e.g. 4 min read"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-355 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="md:col-span-6 space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Cover Image URL</label>
                  <input 
                    type="text" 
                    value={blogImageUrl}
                    onChange={(e) => setBlogImageUrl(e.target.value)}
                    placeholder="e.g. https://images.unsplash.com/..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-355 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="md:col-span-12 space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Summary (Short Excerpt)</label>
                  <input 
                    type="text" 
                    value={blogSummary}
                    onChange={(e) => setBlogSummary(e.target.value)}
                    placeholder="Brief description summarizing this blog post..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-355 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="md:col-span-12 space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Article Content</label>
                  <RichTextEditor
                    value={blogContent}
                    onChange={setBlogContent}
                    placeholder="Start typing your article here... Highlight text to format like MS Word."
                  />
                </div>

                {/* FAQs Section */}
                <div className="md:col-span-12 border-t border-slate-100 pt-4 space-y-4 font-sans text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-sm text-[#7b002c]">Frequently Asked Questions (FAQ)</h4>
                    <button
                      type="button"
                      onClick={() => setBlogFaqs([...blogFaqs, { question: '', answer: '' }])}
                      className="px-3 py-1 bg-[#7b002c]/5 hover:bg-[#7b002c]/10 border border-[#7b002c]/20 text-[#7b002c] rounded-xl text-[10px] font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#7b002c]" />
                      <span>Add FAQ</span>
                    </button>
                  </div>
                  {blogFaqs.length === 0 ? (
                    <p className="text-[11px] text-slate-500 italic">No FAQs added yet for this article. Click &apos;Add FAQ&apos; to add one.</p>
                  ) : (
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                      {blogFaqs.map((faq, index) => (
                        <div key={index} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
                          <button
                            type="button"
                            onClick={() => setBlogFaqs(blogFaqs.filter((_, i) => i !== index))}
                            className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-[10px] font-bold cursor-pointer"
                          >
                            Remove
                          </button>
                          <div className="space-y-1 pr-12">
                            <label className="block text-[10px] font-bold text-slate-700">Question {index + 1}</label>
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) => {
                                const updated = [...blogFaqs];
                                updated[index].question = e.target.value;
                                setBlogFaqs(updated);
                              }}
                              placeholder="e.g. Can I book this plot from abroad?"
                              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[10px] font-bold text-slate-700">Answer {index + 1}</label>
                            <textarea
                              rows={2}
                              value={faq.answer}
                              onChange={(e) => {
                                const updated = [...blogFaqs];
                                updated[index].answer = e.target.value;
                                setBlogFaqs(updated);
                              }}
                              placeholder="e.g. Yes, the process is fully remote..."
                              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* SEO Sub-section */}
                <div className="md:col-span-12 border-t border-slate-100 pt-3 space-y-3">
                  <h4 className="font-serif font-bold text-sm text-[#7b002c]">SEO Optimization Meta Tags</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Meta Title</label>
                      <input 
                        type="text" 
                        value={blogMetaTitle}
                        onChange={(e) => setBlogMetaTitle(e.target.value)}
                        placeholder="Title for search engines"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Meta Keywords</label>
                      <input 
                        type="text" 
                        value={blogKeywords}
                        onChange={(e) => setBlogKeywords(e.target.value)}
                        placeholder="Comma-separated keywords"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Meta Description</label>
                      <textarea 
                        rows={2}
                        value={blogMetaDescription}
                        onChange={(e) => setBlogMetaDescription(e.target.value)}
                        placeholder="Summary description for Google search result snippets"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-12 flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="blogPublishedCheckbox"
                    checked={blogPublished}
                    onChange={(e) => setBlogPublished(e.target.checked)}
                    className="w-4 h-4 text-[#7b002c] border-slate-300 rounded"
                  />
                  <label htmlFor="blogPublishedCheckbox" className="text-xs font-bold text-slate-800 cursor-pointer">
                    Publish immediately (make visible on site)
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 font-sans">
                <button
                  type="button"
                  onClick={() => setIsAddBlogModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl shadow flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-white" />
                  <span>Create Post</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT BLOG MODAL */}
      {isEditBlogModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full overflow-hidden my-auto animate-fade-up">
            <div className="bg-[#7b002c] text-white p-5 flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg">Edit Blog Post</h3>
              <button 
                onClick={() => setIsEditBlogModalOpen(false)}
                className="text-white/80 hover:text-white text-xs font-semibold px-2.5 py-1 rounded bg-black/10 hover:bg-black/20 transition cursor-pointer"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleUpdateBlog} className="p-6 space-y-4 max-h-[85vh] overflow-y-auto font-sans text-xs">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-12 space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Blog Title</label>
                  <input 
                    type="text" 
                    required
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    placeholder="e.g. Faisal Hills NOC Approval & NOC Updates"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-355 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="md:col-span-6 space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Category</label>
                  <select
                    value={blogCategory}
                    onChange={(e) => setBlogCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-355 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c] cursor-pointer"
                  >
                    <option value="Market Update">Market Update</option>
                    <option value="Development Update">Development Update</option>
                    <option value="Investment Guide">Investment Guide</option>
                    <option value="Project Launch">Project Launch</option>
                  </select>
                </div>

                <div className="md:col-span-6 space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Author</label>
                  <input 
                    type="text" 
                    value={blogAuthor}
                    onChange={(e) => setBlogAuthor(e.target.value)}
                    placeholder="e.g. Ubaid Khan"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-355 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="md:col-span-6 space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Read Time</label>
                  <input 
                    type="text" 
                    value={blogReadTime}
                    onChange={(e) => setBlogReadTime(e.target.value)}
                    placeholder="e.g. 4 min read"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-355 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="md:col-span-6 space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Cover Image URL</label>
                  <input 
                    type="text" 
                    value={blogImageUrl}
                    onChange={(e) => setBlogImageUrl(e.target.value)}
                    placeholder="e.g. https://images.unsplash.com/..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-355 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="md:col-span-12 space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Summary (Short Excerpt)</label>
                  <input 
                    type="text" 
                    value={blogSummary}
                    onChange={(e) => setBlogSummary(e.target.value)}
                    placeholder="Brief description summarizing this blog post..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-355 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="md:col-span-12 space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Article Content</label>
                  <RichTextEditor
                    value={blogContent}
                    onChange={setBlogContent}
                    placeholder="Start typing your article here... Highlight text to format like MS Word."
                  />
                </div>

                {/* FAQs Section */}
                <div className="md:col-span-12 border-t border-slate-100 pt-4 space-y-4 font-sans text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-sm text-[#7b002c]">Frequently Asked Questions (FAQ)</h4>
                    <button
                      type="button"
                      onClick={() => setBlogFaqs([...blogFaqs, { question: '', answer: '' }])}
                      className="px-3 py-1 bg-[#7b002c]/5 hover:bg-[#7b002c]/10 border border-[#7b002c]/20 text-[#7b002c] rounded-xl text-[10px] font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#7b002c]" />
                      <span>Add FAQ</span>
                    </button>
                  </div>
                  {blogFaqs.length === 0 ? (
                    <p className="text-[11px] text-slate-500 italic">No FAQs added yet for this article. Click &apos;Add FAQ&apos; to add one.</p>
                  ) : (
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                      {blogFaqs.map((faq, index) => (
                        <div key={index} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
                          <button
                            type="button"
                            onClick={() => setBlogFaqs(blogFaqs.filter((_, i) => i !== index))}
                            className="absolute top-2 right-2 text-red-650 hover:text-red-800 text-[10px] font-bold cursor-pointer"
                          >
                            Remove
                          </button>
                          <div className="space-y-1 pr-12">
                            <label className="block text-[10px] font-bold text-slate-700">Question {index + 1}</label>
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) => {
                                const updated = [...blogFaqs];
                                updated[index].question = e.target.value;
                                setBlogFaqs(updated);
                              }}
                              placeholder="e.g. Can I book this plot from abroad?"
                              className="w-full px-3 py-1.5 bg-white border border-slate-355 rounded-lg text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[10px] font-bold text-slate-700">Answer {index + 1}</label>
                            <textarea
                              rows={2}
                              value={faq.answer}
                              onChange={(e) => {
                                const updated = [...blogFaqs];
                                updated[index].answer = e.target.value;
                                setBlogFaqs(updated);
                              }}
                              placeholder="e.g. Yes, the process is fully remote..."
                              className="w-full px-3 py-1.5 bg-white border border-slate-355 rounded-lg text-xs"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* SEO Sub-section */}
                <div className="md:col-span-12 border-t border-slate-100 pt-3 space-y-3">
                  <h4 className="font-serif font-bold text-sm text-[#7b002c]">SEO Optimization Meta Tags</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Meta Title</label>
                      <input 
                        type="text" 
                        value={blogMetaTitle}
                        onChange={(e) => setBlogMetaTitle(e.target.value)}
                        placeholder="Title for search engines"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Meta Keywords</label>
                      <input 
                        type="text" 
                        value={blogKeywords}
                        onChange={(e) => setBlogKeywords(e.target.value)}
                        placeholder="Comma-separated keywords"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Meta Description</label>
                      <textarea 
                        rows={2}
                        value={blogMetaDescription}
                        onChange={(e) => setBlogMetaDescription(e.target.value)}
                        placeholder="Summary description for Google search result snippets"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-12 flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="blogEditPublishedCheckbox"
                    checked={blogPublished}
                    onChange={(e) => setBlogPublished(e.target.checked)}
                    className="w-4 h-4 text-[#7b002c] border-slate-300 rounded"
                  />
                  <label htmlFor="blogEditPublishedCheckbox" className="text-xs font-bold text-slate-800 cursor-pointer">
                    Published (make visible on site)
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 font-sans">
                <button
                  type="button"
                  onClick={() => setIsEditBlogModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl shadow flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 text-white" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

