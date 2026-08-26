import Link from 'next/link';
import { Building2, ArrowLeft, Home, MapPin, Search } from 'lucide-react';

export default function NotFound() {
  const popularBlocks = [
    { name: 'Executive Block', href: '/blocks/executive-block' },
    { name: 'Prime Block', href: '/blocks/prime-block' },
    { name: 'Block A', href: '/blocks/block-a' },
    { name: 'Block B', href: '/blocks/block-b' },
    { name: 'Block C', href: '/blocks/block-c' },
    { name: 'Block D', href: '/blocks/block-d' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-32 sm:pt-36 pb-20 bg-slate-50">
      <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-xl text-center max-w-lg w-full space-y-6">
        <div className="w-16 h-16 bg-rose-50 text-[#7b002c] border border-rose-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <Building2 className="w-8 h-8 text-[#7b002c]" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-widest text-[#7b002c] font-bold block">404 • Page Not Found</span>
          <h1 className="font-serif text-3xl font-bold text-slate-900">Requested Page Not Found</h1>
          <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
            The page or block sector you are looking for might have been moved, renamed, or is currently undergoing development.
          </p>
        </div>

        {/* Quick Links to Valid Blocks */}
        <div className="pt-2 border-t border-slate-100 space-y-3 text-left">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block text-center">
            Explore Active Sectors
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {popularBlocks.map((b) => (
              <Link
                key={b.href}
                href={b.href}
                className="px-3 py-2 text-center text-xs font-semibold rounded-lg bg-slate-50 hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 hover:border-[#7b002c] transition-all"
              >
                {b.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl shadow flex items-center justify-center gap-2 transition"
          >
            <Home className="w-4 h-4 text-white" />
            <span>Return to Homepage</span>
          </Link>
          
          <Link
            href="/plots"
            className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl border border-slate-300 flex items-center justify-center gap-2 transition"
          >
            <Search className="w-4 h-4 text-slate-600" />
            <span>Plot Inventory</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
