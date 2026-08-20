'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, ArrowLeft } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-slate-50">
      <div className="bg-white p-8 sm:p-12 rounded-xl border border-slate-200 shadow-xl text-center max-w-md w-full space-y-6">
        <div className="w-16 h-16 bg-slate-100 text-[#7b002c] rounded-full flex items-center justify-center mx-auto shadow-inner">
          <RefreshCw className="w-8 h-8 text-[#7b002c]" />
        </div>

        <div className="space-y-2">
          <span className="label-caps text-[#7b002c] block">Application Notice</span>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Something went wrong!</h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            The page encountered a temporary component error. Click below to try re-rendering.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded shadow flex items-center justify-center gap-2 transition"
          >
            <RefreshCw className="w-4 h-4 text-white" />
            <span>Try Again</span>
          </button>
          
          <Link
            href="/"
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded border border-slate-300 flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
