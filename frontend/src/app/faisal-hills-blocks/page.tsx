import React from 'react';
import type { Metadata } from 'next';
import { fetchSeo } from '@/data/faisalHillsData';
import { JsonLd } from '@/components/seo/JsonLd';
import BlocksClient from './BlocksClient';
import { allBlocksDataset } from './blocksDataset';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://faisalhillsislamabadfh.com';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeo('faisal-hills-blocks') || await fetchSeo('blocks');

  const title = seo?.title || 'Faisal Hills Blocks | Executive, Prime, Block A, B, C & D Sectors';
  const description = seo?.meta_description || 'Explore all Faisal Hills Blocks: Executive, Prime, Block A–D. Compare possession status, plot sizes, prices, and master plan maps.';
  const canonical = seo?.canonical_url || `${BASE_URL}/faisal-hills-blocks`;
  const ogImg = seo?.og_image || `${BASE_URL}/images/faisal-hills-site-header.webp`;
  const keywords = seo?.keywords 
    ? seo.keywords.split(',').map((k: string) => k.trim()) 
    : ['Faisal Hills Blocks', 'Faisal Hills Executive Block', 'Faisal Hills Prime Block', 'Faisal Hills A Block', 'Faisal Hills B Block', 'Faisal Hills C Block', 'Faisal Hills D Block', 'Faisal Hills Gandahara', 'Faisal Jewel'];

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

const faqs = [
  {
    q: "How many blocks are there in Faisal Hills?",
    a: "Faisal Hills Blocks currently consist of eight sectors: Executive Block, Prime Block, Block A, Block B, Block B1 Extension, Block C, Block D, and the Golf Block, alongside commercial landmarks such as Faisal Jewel and Hills Walk."
  },
  {
    q: "Which block in Faisal Hills is RDA-approved and ready for possession?",
    a: "The entire 11,823+ Kanal scheme holds official NOC approval from the Rawalpindi Development Authority (RDA). Possession is ready in Block A, Executive Block, and developed parts of Block B and Block C."
  },
  {
    q: "Which Faisal Hills Block is best for investment in 2026?",
    a: "For lower risk with immediate villa construction, Block A and Executive Block are ideal. For highest capital appreciation upside, Block B1 Extension and Block D offer the best entry rates."
  },
  {
    q: "What plot sizes are available across the blocks?",
    a: "Residential plots range from 5 Marla, 8 Marla, 10 Marla, 14 Marla, 1 Kanal, to 2 Kanal. Commercial plots range from 2 Marla up to 2 Kanal."
  }
];

const schemaMarkup = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/faisal-hills-blocks/#webpage`,
      "url": `${BASE_URL}/faisal-hills-blocks`,
      "name": "Faisal Hills Blocks | All Sectors FH Islamabad",
      "description": "Explore all Faisal Hills Blocks — Executive, Prime, Block A, Block B, B Extension, Block C, Block D. RDA-approved plots near GT Road, Taxila.",
      "breadcrumb": {
        "@id": `${BASE_URL}/faisal-hills-blocks/#breadcrumb`
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${BASE_URL}/faisal-hills-blocks/#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Faisal Hills Blocks", "item": `${BASE_URL}/faisal-hills-blocks` }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    },
    ...allBlocksDataset.map(block => ({
      "@type": "RealEstateListing",
      "name": `Faisal Hills ${block.name} — Residential & Commercial Plots`,
      "description": block.description,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "GT Road, Taxila",
        "addressLocality": "Rawalpindi",
        "addressCountry": "PK"
      },
      "amenityFeature": block.amenities
    }))
  ]
};

export default function FaisalHillsBlocksPage() {
  return (
    <>
      <JsonLd data={schemaMarkup} />
      <BlocksClient />
    </>
  );
}
