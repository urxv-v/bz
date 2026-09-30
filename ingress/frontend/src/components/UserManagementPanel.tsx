import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Upload, Eye, EyeOff, Check, ChevronRight, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './ui';

interface UserManagementPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentEntity?: string;
}

type PanelTab = 'general' | 'security' | 'preferences';

interface UserProfile {
  fullName: string;
  displayName: string;
  email: string;
  role: string;
  avatarUrl: string;
}

interface UserPrefs {
  theme: 'light' | 'dark' | 'system';
  defaultEntity: string;
  notifyLiveAlerts: boolean;
  notifyExperimentUpdates: boolean;
  notifyWeeklyDigest: boolean;
}

const STORAGE_KEY = 'blzc-user-profile';
const THEME_KEY = 'blzc-theme';

function loadProfile(): Partial<UserProfile & UserPrefs> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveProfile(data: Partial<UserProfile & UserPrefs>) {
  const existing = loadProfile();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...existing, ...data }));
}

function getPasswordStrength(pw: string): number {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

const strengthColors = ['#EF4444', '#EF4444', '#F59E0B', '#10B981', '#10B981'];
const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

const UserManagementPanel: React.FC<UserManagementPanelProps> = ({ isOpen, onClose, currentEntity = 'FI' }) => {
  const { mode, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<PanelTab>('general');
  const panelRef = useRef<HTMLDivElement>(null);

  const saved = loadProfile();

  const [fullName, setFullName] = useState(saved.fullName || 'Admin');
  const [displayName, setDisplayName] = useState(saved.displayName || 'admin');
  const [avatarUrl, setAvatarUrl] = useState(saved.avatarUrl || '');
  const [generalSaved, setGeneralSaved] = useState(false);

  const [pwCurrent, setPwCurrent] = useState('');
  const [pwNew, setPwNew] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [showPwCurrent, setShowPwCurrent] = useState(false);
  const [showPwNew, setShowPwNew] = useState(false);
  const [pwError, setPwError] = useState('');
  const [pwSaved, setPwSaved] = useState(false);

  const [prefTheme, setPrefTheme] = useState<'light' | 'dark' | 'system'>(
    (saved as any).theme || 'light'
  );
  const [defaultEntity, setDefaultEntity] = useState(saved.defaultEntity || currentEntity);
  const [notifyLive, setNotifyLive] = useState(saved.notifyLiveAlerts ?? true);
  const [notifyExp, setNotifyExp] = useState(saved.notifyExperimentUpdates ?? true);
  const [notifyDigest, setNotifyDigest] = useState(saved.notifyWeeklyDigest ?? false);
  const [prefSaved, setPrefSaved] = useState(false);

  const email = (saved as any).email || 'admin@blazecore.io';
  const role = (saved as any).role || 'Researcher';

  const initials = fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'AD';
  const strength = getPasswordStrength(pwNew);

  const handleEscapeKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscapeKey]);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarUrl(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSaveGeneral = () => {
    saveProfile({ fullName, displayName, avatarUrl });
    setGeneralSaved(true);
    setTimeout(() => setGeneralSaved(false), 2000);
  };

  const pwValid = pwCurrent.length > 0 && pwNew.length >= 8 &&
    /[A-Z]/.test(pwNew) && /[0-9]/.test(pwNew) && /[^A-Za-z0-9]/.test(pwNew) &&
    pwConfirm === pwNew;

  const handleSavePassword = () => {
    if (!pwValid) return;
    if (pwNew !== pwConfirm) { setPwError('Passwords do not match.'); return; }
    setPwError('');
    setPwSaved(true);
    setPwCurrent(''); setPwNew(''); setPwConfirm('');
    setTimeout(() => setPwSaved(false), 2000);
  };

  const handleSavePreferences = () => {
    saveProfile({ theme: prefTheme, defaultEntity, notifyLiveAlerts: notifyLive, notifyExperimentUpdates: notifyExp, notifyWeeklyDigest: notifyDigest });
    if (prefTheme !== 'system') setTheme(prefTheme);
    localStorage.setItem(THEME_KEY, prefTheme);
    setPrefSaved(true);
    setTimeout(() => setPrefSaved(false), 2000);
  };

  const isDark = mode === 'dark';
  const panelBg = isDark ? '#1C1C1E' : '#FFFFFF';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const textPrimary = isDark ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = isDark ? '#98989D' : '#86868B';
  const inputBg = isDark ? '#2C2C2E' : '#F5F5F7';
  const accent = isDark ? '#2997FF' : '#0071E3';
  const tabActiveBg = isDark ? 'rgba(41,151,255,0.12)' : 'rgba(0,113,227,0.08)';

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem',
    border: `1px solid ${borderColor}`, background: inputBg,
    color: textPrimary, fontSize: '0.875rem', outline: 'none',
    transition: 'border-color 0.15s', boxSizing: 'border-box',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.8125rem', fontWeight: 500,
    color: textSecondary, marginBottom: '0.375rem',
  };

  const fieldGroup = (label: string, children: React.ReactNode) => (
    <div style={{ marginBottom: '1rem' }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );

  const saveBtn = (id: string, onClick: () => void, disabled: boolean, saved: boolean, label = 'Save changes') => (
    <button id={id} onClick={onClick} disabled={disabled} style={{
      padding: '0.5625rem 1.25rem', border: 'none', borderRadius: '0.5rem',
      fontSize: '0.875rem', fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
      background: disabled ? (isDark ? '#3A3A3C' : '#E5E5EA') : accent,
      color: disabled ? textSecondary : '#fff',
      display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
      transition: 'all 0.15s',
    }}
      onMouseEnter={e => { if (!disabled) (e.currentTarget as HTMLElement).style.opacity = '0.88'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
      onMouseDown={e => { if (!disabled) (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)'; }}
      onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
    >
      {saved ? <><Check size={13} /> Saved</> : label}
    </button>
  );

  const toggle = (checked: boolean, onChange: (v: boolean) => void) => (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        width: '2.25rem', height: '1.25rem', borderRadius: '9999px', border: 'none',
        cursor: 'pointer', transition: 'background 0.2s',
        background: checked ? accent : (isDark ? '#3A3A3C' : '#D1D1D6'),
        position: 'relative', flexShrink: 0,
      }}
    >
      <span style={{
        position: 'absolute', top: '0.125rem',
        left: checked ? 'calc(100% - 1.125rem)' : '0.125rem',
        width: '1rem', height: '1rem', borderRadius: '50%',
        background: '#fff', transition: 'left 0.2s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }} />
    </button>
  );

  if (!isOpen) return null;

  return (
    <>
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        style={{
          position: 'fixed', right: 0, top: 0,
          height: '100vh', width: '400px',
          zIndex: 201, background: panelBg,
          borderLeft: `1px solid ${borderColor}`,
          boxShadow: '-8px 0 40px rgba(0,0,0,0.18)',
          display: 'flex', flexDirection: 'column',
          animation: 'slideInRight 0.25s cubic-bezier(0.16,1,0.3,1)',
          overflowY: 'auto',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        }}
        onClick={e => e.stopPropagation()}
      >
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to   { transform: translateX(0);    opacity: 1; }
          }
          .panel-field-input:focus {
            border-color: ${accent} !important;
            box-shadow: 0 0 0 3px ${accent}22 !important;
          }
          .panel-tab:focus-visible { outline: 2px solid ${accent}; outline-offset: 2px; }
        `}</style>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.25rem 1.5rem', borderBottom: `1px solid ${borderColor}`,
          flexShrink: 0,
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: textPrimary, letterSpacing: '-0.01em' }}>
              Account Settings
            </h2>
            <p style={{ margin: '0.125rem 0 0', fontSize: '0.8125rem', color: textSecondary }}>
              Manage your profile and preferences
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close panel"
            style={{
              width: '2rem', height: '2rem', borderRadius: '0.5rem',
              border: `1px solid ${borderColor}`, background: 'transparent',
              color: textSecondary, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.95)'; }}
            onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', gap: '0.25rem', padding: '0.75rem 1.5rem',
          borderBottom: `1px solid ${borderColor}`, flexShrink: 0,
        }}>
          {(['general', 'security', 'preferences'] as PanelTab[]).map(tab => (
            <button
              key={tab}
              className="panel-tab"
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.375rem 0.875rem', borderRadius: '0.5rem',
                border: 'none', cursor: 'pointer', fontSize: '0.8125rem',
                fontWeight: 500, transition: 'all 0.15s', textTransform: 'capitalize',
                background: activeTab === tab ? tabActiveBg : 'transparent',
                color: activeTab === tab ? accent : textSecondary,
              }}
              onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)'; }}
              onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>

          {/* ── General Tab ── */}
          {activeTab === 'general' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {/* Avatar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', padding: '1rem', background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', borderRadius: '0.75rem', border: `1px solid ${borderColor}` }}>
                <div style={{
                  width: '3.5rem', height: '3.5rem', borderRadius: '50%',
                  background: avatarUrl ? 'transparent' : accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, overflow: 'hidden', fontSize: '1rem', fontWeight: 700, color: '#fff',
                }}>
                  {avatarUrl ? <img src={avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: textPrimary, marginBottom: '0.375rem' }}>Profile Photo</div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <label style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                      padding: '0.375rem 0.75rem', borderRadius: '0.375rem',
                      border: `1px solid ${borderColor}`, background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                      fontSize: '0.75rem', fontWeight: 500, color: textSecondary, cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}>
                      <Upload size={12} /> Upload
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarUpload} />
                    </label>
                    {avatarUrl && (
                      <button onClick={() => setAvatarUrl('')} style={{
                        padding: '0.375rem 0.75rem', borderRadius: '0.375rem',
                        border: `1px solid rgba(239,68,68,0.25)`, background: 'rgba(239,68,68,0.08)',
                        fontSize: '0.75rem', fontWeight: 500, color: '#EF4444', cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}>Remove</button>
                    )}
                  </div>
                </div>
              </div>

              {fieldGroup('Full Name',
                <input
                  id="field-full-name"
                  type="text"
                  className="panel-field-input"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  style={inputStyle}
                />
              )}

              {fieldGroup('Display Name / Handle',
                <input
                  id="field-display-name"
                  type="text"
                  className="panel-field-input"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  style={inputStyle}
                />
              )}

              {fieldGroup('Email Address',
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    value={email}
                    readOnly
                    style={{ ...inputStyle, opacity: 0.6, cursor: 'not-allowed', paddingRight: '2.5rem' }}
                    title="Contact admin to change email"
                  />
                  <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.6875rem', color: textSecondary }}>
                    read-only
                  </span>
                </div>
              )}

              {fieldGroup('Role',
                <div style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '0.3125rem 0.75rem', borderRadius: '9999px',
                  background: `${accent}12`, border: `1px solid ${accent}30`,
                  fontSize: '0.8125rem', fontWeight: 600, color: accent,
                }}>
                  {role}
                </div>
              )}

              <div style={{ marginTop: '0.5rem' }}>
                {saveBtn('btn-save-general', handleSaveGeneral, !fullName.trim(), generalSaved)}
              </div>
            </div>
          )}

          {/* ── Security Tab ── */}
          {activeTab === 'security' && (
            <div>
              {fieldGroup('Current Password',
                <div style={{ position: 'relative' }}>
                  <input
                    id="field-password-current"
                    type={showPwCurrent ? 'text' : 'password'}
                    className="panel-field-input"
                    value={pwCurrent}
                    onChange={e => setPwCurrent(e.target.value)}
                    style={{ ...inputStyle, paddingRight: '2.5rem' }}
                  />
                  <button onClick={() => setShowPwCurrent(!showPwCurrent)} style={{
                    position: 'absolute', right: '0.625rem', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: textSecondary, padding: '0.25rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {showPwCurrent ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              )}

              {fieldGroup('New Password',
                <>
                  <div style={{ position: 'relative' }}>
                    <input
                      id="field-password-new"
                      type={showPwNew ? 'text' : 'password'}
                      className="panel-field-input"
                      value={pwNew}
                      onChange={e => setPwNew(e.target.value)}
                      style={{ ...inputStyle, paddingRight: '2.5rem' }}
                    />
                    <button onClick={() => setShowPwNew(!showPwNew)} style={{
                      position: 'absolute', right: '0.625rem', top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', color: textSecondary, padding: '0.25rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {showPwNew ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>

                  {/* Strength meter */}
                  {pwNew.length > 0 && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.375rem' }}>
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} style={{
                            flex: 1, height: '4px', borderRadius: '2px',
                            background: i <= strength ? strengthColors[strength] : (isDark ? '#3A3A3C' : '#E5E5EA'),
                            transition: 'background 0.2s',
                          }} />
                        ))}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: strengthColors[strength], fontWeight: 500 }}>
                        {strengthLabels[strength]}
                      </span>
                    </div>
                  )}

                  {/* Requirements */}
                  <div style={{ marginTop: '0.625rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {[
                      { label: '8+ characters', met: pwNew.length >= 8 },
                      { label: 'Uppercase letter', met: /[A-Z]/.test(pwNew) },
                      { label: 'Number', met: /[0-9]/.test(pwNew) },
                      { label: 'Special character', met: /[^A-Za-z0-9]/.test(pwNew) },
                    ].map(req => (
                      <div key={req.label} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: req.met ? '#10B981' : textSecondary }}>
                        <Check size={11} style={{ opacity: req.met ? 1 : 0.3, color: req.met ? '#10B981' : textSecondary }} />
                        {req.label}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {fieldGroup('Confirm New Password',
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    className="panel-field-input"
                    value={pwConfirm}
                    onChange={e => setPwConfirm(e.target.value)}
                    style={{ ...inputStyle, paddingRight: '2rem' }}
                  />
                  {pwNew.length > 0 && pwConfirm.length > 0 && (
                    <span style={{
                      position: 'absolute', right: '0.625rem', top: '50%', transform: 'translateY(-50%)',
                      color: pwConfirm === pwNew ? '#10B981' : '#EF4444', fontSize: '0.875rem',
                    }}>
                      {pwConfirm === pwNew ? '✓' : '✗'}
                    </span>
                  )}
                </div>
              )}

              {pwError && (
                <div style={{ marginBottom: '1rem', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', fontSize: '0.8125rem', color: '#EF4444' }}>
                  {pwError}
                </div>
              )}

              {saveBtn('btn-save-password', handleSavePassword, !pwValid, pwSaved, 'Update password')}
            </div>
          )}

          {/* ── Preferences Tab ── */}
          {activeTab === 'preferences' && (
            <div>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={labelStyle}>Theme</label>
                <div style={{ display: 'flex', gap: '0.25rem', background: isDark ? '#2C2C2E' : '#F5F5F7', borderRadius: '0.5rem', padding: '0.25rem', border: `1px solid ${borderColor}` }}>
                  {([
                    { val: 'light', icon: <Sun size={13} />, label: 'Light' },
                    { val: 'dark',  icon: <Moon size={13} />, label: 'Dark' },
                    { val: 'system', icon: <Monitor size={13} />, label: 'System' },
                  ] as { val: 'light' | 'dark' | 'system'; icon: React.ReactNode; label: string }[]).map(opt => (
                    <button key={opt.val} onClick={() => setPrefTheme(opt.val)} style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem',
                      padding: '0.4375rem', borderRadius: '0.375rem', border: 'none',
                      cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 500,
                      background: prefTheme === opt.val ? (isDark ? '#3A3A3C' : '#FFFFFF') : 'transparent',
                      color: prefTheme === opt.val ? textPrimary : textSecondary,
                      boxShadow: prefTheme === opt.val ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                      transition: 'all 0.15s',
                    }}
                      onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.96)'; }}
                      onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                    >
                      {opt.icon} {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={labelStyle}>Default Entity</label>
                <select
                  value={defaultEntity}
                  onChange={e => setDefaultEntity(e.target.value)}
                  style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                >
                  <option value="FI">Foundation Institute (FI)</option>
                  <option value="aragon">Aragon Research Institute</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ ...labelStyle, marginBottom: '0.75rem' }}>Notifications</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { label: 'Live Alerts', sub: 'Real-time device notifications', val: notifyLive, set: setNotifyLive },
                    { label: 'Experiment Updates', sub: 'Status changes and results', val: notifyExp, set: setNotifyExp },
                    { label: 'Weekly Digest', sub: 'Summary of activity each week', val: notifyDigest, set: setNotifyDigest },
                  ].map(item => (
                    <div key={item.label} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '0.75rem', borderRadius: '0.5rem',
                      background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                      border: `1px solid ${borderColor}`,
                    }}>
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 500, color: textPrimary }}>{item.label}</div>
                        <div style={{ fontSize: '0.75rem', color: textSecondary, marginTop: '0.125rem' }}>{item.sub}</div>
                      </div>
                      {toggle(item.val, item.set)}
                    </div>
                  ))}
                </div>
              </div>

              {saveBtn('btn-save-preferences', handleSavePreferences, false, prefSaved, 'Save preferences')}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserManagementPanel;
