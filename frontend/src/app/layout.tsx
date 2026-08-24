import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

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
  title: 'Faisal Hills Real Estate | Official Master Plan, Plots & Prices',
  description: 'Explore Faisal Hills Rawalpindi & Islamabad. Interactive plot map, NOC details, block prices, payment plans for Executive Block, Block A, B, C, D, Prime Block, Gandahara & Hills Walk.',
  keywords: ['Faisal Hills', 'Faisal Hills Taxila', 'Faisal Hills Rawalpindi', 'Executive Block Faisal Hills', 'Block A Faisal Hills', 'Block B Faisal Hills', 'Block C Faisal Hills', 'Prime Block Faisal Hills', 'Faisal Hills Plot Prices', 'Faisal Hills Map'],
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
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
