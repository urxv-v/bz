import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, Play, Pause, Trash2, RefreshCw, Settings,
  Activity, Thermometer, Droplets, Wind, Zap, Database,
  Clock, CheckCircle, TrendingUp, Wifi,
  Battery, Cpu, HardDrive, Network,
  Download, ChevronRight
} from 'lucide-react';
import { ExperimentItem } from '../interfaces/experiments';
import { EntityColors } from './DeviceCard';
import { metric, useTelemetry } from '../telemetry/TelemetryContext';

interface ExperimentDetailViewProps {
  experiment: ExperimentItem;
  onBack: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
  onRefresh: () => void;
  entityColors?: EntityColors;
}

// Default entity accent — reads from CSS var at render time via inline `var()`
const DEFAULT_COLORS: EntityColors = {
  gradient: 'linear-gradient(135deg, #0071E3 0%, #2997FF 100%)',
  primary: '#0071E3',
  accent: '#5AC8FA',
  bgLight: 'rgba(0,113,227,0.10)',
  bgMedium: 'rgba(0,113,227,0.15)',
  borderColor: 'rgba(0,113,227,0.25)',
};

function MiniSparkline({ color, points }: { color: string; points: number[] }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const w = 120;
  const h = 40;
  const step = w / (points.length - 1);
  const toY = (v: number) => h - ((v - min) / range) * (h - 6) - 3;

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${toY(p)}`).join(' ');
  const areaD = `${pathD} L ${(points.length - 1) * step} ${h} L 0 ${h} Z`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#grad-${color.replace('#', '')})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={(points.length - 1) * step} cy={toY(points[points.length - 1])} r="3" fill={color} />
    </svg>
  );
}

function RipplePulse({ color }: { color: string }) {
  return (
    <div style={{ position: 'relative', width: 10, height: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: color, opacity: 0.3, animation: 'ripple 2s ease-out infinite' }} />
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
    </div>
  );
}

const ExperimentDetailView: React.FC<ExperimentDetailViewProps> = ({
  experiment, onBack, onDelete, onToggleStatus, onRefresh, entityColors
}) => {
  const colors = entityColors || DEFAULT_COLORS;
  const entityAccent = colors.primary;
  const entityAccentLight = colors.bgLight;
  const entityGradient = colors.gradient;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const telemetry = useTelemetry(experiment.id);
  const signalStrength = metric(telemetry, 'signal_strength', 0);
  const batteryLevel = metric(telemetry, 'battery_level', 0);
  const dataPoints = metric(telemetry, 'data_points', 0);
  const cpuUsage = metric(telemetry, 'cpu_usage', 0);
  const memoryUsage = metric(telemetry, 'memory_usage', 0);
  const networkTraffic = metric(telemetry, 'network_traffic', 0);
  const lastUpdate = telemetry.lastEvent ? new Date(telemetry.lastEvent.timestamp) : null;
  const secondsSinceUpdate = lastUpdate ? Math.max(0, Math.floor((Date.now() - lastUpdate.getTime()) / 1000)) : null;
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics' | 'settings'>('overview');

  const signalHistory = telemetry.history.signal_strength || [];
  const cpuHistory = telemetry.history.cpu_usage || [];
  const dataHistory = telemetry.history.data_points || [];

  const activityLog = [
    { time: 'Just now', msg: `Data stream active — ${dataPoints} points collected`, dot: '#34C759' },
    { time: '3 min ago', msg: 'Signal recalibrated — strength 85%', dot: entityAccent },
    { time: '10 min ago', msg: 'Memory usage optimised', dot: entityAccent },
    { time: '28 min ago', msg: 'Battery level checked — 92%', dot: '#34C759' },
    { time: '1 hr ago', msg: 'Firmware version verified', dot: '#FF9F0A' },
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getExperimentIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('temperature') || n.includes('temp')) return <Thermometer size={32} />;
    if (n.includes('humidity') || n.includes('hvac')) return <Droplets size={32} />;
    if (n.includes('motion') || n.includes('wind')) return <Wind size={32} />;
    if (n.includes('light')) return <Zap size={32} />;
    return <Activity size={32} />;
  };

  const isActive = experiment.status.toUpperCase() === 'DONE';
  const statusColor = isActive ? '#34C759' : '#FF9F0A';

  // ── Info rows: CSS Grid 140px 1fr alignment ────────────────────────────────
  const infoRows = [
    { label: 'Status', value: <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '2px 10px', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 600, background: isActive ? 'rgba(52,199,89,0.12)' : 'rgba(255,159,10,0.12)', color: isActive ? '#1D8348' : '#B7770D', border: `1px solid ${isActive ? 'rgba(52,199,89,0.25)' : 'rgba(255,159,10,0.25)'}` }}><RipplePulse color={statusColor} />{experiment.status.toUpperCase()}</span> },
    { label: 'Experiment ID', value: `#${experiment.id}` },
    { label: 'Created', value: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
    { label: 'Last updated', value: lastUpdate ? lastUpdate.toLocaleTimeString() : 'Waiting' },
    { label: 'Protocol', value: 'MQTT over WebSockets' },
    { label: 'Database', value: 'PostgreSQL' },
  ];

  const tabStyle = (t: string): React.CSSProperties => ({
    padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.875rem',
    fontWeight: 500, cursor: 'pointer', border: 'none',
    background: activeTab === t ? entityAccentLight : 'transparent',
    color: activeTab === t ? entityAccent : '#8C959F',
    transition: 'all 0.2s',
  });

  return (
    <div style={{ animation: 'fadeIn 0.3s ease', minHeight: '100%' }}>
      {/* ── Top bar ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.875rem', borderRadius: '0.5rem', border: '1px solid var(--color-border-primary)', background: 'var(--color-card)', color: 'var(--color-text-secondary)', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-text-primary)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-secondary)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-primary)'; }}>
          <ArrowLeft size={15} /> Back to Experiments
        </button>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { label: isActive ? 'Pause' : 'Start', icon: isActive ? <Pause size={14} /> : <Play size={14} />, onClick: onToggleStatus, bg: isActive ? 'rgba(255,159,10,0.1)' : 'rgba(52,199,89,0.1)', color: isActive ? '#B7770D' : '#1D8348' },
            { label: 'Refresh', icon: <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />, onClick: handleRefresh, bg: entityAccentLight, color: entityAccent },
            { label: 'Settings', icon: <Settings size={14} />, onClick: () => { }, bg: 'var(--color-surface)', color: 'var(--color-text-secondary)' },
            { label: 'Delete', icon: <Trash2 size={14} />, onClick: onDelete, bg: 'rgba(239,68,68,0.1)', color: '#DC2626' },
          ].map((btn, i) => (
            <button key={i} onClick={btn.onClick} disabled={btn.label === 'Refresh' && isRefreshing}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 0.875rem', borderRadius: '0.5rem', border: 'none', fontSize: '0.8125rem', fontWeight: 500, cursor: 'pointer', background: btn.bg, color: btn.color, transition: 'all 0.2s', opacity: btn.label === 'Refresh' && isRefreshing ? 0.5 : 1 }}>
              {btn.icon} {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── 3-Column Layout ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr 300px', gap: '1.25rem', alignItems: 'start' }}>

        {/* ═══ Left Panel ═══ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Experiment identity card */}
          <div style={{ background: 'var(--color-card)', borderRadius: '1rem', border: '1px solid var(--color-border-primary)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
            <div style={{ height: 6, background: entityGradient }} />
            <div style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1rem' }}>
                <div style={{ width: 52, height: 52, borderRadius: '0.875rem', background: entityGradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                  {getExperimentIcon(experiment.name)}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: '-0.01em' }}>
                    {experiment.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: 2 }}>IoT Experiment</div>
                </div>
              </div>

              {/* Info rows: CSS Grid 140px 1fr for consistent alignment */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {infoRows.map((row, i) => (
                  <div key={i} style={{
                    display: 'grid',
                    gridTemplateColumns: '140px 1fr',
                    alignItems: 'center',
                    padding: '0.5rem 0',
                    borderBottom: i < infoRows.length - 1 ? '1px solid var(--color-border-primary)' : 'none',
                  }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>{row.label}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-primary)', fontWeight: 600 }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Device status */}
          <div style={{ background: 'var(--color-card)', borderRadius: '1rem', border: '1px solid var(--color-border-primary)', boxShadow: 'var(--shadow-sm)', padding: '1.125rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.875rem', letterSpacing: '-0.01em' }}>Device Status</div>
            {[
              { label: 'Battery level', value: batteryLevel, unit: '%', barColor: '#34C759' },
              { label: 'Signal strength', value: signalStrength, unit: '%', barColor: '#34C759' },
              { label: 'Latency', value: `${metric(telemetry, 'latency_ms', 0)} ms`, unit: '', barColor: null },
              { label: 'Firmware', value: 'v2.1.4', unit: '', barColor: null },
            ].map((s, i) => (
              <div key={i} style={{ marginBottom: '0.625rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>{s.label}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: s.barColor || 'var(--color-text-primary)' }}>
                    {typeof s.value === 'number' ? `${s.value}${s.unit}` : s.value}
                  </span>
                </div>
                {s.barColor && typeof s.value === 'number' && (
                  <div style={{ height: 4, borderRadius: 2, background: 'var(--color-border-primary)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 2, background: s.barColor, width: `${s.value}%`, transition: 'width 0.5s ease' }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Activity log */}
          <div style={{ background: 'var(--color-card)', borderRadius: '1rem', border: '1px solid var(--color-border-primary)', boxShadow: 'var(--shadow-sm)', padding: '1.125rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>Activity Log</span>
              <ChevronRight size={14} style={{ color: 'var(--color-text-tertiary)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {activityLog.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: item.dot, flexShrink: 0, marginTop: 4 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>{item.msg}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-tertiary)', marginTop: 2 }}>{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ Middle Panel ═══ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Tabs */}
          <div style={{ background: 'var(--color-card)', borderRadius: '1rem', border: '1px solid var(--color-border-primary)', boxShadow: 'var(--shadow-sm)', padding: '0.375rem', display: 'flex', gap: '0.25rem' }}>
            {(['overview', 'metrics', 'settings'] as const).map(t => (
              <button key={t} style={tabStyle(t)} onClick={() => setActiveTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Data Rate Card */}
          <div style={{ background: 'var(--color-card)', borderRadius: '1rem', border: '1px solid var(--color-border-primary)', boxShadow: 'var(--shadow-sm)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-tertiary)', fontWeight: 500, marginBottom: 4 }}>Data Rate</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.04em', lineHeight: 1 }}>
                  {networkTraffic} <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>MB/s</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>{secondsSinceUpdate === null ? 'Waiting for data' : `Updated ${secondsSinceUpdate}s ago`}</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 9999, background: 'rgba(52,199,89,0.1)', border: '1px solid rgba(52,199,89,0.2)', fontSize: '0.75rem', fontWeight: 600, color: '#1D8348' }}>
                  <TrendingUp size={11} /> Stable
                </div>
              </div>
            </div>
            {dataHistory.length > 1 && <MiniSparkline color={entityAccent} points={dataHistory} />}
          </div>

          {/* Signal Strength Card — entity accent bars */}
          <div style={{ background: 'var(--color-card)', borderRadius: '1rem', border: '1px solid var(--color-border-primary)', boxShadow: 'var(--shadow-sm)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-tertiary)', fontWeight: 500, marginBottom: 4 }}>Signal Strength</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.04em', lineHeight: 1 }}>
                  {signalStrength}<span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>%</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Wifi size={18} style={{ color: entityAccent, opacity: 0.5 }} />
                <Wifi size={20} style={{ color: entityAccent, opacity: 0.75 }} />
                <Wifi size={22} style={{ color: entityAccent }} />
              </div>
            </div>
            {/* Signal bar blocks — entity accent */}
            <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 44 }}>
              {signalHistory.map((v, i) => (
                <div key={i} style={{ flex: 1, borderRadius: 3, background: entityAccent, opacity: 0.2 + (v / 100) * 0.8, height: `${(v / 100) * 44}px`, transition: 'all 0.5s ease' }} />
              ))}
            </div>
          </div>

          {/* CPU & Memory — entity accent for both value text and bar */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { label: 'CPU Usage', value: cpuUsage, icon: <Cpu size={16} />, history: cpuHistory },
              { label: 'Memory', value: memoryUsage, icon: <HardDrive size={16} />, history: [55, 58, 62, 60, 62, 65, 63, 62, 64, memoryUsage] },
            ].map((item, i) => (
              <div key={i} style={{ background: 'var(--color-card)', borderRadius: '1rem', border: '1px solid var(--color-border-primary)', boxShadow: 'var(--shadow-sm)', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--color-text-secondary)' }}>
                  {item.icon}
                  <span style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{item.label}</span>
                </div>
                {/* Entity accent color for value */}
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: entityAccent, letterSpacing: '-0.04em', marginBottom: '0.625rem' }}>{item.value}%</div>
                <div style={{ height: 5, borderRadius: 3, background: 'var(--color-border-primary)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${item.value}%`, borderRadius: 3, background: entityGradient, transition: 'width 0.5s ease' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Data Points Card */}
          <div style={{ background: 'var(--color-card)', borderRadius: '1rem', border: '1px solid var(--color-border-primary)', boxShadow: 'var(--shadow-sm)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-tertiary)', fontWeight: 500, marginBottom: 4 }}>Total Data Points</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.04em', lineHeight: 1 }}>
                  {dataPoints.toLocaleString()}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Overview</div>
                <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                  {['Overview', 'Firing rate', 'Waveform'].map((l, i) => (
                    <button key={i} style={{ padding: '2px 8px', borderRadius: 6, border: '1px solid var(--color-border-primary)', fontSize: '0.7rem', fontWeight: 500, cursor: 'pointer', background: i === 0 ? entityAccent : 'transparent', color: i === 0 ? '#fff' : 'var(--color-text-secondary)' }}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {dataHistory.length > 1 && <MiniSparkline color={entityAccent} points={dataHistory} />}
          </div>

          {/* Export button — entity accent */}
          <button
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '0.875rem', borderRadius: '0.75rem', border: 'none', background: entityGradient, color: '#fff', fontSize: '0.9375rem', fontWeight: 600, cursor: 'pointer', boxShadow: `0 4px 14px ${entityAccent}4D`, transition: 'all 0.2s', letterSpacing: '-0.01em' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 20px ${entityAccent}66`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 14px ${entityAccent}4D`; }}
          >
            <Download size={16} /> Export 24h data
          </button>
        </div>

        {/* ═══ Right Panel ═══ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Connection status — always green (universal signal, not entity-branded) */}
          <div style={{ background: 'var(--color-card)', borderRadius: '1rem', border: '1px solid var(--color-border-primary)', boxShadow: 'var(--shadow-sm)', padding: '1.25rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.875rem', borderRadius: '9999px', background: 'rgba(52,199,89,0.12)', border: '1px solid rgba(52,199,89,0.3)', fontSize: '0.8125rem', fontWeight: 700, color: '#1D8348', marginBottom: '1rem' }}>
              <CheckCircle size={13} /> Connected
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { label: 'Last synced', value: secondsSinceUpdate === null ? 'Waiting' : `${secondsSinceUpdate}s ago` },
                { label: 'Battery level', value: `${batteryLevel}%` },
                { label: 'Signal strength', value: `${signalStrength}%` },
                { label: 'Latency', value: `${metric(telemetry, 'latency_ms', 0)} ms` },
              ].map((row, i, a) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: i < a.length - 1 ? '1px solid var(--color-border-primary)' : 'none' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>{row.label}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live monitoring ring — entity accent */}
          <div style={{ background: entityAccentLight, border: `1px solid rgba(${colors.bgLight.match(/[\d.]+/g)?.slice(0, 3).join(',') || '0,113,227'},0.15)`, borderRadius: '1rem', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '240px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
              {[80, 64, 48].map((size, i) => (
                <div key={i} style={{ position: 'absolute', width: size * 2, height: size * 2, borderRadius: '50%', border: `1.5px solid ${entityAccent}`, opacity: 0.15 + i * 0.08, animation: `orbit ${6 + i * 2}s linear infinite` }} />
              ))}
            </div>
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: '1rem', background: entityGradient, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: `0 8px 24px ${entityAccent}4D` }}>
                <Activity size={28} color="#fff" />
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{experiment.name}</div>
              <div style={{ fontSize: '0.75rem', color: entityAccent, marginTop: 4, fontWeight: 500 }}>Live monitoring</div>
            </div>
          </div>

          {/* Stats grid — Alerts neutral when None */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {[
              { label: 'Data Points', value: dataPoints.toLocaleString(), icon: <Database size={14} />, color: entityAccent },
              { label: 'Network', value: `${networkTraffic} MB/s`, icon: <Network size={14} />, color: entityAccent },
              { label: 'Uptime', value: '99.8%', icon: <Activity size={14} />, color: '#34C759' },
              { label: 'Alerts', value: 'None', icon: <Activity size={14} />, color: 'var(--color-text-tertiary)' },
            ].map((stat, i) => (
              <div key={i} style={{ background: 'var(--color-card)', borderRadius: '0.75rem', border: '1px solid var(--color-border-primary)', padding: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: stat.color, marginBottom: '0.5rem' }}>
                  {stat.icon}
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-text-tertiary)' }}>{stat.label}</span>
                </div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ExperimentDetailView;
