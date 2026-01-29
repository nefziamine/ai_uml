import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="container max-w-7xl mx-auto px-6">
        <div className={`flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 ${scrolled ? 'glass-panel shadow-xl' : 'bg-transparent'
          }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold">
              AI <span className="text-gradient">UML</span>
            </span>
          </Link>

          {/* Navigation Links - Centered with proper spacing */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors py-2 ${location.pathname === '/' ? 'text-accent-primary' : 'text-secondary hover:text-primary'}`}
            >
              Home
            </Link>
            <Link
              to="/templates"
              className={`text-sm font-medium transition-colors py-2 ${location.pathname === '/templates' ? 'text-accent-primary' : 'text-secondary hover:text-primary'}`}
            >
              Templates
            </Link>
            <Link
              to="/docs"
              className={`text-sm font-medium transition-colors py-2 ${location.pathname === '/docs' ? 'text-accent-primary' : 'text-secondary hover:text-primary'}`}
            >
              Docs
            </Link>
          </div>

          {/* Auth Buttons - Consistent padding */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="btn btn-secondary py-2.5 px-4">
                  <LayoutDashboard size={16} />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-bold text-muted hover:text-error transition-colors px-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-secondary hover:text-primary transition-colors hidden sm:block py-2 px-4">
                  Sign In
                </Link>
                <Link to="/login" className="btn btn-primary py-2.5 px-5">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
