import React from 'react';
import type { Metadata } from 'next';
import { fetchSeo } from '@/data/faisalHillsData';
import { JsonLd, generateBreadcrumbSchema, generateFaqSchema } from '@/components/seo/JsonLd';
import PaymentPlanClient from './PaymentPlanClient';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://faisalhillsislamabadfh.com';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeo('faisal-hills-payment-plan') || await fetchSeo('payment-plan');

  const title = seo?.title || 'Faisal Hills Payment Plan 2026 – Installments & Cash Rates';
  const description = seo?.meta_description || 'Detailed Faisal Hills Payment Plan 2026 for 5, 8, 10, 14 Marla and 1, 2 Kanal plots. Check down payments, quarterly installments, lump sum cash discounts, and possession timeline.';
  const canonical = seo?.canonical_url || `${BASE_URL}/faisal-hills-payment-plan`;
  const ogImg = seo?.og_image || `${BASE_URL}/images/imgi_38_Faisal-Hills-site-home-page-header.webp`;
  const keywords = seo?.keywords 
    ? seo.keywords.split(',').map((k: string) => k.trim()) 
    : ['Faisal Hills Payment Plan', 'Faisal Hills installment plan', 'Faisal Hills 5 Marla payment plan', 'Faisal Hills 10 Marla price', 'Faisal Hills down payment', 'Faisal Hills plot prices 2026'];

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

export default function FaisalHillsPaymentPlanPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: BASE_URL },
    { name: 'Faisal Hills Blocks', url: `${BASE_URL}/faisal-hills-blocks` },
    { name: 'Payment Plan', url: `${BASE_URL}/faisal-hills-payment-plan` },
  ]);

  const faqs = [
    {
      question: "Does Faisal Hills offer plots on installments or is it cash only?",
      answer: "Both, depending on inventory. Developer-held plots, mainly in the Prime Block and newer sectors, are offered on a Faisal Hills installment plan with a down payment and quarterly installments. Resale plots in mature blocks trade on full cash."
    },
    {
      question: "What is the down payment for a plot in Faisal Hills?",
      answer: "The down payment is approximately 20% of the total plot price at booking, with a confirmation amount of approximately 10% due within 30 to 60 days."
    },
    {
      question: "What discount is available on full cash payment?",
      answer: "A lump sum discount of up to 20% applies to full cash payments on developer inventory."
    },
    {
      question: "Is Faisal Hills approved by RDA?",
      answer: "Yes, Faisal Hills holds an official No Objection Certificate (NOC) approved by the Rawalpindi Development Authority (RDA) covering over 11,823 Kanals."
    }
  ];

  const faqSchema = generateFaqSchema(faqs);

  return (
    <>
      <JsonLd data={[breadcrumbSchema, faqSchema]} />
      <PaymentPlanClient />
    </>
  );
}
