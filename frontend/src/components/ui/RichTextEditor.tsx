'use client';

import React, { useRef, useEffect, useState } from 'react';
import { 
  Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, 
  AlignRight, Link, Image as ImageIcon, Trash2, Camera, Upload, 
  Quote, Check, Search, X
} from 'lucide-react';

interface GalleryPhotoItem {
  id: string;
  title: string;
  imageUrl: string;
  category?: string;
}

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  galleryPhotos?: GalleryPhotoItem[];
}

export default function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = 'Start writing your article...',
  galleryPhotos = []
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [currentBlockFormat, setCurrentBlockFormat] = useState('p');
  
  // Image Insert Modal State
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [imageAltText, setImageAltText] = useState('');
  const [galleryFilter, setGalleryFilter] = useState('');
  const [savedSelection, setSavedSelection] = useState<Range | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sync value into editor only when content mismatches
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const saveSelection = () => {
    if (typeof window !== 'undefined') {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        setSavedSelection(sel.getRangeAt(0).cloneRange());
      }
    }
  };

  const restoreSelection = () => {
    if (typeof window !== 'undefined' && savedSelection) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(savedSelection);
      }
    } else if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const executeCommand = (command: string, value: string = '') => {
    if (editorRef.current) {
      editorRef.current.focus();
      if (typeof document !== 'undefined') {
        if (command === 'createLink') {
          const url = prompt('Enter link URL (e.g. https://... or /plots):');
          if (url) {
            document.execCommand(command, false, url);
          }
        } else {
          document.execCommand(command, false, value);
        }
        handleInput();
      }
    }
  };

  const handleFormatBlock = (tag: string) => {
    setCurrentBlockFormat(tag);
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand('formatBlock', false, `<${tag}>`);
      handleInput();
    }
  };

  const handleOpenImageModal = (e: React.MouseEvent) => {
    e.preventDefault();
    saveSelection();
    setSelectedImageUrl('');
    setImageAltText('');
    setIsImageModalOpen(true);
  };

  const handleInsertImageToContent = () => {
    if (!selectedImageUrl) {
      alert('Please select or enter an image URL.');
      return;
    }

    restoreSelection();

    const figureHtml = `
      <figure class="my-4 block text-center">
        <img src="${selectedImageUrl}" alt="${imageAltText || 'Faisal Hills'}" style="max-width: 100%; height: auto; border-radius: 12px; margin: 0 auto; display: block; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;" />
        ${imageAltText ? `<figcaption style="font-size: 11px; color: #64748b; margin-top: 6px; font-style: italic;">${imageAltText}</figcaption>` : ''}
      </figure>
      <p><br></p>
    `;

    if (document.queryCommandSupported('insertHTML')) {
      document.execCommand('insertHTML', false, figureHtml);
    } else {
      document.execCommand('insertImage', false, selectedImageUrl);
    }

    handleInput();
    setIsImageModalOpen(false);
    setSelectedImageUrl('');
    setImageAltText('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageUrl(reader.result as string);
        if (!imageAltText) {
          setImageAltText(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredPhotos = galleryPhotos.filter(p => 
    !galleryFilter || 
    p.title.toLowerCase().includes(galleryFilter.toLowerCase()) || 
    (p.category && p.category.toLowerCase().includes(galleryFilter.toLowerCase()))
  );

  if (!isMounted) {
    return <div className="h-56 bg-slate-50 border border-slate-200 rounded-2xl animate-pulse" />;
  }

  return (
    <div className="border border-slate-300 rounded-2xl overflow-hidden bg-white shadow-xs focus-within:border-[#7b002c] transition duration-200">
      
      {/* Rich Text Editor Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-50 border-b border-slate-200 text-slate-700 select-none text-xs">
        
        {/* 1. Headings & Paragraph Dropdown (As Requested) */}
        <div className="flex items-center">
          <select
            value={currentBlockFormat}
            onChange={(e) => handleFormatBlock(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:border-[#7b002c] cursor-pointer shadow-2xs"
            title="Choose Heading or Paragraph Style"
          >
            <option value="p">Paragraph (Normal Text)</option>
            <option value="h1">Heading 1 (H1 - Main Title)</option>
            <option value="h2">Heading 2 (H2 - Subheading)</option>
            <option value="h3">Heading 3 (H3 - Section Title)</option>
            <option value="h4">Heading 4 (H4 - Minor Heading)</option>
            <option value="blockquote">Quote Block</option>
          </select>
        </div>

        <span className="w-[1px] h-5 bg-slate-300 mx-1" />

        {/* 2. Text Styling (Bold, Italic, Underline) */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); executeCommand('bold'); }}
          className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition cursor-pointer"
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); executeCommand('italic'); }}
          className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition cursor-pointer"
          title="Italic (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); executeCommand('underline'); }}
          className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition cursor-pointer"
          title="Underline (Ctrl+U)"
        >
          <Underline className="w-4 h-4" />
        </button>

        <span className="w-[1px] h-5 bg-slate-300 mx-1" />

        {/* 3. Text Alignments */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); executeCommand('justifyLeft'); }}
          className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition cursor-pointer"
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); executeCommand('justifyCenter'); }}
          className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition cursor-pointer"
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); executeCommand('justifyRight'); }}
          className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition cursor-pointer"
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>

        <span className="w-[1px] h-5 bg-slate-300 mx-1" />

        {/* 4. Lists (Bullet List & Numbered List Fixed) */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            if (editorRef.current) {
              editorRef.current.focus();
              document.execCommand('insertUnorderedList', false);
              handleInput();
            }
          }}
          className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition cursor-pointer flex items-center gap-1 font-bold text-[11px]"
          title="Bullet List (Unordered List)"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            if (editorRef.current) {
              editorRef.current.focus();
              document.execCommand('insertOrderedList', false);
              handleInput();
            }
          }}
          className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition cursor-pointer flex items-center gap-1 font-bold text-[11px]"
          title="Numbered List (Ordered List)"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <span className="w-[1px] h-5 bg-slate-300 mx-1" />

        {/* 5. Links & Insert Photo from Gallery (With Alt Details) */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); executeCommand('createLink'); }}
          className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition cursor-pointer"
          title="Insert Link URL"
        >
          <Link className="w-4 h-4" />
        </button>

        <button
          type="button"
          onMouseDown={handleOpenImageModal}
          className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-[#7b002c] text-[#7b002c] hover:text-white border border-rose-200 hover:border-[#7b002c] transition flex items-center gap-1.5 font-bold text-xs cursor-pointer"
          title="Insert Image from Gallery or Upload with Alt Text"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>+ Insert Photo & Alt Text</span>
        </button>

        {/* Clear formatting */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); executeCommand('removeFormat'); }}
          className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-red-700 transition ml-auto text-[10px] font-bold uppercase cursor-pointer"
          title="Clear Format"
        >
          Clear Style
        </button>

      </div>

      {/* Editable Content Area */}
      <div 
        ref={editorRef}
        contentEditable={true}
        onInput={handleInput}
        data-placeholder={placeholder}
        className="p-5 min-h-[340px] max-h-[550px] overflow-y-auto outline-none prose prose-slate max-w-none text-slate-800 text-sm font-sans leading-relaxed editor-content-area"
      />

      {/* Modal: Insert Image from Gallery or Upload with Alt Text Details */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-rose-50 text-[#7b002c] flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900">Insert Image into Blog Article</h3>
                  <p className="text-[11px] text-slate-500">Select from photo gallery, upload a new file, and set SEO Alt Text.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Alt Text Input */}
            <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-800">
                Image Alt Text / Description <span className="text-slate-500 font-normal">(Crucial for SEO & Google Images)</span>
              </label>
              <input
                type="text"
                value={imageAltText}
                onChange={(e) => setImageAltText(e.target.value)}
                placeholder="e.g. Faisal Hills Block A Main Boulevard Possession Plots"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
              />
            </div>

            {/* Image Source Options */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Choose Image Source:</span>
                <label className="px-3 py-1.5 bg-slate-800 hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer flex items-center gap-1.5 transition">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Local Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>

              {/* Direct URL input */}
              <input
                type="text"
                value={selectedImageUrl}
                onChange={(e) => setSelectedImageUrl(e.target.value)}
                placeholder="Or paste direct image URL (https://... or /images/...)"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-[#7b002c]"
              />
            </div>

            {/* Gallery Grid */}
            {galleryPhotos.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Or Pick from Photo Gallery ({galleryPhotos.length} Available):</span>
                  <div className="relative w-48">
                    <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={galleryFilter}
                      onChange={(e) => setGalleryFilter(e.target.value)}
                      placeholder="Search photos..."
                      className="w-full pl-7 pr-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[11px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-48 overflow-y-auto p-1 border border-slate-200 rounded-xl">
                  {filteredPhotos.map((photo) => (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => {
                        setSelectedImageUrl(photo.imageUrl);
                        if (!imageAltText) {
                          setImageAltText(photo.title);
                        }
                      }}
                      className={`group relative rounded-xl overflow-hidden border-2 aspect-video bg-slate-900 transition cursor-pointer text-left ${
                        selectedImageUrl === photo.imageUrl
                          ? 'border-[#7b002c] ring-2 ring-[#7b002c]/30'
                          : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover" />
                      {selectedImageUrl === photo.imageUrl && (
                        <div className="absolute top-1 right-1 bg-[#7b002c] text-white p-0.5 rounded-full">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                      <div className="absolute bottom-0 inset-x-0 bg-black/70 p-1">
                        <p className="text-[9px] text-white truncate font-medium">{photo.title}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Image Live Preview */}
            {selectedImageUrl && (
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                <div className="w-20 h-14 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-300">
                  <img src={selectedImageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase text-emerald-700 block">✓ Ready to Insert</span>
                  <p className="text-xs font-semibold text-slate-800 truncate">{imageAltText || 'No Alt Text specified'}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertImageToContent}
                disabled={!selectedImageUrl}
                className="px-5 py-2 bg-[#7b002c] hover:bg-[#9e1245] disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow transition cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Insert into Article</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .editor-content-area:empty::before {
          content: attr(data-placeholder);
          color: #94a3b8;
          font-style: italic;
          pointer-events: none;
        }
        .editor-content-area h1 {
          font-size: 1.6rem;
          font-weight: 800;
          color: #7b002c;
          margin-top: 1.2rem;
          margin-bottom: 0.6rem;
          font-family: serif;
        }
        .editor-content-area h2 {
          font-size: 1.35rem;
          font-weight: 700;
          color: #7b002c;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          font-family: serif;
        }
        .editor-content-area h3 {
          font-size: 1.15rem;
          font-weight: 700;
          color: #9e1245;
          margin-top: 0.8rem;
          margin-bottom: 0.4rem;
        }
        .editor-content-area h4 {
          font-size: 1.05rem;
          font-weight: 600;
          color: #334155;
          margin-top: 0.6rem;
          margin-bottom: 0.3rem;
        }
        .editor-content-area p {
          margin-bottom: 0.8rem;
          line-height: 1.7;
        }
        .editor-content-area ul {
          list-style-type: disc !important;
          padding-left: 1.8rem !important;
          margin-top: 0.5rem !important;
          margin-bottom: 0.8rem !important;
        }
        .editor-content-area ul li {
          display: list-item !important;
          list-style: disc !important;
          margin-bottom: 0.3rem;
        }
        .editor-content-area ol {
          list-style-type: decimal !important;
          padding-left: 1.8rem !important;
          margin-top: 0.5rem !important;
          margin-bottom: 0.8rem !important;
        }
        .editor-content-area ol li {
          display: list-item !important;
          list-style: decimal !important;
          margin-bottom: 0.3rem;
        }
        .editor-content-area blockquote {
          border-left: 4px solid #7b002c;
          padding-left: 1rem;
          font-style: italic;
          color: #475569;
          margin: 1rem 0;
          background: #fff8f8;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          border-radius: 0 0.5rem 0.5rem 0;
        }
        .editor-content-area a {
          color: #7b002c;
          text-decoration: underline;
          font-weight: 600;
        }
        .editor-content-area figure {
          margin: 1.2rem 0;
        }
        .editor-content-area img {
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          display: block;
          margin: 0.5rem auto;
        }
      `}</style>

    </div>
  );
}
