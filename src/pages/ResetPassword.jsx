import React, { useContext, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match. Please re-enter.');
      return;
    }

    try {
      setIsSubmitting(true);
      const { data } = await axios.post(`${backendUrl}/api/auth/reset-password/${token}`, {
        password,
      });

      if (data.success) {
        alert('Password has been reset successfully! You can now log in.');
        navigate('/login');
      } else {
        alert(data.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      alert(error.response?.data?.message || 'Password reset link is invalid or has expired.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="w-full max-w-md bg-blue-slate-900 border border-blue-slate-800 rounded-xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-blue-slate-800 text-soft-cyan-500 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-blue-slate-50 tracking-tight">
            Set New Password
          </h1>
          <p className="mt-1 text-sm text-blue-slate-400">
            Choose a strong new password for your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-blue-slate-300 mb-2"
            >
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-blue-slate-800 border border-blue-slate-700 text-blue-slate-50 placeholder-blue-slate-500 focus:outline-none focus:ring-2 focus:ring-icy-aqua-500/50 focus:border-icy-aqua-500 shadow-sm transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-blue-slate-300 mb-2"
            >
              Confirm New Password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-blue-slate-800 border border-blue-slate-700 text-blue-slate-50 placeholder-blue-slate-500 focus:outline-none focus:ring-2 focus:ring-icy-aqua-500/50 focus:border-icy-aqua-500 shadow-sm transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 rounded-lg font-semibold text-blue-slate-950 bg-soft-cyan-500 hover:bg-soft-cyan-400 shadow-sm shadow-soft-cyan-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </form>

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

