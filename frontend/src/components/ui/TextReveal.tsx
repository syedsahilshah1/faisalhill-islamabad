'use client';

import React, { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  staggerDelay?: number;
  direction?: 'left' | 'up';
}

export default function TextReveal({
  text,
  className = '',
  as: Component = 'h2',
  staggerDelay = 75,
  direction = 'left'
}: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const words = text.split(' ');

  return (
    <Component ref={ref as any} className={`flex flex-wrap gap-x-2 gap-y-1 ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            transitionDelay: isVisible ? `${i * staggerDelay}ms` : '0ms',
            transitionDuration: '650ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className={`inline-block transition-all transform transform-gpu will-change-[transform,opacity] ${
            isVisible
              ? 'opacity-100 translate-x-0 translate-y-0 filter-none'
              : direction === 'left'
              ? 'opacity-0 -translate-x-8 filter blur-[2px]'
              : 'opacity-0 translate-y-6 filter blur-[2px]'
          }`}
        >
          {word}
        </span>
      ))}
    </Component>
  );
}

