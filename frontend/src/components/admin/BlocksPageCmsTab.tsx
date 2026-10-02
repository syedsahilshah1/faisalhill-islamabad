'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  BlocksPageCMSData,
  initialBlocksPageCMS,
  fetchBlocksPageCMS,
  saveBlocksPageCMS,
  mergeBlocksCMS,
  PrimeBlockCMSData,
  initialPrimeBlockCMS,
  fetchPrimeBlockCMS,
  savePrimeBlockCMS,
  mergePrimeBlockCMS,
  BlockBCMSData,
  initialBlockBCMS,
  fetchBlockBCMS,
  saveBlockBCMS,
  mergeBlockBCMS,
  BlockDCMSData,
  initialBlockDCMS,
  fetchBlockDCMS,
  saveBlockDCMS,
  mergeBlockDCMS,
  BlockACMSData,
  initialBlockACMS,
  fetchBlockACMS,
  saveBlockACMS,
  mergeBlockACMS,
  cleanVerifyText,
  BlockInfo,
  blocksData,
  fetchBlocks,
  apiUpdateBlock,
  apiUpdateSetting,
  GalleryItem,
  fetchGallery
} from '@/data/faisalHillsData';
import BlockACmsEditor from '@/components/admin/BlockACmsEditor';
import BlockBCmsEditor from '@/components/admin/BlockBCmsEditor';
import BlockDCmsEditor from '@/components/admin/BlockDCmsEditor';
import PrimeBlockCmsEditor from '@/components/admin/PrimeBlockCmsEditor';
import CmsRichTextarea from '@/components/admin/CmsRichTextarea';
import {
  Save, RefreshCw, CheckCircle2, AlertCircle, Plus, Trash2, ChevronDown, ChevronUp,
  Image as ImageIcon, Sparkles, Building2, MapPin, Layers, PhoneCall, MessageCircle, HelpCircle,
  Star, ShieldCheck, Eye, Compass, Award, FileText, Check, DollarSign, ListChecks,
  Upload, Camera, Link2, X, ExternalLink, Loader2, Globe,
  Trees,
  Activity
} from 'lucide-react';

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

interface BlocksPageCmsTabProps {
  token?: string | null;
}

export default function BlocksPageCmsTab({ token }: BlocksPageCmsTabProps) {
  const [cms, setCms] = useState<BlocksPageCMSData>(initialBlocksPageCMS);
  const [primeCms, setPrimeCms] = useState<PrimeBlockCMSData>(initialPrimeBlockCMS);
  const [blockACms, setBlockACms] = useState<BlockACMSData>(initialBlockACMS);
  const [blockBCms, setBlockBCms] = useState<BlockBCMSData>(initialBlockBCMS);
  const [blockDCms, setBlockDCms] = useState<BlockDCMSData>(initialBlockDCMS);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Individual Block Detail Management State
  const [blocksList, setBlocksList] = useState<BlockInfo[]>(blocksData);
  const [selectedBlockSlug, setSelectedBlockSlug] = useState<string>('executive-block');
  const [editingBlock, setEditingBlock] = useState<BlockInfo | null>(blocksData[0]);
  const [isSavingBlock, setIsSavingBlock] = useState(false);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [galleryPickerTarget, setGalleryPickerTarget] = useState<'hero' | 'masterPlan' | 'commercialHero' | null>(null);
  const [commercialHeroImage, setCommercialHeroImage] = useState<string>('/images/hills-walk-commercial-aerial.webp');
  const [isSavingCommercialHero, setIsSavingCommercialHero] = useState(false);
  const [newHighlightText, setNewHighlightText] = useState<string>('');

  // Load live data on mount
  useEffect(() => {
    fetchBlocksPageCMS().then((data) => {
      if (data) setCms(mergeBlocksCMS(data));
    });

    fetchBlockACMS().then((aData) => {
      if (aData) setBlockACms(mergeBlockACMS(aData));
    });

    fetchPrimeBlockCMS().then((pData) => {
      if (pData) setPrimeCms(mergePrimeBlockCMS(pData));
    });

    fetchBlockBCMS().then((bData) => {
      if (bData) setBlockBCms(mergeBlockBCMS(bData));
    });

    fetchBlockDCMS().then((dData) => {
      if (dData) setBlockDCms(mergeBlockDCMS(dData));
    });

    fetchBlocks().then((data) => {
      if (data && data.length > 0) {
        try {
          if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('faisal_blocks_custom_v1');
            if (stored) {
              const customMap = JSON.parse(stored);
              const merged = data.map(b => customMap[b.slug] ? { ...b, ...customMap[b.slug] } : b);
              setBlocksList(merged);
              const cur = merged.find(b => b.slug === selectedBlockSlug) || merged[0];
              setEditingBlock(cur);
              return;
            }
          }
        } catch {}
        setBlocksList(data);
        const cur = data.find(b => b.slug === selectedBlockSlug) || data[0];
        setEditingBlock(cur);
      }
    });

    fetchGallery().then((g) => {
      if (g && g.length > 0) setGalleryList(g);
    });

    try {
      if (typeof window !== 'undefined') {
        const commImg = localStorage.getItem('faisal_commercial_hero_image');
        if (commImg) setCommercialHeroImage(commImg);
      }
    } catch {}

    const handleStorage = () => {
      try {
        const local = localStorage.getItem('faisal_blocks_cms');
        if (local) setCms(mergeBlocksCMS(JSON.parse(local)));
      } catch {}
      try {
        const aLocal = localStorage.getItem('faisal_block_a_cms');
        if (aLocal) setBlockACms(mergeBlockACMS(JSON.parse(aLocal)));
      } catch {}
      try {
        const pLocal = localStorage.getItem('faisal_prime_block_cms');
        if (pLocal) setPrimeCms(mergePrimeBlockCMS(JSON.parse(pLocal)));
      } catch {}
      try {
        const bLocal = localStorage.getItem('faisal_block_b_cms');
        if (bLocal) setBlockBCms(mergeBlockBCMS(JSON.parse(bLocal)));
      } catch {}
      try {
        const dLocal = localStorage.getItem('faisal_block_d_cms');
        if (dLocal) setBlockDCms(mergeBlockDCMS(JSON.parse(dLocal)));
      } catch {}
    };

    window.addEventListener('faisal_blocks_cms_updated', handleStorage);
    window.addEventListener('faisal_block_a_cms_updated', handleStorage);
    window.addEventListener('faisal_prime_block_cms_updated', handleStorage);
    window.addEventListener('faisal_block_b_cms_updated', handleStorage);
    window.addEventListener('faisal_block_d_cms_updated', handleStorage);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('faisal_blocks_cms_updated', handleStorage);
      window.removeEventListener('faisal_block_a_cms_updated', handleStorage);
      window.removeEventListener('faisal_prime_block_cms_updated', handleStorage);
      window.removeEventListener('faisal_block_b_cms_updated', handleStorage);
      window.removeEventListener('faisal_block_d_cms_updated', handleStorage);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

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
      } catch (innerErr) {}
    }
  };

  const handleSaveBlock = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!editingBlock) return;
    setIsSavingBlock(true);
    
    const activeToken = token || (typeof window !== 'undefined' ? sessionStorage.getItem('faisal_admin_token') : null) || '';

    setBlocksList(prev => prev.map(b => (b.slug === editingBlock.slug || (editingBlock.id && b.id === editingBlock.id)) ? { ...b, ...editingBlock } as BlockInfo : b));
    safeSaveBlocksLocally(editingBlock);

    if (activeToken) {
      try {
        const identifier = editingBlock.slug || editingBlock.id || '';
        if (identifier) {
          const updated = await apiUpdateBlock(identifier, editingBlock, activeToken);
          setBlocksList(prev => prev.map(b => (b.id === updated.id || b.slug === updated.slug) ? updated : b));
          setEditingBlock(updated);
        }
      } catch (err) {
        console.error('API block update error, saved locally:', err);
      }
    }

    setIsSavingBlock(false);
    setStatusMsg(`Block "${editingBlock.name}" updated and published successfully!`);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const handleSaveCommercialHero = async () => {
    setIsSavingCommercialHero(true);
    const activeToken = token || (typeof window !== 'undefined' ? sessionStorage.getItem('faisal_admin_token') : null) || '';
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('faisal_commercial_hero_image', commercialHeroImage);
    }
    
    if (activeToken) {
      try {
        await apiUpdateSetting('commercial_hero_image', commercialHeroImage, activeToken);
      } catch (err) {
        console.error('Failed to update commercial hero image via API:', err);
      }
    }
    setIsSavingCommercialHero(false);
    setStatusMsg('Commercial Hub hero background image updated and published successfully!');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const handleAddHighlight = () => {
    if (!newHighlightText.trim() || !editingBlock) return;
    const currentHighlights = editingBlock.highlights || [];
    setEditingBlock({
      ...editingBlock,
      highlights: [...currentHighlights, newHighlightText.trim()]
    });
    setNewHighlightText('');
  };

  const handleRemoveHighlight = (idx: number) => {
    if (!editingBlock || !editingBlock.highlights) return;
    setEditingBlock({
      ...editingBlock,
      highlights: editingBlock.highlights.filter((_, i) => i !== idx)
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setStatusMsg('');
    const activeToken = token || (typeof window !== 'undefined' ? sessionStorage.getItem('faisal_admin_token') || undefined : undefined);
    const okBlocks = await saveBlocksPageCMS(cms, activeToken);
    const okBlockA = await saveBlockACMS(blockACms, activeToken);
    const okPrime = await savePrimeBlockCMS(primeCms, activeToken);
    const okBlockB = await saveBlockBCMS(blockBCms, activeToken);
    const okBlockD = await saveBlockDCMS(blockDCms, activeToken);
    if (editingBlock) {
      safeSaveBlocksLocally(editingBlock);
      if (activeToken) {
        const identifier = editingBlock.slug || editingBlock.id || '';
        if (identifier) {
          apiUpdateBlock(identifier, editingBlock, activeToken).catch(() => {});
        }
      }
    }
    setIsSaving(false);
    if (okBlocks || okBlockA || okPrime || okBlockB || okBlockD) {
      setSaveSuccess(true);
      setStatusMsg('Blocks, Block A, Block B, Block D, and Prime Block content successfully saved and published live!');
      setTimeout(() => setSaveSuccess(false), 4000);
    } else {
      setStatusMsg('Saved locally in browser. Note: API sync pending backend authentication.');
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    }
  };

  const handleResetToAuditedDefaults = () => {
    if (window.confirm('Are you sure you want to reset all Blocks, Block A, Block B, Block D, and Prime Block sections to official audited defaults?')) {
      setCms(initialBlocksPageCMS);
      setBlockACms(initialBlockACMS);
      setPrimeCms(initialPrimeBlockCMS);
      setBlockBCms(initialBlockBCMS);
      setBlockDCms(initialBlockDCMS);
      setStatusMsg('Reset to audited defaults. Click "Save Live Changes" to publish.');
    }
  };

  const [mainScope, setMainScope] = useState<'individual-blocks' | 'main-page-sections'>('individual-blocks');

  const societyBlocksList = [
    {
      id: 'block-a',
      name: 'Block A',
      tagline: 'Largest Established & Populated Sector',
      type: 'detailed-cms',
      cmsKey: 'blockA',
      badge: '⭐ Full 16-Section CMS',
      badgeColor: 'bg-rose-100 text-[#7b002c] border-rose-300',
      icon: Sparkles,
      slug: 'block-a',
      path: '/blocks/block-a'
    },
    {
      id: 'block-d',
      name: 'Block D',
      tagline: 'Margalla Scenic & Economical Living',
      type: 'detailed-cms',
      cmsKey: 'blockD',
      badge: '⭐ Full 10-Section CMS',
      badgeColor: 'bg-rose-100 text-[#7b002c] border-rose-300',
      icon: Sparkles,
      slug: 'block-d',
      path: '/blocks/block-d'
    },
    {
      id: 'block-b',
      name: 'Block B',
      tagline: 'Sports & Elevated Living Capital',
      type: 'detailed-cms',
      cmsKey: 'blockB',
      badge: '⭐ Full 10-Section CMS',
      badgeColor: 'bg-rose-100 text-[#7b002c] border-rose-300',
      icon: Sparkles,
      slug: 'block-b',
      path: '/blocks/block-b'
    },
    {
      id: 'prime-block',
      name: 'Prime Block',
      tagline: 'Flagship Luxury Enclave',
      type: 'detailed-cms',
      cmsKey: 'primeBlock',
      badge: '⭐ Full 12-Section CMS',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      icon: Star,
      slug: 'prime-block',
      path: '/blocks/prime-block'
    },
    {
      id: 'executive-block',
      name: 'Executive Block',
      tagline: 'Main Entrance & 225ft Boulevard',
      type: 'individual-block',
      slug: 'executive-block',
      badge: '🏛️ Sector Detail Page',
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
      icon: Building2,
      path: '/blocks/executive-block'
    },
    {
      id: 'block-b1-extension',
      name: 'Block B1 Extension',
      tagline: 'Fast Developing Modern Sector',
      type: 'individual-block',
      slug: 'block-b1-extension',
      badge: '🏛️ Sector Detail Page',
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
      icon: Building2,
      path: '/blocks/block-b1-extension'
    },
    {
      id: 'block-c',
      name: 'Block C',
      tagline: 'M-1 Interchange Gateway & Hills Walk',
      type: 'individual-block',
      slug: 'block-c',
      badge: '🏛️ Sector Detail Page',
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
      icon: Building2,
      path: '/blocks/block-c'
    },
    {
      id: 'hills-walk',
      name: 'Hills Walk Commercial',
      tagline: 'Dining & Retail Promenade',
      type: 'individual-block',
      slug: 'hills-walk',
      badge: '🛍️ Commercial Hub',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      icon: Building2,
      path: '/blocks/hills-walk'
    },
    {
      id: 'faisal-jewels',
      name: 'Faisal Jewel',
      tagline: '27-Storey Skyscraper Landmark',
      type: 'individual-block',
      slug: 'faisal-jewel-islamabad',
      badge: '🏙️ Luxury Highrise',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
      icon: Building2,
      path: '/blocks/faisal-jewel-islamabad'
    }
  ];

  const overviewTabs = [
    { id: 'hero', label: '🌟 Hero & Counters', icon: Sparkles },
    { id: 'glance', label: '📊 At a Glance Table', icon: Layers },
    { id: 'stages', label: '📜 Growth Stages', icon: FileText },
    { id: 'map', label: '🗺️ Map & Road Placement', icon: MapPin },
    { id: 'blocks', label: '🏢 7 Block Profiles (Overview)', icon: Layers },
    { id: 'dimensions', label: '📐 Plot Sizes & Marla', icon: Compass },
    { id: 'prices', label: '💰 Plot Prices & Supply', icon: DollarSign },
    { id: 'status', label: '🏗️ Development & Infra', icon: Award },
    { id: 'decision', label: '🎯 Decision & Glossary', icon: ListChecks },
    { id: 'dueDiligence', label: '✅ 6-Step Checklist', icon: ShieldCheck },
    { id: 'faqs', label: '❓ 10 FAQs Accordion', icon: HelpCircle },
    { id: 'cta', label: '📞 Compare Desk & CTA', icon: PhoneCall },
  ];

  const isCurrentBlock = (b: typeof societyBlocksList[0]) => {
    if (b.type === 'detailed-cms') return activeSection === b.cmsKey;
    if (b.type === 'prime-cms') return activeSection === 'primeBlock';
    if (b.type === 'individual-block') {
      return activeSection === 'individualBlocks' && (selectedBlockSlug === b.slug || (b.slug === 'faisal-jewel-islamabad' && selectedBlockSlug === 'faisal-jewels'));
    }
    return false;
  };

  const handleSelectSocietyBlock = (b: typeof societyBlocksList[0]) => {
    setMainScope('individual-blocks');
    if (b.type === 'detailed-cms' && b.cmsKey) {
      setActiveSection(b.cmsKey);
    } else if (b.type === 'prime-cms') {
      setActiveSection('primeBlock');
    } else {
      setActiveSection('individualBlocks');
      handleSelectBlockToEdit(b.slug);
    }
  };

  const activeBlockObject = societyBlocksList.find(b => isCurrentBlock(b));

  return (
    <div className="space-y-6">
      
      {/* Top Controls Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              Faisal Hills Blocks & Sectors CMS
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
              100% Dynamic Control
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Choose any individual sector below to edit its complete dedicated page, or edit the society-wide comparison overview.
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
            href={activeBlockObject ? activeBlockObject.path : '/faisal-hills-blocks/'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#7b002c] hover:bg-rose-50 border border-rose-200 rounded-xl transition cursor-pointer"
          >
            <span>Preview {activeBlockObject ? activeBlockObject.name : 'Overview Page'}</span>
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

      {/* Mode Scope Switcher */}
      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setMainScope('individual-blocks');
              if (!['blockD', 'blockB', 'primeBlock', 'individualBlocks'].includes(activeSection)) {
                setActiveSection('blockD');
              }
            }}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mainScope === 'individual-blocks'
                ? 'bg-[#7b002c] text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>1. Individual Sector Pages (/blocks/[slug])</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
              mainScope === 'individual-blocks' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              9 Blocks
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMainScope('main-page-sections');
              if (['blockD', 'blockB', 'primeBlock', 'individualBlocks'].includes(activeSection)) {
                setActiveSection('hero');
              }
            }}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mainScope === 'main-page-sections'
                ? 'bg-[#7b002c] text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>2. Society Comparison Overview Page (/faisal-hills-blocks)</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
              mainScope === 'main-page-sections' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              12 Sections
            </span>
          </button>
        </div>

        {activeBlockObject && mainScope === 'individual-blocks' && (
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-rose-50 border border-rose-200 rounded-xl text-xs">
            <span className="text-slate-500 font-medium">Currently Editing:</span>
            <strong className="text-[#7b002c] font-bold">{activeBlockObject.name}</strong>
          </div>
        )}
      </div>

      {/* SEPARATE BLOCK BUTTONS BAR: Rendered when in Individual Blocks Mode */}
      {mainScope === 'individual-blocks' && (
        <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7b002c] animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Click Any Block Button Below to Open Its Full Section Editor:
              </h3>
            </div>
            <span className="text-[11px] text-slate-500 hidden sm:inline font-medium">
              Clicking a block immediately opens its complete live management form.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2.5">
            {societyBlocksList.map((block) => {
              const active = isCurrentBlock(block);
              const Icon = block.icon;
              return (
                <button
                  key={block.id}
                  type="button"
                  onClick={() => handleSelectSocietyBlock(block)}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2 relative overflow-hidden group ${
                    active
                      ? 'bg-gradient-to-r from-[#7b002c] to-[#9e1245] text-white border-[#7b002c] shadow-md ring-2 ring-[#7b002c]/30 scale-[1.01]'
                      : 'bg-white hover:bg-slate-100/90 text-slate-800 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        active ? 'bg-white/20 text-white' : 'bg-rose-50 text-[#7b002c]'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-sm truncate">
                        {block.name}
                      </span>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                      active ? 'bg-white/20 text-white border-white/30' : block.badgeColor
                    }`}>
                      {block.badge}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100/40">
                    <span className={`truncate ${active ? 'text-rose-100' : 'text-slate-500'}`}>
                      {block.tagline}
                    </span>
                    {active && (
                      <span className="text-[10px] font-bold bg-white text-[#7b002c] px-2 py-0.5 rounded-md shrink-0 shadow-2xs">
                        Active Editor ✓
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* OVERVIEW PAGE SUB-TABS: Rendered when in Society Comparison Overview Mode */}
      {mainScope === 'main-page-sections' && (
        <div className="flex flex-wrap items-center gap-2 bg-slate-200/70 p-2 rounded-2xl border border-slate-300">
          {overviewTabs.map((tab) => {
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
      )}

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
      {/* SECTION: BLOCK B DETAILED CMS (ALL SECTIONS)              */}
      {/* ========================================================= */}
      {activeSection === 'blockB' && (
        <BlockBCmsEditor
          blockBCms={blockBCms}
          setBlockBCms={setBlockBCms}
          token={token}
          onSaveSuccess={(msg) => {
            setSaveSuccess(true);
            setStatusMsg(msg);
            setTimeout(() => setSaveSuccess(false), 4000);
          }}
        />
      )}

      {/* ========================================================= */}
      {/* SECTION: BLOCK D DETAILED CMS (ALL SECTIONS)              */}
      {/* ========================================================= */}
      {activeSection === 'blockD' && (
        <BlockDCmsEditor
          blockDCms={blockDCms}
          setBlockDCms={setBlockDCms}
          token={token}
          onSaveSuccess={(msg) => {
            setSaveSuccess(true);
            setStatusMsg(msg);
            setTimeout(() => setSaveSuccess(false), 4000);
          }}
        />
      )}

      {/* ========================================================= */}
      {/* SECTION: INDIVIDUAL SECTOR PAGES & MEDIA (/blocks/[slug]) */}
      {/* ========================================================= */}
      {activeSection === 'individualBlocks' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#7b002c] uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-[#7b002c]" />
                <span>Individual Society Blocks & Media Management</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Edit Sector Headings, Descriptions, Media & NOC Details
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Select any block below to manage its specific hero banner, layout map, pricing ranges, and content for <code className="text-[#7b002c] font-mono bg-slate-100 px-1 py-0.5 rounded">/blocks/[slug]</code>.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                {blocksList.length} Society Blocks
              </span>
              <a
                href={`/blocks/${selectedBlockSlug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-rose-50 text-[#7b002c] border border-rose-200 hover:bg-rose-100 transition inline-flex items-center gap-1.5"
              >
                <span>View Live Block</span>
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

          {/* Prime Block Dedicated CMS Banner Notice */}
          {selectedBlockSlug === 'prime-block' && (
            <div className="bg-gradient-to-r from-amber-50 to-amber-100/60 border-2 border-amber-300 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif font-bold text-base text-slate-900">
                      Prime Block Features a Dedicated 12-Section CMS
                    </h4>
                    <span className="px-2 py-0.5 bg-amber-200 text-amber-900 text-[10px] font-bold rounded-full uppercase">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 mt-0.5">
                    Manage all 12 sections: 4-year installment plan tables, plot sizes & dimensions, 8 facility cards, development status checklist, and FAQs.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveSection('primeBlock')}
                className="px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer shrink-0 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Open Dedicated Prime Block CMS →</span>
              </button>
            </div>
          )}

          {/* Block B Dedicated CMS Banner Notice */}
          {selectedBlockSlug === 'block-b' && (
            <div className="bg-gradient-to-r from-rose-50 to-rose-100/60 border-2 border-rose-300 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#7b002c] text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-slate-900">
                    Block B Features a Dedicated 13-Section CMS
                  </h4>
                  <p className="text-xs text-slate-700 mt-0.5">
                    Manage all 13 sections: sports arena, 2-kanal plot checks, price per sqft comparisons, and amenities.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveSection('blockB')}
                className="px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer shrink-0 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-rose-200" />
                <span>Open Dedicated Block B CMS →</span>
              </button>
            </div>
          )}

          {/* Block D Dedicated CMS Banner Notice */}
          {selectedBlockSlug === 'block-d' && (
            <div className="bg-gradient-to-r from-rose-50 to-rose-100/60 border-2 border-rose-300 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#7b002c] text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-slate-900">
                    Block D Features a Dedicated 10-Section CMS
                  </h4>
                  <p className="text-xs text-slate-700 mt-0.5">
                    Manage all 10 sections: price schedule matrix, travel time benchmarks, 6 investment reasons, and amenities.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveSection('blockD')}
                className="px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer shrink-0 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-rose-200" />
                <span>Open Dedicated Block D CMS →</span>
              </button>
            </div>
          )}

          {/* Commercial Hub Hero Banner Card (Active for Hills Walk / Commercial) */}
          {selectedBlockSlug === 'hills-walk' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-purple-200/80 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-purple-700 text-white flex items-center justify-center font-bold shadow-sm">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-slate-900">
                      Commercial Hub Hero Background Banner
                    </h4>
                    <span className="text-xs text-slate-500 font-medium">
                      Live Route: <code className="text-purple-700 bg-slate-100 px-1.5 py-0.5 rounded font-mono font-bold">/faisal-hills-commercial</code>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="/faisal-hills-commercial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition inline-flex items-center gap-1.5"
                  >
                    <span>View Commercial Page</span>
                    <Globe className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={handleSaveCommercialHero}
                    disabled={isSavingCommercialHero}
                    className="px-5 py-2 bg-purple-700 hover:bg-purple-800 disabled:opacity-60 text-white font-bold text-xs rounded-xl shadow flex items-center gap-2 transition cursor-pointer"
                  >
                    {isSavingCommercialHero ? (
                      <>
                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 text-white" />
                        <span>Save Commercial Banner</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-purple-700" />
                      <span>Upload or Select Commercial Banner</span>
                    </label>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setGalleryPickerTarget('commercialHero')}
                        className="px-3.5 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Choose from Photo Gallery</span>
                      </button>

                      <label className="px-3.5 py-2 bg-slate-800 hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer flex items-center gap-1.5 shadow-xs transition">
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
                                  setCommercialHeroImage(dataUrl);
                                }
                              });
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-slate-600">Background Image URL:</span>
                    <input
                      type="text"
                      value={commercialHeroImage}
                      onChange={(e) => setCommercialHeroImage(e.target.value)}
                      placeholder="e.g. /images/commercial/flagship-store.webp or https://..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-purple-700 focus:bg-white"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Commercial Presets:</span>
                    {[
                      { label: 'Flagship Store', url: '/images/commercial/flagship-store.webp' },
                      { label: 'Hypermarket Plaza', url: '/images/commercial/hypermarket.webp' },
                      { label: 'Food Court Hub', url: '/images/commercial/food-court.webp' },
                      { label: 'Boutique Lifestyle', url: '/images/commercial/lifestyle-boutique.jpg' },
                      { label: 'Executive Aerial', url: '/images/faisal-hills-executive-block.webp' },
                    ].map((preset, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => setCommercialHeroImage(preset.url)}
                        className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-purple-50 hover:text-purple-700 border border-slate-200 font-medium transition cursor-pointer"
                      >
                        + {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-slate-600 block">Live Banner Preview:</span>
                    <div className="h-44 rounded-2xl overflow-hidden border border-slate-300 relative bg-slate-900 shadow-md group">
                      <img
                        src={commercialHeroImage}
                        alt="Commercial Hero Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/50 flex flex-col justify-end p-4 text-white">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">Commercial Hub</span>
                        <strong className="font-serif text-sm line-clamp-1">Faisal Hills Commercial Plots for Sale</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Active Block Edit Form */}
          {editingBlock && (
            <form onSubmit={handleSaveBlock} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center font-bold font-serif text-xl border border-[#7b002c]/20">
                    {editingBlock.name?.replace('Block ', '').charAt(0) || 'B'}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg sm:text-xl text-slate-900">
                      Editing: {editingBlock.name}
                    </h4>
                    <span className="text-xs text-slate-500 font-medium">
                      Sector Slug: <code className="text-[#7b002c] bg-slate-100 px-1.5 py-0.5 rounded font-mono font-bold">/blocks/{editingBlock.slug}</code>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`/blocks/${editingBlock.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition inline-flex items-center gap-1.5"
                  >
                    <span>View Public Page</span>
                    <Globe className="w-3.5 h-3.5" />
                  </a>

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
                        <span>Save &amp; Publish Block</span>
                      </>
                    )}
                  </button>
                </div>
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
                        onClick={() => setEditingBlock(prev => prev ? ({ ...prev, heroImage: '' }) : null)}
                        className="text-[10px] text-red-600 hover:underline font-semibold cursor-pointer"
                      >
                        Remove Image
                      </button>
                    )}
                  </div>

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
                                setEditingBlock(prev => prev ? ({ ...prev, heroImage: dataUrl }) : null);
                              }
                            });
                          }
                        }}
                      />
                    </label>
                  </div>

                  <input
                    type="text"
                    value={editingBlock.heroImage || ''}
                    onChange={(e) => setEditingBlock(prev => prev ? ({ ...prev, heroImage: e.target.value }) : null)}
                    placeholder="Or paste image URL (e.g. /images/... or https://...)"
                    className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                  />

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Hero Image Alt Tag (SEO)</label>
                    <input
                      type="text"
                      value={editingBlock.heroImageAlt || ''}
                      onChange={(e) => setEditingBlock(prev => prev ? ({ ...prev, heroImageAlt: e.target.value }) : null)}
                      placeholder={`Faisal Hills ${editingBlock.name} Aerial View & Landscape`}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Presets:</span>
                    {[
                      { label: 'Executive Aerial', url: '/images/faisal-hills-executive-block.webp' },
                      { label: 'Drone Site View', url: '/images/faisal-hills-drone-view.webp' },
                      { label: 'Sports Arena View', url: '/images/faisal-hills-sports-arena.webp' },
                      { label: 'European Promenade', url: '/images/hills-walk-commercial-aerial.webp' },
                      { label: 'Margalla Springs', url: '/images/faisal-hills-site-header.webp' },
                    ].map((preset, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => setEditingBlock(prev => prev ? ({ ...prev, heroImage: preset.url }) : null)}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium transition cursor-pointer"
                      >
                        + {preset.label}
                      </button>
                    ))}
                  </div>

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
                        onClick={() => setEditingBlock(prev => prev ? ({ ...prev, masterPlanImage: '' }) : null)}
                        className="text-[10px] text-red-600 hover:underline font-semibold cursor-pointer"
                      >
                        Remove Map
                      </button>
                    )}
                  </div>

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
                                setEditingBlock(prev => prev ? ({ ...prev, masterPlanImage: dataUrl }) : null);
                              }
                            });
                          }
                        }}
                      />
                    </label>
                  </div>

                  <input
                    type="text"
                    value={editingBlock.masterPlanImage || ''}
                    onChange={(e) => setEditingBlock(prev => prev ? ({ ...prev, masterPlanImage: e.target.value }) : null)}
                    placeholder="Or paste map image URL..."
                    className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                  />

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Master Plan Image Alt Tag (SEO)</label>
                    <input
                      type="text"
                      value={editingBlock.masterPlanImageAlt || ''}
                      onChange={(e) => setEditingBlock(prev => prev ? ({ ...prev, masterPlanImageAlt: e.target.value }) : null)}
                      placeholder={`Faisal Hills ${editingBlock.name} Master Plan Blueprint Map`}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>

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
                    onChange={(e) => setEditingBlock(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
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
                    onChange={(e) => setEditingBlock(prev => prev ? ({ ...prev, subtitle: e.target.value }) : null)}
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
                    onChange={(e) => setEditingBlock(prev => prev ? ({ ...prev, nocStatus: e.target.value }) : null)}
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
                    onChange={(e) => setEditingBlock(prev => prev ? ({ ...prev, verificationDate: e.target.value }) : null)}
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
                    onChange={(e) => setEditingBlock(prev => prev ? ({
                      ...prev,
                      priceRange: { ...prev.priceRange, residential: e.target.value, commercial: prev.priceRange?.commercial || '' }
                    }) : null)}
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
                    onChange={(e) => setEditingBlock(prev => prev ? ({
                      ...prev,
                      priceRange: { ...prev.priceRange, commercial: e.target.value, residential: prev.priceRange?.residential || '' }
                    }) : null)}
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
                    onChange={(e) => setEditingBlock(prev => prev ? ({ ...prev, totalPlots: Number(e.target.value) }) : null)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                {/* 10. Category Tag */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Category Status</label>
                  <select
                    value={editingBlock.category || 'developed'}
                    onChange={(e) => setEditingBlock(prev => prev ? ({ ...prev, category: e.target.value as any }) : null)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#7b002c] cursor-pointer"
                  >
                    <option value="developed">Developed (Possession Ready)</option>
                    <option value="upcoming">Upcoming (Fast-Paced Development)</option>
                    <option value="commercial_project">Commercial Project / Hub</option>
                  </select>
                </div>

                {/* 11. Location Details */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Location &amp; Highway Access Details</label>
                  <input
                    type="text"
                    value={editingBlock.locationDetails || ''}
                    onChange={(e) => setEditingBlock(prev => prev ? ({ ...prev, locationDetails: e.target.value }) : null)}
                    placeholder="e.g. Direct Frontage on Main GT Road (N-5) with 220ft Central Boulevard Access"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                {/* 12. Detailed Description */}
                <div className="md:col-span-2">
                  <CmsRichTextarea
                    label="Block Overview & Comprehensive Description"
                    rows={4}
                    value={editingBlock.description || ''}
                    onChange={(val) => setEditingBlock(prev => prev ? ({ ...prev, description: val }) : null)}
                    placeholder="Enter comprehensive overview, possession updates, lifestyle facilities, and investment potential..."
                  />
                </div>

                {/* 13. Key Highlights & Features Manager */}
                <div className="md:col-span-2 space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <label className="block text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>Key Sector Highlights &amp; Features</span>
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
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs text-slate-500 italic">
                  Changes save directly to the database and update this sector's public page immediately.
                </span>
                <button
                  type="submit"
                  disabled={isSavingBlock}
                  className="px-7 py-3 bg-[#7b002c] hover:bg-[#9e1245] disabled:opacity-60 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition cursor-pointer hover:scale-102"
                >
                  {isSavingBlock ? (
                    <>
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                      <span>Publishing Block Updates...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 text-white" />
                      <span>Save &amp; Publish Block Updates</span>
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
                    <h4 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                      <Camera className="w-5 h-5 text-[#7b002c]" />
                      <span>Select Photo for {galleryPickerTarget === 'hero' ? 'Hero Background Banner' : galleryPickerTarget === 'commercialHero' ? 'Commercial Hub Banner' : 'Master Plan Map'}</span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Click any photo from your gallery below to set it instantly.
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
                          setEditingBlock(prev => prev ? ({ ...prev, heroImage: item.imageUrl }) : null);
                        } else if (galleryPickerTarget === 'commercialHero') {
                          setCommercialHeroImage(item.imageUrl);
                        } else {
                          setEditingBlock(prev => prev ? ({ ...prev, masterPlanImage: item.imageUrl }) : null);
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
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
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

            <CmsRichTextarea
              label="Table Footnote / Explanatory Note"
              rows={3}
              value={cms.atAGlance.footnote}
              onChange={(val) => setCms({ ...cms, atAGlance: { ...cms.atAGlance, footnote: val } })}
            />
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

            <CmsRichTextarea
              label="Intro Paragraph"
              rows={2}
              value={cms.growthStages.paragraph}
              onChange={(val) => setCms({ ...cms, growthStages: { ...cms.growthStages, paragraph: val } })}
            />

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

            <CmsRichTextarea
              label="Important Distinction Callout (Phase 2 & Sector Note)"
              rows={2}
              value={cms.growthStages.distinctionNote}
              onChange={(val) => setCms({ ...cms, growthStages: { ...cms.growthStages, distinctionNote: val } })}
            />
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

            <CmsRichTextarea
              label="Map Section Description"
              rows={3}
              value={cms.blockMap.paragraph}
              onChange={(val) => setCms({ ...cms, blockMap: { ...cms.blockMap, paragraph: val } })}
            />

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

            <CmsRichTextarea
              label="Reading Plot Numbers Paragraph"
              rows={2}
              value={cms.blockMap.readingPlotNumbersText}
              onChange={(val) => setCms({ ...cms, blockMap: { ...cms.blockMap, readingPlotNumbersText: val } })}
            />
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

                <CmsRichTextarea
                  label="Full Sector Copy (Collapsible on page)"
                  rows={4}
                  value={blk.detailedCopy}
                  onChange={(val) => {
                    const updated = [...cms.blocksOneByOne];
                    updated[idx].detailedCopy = val;
                    setCms({ ...cms, blocksOneByOne: updated });
                  }}
                />

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

            <CmsRichTextarea
              label="Kanal Calculation Note"
              rows={2}
              value={cms.marlaConversions.callout}
              onChange={(val) => setCms({
                ...cms,
                marlaConversions: { ...cms.marlaConversions, callout: val }
              })}
            />
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

            <CmsRichTextarea
              label="Pricing Footnote"
              rows={2}
              value={cms.plotPrices.footnote}
              onChange={(val) => setCms({ ...cms, plotPrices: { ...cms.plotPrices, footnote: val } })}
            />
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

              <CmsRichTextarea
                label="Shared Infrastructure Paragraph"
                rows={3}
                value={cms.developmentStatus.infrastructure.paragraph}
                onChange={(val) => setCms({
                  ...cms,
                  developmentStatus: {
                    ...cms.developmentStatus,
                    infrastructure: { ...cms.developmentStatus.infrastructure, paragraph: val }
                  }
                })}
              />

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
                    <CmsRichTextarea
                      label="Card Description"
                      rows={2}
                      value={c.desc}
                      onChange={(val) => {
                        const updated = [...cms.developmentStatus.infrastructure.cards];
                        updated[idx].desc = val;
                        setCms({
                          ...cms,
                          developmentStatus: {
                            ...cms.developmentStatus,
                            infrastructure: { ...cms.developmentStatus.infrastructure, cards: updated }
                          }
                        });
                      }}
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
                    <CmsRichTextarea
                      label="Definition"
                      rows={3}
                      value={t.definition}
                      onChange={(val) => {
                        const updated = [...cms.glossary.terms];
                        updated[idx].definition = val;
                        setCms({ ...cms, glossary: { ...cms.glossary, terms: updated } });
                      }}
                    />
                  </div>
                ))}
              </div>

              <CmsRichTextarea
                label="Corner / Boulevard Premium Note"
                rows={2}
                value={cms.glossary.premiumNote}
                onChange={(val) => setCms({ ...cms, glossary: { ...cms.glossary, premiumNote: val } })}
              />
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
                  <CmsRichTextarea
                    label="Step Description"
                    rows={3}
                    value={st.desc}
                    onChange={(val) => {
                      const updated = [...cms.dueDiligence.steps];
                      updated[idx].desc = val;
                      setCms({ ...cms, dueDiligence: { ...cms.dueDiligence, steps: updated } });
                    }}
                  />
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

                <CmsRichTextarea
                  label="Answer"
                  rows={2}
                  value={faq.answer}
                  onChange={(val) => {
                    const updated = [...cms.faqs.items];
                    updated[idx].answer = val;
                    setCms({ ...cms, faqs: { ...cms.faqs, items: updated } });
                  }}
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

            <CmsRichTextarea
              label="CTA Paragraph"
              rows={3}
              value={cms.cta.paragraph}
              onChange={(val) => setCms({ ...cms, cta: { ...cms.cta, paragraph: val } })}
            />

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

            <CmsRichTextarea
              label="About this Page / Reviewer Footnote"
              rows={2}
              value={cms.cta.aboutPageNote}
              onChange={(val) => setCms({ ...cms, cta: { ...cms.cta, aboutPageNote: val } })}
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION: BLOCK A DETAILED CMS (ALL 16 SECTIONS)           */}
      {/* ========================================================= */}
      {activeSection === 'blockA' && (
        <BlockACmsEditor
          blockACms={blockACms}
          setBlockACms={setBlockACms}
          token={token || undefined}
          onSaveSuccess={(msg) => {
            setSaveSuccess(true);
            setStatusMsg(msg);
            setTimeout(() => setSaveSuccess(false), 4000);
          }}
        />
      )}

      {/* ========================================================= */}
      {/* SECTION: BLOCK B DETAILED CMS (ALL 10 SECTIONS)           */}
      {/* ========================================================= */}
      {activeSection === 'blockB' && (
        <BlockBCmsEditor
          blockBCms={blockBCms}
          setBlockBCms={setBlockBCms}
          token={token || undefined}
          onSaveSuccess={(msg) => {
            setSaveSuccess(true);
            setStatusMsg(msg);
            setTimeout(() => setSaveSuccess(false), 4000);
          }}
        />
      )}

      {/* ========================================================= */}
      {/* SECTION: BLOCK D DETAILED CMS (ALL 10 SECTIONS)           */}
      {/* ========================================================= */}
      {activeSection === 'blockD' && (
        <BlockDCmsEditor
          blockDCms={blockDCms}
          setBlockDCms={setBlockDCms}
          token={token || undefined}
          onSaveSuccess={(msg) => {
            setSaveSuccess(true);
            setStatusMsg(msg);
            setTimeout(() => setSaveSuccess(false), 4000);
          }}
        />
      )}

      {/* ========================================================= */}
      {/* SECTION: PRIME BLOCK DETAILED CMS (ALL 12 SECTIONS)       */}
      {/* ========================================================= */}
      {activeSection === 'primeBlock' && (
        <PrimeBlockCmsEditor
          primeCms={primeCms}
          setPrimeCms={setPrimeCms}
          token={token || undefined}
          onSaveSuccess={(msg) => {
            setSaveSuccess(true);
            setStatusMsg(msg);
            setTimeout(() => setSaveSuccess(false), 4000);
          }}
        />
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
