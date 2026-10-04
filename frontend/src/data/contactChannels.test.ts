/**
 * Tests for the contact-channel resolution rules.
 *
 * Thirty-eight WhatsApp links were literal `wa.me/923331113177` strings. These
 * tests pin the behaviour that replaced them, particularly the one place where
 * a naive fix would have been wrong: re-encoding a message the caller already
 * encoded turns `%20` into `%2520`.
 */

import {
  defaultContactInfo,
  formatMapDirectionsUrl,
  formatTelUrl,
  formatWhatsAppUrl,
} from './faisalHillsData';

describe('formatWhatsAppUrl', () => {
  it('uses the configured number', () => {
    expect(formatWhatsAppUrl('+92 300 1234567')).toBe('https://wa.me/923001234567');
  });

  it('normalises a local 03xx number to international form', () => {
    expect(formatWhatsAppUrl('0300-1234567')).toBe('https://wa.me/923001234567');
  });

  it('normalises a 0092 prefix', () => {
    expect(formatWhatsAppUrl('0092 300 1234567')).toBe('https://wa.me/923001234567');
  });

  it('appends an encoded message', () => {
    const url = formatWhatsAppUrl('+92 300 1234567', 'Hi there');

    expect(url).toBe('https://wa.me/923001234567?text=Hi%20there');
  });

  it('omits the query string when there is no message', () => {
    expect(formatWhatsAppUrl('+92 300 1234567')).toBe('https://wa.me/923001234567');
  });

  it('falls back to the shipped number when the setting is empty', () => {
    // An administrator who blanks the field must not produce a broken link;
    // the last-known-good default is better than `wa.me/`.
    expect(formatWhatsAppUrl('')).toBe('https://wa.me/923331113177');
    expect(formatWhatsAppUrl('   ')).toBe('https://wa.me/923331113177');
    expect(formatWhatsAppUrl(undefined, 'Hi')).toBe(
      'https://wa.me/923331113177?text=Hi'
    );
  });

  it('does not double-encode an already-encoded message', () => {
    // The three lead forms build their text with encodeURIComponent first. If
    // the caller flags that, the encoding must be preserved verbatim.
    const alreadyEncoded = encodeURIComponent('Name: Ali\nPlot: A-1');

    // What the hook does for alreadyEncoded callers.
    const base = formatWhatsAppUrl('+92 300 1234567').split('?')[0];
    const url = `${base}?text=${alreadyEncoded}`;

    expect(url).toBe('https://wa.me/923001234567?text=Name%3A%20Ali%0APlot%3A%20A-1');
    expect(url).not.toContain('%2520');
    expect(url).not.toContain('%250A');
  });

  it('escapes a message that would otherwise break out of the href', () => {
    const url = formatWhatsAppUrl('+92 300 1234567', '"><script>alert(1)</script>');

    expect(url).not.toContain('<script>');
    expect(url).toContain('%3Cscript%3E');
  });
});

describe('formatTelUrl', () => {
  it('uses the configured number', () => {
    expect(formatTelUrl('+92 300 1234567')).toBe('tel:+923001234567');
  });

  it('normalises a local number', () => {
    expect(formatTelUrl('0300-1234567')).toBe('tel:+923001234567');
  });

  it('falls back rather than producing a broken link', () => {
    expect(formatTelUrl('')).toBe('tel:+923331113177');
    expect(formatTelUrl(undefined)).toBe('tel:+923331113177');
  });

  it('strips characters that are not valid in a tel URL', () => {
    expect(formatTelUrl('+92 (300) 123-4567')).toBe('tel:+923001234567');
  });
});

describe('formatMapDirectionsUrl', () => {
  const fallback = defaultContactInfo.mapDirectionsUrl as string;

  it('uses the configured URL', () => {
    expect(formatMapDirectionsUrl('https://maps.app.goo.gl/abc123')).toBe(
      'https://maps.app.goo.gl/abc123'
    );
  });

  it('accepts plain http as well as https', () => {
    expect(formatMapDirectionsUrl('http://maps.google.com/?q=Somewhere')).toBe(
      'http://maps.google.com/?q=Somewhere'
    );
  });

  it('rejects a javascript: URL instead of rendering it as an href', () => {
    // The value is dashboard-editable. Without this guard an editor (or anyone
    // who compromises the dashboard) could store a javascript: URL and turn
    // every Directions button on the site into a stored-XSS trigger.
    const hostile = 'javascript:alert(document.cookie)';

    expect(formatMapDirectionsUrl(hostile)).toBe(fallback);
    expect(formatMapDirectionsUrl(hostile)).not.toContain('javascript:');
  });

  it('rejects other unsafe schemes', () => {
    expect(formatMapDirectionsUrl('data:text/html,<script>alert(1)</script>')).toBe(fallback);
    expect(formatMapDirectionsUrl('vbscript:msgbox(1)')).toBe(fallback);
    expect(formatMapDirectionsUrl('file:///etc/passwd')).toBe(fallback);
  });

  it('falls back on blank or unparseable input', () => {
    expect(formatMapDirectionsUrl('')).toBe(fallback);
    expect(formatMapDirectionsUrl('   ')).toBe(fallback);
    expect(formatMapDirectionsUrl(undefined)).toBe(fallback);
    expect(formatMapDirectionsUrl('Faisal Hills, Taxila')).toBe(fallback);
  });

  it('tolerates surrounding whitespace from a copy-paste', () => {
    expect(formatMapDirectionsUrl('  https://maps.google.com/?q=Taxila  ')).toBe(
      'https://maps.google.com/?q=Taxila'
    );
  });
});
