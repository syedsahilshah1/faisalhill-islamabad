'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Calendar, User, Clock, ArrowLeft, Send, MessageSquare, 
  HelpCircle, ChevronDown, CheckCircle, Mail, Phone, BookOpen
} from 'lucide-react';
import { submitLead, BlogItem } from '@/data/faisalHillsData';

interface BlogDetailClientProps {
  blog: BlogItem;
  recentBlogs: BlogItem[];
}

export default function BlogDetailClient({ blog, recentBlogs }: BlogDetailClientProps) {
  const router = useRouter();

  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form states
  const [consultName, setConsultName] = useState('');
  const [consultPhone, setConsultPhone] = useState('');
  const [consultLocation, setConsultLocation] = useState('');
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  const [sidebarName, setSidebarName] = useState('');
  const [sidebarPhone, setSidebarPhone] = useState('');
  const [sidebarEmail, setSidebarEmail] = useState('');
  const [sidebarSubmitted, setSidebarSubmitted] = useState(false);

  // Handle consultation form submit
  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultName || !consultPhone || !consultLocation || !blog) return;

    const leadData = {
      name: consultName,
      phone: consultPhone,
      interest: `Consultation from Article: ${blog.title}`,
      message: `Preferred Location: ${consultLocation}`
    };

    try {
      await submitLead(leadData);

      if (typeof window !== 'undefined') {
        const existingLeads = JSON.parse(localStorage.getItem('faisal_leads_data') || '[]');
        const newLead = {
          id: `lead-${Date.now()}`,
          name: consultName,
          phone: consultPhone,
          interest: `Consultation: ${blog.title}`,
          message: `Location: ${consultLocation}`,
          submittedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        localStorage.setItem('faisal_leads_data', JSON.stringify([newLead, ...existingLeads]));
        window.dispatchEvent(new Event('faisal_leads_updated'));
      }

      setConsultSubmitted(true);

      const waText = encodeURIComponent(
        `Hello Faisal Hills Team!\n\nI am requesting a Free Consultation.\nName: ${consultName}\nPhone: ${consultPhone}\nLocation: ${consultLocation}\nArticle: ${blog.title}`
      );
      setTimeout(() => {
        window.open(`https://wa.me/923331113177?text=${waText}`, '_blank');
        setConsultName('');
        setConsultPhone('');
        setConsultLocation('');
        setConsultSubmitted(false);
      }, 600);

    } catch (err) {
      console.error("Failed to submit consultation lead:", err);
      alert("Failed to submit inquiry. Please try again.");
    }
  };

  // Handle sidebar form submit
  const handleSidebarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sidebarName || !sidebarPhone || !sidebarEmail || !blog) return;

    const leadData = {
      name: sidebarName,
      phone: sidebarPhone,
      interest: `Message from Article Sidebar: ${blog.title}`,
      message: `Email: ${sidebarEmail}`
    };

    try {
      await submitLead(leadData);

      if (typeof window !== 'undefined') {
        const existingLeads = JSON.parse(localStorage.getItem('faisal_leads_data') || '[]');
        const newLead = {
          id: `lead-${Date.now()}`,
          name: sidebarName,
          phone: sidebarPhone,
          interest: `Sidebar Inquiry: ${blog.title}`,
          message: `Email: ${sidebarEmail}`,
          submittedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        localStorage.setItem('faisal_leads_data', JSON.stringify([newLead, ...existingLeads]));
        window.dispatchEvent(new Event('faisal_leads_updated'));
      }

      setSidebarSubmitted(true);

      const waText = encodeURIComponent(
        `Hello Faisal Hills Team!\n\nI want to send you a message:\nName: ${sidebarName}\nPhone: ${sidebarPhone}\nEmail: ${sidebarEmail}\nArticle: ${blog.title}`
      );
      setTimeout(() => {
        window.open(`https://wa.me/923331113177?text=${waText}`, '_blank');
        setSidebarName('');
        setSidebarPhone('');
        setSidebarEmail('');
        setSidebarSubmitted(false);
      }, 600);

    } catch (err) {
      console.error("Failed to submit sidebar lead:", err);
      alert("Failed to submit message. Please try again.");
    }
  };

  return (
    <div className="bg-[#fff8f6] min-h-screen pb-16 font-sans">
      
      {/* Top Header Banner */}
      <section className="bg-gradient-to-r from-[#4c050d] via-[#7b002c] to-[#0d0105] text-white pt-28 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 relative border-b border-[#7b002c]/20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-4">
          
          <Link 
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Blogs Directory</span>
          </Link>

          <span className="text-[10px] font-bold text-[#fed65b] tracking-[0.2em] uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-full inline-block backdrop-blur-xs">
            {blog.category}
          </span>
          
          <h1 className="font-serif font-black text-2xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight max-w-5xl">
            {blog.h1 || blog.title}
          </h1>

          {/* Author metadata */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-amber-400 shrink-0" />
              <span>By {blog.author}</span>
            </span>
            <span className="hidden sm:inline w-1 h-1 bg-slate-500 rounded-full" />
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                {blog.createdAt 
                  ? new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                  : 'August 19, 2026'
                }
              </span>
            </span>
            <span className="hidden sm:inline w-1 h-1 bg-slate-500 rounded-full" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{blog.readTime}</span>
            </span>
          </div>

        </div>
      </section>

      {/* Main Layout Grid */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* LEFT COLUMN: Main Article, FAQs, Consultation Form */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main Content Card */}
          <div className="bg-white p-5 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 sm:space-y-8">
            {/* Cover Image */}
            {blog.imageUrl && (
              <div className="h-60 sm:h-96 rounded-2xl overflow-hidden shadow-sm bg-slate-900 shrink-0">
                <img
                  src={blog.imageUrl}
                  alt={blog.imageAlt || blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Content Area */}
            <div 
              className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-800 leading-relaxed space-y-4 blog-article-body"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Keywords/Tags */}
            {blog.keywords && (
              <div className="pt-6 border-t border-slate-100 space-y-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Tagged Keywords</span>
                <div className="flex flex-wrap gap-1.5">
                  {blog.keywords.split(',').map((tag) => (
                    <span 
                      key={tag.trim()} 
                      className="bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-semibold px-2.5 py-1 rounded-md"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Frequently Asked Questions */}
          {blog.faqs && blog.faqs.length > 0 && (
            <div className="bg-white p-6 sm:p-9 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center font-bold shrink-0">
                  <HelpCircle className="w-5 h-5 text-[#7b002c]" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 leading-tight">
                    Frequently Asked Questions
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Quick answers regarding this article & Faisal Hills real estate.
                  </p>
                </div>
              </div>
              
              <div className="space-y-3.5">
                {blog.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                        isOpen 
                          ? 'border-[#7b002c]/40 bg-gradient-to-br from-rose-50/40 via-white to-white shadow-md' 
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 transition cursor-pointer group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-[11px] font-bold shrink-0 transition-colors ${
                            isOpen 
                              ? 'bg-[#7b002c] text-white shadow-xs' 
                              : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                          }`}>
                            Q{idx + 1}
                          </span>
                          <span className={`font-serif font-bold text-sm sm:text-base transition-colors leading-snug ${
                            isOpen ? 'text-[#7b002c]' : 'text-slate-900 group-hover:text-[#7b002c]'
                          }`}>
                            {faq.question}
                          </span>
                        </div>

                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen 
                            ? 'bg-[#7b002c] text-white rotate-180 shadow-xs' 
                            : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                        }`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans border-t border-rose-100/60 animate-fadeIn">
                          <div className="pl-10 text-slate-650 leading-relaxed">
                            {faq.answer}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Get Free Consultation Form */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="text-center">
              <h4 className="font-serif font-black text-xl sm:text-2xl text-[#7b002c] leading-tight">
                Get <span className="text-[#fed65b] bg-[#7b002c]/5 px-2.5 py-0.5 rounded-lg border border-[#fed65b]/20">Free</span> Consultation
              </h4>
            </div>

            {consultSubmitted ? (
              <div className="py-6 text-center space-y-3 animate-fadeIn">
                <CheckCircle className="w-12 h-12 text-[#7b002c] mx-auto" />
                <h5 className="font-serif font-bold text-base text-slate-900">Consultation Form Submitted</h5>
                <p className="text-slate-500 text-xs max-w-xs mx-auto">Redirecting to WhatsApp to coordinate with our Faisal Hills consultant...</p>
              </div>
            ) : (
              <form onSubmit={handleConsultationSubmit} className="space-y-5 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muhammad"
                      value={consultName}
                      onChange={(e) => setConsultName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c] font-semibold transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +966..."
                      value={consultPhone}
                      onChange={(e) => setConsultPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c] font-semibold transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">Location</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jeddah"
                      value={consultLocation}
                      onChange={(e) => setConsultLocation(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c] font-semibold transition"
                    />
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    Send Request
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: Sidebar (Recent Blogs, Send Us A Message Card) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          
          {/* Recent Blogs List Widget */}
          {recentBlogs.length > 0 && (
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <h4 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#7b002c]" />
                <span>Recent Posts</span>
              </h4>
              
              <div className="space-y-4">
                {recentBlogs.map((rBlog) => (
                  <Link 
                    key={rBlog.id}
                    href={`/blogs/${rBlog.slug}`}
                    className="flex gap-3.5 group cursor-pointer"
                  >
                    <div className="w-16 h-12 bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-200 relative">
                      <img 
                        src={rBlog.imageUrl} 
                        alt={rBlog.imageAlt || rBlog.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="space-y-1">
                      <h5 className="font-serif font-bold text-xs text-slate-800 group-hover:text-[#7b002c] transition-colors line-clamp-2 leading-snug">
                        {rBlog.title}
                      </h5>
                      <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">
                        {rBlog.createdAt 
                          ? new Date(rBlog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                          : 'August 19, 2026'
                        }
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Send Us A Message Sticky Widget */}
          <div className="bg-white rounded-3xl border border-slate-200 border-t-4 border-t-[#fed65b] shadow-md p-6 space-y-5 animate-fadeIn">
            <div className="text-center space-y-1">
              <h4 className="font-serif font-bold text-lg text-slate-900">
                Send Us A Message
              </h4>
              <p className="text-slate-500 text-[11px]">
                Have questions? Send an instant message and connect with our representative.
              </p>
            </div>

            {sidebarSubmitted ? (
              <div className="py-4 text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-[#7b002c] mx-auto" />
                <h5 className="font-serif font-bold text-sm text-slate-950">Inquiry Received</h5>
                <p className="text-slate-500 text-[10px]">Opening WhatsApp chat with our Faisal Hills sales representative...</p>
              </div>
            ) : (
              <form onSubmit={handleSidebarSubmit} className="space-y-4 font-sans text-xs">
                <div className="space-y-1">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={sidebarName}
                    onChange={(e) => setSidebarName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-250 rounded-xl focus:outline-none focus:border-[#7b002c] font-semibold text-slate-900 transition"
                  />
                </div>

                <div className="space-y-1">
                  <input
                    type="tel"
                    required
                    placeholder="Phone"
                    value={sidebarPhone}
                    onChange={(e) => setSidebarPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-250 rounded-xl focus:outline-none focus:border-[#7b002c] font-semibold text-slate-900 transition"
                  />
                </div>

                <div className="space-y-1">
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={sidebarEmail}
                    onChange={(e) => setSidebarEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-250 rounded-xl focus:outline-none focus:border-[#7b002c] font-semibold text-slate-900 transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold rounded-xl shadow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </section>

      {/* Inject custom styles for HTML parsed content blocks */}
      <style jsx global>{`
        .blog-article-body h2 {
          font-family: var(--font-playfair), serif;
          font-weight: 700;
          font-size: 1.35rem;
          color: #7b002c;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .blog-article-body h3 {
          font-family: var(--font-playfair), serif;
          font-weight: 700;
          font-size: 1.15rem;
          color: #9e1245;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .blog-article-body p {
          margin-bottom: 1rem;
          line-height: 1.7;
        }
        .blog-article-body ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .blog-article-body ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .blog-article-body a {
          color: #7b002c;
          text-decoration: underline;
          font-weight: bold;
        }
        .blog-article-body img {
          max-width: 100%;
          height: auto;
          border-radius: 1rem;
          margin: 1.5rem 0;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
      `}</style>

    </div>
  );
}
