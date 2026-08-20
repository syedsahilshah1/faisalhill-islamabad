'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Calendar, User, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { fetchBlogs, BlogItem } from '@/data/faisalHillsData';

const CATEGORIES = ['All', 'Market Update', 'Development Update', 'Investment Guide', 'Project Launch'];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchBlogs()
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load blogs:", err);
        setLoading(false);
      });
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.keywords && blog.keywords.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = 
      selectedCategory === 'All' || 
      blog.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#fff8f6] min-h-screen pb-16 font-sans">
      
      {/* ── Editorial Header Banner ── */}
      <section className="bg-gradient-to-r from-[#4c050d] via-[#7b002c] to-[#0d0105] text-white py-16 sm:py-24 relative overflow-hidden border-b border-[#7b002c]/30">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fed65b_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 text-center space-y-4">
          <span className="text-[10px] font-bold text-[#fed65b] tracking-[0.25em] uppercase bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full inline-block backdrop-blur-xs">
            Faisal Hills Portal Insights
          </span>
          
          <h1 className="font-serif font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none max-w-4xl mx-auto">
            Latest News & Real Estate Guides
          </h1>
          
          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-medium leading-relaxed">
            Stay updated with RDA approvals, development status reports, investment potentials, and comprehensive purchasing guides for Faisal Hills.
          </p>
        </div>
      </section>

      {/* ── Search & Filter Section ── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          
          {/* Search Box */}
          <div className="lg:col-span-4 relative">
            <input
              type="text"
              placeholder="Search articles by title, content or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7b002c] transition"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Category Tabs */}
          <div className="lg:col-span-8 flex flex-wrap gap-2 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition duration-200 whitespace-nowrap cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-[#7b002c] text-white border-[#7b002c] shadow-md shadow-[#7b002c]/10'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ── Blogs Grid Layout ── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12">
        
        {loading ? (
          <div className="py-24 text-center space-y-3">
            <div className="w-12 h-12 border-4 border-[#7b002c] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-500 font-semibold text-xs">Loading articles...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 text-center max-w-xl mx-auto space-y-4">
            <BookOpen className="w-12 h-12 text-[#7b002c]/50 mx-auto" />
            <h3 className="font-serif font-bold text-lg text-slate-900">No Articles Found</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              We couldn&apos;t find any blog posts matching your search query or selected category. Try checking spelling or choosing another tag.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-4 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <article 
                key={blog.id} 
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:border-[#7b002c]/40 hover:-translate-y-1"
              >
                
                {/* Image Cover */}
                <div className="h-56 bg-slate-900 relative overflow-hidden shrink-0">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-[#7b002c] text-white text-[9px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow backdrop-blur-xs">
                    {blog.category}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    
                    {/* Metadata line */}
                    <div className="flex items-center gap-4 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          {blog.createdAt 
                            ? new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                            : 'Aug 19, 2026'
                          }
                        </span>
                      </span>
                      <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{blog.readTime}</span>
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-slate-900 line-clamp-2 leading-snug group-hover:text-[#7b002c] transition-colors">
                      {blog.title}
                    </h3>

                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                      {blog.summary}
                    </p>

                  </div>

                  {/* Read More Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600">
                      <User className="w-3.5 h-3.5 text-[#7b002c]/75" />
                      <span>{blog.author}</span>
                    </span>

                    <Link 
                      href={`/blogs/${blog.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#7b002c] group-hover:text-[#9e1245] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>

              </article>
            ))}
          </div>
        )}

      </section>

    </div>
  );
}
