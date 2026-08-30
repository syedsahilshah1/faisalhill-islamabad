import React from 'react';
import type { Metadata } from 'next';
import { fetchSeo } from '@/data/faisalHillsData';
import { JsonLd, generateBreadcrumbSchema, generateRealEstateListingSchema } from '@/components/seo/JsonLd';
import PlotsClient from './PlotsClient';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://faisalhills.com.pk';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeo('plots');

  const title = seo?.title || 'Faisal Hills Plots for Sale 2026 – Prices, Inventory & Map';
  const description = seo?.meta_description || 'Search verified 5, 8, 10, 14 Marla & 1, 2 Kanal residential & commercial plots for sale in Faisal Hills Islamabad / Taxila. Check live demand rates, plot dimensions, and installment options.';
  const canonical = seo?.canonical_url || `${BASE_URL}/plots`;
  const ogImg = seo?.og_image || `${BASE_URL}/images/imgi_38_Faisal-Hills-site-home-page-header.webp`;
  const keywords = seo?.keywords 
    ? seo.keywords.split(',').map((k: string) => k.trim()) 
    : ['Faisal Hills Plots for Sale', '5 Marla plot Faisal Hills', '10 Marla plot Faisal Hills', '1 Kanal plot Faisal Hills', 'Faisal Hills plot prices', 'Faisal Hills commercial plots'];

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

export default function PlotsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: BASE_URL },
    { name: 'Plots for Sale', url: `${BASE_URL}/plots` },
  ]);

  const realEstateSchema = generateRealEstateListingSchema({
    name: 'Faisal Hills Plot Inventory 2026',
    description: 'Verified residential & commercial plots for sale in Faisal Hills Islamabad & Taxila with RDA approval.',
    url: `${BASE_URL}/plots`,
    image: `${BASE_URL}/images/imgi_38_Faisal-Hills-site-home-page-header.webp`,
    priceMin: 3500000,
    priceMax: 120000000,
    priceCurrency: 'PKR',
    address: 'Main GT Road (N-5), Taxila / Rawalpindi',
  });

  return (
    <>
      <JsonLd data={[breadcrumbSchema, realEstateSchema]} />
      <PlotsClient />
    </>
  );
}
