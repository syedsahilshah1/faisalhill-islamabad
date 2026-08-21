'use client';

import React from 'react';
import Link from 'next/link';
import {
  Phone, Mail, MapPin, Facebook, Instagram, MessageSquare, Linkedin, Youtube, ShieldCheck, ArrowUpRight
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#4c0215] text-white border-t border-[#7b002c]">

      {/* Top Section with FT Monogram and Slogan */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 pt-12 pb-8 text-center space-y-3 border-b border-white/10">
        <div className="font-serif text-5xl sm:text-6xl font-bold tracking-tighter text-white select-none inline-block">
          FT
        </div>
        <p className="text-white/90 text-sm sm:text-base font-serif italic max-w-2xl mx-auto leading-relaxed">
          FaisalTown Group continues to lead the way in redefining real estate development in Pakistan.
        </p>


      </div>

      {/* Main 3-Column Footer Grid */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 py-12 grid grid-cols-1 md:grid-cols-12 gap-10">

        {/* Column 1 — CONTACT US */}
        <div className="md:col-span-5 space-y-4">
          <h4 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-white/70">
            CONTACT US
          </h4>

          <div className="space-y-3.5 text-xs text-white/90 font-sans leading-relaxed">

            {/* Phone Numbers */}
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-white shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p><strong className="text-white font-semibold">Head Office:</strong> 051-111-324-725</p>
                <p><strong className="text-white font-semibold">Faisal Town:</strong> 051-2720504-5</p>
                <p><strong className="text-white font-semibold">Faisal Hills:</strong> 051-450000-2</p>
                <p><strong className="text-white font-semibold">Faisal Margalla City:</strong> 051-5443746-7</p>
                <p className="pt-1">
                  <strong className="text-white font-semibold">Sales Hotline & WhatsApp:</strong>{' '}
                  <a href="tel:+923044811717" className="underline font-bold text-white hover:text-amber-300">+92 304 4811 717</a>
                </p>
              </div>
            </div>

            {/* Email Addresses */}
            <div className="flex items-start gap-3 pt-1">
              <Mail className="w-4 h-4 text-white shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p>
                  <a href="mailto:info@faisalhillsislamabadfh.com" className="hover:underline text-white/80 font-medium">
                    info@faisalhillsislamabadfh.com
                  </a>
                </p>
              </div>
            </div>

            {/* Office Locations */}
            <div className="flex items-start gap-3 pt-1">
              <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
              <div className="space-y-1.5 text-white/80">
                <p>
                  <strong className="text-white font-semibold block">Site Entrance:</strong>
                  Main Gate Entrance, N-5 GT Road, Near Taxila Bypass, Rawalpindi / Islamabad
                </p>
                <p>
                  <strong className="text-white font-semibold block">Head Office:</strong>
                  Faisal Tower, Faisal Town Main Fateh Jang Road N-80 near Tarnol Interchange Motorway M-1, Rawalpindi Pakistan.
                </p>
                <p>
                  <strong className="text-white font-semibold block">Rawalpindi Sales Desk:</strong>
                  Office #401 Noor Mall 6th Road Rawalpindi.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Column 2 — QUICK LINKS & SECTORS */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-white/70">
            QUICK LINKS & SECTORS
          </h4>

          <ul className="space-y-2 text-xs text-white/90 font-sans font-medium">
            <li>
              <Link href="/" className="hover:text-white hover:underline transition-all inline-flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-rose-300" />
                <span>Home Page</span>
              </Link>
            </li>
            <li>
              <Link href="/about-us" className="hover:text-white hover:underline transition-all inline-flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-rose-300" />
                <span>About Us & Legacy</span>
              </Link>
            </li>
            <li>
              <Link href="/faisal-hills-payment-plan" className="hover:text-white hover:underline transition-all inline-flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-rose-300" />
                <span>Payment Plans & Installments</span>
              </Link>
            </li>
            <li>
              <Link href="/master-plan" className="hover:text-white hover:underline transition-all inline-flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-rose-300" />
                <span>Interactive Master Plan Map</span>
              </Link>
            </li>
            <li>
              <Link href="/faisal-hills-noc-status" className="hover:text-white hover:underline transition-all inline-flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-rose-300" />
                <span>CDA & RDA NOC Status</span>
              </Link>
            </li>
            <li>
              <Link href="/blocks/executive-block" className="hover:text-white hover:underline transition-all inline-flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-rose-300" />
                <span>Executive Block</span>
              </Link>
            </li>
            <li>
              <Link href="/blocks/prime-block" className="hover:text-white hover:underline transition-all inline-flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-rose-300" />
                <span>Prime Block</span>
              </Link>
            </li>
            <li>
              <Link href="/faisal-hills-commercial" className="hover:text-white hover:underline transition-all inline-flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-rose-300" />
                <span>Commercial Plots & Highrise</span>
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="hover:text-white hover:underline transition-all inline-flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-rose-300" />
                <span>Latest News & Blogs</span>
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white hover:underline transition-all inline-flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-rose-300" />
                <span>Contact Sales Team</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 — SUBSCRIBE TO NEWSLETTER & SOCIALS */}
        <div className="md:col-span-4 space-y-6">
          <div className="space-y-4">
            <h4 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-white/70">
              SUBSCRIBE TO NEWSLETTER
            </h4>

            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-3">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full bg-transparent border-b border-white/60 py-2 px-1 text-xs text-white placeholder-white/50 focus:outline-none focus:border-white transition"
              />
              <button
                type="submit"
                className="bg-white text-[#4c0215] font-bold text-xs px-6 py-2 rounded-md hover:bg-slate-100 transition-colors shrink-0 shadow-md cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>

          {/* Social Media Outline Icons Row */}
          <div className="flex items-center gap-2.5 pt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 border border-white/40 rounded flex items-center justify-center hover:bg-white hover:text-[#4c0215] text-white transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 border border-white/40 rounded flex items-center justify-center hover:bg-white hover:text-[#4c0215] text-white transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://wa.me/923044811717" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 border border-white/40 rounded flex items-center justify-center hover:bg-white hover:text-[#4c0215] text-white transition-colors">
              <MessageSquare className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 border border-white/40 rounded flex items-center justify-center hover:bg-white hover:text-[#4c0215] text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 border border-white/40 rounded flex items-center justify-center hover:bg-white hover:text-[#4c0215] text-white transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Disclaimer Bar */}
      <div className="border-t border-white/10 bg-black/30">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 py-4">
          <p className="text-[11px] text-white/70 leading-relaxed font-sans text-center">
            <strong className="text-white font-semibold">Disclaimer:</strong> All prices, installment amounts and payment schedules shown on this website are indicative and subject to revision by the developer without prior notice. This website is operated by an authorized sales partner and is not the official developer portal. Buyers are advised to verify all figures, NOC status and plot allocation details directly with the developer&apos;s booking office before making any payment.
          </p>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10 bg-black/40">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/70">
          <p>© {currentYear} Faisal Hills Real Estate Portal. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-white/30">|</span>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
