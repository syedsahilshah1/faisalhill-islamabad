'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Download, ShieldCheck, CheckCircle2, User, Phone, Mail, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';
import { submitLead } from '@/data/faisalHillsData';

interface PaymentPlanModalProps {
  isLightboxOpen: boolean;
  onCloseLightbox: () => void;
  isDownloadOpen: boolean;
  onCloseDownload: () => void;
  onOpenDownload: () => void;
  imageSrc?: string;
}

export default function PaymentPlanModal({
  isLightboxOpen,
  onCloseLightbox,
  isDownloadOpen,
  onCloseDownload,
  onOpenDownload,
  imageSrc = '/images/faisal-hill-payment-plan.jpg'
}: PaymentPlanModalProps) {
  // Download Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Lightbox Zoom & Pan State
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // References for native non-passive touch listeners
  const viewportRef = useRef<HTMLDivElement>(null);
  const zoomLevelRef = useRef(1);
  const panRef = useRef({ x: 0, y: 0 });
  zoomLevelRef.current = zoomLevel;
  panRef.current = pan;

  const handleZoomIn = () => {
    setZoomLevel((prev) => {
      const next = Math.min(prev + 0.5, 4.5);
      zoomLevelRef.current = next;
      return next;
    });
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.5, 1.0);
      zoomLevelRef.current = next;
      if (next === 1.0) {
        setPan({ x: 0, y: 0 });
        panRef.current = { x: 0, y: 0 };
      }
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
    zoomLevelRef.current = 1;
    panRef.current = { x: 0, y: 0 };
  };

  // Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    const nextPan = {
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    };
    setPan(nextPan);
    panRef.current = nextPan;
  };

  const handleMouseUp = () => setIsDragging(false);

  // Mouse Wheel Zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  // Native non-passive Touch Listeners to prevent mobile page zoom & enable smooth pinch-to-zoom
  useEffect(() => {
    const el = viewportRef.current;
    if (!el || !isLightboxOpen) return;

    let pinchDist = 0;
    let baseZoom = 1;
    let touchStartX = 0;
    let touchStartY = 0;
    let isPinching = false;
    let isPanning = false;
    let lastTapTime = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        isPinching = true;
        isPanning = false;
        pinchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        baseZoom = zoomLevelRef.current;
      } else if (e.touches.length === 1) {
        isPinching = false;
        const now = Date.now();
        if (now - lastTapTime < 300) {
          e.preventDefault();
          if (zoomLevelRef.current > 1) {
            handleResetZoom();
          } else {
            const newZ = 2.5;
            setZoomLevel(newZ);
            zoomLevelRef.current = newZ;
          }
          lastTapTime = 0;
          return;
        }
        lastTapTime = now;

        if (zoomLevelRef.current > 1) {
          e.preventDefault();
          isPanning = true;
          touchStartX = e.touches[0].clientX - panRef.current.x;
          touchStartY = e.touches[0].clientY - panRef.current.y;
        }
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isPinching && e.touches.length === 2) {
        e.preventDefault(); // Stop mobile browser from zooming entire viewport
        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        if (pinchDist > 0) {
          const scale = currentDist / pinchDist;
          const newZoom = Math.min(Math.max(baseZoom * scale, 1.0), 5.0);
          setZoomLevel(newZoom);
          zoomLevelRef.current = newZoom;
          if (newZoom === 1.0) {
            setPan({ x: 0, y: 0 });
            panRef.current = { x: 0, y: 0 };
          }
        }
      } else if (isPanning && e.touches.length === 1 && zoomLevelRef.current > 1) {
        e.preventDefault(); // Stop mobile page scroll
        const nextX = e.touches[0].clientX - touchStartX;
        const nextY = e.touches[0].clientY - touchStartY;
        setPan({ x: nextX, y: nextY });
        panRef.current = { x: nextX, y: nextY };
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        isPinching = false;
        pinchDist = 0;
      }
      if (e.touches.length === 0) {
        isPanning = false;
      }
    };

    const onGesture = (e: Event) => {
      e.preventDefault();
    };

    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: false });
    el.addEventListener('gesturestart', onGesture as any, { passive: false });
    el.addEventListener('gesturechange', onGesture as any, { passive: false });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('gesturestart', onGesture as any);
      el.removeEventListener('gesturechange', onGesture as any);
    };
  }, [isLightboxOpen]);

  // Lead Form Submission & Download Execution
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const leadData = {
      id: `lead-plan-${Date.now()}`,
      name: name || 'Interested Investor',
      phone: phone || 'N/A',
      email: email || 'N/A',
      interest: 'Faisal Hills Official Payment Plan Download',
      message: `Downloaded Payment Plan image. Phone/WhatsApp: ${phone}, Email: ${email}`,
      submittedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // 1. Save to LocalStorage for Admin Panel
    if (typeof window !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem('faisal_leads_data') || '[]');
      localStorage.setItem('faisal_leads_data', JSON.stringify([leadData, ...existing]));
      window.dispatchEvent(new Event('faisal_leads_updated'));
    }

    // 2. Submit to API backend
    try {
      await submitLead({
        name,
        phone,
        message: `PAYMENT PLAN DOWNLOAD LEAD - Email: ${email}, Phone: ${phone}`,
      });
    } catch (err) {
      console.error('Lead submission error:', err);
    }

    setIsSubmitting(false);
    setIsSuccess(true);

    // 3. Trigger actual Payment Plan Image Download
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'Faisal-Hills-Official-Payment-Plan.jpg';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Auto-close modal after 2.5s
    setTimeout(() => {
      setIsSuccess(false);
      onCloseDownload();
    }, 2500);
  };

  return (
    <>
      {/* ========================================================= */}
      {/* 1. FULLSCREEN LIGHTBOX PREVIEW MODAL WITH PINCH-TO-ZOOM   */}
      {/* ========================================================= */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[99990] flex flex-col bg-slate-950/95 backdrop-blur-md transition-all duration-300 select-none"
          style={{ touchAction: 'none' }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 bg-slate-900/95 border-b border-white/10 text-white z-20">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="font-serif font-bold text-xs sm:text-base text-rose-200 truncate">
                Faisal Hills Payment Plan
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-white/10 px-2 py-0.5 rounded-md hidden sm:inline-block">
                {Math.round(zoomLevel * 100)}%
              </span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl p-0.5">
                <button
                  onClick={handleZoomIn}
                  className="p-1 sm:p-1.5 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg transition cursor-pointer"
                  title="Zoom In"
                  aria-label="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="p-1 sm:p-1.5 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border-l border-slate-700 transition cursor-pointer"
                  title="Zoom Out"
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="p-1 sm:p-1.5 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border-l border-slate-700 transition cursor-pointer"
                  title="Reset Zoom"
                  aria-label="Reset View"
                >
                  <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              <button
                onClick={() => {
                  onCloseLightbox();
                  onOpenDownload();
                }}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-3.5 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>

              <button
                onClick={() => {
                  handleResetZoom();
                  onCloseLightbox();
                }}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer ml-0.5 sm:ml-1"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Interactive Multi-Touch Image Viewport */}
          <div
            ref={viewportRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ touchAction: 'none' }}
            className={`flex-1 flex flex-col items-center justify-center overflow-hidden p-2 sm:p-4 select-none ${
              zoomLevel > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
            }`}
          >
            <div
              className="max-w-full max-h-full flex items-center justify-center transition-transform duration-75 ease-out origin-center select-none"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})`
              }}
            >
              <img
                src={imageSrc}
                alt="Faisal Hills Islamabad Official Payment Plan"
                className="max-w-[95vw] max-h-[82vh] object-contain rounded-xl shadow-2xl pointer-events-none select-none"
                draggable={false}
              />
            </div>
          </div>

          {/* Mobile gesture hint footer */}
          <div className="text-[11px] text-slate-400 font-sans text-center pb-2.5 px-4 pointer-events-none sm:hidden">
            Pinch with 2 fingers to zoom • 1 finger to pan • Double-tap to toggle zoom
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. LEAD-GATED DOWNLOAD FORM MODAL                         */}
      {/* ========================================================= */}
      {isDownloadOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto transition-opacity duration-300">
          <div className="fixed inset-0 bg-slate-950/80 -z-10" onClick={onCloseDownload} />

          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden relative transform transition-all duration-300 scale-100 my-auto z-10 animate-fade-up">
            {/* Header */}
            <div className="bg-[#7b002c] text-white p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <button
                onClick={onCloseDownload}
                className="absolute top-4 right-4 text-white/80 hover:text-white p-1.5 rounded-full hover:bg-black/20 transition-colors cursor-pointer z-20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center border border-white/20 shadow-inner shrink-0">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">Download Payment Plan</h3>
                  <p className="text-xs text-rose-100 mt-0.5">Instant Official Rate Sheet & Installment Schedule</p>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6">
              {isSuccess ? (
                <div className="py-6 flex flex-col items-center justify-center text-center space-y-3 animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-slate-900">Download Starting!</h4>
                  <p className="text-xs text-slate-600 max-w-xs">
                    Your official Faisal Hills Payment Plan is downloading. Our advisory executive will also share the latest rate sheet on your WhatsApp.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <p className="text-xs text-slate-600">
                    Enter your details below to unlock and download the complete high-resolution payment schedule immediately.
                  </p>

                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Full Name <span className="text-[#7b002c]">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Muhammad Ali"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#7b002c] focus:ring-1 focus:ring-[#7b002c]"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Phone */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      WhatsApp / Phone <span className="text-[#7b002c]">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+92 300 1234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#7b002c] focus:ring-1 focus:ring-[#7b002c]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#7b002c] focus:ring-1 focus:ring-[#7b002c]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    {isSubmitting ? (
                      <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Download Plan Now</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-slate-500 text-[11px] pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Your information is 100% secure & confidential</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
