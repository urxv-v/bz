import React, { useState } from 'react';
import { Zap, Mail, Lock, User, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { useTheme } from './ui';

interface SignupProps {
  onNavigate: (page: string) => void;
  onSignupSuccess: () => void;
}

const Signup: React.FC<SignupProps> = ({ onNavigate, onSignupSuccess }) => {
  const { theme, mode } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }
    if (!agreeTerms) {
      setError('Please agree to the terms and conditions');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/v1/auth/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        setSuccess(true);
        onSignupSuccess();
        setTimeout(() => onNavigate('dashboard'), 2000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || 'Failed to create account. Email may already exist.');
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
    borderRadius: '0.625rem',
    border: `1.5px solid ${theme.colors.border.primary}`,
    background: mode === 'light' ? '#F5F5F7' : '#2C2C2E',
    color: theme.colors.text.primary,
    fontSize: '0.9375rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.colors.text.secondary,
    marginBottom: '0.375rem',
  };

  const fieldGroup = (label: string, inputEl: React.ReactNode) => (
    <div style={{ marginBottom: '1.125rem' }}>
      <label style={labelStyle}>{label}</label>
      {inputEl}
    </div>
  );

  const iconWrap = (icon: React.ReactNode, input: React.ReactNode) => (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>{icon}</div>
      {input}
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: mode === 'light' ? '#F5F5F7' : '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5rem 1rem 2rem',
    }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <div style={{
          background: mode === 'light' ? '#FFFFFF' : '#1C1C1E',
          borderRadius: '1.25rem',
          border: `1px solid ${theme.colors.border.primary}`,
          boxShadow: theme.colors.shadow.xl,
          padding: '2.5rem',
        }}>
          {/* Brand */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <button
              onClick={() => onNavigate('landing')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.5rem' }}
            >
              <div style={{
                width: '2.5rem', height: '2.5rem', borderRadius: '0.625rem',
                background: theme.gradients.primary,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,113,227,0.3)',
              }}>
                <Zap size={18} color="#fff" />
              </div>
              <span style={{ fontSize: '1.125rem', fontWeight: 700, color: theme.colors.text.primary, letterSpacing: '-0.02em' }}>
                Blazecore
              </span>
            </button>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: theme.colors.text.primary, margin: '0 0 0.5rem', letterSpacing: '-0.025em' }}>
              Create your account
            </h1>
            <p style={{ color: theme.colors.text.secondary, fontSize: '0.9375rem', margin: 0 }}>
              Start managing IoT experiments for free
            </p>
          </div>

          {/* Messages */}
          {error && (
            <div style={{
              marginBottom: '1.25rem', padding: '0.75rem 1rem',
              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
              borderRadius: '0.625rem', display: 'flex', alignItems: 'center', gap: '0.625rem',
            }}>
              <AlertCircle size={16} color="#EF4444" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.875rem', color: '#EF4444' }}>{error}</span>
            </div>
          )}
          {success && (
            <div style={{
              marginBottom: '1.25rem', padding: '0.75rem 1rem',
              background: 'rgba(52,199,89,0.08)', border: '1px solid rgba(52,199,89,0.25)',
              borderRadius: '0.625rem', display: 'flex', alignItems: 'center', gap: '0.625rem',
            }}>
              <CheckCircle size={16} color="#34C759" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.875rem', color: '#1D8348' }}>Account created! Redirecting to login...</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {fieldGroup('Full Name', iconWrap(
              <User size={16} color={theme.colors.text.tertiary} />,
              <input type="text" placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} required disabled={loading} style={{ ...inputStyle, paddingLeft: '2.5rem' }} autoComplete="name" />
            ))}
            {fieldGroup('Email Address', iconWrap(
              <Mail size={16} color={theme.colors.text.tertiary} />,
              <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required disabled={loading} style={{ ...inputStyle, paddingLeft: '2.5rem' }} autoComplete="email" />
            ))}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem', marginBottom: '1.125rem' }}>
              <div>
                <label style={labelStyle}>Password</label>
                {iconWrap(
                  <Lock size={16} color={theme.colors.text.tertiary} />,
                  <input type="password" placeholder="Min. 6 chars" value={password} onChange={e => setPassword(e.target.value)} required disabled={loading} style={{ ...inputStyle, paddingLeft: '2.5rem' }} autoComplete="new-password" />
                )}
              </div>
              <div>
                <label style={labelStyle}>Confirm Password</label>
                {iconWrap(
                  <Lock size={16} color={theme.colors.text.tertiary} />,
                  <input type="password" placeholder="Repeat password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required disabled={loading} style={{ ...inputStyle, paddingLeft: '2.5rem' }} autoComplete="new-password" />
                )}
              </div>
            </div>

            {/* Terms */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', marginBottom: '1.75rem' }}>
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={e => setAgreeTerms(e.target.checked)}
                disabled={loading}
                style={{ marginTop: '0.2rem', accentColor: theme.colors.rust, width: '1rem', height: '1rem', flexShrink: 0 }}
              />
              <label htmlFor="terms" style={{ fontSize: '0.875rem', color: theme.colors.text.secondary, cursor: 'pointer', lineHeight: 1.5 }}>
                I agree to the{' '}
                <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.rust, fontWeight: 600, fontSize: '0.875rem', padding: 0 }}>
                  Terms of Service
                </button>
                {' '}and{' '}
                <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.rust, fontWeight: 600, fontSize: '0.875rem', padding: 0 }}>
                  Privacy Policy
                </button>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !agreeTerms}
              style={{
                width: '100%', padding: '0.8125rem 1.5rem',
                background: (loading || !agreeTerms) ? theme.colors.border.secondary : theme.gradients.primary,
                color: '#fff', border: 'none', borderRadius: '0.625rem',
                fontSize: '0.9375rem', fontWeight: 600, cursor: (loading || !agreeTerms) ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                boxShadow: (loading || !agreeTerms) ? 'none' : '0 4px 14px rgba(0,113,227,0.3)',
                transition: 'all 0.2s',
              }}
            >
              {loading ? (
                <>
                  <div style={{ width: '1rem', height: '1rem', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  Creating Account...
                </>
              ) : (
                <>Create Account <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: theme.colors.text.secondary }}>
            Already have an account?{' '}
            <button
              onClick={() => onNavigate('dashboard')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.rust, fontWeight: 600, fontSize: '0.875rem' }}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Signup;
