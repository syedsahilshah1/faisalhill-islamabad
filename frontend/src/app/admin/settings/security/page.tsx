import { redirect } from 'next/navigation';

export default function AdminSecurityRedirect() {
  redirect('/ubaid/admin/login?tab=security');
  return null;
}
