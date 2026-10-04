/**
 * Regression tests for the permission helpers that gate the admin dashboard.
 *
 * Each case here corresponds to a defect that shipped: the fail-open check, the
 * `?tab=` bypass, and the coarse `manage_homepage_cms` capability that granted
 * every content page at once.
 */

import {
  FALLBACK_PERMISSION_CATALOGUE,
  TAB_PERMISSIONS,
  canAccessTab,
  groupCatalogue,
  hasAnyPermission,
  hasPermission,
  isSuperAdmin,
  type UserPermissionKey,
} from './permissions';

const superAdmin = { role: 'super_admin' as const, permissions: [] as string[] };

const onlyLeads = { role: 'admin' as const, permissions: ['manage_leads'] };

describe('hasPermission', () => {
  it('denies everything when the grant list is empty', () => {
    // The core defect: an empty list used to mean "full access". Because the
    // login response never included permissions, this branch was the default for
    // every administrator.
    expect(hasPermission({ role: 'admin', permissions: [] }, 'manage_leads')).toBe(false);
  });

  it('denies everything when permissions are missing or null', () => {
    expect(hasPermission({ role: 'admin' }, 'manage_leads')).toBe(false);
    expect(hasPermission({ role: 'admin', permissions: null }, 'manage_leads')).toBe(false);
  });

  it('denies everything for a missing user', () => {
    expect(hasPermission(null, 'manage_leads')).toBe(false);
    expect(hasPermission(undefined, 'manage_leads')).toBe(false);
  });

  it('grants a held permission', () => {
    expect(hasPermission(onlyLeads, 'manage_leads')).toBe(true);
  });

  it('denies an unheld permission', () => {
    expect(hasPermission(onlyLeads, 'manage_gallery')).toBe(false);
  });

  it('does not match on a prefix or substring', () => {
    expect(hasPermission({ role: 'admin', permissions: ['manage_leads_all'] }, 'manage_leads')).toBe(false);
  });

  it('lets a super admin through regardless of grants', () => {
    expect(hasPermission(superAdmin, 'manage_leads')).toBe(true);
    expect(hasPermission(superAdmin, 'manage_users')).toBe(true);
  });

  it('treats a null requirement as ungated', () => {
    // Used by self-service screens such as changing one's own password.
    expect(hasPermission({ role: 'admin', permissions: [] }, null)).toBe(true);
    expect(hasPermission({ role: 'admin', permissions: [] }, undefined)).toBe(true);
  });

  it('never treats a non-array permissions value as access', () => {
    const malformed = { role: 'admin', permissions: 'manage_leads' } as never;
    expect(hasPermission(malformed, 'manage_leads')).toBe(false);
  });
});

describe('hasAnyPermission', () => {
  it('is true when at least one requirement is held', () => {
    expect(hasAnyPermission(onlyLeads, ['manage_gallery', 'manage_leads'])).toBe(true);
  });

  it('is false when none are held', () => {
    expect(hasAnyPermission(onlyLeads, ['manage_gallery', 'manage_users'])).toBe(false);
  });

  it('is false against an empty grant set', () => {
    expect(hasAnyPermission({ role: 'admin', permissions: [] }, ['manage_leads'])).toBe(false);
  });
});

describe('isSuperAdmin', () => {
  it('recognises only the super_admin role', () => {
    expect(isSuperAdmin({ role: 'super_admin' })).toBe(true);
    expect(isSuperAdmin({ role: 'admin' })).toBe(false);
    expect(isSuperAdmin(null)).toBe(false);
  });
});

describe('tab authorization', () => {
  it('maps every tab to a capability', () => {
    for (const tabId of Object.keys(TAB_PERMISSIONS)) {
      expect(canAccessTab(superAdmin, tabId)).toBe(true);
    }
  });

  it('leaves only the security tab ungated', () => {
    const ungated = Object.entries(TAB_PERMISSIONS)
      .filter(([, permission]) => permission === null)
      .map(([tabId]) => tabId);

    expect(ungated).toEqual(['security']);
  });

  it('does not let one page capability unlock another page', () => {
    // The previous mapping pointed every content tab at `manage_homepage_cms`,
    // so granting access to one page granted all of them.
    const homepageOnly: UserPermissionKey[] = ['manage_homepage'];

    const homeOnlyUser = { role: 'admin' as const, permissions: homepageOnly };

    expect(canAccessTab(homeOnlyUser, 'homepage_cms')).toBe(true);
    expect(canAccessTab(homeOnlyUser, 'blocks_cms')).toBe(false);
    expect(canAccessTab(homeOnlyUser, 'master_plan_cms')).toBe(false);
    expect(canAccessTab(homeOnlyUser, 'payment_plan_cms')).toBe(false);
    expect(canAccessTab(homeOnlyUser, 'noc_cms')).toBe(false);
    expect(canAccessTab(homeOnlyUser, 'about_page' as string)).toBe(false);
  });

  it('denies every gated tab to a zero-permission administrator', () => {
    const nobody = { role: 'admin' as const, permissions: [] };

    for (const [tabId, permission] of Object.entries(TAB_PERMISSIONS)) {
      if (permission === null) continue;
      expect(canAccessTab(nobody, tabId)).toBe(false);
    }
  });

  it('leaves the security tab reachable for a zero-permission administrator', () => {
    expect(canAccessTab({ role: 'admin', permissions: [] }, 'security')).toBe(true);
  });

  it('keeps a known tab id safe and denies an unmapped one', () => {
    const nobody = { role: 'admin' as const, permissions: [] };

    expect(canAccessTab(nobody, 'security')).toBe(true);

    // An id absent from the map must fail closed. A truthiness check here would
    // hand `undefined` to hasPermission, take the "no requirement" branch and
    // return true for any tab id the map does not know about.
    expect(canAccessTab(nobody, 'not_a_real_tab')).toBe(false);
    expect(canAccessTab(superAdmin, 'not_a_real_tab')).toBe(false);
    expect(canAccessTab(onlyLeads, 'not_a_real_tab')).toBe(false);
  });

  it('denies a tab id inherited from the object prototype', () => {
    expect(canAccessTab(superAdmin, 'constructor')).toBe(false);
    expect(canAccessTab(superAdmin, 'toString')).toBe(false);
  });
});

describe('catalogue', () => {
  it('has no duplicate keys', () => {
    const keys = FALLBACK_PERMISSION_CATALOGUE.map((p) => p.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('covers every tab requirement except the ungated ones', () => {
    const required = new Set(
      Object.values(TAB_PERMISSIONS).filter((p): p is UserPermissionKey => p !== null)
    );
    const available = new Set(FALLBACK_PERMISSION_CATALOGUE.map((p) => p.key));

    for (const permission of required) {
      expect(available.has(permission)).toBe(true);
    }
  });

  it('groups the catalogue without losing entries', () => {
    const grouped = groupCatalogue(FALLBACK_PERMISSION_CATALOGUE);
    const flattened = grouped.flatMap((g) => g.items);

    expect(flattened.length).toBe(FALLBACK_PERMISSION_CATALOGUE.length);
    expect(grouped.map((g) => g.group)).toEqual(['Content', 'Settings', 'Records', 'Accounts']);
  });
});
