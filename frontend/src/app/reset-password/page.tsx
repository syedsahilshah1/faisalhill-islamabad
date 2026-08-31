import { Metadata } from 'next';
import { Suspense } from 'react';
import ResetPasswordClient from './ResetPasswordClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Reset Password | Faisal Hills Executive Portal',
  description: 'Set your new administrator password securely.',
  robots: {
    index: false,
    follow: false,
  }
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="text-sm font-sans animate-pulse">Loading recovery portal...</div>
      </div>
    }>
      <ResetPasswordClient />
    </Suspense>
  );
}
