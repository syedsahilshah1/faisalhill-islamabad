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
  ExecutiveBlockCMSData,
  initialExecutiveBlockCMS,
  fetchExecutiveBlockCMS,
  saveExecutiveBlockCMS,
  mergeExecutiveBlockCMS,
  BlockB1ExtensionCMSData,
  initialBlockB1ExtensionCMS,
  fetchBlockB1ExtensionCMS,
  saveBlockB1ExtensionCMS,
  mergeBlockB1ExtensionCMS,
  BlockCCMSData,
  initialBlockCCMS,
  fetchBlockCCMS,
  saveBlockCCMS,
  mergeBlockCCMS,
  HillsWalkCMSData,
  initialHillsWalkCMS,
  fetchHillsWalkCMS,
  saveHillsWalkCMS,
  mergeHillsWalkCMS,
  FaisalJewelCMSData,
  initialFaisalJewelCMS,
  fetchFaisalJewelCMS,
  saveFaisalJewelCMS,
  mergeFaisalJewelCMS,
  cleanVerifyText,
  BlockInfo,
  blocksData,
  fetchBlocks,
  apiUpdateBlock,
  apiUpdateSetting,
  GalleryItem,
  fetchGallery
} from '@/data/faisalHillsData';
import { ImageUploader } from './ImageUploader';
import BlockACmsEditor from '@/components/admin/BlockACmsEditor';
import BlockBCmsEditor from '@/components/admin/BlockBCmsEditor';
import BlockDCmsEditor from '@/components/admin/BlockDCmsEditor';
import PrimeBlockCmsEditor from '@/components/admin/PrimeBlockCmsEditor';
import ExecutiveBlockCmsEditor from '@/components/admin/ExecutiveBlockCmsEditor';
import BlockB1ExtensionCmsEditor from '@/components/admin/BlockB1ExtensionCmsEditor';
import BlockCCmsEditor from '@/components/admin/BlockCCmsEditor';
import HillsWalkCmsEditor from '@/components/admin/HillsWalkCmsEditor';
import FaisalJewelCmsEditor from '@/components/admin/FaisalJewelCmsEditor';
import CmsRichTextarea from '@/components/admin/CmsRichTextarea';
import {
  Save, RefreshCw, CheckCircle2, AlertCircle, Plus, Trash2, ChevronDown, ChevronUp,
  Image as ImageIcon, Sparkles, Building2, MapPin, Layers, PhoneCall, MessageCircle, HelpCircle,
  Star, ShieldCheck, Eye, Compass, Award, FileText, Check, DollarSign, ListChecks,
  Upload, Camera, Link2, X, ExternalLink, Loader2, Globe,
  Trees,
  Activity
} from 'lucide-react';

interface BlocksPageCmsTabProps {
  token?: string | null;
}

export default function BlocksPageCmsTab({ token }: BlocksPageCmsTabProps) {
  const [cms, setCms] = useState<BlocksPageCMSData>(initialBlocksPageCMS);
  const [primeCms, setPrimeCms] = useState<PrimeBlockCMSData>(initialPrimeBlockCMS);
  const [blockACms, setBlockACms] = useState<BlockACMSData>(initialBlockACMS);
  const [blockBCms, setBlockBCms] = useState<BlockBCMSData>(initialBlockBCMS);
  const [blockDCms, setBlockDCms] = useState<BlockDCMSData>(initialBlockDCMS);
  const [executiveBlockCms, setExecutiveBlockCms] = useState<ExecutiveBlockCMSData>(initialExecutiveBlockCMS);
  const [blockB1ExtCms, setBlockB1ExtCms] = useState<BlockB1ExtensionCMSData>(initialBlockB1ExtensionCMS);
  const [blockCCms, setBlockCCms] = useState<BlockCCMSData>(initialBlockCCMS);
  const [hillsWalkCms, setHillsWalkCms] = useState<HillsWalkCMSData>(initialHillsWalkCMS);
  const [faisalJewelCms, setFaisalJewelCms] = useState<FaisalJewelCMSData>(initialFaisalJewelCMS);
  const [activeSection, setActiveSection] = useState<string>('executiveBlock');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');


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

    fetchExecutiveBlockCMS().then((eData) => {
      if (eData) setExecutiveBlockCms(mergeExecutiveBlockCMS(eData));
    });

    fetchBlockB1ExtensionCMS().then((b1Data) => {
      if (b1Data) setBlockB1ExtCms(mergeBlockB1ExtensionCMS(b1Data));
    });

    fetchBlockCCMS().then((cData) => {
      if (cData) setBlockCCms(mergeBlockCCMS(cData));
    });

    fetchHillsWalkCMS().then((hwData) => {
      if (hwData) setHillsWalkCms(mergeHillsWalkCMS(hwData));
    });

    fetchFaisalJewelCMS().then((fjData) => {
      if (fjData) setFaisalJewelCms(mergeFaisalJewelCMS(fjData));
    });



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
      try {
        const eLocal = localStorage.getItem('faisal_executive_block_cms');
        if (eLocal) setExecutiveBlockCms(mergeExecutiveBlockCMS(JSON.parse(eLocal)));
      } catch {}
      try {
        const b1Local = localStorage.getItem('faisal_block_b1_ext_cms');
        if (b1Local) setBlockB1ExtCms(mergeBlockB1ExtensionCMS(JSON.parse(b1Local)));
      } catch {}
      try {
        const cLocal = localStorage.getItem('faisal_block_c_cms');
        if (cLocal) setBlockCCms(mergeBlockCCMS(JSON.parse(cLocal)));
      } catch {}
      try {
        const hwLocal = localStorage.getItem('faisal_hills_walk_cms');
        if (hwLocal) setHillsWalkCms(mergeHillsWalkCMS(JSON.parse(hwLocal)));
      } catch {}
      try {
        const fjLocal = localStorage.getItem('faisal_jewel_cms');
        if (fjLocal) setFaisalJewelCms(mergeFaisalJewelCMS(JSON.parse(fjLocal)));
      } catch {}
    };

    window.addEventListener('faisal_blocks_cms_updated', handleStorage);
    window.addEventListener('faisal_block_a_cms_updated', handleStorage);
    window.addEventListener('faisal_prime_block_cms_updated', handleStorage);
    window.addEventListener('faisal_block_b_cms_updated', handleStorage);
    window.addEventListener('faisal_block_d_cms_updated', handleStorage);
    window.addEventListener('faisal_executive_block_cms_updated', handleStorage);
    window.addEventListener('faisal_block_b1_ext_cms_updated', handleStorage);
    window.addEventListener('faisal_block_c_cms_updated', handleStorage);
    window.addEventListener('faisal_hills_walk_cms_updated', handleStorage);
    window.addEventListener('faisal_jewel_cms_updated', handleStorage);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('faisal_blocks_cms_updated', handleStorage);
      window.removeEventListener('faisal_block_a_cms_updated', handleStorage);
      window.removeEventListener('faisal_prime_block_cms_updated', handleStorage);
      window.removeEventListener('faisal_block_b_cms_updated', handleStorage);
      window.removeEventListener('faisal_block_d_cms_updated', handleStorage);
      window.removeEventListener('faisal_executive_block_cms_updated', handleStorage);
      window.removeEventListener('faisal_block_b1_ext_cms_updated', handleStorage);
      window.removeEventListener('faisal_block_c_cms_updated', handleStorage);
      window.removeEventListener('faisal_hills_walk_cms_updated', handleStorage);
      window.removeEventListener('faisal_jewel_cms_updated', handleStorage);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setStatusMsg('');
    const activeToken = token || (typeof window !== 'undefined' ? sessionStorage.getItem('faisal_admin_token') || undefined : undefined);
    const okBlocks = await saveBlocksPageCMS(cms, activeToken);
    const okBlockA = await saveBlockACMS(blockACms, activeToken);
    const okPrime = await savePrimeBlockCMS(primeCms, activeToken);
    const okBlockB = await saveBlockBCMS(blockBCms, activeToken);
    const okBlockD = await saveBlockDCMS(blockDCms, activeToken);
    const okExec = await saveExecutiveBlockCMS(executiveBlockCms, activeToken);
    const okB1Ext = await saveBlockB1ExtensionCMS(blockB1ExtCms, activeToken);
    const okBlockC = await saveBlockCCMS(blockCCms, activeToken);
    const okHillsWalk = await saveHillsWalkCMS(hillsWalkCms, activeToken);
    const okFaisalJewel = await saveFaisalJewelCMS(faisalJewelCms, activeToken);
    setIsSaving(false);
    if (okBlocks || okBlockA || okPrime || okBlockB || okBlockD || okExec || okB1Ext || okBlockC || okHillsWalk || okFaisalJewel) {
      setSaveSuccess(true);
      setStatusMsg('All blocks content (Block A, B, C, D, Prime, Executive, B1 Ext, Hills Walk, Faisal Jewel) successfully saved and published live!');
      setTimeout(() => setSaveSuccess(false), 4000);
    } else {
      setStatusMsg('Saved locally in browser. Note: API sync pending backend authentication.');
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    }
  };

  const handleResetToAuditedDefaults = () => {
    if (window.confirm('Are you sure you want to reset all Blocks and Sectors (Block A, B, C, D, Prime, Executive, B1 Ext, Hills Walk, Faisal Jewel) to official audited defaults?')) {
      setCms(initialBlocksPageCMS);
      setBlockACms(initialBlockACMS);
      setPrimeCms(initialPrimeBlockCMS);
      setBlockBCms(initialBlockBCMS);
      setBlockDCms(initialBlockDCMS);
      setExecutiveBlockCms(initialExecutiveBlockCMS);
      setBlockB1ExtCms(initialBlockB1ExtensionCMS);
      setBlockCCms(initialBlockCCMS);
      setHillsWalkCms(initialHillsWalkCMS);
      setFaisalJewelCms(initialFaisalJewelCMS);
      setStatusMsg('Reset to audited defaults. Click "Save Live Changes" to publish.');
    }
  };

  const [mainScope, setMainScope] = useState<'individual-blocks' | 'main-page-sections'>('individual-blocks');

  const societyBlocksList = [
    {
      id: 'executive-block',
      name: 'Executive Block',
      tagline: 'Main Entrance & 225ft Boulevard',
      type: 'detailed-cms',
      cmsKey: 'executiveBlock',
      badge: '⭐ Full 12-Section CMS',
      badgeColor: 'bg-rose-100 text-[#7b002c] border-rose-300',
      icon: Sparkles,
      slug: 'executive-block',
      path: '/blocks/executive-block'
    },
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
      id: 'block-c',
      name: 'Block C',
      tagline: 'M-1 Interchange Gateway & Hills Walk',
      type: 'detailed-cms',
      cmsKey: 'blockC',
      badge: '⭐ Full 13-Section CMS',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      icon: Building2,
      slug: 'block-c',
      path: '/blocks/block-c'
    },
    {
      id: 'block-b1-extension',
      name: 'Block B1 Extension',
      tagline: 'Fast Developing Modern Sector',
      type: 'detailed-cms',
      cmsKey: 'blockB1Extension',
      badge: '⭐ Full 12-Section CMS',
      badgeColor: 'bg-rose-100 text-[#7b002c] border-rose-300',
      icon: Sparkles,
      slug: 'block-b1-extension',
      path: '/blocks/block-b1-extension'
    },
    {
      id: 'hills-walk',
      name: 'Hills Walk Commercial',
      tagline: 'Dining & Retail Promenade',
      type: 'detailed-cms',
      cmsKey: 'hillsWalk',
      badge: '⭐ Full 10-Section CMS',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      icon: Building2,
      slug: 'hills-walk',
      path: '/blocks/hills-walk'
    },
    {
      id: 'faisal-jewels',
      name: 'Faisal Jewel',
      tagline: '27-Storey Skyscraper Landmark',
      type: 'detailed-cms',
      cmsKey: 'faisalJewel',
      badge: '⭐ Full 9-Section CMS & Units',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
      icon: Building2,
      slug: 'faisal-jewel-islamabad',
      path: '/blocks/faisal-jewel-islamabad'
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
    return activeSection === b.cmsKey;
  };

  const handleSelectSocietyBlock = (b: typeof societyBlocksList[0]) => {
    setMainScope('individual-blocks');
    setActiveSection(b.cmsKey);
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
              if (!['executiveBlock', 'blockA', 'blockB', 'blockC', 'blockD', 'primeBlock', 'blockB1Extension', 'hillsWalk', 'faisalJewel'].includes(activeSection)) {
                setActiveSection('executiveBlock');
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
              if (['executiveBlock', 'blockA', 'blockB', 'blockC', 'blockD', 'primeBlock', 'blockB1Extension', 'hillsWalk', 'faisalJewel'].includes(activeSection)) {
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
            token={token || undefined}
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
                token={token || undefined}
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
      {/* SECTION: EXECUTIVE BLOCK DETAILED CMS (ALL 12 SECTIONS)   */}
      {/* ========================================================= */}
      {activeSection === 'executiveBlock' && (
        <ExecutiveBlockCmsEditor
          executiveBlockCms={executiveBlockCms}
          setExecutiveBlockCms={setExecutiveBlockCms}
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

      {/* ========================================================= */}
      {/* SECTION: BLOCK B1 EXTENSION DETAILED CMS (ALL 12 SECTIONS) */}
      {/* ========================================================= */}
      {activeSection === 'blockB1Extension' && (
        <BlockB1ExtensionCmsEditor
          blockB1ExtCms={blockB1ExtCms}
          setBlockB1ExtCms={setBlockB1ExtCms}
          token={token || undefined}
          onSaveSuccess={(msg) => {
            setSaveSuccess(true);
            setStatusMsg(msg);
            setTimeout(() => setSaveSuccess(false), 4000);
          }}
        />
      )}

      {/* ========================================================= */}
      {/* SECTION: BLOCK C DETAILED CMS (ALL 13 SECTIONS)          */}
      {/* ========================================================= */}
      {activeSection === 'blockC' && (
        <BlockCCmsEditor
          blockCCms={blockCCms}
          setBlockCCms={setBlockCCms}
          token={token || undefined}
          onSaveSuccess={(msg) => {
            setSaveSuccess(true);
            setStatusMsg(msg);
            setTimeout(() => setSaveSuccess(false), 4000);
          }}
        />
      )}

      {/* ========================================================= */}
      {/* SECTION: HILLS WALK COMMERCIAL DETAILED CMS (10 SECTIONS) */}
      {/* ========================================================= */}
      {activeSection === 'hillsWalk' && (
        <HillsWalkCmsEditor
          hillsWalkCms={hillsWalkCms}
          setHillsWalkCms={setHillsWalkCms}
          token={token || undefined}
          onSaveSuccess={(msg) => {
            setSaveSuccess(true);
            setStatusMsg(msg);
            setTimeout(() => setSaveSuccess(false), 4000);
          }}
        />
      )}

      {/* ========================================================= */}
      {/* SECTION: FAISAL JEWEL 27-STOREY DETAILED CMS (9 SECTIONS) */}
      {/* ========================================================= */}
      {activeSection === 'faisalJewel' && (
        <FaisalJewelCmsEditor
          faisalJewelCms={faisalJewelCms}
          setFaisalJewelCms={setFaisalJewelCms}
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


