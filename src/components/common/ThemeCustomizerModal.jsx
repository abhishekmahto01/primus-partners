import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Palette,
  Sparkles,
  Check,
  RotateCcw,
  Server,
  X,
  Copy,
  CheckCheck,
  Layers,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useTheme, THEME_PRESETS } from '../../context/ThemeContext';
import { sound } from '../../utils/soundEffects';

export const ThemeCustomizerModal = ({ isOpen, onClose }) => {
  const {
    themeColor,
    themeName,
    themeAccent,
    themePresets,
    setPresetTheme,
    setCustomColor,
    applyBackendTheme,
    resetToDefault
  } = useTheme();

  const [hexInput, setHexInput] = useState(themeColor);
  const [copied, setCopied] = useState(false);
  const [apiSimulating, setApiSimulating] = useState(false);
  const [apiResultNotice, setApiResultNotice] = useState('');

  const handlePresetClick = (preset) => {
    sound.playClick();
    setPresetTheme(preset.id);
    setHexInput(preset.primary);
  };

  const handleHexInputChange = (e) => {
    const val = e.target.value;
    setHexInput(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      setCustomColor(val, `Custom (${val})`);
    }
  };

  const handleColorPickerChange = (e) => {
    const val = e.target.value;
    setHexInput(val);
    setCustomColor(val, `Custom (${val})`);
  };

  // Simulate receiving a Theme JSON payload from Backend API
  const handleSimulateApi = () => {
    sound.playScan();
    setApiSimulating(true);
    setApiResultNotice('');

    // Sample dynamic API mock options
    const mockApiPayloads = [
      { themeColor: '#0ea5e9', accentColor: '#38bdf8', themeName: 'API: Cyan Ops Cluster' },
      { themeColor: '#8b5cf6', accentColor: '#c084fc', themeName: 'API: Spatial Metaverse Corp' },
      { themeColor: '#10b981', accentColor: '#34d399', themeName: 'API: Bio-Quantum Enterprise' },
      { themeColor: '#8C4A32', accentColor: '#f97316', themeName: 'API: Primus Chocolaty HQ' },
      { themeColor: '#f59e0b', accentColor: '#fbbf24', themeName: 'API: Solar Amber Sovereign' }
    ];

    // Pick a different one from current
    const randomPayload = mockApiPayloads.find((p) => p.themeColor !== themeColor) || mockApiPayloads[0];

    setTimeout(() => {
      applyBackendTheme(randomPayload);
      setHexInput(randomPayload.themeColor);
      setApiSimulating(false);
      sound.playSuccess();
      setApiResultNotice(`Backend API applied: ${randomPayload.themeName} (${randomPayload.themeColor})`);
      setTimeout(() => setApiResultNotice(''), 4000);
    }, 900);
  };

  const handleCopyCodeSnippet = () => {
    sound.playClick();
    const snippet = `// Example: Call this in your API handler / fetch hook:\nimport { useTheme } from './context/ThemeContext';\n\nconst { applyBackendTheme } = useTheme();\n\n// When your backend returns theme config:\nfetch('/api/tenant-config')\n  .then(res => res.json())\n  .then(data => {\n    applyBackendTheme({\n      themeColor: data.brandColor || "${themeColor}",\n      themeName: data.brandName || "${themeName}"\n    });\n  });`;
    navigator.clipboard.writeText(snippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onClose(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0f1420]/95 border rounded-3xl p-6 md:p-8 shadow-[0_25px_90px_rgba(0,0,0,0.9)] overflow-hidden z-10"
          style={{ borderColor: 'var(--primary-border)' }}
        >
          {/* Top Ambient Glow */}
          <div
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-40 transition-colors"
            style={{ backgroundColor: themeColor }}
          />

          {/* Close Button */}
          <button
            onClick={() => onClose(false)}
            className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border border-white/20 transition-colors"
              style={{ backgroundColor: themeColor, color: '#ffffff' }}
            >
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold font-display text-white">
                  Global Theme Engine & API Studio
                </h3>
                <span
                  className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border transition-colors"
                  style={{
                    backgroundColor: 'var(--primary-subtle)',
                    color: 'var(--primary-accent)',
                    borderColor: 'var(--primary-border)'
                  }}
                >
                  Live System
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                Active Theme: <strong className="text-white">{themeName}</strong> ({themeColor})
              </p>
            </div>
          </div>

          {/* Live Preview Bar */}
          <div
            className="p-4 rounded-2xl border mb-6 transition-all"
            style={{
              backgroundColor: 'rgba(255,255,255,0.02)',
              borderColor: 'var(--primary-border)',
              boxShadow: `0 0 25px var(--primary-glow)`
            }}
          >
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Interactive Live Preview</span>
              <span className="text-white font-bold">{themeColor}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                className="px-4 py-2 rounded-xl text-white text-xs font-bold shadow-lg transition-all"
                style={{
                  background: `linear-gradient(135deg, ${themeColor}, ${themeAccent})`,
                  boxShadow: `0 4px 15px var(--primary-glow)`
                }}
              >
                Sample Button
              </button>
              <span
                className="px-3 py-1 rounded-xl text-xs font-mono font-bold border"
                style={{
                  backgroundColor: 'var(--primary-subtle)',
                  color: 'var(--primary-accent)',
                  borderColor: 'var(--primary-border)'
                }}
              >
                Badge Tag
              </span>
              <div className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: themeColor }} />
                <span>All routes, canvases & components react instantly</span>
              </div>
            </div>
          </div>

          {/* SECTION 1: Preset Palettes */}
          <div className="mb-6">
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
              1. Curated Luxury Palettes (Click to switch)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {themePresets.map((preset) => {
                const isSelected = themeColor.toLowerCase() === preset.primary.toLowerCase();
                return (
                  <div
                    key={preset.id}
                    onClick={() => handlePresetClick(preset)}
                    onMouseEnter={() => sound.playHover()}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-white bg-white/10 shadow-lg scale-102'
                        : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="w-5 h-5 rounded-full border border-white/30 shadow"
                        style={{ backgroundColor: preset.primary }}
                      />
                      {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <div className="text-xs font-bold text-white font-display leading-tight">
                      {preset.name.split(' (')[0]}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 mt-1">{preset.primary}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: Custom Hex & Color Picker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 pt-4 border-t border-white/10">
            {/* Custom Hex Input */}
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                2. Custom Hex Color Input
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={themeColor}
                  onChange={handleColorPickerChange}
                  className="w-10 h-10 rounded-xl bg-transparent border border-white/20 cursor-pointer outline-none"
                />
                <input
                  type="text"
                  value={hexInput}
                  onChange={handleHexInputChange}
                  placeholder="#8C4A32"
                  className="flex-1 bg-[#080a0f] border border-white/15 focus:border-[#f97316] rounded-xl py-2.5 px-3 text-white text-xs font-mono outline-none"
                />
              </div>
            </div>

            {/* Backend API Simulation Button */}
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                3. Test Backend API Push
              </label>
              <button
                type="button"
                onClick={handleSimulateApi}
                disabled={apiSimulating}
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 border border-white/15 hover:border-white/30 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer hover:bg-white/10 shadow-sm"
              >
                <Server className="w-4 h-4 text-[#38bdf8]" />
                {apiSimulating ? 'Receiving API Payload...' : 'Simulate Backend API Response'}
              </button>
            </div>
          </div>

          {/* API Notice */}
          {apiResultNotice && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono mb-4 flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              {apiResultNotice}
            </motion.div>
          )}

          {/* FOOTER ACTIONS */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono">
            <button
              onClick={() => { sound.playClick(); resetToDefault(); setHexInput('#8C4A32'); }}
              className="text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset to Chocolaty Default (#8C4A32)
            </button>

            <button
              onClick={handleCopyCodeSnippet}
              className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'API Snippet Copied!' : 'Copy API Integration Code'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
