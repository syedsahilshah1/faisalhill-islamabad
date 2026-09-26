'use client';

import React, { useEffect, useRef } from 'react';

interface CountUpNumberProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
  autoStart?: boolean;
}

export default function CountUpNumber({
  end,
  suffix = '',
  prefix = '',
  duration = 1800,
  decimals = 0,
  className = '',
  autoStart = true
}: CountUpNumberProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const startCounting = () => {
      if (animatedRef.current) return;
      animatedRef.current = true;
      let startTime: number | null = null;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease-out cubic formula for smooth slowdown
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        const currentCount = easeOutProgress * end;

        if (el) {
          const formatted = decimals > 0 
            ? currentCount.toFixed(decimals) 
            : Math.floor(currentCount).toLocaleString();
          el.textContent = `${prefix}${formatted}${suffix}`;
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else if (el) {
          const finalFormatted = decimals > 0 
            ? end.toFixed(decimals) 
            : end.toLocaleString();
          el.textContent = `${prefix}${finalFormatted}${suffix}`;
        }
      };

      requestAnimationFrame(animate);
    };

    if (autoStart) {
      // Start immediately on mount after a small initial tick for smooth visual experience
      const timer = setTimeout(startCounting, 150);
      return () => clearTimeout(timer);
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      startCounting();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCounting();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [end, suffix, prefix, duration, decimals, autoStart]);

  return (
    <span ref={spanRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
