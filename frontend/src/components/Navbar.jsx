import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, HeartPulse, Activity } from 'lucide-react';
import Button from './Button';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    
    // If not on the homepage, navigate to it first
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Listen for scrollTo requests from redirect
  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      // Clear state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="p-2 bg-primary text-white rounded-xl shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
            <Activity className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold font-heading text-gray-900 group-hover:text-primary transition-colors">
            DioG <span className="text-primary">Lite</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavClick('hero')}
            className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('features')}
            className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick('doctors')}
            className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors cursor-pointer"
          >
            Doctors
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => handleNavClick('testimonials')}
            className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors cursor-pointer"
          >
            Stories
          </button>
          <button
            onClick={() => handleNavClick('footer')}
            className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
              <Button variant="primary" size="sm" onClick={() => { logoutUser(); navigate('/'); }}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                Log In
              </Button>
              <Button variant="primary" size="sm" onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl py-6 px-6 space-y-4 animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-left py-2 text-base font-semibold text-gray-700 hover:text-primary transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('features')}
              className="text-left py-2 text-base font-semibold text-gray-700 hover:text-primary transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => handleNavClick('doctors')}
              className="text-left py-2 text-base font-semibold text-gray-700 hover:text-primary transition-colors cursor-pointer"
            >
              Doctors
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-left py-2 text-base font-semibold text-gray-700 hover:text-primary transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('testimonials')}
              className="text-left py-2 text-base font-semibold text-gray-700 hover:text-primary transition-colors cursor-pointer"
            >
              Stories
            </button>
            <button
              onClick={() => handleNavClick('footer')}
              className="text-left py-2 text-base font-semibold text-gray-700 hover:text-primary transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>
          
          <hr className="border-gray-100" />
          
          {user ? (
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button variant="outline" size="md" className="w-full justify-center" onClick={() => { setIsMobileMenuOpen(false); navigate('/dashboard'); }}>
                Dashboard
              </Button>
              <Button variant="primary" size="md" className="w-full justify-center" onClick={() => { setIsMobileMenuOpen(false); logoutUser(); navigate('/'); }}>
                Log Out
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button variant="outline" size="md" className="w-full justify-center" onClick={() => { setIsMobileMenuOpen(false); navigate('/login'); }}>
                Log In
              </Button>
              <Button variant="primary" size="md" className="w-full justify-center" onClick={() => { setIsMobileMenuOpen(false); navigate('/signup'); }}>
                Sign Up
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
