import React from 'react';
import type { Metadata } from 'next';
import { fetchSeo } from '@/data/faisalHillsData';
import { JsonLd, generateBreadcrumbSchema, generateContactSchema } from '@/components/seo/JsonLd';
import ContactClient from './ContactClient';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://faisalhillsislamabadfh.com';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeo('contact');

  const title = seo?.title || 'Contact Faisal Hills – Head Office Phone, WhatsApp & Site Office';
  const description = seo?.meta_description || 'Contact Faisal Hills Islamabad & Taxila sales office. Call +92 331 3339997 or WhatsApp +92 333 1113177 for verified plot rates, booking forms, site visit schedules, and RDA NOC verification.';
  const canonical = seo?.canonical_url || `${BASE_URL}/contact`;
  const ogImg = seo?.og_image || `${BASE_URL}/images/faisalhillarc.jpg`;
  const keywords = seo?.keywords 
    ? seo.keywords.split(',').map((k: string) => k.trim()) 
    : ['Faisal Hills Contact', 'Faisal Hills Phone Number', 'Faisal Hills WhatsApp', 'Zedem International Office', 'Faisal Hills Sales Office Taxila', 'Faisal Hills Helpline'];

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

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: BASE_URL },
    { name: 'Contact Us', url: `${BASE_URL}/contact` },
  ]);

  const contactSchema = generateContactSchema(BASE_URL);

  return (
    <>
      <JsonLd data={[breadcrumbSchema, contactSchema]} />
      <ContactClient />
    </>
  );
}
