import React, { useState } from 'react';
import {
  Play, Pause, Trash2, RefreshCw, Activity,
  Thermometer, Droplets, Wind, Zap, Database,
  Clock, TrendingUp, Wifi, Battery
} from 'lucide-react';

import { DeviceItem } from '../interfaces/experiments';
import { metric, useTelemetry } from '../telemetry/TelemetryContext';

export interface EntityColors {
  gradient: string;
  primary: string;
  accent: string;
  bgLight: string;
  bgMedium: string;
  borderColor: string;
}

interface DeviceCardProps {
  experiment: DeviceItem;
  onToggleStatus: () => void;
  onDelete: () => void;
  onRefresh: () => void;
  onClick?: () => void;
  entityColors?: EntityColors;
}

const DEFAULT_COLORS: EntityColors = {
  gradient: 'linear-gradient(135deg, #0071E3 0%, #5AC8FA 100%)',
  primary: '#0071E3',
  accent: '#5AC8FA',
  bgLight: 'rgba(0,113,227,0.08)',
  bgMedium: 'rgba(0,113,227,0.15)',
  borderColor: 'rgba(0,113,227,0.25)',
};

const DeviceCard: React.FC<DeviceCardProps> = ({
  experiment, onToggleStatus, onDelete, onRefresh, onClick, entityColors
}) => {
  const colors = entityColors || DEFAULT_COLORS;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const telemetry = useTelemetry(experiment.id);
  const signalStrength = metric(telemetry, 'signal_strength', 0);
  const batteryLevel = metric(telemetry, 'battery_level', 0);
  const dataPoints = metric(telemetry, 'data_points', 0);
  const lastUpdate = telemetry.lastEvent ? new Date(telemetry.lastEvent.timestamp) : null;

  // Generalized active state check (e.g., ONLINE, ACTIVE, or RUNNING)
  const isActive = ['ONLINE', 'ACTIVE', 'RUNNING', 'DONE'].includes(experiment.status.toUpperCase());

  const handleRefresh = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleStatus();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  const getDeviceIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('temp') || n.includes('thermostat')) return <Thermometer size={20} />;
    if (n.includes('humid') || n.includes('hvac')) return <Droplets size={20} />;
    if (n.includes('wind') || n.includes('motion') || n.includes('fan')) return <Wind size={20} />;
    if (n.includes('light') || n.includes('energy') || n.includes('power')) return <Zap size={20} />;
    return <Database size={20} />;
  };

  const progressPct = isActive ? metric(telemetry, 'progress', 0) : 0;

  // Status badge per spec
  const statusBadge = isActive
    ? { bg: 'rgba(16,185,129,0.12)', color: '#065F46', border: 'rgba(16,185,129,0.25)', label: experiment.status }
    : { bg: 'rgba(245,158,11,0.12)', color: '#B45309', border: 'rgba(245,158,11,0.25)', label: experiment.status };

  const batteryColor = batteryLevel >= 20 ? '#10B981' : '#EF4444';

  return (
    <div
      onClick={onClick}
      title={experiment.name}
      style={{
        background: 'var(--color-card)',
        borderRadius: '14px',
        border: '1px solid var(--color-border-primary)',
        borderLeft: `3px solid ${colors.primary}`,
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
        isolation: 'isolate',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 200ms ease, transform 200ms ease',
        position: 'relative',
        color: 'var(--color-text-primary)',
      }}
      onMouseEnter={e => {
        if (onClick) {
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-sm)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
      }}
    >
      <div style={{ padding: '20px' }}>
        {/* Card header: icon + name + status badge + actions */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', flex: 1, minWidth: 0 }}>
            {/* Icon — always circle with entity accent bg */}
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%',
              background: `rgba(${colors.primary.startsWith('#') ? hexToRgbStr(colors.primary) : '0,113,227'}, 0.12)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: colors.primary,
              flexShrink: 0,
            }}>
              {getDeviceIcon(experiment.name)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3
                title={experiment.name}
                style={{
                  fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)',
                  margin: '0 0 0.3rem',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  maxWidth: '160px',
                }}
              >
                {experiment.name}
              </h3>
              {/* Status pill badge */}
              <span style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '0.2rem 0.6rem', borderRadius: '100px',
                fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                background: statusBadge.bg, color: statusBadge.color,
                border: `1px solid ${statusBadge.border}`,
              }}>
                {statusBadge.label}
              </span>
            </div>
          </div>

          {/* Ghost action buttons */}
          <div style={{ display: 'flex', gap: '0.3rem', flexShrink: 0 }}>
            <button
              onClick={handleToggle}
              title={isActive ? 'Pause' : 'Start'}
              className={`control-btn ${isActive ? 'pause' : 'play'}`}
            >
              {isActive ? <Pause size={13} /> : <Play size={13} />}
            </button>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              title="Refresh"
              className="control-btn refresh"
            >
              <RefreshCw size={13} style={{ animation: isRefreshing ? 'spin 0.7s linear infinite' : 'none' }} />
            </button>
            <button
              onClick={handleDelete}
              title="Delete"
              className="control-btn delete"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>

        {/* Metrics row */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          marginBottom: '1rem',
          border: '1px solid var(--color-border-primary)',
          borderRadius: '8px', overflow: 'hidden',
        }}>
          {[
            { icon: <Activity size={13} />, label: 'Data Points', value: dataPoints.toLocaleString() },
            { icon: <Clock size={13} />, label: 'Updated', value: lastUpdate ? lastUpdate.toLocaleTimeString() : 'Waiting' },
          ].map((m, i) => (
            <div key={i} style={{
              padding: '0.5rem 0.625rem',
              background: 'var(--color-surface)',
              borderRight: i === 0 ? '1px solid var(--color-border-primary)' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.15rem', color: colors.primary }}>
                {m.icon}
                <span style={{ fontSize: '10px', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>{m.label}</span>
              </div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.value}</div>
            </div>
          ))}
        </div>

        {/* Signal & Battery */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem', marginBottom: '1rem' }}>
          {[
            { icon: <Wifi size={12} />, label: 'Signal', value: signalStrength, barColor: '#10B981' },
            { icon: <Battery size={12} />, label: 'Battery', value: batteryLevel, barColor: batteryColor },
          ].map((m, i) => (
            <div key={i}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.6875rem', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>
                  {m.icon}{m.label}
                </div>
                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{m.value}%</span>
              </div>
              <div style={{ height: '4px', background: 'var(--color-border-primary)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${m.value}%`, background: m.barColor, borderRadius: '2px', transition: 'width 0.4s ease' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Task progress — entity accent color */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Task Progress</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{isActive ? `${progressPct}%` : '—'}</span>
          </div>
          <div style={{ height: '4px', background: 'var(--color-border-primary)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: isActive ? `${progressPct}%` : '0%', background: colors.gradient, borderRadius: '2px', transition: 'width 0.5s ease' }} />
          </div>
        </div>

        {/* Footer: ID with trend icon + Live/Offline status */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.875rem', paddingTop: '0.875rem', borderTop: '1px solid var(--color-border-primary)' }}>
          <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <TrendingUp size={12} /> ID #{experiment.id}
          </span>
          {isActive ? (
            <span style={{ fontSize: '0.6875rem', color: colors.primary, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: colors.primary, animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite' }} />
              Online
            </span>
          ) : (
            <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)', fontWeight: 600 }}>
              ○ Offline
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Convert hex color to "R, G, B" string for use in rgba()
function hexToRgbStr(hex: string): string {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `${r}, ${g}, ${b}`;
}

export default DeviceCard;
