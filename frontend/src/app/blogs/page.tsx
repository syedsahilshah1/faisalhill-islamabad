import React from 'react';
import { Metadata } from 'next';
import { fetchBlogs, fetchSeo } from '@/data/faisalHillsData';
import { JsonLd, generateBreadcrumbSchema } from '@/components/seo/JsonLd';
import BlogsListingClient from './BlogsListingClient';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://faisalhillsislamabadfh.com';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeo('blogs');

  const title = seo?.title || 'Faisal Hills News, Market Updates & Real Estate Blog 2026';
  const description = seo?.meta_description || 'Stay updated with Faisal Hills development progress, NOC approvals, balloting results, market trends, and expert investment guides.';
  const canonical = seo?.canonical_url || `${BASE_URL}/blogs`;
  const ogImage = seo?.og_image || `${BASE_URL}/images/faisal-roots-school.jpg`;

  return {
    title: `${title} | Faisal Hills Real Estate`,
    description: description,
    keywords: seo?.keywords ? seo.keywords.split(',').map((k: string) => k.trim()) : ['Faisal Hills blog', 'Faisal Hills news', 'plot prices', 'real estate investment'],
    alternates: {
      canonical: canonical,
    },
    robots: {
      index: seo?.robots_index !== false,
      follow: seo?.robots_follow !== false,
      googleBot: {
        index: seo?.robots_index !== false,
        follow: seo?.robots_follow !== false,
      },
    },
    openGraph: {
      title: seo?.og_title || title,
      description: seo?.og_description || description,
      url: canonical,
      siteName: 'Faisal Hills',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.twitter_title || seo?.og_title || title,
      description: seo?.twitter_description || seo?.og_description || description,
      images: [seo?.twitter_image || ogImage],
    },
  };
}

export default async function BlogsPage() {
  const blogs = await fetchBlogs();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'News & Blog Articles', url: '/blogs' },
  ], BASE_URL);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <BlogsListingClient initialBlogs={blogs} />
    </>
  );
}
