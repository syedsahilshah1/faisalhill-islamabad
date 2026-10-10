'use client';

import React, { useState, useRef, useId } from 'react';
import {
  Upload,
  Camera,
  X,
  Link2,
  Check,
  Loader2,
  Image as ImageIcon,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { getApiUrl } from '@/data/faisalHillsData';

/** Shown when a stored path 404s, so the editor is not a blank rectangle. */
export const FALLBACK_PREVIEW_IMAGE = '/images/faisal-hills-site-header.webp';

/**
 * Downscale and re-encode an image in the browser before it is sent.
 *
 * This runs on the *original* file and returns a Blob, not a data URL. It still
 * keeps the request small — a 12MP phone photo becomes a few hundred kilobytes —
 * but the result is uploaded as multipart form data rather than pasted into the
 * settings JSON as base64.
 *
 * @param maxWidth  longest edge in pixels; aspect ratio is preserved
 * @param quality   encoder quality between 0 and 1
 */
export function compressImageFile(file: File, maxWidth = 1920, quality = 0.85): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        let { width, height } = img;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('This browser cannot process the image.'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('The image could not be encoded.'));
            }
          },
          // WebP is roughly 30% smaller than JPEG at the same perceived quality.
          // The server accepts webp alongside jpeg, png and avif.
          'image/webp',
          quality
        );
      };

      // A file that is not a decodable image is reported rather than silently
      // uploaded as-is, which would fail server-side validation later with a
      // much less obvious message.
      img.onerror = () => reject(new Error('That file is not a readable image.'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('The file could not be read.'));
    reader.readAsDataURL(file);
  });
}

export interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  /** Bearer token of the acting administrator, required to upload a file. */
  token?: string;
  helper?: string;
  placeholder?: string;
  aspectRatio?: 'landscape' | 'square' | 'wide' | 'auto';
  /** Grouping label used only to organise files on disk. */
  folder?: string;
  /**
   * Current alt text for the image.
   *
   * Purely for previewing what a screen reader will announce; the value is owned
   * by the caller so it can live in whichever CMS field already stores it.
   */
  alt?: string;
  /**
   * Enables the alt-text input.
   *
   * Optional on purpose. Many image fields in the CMS have no alt field at all,
   * and forcing one on every call site would mean inventing storage keys for
   * them. Pass this only where the surrounding data shape already carries alt
   * text, which keeps the field optional instead of a silent no-op input.
   */
  onAltChange?: (val: string) => void;
  /** Shown under the alt input to explain what good alt text looks like. */
  altHelper?: string;
}

const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  token,
  helper = 'Supports JPG, PNG, WEBP from PC / Mobile (Auto-optimized & compressed)',
  placeholder = '/images/... or https://...',
  aspectRatio = 'landscape',
  folder,
  alt = '',
  onAltChange,
  altHelper = 'Describe the image for screen readers and search engines. Leave out words like "image" or "photo".'
}) => {
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlDraft, setUrlDraft] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uniqueId = useId();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file);
  };

  const processFile = async (file: File) => {
    setError('');

    if (!file.type.startsWith('image/')) {
      setError('Choose an image file (JPG, PNG, WEBP or AVIF).');
      return;
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      setError(`That image is ${(file.size / 1024 / 1024).toFixed(1)} MB. The limit is 15 MB.`);
      return;
    }

    if (!token) {
      setError('Your session has expired. Sign in again to upload images.');
      return;
    }

    setUploading(true);

    try {
      const blob = await compressImageFile(file, 2048, 0.88);

      const form = new FormData();
      form.append('image', blob, file.name.replace(/\.[^/.]+$/, '') + '.webp');
      if (folder) form.append('folder', folder);

      const res = await fetch(`${getApiUrl()}/admin/media/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        },
        body: form
      });

      if (!res.ok) {
        // The API returns a 422 with a field-keyed error map; surface the first
        // human-readable reason rather than a bare status code.
        const data = await res.json().catch(() => ({}));
        const firstField = data && data.errors ? Object.values(data.errors)[0] : null;
        throw new Error(
          (firstField as string) ||
          data.message ||
          `Upload failed (HTTP ${res.status}).`
        );
      }

      const data = await res.json();

      // Store the returned path, not the bytes. This is the change that stops
      // the settings JSON carrying a multi-hundred-kilobyte data URL that every
      // page fetching settings has to download and decode.
      if (data && typeof data.url === 'string' && data.url) {
        onChange(data.url);
      } else {
        throw new Error('The server did not return an image URL.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      await processFile(file);
    }
  };

  const handleTriggerDeviceUpload = () => {
    fileInputRef.current?.click();
  };

  const handleApplyUrl = () => {
    if (urlDraft.trim()) {
      onChange(urlDraft.trim());
      setUrlDraft('');
      setShowUrlInput(false);
    }
  };

  const previewClasses = {
    landscape: 'w-36 h-24 sm:w-44 sm:h-28',
    square: 'w-24 h-24 sm:w-28 sm:h-28',
    wide: 'w-48 h-24 sm:w-56 sm:h-28',
    auto: 'w-36 h-24 sm:w-44 sm:h-28'
  }[aspectRatio];

  return (
    <div className="space-y-2.5 p-3.5 sm:p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90 shadow-2xs">
      {/* Top Label & Mode Toggles */}
      <div className="flex items-center justify-between gap-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-[#7b002c]" />
          <span>{label}</span>
        </label>

        <div className="flex items-center gap-2">
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-[11px] text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer transition"
              title="Remove image"
            >
              <X className="w-3 h-3" />
              <span>Remove</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setShowUrlInput(!showUrlInput);
              if (!showUrlInput) setUrlDraft(value || '');
            }}
            className="text-[11px] text-[#7b002c] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Link2 className="w-3 h-3" />
            <span>{showUrlInput ? 'Hide URL' : 'Paste Link'}</span>
          </button>
        </div>
      </div>

      {/* Main Image Control Area */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5">

        {/* Thumbnail Preview / Drop Target */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={handleTriggerDeviceUpload}
          className={`relative ${previewClasses} bg-slate-900 rounded-xl overflow-hidden border-2 transition-all shrink-0 group cursor-pointer flex flex-col items-center justify-center ${
            isDragOver
              ? 'border-[#7b002c] ring-2 ring-[#7b002c]/40 scale-102 bg-slate-800'
              : value
              ? 'border-slate-300 shadow-sm hover:border-[#7b002c]'
              : 'border-dashed border-slate-300 hover:border-slate-400 bg-slate-100 hover:bg-slate-200/70'
          }`}
          title="Click to choose image from device"
        >
          {value ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img width='800' height='600' loading='lazy' src={value}
                // Preview with the real alt text so an editor can hear, or read,
                // what a screen reader will announce before publishing.
                alt={alt || label}
                // A stale or mistyped path would otherwise render as a broken
                // image icon with no explanation.
                onError={(e) => {
                  const el = e.currentTarget;
                  if (el.src.endsWith(FALLBACK_PREVIEW_IMAGE)) return;
                  el.src = FALLBACK_PREVIEW_IMAGE;
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold gap-1">
                <Upload className="w-4 h-4" />
                <span>Change Image</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 text-[10px] font-semibold p-2 text-center gap-1">
              <Camera className="w-5 h-5 text-slate-400 group-hover:text-[#7b002c] group-hover:scale-110 transition-all" />
              <span>Select / Drop Image</span>
            </div>
          )}

          {uploading && (
            <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center text-white text-[10px] font-bold gap-1.5 z-10">
              <Loader2 className="w-5 h-5 animate-spin text-amber-300" />
              <span>Uploading...</span>
            </div>
          )}
        </div>

        {/* Buttons & Actions */}
        <div className="flex-1 w-full space-y-2">
          <input
            id={`file-input-${uniqueId}`}
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleTriggerDeviceUpload}
              disabled={uploading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-[#7b002c] hover:to-[#9e1245] text-white text-xs font-bold rounded-xl shadow-xs transition-all duration-150 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-300" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  <span>📁 Upload from Device (PC/Phone)</span>
                </>
              )}
            </button>

            {value && (
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-2 text-[11px] font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition"
                title="Open full resolution in new tab"
              >
                <ExternalLink className="w-3 h-3" />
                <span>View Full Size</span>
              </a>
            )}

            {value && (
              <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Live Media Active
              </span>
            )}
          </div>

          <p className="text-[11px] text-slate-500 font-medium leading-tight">
            {helper}
          </p>

          {/* Values written before uploads existed are data URLs still sitting in
              the settings column. Saying so is more useful than showing a very
              long string, and re-uploading the file replaces it with a path. */}
          {value.startsWith('data:') && (
            <p className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg font-semibold">
              Stored inline as base64. Re-upload this image to store it as a file.
            </p>
          )}

          {/* Alt text. Only rendered for call sites that can persist it. */}
          {onAltChange && (
            <div className="space-y-1 pt-0.5">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor={`alt-input-${uniqueId}`}
                  className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5"
                >
                  Alt Text
                  {/* An image with no alt text is invisible to a screen reader,
                      so the gap is worth surfacing rather than only validating
                      on the public site. */}
                  {!alt.trim() && (
                    <span className="text-[9px] font-bold uppercase text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-px rounded">
                      Missing
                    </span>
                  )}
                </label>
                <span className="text-[10px] text-slate-400 font-semibold tabular-nums">
                  {alt.length}/160
                </span>
              </div>

              <input
                id={`alt-input-${uniqueId}`}
                type="text"
                value={alt}
                maxLength={160}
                onChange={(e) => onAltChange(e.target.value)}
                placeholder="e.g. Aerial view of Faisal Hills main gate on GT Road"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#7b002c]"
              />

              <p className="text-[10px] text-slate-500 font-medium leading-tight">
                {altHelper}
              </p>
            </div>
          )}

          {error && (
            <p role="alert" className="text-[11px] text-red-700 bg-red-50 border border-red-200 px-2 py-1 rounded-lg font-semibold flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-px" />
              <span>{error}</span>
            </p>
          )}

          {/* Paste URL Accordion */}
          {showUrlInput && (
            <div className="flex items-center gap-1.5 pt-1">
              <input
                type="text"
                value={urlDraft}
                onChange={(e) => setUrlDraft(e.target.value)}
                placeholder={placeholder}
                className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:border-[#7b002c]"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-3 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs"
              >
                Apply Link
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
