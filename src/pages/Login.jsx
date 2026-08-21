import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  Globe,
  Radio,
  Fingerprint,
  Cpu,
  Compass,
  CheckCircle2,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CosmicParticleCanvas } from '../components/common/CosmicParticleCanvas';
import { WarpPortalOverlay } from '../components/common/WarpPortalOverlay';
import { sound } from '../utils/soundEffects';

export const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [activeRole, setActiveRole] = useState('executive');
  const [biometricScanning, setBiometricScanning] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.isMuted());

  // 3D Card tilt mouse position
  const [cardRotation, setCardRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const { login } = useAuth();
  const navigate = useNavigate();

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

  const roles = [
    { id: 'executive', name: 'Executive Portal', sub: 'C-Suite Command', user: 'admin', pass: 'admin123', badge: 'Tier 1' },
    { id: 'hr_lead', name: 'Talent Architect', sub: 'Global HRMS Ops', user: 'admin', pass: 'admin123', badge: 'Admin' },
    { id: 'quantum_ops', name: 'Quantum Core', sub: 'Neural Systems', user: 'admin', pass: 'admin123', badge: 'Root' }
  ];

  const handleRoleSelect = (role) => {
    sound.playClick();
    setActiveRole(role.id);
    setUserId(role.user);
    setPassword(role.pass);
    setError('');
  };

  const handleBiometricAuth = () => {
    sound.playScan();
    setBiometricScanning(true);
    setError('');
    setTimeout(() => {
      setBiometricScanning(false);
      setUserId('admin');
      setPassword('admin123');
      sound.playSuccess();
    }, 1200);
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
        }, 1400);
      } else {
        setError(result.message || 'Quantum authentication signature rejected.');
      }
    }, 500);
  };

  const toggleAudio = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  return (
    <div className="relative min-h-screen w-full bg-[#080a0f] text-slate-100 flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden font-sans select-none">
      {/* 60FPS Interactive Cosmic Canvas */}
      <CosmicParticleCanvas density={85} accentColor="#8C4A32" secondaryColor="#38bdf8" />

      {/* Fullscreen Warp Speed Tunnel when Transitioning */}
      <WarpPortalOverlay isWarping={isWarping} title="ENTERING THE ERA UNIVERSE" subtitle="Decrypting 4096-bit Quantum Keys • Synchronizing 2FA Gate" />

      {/* Top Floating Universe Header */}
      <header className="fixed top-0 left-0 right-0 z-30 px-6 py-4 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8C4A32] to-[#f97316] flex items-center justify-center shadow-[0_0_20px_rgba(140,74,50,0.6)] border border-white/20">
            <span className="font-display font-extrabold text-white text-base tracking-tighter">PP</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-white text-base tracking-wider">PRIMUS PARTNERS</span>
              <span className="text-[10px] font-mono font-bold uppercase bg-[#8C4A32]/30 text-[#f97316] border border-[#8C4A32]/50 px-2 py-0.5 rounded-full">
                ERA OS v4.9
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400">Global Enterprise Nexus</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Sound Synthesizer Toggle */}
          <button
            onClick={toggleAudio}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:bg-white/10 hover:border-[#8C4A32]/60 hover:text-white transition-all cursor-pointer shadow-lg"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-[#f97316]" />}
            <span className="hidden sm:inline">{isMuted ? 'Sound OFF' : 'Quantum Audio'}</span>
          </button>

          {/* Node Status Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            Node: 01-ALPHA • Latency: 9ms
          </div>
        </div>
      </header>

      {/* Main 3D Floating Portal Glass Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${cardRotation.x}deg) rotateY(${cardRotation.y}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
        className="relative z-20 w-full max-w-5xl bg-[#0f1420]/80 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(140,74,50,0.2)] overflow-hidden flex flex-col lg:flex-row mt-12 mb-6"
      >
        {/* Ambient Top Glow Laser */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8C4A32] via-[#f97316] to-transparent animate-pulse" />

        {/* LEFT SECTION: Cyber Holographic Overview */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent">
          {/* Subtle Ambient Radial Orb */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#8C4A32]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#38bdf8]/15 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Hologram Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#8C4A32]/20 to-[#f97316]/10 border border-[#8C4A32]/40 text-[#f97316] text-xs font-mono font-bold tracking-wide uppercase mb-6 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-[#f97316]" style={{ animationDuration: '6s' }} />
              Enterprise Universe Gateway
            </div>

            <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white leading-tight mb-4">
              Enter the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fed7aa] via-[#f97316] to-[#8C4A32] drop-shadow-[0_0_25px_rgba(249,115,22,0.4)]">
                Next-Gen Era
              </span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8 max-w-md">
              A unified quantum command center for talent orchestration, neural onboarding pipelines, spatial collaboration, and automated global governance.
            </p>

            {/* Role Quick Selector */}
            <div className="mb-6">
              <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#f97316]" /> Quick Access Clearance (One-Click Auto-Fill)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {roles.map((role) => {
                  const isSelected = activeRole === role.id;
                  return (
                    <div
                      key={role.id}
                      onClick={() => handleRoleSelect(role)}
                      onMouseEnter={() => sound.playHover()}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#8C4A32]/30 border-[#f97316] shadow-[0_0_15px_rgba(140,74,50,0.4)]'
                          : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                          {role.name}
                        </span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                          isSelected ? 'bg-[#f97316] text-black' : 'bg-white/10 text-slate-400'
                        }`}>
                          {role.badge}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{role.sub}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Biometric Hologram Pill & Security Telemetry */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <div className="text-xs font-mono text-slate-400">
                <span className="text-white font-bold">256-bit AES-Q</span> Quantum Shield Online
              </div>
            </div>
            <div className="text-xs font-mono text-[#f97316]">
              © 2026 PRIMUS PARTNERS
            </div>
          </div>
        </div>

        {/* RIGHT SECTION: Futuristic Interactive Form */}
        <div className="w-full lg:w-[440px] p-8 md:p-12 bg-[#0a0d14]/90 flex flex-col justify-center relative">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black font-display text-white">Quantum Sign In</h2>
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#f97316]">
                <Cpu className="w-4 h-4 animate-pulse" />
              </div>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Verify your cryptographic credentials to warp into your workspace.
            </p>
          </div>

          {/* Biometric Quick Scan Button */}
          <button
            type="button"
            onClick={handleBiometricAuth}
            disabled={biometricScanning || loading}
            onMouseEnter={() => sound.playHover()}
            className="mb-6 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-white/5 via-[#8C4A32]/20 to-white/5 border border-white/10 hover:border-[#f97316]/50 text-slate-200 text-xs font-mono font-bold flex items-center justify-center gap-2.5 hover:bg-[#8C4A32]/20 transition-all cursor-pointer group shadow-sm"
          >
            <Fingerprint className={`w-4 h-4 text-[#f97316] ${biometricScanning ? 'animate-bounce' : 'group-hover:scale-110'} transition-transform`} />
            {biometricScanning ? 'Scanning Biometric Signature...' : 'Biometric Quick Fill (Auto-Scan)'}
          </button>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs font-mono mb-6 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User ID Field */}
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                User ID / Enterprise Pass
              </label>
              <div className="relative group">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#f97316] transition-colors" />
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter User ID (admin)"
                  className="w-full bg-[#080a0f] border border-white/15 focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] rounded-xl py-3 pl-10 pr-4 text-white text-sm placeholder-slate-600 outline-none transition-all font-mono"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Password Key
                </label>
                <span className="text-[11px] font-mono text-[#f97316] cursor-pointer hover:underline" onClick={() => { setPassword('admin123'); sound.playClick(); }}>
                  Demo: admin123
                </span>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#f97316] transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password (admin123)"
                  className="w-full bg-[#080a0f] border border-white/15 focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] rounded-xl py-3 pl-10 pr-11 text-white text-sm placeholder-slate-600 outline-none transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => { setShowPassword(!showPassword); sound.playClick(); }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Authenticate & Warp Button */}
            <button
              type="submit"
              disabled={loading || isWarping}
              onMouseEnter={() => sound.playHover()}
              className="w-full mt-4 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#8C4A32] via-[#b45309] to-[#f97316] hover:from-[#9d5339] hover:to-[#ea580c] text-white font-display font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-[0_4px_25px_rgba(140,74,50,0.5)] hover:shadow-[0_4px_35px_rgba(249,115,22,0.7)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <span>Validating Cryptographic Signature...</span>
              ) : isWarping ? (
                <span>Initiating Hyperspace Warp...</span>
              ) : (
                <>
                  <span>Warp into Universe</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              Credentials: <span className="text-[#fed7aa] font-bold">admin</span> / <span className="text-[#fed7aa] font-bold">admin123</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Global Telemetry Ticker */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 px-6 py-2.5 bg-black/60 backdrop-blur-md border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400 overflow-x-auto">
        <div className="flex items-center gap-6 whitespace-nowrap">
          <span className="flex items-center gap-1.5"><Globe className="w-3 h-3 text-[#38bdf8]" /> Global Cluster: 7 Active Regions</span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1.5"><Cpu className="w-3 h-3 text-[#f97316]" /> AI Neural Index: 99.4% Operational</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">SOC2 Type II • ISO 27001 Certified Enterprise System</span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[#fed7aa]">
          <Sparkles className="w-3 h-3 text-[#f97316]" /> Primus Partners ERA Hub
        </div>
      </footer>
    </div>
  );
};
