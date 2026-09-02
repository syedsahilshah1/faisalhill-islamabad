import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchBlogBySlug, fetchBlogs } from '@/data/faisalHillsData';
import { JsonLd, generateArticleSchema, generateBreadcrumbSchema, generateFaqSchema } from '@/components/seo/JsonLd';
import BlogDetailClient from './BlogDetailClient';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://faisalhillsislamabadfh.com';

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const blogs = await fetchBlogs();
    if (blogs && blogs.length > 0) {
      return blogs.map((blog) => ({
        slug: blog.slug,
      }));
    }
  } catch (e) {
    // fallback
  }
  return [
    { slug: 'how-to-buy-plot-in-faisal-hills' },
    { slug: 'faisal-hills-taxila-rda-approved-luxury-living' },
    { slug: 'executive-block-faisal-hills-development-investment' },
    { slug: 'faisal-jewels-tower-luxury-high-rise-apartments' },
  ];
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const blog = await fetchBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: 'Article Not Found | Faisal Hills Real Estate',
      description: 'The requested blog post could not be located.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = blog.metaTitle || blog.title;
  const description = blog.metaDescription || blog.summary || blog.title;
  const canonical = blog.canonicalUrl || `${BASE_URL}/blogs/${blog.slug}`;
  const ogImage = blog.ogImage || blog.imageUrl || `${BASE_URL}/images/faisal-roots-school.jpg`;
  const twitterImage = blog.twitterImage || ogImage;

  return {
    title: `${title} | Faisal Hills Real Estate`,
    description: description,
    keywords: blog.keywords ? blog.keywords.split(',').map(k => k.trim()) : undefined,
    alternates: {
      canonical: canonical,
    },
    robots: {
      index: blog.robotsIndex !== false,
      follow: blog.robotsFollow !== false,
      googleBot: {
        index: blog.robotsIndex !== false,
        follow: blog.robotsFollow !== false,
      },
    },
    openGraph: {
      title: `${title} | Faisal Hills Real Estate`,
      description: description,
      url: canonical,
      siteName: 'Faisal Hills',
      type: 'article',
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt || blog.createdAt,
      authors: [blog.author || 'Faisal Hills Team'],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: blog.imageAlt || blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Faisal Hills Real Estate`,
      description: description,
      images: [twitterImage],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const blog = await fetchBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  const allBlogs = await fetchBlogs();
  const recentBlogs = allBlogs
    .filter((b) => b.slug !== params.slug && b.published)
    .slice(0, 3);

  const articleSchema = generateArticleSchema(blog, BASE_URL);
  const breadcrumbsSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blogs & Insights', url: '/blogs' },
    { name: blog.title, url: `/blogs/${blog.slug}` },
  ], BASE_URL);

  const faqSchema = blog.faqs && blog.faqs.length > 0 ? generateFaqSchema(blog.faqs) : null;

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbsSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <BlogDetailClient blog={blog} recentBlogs={recentBlogs} />
    </>
  );
}
