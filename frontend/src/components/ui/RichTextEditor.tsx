'use client';

import React, { useRef, useEffect, useState } from 'react';
import { 
  Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, 
  AlignRight, Heading1, Heading2, Link, Image, Trash2, HelpCircle 
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = 'Start writing your article...' }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sync initial value only once or when content mismatches outer state
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

  const executeCommand = (e: React.MouseEvent, command: string, value: string = '') => {
    e.preventDefault(); // Prevent losing focus on editor
    if (typeof document !== 'undefined') {
      if (command === 'createLink') {
        const url = prompt('Enter link URL:');
        if (url) {
          document.execCommand(command, false, url);
        }
      } else if (command === 'insertImage') {
        const url = prompt('Enter image URL:');
        if (url) {
          document.execCommand(command, false, url);
        }
      } else {
        document.execCommand(command, false, value);
      }
      handleInput();
    }
  };

  if (!isMounted) {
    return <div className="h-48 bg-slate-50 border border-slate-200 rounded-xl animate-pulse" />;
  }

  return (
    <div className="border border-slate-300 rounded-2xl overflow-hidden bg-white shadow-xs focus-within:border-[#7b002c] transition duration-200">
      
      {/* Rich Text Editor Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 p-2.5 bg-slate-50 border-b border-slate-200 text-slate-700 select-none">
        
        {/* Headings Dropdown / Buttons */}
        <button
          type="button"
          onMouseDown={(e) => executeCommand(e, 'formatBlock', '<h2>')}
          className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition flex items-center gap-0.5 text-[10px] font-bold uppercase cursor-pointer"
          title="Heading 2"
        >
          <Heading1 className="w-3.5 h-3.5" />
          <span>H2</span>
        </button>
        <button
          type="button"
          onMouseDown={(e) => executeCommand(e, 'formatBlock', '<h3>')}
          className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition flex items-center gap-0.5 text-[10px] font-bold uppercase cursor-pointer"
          title="Heading 3"
        >
          <Heading2 className="w-3.5 h-3.5" />
          <span>H3</span>
        </button>
        <button
          type="button"
          onMouseDown={(e) => executeCommand(e, 'formatBlock', '<p>')}
          className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition text-[10px] font-bold uppercase cursor-pointer"
          title="Paragraph Text"
        >
          Paragraph
        </button>

        <span className="w-[1px] h-5 bg-slate-350 mx-1" />

        {/* Basic styles */}
        <button
          type="button"
          onMouseDown={(e) => executeCommand(e, 'bold')}
          className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition cursor-pointer"
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => executeCommand(e, 'italic')}
          className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition cursor-pointer"
          title="Italic (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => executeCommand(e, 'underline')}
          className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition cursor-pointer"
          title="Underline (Ctrl+U)"
        >
          <Underline className="w-4 h-4" />
        </button>

        <span className="w-[1px] h-5 bg-slate-350 mx-1" />

        {/* Alignments */}
        <button
          type="button"
          onMouseDown={(e) => executeCommand(e, 'justifyLeft')}
          className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition cursor-pointer"
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => executeCommand(e, 'justifyCenter')}
          className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition cursor-pointer"
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => executeCommand(e, 'justifyRight')}
          className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition cursor-pointer"
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>

        <span className="w-[1px] h-5 bg-slate-350 mx-1" />

        {/* Lists */}
        <button
          type="button"
          onMouseDown={(e) => executeCommand(e, 'insertUnorderedList')}
          className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition cursor-pointer"
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => executeCommand(e, 'insertOrderedList')}
          className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition cursor-pointer"
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <span className="w-[1px] h-5 bg-slate-350 mx-1" />

        {/* Links and Images */}
        <button
          type="button"
          onMouseDown={(e) => executeCommand(e, 'createLink')}
          className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition cursor-pointer"
          title="Insert Link"
        >
          <Link className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => executeCommand(e, 'insertImage')}
          className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition cursor-pointer"
          title="Insert Image URL"
        >
          <Image className="w-4 h-4" />
        </button>
        
        <button
          type="button"
          onMouseDown={(e) => executeCommand(e, 'removeFormat')}
          className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-red-700 transition ml-auto text-[10px] font-bold uppercase cursor-pointer"
          title="Clear Format"
        >
          Clear Style
        </button>

      </div>

      {/* Editable Area */}
      <div 
        ref={editorRef}
        contentEditable={true}
        onInput={handleInput}
        data-placeholder={placeholder}
        className="p-5 min-h-[300px] max-h-[500px] overflow-y-auto outline-none prose prose-slate max-w-none text-slate-800 text-sm font-sans leading-relaxed editor-content-area"
      />

      <style jsx global>{`
        .editor-content-area:empty::before {
          content: attr(data-placeholder);
          color: #94a3b8;
          font-style: italic;
          pointer-events: none;
        }
        .editor-content-area h2 {
          font-size: 1.4rem;
          font-weight: 700;
          color: #7b002c;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        .editor-content-area h3 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #9e1245;
          margin-top: 0.8rem;
          margin-bottom: 0.4rem;
        }
        .editor-content-area p {
          margin-bottom: 0.8rem;
        }
        .editor-content-area ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 0.8rem;
        }
        .editor-content-area ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 0.8rem;
        }
        .editor-content-area a {
          color: #7b002c;
          text-decoration: underline;
        }
        .editor-content-area img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
      `}</style>

    </div>
  );
}
