import React from 'react';
import type { Metadata } from 'next';
import { fetchSeo, initialHomepageCMS } from '@/data/faisalHillsData';
import HomeClient from './HomeClient';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://faisalhillsislamabadfh.com';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeo('home');

  const title = seo?.title || 'Faisal Hills Islamabad: Plot Prices, Payment Plan & NOC Status';
  const description = seo?.meta_description || 'Faisal Hills Islamabad on GT Road, Taxila: RDA NOC status, block-by-block plot rates, 2026 payment plans and possession status, with checks before you buy.';
  const canonical = seo?.canonical_url || BASE_URL;
  const ogImg = seo?.og_image || `${BASE_URL}/images/faisal-hills-site-header.webp`;
  const keywords = seo?.keywords 
    ? seo.keywords.split(',').map((k: string) => k.trim()) 
    : [
        'Faisal Hills Islamabad',
        'Faisal Hills Taxila',
        'Faisal Hills Plots for sale',
        'Faisal Hills Payment Plan 2026',
        'Zedem International',
        'Chaudhry Abdul Majeed',
        'Faisal Hills RDA NOC',
        'Faisal Hills Block A B C Executive',
        'Faisal Jewel'
      ];

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
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Faisal Hills Islamabad Authorized Sales Desk',
    legalName: 'Faisal Hills Sales Desk',
    description:
      'Authorized sales partner for Faisal Hills Islamabad, an RDA-approved housing society on Main GT Road, Taxila, developed by Zedem International.',
    url: BASE_URL,
    telephone: '+923331113177',
    image: `${BASE_URL}/images/faisal-hills-site-header.webp`,
    priceRange: 'PKR 2,500,000 - 45,000,000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Main GT Road, Near Taxila Bypass',
      addressLocality: 'Taxila',
      addressRegion: 'Rawalpindi / Islamabad',
      addressCountry: 'PK',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (initialHomepageCMS.faqs?.items || []).map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeClient />
    </>
  );
}

