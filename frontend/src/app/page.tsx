import React from 'react';
import type { Metadata } from 'next';
import { fetchSeo } from '@/data/faisalHillsData';
import { JsonLd, generateOrganizationSchema, generateWebSiteSchema } from '@/components/seo/JsonLd';
import HomeClient from './HomeClient';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://faisalhills.com.pk';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeo('home');

  const title = seo?.title || 'Faisal Hills Islamabad – RDA Approved Plots for Sale & Rates 2026';
  const description = seo?.meta_description || 'Explore Faisal Hills Islamabad on Main GT Road Taxila. Verified plot prices, RDA approved NOC, Executive, Prime, Block A–D payment plans, interactive maps & live inventory.';
  const canonical = seo?.canonical_url || BASE_URL;
  const ogImg = seo?.og_image || `${BASE_URL}/images/imgi_38_Faisal-Hills-site-home-page-header.webp`;
  const keywords = seo?.keywords 
    ? seo.keywords.split(',').map((k: string) => k.trim()) 
    : ['Faisal Hills Islamabad', 'Faisal Hills Taxila', 'Faisal Hills Plots for sale', 'Faisal Hills Payment Plan 2026', 'Zedem International', 'Chaudhry Abdul Majeed', 'Faisal Hills RDA NOC'];

  return {
    title: `${title} | Faisal Hills Real Estate`,
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
  const organizationSchema = generateOrganizationSchema(BASE_URL);
  const websiteSchema = generateWebSiteSchema(BASE_URL);

  return (
    <>
      <JsonLd data={[organizationSchema, websiteSchema]} />
      <HomeClient />
    </>
  );
}
