import React from 'react';

interface JsonLdProps {
  data: Record<string, any> | Array<Record<string, any> | null> | null;
}

export function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;
  const filteredData = Array.isArray(data) ? data.filter(Boolean) : data;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(filteredData),
      }}
    />
  );
}

export function generateOrganizationSchema(siteUrl = 'https://faisalhillsislamabadfh.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    'name': 'Faisal Hills Real Estate Portal',
    'legalName': 'Zedem International (Pvt) Ltd - Faisal Hills',
    'url': siteUrl,
    'logo': `${siteUrl}/icon.svg`,
    'image': `${siteUrl}/images/imgi_38_Faisal-Hills-site-home-page-header.webp`,
    'description': 'Official marketing & sales portal for Faisal Hills Rawalpindi / Taxila, an RDA-approved master-planned mega housing society on Main GT Road.',
    'telephone': '+923331113177',
    'email': 'info@faisalhillsislamabadfh.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Main GT Road, Near MPCHS Interchange',
      'addressLocality': 'Taxila / Rawalpindi',
      'addressRegion': 'Punjab',
      'postalCode': '47050',
      'addressCountry': 'PK'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '33.7431',
      'longitude': '72.7844'
    },
    'sameAs': [
      'https://facebook.com',
      'https://instagram.com',
      'https://youtube.com',
      'https://linkedin.com'
    ]
  };
}

export function generateWebSiteSchema(siteUrl = 'https://faisalhillsislamabadfh.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'url': siteUrl,
    'name': 'Faisal Hills Real Estate',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `${siteUrl}/plots?search={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[], siteUrl = 'https://faisalhillsislamabadfh.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url.startsWith('http') ? item.url : `${siteUrl}${item.url.startsWith('/') ? item.url : `/${item.url}`}`
    }))
  };
}

export function generateArticleSchema(blog: {
  title: string;
  summary?: string;
  content?: string;
  imageUrl?: string;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  slug: string;
}, siteUrl = 'https://faisalhillsislamabadfh.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blogs/${blog.slug}`
    },
    'headline': blog.title,
    'description': blog.summary || blog.title,
    'image': blog.imageUrl ? [blog.imageUrl] : [`${siteUrl}/images/faisal-roots-school.jpg`],
    'author': {
      '@type': 'Person',
      'name': blog.author || 'Faisal Hills Real Estate Desk'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Faisal Hills',
      'logo': {
        '@type': 'ImageObject',
        'url': `${siteUrl}/icon.svg`
      }
    },
    'datePublished': blog.createdAt ? new Date(blog.createdAt).toISOString() : new Date().toISOString(),
    'dateModified': blog.updatedAt ? new Date(blog.updatedAt).toISOString() : (blog.createdAt ? new Date(blog.createdAt).toISOString() : new Date().toISOString())
  };
}

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}

export function generateContactSchema(siteUrl = 'https://faisalhillsislamabadfh.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'name': 'Faisal Hills Sales Desk & Official Contact',
    'description': 'Contact Faisal Hills sales desk for on-ground verification, booking forms, price quotations, and NOC details.',
    'url': `${siteUrl}/contact`,
    'mainEntity': {
      '@type': 'RealEstateAgent',
      'name': 'Faisal Hills Islamabad Sales Desk',
      'telephone': '+923313339997',
      'email': 'info@faisalhillsislamabadfh.com',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Main GT Road (N-5), near Taxila',
        'addressLocality': 'Taxila / Rawalpindi',
        'addressRegion': 'Punjab',
        'addressCountry': 'PK'
      }
    }
  };
}

export function generateRealEstateListingSchema(params: {
  name: string;
  description: string;
  url: string;
  image?: string;
  priceMin?: number;
  priceMax?: number;
  priceCurrency?: string;
  address?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    'name': params.name,
    'description': params.description,
    'url': params.url,
    'image': params.image,
    'offers': {
      '@type': 'AggregateOffer',
      'priceCurrency': params.priceCurrency || 'PKR',
      'lowPrice': params.priceMin || 3500000,
      'highPrice': params.priceMax || 120000000
    },
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': params.address || 'Main GT Road (N-5), Taxila',
      'addressCountry': 'PK'
    }
  };
}
