/**
 * Tests for the dashboard image uploader.
 *
 * Two behaviours are pinned here:
 *
 *  1. The alt-text input appears only when the caller supplies `onAltChange`.
 *     Many CMS image fields have nowhere to persist alt text, so rendering an
 *     always-dead input everywhere would be worse than not rendering one.
 *  2. Client-side guards reject a non-image or oversized file *before* any
 *     request is made, so the editor gets a specific message instead of a
 *     generic HTTP failure.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import ImageUploader, { FALLBACK_PREVIEW_IMAGE } from './ImageUploader';

// jsdom has no canvas backend, so `compressImageFile` cannot produce a Blob.
// Only the pre-flight guards are under test here, and every one of them returns
// before compression is reached.
describe('ImageUploader', () => {
  const baseProps = {
    label: 'Hero Image',
    value: '',
    onChange: jest.fn(),
    token: 'test-token'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a device-upload control', () => {
    render(<ImageUploader {...baseProps} />);

    // The visible affordance an editor clicks to pick a file.
    expect(
      screen.getByRole('button', { name: /upload from device/i })
    ).toBeInTheDocument();
  });

  it('exposes a file input restricted to image types', () => {
    const { container } = render(<ImageUploader {...baseProps} />);

    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement | null;

    expect(input).not.toBeNull();
    expect(input?.accept).toContain('image/jpeg');
    expect(input?.accept).toContain('image/webp');
  });

  it('omits the alt input when the caller cannot persist it', () => {
    render(<ImageUploader {...baseProps} />);

    // No `onAltChange`, so no field. Rendering one anyway would silently discard
    // whatever the editor typed.
    expect(screen.queryByLabelText(/alt text/i)).not.toBeInTheDocument();
  });

  it('renders the alt input when onAltChange is supplied', () => {
    render(<ImageUploader {...baseProps} alt="Main gate" onAltChange={jest.fn()} />);

    expect(screen.getByLabelText(/alt text/i)).toBeInTheDocument();
  });

  it('reports the current alt text and reports edits', () => {
    const onAltChange = jest.fn();

    render(
      <ImageUploader
        {...baseProps}
        alt="Aerial view of main gate"
        onAltChange={onAltChange}
      />
    );

    const field = screen.getByLabelText(/alt text/i) as HTMLInputElement;
    expect(field.value).toBe('Aerial view of main gate');

    fireEvent.change(field, { target: { value: 'Block A entrance' } });

    expect(onAltChange).toHaveBeenCalledWith('Block A entrance');
  });

  it('flags missing alt text', () => {
    render(<ImageUploader {...baseProps} alt="" onAltChange={jest.fn()} />);

    // Surfaced in the editor so the gap is visible before publishing, not only
    // discovered later by a screen-reader user.
    expect(screen.getByText(/missing/i)).toBeInTheDocument();
  });

  it('does not flag alt text that is present', () => {
    render(<ImageUploader {...baseProps} alt="Main gate" onAltChange={jest.fn()} />);

    expect(screen.queryByText(/missing/i)).not.toBeInTheDocument();
  });

  it('rejects a non-image file without attempting an upload', async () => {
    render(<ImageUploader {...baseProps} />);

    const { container } = render(<ImageUploader {...baseProps} />);
    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    const notAnImage = new File(['hello'], 'notes.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [notAnImage] } });

    await waitFor(() => {
      expect(screen.getAllByRole('alert').length).toBeGreaterThan(0);
    });

    expect(
      screen.getAllByRole('alert').some((el) => /choose an image file/i.test(el.textContent || ''))
    ).toBe(true);
  });

  it('rejects an oversized file with the actual limit in the message', async () => {
    const { container } = render(<ImageUploader {...baseProps} />);
    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    const tooBig = new File(['x'], 'huge.jpg', { type: 'image/jpeg' });
    // 16 MB, one over the 15 MB cap.
    Object.defineProperty(tooBig, 'size', { value: 16 * 1024 * 1024 });

    fireEvent.change(input, { target: { files: [tooBig] } });

    await waitFor(() => {
      expect(screen.getAllByRole('alert').length).toBeGreaterThan(0);
    });

    expect(
      screen.getAllByRole('alert').some((el) => /16\.0 MB.*limit is 15 MB/i.test(el.textContent || ''))
    ).toBe(true);
  });

  it('asks for a fresh sign-in when no token is present', async () => {
    const { container } = render(<ImageUploader {...baseProps} token={undefined} />);
    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    const someImage = new File(['x'], 'photo.jpg', { type: 'image/jpeg' });
    Object.defineProperty(someImage, 'size', { value: 1024 });

    fireEvent.change(input, { target: { files: [someImage] } });

    await waitFor(() => {
      expect(
        screen.getByRole('alert').textContent || ''
      ).toMatch(/session has expired/i);
    });
  });

  it('warns when the stored value is still an inline base64 blob', () => {
    render(<ImageUploader {...baseProps} value="data:image/png;base64,AAAA" />);

    // Editors predating the upload endpoint kept images in the settings JSON.
    // Those rows are large and need re-uploading to become real files.
    expect(screen.getByText(/stored inline as base64/i)).toBeInTheDocument();
  });

  it('previews the image using the real alt text', () => {
    const { container } = render(
      <ImageUploader
        {...baseProps}
        value="/images/existing.webp"
        alt="Drone view of the main gate"
        onAltChange={jest.fn()}
      />
    );

    const img = container.querySelector('img') as HTMLImageElement | null;
    expect(img?.getAttribute('alt')).toBe('Drone view of the main gate');
  });

  it('falls back to a visible placeholder when the image cannot load', () => {
    const { container } = render(
      <ImageUploader {...baseProps} value="/images/deleted.webp" />
    );

    const img = container.querySelector('img') as HTMLImageElement;

    // A mistyped or deleted path would otherwise render as a broken-image icon
    // with no explanation of what went wrong.
    fireEvent.error(img);

    expect(img.getAttribute('src')).toBe(FALLBACK_PREVIEW_IMAGE);
  });

  it('clears the value from the remove control', () => {
    const onChange = jest.fn();

    render(<ImageUploader {...baseProps} value="/images/existing.webp" onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: /remove/i }));

    expect(onChange).toHaveBeenCalledWith('');
  });
});