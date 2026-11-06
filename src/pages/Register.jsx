import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

export default function Register() {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
        name,
        email,
        password,
      });

      if (data.success) {
        alert('Account created successfully!');
        setIsLoggedIn(true);
        await getUserData();
        navigate('/');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="w-full max-w-md bg-blue-slate-900 border border-blue-slate-800 rounded-xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-blue-slate-800 text-soft-cyan-500 flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-blue-slate-50 tracking-tight">
            Create an Account
          </h1>
          <p className="mt-1 text-sm text-blue-slate-400">
            Sign up to start organizing your tasks
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-blue-slate-300 mb-2"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-blue-slate-800 border border-blue-slate-700 text-blue-slate-50 placeholder-blue-slate-500 focus:outline-none focus:ring-2 focus:ring-icy-aqua-500/50 focus:border-icy-aqua-500 shadow-sm transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-blue-slate-300 mb-2"
            >
              Email Address
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

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-blue-slate-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-blue-slate-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-icy-aqua-400 hover:text-icy-aqua-300 font-medium transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
