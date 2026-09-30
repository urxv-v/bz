import React, { useRef, useCallback } from 'react';
import { useTheme } from './ThemeProvider';

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  glass?: boolean;
  accent?: 'blue' | 'none';
}

const PremiumCard: React.FC<PremiumCardProps> = ({
  children,
  className = '',
  padding = 'md',
  hover = true,
  glass = false,
  accent = 'none',
}) => {
  const { mode } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);

  const padMap = { sm: '1rem', md: '1.5rem', lg: '2rem', xl: '2.5rem' };

  const shadowNormal = glass
    ? (mode === 'light' ? '0 4px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)' : '0 4px 16px rgba(0,0,0,0.36), 0 1px 4px rgba(0,0,0,0.18)')
    : (mode === 'light' ? '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)' : '0 1px 3px rgba(0,0,0,0.36), 0 1px 2px rgba(0,0,0,0.20)');

  const shadowHover = glass
    ? (mode === 'light' ? '0 20px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)' : '0 20px 48px rgba(0,0,0,0.50), 0 4px 12px rgba(0,0,0,0.28)')
    : (mode === 'light' ? '0 12px 32px rgba(0,0,0,0.10), 0 4px 10px rgba(0,0,0,0.06)' : '0 12px 32px rgba(0,0,0,0.48), 0 4px 10px rgba(0,0,0,0.28)');

  const onEnter = useCallback(() => {
    if (!hover || !cardRef.current) return;
    cardRef.current.style.transform = 'translateY(-4px)';
    cardRef.current.style.boxShadow = shadowHover;
  }, [hover, shadowHover]);

  const onLeave = useCallback(() => {
    if (!hover || !cardRef.current) return;
    cardRef.current.style.transform = 'translateY(0)';
    cardRef.current.style.boxShadow = shadowNormal;
  }, [hover, shadowNormal]);

  const baseStyle: React.CSSProperties = glass ? {
    background: mode === 'light' ? 'rgba(255,255,255,0.72)' : 'rgba(28,28,30,0.72)',
    backdropFilter: 'blur(20px) saturate(1.8)',
    WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
    border: `1px solid ${mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.10)'}`,
    boxShadow: shadowNormal,
  } : {
    background: mode === 'light' ? '#FFFFFF' : '#1C1C1E',
    border: `1px solid ${mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`,
    boxShadow: shadowNormal,
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        position: 'relative',
        borderRadius: '1.125rem',
        padding: padMap[padding],
        overflow: 'hidden',
        transform: 'translateY(0)',
        transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s ease',
        willChange: hover ? 'transform' : 'auto',
        ...baseStyle,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {glass && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 'inherit',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 55%, transparent 100%)',
        }} />
      )}

      {accent !== 'none' && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2.5px',
          background: 'linear-gradient(90deg, transparent 0%, #0071E3 30%, #5AC8FA 70%, transparent 100%)',
          borderRadius: '1.125rem 1.125rem 0 0',
          pointerEvents: 'none',
        }} />
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
};

export default PremiumCard;
