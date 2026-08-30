import React from 'react';
import type { Metadata } from 'next';
import { fetchSeo } from '@/data/faisalHillsData';
import { JsonLd, generateBreadcrumbSchema, generateFaqSchema } from '@/components/seo/JsonLd';
import AboutUsClient from './AboutUsClient';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://faisalhills.com.pk';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeo('about-us');

  const title = seo?.title || 'About Faisal Hills – Zedem International & Vision';
  const description = seo?.meta_description || 'Learn about Zedem International, Chairman Chaudhry Abdul Majeed, and the vision behind Faisal Hills on GT Road Taxila. Discover RDA NOC approval, delivered blocks, and society infrastructure.';
  const canonical = seo?.canonical_url || `${BASE_URL}/about-us`;
  const ogImg = seo?.og_image || `${BASE_URL}/images/imgi_38_Faisal-Hills-site-home-page-header.webp`;
  const keywords = seo?.keywords 
    ? seo.keywords.split(',').map((k: string) => k.trim()) 
    : ['About Faisal Hills', 'Zedem International', 'Chaudhry Abdul Majeed', 'Faisal Hills Developer', 'Faisal Hills RDA NOC', 'Faisal Hills Islamabad history'];

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

export default function AboutUsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: BASE_URL },
    { name: 'About Us', url: `${BASE_URL}/about-us` },
  ]);

  const faqSchema = generateFaqSchema([
    {
      question: "Who is the developer of Faisal Hills Islamabad?",
      answer: "Faisal Hills Islamabad is developed by Zedem International (Pvt) Ltd under the leadership of Chairman Chaudhry Abdul Majeed."
    },
    {
      question: "Is Faisal Hills Islamabad 100% approved by RDA?",
      answer: "Yes, Faisal Hills holds complete official approval and legal NOC documentation from the Rawalpindi Development Authority (RDA)."
    },
    {
      question: "Where is the head office of Zedem International located?",
      answer: "The Zedem International Head Office is located at Faisal Tower, Main Boulevard, MPCHS E-11/3, Islamabad."
    },
    {
      question: "Can Overseas Pakistanis buy plots remotely?",
      answer: "Yes. Zedem International operates a dedicated Overseas Investor Support Desk that facilitates remote booking, digital application submission, and home delivery of allotment letters worldwide."
    }
  ]);

  return (
    <>
      <JsonLd data={[breadcrumbSchema, faqSchema]} />
      <AboutUsClient />
    </>
  );
}
