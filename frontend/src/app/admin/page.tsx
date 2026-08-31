import { redirect } from 'next/navigation';

export default function AdminDashboardRedirect() {
  redirect('/ubaid/admin/login');
  return null;
}
