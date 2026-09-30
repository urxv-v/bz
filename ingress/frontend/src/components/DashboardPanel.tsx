import React, { useState, useRef, useEffect } from 'react';
import {
  Settings, LayoutDashboard,
  Database, Box, FileText, BarChart2, HelpCircle, Plus,
  Search, Terminal, Zap, X, ArrowLeft, MapPin, Cpu,
  FlaskConical, Building2, RefreshCw, Menu,
  ChevronRight as ArrowRight,
  ChevronLeft,
  Activity, Globe, Lock, Users, ChevronDown, ChevronUp,
  Wifi, Shield
} from 'lucide-react';
import { ExperimentItem } from '../interfaces/experiments';
import { FieldDaqSetup } from '../interfaces/experiments';
import ApiTestingSection from './ApiTestingSection';
import DeviceCard, { EntityColors } from './DeviceCard';
import ExperimentDetailView from './ExperimentDetailView';
import UserManagementPanel from './UserManagementPanel';
import { useTheme } from './ui';
import '../DashboardPanel.css';

// ── Storage Schema ─────────────────────────────────────────────────────────────
export const STORAGE_KEYS = {
  THEME:          'blzc.theme',
  ACTIVE_ENTITY:  'blzc.activeEntity',
  USER_PROFILE:   'blzc.userProfile',
  SESSION:        'blzc.session',
  SIDEBAR_STATE:  'blzc.sidebarCollapsed',
} as const;

function migrateLocalStorage() {
  const migrations: Array<{ old: string; newKey: string }> = [
    { old: 'theme',            newKey: STORAGE_KEYS.THEME },
    { old: 'blazecore_entity', newKey: STORAGE_KEYS.ACTIVE_ENTITY },
    { old: 'blzc-active-entity', newKey: STORAGE_KEYS.ACTIVE_ENTITY },
    { old: 'blazecore_user',   newKey: STORAGE_KEYS.SESSION },
    { old: 'blzc-user-profile', newKey: STORAGE_KEYS.USER_PROFILE },
    { old: 'user-profile',     newKey: STORAGE_KEYS.USER_PROFILE },
  ];
  migrations.forEach(({ old, newKey }) => {
    const val = localStorage.getItem(old);
    if (val !== null) {
      if (!localStorage.getItem(newKey)) localStorage.setItem(newKey, val);
      localStorage.removeItem(old);
    }
  });
}

// ── Entity Definitions ─────────────────────────────────────────────────────────
const ENTITIES: Record<string, EntityDef> = {
  fi: {
    id: 'fi',
    name: 'FI',
    fullName: 'Foundation Institute',
    tagline: 'Open research infrastructure & experimentation',
    description: 'The Foundation Institute node hosts cutting-edge IoT experiments across its distributed sensor network. Specialising in smart-city, environmental monitoring, and energy research.',
    location: 'Barcelona, Spain',
    website: 'fi.eus',
    devices: 48,
    activeExperiments: 12,
    researchers: 34,
    colors: {
      gradient: 'linear-gradient(135deg, #9B1C1C 0%, #C0392B 100%)',
      primary: '#C0392B',
      accent: '#E74C3C',
      bgLight: 'rgba(192,57,43,0.10)',
      bgMedium: 'rgba(192,57,43,0.14)',
      borderColor: 'rgba(192,57,43,0.28)',
    },
    icon: '🏛',
  },
  aragon: {
    id: 'aragon',
    name: 'Aragon',
    fullName: 'Aragon Research Institute',
    tagline: 'Smart systems & connected infrastructure',
    description: 'The Aragon node drives innovation in industrial IoT, precision agriculture, and autonomous systems research, leveraging state-of-the-art sensor fusion and edge computing.',
    location: 'Zaragoza, Spain',
    website: 'aragon.es',
    devices: 36,
    activeExperiments: 9,
    researchers: 27,
    colors: {
      gradient: 'linear-gradient(135deg, #1A56DB 0%, #3B82F6 100%)',
      primary: '#1A56DB',
      accent: '#3B82F6',
      bgLight: 'rgba(26,86,219,0.10)',
      bgMedium: 'rgba(26,86,219,0.14)',
      borderColor: 'rgba(26,86,219,0.28)',
    },
    icon: '🔬',
  },
};

interface EntityDef {
  id: string;
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  location: string;
  website: string;
  devices: number;
  activeExperiments: number;
  researchers: number;
  colors: EntityColors;
  icon: string;
}

// ── Apply entity CSS tokens to document root ───────────────────────────────────
function applyEntityTokens(entity: EntityDef | null) {
  const root = document.documentElement;
  if (entity) {
    root.style.setProperty('--entity-accent', entity.colors.primary);
    root.style.setProperty('--entity-accent-light', entity.colors.bgLight);
    root.style.setProperty('--entity-accent-muted', entity.colors.bgLight);
    root.style.setProperty('--entity-gradient', entity.colors.gradient);
    document.body.setAttribute('data-entity', entity.id);
    localStorage.setItem(STORAGE_KEYS.ACTIVE_ENTITY, JSON.stringify({ entity: entity.id, accent: entity.colors.primary }));
  } else {
    root.style.removeProperty('--entity-accent');
    root.style.removeProperty('--entity-accent-light');
    root.style.removeProperty('--entity-accent-muted');
    root.style.removeProperty('--entity-gradient');
    document.body.removeAttribute('data-entity');
  }
}

// ── Create Experiment Modal ────────────────────────────────────────────────────
interface CreateModalProps {
  onClose: () => void;
  onCreate: (name: string, fieldDaq?: FieldDaqSetup) => Promise<void>;
  entity?: EntityDef;
}

const CreateExperimentModal: React.FC<CreateModalProps> = ({ onClose, onCreate, entity }) => {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [daqDeviceId, setDaqDeviceId] = useState('');
  const [daqTopic, setDaqTopic] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setLoading(true);
    const fieldDaq = daqDeviceId.trim() && daqTopic.trim() ? {
      device: {
        device_id: daqDeviceId.trim(),
        name: daqDeviceId.trim(),
        protocol: 'mqtt_web_socket',
        connector: { type: 'mqtt_web_socket' as const, topic: daqTopic.trim(), qos: 1 },
      },
    } : undefined;
    try { await onCreate(trimmed, fieldDaq); onClose(); } finally { setLoading(false); }
  };

  const accentColor = entity ? entity.colors.primary : '#CE422B';
  const accentGradient = entity ? entity.colors.gradient : 'linear-gradient(135deg, #CE422B 0%, #F97316 100%)';

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box" style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', background: accentGradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FlaskConical size={14} color="#fff" />
            </div>
            <h2 className="modal-title">New Experiment{entity ? ` — ${entity.name}` : ''}</h2>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <p style={{ fontSize: '0.875rem', color: theme.colors.text.secondary, marginBottom: '1.25rem' }}>
          {entity
            ? `Create a new experiment in the ${entity.fullName} node.`
            : 'Create a new IoT experiment to start collecting data.'}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="modal-field">
            <label className="modal-label">Experiment Name</label>
            <input
              ref={inputRef}
              type="text"
              className="modal-input"
              placeholder="e.g. Temperature Sensor Array #3"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="modal-field">
            <label className="modal-label">Field DAQ Device ID (optional)</label>
            <input className="modal-input" type="text" placeholder="e.g. daq-field-01" value={daqDeviceId} onChange={e => setDaqDeviceId(e.target.value)} disabled={loading} />
          </div>
          <div className="modal-field">
            <label className="modal-label">DAQ MQTT/WebSocket Topic (optional)</label>
            <input className="modal-input" type="text" placeholder="e.g. daq/daq-field-01/telemetry" value={daqTopic} onChange={e => setDaqTopic(e.target.value)} disabled={loading} />
          </div>
          <div className="modal-actions">
            <button type="button" className="modal-btn-cancel" onClick={onClose} disabled={loading}>Cancel</button>
            <button
              type="submit"
              disabled={loading || !name.trim()}
              style={{
                padding: '0.5625rem 1.25rem', border: 'none', borderRadius: '0.5rem',
                fontSize: '0.875rem', fontWeight: 600, color: 'white', cursor: loading || !name.trim() ? 'not-allowed' : 'pointer',
                background: loading || !name.trim() ? '#94a3b8' : accentGradient,
                boxShadow: loading || !name.trim() ? 'none' : `0 2px 8px ${accentColor}50`,
                transition: 'all 0.2s',
              }}
            >
              {loading ? 'Creating…' : 'Create Experiment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ── Entity Switcher Dropdown ───────────────────────────────────────────────────
interface EntitySwitcherProps {
  activeEntityId: string;
  onSelect: (id: string) => void;
  collapsed: boolean;
  experimentsCount: number;
}

const EntitySwitcher: React.FC<EntitySwitcherProps> = ({ activeEntityId, onSelect, collapsed, experimentsCount }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const entity = ENTITIES[activeEntityId] || ENTITIES['fi'];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="entity-switcher-wrap">
      <button
        className={`entity-switcher-btn ${open ? 'open' : ''}`}
        onClick={() => setOpen(o => !o)}
        title={collapsed ? entity.fullName : undefined}
      >
        <span className="entity-dot" style={{ background: entity.colors.primary }} />
        {!collapsed && (
          <>
            <div className="entity-switcher-info">
              <span className="entity-switcher-name">{entity.name}</span>
              <span className="entity-switcher-sub">{entity.location} · {experimentsCount} exp</span>
            </div>
            <ChevronDown size={13} className={`entity-chevron ${open ? 'rotated' : ''}`} />
          </>
        )}
      </button>

      {open && !collapsed && (
        <div className="entity-dropdown">
          {Object.values(ENTITIES).map(ent => (
            <button
              key={ent.id}
              className={`entity-dropdown-item ${ent.id === activeEntityId ? 'active' : ''}`}
              onClick={() => { onSelect(ent.id); setOpen(false); }}
            >
              <span className="entity-dot" style={{ background: ent.colors.primary }} />
              <div className="entity-dropdown-info">
                <span className="entity-dropdown-name">{ent.fullName}</span>
                <span className="entity-dropdown-sub">{ent.location}</span>
              </div>
              {ent.id === activeEntityId && (
                <span className="entity-active-check">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Live Status Section ────────────────────────────────────────────────────────
const LiveStatusSection: React.FC<{ collapsed: boolean; experiments: ExperimentItem[] }> = ({ collapsed, experiments }) => {
  const liveSessions = experiments.filter(experiment => ['ONLINE', 'ACTIVE', 'RUNNING', 'DONE'].includes(experiment.status.toUpperCase())).length;
  const devicesOnline = liveSessions;

  if (collapsed) {
    return (
      <div className="sidebar-section live-status-collapsed">
        <span className="live-dot-icon" title={`${liveSessions} live sessions`} />
      </div>
    );
  }

  return (
    <div className="sidebar-section">
      <span className="nav-section-label">Live Status</span>
      <div className="live-status-items">
        <div className="live-status-item">
          <span className="live-pulse-dot" />
          <span className="live-status-text">{liveSessions} Live sessions</span>
        </div>
        <div className="live-status-item">
          <Zap size={12} className="live-status-icon" />
          <span className="live-status-text">{devicesOnline} devices online</span>
        </div>
        <div className="live-status-item">
          <Shield size={12} className="live-status-icon" />
          <span className="live-status-text">TLS 1.3 secured</span>
        </div>
      </div>
    </div>
  );
};

// ── Sidebar Nav Item ───────────────────────────────────────────────────────────
interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  isActive?: boolean;
  onClick: () => void;
  badge?: number;
  collapsed?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, isActive = false, onClick, badge, collapsed }) => (
  <div
    className={`nav-item ${isActive ? 'active' : ''}`}
    onClick={onClick}
    title={collapsed ? text : undefined}
    aria-current={isActive ? 'page' : undefined}
  >
    <div className="nav-icon">{icon}</div>
    {!collapsed && <span className="nav-text">{text}</span>}
    {!collapsed && badge !== undefined && badge > 0 && (
      <span className="nav-badge">{badge}</span>
    )}
  </div>
);

// ── Entities Section ───────────────────────────────────────────────────────────
interface EntitiesSectionProps {
  experiments: ExperimentItem[];
  onCreateExperiment: (name: string, fieldDaq?: FieldDaqSetup) => Promise<void>;
  onToggleStatus: (id: number) => Promise<void>;
  onDeleteExperiment: (id: number) => Promise<void>;
  onRefresh: () => Promise<void>;
  onExperimentClick?: (experiment: ExperimentItem) => void;
}

const EntitiesSection: React.FC<EntitiesSectionProps> = ({
  experiments, onCreateExperiment, onToggleStatus, onDeleteExperiment, onRefresh, onExperimentClick
}) => {
  const { theme } = useTheme();
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  const [selectedExperiment, setSelectedExperiment] = useState<ExperimentItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const entity = selectedEntity ? ENTITIES[selectedEntity] : null;
  const filteredExps = experiments.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    applyEntityTokens(entity);
  }, [selectedEntity]);

  if (selectedExperiment && entity) {
    return (
      <>
        <ExperimentDetailView
          experiment={selectedExperiment}
          onBack={() => setSelectedExperiment(null)}
          onDelete={async () => { await onDeleteExperiment(selectedExperiment.id); setSelectedExperiment(null); }}
          onToggleStatus={() => onToggleStatus(selectedExperiment.id)}
          onRefresh={onRefresh}
          entityColors={entity.colors}
        />
        {showCreateModal && (
          <CreateExperimentModal onClose={() => setShowCreateModal(false)} onCreate={onCreateExperiment} entity={entity} />
        )}
      </>
    );
  }

  if (entity) {
    return (
      <div className="experiments-section">
        <div style={{
          background: entity.colors.gradient,
          borderRadius: '1.25rem',
          padding: '2rem',
          marginBottom: '1.75rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '-2rem', right: '-2rem', width: '12rem', height: '12rem', background: 'rgba(255,255,255,0.06)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '-3rem', right: '4rem', width: '8rem', height: '8rem', background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />

          <button
            onClick={() => { setSelectedEntity(null); setSearchTerm(''); }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
              padding: '0.375rem 0.875rem', borderRadius: '0.5rem',
              background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
              color: '#fff', fontSize: '0.8125rem', fontWeight: 500, cursor: 'pointer',
              marginBottom: '1.25rem',
            }}
          >
            <ArrowLeft size={14} /> All Entities
          </button>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{entity.icon}</span>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.025em' }}>
                  {entity.fullName}
                </h1>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9375rem', margin: '0 0 1rem', lineHeight: 1.6, maxWidth: '40rem' }}>
                {entity.description}
              </p>
              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                {[
                  { icon: <MapPin size={13} />, label: entity.location },
                  { icon: <Cpu size={13} />, label: `${entity.devices} Devices` },
                  { icon: <Users size={13} />, label: `${entity.researchers} Researchers` },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(255,255,255,0.85)', fontSize: '0.8125rem' }}>
                    {item.icon}{item.label}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.875rem', flexShrink: 0 }}>
              {[
                { value: experiments.length, label: 'Experiments' },
                { value: entity.activeExperiments, label: 'Active' },
              ].map((stat, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.12)', borderRadius: '0.875rem',
                  padding: '0.875rem 1.25rem', textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
                  minWidth: '5rem',
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.75)', marginTop: '0.25rem', fontWeight: 500 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="section-header">
          <div>
            <h1 className="section-title">Experiments</h1>
            <p className="section-subtitle">{filteredExps.length} experiment{filteredExps.length !== 1 ? 's' : ''} in {entity.name}</p>
          </div>
          <div className="section-actions">
            <div className="search-container">
              <Search size={15} className="search-icon" />
              <input type="text" placeholder="Search experiments…" className="search-input" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.375rem',
                padding: '0.5rem 1rem', borderRadius: '0.5rem',
                fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
                border: 'none', color: '#fff',
                background: entity.colors.gradient,
                boxShadow: `${entity.colors.primary}40 0px 2px 8px`,
                transition: '0.2s',
              }}
            >
              <Plus size={15} /> New Experiment
            </button>
          </div>
        </div>

        <div className="experiment-grid">
          {filteredExps.length > 0 ? filteredExps.map(exp => (
            <DeviceCard
              key={exp.id}
              experiment={exp}
              onToggleStatus={() => onToggleStatus(exp.id)}
              onDelete={() => onDeleteExperiment(exp.id)}
              onRefresh={onRefresh}
              onClick={() => onExperimentClick ? onExperimentClick(exp) : setSelectedExperiment(exp)}
              entityColors={entity.colors}
            />
          )) : (
            <div className="empty-state">
              <FlaskConical size={44} />
              <h3>{searchTerm ? 'No matches' : 'No Experiments Yet'}</h3>
              <p>{searchTerm ? `No experiments match "${searchTerm}"` : `Start your first experiment in the ${entity.name} node.`}</p>
              {!searchTerm && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.375rem',
                    padding: '0.5rem 1rem', borderRadius: '0.5rem',
                    fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
                    border: 'none', color: '#fff',
                    background: entity.colors.gradient,
                    boxShadow: `${entity.colors.primary}40 0px 2px 8px`,
                    transition: '0.2s',
                  }}
                >
                  <Plus size={15} /> Create First Experiment
                </button>
              )}
            </div>
          )}
        </div>

        {showCreateModal && (
          <CreateExperimentModal onClose={() => setShowCreateModal(false)} onCreate={onCreateExperiment} entity={entity} />
        )}
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeIn 0.2s ease' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 0.375rem', letterSpacing: '-0.025em' }}>
          Research Entities
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', margin: 0 }}>
          Select a node to browse and manage its experiments
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {Object.values(ENTITIES).map(ent => (
          <div
            key={ent.id}
            onClick={() => setSelectedEntity(ent.id)}
            style={{
              borderRadius: '1.25rem', overflow: 'hidden',
              border: `1px solid ${ent.colors.borderColor}`,
              boxShadow: 'var(--shadow-md)',
              cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.25s ease',
              background: 'var(--color-card)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 40px ${ent.colors.primary}25`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-md)';
            }}
          >
            <div style={{ background: ent.colors.gradient, padding: '1.75rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-1.5rem', right: '-1.5rem', width: '8rem', height: '8rem', background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />
              <div style={{ fontSize: '2.25rem', marginBottom: '0.625rem' }}>{ent.icon}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.025em' }}>{ent.fullName}</h2>
                <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: '999px', padding: '0.15rem 0.625rem', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.06em' }}>
                  {ent.name}
                </span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', margin: 0 }}>{ent.tagline}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: `1px solid ${ent.colors.borderColor}` }}>
              {[
                { value: experiments.length, label: 'Experiments' },
                { value: ent.devices, label: 'Devices' },
                { value: ent.researchers, label: 'Researchers' },
              ].map((stat, i) => (
                <div key={i} style={{
                  padding: '1.125rem 0.75rem', textAlign: 'center',
                  borderRight: i < 2 ? `1px solid ${ent.colors.borderColor}` : 'none',
                }}>
                  <div style={{ fontSize: '1.375rem', fontWeight: 800, color: ent.colors.primary, letterSpacing: '-0.02em' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '0.2rem', fontWeight: 500 }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={{ padding: '1.375rem' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.65, margin: '0 0 1.25rem' }}>{ent.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8125rem', color: 'var(--color-text-tertiary)' }}>
                  <MapPin size={13} /> {ent.location}
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.375rem',
                  padding: '0.5rem 1.125rem', borderRadius: '0.5rem',
                  background: ent.colors.gradient, color: '#fff',
                  fontSize: '0.875rem', fontWeight: 600,
                  boxShadow: `0 2px 10px ${ent.colors.primary}35`,
                }}>
                  View Experiments <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
        {[
          { icon: <Globe size={18} />, label: 'Total Entities', value: '2' },
          { icon: <Cpu size={18} />, label: 'Total Devices', value: String(Object.values(ENTITIES).reduce((a, e) => a + e.devices, 0)) },
          { icon: <FlaskConical size={18} />, label: 'All Experiments', value: String(experiments.length) },
          { icon: <Activity size={18} />, label: 'Live Sessions', value: String(Object.values(ENTITIES).reduce((a, e) => a + e.activeExperiments, 0)) },
          { icon: <Lock size={18} />, label: 'Security', value: 'TLS 1.3' },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--color-card)', borderRadius: '0.875rem',
            border: '1px solid var(--color-border-primary)', padding: '1rem 1.125rem',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.5rem', background: 'var(--entity-accent-muted, var(--macos-accent-blue-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--entity-accent, var(--macos-accent-blue))', flexShrink: 0 }}>
              {item.icon}
            </div>
            <div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)', fontWeight: 500, marginBottom: '0.2rem' }}>{item.label}</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Main Dashboard Panel ───────────────────────────────────────────────────────
interface DashboardPanelProps {
  experiments: ExperimentItem[];
  onCreateExperiment: (name: string, fieldDaq?: FieldDaqSetup) => Promise<void>;
  onToggleStatus: (id: number) => Promise<void>;
  onDeleteExperiment: (id: number) => Promise<void>;
  onRefresh: () => Promise<void>;
}

const DashboardPanel: React.FC<DashboardPanelProps> = ({
  experiments, onCreateExperiment, onToggleStatus, onDeleteExperiment, onRefresh
}) => {
  const { mode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEYS.SIDEBAR_STATE) !== 'true'; } catch { return true; }
  });
  const [activeSection, setActiveSection] = useState('entities');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExperiment, setSelectedExperiment] = useState<ExperimentItem | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUserPanel, setShowUserPanel] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeEntityId, setActiveEntityId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_ENTITY);
      if (saved) return JSON.parse(saved).entity || 'fi';
    } catch {}
    return 'fi';
  });

  // Run migration once on mount
  useEffect(() => { migrateLocalStorage(); }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Restore entity accent from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_ENTITY);
      if (saved) {
        const { entity } = JSON.parse(saved);
        const entityDef = ENTITIES[entity];
        if (entityDef) applyEntityTokens(entityDef);
      }
    } catch {}
  }, []);

  // Persist sidebar state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SIDEBAR_STATE, String(!sidebarOpen));
  }, [sidebarOpen]);

  const savedProfile = (() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_PROFILE) || '{}'); } catch { return {}; }
  })();
  const sessionUser = (() => {
    try { return localStorage.getItem(STORAGE_KEYS.SESSION) || 'Admin'; } catch { return 'Admin'; }
  })();
  const displayName = savedProfile.fullName || sessionUser;
  const displayRole = savedProfile.role || 'Researcher';
  const avatarUrl = savedProfile.avatarUrl || '';
  const profileInitials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || displayName.charAt(0).toUpperCase();

  const entityBadgeLabel = ENTITIES[activeEntityId]?.name || 'FI';

  const handleEntitySwitch = (id: string) => {
    setActiveEntityId(id);
    applyEntityTokens(ENTITIES[id]);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setSelectedExperiment(null);
    document.title = `${section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')} — Blazecore`;
    if (isMobile) setSidebarOpen(false);
  };

  const handleExperimentClick = (experiment: ExperimentItem) => {
    setSelectedExperiment(experiment);
    if (isMobile) setSidebarOpen(false);
  };

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const filteredExperiments = experiments.filter(exp =>
    exp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navItems = [
    { id: 'entities',     icon: <Building2 size={20} />,    label: 'Entities',    badge: Object.keys(ENTITIES).length },
    { id: 'experiments',  icon: <LayoutDashboard size={20} />, label: 'Experiments' },
    { id: 'api-testing',  icon: <Terminal size={20} />,     label: 'API Testing' },
    { id: 'resources',    icon: <Box size={20} />,          label: 'Resources' },
    { id: 'reports',      icon: <BarChart2 size={20} />,    label: 'Reports' },
  ];

  const systemItems = [
    { id: 'settings', icon: <Settings size={20} />,    label: 'Settings' },
    { id: 'help',     icon: <HelpCircle size={20} />,  label: 'Help' },
  ];

  const isIconOnly = sidebarOpen === false && !isMobile;
  const sidebarClass = [
    'sidebar',
    'dashboard-desktop-sidebar',
    !sidebarOpen && isMobile ? 'collapsed' : '',
    !sidebarOpen && !isMobile ? 'icon-only' : '',
  ].filter(Boolean).join(' ');

  const renderContent = () => {
    switch (activeSection) {
      case 'entities':
        return (
          <EntitiesSection
            experiments={experiments}
            onCreateExperiment={onCreateExperiment}
            onToggleStatus={onToggleStatus}
            onDeleteExperiment={onDeleteExperiment}
            onRefresh={onRefresh}
            onExperimentClick={handleExperimentClick}
          />
        );
      case 'experiments':
        return (
          <div className="experiments-section">
            {selectedExperiment ? (
              <ExperimentDetailView
                experiment={selectedExperiment}
                onBack={() => setSelectedExperiment(null)}
                onDelete={async () => { await onDeleteExperiment(selectedExperiment.id); setSelectedExperiment(null); }}
                onToggleStatus={() => onToggleStatus(selectedExperiment.id)}
                onRefresh={onRefresh}
              />
            ) : (
              <>
                <div className="section-header">
                  <div>
                    <h1 className="section-title">All Experiments</h1>
                    <p className="section-subtitle">{experiments.length} experiment{experiments.length !== 1 ? 's' : ''} across all entities</p>
                  </div>
                  <div className="section-actions">
                    <div className="search-container">
                      <Search size={15} className="search-icon" />
                      <input type="text" placeholder="Search…" className="search-input" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    </div>
                    <button className="action-button primary" onClick={() => setShowCreateModal(true)}>
                      <Plus size={15} /><span>New Experiment</span>
                    </button>
                  </div>
                </div>
                <div className="experiment-grid">
                  {filteredExperiments.length > 0 ? filteredExperiments.map(exp => (
                    <DeviceCard
                      key={exp.id}
                      experiment={exp}
                      onToggleStatus={() => onToggleStatus(exp.id)}
                      onDelete={() => onDeleteExperiment(exp.id)}
                      onRefresh={onRefresh}
                      onClick={() => handleExperimentClick(exp)}
                    />
                  )) : (
                    <div className="empty-state">
                      <Database size={44} />
                      <h3>{searchTerm ? 'No matches' : 'No Experiments'}</h3>
                      <p>{searchTerm ? `No experiments match "${searchTerm}"` : 'Create your first IoT experiment to get started.'}</p>
                      {!searchTerm && (
                        <button className="action-button primary" onClick={() => setShowCreateModal(true)}>
                          <Plus size={15} /><span>Create Experiment</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        );
      case 'api-testing':
        return <ApiTestingSection />;
      default:
        const labels: Record<string, { title: string; subtitle: string }> = {
          resources: { title: 'Resources', subtitle: 'Manage assets and storage across your IoT network.' },
          reports:   { title: 'Reports & Analytics', subtitle: 'View performance reports and generate insights.' },
          settings:  { title: 'System Settings', subtitle: 'Configure your Blazecore platform.' },
          help:      { title: 'Help & Support', subtitle: 'Documentation, guides, and community resources.' },
        };
        const info = labels[activeSection] || { title: activeSection, subtitle: '' };
        return (
          <div className="content-card">
            <h1 className="card-title" style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>{info.title}</h1>
            <p className="card-text">{info.subtitle}</p>
            <div className="content-placeholder">
              <FlaskConical size={32} style={{ color: 'var(--color-text-tertiary)', opacity: 0.5, marginBottom: '0.75rem' }} />
              <p className="placeholder-text">Coming soon — this section is under active development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {/* Mobile overlay — shown when sidebar is OPEN on mobile */}
      {sidebarOpen && isMobile && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 45, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile hamburger button — floating, only on mobile when sidebar is closed */}
      {!sidebarOpen && isMobile && (
        <button
          onClick={toggleSidebar}
          style={{
            position: 'fixed', top: '1rem', left: '1rem', zIndex: 60,
            width: '40px', height: '40px', borderRadius: '10px',
            background: 'var(--color-card)', border: '1px solid var(--color-border-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: 'var(--shadow-md)',
            color: 'var(--color-text-secondary)',
          }}
          aria-label="Open navigation"
        >
          <Menu size={18} />
        </button>
      )}

      <div className="dashboard-container">
        <aside className={sidebarClass}>
          {/* Brand header */}
          <div className="sidebar-brand-header">
            <div
              className="sidebar-brand-logo"
              onClick={() => window.location.href = '/'}
              title="Blazecore"
            >
              <Zap size={14} color="#fff" />
            </div>
            {!isIconOnly && (
              <div className="sidebar-brand-info">
                <span className="sidebar-brand-name">Blazecore</span>
                <span className="sidebar-brand-tagline">IoT Platform</span>
              </div>
            )}
            <button
              className="sidebar-collapse-btn"
              onClick={toggleSidebar}
              title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {isIconOnly ? <ArrowRight size={14} /> : <ChevronLeft size={14} />}
            </button>
          </div>

          {/* Workspace / Entity Switcher */}
          <div className="sidebar-section">
            {!isIconOnly && <span className="nav-section-label">Workspace</span>}
            <EntitySwitcher
              activeEntityId={activeEntityId}
              onSelect={handleEntitySwitch}
              collapsed={isIconOnly}
              experimentsCount={experiments.length}
            />
          </div>

          {/* Navigation */}
          <div className="sidebar-section sidebar-nav-section">
            {!isIconOnly && <span className="nav-section-label">Navigation</span>}
            <nav className="nav-container">
              {navItems.map(item => (
                <SidebarItem
                  key={item.id}
                  icon={item.icon}
                  text={item.label}
                  isActive={activeSection === item.id}
                  onClick={() => handleSectionChange(item.id)}
                  badge={item.badge}
                  collapsed={isIconOnly}
                />
              ))}
            </nav>
          </div>

          {/* System */}
          <div className="sidebar-section">
            {!isIconOnly && <span className="nav-section-label">System</span>}
            <nav className="nav-container nav-container-system">
              {systemItems.map(item => (
                <SidebarItem
                  key={item.id}
                  icon={item.icon}
                  text={item.label}
                  isActive={activeSection === item.id}
                  onClick={() => handleSectionChange(item.id)}
                  collapsed={isIconOnly}
                />
              ))}
            </nav>
          </div>

          {/* Live Status */}
          <LiveStatusSection collapsed={isIconOnly} experiments={experiments} />

          {/* Profile — pinned bottom */}
          <div
            id="sidebar-profile"
            className="sidebar-profile"
            onClick={() => setShowUserPanel(true)}
            role="button"
            tabIndex={0}
            aria-label="Open account settings"
            title={isIconOnly ? `${displayName} · ${displayRole}` : undefined}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setShowUserPanel(true); }}
          >
            <div className="sidebar-profile-avatar">
              {avatarUrl
                ? <img src={avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                : profileInitials
              }
            </div>
            {!isIconOnly && (
              <>
                <div className="sidebar-profile-info">
                  <span className="sidebar-profile-name">{displayName}</span>
                  <span className="sidebar-profile-role">{displayRole}</span>
                </div>
                <div className="sidebar-profile-badge">{entityBadgeLabel}</div>
              </>
            )}
          </div>
        </aside>

        <main className={`main-content ${!sidebarOpen && isMobile ? 'sidebar-collapsed' : ''} ${!sidebarOpen && !isMobile ? 'sidebar-icon-only' : ''}`}>
          <div className="main-content-inner">
            {renderContent()}
          </div>
        </main>
      </div>

      {showCreateModal && (
        <CreateExperimentModal
          onClose={() => setShowCreateModal(false)}
          onCreate={onCreateExperiment}
        />
      )}

      <UserManagementPanel
        isOpen={showUserPanel}
        onClose={() => setShowUserPanel(false)}
        currentEntity={entityBadgeLabel}
      />

      <style>{`
        @media (max-width: 767px) {
          .dashboard-desktop-sidebar { position: fixed !important; z-index: 50 !important; }
        }
        .sidebar-profile:focus-visible {
          outline: 2px solid var(--entity-accent, #0071E3);
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
};

export default DashboardPanel;
