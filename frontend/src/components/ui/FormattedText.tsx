'use client';

import React from 'react';
import Link from 'next/link';


interface FormattedTextProps {
  text?: string;
  className?: string;
}

/**
 * Safely parses markdown links [Text](url), bold **text**, and HTML <a> tags into Next.js Links
 * supporting internal routes (/blocks/block-a) and external URLs (https://...)
 */
export default function FormattedText({ text, className = '' }: FormattedTextProps) {
  if (!text) return null;

  // Regex to match markdown links [label](url), bold **text**, and italic *text*
  const tokens: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Push preceding plain text
    if (match.index > lastIndex) {
      tokens.push(text.substring(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      // Markdown link: [label](url)
      const label = match[1];
      const url = match[2].trim();
      const isInternal = url.startsWith('/') || url.startsWith('#');

      if (isInternal) {
        tokens.push(
          <Link
            key={`link-${match.index}`}
            href={url}
            className="text-[#7b002c] font-bold hover:underline inline-flex items-center gap-0.5 underline decoration-[#7b002c]/40 hover:decoration-[#7b002c] transition-colors"
          >
            {label}
          </Link>
        );
      } else {
        tokens.push(
          <a
            key={`ext-${match.index}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7b002c] font-bold hover:underline inline-flex items-center gap-0.5 underline decoration-[#7b002c]/40 hover:decoration-[#7b002c] transition-colors"
          >
            {label}
          </a>
        );
      }
    } else if (match[3]) {
      // Bold **text**
      tokens.push(
        <strong key={`bold-${match.index}`} className="font-bold text-slate-900">
          {match[3]}
        </strong>
      );
    } else if (match[4]) {
      // Italic *text*
      tokens.push(
        <em key={`italic-${match.index}`} className="italic">
          {match[4]}
        </em>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push(text.substring(lastIndex));
  }

  return <span className={className}>{tokens}</span>;
}
