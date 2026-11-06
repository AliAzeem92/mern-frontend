import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, ArrowLeft, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

export default function ForgotPassword() {
  const { backendUrl } = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const { data } = await axios.post(`${backendUrl}/api/auth/forgot-password`, {
        email,
      });

      if (data.success) {
        setIsSent(true);
      } else {
        alert(data.message || 'Failed to send password reset link');
      }
    } catch (error) {
      console.error('Error during forgot password request:', error);
      alert(error.response?.data?.message || 'Failed to send reset link. Please check the email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="w-full max-w-md bg-blue-slate-900 border border-blue-slate-800 rounded-xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-blue-slate-800 text-soft-cyan-500 flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-blue-slate-50 tracking-tight">
            Forgot Password
          </h1>
          <p className="mt-1 text-sm text-blue-slate-400">
            Enter your email to receive a password reset link
          </p>
        </div>

        {isSent ? (
          <div className="space-y-6 text-center">
            <div className="p-4 rounded-lg bg-blue-slate-800/80 border border-ocean-mist-700 text-left">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-aquamarine-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-blue-slate-50">
                    Reset Link Sent!
                  </h3>
                  <p className="mt-1 text-xs text-blue-slate-400 leading-relaxed">
                    We've sent a password reset link to <span className="text-icy-aqua-400 font-medium">{email}</span>. Please check your inbox and spam folder.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-blue-slate-400">
              Didn't receive the email? Check your spam folder or try again in a few minutes.
            </p>

            <button
              type="button"
              onClick={() => setIsSent(false)}
              className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold border border-ocean-mist-500 text-ocean-mist-400 hover:bg-ocean-mist-900 transition-colors cursor-pointer"
            >
              Try another email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-blue-slate-300 mb-2"
              >
                Registered Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-blue-slate-800 border border-blue-slate-700 text-blue-slate-50 placeholder-blue-slate-500 focus:outline-none focus:ring-2 focus:ring-icy-aqua-500/50 focus:border-icy-aqua-500 shadow-sm transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-lg font-semibold text-blue-slate-950 bg-soft-cyan-500 hover:bg-soft-cyan-400 shadow-sm shadow-soft-cyan-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Sending Link...' : 'Send Reset Link'}
            </button>
          </form>
        )}

        <div className="mt-6 pt-5 border-t border-blue-slate-800 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-sm text-icy-aqua-400 hover:text-icy-aqua-300 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

