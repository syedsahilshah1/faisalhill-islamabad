'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error caught:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-white">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-5 shadow-2xl">
          <div className="w-14 h-14 bg-rose-950/60 border border-rose-800 text-rose-400 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Temporary System Notice</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              An unexpected error occurred. Please try reloading the page.
            </p>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => reset()}
              className="w-full py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs rounded-xl shadow transition"
            >
              Try Again
            </button>
            <a
              href="/"
              className="block w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl transition"
            >
              Return to Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
