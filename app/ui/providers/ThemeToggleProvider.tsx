'use client';

import { createContext, useContext, useState, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { it as itLocale } from 'date-fns/locale/it';
import { pecofficeLightTheme, pecofficeDarkTheme } from '@/app/theme';

type ThemeMode = 'light' | 'dark';

interface ThemeToggleContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeToggleContext = createContext<ThemeToggleContextType>({
  themeMode: 'light',
  toggleTheme: () => {},
});

export function useThemeToggle() {
  return useContext(ThemeToggleContext);
}

export default function ThemeToggleProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = themeMode === 'light' ? pecofficeLightTheme : pecofficeDarkTheme;

  const contextValue = useMemo(() => ({ themeMode, toggleTheme }), [themeMode]);

  return (
    <ThemeToggleContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={itLocale}>
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
}
