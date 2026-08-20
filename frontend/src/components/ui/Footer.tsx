import React from 'react';
import Link from 'next/link';
import {
  Building2, ShieldCheck, MapPin, Phone, Mail,
  MessageSquare, ArrowUpRight, Facebook, Instagram, Youtube, Twitter
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0d0105] text-white border-t border-[#7b002c]/40">

      {/* ── Main 5-Column Grid ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-14 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* Column 1 — About */}
        <div className="lg:col-span-1 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#7b002c] rounded-xl flex items-center justify-center shrink-0 shadow">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-sans font-black text-lg tracking-wider text-white block uppercase leading-none">FAISAL HILLS</span>
              <span className="text-[9px] text-slate-400 tracking-widest block font-bold mt-0.5 uppercase">Faisal Town Group</span>
            </div>
          </div>

          <p className="text-slate-300 text-xs leading-relaxed font-sans">
            Faisal Hills is an RDA-approved housing society by Zedem International and the Faisal Town Group, located on Main GT Road, Taxila, offering residential plots and commercial plots on flexible installment plans with Margalla Hills views and seamless access to M-1, M-2 and the CPEC route.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#7b002c]/60 border border-[#7b002c] rounded-lg text-white text-[10px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              RDA Approved
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-slate-300 text-[10px] font-semibold">
              GT Road, Taxila
            </span>
          </div>
        </div>

        {/* Column 2 — Quick Links */}
        <div>
          <h4 className="font-sans font-bold text-[10px] uppercase tracking-widest text-white mb-4 border-b border-white/10 pb-2">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {[
              { label: 'Home', href: '/' },
              { label: 'About Us', href: '/about-us' },
              { label: 'Faisal Hills Payment Plan', href: '/faisal-hills-payment-plan' },
              { label: 'Location', href: '/faisal-hills-location' },
              { label: 'Master Plan', href: '/master-plan' },
              { label: 'NOC Status', href: '/faisal-hills-noc-status' },
              { label: 'Booking Process', href: '/faisal-hills-payment-plan#how-to-book' },
              { label: 'Blogs', href: '/blogs' },
              { label: 'Contact Us', href: '/contact' },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <ArrowUpRight className="w-3 h-3 text-[#7b002c] shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Blocks */}
        <div>
          <h4 className="font-sans font-bold text-[10px] uppercase tracking-widest text-white mb-4 border-b border-white/10 pb-2">
            Blocks
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {[
              { label: 'Executive Block', href: '/blocks/executive-block' },
              { label: 'Prime Block', href: '/blocks/prime-block' },
              { label: 'Block A', href: '/blocks/block-a' },
              { label: 'Block B', href: '/blocks/block-b' },
              { label: 'Block B Extension', href: '/blocks/block-b1-extension' },
              { label: 'Block C', href: '/blocks/block-c' },
              { label: 'Block D', href: '/blocks/block-d' },
              { label: 'Commercial Plots', href: '/faisal-hills-commercial' },
              { label: 'Villas', href: '/plots?category=Residential' },
              { label: 'Hill Walk', href: '/blocks/hills-walk' },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <ArrowUpRight className="w-3 h-3 text-[#7b002c] shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Plot Sizes */}
        <div>
          <h4 className="font-sans font-bold text-[10px] uppercase tracking-widest text-white mb-4 border-b border-white/10 pb-2">
            Plot Sizes
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {[
              { label: '5 Marla Payment Plan', href: '/faisal-hills-payment-plan#5-marla' },
              { label: '8 Marla Payment Plan', href: '/faisal-hills-payment-plan#8-marla' },
              { label: '10 Marla Payment Plan', href: '/faisal-hills-payment-plan#10-marla' },
              { label: '14 Marla Payment Plan', href: '/faisal-hills-payment-plan#14-marla' },
              { label: '1 Kanal Payment Plan', href: '/faisal-hills-payment-plan#1-kanal' },
              { label: '2 Kanal Payment Plan', href: '/faisal-hills-payment-plan#2-kanal' },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <ArrowUpRight className="w-3 h-3 text-[#7b002c] shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 5 — Get in Touch */}
        <div>
          <h4 className="font-sans font-bold text-[10px] uppercase tracking-widest text-white mb-4 border-b border-white/10 pb-2">
            Get in Touch
          </h4>
          <ul className="space-y-3.5 text-xs text-slate-300">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-3.5 h-3.5 text-[#7b002c] shrink-0 mt-0.5" />
              <span>Main Gate Entrance, N-5 GT Road, Near Taxila Bypass, Rawalpindi / Islamabad</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-3.5 h-3.5 text-[#7b002c] shrink-0" />
              <a href="tel:+923044811717" className="hover:text-white font-bold transition-colors">+92 304 4811717</a>
            </li>
            <li className="flex items-center gap-2.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#7b002c] shrink-0" />
              <a href="https://wa.me/923044811717" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp: +92 304 4811717</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-3.5 h-3.5 text-[#7b002c] shrink-0" />
              <a href="mailto:info@faisalhillsislamabadfh.com" className="hover:text-white transition-colors">info@faisalhillsislamabadfh.com</a>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-5">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#7b002c] hover:border-[#7b002c] transition-all duration-300">
              <Facebook className="w-3.5 h-3.5 text-white" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#7b002c] hover:border-[#7b002c] transition-all duration-300">
              <Instagram className="w-3.5 h-3.5 text-white" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#7b002c] hover:border-[#7b002c] transition-all duration-300">
              <Youtube className="w-3.5 h-3.5 text-white" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#7b002c] hover:border-[#7b002c] transition-all duration-300">
              <Twitter className="w-3.5 h-3.5 text-white" />
            </a>
          </div>
        </div>

      </div>

      {/* ── Big Brand Banner ── */}
      <div className="border-t border-white/5 py-8 text-center overflow-hidden">
        <h2 className="font-sans font-black text-5xl sm:text-7xl md:text-9xl lg:text-[120px] xl:text-[145px] tracking-tighter uppercase leading-none text-white/5 select-none">
          FAISAL HILLS
        </h2>
      </div>

      {/* ── Disclaimer Bar ── */}
      <div className="border-t border-white/10 bg-black/30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-5">
          <p className="text-[10px] text-slate-500 leading-relaxed font-sans text-center">
            <strong className="text-slate-400 font-semibold">Disclaimer:</strong> All prices, installment amounts and payment schedules shown on this website are indicative and subject to revision by the developer without prior notice. This website is operated by an authorized sales partner and is not the official developer portal. Buyers are advised to verify all figures, NOC status and plot allocation details directly with the developer&apos;s booking office before making any payment.
          </p>
        </div>
      </div>

      {/* ── Copyright Bar ── */}
      <div className="border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {currentYear} Faisal Hills Real Estate Portal. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <span className="text-slate-700">|</span>
            <Link href="/terms-of-service" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
