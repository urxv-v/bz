import React, { createContext, useContext, useState, useEffect } from 'react';

const lightTheme = {
  colors: {
    rust: '#0071E3', orange: '#0071E3', amber: '#0071E3',
    yellow: '#0071E3', gray: '#86868B', zinc: '#86868B', stone: '#86868B',
    slate: '#0071E3', indigo: '#0071E3', purple: '#0071E3',
    teal: '#0071E3', navy: '#1D1D1F', navyLight: '#3A3A3C', navyDark: '#000000',
    gold: '#0071E3', goldLight: '#2997FF', goldDark: '#0068D0',
    champagne: '#F5F5F7',
    success: '#34C759', warning: '#FF9500', error: '#FF3B30', info: '#0071E3',
    gruvYellow: '#0071E3', gruvYellowB: '#2997FF',
    gruvOrange: '#0071E3', gruvOrangeB: '#2997FF',
    gruvAqua:   '#0071E3', gruvAquaB:   '#2997FF',
    gruvBlue:   '#0071E3', gruvBlueB:   '#2997FF',
    gruvPurple: '#0071E3', gruvPurpleB: '#2997FF',
    gruvGreen:  '#0071E3', gruvGreenB:  '#2997FF',
    gruvRed:    '#FF3B30', gruvRedB:    '#FF453A',
    background: '#F5F5F7',
    surface:    '#FFFFFF',
    card:       '#FFFFFF',
    overlay:    'rgba(255,255,255,0.85)',
    text: {
      primary:   '#1D1D1F',
      secondary: '#86868B',
      tertiary:  '#A1A1A6',
      inverse:   '#FFFFFF',
    },
    border: {
      primary:   'rgba(0,0,0,0.08)',
      secondary: 'rgba(0,0,0,0.12)',
      focus:     '#0071E3',
    },
    shadow: {
      sm: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
      md: '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)',
      lg: '0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.08)',
      xl: '0 1px 3px rgba(0,0,0,0.08), 0 16px 40px rgba(0,0,0,0.10)',
    },
  },
  gradients: {
    primary:    'linear-gradient(135deg, #0071E3 0%, #2997FF 100%)',
    secondary:  'linear-gradient(135deg, #34C759 0%, #30B0C7 100%)',
    accent:     'linear-gradient(135deg, #0071E3 0%, #5856D6 100%)',
    background: 'linear-gradient(180deg, #F5F5F7 0%, #FFFFFF 100%)',
    gold:       'linear-gradient(135deg, #0068D0 0%, #0071E3 60%, #2997FF 100%)',
    glass:      'rgba(255,255,255,0.72)',
  },
};

const darkTheme = {
  colors: {
    rust: '#2997FF', orange: '#2997FF', amber: '#2997FF',
    yellow: '#2997FF', gray: '#636366', zinc: '#636366', stone: '#636366',
    slate: '#2997FF', indigo: '#2997FF', purple: '#2997FF',
    teal: '#2997FF', navy: '#F5F5F7', navyLight: '#E5E5EA', navyDark: '#000000',
    gold: '#2997FF', goldLight: '#5AC8FA', goldDark: '#0A84FF',
    champagne: '#2C2C2E',
    success: '#30D158', warning: '#FF9F0A', error: '#FF453A', info: '#2997FF',
    gruvYellow: '#2997FF', gruvYellowB: '#5AC8FA',
    gruvOrange: '#2997FF', gruvOrangeB: '#5AC8FA',
    gruvAqua:   '#2997FF', gruvAquaB:   '#5AC8FA',
    gruvBlue:   '#2997FF', gruvBlueB:   '#5AC8FA',
    gruvPurple: '#2997FF', gruvPurpleB: '#5AC8FA',
    gruvGreen:  '#2997FF', gruvGreenB:  '#5AC8FA',
    gruvRed:    '#FF453A', gruvRedB:    '#FF453A',
    background: '#000000',
    surface:    '#1C1C1E',
    card:       '#1C1C1E',
    overlay:    'rgba(28,28,30,0.90)',
    text: {
      primary:   '#F5F5F7',
      secondary: '#98989D',
      tertiary:  '#636366',
      inverse:   '#000000',
    },
    border: {
      primary:   'rgba(255,255,255,0.08)',
      secondary: 'rgba(255,255,255,0.12)',
      focus:     '#2997FF',
    },
    shadow: {
      sm: '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
      md: '0 1px 3px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.3)',
      lg: '0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.35)',
      xl: '0 1px 3px rgba(0,0,0,0.4), 0 16px 40px rgba(0,0,0,0.45)',
    },
  },
  gradients: {
    primary:    'linear-gradient(135deg, #0A84FF 0%, #5AC8FA 100%)',
    secondary:  'linear-gradient(135deg, #30D158 0%, #32ADE6 100%)',
    accent:     'linear-gradient(135deg, #0A84FF 0%, #5E5CE6 100%)',
    background: 'linear-gradient(180deg, #000000 0%, #1C1C1E 100%)',
    gold:       'linear-gradient(135deg, #0A84FF 0%, #2997FF 100%)',
    glass:      'rgba(28,28,30,0.72)',
  },
};

type Theme = typeof lightTheme;
type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('blazecore-theme');
    return (saved as ThemeMode) || 'light';
  });

  const theme = mode === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('blazecore-theme', mode);
  }, [mode]);

  const toggleTheme = () => setMode(prev => prev === 'light' ? 'dark' : 'light');
  const setThemeMode = (m: ThemeMode) => setMode(m);

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme, setTheme: setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
