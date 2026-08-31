import Link from 'next/link';
import { Building2, ArrowLeft, Home, MapPin, Search, Compass, PhoneCall, MessageSquare } from 'lucide-react';

export default function NotFound() {
  const popularBlocks = [
    { name: 'Executive Block', href: '/blocks/executive-block' },
    { name: 'Prime Block', href: '/blocks/prime-block' },
    { name: 'Block A', href: '/blocks/block-a' },
    { name: 'Block B', href: '/blocks/block-b' },
    { name: 'Block B-1 Ext', href: '/blocks/block-b1-extension' },
    { name: 'Block C', href: '/blocks/block-c' },
    { name: 'Block D', href: '/blocks/block-d' },
    { name: 'Faisal Jewel', href: '/faisal-jewels' },
  ];

  return (
    <main className="min-h-screen flex items-center justify-center px-4 pt-28 sm:pt-36 pb-20 bg-linear-to-b from-slate-50 to-rose-50/30">
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-2xl text-center max-w-xl w-full space-y-6 animate-fade-in">
        
        {/* Large 404 Visual Icon */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-rose-100 rounded-full animate-ping opacity-25" />
          <div className="w-20 h-20 bg-linear-to-br from-rose-50 to-rose-100 border-2 border-rose-200 rounded-full flex items-center justify-center shadow-inner relative z-10">
            <span className="font-serif text-2xl font-bold text-[#7b002c]">404</span>
          </div>
        </div>

        {/* Heading & Context */}
        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-widest text-[#7b002c] font-extrabold block">
            Error 404 • Page Not Found
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            The URL You Entered Does Not Exist
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            The link you entered may have a typo, has been relocated, or is no longer available. You can return to our homepage or explore verified sectors below.
          </p>
        </div>

        {/* Quick Links to Valid Blocks */}
        <div className="pt-4 border-t border-slate-100 space-y-3 text-left">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block text-center">
            Explore Verified Faisal Hills Sectors
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {popularBlocks.map((b) => (
              <Link
                key={b.href}
                href={b.href}
                className="px-2.5 py-2 text-center text-xs font-semibold rounded-xl bg-slate-50 hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 hover:border-[#7b002c] transition-all hover:scale-102"
              >
                {b.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-102"
          >
            <Home className="w-4 h-4 text-white" />
            <span>Return to Homepage</span>
          </Link>
          
          <Link
            href="/plots"
            className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 flex items-center justify-center gap-2 transition-all hover:scale-102"
          >
            <Search className="w-4 h-4 text-slate-600" />
            <span>Browse Plot Inventory</span>
          </Link>
        </div>

        {/* Instant Assistance */}
        <div className="pt-4 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-500">
            Need urgent help finding a specific sector?{' '}
            <a
              href="https://wa.me/923331113177?text=Hi%2C%20I%20got%20a%20404%20error%20and%20need%20help%20finding%20information%20on%20Faisal%20Hills."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7b002c] font-bold hover:underline inline-flex items-center gap-1"
            >
              <MessageSquare className="w-3 h-3" />
              Chat on WhatsApp (+92 333 1113177)
            </a>
          </p>
        </div>

      </div>
    </main>
  );
}


