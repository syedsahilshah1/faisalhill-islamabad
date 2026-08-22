'use client';

import React, { useEffect, useRef, useState } from 'react';

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
  duration = 2000,
  decimals = 0,
  className = ''
}: CountUpNumberProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setCount(end);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            // Ease-out cubic formula for ultra-smooth slowdown
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = easeOutProgress * end;

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [end, duration, hasAnimated]);

  const formattedValue = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toString();

  return (
    <span ref={ref} className={className}>
      {prefix}{hasAnimated ? formattedValue : '0'}{suffix}
    </span>
  );
}
