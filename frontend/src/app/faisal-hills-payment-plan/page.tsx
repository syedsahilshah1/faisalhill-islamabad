import React from 'react';
import type { Metadata } from 'next';
import { fetchSeo, fetchPaymentPlanCMS } from '@/data/faisalHillsData';
import { JsonLd, generateBreadcrumbSchema, generateFaqSchema } from '@/components/seo/JsonLd';
import PaymentPlanClient from './PaymentPlanClient';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://faisalhillsislamabadfh.com';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeo('faisal-hills-payment-plan') || await fetchSeo('payment-plan');

  const title = seo?.title || 'Faisal Hills Payment Plan 2026: Instalments, Down Payment & Fees';
  const description = seo?.meta_description || 'The Faisal Hills payment plan explained: quarterly instalments, booking amount, registration fee, lump-sum discount, block-wise terms and what else you pay.';
  const canonical = seo?.canonical_url || `${BASE_URL}/faisal-hills-payment-plan`;
  const ogImg = seo?.og_image || `${BASE_URL}/images/faisal-hills-site-header.webp`;
  const keywords = seo?.keywords 
    ? seo.keywords.split(',').map((k: string) => k.trim()) 
    : [
        'Faisal Hills Payment Plan',
        'Instalment plan',
        'payment plan 2026',
        'payment schedule',
        'instalment schedule',
        'plot payment plan',
        'plot prices and payment plan',
        'down payment',
        'booking amount',
        'quarterly instalments',
        'monthly instalment',
        '5 Marla payment plan',
        '8 Marla payment plan',
        '10 Marla payment plan',
        '14 Marla payment plan',
        '1 Kanal payment plan',
        '2 Kanal payment plan',
        'block-wise payment plan',
        'commercial payment plan'
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

export default async function FaisalHillsPaymentPlanPage() {
  const cmsData = await fetchPaymentPlanCMS();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: BASE_URL },
    { name: 'Faisal Hills Payment Plan', url: `${BASE_URL}/faisal-hills-payment-plan` },
  ]);

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'Faisal Hills Payment Plan and Instalment Schedule',
    'description': 'The Faisal Hills payment plan explained: quarterly instalments, booking amount, registration fee, lump-sum discount, block-wise terms and what else you pay.',
    'url': `${BASE_URL}/faisal-hills-payment-plan`,
    'dateModified': '2026-09-30',
    'lastReviewed': '2026-09-30',
    'reviewedBy': {
      '@type': 'Person',
      'name': cmsData.verificationHeader.reviewerName,
      'jobTitle': cmsData.verificationHeader.reviewerRole,
    },
    'about': {
      '@type': 'Place',
      'name': 'Faisal Hills',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Taxila',
        'addressRegion': 'Punjab / Islamabad Corridor',
        'addressCountry': 'PK',
        'streetAddress': 'Main GT Road (N-5) near Taxila'
      }
    }
  };

  const faqSchema = generateFaqSchema(
    cmsData.faqsSection.faqs.map(f => ({
      question: f.q,
      answer: f.a
    }))
  );

  return (
    <>
      <JsonLd data={[breadcrumbSchema, webPageSchema, faqSchema]} />
      <PaymentPlanClient initialCmsData={cmsData} />
    </>
  );
}
