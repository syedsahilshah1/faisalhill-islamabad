import React from 'react';
import { Shield, Lock, Eye, CheckCircle } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#fff8f6] min-h-screen text-slate-900 font-sans selection:bg-[#7b002c] selection:text-white pb-16">
      
      {/* Header Banner */}
      <section className="bg-[#4c050d] text-white py-16 px-6 lg:px-12 border-b border-[#7b002c]/40">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs bg-white/10 border border-white/20 px-3 py-1 rounded-sm uppercase tracking-wider font-bold">
            Legal & Compliance
          </span>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl text-white">
            Privacy Policy
          </h1>
          <p className="text-slate-300 text-sm font-light max-w-2xl">
            Last Updated: August 2026 • We respect your privacy and are committed to protecting the personal data you share with us.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 mt-12 bg-white rounded-xl border border-slate-200 shadow-sm p-8 lg:p-12 space-y-8 text-slate-700 leading-relaxed text-sm">
        
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-[#7b002c]" />
            <span>1. Information We Collect</span>
          </h2>
          <p>
            When you use our website or contact form, we collect the personal information you submit to us, which includes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal details:</strong> Your name, phone number, and email address.</li>
            <li><strong>Inquiry information:</strong> Details regarding your preferred block, plot number, category interest, or custom message content.</li>
            <li><strong>Device data:</strong> Basic browser metadata, IP address, and cookie identifiers for analytics purposes.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-[#7b002c]" />
            <span>2. How We Use Your Information</span>
          </h2>
          <p>
            Your personal information is used exclusively to facilitate your real estate transactions and customer requests:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To answer your specific inquiries about Faisal Hills plots, NOC status, prices, or payment plans.</li>
            <li>To schedule guided site visits and physical tours.</li>
            <li>To compile anonymous traffic metrics and optimize the user experience on our portal.</li>
            <li>We do not sell, rent, or trade your personal information with third-party marketing companies.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Eye className="w-5 h-5 text-[#7b002c]" />
            <span>3. Cookies and Analytics</span>
          </h2>
          <p>
            We use temporary and persistent cookies to record site visits and improve page speeds. Cookies help us understand which blocks and articles get the most attention. You can disable cookies in your browser settings at any time, which will not prevent you from browsing our site.
          </p>
        </div>

        <div className="space-y-4 border-t border-slate-100 pt-6">
          <h2 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2.5">
            <CheckCircle className="w-5 h-5 text-[#7b002c]" />
            <span>Consent Acceptance</span>
          </h2>
          <p>
            By submitting your details on our contact forms, you consent to our privacy policy and authorize our verified sales desk to reach out to you via call, WhatsApp, or email to assist with your inquiry.
          </p>
        </div>

      </main>

    </div>
  );
}
