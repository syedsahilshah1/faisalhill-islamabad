'use client';

import React, { useState, useRef } from 'react';
import {
  BlockB1ExtensionCMSData,
  initialBlockB1ExtensionCMS,
  saveBlockB1ExtensionCMS,
  B1ExtPriceRow,
  B1ExtDriveTimeItem,
  B1ExtAmenityItem,
  B1ExtWhyInvestItem,
  B1ExtTransferStep,
  B1ExtFaqItem
} from '@/data/faisalHillsData';
import { ImageUploader, type ImageUploaderProps } from './ImageUploader';
import CmsRichTextarea from './CmsRichTextarea';
import CmsRichInput from './CmsRichInput';
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
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Globe,
  ExternalLink,
  ShieldCheck,
  Camera,
  Loader2,
  Check,
  Upload,
  Link2,
  Activity,
  Trees,
  GraduationCap,
  Landmark,
  Zap,
  Droplets,
  ShoppingBag,
  TrendingUp,
  Clock
} from 'lucide-react';

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

interface BlockB1ExtensionCmsEditorProps {
  blockB1ExtCms: BlockB1ExtensionCMSData;
  setBlockB1ExtCms: React.Dispatch<React.SetStateAction<BlockB1ExtensionCMSData>>;
  token?: string | null;
  onSaveSuccess?: (msg: string) => void;
}

export default function BlockB1ExtensionCmsEditor({
  blockB1ExtCms,
  setBlockB1ExtCms,
  token,
  onSaveSuccess
}: BlockB1ExtensionCmsEditorProps) {
  const [activeCategory, setActiveCategory] = useState<string>('hero');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const tabsScrollRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsScrollRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      tabsScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMsg('');
    const activeToken = token || (typeof window !== 'undefined' ? sessionStorage.getItem('faisal_admin_token') || undefined : undefined);
    const ok = await saveBlockB1ExtensionCMS(blockB1ExtCms, activeToken);
    setIsSaving(false);
    const msg = ok
      ? 'Faisal Hills Block B-1 Extension CMS content published and updated live!'
      : 'Block B-1 Extension changes saved in local browser storage (API sync pending login).';
    setSaveMsg(msg);
    if (onSaveSuccess) onSaveSuccess(msg);
    setTimeout(() => setSaveMsg(''), 4500);
  };

  const handleReset = () => {
    if (window.confirm('Reset all Block B-1 Extension sections to official audited defaults?')) {
      setBlockB1ExtCms(initialBlockB1ExtensionCMS);
      setSaveMsg('Reset to audited defaults. Click "Save & Publish Block B1 Extension" to apply.');
    }
  };

  const categories = [
    { id: 'hero', label: '1. Hero & Badges', icon: Sparkles },
    { id: 'overview', label: '2. H1 & Overview Copy', icon: Award },
    { id: 'location', label: '3. Location & Drive Times', icon: MapPin },
    { id: 'masterPlan', label: '4. Master Plan & Cuts', icon: Compass },
    { id: 'priceSchedule', label: '5. Price Matrix & Resale', icon: DollarSign },
    { id: 'amenities', label: '6. Amenities & Utilities', icon: Zap },
    { id: 'whyInvest', label: '7. Why Invest (6 Reasons)', icon: CheckCircle2 },
    { id: 'developmentStatus', label: '8. Development Stats & Drone', icon: Activity },
    { id: 'transferProcess', label: '9. Transfer Roadmap (4 Steps)', icon: FileText },
    { id: 'faqs', label: '10. Frequently Asked Questions', icon: HelpCircle },
    { id: 'scheduleTour', label: '11. Tour Booking & Form', icon: PhoneCall },
  ];

  const ImageUploadField = createImageUploadField(token);

  return (
    <div className="space-y-6">

      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-slate-950 via-[#5a0020] to-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-rose-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Block B1 Extension Dedicated CMS</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Manage Block B-1 Extension
          </h2>
          <p className="text-xs sm:text-sm text-rose-100 max-w-2xl font-sans">
            Edit all sections: Hero, Overview narrative, Location map & Drive times table, Master plan layout, Price matrix, Amenities, Why Invest reasons, Development stats, Transfer steps, and FAQs for <code className="text-amber-200 bg-black/30 px-1.5 py-0.5 rounded font-mono">/blocks/block-b1-extension</code>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
          <a
            href="/blocks/block-b1-extension"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition flex items-center gap-1.5"
          >
            <Globe className="w-4 h-4" />
            <span>View Public Page</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>

          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2.5 rounded-xl bg-black/40 hover:bg-black/60 text-rose-200 text-xs font-bold border border-rose-400/30 transition flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            disabled={isSaving}
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-lg transition flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save & Publish B1 Extension</span>
              </>
            )}
          </button>
        </div>
      </div>

      {saveMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveMsg}</span>
        </div>
      )}

      {/* Horizontal Tabs Scroll Bar */}
      <div className="relative bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-1">
        <button
          type="button"
          onClick={() => scrollTabs('left')}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition shrink-0"
          title="Scroll Left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div
          ref={tabsScrollRef}
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth flex-1 py-1 px-1"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#7b002c] text-white shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-[#7b002c]'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => scrollTabs('right')}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition shrink-0"
          title="Scroll Right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* ========================================================= */}
      {/* 1. HERO & BADGES                                          */}
      {/* ========================================================= */}
      {activeCategory === 'hero' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">1. Hero Header & Quick Badges</h3>
            <p className="text-xs text-slate-600">Top hero banner, heading, subheading, background media, and highlight badges.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <CmsRichInput
              label="Eyebrow Tagline"
              value={blockB1ExtCms.hero.eyebrow}
              onChange={(val) => setBlockB1ExtCms({
                ...blockB1ExtCms,
                hero: { ...blockB1ExtCms.hero, eyebrow: val }
              })}
              placeholder="FAST DEVELOPING MODERN SECTOR WITH HIGH CAPITAL GROWTH"
            />
            <CmsRichInput
              label="Hero Main Title"
              value={blockB1ExtCms.hero.title}
              onChange={(val) => setBlockB1ExtCms({
                ...blockB1ExtCms,
                hero: { ...blockB1ExtCms.hero, title: val }
              })}
              placeholder="Block B-1 Extension"
            />
          </div>

          <CmsRichTextarea
            label="Hero Subtitle / Description"
            value={blockB1ExtCms.hero.subtitle}
            onChange={(val) => setBlockB1ExtCms({
              ...blockB1ExtCms,
              hero: { ...blockB1ExtCms.hero, subtitle: val }
            })}
            placeholder="Block B-1 Extension in Faisal Hills offers affordable entry pricing with rapid on-ground infrastructure progress..."
            rows={3}
          />

          <ImageUploadField
            label="Hero Background Image"
            value={blockB1ExtCms.hero.bgImage}
            onChange={(url) => setBlockB1ExtCms({
              ...blockB1ExtCms,
              hero: { ...blockB1ExtCms.hero, bgImage: url }
            })}
            placeholder="/images/faisal-hills-aerial-panoramic.webp"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <CmsRichInput
              label="Highlight Badge 1"
              value={blockB1ExtCms.hero.badge1}
              onChange={(val) => setBlockB1ExtCms({
                ...blockB1ExtCms,
                hero: { ...blockB1ExtCms.hero, badge1: val }
              })}
              placeholder="100% RDA Approved"
            />
            <CmsRichInput
              label="Highlight Badge 2"
              value={blockB1ExtCms.hero.badge2}
              onChange={(val) => setBlockB1ExtCms({
                ...blockB1ExtCms,
                hero: { ...blockB1ExtCms.hero, badge2: val }
              })}
              placeholder="Rapid Construction Pace"
            />
            <CmsRichInput
              label="Highlight Badge 3"
              value={blockB1ExtCms.hero.badge3}
              onChange={(val) => setBlockB1ExtCms({
                ...blockB1ExtCms,
                hero: { ...blockB1ExtCms.hero, badge3: val }
              })}
              placeholder="Scenic Margalla Views"
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. OVERVIEW & NARRATIVE COPY                             */}
      {/* ========================================================= */}
      {activeCategory === 'overview' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">2. H1 & Sector Overview Copy</h3>
            <p className="text-xs text-slate-600">The main introductory section, expandable details, and side photography card.</p>
          </div>

          <CmsRichInput
            label="Section H1 Heading"
            value={blockB1ExtCms.overview.h1}
            onChange={(val) => setBlockB1ExtCms({
              ...blockB1ExtCms,
              overview: { ...blockB1ExtCms.overview, h1: val }
            })}
            placeholder="Faisal Hills Block B-1 Extension Overview"
          />

          <CmsRichTextarea
            label="Lead Paragraph (Always Visible)"
            value={blockB1ExtCms.overview.leadParagraph}
            onChange={(val) => setBlockB1ExtCms({
              ...blockB1ExtCms,
              overview: { ...blockB1ExtCms.overview, leadParagraph: val }
            })}
            placeholder="Faisal Hills Block B-1 Extension is a purposefully planned modern residential enclave..."
            rows={4}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CmsRichTextarea
              label="Expanded Details Paragraph 1"
              value={blockB1ExtCms.overview.expandedParagraph1}
              onChange={(val) => setBlockB1ExtCms({
                ...blockB1ExtCms,
                overview: { ...blockB1ExtCms.overview, expandedParagraph1: val }
              })}
              placeholder="Surrounded by scenic Margalla views, the sector features wide 40ft to 60ft carpeted streets..."
              rows={3}
            />
            <CmsRichTextarea
              label="Expanded Details Paragraph 2"
              value={blockB1ExtCms.overview.expandedParagraph2}
              onChange={(val) => setBlockB1ExtCms({
                ...blockB1ExtCms,
                overview: { ...blockB1ExtCms.overview, expandedParagraph2: val }
              })}
              placeholder="With direct internal connections to Block B and swift access to the Main GT Road..."
              rows={3}
            />
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase">Overview Showcase Photo Card</h4>
            <ImageUploadField
              label="Showcase Photo"
              value={blockB1ExtCms.overview.photoUrl}
              onChange={(url) => setBlockB1ExtCms({
                ...blockB1ExtCms,
                overview: { ...blockB1ExtCms.overview, photoUrl: url }
              })}
              placeholder="/images/faisal-hills-aerial-panoramic.webp"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <CmsRichInput
                label="Photo Tag"
                value={blockB1ExtCms.overview.photoTag}
                onChange={(val) => setBlockB1ExtCms({
                  ...blockB1ExtCms,
                  overview: { ...blockB1ExtCms.overview, photoTag: val }
                })}
                placeholder="Modern Residential Extension"
              />
              <CmsRichInput
                label="Photo Caption Title"
                value={blockB1ExtCms.overview.photoCaption}
                onChange={(val) => setBlockB1ExtCms({
                  ...blockB1ExtCms,
                  overview: { ...blockB1ExtCms.overview, photoCaption: val }
                })}
                placeholder="Rapid Infrastructure Development"
              />
              <CmsRichInput
                label="Image Alt Text (SEO)"
                value={blockB1ExtCms.overview.photoAlt}
                onChange={(val) => setBlockB1ExtCms({
                  ...blockB1ExtCms,
                  overview: { ...blockB1ExtCms.overview, photoAlt: val }
                })}
                placeholder="Faisal Hills Block B-1 Extension Aerial Overview"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. LOCATION & DRIVE TIMES                                 */}
      {/* ========================================================= */}
      {activeCategory === 'location' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">3. Location, Routes & Drive Times</h3>
            <p className="text-xs text-slate-600">Location description, Google Maps iframe embed, and commute distances table.</p>
          </div>

          <CmsRichInput
            label="Section H2 Heading"
            value={blockB1ExtCms.location.h2}
            onChange={(val) => setBlockB1ExtCms({
              ...blockB1ExtCms,
              location: { ...blockB1ExtCms.location, h2: val }
            })}
            placeholder="Block B-1 Extension Location & Strategic Connectivity"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CmsRichTextarea
              label="Location Lead Paragraph"
              value={blockB1ExtCms.location.leadParagraph}
              onChange={(val) => setBlockB1ExtCms({
                ...blockB1ExtCms,
                location: { ...blockB1ExtCms.location, leadParagraph: val }
              })}
              placeholder="Nestled adjacent to Block B, B-1 Extension benefits from seamless internal connectivity..."
              rows={3}
            />
            <CmsRichTextarea
              label="Location Expanded Paragraph"
              value={blockB1ExtCms.location.expandedParagraph}
              onChange={(val) => setBlockB1ExtCms({
                ...blockB1ExtCms,
                location: { ...blockB1ExtCms.location, expandedParagraph: val }
              })}
              placeholder="Residents enjoy a tranquil residential pocket tucked away from heavy transit noise..."
              rows={3}
            />
          </div>

          <CmsRichInput
            label="Google Map Embed URL (iframe src)"
            value={blockB1ExtCms.location.googleMapEmbedUrl}
            onChange={(val) => setBlockB1ExtCms({
              ...blockB1ExtCms,
              location: { ...blockB1ExtCms.location, googleMapEmbedUrl: val }
            })}
            placeholder="https://maps.google.com/maps?q=Faisal+Hills+Taxila&t=&z=14&ie=UTF8&iwloc=&output=embed"
          />

          {/* Drive Times Array */}
          <div className="border-t border-slate-100 pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-base text-slate-900">Key Nearby Commute Times & Distances</h4>
                <p className="text-xs text-slate-500">Commute landmarks displayed in the commute grid.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newDriveTimes = [
                    ...blockB1ExtCms.location.driveTimes,
                    { destination: 'New Destination', time: '10 mins', distance: '5 km', note: 'Direct highway route' }
                  ];
                  setBlockB1ExtCms({
                    ...blockB1ExtCms,
                    location: { ...blockB1ExtCms.location, driveTimes: newDriveTimes }
                  });
                }}
                className="px-3.5 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-xl flex items-center gap-1 hover:bg-[#9e1245] transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Destination</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blockB1ExtCms.location.driveTimes.map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative group">
                  <button
                    type="button"
                    onClick={() => {
                      const updated = blockB1ExtCms.location.driveTimes.filter((_, i) => i !== idx);
                      setBlockB1ExtCms({
                        ...blockB1ExtCms,
                        location: { ...blockB1ExtCms.location, driveTimes: updated }
                      });
                    }}
                    className="absolute top-3 right-3 p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                    title="Delete Destination"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                    <CmsRichInput
                      label="Destination Name"
                      value={item.destination}
                      onChange={(val) => {
                        const updated = [...blockB1ExtCms.location.driveTimes];
                        updated[idx].destination = val;
                        setBlockB1ExtCms({
                          ...blockB1ExtCms,
                          location: { ...blockB1ExtCms.location, driveTimes: updated }
                        });
                      }}
                      placeholder="e.g. Multi Gardens B-17"
                    />
                    <CmsRichInput
                      label="Drive Time"
                      value={item.time}
                      onChange={(val) => {
                        const updated = [...blockB1ExtCms.location.driveTimes];
                        updated[idx].time = val;
                        setBlockB1ExtCms({
                          ...blockB1ExtCms,
                          location: { ...blockB1ExtCms.location, driveTimes: updated }
                        });
                      }}
                      placeholder="e.g. 6 mins"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <CmsRichInput
                      label="Distance"
                      value={item.distance}
                      onChange={(val) => {
                        const updated = [...blockB1ExtCms.location.driveTimes];
                        updated[idx].distance = val;
                        setBlockB1ExtCms({
                          ...blockB1ExtCms,
                          location: { ...blockB1ExtCms.location, driveTimes: updated }
                        });
                      }}
                      placeholder="e.g. 4.8 km"
                    />
                    <CmsRichInput
                      label="Route Note"
                      value={item.note}
                      onChange={(val) => {
                        const updated = [...blockB1ExtCms.location.driveTimes];
                        updated[idx].note = val;
                        setBlockB1ExtCms({
                          ...blockB1ExtCms,
                          location: { ...blockB1ExtCms.location, driveTimes: updated }
                        });
                      }}
                      placeholder="e.g. Direct sector-to-sector connection"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. MASTER PLAN & CUTS                                     */}
      {/* ========================================================= */}
      {activeCategory === 'masterPlan' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">4. Master Plan & Sector Layout</h3>
            <p className="text-xs text-slate-600">High-resolution master plan map image, downloadable PDF link, and narrative.</p>
          </div>

          <CmsRichInput
            label="Section H2 Heading"
            value={blockB1ExtCms.masterPlan.h2}
            onChange={(val) => setBlockB1ExtCms({
              ...blockB1ExtCms,
              masterPlan: { ...blockB1ExtCms.masterPlan, h2: val }
            })}
            placeholder="Block B-1 Extension Master Plan & Sector Layout"
          />

          <CmsRichTextarea
            label="Master Plan Lead Paragraph"
            value={blockB1ExtCms.masterPlan.leadParagraph}
            onChange={(val) => setBlockB1ExtCms({
              ...blockB1ExtCms,
              masterPlan: { ...blockB1ExtCms.masterPlan, leadParagraph: val }
            })}
            placeholder="The master plan of Block B-1 Extension features a symmetrical grid layout..."
            rows={3}
          />

          <ImageUploadField
            label="Master Plan Map Image"
            value={blockB1ExtCms.masterPlan.mapImageUrl}
            onChange={(url) => setBlockB1ExtCms({
              ...blockB1ExtCms,
              masterPlan: { ...blockB1ExtCms.masterPlan, mapImageUrl: url }
            })}
            placeholder="/images/faisal-hills-executive-map.webp"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CmsRichInput
              label="Download Button Text"
              value={blockB1ExtCms.masterPlan.downloadButtonText}
              onChange={(val) => setBlockB1ExtCms({
                ...blockB1ExtCms,
                masterPlan: { ...blockB1ExtCms.masterPlan, downloadButtonText: val }
              })}
              placeholder="Download Master Plan"
            />
            <CmsRichInput
              label="Explore Society Map Text"
              value={blockB1ExtCms.masterPlan.exploreSocietyMapText}
              onChange={(val) => setBlockB1ExtCms({
                ...blockB1ExtCms,
                masterPlan: { ...blockB1ExtCms.masterPlan, exploreSocietyMapText: val }
              })}
              placeholder="Explore Society Map"
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. PRICE MATRIX & RESALE SCHEDULE                         */}
      {/* ========================================================= */}
      {activeCategory === 'priceSchedule' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">5. Plot Pricing Schedule Matrix</h3>
            <p className="text-xs text-slate-600">Editable table rows for 5 Marla, 8 Marla, 10 Marla, and Commercial Avenue cuts.</p>
          </div>

          <CmsRichInput
            label="Section H2 Heading"
            value={blockB1ExtCms.priceSchedule.h2}
            onChange={(val) => setBlockB1ExtCms({
              ...blockB1ExtCms,
              priceSchedule: { ...blockB1ExtCms.priceSchedule, h2: val }
            })}
            placeholder="Plot Sizes & Price Matrix in Block B-1 Extension"
          />

          <CmsRichTextarea
            label="Price Schedule Lead Paragraph"
            value={blockB1ExtCms.priceSchedule.leadParagraph}
            onChange={(val) => setBlockB1ExtCms({
              ...blockB1ExtCms,
              priceSchedule: { ...blockB1ExtCms.priceSchedule, leadParagraph: val }
            })}
            placeholder="Explore current verified market price ranges for residential and commercial plots..."
            rows={2}
          />

          {/* Pricing Rows Array */}
          <div className="border-t border-slate-100 pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-base text-slate-900">Plot Cut Price Rows</h4>
                <p className="text-xs text-slate-500">Manage size categories, dimensions, market price bands, and possession status.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newRows: B1ExtPriceRow[] = [
                    ...blockB1ExtCms.priceSchedule.rows,
                    {
                      size: 'New Cut',
                      dimensions: '30 × 60',
                      sqYards: '200 Sq. Yds',
                      category: 'Residential',
                      priceRange: 'PKR 50 Lacs – 65 Lacs',
                      possession: 'Development in Progress',
                      highlight: 'Prime sector residential plot.'
                    }
                  ];
                  setBlockB1ExtCms({
                    ...blockB1ExtCms,
                    priceSchedule: { ...blockB1ExtCms.priceSchedule, rows: newRows }
                  });
                }}
                className="px-3.5 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-xl flex items-center gap-1 hover:bg-[#9e1245] transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Price Row</span>
              </button>
            </div>

            <div className="space-y-4">
              {blockB1ExtCms.priceSchedule.rows.map((row, idx) => (
                <div key={idx} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative group">
                  <button
                    type="button"
                    onClick={() => {
                      const updated = blockB1ExtCms.priceSchedule.rows.filter((_, i) => i !== idx);
                      setBlockB1ExtCms({
                        ...blockB1ExtCms,
                        priceSchedule: { ...blockB1ExtCms.priceSchedule, rows: updated }
                      });
                    }}
                    className="absolute top-4 right-4 p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                    title="Delete Price Row"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pr-8">
                    <CmsRichInput
                      label="Plot Cut / Size"
                      value={row.size}
                      onChange={(val) => {
                        const updated = [...blockB1ExtCms.priceSchedule.rows];
                        updated[idx].size = val;
                        setBlockB1ExtCms({
                          ...blockB1ExtCms,
                          priceSchedule: { ...blockB1ExtCms.priceSchedule, rows: updated }
                        });
                      }}
                      placeholder="e.g. 5 Marla"
                    />
                    <CmsRichInput
                      label="Dimensions"
                      value={row.dimensions}
                      onChange={(val) => {
                        const updated = [...blockB1ExtCms.priceSchedule.rows];
                        updated[idx].dimensions = val;
                        setBlockB1ExtCms({
                          ...blockB1ExtCms,
                          priceSchedule: { ...blockB1ExtCms.priceSchedule, rows: updated }
                        });
                      }}
                      placeholder="e.g. 25 × 50"
                    />
                    <CmsRichInput
                      label="Square Yards"
                      value={row.sqYards}
                      onChange={(val) => {
                        const updated = [...blockB1ExtCms.priceSchedule.rows];
                        updated[idx].sqYards = val;
                        setBlockB1ExtCms({
                          ...blockB1ExtCms,
                          priceSchedule: { ...blockB1ExtCms.priceSchedule, rows: updated }
                        });
                      }}
                      placeholder="e.g. 139 Sq. Yds"
                    />
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Category
                      </label>
                      <select
                        value={row.category}
                        onChange={(e) => {
                          const updated = [...blockB1ExtCms.priceSchedule.rows];
                          updated[idx].category = e.target.value;
                          setBlockB1ExtCms({
                            ...blockB1ExtCms,
                            priceSchedule: { ...blockB1ExtCms.priceSchedule, rows: updated }
                          });
                        }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                      >
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <CmsRichInput
                      label="Market Price Band"
                      value={row.priceRange}
                      onChange={(val) => {
                        const updated = [...blockB1ExtCms.priceSchedule.rows];
                        updated[idx].priceRange = val;
                        setBlockB1ExtCms({
                          ...blockB1ExtCms,
                          priceSchedule: { ...blockB1ExtCms.priceSchedule, rows: updated }
                        });
                      }}
                      placeholder="e.g. PKR 38 Lacs – 48 Lacs"
                    />
                    <CmsRichInput
                      label="Possession Status"
                      value={row.possession}
                      onChange={(val) => {
                        const updated = [...blockB1ExtCms.priceSchedule.rows];
                        updated[idx].possession = val;
                        setBlockB1ExtCms({
                          ...blockB1ExtCms,
                          priceSchedule: { ...blockB1ExtCms.priceSchedule, rows: updated }
                        });
                      }}
                      placeholder="e.g. Early Possession Phase"
                    />
                  </div>

                  <CmsRichInput
                    label="Highlight / Key Feature"
                    value={row.highlight}
                    onChange={(val) => {
                      const updated = [...blockB1ExtCms.priceSchedule.rows];
                      updated[idx].highlight = val;
                      setBlockB1ExtCms({
                        ...blockB1ExtCms,
                        priceSchedule: { ...blockB1ExtCms.priceSchedule, rows: updated }
                      });
                    }}
                    placeholder="Lowest entry price point in society with maximum capital appreciation upside."
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. AMENITIES & MODERN INFRASTRUCTURE                      */}
      {/* ========================================================= */}
      {activeCategory === 'amenities' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">6. Amenities & Modern Infrastructure</h3>
            <p className="text-xs text-slate-600">8 key amenities cards with icons, categories, and descriptive highlights.</p>
          </div>

          <CmsRichInput
            label="Section H2 Heading"
            value={blockB1ExtCms.amenities.h2}
            onChange={(val) => setBlockB1ExtCms({
              ...blockB1ExtCms,
              amenities: { ...blockB1ExtCms.amenities, h2: val }
            })}
            placeholder="Amenities & Modern Infrastructure in B-1 Extension"
          />

          <CmsRichTextarea
            label="Amenities Lead Paragraph"
            value={blockB1ExtCms.amenities.leadParagraph}
            onChange={(val) => setBlockB1ExtCms({
              ...blockB1ExtCms,
              amenities: { ...blockB1ExtCms.amenities, leadParagraph: val }
            })}
            placeholder="Block B-1 Extension is planned with complete underground civic utilities and lifestyle facilities:"
            rows={2}
          />

          <div className="border-t border-slate-100 pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-base text-slate-900">Amenity Cards ({blockB1ExtCms.amenities.items.length})</h4>
              <button
                type="button"
                onClick={() => {
                  const newItems: B1ExtAmenityItem[] = [
                    ...blockB1ExtCms.amenities.items,
                    {
                      title: 'New Amenity',
                      desc: 'Description of the newly added amenity in Block B-1 Extension.',
                      category: 'Utilities',
                      iconType: 'Zap'
                    }
                  ];
                  setBlockB1ExtCms({
                    ...blockB1ExtCms,
                    amenities: { ...blockB1ExtCms.amenities, items: newItems }
                  });
                }}
                className="px-3.5 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-xl flex items-center gap-1 hover:bg-[#9e1245] transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Amenity</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blockB1ExtCms.amenities.items.map((amenity, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative group">
                  <button
                    type="button"
                    onClick={() => {
                      const updated = blockB1ExtCms.amenities.items.filter((_, i) => i !== idx);
                      setBlockB1ExtCms({
                        ...blockB1ExtCms,
                        amenities: { ...blockB1ExtCms.amenities, items: updated }
                      });
                    }}
                    className="absolute top-3 right-3 p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                    title="Delete Amenity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                    <CmsRichInput
                      label="Amenity Title"
                      value={amenity.title}
                      onChange={(val) => {
                        const updated = [...blockB1ExtCms.amenities.items];
                        updated[idx].title = val;
                        setBlockB1ExtCms({
                          ...blockB1ExtCms,
                          amenities: { ...blockB1ExtCms.amenities, items: updated }
                        });
                      }}
                      placeholder="e.g. 100% Underground Electrification"
                    />
                    <CmsRichInput
                      label="Category Tag"
                      value={amenity.category}
                      onChange={(val) => {
                        const updated = [...blockB1ExtCms.amenities.items];
                        updated[idx].category = val;
                        setBlockB1ExtCms({
                          ...blockB1ExtCms,
                          amenities: { ...blockB1ExtCms.amenities, items: updated }
                        });
                      }}
                      placeholder="e.g. Utilities / Security / Community"
                    />
                  </div>

                  <CmsRichTextarea
                    label="Description"
                    value={amenity.desc}
                    onChange={(val) => {
                      const updated = [...blockB1ExtCms.amenities.items];
                      updated[idx].desc = val;
                      setBlockB1ExtCms({
                        ...blockB1ExtCms,
                        amenities: { ...blockB1ExtCms.amenities, items: updated }
                      });
                    }}
                    placeholder="Uninterrupted power grid with underground cabling..."
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. WHY INVEST IN BLOCK B1 EXTENSION                       */}
      {/* ========================================================= */}
      {activeCategory === 'whyInvest' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">7. Why Invest in Block B1 Extension</h3>
            <p className="text-xs text-slate-600">6 core investment rationale cards detailing capital gains and strategic value.</p>
          </div>

          <CmsRichInput
            label="Section H2 Heading"
            value={blockB1ExtCms.whyInvest.h2}
            onChange={(val) => setBlockB1ExtCms({
              ...blockB1ExtCms,
              whyInvest: { ...blockB1ExtCms.whyInvest, h2: val }
            })}
            placeholder="Why Invest in Faisal Hills Block B-1 Extension"
          />

          <CmsRichTextarea
            label="Why Invest Lead Paragraph"
            value={blockB1ExtCms.whyInvest.leadParagraph}
            onChange={(val) => setBlockB1ExtCms({
              ...blockB1ExtCms,
              whyInvest: { ...blockB1ExtCms.whyInvest, leadParagraph: val }
            })}
            placeholder="Key reasons why seasoned investors and genuine buyers choose Block B-1 Extension:"
            rows={2}
          />

          <div className="border-t border-slate-100 pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-base text-slate-900">Investment Reasons ({blockB1ExtCms.whyInvest.reasons.length})</h4>
              <button
                type="button"
                onClick={() => {
                  const newReasons: B1ExtWhyInvestItem[] = [
                    ...blockB1ExtCms.whyInvest.reasons,
                    {
                      title: 'New Investment Reason',
                      desc: 'Explanation of capital growth and sector advantage.'
                    }
                  ];
                  setBlockB1ExtCms({
                    ...blockB1ExtCms,
                    whyInvest: { ...blockB1ExtCms.whyInvest, reasons: newReasons }
                  });
                }}
                className="px-3.5 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-xl flex items-center gap-1 hover:bg-[#9e1245] transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Reason</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blockB1ExtCms.whyInvest.reasons.map((reason, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative group">
                  <button
                    type="button"
                    onClick={() => {
                      const updated = blockB1ExtCms.whyInvest.reasons.filter((_, i) => i !== idx);
                      setBlockB1ExtCms({
                        ...blockB1ExtCms,
                        whyInvest: { ...blockB1ExtCms.whyInvest, reasons: updated }
                      });
                    }}
                    className="absolute top-3 right-3 p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                    title="Delete Reason"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="pr-8">
                    <CmsRichInput
                      label={`Reason #${idx + 1} Title`}
                      value={reason.title}
                      onChange={(val) => {
                        const updated = [...blockB1ExtCms.whyInvest.reasons];
                        updated[idx].title = val;
                        setBlockB1ExtCms({
                          ...blockB1ExtCms,
                          whyInvest: { ...blockB1ExtCms.whyInvest, reasons: updated }
                        });
                      }}
                      placeholder="e.g. Highest ROI Potential"
                    />
                  </div>

                  <CmsRichTextarea
                    label="Description"
                    value={reason.desc}
                    onChange={(val) => {
                      const updated = [...blockB1ExtCms.whyInvest.reasons];
                      updated[idx].desc = val;
                      setBlockB1ExtCms({
                        ...blockB1ExtCms,
                        whyInvest: { ...blockB1ExtCms.whyInvest, reasons: updated }
                      });
                    }}
                    placeholder="Lower entry acquisition costs provide significantly higher percentage capital appreciation..."
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 8. DEVELOPMENT STATS & DRONE PROGRESS                     */}
      {/* ========================================================= */}
      {activeCategory === 'developmentStatus' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">8. Development Status, Stats & Drone Photo</h3>
            <p className="text-xs text-slate-600">On-ground development metrics, earthwork status, and machinery photo banner.</p>
          </div>

          <CmsRichInput
            label="Section H2 Heading"
            value={blockB1ExtCms.developmentStatus.h2}
            onChange={(val) => setBlockB1ExtCms({
              ...blockB1ExtCms,
              developmentStatus: { ...blockB1ExtCms.developmentStatus, h2: val }
            })}
            placeholder="Block B-1 Extension On-Ground Development Status"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CmsRichTextarea
              label="Lead Paragraph"
              value={blockB1ExtCms.developmentStatus.leadParagraph}
              onChange={(val) => setBlockB1ExtCms({
                ...blockB1ExtCms,
                developmentStatus: { ...blockB1ExtCms.developmentStatus, leadParagraph: val }
              })}
              placeholder="Heavy earthmoving machinery, road rollers, and engineering teams are actively operating..."
              rows={3}
            />
            <CmsRichTextarea
              label="Expanded Progress Narrative"
              value={blockB1ExtCms.developmentStatus.expandedParagraph}
              onChange={(val) => setBlockB1ExtCms({
                ...blockB1ExtCms,
                developmentStatus: { ...blockB1ExtCms.developmentStatus, expandedParagraph: val }
              })}
              placeholder="Sewerage pipeline laying is in advanced stages, road cuts have been demarcated..."
              rows={3}
            />
          </div>

          {/* 3 Metric Stats */}
          <div className="border-t border-slate-100 pt-4 space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase">3 Key Development Metric Counters</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <CmsRichInput
                  label="Stat 1 Value"
                  value={blockB1ExtCms.developmentStatus.stat1Value}
                  onChange={(val) => setBlockB1ExtCms({
                    ...blockB1ExtCms,
                    developmentStatus: { ...blockB1ExtCms.developmentStatus, stat1Value: val }
                  })}
                  placeholder="85%+"
                />
                <CmsRichInput
                  label="Stat 1 Label"
                  value={blockB1ExtCms.developmentStatus.stat1Label}
                  onChange={(val) => setBlockB1ExtCms({
                    ...blockB1ExtCms,
                    developmentStatus: { ...blockB1ExtCms.developmentStatus, stat1Label: val }
                  })}
                  placeholder="Earthwork Complete"
                />
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <CmsRichInput
                  label="Stat 2 Value"
                  value={blockB1ExtCms.developmentStatus.stat2Value}
                  onChange={(val) => setBlockB1ExtCms({
                    ...blockB1ExtCms,
                    developmentStatus: { ...blockB1ExtCms.developmentStatus, stat2Value: val }
                  })}
                  placeholder="100%"
                />
                <CmsRichInput
                  label="Stat 2 Label"
                  value={blockB1ExtCms.developmentStatus.stat2Label}
                  onChange={(val) => setBlockB1ExtCms({
                    ...blockB1ExtCms,
                    developmentStatus: { ...blockB1ExtCms.developmentStatus, stat2Label: val }
                  })}
                  placeholder="Sewer Line Network"
                />
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <CmsRichInput
                  label="Stat 3 Value"
                  value={blockB1ExtCms.developmentStatus.stat3Value}
                  onChange={(val) => setBlockB1ExtCms({
                    ...blockB1ExtCms,
                    developmentStatus: { ...blockB1ExtCms.developmentStatus, stat3Value: val }
                  })}
                  placeholder="On Track"
                />
                <CmsRichInput
                  label="Stat 3 Label"
                  value={blockB1ExtCms.developmentStatus.stat3Label}
                  onChange={(val) => setBlockB1ExtCms({
                    ...blockB1ExtCms,
                    developmentStatus: { ...blockB1ExtCms.developmentStatus, stat3Label: val }
                  })}
                  placeholder="Possession Delivery"
                />
              </div>
            </div>
          </div>

          {/* Drone / Site Progress Photo Banner */}
          <div className="border-t border-slate-100 pt-4 space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase">Drone & Site Progress Photo Card</h4>
            <ImageUploadField
              label="Site Machinery / Drone Photo"
              value={blockB1ExtCms.developmentStatus.dronePhotoUrl}
              onChange={(url) => setBlockB1ExtCms({
                ...blockB1ExtCms,
                developmentStatus: { ...blockB1ExtCms.developmentStatus, dronePhotoUrl: url }
              })}
              placeholder="/images/faisal-hills-drone-view.webp"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CmsRichInput
                label="Possession Badge"
                value={blockB1ExtCms.developmentStatus.possessionBadge}
                onChange={(val) => setBlockB1ExtCms({
                  ...blockB1ExtCms,
                  developmentStatus: { ...blockB1ExtCms.developmentStatus, possessionBadge: val }
                })}
                placeholder="Active Development"
              />
              <CmsRichInput
                label="Drone Photo Tag"
                value={blockB1ExtCms.developmentStatus.droneTag}
                onChange={(val) => setBlockB1ExtCms({
                  ...blockB1ExtCms,
                  developmentStatus: { ...blockB1ExtCms.developmentStatus, droneTag: val }
                })}
                placeholder="On-Ground Progress Survey"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CmsRichInput
                label="Drone Card Heading"
                value={blockB1ExtCms.developmentStatus.droneHeading}
                onChange={(val) => setBlockB1ExtCms({
                  ...blockB1ExtCms,
                  developmentStatus: { ...blockB1ExtCms.developmentStatus, droneHeading: val }
                })}
                placeholder="B-1 Extension Machinery & Grading"
              />
              <CmsRichInput
                label="Drone Photo Alt Text"
                value={blockB1ExtCms.developmentStatus.dronePhotoAlt}
                onChange={(val) => setBlockB1ExtCms({
                  ...blockB1ExtCms,
                  developmentStatus: { ...blockB1ExtCms.developmentStatus, dronePhotoAlt: val }
                })}
                placeholder="Faisal Hills Block B-1 Extension Machinery on Site"
              />
            </div>
            <CmsRichTextarea
              label="Drone Card Description"
              value={blockB1ExtCms.developmentStatus.droneDesc}
              onChange={(val) => setBlockB1ExtCms({
                ...blockB1ExtCms,
                developmentStatus: { ...blockB1ExtCms.developmentStatus, droneDesc: val }
              })}
              placeholder="Continuous grading, heavy machinery deployment, and underground utility installation on site."
              rows={2}
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 9. ALLOTMENT & TRANSFER PROCESS                           */}
      {/* ========================================================= */}
      {activeCategory === 'transferProcess' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">9. Allotment & Transfer Roadmap</h3>
            <p className="text-xs text-slate-600">4 verified steps at Zedem International head office with required documents.</p>
          </div>

          <CmsRichInput
            label="Section H2 Heading"
            value={blockB1ExtCms.transferProcess.h2}
            onChange={(val) => setBlockB1ExtCms({
              ...blockB1ExtCms,
              transferProcess: { ...blockB1ExtCms.transferProcess, h2: val }
            })}
            placeholder="Block B-1 Extension Allotment & Transfer Process"
          />

          <CmsRichTextarea
            label="Transfer Lead Paragraph"
            value={blockB1ExtCms.transferProcess.leadParagraph}
            onChange={(val) => setBlockB1ExtCms({
              ...blockB1ExtCms,
              transferProcess: { ...blockB1ExtCms.transferProcess, leadParagraph: val }
            })}
            placeholder="Follow these 4 essential points to complete official plot transfer directly at Zedem International:"
            rows={2}
          />

          {/* 4 Steps */}
          <div className="border-t border-slate-100 pt-5 space-y-4">
            <h4 className="font-serif font-bold text-base text-slate-900">4-Step Transfer Roadmap Cards</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {blockB1ExtCms.transferProcess.steps.map((step, idx) => (
                <div key={idx} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-[#7b002c]">Step {idx + 1}</span>
                    <CmsRichInput
                      label="Point / Step No."
                      value={step.point}
                      onChange={(val) => {
                        const updated = [...blockB1ExtCms.transferProcess.steps];
                        updated[idx].point = val;
                        setBlockB1ExtCms({
                          ...blockB1ExtCms,
                          transferProcess: { ...blockB1ExtCms.transferProcess, steps: updated }
                        });
                      }}
                      placeholder={`0${idx + 1}`}
                    />
                  </div>

                  <CmsRichInput
                    label="Step Tagline"
                    value={step.tag}
                    onChange={(val) => {
                      const updated = [...blockB1ExtCms.transferProcess.steps];
                      updated[idx].tag = val;
                      setBlockB1ExtCms({
                        ...blockB1ExtCms,
                        transferProcess: { ...blockB1ExtCms.transferProcess, steps: updated }
                      });
                    }}
                    placeholder={`Step ${idx + 1}: Step Name`}
                  />

                  <CmsRichInput
                    label="Title"
                    value={step.title}
                    onChange={(val) => {
                      const updated = [...blockB1ExtCms.transferProcess.steps];
                      updated[idx].title = val;
                      setBlockB1ExtCms({
                        ...blockB1ExtCms,
                        transferProcess: { ...blockB1ExtCms.transferProcess, steps: updated }
                      });
                    }}
                    placeholder="Step Title"
                  />

                  <CmsRichInput
                    label="Badge"
                    value={step.badge}
                    onChange={(val) => {
                      const updated = [...blockB1ExtCms.transferProcess.steps];
                      updated[idx].badge = val;
                      setBlockB1ExtCms({
                        ...blockB1ExtCms,
                        transferProcess: { ...blockB1ExtCms.transferProcess, steps: updated }
                      });
                    }}
                    placeholder="Verified Requirement"
                  />

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Checklist Bullet Points (One per line)
                    </label>
                    <textarea
                      rows={3}
                      value={Array.isArray(step.points) ? step.points.join('\n') : ''}
                      onChange={(e) => {
                        const updated = [...blockB1ExtCms.transferProcess.steps];
                        updated[idx].points = e.target.value.split('\n').filter((p) => p.trim() !== '');
                        setBlockB1ExtCms({
                          ...blockB1ExtCms,
                          transferProcess: { ...blockB1ExtCms.transferProcess, steps: updated }
                        });
                      }}
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                      placeholder="Attested copy 1&#10;Attested copy 2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transfer Desk Banner */}
          <div className="border-t border-slate-100 pt-5 space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase">Assistance Banner & WhatsApp Desk</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CmsRichInput
                label="Banner Heading"
                value={blockB1ExtCms.transferProcess.bannerHeading}
                onChange={(val) => setBlockB1ExtCms({
                  ...blockB1ExtCms,
                  transferProcess: { ...blockB1ExtCms.transferProcess, bannerHeading: val }
                })}
                placeholder="Need Help with Block B-1 Extension File Verification?"
              />
              <CmsRichInput
                label="Button Text"
                value={blockB1ExtCms.transferProcess.bannerButtonText}
                onChange={(val) => setBlockB1ExtCms({
                  ...blockB1ExtCms,
                  transferProcess: { ...blockB1ExtCms.transferProcess, bannerButtonText: val }
                })}
                placeholder="Contact Advisory Desk"
              />
            </div>
            <CmsRichTextarea
              label="Banner Subtext"
              value={blockB1ExtCms.transferProcess.bannerSubtext}
              onChange={(val) => setBlockB1ExtCms({
                ...blockB1ExtCms,
                transferProcess: { ...blockB1ExtCms.transferProcess, bannerSubtext: val }
              })}
              placeholder="Our dedicated transfer advisory desk verifies society records..."
              rows={2}
            />
            <CmsRichInput
              label="Pre-filled WhatsApp Message"
              value={blockB1ExtCms.transferProcess.bannerWhatsapp}
              onChange={(val) => setBlockB1ExtCms({
                ...blockB1ExtCms,
                transferProcess: { ...blockB1ExtCms.transferProcess, bannerWhatsapp: val }
              })}
              placeholder="Hi, I need official assistance with plot transfer in Faisal Hills Block B-1 Extension."
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 10. FAQS ACCORDION                                        */}
      {/* ========================================================= */}
      {activeCategory === 'faqs' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">10. Frequently Asked Questions (FAQs)</h3>
            <p className="text-xs text-slate-600">Editable questions and detailed answers regarding location, possession, and transfer.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CmsRichInput
              label="Section Eyebrow Tag"
              value={blockB1ExtCms.faqs.sectionTag}
              onChange={(val) => setBlockB1ExtCms({
                ...blockB1ExtCms,
                faqs: { ...blockB1ExtCms.faqs, sectionTag: val }
              })}
              placeholder="FAQ'S"
            />
            <CmsRichInput
              label="Section H2 Heading"
              value={blockB1ExtCms.faqs.h2}
              onChange={(val) => setBlockB1ExtCms({
                ...blockB1ExtCms,
                faqs: { ...blockB1ExtCms.faqs, h2: val }
              })}
              placeholder="Frequently Asked Questions (FAQS)"
            />
          </div>

          <div className="border-t border-slate-100 pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-base text-slate-900">FAQ Items ({blockB1ExtCms.faqs.items.length})</h4>
              <button
                type="button"
                onClick={() => {
                  const newFaqs: B1ExtFaqItem[] = [
                    ...blockB1ExtCms.faqs.items,
                    {
                      q: 'New Question About Block B1 Extension?',
                      a: 'Detailed explanatory answer for prospective buyers and investors.'
                    }
                  ];
                  setBlockB1ExtCms({
                    ...blockB1ExtCms,
                    faqs: { ...blockB1ExtCms.faqs, items: newFaqs }
                  });
                }}
                className="px-3.5 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-xl flex items-center gap-1 hover:bg-[#9e1245] transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add FAQ</span>
              </button>
            </div>

            <div className="space-y-4">
              {blockB1ExtCms.faqs.items.map((faq, idx) => (
                <div key={idx} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative group">
                  <button
                    type="button"
                    onClick={() => {
                      const updated = blockB1ExtCms.faqs.items.filter((_, i) => i !== idx);
                      setBlockB1ExtCms({
                        ...blockB1ExtCms,
                        faqs: { ...blockB1ExtCms.faqs, items: updated }
                      });
                    }}
                    className="absolute top-4 right-4 p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                    title="Delete FAQ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="pr-8">
                    <CmsRichInput
                      label={`Question #${idx + 1}`}
                      value={faq.q}
                      onChange={(val) => {
                        const updated = [...blockB1ExtCms.faqs.items];
                        updated[idx].q = val;
                        setBlockB1ExtCms({
                          ...blockB1ExtCms,
                          faqs: { ...blockB1ExtCms.faqs, items: updated }
                        });
                      }}
                      placeholder="e.g. Where is Block B-1 Extension located?"
                    />
                  </div>

                  <CmsRichTextarea
                    label="Answer"
                    value={faq.a}
                    onChange={(val) => {
                      const updated = [...blockB1ExtCms.faqs.items];
                      updated[idx].a = val;
                      setBlockB1ExtCms({
                        ...blockB1ExtCms,
                        faqs: { ...blockB1ExtCms.faqs, items: updated }
                      });
                    }}
                    placeholder="Enter thorough markdown-supported answer..."
                    rows={3}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 11. TOUR BOOKING & PRIORITY INQUIRY FORM                  */}
      {/* ========================================================= */}
      {activeCategory === 'scheduleTour' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">11. Tour Booking & Priority Consultation Form</h3>
            <p className="text-xs text-slate-600">Lead capture banner headings, descriptions, button copy, and confirmation response message.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CmsRichInput
              label="Form Eyebrow Tag"
              value={blockB1ExtCms.scheduleTour.tag}
              onChange={(val) => setBlockB1ExtCms({
                ...blockB1ExtCms,
                scheduleTour: { ...blockB1ExtCms.scheduleTour, tag: val }
              })}
              placeholder="Direct Developer Facilitation Desk"
            />
            <CmsRichInput
              label="Form Heading H3"
              value={blockB1ExtCms.scheduleTour.h3}
              onChange={(val) => setBlockB1ExtCms({
                ...blockB1ExtCms,
                scheduleTour: { ...blockB1ExtCms.scheduleTour, h3: val }
              })}
              placeholder="Schedule an On-Site Block B-1 Extension Tour"
            />
          </div>

          <CmsRichTextarea
            label="Lead Paragraph"
            value={blockB1ExtCms.scheduleTour.leadParagraph}
            onChange={(val) => setBlockB1ExtCms({
              ...blockB1ExtCms,
              scheduleTour: { ...blockB1ExtCms.scheduleTour, leadParagraph: val }
            })}
            placeholder="Leave your contact details to receive verified plot listings, latest price quotations..."
            rows={3}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-100 pt-4">
            <CmsRichInput
              label="Thank You Title"
              value={blockB1ExtCms.scheduleTour.thankYouHeading}
              onChange={(val) => setBlockB1ExtCms({
                ...blockB1ExtCms,
                scheduleTour: { ...blockB1ExtCms.scheduleTour, thankYouHeading: val }
              })}
              placeholder="Inquiry Received!"
            />
            <CmsRichInput
              label="Thank You Subtext"
              value={blockB1ExtCms.scheduleTour.thankYouMessage}
              onChange={(val) => setBlockB1ExtCms({
                ...blockB1ExtCms,
                scheduleTour: { ...blockB1ExtCms.scheduleTour, thankYouMessage: val }
              })}
              placeholder="Thank you. Our Block B-1 Extension specialist will contact you..."
            />
            <CmsRichInput
              label="Submit Button Text"
              value={blockB1ExtCms.scheduleTour.buttonText}
              onChange={(val) => setBlockB1ExtCms({
                ...blockB1ExtCms,
                scheduleTour: { ...blockB1ExtCms.scheduleTour, buttonText: val }
              })}
              placeholder="Submit Inquiry Request"
            />
          </div>
        </div>
      )}

    </div>
  );
}
