'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

import PlotDetailClient from '../[id]/PlotDetailClient';

/**
 * Resolves the plot id from `?id=` and hands it to the shared detail view.
 *
 * Kept separate from `page.tsx` because `useSearchParams` forces the surrounding
 * tree to be a Suspense boundary during static generation.
 */
function PlotViewResolver() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';

  if (!id) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-center px-6">
        <h1 className="font-serif text-2xl font-bold text-slate-900">No plot selected</h1>
        <p className="text-sm text-slate-600 max-w-md">
          This page shows a single plot. Open a plot from the inventory to see its
          dimensions, pricing and availability.
        </p>
        <a
          href="/plots/"
          className="mt-2 inline-flex items-center px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition"
        >
          Browse the inventory
        </a>
      </div>
    );
  }

  return <PlotDetailClient plotId={id} />;
}

export default function PlotViewClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <h1 className="sr-only">Plot Detail View</h1>
          <Loader2 className="w-6 h-6 animate-spin text-[#7b002c]" />
        </div>
      }
    >
      <PlotViewResolver />
    </Suspense>
  );
}
