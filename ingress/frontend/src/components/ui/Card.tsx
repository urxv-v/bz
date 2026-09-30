import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  hover = false
}) => {
  const baseStyles = 'bg-white rounded-lg transition-all duration-200';
  
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  };
  
  const hoverStyles = hover ? 'hover:shadow-lg hover:scale-[1.02]' : '';

  return (
    <div className={`${baseStyles} ${paddings[padding]} ${shadows[shadow]} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
