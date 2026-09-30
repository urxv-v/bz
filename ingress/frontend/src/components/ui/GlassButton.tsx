import React, { useRef, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const GlassButton: React.FC<GlassButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  style,
  ...props
}) => {
  const { mode } = useTheme();
  const btnRef = useRef<HTMLButtonElement>(null);

  const blue  = '#0071E3';
  const blueD = '#0068D0';
  const blueL = '#2997FF';

  const sizeStyles: React.CSSProperties = ({
    sm: { padding: '0.4375rem 1rem',    fontSize: '0.8125rem' },
    md: { padding: '0.625rem 1.375rem', fontSize: '0.9375rem' },
    lg: { padding: '0.8125rem 1.875rem', fontSize: '1rem' },
  } as any)[size];

  const variantBase: React.CSSProperties = (() => {
    switch (variant) {
      case 'primary':  return { background: blue, color: '#FFFFFF', border: 'none', boxShadow: '0 4px 14px rgba(0,113,227,0.28), 0 1px 4px rgba(0,113,227,0.12)', willChange: 'transform' };
      case 'secondary': return { background: mode === 'light' ? 'rgba(0,113,227,0.07)' : 'rgba(41,151,255,0.10)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', color: mode === 'light' ? blue : blueL, border: `1px solid ${mode === 'light' ? 'rgba(0,113,227,0.25)' : 'rgba(41,151,255,0.30)'}` };
      case 'outline':  return { background: 'transparent', color: mode === 'light' ? blue : blueL, border: `1.5px solid ${mode === 'light' ? 'rgba(0,113,227,0.40)' : 'rgba(41,151,255,0.45)'}` };
      case 'ghost':    return { background: 'transparent', color: mode === 'light' ? '#3C3C43' : '#EBEBF0', border: 'none' };
      case 'danger':   return { background: '#FF3B30', color: '#FFFFFF', border: 'none', boxShadow: '0 3px 10px rgba(255,59,48,0.22)', willChange: 'transform' };
      default:         return {};
    }
  })();

  const onEnter = useCallback(() => {
    const el = btnRef.current;
    if (!el) return;
    switch (variant) {
      case 'primary':
        el.style.background = blueD;
        el.style.transform = 'translateY(-2px)';
        el.style.boxShadow = '0 8px 24px rgba(0,113,227,0.40), 0 2px 6px rgba(0,113,227,0.20)';
        break;
      case 'secondary':
        el.style.background = mode === 'light' ? 'rgba(0,113,227,0.12)' : 'rgba(41,151,255,0.18)';
        break;
      case 'outline':
        el.style.background = 'rgba(0,113,227,0.08)';
        el.style.backdropFilter = 'blur(8px)';
        break;
      case 'ghost':
        el.style.background = mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)';
        break;
      case 'danger':
        el.style.background = '#CC1111';
        el.style.transform = 'translateY(-1px)';
        el.style.boxShadow = '0 6px 18px rgba(255,59,48,0.40)';
        break;
    }
  }, [variant, mode]);

  const onLeave = useCallback(() => {
    const el = btnRef.current;
    if (!el) return;
    switch (variant) {
      case 'primary':
        el.style.background = blue;
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = '0 4px 14px rgba(0,113,227,0.28), 0 1px 4px rgba(0,113,227,0.12)';
        break;
      case 'secondary':
        el.style.background = mode === 'light' ? 'rgba(0,113,227,0.07)' : 'rgba(41,151,255,0.10)';
        break;
      case 'outline':
        el.style.background = 'transparent';
        el.style.backdropFilter = 'none';
        break;
      case 'ghost':
        el.style.background = 'transparent';
        break;
      case 'danger':
        el.style.background = '#FF3B30';
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = '0 3px 10px rgba(255,59,48,0.22)';
        break;
    }
  }, [variant, mode]);

  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontWeight: 600,
    letterSpacing: '-0.01em',
    borderRadius: '0.5625rem',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.55 : 1,
    transition: 'background 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease',
    ...sizeStyles,
  };

  return (
    <button
      ref={btnRef}
      style={{ ...base, ...variantBase, ...style }}
      disabled={disabled || loading}
      onMouseEnter={disabled || loading ? undefined : onEnter}
      onMouseLeave={disabled || loading ? undefined : onLeave}
      className={className}
      {...props}
    >
      {loading && (
        <Loader2 style={{ marginRight: '0.5rem', width: 15, height: 15, animation: 'spin 1s linear infinite' }} />
      )}
      {children}
    </button>
  );
};

export default GlassButton;
