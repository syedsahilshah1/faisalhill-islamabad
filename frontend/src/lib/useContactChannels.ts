'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  defaultContactInfo,
  defaultSocialLinks,
  fetchSettingByKey,
  formatMapDirectionsUrl,
  formatTelUrl,
  formatWhatsAppUrl,
  type ContactInfoData,
  type SocialLinksData,
} from '@/data/faisalHillsData';

export type ContactChannels = {
  /** Settings-backed contact details, falling back to the shipped defaults. */
  contact: ContactInfoData;
  /** Settings-backed social profiles, falling back to the shipped defaults. */
  socials: SocialLinksData;
  /**
   * Build a WhatsApp deep link for `message` using the configured number.
   *
   * Pass `number` to override, which the pages that carry a page-specific
   * contact number do.
   *
   * Pass `alreadyEncoded` when the caller built `message` with
   * `encodeURIComponent` itself — those three lead forms do, and re-encoding
   * would double-escape the `%20`s into `%2520`.
   */
  whatsappUrl: (message?: string, number?: string, alreadyEncoded?: boolean) => string;
  /** Build a `tel:` link, preferring the sales hotline over the WhatsApp line. */
  telUrl: (rawNumber?: string) => string;
  /**
   * External map link for "Directions" controls, sanitised to http(s).
   *
   * `embedUrl` lets a page pass the map iframe it already renders, so a block
   * configured with its own location sends visitors to that block rather than
   * to the society-wide pin.
   */
  directionsUrl: (embedUrl?: string) => string;
  /** The number most likely to be the right one to show a visitor. */
  primaryPhone: string;
  /** True until the settings request has settled. */
  loading: boolean;
};

/**
 * Site-wide contact channels, editable from the dashboard.
 *
 * Thirty-eight WhatsApp links and three telephone links were previously written
 * as literal `https://wa.me/923331113177` strings across seventeen components.
 * Changing the sales number meant finding and editing every one of them, and
 * missing a single one left a dead contact route on the live site. Those literals
 * now all route through this hook or through the `formatWhatsAppUrl` helper fed
 * by a page's own CMS settings.
 *
 * This hook reads the same `social_links` and `contact_info` settings the
 * homepage already used, so a number edited in the dashboard propagates
 * everywhere. The defaults are returned until the request resolves, so nothing
 * renders empty and there is no layout shift.
 *
 * `fetchSettingByKey` coalesces and caches, so several components mounting at
 * once on a page still produce a single request.
 */
export function useContactChannels(): ContactChannels {
  const [contact, setContact] = useState<ContactInfoData>(defaultContactInfo);
  const [socials, setSocials] = useState<SocialLinksData>(defaultSocialLinks);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    // Rendered from localStorage immediately so the first paint already shows
    // the previously saved values rather than the shipped defaults.
    try {
      const cachedContact = localStorage.getItem('faisal_contact_info');
      const cachedSocials = localStorage.getItem('faisal_social_links');

      if (cachedContact) setContact({ ...defaultContactInfo, ...JSON.parse(cachedContact) });
      if (cachedSocials) setSocials({ ...defaultSocialLinks, ...JSON.parse(cachedSocials) });
    } catch {
      // A corrupt cache entry must not break the page; the network fetch below
      // is the source of truth anyway.
    }

    Promise.all([
      fetchSettingByKey<SocialLinksData>('social_links'),
      fetchSettingByKey<ContactInfoData>('contact_info'),
    ]).then(([nextSocials, nextContact]) => {
      if (cancelled) return;

      if (nextSocials) setSocials({ ...defaultSocialLinks, ...nextSocials });
      if (nextContact) setContact({ ...defaultContactInfo, ...nextContact });

      setLoading(false);
    }).catch(() => {
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const whatsappUrl = useCallback(
    (message?: string, number?: string, alreadyEncoded?: boolean) => {
      const target = number || contact.salesHotline || socials.whatsapp;

      if (!alreadyEncoded || !message) {
        return formatWhatsAppUrl(target, message);
      }

      // Reuse the data layer's number normalisation but keep the caller's
      // existing percent-encoding intact.
      const base = formatWhatsAppUrl(target).split('?')[0];
      return `${base}?text=${message}`;
    },
    [contact.salesHotline, socials.whatsapp]
  );

  const telUrl = useCallback(
    (rawNumber?: string) => formatTelUrl(rawNumber || contact.salesHotline || socials.whatsapp),
    [contact.salesHotline, socials.whatsapp]
  );

  const directionsUrl = useCallback(
    (embedUrl?: string) => {
      // An embed that carries a `q=` search term already names the place it
      // shows, so reuse it rather than sending visitors to the society pin.
      if (embedUrl && embedUrl.trim()) {
        try {
          const query = new URL(embedUrl.trim()).searchParams.get('q');
          if (query && query.trim()) {
            return formatMapDirectionsUrl(
              `https://maps.google.com/?q=${encodeURIComponent(query.trim())}`
            );
          }
        } catch {
          // Not a parseable absolute URL; fall through to the configured link.
        }
      }

      return formatMapDirectionsUrl(contact.mapDirectionsUrl);
    },
    [contact.mapDirectionsUrl]
  );

  const primaryPhone = contact.salesHotline || socials.whatsapp || defaultContactInfo.salesHotline;

  return { contact, socials, whatsappUrl, telUrl, directionsUrl, primaryPhone, loading };
}
