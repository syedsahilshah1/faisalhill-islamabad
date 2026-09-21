import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { JsonLd, generateOrganizationSchema, generateWebSiteSchema } from '@/components/seo/JsonLd';
import { fetchSettingByKey, SocialLinksData, ContactInfoData } from '@/data/faisalHillsData';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://faisalhillsislamabadfh.com';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Faisal Hills Real Estate | Official Master Plan, Plots & Prices',
    template: '%s',
  },
  description: 'Explore Faisal Hills Islamabad & Taxila. Interactive plot maps, RDA NOC status, block prices, and flexible payment plans for residential & commercial plots.',
  keywords: ['Faisal Hills', 'Faisal Hills Taxila', 'Faisal Hills Rawalpindi', 'Executive Block Faisal Hills', 'Block A Faisal Hills', 'Block B Faisal Hills', 'Block C Faisal Hills', 'Prime Block Faisal Hills', 'Faisal Hills Plot Prices', 'Faisal Hills Map', 'Faisal Jewels Tower'],
  authors: [{ name: 'Faisal Hills Real Estate Portal' }],
  creator: 'Zedem International',
  publisher: 'Faisal Hills',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Faisal Hills Real Estate',
    title: 'Faisal Hills Real Estate | Official Master Plan, Plots & Prices',
    description: 'Explore RDA-approved residential & commercial plot investments in Faisal Hills GT Road Taxila with interactive master map, block price rates, and online booking.',
    images: [
      {
        url: '/images/faisal-hills-site-header.webp',
        width: 1200,
        height: 630,
        alt: 'Faisal Hills Master Plan & Society Overview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Faisal Hills Real Estate | Official Master Plan, Plots & Prices',
    description: 'Explore RDA-approved residential & commercial plot investments in Faisal Hills GT Road Taxila.',
    images: ['/images/faisal-hills-site-header.webp'],
    creator: '@FaisalHillsPK',
  },
  verification: {
    google: 'google-site-verification-code-xyz123',
    other: {
      'msvalidate.01': 'bing-verification-code-abc456',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [socials, contact] = await Promise.all([
    fetchSettingByKey<SocialLinksData>('social_links'),
    fetchSettingByKey<ContactInfoData>('contact_info'),
  ]);

  const organizationSchema = generateOrganizationSchema(BASE_URL, socials, contact);
  const websiteSchema = generateWebSiteSchema(BASE_URL);

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <JsonLd data={[organizationSchema, websiteSchema]} />
      </head>
      <body className="bg-surface text-onSurface font-sans min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
