import React, { useEffect, useRef } from 'react';
import { Zap, Menu, X, Home, MessageSquare, Info, BarChart3, LogOut, UserPlus, LogIn, Moon, Sun } from 'lucide-react';
import { useTheme } from './ui';

interface StickyNavProps {
  onNavigate: (page: string, sectionId?: string) => void;
  currentPage: string;
  isAuthenticated: boolean;
  onLogout: () => void;
}

const NAV_SECTIONS = ['section-hero', 'section-stats', 'section-research-tools', 'section-about', 'section-contact'];
const LANDING_PAGES = ['landing', 'about', 'contact'];

const StickyNav: React.FC<StickyNavProps> = ({ onNavigate, currentPage, isAuthenticated, onLogout }) => {
  const { mode, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSectionId, setActiveSectionId] = React.useState('section-hero');
  const observerRef = useRef<IntersectionObserver | null>(null);

  const isLandingContext = LANDING_PAGES.includes(currentPage);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isLandingContext) {
      setActiveSectionId('section-hero');
      return;
    }

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSectionId(entry.target.id);
        });
      },
      { threshold: 0.4, rootMargin: '-64px 0px 0px 0px' }
    );

    const attach = () => {
      NAV_SECTIONS.forEach(id => {
        const el = document.getElementById(id);
        if (el) observerRef.current?.observe(el);
      });
    };

    const t = setTimeout(attach, 120);
    return () => {
      clearTimeout(t);
      observerRef.current?.disconnect();
    };
  }, [isLandingContext, currentPage]);

  const handleClickNavItem = (page: string, sectionId?: string) => {
    if (sectionId) {
      if (isLandingContext) {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        onNavigate('landing', sectionId);
      }
    } else {
      onNavigate(page);
    }
    setMobileMenuOpen(false);
  };

  const isNavActive = (sectionId: string) => {
    if (!isLandingContext) return false;
    return activeSectionId === sectionId;
  };

  const accent   = mode === 'light' ? '#0071E3' : '#2997FF';
  const fg       = mode === 'light' ? '#1D1D1F' : '#F5F5F7';
  const fg2      = mode === 'light' ? '#86868B' : '#98989D';
  const bg       = mode === 'light' ? 'rgba(255,255,255,0.82)' : 'rgba(28,28,30,0.82)';
  const border   = mode === 'light' ? 'rgba(0,0,0,0.08)'       : 'rgba(255,255,255,0.08)';
  const activeBg = mode === 'light' ? 'rgba(0,113,227,0.08)'   : 'rgba(41,151,255,0.12)';
  const hoverBg  = mode === 'light' ? 'rgba(0,0,0,0.04)'       : 'rgba(255,255,255,0.06)';

  const navBtnBase: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
    padding: '0.4375rem 0.875rem', borderRadius: '0.5rem',
    fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer',
    border: 'none', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    letterSpacing: '0.01em', textDecoration: 'none',
    transition: 'all 0.18s ease',
  };

  const landingNavItems = [
    { sectionId: 'section-hero',           icon: <Home size={13} />,          label: 'Home' },
    { sectionId: 'section-about',          icon: <Info size={13} />,          label: 'About' },
    { sectionId: 'section-contact',        icon: <MessageSquare size={13} />, label: 'Contact' },
  ];

  return (
    <>
      <style>{`
        .nav-desktop { display: none; }
        .nav-hamburger { display: flex; }
        @media (min-width: 768px) {
          .nav-desktop { display: flex; align-items: center; gap: 0.125rem; }
          .nav-hamburger { display: none; }
        }
        .mobile-nav-menu { display: none; }
        .mobile-nav-menu.open { display: flex; }
        .nav-link-btn {
          background: transparent; color: ${fg2};
          cursor: pointer;
        }
        .nav-link-btn:hover { background: ${hoverBg} !important; color: ${fg} !important; }
        .nav-link-btn:active { transform: scale(0.97) !important; }
        .nav-link-btn:focus-visible { outline: 2px solid ${accent}; outline-offset: 2px; }
        .nav-link-active { background: var(--entity-accent-muted, ${activeBg}) !important; color: var(--entity-accent, ${accent}) !important; }
        .theme-toggle-btn:hover { border-color: ${accent} !important; color: ${accent} !important; }
        .signup-btn:hover { transform: translateY(-1px) !important; box-shadow: 0 6px 20px rgba(0,113,227,0.35) !important; }
        .signup-btn:active { transform: scale(0.97) !important; }
        html { scroll-padding-top: var(--nav-height, 4rem); }
      `}</style>

      <nav
        id="nav-primary"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? bg : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.8)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.8)' : 'none',
          borderBottom: scrolled ? `1px solid ${border}` : '1px solid transparent',
          boxShadow: scrolled ? (mode === 'light' ? '0 1px 3px rgba(0,0,0,0.06)' : '0 1px 3px rgba(0,0,0,0.3)') : 'none',
          transition: 'background 0.25s ease, backdrop-filter 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
        }}
      >
        <div style={{ maxWidth: '82rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem' }}>

            {/* Brand */}
            <button
              onClick={() => handleClickNavItem('landing', 'section-hero')}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.625rem',
                cursor: 'pointer', border: 'none', background: 'none', padding: 0,
              }}
              onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)'; }}
              onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
            >
              <div style={{
                width: '2rem', height: '2rem', borderRadius: '0.5rem',
                background: accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                boxShadow: `0 2px 8px ${accent}40`,
              }}>
                <Zap size={13} color="#FFFFFF" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1 }}>
                <span style={{ fontSize: '1rem', fontWeight: 600, color: fg, letterSpacing: '-0.02em' }}>
                  Blazecore
                </span>
                <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.10em', color: fg2, textTransform: 'uppercase', marginTop: '-1px' }}>
                  IoT Platform
                </span>
              </div>
            </button>

            {/* Desktop links */}
            <div className="nav-desktop">
              {landingNavItems.map(({ sectionId, icon, label }) => (
                <button
                  key={sectionId}
                  data-target={sectionId}
                  className={`nav-link-btn ${isNavActive(sectionId) ? 'nav-link-active' : ''}`}
                  onClick={() => handleClickNavItem('landing', sectionId)}
                  style={navBtnBase}
                >
                  {icon}<span>{label}</span>
                </button>
              ))}

              {isAuthenticated ? (
                <>
                  <button
                    data-target="dashboard"
                    className={`nav-link-btn ${currentPage === 'dashboard' ? 'nav-link-active' : ''}`}
                    onClick={() => handleClickNavItem('dashboard')}
                    style={navBtnBase}
                  >
                    <BarChart3 size={13} /><span>Dashboard</span>
                  </button>
                  <div style={{ width: 1, height: '1.125rem', background: border, margin: '0 0.375rem' }} />
                  <button
                    className="nav-link-btn"
                    onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                    style={navBtnBase}
                  >
                    <LogOut size={13} /><span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <div style={{ width: 1, height: '1.125rem', background: border, margin: '0 0.375rem' }} />
                  <button
                    className={`nav-link-btn ${currentPage === 'login' ? 'nav-link-active' : ''}`}
                    onClick={() => handleClickNavItem('login')}
                    style={navBtnBase}
                  >
                    <LogIn size={13} /><span>Login</span>
                  </button>
                  <button
                    className="signup-btn"
                    onClick={() => handleClickNavItem('signup')}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                      padding: '0.4375rem 1rem', borderRadius: '0.5rem',
                      fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
                      background: accent, border: 'none', color: '#FFFFFF',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      boxShadow: `0 2px 8px ${accent}35`,
                      transition: 'background 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease',
                      marginLeft: '0.25rem',
                    }}
                  >
                    <UserPlus size={13} /><span>Sign Up</span>
                  </button>
                </>
              )}
            </div>

            {/* Right: theme + hamburger */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                className="theme-toggle-btn"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                style={{
                  width: '2rem', height: '2rem', borderRadius: '0.5rem',
                  background: mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${border}`,
                  color: fg2, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'border-color 0.15s ease, color 0.15s ease',
                }}
                onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.95)'; }}
                onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
              >
                {mode === 'light' ? <Moon size={14} /> : <Sun size={14} />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="nav-hamburger"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
                style={{
                  width: '2rem', height: '2rem', borderRadius: '0.5rem',
                  background: mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${border}`,
                  color: fg2, cursor: 'pointer',
                  alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.15s',
                }}
                onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.95)'; }}
                onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
              >
                {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={`mobile-nav-menu${mobileMenuOpen ? ' open' : ''}`}
            style={{
              borderTop: `1px solid ${border}`,
              paddingTop: '0.75rem', paddingBottom: '1rem',
              flexDirection: 'column', gap: '0.25rem',
              background: mode === 'light' ? 'rgba(255,255,255,0.95)' : 'rgba(28,28,30,0.95)',
              backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {landingNavItems.map(({ sectionId, icon, label }) => (
              <button
                key={sectionId}
                data-target={sectionId}
                onClick={() => handleClickNavItem('landing', sectionId)}
                className={`nav-link-btn ${isNavActive(sectionId) ? 'nav-link-active' : ''}`}
                style={{ ...navBtnBase, justifyContent: 'flex-start', width: '100%' }}
              >
                {icon}<span>{label}</span>
              </button>
            ))}
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => handleClickNavItem('dashboard')}
                  className={`nav-link-btn ${currentPage === 'dashboard' ? 'nav-link-active' : ''}`}
                  style={{ ...navBtnBase, justifyContent: 'flex-start', width: '100%' }}
                >
                  <BarChart3 size={15} /><span>Dashboard</span>
                </button>
                <button
                  onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                  className="nav-link-btn"
                  style={{ ...navBtnBase, justifyContent: 'flex-start', width: '100%' }}
                >
                  <LogOut size={15} /><span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleClickNavItem('login')}
                  className={`nav-link-btn ${currentPage === 'login' ? 'nav-link-active' : ''}`}
                  style={{ ...navBtnBase, justifyContent: 'flex-start', width: '100%' }}
                >
                  <LogIn size={15} /><span>Login</span>
                </button>
                <button
                  onClick={() => handleClickNavItem('signup')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.375rem',
                    padding: '0.625rem 1rem', borderRadius: '0.5rem',
                    fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
                    background: accent, border: 'none',
                    color: '#FFFFFF', width: '100%', marginTop: '0.25rem',
                  }}
                >
                  <UserPlus size={15} /><span>Sign Up</span>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default StickyNav;
