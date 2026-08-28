'use client';

import React, { useState } from 'react';
import { X, MessageSquare, CheckCircle, ShieldCheck, Loader2 } from 'lucide-react';
import { blocksData, submitLead } from '@/data/faisalHillsData';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultBlock?: string;
  defaultPlot?: string;
  interest?: string;
}


export default function LeadModal({ isOpen, onClose, defaultBlock = '', defaultPlot = '', interest = '' }: LeadModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedBlock, setSelectedBlock] = useState(defaultBlock || 'Executive Block');
  const [plotSize, setPlotSize] = useState('5 Marla');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const leadInterest = interest || `${selectedBlock} (${plotSize}) ${defaultPlot ? `- Plot ${defaultPlot}` : ''}`;
    const leadMessage = message || `Interested in ${selectedBlock} (${plotSize})${defaultPlot ? ` - Plot ${defaultPlot}` : ''}`;

    // 1. Save to LocalStorage for Admin Panel
    if (typeof window !== 'undefined') {
      const existingLeads = JSON.parse(localStorage.getItem('faisal_leads_data') || '[]');
      const newLead = {
        id: `lead-${Date.now()}`,
        name: name || 'Interested Buyer',
        phone: phone || 'N/A',
        interest: leadInterest,
        message: leadMessage,
        submittedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      localStorage.setItem('faisal_leads_data', JSON.stringify([newLead, ...existingLeads]));
      window.dispatchEvent(new Event('faisal_leads_updated'));
    }

    // 2. Submit to Backend API
    try {
      await submitLead({
        name: name || 'Interested Buyer',
        phone: phone || 'N/A',
        interest: leadInterest,
        message: leadMessage,
      });
    } catch (err) {
      console.warn('API lead submission fallback to WhatsApp:', err);
    }

    setIsSubmitting(false);
    setSubmitted(true);

    const waText = encodeURIComponent(
      `Hello Faisal Hills Sales Team!\n\nI am interested in booking / inquiry:\nName: ${name}\nPhone: ${phone}\nBlock Interest: ${selectedBlock}\nPlot Size: ${plotSize}\n${defaultPlot ? `Specific Plot: ${defaultPlot}\n` : ''}${interest ? `Inquiry / Interest: ${interest}\n` : ''}${message ? `Message: ${message}` : ''}`
    );
    
    // Open WhatsApp after brief delay
    setTimeout(() => {
      window.open(`https://wa.me/923044811717?text=${waText}`, '_blank');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto transition-opacity duration-300">
      
      {/* Click backdrop to close */}
      <div className="fixed inset-0 bg-slate-950/90 -z-10" onClick={onClose} />

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden relative transform transition-all duration-300 scale-100 my-auto z-10 animate-fade-up">
        
        {/* Header */}
        <div className="bg-[#7b002c] text-white p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1.5 rounded-full hover:bg-black/20 transition-colors cursor-pointer z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-white/80 mb-1">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span className="label-caps text-[10px]">Official Booking & Inquiry</span>
          </div>

          <h3 className="font-serif font-bold text-2xl pr-6">
            {defaultPlot ? `Inquire about Plot ${defaultPlot}` : 'Book Your Plot in Faisal Hills'}
          </h3>
          <p className="text-white/80 text-xs mt-1">
            Get official rates, map layout & payment plan directly on WhatsApp
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 text-[#7b002c] rounded-full flex items-center justify-center mx-auto border border-slate-200">
                <CheckCircle className="w-10 h-10 text-[#7b002c]" />
              </div>
              <h4 className="font-serif text-xl font-bold text-[#7b002c]">Inquiry Redirecting to WhatsApp</h4>
              <p className="text-sm text-slate-600 max-w-xs mx-auto">
                Thank you, <strong>{name}</strong>. Our senior Faisal Hills consultant will connect with you immediately.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Muhammad Ali"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#7b002c] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">WhatsApp / Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+92 300 0000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#7b002c] transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">Select Block</label>
                  <select
                    value={selectedBlock}
                    onChange={(e) => setSelectedBlock(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  >
                    {blocksData.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">Preferred Size</label>
                  <select
                    value={plotSize}
                    onChange={(e) => setPlotSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  >
                    <option value="5 Marla">5 Marla (25x50)</option>
                    <option value="10 Marla">10 Marla (35x70)</option>
                    <option value="1 Kanal">1 Kanal (50x90)</option>
                    <option value="2 Kanal">2 Kanal (75x120)</option>
                    <option value="Commercial Plot">Commercial Plot</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">Specific Requirements / Message</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Looking for park facing or corner plot in Block A"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#7b002c]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#7b002c] hover:bg-[#9e1245] disabled:opacity-75 text-white rounded-xl text-sm font-semibold shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span>Connect via WhatsApp Sales Team</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
