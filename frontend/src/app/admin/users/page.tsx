import { redirect } from 'next/navigation';

export default function AdminUsersRedirect() {
  redirect('/ubaid/admin/login?tab=users');
  return null;
}
