import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles, User, ChevronRight } from 'lucide-react';
import { LifeVerseLogo } from './LifeVerseLogo';

export const Navbar = ({ variant = 'dark' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isHome = currentPath === '/';
  const isLoginPage = currentPath === '/login';
  const isRegisterPage = currentPath === '/register';
  const isOnboarding = currentPath.startsWith('/onboarding');

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About Us', href: '#about', id: 'about' },
    { label: 'Courses', href: '#courses', id: 'courses' },
    { label: 'Activities', href: '#activities', id: 'activities' },
    { label: 'Resources', href: '#resources', id: 'resources' },
    { label: "Parent's Corner", href: '#parents-corner', id: 'parents-corner' },
    { label: 'Contact Us', href: '#contact', id: 'contact' },
  ];

  // Track scroll position for sticky styling and active section spy
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (!isHome) return;

      const sections = ['home', 'about', 'courses', 'activities', 'resources', 'parents-corner', 'contact'];
      const scrollPosition = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const handleNavClick = (e, item) => {
    setMobileMenuOpen(false);

    if (isHome) {
      e.preventDefault();
      const targetId = item.id;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(targetId);
      } else if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('home');
      }
    } else {
      navigate(`/${item.href}`);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#081325]/92 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3 sm:py-3.5'
          : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <LifeVerseLogo />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium">
          {navLinks.map((item) => {
            const isActive = isHome && activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`relative py-1 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#F45124] to-[#65BDEB] rounded-full animate-fadeIn" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Auth Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {isOnboarding ? (
            <Link
              to="/onboarding/child"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs md:text-sm font-semibold bg-white/10 text-white border border-white/25 hover:bg-white/20 transition-all backdrop-blur-md"
            >
              <User className="w-3.5 h-3.5 text-[#65BDEB]" />
              <span>Family Setup</span>
            </Link>
          ) : null}

          {/* Login Button */}
          <Link
            to="/login"
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              isLoginPage
                ? 'bg-[#F45124] text-white shadow-lg shadow-orange-600/30 ring-2 ring-[#F45124]/40 hover:bg-[#e04216]'
                : 'text-white border border-white/30 hover:border-white/60 hover:text-white hover:bg-white/10 backdrop-blur-sm'
            }`}
          >
            Login
          </Link>

          {/* Sign Up Button */}
          <Link
            to="/register"
            className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
              isRegisterPage
                ? 'bg-[#F45124] text-white shadow-lg shadow-orange-600/30 ring-2 ring-[#F45124]/40 hover:bg-[#e04216]'
                : 'bg-gradient-to-r from-[#F45124] to-[#FF6B4A] hover:from-[#e04216] hover:to-[#f05a39] text-white shadow-md shadow-orange-600/30 hover:shadow-orange-600/50 hover:scale-[1.02]'
            }`}
          >
            <span>Sign Up</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            to="/login"
            className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white border border-white/25 hover:bg-white/10"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#F45124] text-white shadow-sm"
          >
            Sign Up
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-white bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/15 transition-colors ml-1 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-3 right-3 mt-2 p-5 rounded-2xl bg-[#0c1b2d]/95 backdrop-blur-2xl border border-white/20 shadow-2xl z-50 animate-fadeIn">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((item) => {
              const isActive = isHome && activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-white/15 text-white font-semibold'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-sm">{item.label}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#65BDEB]' : 'text-white/40'}`} />
                </a>
              );
            })}
            
            <div className="pt-4 mt-2 border-t border-white/15 flex flex-col gap-2.5">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full py-2.5 rounded-full text-center font-semibold text-sm transition-colors ${
                  isLoginPage ? 'bg-[#F45124] text-white' : 'border border-white/30 text-white hover:bg-white/10'
                }`}
              >
                Login to Family Portal
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-full text-center font-bold text-sm bg-gradient-to-r from-[#F45124] to-[#FF6B4A] text-white shadow-lg shadow-orange-600/30"
              >
                Start Free Trial
              </Link>
              <Link
                to="/onboarding/child"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2 text-center font-medium text-xs text-[#65BDEB] hover:underline"
              >
                Direct Child Onboarding Experience →
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
