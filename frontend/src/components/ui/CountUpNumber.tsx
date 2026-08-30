'use client';

import React, { useEffect, useRef } from 'react';

interface CountUpNumberProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export default function CountUpNumber({
  end,
  suffix = '',
  prefix = '',
  duration = 1500,
  decimals = 0,
  className = ''
}: CountUpNumberProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      el.textContent = `${prefix}${end.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          let startTime: number | null = null;

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            // Ease-out cubic formula for ultra-smooth slowdown
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
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [end, suffix, prefix, duration, decimals]);

  const initialFormatted = decimals > 0 ? end.toFixed(decimals) : end.toLocaleString();

  return (
    <span ref={spanRef} className={className}>
      {prefix}{initialFormatted}{suffix}
    </span>
  );
}
