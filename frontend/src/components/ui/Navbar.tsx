'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  Phone,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Layers,
  MessageSquare
} from 'lucide-react';
import { blocksData } from '@/data/faisalHillsData';
import LeadModal from './LeadModal';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileBlocksOpen, setMobileBlocksOpen] = useState(false);
  const [mobileHighriseOpen, setMobileHighriseOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  // Scroll visibility & scroll position state
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Detect if scrolled past top hero section threshold
      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 2. Hide on scroll down, reveal on scroll up
      if (currentScrollY <= 80) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY + 5) {
        // Scrolling DOWN -> Hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 5) {
        // Scrolling UP -> Show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const isSolidNav = isScrolled;

  // Hide main website navbar on Admin / Dashboard routes
  if (pathname?.startsWith('/ubaid') || pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* Main Outer Header Container with Hide/Show animation */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isSolidNav
            ? 'top-3 sm:top-4 px-3 sm:px-6 lg:px-10'
            : 'top-0 px-0'
        } ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : '-translate-y-28 opacity-0 pointer-events-none'
        }`}
      >
        {/* Inner Floating Navbar Wrapper - Expands to edge-to-edge transparent at top on Home hero, becomes rounded white pill when scrolled or on inner pages */}
        <div
          className={`max-w-[1440px] mx-auto transition-all duration-500 flex items-center justify-between gap-4 ${
            isSolidNav
              ? 'bg-white/95 backdrop-blur-xl rounded-full shadow-2xl border border-slate-200/90 text-slate-900 px-5 sm:px-8 h-14 sm:h-16 lg:h-18 ring-1 ring-black/5'
              : 'bg-transparent text-white px-4 sm:px-6 lg:px-10 h-16 sm:h-20 lg:h-24'
          }`}
        >

          {/* LEFT SIDE: First 3 Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 2xl:gap-7 shrink-0 whitespace-nowrap pl-4 xl:pl-6">

            {/* About Us */}
            <Link
              href="/about-us"
              className={`text-xs xl:text-[13px] 2xl:text-sm font-bold transition-colors py-1 relative whitespace-nowrap ${
                pathname === '/about-us'
                  ? (isSolidNav ? 'text-[#7b002c]' : 'text-white font-extrabold')
                  : (isSolidNav ? 'text-slate-800 hover:text-[#7b002c]' : 'text-white/90 hover:text-white')
              }`}
            >
              <span>About Us</span>
            </Link>

            {/* Faisal Hills Blocks Dropdown */}
            <div className="relative group py-6">
              <Link
                href="/faisal-hills-blocks"
                className={`text-xs xl:text-[13px] 2xl:text-sm font-bold transition-colors flex items-center gap-1.5 py-1 whitespace-nowrap ${
                  pathname.startsWith('/blocks') || pathname === '/faisal-hills-blocks'
                    ? (isSolidNav ? 'text-[#7b002c]' : 'text-white font-extrabold')
                    : (isSolidNav ? 'text-slate-800 hover:text-[#7b002c]' : 'text-white/90 hover:text-white')
                }`}
              >
                <span>Faisal Hills Blocks</span>
                <ChevronDown className={`w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200 ${isSolidNav ? 'text-slate-500 group-hover:text-[#7b002c]' : 'text-white/80'}`} />
              </Link>

              {/* Mega Dropdown */}
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto w-[740px]">
                <div className="bg-white/95 backdrop-blur-2xl text-slate-900 border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden ring-1 ring-black/5 p-6 space-y-4">

                  {/* Dropdown Header */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/80">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#7b002c] text-white flex items-center justify-center shadow-md">
                        <Layers className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                          Faisal Hills Blocks & Sectors
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium block">
                          Official Layouts, Plot Inventory & Verified Rates
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#7b002c] bg-[#7b002c]/10 border border-[#7b002c]/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      RDA Approved
                    </span>
                  </div>

                  {/* 2-Column Layout */}
                  <div className="grid grid-cols-2 gap-5">

                    {/* Column 1: Developed Blocks */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between px-2 mb-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                          DEVELOPED BLOCKS
                        </span>
                        <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full">
                          Possession Ready
                        </span>
                      </div>

                      <div className="space-y-1 max-h-[290px] overflow-y-auto pr-1">
                        {blocksData.filter(b => b.category === 'developed').map((block) => (
                          <Link
                            key={block.id}
                            href={`/blocks/${block.slug}`}
                            className="group/item flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 hover:bg-[#7b002c] border border-slate-200/80 hover:border-[#7b002c] transition-all duration-300 hover:translate-x-1 shadow-xs"
                          >
                            <div className="w-8 h-8 rounded-xl bg-[#7b002c]/10 group-hover/item:bg-white text-[#7b002c] group-hover/item:text-[#7b002c] font-bold text-xs flex items-center justify-center shrink-0 transition-colors shadow-xs">
                              {block.name.replace('Block ', '').charAt(0)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-xs font-bold text-slate-900 group-hover/item:text-white transition-colors truncate">
                                  {block.name}
                                </span>
                                <span className="text-[9px] text-slate-500 group-hover/item:text-white/80 shrink-0 font-medium">
                                  {block.status || 'Ready'}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-500 group-hover/item:text-white/80 truncate mt-0.5">
                                {block.subtitle || 'Residential & Commercial Plots'}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: Projects & Commercial */}
                    <div className="space-y-1.5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between px-2 mb-2">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            PROJECTS & COMMERCIAL
                          </span>
                          <span className="text-[9px] font-bold text-amber-800 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full">
                            High ROI
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          {blocksData.filter(b => b.category !== 'developed').map((block) => (
                            <Link
                              key={block.id}
                              href={`/blocks/${block.slug}`}
                              className="group/item flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 hover:bg-[#7b002c] border border-slate-200/80 hover:border-[#7b002c] transition-all duration-300 hover:translate-x-1 shadow-xs"
                            >
                              <div className="w-8 h-8 rounded-xl bg-amber-500/10 group-hover/item:bg-white text-amber-600 group-hover/item:text-[#7b002c] font-bold text-xs flex items-center justify-center shrink-0 transition-colors shadow-xs">
                                <Sparkles className="w-4 h-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs font-bold text-slate-900 group-hover/item:text-white transition-colors truncate">
                                    {block.name}
                                  </span>
                                  <span className="text-[9px] bg-amber-100 text-amber-800 group-hover/item:bg-white/20 group-hover/item:text-white px-2 py-0.5 rounded-full font-semibold shrink-0">
                                    {block.category === 'upcoming' ? 'Upcoming' : 'Commercial'}
                                  </span>
                                </div>
                                <p className="text-[10px] text-slate-500 group-hover/item:text-white/80 truncate mt-0.5">
                                  {block.subtitle || 'Prime Real Estate Investment'}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Interactive Master Plan Banner */}
                      <Link
                        href="/master-plan"
                        className="group/map mt-3 p-3.5 rounded-2xl bg-gradient-to-r from-[#7b002c] to-[#9e1245] border border-[#7b002c]/20 text-white flex items-center justify-between gap-2 shadow-lg transition-all duration-300 hover:scale-[1.02]"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                            <Layers className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <span className="text-xs font-bold block leading-tight">Interactive Master Plan</span>
                            <span className="text-[10px] text-white/80 block">Explore Block Map & Plot Inventory</span>
                          </div>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-white text-[#7b002c] flex items-center justify-center shrink-0 group-hover/map:translate-x-1 transition-transform">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </Link>

                    </div>

                  </div>

                </div>
              </div>
            </div>
          </nav>

          {/* CENTER LOGO: FAISALTOWN GROUP | FT */}
          <Link href="/" className="flex items-center shrink-0 group whitespace-nowrap gap-2 sm:gap-3 px-1 xl:px-4">
            {/* Text Part */}
            <div className="flex flex-col leading-none select-none items-end">
              <span className={`text-[13px] sm:text-[16px] xl:text-[18px] font-bold tracking-[0.2em] sm:tracking-[0.25em] transition-colors duration-300 ${isSolidNav ? 'text-[#7b002c]' : 'text-white'}`} style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                FAISALTOWN
              </span>
              <span className={`text-[9px] sm:text-[10px] xl:text-[12px] font-semibold tracking-[0.3em] sm:tracking-[0.35em] mt-[2px] transition-colors duration-300 ${isSolidNav ? 'text-[#7b002c]/90' : 'text-white/90'}`} style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                GROUP
              </span>
            </div>
            {/* Vertical Separator */}
            <div className={`w-[1.5px] h-6 sm:h-8 block transition-colors duration-300 ${isSolidNav ? 'bg-[#7b002c]/20' : 'bg-white/30'}`}></div>
            {/* FT Monogram */}
            <div className="relative flex items-center justify-center" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
              <span className={`text-[28px] sm:text-[36px] xl:text-[42px] font-bold leading-none tracking-tight select-none transition-colors duration-300 ${isSolidNav ? 'text-[#7b002c]' : 'text-white'}`} style={{ letterSpacing: '-0.05em' }}>
                F T
              </span>
            </div>
          </Link>

          {/* RIGHT SIDE: Remaining Navigation Links & Hotline Pill */}
          <div className="hidden xl:flex items-center gap-6 2xl:gap-8 shrink-0 whitespace-nowrap pr-4 xl:pr-6">

            {/* Highrise Dropdown */}
            <div className="relative group py-6">
              <button
                type="button"
                className={`text-xs xl:text-[13px] 2xl:text-sm font-bold transition-colors flex items-center gap-1.5 py-1 whitespace-nowrap ${
                  pathname === '/blocks/faisal-jewel-islamabad'
                    ? (isSolidNav ? 'text-[#7b002c]' : 'text-white font-extrabold')
                    : (isSolidNav ? 'text-slate-800 hover:text-[#7b002c]' : 'text-white/90 hover:text-white')
                }`}
              >
                <span>Highrise</span>
                <ChevronDown className={`w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200 ${isSolidNav ? 'text-slate-500 group-hover:text-[#7b002c]' : 'text-white/80'}`} />
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto w-[320px]">
                <div className="bg-white/95 backdrop-blur-2xl text-slate-900 border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden ring-1 ring-black/5 p-5 space-y-3">
                  <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-200/80">
                    <Building2 className="w-4 h-4 text-[#7b002c]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Highrise Projects
                    </span>
                  </div>
                  <Link
                    href="/blocks/faisal-jewel-islamabad"
                    className="group/item flex items-center gap-3 p-3 rounded-2xl bg-slate-50 hover:bg-[#7b002c] border border-slate-200/80 hover:border-[#7b002c] transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#7b002c]/10 group-hover/item:bg-white text-[#7b002c] group-hover/item:text-[#7b002c] flex items-center justify-center shrink-0 transition-colors">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold text-slate-900 group-hover/item:text-white block">
                        Faisal Jewel Tower
                      </span>
                      <p className="text-[10px] text-slate-500 group-hover/item:text-white/80 truncate leading-tight mt-0.5">
                        27-Story Ultra-Luxury High-Rise
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Commercial */}
            <Link
              href="/faisal-hills-commercial"
              className={`text-xs xl:text-[13px] 2xl:text-sm font-bold transition-colors py-1 relative whitespace-nowrap ${
                pathname === '/faisal-hills-commercial'
                  ? (isSolidNav ? 'text-[#7b002c]' : 'text-white font-extrabold')
                  : (isSolidNav ? 'text-slate-800 hover:text-[#7b002c]' : 'text-white/90 hover:text-white')
              }`}
            >
              <span>Faisal Hills Commercial</span>
            </Link>

            {/* Payment Plans */}
            <Link
              href="/faisal-hills-payment-plan"
              className={`text-xs xl:text-[13px] 2xl:text-sm font-bold transition-colors py-1 relative whitespace-nowrap ${
                pathname === '/faisal-hills-payment-plan'
                  ? (isSolidNav ? 'text-[#7b002c]' : 'text-white font-extrabold')
                  : (isSolidNav ? 'text-slate-800 hover:text-[#7b002c]' : 'text-white/90 hover:text-white')
              }`}
            >
              <span>Payment Plans</span>
            </Link>

            {/* Action Button - Phone Hotline Pill */}
            <a
              href="tel:+923044811717"
              className={`inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap ${
                isSolidNav
                  ? 'bg-[#7b002c] hover:bg-[#9e1245] text-white'
                  : 'bg-[#7b002c] hover:bg-[#9e1245] text-white border border-white/10'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-white" />
              <span>+92 304 4811 717</span>
            </a>

          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`xl:hidden p-2.5 sm:p-3 rounded-full flex items-center justify-center transition-all active:scale-95 shrink-0 z-50 cursor-pointer ${
              isSolidNav
                ? 'text-[#7b002c] bg-slate-100 hover:bg-slate-200 border border-slate-200'
                : 'text-white bg-white/10 hover:bg-white/20 border border-white/20'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className={`w-5 h-5 sm:w-6 sm:h-6 ${isSolidNav ? 'text-[#7b002c]' : 'text-white'}`} />
            ) : (
              <Menu className={`w-5 h-5 sm:w-6 sm:h-6 ${isSolidNav ? 'text-[#7b002c]' : 'text-white'}`} />
            )}
          </button>

        </div>
      </header>

      {/* Mobile Full-Screen Slide Drawer - Mounted at root to avoid parent CSS transform clipping */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-md flex flex-col justify-start animate-fadeIn">
          <div className="bg-white text-slate-900 shadow-2xl flex flex-col max-h-[92vh] rounded-b-3xl overflow-hidden border-b-4 border-[#7b002c]">
            
            {/* Drawer Top Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                <div className="flex flex-col leading-none items-end">
                  <span className="text-sm font-bold tracking-[0.2em] text-[#7b002c]" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                    FAISALTOWN
                  </span>
                  <span className="text-[9px] font-semibold tracking-[0.3em] text-[#7b002c]/90 mt-[1px]" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                    GROUP
                  </span>
                </div>
                <div className="w-[1.5px] h-6 bg-[#7b002c]/20" />
                <span className="text-2xl font-bold leading-none text-[#7b002c]" style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: '-0.05em' }}>
                  F T
                </span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-[#7b002c] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5 text-[#7b002c]" />
              </button>
            </div>

            {/* Scrollable Nav Links */}
            <div className="p-6 space-y-2 overflow-y-auto max-h-[calc(92vh-150px)]">

              <Link
                href="/about-us"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm font-bold py-3 px-4 rounded-xl text-slate-800 hover:bg-rose-50 hover:text-[#7b002c] transition-colors"
              >
                <span>About Us</span>
                <span className="text-xs text-slate-400 font-bold">→</span>
              </Link>

              {/* Blocks Collapsible */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileBlocksOpen(!mobileBlocksOpen)}
                  className="w-full flex items-center justify-between text-sm font-bold py-3 px-4 rounded-xl text-slate-800 hover:bg-rose-50 hover:text-[#7b002c] transition-colors"
                >
                  <span>Faisal Hills Blocks</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${mobileBlocksOpen ? 'rotate-180 text-[#7b002c]' : ''}`} />
                </button>

                {mobileBlocksOpen && (
                  <div className="pl-3 py-2 space-y-1 bg-slate-50 rounded-2xl my-1 border border-slate-200/80">
                    <Link
                      href="/faisal-hills-blocks"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 px-3 text-xs font-bold text-[#7b002c] hover:underline border-b border-slate-200 mb-1"
                    >
                      Explore All Blocks Overview →
                    </Link>
                    {blocksData.map((block) => (
                      <Link
                        key={block.id}
                        href={`/blocks/${block.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between text-xs font-medium text-slate-700 py-2 px-3 hover:text-[#7b002c] rounded-xl hover:bg-white transition-colors"
                      >
                        <span>{block.name}</span>
                        <span className="text-[10px] text-slate-400 font-semibold">{block.status}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Highrise Collapsible */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileHighriseOpen(!mobileHighriseOpen)}
                  className="w-full flex items-center justify-between text-sm font-bold py-3 px-4 rounded-xl text-slate-800 hover:bg-rose-50 hover:text-[#7b002c] transition-colors"
                >
                  <span>Highrise Projects</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${mobileHighriseOpen ? 'rotate-180 text-[#7b002c]' : ''}`} />
                </button>

                {mobileHighriseOpen && (
                  <div className="pl-3 py-2 space-y-1 bg-slate-50 rounded-2xl my-1 border border-slate-200/80">
                    <Link
                      href="/blocks/faisal-jewel-islamabad"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between text-xs font-medium text-slate-700 py-2 px-3 hover:text-[#7b002c] rounded-xl hover:bg-white transition-colors"
                    >
                      <span className="font-bold text-[#7b002c]">Faisal Jewel Tower</span>
                      <span className="text-[10px] text-slate-500">27-Story High-Rise</span>
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/faisal-hills-commercial"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm font-bold py-3 px-4 rounded-xl text-slate-800 hover:bg-rose-50 hover:text-[#7b002c] transition-colors"
              >
                <span>Faisal Hills Commercial</span>
                <span className="text-xs text-slate-400 font-bold">→</span>
              </Link>

              <Link
                href="/faisal-hills-payment-plan"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm font-bold py-3 px-4 rounded-xl text-slate-800 hover:bg-rose-50 hover:text-[#7b002c] transition-colors"
              >
                <span>Payment Plans 2026</span>
                <span className="text-xs text-slate-400 font-bold">→</span>
              </Link>

              <Link
                href="/master-plan"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm font-bold py-3 px-4 rounded-xl text-slate-800 hover:bg-rose-50 hover:text-[#7b002c] transition-colors"
              >
                <span>Master Plan Blueprint</span>
                <span className="text-xs text-slate-400 font-bold">→</span>
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm font-bold py-3 px-4 rounded-xl text-slate-800 hover:bg-rose-50 hover:text-[#7b002c] transition-colors"
              >
                <span>Contact Sales Desk</span>
                <span className="text-xs text-slate-400 font-bold">→</span>
              </Link>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 grid grid-cols-2 gap-3">
              <a
                href="tel:+923313339997"
                className="py-3 text-xs font-bold text-white bg-[#7b002c] hover:bg-[#9e1245] rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>

              <a
                href="https://wa.me/923044811717"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>
          
          {/* Backdrop click to close */}
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      <LeadModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} />
    </>
  );
}
