'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Camera, MapPin, Sparkles, Image as ImageIcon, ArrowLeft, ArrowRight,
  Maximize2, X, ChevronRight, MessageSquare, PhoneCall, Building2, CheckCircle2
} from 'lucide-react';
import { initialGalleryData, fetchGallery, type GalleryItem, defaultContactInfo, defaultSocialLinks, formatWhatsAppUrl } from '@/data/faisalHillsData';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function GalleryClient() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(initialGalleryData);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetchGallery()
      .then(data => {
        if (data && data.length > 0) setGalleryItems(data);
      })
      .catch(console.error);

    const handleUpdate = () => {
      fetchGallery().then(data => {
        if (data && data.length > 0) setGalleryItems(data);
      }).catch(console.error);
    };

    window.addEventListener('faisal_gallery_updated', handleUpdate);
    return () => window.removeEventListener('faisal_gallery_updated', handleUpdate);
  }, []);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add('All');
    galleryItems.forEach(item => {
      if (item.category) cats.add(item.category);
    });
    return Array.from(cats);
  }, [galleryItems]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return galleryItems;
    return galleryItems.filter(item => item.category === activeCategory);
  }, [galleryItems, activeCategory]);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20 font-sans selection:bg-[#7b002c] selection:text-white">
      
      {/* Header Banner */}
      <section className="bg-[#4c0215] text-white pt-28 pb-16 px-6 lg:px-12 border-b border-[#7b002c] relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-200">
            <Link href="/" className="hover:text-white transition flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <span>/</span>
            <span className="text-amber-300">Photo Gallery</span>
          </div>

          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400 block">
              FAISAL HILLS REALITY IN PICTURES
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              On-Site Development &amp; Photo Gallery
            </h1>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Authentic high-resolution photography showcasing the monumental main gate, carpeted boulevards, landscaped parks, commercial towers, and on-ground development progress in Faisal Hills Islamabad.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10 space-y-8">
        
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#7b002c] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, idx) => (
            <ScrollReveal key={item.id || idx} direction="up" delay={idx * 60}>
              <div 
                onClick={() => setLightboxImage(item)}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer"
              >
                <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                  <img
                    src={item.image || '/images/gallery/arc-main-gate.webp'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                  {item.category && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-slate-950/80 text-white text-[10px] font-bold uppercase tracking-wider rounded-full backdrop-blur-xs shadow-md border border-white/10">
                      {item.category}
                    </span>
                  )}

                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-8 h-8 rounded-full bg-white/90 text-slate-800 flex items-center justify-center shadow-md backdrop-blur-xs hover:bg-white">
                      <Maximize2 className="w-4 h-4 text-slate-800" />
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-[#7b002c] transition-colors">
                      {item.title}
                    </h3>
                    {item.desc && (
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#7b002c]">
                    <span>Click to view full size</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#7b002c]">
              Want to Experience Faisal Hills in Person?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Schedule a guided on-site tour with our verified property advisory desk to inspect sectors, roads, and upcoming project landmarks firsthand.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={formatWhatsAppUrl(defaultSocialLinks.whatsapp, 'Hi, I would like to schedule a site visit to inspect Faisal Hills development.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Book Site Visit</span>
            </a>
            <Link
              href="/contact"
              className="px-6 py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Contact Sales Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </main>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-950 rounded-3xl overflow-hidden border border-white/20 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[75vh] min-h-[300px] flex items-center justify-center bg-black">
              <img
                src={lightboxImage.image || '/images/gallery/arc-main-gate.webp'}
                alt={lightboxImage.title}
                className="max-h-[75vh] w-auto max-w-full object-contain mx-auto"
              />
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition cursor-pointer border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-slate-900 text-white space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full">
                  {lightboxImage.category}
                </span>
                <h3 className="font-serif font-bold text-lg text-white">
                  {lightboxImage.title}
                </h3>
              </div>
              {lightboxImage.desc && (
                <p className="text-xs text-slate-300">
                  {lightboxImage.desc}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
