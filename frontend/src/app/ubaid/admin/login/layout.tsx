import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://faisalhillsislamabadfh.com';

export const metadata: Metadata = {
  title: 'Admin Login | Faisal Hills Secure Portal',
  description: 'Authorized secure admin access portal for Faisal Hills.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  alternates: {
    canonical: `${BASE_URL}/ubaid/admin/login`,
  },
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
