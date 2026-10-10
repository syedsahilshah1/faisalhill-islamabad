import type { Metadata } from 'next';

import PlotViewClient from './PlotViewClient';

/**
 * Single static plot-detail page.
 *
 * The site is deployed as a static export (`output: 'export'`), so a dynamic
 * route only exists on disk if `generateStaticParams` produced it at build time.
 * That made plot pages unpublishable: a plot added through the dashboard
 * appeared on the homepage and its block page, which both read the API in the
 * browser, but its own `/plots/<id>` page 404'd because no HTML file had been
 * generated for it and none could be without a redeploy.
 *
 * This route is static and resolves `?id=` in the browser, so any plot published
 * at any time has a working detail page with no rebuild. `/plots/[id]` is kept
 * for the paths that were generated at build time, which still give those plots
 * distinct, indexable URLs.
 */
export const metadata: Metadata = {
  title: 'Plot Details | Faisal Hills Real Estate',
  description:
    'Explore verified residential and commercial plots for sale in Faisal Hills Islamabad, with dimensions, pricing and live availability.',
  robots: {
    index: true,
    follow: true
  }
};

export default function PlotViewPage() {
  return <PlotViewClient />;
}
