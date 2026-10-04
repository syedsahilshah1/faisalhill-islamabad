/**
 * Tests for the inline enquiry form and its modal wrapper.
 *
 * The form is the path a visitor takes to reach sales, so the behaviours that
 * matter are: it refuses to create an unreachable lead, it reports a failed
 * submission as a failure rather than a success, and it carries the email into
 * the payload the dashboard and the notification email both read.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import QuickLeadForm from './QuickLeadForm';
import QuickLeadModal from './QuickLeadModal';
import { submitLead } from '@/data/faisalHillsData';

jest.mock('@/data/faisalHillsData', () => ({
  submitLead: jest.fn(),
}));

const mockedSubmitLead = submitLead as jest.MockedFunction<typeof submitLead>;

describe('QuickLeadForm', () => {
  beforeEach(() => {
    mockedSubmitLead.mockReset();
    mockedSubmitLead.mockResolvedValue({ success: true });
  });

  it('refuses to submit with no way to reply', async () => {
    render(<QuickLeadForm />);

    fireEvent.click(screen.getByRole('button', { name: /get rates/i }));

    // The backend tolerates a fully empty lead because the newsletter form
    // shares this endpoint. The UI must not, or sales receives enquiries with
    // no contact details at all.
    await waitFor(() => {
      expect(
        screen.getByRole('alert').textContent || ''
      ).toMatch(/phone number or an email address/i);
    });

    expect(mockedSubmitLead).not.toHaveBeenCalled();
  });

  it('sends the entered details and reports success in place', async () => {
    render(<QuickLeadForm defaultInterest="Plot Inventory Enquiry" />);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: 'Ali Raza' }
    });
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: '0300-1234567' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'ali@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/what are you looking for/i), {
      target: { value: '5 Marla park facing' }
    });

    fireEvent.click(screen.getByRole('button', { name: /get rates/i }));

    await waitFor(() => expect(mockedSubmitLead).toHaveBeenCalledTimes(1));

    expect(mockedSubmitLead).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Ali Raza',
        phone: '0300-1234567',
        email: 'ali@example.com',
        interest: 'Plot Inventory Enquiry'
      })
    );

    // Confirms without a navigation or a forced WhatsApp popup.
    await waitFor(() => expect(screen.getByText(/enquiry received/i)).toBeInTheDocument());
  });

  it('derives a name from the address when the name is left blank', async () => {
    render(<QuickLeadForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'nameless@example.com' }
    });
    fireEvent.click(screen.getByRole('button', { name: /get rates/i }));

    await waitFor(() => expect(mockedSubmitLead).toHaveBeenCalled());

    expect(mockedSubmitLead.mock.calls[0][0].name).toBe('nameless');
  });

  it('uses the address as the phone when only an email is given', async () => {
    render(<QuickLeadForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'only@example.com' }
    });
    fireEvent.click(screen.getByRole('button', { name: /get rates/i }));

    await waitFor(() => expect(mockedSubmitLead).toHaveBeenCalled());

    const payload = mockedSubmitLead.mock.calls[0][0];
    expect(payload.phone).toBe('only@example.com');
    expect(payload.email).toBe('only@example.com');
  });

  it('keeps the address in the message so it survives a message-only reader', async () => {
    render(<QuickLeadForm />);

    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '0300-1' } });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'keep@example.com' }
    });
    fireEvent.click(screen.getByRole('button', { name: /get rates/i }));

    await waitFor(() => expect(mockedSubmitLead).toHaveBeenCalled());

    expect(mockedSubmitLead.mock.calls[0][0].message).toContain('keep@example.com');
  });

  it('reports a failed submission as a failure and keeps the values', async () => {
    mockedSubmitLead.mockRejectedValue(new Error('The email address is invalid.'));

    render(<QuickLeadForm />);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: 'Retry Me' }
    });
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: '0300-999' }
    });

    fireEvent.click(screen.getByRole('button', { name: /get rates/i }));

    // A lost enquiry must never be shown as a success, and the typed values
    // must survive so the visitor can retry without retyping.
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
    expect(screen.queryByText(/enquiry received/i)).not.toBeInTheDocument();
    expect((screen.getByLabelText(/full name/i) as HTMLInputElement).value).toBe('Retry Me');
  });

  it('shows the server reason rather than a generic failure', async () => {
    // The endpoint fails for very different reasons — a rejected field, an
    // exhausted rate limit, a schema mismatch. "Check your connection" is wrong
    // for all of them and hides the cause from whoever is debugging.
    mockedSubmitLead.mockRejectedValue(new Error('The email field must be a valid email address.'));

    render(<QuickLeadForm />);

    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '0300-1' } });
    fireEvent.click(screen.getByRole('button', { name: /get rates/i }));

    await waitFor(() =>
      expect(screen.getByRole('alert').textContent || '').toMatch(/valid email address/i)
    );
  });

  it('can send another enquiry after a success', async () => {
    render(<QuickLeadForm />);

    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '0300-1' } });
    fireEvent.click(screen.getByRole('button', { name: /get rates/i }));

    await waitFor(() => expect(screen.getByText(/enquiry received/i)).toBeInTheDocument());

    fireEvent.click(screen.getByRole('button', { name: /send another enquiry/i }));

    expect(screen.getByRole('button', { name: /get rates/i })).toBeInTheDocument();
  });
});

describe('QuickLeadModal', () => {
  it('renders nothing while closed', () => {
    const { container } = render(
      <QuickLeadModal isOpen={false} onClose={jest.fn()} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders the form when open', () => {
    render(<QuickLeadModal isOpen onClose={jest.fn()} title="Ask About a Plot" />);

    expect(screen.getByText('Ask About a Plot')).toBeInTheDocument();
  });

  it('closes on Escape', () => {
    const onClose = jest.fn();

    render(<QuickLeadModal isOpen onClose={onClose} />);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).toHaveBeenCalled();
  });

  it('closes when the backdrop is clicked', () => {
    const onClose = jest.fn();

    const { container } = render(<QuickLeadModal isOpen onClose={onClose} />);

    fireEvent.click(container.querySelector('[aria-hidden="true"]') as Element);

    expect(onClose).toHaveBeenCalled();
  });

  it('closes from the close button', () => {
    const onClose = jest.fn();

    render(<QuickLeadModal isOpen onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: /close enquiry form/i }));

    expect(onClose).toHaveBeenCalled();
  });

  it('locks page scroll while open and restores it on close', () => {
    const { unmount } = render(<QuickLeadModal isOpen onClose={jest.fn()} />);

    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    // Leaving the body locked would make the whole page unscrollable after the
    // visitor dismissed the dialog.
    expect(document.body.style.overflow).not.toBe('hidden');
  });
});
