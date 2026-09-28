import React from 'react';
import type { Metadata } from 'next';
import { fetchSeo } from '@/data/faisalHillsData';
import { JsonLd } from '@/components/seo/JsonLd';
import BlocksClient from './BlocksClient';
import { auditedFaqs } from './blocksDataset';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://faisalhillsislamabadfh.com';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeo('faisal-hills-blocks') || await fetchSeo('blocks');

  const title = seo?.title || 'Faisal Hills Blocks & Sectors: Map, Plot Sizes & Status 2026';
  const description = seo?.meta_description || 'All Faisal Hills blocks on one page: where each sits, plot sizes, prices, development status, and why sources list different block counts.';
  const canonical = seo?.canonical_url || `${BASE_URL}/faisal-hills-blocks`;
  const ogImg = seo?.og_image || `${BASE_URL}/images/faisal-hills-site-header.webp`;
  const keywords = seo?.keywords 
    ? seo.keywords.split(',').map((k: string) => k.trim()) 
    : [
        'Faisal Hills blocks',
        'Faisal Hills sectors',
        'Faisal Hills Executive Block',
        'Faisal Hills Block A',
        'Faisal Hills Prime Block',
        'Faisal Hills Block B',
        'Faisal Hills Block B Extension',
        'Faisal Hills Block C',
        'Faisal Hills Block D',
        'Faisal Hills map',
        'Faisal Hills plot sizes',
        'Faisal Hills possession status'
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

const confirmedBlocksList = [
  { name: "Executive Block", url: `${BASE_URL}/blocks/executive-block` },
  { name: "Block A", url: `${BASE_URL}/blocks/block-a` },
  { name: "Prime Block", url: `${BASE_URL}/blocks/prime-block` },
  { name: "Block B", url: `${BASE_URL}/blocks/block-b` },
  { name: "Block B Extension", url: `${BASE_URL}/blocks/block-b-extension` },
  { name: "Block C", url: `${BASE_URL}/blocks/block-c` },
  { name: "Block D", url: `${BASE_URL}/blocks/block-d` }
];

const schemaMarkup = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${BASE_URL}/`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Faisal Hills Blocks",
          "item": `${BASE_URL}/faisal-hills-blocks/`
        }
      ]
    },
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/faisal-hills-blocks/#webpage`,
      "url": `${BASE_URL}/faisal-hills-blocks/`,
      "name": "Faisal Hills Blocks & Sectors: Map, Plot Sizes & Status 2026",
      "description": "All Faisal Hills blocks on one page: where each sits, plot sizes, prices, development status, and why sources list different block counts.",
      "dateModified": "2026-09-22",
      "lastReviewed": "2026-09-22",
      "reviewedBy": {
        "@type": "Person",
        "name": "Senior Property Advisor",
        "jobTitle": "Head of Real Estate Advisory"
      },
      "about": {
        "@id": `${BASE_URL}/#faisal-hills`
      },
      "mainEntity": {
        "@type": "ItemList",
        "name": "Faisal Hills blocks",
        "itemListElement": confirmedBlocksList.map((block, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": block.name,
          "url": block.url
        }))
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": auditedFaqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    }
  ]
};

export default async function FaisalHillsBlocksPage() {
  const seo = await fetchSeo('faisal-hills-blocks') || await fetchSeo('blocks');
  const heroImage = seo?.hero_image || seo?.og_image || '/images/faisal-hills-aerial-panoramic.webp';

  return (
    <>
      <JsonLd data={schemaMarkup} />
      <BlocksClient initialHeroImage={heroImage} initialSeo={seo} />
    </>
  );
}
