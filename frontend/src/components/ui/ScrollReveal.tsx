'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'pop';
  duration?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 600
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
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
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    const fallbackTimer = setTimeout(() => setIsVisible(true), 2500);

    return () => {
      clearTimeout(fallbackTimer);
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const getHiddenClasses = () => {
    switch (direction) {
      case 'right':
        return 'opacity-0 translate-x-8 sm:translate-x-12';
      case 'left':
        return 'opacity-0 -translate-x-8 sm:-translate-x-12';
      case 'pop':
        return 'opacity-0 scale-95 translate-y-4';
      case 'down':
        return 'opacity-0 -translate-y-8';
      case 'up':
      default:
        return 'opacity-0 translate-y-8';
    }
  };

  const getVisibleClasses = () => {
    switch (direction) {
      case 'pop':
        return 'opacity-100 scale-100 translate-y-0';
      default:
        return 'opacity-100 translate-x-0 translate-y-0';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`
      }}
      className={`transition-[transform,opacity] ease-out transform transform-gpu will-change-[transform,opacity] ${
        isVisible ? getVisibleClasses() : getHiddenClasses()
      } ${className}`}
    >
      {children}
    </div>
  );
}
