import React from 'react';
import type { Metadata } from 'next';
import { fetchSeo } from '@/data/faisalHillsData';
import { JsonLd, generateBreadcrumbSchema } from '@/components/seo/JsonLd';
import MasterPlanClient from './MasterPlanClient';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://faisalhillsislamabadfh.com';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeo('master-plan');

  const title = seo?.title || 'Faisal Hills Master Plan Map – High-Res Interactive Map';
  const description = seo?.meta_description || 'Explore the official high-resolution Faisal Hills master plan map. Zoom up to 1200% into Block A, Block B, Block C, Block D, Executive Block & Prime Block roads, parks, and plots.';
  const canonical = seo?.canonical_url || `${BASE_URL}/master-plan`;
  const ogImg = seo?.og_image || `${BASE_URL}/images/imgi_38_Faisal-Hills-site-home-page-header.webp`;
  const keywords = seo?.keywords 
    ? seo.keywords.split(',').map((k: string) => k.trim()) 
    : ['Faisal Hills Master Plan', 'Faisal Hills Map', 'Faisal Hills High Resolution Map', 'Faisal Hills Executive Block Map', 'Faisal Hills Block A Map', 'Faisal Hills PDF Map'];

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

export default function MasterPlanPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: BASE_URL },
    { name: 'Master Plan', url: `${BASE_URL}/master-plan` },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumbSchema]} />
      <MasterPlanClient />
    </>
  );
}
