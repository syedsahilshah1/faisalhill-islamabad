'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

import QuickLeadForm, { type QuickLeadFormProps } from './QuickLeadForm';

export interface QuickLeadModalProps extends QuickLeadFormProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * QuickLeadForm in a modal.
 *
 * The inventory page shows a dozen-plus plots at a time. Giving the enquiry form
 * its own permanent block above that grid pushed the actual inventory below the
 * fold, so the form is behind a button here instead and the page keeps its
 * original shape.
 *
 * Closes on backdrop click and on Escape, and locks body scroll while open so
 * the page behind cannot scroll away underneath the dialog.
 */
export const QuickLeadModal: React.FC<QuickLeadModalProps> = ({
  isOpen,
  onClose,
  ...formProps
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);

    // Compensate for the vanishing scrollbar so the page does not shift
    // horizontally the moment the dialog opens.
    const previousOverflow = document.body.style.overflow;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-start sm:items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Send an enquiry"
    >
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg my-auto animate-fade-up">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close enquiry form"
          className="absolute -top-3 right-0 sm:-right-3 sm:top-0 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white text-slate-600 hover:text-slate-900 shadow-lg border border-slate-200 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <QuickLeadForm {...formProps} />
      </div>
    </div>
  );
};

export default QuickLeadModal;
