import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  blur?: 'sm' | 'md' | 'lg';
  opacity?: number;
  border?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  padding = 'md',
  blur = 'md',
  opacity = 0.1,
  border = true
}) => {
  const baseStyles = 'relative transition-all duration-300';
  
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const blurs = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg'
  };
  
  const borderStyles = border ? 'border border-white/20' : '';
  const opacityStyles = `bg-white/${opacity}`;

  return (
    <div className={`${baseStyles} ${paddings[padding]} ${blurs[blur]} ${opacityStyles} ${borderStyles} rounded-2xl shadow-2xl ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl pointer-events-none"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;
