import { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * ThemeContext — manages the 4-way theme matrix:
 *
 *   darkMode (boolean) × engineMode ('sw' | 'hw')
 *   = 4 combinations, each with its own full design token set
 *
 * The <html> element gets:
 *   class="dark"       (when darkMode === true)
 *   data-mode="sw|hw"  (reflects engineMode)
 *
 * CSS variables in index.css respond to these selectors.
 */

// ─── Type definitions (JSDoc) ──────────────────────────────────────────────
/**
 * @typedef {'sw'|'hw'} EngineMode
 * @typedef {{ darkMode: boolean, engineMode: EngineMode,
 *             toggleDark: ()=>void, toggleEngine: ()=>void,
 *             setEngineMode: (m: EngineMode)=>void,
 *             isHardware: boolean, isDark: boolean,
 *             themeKey: string }} ThemeContextValue
 */

const ThemeContext = createContext(/** @type {ThemeContextValue} */(null));

// ─── Theme metadata (used by components to inspect the current theme) ──────
export const THEME_META = {
  'light-sw': {
    label:       'Light Software',
    bg:          '#F7F9F7',
    accent:      '#16A34A',
    description: 'Off-white · Clean Mint',
  },
  'light-hw': {
    label:       'Light Hardware',
    bg:          '#EEF2F7',
    accent:      '#2563EB',
    description: 'Light Gray · Circuit Blue',
  },
  'dark-sw': {
    label:       'Dark Software',
    bg:          '#0C1210',
    accent:      '#4ADE80',
    description: 'Rich Black · Deep Slate',
  },
  'dark-hw': {
    label:       'Dark Hardware',
    bg:          '#080B0A',
    accent:      '#22FF6B',
    description: 'Charcoal · PCB Neon Green',
  },
};

// ─── Provider ──────────────────────────────────────────────────────────────
export function ThemeProvider({ children }) {
  // Restore from localStorage or default to dark-hw (most impressive first look)
  const [darkMode, setDarkMode] = useState(() => {
    try { return localStorage.getItem('ak-dark') !== 'false'; }
    catch { return true; }
  });

  const [engineMode, setEngineMode] = useState(/** @type {EngineMode} */() => {
    try { return (localStorage.getItem('ak-engine') || 'hw'); }
    catch { return 'hw'; }
  });

  // Sync to DOM
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    html.setAttribute('data-mode', engineMode);
    // Persist
    try {
      localStorage.setItem('ak-dark', String(darkMode));
      localStorage.setItem('ak-engine', engineMode);
    } catch { /* noop */ }
  }, [darkMode, engineMode]);

  const toggleDark = useCallback(() => setDarkMode(d => !d), []);
  const toggleEngine = useCallback(() =>
    setEngineMode(m => m === 'sw' ? 'hw' : 'sw'), []);

  const themeKey = `${darkMode ? 'dark' : 'light'}-${engineMode}`;
  const isHardware = engineMode === 'hw';
  const isDark = darkMode;

  const value = {
    darkMode,
    engineMode,
    toggleDark,
    toggleEngine,
    setEngineMode,
    isHardware,
    isDark,
    themeKey,
    meta: THEME_META[themeKey],
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── Hook ──────────────────────────────────────────────────────────────────
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export default ThemeContext;