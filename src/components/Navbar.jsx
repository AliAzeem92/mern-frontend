import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckSquare, Plus, LogOut, User } from 'lucide-react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { backendUrl, isLoggedIn, setIsLoggedIn, setUserData, setTodos, userData } = useContext(AppContext);

  const handleLogout = async () => {
    try {
      await axios.post(`${backendUrl}/api/auth/logout`);
      setIsLoggedIn(false);
      setUserData(null);
      setTodos([]);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      setIsLoggedIn(false);
      setUserData(null);
      setTodos([]);
      navigate('/login');
    }
  };

  return (
    <header className="bg-blue-slate-900 border-b border-blue-slate-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <CheckSquare className="w-6 h-6 text-soft-cyan-500" />
          <span className="text-xl font-bold text-blue-slate-50 tracking-tight group-hover:text-soft-cyan-400 transition-colors">
            TodoApp
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              {userData?.name && (
                <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-blue-slate-400">
                  <User className="w-3.5 h-3.5 text-icy-aqua-400" />
                  <span>{userData.name}</span>
                </span>
              )}

              <Link
                to="/add"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold bg-soft-cyan-500 hover:bg-soft-cyan-400 text-blue-slate-950 transition-colors shadow-sm shadow-soft-cyan-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add Todo</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border border-ocean-mist-500 text-ocean-mist-400 hover:bg-ocean-mist-900 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-blue-slate-300 hover:text-soft-cyan-400 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3.5 py-1.5 rounded-lg text-sm font-semibold bg-soft-cyan-500 hover:bg-soft-cyan-400 text-blue-slate-950 transition-colors shadow-sm shadow-soft-cyan-500/20"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
