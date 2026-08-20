import React from 'react';
import { Scale, Info, CheckSquare, RefreshCw } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="bg-[#fff8f6] min-h-screen text-slate-900 font-sans selection:bg-[#7b002c] selection:text-white pb-16">
      
      {/* Header Banner */}
      <section className="bg-[#4c050d] text-white py-16 px-6 lg:px-12 border-b border-[#7b002c]/40">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs bg-white/10 border border-white/20 px-3 py-1 rounded-sm uppercase tracking-wider font-bold">
            Legal & Compliance
          </span>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl text-white">
            Terms of Service
          </h1>
          <p className="text-slate-300 text-sm font-light max-w-2xl">
            Last Updated: August 2026 • Please read these terms carefully before utilizing our real estate information portal.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 mt-12 bg-white rounded-xl border border-slate-200 shadow-sm p-8 lg:p-12 space-y-8 text-slate-700 leading-relaxed text-sm">
        
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-[#7b002c]" />
            <span>1. Terms & Conditions of Use</span>
          </h2>
          <p>
            By accessing this website, you agree to comply with and be bound by these Terms of Service, all applicable laws, and regional real estate regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Info className="w-5 h-5 text-[#7b002c]" />
            <span>2. Sales Partner Disclaimer</span>
          </h2>
          <p>
            This portal is operated by an authorized real estate sales agency and marketing partner. It is not the direct official website of the society developer (Zedem International or Faisal Town Group).
          </p>
          <div className="bg-red-50 border-l-4 border-[#7b002c] p-5 rounded-r-xl text-slate-800">
            <span className="font-bold text-[#7b002c] block mb-1">Indicative Allotments & Pricing Notice</span>
            <p className="text-xs">
              All plot availability status, pricing charts, payment schedules, and installment rates are indicative of market values and are subject to correction or revision by the developer without prior notice. Final booking confirmations must be verified directly at the official developer booking desk.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <RefreshCw className="w-5 h-5 text-[#7b002c]" />
            <span>3. Revisions and Errata</span>
          </h2>
          <p>
            The materials appearing on this website could include technical, typographical, or photographic errors. While we make every effort to verify information with on-ground mapping and the official developer ledger, we do not warrant that any of the materials on this website are completely accurate, complete, or current.
          </p>
        </div>

        <div className="space-y-4 border-t border-slate-100 pt-6">
          <h2 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2.5">
            <CheckSquare className="w-5 h-5 text-[#7b002c]" />
            <span>4. Verification Prior to Payment</span>
          </h2>
          <p>
            All buyers are advised to perform due diligence before making payments. Never transfer funds directly to individual sales agents; all bookings and installments must be paid via formal banking instruments (Pay Order, Demand Draft) in the name of the official society developer.
          </p>
        </div>

      </main>

    </div>
  );
}
