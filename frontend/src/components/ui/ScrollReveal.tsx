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
  duration = 700
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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Safety fallback timer so elements are never permanently hidden if IO doesn't fire
    const fallbackTimer = setTimeout(() => setIsVisible(true), 3500);

    return () => {
      clearTimeout(fallbackTimer);
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const getHiddenClasses = () => {
    switch (direction) {
      case 'right':
        return 'opacity-0 translate-x-12 sm:translate-x-20';
      case 'left':
        return 'opacity-0 -translate-x-12 sm:-translate-x-20';
      case 'pop':
        return 'opacity-0 scale-90 translate-y-6';
      case 'down':
        return 'opacity-0 -translate-y-10';
      case 'up':
      default:
        return 'opacity-0 translate-y-12';
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
      className={`transition-all ease-out transform ${
        isVisible ? getVisibleClasses() : getHiddenClasses()
      } ${className}`}
    >
      {children}
    </div>
  );
}
