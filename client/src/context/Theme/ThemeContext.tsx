import { createContext, useContext, useMemo, useState } from 'react';
import { THEME_LOCALSTORAGE_KEY } from './constants';

export type Theme = 'light' | 'dark';

interface ThemeData {
  theme: Theme;
  setTheme: (arg0: Theme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeData | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used in a ThemeProvider');
  }
  return context;
}

export const ThemeProvider: React.FC = ({ children }) => {
  const initialTheme = useMemo(() => {
    let res = 'light';
    if (typeof window !== 'undefined') {
      res = window?.document?.documentElement?.dataset?.theme ?? 'light';
    };
    return res;
  }, []);
  
  const [theme, _setTheme] = useState<Theme>(initialTheme as Theme);

  
  const setTheme = (val: Theme) => {
    if (!window?.document?.documentElement?.dataset) { return; }
    if (val === 'light') {
      delete window.document.documentElement.dataset.theme;
    } else {
      window.document.documentElement.dataset.theme = val;
    }
    window.localStorage.setItem(THEME_LOCALSTORAGE_KEY, val);
    _setTheme(val);
  }

  const toggleTheme = () => {
    switch (theme) {
      case 'light':
        setTheme('dark');
        break;
      case 'dark':
        setTheme('light');
        break;
      default:
        setTheme('light');
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      { children }
    </ThemeContext.Provider>
  )
};
