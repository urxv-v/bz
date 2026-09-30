import React, { useState } from 'react';
import { Zap, Mail, Lock, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { useTheme } from './ui';

interface LoginProps {
  onNavigate: (page: string) => void;
  onLoginSuccess: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate, onLoginSuccess }) => {
  const { theme, mode } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const accent = mode === 'light' ? '#0071E3' : '#2997FF';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const credentials = btoa(`${email}:${password}`);
      const response = await fetch('http://0.0.0.0:8001/api/v1/auth/login', {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(true);
        localStorage.setItem('blazecore_token', data.token || credentials);
        localStorage.setItem('blazecore_user', email);
        onLoginSuccess(data.token || credentials);
        setTimeout(() => onNavigate('dashboard'), 1000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: `1px solid ${theme.colors.border.primary}`,
    background: mode === 'light' ? '#FFFFFF' : '#2C2C2E',
    color: theme.colors.text.primary,
    fontSize: '0.9375rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.colors.text.secondary,
    marginBottom: '0.375rem',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: mode === 'light' ? '#F5F5F7' : '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5rem 1rem 2rem',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{
          background: mode === 'light' ? '#FFFFFF' : '#1C1C1E',
          borderRadius: '1.25rem',
          border: `1px solid ${theme.colors.border.primary}`,
          boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)',
          padding: '2.5rem',
        }}>
          {/* Brand */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <button
              onClick={() => onNavigate('landing')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}
            >
              <div style={{
                width: '2.25rem', height: '2.25rem', borderRadius: '0.5625rem',
                background: accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 2px 8px ${accent}40`,
              }}>
                <Zap size={16} color="#fff" />
              </div>
              <span style={{ fontSize: '1.0625rem', fontWeight: 600, color: theme.colors.text.primary, letterSpacing: '-0.02em' }}>
                Blazecore
              </span>
            </button>
            <h1 style={{ fontSize: '1.625rem', fontWeight: 700, color: theme.colors.text.primary, margin: '0 0 0.375rem', letterSpacing: '-0.025em' }}>
              Welcome back
            </h1>
            <p style={{ color: theme.colors.text.secondary, fontSize: '0.9375rem', margin: 0 }}>
              Sign in to your IoT dashboard
            </p>
          </div>

          {error && (
            <div style={{
              marginBottom: '1.25rem', padding: '0.75rem 1rem',
              background: 'rgba(255,59,48,0.06)', border: '1px solid rgba(255,59,48,0.20)',
              borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <AlertCircle size={15} color="#FF3B30" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.875rem', color: '#FF3B30' }}>{error}</span>
            </div>
          )}
          {success && (
            <div style={{
              marginBottom: '1.25rem', padding: '0.75rem 1rem',
              background: 'rgba(52,199,89,0.06)', border: '1px solid rgba(52,199,89,0.20)',
              borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <CheckCircle size={15} color="#34C759" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.875rem', color: '#34C759' }}>Login successful! Redirecting...</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} color={theme.colors.text.tertiary} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  style={{ ...inputStyle, paddingLeft: '2.5rem' }}
                  autoComplete="email"
                  onFocus={e => { e.target.style.borderColor = accent; e.target.style.boxShadow = `0 0 0 3px ${accent}18`; }}
                  onBlur={e => { e.target.style.borderColor = theme.colors.border.primary; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} color={theme.colors.text.tertiary} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  style={{ ...inputStyle, paddingLeft: '2.5rem' }}
                  autoComplete="current-password"
                  onFocus={e => { e.target.style.borderColor = accent; e.target.style.boxShadow = `0 0 0 3px ${accent}18`; }}
                  onBlur={e => { e.target.style.borderColor = theme.colors.border.primary; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '0.8125rem 1.5rem',
                background: loading ? theme.colors.border.secondary : accent,
                color: '#fff', border: 'none', borderRadius: '0.5625rem',
                fontSize: '0.9375rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                boxShadow: loading ? 'none' : `0 2px 8px ${accent}35`,
                transition: 'all 0.2s',
                letterSpacing: '-0.01em',
              }}
            >
              {loading ? (
                <>
                  <div style={{ width: '1rem', height: '1rem', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  Signing In...
                </>
              ) : (
                <>Sign In <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: theme.colors.text.secondary }}>
            Don't have an account?{' '}
            <button
              onClick={() => onNavigate('signup')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: accent, fontWeight: 600, fontSize: '0.875rem' }}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Login;
