import { Metadata } from 'next';
import ForgotPasswordClient from './ForgotPasswordClient';

export const metadata: Metadata = {
  title: 'Forgot Password | Faisal Hills Executive Portal',
  description: 'Reset your administrator password securely.',
  robots: {
    index: false,
    follow: false,
  }
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
