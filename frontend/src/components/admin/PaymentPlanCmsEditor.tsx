'use client';

import React, { useState, useRef } from 'react';
import {
  PaymentPlanCMSData,
  initialPaymentPlanCMS,
  savePaymentPlanCMS
} from '@/data/faisalHillsData';
import CmsRichTextarea from './CmsRichTextarea';
import CmsRichInput from './CmsRichInput';
import {
  Save,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  MapPin,
  DollarSign,
  Layers,
  Building2,
  FileText,
  HelpCircle,
  PhoneCall,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Globe,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Info,
  Loader2,
  Check,
  Receipt,
  Clock
} from 'lucide-react';

interface PaymentPlanCmsEditorProps {
  paymentPlanCms: PaymentPlanCMSData;
  setPaymentPlanCms: React.Dispatch<React.SetStateAction<PaymentPlanCMSData>>;
  token?: string | null;
  onSaveSuccess?: (msg: string) => void;
}

export default function PaymentPlanCmsEditor({
  paymentPlanCms,
  setPaymentPlanCms,
  token,
  onSaveSuccess
}: PaymentPlanCmsEditorProps) {
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

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMsg('');
    const activeToken = token || (typeof window !== 'undefined' ? sessionStorage.getItem('faisal_admin_token') || undefined : undefined);
    const ok = await savePaymentPlanCMS(paymentPlanCms, activeToken);
    setIsSaving(false);
    if (ok) {
      setSaveMsg('Payment Plan CMS saved successfully to backend & live cache!');
      if (onSaveSuccess) onSaveSuccess('Payment Plan CMS published!');
      setTimeout(() => setSaveMsg(''), 4000);
    } else {
      setSaveMsg('Saved locally. (Note: API endpoint responded with fallback)');
      setTimeout(() => setSaveMsg(''), 4000);
    }
  };

  const handleResetToDefault = () => {
    if (confirm('Are you sure you want to reset Payment Plan CMS content to the default publish-ready copy?')) {
      setPaymentPlanCms(initialPaymentPlanCMS);
    }
  };

  const categories = [
    { id: 'verification', label: '1. Reviewer & Meta', icon: ShieldCheck },
    { id: 'overview', label: '2. Overview & Quick Facts', icon: Layers },
    { id: 'howItWorks', label: '3. How It Works (5 Steps)', icon: Receipt },
    { id: 'primeSchedule', label: '4. Prime Block Schedule', icon: DollarSign },
    { id: 'blockPlans', label: '5. Plans by Block', icon: Building2 },
    { id: 'whyDiff', label: '6. Online Plans Comparison', icon: Clock },
    { id: 'costs', label: '7. Additional Costs', icon: Info },
    { id: 'howToPay', label: '8. How to Pay & Policies', icon: Globe },
    { id: 'faqs', label: '9. FAQs (11 Items)', icon: HelpCircle },
    { id: 'ctaAbout', label: '10. CTA & About Page', icon: MapPin },
  ];

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#7b002c]/10 text-[#7b002c] border border-[#7b002c]/20">
              Live Publish CMS
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              Faisal Hills Payment Plan Editor
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage the official 2026 payment plan schedule, Prime Block prices, block-wise terms, FAQs, and disclosures.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Default</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold shadow-md transition-all disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isSaving ? 'Publishing...' : 'Save & Publish'}</span>
          </button>
        </div>
      </div>

      {saveMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{saveMsg}</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="relative bg-white rounded-2xl border border-slate-200 p-2 shadow-2xs">
        <button
          onClick={() => scrollTabs('left')}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white shadow-md rounded-full flex items-center justify-center border border-slate-200 text-slate-600 hover:text-[#7b002c]"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div
          ref={tabsScrollRef}
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar px-6 py-1 scroll-smooth"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#7b002c] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
        <button
          onClick={() => scrollTabs('right')}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white shadow-md rounded-full flex items-center justify-center border border-slate-200 text-slate-600 hover:text-[#7b002c]"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Tab 1: Verification Header */}
      {activeCategory === 'verification' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm">
          <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
            Section 1: Verification Header & Metadata
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Reviewer Name [VERIFY 1]</label>
              <input
                type="text"
                value={paymentPlanCms.verificationHeader.reviewerName}
                onChange={(e) =>
                  setPaymentPlanCms({
                    ...paymentPlanCms,
                    verificationHeader: { ...paymentPlanCms.verificationHeader, reviewerName: e.target.value }
                  })
                }
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:border-[#7b002c] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Reviewer Role / Company</label>
              <input
                type="text"
                value={paymentPlanCms.verificationHeader.reviewerRole}
                onChange={(e) =>
                  setPaymentPlanCms({
                    ...paymentPlanCms,
                    verificationHeader: { ...paymentPlanCms.verificationHeader, reviewerRole: e.target.value }
                  })
                }
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:border-[#7b002c] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Schedule Verified Date [VERIFY 2]</label>
              <input
                type="text"
                value={paymentPlanCms.verificationHeader.scheduleVerifiedDate}
                onChange={(e) =>
                  setPaymentPlanCms({
                    ...paymentPlanCms,
                    verificationHeader: { ...paymentPlanCms.verificationHeader, scheduleVerifiedDate: e.target.value }
                  })
                }
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:border-[#7b002c] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Page Last Updated</label>
              <input
                type="text"
                value={paymentPlanCms.verificationHeader.pageLastUpdated}
                onChange={(e) =>
                  setPaymentPlanCms({
                    ...paymentPlanCms,
                    verificationHeader: { ...paymentPlanCms.verificationHeader, pageLastUpdated: e.target.value }
                  })
                }
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:border-[#7b002c] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Badge Text</label>
              <input
                type="text"
                value={paymentPlanCms.verificationHeader.badgeText}
                onChange={(e) =>
                  setPaymentPlanCms({
                    ...paymentPlanCms,
                    verificationHeader: { ...paymentPlanCms.verificationHeader, badgeText: e.target.value }
                  })
                }
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:border-[#7b002c] outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Overview & Quick Facts */}
      {activeCategory === 'overview' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm">
          <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
            Overview & Quick Facts Table
          </h3>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Page H1 Title</label>
            <input
              type="text"
              value={paymentPlanCms.overview.h1}
              onChange={(e) =>
                setPaymentPlanCms({
                  ...paymentPlanCms,
                  overview: { ...paymentPlanCms.overview, h1: e.target.value }
                })
              }
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:border-[#7b002c] outline-none font-serif font-bold"
            />
          </div>
          <CmsRichTextarea
            label="Lead Paragraph"
            rows={3}
            value={paymentPlanCms.overview.leadParagraph}
            onChange={(val) =>
              setPaymentPlanCms({
                ...paymentPlanCms,
                overview: { ...paymentPlanCms.overview, leadParagraph: val }
              })
            }
          />
          <CmsRichTextarea
            label="Terms Variation Note"
            rows={2}
            value={paymentPlanCms.overview.termsNote}
            onChange={(val) =>
              setPaymentPlanCms({
                ...paymentPlanCms,
                overview: { ...paymentPlanCms.overview, termsNote: val }
              })
            }
          />

          <h4 className="font-serif font-bold text-sm text-slate-900 pt-2 border-t border-slate-100">
            Quick Facts Matrix
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Instalment Frequency</label>
              <input
                type="text"
                value={paymentPlanCms.overview.quickFacts.frequency}
                onChange={(e) =>
                  setPaymentPlanCms({
                    ...paymentPlanCms,
                    overview: {
                      ...paymentPlanCms.overview,
                      quickFacts: { ...paymentPlanCms.overview.quickFacts, frequency: e.target.value }
                    }
                  })
                }
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Current Term</label>
              <input
                type="text"
                value={paymentPlanCms.overview.quickFacts.term}
                onChange={(e) =>
                  setPaymentPlanCms({
                    ...paymentPlanCms,
                    overview: {
                      ...paymentPlanCms.overview,
                      quickFacts: { ...paymentPlanCms.overview.quickFacts, term: e.target.value }
                    }
                  })
                }
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Booking Amount (Down Payment)</label>
              <input
                type="text"
                value={paymentPlanCms.overview.quickFacts.bookingAmount}
                onChange={(e) =>
                  setPaymentPlanCms({
                    ...paymentPlanCms,
                    overview: {
                      ...paymentPlanCms.overview,
                      quickFacts: { ...paymentPlanCms.overview.quickFacts, bookingAmount: e.target.value }
                    }
                  })
                }
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Lump-Sum Discount</label>
              <input
                type="text"
                value={paymentPlanCms.overview.quickFacts.lumpSumDiscount}
                onChange={(e) =>
                  setPaymentPlanCms({
                    ...paymentPlanCms,
                    overview: {
                      ...paymentPlanCms.overview,
                      quickFacts: { ...paymentPlanCms.overview.quickFacts, lumpSumDiscount: e.target.value }
                    }
                  })
                }
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Registration Fee</label>
              <input
                type="text"
                value={paymentPlanCms.overview.quickFacts.registrationFee}
                onChange={(e) =>
                  setPaymentPlanCms({
                    ...paymentPlanCms,
                    overview: {
                      ...paymentPlanCms.overview,
                      quickFacts: { ...paymentPlanCms.overview.quickFacts, registrationFee: e.target.value }
                    }
                  })
                }
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Schedule Date</label>
              <input
                type="text"
                value={paymentPlanCms.overview.quickFacts.scheduleDate}
                onChange={(e) =>
                  setPaymentPlanCms({
                    ...paymentPlanCms,
                    overview: {
                      ...paymentPlanCms.overview,
                      quickFacts: { ...paymentPlanCms.overview.quickFacts, scheduleDate: e.target.value }
                    }
                  })
                }
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: How It Works */}
      {activeCategory === 'howItWorks' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm">
          <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
            How the Payment Plan Works (5-Step Sequence)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Section Heading</label>
              <input
                type="text"
                value={paymentPlanCms.howItWorks.heading}
                onChange={(e) =>
                  setPaymentPlanCms({
                    ...paymentPlanCms,
                    howItWorks: { ...paymentPlanCms.howItWorks, heading: e.target.value }
                  })
                }
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Intro Text</label>
              <input
                type="text"
                value={paymentPlanCms.howItWorks.intro}
                onChange={(e) =>
                  setPaymentPlanCms({
                    ...paymentPlanCms,
                    howItWorks: { ...paymentPlanCms.howItWorks, intro: e.target.value }
                  })
                }
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none"
              />
            </div>
          </div>

          <div className="space-y-3">
            {paymentPlanCms.howItWorks.steps.map((st, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-[#7b002c]">Step {st.stepNumber}</span>
                <input
                  type="text"
                  value={st.title}
                  placeholder="Step title"
                  onChange={(e) => {
                    const updated = [...paymentPlanCms.howItWorks.steps];
                    updated[idx].title = e.target.value;
                    setPaymentPlanCms({
                      ...paymentPlanCms,
                      howItWorks: { ...paymentPlanCms.howItWorks, steps: updated }
                    });
                  }}
                  className="w-full p-2 text-xs bg-white border border-slate-300 rounded-lg font-bold"
                />
                <CmsRichTextarea
                  label="Step description"
                  rows={2}
                  value={st.description}
                  onChange={(val) => {
                    const updated = [...paymentPlanCms.howItWorks.steps];
                    updated[idx].description = val;
                    setPaymentPlanCms({
                      ...paymentPlanCms,
                      howItWorks: { ...paymentPlanCms.howItWorks, steps: updated }
                    });
                  }}
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Paying in Full Note</label>
            <input
              type="text"
              value={paymentPlanCms.howItWorks.payingInFullNote}
              onChange={(e) =>
                setPaymentPlanCms({
                  ...paymentPlanCms,
                  howItWorks: { ...paymentPlanCms.howItWorks, payingInFullNote: e.target.value }
                })
              }
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <CmsRichTextarea
              label="What Down Payment Covers"
              rows={4}
              value={paymentPlanCms.howItWorks.downPaymentCoversDesc}
              onChange={(val) =>
                setPaymentPlanCms({
                  ...paymentPlanCms,
                  howItWorks: { ...paymentPlanCms.howItWorks, downPaymentCoversDesc: val }
                })
              }
            />
            <CmsRichTextarea
              label="What You Receive After Booking"
              rows={4}
              value={paymentPlanCms.howItWorks.afterBookingDesc}
              onChange={(val) =>
                setPaymentPlanCms({
                  ...paymentPlanCms,
                  howItWorks: { ...paymentPlanCms.howItWorks, afterBookingDesc: val }
                })
              }
            />
          </div>
        </div>
      )}

      {/* Tab 4: Prime Block Schedule */}
      {activeCategory === 'primeSchedule' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-serif font-bold text-base text-slate-900">
              The Most Recent Schedule We Hold: Prime Block
            </h3>
            <button
              type="button"
              onClick={() => {
                const updated = [
                  ...paymentPlanCms.primeBlockSchedule.rows,
                  {
                    plotCutting: 'New Plot Size',
                    totalPrice: '0',
                    bookingAmount: '0',
                    quarterlyInstalments: '0',
                    lumpSumDiscounted: '0'
                  }
                ];
                setPaymentPlanCms({
                  ...paymentPlanCms,
                  primeBlockSchedule: { ...paymentPlanCms.primeBlockSchedule, rows: updated }
                });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#7b002c] text-white rounded-lg text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Row</span>
            </button>
          </div>

          {/* Schedule Table Rows */}
          <div className="space-y-3">
            {paymentPlanCms.primeBlockSchedule.rows.map((row, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600">Plot Size</label>
                  <input
                    type="text"
                    value={row.plotCutting}
                    onChange={(e) => {
                      const updated = [...paymentPlanCms.primeBlockSchedule.rows];
                      updated[idx].plotCutting = e.target.value;
                      setPaymentPlanCms({
                        ...paymentPlanCms,
                        primeBlockSchedule: { ...paymentPlanCms.primeBlockSchedule, rows: updated }
                      });
                    }}
                    className="w-full p-1.5 text-xs bg-white border border-slate-300 rounded font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600">Total Price (PKR)</label>
                  <input
                    type="text"
                    value={row.totalPrice}
                    onChange={(e) => {
                      const updated = [...paymentPlanCms.primeBlockSchedule.rows];
                      updated[idx].totalPrice = e.target.value;
                      setPaymentPlanCms({
                        ...paymentPlanCms,
                        primeBlockSchedule: { ...paymentPlanCms.primeBlockSchedule, rows: updated }
                      });
                    }}
                    className="w-full p-1.5 text-xs bg-white border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600">Booking Amount (PKR)</label>
                  <input
                    type="text"
                    value={row.bookingAmount}
                    onChange={(e) => {
                      const updated = [...paymentPlanCms.primeBlockSchedule.rows];
                      updated[idx].bookingAmount = e.target.value;
                      setPaymentPlanCms({
                        ...paymentPlanCms,
                        primeBlockSchedule: { ...paymentPlanCms.primeBlockSchedule, rows: updated }
                      });
                    }}
                    className="w-full p-1.5 text-xs bg-white border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600">10 Qtr Instalments</label>
                  <input
                    type="text"
                    value={row.quarterlyInstalments}
                    onChange={(e) => {
                      const updated = [...paymentPlanCms.primeBlockSchedule.rows];
                      updated[idx].quarterlyInstalments = e.target.value;
                      setPaymentPlanCms({
                        ...paymentPlanCms,
                        primeBlockSchedule: { ...paymentPlanCms.primeBlockSchedule, rows: updated }
                      });
                    }}
                    className="w-full p-1.5 text-xs bg-white border border-slate-300 rounded"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-slate-600">Lump Sum 20% Off</label>
                    <input
                      type="text"
                      value={row.lumpSumDiscounted}
                      onChange={(e) => {
                        const updated = [...paymentPlanCms.primeBlockSchedule.rows];
                        updated[idx].lumpSumDiscounted = e.target.value;
                        setPaymentPlanCms({
                          ...paymentPlanCms,
                          primeBlockSchedule: { ...paymentPlanCms.primeBlockSchedule, rows: updated }
                        });
                      }}
                      className="w-full p-1.5 text-xs bg-white border border-slate-300 rounded font-bold text-emerald-700"
                    />
                  </div>
                  {paymentPlanCms.primeBlockSchedule.rows.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const updated = paymentPlanCms.primeBlockSchedule.rows.filter((_, i) => i !== idx);
                        setPaymentPlanCms({
                          ...paymentPlanCms,
                          primeBlockSchedule: { ...paymentPlanCms.primeBlockSchedule, rows: updated }
                        });
                      }}
                      className="text-red-500 hover:text-red-700 p-1 mt-3"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <CmsRichTextarea
            label="Reconciliation Note"
            rows={2}
            value={paymentPlanCms.primeBlockSchedule.reconciliationNote}
            onChange={(val) =>
              setPaymentPlanCms({
                ...paymentPlanCms,
                primeBlockSchedule: { ...paymentPlanCms.primeBlockSchedule, reconciliationNote: val }
              })
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CmsRichTextarea
              label="Marla Convention (225 vs 250 sqft)"
              rows={3}
              value={paymentPlanCms.primeBlockSchedule.marlaConventionNote}
              onChange={(val) =>
                setPaymentPlanCms({
                  ...paymentPlanCms,
                  primeBlockSchedule: { ...paymentPlanCms.primeBlockSchedule, marlaConventionNote: val }
                })
              }
            />
            <CmsRichTextarea
              label="14 Marla Status Note"
              rows={3}
              value={paymentPlanCms.primeBlockSchedule.marla14Note}
              onChange={(val) =>
                setPaymentPlanCms({
                  ...paymentPlanCms,
                  primeBlockSchedule: { ...paymentPlanCms.primeBlockSchedule, marla14Note: val }
                })
              }
            />
          </div>

          <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 space-y-2">
            <h4 className="font-serif font-bold text-xs text-[#7b002c]">Worked Example (5 Marla)</h4>
            <CmsRichTextarea
              label="Example Calculation Walkthrough"
              rows={2}
              value={paymentPlanCms.primeBlockSchedule.cost5MarlaExample.description}
              onChange={(val) =>
                setPaymentPlanCms({
                  ...paymentPlanCms,
                  primeBlockSchedule: {
                    ...paymentPlanCms.primeBlockSchedule,
                    cost5MarlaExample: {
                      ...paymentPlanCms.primeBlockSchedule.cost5MarlaExample,
                      description: val
                    }
                  }
                })
              }
            />
            <input
              type="text"
              value={paymentPlanCms.primeBlockSchedule.cost5MarlaExample.savingsNote}
              onChange={(e) =>
                setPaymentPlanCms({
                  ...paymentPlanCms,
                  primeBlockSchedule: {
                    ...paymentPlanCms.primeBlockSchedule,
                    cost5MarlaExample: {
                      ...paymentPlanCms.primeBlockSchedule.cost5MarlaExample,
                      savingsNote: e.target.value
                    }
                  }
                })
              }
              className="w-full p-2 text-xs bg-white border border-rose-200 rounded-lg font-semibold text-emerald-800"
            />
          </div>
        </div>
      )}

      {/* Tab 5: Payment Plans by Block */}
      {activeCategory === 'blockPlans' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-serif font-bold text-base text-slate-900">
              Payment Plans by Block Matrix
            </h3>
            <button
              type="button"
              onClick={() => {
                const updated = [
                  ...paymentPlanCms.paymentPlansByBlock.blockRows,
                  {
                    blockName: 'New Block',
                    blockSlug: 'new-block',
                    terms: 'Full payment',
                    notes: 'Add notes here'
                  }
                ];
                setPaymentPlanCms({
                  ...paymentPlanCms,
                  paymentPlansByBlock: { ...paymentPlanCms.paymentPlansByBlock, blockRows: updated }
                });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#7b002c] text-white rounded-lg text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Block</span>
            </button>
          </div>

          <div className="space-y-3">
            {paymentPlanCms.paymentPlansByBlock.blockRows.map((bl, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3 relative items-center">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600">Block Name</label>
                  <input
                    type="text"
                    value={bl.blockName}
                    onChange={(e) => {
                      const updated = [...paymentPlanCms.paymentPlansByBlock.blockRows];
                      updated[idx].blockName = e.target.value;
                      setPaymentPlanCms({
                        ...paymentPlanCms,
                        paymentPlansByBlock: { ...paymentPlanCms.paymentPlansByBlock, blockRows: updated }
                      });
                    }}
                    className="w-full p-1.5 text-xs bg-white border border-slate-300 rounded font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600">Block Slug URL</label>
                  <input
                    type="text"
                    value={bl.blockSlug}
                    onChange={(e) => {
                      const updated = [...paymentPlanCms.paymentPlansByBlock.blockRows];
                      updated[idx].blockSlug = e.target.value;
                      setPaymentPlanCms({
                        ...paymentPlanCms,
                        paymentPlansByBlock: { ...paymentPlanCms.paymentPlansByBlock, blockRows: updated }
                      });
                    }}
                    className="w-full p-1.5 text-xs bg-white border border-slate-300 rounded font-mono text-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600">Terms Reported</label>
                  <input
                    type="text"
                    value={bl.terms}
                    onChange={(e) => {
                      const updated = [...paymentPlanCms.paymentPlansByBlock.blockRows];
                      updated[idx].terms = e.target.value;
                      setPaymentPlanCms({
                        ...paymentPlanCms,
                        paymentPlansByBlock: { ...paymentPlanCms.paymentPlansByBlock, blockRows: updated }
                      });
                    }}
                    className="w-full p-1.5 text-xs bg-white border border-slate-300 rounded"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-slate-600">Notes</label>
                    <input
                      type="text"
                      value={bl.notes}
                      onChange={(e) => {
                        const updated = [...paymentPlanCms.paymentPlansByBlock.blockRows];
                        updated[idx].notes = e.target.value;
                        setPaymentPlanCms({
                          ...paymentPlanCms,
                          paymentPlansByBlock: { ...paymentPlanCms.paymentPlansByBlock, blockRows: updated }
                        });
                      }}
                      className="w-full p-1.5 text-xs bg-white border border-slate-300 rounded"
                    />
                  </div>
                  {paymentPlanCms.paymentPlansByBlock.blockRows.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const updated = paymentPlanCms.paymentPlansByBlock.blockRows.filter((_, i) => i !== idx);
                        setPaymentPlanCms({
                          ...paymentPlanCms,
                          paymentPlansByBlock: { ...paymentPlanCms.paymentPlansByBlock, blockRows: updated }
                        });
                      }}
                      className="text-red-500 hover:text-red-700 p-1 mt-3"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <CmsRichTextarea
            label="Footer Note (Price vs Payment Plan)"
            rows={2}
            value={paymentPlanCms.paymentPlansByBlock.footerNote}
            onChange={(val) =>
              setPaymentPlanCms({
                ...paymentPlanCms,
                paymentPlansByBlock: { ...paymentPlanCms.paymentPlansByBlock, footerNote: val }
              })
            }
          />
        </div>
      )}

      {/* Tab 6: Why Different Plans Online */}
      {activeCategory === 'whyDiff' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-serif font-bold text-base text-slate-900">
              Why You Will See Different Payment Plans Online
            </h3>
            <button
              type="button"
              onClick={() => {
                const updated = [
                  ...paymentPlanCms.whyDifferentPlansOnline.comparisonRows,
                  {
                    structure: 'New Structure',
                    source: 'Where it appears',
                    term: 'Term'
                  }
                ];
                setPaymentPlanCms({
                  ...paymentPlanCms,
                  whyDifferentPlansOnline: { ...paymentPlanCms.whyDifferentPlansOnline, comparisonRows: updated }
                });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#7b002c] text-white rounded-lg text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Structure</span>
            </button>
          </div>

          <div className="space-y-3">
            {paymentPlanCms.whyDifferentPlansOnline.comparisonRows.map((row, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600">Structure</label>
                  <input
                    type="text"
                    value={row.structure}
                    onChange={(e) => {
                      const updated = [...paymentPlanCms.whyDifferentPlansOnline.comparisonRows];
                      updated[idx].structure = e.target.value;
                      setPaymentPlanCms({
                        ...paymentPlanCms,
                        whyDifferentPlansOnline: { ...paymentPlanCms.whyDifferentPlansOnline, comparisonRows: updated }
                      });
                    }}
                    className="w-full p-1.5 text-xs bg-white border border-slate-300 rounded font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600">Where it appears</label>
                  <input
                    type="text"
                    value={row.source}
                    onChange={(e) => {
                      const updated = [...paymentPlanCms.whyDifferentPlansOnline.comparisonRows];
                      updated[idx].source = e.target.value;
                      setPaymentPlanCms({
                        ...paymentPlanCms,
                        whyDifferentPlansOnline: { ...paymentPlanCms.whyDifferentPlansOnline, comparisonRows: updated }
                      });
                    }}
                    className="w-full p-1.5 text-xs bg-white border border-slate-300 rounded"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-slate-600">Term</label>
                    <input
                      type="text"
                      value={row.term}
                      onChange={(e) => {
                        const updated = [...paymentPlanCms.whyDifferentPlansOnline.comparisonRows];
                        updated[idx].term = e.target.value;
                        setPaymentPlanCms({
                          ...paymentPlanCms,
                          whyDifferentPlansOnline: { ...paymentPlanCms.whyDifferentPlansOnline, comparisonRows: updated }
                        });
                      }}
                      className="w-full p-1.5 text-xs bg-white border border-slate-300 rounded font-mono"
                    />
                  </div>
                  {paymentPlanCms.whyDifferentPlansOnline.comparisonRows.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const updated = paymentPlanCms.whyDifferentPlansOnline.comparisonRows.filter((_, i) => i !== idx);
                        setPaymentPlanCms({
                          ...paymentPlanCms,
                          whyDifferentPlansOnline: { ...paymentPlanCms.whyDifferentPlansOnline, comparisonRows: updated }
                        });
                      }}
                      className="text-red-500 hover:text-red-700 p-1 mt-3"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <CmsRichTextarea
            label="What To Do Advice"
            rows={3}
            value={paymentPlanCms.whyDifferentPlansOnline.adviceText}
            onChange={(val) =>
              setPaymentPlanCms({
                ...paymentPlanCms,
                whyDifferentPlansOnline: { ...paymentPlanCms.whyDifferentPlansOnline, adviceText: val }
              })
            }
          />
        </div>
      )}

      {/* Tab 7: Additional Costs */}
      {activeCategory === 'costs' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-serif font-bold text-base text-slate-900">
              What You Pay Besides the Plot Price
            </h3>
            <button
              type="button"
              onClick={() => {
                const updated = [
                  ...paymentPlanCms.additionalCosts.items,
                  { name: 'New Fee Component', description: 'Description of the fee' }
                ];
                setPaymentPlanCms({
                  ...paymentPlanCms,
                  additionalCosts: { ...paymentPlanCms.additionalCosts, items: updated }
                });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#7b002c] text-white rounded-lg text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Fee Item</span>
            </button>
          </div>

          <div className="space-y-3">
            {paymentPlanCms.additionalCosts.items.map((it, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="text"
                    value={it.name}
                    onChange={(e) => {
                      const updated = [...paymentPlanCms.additionalCosts.items];
                      updated[idx].name = e.target.value;
                      setPaymentPlanCms({
                        ...paymentPlanCms,
                        additionalCosts: { ...paymentPlanCms.additionalCosts, items: updated }
                      });
                    }}
                    className="p-2 text-xs bg-white border border-slate-300 rounded-lg font-bold flex-1"
                  />
                  {paymentPlanCms.additionalCosts.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const updated = paymentPlanCms.additionalCosts.items.filter((_, i) => i !== idx);
                        setPaymentPlanCms({
                          ...paymentPlanCms,
                          additionalCosts: { ...paymentPlanCms.additionalCosts, items: updated }
                        });
                      }}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <CmsRichTextarea
                  label="Fee Description"
                  rows={2}
                  value={it.description}
                  onChange={(val) => {
                    const updated = [...paymentPlanCms.additionalCosts.items];
                    updated[idx].description = val;
                    setPaymentPlanCms({
                      ...paymentPlanCms,
                      additionalCosts: { ...paymentPlanCms.additionalCosts, items: updated }
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 8: How to Pay & Policies */}
      {activeCategory === 'howToPay' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm">
          <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
            How to Pay & Buyer Guidelines
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Core Payment Rules (Bullet points)</label>
            <div className="space-y-2">
              {paymentPlanCms.howToPay.guidelines.map((g, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={g}
                  onChange={(e) => {
                    const updated = [...paymentPlanCms.howToPay.guidelines];
                    updated[idx] = e.target.value;
                    setPaymentPlanCms({
                      ...paymentPlanCms,
                      howToPay: { ...paymentPlanCms.howToPay, guidelines: updated }
                    });
                  }}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none"
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <CmsRichTextarea
              label="Overseas Buyers Section"
              rows={4}
              value={paymentPlanCms.howToPay.overseasBuyersDesc}
              onChange={(val) =>
                setPaymentPlanCms({
                  ...paymentPlanCms,
                  howToPay: { ...paymentPlanCms.howToPay, overseasBuyersDesc: val }
                })
              }
            />
            <CmsRichTextarea
              label="Resale Purchases Section"
              rows={4}
              value={paymentPlanCms.howToPay.resalePurchasesDesc}
              onChange={(val) =>
                setPaymentPlanCms({
                  ...paymentPlanCms,
                  howToPay: { ...paymentPlanCms.howToPay, resalePurchasesDesc: val }
                })
              }
            />
            <CmsRichTextarea
              label="If You Miss an Instalment Section"
              rows={4}
              value={paymentPlanCms.howToPay.missedInstalmentDesc}
              onChange={(val) =>
                setPaymentPlanCms({
                  ...paymentPlanCms,
                  howToPay: { ...paymentPlanCms.howToPay, missedInstalmentDesc: val }
                })
              }
            />
            <CmsRichTextarea
              label="Commercial Plot Terms Section"
              rows={4}
              value={paymentPlanCms.howToPay.commercialPlotDesc}
              onChange={(val) =>
                setPaymentPlanCms({
                  ...paymentPlanCms,
                  howToPay: { ...paymentPlanCms.howToPay, commercialPlotDesc: val }
                })
              }
            />
          </div>
        </div>
      )}

      {/* Tab 9: FAQs */}
      {activeCategory === 'faqs' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-serif font-bold text-base text-slate-900">
              Frequently Asked Questions ({paymentPlanCms.faqsSection.faqs.length} Total)
            </h3>
            <button
              type="button"
              onClick={() => {
                const updated = [
                  ...paymentPlanCms.faqsSection.faqs,
                  { q: 'New Question?', a: 'Detailed answer here.' }
                ];
                setPaymentPlanCms({
                  ...paymentPlanCms,
                  faqsSection: { ...paymentPlanCms.faqsSection, faqs: updated }
                });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#7b002c] text-white rounded-lg text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add FAQ</span>
            </button>
          </div>

          <div className="space-y-4">
            {paymentPlanCms.faqsSection.faqs.map((faq, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-[#7b002c]">Q{idx + 1}</span>
                  <input
                    type="text"
                    value={faq.q}
                    placeholder="Question"
                    onChange={(e) => {
                      const updated = [...paymentPlanCms.faqsSection.faqs];
                      updated[idx].q = e.target.value;
                      setPaymentPlanCms({
                        ...paymentPlanCms,
                        faqsSection: { ...paymentPlanCms.faqsSection, faqs: updated }
                      });
                    }}
                    className="p-2 text-xs bg-white border border-slate-300 rounded-lg font-bold flex-1"
                  />
                  {paymentPlanCms.faqsSection.faqs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const updated = paymentPlanCms.faqsSection.faqs.filter((_, i) => i !== idx);
                        setPaymentPlanCms({
                          ...paymentPlanCms,
                          faqsSection: { ...paymentPlanCms.faqsSection, faqs: updated }
                        });
                      }}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <CmsRichTextarea
                  label="Answer"
                  rows={3}
                  value={faq.a}
                  onChange={(val) => {
                    const updated = [...paymentPlanCms.faqsSection.faqs];
                    updated[idx].a = val;
                    setPaymentPlanCms({
                      ...paymentPlanCms,
                      faqsSection: { ...paymentPlanCms.faqsSection, faqs: updated }
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 10: CTA & About Page */}
      {activeCategory === 'ctaAbout' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm">
          <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
            Schedule CTA Box & About Page Disclosure
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">CTA Heading</label>
              <input
                type="text"
                value={paymentPlanCms.ctaAndAbout.ctaHeading}
                onChange={(e) =>
                  setPaymentPlanCms({
                    ...paymentPlanCms,
                    ctaAndAbout: { ...paymentPlanCms.ctaAndAbout, ctaHeading: e.target.value }
                  })
                }
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Number</label>
              <input
                type="text"
                value={paymentPlanCms.ctaAndAbout.whatsappNumber}
                onChange={(e) =>
                  setPaymentPlanCms({
                    ...paymentPlanCms,
                    ctaAndAbout: { ...paymentPlanCms.ctaAndAbout, whatsappNumber: e.target.value }
                  })
                }
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={paymentPlanCms.ctaAndAbout.phoneNumber}
                onChange={(e) =>
                  setPaymentPlanCms({
                    ...paymentPlanCms,
                    ctaAndAbout: { ...paymentPlanCms.ctaAndAbout, phoneNumber: e.target.value }
                  })
                }
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Office Location</label>
              <input
                type="text"
                value={paymentPlanCms.ctaAndAbout.officeLocation}
                onChange={(e) =>
                  setPaymentPlanCms({
                    ...paymentPlanCms,
                    ctaAndAbout: { ...paymentPlanCms.ctaAndAbout, officeLocation: e.target.value }
                  })
                }
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none"
              />
            </div>
          </div>

          <CmsRichTextarea
            label="CTA Subtitle"
            rows={2}
            value={paymentPlanCms.ctaAndAbout.ctaSubline}
            onChange={(val) =>
              setPaymentPlanCms({
                ...paymentPlanCms,
                ctaAndAbout: { ...paymentPlanCms.ctaAndAbout, ctaSubline: val }
              })
            }
          />

          <CmsRichTextarea
            label="About This Page Disclosure Text"
            rows={3}
            value={paymentPlanCms.ctaAndAbout.aboutText}
            onChange={(val) =>
              setPaymentPlanCms({
                ...paymentPlanCms,
                ctaAndAbout: { ...paymentPlanCms.ctaAndAbout, aboutText: val }
              })
            }
          />
        </div>
      )}
    </div>
  );
}
