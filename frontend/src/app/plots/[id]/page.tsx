import React from 'react';
import { Metadata } from 'next';
import { fetchPlots } from '@/data/faisalHillsData';
import PlotDetailClient from './PlotDetailClient';

interface PlotPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  try {
    const plots = await fetchPlots();
    if (plots && plots.length > 0) {
      return plots.map((plot) => ({
        id: plot.id,
      }));
    }
  } catch (e) {
    // fallback
  }
  return [
    { id: 'plot-a-5m' },
    { id: 'plot-a-8m' },
    { id: 'plot-a-10m' },
    { id: 'plot-a-14m' },
    { id: 'plot-a-1k' },
    { id: 'plot-b-5m' },
    { id: 'plot-b-8m' },
    { id: 'plot-b-10m' },
    { id: 'plot-b-14m' },
    { id: 'plot-b-1k' },
    { id: 'plot-c-5m' },
    { id: 'plot-c-8m-1' },
    { id: 'plot-c-10m-1' },
    { id: 'plot-c-14m' },
    { id: 'plot-c-1k' },
    { id: 'plot-d-5m' },
    { id: 'plot-d-8m' },
    { id: 'plot-d-10m' },
    { id: 'plot-d-14m' },
    { id: 'plot-d-1k' },
    { id: 'plot-exe-5m' },
    { id: 'plot-exe-8m' },
    { id: 'plot-exe-10m' },
    { id: 'plot-exe-14m' },
    { id: 'plot-exe-1k' },
    { id: 'plot-prime-3.5m' },
    { id: 'plot-prime-5m' },
    { id: 'plot-prime-8m' },
    { id: 'plot-prime-10m' },
    { id: 'plot-prime-14m' },
    { id: 'plot-prime-1k' },
  ];
}

export async function generateMetadata({ params }: PlotPageProps): Promise<Metadata> {
  const plots = await fetchPlots();
  const plot = plots.find((p) => p.id === params.id || (p.plotNumber && p.plotNumber.toLowerCase() === params.id?.toLowerCase()));

  if (!plot) {
    return {
      title: 'Plot Details | Faisal Hills Real Estate',
      description: 'Explore verified residential and commercial plots for sale in Faisal Hills Islamabad.',
    };
  }

  return {
    title: `Plot #${plot.plotNumber} ${plot.blockName} (${plot.size}) | Faisal Hills`,
    description: `Buy Plot #${plot.plotNumber} in ${plot.blockName}, Faisal Hills. Size: ${plot.size}, Facing: ${plot.facing}, Demand: ${plot.priceFormatted}. RDA Approved society on GT Road.`,
    openGraph: {
      title: `Plot #${plot.plotNumber} ${plot.blockName} (${plot.size}) - Faisal Hills`,
      description: `Official rate: ${plot.priceFormatted}. ${plot.size} plot in ${plot.blockName}.`,
      images: [{ url: plot.image || '/images/imgi_38_Faisal-Hills-site-home-page-header.webp' }],
    },
  };
}

export default function PlotDetailPage({ params }: PlotPageProps) {
  return <PlotDetailClient plotId={params.id} />;
}
