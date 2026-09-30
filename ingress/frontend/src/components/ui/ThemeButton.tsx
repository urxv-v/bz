import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface ThemeButtonProps {
  className?: string;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ className = '' }) => {
  const { mode, toggleTheme, theme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-all duration-300 ${className}`}
      style={{
        backgroundColor: theme.colors.surface,
        border: `1px solid ${theme.colors.border.primary}`,
        color: theme.colors.text.primary,
        boxShadow: theme.colors.shadow.sm
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = theme.colors.card;
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = theme.colors.shadow.md;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = theme.colors.surface;
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = theme.colors.shadow.sm;
      }}
    >
      {mode === 'light' ? (
        <Moon size={20} />
      ) : (
        <Sun size={20} />
      )}
    </button>
  );
};

export default ThemeButton;
