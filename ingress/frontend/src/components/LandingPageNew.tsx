import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Zap, Shield, BarChart3, Globe, Database, Activity,
  Layers, ArrowRight, BookOpen, GitBranch, Users, TrendingUp,
  CheckCircle2, Lock, Wifi, Star, GitFork, Eye,
  Target, Code, Mail, Phone, MapPin, Send, AlertCircle, CheckCircle,
  MessageSquare, ExternalLink, Clock,
} from 'lucide-react';
import { useTheme } from './ui';

interface LandingPageProps {
  onNavigate: (page: string, sectionId?: string) => void;
  scrollToSection?: string;
  onScrollComplete?: () => void;
}

// ── Particle canvas ─────────────────────────────────────────────────────────
const PARTICLE_COUNT = 26;
const LINK_DIST = 120;
const LINK_DIST_SQ = LINK_DIST * LINK_DIST;

const ParticleCanvas: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    let animId: number;
    let visible = true;
    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let pts: P[] = [];
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    const init = () => {
      pts = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 1.6 + 0.7,
      }));
    };
    const nodeDot  = isDark ? 'rgba(41,151,255,0.42)'  : 'rgba(0,113,227,0.32)';
    const lineBase = isDark ? '41,151,255'              : '0,113,227';
    const draw = () => {
      if (!visible) { animId = requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const n = pts.length;
      for (let i = 0; i < n; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = nodeDot; ctx.fill();
        for (let j = i + 1; j < n; j++) {
          const dx = pts[j].x - p.x, dy = pts[j].y - p.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < LINK_DIST_SQ) {
            const alpha = 0.09 * (1 - dSq / LINK_DIST_SQ);
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${lineBase},${alpha.toFixed(3)})`; ctx.lineWidth = 0.7; ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    const visObs = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    visObs.observe(canvas);
    resize(); init(); draw();
    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); visObs.disconnect(); };
  }, [isDark]);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', willChange: 'auto' }} />;
};

// ── Animated counter ─────────────────────────────────────────────────────────
const AnimatedCounter: React.FC<{ value: string; color: string }> = ({ value, color }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState('0');
  const [key, setKey] = useState(0);
  const num = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
  const suffix = value.replace(/[0-9.]/g, '');
  const run = useCallback(() => {
    const start = performance.now(); const dur = 1100;
    setKey(k => k + 1);
    const step = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      if (num > 10) setDisplay(Math.round(ease * num).toString());
      else setDisplay((ease * num).toFixed(num % 1 ? 1 : 0));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [num]);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { run(); obs.disconnect(); } }, { threshold: 0.4 });
    obs.observe(el); return () => obs.disconnect();
  }, [run]);
  return (
    <div ref={ref} key={key} className="animate-count" style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', color }}>
      {num > 0 ? display + suffix : value}
    </div>
  );
};

// ── TracedCard ────────────────────────────────────────────────────────────────
interface TracedCardProps {
  children: React.ReactNode;
  color: string;
  style?: React.CSSProperties;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}
const TracedCard: React.FC<TracedCardProps> = ({ children, color, style, className, onMouseEnter, onMouseLeave }) => {
  const [traceKey, setTraceKey] = useState(0);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(false);
  const retrace = useCallback(() => {
    setActive(false);
    requestAnimationFrame(() => { setActive(true); setTraceKey(k => k + 1); });
  }, []);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !inViewRef.current) { inViewRef.current = true; setTimeout(() => retrace(), 120); }
    }, { threshold: 0.18 });
    obs.observe(el); return () => obs.disconnect();
  }, [retrace]);
  return (
    <div ref={ref} className={className} style={{ position: 'relative', overflow: 'hidden', borderRadius: '1rem', ...style }}
      onMouseEnter={() => { retrace(); setActive(true); onMouseEnter?.(); }}
      onMouseLeave={() => { onMouseLeave?.(); }}>
      {active && (
        <>
          <span key={`t-${traceKey}`} className="trace-top"    style={{ background: color }} />
          <span key={`r-${traceKey}`} className="trace-right"  style={{ background: color }} />
          <span key={`b-${traceKey}`} className="trace-bottom" style={{ background: color }} />
          <span key={`l-${traceKey}`} className="trace-left"   style={{ background: color }} />
        </>
      )}
      {children}
    </div>
  );
};

// ── Reveal hook ───────────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ── Contact Form (used in section-contact) ────────────────────────────────────
const ContactForm: React.FC<{ p: any }> = ({ p }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmitContactForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await new Promise(r => setTimeout(r, 1200));
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 4000);
    } catch { setError('Failed to send. Please try again.'); }
    finally { setLoading(false); }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem', borderRadius: '0.625rem',
    border: `1.5px solid ${p.glassBorder}`,
    background: p.isDark ? 'rgba(44,44,46,0.8)' : 'rgba(245,245,247,0.8)',
    color: p.fg, fontSize: '0.9375rem', outline: 'none',
    transition: 'border-color 0.2s', boxSizing: 'border-box' as const,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
  };

  return (
    <form onSubmit={handleSubmitContactForm} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {error && (
        <div style={{ padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '0.625rem', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <AlertCircle size={14} color="#EF4444" /><span style={{ fontSize: '0.875rem', color: '#EF4444' }}>{error}</span>
        </div>
      )}
      {success && (
        <div style={{ padding: '0.75rem 1rem', background: 'rgba(52,199,89,0.08)', border: '1px solid rgba(52,199,89,0.25)', borderRadius: '0.625rem', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <CheckCircle size={14} color="#34C759" /><span style={{ fontSize: '0.875rem', color: '#1D8348' }}>✓ Message sent — we'll respond within 24h.</span>
        </div>
      )}
      <input type="text" placeholder="Your name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} disabled={loading} style={inputStyle} />
      <input type="email" placeholder="your@email.com" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} disabled={loading} style={inputStyle} autoComplete="email" />
      <textarea placeholder="Your message…" required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} disabled={loading} rows={4} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%', padding: '0.8125rem 1.5rem',
          background: loading ? (p.isDark ? '#3A3A3C' : '#E5E5EA') : p.accent,
          color: loading ? p.fg2 : '#fff', border: 'none', borderRadius: '0.625rem',
          fontSize: '0.9375rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          boxShadow: loading ? 'none' : `0 4px 14px ${p.accent}40`,
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { if (!loading) { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.opacity = '0.9'; } }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.opacity = '1'; }}
        onMouseDown={e => { if (!loading) (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)'; }}
        onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = ''; }}
      >
        {loading ? (
          <><div style={{ width: '1rem', height: '1rem', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />Sending...</>
        ) : (
          <>Send Message <Send size={16} /></>
        )}
      </button>
    </form>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const LandingPageNew: React.FC<LandingPageProps> = ({ onNavigate, scrollToSection, onScrollComplete }) => {
  const { mode } = useTheme();
  const [typedIndex, setTypedIndex] = useState(0);
  const tagline = 'IoT Experiment Platform';

  useEffect(() => {
    if (typedIndex < tagline.length) {
      const t = setTimeout(() => setTypedIndex(i => i + 1), 52);
      return () => clearTimeout(t);
    }
  }, [typedIndex]);

  useEffect(() => {
    if (scrollToSection) {
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(scrollToSection);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            onScrollComplete?.();
          }, 80);
        } else if (attempts < 8) {
          setTimeout(() => tryScroll(attempts + 1), 100);
        }
      };
      tryScroll();
    }
  }, [scrollToSection]);

  const featuresReveal = useReveal();
  const researchReveal = useReveal();
  const ctaReveal      = useReveal();
  const statsReveal    = useReveal();
  const aboutReveal    = useReveal();
  const contactReveal  = useReveal();

  const isDark = mode === 'dark';

  const p = {
    isDark,
    accent:      isDark ? '#2997FF' : '#0071E3',
    accentB:     isDark ? '#5AC8FA' : '#2997FF',
    accentGreen: isDark ? '#30D158' : '#34C759',
    fg:          isDark ? '#F5F5F7' : '#1D1D1F',
    fg2:         isDark ? '#98989D' : '#86868B',
    fg3:         isDark ? '#636366' : '#A1A1A6',
    bg:          isDark ? '#000000' : '#F5F5F7',
    bg4:         isDark ? '#3A3A3C' : '#86868B',
    border:      isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    glass:       isDark ? 'rgba(28,28,30,0.72)' : 'rgba(255,255,255,0.72)',
    glassBorder: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    glassShadow: isDark ? '0 1px 3px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)',
    cardBg:      isDark ? '#1C1C1E' : '#FFFFFF',
    shadow:      isDark ? '0 1px 3px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)',
  };

  const floatCard = (rotate: number, delay: string, alt = false): React.CSSProperties => ({
    '--r': `${rotate}deg`,
    transform: `rotate(${rotate}deg)`,
    animation: `${alt ? 'floatAlt' : 'float'} ${alt ? 6.5 : 5}s ease-in-out infinite`,
    animationDelay: delay,
    background: p.glass,
    backdropFilter: 'blur(20px) saturate(1.6)',
    WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
    border: `1px solid ${p.glassBorder}`,
    boxShadow: p.glassShadow,
    padding: '1.25rem',
    position: 'relative',
    overflow: 'hidden',
  } as React.CSSProperties);

  const sheen = (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 'inherit',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 55%, transparent 100%)' }} />
  );

  const accentBar = (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
      background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)`, borderRadius: 'inherit' }} />
  );

  const badge = (text: string) => (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
      padding: '0.3125rem 0.875rem', borderRadius: '9999px',
      background: `${p.accent}12`, border: `1px solid ${p.accent}30`,
      fontSize: '0.73rem', fontWeight: 600, color: p.accent,
      letterSpacing: '0.07em', textTransform: 'uppercase' as const, marginBottom: '1.25rem',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: p.accent, animation: 'pulse 2s ease-in-out infinite', display: 'inline-block' }} />
      {text}
    </div>
  );

  const ctaBtn = (label: string, page: string, primary: boolean, sectionId?: string) => (
    <button
      onClick={() => onNavigate(page, sectionId)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.75rem 1.5rem', borderRadius: '0.5625rem',
        fontSize: '0.9375rem', fontWeight: 600, cursor: 'pointer',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        letterSpacing: '-0.01em', transition: 'all 0.22s ease',
        ...(primary ? {
          background: p.accent, border: 'none', color: '#FFFFFF',
          boxShadow: `0 2px 8px ${p.accent}40`,
        } : {
          background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          border: `1px solid ${p.border}`, color: p.fg2,
        }),
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'translateY(-2px)';
        el.style.boxShadow = primary ? `0 6px 20px ${p.accent}45` : '0 4px 12px rgba(0,0,0,0.10)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = primary ? `0 2px 8px ${p.accent}40` : 'none';
      }}
      onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)'; }}
      onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = ''; }}
    >
      {label}{primary && <ArrowRight size={15} />}
    </button>
  );

  const features = [
    { icon: <Activity size={19} />,  title: 'Real-time Monitoring', desc: 'Live data streaming from all IoT devices with instant threshold alerts.' },
    { icon: <Database size={19} />,  title: 'Data Management',      desc: 'Structured experiment data with PostgreSQL and time-series storage.' },
    { icon: <Shield size={19} />,    title: 'Secure Auth',          desc: 'Enterprise-grade JWT auth with role-based access control.' },
    { icon: <BarChart3 size={19} />, title: 'Analytics Dashboard',  desc: 'Comprehensive dashboards with exportable reports and insights.' },
    { icon: <Globe size={19} />,     title: 'REST API',             desc: 'OpenAPI-compliant interface for seamless third-party integration.' },
    { icon: <Layers size={19} />,    title: 'Microservices',        desc: 'Rust-powered distributed services built for performance.' },
  ];

  const researchFeatures = [
    { icon: <BookOpen size={18} />,   title: 'Open Datasets',   desc: 'Curated datasets for research and academic publication.' },
    { icon: <GitBranch size={18} />,  title: 'Version Control', desc: 'Track every experiment iteration for reproducibility.' },
    { icon: <Users size={18} />,      title: 'Collaborative',   desc: 'Share experiments across institutions and teams.' },
    { icon: <TrendingUp size={18} />, title: 'Deep Analytics',  desc: 'Statistical tools for data-driven scientific discovery.' },
  ];

  const stats = [
    { value: '100%', label: 'Open Source',  sub: 'MIT Licensed' },
    { value: 'Rust',  label: 'Powered By',   sub: 'High performance' },
    { value: '2.4 TB', label: 'Processed',  sub: 'Across nodes' },
    { value: '84+',   label: 'Devices',      sub: 'Connected' },
  ];

  const aboutValues = [
    { icon: <Target size={24} color={p.accent} />, title: 'Our Mission', desc: 'To simplify IoT experiment management and provide powerful tools for developers and researchers to build the future of connected systems.' },
    { icon: <Eye size={24} color={p.accentB} />, title: 'Our Vision', desc: 'Becoming the leading platform for IoT experimentation, enabling innovation through accessible, scalable, and open-source technology.' },
    { icon: <Users size={24} color={p.accentGreen} />, title: 'Our Community', desc: 'Building a community of IoT enthusiasts, developers, and researchers who share knowledge and push the boundaries of what\'s possible.' },
  ];

  const contactInfo = [
    { icon: <Mail size={20} color={p.accent} />, title: 'Email Us', content: 'support@blazecore.io', description: 'We respond within 24 hours' },
    { icon: <Phone size={20} color={p.accent} />, title: 'Call Us', content: '+1 (555) 123-4567', description: 'Mon–Fri 9am–6pm EST' },
    { icon: <MapPin size={20} color={p.accent} />, title: 'Visit Us', content: '123 Tech Street', description: 'San Francisco, CA 94102' },
  ];

  const sectionHeading = (sup: string, title: string, sub?: string) => (
    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
      <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: p.accent, marginBottom: '0.625rem' }}>{sup}</div>
      <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700, color: p.fg, margin: '0 0 0.625rem', letterSpacing: '-0.025em' }}>{title}</h2>
      {sub && <p style={{ fontSize: '1rem', color: p.fg2, margin: 0, maxWidth: '42rem', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );

  return (
    <main
      id="page-home"
      style={{ minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
    >
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .contact-form-input:focus {
          border-color: ${p.accent} !important;
          box-shadow: 0 0 0 3px ${p.accent}20 !important;
        }
        .card-hover:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 16px 40px rgba(0,0,0,0.12) !important;
        }
      `}</style>

      {/* ── SECTION: Hero ─────────────────────────────────────────────────── */}
      <section
        id="section-hero"
        style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '3rem', overflow: 'hidden' }}
      >
        <ParticleCanvas isDark={isDark} />

        {/* Ambient blobs */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-8rem', right: '-6rem', width: '38rem', height: '38rem', borderRadius: '50%',
            background: `radial-gradient(circle, ${p.accent}14 0%, transparent 65%)`, animation: 'blobMove1 14s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', top: '35%', left: '-8rem', width: '30rem', height: '30rem', borderRadius: '50%',
            background: `radial-gradient(circle, ${p.accentB}0C 0%, transparent 65%)`, animation: 'blobMove2 17s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: '-4rem', right: '25%', width: '24rem', height: '24rem', borderRadius: '50%',
            background: `radial-gradient(circle, ${p.accent}0A 0%, transparent 65%)`, animation: 'blobMove3 11s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', inset: 0,
            backgroundImage: `radial-gradient(circle, ${p.bg4}28 1px, transparent 1px)`,
            backgroundSize: '28px 28px', opacity: 0.35 }} />
        </div>

        <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div style={{ maxWidth: '82rem', margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '4.5rem', alignItems: 'center' }}>
              {/* Copy */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                <div className="animate-fade-up" style={{ animationDelay: '0ms' }}>
                  {badge('Open Source · Research-First')}
                </div>
                <div className="animate-fade-up" style={{ animationDelay: '80ms' }}>
                  <h1 style={{ margin: 0, lineHeight: 1.04 }}>
                    <span style={{ display: 'block', fontSize: 'clamp(2.75rem, 5.5vw, 4.75rem)', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', fontWeight: 700, color: p.fg, letterSpacing: '-0.03em' }}>Blazecore</span>
                    <span style={{ display: 'block', marginTop: '0.4rem', fontSize: 'clamp(1.25rem, 2.6vw, 2rem)', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', fontWeight: 500, letterSpacing: '-0.02em', color: p.accent }}>
                      {tagline.slice(0, typedIndex)}
                      <span style={{ animation: 'pulse 0.9s ease-in-out infinite', opacity: typedIndex < tagline.length ? 1 : 0 }}>|</span>
                    </span>
                  </h1>
                </div>
                <div className="animate-fade-up" style={{ animationDelay: '160ms' }}>
                  <p style={{ margin: 0, fontSize: '1.0625rem', lineHeight: 1.75, color: p.fg2, maxWidth: '30rem', fontWeight: 400 }}>
                    Empowering research institutions with open-source IoT experiment management, live monitoring, and comprehensive data infrastructure.
                  </p>
                </div>
                <div className="animate-fade-up" style={{ animationDelay: '240ms', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  {ctaBtn('Get Started', 'signup', true)}
                  {ctaBtn('Learn More', 'landing', false, 'section-about')}
                </div>
                {/* GitHub badges */}
                <div className="animate-fade-up" style={{ animationDelay: '320ms', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {[
                    { icon: <Star size={12} />, label: '2.1k', text: 'Stars' },
                    { icon: <GitFork size={12} />, label: '384', text: 'Forks' },
                    { icon: <Eye size={12} />, label: '91', text: 'Watching' },
                  ].map((b, i) => (
                    <div key={i} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                      padding: '0.3rem 0.75rem', borderRadius: '0.375rem',
                      background: p.glass, backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                      border: `1px solid ${p.glassBorder}`, fontSize: '0.78rem', fontWeight: 500, color: p.fg2,
                    }}>
                      <span style={{ color: p.accent }}>{b.icon}</span>
                      <span style={{ fontWeight: 700, color: p.fg }}>{b.label}</span>
                      <span>{b.text}</span>
                    </div>
                  ))}
                </div>
                <div className="animate-fade-up" style={{ animationDelay: '400ms', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {['No credit card required', 'MIT Licensed — fully open-source', 'Self-hostable on any infrastructure'].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: p.fg3 }}>
                      <CheckCircle2 size={13} style={{ color: p.accentGreen, flexShrink: 0 }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating glass cards */}
              <div className="hidden lg:block" style={{ position: 'relative', height: '480px' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 320, height: 320, pointerEvents: 'none' }}>
                  <div className="orbit-ring"   style={{ inset: 0 }} />
                  <div className="orbit-ring-r" style={{ inset: 28 }} />
                  <div className="orbit-ring"   style={{ inset: 58, animationDuration: '32s' }} />
                </div>

                {/* Card 1 — Live Monitoring */}
                <div className="animate-fade-right" style={{ animationDelay: '180ms', position: 'absolute', top: '1rem', right: '0', width: '18.5rem' }}>
                  <div style={{ ...floatCard(1.5, '0s'), borderRadius: '1rem' }}>
                    {sheen}{accentBar}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                      <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.625rem', background: `${p.accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Activity size={16} color={p.accent} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: p.fg }}>Live Monitoring</div>
                        <div style={{ fontSize: '0.6875rem', color: p.fg2 }}>84 devices online</div>
                      </div>
                      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: p.accentGreen, animation: 'pulse 2s ease-in-out infinite', display: 'inline-block' }} />
                        <span style={{ fontSize: '0.6875rem', color: p.accentGreen, fontWeight: 600 }}>LIVE</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {['Sensor Array #1', 'Temperature Grid', 'Humidity Network'].map((name, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                          <div style={{ flex: 1, height: '5px', borderRadius: '3px', background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${[72, 58, 84][i]}%`, background: p.accent, borderRadius: '3px', transition: 'width 0.4s ease' }} />
                          </div>
                          <span style={{ fontSize: '0.6875rem', color: p.fg2, minWidth: '2rem', textAlign: 'right' }}>{[72, 58, 84][i]}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 2 — Experiment Status */}
                <div className="animate-fade-right" style={{ animationDelay: '280ms', position: 'absolute', top: '38%', left: '0', width: '16.5rem' }}>
                  <div style={{ ...floatCard(-2, '0.3s', true), borderRadius: '1rem' }}>
                    {sheen}{accentBar}
                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: p.fg, marginBottom: '0.75rem' }}>Experiment Status</div>
                    {[{ label: 'Active', color: p.accentGreen, count: 12 }, { label: 'Pending', color: p.accent, count: 5 }, { label: 'Completed', color: p.fg3, count: 28 }].map((s, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, display: 'inline-block' }} />
                          <span style={{ fontSize: '0.75rem', color: p.fg2 }}>{s.label}</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: p.fg }}>{s.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card 3 — Data Processed */}
                <div className="animate-fade-right" style={{ animationDelay: '360ms', position: 'absolute', bottom: '2rem', right: '1.5rem', width: '14rem' }}>
                  <div style={{ ...floatCard(1, '0.6s'), borderRadius: '1rem' }}>
                    {sheen}{accentBar}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.5rem' }}>
                      <Database size={14} color={p.accent} />
                      <span style={{ fontSize: '0.75rem', color: p.fg2, fontWeight: 500 }}>Data Processed</span>
                    </div>
                    <div style={{ fontSize: '1.625rem', fontWeight: 800, color: p.fg, letterSpacing: '-0.03em', lineHeight: 1 }}>2.4 TB</div>
                    <div style={{ fontSize: '0.6875rem', color: p.accentGreen, marginTop: '0.25rem', fontWeight: 500 }}>↑ 18% this week</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION: Stats ─────────────────────────────────────────────────── */}
      <section
        id="section-stats"
        style={{ padding: '5rem 1.5rem', maxWidth: '82rem', margin: '0 auto' }}
      >
        <div ref={statsReveal.ref} style={{ opacity: statsReveal.visible ? 1 : 0, transform: statsReveal.visible ? 'none' : 'translateY(24px)', transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
            {stats.map((stat, i) => (
              <TracedCard key={i} color={p.accent} style={{ background: p.cardBg, border: `1px solid ${p.border}`, boxShadow: p.shadow, padding: '2rem 1.5rem', textAlign: 'center' }}>
                <AnimatedCounter value={stat.value} color={p.accent} />
                <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: p.fg, margin: '0.5rem 0 0.25rem' }}>{stat.label}</div>
                <div style={{ fontSize: '0.8125rem', color: p.fg2 }}>{stat.sub}</div>
              </TracedCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: Research Tools (Features) ────────────────────────────── */}
      <section
        id="section-research-tools"
        style={{ padding: '5rem 1.5rem', background: isDark ? 'rgba(28,28,30,0.5)' : 'rgba(0,0,0,0.02)' }}
      >
        <div style={{ maxWidth: '82rem', margin: '0 auto' }}>
          <div ref={featuresReveal.ref} style={{ opacity: featuresReveal.visible ? 1 : 0, transform: featuresReveal.visible ? 'none' : 'translateY(24px)', transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)' }}>
            {sectionHeading('Platform Features', 'Everything You Need', 'A comprehensive suite of tools for managing IoT experiments at scale.')}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '4rem' }}>
              {features.map((f, i) => (
                <TracedCard key={i} color={p.accent} style={{ background: p.cardBg, border: `1px solid ${p.border}`, boxShadow: p.shadow, padding: '1.75rem' }}>
                  <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '0.75rem', background: `${p.accent}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.accent, marginBottom: '1.125rem', border: `1px solid ${p.accent}20` }}>
                    {f.icon}
                  </div>
                  <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: p.fg, margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>{f.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: p.fg2, lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
                </TracedCard>
              ))}
            </div>
          </div>

          <div ref={researchReveal.ref} style={{ opacity: researchReveal.visible ? 1 : 0, transform: researchReveal.visible ? 'none' : 'translateY(24px)', transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)' }}>
            {sectionHeading('Research-First', 'Built for Science', 'Tools designed for rigorous academic and industrial IoT research.')}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
              {researchFeatures.map((f, i) => (
                <TracedCard key={i} color={p.accentGreen} style={{ background: p.cardBg, border: `1px solid ${p.border}`, boxShadow: p.shadow, padding: '1.75rem' }}>
                  <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '0.75rem', background: `${p.accentGreen}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.accentGreen, marginBottom: '1.125rem', border: `1px solid ${p.accentGreen}20` }}>
                    {f.icon}
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: p.fg, margin: '0 0 0.375rem' }}>{f.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: p.fg2, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                </TracedCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION: About ─────────────────────────────────────────────────── */}
      <section
        id="section-about"
        style={{ padding: '6rem 1.5rem' }}
      >
        <div style={{ maxWidth: '82rem', margin: '0 auto' }}>
          <div ref={aboutReveal.ref} style={{ opacity: aboutReveal.visible ? 1 : 0, transform: aboutReveal.visible ? 'none' : 'translateY(24px)', transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)' }}>
            {sectionHeading('About Us', 'Building the Future of IoT', 'Blazecore is an open-source platform designed to streamline IoT experiment management, built with Rust and React for maximum performance.')}

            {/* 3-column values grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
              {aboutValues.map((v, i) => (
                <div key={i} className="card-hover" style={{
                  background: p.cardBg, borderRadius: '1rem', border: `1px solid ${p.border}`,
                  boxShadow: p.shadow, padding: '2rem', transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}>
                  <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', background: `${p.accent}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', border: `1px solid ${p.border}` }}>
                    {v.icon}
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: p.fg, margin: '0 0 0.625rem' }}>{v.title}</h3>
                  <p style={{ fontSize: '0.9375rem', color: p.fg2, lineHeight: 1.65, margin: 0 }}>{v.desc}</p>
                </div>
              ))}
            </div>

            {/* Story + Tech Stack */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: p.accent, marginBottom: '0.5rem' }}>Our Story</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: p.fg, margin: '0 0 1.25rem', letterSpacing: '-0.025em' }}>How Blazecore Began</h3>
                <p style={{ fontSize: '0.9375rem', color: p.fg2, lineHeight: 1.75, marginBottom: '1rem' }}>
                  Blazecore was born from a simple need: managing IoT experiments efficiently. What started as an internal tool quickly evolved into a comprehensive platform that combines the raw performance of Rust with React's modern UI flexibility.
                </p>
                <p style={{ fontSize: '0.9375rem', color: p.fg2, lineHeight: 1.75, marginBottom: '1.75rem' }}>
                  Today, Blazecore serves developers, researchers, and organizations worldwide, giving them everything they need to manage experiments, monitor data in real time, and scale their IoT operations confidently.
                </p>
                {['Open-source and community-driven', 'REST API for full integration', 'Real-time metrics and monitoring'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.625rem' }}>
                    <CheckCircle size={15} color={p.accentGreen} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.9375rem', color: p.fg2 }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { icon: <Code size={24} color={p.accent} />, name: 'Rust', role: 'High Performance Backend' },
                  { icon: <Globe size={24} color={p.accentB} />, name: 'React', role: 'Modern UI Layer' },
                  { icon: <Database size={24} color={p.accentGreen} />, name: 'PostgreSQL', role: 'Reliable Storage' },
                  { icon: <Shield size={24} color={p.accent} />, name: 'Security First', role: 'Enterprise Grade' },
                ].map((t, i) => (
                  <div key={i} className="card-hover" style={{
                    background: p.cardBg, border: `1px solid ${p.border}`,
                    borderRadius: '1rem', padding: '1.5rem', boxShadow: p.shadow,
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  }}>
                    <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '0.625rem', background: `${p.accent}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.875rem' }}>
                      {t.icon}
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: p.fg }}>{t.name}</div>
                    <div style={{ fontSize: '0.8125rem', color: p.fg2, marginTop: '0.25rem' }}>{t.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION: CTA Strip ────────────────────────────────────────────── */}
      <section style={{ padding: '0 1.5rem 4rem' }}>
        <div ref={ctaReveal.ref} style={{ maxWidth: '82rem', margin: '0 auto', opacity: ctaReveal.visible ? 1 : 0, transform: ctaReveal.visible ? 'none' : 'translateY(24px)', transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)' }}>
          <div style={{
            padding: '3.5rem 2rem', background: `linear-gradient(135deg, ${p.accent} 0%, ${p.accentB} 100%)`,
            borderRadius: '1.5rem', textAlign: 'center', boxShadow: `0 20px 40px ${p.accent}30`,
          }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, color: '#fff', margin: '0 0 0.75rem', letterSpacing: '-0.025em' }}>Ready to Get Started?</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.0625rem', margin: '0 0 2rem' }}>Join the growing community of IoT professionals using Blazecore.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => onNavigate('signup')} style={{
                padding: '0.875rem 2rem', background: '#fff', color: p.accent, border: 'none',
                borderRadius: '0.625rem', fontSize: '0.9375rem', fontWeight: 700, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; }}
                onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)'; }}
                onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = ''; }}
              >
                Create Free Account <ArrowRight size={16} />
              </button>
              <button onClick={() => { const el = document.getElementById('section-contact'); el?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} style={{
                padding: '0.875rem 2rem', background: 'rgba(255,255,255,0.15)', color: '#fff',
                border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: '0.625rem',
                fontSize: '0.9375rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.22)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'; }}
                onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)'; }}
                onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = ''; }}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION: Contact ────────────────────────────────────────────────── */}
      <section
        id="section-contact"
        style={{ padding: '5rem 1.5rem 6rem', background: isDark ? 'rgba(28,28,30,0.5)' : 'rgba(0,0,0,0.02)' }}
      >
        <div style={{ maxWidth: '82rem', margin: '0 auto' }}>
          <div ref={contactReveal.ref} style={{ opacity: contactReveal.visible ? 1 : 0, transform: contactReveal.visible ? 'none' : 'translateY(24px)', transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)' }}>
            {sectionHeading('Contact', 'Get in Touch', 'Have questions about Blazecore? We\'re here to help.')}

            {/* Info cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
              {contactInfo.map((info, i) => (
                <div key={i} style={{ background: p.cardBg, border: `1px solid ${p.border}`, borderRadius: '1rem', boxShadow: p.shadow, padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', background: `${p.accent}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', border: `1px solid ${p.accent}20` }}>
                    {info.icon}
                  </div>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: p.fg, margin: '0 0 0.375rem' }}>{info.title}</h3>
                  <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: p.fg, margin: '0 0 0.25rem' }}>{info.content}</p>
                  <p style={{ fontSize: '0.8125rem', color: p.fg2, margin: 0 }}>{info.description}</p>
                </div>
              ))}
            </div>

            {/* Two-column: contact info + form */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
              {/* Left — contact info + social */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ background: p.cardBg, border: `1px solid ${p.border}`, borderRadius: '1rem', boxShadow: p.shadow, padding: '1.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.625rem', background: `linear-gradient(135deg, ${p.accent}, ${p.accentB})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 10px ${p.accent}30` }}>
                      <Zap size={16} color="#fff" />
                    </div>
                    <span style={{ fontSize: '1.0625rem', fontWeight: 700, color: p.fg }}>Blazecore</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: p.fg2, lineHeight: 1.65, margin: '0 0 1.25rem' }}>
                    Dedicated to providing the best open-source IoT experiment management platform for developers and researchers worldwide.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                    {[
                      { icon: <Clock size={14} color={p.fg2} />, text: '24/7 Technical Support' },
                      { icon: <MessageSquare size={14} color={p.fg2} />, text: 'Live Chat Available' },
                      { icon: <Mail size={14} color={p.fg2} />, text: 'Email Response in 24h' },
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        {item.icon}
                        <span style={{ fontSize: '0.875rem', color: p.fg2 }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social links */}
                <div style={{ background: p.cardBg, border: `1px solid ${p.border}`, borderRadius: '1rem', boxShadow: p.shadow, padding: '1.75rem' }}>
                  <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: p.fg2, margin: '0 0 1rem', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Follow Our Progress</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                    {['GitHub', 'Twitter / X', 'LinkedIn'].map((s, i) => (
                      <button key={i} style={{
                        display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.625rem 0.875rem',
                        background: isDark ? '#2C2C2E' : '#F5F5F7', border: `1px solid ${p.border}`,
                        borderRadius: '0.5rem', color: p.fg2, fontSize: '0.875rem', fontWeight: 500,
                        cursor: 'pointer', transition: 'all 0.15s', width: '100%',
                      }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = p.accent; (e.currentTarget as HTMLElement).style.color = p.accent; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = p.border; (e.currentTarget as HTMLElement).style.color = p.fg2; }}
                        onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)'; }}
                        onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = ''; }}
                      >
                        <ExternalLink size={14} /> {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — form */}
              <div style={{ background: p.cardBg, border: `1px solid ${p.border}`, borderRadius: '1rem', boxShadow: p.shadow, padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: p.fg, margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>Send us a Message</h3>
                <p style={{ fontSize: '0.9rem', color: p.fg2, margin: '0 0 1.75rem' }}>Fill out the form and we'll get back to you shortly.</p>
                <ContactForm p={p} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '2rem 1.5rem', borderTop: `1px solid ${p.border}`, textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '0.8125rem', color: p.fg3 }}>
          © 2026 Blazecore — MIT License. Built with Rust &amp; React.
        </p>
      </footer>
    </main>
  );
};

export default LandingPageNew;
