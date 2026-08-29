'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, ShieldCheck, MapPin, Database, CheckCircle2, Edit, Save, 
  Trash2, Plus, Users, DollarSign, Calendar, Eye, Layers, ArrowUpRight, ArrowLeft,
  Lock, KeyRound, LogOut, Shield, Globe, Search, Share2, Code, FileText, Camera, Image as ImageIcon,
  CreditCard, BookOpen, PhoneCall, ExternalLink, Sparkles, Edit3, RefreshCw, AlertCircle, X,
  Loader2
} from 'lucide-react';
import RichTextEditor from '@/components/ui/RichTextEditor';
import {
  formatPKR,
  formatPriceRange,
  BLOCK_SERIES_CONFIGS,
  calculateSeriesGroups,
  SeriesConfig,
  SeriesGroupResult,
  BlockConfig,
  PlotItem as EnginePlotItem,
  getStandardDimensionsForSize,
} from '@/utils/plotSeriesEngine';
import {
  getStoredPlots,
  getStoredBlockConfigs,
  saveStoredBlockConfigs,
  updateSeriesConfig,
  addSeriesConfig,
  deleteSeriesConfig,
  resetSeriesConfigsToDefault,
  addOrUpdatePlot,
  updatePlotPrice,
  deletePlot,
} from '@/utils/plotStore';
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
  formatPlotPrice,
  defaultContactInfo,
  fetchSettingByKey
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

export default function AdminLoginPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('ubaid');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [token, setToken] = useState<string | null>(null);

  // Dashboard states
  const [activeTab, setActiveTab] = useState<'series' | 'plots' | 'blocks' | 'legal' | 'accounts' | 'verification' | 'leads' | 'seo' | 'gallery' | 'blogs'>('series');
  const [plots, setPlots] = useState<PlotItem[]>([]);
  const [plotFilterBlock, setPlotFilterBlock] = useState<string>('all');
  const [plotSearchQuery, setPlotSearchQuery] = useState<string>('');

  // Series & Block Price Engine State
  const [seriesBlockConfigs, setSeriesBlockConfigs] = useState<Record<string, BlockConfig>>(BLOCK_SERIES_CONFIGS);
  const [selectedSeriesBlock, setSelectedSeriesBlock] = useState<string>('block-a');
  const [selectedSeriesSize, setSelectedSeriesSize] = useState<string>('5 Marla');
  const [isSeriesModalOpen, setIsSeriesModalOpen] = useState<boolean>(false);
  const [editingSeries, setEditingSeries] = useState<{
    seriesKey: string;
    start: number;
    end: number;
    label: string;
    tag: string;
    minPrice: string;
    maxPrice: string;
  } | null>(null);

  const [isAddSeriesModalOpen, setIsAddSeriesModalOpen] = useState<boolean>(false);
  const [newSeriesData, setNewSeriesData] = useState<{
    start: string;
    end: string;
    label: string;
    tag: string;
    minPrice: string;
    maxPrice: string;
  }>({
    start: '',
    end: '',
    label: '',
    tag: '',
    minPrice: '',
    maxPrice: '',
  });

  const [quickEditPlot, setQuickEditPlot] = useState<{
    id: string;
    plotNumber: string;
    price: string;
    size: string;
    blockSlug: string;
    locationType: string;
  } | null>(null);
  const [isQuickEditPlotOpen, setIsQuickEditPlotOpen] = useState<boolean>(false);

  const [isQuickAddPlotOpen, setIsQuickAddPlotOpen] = useState<boolean>(false);
  const [quickAddPlotData, setQuickAddPlotData] = useState<{
    plotNumber: string;
    price: string;
    locationType: string;
    size: string;
    blockSlug: string;
  }>({
    plotNumber: '',
    price: '',
    locationType: 'Standard',
    size: '5 Marla',
    blockSlug: 'executive-block',
  });

  const [verifiedDate, setVerifiedDate] = useState(societyStats.lastVerifiedDate);
  const [leadsList, setLeadsList] = useState<LeadItem[]>(initialLeadsData);
  const [saveNotification, setSaveNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('Changes successfully published to live database!');

  // Blocks Manager State
  const [blocksList, setBlocksList] = useState<BlockInfo[]>(blocksData);
  const [selectedBlockSlug, setSelectedBlockSlug] = useState<string>('executive-block');
  const [editingBlock, setEditingBlock] = useState<Partial<BlockInfo>>({ ...blocksData[0] });
  const [galleryPickerTarget, setGalleryPickerTarget] = useState<'hero' | 'masterPlan' | null>(null);
  const [newHighlightText, setNewHighlightText] = useState<string>('');
  const [isSavingBlock, setIsSavingBlock] = useState<boolean>(false);

  // Legal Policies State
  const [termsOfService, setTermsOfService] = useState<LegalPolicyData>(defaultTermsOfService);
  const [privacyPolicy, setPrivacyPolicy] = useState<LegalPolicyData>(defaultPrivacyPolicy);
  const [legalSubTab, setLegalSubTab] = useState<'terms' | 'privacy'>('terms');
  const [isSavingLegal, setIsSavingLegal] = useState<boolean>(false);

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
  const [blogFocusKeyword, setBlogFocusKeyword] = useState('');
  const [blogFaqs, setBlogFaqs] = useState<{ question: string; answer: string }[]>([]);
  const [isBlogCoverGalleryOpen, setIsBlogCoverGalleryOpen] = useState(false);


  // Plot Filters & Modals
  const [plotFilterType, setPlotFilterType] = useState<string>('all');
  const [isAddPlotModalOpen, setIsAddPlotModalOpen] = useState(false);
  const [isEditPlotModalOpen, setIsEditPlotModalOpen] = useState(false);
  const [editingPlot, setEditingPlot] = useState<PlotItem | null>(null);
  const [plotToDelete, setPlotToDelete] = useState<PlotItem | null>(null);

  // Form states for Add / Edit
  const [plotForm, setPlotForm] = useState({
    plotNumber: '',
    blockSlug: 'block-a',
    propertyType: 'Residential' as 'Residential' | 'Commercial',
    category: 'Residential',
    size: '5 Marla',
    dimensions: '25 × 50 ft',
    price: '',
    priceUnit: 'Total Price',
    status: 'Available',
    facing: 'Standard',
    street: '',
    description: '',
    featured: false,
    displayOrder: 0,
    image: ''
  });


  // Photo Gallery State
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(initialGalleryData);
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoAlt, setNewPhotoAlt] = useState('');
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
    setSeriesBlockConfigs(getStoredBlockConfigs());

    const handleConfigsUpdate = () => {
      setSeriesBlockConfigs(getStoredBlockConfigs());
    };
    window.addEventListener('fh_series_configs_updated', handleConfigsUpdate);
    window.addEventListener('fh_plots_updated', handleConfigsUpdate);
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

    // Check localStorage cache first for immediate responsiveness
    if (typeof window !== 'undefined') {
      const cachedTerms = localStorage.getItem('faisal_terms_of_service');
      if (cachedTerms) {
        try {
          const parsed = JSON.parse(cachedTerms);
          if (parsed && parsed.sections) setTermsOfService(parsed);
        } catch (e) {}
      }
      const cachedPrivacy = localStorage.getItem('faisal_privacy_policy');
      if (cachedPrivacy) {
        try {
          const parsed = JSON.parse(cachedPrivacy);
          if (parsed && parsed.sections) setPrivacyPolicy(parsed);
        } catch (e) {}
      }
    }

    fetchSettingByKey<LegalPolicyData>('terms_of_service').then(data => {
      if (data && data.sections) {
        setTermsOfService(data);
        if (typeof window !== 'undefined') {
          localStorage.setItem('faisal_terms_of_service', JSON.stringify(data));
        }
      }
    }).catch(console.error);
    fetchSettingByKey<LegalPolicyData>('privacy_policy').then(data => {
      if (data && data.sections) {
        setPrivacyPolicy(data);
        if (typeof window !== 'undefined') {
          localStorage.setItem('faisal_privacy_policy', JSON.stringify(data));
        }
      }
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
      alt: newPhotoAlt || newPhotoTitle,
      category: newPhotoCategory,
      imageUrl: newPhotoUrl,
      description: newPhotoDescription
    }, token)
      .then(newItem => {
        setGalleryList(prev => [newItem, ...prev]);
        setNewPhotoTitle('');
        setNewPhotoAlt('');
        setNewPhotoUrl('');
        setNewPhotoDescription('');
        setSaveNotification(true);
        setTimeout(() => setSaveNotification(false), 3000);
        if (typeof window !== 'undefined') {
          const current = [newItem, ...galleryList];
          localStorage.setItem('faisal_gallery_data', JSON.stringify(current));
          window.dispatchEvent(new Event('faisal_gallery_updated'));
        }
      })
      .catch(err => {
        console.error("Failed to add photo:", err);
      });
  };

  const handleOpenAddPlot = () => {
    setPlotForm({
      plotNumber: '',
      blockSlug: 'block-a',
      propertyType: 'Residential',
      category: 'Residential',
      size: '5 Marla',
      dimensions: '25 × 50 ft',
      price: '',
      priceUnit: 'Total Price',
      status: 'Available',
      facing: 'Standard',
      street: '',
      description: '',
      featured: false,
      displayOrder: 0,
      image: ''
    });
    setIsAddPlotModalOpen(true);
  };

  const handleCreatePlotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      alert('Please log in as admin to add a plot.');
      return;
    }

    const block = blocksList.find(b => b.slug === plotForm.blockSlug) || blocksData.find(b => b.slug === plotForm.blockSlug) || blocksData[0];
    let numericPrice: number | null = null;
    if (plotForm.price.trim() !== '') {
      const val = Number(plotForm.price);
      if (!isNaN(val) && val > 0) {
        if (val < 1000) {
          if (val <= 20 && !Number.isInteger(val)) {
            numericPrice = val * 10000000;
          } else {
            numericPrice = val * 100000;
          }
        } else {
          numericPrice = val;
        }
      }
    }

    const plotData: Partial<PlotItem> = {
      plotNumber: plotForm.plotNumber.trim() || undefined,
      blockSlug: plotForm.blockSlug,
      blockName: block.name,
      propertyType: plotForm.propertyType,
      category: plotForm.propertyType,
      size: plotForm.size.trim(),
      dimensions: plotForm.dimensions.trim() || 'Dimension not provided',
      price: numericPrice,
      priceUnit: plotForm.priceUnit,
      status: plotForm.status,
      facing: plotForm.facing,
      street: plotForm.street.trim() || undefined,
      description: plotForm.description.trim() || undefined,
      image: plotForm.image.trim() || undefined,
      featured: plotForm.featured,
      displayOrder: Number(plotForm.displayOrder) || 0
    };

    try {
      const newPlot = await apiCreatePlot(plotData, token);
      setPlots(prev => [newPlot, ...prev]);
      setIsAddPlotModalOpen(false);
      setNotificationMsg('New plot listing added successfully.');
      setSaveNotification(true);
      setTimeout(() => setSaveNotification(false), 3000);
    } catch (err) {
      console.error('Failed to add plot:', err);
      alert('Failed to create plot listing. Please verify inputs.');
    }
  };

  const handleOpenEditPlot = (plot: PlotItem) => {
    setEditingPlot(plot);
    setPlotForm({
      plotNumber: plot.plotNumber || '',
      blockSlug: plot.blockSlug || 'block-a',
      propertyType: (plot.propertyType || (plot.category === 'Commercial' ? 'Commercial' : 'Residential')) as 'Residential' | 'Commercial',
      category: plot.category || 'Residential',
      size: plot.size || '',
      dimensions: plot.dimensions || 'Dimension not provided',
      price: plot.price !== null && plot.price !== undefined ? plot.price.toString() : '',
      priceUnit: plot.priceUnit || 'Total Price',
      status: plot.status || 'Available',
      facing: plot.facing || 'Standard',
      street: plot.street || '',
      description: plot.description || '',
      featured: !!plot.featured,
      displayOrder: plot.displayOrder || 0,
      image: plot.image || ''
    });
    setIsEditPlotModalOpen(true);
  };

  const handleUpdatePlotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlot || !token) return;

    const block = blocksList.find(b => b.slug === plotForm.blockSlug) || blocksData.find(b => b.slug === plotForm.blockSlug) || blocksData[0];
    let numericPrice: number | null = null;
    if (plotForm.price.trim() !== '') {
      const val = Number(plotForm.price);
      if (!isNaN(val) && val > 0) {
        if (val < 1000) {
          if (val <= 20 && !Number.isInteger(val)) {
            numericPrice = val * 10000000;
          } else {
            numericPrice = val * 100000;
          }
        } else {
          numericPrice = val;
        }
      }
    }

    const updatedData: Partial<PlotItem> = {
      plotNumber: plotForm.plotNumber.trim() || undefined,
      blockSlug: plotForm.blockSlug,
      blockName: block.name,
      propertyType: plotForm.propertyType,
      category: plotForm.propertyType,
      size: plotForm.size.trim(),
      dimensions: plotForm.dimensions.trim() || 'Dimension not provided',
      price: numericPrice,
      priceUnit: plotForm.priceUnit,
      status: plotForm.status,
      facing: plotForm.facing,
      street: plotForm.street.trim() || undefined,
      description: plotForm.description.trim() || undefined,
      image: plotForm.image.trim() || undefined,
      featured: plotForm.featured,
      displayOrder: Number(plotForm.displayOrder) || 0
    };

    try {
      const savedPlot = await apiUpdatePlot(editingPlot.id, updatedData, token);
      setPlots(prev => prev.map(p => p.id === editingPlot.id ? savedPlot : p));
      setIsEditPlotModalOpen(false);
      setEditingPlot(null);
      setNotificationMsg('Plot listing updated successfully.');
      setSaveNotification(true);
      setTimeout(() => setSaveNotification(false), 3000);
    } catch (err) {
      console.error('Failed to update plot:', err);
      alert('Failed to update plot. Please check inputs.');
    }
  };

  const handleConfirmDeletePlot = async () => {
    if (!plotToDelete || !token) return;
    try {
      await apiDeletePlot(plotToDelete.id, token);
      setPlots(prev => prev.filter(p => p.id !== plotToDelete.id));
      setPlotToDelete(null);
      setNotificationMsg('Plot removed successfully.');
      setSaveNotification(true);
      setTimeout(() => setSaveNotification(false), 3000);
    } catch (err) {
      console.error('Failed to delete plot:', err);
      alert('Failed to delete plot.');
    }
  };

  const handleDeletePhoto = (id: string) => {
    if (!token) return;
    if (!confirm('Are you sure you want to delete this photo from the gallery?')) return;
    apiDeleteGalleryItem(id, token)
      .then(() => {
        setGalleryList(prev => {
          const updated = prev.filter(item => item.id !== id);
          if (typeof window !== 'undefined') {
            localStorage.setItem('faisal_gallery_data', JSON.stringify(updated));
            window.dispatchEvent(new Event('faisal_gallery_updated'));
          }
          return updated;
        });
        setSaveNotification(true);
        setTimeout(() => setSaveNotification(false), 3000);
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

  const safeSaveBlocksLocally = (block: Partial<BlockInfo>) => {
    try {
      if (typeof window !== 'undefined') {
        const existing = JSON.parse(localStorage.getItem('faisal_blocks_custom_v1') || '{}');
        existing[block.slug || ''] = block;
        localStorage.setItem('faisal_blocks_custom_v1', JSON.stringify(existing));
        window.dispatchEvent(new Event('faisal_blocks_updated'));
      }
    } catch (e) {
      console.warn("Local storage quota exceeded for block images; saving lightweight metadata cache.");
      try {
        if (typeof window !== 'undefined') {
          const existing = JSON.parse(localStorage.getItem('faisal_blocks_custom_v1') || '{}');
          const lightweight = {
            ...block,
            heroImage: block.heroImage?.startsWith('data:') ? '' : block.heroImage,
            masterPlanImage: block.masterPlanImage?.startsWith('data:') ? '' : block.masterPlanImage
          };
          existing[block.slug || ''] = lightweight;
          localStorage.setItem('faisal_blocks_custom_v1', JSON.stringify(existing));
          window.dispatchEvent(new Event('faisal_blocks_updated'));
        }
      } catch (innerErr) {
        // Safe failover - backend database stores the full image
      }
    }
  };

  const handleSaveBlock = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!editingBlock) return;
    setIsSavingBlock(true);
    
    const activeToken = token || (typeof window !== 'undefined' ? sessionStorage.getItem('faisal_admin_token') : null) || '';

    // 1. Update local state
    setBlocksList(prev => prev.map(b => (b.slug === editingBlock.slug || (editingBlock.id && b.id === editingBlock.id)) ? { ...b, ...editingBlock } as BlockInfo : b));

    // 2. Safe local persistence (guarded against 5MB quota errors)
    safeSaveBlocksLocally(editingBlock);

    // 3. Backend database update via Laravel API
    if (activeToken) {
      try {
        const identifier = editingBlock.slug || editingBlock.id || '';
        if (identifier) {
          const updated = await apiUpdateBlock(identifier, editingBlock, activeToken);
          setBlocksList(prev => prev.map(b => (b.id === updated.id || b.slug === updated.slug) ? updated : b));
          setEditingBlock(updated);
        }
      } catch (e) {
        console.error('API block update error, saved locally:', e);
      }
    }

    setIsSavingBlock(false);
    setNotificationMsg(`Block "${editingBlock.name}" updated and published successfully!`);
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 3500);
  };

  const handleAddHighlight = () => {
    if (!newHighlightText.trim()) return;
    const current = editingBlock?.highlights || [];
    setEditingBlock(prev => ({
      ...prev,
      highlights: [...current, newHighlightText.trim()]
    }));
    setNewHighlightText('');
  };

  const handleRemoveHighlight = (index: number) => {
    const current = editingBlock?.highlights || [];
    setEditingBlock(prev => ({
      ...prev,
      highlights: current.filter((_, i) => i !== index)
    }));
  };

  const handleSaveLegalPolicies = async () => {
    const activeToken = token || (typeof window !== 'undefined' ? sessionStorage.getItem('faisal_admin_token') : null) || '';
    setIsSavingLegal(true);
    try {
      if (activeToken) {
        // Save both to database to ensure all clauses are synced simultaneously
        await Promise.all([
          apiUpdateSetting('terms_of_service', termsOfService, activeToken),
          apiUpdateSetting('privacy_policy', privacyPolicy, activeToken)
        ]);
      }

      // Persist to local cache for instant UI availability
      if (typeof window !== 'undefined') {
        localStorage.setItem('faisal_terms_of_service', JSON.stringify(termsOfService));
        localStorage.setItem('faisal_privacy_policy', JSON.stringify(privacyPolicy));
        window.dispatchEvent(new Event('faisal_legal_policies_updated'));
      }

      const msg = legalSubTab === 'terms'
        ? 'Terms of Service policy updated and published live in database!'
        : 'Privacy Policy updated and published live in database!';
      setNotificationMsg(msg);
      setSaveNotification(true);
      setTimeout(() => setSaveNotification(false), 3500);
    } catch (e) {
      console.error("Error saving legal policies:", e);
      // Fallback local persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('faisal_terms_of_service', JSON.stringify(termsOfService));
        localStorage.setItem('faisal_privacy_policy', JSON.stringify(privacyPolicy));
        window.dispatchEvent(new Event('faisal_legal_policies_updated'));
      }
      setNotificationMsg('Policy saved and updated locally.');
      setSaveNotification(true);
      setTimeout(() => setSaveNotification(false), 3500);
    } finally {
      setIsSavingLegal(false);
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

      if (typeof window !== 'undefined') {
        localStorage.setItem('faisal_social_links', JSON.stringify(socialLinks));
        localStorage.setItem('faisal_contact_info', JSON.stringify(contactInfo));
        localStorage.setItem('faisal_bank_accounts', JSON.stringify(bankAccounts));
        window.dispatchEvent(new Event('faisal_contact_updated'));
      }

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

  const safeSaveBlogsLocally = (blogs: BlogItem[]) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('faisal_blogs_custom', JSON.stringify(blogs));
        window.dispatchEvent(new Event('faisal_blogs_updated'));
      }
    } catch (e) {
      // In case high-res base64 images exceed browser's 5MB localStorage quota
      try {
        const lightweight = blogs.map(b => ({
          ...b,
          content: b.content && b.content.length > 5000 ? b.content.slice(0, 5000) : b.content,
          imageUrl: b.imageUrl && b.imageUrl.startsWith('data:image') ? '' : b.imageUrl
        }));
        localStorage.setItem('faisal_blogs_custom', JSON.stringify(lightweight));
      } catch {}
      window.dispatchEvent(new Event('faisal_blogs_updated'));
    }
  };

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim() || !blogContent.trim()) {
      alert('Please provide both Blog Title and Article Content.');
      return;
    }

    const activeToken = token || (typeof window !== 'undefined' ? sessionStorage.getItem('faisal_admin_token') : null) || '';

    const blogPayload: Partial<BlogItem> = {
      title: blogTitle.trim(),
      content: blogContent,
      summary: blogSummary.trim() || undefined,
      imageUrl: blogImageUrl.trim() || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
      author: blogAuthor || 'Admin',
      category: blogCategory || 'Market Update',
      readTime: blogReadTime || '3 min read',
      published: blogPublished,
      metaTitle: blogMetaTitle.trim() || blogTitle.trim(),
      metaDescription: blogMetaDescription.trim() || blogSummary.trim() || undefined,
      keywords: blogKeywords.trim() || undefined,
      focusKeyword: blogFocusKeyword.trim() || undefined,
      faqs: blogFaqs
    };

    try {
      let createdBlog: BlogItem;
      if (activeToken) {
        createdBlog = await apiCreateBlog(blogPayload, activeToken);
      } else {
        createdBlog = {
          id: `blog-${Date.now()}`,
          slug: blogTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          title: blogTitle,
          content: blogContent,
          summary: blogSummary || '',
          imageUrl: blogImageUrl || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
          author: blogAuthor,
          category: blogCategory,
          readTime: blogReadTime,
          published: blogPublished,
          metaTitle: blogMetaTitle || blogTitle,
          metaDescription: blogMetaDescription || blogSummary || '',
          keywords: blogKeywords || '',
          focusKeyword: blogFocusKeyword || '',
          faqs: blogFaqs,
          createdAt: new Date().toISOString()
        };
      }

      setBlogsList(prev => {
        const updated = [createdBlog, ...prev.filter(b => b.id !== createdBlog.id)];
        safeSaveBlogsLocally(updated);
        return updated;
      });
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
      setBlogFocusKeyword('');
      setBlogFaqs([]);

      setNotificationMsg(`Blog post "${createdBlog.title}" published successfully!`);
      setSaveNotification(true);
      setTimeout(() => setSaveNotification(false), 3500);
    } catch (err: any) {
      console.error("Failed to create blog post via API:", err);
      // Fallback save to state
      const fallbackBlog: BlogItem = {
        id: `blog-${Date.now()}`,
        slug: blogTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        title: blogTitle,
        content: blogContent,
        summary: blogSummary || '',
        imageUrl: blogImageUrl || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
        author: blogAuthor,
        category: blogCategory,
        readTime: blogReadTime,
        published: blogPublished,
        metaTitle: blogMetaTitle || blogTitle,
        metaDescription: blogMetaDescription || blogSummary || '',
        keywords: blogKeywords || '',
        focusKeyword: blogFocusKeyword || '',
        faqs: blogFaqs,
        createdAt: new Date().toISOString()
      };
      setBlogsList(prev => {
        const updated = [fallbackBlog, ...prev.filter(b => b.id !== fallbackBlog.id)];
        safeSaveBlogsLocally(updated);
        return updated;
      });
      setIsAddBlogModalOpen(false);
      setNotificationMsg(`Blog post "${fallbackBlog.title}" published successfully!`);
      setSaveNotification(true);
      setTimeout(() => setSaveNotification(false), 3500);
    }
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
    setBlogFocusKeyword(blog.focusKeyword || '');
    setBlogFaqs(blog.faqs || []);
    setIsEditBlogModalOpen(true);
  };

  const handleUpdateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlogId || !blogTitle || !blogContent) return;

    const activeToken = token || (typeof window !== 'undefined' ? sessionStorage.getItem('faisal_admin_token') : null) || '';

    const updatePayload: Partial<BlogItem> = {
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
      focusKeyword: blogFocusKeyword || undefined,
      faqs: blogFaqs
    };

    try {
      let updatedBlog: BlogItem;
      if (activeToken) {
        updatedBlog = await apiUpdateBlog(editingBlogId, updatePayload, activeToken);
      } else {
        const found = blogsList.find(b => b.id === editingBlogId);
        updatedBlog = {
          ...(found || {}),
          ...updatePayload,
          id: editingBlogId,
          slug: found?.slug || blogTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          title: blogTitle,
          content: blogContent,
          summary: blogSummary || '',
          imageUrl: blogImageUrl || '',
          author: blogAuthor,
          category: blogCategory,
          readTime: blogReadTime,
          published: blogPublished,
          metaTitle: blogMetaTitle || blogTitle,
          metaDescription: blogMetaDescription || blogSummary || '',
          keywords: blogKeywords || '',
          faqs: blogFaqs
        } as BlogItem;
      }

      setBlogsList(prev => {
        const updated = prev.map(b => b.id === editingBlogId ? updatedBlog : b);
        safeSaveBlogsLocally(updated);
        return updated;
      });
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
      setBlogFocusKeyword('');
      setBlogFaqs([]);

      setNotificationMsg(`Blog post "${updatedBlog.title}" updated successfully!`);
      setSaveNotification(true);
      setTimeout(() => setSaveNotification(false), 3500);
    } catch (err: any) {
      console.error("Failed to update blog post via API:", err);
      const found = blogsList.find(b => b.id === editingBlogId);
      const fallbackUpdated: BlogItem = {
        ...(found || {}),
        ...updatePayload,
        id: editingBlogId,
        slug: found?.slug || blogTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        title: blogTitle,
        content: blogContent,
        summary: blogSummary || '',
        imageUrl: blogImageUrl || '',
        author: blogAuthor,
        category: blogCategory,
        readTime: blogReadTime,
        published: blogPublished,
        metaTitle: blogMetaTitle || blogTitle,
        metaDescription: blogMetaDescription || blogSummary || '',
        keywords: blogKeywords || '',
        faqs: blogFaqs
      } as BlogItem;

      setBlogsList(prev => {
        const updated = prev.map(b => b.id === editingBlogId ? fallbackUpdated : b);
        safeSaveBlogsLocally(updated);
        return updated;
      });
      setIsEditBlogModalOpen(false);
      setEditingBlogId(null);
      setNotificationMsg(`Blog post "${fallbackUpdated.title}" updated successfully!`);
      setSaveNotification(true);
      setTimeout(() => setSaveNotification(false), 3500);
    }
  };

  const handleDeleteBlog = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    const activeToken = token || (typeof window !== 'undefined' ? sessionStorage.getItem('faisal_admin_token') : null) || '';
    
    setBlogsList(prev => {
      const updated = prev.filter(b => b.id !== id);
      safeSaveBlogsLocally(updated);
      return updated;
    });

    if (activeToken) {
      apiDeleteBlog(id, activeToken).catch(err => console.error("Failed to delete blog via API:", err));
    }
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 3000);
  };

  const handleBlogPublishToggle = (blog: BlogItem) => {
    const nextPublished = !blog.published;
    const activeToken = token || (typeof window !== 'undefined' ? sessionStorage.getItem('faisal_admin_token') : null) || '';
    
    setBlogsList(prev => {
      const updated = prev.map(b => b.id === blog.id ? { ...b, published: nextPublished } : b);
      safeSaveBlogsLocally(updated);
      return updated;
    });

    if (activeToken) {
      apiUpdateBlog(blog.id, { published: nextPublished }, activeToken).catch(err => {
        console.error("Failed to toggle publish status on backend:", err);
      });
    }
  };

  // -------------------------------------------------------------
  // SERIES MANAGEMENT HANDLERS
  // -------------------------------------------------------------
  const allBlocksList = [
    { slug: 'executive-block', name: 'Executive Block' },
    { slug: 'block-a', name: 'Block A' },
    { slug: 'block-b', name: 'Block B' },
    { slug: 'block-b1-extension', name: 'Block B-1 Extension' },
    { slug: 'block-c', name: 'Block C' },
    { slug: 'block-d', name: 'Block D' },
  ];

  const allPlotSizes = ['5 Marla', '8 Marla', '10 Marla', '14 Marla', '1 Kanal', '2 Kanal'];

  const currentSeriesBlockName = allBlocksList.find(b => b.slug === selectedSeriesBlock)?.name || 'Block A';

  const currentSeriesGroups: SeriesGroupResult[] = calculateSeriesGroups(
    [...getStoredPlots(), ...plots],
    selectedSeriesBlock,
    selectedSeriesSize,
    seriesBlockConfigs
  );

  const handleOpenEditSeries = (series: SeriesGroupResult) => {
    const rawMin = series.minPrice > 0 ? series.minPrice.toString() : '';
    const rawMax = series.maxPrice > 0 ? series.maxPrice.toString() : '';

    setEditingSeries({
      seriesKey: series.seriesKey,
      start: series.rangeStart,
      end: series.rangeEnd,
      label: series.label,
      tag: series.tag || '',
      minPrice: rawMin,
      maxPrice: rawMax,
    });
    setIsSeriesModalOpen(true);
  };

  const handleSaveSeries = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSeries) return;

    const minP = parseFloat(editingSeries.minPrice) || 0;
    const maxP = parseFloat(editingSeries.maxPrice) || minP;

    if (minP < 0 || maxP < 0) {
      alert('Prices cannot be negative.');
      return;
    }

    const updated = updateSeriesConfig(selectedSeriesBlock, selectedSeriesSize, editingSeries.seriesKey, {
      tag: editingSeries.tag,
      label: editingSeries.label,
      minPrice: minP,
      maxPrice: maxP,
    });

    setSeriesBlockConfigs(updated);
    setIsSeriesModalOpen(false);
    setNotificationMsg(`Series ${editingSeries.label} in ${currentSeriesBlockName} (${selectedSeriesSize}) updated to ${formatPriceRange(minP, maxP)}!`);
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 3500);
  };

  const handleOpenAddSeries = () => {
    setNewSeriesData({
      start: '',
      end: '',
      label: '',
      tag: 'Sector Boulevard Front',
      minPrice: '5800000',
      maxPrice: '6800000',
    });
    setIsAddSeriesModalOpen(true);
  };

  const handleSaveNewSeries = (e: React.FormEvent) => {
    e.preventDefault();
    const startNum = parseInt(newSeriesData.start, 10);
    const endNum = parseInt(newSeriesData.end, 10);
    const minP = parseFloat(newSeriesData.minPrice) || 0;
    const maxP = parseFloat(newSeriesData.maxPrice) || minP;

    if (isNaN(startNum) || isNaN(endNum) || startNum <= 0 || endNum < startNum) {
      alert('Please enter valid start and end plot numbers (e.g. Start: 401, End: 600).');
      return;
    }

    const label = newSeriesData.label.trim() || `${startNum}–${endNum}`;
    const newConfig: SeriesConfig = {
      start: startNum,
      end: endNum,
      label,
      tag: newSeriesData.tag || 'Sector Avenue',
      minPrice: minP,
      maxPrice: maxP,
    };

    const updated = addSeriesConfig(selectedSeriesBlock, selectedSeriesSize, newConfig);
    setSeriesBlockConfigs(updated);

    updateSeriesConfig(selectedSeriesBlock, selectedSeriesSize, `${startNum}-${endNum}`, {
      minPrice: minP,
      maxPrice: maxP,
      tag: newConfig.tag,
    });

    setIsAddSeriesModalOpen(false);
    setNotificationMsg(`New Series ${label} added to ${currentSeriesBlockName} (${selectedSeriesSize})!`);
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 3500);
  };

  const handleDeleteSeries = (seriesKey: string, label: string) => {
    if (window.confirm(`Are you sure you want to delete Series ${label} from ${currentSeriesBlockName} (${selectedSeriesSize})?`)) {
      const updated = deleteSeriesConfig(selectedSeriesBlock, selectedSeriesSize, seriesKey);
      setSeriesBlockConfigs(updated);
      setNotificationMsg(`Series ${label} deleted.`);
      setSaveNotification(true);
      setTimeout(() => setSaveNotification(false), 3500);
    }
  };

  const handleResetAllSeries = () => {
    if (window.confirm('Reset all block series configurations & prices to defaults? Custom series edits will be reset.')) {
      const reset = resetSeriesConfigsToDefault();
      setSeriesBlockConfigs(reset);
      setNotificationMsg('All Block Series reset to default configurations.');
      setSaveNotification(true);
      setTimeout(() => setSaveNotification(false), 3500);
    }
  };

  const handleOpenQuickEditPlot = (plot: EnginePlotItem) => {
    setQuickEditPlot({
      id: plot.id,
      plotNumber: String(plot.plotNumber),
      price: String(plot.price),
      size: plot.size,
      blockSlug: plot.blockSlug,
      locationType: plot.locationType || 'Standard',
    });
    setIsQuickEditPlotOpen(true);
  };

  const handleSaveQuickEditPlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickEditPlot) return;
    const pNum = parseInt(quickEditPlot.plotNumber, 10);
    const pPrice = parseFloat(quickEditPlot.price);

    if (isNaN(pNum) || pNum <= 0) {
      alert('Please enter a valid plot number.');
      return;
    }
    if (isNaN(pPrice) || pPrice <= 0) {
      alert('Please enter a valid price.');
      return;
    }

    const calculatedDims = getStandardDimensionsForSize(quickEditPlot.size);
    const formattedPriceStr = pPrice >= 10000000
      ? `PKR ${(pPrice / 10000000).toFixed(2)} Crore`
      : `PKR ${(pPrice / 100000).toFixed(1)} Lacs`;

    const updatedPlot: EnginePlotItem = {
      id: quickEditPlot.id,
      plotNumber: pNum,
      price: pPrice,
      size: quickEditPlot.size,
      blockSlug: quickEditPlot.blockSlug,
      blockName: allBlocksList.find(b => b.slug === quickEditPlot.blockSlug)?.name || 'Block A',
      category: 'residential',
      dimensions: calculatedDims,
      locationType: quickEditPlot.locationType as any,
      status: 'available',
      features: [quickEditPlot.locationType, 'Prime Location'],
      demandRange: 'Live Market Rate',
      suitability: 'Residential Construction',
    };

    // 1. Update plotStore
    addOrUpdatePlot(updatedPlot);

    // 2. Update Plots Inventory state table
    setPlots(prev => prev.map(p => {
      const isMatch = p.id === quickEditPlot.id || 
                      String(p.plotNumber) === String(pNum) || 
                      String(p.plotNumber) === String(quickEditPlot.plotNumber) ||
                      p.id === `${quickEditPlot.blockSlug}-${pNum}`;
      if (isMatch) {
        return {
          ...p,
          price: pPrice,
          priceNumber: pPrice,
          priceFormatted: formattedPriceStr,
          plotNumber: String(pNum),
          size: quickEditPlot.size,
          dimensions: calculatedDims,
          facing: quickEditPlot.locationType,
        };
      }
      return p;
    }));

    // 3. Persist to Laravel database API if token present
    if (token) {
      apiUpdatePlot(quickEditPlot.id, {
        price: pPrice,
        priceFormatted: formattedPriceStr,
        plotNumber: String(pNum),
        size: quickEditPlot.size,
        dimensions: calculatedDims,
        facing: quickEditPlot.locationType,
      }, token).catch(console.error);
    }

    setIsQuickEditPlotOpen(false);
    setNotificationMsg(`Plot #${pNum} price updated to ${formatPKR(pPrice)}!`);
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 3500);
  };

  const handleDeleteQuickEditPlot = (id: string, plotNumber: string) => {
    if (window.confirm(`Are you sure you want to delete Plot #${plotNumber}?`)) {
      deletePlot(id);
      setPlots(prev => prev.filter(p => p.id !== id && String(p.plotNumber) !== String(plotNumber)));
      if (token) {
        apiDeletePlot(id, token).catch(console.error);
      }
      setIsQuickEditPlotOpen(false);
      setNotificationMsg(`Plot #${plotNumber} deleted.`);
      setSaveNotification(true);
      setTimeout(() => setSaveNotification(false), 3500);
    }
  };

  const handleOpenQuickAddPlot = (series: SeriesGroupResult) => {
    const suggestedNum = series.plots.length > 0 ? Math.max(...series.plots.map(p => p.plotNumber)) + 1 : series.rangeStart;
    setQuickAddPlotData({
      plotNumber: String(suggestedNum),
      price: String(series.minPrice || 5800000),
      locationType: 'Standard',
      size: selectedSeriesSize,
      blockSlug: selectedSeriesBlock,
    });
    setIsQuickAddPlotOpen(true);
  };

  const handleSaveQuickAddPlot = (e: React.FormEvent) => {
    e.preventDefault();
    const pNum = parseInt(quickAddPlotData.plotNumber, 10);
    const pPrice = parseFloat(quickAddPlotData.price);

    if (isNaN(pNum) || pNum <= 0) {
      alert('Please enter a valid plot number.');
      return;
    }
    if (isNaN(pPrice) || pPrice <= 0) {
      alert('Please enter a valid price.');
      return;
    }

    const calculatedDims = getStandardDimensionsForSize(quickAddPlotData.size);
    const formattedPriceStr = pPrice >= 10000000
      ? `PKR ${(pPrice / 10000000).toFixed(2)} Crore`
      : `PKR ${(pPrice / 100000).toFixed(1)} Lacs`;

    const newPlot: EnginePlotItem = {
      id: `${quickAddPlotData.blockSlug}-${quickAddPlotData.size.toLowerCase().replace(/\s+/g, '')}-${pNum}`,
      plotNumber: pNum,
      price: pPrice,
      size: quickAddPlotData.size,
      blockSlug: quickAddPlotData.blockSlug,
      blockName: allBlocksList.find(b => b.slug === quickAddPlotData.blockSlug)?.name || 'Block A',
      category: 'residential',
      dimensions: calculatedDims,
      locationType: quickAddPlotData.locationType as any,
      status: 'available',
      features: [quickAddPlotData.locationType, 'Prime Location'],
      demandRange: 'Live Market Rate',
      suitability: 'Residential Construction',
    };

    addOrUpdatePlot(newPlot);

    const dbPlotItem: any = {
      id: newPlot.id,
      plotNumber: String(pNum),
      block: allBlocksList.find(b => b.slug === quickAddPlotData.blockSlug)?.name || 'Block A',
      blockName: allBlocksList.find(b => b.slug === quickAddPlotData.blockSlug)?.name || 'Block A',
      blockSlug: quickAddPlotData.blockSlug,
      size: quickAddPlotData.size,
      dimensions: calculatedDims,
      category: 'Residential',
      propertyType: 'Residential',
      price: pPrice,
      priceNumber: pPrice,
      priceFormatted: formattedPriceStr,
      facing: quickAddPlotData.locationType,
      status: 'Available',
      features: [quickAddPlotData.locationType, 'Prime Location'],
      image: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg',
    };

    setPlots(prev => [dbPlotItem, ...prev]);

    if (token) {
      apiCreatePlot(dbPlotItem, token).catch(console.error);
    }

    setIsQuickAddPlotOpen(false);
    setNotificationMsg(`Plot #${pNum} added with price ${formatPKR(pPrice)}!`);
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 3500);
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
          <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-200 gap-1 sm:gap-4 text-xs font-bold overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setActiveTab('series')}
          className={`py-3 px-3 sm:px-4 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'series' ? 'border-[#7b002c] text-[#7b002c] font-bold bg-rose-50/60 rounded-t-xl' : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#7b002c]" />
          <span>⚡ Plot Series & Prices (All Blocks)</span>
        </button>

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


      {/* TAB: PLOT SERIES & PRICE ENGINE */}
      {activeTab === 'series' && (
        <div className="space-y-6">
          {/* Header & Reset Strip */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white p-5 sm:p-7 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#7b002c] text-white text-[10px] font-bold uppercase tracking-wider">
                  Live Series Control
                </span>
                <span className="text-xs text-amber-300 font-semibold">Instant Public Site Sync</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Faisal Hills Plot Series &amp; Valuation Manager
              </h2>
              <p className="text-xs text-slate-400">
                Select any block and plot size to edit prices, change sector tags, or add new series ranges.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleResetAllSeries}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5"
                title="Reset all series to default values"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
              <button
                onClick={handleOpenAddSeries}
                className="px-4 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Series Range</span>
              </button>
            </div>
          </div>

          {/* Step 1: Block Selector */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#7b002c]" />
                <span className="text-xs font-bold uppercase text-slate-900 tracking-wider">
                  1. Select Block to Manage Series
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Active: <strong className="text-[#7b002c]">{currentSeriesBlockName}</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {allBlocksList.map((b) => (
                <button
                  key={b.slug}
                  onClick={() => setSelectedSeriesBlock(b.slug)}
                  className={`py-3 px-2 rounded-xl text-xs font-bold text-center transition cursor-pointer border ${
                    selectedSeriesBlock === b.slug
                      ? 'bg-[#7b002c] text-white border-[#7b002c] shadow-md scale-102 ring-2 ring-rose-300'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <span className="block font-serif text-sm">{b.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Plot Size Selector */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#7b002c]" />
              <span className="text-xs font-bold uppercase text-slate-900 tracking-wider">
                2. Select Plot Size for {currentSeriesBlockName}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {allPlotSizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSeriesSize(sz)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 border ${
                    selectedSeriesSize === sz
                      ? 'bg-[#7b002c] text-white border-[#7b002c] shadow-md font-bold'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{sz}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Series Cards Grid */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>{currentSeriesBlockName} • {selectedSeriesSize} Series Ranges</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-sans font-medium">
                    {currentSeriesGroups.length} Series Configured
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click <strong>&quot;Edit Price &amp; Tag&quot;</strong> on any series card below to modify its live valuation.
                </p>
              </div>

              <button
                onClick={handleOpenAddSeries}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-sm self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Series Range</span>
              </button>
            </div>

            {currentSeriesGroups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {currentSeriesGroups.map((series) => (
                  <div
                    key={series.seriesKey}
                    className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-[#7b002c] transition-all flex flex-col justify-between space-y-4 group shadow-sm hover:shadow-md"
                  >
                    {/* Header */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#7b002c] text-white shadow-sm">
                          Series {series.label}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          Plot #{series.rangeStart} – #{series.rangeEnd}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-800 group-hover:text-[#7b002c] transition-colors">
                        {series.tag || 'Sector Enclave'}
                      </h4>
                    </div>

                    {/* Price Range Box */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                          Live Market Valuation Range
                        </span>
                        <div className="font-serif text-lg font-bold text-[#7b002c]">
                          {series.formattedRange}
                        </div>
                      </div>

                      {/* Active plots in this series */}
                      <div className="pt-2 border-t border-slate-100 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-600 font-semibold flex items-center gap-1">
                            <span>Active Plots:</span>
                            <span className="text-emerald-700 font-bold">({series.totalPlots})</span>
                          </span>
                          <button
                            onClick={() => handleOpenQuickAddPlot(series)}
                            className="text-[10px] font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-lg transition cursor-pointer flex items-center gap-1"
                            title="Add plot into this series"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Plot</span>
                          </button>
                        </div>
                        {series.plots.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {series.plots.map((p) => (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() => handleOpenQuickEditPlot(p)}
                                title={`Click to change price of Plot #${p.plotNumber}`}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-[#7b002c] text-[11px] font-mono text-slate-800 font-bold transition cursor-pointer hover:scale-105 group/pill shadow-xs"
                              >
                                <span>{(p as any).displayNumber || `#${p.plotNumber}`}:</span>
                                <span className="text-[#7b002c] font-sans font-bold">{formatPKR(p.price)}</span>
                                <Edit className="w-3 h-3 text-slate-400 group-hover/pill:text-[#7b002c]" />
                              </button>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 italic block">No individual plots added yet in this range</span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-200/80">
                      <button
                        onClick={() => handleOpenEditSeries(series)}
                        className="flex-1 py-2.5 px-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit Price &amp; Sector</span>
                      </button>
                      <button
                        onClick={() => handleDeleteSeries(series.seriesKey, series.label)}
                        className="p-2.5 bg-white hover:bg-rose-50 text-slate-400 hover:text-red-600 rounded-xl transition cursor-pointer border border-slate-200"
                        title="Delete series"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                <h4 className="text-sm font-bold text-slate-800">No Series Configured for {selectedSeriesSize} in {currentSeriesBlockName}</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Click the button below to add your first series range for this sector.
                </p>
                <button
                  onClick={handleOpenAddSeries}
                  className="px-4 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add First Series Range</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 1: PLOTS INVENTORY & FOR SALE */}
      {activeTab === 'plots' && (
        <div className="space-y-4">
          {/* Direct Banner to Series Manager */}
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-[#7b002c] shrink-0" />
              <div>
                <strong className="text-xs font-bold text-slate-900 block">
                  Looking to update Series price ranges (Series 001–200, 201–400 etc.)?
                </strong>
                <span className="text-[11px] text-slate-600">
                  You can set min/max prices and sector names for each series from the dedicated Series Manager tab.
                </span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('series')}
              className="px-4 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl transition shrink-0 cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Open Series &amp; Price Manager</span>
            </button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            {/* Search & Filter bar (Explicitly removed Status Filter as requested) */}
            <div className="flex flex-wrap items-center gap-2.5 flex-1">
              <div className="relative min-w-[200px] flex-1 max-w-xs">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={plotSearchQuery}
                  onChange={(e) => setPlotSearchQuery(e.target.value)}
                  placeholder="Search plot #, size, facing, street..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                />
              </div>

              {/* Block Filter */}
              <select
                value={plotFilterBlock}
                onChange={(e) => setPlotFilterBlock(e.target.value)}
                className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c] cursor-pointer"
              >
                <option value="all">All Blocks & Sectors</option>
                <option value="block-a">Block A</option>
                <option value="block-b">Block B</option>
                <option value="block-c">Block C</option>
                <option value="block-d">Block D</option>
                <option value="executive-block">Executive Block</option>
                <option value="prime-block">Prime Block</option>
                {blocksList.filter(b => !['block-a', 'block-b', 'block-c', 'block-d', 'executive-block', 'prime-block'].includes(b.slug)).map((b) => (
                  <option key={b.slug} value={b.slug}>
                    {b.name}
                  </option>
                ))}
              </select>

              {/* Property Type Filter */}
              <select
                value={plotFilterType}
                onChange={(e) => setPlotFilterType(e.target.value)}
                className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c] cursor-pointer"
              >
                <option value="all">All Property Types</option>
                <option value="Residential">Residential Plots</option>
                <option value="Commercial">Commercial Plots</option>
              </select>
            </div>

            <button 
              onClick={handleOpenAddPlot}
              className="px-4 py-2 bg-[#7b002c] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#9e1245] transition shadow self-start md:self-auto cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5 text-white" /> Add New Plot Listing
            </button>
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden md:block bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[850px]">
                <thead className="bg-[#4c050d] text-white uppercase text-[10px] tracking-wider border-b border-[#7b002c]">
                  <tr>
                    <th className="p-3.5">Plot / Unit #</th>
                    <th className="p-3.5">Block Sector</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5">Plot Size & Dimensions</th>
                    <th className="p-3.5">Facing / View</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Price (PKR)</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {plots
                    .filter((plot) => {
                      const matchesBlock = plotFilterBlock === 'all' || plot.blockSlug === plotFilterBlock;
                      const plotType = plot.propertyType || (plot.category === 'Commercial' ? 'Commercial' : 'Residential');
                      const matchesType = plotFilterType === 'all' || plotType === plotFilterType;
                      const q = plotSearchQuery.toLowerCase().trim();
                      const matchesQuery = !q || 
                        (plot.plotNumber && plot.plotNumber.toLowerCase().includes(q)) ||
                        (plot.size && plot.size.toLowerCase().includes(q)) ||
                        (plot.dimensions && plot.dimensions.toLowerCase().includes(q)) ||
                        (plot.facing && plot.facing.toLowerCase().includes(q)) ||
                        (plot.street && plot.street.toLowerCase().includes(q)) ||
                        (plot.blockName && plot.blockName.toLowerCase().includes(q));
                      return matchesBlock && matchesType && matchesQuery;
                    })
                    .map((plot) => (
                    <tr key={plot.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 font-bold font-serif text-[#7b002c] text-sm">
                        {plot.plotNumber || plot.id}
                        {plot.featured && (
                          <span className="ml-1.5 text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold uppercase">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 font-medium">{plot.blockName}</td>
                      <td className="p-3.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          plot.propertyType === 'Commercial' || plot.category === 'Commercial'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200' 
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}>
                          {plot.propertyType || plot.category || 'Residential'}
                        </span>
                      </td>
                      <td className="p-3.5 font-medium">
                        <div className="font-bold text-slate-900">{plot.size}</div>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {plot.dimensions && !plot.dimensions.includes('25 × 50') || plot.size.includes('5')
                            ? (plot.dimensions || getStandardDimensionsForSize(plot.size))
                            : getStandardDimensionsForSize(plot.size)}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-600">
                        {plot.facing || 'Standard'}
                        {plot.street && <div className="text-[10px] text-slate-400">St: {plot.street}</div>}
                      </td>
                      <td className="p-3.5">
                        <select
                          value={plot.status}
                          onChange={(e) => {
                            const newStatus = e.target.value;
                            setPlots(prev => prev.map(p => p.id === plot.id ? { ...p, status: newStatus } : p));
                            if (token) {
                              apiUpdatePlot(plot.id, { status: newStatus }, token).catch(console.error);
                            }
                          }}
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                            plot.status === 'Available' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 
                            plot.status === 'Reserved' ? 'bg-amber-50 text-amber-800 border-amber-300' : 
                            plot.status === 'Sold' ? 'bg-slate-100 text-slate-700 border-slate-300' :
                            'bg-blue-50 text-blue-800 border-blue-200'
                          }`}
                        >
                          <option value="Available">Available</option>
                          <option value="Reserved">Reserved</option>
                          <option value="Sold">Sold</option>
                          <option value="Coming Soon">Coming Soon</option>
                          <option value="Unavailable">Unavailable</option>
                        </select>
                      </td>
                      <td className="p-3.5">
                        {plot.price !== null && plot.price !== undefined && plot.price > 0 ? (
                          <div>
                            <div className="font-bold text-[#7b002c] font-serif">
                              {formatPlotPrice(plot.price, plot.priceFormatted)}
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium">({plot.priceUnit || 'Total Price'})</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 font-semibold italic text-[11px]">Contact for Price</span>
                        )}
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button 
                            onClick={() => handleOpenEditPlot(plot)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-[#7b002c] text-slate-700 hover:text-white rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                            title="Edit Plot"
                          >
                            <Edit3 className="w-3 h-3" /> Edit
                          </button>
                          <button 
                            onClick={() => setPlotToDelete(plot)} 
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer" 
                            title="Delete Plot"
                          >
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
                const plotType = plot.propertyType || (plot.category === 'Commercial' ? 'Commercial' : 'Residential');
                const matchesType = plotFilterType === 'all' || plotType === plotFilterType;
                const q = plotSearchQuery.toLowerCase().trim();
                const matchesQuery = !q || 
                  (plot.plotNumber && plot.plotNumber.toLowerCase().includes(q)) ||
                  (plot.size && plot.size.toLowerCase().includes(q)) ||
                  (plot.dimensions && plot.dimensions.toLowerCase().includes(q)) ||
                  (plot.blockName && plot.blockName.toLowerCase().includes(q));
                return matchesBlock && matchesType && matchesQuery;
              })
              .map((plot) => (
              <div key={plot.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base text-[#7b002c]">{plot.plotNumber || plot.id}</span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        plot.propertyType === 'Commercial' || plot.category === 'Commercial'
                          ? 'bg-amber-50 text-amber-800' 
                          : 'bg-emerald-50 text-emerald-800'
                      }`}>
                        {plot.propertyType || plot.category || 'Residential'}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-slate-500">{plot.blockName} • {plot.size}</span>
                    <div className="text-[11px] text-slate-600 font-mono mt-0.5">{plot.dimensions || 'Dimension not provided'}</div>
                  </div>
                  <select
                    value={plot.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      setPlots(prev => prev.map(p => p.id === plot.id ? { ...p, status: newStatus } : p));
                      if (token) {
                        apiUpdatePlot(plot.id, { status: newStatus }, token).catch(console.error);
                      }
                    }}
                    className={`text-xs font-bold px-2 py-1 rounded-lg border focus:outline-none ${
                      plot.status === 'Available' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-700 border-slate-300'
                    }`}
                  >
                    <option value="Available">Available</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Sold">Sold</option>
                    <option value="Coming Soon">Coming Soon</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Price</span>
                    <span className="font-bold text-[#7b002c] text-xs">
                      {plot.price !== null && plot.price !== undefined && plot.price > 0 
                        ? formatPlotPrice(plot.price, plot.priceFormatted)
                        : 'Contact for Price'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleOpenEditPlot(plot)} 
                      className="px-3 py-1.5 bg-slate-100 text-slate-800 hover:bg-[#7b002c] hover:text-white rounded-lg font-bold text-xs flex items-center gap-1 shadow-sm shrink-0 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button 
                      onClick={() => setPlotToDelete(plot)} 
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg border border-slate-200 hover:border-red-300 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Plot Modal */}
          {isAddPlotModalOpen && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden my-auto animate-fade-up">
                <div className="bg-[#7b002c] text-white p-5 flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg">Add New Plot / Property Listing</h3>
                  <button 
                    onClick={() => setIsAddPlotModalOpen(false)}
                    className="text-white/80 hover:text-white text-xs font-semibold px-2.5 py-1 rounded bg-black/10 hover:bg-black/20 transition cursor-pointer"
                  >
                    Close
                  </button>
                </div>

                <form onSubmit={handleCreatePlotSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Block Name */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Block / Sector *</label>
                      <select
                        value={plotForm.blockSlug}
                        onChange={(e) => setPlotForm(prev => ({ ...prev, blockSlug: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c] cursor-pointer"
                      >
                        <option value="block-a">Block A</option>
                        <option value="block-b">Block B</option>
                        <option value="block-c">Block C</option>
                        <option value="block-d">Block D</option>
                        <option value="executive-block">Executive Block</option>
                        <option value="prime-block">Prime Block</option>
                      </select>
                    </div>

                    {/* Property Type */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Property Type *</label>
                      <select
                        value={plotForm.propertyType}
                        onChange={(e) => setPlotForm(prev => ({ ...prev, propertyType: e.target.value as any }))}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c] cursor-pointer"
                      >
                        <option value="Residential">Residential Plot</option>
                        <option value="Commercial">Commercial Plot</option>
                      </select>
                    </div>

                    {/* Plot Size */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Plot Size *</label>
                      <select
                        value={plotForm.size}
                        onChange={(e) => {
                          const newSz = e.target.value;
                          const autoDim = getStandardDimensionsForSize(newSz);
                          setPlotForm(prev => ({ ...prev, size: newSz, dimensions: autoDim }));
                        }}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c] cursor-pointer"
                      >
                        <option value="5 Marla">5 Marla (25 × 50 ft)</option>
                        <option value="8 Marla">8 Marla (30 × 60 ft)</option>
                        <option value="10 Marla">10 Marla (35 × 70 ft)</option>
                        <option value="14 Marla">14 Marla (40 × 80 ft)</option>
                        <option value="1 Kanal">1 Kanal (50 × 90 ft)</option>
                        <option value="2 Kanal">2 Kanal (75 × 120 ft)</option>
                        <option value="4 Marla Commercial">4 Marla Commercial (30 × 30 ft)</option>
                        <option value="5.33 Marla Commercial">5.33 Marla Commercial (40 × 30 ft)</option>
                        <option value="8 Marla Commercial">8 Marla Commercial (40 × 45 ft)</option>
                      </select>
                    </div>

                    {/* Dimensions */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Dimensions</label>
                      <input 
                        type="text" 
                        value={plotForm.dimensions}
                        onChange={(e) => setPlotForm(prev => ({ ...prev, dimensions: e.target.value }))}
                        placeholder="e.g. 25 × 50 ft or leave empty if not provided"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                      />
                    </div>

                    {/* Price (Numeric) */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">
                        Demand Price <span className="text-slate-500 font-normal">(e.g. 55 for 55 Lacs, 1.25 for 1.25 Crore, or 5500000 PKR)</span>
                      </label>
                      <input 
                        type="number" 
                        step="any"
                        value={plotForm.price}
                        onChange={(e) => setPlotForm(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="e.g. 55 for 55 Lacs or 5500000"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                      />
                      {plotForm.price && !isNaN(Number(plotForm.price)) && Number(plotForm.price) > 0 && (
                        <div className="mt-1 p-2 bg-rose-50 border border-rose-200 rounded-lg flex items-center justify-between text-xs">
                          <span className="text-slate-600 font-medium">Live Calculated Price:</span>
                          <span className="font-bold text-[#7b002c] font-serif">
                            {formatPlotPrice(Number(plotForm.price))}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Price Unit */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Price Unit</label>
                      <select
                        value={plotForm.priceUnit}
                        onChange={(e) => setPlotForm(prev => ({ ...prev, priceUnit: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c] cursor-pointer"
                      >
                        <option value="Total Price">Total Price</option>
                        <option value="Per Marla">Per Marla</option>
                        <option value="Per Kanal">Per Kanal</option>
                      </select>
                    </div>

                    {/* Status */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Status *</label>
                      <select
                        value={plotForm.status}
                        onChange={(e) => setPlotForm(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c] cursor-pointer"
                      >
                        <option value="Available">Available</option>
                        <option value="Reserved">Reserved</option>
                        <option value="Sold">Sold</option>
                        <option value="Coming Soon">Coming Soon</option>
                        <option value="Unavailable">Unavailable</option>
                      </select>
                    </div>

                    {/* Facing */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Facing / Orientation</label>
                      <select
                        value={plotForm.facing}
                        onChange={(e) => setPlotForm(prev => ({ ...prev, facing: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c] cursor-pointer"
                      >
                        <option value="Standard">Standard</option>
                        <option value="Corner">Corner</option>
                        <option value="Park Facing">Park Facing</option>
                        <option value="Main Boulevard">Main Boulevard</option>
                        <option value="Hill View">Hill View</option>
                      </select>
                    </div>

                    {/* Plot Number */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Plot / Unit Number (Optional)</label>
                      <input 
                        type="text" 
                        value={plotForm.plotNumber}
                        onChange={(e) => setPlotForm(prev => ({ ...prev, plotNumber: e.target.value }))}
                        placeholder="e.g. A-102"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                      />
                    </div>

                    {/* Street */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Street / Road (Optional)</label>
                      <input 
                        type="text" 
                        value={plotForm.street}
                        onChange={(e) => setPlotForm(prev => ({ ...prev, street: e.target.value }))}
                        placeholder="e.g. Street 14, 60ft Boulevard"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-800">Description (Optional)</label>
                    <textarea 
                      rows={2}
                      value={plotForm.description}
                      onChange={(e) => setPlotForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter details, location highlights, possession info..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>

                  {/* Plot Image Section */}
                  <div className="space-y-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-[#7b002c]" />
                        <span>Plot Photo / Site Image</span>
                      </label>
                      {plotForm.image && (
                        <button
                          type="button"
                          onClick={() => setPlotForm(prev => ({ ...prev, image: '' }))}
                          className="text-[10px] text-red-600 hover:underline font-semibold cursor-pointer"
                        >
                          Remove Photo
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <input 
                        type="text" 
                        value={plotForm.image}
                        onChange={(e) => setPlotForm(prev => ({ ...prev, image: e.target.value }))}
                        placeholder="Paste image URL (e.g. /images/... or https://...)"
                        className="flex-1 w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                      />
                      
                      <label className="w-full sm:w-auto px-3 py-2 bg-slate-800 hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer flex items-center justify-center gap-1.5 shrink-0 transition">
                        <Camera className="w-3.5 h-3.5 text-white" />
                        <span>Upload File</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setPlotForm(prev => ({ ...prev, image: reader.result as string }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>

                    {/* Quick Preset Selector */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Presets:</span>
                      {[
                        { label: 'Drone Aerial', url: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg' },
                        { label: 'Boulevard Road', url: '/images/imgi_1_DJI_20250818122014_0054_D-scaled.jpg' },
                        { label: 'Executive Block', url: '/images/executive.jpg' },
                        { label: 'Modern Villa', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
                      ].map((preset, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => setPlotForm(prev => ({ ...prev, image: preset.url }))}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium transition cursor-pointer"
                        >
                          + {preset.label}
                        </button>
                      ))}
                    </div>

                    {/* Live Image Preview */}
                    {plotForm.image && (
                      <div className="relative mt-2 w-full h-32 rounded-lg overflow-hidden border border-slate-300 bg-slate-900 shadow-inner">
                        <img 
                          src={plotForm.image} 
                          alt="Plot Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold">
                          Live Photo Preview
                        </div>
                      </div>
                    )}
                  </div>

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
                      <span>Save Plot</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Edit Plot Modal */}
          {isEditPlotModalOpen && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden my-auto animate-fade-up">
                <div className="bg-[#7b002c] text-white p-5 flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg">Edit Plot / Property Details</h3>
                  <button 
                    onClick={() => { setIsEditPlotModalOpen(false); setEditingPlot(null); }}
                    className="text-white/80 hover:text-white text-xs font-semibold px-2.5 py-1 rounded bg-black/10 hover:bg-black/20 transition cursor-pointer"
                  >
                    Close
                  </button>
                </div>

                <form onSubmit={handleUpdatePlotSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Block Name */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Block / Sector *</label>
                      <select
                        value={plotForm.blockSlug}
                        onChange={(e) => setPlotForm(prev => ({ ...prev, blockSlug: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c] cursor-pointer"
                      >
                        <option value="block-a">Block A</option>
                        <option value="block-b">Block B</option>
                        <option value="block-c">Block C</option>
                        <option value="block-d">Block D</option>
                        <option value="executive-block">Executive Block</option>
                        <option value="prime-block">Prime Block</option>
                      </select>
                    </div>

                    {/* Property Type */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Property Type *</label>
                      <select
                        value={plotForm.propertyType}
                        onChange={(e) => setPlotForm(prev => ({ ...prev, propertyType: e.target.value as any }))}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c] cursor-pointer"
                      >
                        <option value="Residential">Residential Plot</option>
                        <option value="Commercial">Commercial Plot</option>
                      </select>
                    </div>

                    {/* Plot Size */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Plot Size *</label>
                      <select
                        value={plotForm.size}
                        onChange={(e) => {
                          const newSz = e.target.value;
                          const autoDim = getStandardDimensionsForSize(newSz);
                          setPlotForm(prev => ({ ...prev, size: newSz, dimensions: autoDim }));
                        }}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c] cursor-pointer"
                      >
                        <option value="5 Marla">5 Marla (25 × 50 ft)</option>
                        <option value="8 Marla">8 Marla (30 × 60 ft)</option>
                        <option value="10 Marla">10 Marla (35 × 70 ft)</option>
                        <option value="14 Marla">14 Marla (40 × 80 ft)</option>
                        <option value="1 Kanal">1 Kanal (50 × 90 ft)</option>
                        <option value="2 Kanal">2 Kanal (75 × 120 ft)</option>
                        <option value="4 Marla Commercial">4 Marla Commercial (30 × 30 ft)</option>
                        <option value="5.33 Marla Commercial">5.33 Marla Commercial (40 × 30 ft)</option>
                        <option value="8 Marla Commercial">8 Marla Commercial (40 × 45 ft)</option>
                      </select>
                    </div>

                    {/* Dimensions */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Dimensions</label>
                      <input 
                        type="text" 
                        value={plotForm.dimensions}
                        onChange={(e) => setPlotForm(prev => ({ ...prev, dimensions: e.target.value }))}
                        placeholder="e.g. 25 × 50 ft"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                      />
                    </div>

                    {/* Price (Numeric) */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">
                        Demand Price <span className="text-slate-500 font-normal">(e.g. 55 for 55 Lacs, 1.25 for 1.25 Crore, or 5500000 PKR)</span>
                      </label>
                      <input 
                        type="number" 
                        step="any"
                        value={plotForm.price}
                        onChange={(e) => setPlotForm(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="e.g. 55 for 55 Lacs or 5500000"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                      />
                      {plotForm.price && !isNaN(Number(plotForm.price)) && Number(plotForm.price) > 0 && (
                        <div className="mt-1 p-2 bg-rose-50 border border-rose-200 rounded-lg flex items-center justify-between text-xs">
                          <span className="text-slate-600 font-medium">Live Calculated Price:</span>
                          <span className="font-bold text-[#7b002c] font-serif">
                            {formatPlotPrice(Number(plotForm.price))}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Price Unit */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Price Unit</label>
                      <select
                        value={plotForm.priceUnit}
                        onChange={(e) => setPlotForm(prev => ({ ...prev, priceUnit: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c] cursor-pointer"
                      >
                        <option value="Total Price">Total Price</option>
                        <option value="Per Marla">Per Marla</option>
                        <option value="Per Kanal">Per Kanal</option>
                      </select>
                    </div>

                    {/* Status */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Status *</label>
                      <select
                        value={plotForm.status}
                        onChange={(e) => setPlotForm(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c] cursor-pointer"
                      >
                        <option value="Available">Available</option>
                        <option value="Reserved">Reserved</option>
                        <option value="Sold">Sold</option>
                        <option value="Coming Soon">Coming Soon</option>
                        <option value="Unavailable">Unavailable</option>
                      </select>
                    </div>

                    {/* Facing */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Facing / Orientation</label>
                      <select
                        value={plotForm.facing}
                        onChange={(e) => setPlotForm(prev => ({ ...prev, facing: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c] cursor-pointer"
                      >
                        <option value="Standard">Standard</option>
                        <option value="Corner">Corner</option>
                        <option value="Park Facing">Park Facing</option>
                        <option value="Main Boulevard">Main Boulevard</option>
                        <option value="Hill View">Hill View</option>
                      </select>
                    </div>

                    {/* Plot Number */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Plot / Unit Number (Optional)</label>
                      <input 
                        type="text" 
                        value={plotForm.plotNumber}
                        onChange={(e) => setPlotForm(prev => ({ ...prev, plotNumber: e.target.value }))}
                        placeholder="e.g. A-102"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                      />
                    </div>

                    {/* Street */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Street / Road (Optional)</label>
                      <input 
                        type="text" 
                        value={plotForm.street}
                        onChange={(e) => setPlotForm(prev => ({ ...prev, street: e.target.value }))}
                        placeholder="e.g. Street 14"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-800">Description (Optional)</label>
                    <textarea 
                      rows={2}
                      value={plotForm.description}
                      onChange={(e) => setPlotForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter details, location highlights, possession info..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>

                  {/* Plot Image Section */}
                  <div className="space-y-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-[#7b002c]" />
                        <span>Plot Photo / Site Image</span>
                      </label>
                      {plotForm.image && (
                        <button
                          type="button"
                          onClick={() => setPlotForm(prev => ({ ...prev, image: '' }))}
                          className="text-[10px] text-red-600 hover:underline font-semibold cursor-pointer"
                        >
                          Remove Photo
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <input 
                        type="text" 
                        value={plotForm.image}
                        onChange={(e) => setPlotForm(prev => ({ ...prev, image: e.target.value }))}
                        placeholder="Paste image URL (e.g. /images/... or https://...)"
                        className="flex-1 w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                      />
                      
                      <label className="w-full sm:w-auto px-3 py-2 bg-slate-800 hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer flex items-center justify-center gap-1.5 shrink-0 transition">
                        <Camera className="w-3.5 h-3.5 text-white" />
                        <span>Upload File</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setPlotForm(prev => ({ ...prev, image: reader.result as string }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>

                    {/* Quick Preset Selector */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Presets:</span>
                      {[
                        { label: 'Drone Aerial', url: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg' },
                        { label: 'Boulevard Road', url: '/images/imgi_1_DJI_20250818122014_0054_D-scaled.jpg' },
                        { label: 'Executive Block', url: '/images/executive.jpg' },
                        { label: 'Modern Villa', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
                      ].map((preset, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => setPlotForm(prev => ({ ...prev, image: preset.url }))}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium transition cursor-pointer"
                        >
                          + {preset.label}
                        </button>
                      ))}
                    </div>

                    {/* Live Image Preview */}
                    {plotForm.image && (
                      <div className="relative mt-2 w-full h-32 rounded-lg overflow-hidden border border-slate-300 bg-slate-900 shadow-inner">
                        <img 
                          src={plotForm.image} 
                          alt="Plot Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold">
                          Live Photo Preview
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => { setIsEditPlotModalOpen(false); setEditingPlot(null); }}
                      className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl shadow flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5 text-white" />
                      <span>Update Plot</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {plotToDelete && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-fade-up">
                <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                  <Trash2 className="w-6 h-6" />
                </div>
                <div className="text-center space-y-1">
                  <h3 className="font-serif font-bold text-lg text-slate-900">Delete Plot Listing?</h3>
                  <p className="text-xs text-slate-600">
                    Are you sure you want to delete <span className="font-bold text-[#7b002c]">{plotToDelete.plotNumber || plotToDelete.id}</span> ({plotToDelete.blockName} - {plotToDelete.size})? This action cannot be undone.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setPlotToDelete(null)}
                    className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmDeletePlot}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition shadow cursor-pointer flex-1"
                  >
                    Delete Plot
                  </button>
                </div>
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

              {/* Photo Alt Text [alt] */}
              <div className="md:col-span-12 space-y-1">
                <label className="block text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>Image Alt Text <span className="text-[#7b002c] font-mono font-bold">[alt]</span> (SEO & Accessibility)</span>
                  <span className="text-[10px] text-slate-400 font-normal">e.g. Faisal Hills Arc Entrance Gate Taxila</span>
                </label>
                <input
                  type="text"
                  value={newPhotoAlt}
                  onChange={(e) => setNewPhotoAlt(e.target.value)}
                  placeholder="Descriptive alt tag for Google Images & SEO optimization..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                />
              </div>

              {/* Photo Source [src] & Device Upload */}
              <div className="md:col-span-12 space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#7b002c]" />
                    <span>Image Source <span className="text-[#7b002c] font-mono font-bold">[src]</span> / Laptop Gallery *</span>
                  </label>
                  {newPhotoUrl && (
                    <button
                      type="button"
                      onClick={() => setNewPhotoUrl('')}
                      className="text-[10px] text-red-600 hover:underline font-semibold cursor-pointer"
                    >
                      Clear Photo
                    </button>
                  )}
                </div>

                {/* Upload from Device Action Button */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <label className="px-4 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl cursor-pointer flex items-center gap-2 shadow-xs transition hover:scale-[1.02] active:scale-95">
                    <Camera className="w-4 h-4" />
                    <span>Upload from Device / Laptop Gallery</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          compressImageFile(file, 1920, 0.85).then((dataUrl) => {
                            if (dataUrl) {
                              setNewPhotoUrl(dataUrl);
                            }
                          });
                        }
                      }}
                    />
                  </label>
                  <span className="text-xs text-slate-400 font-medium">PNG, JPG, WEBP supported</span>
                </div>

                {/* Manual [src] URL Input */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-slate-600">
                    Or Enter Image Source <span className="font-mono text-[#7b002c]">[src]</span> URL:
                  </label>
                  <input
                    type="text"
                    required
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    placeholder="e.g. /images/faisal-jewel.jpg or https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-mono text-[11px] focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                {/* Live Preview Card */}
                {newPhotoUrl && (
                  <div className="rounded-xl overflow-hidden border border-slate-300 relative bg-slate-900 shadow-inner space-y-2 p-3">
                    <div className="h-44 w-full rounded-lg overflow-hidden relative">
                      <img
                        src={newPhotoUrl}
                        alt={newPhotoAlt || newPhotoTitle || "Gallery Photo Preview"}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      />
                      <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                        Live [src] Preview
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-300">
                      <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700 font-mono">
                        alt: &quot;{newPhotoAlt || newPhotoTitle || 'N/A'}&quot;
                      </span>
                      <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700 font-mono truncate max-w-xs">
                        src: {newPhotoUrl.startsWith('data:') ? 'base64 data...' : newPhotoUrl}
                      </span>
                    </div>
                  </div>
                )}
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

        {/* TAB 3: BLOCKS & BG IMAGES (FULL FUNCTIONALITY) */}
      {activeTab === 'blocks' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#7b002c] uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-[#7b002c]" />
                <span>Society Blocks & Background Media Management</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Edit Block Headings, Descriptions, Media & NOC Details
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Choose images directly from your Photo Gallery or upload new files to customize sector banners and layout plans.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                {blocksList.length} Society Blocks
              </span>
              <a
                href={`/blocks/${selectedBlockSlug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-rose-50 text-[#7b002c] border border-rose-200 hover:bg-rose-100 transition inline-flex items-center gap-1.5"
              >
                <span>View Live Page</span>
                <Globe className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Block Selection Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {blocksList.map((b) => (
              <button
                key={b.id || b.slug}
                onClick={() => handleSelectBlockToEdit(b.slug)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                  selectedBlockSlug === b.slug
                    ? 'bg-[#7b002c] text-white border-[#7b002c] shadow-md scale-102'
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
                  <div className="w-11 h-11 rounded-xl bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center font-bold font-serif text-xl border border-[#7b002c]/20">
                    {editingBlock.name?.replace('Block ', '').charAt(0) || 'B'}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900">
                      Editing: {editingBlock.name}
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">
                      Sector Slug: <code className="text-[#7b002c] bg-slate-100 px-1.5 py-0.5 rounded font-mono font-bold">{editingBlock.slug}</code>
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSavingBlock}
                  className="px-6 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] disabled:opacity-60 text-white font-bold text-xs rounded-xl shadow flex items-center gap-2 transition cursor-pointer hover:scale-102"
                >
                  {isSavingBlock ? (
                    <>
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 text-white" />
                      <span>Save & Publish Block</span>
                    </>
                  )}
                </button>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* 1. Hero Background Image Section */}
                <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-[#7b002c]" />
                      <span>Hero Background Banner Image</span>
                    </label>
                    {editingBlock.heroImage && (
                      <button
                        type="button"
                        onClick={() => setEditingBlock(prev => ({ ...prev, heroImage: '' }))}
                        className="text-[10px] text-red-600 hover:underline font-semibold cursor-pointer"
                      >
                        Remove Image
                      </button>
                    )}
                  </div>

                  {/* Media Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setGalleryPickerTarget('hero')}
                      className="px-3 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Choose from Photo Gallery</span>
                    </button>

                    <label className="px-3 py-1.5 bg-slate-800 hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer flex items-center gap-1.5 shadow-xs transition">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Upload from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            compressImageFile(file, 1920, 0.85).then((dataUrl) => {
                              if (dataUrl) {
                                setEditingBlock(prev => ({ ...prev, heroImage: dataUrl }));
                              }
                            });
                          }
                        }}
                      />
                    </label>
                  </div>

                  {/* Manual URL Input */}
                  <input
                    type="text"
                    value={editingBlock.heroImage || ''}
                    onChange={(e) => setEditingBlock(prev => ({ ...prev, heroImage: e.target.value }))}
                    placeholder="Or paste image URL (e.g. /images/... or https://...)"
                    className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                  />

                  {/* Quick Presets */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Presets:</span>
                    {[
                      { label: 'Executive Aerial', url: '/images/faisalhillexecutive.webp' },
                      { label: 'Drone Site View', url: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg' },
                      { label: 'Sports Arena View', url: '/images/imgi_48_sports-arena.webp' },
                      { label: 'European Promenade', url: '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg' },
                      { label: 'Margalla Springs', url: '/images/imgi_38_Faisal-Hills-site-home-page-header.webp' },
                    ].map((preset, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => setEditingBlock(prev => ({ ...prev, heroImage: preset.url }))}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium transition cursor-pointer"
                      >
                        + {preset.label}
                      </button>
                    ))}
                  </div>

                  {/* Live Hero Preview */}
                  {editingBlock.heroImage && (
                    <div className="h-36 rounded-xl overflow-hidden border border-slate-300 relative bg-slate-900 shadow-inner">
                      <img
                        src={editingBlock.heroImage}
                        alt="Hero Background Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      />
                      <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                        Hero Banner Preview
                      </span>
                    </div>
                  )}
                </div>

                {/* 2. Master Plan Map Image Section */}
                <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#7b002c]" />
                      <span>Master Plan / Layout Map Image</span>
                    </label>
                    {editingBlock.masterPlanImage && (
                      <button
                        type="button"
                        onClick={() => setEditingBlock(prev => ({ ...prev, masterPlanImage: '' }))}
                        className="text-[10px] text-red-600 hover:underline font-semibold cursor-pointer"
                      >
                        Remove Map
                      </button>
                    )}
                  </div>

                  {/* Media Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setGalleryPickerTarget('masterPlan')}
                      className="px-3 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Choose from Photo Gallery</span>
                    </button>

                    <label className="px-3 py-1.5 bg-slate-800 hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer flex items-center gap-1.5 shadow-xs transition">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Upload Map File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            compressImageFile(file, 2560, 0.88).then((dataUrl) => {
                              if (dataUrl) {
                                setEditingBlock(prev => ({ ...prev, masterPlanImage: dataUrl }));
                              }
                            });
                          }
                        }}
                      />
                    </label>
                  </div>

                  {/* Manual URL Input */}
                  <input
                    type="text"
                    value={editingBlock.masterPlanImage || ''}
                    onChange={(e) => setEditingBlock(prev => ({ ...prev, masterPlanImage: e.target.value }))}
                    placeholder="Or paste map image URL..."
                    className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                  />

                  {/* Live Master Plan Preview */}
                  {editingBlock.masterPlanImage && (
                    <div className="h-36 rounded-xl overflow-hidden border border-slate-300 relative bg-slate-900 shadow-inner">
                      <img
                        src={editingBlock.masterPlanImage}
                        alt="Master Plan Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      />
                      <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                        Master Plan Layout Preview
                      </span>
                    </div>
                  )}
                </div>

                {/* 3. Block Name & Title */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Block Name / Title *</label>
                  <input
                    type="text"
                    required
                    value={editingBlock.name || ''}
                    onChange={(e) => setEditingBlock(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Executive Block"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                {/* 4. Tagline / Subtitle */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Main Heading / Tagline / Subtitle *</label>
                  <input
                    type="text"
                    required
                    value={editingBlock.subtitle || ''}
                    onChange={(e) => setEditingBlock(prev => ({ ...prev, subtitle: e.target.value }))}
                    placeholder="e.g. Main Entrance & Commercial Hub with RDA-Approved Freehold Plots"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                {/* 5. NOC Approval Status */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">NOC Approval Status</label>
                  <input
                    type="text"
                    value={editingBlock.nocStatus || ''}
                    onChange={(e) => setEditingBlock(prev => ({ ...prev, nocStatus: e.target.value }))}
                    placeholder="e.g. 100% RDA Approved (MP&TE/F-PH-1/21)"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                {/* 6. Last Verified Date */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Last Verified / Update Date</label>
                  <input
                    type="text"
                    value={editingBlock.verificationDate || 'August 2026'}
                    onChange={(e) => setEditingBlock(prev => ({ ...prev, verificationDate: e.target.value }))}
                    placeholder="e.g. August 2026"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                {/* 7. Residential Price Range */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Residential Price Range</label>
                  <input
                    type="text"
                    value={editingBlock.priceRange?.residential || ''}
                    onChange={(e) => setEditingBlock(prev => ({
                      ...prev,
                      priceRange: { ...prev.priceRange, residential: e.target.value, commercial: prev.priceRange?.commercial || '' }
                    }))}
                    placeholder="e.g. PKR 65 Lacs – 1.85 Crore"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                {/* 8. Commercial Price Range */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Commercial Price Range</label>
                  <input
                    type="text"
                    value={editingBlock.priceRange?.commercial || ''}
                    onChange={(e) => setEditingBlock(prev => ({
                      ...prev,
                      priceRange: { ...prev.priceRange, commercial: e.target.value, residential: prev.priceRange?.residential || '' }
                    }))}
                    placeholder="e.g. PKR 2.8 Crore – 5.5 Crore"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                {/* 9. Total Plots Count */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Total Plots Count</label>
                  <input
                    type="number"
                    value={editingBlock.totalPlots || 1200}
                    onChange={(e) => setEditingBlock(prev => ({ ...prev, totalPlots: Number(e.target.value) }))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                {/* 10. Category Tag */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Category Status</label>
                  <select
                    value={editingBlock.category || 'developed'}
                    onChange={(e) => setEditingBlock(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c] cursor-pointer"
                  >
                    <option value="developed">Developed (Possession Ready)</option>
                    <option value="upcoming">Upcoming (Fast-Paced Development)</option>
                    <option value="commercial_project">Commercial Project / Hub</option>
                  </select>
                </div>

                {/* 11. Location Details */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Location & Highway Access Details</label>
                  <input
                    type="text"
                    value={editingBlock.locationDetails || ''}
                    onChange={(e) => setEditingBlock(prev => ({ ...prev, locationDetails: e.target.value }))}
                    placeholder="e.g. Direct Frontage on Main GT Road (N-5) with 220ft Central Boulevard Access"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                {/* 12. Detailed Description */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Block Overview & Comprehensive Description</label>
                  <textarea
                    rows={4}
                    value={editingBlock.description || ''}
                    onChange={(e) => setEditingBlock(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter comprehensive overview, possession updates, lifestyle facilities, and investment potential..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                {/* 13. Key Highlights & Features Manager */}
                <div className="md:col-span-2 space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <label className="block text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>Key Sector Highlights & Features</span>
                    <span className="text-[10px] text-slate-500 font-normal">{(editingBlock.highlights || []).length} highlights active</span>
                  </label>

                  {/* Existing Highlights Pills */}
                  <div className="flex flex-wrap gap-2">
                    {(editingBlock.highlights || []).map((highlight, hIdx) => (
                      <span
                        key={hIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-xs"
                      >
                        <span>✓ {highlight}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveHighlight(hIdx)}
                          className="text-slate-400 hover:text-red-600 transition cursor-pointer ml-1"
                          title="Remove highlight"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Add New Highlight Input */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200/80">
                    <input
                      type="text"
                      value={newHighlightText}
                      onChange={(e) => setNewHighlightText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddHighlight();
                        }
                      }}
                      placeholder="Add a new highlight (e.g. Grand Jamia Mosque, 220ft Boulevard) and press Add..."
                      className="flex-1 px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                    />
                    <button
                      type="button"
                      onClick={handleAddHighlight}
                      className="px-4 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                    >
                      + Add Highlight
                    </button>
                  </div>
                </div>

              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 italic">
                  Changes save directly to the database and update this sector's public page immediately.
                </span>
                <button
                  type="submit"
                  disabled={isSavingBlock}
                  className="px-7 py-3 bg-[#7b002c] hover:bg-[#9e1245] disabled:opacity-60 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition cursor-pointer hover:scale-102"
                >
                  {isSavingBlock ? (
                    <>
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                      <span>Publishing Block Updates...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 text-white" />
                      <span>Save & Publish Block Updates</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Photo Gallery Picker Modal */}
          {galleryPickerTarget && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                      <Camera className="w-5 h-5 text-[#7b002c]" />
                      <span>Select Photo for {galleryPickerTarget === 'hero' ? 'Hero Background Banner' : 'Master Plan Map'}</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Click any photo from your gallery below to set it instantly for {editingBlock?.name}.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setGalleryPickerTarget(null)}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold transition cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Gallery Image Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {galleryList.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        if (galleryPickerTarget === 'hero') {
                          setEditingBlock(prev => ({ ...prev, heroImage: item.imageUrl }));
                        } else {
                          setEditingBlock(prev => ({ ...prev, masterPlanImage: item.imageUrl }));
                        }
                        setGalleryPickerTarget(null);
                      }}
                      className="group relative rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-[#7b002c] shadow-xs hover:shadow-lg transition-all duration-300 aspect-video bg-slate-900 cursor-pointer text-left"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 text-white">
                        <span className="text-[9px] uppercase tracking-wider font-bold bg-[#7b002c] px-1.5 py-0.5 rounded text-white inline-block mb-1">
                          {item.category}
                        </span>
                        <div className="text-[11px] font-bold truncate group-hover:text-amber-300">
                          {item.title}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setGalleryPickerTarget(null)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
                  >
                    Close Picker
                  </button>
                </div>
              </div>
            </div>
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
                  disabled={isSavingLegal}
                  onClick={handleSaveLegalPolicies}
                  className="px-5 py-2 bg-[#7b002c] hover:bg-[#9e1245] disabled:opacity-60 text-white font-bold text-xs rounded-xl shadow flex items-center gap-2 transition cursor-pointer"
                >
                  {isSavingLegal ? (
                    <>
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 text-white" />
                      <span>Save Policy</span>
                    </>
                  )}
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
                disabled={isSavingLegal}
                onClick={handleSaveLegalPolicies}
                className="px-6 py-3 bg-[#7b002c] hover:bg-[#9e1245] disabled:opacity-60 text-white font-bold text-xs rounded-xl shadow flex items-center gap-2 transition cursor-pointer"
              >
                {isSavingLegal ? (
                  <>
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                    <span>Publishing Policies...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 text-white" />
                    <span>Save & Publish Legal Policies</span>
                  </>
                )}
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
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                {/* Cover Image with Gallery Picker & File Upload */}
                <div className="md:col-span-12 space-y-2 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-[#7b002c]" />
                      <span>Article Cover Image</span>
                    </label>
                    {blogImageUrl && (
                      <button
                        type="button"
                        onClick={() => setBlogImageUrl('')}
                        className="text-[10px] text-red-600 hover:underline font-semibold cursor-pointer"
                      >
                        Remove Cover
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setIsBlogCoverGalleryOpen(true)}
                      className="px-3 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Choose Cover from Gallery</span>
                    </button>

                    <label className="px-3 py-1.5 bg-slate-800 hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer flex items-center gap-1.5 shadow-xs transition">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Upload from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setBlogImageUrl(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>

                  <input 
                    type="text" 
                    value={blogImageUrl}
                    onChange={(e) => setBlogImageUrl(e.target.value)}
                    placeholder="Or paste direct cover image URL (e.g. /images/... or https://...)"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                  />

                  {blogImageUrl && (
                    <div className="h-28 rounded-xl overflow-hidden border border-slate-300 relative bg-slate-900 shadow-inner">
                      <img src={blogImageUrl} alt="Cover Preview" className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                        Cover Preview
                      </span>
                    </div>
                  )}
                </div>

                <div className="md:col-span-12 space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Summary (Short Excerpt)</label>
                  <input 
                    type="text" 
                    value={blogSummary}
                    onChange={(e) => setBlogSummary(e.target.value)}
                    placeholder="Brief description summarizing this blog post..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="md:col-span-12 space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Article Content</label>
                  <RichTextEditor
                    value={blogContent}
                    onChange={setBlogContent}
                    galleryPhotos={galleryList}
                    placeholder="Start typing your article here... Select heading styles, insert photos with Alt text, or format lists."
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

                {/* SEO Sub-section with Focus Keyword */}
                <div className="md:col-span-12 border-t border-slate-100 pt-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-sm text-[#7b002c] flex items-center gap-1.5">
                      <Search className="w-4 h-4 text-[#7b002c]" />
                      <span>SEO Optimization & Focus Keyword</span>
                    </h4>
                  </div>

                  {/* Focus Keyword with Real-time Analysis */}
                  <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-2xl space-y-2">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">
                        Primary Focus Keyword <span className="text-[#7b002c] font-bold">*</span>
                      </label>
                      <input 
                        type="text" 
                        value={blogFocusKeyword}
                        onChange={(e) => setBlogFocusKeyword(e.target.value)}
                        placeholder="e.g. Faisal Hills Plot Prices 2026 or Block A Plots"
                        className="w-full px-3.5 py-2 bg-white border border-rose-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:border-[#7b002c]"
                      />
                    </div>

                    {/* Live SEO Score Indicators */}
                    {blogFocusKeyword.trim() && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-[10px] font-bold uppercase text-slate-500">Live SEO Check:</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border ${
                          blogTitle.toLowerCase().includes(blogFocusKeyword.toLowerCase())
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {blogTitle.toLowerCase().includes(blogFocusKeyword.toLowerCase()) ? '✓ in Title' : '⚠ not in Title'}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border ${
                          blogMetaDescription.toLowerCase().includes(blogFocusKeyword.toLowerCase())
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {blogMetaDescription.toLowerCase().includes(blogFocusKeyword.toLowerCase()) ? '✓ in Meta Description' : '⚠ not in Meta Description'}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border ${
                          blogContent.toLowerCase().includes(blogFocusKeyword.toLowerCase())
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {blogContent.toLowerCase().includes(blogFocusKeyword.toLowerCase()) ? '✓ in Content' : '⚠ not in Content'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Meta Title</label>
                      <input 
                        type="text" 
                        value={blogMetaTitle}
                        onChange={(e) => setBlogMetaTitle(e.target.value)}
                        placeholder="Title for search engines (e.g. Faisal Hills 2026 Update)"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Meta Keywords</label>
                      <input 
                        type="text" 
                        value={blogKeywords}
                        onChange={(e) => setBlogKeywords(e.target.value)}
                        placeholder="Comma-separated keywords (e.g. faisal hills, plots, payment plan)"
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
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                {/* Cover Image with Gallery Picker & File Upload */}
                <div className="md:col-span-12 space-y-2 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-[#7b002c]" />
                      <span>Article Cover Image</span>
                    </label>
                    {blogImageUrl && (
                      <button
                        type="button"
                        onClick={() => setBlogImageUrl('')}
                        className="text-[10px] text-red-600 hover:underline font-semibold cursor-pointer"
                      >
                        Remove Cover
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setIsBlogCoverGalleryOpen(true)}
                      className="px-3 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Choose Cover from Gallery</span>
                    </button>

                    <label className="px-3 py-1.5 bg-slate-800 hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer flex items-center gap-1.5 shadow-xs transition">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Upload from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setBlogImageUrl(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>

                  <input 
                    type="text" 
                    value={blogImageUrl}
                    onChange={(e) => setBlogImageUrl(e.target.value)}
                    placeholder="Or paste direct cover image URL (e.g. /images/... or https://...)"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                  />

                  {blogImageUrl && (
                    <div className="h-28 rounded-xl overflow-hidden border border-slate-300 relative bg-slate-900 shadow-inner">
                      <img src={blogImageUrl} alt="Cover Preview" className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                        Cover Preview
                      </span>
                    </div>
                  )}
                </div>

                <div className="md:col-span-12 space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Summary (Short Excerpt)</label>
                  <input 
                    type="text" 
                    value={blogSummary}
                    onChange={(e) => setBlogSummary(e.target.value)}
                    placeholder="Brief description summarizing this blog post..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="md:col-span-12 space-y-1">
                  <label className="block text-xs font-bold text-slate-800">Article Content</label>
                  <RichTextEditor
                    value={blogContent}
                    onChange={setBlogContent}
                    galleryPhotos={galleryList}
                    placeholder="Start typing your article here... Select heading styles, insert photos with Alt text, or format lists."
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

                {/* SEO Sub-section with Focus Keyword */}
                <div className="md:col-span-12 border-t border-slate-100 pt-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-sm text-[#7b002c] flex items-center gap-1.5">
                      <Search className="w-4 h-4 text-[#7b002c]" />
                      <span>SEO Optimization & Focus Keyword</span>
                    </h4>
                  </div>

                  {/* Focus Keyword with Real-time Analysis */}
                  <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-2xl space-y-2">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">
                        Primary Focus Keyword <span className="text-[#7b002c] font-bold">*</span>
                      </label>
                      <input 
                        type="text" 
                        value={blogFocusKeyword}
                        onChange={(e) => setBlogFocusKeyword(e.target.value)}
                        placeholder="e.g. Faisal Hills Plot Prices 2026 or Block A Plots"
                        className="w-full px-3.5 py-2 bg-white border border-rose-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:border-[#7b002c]"
                      />
                    </div>

                    {/* Live SEO Score Indicators */}
                    {blogFocusKeyword.trim() && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-[10px] font-bold uppercase text-slate-500">Live SEO Check:</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border ${
                          blogTitle.toLowerCase().includes(blogFocusKeyword.toLowerCase())
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {blogTitle.toLowerCase().includes(blogFocusKeyword.toLowerCase()) ? '✓ in Title' : '⚠ not in Title'}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border ${
                          blogMetaDescription.toLowerCase().includes(blogFocusKeyword.toLowerCase())
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {blogMetaDescription.toLowerCase().includes(blogFocusKeyword.toLowerCase()) ? '✓ in Meta Description' : '⚠ not in Meta Description'}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border ${
                          blogContent.toLowerCase().includes(blogFocusKeyword.toLowerCase())
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {blogContent.toLowerCase().includes(blogFocusKeyword.toLowerCase()) ? '✓ in Content' : '⚠ not in Content'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Meta Title</label>
                      <input 
                        type="text" 
                        value={blogMetaTitle}
                        onChange={(e) => setBlogMetaTitle(e.target.value)}
                        placeholder="Title for search engines (e.g. Faisal Hills 2026 Update)"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Meta Keywords</label>
                      <input 
                        type="text" 
                        value={blogKeywords}
                        onChange={(e) => setBlogKeywords(e.target.value)}
                        placeholder="Comma-separated keywords (e.g. faisal hills, plots, payment plan)"
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
      {/* ========================================================================= */}
      {/* MODAL: EDIT SERIES PRICE & TAG                                            */}
      {/* ========================================================================= */}
      {isSeriesModalOpen && editingSeries && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7b002c]">
                  {currentSeriesBlockName} • {selectedSeriesSize}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  Edit Series {editingSeries.label} Price &amp; Tag
                </h3>
              </div>
              <button
                onClick={() => setIsSeriesModalOpen(false)}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSeries} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Display Label</label>
                  <input
                    type="text"
                    value={editingSeries.label}
                    onChange={(e) =>
                      setEditingSeries({ ...editingSeries, label: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    placeholder="e.g. 001–200"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Plot Number Range</label>
                  <div className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500 font-mono">
                    #{editingSeries.start} to #{editingSeries.end}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Sector / Zone Title (Tag)
                </label>
                <input
                  type="text"
                  value={editingSeries.tag}
                  onChange={(e) =>
                    setEditingSeries({ ...editingSeries, tag: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  placeholder="e.g. Main Boulevard Front, Central Commercial Sector..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Min Price (PKR)
                  </label>
                  <input
                    type="number"
                    value={editingSeries.minPrice}
                    onChange={(e) =>
                      setEditingSeries({ ...editingSeries, minPrice: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    placeholder="e.g. 5800000"
                    required
                  />
                  <span className="text-[11px] text-emerald-700 font-mono font-bold block">
                    {formatPKR(parseFloat(editingSeries.minPrice) || 0)}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Max Price (PKR)
                  </label>
                  <input
                    type="number"
                    value={editingSeries.maxPrice}
                    onChange={(e) =>
                      setEditingSeries({ ...editingSeries, maxPrice: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    placeholder="e.g. 6800000"
                    required
                  />
                  <span className="text-[11px] text-emerald-700 font-mono font-bold block">
                    {formatPKR(parseFloat(editingSeries.maxPrice) || 0)}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                  Public Site Live Preview
                </span>
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800">
                    Series {editingSeries.label} ({editingSeries.tag || 'Sector'})
                  </span>
                  <span className="text-[#7b002c] font-serif text-sm">
                    {formatPriceRange(
                      parseFloat(editingSeries.minPrice) || 0,
                      parseFloat(editingSeries.maxPrice) || 0
                    )}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsSeriesModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-md cursor-pointer hover:scale-105"
                >
                  Save Series Price
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD NEW SERIES RANGE                                               */}
      {/* ========================================================================= */}
      {isAddSeriesModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  {currentSeriesBlockName} • {selectedSeriesSize}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  Add New Series Range
                </h3>
              </div>
              <button
                onClick={() => setIsAddSeriesModalOpen(false)}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveNewSeries} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Start Plot #</label>
                  <input
                    type="number"
                    value={newSeriesData.start}
                    onChange={(e) =>
                      setNewSeriesData({
                        ...newSeriesData,
                        start: e.target.value,
                        label: `${e.target.value}–${newSeriesData.end || ''}`,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                    placeholder="e.g. 401"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">End Plot #</label>
                  <input
                    type="number"
                    value={newSeriesData.end}
                    onChange={(e) =>
                      setNewSeriesData({
                        ...newSeriesData,
                        end: e.target.value,
                        label: `${newSeriesData.start || ''}–${e.target.value}`,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                    placeholder="e.g. 600"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Display Label</label>
                  <input
                    type="text"
                    value={newSeriesData.label}
                    onChange={(e) =>
                      setNewSeriesData({ ...newSeriesData, label: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                    placeholder="e.g. 401–600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Sector Tag</label>
                  <input
                    type="text"
                    value={newSeriesData.tag}
                    onChange={(e) =>
                      setNewSeriesData({ ...newSeriesData, tag: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                    placeholder="e.g. Margalla View Crest"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Min Price (PKR)</label>
                  <input
                    type="number"
                    value={newSeriesData.minPrice}
                    onChange={(e) =>
                      setNewSeriesData({ ...newSeriesData, minPrice: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                    placeholder="e.g. 5500000"
                    required
                  />
                  <span className="text-[11px] text-emerald-700 font-mono font-bold block">
                    {formatPKR(parseFloat(newSeriesData.minPrice) || 0)}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Max Price (PKR)</label>
                  <input
                    type="number"
                    value={newSeriesData.maxPrice}
                    onChange={(e) =>
                      setNewSeriesData({ ...newSeriesData, maxPrice: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                    placeholder="e.g. 6500000"
                    required
                  />
                  <span className="text-[11px] text-emerald-700 font-mono font-bold block">
                    {formatPKR(parseFloat(newSeriesData.maxPrice) || 0)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddSeriesModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-md cursor-pointer hover:scale-105"
                >
                  Add Series Range
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ========================================================================= */}
      {/* MODAL: QUICK EDIT PLOT PRICE & DETAILS                                    */}
      {/* ========================================================================= */}
      {isQuickEditPlotOpen && quickEditPlot && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7b002c]">
                  {allBlocksList.find((b) => b.slug === quickEditPlot.blockSlug)?.name || 'Block A'} • {quickEditPlot.size}
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Edit Plot #{quickEditPlot.plotNumber} Price
                </h3>
              </div>
              <button
                onClick={() => setIsQuickEditPlotOpen(false)}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveQuickEditPlot} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Plot Number</label>
                  <input
                    type="number"
                    value={quickEditPlot.plotNumber}
                    onChange={(e) =>
                      setQuickEditPlot({ ...quickEditPlot, plotNumber: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Feature / Location</label>
                  <select
                    value={quickEditPlot.locationType}
                    onChange={(e) =>
                      setQuickEditPlot({ ...quickEditPlot, locationType: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c] cursor-pointer"
                  >
                    <option value="Standard">Standard Plot</option>
                    <option value="Corner">Corner Plot</option>
                    <option value="Park Facing">Park Facing</option>
                    <option value="Corner + Park">Corner + Park</option>
                    <option value="Main Boulevard">Main Boulevard</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Plot Price (PKR)</label>
                <input
                  type="number"
                  value={quickEditPlot.price}
                  onChange={(e) =>
                    setQuickEditPlot({ ...quickEditPlot, price: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  placeholder="e.g. 5800000"
                  required
                />
                <span className="text-xs text-[#7b002c] font-mono font-bold block pt-1">
                  Preview: {formatPKR(parseFloat(quickEditPlot.price) || 0)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleDeleteQuickEditPlot(quickEditPlot.id, quickEditPlot.plotNumber)}
                  className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1 border border-rose-200"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Plot</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsQuickEditPlotOpen(false)}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-md cursor-pointer hover:scale-105"
                  >
                    Update Price
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: QUICK ADD PLOT TO SERIES                                          */}
      {/* ========================================================================= */}
      {isQuickAddPlotOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  {allBlocksList.find((b) => b.slug === quickAddPlotData.blockSlug)?.name || 'Block A'} • {quickAddPlotData.size}
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Add Plot to Series
                </h3>
              </div>
              <button
                onClick={() => setIsQuickAddPlotOpen(false)}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveQuickAddPlot} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Plot Number (#)</label>
                  <input
                    type="number"
                    value={quickAddPlotData.plotNumber}
                    onChange={(e) =>
                      setQuickAddPlotData({ ...quickAddPlotData, plotNumber: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                    placeholder="e.g. 25"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Feature / Category</label>
                  <select
                    value={quickAddPlotData.locationType}
                    onChange={(e) =>
                      setQuickAddPlotData({ ...quickAddPlotData, locationType: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600 cursor-pointer"
                  >
                    <option value="Standard">Standard</option>
                    <option value="Corner">Corner</option>
                    <option value="Park Facing">Park Facing</option>
                    <option value="Corner + Park">Corner + Park</option>
                    <option value="Main Boulevard">Main Boulevard</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Plot Demand Price (PKR)</label>
                <input
                  type="number"
                  value={quickAddPlotData.price}
                  onChange={(e) =>
                    setQuickAddPlotData({ ...quickAddPlotData, price: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-emerald-600"
                  placeholder="e.g. 5800000"
                  required
                />
                <span className="text-xs text-emerald-700 font-mono font-bold block pt-1">
                  Preview: {formatPKR(parseFloat(quickAddPlotData.price) || 0)}
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsQuickAddPlotOpen(false)}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-md cursor-pointer hover:scale-105"
                >
                  Add Plot to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SELECT BLOG COVER FROM PHOTO GALLERY */}
      {isBlogCoverGalleryOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#7b002c]" />
                  <span>Select Blog Cover Image from Photo Gallery</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click any photo below to set it as the article cover image.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsBlogCoverGalleryOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {galleryList.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setBlogImageUrl(item.imageUrl);
                    setIsBlogCoverGalleryOpen(false);
                  }}
                  className="group relative rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-[#7b002c] shadow-xs hover:shadow-lg transition-all duration-300 aspect-video bg-slate-900 cursor-pointer text-left"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <span className="text-[9px] uppercase tracking-wider font-bold bg-[#7b002c] px-1.5 py-0.5 rounded text-white inline-block mb-1">
                      {item.category}
                    </span>
                    <div className="text-[11px] font-bold truncate">
                      {item.title}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsBlogCoverGalleryOpen(false)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Close Picker
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

