'use client';

import React, { useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

import { submitLead } from '@/data/faisalHillsData';

export interface QuickLeadFormProps {
  /** Heading above the fields. */
  title?: string;
  /** Supporting line under the heading. */
  subtitle?: string;
  /**
   * Prefilled `interest`, so the sales team knows which part of the site the
   * enquiry came from. Shown to the user as read-only context rather than an
   * editable field, because it is set by the page, not the visitor.
   */
  defaultInterest?: string;
  /** Layout density. `bar` is a single row for page headers. */
  layout?: 'bar' | 'card';
  className?: string;
}

type Status = 'idle' | 'submitting' | 'done' | 'error';

/**
 * Inline enquiry form that creates a lead.
 *
 * This posts through `submitLead`, which stores the lead in localStorage for the
 * dashboard and sends it to `POST /api/leads`. The backend persists the row and
 * emails the super admins, so a submission here reaches sales by both routes.
 *
 * Deliberately does *not* force a WhatsApp redirect the way `LeadModal` does.
 * That modal treats WhatsApp as the confirmation step, which hijacks the tab and
 * reads as a loss of the submitted form. This one confirms in place and lets the
 * visitor choose to contact WhatsApp afterwards, if at all.
 */
export const QuickLeadForm: React.FC<QuickLeadFormProps> = ({
  title = 'Get Verified Rates & Availability',
  subtitle = 'Leave your details and our sales desk will call you with current plot rates, payment plans and availability.',
  defaultInterest = 'General Inquiry',
  layout = 'card',
  className = ''
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Require at least one way to reply. The backend accepts an entirely empty
    // lead because the newsletter signup reuses this endpoint, but a form that
    // offers no contact field would create leads nobody can answer.
    const hasContact = phone.trim() || email.trim();
    if (!hasContact) {
      setError('Please add a phone number or an email address so we can reach you.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setError('');

    try {
      await submitLead({
        name: name.trim() || (email.trim() ? email.trim().split('@')[0] : 'Interested Buyer'),
        phone: phone.trim() || (email.trim() ? email.trim() : 'N/A'),
        email: email.trim() || undefined,
        interest: defaultInterest,
        // The email is also folded into the message so it survives in the
        // notification body and in the dashboard row even if a reader is
        // looking only at the message field.
        message: message.trim()
          ? `${message.trim()}${email.trim() ? `\nEmail: ${email.trim()}` : ''}`
          : email.trim()
            ? `Email: ${email.trim()}`
            : ''
      });

      setStatus('done');
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch (err) {
      // Show the server's own reason. A blanket "check your connection" is
      // actively misleading when the cause is a rejected field or an exhausted
      // rate limit, and it tells whoever is debugging nothing at all.
      setStatus('error');
      setError(
        err instanceof Error && err.message
          ? `We could not send your enquiry: ${err.message}`
          : 'We could not send your enquiry. Please try again.'
      );
    }
  };

  if (status === 'done') {
    return (
      <div
        className={`flex items-start gap-3 p-4 sm:p-5 rounded-2xl border border-emerald-200 bg-emerald-50 ${className}`}
        role="status"
      >
        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-sm font-bold text-emerald-900">Enquiry received</p>
          <p className="text-xs text-emerald-800">
            Thank you. Our sales desk has your details and will contact you shortly
            about {defaultInterest.toLowerCase()}.
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="text-[11px] font-bold text-emerald-800 underline cursor-pointer hover:text-emerald-900"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  const inputClass =
    'w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#7b002c] focus:ring-2 focus:ring-[#7b002c]/20 transition';

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 shadow-sm ${className}`}
    >
      {layout === 'card' && (
        <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-[#7b002c] mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span className="label-caps text-[10px] font-bold">Official Enquiry</span>
          </div>
          <h3 className="font-serif font-bold text-lg text-slate-900">{title}</h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{subtitle}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="qlf-name"
              className="block text-[11px] font-bold text-slate-700 mb-1"
            >
              Full Name
            </label>
            <input
              id="qlf-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Muhammad Ali"
              autoComplete="name"
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="qlf-phone"
              className="block text-[11px] font-bold text-slate-700 mb-1"
            >
              Phone / WhatsApp
            </label>
            <input
              id="qlf-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+92 300 0000000"
              autoComplete="tel"
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="qlf-email"
              className="block text-[11px] font-bold text-slate-700 mb-1"
            >
              Email
            </label>
            <input
              id="qlf-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="qlf-message"
            className="block text-[11px] font-bold text-slate-700 mb-1"
          >
            What are you looking for?{' '}
            <span className="font-medium text-slate-400">(optional)</span>
          </label>
          <input
            id="qlf-message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g. 5 Marla park facing in Block A"
            className={inputClass}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5">
          <p className="text-[10px] text-slate-500 font-medium leading-tight max-w-xs">
            Your enquiry goes straight to our sales desk. We never share your details.
          </p>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] disabled:opacity-70 text-white rounded-xl text-xs font-bold shadow-sm transition cursor-pointer disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Get Rates</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <p
            role="alert"
            className="flex items-start gap-1.5 text-[11px] font-semibold text-red-700 bg-red-50 border border-red-200 px-2.5 py-1.5 rounded-lg"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-px" />
            <span>{error}</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default QuickLeadForm;
