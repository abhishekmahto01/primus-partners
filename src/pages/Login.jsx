import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Volume2,
  VolumeX,
  Palette,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { CosmicParticleCanvas } from '../components/common/CosmicParticleCanvas';
import { WarpPortalOverlay } from '../components/common/WarpPortalOverlay';
import { ThemeCustomizerModal } from '../components/common/ThemeCustomizerModal';
import { sound } from '../utils/soundEffects';

export const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.isMuted());
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const { login } = useAuth();
  const { themeColor, themeAccent, themePresets, setPresetTheme } = useTheme();
  const navigate = useNavigate();

  // 3D Card tilt
  const [cardRotation, setCardRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCardRotation({
      x: -y / 35,
      y: x / 35
    });
  };

  const handleMouseLeave = () => {
    setCardRotation({ x: 0, y: 0 });
  };

  const handleThemeSelect = (presetId) => {
    sound.playClick();
    setPresetTheme(presetId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!userId.trim() || !password.trim()) {
      setError('Please enter User ID and Password');
      return;
    }

    sound.playClick();
    setLoading(true);

    setTimeout(() => {
      const result = login(userId, password);
      setLoading(false);

      if (result.success) {
        sound.playSuccess();
        setIsWarping(true);
        setTimeout(() => {
          navigate('/otp-verification');
        }, 1200);
      } else {
        setError(result.message || 'Invalid credentials');
      }
    }, 400);
  };

  const toggleAudio = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  return (
    <div className="relative min-h-screen w-full bg-[#080a0f] text-slate-100 flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden font-sans select-none">
      {/* Subtle Cosmic Background */}
      <CosmicParticleCanvas density={60} accentColor={themeColor} secondaryColor={themeAccent} />

      {/* Global Theme Studio Modal */}
      <ThemeCustomizerModal isOpen={isThemeModalOpen} onClose={setIsThemeModalOpen} />

      {/* Warp Transition */}
      <WarpPortalOverlay
        isWarping={isWarping}
        title="WARPING TO UNIVERSE"
        subtitle="Verifying Security Clearance..."
      />

      {/* Top Header: Brand + Theme Color Palette Swatches */}
      <header className="fixed top-0 left-0 right-0 z-30 px-6 py-4 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/20 shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${themeColor}, ${themeAccent})`,
              boxShadow: `0 0 20px var(--primary-glow)`
            }}
          >
            <span className="font-display font-extrabold text-white text-base">PP</span>
          </div>
          <div>
            <h1 className="font-display font-extrabold text-white text-base tracking-wider leading-none">
              PRIMUS PARTNERS
            </h1>
            <p className="text-[11px] font-mono text-slate-400 mt-0.5">Solutions for Tomorrow</p>
          </div>
        </div>

        {/* Right Header: Theme Swatches & Sound */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Color Swatches */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/40 border border-white/10 shadow-lg">
            {themePresets.map((preset) => {
              const isSelected = themeColor.toLowerCase() === preset.primary.toLowerCase();
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleThemeSelect(preset.id)}
                  onMouseEnter={() => sound.playHover()}
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    isSelected ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: preset.primary }}
                  title={preset.name}
                >
                  {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => { sound.playClick(); setIsThemeModalOpen(true); }}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Custom Colors & API"
            >
              <Palette className="w-3.5 h-3.5" style={{ color: 'var(--primary-accent)' }} />
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleAudio}
            onMouseEnter={() => sound.playHover()}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer shadow-lg"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </header>

      {/* Main 3D Card Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${cardRotation.x}deg) rotateY(${cardRotation.y}deg)`,
          transition: 'transform 0.15s ease-out',
          borderColor: 'var(--primary-border)',
          boxShadow: `0 25px 80px rgba(0,0,0,0.8), 0 0 40px var(--primary-glow)`
        }}
        className="relative z-20 w-full max-w-4xl bg-[#0f1420]/85 backdrop-blur-2xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col md:flex-row mt-12 mb-6"
      >
        {/* Ambient Top Glow Laser */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] animate-pulse"
          style={{
            background: `linear-gradient(90deg, transparent, ${themeColor}, ${themeAccent}, transparent)`
          }}
        />

        {/* LEFT SECTION: Hero Intro */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent">
          <div
            className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-30"
            style={{ backgroundColor: themeColor }}
          />

          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold uppercase tracking-wider mb-6"
              style={{
                backgroundColor: 'var(--primary-subtle)',
                borderColor: 'var(--primary-border)',
                color: 'var(--primary-accent)'
              }}
            >
              <Sparkles className="w-3.5 h-3.5" /> HRMS Platform
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold font-display text-white leading-tight mb-4">
              Enterprise Human Resource Management
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-sm">
              Streamline employee operations, onboarding pipelines, document verification, and organizational workflows in one unified dashboard.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-500 pt-6 border-t border-white/10">
            © 2026 Primus Partners HRMS • v1.0
          </div>
        </div>

        {/* RIGHT SECTION: Simple Sign In Form */}
        <div className="w-full md:w-[400px] p-8 md:p-12 bg-[#0a0d14]/90 flex flex-col justify-center relative">
          <div className="mb-8">
            <h3 className="text-2xl font-bold font-display text-white">Sign In</h3>
            <p className="text-xs text-slate-400 mt-1">
              Enter your credentials to access your account.
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs font-mono mb-5"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                User ID / Email
              </label>
              <div className="relative group">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-white transition-colors" />
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter User ID"
                  className="w-full bg-[#080a0f] border border-white/15 focus:border-white/50 rounded-xl py-3 pl-10 pr-4 text-white text-sm placeholder-slate-600 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-white transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full bg-[#080a0f] border border-white/15 focus:border-white/50 rounded-xl py-3 pl-10 pr-11 text-white text-sm placeholder-slate-600 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || isWarping}
              onMouseEnter={() => sound.playHover()}
              style={{
                background: `linear-gradient(135deg, ${themeColor}, ${themeAccent})`,
                boxShadow: `0 4px 25px var(--primary-glow)`
              }}
              className="w-full mt-2 py-3.5 px-6 rounded-xl text-white font-display font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg"
            >
              {loading ? (
                <span>Signing In...</span>
              ) : isWarping ? (
                <span>Entering Workspace...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
