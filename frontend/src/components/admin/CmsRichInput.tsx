'use client';

import React, { useState, useRef } from 'react';
import { Link2, ExternalLink, Bold, Check, X } from 'lucide-react';
import { INTERNAL_ROUTES } from './CmsRichTextarea';

export interface CmsRichInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helper?: string;
  className?: string;
}

export default function CmsRichInput({
  label,
  value,
  onChange,
  placeholder = 'Type here...',
  helper,
  className = ''
}: CmsRichInputProps) {
  const [showInternalModal, setShowInternalModal] = useState(false);
  const [showExternalModal, setShowExternalModal] = useState(false);

  // Modal form states
  const [selectedRoute, setSelectedRoute] = useState(INTERNAL_ROUTES[0].path);
  const [customPath, setCustomPath] = useState('');
  const [linkText, setLinkText] = useState('');
  const [extUrl, setExtUrl] = useState('https://');
  const [extText, setExtText] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const insertTextAtCursor = (insertedText: string) => {
    const input = inputRef.current;
    if (!input) {
      onChange(value + insertedText);
      return;
    }

    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const before = value.substring(0, start);
    const after = value.substring(end);
    const updatedValue = before + insertedText + after;

    onChange(updatedValue);

    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + insertedText.length, start + insertedText.length);
    }, 10);
  };

  const handleOpenInternalModal = () => {
    const input = inputRef.current;
    const selected = input ? value.substring(input.selectionStart || 0, input.selectionEnd || 0) : '';
    setLinkText(selected || '');
    setShowInternalModal(true);
  };

  const handleOpenExternalModal = () => {
    const input = inputRef.current;
    const selected = input ? value.substring(input.selectionStart || 0, input.selectionEnd || 0) : '';
    setExtText(selected || '');
    setShowExternalModal(true);
  };

  const handleInsertInternalLink = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const path = customPath.trim() ? (customPath.startsWith('/') ? customPath.trim() : `/${customPath.trim()}`) : selectedRoute;
    const text = linkText.trim() || path;
    insertTextAtCursor(`[${text}](${path})`);
    setShowInternalModal(false);
    setCustomPath('');
    setLinkText('');
  };

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

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex items-center justify-between">
        {label && <label className="block text-[11px] font-bold text-slate-700">{label}</label>}
        <div className="flex items-center gap-1.5 ml-auto">
          <button
            type="button"
            onClick={handleOpenInternalModal}
            className="text-[10px] text-[#7b002c] hover:bg-[#7b002c]/10 font-bold px-1.5 py-0.5 rounded transition-all cursor-pointer flex items-center gap-1"
            title="Insert Internal Link [Text](/path)"
          >
            <Link2 className="w-3 h-3" />
            <span>+ Link</span>
          </button>
          <button
            type="button"
            onClick={handleOpenExternalModal}
            className="text-[10px] text-blue-700 hover:bg-blue-50 font-bold px-1.5 py-0.5 rounded transition-all cursor-pointer flex items-center gap-1"
            title="Insert External Link [Text](https://...)"
          >
            <ExternalLink className="w-3 h-3" />
            <span>+ Ext</span>
          </button>
        </div>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7b002c]/20"
      />

      {helper && <p className="text-[10px] text-slate-400">{helper}</p>}

      {/* Internal Modal */}
      {showInternalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-5 space-y-3.5">
            <div className="flex items-center justify-between border-b pb-2.5">
              <h4 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <Link2 className="w-4 h-4 text-[#7b002c]" />
                <span>Insert Internal Link</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowInternalModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInsertInternalLink} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Page</label>
                <select
                  value={selectedRoute}
                  onChange={(e) => {
                    setSelectedRoute(e.target.value);
                    if (!linkText) {
                      const item = INTERNAL_ROUTES.find((r) => r.path === e.target.value);
                      if (item) setLinkText(item.label.split('(')[0].trim());
                    }
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs font-semibold"
                >
                  {INTERNAL_ROUTES.map((r) => (
                    <option key={r.path} value={r.path}>
                      {r.label} ({r.path})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Custom Route (Optional)</label>
                <input
                  type="text"
                  placeholder="/blocks/block-a or /plots"
                  value={customPath}
                  onChange={(e) => setCustomPath(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Display Text</label>
                <input
                  type="text"
                  placeholder="e.g. Executive Block"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  required
                  className="w-full px-3 py-1.5 bg-slate-50 border rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowInternalModal(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-[#7b002c] text-white font-bold flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Insert Link</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* External Modal */}
      {showExternalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-5 space-y-3.5">
            <div className="flex items-center justify-between border-b pb-2.5">
              <h4 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <ExternalLink className="w-4 h-4 text-blue-600" />
                <span>Insert External Link</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowExternalModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInsertExternalLink} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Destination URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={extUrl}
                  onChange={(e) => setExtUrl(e.target.value)}
                  required
                  className="w-full px-3 py-1.5 bg-slate-50 border rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Display Text</label>
                <input
                  type="text"
                  placeholder="e.g. Official Site"
                  value={extText}
                  onChange={(e) => setExtText(e.target.value)}
                  required
                  className="w-full px-3 py-1.5 bg-slate-50 border rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowExternalModal(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-blue-600 text-white font-bold flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Insert Link</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
