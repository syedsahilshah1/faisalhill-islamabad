import { MetadataRoute } from 'next';
import { fetchSitemapRoutes } from '@/data/faisalHillsData';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://faisalhillsislamabadfh.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = await fetchSitemapRoutes();

  if (!routes || routes.length === 0) {
    // Fallback static list
    const fallbackUrls = [
      '',
      '/about-us',
      '/master-plan',
      '/faisal-hills-payment-plan',
      '/faisal-hills-blocks',
      '/faisal-hills-commercial',
      '/faisal-hills-noc-status',
      '/faisal-hills-location',
      '/plots',
      '/blogs',
      '/contact',
      '/privacy-policy',
      '/terms-of-service',
      '/blocks/executive-block',
      '/blocks/prime-block',
      '/blocks/block-a',
      '/blocks/block-b',
      '/blocks/block-b1-extension',
      '/blocks/block-c',
      '/blocks/block-d',
      '/blocks/faisal-jewel-islamabad',
      '/blocks/hills-walk'
    ];

    return fallbackUrls.map(url => ({
      url: `${BASE_URL}${url}`,
      lastModified: new Date(),
      changeFrequency: (url === '' || url === '/plots' || url === '/blogs') ? 'daily' : 'weekly',
      priority: url === '' ? 1.0 : (url.startsWith('/blocks') || url === '/faisal-hills-payment-plan' ? 0.9 : 0.8),
    }));
  }

  return routes.map(route => ({
    url: `${BASE_URL}${route.url.startsWith('/') ? route.url : `/${route.url}`}`,
    lastModified: route.lastmod ? new Date(route.lastmod) : new Date(),
    changeFrequency: (route.changefreq as any) || 'weekly',
    priority: route.priority || 0.8,
  }));
}
