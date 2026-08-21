import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  LogOut,
  ArrowRight,
  Clock,
  Volume2,
  VolumeX,
  Maximize
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { CosmicParticleCanvas } from '../components/common/CosmicParticleCanvas';
import { sound } from '../utils/soundEffects';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const { themeColor, themeAccent } = useTheme();
  const navigate = useNavigate();

  const [timeStr, setTimeStr] = useState('');
  const [isMuted, setIsMuted] = useState(sound.isMuted());
  const [selectedUnit, setSelectedUnit] = useState('Unit-02');

  // Real-time Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    sound.playClick();
    logout();
    navigate('/login');
  };

  const toggleSound = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) sound.playClick();
  };

  const handleFullscreen = () => {
    sound.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleEnterHrms = () => {
    sound.playSuccess();
    navigate('/hrms');
  };

  return (
    <div className="relative min-h-screen w-full bg-[#080a0f] text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* Subtle Cosmic Background */}
      <CosmicParticleCanvas density={60} accentColor={themeColor} secondaryColor={themeAccent} />

      {/* TOP NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#0c1017]/90 backdrop-blur-2xl border-b border-white/10 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-xl">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => { sound.playClick(); navigate('/dashboard'); }}
            className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/20 cursor-pointer shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${themeColor}, ${themeAccent})`,
              boxShadow: `0 0 18px var(--primary-glow)`
            }}
          >
            <span className="font-display font-black text-white text-sm">PP</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-white text-base tracking-wide">
              Primus Partners
            </h1>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Clock */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-slate-300">
            <Clock className="w-3.5 h-3.5" style={{ color: 'var(--primary-accent)' }} />
            <span>{timeStr || '12:00:00 AM'}</span>
          </div>

          {/* Unit */}
          <select
            value={selectedUnit}
            onChange={(e) => { sound.playClick(); setSelectedUnit(e.target.value); }}
            className="bg-black/50 border border-white/15 text-xs font-mono text-white py-1.5 px-2.5 rounded-xl outline-none cursor-pointer"
          >
            <option value="Unit-01">Unit-01</option>
            <option value="Unit-02">Unit-02</option>
            <option value="Unit-03">Unit-03</option>
          </select>

          {/* Sound */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => sound.playHover()}
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Fullscreen */}
          <button
            onClick={handleFullscreen}
            onMouseEnter={() => sound.playHover()}
            className="hidden sm:flex p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Toggle Fullscreen"
          >
            <Maximize className="w-4 h-4" />
          </button>

          {/* User Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-sm"
              style={{ backgroundColor: themeColor }}
            >
              {user?.userId ? user.userId.charAt(0).toUpperCase() : 'A'}
            </div>
            <span className="text-xs font-semibold text-white hidden sm:inline">
              {user?.name || user?.userId || 'Admin'}
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            onMouseEnter={() => sound.playHover()}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 hover:bg-rose-500/25 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT: SIMPLE & ELEGANT SINGLE MODULE */}
      <main className="relative z-10 flex-1 p-6 md:p-12 max-w-4xl mx-auto w-full flex flex-col justify-center items-center">
        {/* Welcome */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-white tracking-tight mb-2">
            Welcome, {user?.name || 'Administrator'}
          </h2>
          <p className="text-slate-400 text-sm">
            Select your workspace module to get started.
          </p>
        </div>

        {/* SINGLE HRMS CARD */}
        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ duration: 0.2 }}
          onClick={handleEnterHrms}
          onMouseEnter={() => sound.playHover()}
          style={{
            borderColor: 'var(--primary-border)',
            boxShadow: `0 20px 60px rgba(0,0,0,0.7), 0 0 35px var(--primary-glow)`
          }}
          className="relative w-full max-w-xl p-8 md:p-10 rounded-3xl bg-[#0f1420]/85 backdrop-blur-2xl border cursor-pointer overflow-hidden group shadow-2xl flex flex-col sm:flex-row items-center gap-6"
        >
          {/* Top Laser Glow */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] animate-pulse"
            style={{
              background: `linear-gradient(90deg, transparent, ${themeColor}, ${themeAccent}, transparent)`
            }}
          />

          {/* Icon */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center border shrink-0 group-hover:scale-105 transition-transform shadow-xl"
            style={{
              background: `linear-gradient(135deg, ${themeColor}, ${themeAccent})`,
              borderColor: 'var(--primary-border)',
              boxShadow: `0 0 25px var(--primary-glow)`
            }}
          >
            <Users className="w-10 h-10 text-white" />
          </div>

          {/* Details */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-2xl font-bold font-display text-white mb-1.5 group-hover:text-[#fed7aa] transition-colors">
              HRMS Module
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5">
              Employee onboarding, candidate pipelines, document verification, and organizational workflows.
            </p>

            <div
              style={{
                background: `linear-gradient(135deg, ${themeColor}, ${themeAccent})`,
                boxShadow: `0 4px 15px var(--primary-glow)`
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-xs transition-all shadow-md"
            >
              <span>Open Workspace</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 bg-black/40 px-6 py-4 text-center text-xs text-slate-500">
        © 2026 Primus Partners • All Rights Reserved
      </footer>
    </div>
  );
};
