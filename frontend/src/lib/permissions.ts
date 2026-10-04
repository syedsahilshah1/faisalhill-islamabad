/**
 * Client-side permission helpers for the admin dashboard.
 *
 * These mirror `App\Support\PermissionRegistry` on the server. The server is the
 * authority — it fails closed and returns 403 — so this module exists to avoid
 * rendering controls an administrator cannot use, not to secure anything.
 *
 * The previous implementation had two defects that made it useless:
 *
 *  1. It failed open: `if (userPerms.length === 0) return true`, so an
 *     administrator with no grants was shown everything. Because the login
 *     response never included `permissions`, the list was *always* empty, so the
 *     gate was unconditionally open.
 *  2. Hiding a tab was the only check. `?tab=leads` set the active tab directly,
 *     bypassing the filter and rendering the full leads UI.
 */

/**
 * Must stay in sync with `App\Support\PermissionRegistry::PERMISSIONS`.
 * `PermissionCatalogueTest` in the frontend and `PermissionEnforcementTest` on
 * the server both fail if these drift.
 */
export type UserPermissionKey =
  // Content areas — one per page, so access can be granted per page
  | 'manage_homepage'
  | 'manage_blocks_page'
  | 'manage_master_plan'
  | 'manage_payment_plan'
  | 'manage_noc_status'
  | 'manage_about_page'
  | 'manage_contact_page'
  | 'manage_location_page'
  | 'manage_commercial_page'
  | 'manage_gallery_page'
  // Site-wide settings
  | 'manage_contact_settings'
  | 'manage_legal_policies'
  | 'manage_verification_dates'
  | 'manage_seo'
  | 'manage_redirects'
  // Records
  | 'manage_plots'
  | 'manage_blocks'
  | 'manage_plot_series'
  | 'manage_gallery'
  | 'manage_blogs'
  | 'manage_leads'
  // Accounts
  | 'manage_users';

export type AdminUserLike = {
  role?: 'super_admin' | 'admin' | string;
  permissions?: string[] | null;
} | null | undefined;

export type PermissionDescriptor = {
  key: UserPermissionKey;
  label: string;
  group: string;
  description: string;
};

/**
 * Fallback catalogue, used only when the API is unreachable so the dashboard can
 * still render. The server remains the authority; a stale label is cosmetic,
 * whereas a missing capability would be a false negative the server would then
 * reject anyway.
 */
export const FALLBACK_PERMISSION_CATALOGUE: PermissionDescriptor[] = [
  { key: 'manage_homepage', group: 'Content', label: 'Homepage Content', description: 'Edit homepage sections, text, cards and images' },
  { key: 'manage_blocks_page', group: 'Content', label: 'Blocks Page & Sectors', description: 'Edit the blocks overview page and its sub-sector content' },
  { key: 'manage_master_plan', group: 'Content', label: 'Master Plan Page', description: 'Edit the master plan page and map graphics' },
  { key: 'manage_payment_plan', group: 'Content', label: 'Payment Plan Page', description: 'Edit installment plans and the payment schedule' },
  { key: 'manage_noc_status', group: 'Content', label: 'NOC Status Page', description: 'Edit approval, NOC and verification status content' },
  { key: 'manage_about_page', group: 'Content', label: 'About Us Page', description: 'Edit the About Us page copy, FAQs and images' },
  { key: 'manage_contact_page', group: 'Content', label: 'Contact Page', description: 'Edit the Contact page copy, map and block cards' },
  { key: 'manage_location_page', group: 'Content', label: 'Location Page', description: 'Edit the location page, travel times and geography' },
  { key: 'manage_commercial_page', group: 'Content', label: 'Commercial Page', description: 'Edit the commercial page content' },
  { key: 'manage_gallery_page', group: 'Content', label: 'Gallery Page', description: 'Edit the gallery page hero and call-to-action text' },
  { key: 'manage_contact_settings', group: 'Settings', label: 'Contact Details & Social Links', description: 'Edit phone numbers, address, email and social profiles' },
  { key: 'manage_legal_policies', group: 'Settings', label: 'Legal Policies', description: 'Edit the Terms of Service and Privacy Policy' },
  { key: 'manage_verification_dates', group: 'Settings', label: 'Verification Dates', description: 'Edit the society verification date shown site-wide' },
  { key: 'manage_seo', group: 'Settings', label: 'SEO & Metadata', description: 'Edit page titles, meta descriptions and Open Graph tags' },
  { key: 'manage_redirects', group: 'Settings', label: 'URL Redirects', description: 'Create and edit URL redirects' },
  { key: 'manage_plots', group: 'Records', label: 'Plot Inventory', description: 'Add, edit and delete plots and change prices' },
  { key: 'manage_blocks', group: 'Records', label: 'Block Records', description: 'Edit block details, NOC status and verification dates' },
  { key: 'manage_plot_series', group: 'Records', label: 'Plot Series & Pricing', description: 'Configure plot series tags and price bands' },
  { key: 'manage_gallery', group: 'Records', label: 'Photo Gallery', description: 'Upload and remove gallery photos' },
  { key: 'manage_blogs', group: 'Records', label: 'Blog Posts', description: 'Create, edit and publish blog articles' },
  { key: 'manage_leads', group: 'Records', label: 'Leads & Inquiries', description: 'View and delete customer inquiry submissions' },
  { key: 'manage_users', group: 'Accounts', label: 'Administrators', description: 'Create administrators and change what they can access' },
];

export function isSuperAdmin(user: AdminUserLike): boolean {
  return user?.role === 'super_admin';
}

/**
 * Whether `user` holds `permission`.
 *
 * Fails closed: an absent, null or empty grant set means "no access". Only a
 * super administrator bypasses the check. A `null` requirement means the
 * capability has no permission attached (self-service screens), which is open.
 */
export function hasPermission(user: AdminUserLike, permission: string | null | undefined): boolean {
  if (!permission) return true;
  if (isSuperAdmin(user)) return true;

  const granted = user?.permissions;

  if (!Array.isArray(granted) || granted.length === 0) return false;

  return granted.includes(permission);
}

/**
 * Whether `user` holds at least one of `permissions`.
 */
export function hasAnyPermission(user: AdminUserLike, permissions: Array<string | null | undefined>): boolean {
  return permissions.some((permission) => hasPermission(user, permission));
}

export function groupCatalogue(catalogue: PermissionDescriptor[]): Array<{ group: string; items: PermissionDescriptor[] }> {
  const groups = new Map<string, PermissionDescriptor[]>();

  for (const permission of catalogue) {
    const existing = groups.get(permission.group);
    if (existing) existing.push(permission);
    else groups.set(permission.group, [permission]);
  }

  return Array.from(groups, ([group, items]) => ({ group, items }));
}

/**
 * The permission each dashboard tab requires.
 *
 * Content tabs were previously all gated behind the single coarse
 * `manage_homepage_cms`, which meant granting access to one page granted all of
 * them. Each area now maps to its own capability.
 */
export const TAB_PERMISSIONS: Record<string, UserPermissionKey | null> = {
  homepage_cms: 'manage_homepage',
  blocks_cms: 'manage_blocks_page',
  master_plan_cms: 'manage_master_plan',
  payment_plan_cms: 'manage_payment_plan',
  noc_cms: 'manage_noc_status',
  series: 'manage_plot_series',
  plots: 'manage_plots',
  leads: 'manage_leads',
  blogs: 'manage_blogs',
  gallery: 'manage_gallery',
  seo: 'manage_seo',
  redirects: 'manage_redirects',
  legal: 'manage_legal_policies',
  accounts: 'manage_contact_settings',
  verification: 'manage_verification_dates',
  users: 'manage_users',
  // Changing one's own password is self-service and intentionally ungated.
  security: null,
};

export function canAccessTab(user: AdminUserLike, tabId: string): boolean {
  // The map lookup must be checked for presence, not truthiness. An unmapped id
  // yields `undefined`, and passing that to `hasPermission` would hit the
  // "no requirement" branch and return true — reintroducing the fail-open bug
  // for any tab id this map forgets.
  if (!Object.prototype.hasOwnProperty.call(TAB_PERMISSIONS, tabId)) {
    return false;
  }

  return hasPermission(user, TAB_PERMISSIONS[tabId]);
}