'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Lock, KeyRound, CheckCircle2, AlertCircle, Loader2, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { apiResetPassword } from '@/data/faisalHillsData';

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !email) {
      setErrorMsg('Missing or invalid password reset token. Please request a new recovery link.');
      return;
    }

    if (password.length < 8) {
      setErrorMsg('New password must be at least 8 characters long.');
      return;
    }

    if (password !== passwordConfirmation) {
      setErrorMsg('New password and confirmation password do not match.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      await apiResetPassword({
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to reset password. The link may have expired or already been used.');
    } finally {
      setLoading(false);
    }
  };

  const isLinkInvalid = !token || !email;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#7b002c]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-rose-950/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 text-[#7b002c] shadow-inner mb-2">
            <KeyRound className="w-7 h-7" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Reset Password
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-sans">
            {email ? `Setting new security credential for ${email}` : 'Enter your new administrator password.'}
          </p>
        </div>

        {/* Success State */}
        {isSuccess ? (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <div className="font-bold text-sm text-emerald-800">
                Password Reset Successfully!
              </div>
              <p className="text-xs text-emerald-700 leading-relaxed font-sans">
                Your account password has been updated securely. All previous active sessions have been terminated.
              </p>
            </div>

            <Link
              href="/ubaid/admin/login"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all"
            >
              <span>Go to Login</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : isLinkInvalid ? (
          /* Invalid Link Warning */
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-rose-800">
                <AlertCircle className="w-5 h-5 text-[#7b002c] shrink-0" />
                <span>Invalid or Incomplete Link</span>
              </div>
              <p className="text-xs text-rose-700 leading-relaxed font-sans">
                This password reset link is missing required authorization parameters. Please initiate a new password recovery request.
              </p>
            </div>

            <Link
              href="/forgot-password"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
            >
              <span>Request New Reset Link</span>
            </Link>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-800 text-xs">
                <AlertCircle className="w-4 h-4 text-[#7b002c] shrink-0 mt-0.5" />
                <span className="leading-tight">{errorMsg}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#7b002c] focus:ring-2 focus:ring-[#7b002c]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#7b002c] focus:ring-2 focus:ring-[#7b002c]/20 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !password || !passwordConfirmation}
              className="w-full py-3.5 px-4 rounded-xl bg-[#7b002c] hover:bg-[#9e1245] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <span>Reset Password</span>
              )}
            </button>

            <div className="pt-2 text-center">
              <Link
                href="/ubaid/admin/login"
                className="text-xs font-bold text-slate-600 hover:text-[#7b002c] transition-colors"
              >
                Back to Admin Login
              </Link>
            </div>
          </form>
        )}

        {/* Footer Note */}
        <div className="border-t border-slate-100 pt-4 text-center">
          <p className="text-[11px] text-slate-400">
            Faisal Hills Management & Zedem International Executive System
          </p>
        </div>

      </div>
    </div>
  );
}
