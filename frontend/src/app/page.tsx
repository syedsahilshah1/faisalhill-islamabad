import React from 'react';
import type { Metadata } from 'next';
import { fetchSeo } from '@/data/faisalHillsData';
import HomeClient from './HomeClient';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://faisalhillsislamabadfh.com';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeo('home');

  const title = seo?.title || 'Faisal Hills Islamabad – RDA Approved Plots for Sale & Rates 2026';
  const description = seo?.meta_description || 'Explore RDA-approved residential & commercial plots in Faisal Hills GT Road Taxila. View interactive master map, block rates & booking options.';
  const canonical = seo?.canonical_url || BASE_URL;
  const ogImg = seo?.og_image || `${BASE_URL}/images/faisal-hills-site-header.webp`;
  const keywords = seo?.keywords 
    ? seo.keywords.split(',').map((k: string) => k.trim()) 
    : ['Faisal Hills Islamabad', 'Faisal Hills Taxila', 'Faisal Hills Plots for sale', 'Faisal Hills Payment Plan 2026', 'Zedem International', 'Chaudhry Abdul Majeed', 'Faisal Hills RDA NOC'];

  return {
    title: title,
    description: description,
    keywords: keywords,
    alternates: {
      canonical: canonical,
    },
    robots: {
      index: seo?.robots_index !== false,
      follow: seo?.robots_follow !== false,
    },
    openGraph: {
      title: seo?.og_title || title,
      description: seo?.og_description || description,
      url: canonical,
      type: 'website',
      images: [{ url: ogImg, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.twitter_title || seo?.og_title || title,
      description: seo?.twitter_description || seo?.og_description || description,
      images: [seo?.twitter_image || ogImg],
    },
  };
}

export default function HomePage() {
  return <HomeClient />;
}
