import React, { createContext, useContext, useState, useEffect } from 'react';

// Predefined Curated Luxury Color Palettes
export const THEME_PRESETS = [
  {
    id: 'chocolaty',
    name: 'Chocolaty Terracotta (Default)',
    primary: '#8C4A32',
    accent: '#f97316',
    sub: 'Classic Primus Bronze'
  },
  {
    id: 'cyan',
    name: 'Cyberpunk Neon Cyan',
    primary: '#0ea5e9',
    accent: '#38bdf8',
    sub: 'Quantum High-Velocity'
  },
  {
    id: 'violet',
    name: 'Deep Nebula Violet',
    primary: '#8b5cf6',
    accent: '#c084fc',
    sub: 'Spatial Metaverse'
  },
  {
    id: 'emerald',
    name: 'Quantum Emerald',
    primary: '#10b981',
    accent: '#34d399',
    sub: 'Bio-Matrix Fleet'
  },
  {
    id: 'amber',
    name: 'Solar Amber Gold',
    primary: '#f59e0b',
    accent: '#fbbf24',
    sub: 'Executive C-Suite'
  },
  {
    id: 'crimson',
    name: 'Crimson Nova',
    primary: '#e11d48',
    accent: '#fb7185',
    sub: 'Sentinel Cyber'
  },
  {
    id: 'sapphire',
    name: 'Royal Sapphire',
    primary: '#2563eb',
    accent: '#60a5fa',
    sub: 'Global Enterprise'
  }
];

const DEFAULT_THEME = THEME_PRESETS[0]; // Chocolaty #8C4A32

const ThemeContext = createContext(null);

// Helper: Convert HEX to RGB numbers
function hexToRgb(hex) {
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map((c) => c + c).join('');
  }
  const num = parseInt(cleanHex, 16);
  if (isNaN(num)) return { r: 140, g: 74, b: 50 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

// Helper: Generate lighter/accent gradient stop from base hex
function generateAccentHex(hex) {
  const { r, g, b } = hexToRgb(hex);
  const lighten = (c) => Math.min(255, Math.floor(c + (255 - c) * 0.35));
  const lr = lighten(r).toString(16).padStart(2, '0');
  const lg = lighten(g).toString(16).padStart(2, '0');
  const lb = lighten(b).toString(16).padStart(2, '0');
  return `#${lr}${lg}${lb}`;
}

export const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColorState] = useState(() => {
    const saved = localStorage.getItem('era_global_theme_color');
    return saved || DEFAULT_THEME.primary;
  });

  const [themeName, setThemeName] = useState(() => {
    const saved = localStorage.getItem('era_global_theme_name');
    return saved || DEFAULT_THEME.name;
  });

  const [themeAccent, setThemeAccent] = useState(() => {
    const saved = localStorage.getItem('era_global_theme_accent');
    return saved || DEFAULT_THEME.accent;
  });

  const [themeRgb, setThemeRgb] = useState(() => hexToRgb(DEFAULT_THEME.primary));

  // Apply CSS Variables to :root whenever color changes
  const applyCssVariables = (primaryHex, accentHex) => {
    const rgb = hexToRgb(primaryHex);
    setThemeRgb(rgb);

    const root = document.documentElement;
    root.style.setProperty('--primary-theme', primaryHex);
    root.style.setProperty('--primary-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
    root.style.setProperty('--primary-accent', accentHex || generateAccentHex(primaryHex));
    root.style.setProperty('--primary-glow', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.45)`);
    root.style.setProperty('--primary-subtle', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.12)`);
    root.style.setProperty('--primary-border', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.35)`);
    root.style.setProperty('--primary-hover', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.85)`);
  };

  useEffect(() => {
    applyCssVariables(themeColor, themeAccent);
  }, [themeColor, themeAccent]);

  // Set Theme from Preset
  const setPresetTheme = (presetId) => {
    const preset = THEME_PRESETS.find((p) => p.id === presetId) || DEFAULT_THEME;
    setThemeColorState(preset.primary);
    setThemeName(preset.name);
    setThemeAccent(preset.accent);
    localStorage.setItem('era_global_theme_color', preset.primary);
    localStorage.setItem('era_global_theme_name', preset.name);
    localStorage.setItem('era_global_theme_accent', preset.accent);
    applyCssVariables(preset.primary, preset.accent);
  };

  // Set Custom Color (from Hex input or Color Picker)
  const setCustomColor = (hex, customName = 'Custom Theme') => {
    if (!hex || !/^#[0-9A-Fa-f]{3,8}$/.test(hex)) return false;
    const accent = generateAccentHex(hex);
    setThemeColorState(hex);
    setThemeName(customName);
    setThemeAccent(accent);
    localStorage.setItem('era_global_theme_color', hex);
    localStorage.setItem('era_global_theme_name', customName);
    localStorage.setItem('era_global_theme_accent', accent);
    applyCssVariables(hex, accent);
    return true;
  };

  /**
   * GLOBAL API ATTACHMENT FUNCTION:
   * Call this function when receiving theme data from your backend API:
   * Example API response payload:
   * {
   *   themeColor: "#8C4A32",
   *   accentColor: "#f97316", // optional
   *   themeName: "Chocolaty Enterprise" // optional
   * }
   */
  const applyBackendTheme = (apiPayload) => {
    if (!apiPayload) return;
    const color = apiPayload.themeColor || apiPayload.primaryColor || apiPayload.color;
    if (color && /^#[0-9A-Fa-f]{3,8}$/.test(color)) {
      const accent = apiPayload.accentColor || generateAccentHex(color);
      const name = apiPayload.themeName || apiPayload.name || `Backend Config (${color})`;
      setThemeColorState(color);
      setThemeName(name);
      setThemeAccent(accent);
      localStorage.setItem('era_global_theme_color', color);
      localStorage.setItem('era_global_theme_name', name);
      localStorage.setItem('era_global_theme_accent', accent);
      applyCssVariables(color, accent);
      return true;
    }
    return false;
  };

  // Reset to default chocolaty theme
  const resetToDefault = () => {
    setPresetTheme('chocolaty');
  };

  return (
    <ThemeContext.Provider
      value={{
        themeColor,
        themeName,
        themeAccent,
        themeRgb,
        themePresets: THEME_PRESETS,
        setPresetTheme,
        setCustomColor,
        applyBackendTheme,
        resetToDefault
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
