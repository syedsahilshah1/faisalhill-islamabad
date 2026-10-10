'use client';

import React, { useState, useRef } from 'react';
import {
  Link2,
  ExternalLink,
  Bold,
  Italic,
  List,
  Eye,
  Code2,
  Plus,
  Check,
  X,
  Compass,
  Building2,
  FileText,
  DollarSign,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import FormattedText from '@/components/ui/FormattedText';

export interface CmsRichTextareaProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  helper?: string;
  className?: string;
}

// Predefined verified internal society routes
export const INTERNAL_ROUTES = [
  { group: 'Society Blocks', label: 'Block A (Main Boulevard & 2 Kanal)', path: '/blocks/block-a' },
  { group: 'Society Blocks', label: 'Block B (Hill View & Resale Hub)', path: '/blocks/block-b' },
  { group: 'Society Blocks', label: 'Block C (Hills Walk Frontage)', path: '/blocks/block-c' },
  { group: 'Society Blocks', label: 'Prime Block (Instalment Sector)', path: '/blocks/prime-block' },
  { group: 'Society Blocks', label: 'Block D (Mountain Valley & Margalla)', path: '/blocks/block-d' },
  { group: 'Society Blocks', label: 'Executive Block (Grand GT Entrance)', path: '/blocks/executive-block' },
  { group: 'Society Blocks', label: 'Block B-1 Extension', path: '/blocks/block-b1-extension' },
  { group: 'Society Blocks', label: 'Hills Walk Commercial Hub', path: '/blocks/hills-walk' },
  { group: 'Society Blocks', label: 'Faisal Jewel 27-Storey Tower', path: '/blocks/faisal-jewel-islamabad' },

  { group: 'Society Guides & Tools', label: 'Faisal Hills Homepage', path: '/' },
  { group: 'Society Guides & Tools', label: 'Plot Prices & Market Rate Analysis', path: '/plots' },
  { group: 'Society Guides & Tools', label: 'Payment Plans (Installment Schedules)', path: '/faisal-hills-payment-plan' },
  { group: 'Society Guides & Tools', label: 'Master Plan & Block Maps Blueprint', path: '/master-plan' },
  { group: 'Society Guides & Tools', label: 'Location & Access Routes (GT Road / M-1)', path: '/faisal-hills-location' },
  { group: 'Society Guides & Tools', label: 'RDA Approved NOC Status Verification', path: '/faisal-hills-noc' },
  { group: 'Society Guides & Tools', label: 'Amenities, Parks & Facilities', path: '/faisal-hills-facilities' },
  { group: 'Society Guides & Tools', label: '7-Step Transfer Procedure & Legal Fees', path: '/faisal-hills-transfer-procedure' },
  { group: 'Society Guides & Tools', label: 'Contact Us & Head Sales Office', path: '/contact-us' },
];

export default function CmsRichTextarea({
  label,
  value,
  onChange,
  rows = 3,
  placeholder = 'Type content here... Use the toolbar above to insert internal links, external links, bold formatting, etc.',
  helper,
  className = ''
}: CmsRichTextareaProps) {
  const [showInternalModal, setShowInternalModal] = useState(false);
  const [showExternalModal, setShowExternalModal] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Modal form states
  const [selectedRoute, setSelectedRoute] = useState(INTERNAL_ROUTES[0].path);
  const [customPath, setCustomPath] = useState('');
  const [linkText, setLinkText] = useState('');
  const [extUrl, setExtUrl] = useState('https://');
  const [extText, setExtText] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Helper to insert text at current cursor / selection
  const insertTextAtCursor = (insertedText: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onChange(value + insertedText);
      return;
    }

    const start = textarea.selectionStart || 0;
    const end = textarea.selectionEnd || 0;
    const before = value.substring(0, start);
    const after = value.substring(end);
    const updatedValue = before + insertedText + after;

    onChange(updatedValue);

    // Restore cursor position after state update
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + insertedText.length, start + insertedText.length);
    }, 10);
  };

  // Wrap current selection with prefix and suffix
  const wrapSelection = (prefix: string, suffix: string, defaultPlaceholder: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onChange(value + `${prefix}${defaultPlaceholder}${suffix}`);
      return;
    }

    const start = textarea.selectionStart || 0;
    const end = textarea.selectionEnd || 0;
    const selected = value.substring(start, end) || defaultPlaceholder;
    const before = value.substring(0, start);
    const after = value.substring(end);

    const replacement = `${prefix}${selected}${suffix}`;
    onChange(before + replacement + after);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 10);
  };

  // Open Internal Link Modal with current selection as default link text
  const handleOpenInternalModal = () => {
    const textarea = textareaRef.current;
    const selected = textarea ? value.substring(textarea.selectionStart || 0, textarea.selectionEnd || 0) : '';
    setLinkText(selected || '');
    setShowInternalModal(true);
  };

  // Open External Link Modal with current selection as default text
  const handleOpenExternalModal = () => {
    const textarea = textareaRef.current;
    const selected = textarea ? value.substring(textarea.selectionStart || 0, textarea.selectionEnd || 0) : '';
    setExtText(selected || '');
    setShowExternalModal(true);
  };

  // Commit Internal Link
  const handleInsertInternalLink = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const path = customPath.trim() ? (customPath.startsWith('/') ? customPath.trim() : `/${customPath.trim()}`) : selectedRoute;
    const text = linkText.trim() || path;
    insertTextAtCursor(`[${text}](${path})`);
    setShowInternalModal(false);
    setCustomPath('');
    setLinkText('');
  };

  // Commit External Link
  const handleInsertExternalLink = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    let url = extUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }
    const text = extText.trim() || url;
    insertTextAtCursor(`[${text}](${url})`);
    setShowExternalModal(false);
    setExtUrl('https://');
    setExtText('');
  };

  // Quick 1-click pills
  const handleQuickInsert = (text: string, path: string) => {
    insertTextAtCursor(`[${text}](${path})`);
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {/* Label & Header Strip */}
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-700">{label}</label>
          {value && (
            <span className="text-[10px] text-slate-400 font-mono">
              {value.length} chars
            </span>
          )}
        </div>
      )}

      {/* Formatting & Link Toolbar */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-1.5 p-2 bg-slate-50 border-b border-slate-200 text-xs">
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-1">
            {/* Internal Link Button */}
            <button
              type="button"
              onClick={handleOpenInternalModal}
              className="px-2.5 py-1 rounded-lg bg-[#7b002c]/10 hover:bg-[#7b002c] text-[#7b002c] hover:text-white font-bold text-[11px] flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
              title="Insert Internal Link to any Block or Society Page"
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>+ Internal Link</span>
            </button>

            {/* External Link Button */}
            <button
              type="button"
              onClick={handleOpenExternalModal}
              className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-[11px] flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
              title="Insert External Website Link"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>+ External Link</span>
            </button>

            <div className="h-4 w-[1px] bg-slate-200 mx-1 hidden sm:block" />

            {/* Bold */}
            <button
              type="button"
              onClick={() => wrapSelection('**', '**', 'bold text')}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 font-bold transition-all cursor-pointer"
              title="Bold (**text**)"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>

            {/* Italic */}
            <button
              type="button"
              onClick={() => wrapSelection('*', '*', 'italic text')}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 italic transition-all cursor-pointer"
              title="Italic (*text*)"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>

            {/* Bullet Point */}
            <button
              type="button"
              onClick={() => insertTextAtCursor('\n• ')}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
              title="Add Bullet Point"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Toolbar: Live Preview Toggle */}
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1.5 transition-all cursor-pointer ${
              previewMode
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
            }`}
          >
            {previewMode ? (
              <>
                <Code2 className="w-3.5 h-3.5" />
                <span>Edit Source</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Preview Output</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Route Insert Pills Strip */}
        <div className="px-2.5 py-1.5 bg-slate-100/70 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[10px]">
          <span className="font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Plus className="w-3 h-3" /> Quick Links:
          </span>
          <button
            type="button"
            onClick={() => handleQuickInsert('Executive Block', '/blocks/executive-block')}
            className="px-2 py-0.5 rounded-md bg-white hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 font-semibold shrink-0 transition-colors cursor-pointer"
          >
            + [Executive Block]
          </button>
          <button
            type="button"
            onClick={() => handleQuickInsert('Block A', '/blocks/block-a')}
            className="px-2 py-0.5 rounded-md bg-white hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 font-semibold shrink-0 transition-colors cursor-pointer"
          >
            + [Block A]
          </button>
          <button
            type="button"
            onClick={() => handleQuickInsert('Block B', '/blocks/block-b')}
            className="px-2 py-0.5 rounded-md bg-white hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 font-semibold shrink-0 transition-colors cursor-pointer"
          >
            + [Block B]
          </button>
          <button
            type="button"
            onClick={() => handleQuickInsert('Prime Block', '/blocks/prime-block')}
            className="px-2 py-0.5 rounded-md bg-white hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 font-semibold shrink-0 transition-colors cursor-pointer"
          >
            + [Prime Block]
          </button>
          <button
            type="button"
            onClick={() => handleQuickInsert('Block D', '/blocks/block-d')}
            className="px-2 py-0.5 rounded-md bg-white hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 font-semibold shrink-0 transition-colors cursor-pointer"
          >
            + [Block D]
          </button>
          <button
            type="button"
            onClick={() => handleQuickInsert('Plot Prices', '/plots')}
            className="px-2 py-0.5 rounded-md bg-white hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 font-semibold shrink-0 transition-colors cursor-pointer"
          >
            + [Plot Prices]
          </button>
          <button
            type="button"
            onClick={() => handleQuickInsert('Master Plan', '/master-plan')}
            className="px-2 py-0.5 rounded-md bg-white hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 font-semibold shrink-0 transition-colors cursor-pointer"
          >
            + [Master Plan]
          </button>
          <button
            type="button"
            onClick={() => handleQuickInsert('RDA NOC', '/faisal-hills-noc')}
            className="px-2 py-0.5 rounded-md bg-white hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 font-semibold shrink-0 transition-colors cursor-pointer"
          >
            + [RDA NOC]
          </button>
          <button
            type="button"
            onClick={() => handleQuickInsert('ZN Tower', '/blocks/block-a#zn-tower')}
            className="px-2 py-0.5 rounded-md bg-white hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 font-semibold shrink-0 transition-colors cursor-pointer"
          >
            + [ZN Tower]
          </button>
        </div>

        {/* Editor Body / Preview Mode */}
        {previewMode ? (
          <div className="p-4 bg-slate-50/50 min-h-[100px] text-xs leading-relaxed text-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400 mb-2 flex items-center gap-1">
              <Eye className="w-3 h-3" /> Live Formatted Preview
            </div>
            {value ? (
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                <FormattedText text={value} />
              </div>
            ) : (
              <p className="text-slate-400 italic text-xs">No content to preview yet.</p>
            )}
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            rows={rows}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-3.5 bg-white text-xs leading-relaxed text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7b002c]/20 transition-all font-sans"
          />
        )}
      </div>

      {helper && <p className="text-[11px] text-slate-500">{helper}</p>}

      {/* ========================================================= */}
      {/* MODAL 1: INSERT INTERNAL LINK                             */}
      {/* ========================================================= */}
      {showInternalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center font-bold">
                  <Link2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-slate-900">Insert Internal Link</h4>
                  <p className="text-[11px] text-slate-500">Link directly to any block or page with Next.js navigation</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowInternalModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInsertInternalLink} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Society Destination Page</label>
                <select
                  value={selectedRoute}
                  onChange={(e) => {
                    setSelectedRoute(e.target.value);
                    if (!linkText) {
                      const item = INTERNAL_ROUTES.find((r) => r.path === e.target.value);
                      if (item) setLinkText(item.label.split('(')[0].trim());
                    }
                  }}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#7b002c]"
                >
                  <optgroup label="🏢 Society Blocks">
                    {INTERNAL_ROUTES.filter((r) => r.group === 'Society Blocks').map((r) => (
                      <option key={r.path} value={r.path}>
                        {r.label} ({r.path})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="🧭 Society Guides & Tools">
                    {INTERNAL_ROUTES.filter((r) => r.group === 'Society Guides & Tools').map((r) => (
                      <option key={r.path} value={r.path}>
                        {r.label} ({r.path})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Or Enter Custom Route / Hash (Optional)
                </label>
                <input
                  type="text"
                  placeholder="/blocks/block-a#zn-tower or /plots"
                  value={customPath}
                  onChange={(e) => setCustomPath(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#7b002c]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Anchor Display Text <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Executive Block, Plot Prices, Master Plan"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#7b002c]"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  This is the clickable text the reader sees on the website.
                </p>
              </div>

              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                <strong>Output Code:</strong>{' '}
                <code className="bg-white px-1.5 py-0.5 rounded border text-[#7b002c] font-mono">
                  [{linkText.trim() || 'Link Text'}]({customPath.trim() || selectedRoute})
                </code>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowInternalModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#7b002c] hover:bg-[#600022] text-white font-bold cursor-pointer shadow-md active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Insert Link</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: INSERT EXTERNAL LINK                             */}
      {/* ========================================================= */}
      {showExternalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-slate-900">Insert External Link</h4>
                  <p className="text-[11px] text-slate-500">Link to an external website, portal or government site</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowExternalModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInsertExternalLink} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Destination URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  placeholder="https://maps.google.com or https://rda.gop.pk"
                  value={extUrl}
                  onChange={(e) => setExtUrl(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Anchor Display Text <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Official RDA Portal, Google Maps Location"
                  value={extText}
                  onChange={(e) => setExtText(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200 text-[11px] text-blue-900">
                <strong>Output Code:</strong>{' '}
                <code className="bg-white px-1.5 py-0.5 rounded border text-blue-700 font-mono">
                  [{extText.trim() || 'Link Text'}]({extUrl.trim() || 'https://...'})
                </code>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowExternalModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer shadow-md active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Insert External Link</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
