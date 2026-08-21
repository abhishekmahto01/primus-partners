import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  LogOut,
  Sparkles,
  Globe,
  Radio,
  Cpu,
  ShieldCheck,
  Zap,
  TrendingUp,
  Activity,
  Layers,
  ArrowRight,
  Clock,
  Compass,
  Command,
  Volume2,
  VolumeX,
  Maximize,
  Briefcase,
  ChevronRight,
  Bell,
  Search,
  CheckCircle2,
  ExternalLink,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CosmicParticleCanvas } from '../components/common/CosmicParticleCanvas';
import { CommandPaletteModal } from '../components/common/CommandPaletteModal';
import { sound } from '../utils/soundEffects';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [timeStr, setTimeStr] = useState('');
  const [activeCity, setActiveCity] = useState('Singapore');
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.isMuted());
  const [selectedUnit, setSelectedUnit] = useState('Universe Unit-02');
  const [activeTab, setActiveTab] = useState('all');

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

  // World Node Hubs
  const worldNodes = [
    { city: 'San Francisco', region: 'Americas', activeStaff: '2,420', latency: '12ms', x: '18%', y: '36%', status: 'Online' },
    { city: 'New York', region: 'Americas', activeStaff: '3,810', latency: '18ms', x: '27%', y: '34%', status: 'Online' },
    { city: 'London', region: 'Europe', activeStaff: '4,150', latency: '24ms', x: '47%', y: '26%', status: 'Online' },
    { city: 'Zurich', region: 'Europe', activeStaff: '1,290', latency: '22ms', x: '51%', y: '30%', status: 'Online' },
    { city: 'Dubai', region: 'Middle East', activeStaff: '1,840', latency: '35ms', x: '62%', y: '42%', status: 'Online' },
    { city: 'Bengaluru', region: 'Asia-Pacific', activeStaff: '5,220', latency: '14ms', x: '69%', y: '48%', status: 'Online' },
    { city: 'Singapore', region: 'Asia-Pacific', activeStaff: '3,480', latency: '9ms', x: '76%', y: '56%', status: 'Active Hub' },
    { city: 'Tokyo', region: 'Asia-Pacific', activeStaff: '2,160', latency: '16ms', x: '84%', y: '36%', status: 'Online' },
    { city: 'Sydney', region: 'Oceania', activeStaff: '1,640', latency: '42ms', x: '88%', y: '78%', status: 'Online' }
  ];

  // Enterprise Universe Launchpads
  const launchpadModules = [
    {
      id: 'hrms',
      title: 'Talent Horizon • HRMS 360',
      tag: 'Core Workspace',
      badge: 'Active & Interactive',
      desc: 'Next-gen employee onboarding pipeline, quantum talent registry, document verification, and asset matrix.',
      icon: Users,
      color: '#8C4A32',
      gradient: 'from-[#8C4A32]/30 via-[#f97316]/20 to-transparent',
      stats: '14,820 Active • 18 Onboarding',
      action: () => navigate('/hrms/onboarding'),
      highlight: true
    },
    {
      id: 'neural',
      title: 'Neural Skills & Attrition AI',
      tag: 'Predictive Intelligence',
      badge: 'v4.2 Neural',
      desc: 'Real-time talent flight risk assessment, autonomous skill synthesis, and AI team architect matching.',
      icon: Cpu,
      color: '#38bdf8',
      gradient: 'from-[#0284c7]/25 via-[#38bdf8]/15 to-transparent',
      stats: '99.4% Accuracy • 42 Insights',
      action: () => navigate('/hrms/module/candidate-pipeline'),
      highlight: false
    },
    {
      id: 'payroll',
      title: 'Quantum Compensation Matrix',
      tag: 'Global Finance',
      badge: 'Multi-Currency',
      desc: 'Real-time multi-sovereignty payroll streaming, equity distribution, and automated tax compliance.',
      icon: Zap,
      color: '#10b981',
      gradient: 'from-[#059669]/25 via-[#10b981]/15 to-transparent',
      stats: '$42.8M Streamed • 0 Errors',
      action: () => navigate('/hrms/module/asset-allocation'),
      highlight: false
    },
    {
      id: 'metaverse',
      title: 'Metaverse Spatial Workspaces',
      tag: 'Spatial Operations',
      badge: 'Spatial 3D',
      desc: 'Virtual executive suites, spatial huddle zones, and persistent holographic collaboration rooms.',
      icon: Globe,
      color: '#a855f7',
      gradient: 'from-[#7e22ce]/25 via-[#a855f7]/15 to-transparent',
      stats: '34 Active Pods • 412 Engaged',
      action: () => navigate('/hrms/module/induction-checklist'),
      highlight: false
    },
    {
      id: 'sentinel',
      title: 'Sentinel Cyber Governance',
      tag: 'Security Vault',
      badge: 'SOC2 • ISO 27001',
      desc: 'Zero-trust privilege monitoring, cryptographic audit trails, and biometric credential custody.',
      icon: ShieldCheck,
      color: '#f59e0b',
      gradient: 'from-[#d97706]/25 via-[#f59e0b]/15 to-transparent',
      stats: 'Zero Breaches • 100% SLA',
      action: () => navigate('/hrms/module/document-verification'),
      highlight: false
    },
    {
      id: 'pulse',
      title: 'Org Pulse & Vibration AI',
      tag: 'Organizational Health',
      badge: 'Live Stream',
      desc: 'Real-time collective sentiment telemetry, team alignment velocity, and burnout prevention radar.',
      icon: Activity,
      color: '#ec4899',
      gradient: 'from-[#be185d]/25 via-[#ec4899]/15 to-transparent',
      stats: '96.2 Index • High Synergy',
      action: () => navigate('/hrms/onboarding'),
      highlight: false
    }
  ];

  // Live Cyber Activity Stream
  const activityLogs = [
    { time: '1m ago', text: 'Dr. Evelyn Vance completed Quantum Document Verification (London Hub)', status: 'success' },
    { time: '4m ago', text: 'Asset Allocation: 4x Apple M4 Max Dispatched to Tokyo AI Lab', status: 'info' },
    { time: '9m ago', text: 'Marcus Brody advanced to "Day-1 Ready" in HRMS Onboarding Pipeline', status: 'success' },
    { time: '14m ago', text: 'Quantum 2FA Audit Cleared for Singapore Executive Cluster', status: 'warning' },
    { time: '22m ago', text: 'Auto-Provisioned YubiKey 5C Titan keys for 8 new engineers', status: 'info' }
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#080a0f] text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* 60FPS Ambient Cosmic Canvas */}
      <CosmicParticleCanvas density={60} accentColor="#8C4A32" secondaryColor="#38bdf8" />

      {/* Global Command Palette Omnibar (Cmd + K) */}
      <CommandPaletteModal isOpen={isCommandOpen} onClose={setIsCommandOpen} />

      {/* TOP UNIVERSE COMMAND NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#0c1017]/85 backdrop-blur-2xl border-b border-white/10 px-4 md:px-8 py-3 flex items-center justify-between shadow-2xl">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3.5">
          <div
            onClick={() => { sound.playClick(); navigate('/dashboard'); }}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8C4A32] to-[#f97316] flex items-center justify-center shadow-[0_0_20px_rgba(140,74,50,0.6)] border border-white/20 cursor-pointer group"
          >
            <span className="font-display font-black text-white text-base tracking-tighter group-hover:scale-110 transition-transform">
              PP
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-white text-base md:text-lg tracking-wider">
                PRIMUS PARTNERS
              </span>
              <span className="text-[10px] font-mono font-bold uppercase bg-[#8C4A32]/30 text-[#f97316] border border-[#8C4A32]/60 px-2 py-0.5 rounded-full shadow-sm">
                ERA UNIVERSE
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400 hidden sm:block">
              Global Enterprise Operations Nexus • Orbit 2026
            </p>
          </div>
        </div>

        {/* Center: Command Palette Trigger */}
        <div className="hidden lg:flex items-center">
          <button
            onClick={() => { sound.playClick(); setIsCommandOpen(true); }}
            className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#f97316]/50 hover:bg-white/10 text-slate-300 text-xs font-mono transition-all cursor-pointer shadow-inner w-72 justify-between group"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-[#f97316]" />
              <span>Search modules or candidates...</span>
            </div>
            <kbd className="px-2 py-0.5 bg-white/10 rounded border border-white/10 text-[10px] text-slate-400 group-hover:text-white">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Actions, Clock & User */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Live UTC World Clock */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-slate-300">
            <Clock className="w-3.5 h-3.5 text-[#f97316]" />
            <span>{timeStr || '12:00:00 AM'}</span>
          </div>

          {/* Unit Switcher */}
          <select
            value={selectedUnit}
            onChange={(e) => { sound.playClick(); setSelectedUnit(e.target.value); }}
            className="bg-black/50 border border-white/15 text-xs font-mono text-[#fed7aa] font-bold py-1.5 px-3 rounded-xl outline-none cursor-pointer hover:border-[#f97316]"
          >
            <option value="Universe Unit-01">Unit-01 (Global HQ)</option>
            <option value="Universe Unit-02">Unit-02 (EMEA & APAC)</option>
            <option value="Universe Unit-03">Unit-03 (Americas Ops)</option>
          </select>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => sound.playHover()}
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-[#f97316]" />}
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={handleFullscreen}
            onMouseEnter={() => sound.playHover()}
            className="hidden sm:flex p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Toggle Fullscreen"
          >
            <Maximize className="w-4 h-4" />
          </button>

          {/* User Profile Chip */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
            <div className="w-7 h-7 rounded-lg bg-[#8C4A32] flex items-center justify-center text-xs font-bold text-white shadow-sm">
              {user?.userId ? user.userId.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-white leading-tight font-display">
                {user?.name || user?.userId || 'Admin Officer'}
              </div>
              <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Clearance: TIER-1
              </div>
            </div>
          </div>

          {/* Logout Action */}
          <button
            onClick={handleLogout}
            onMouseEnter={() => sound.playHover()}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 hover:bg-rose-500/25 text-rose-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            title="Terminate Session"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Exit</span>
          </button>
        </div>
      </header>

      {/* MAIN UNIVERSE COMMAND WORKSPACE */}
      <main className="relative z-10 flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
        {/* HERO BANNER: Universe Status & Telemetry Counters */}
        <div className="relative rounded-3xl bg-[#0f1420]/80 backdrop-blur-2xl border border-white/10 p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#8C4A32]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8C4A32]/20 border border-[#8C4A32]/40 text-[#f97316] text-xs font-mono font-bold tracking-wide uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" /> ERA Central Command Deck
              </div>
              <h1 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight">
                Global Operations Universe
              </h1>
              <p className="text-xs sm:text-sm font-mono text-slate-300 mt-1 max-w-2xl">
                Real-time telemetry across 7 continental nodes • 14,820 personnel online • Autonomous HR pipelines active.
              </p>
            </div>

            {/* Quick Action Trigger to HRMS */}
            <button
              onClick={() => { sound.playClick(); navigate('/hrms/onboarding'); }}
              onMouseEnter={() => sound.playHover()}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#8C4A32] to-[#f97316] hover:from-[#9d5339] hover:to-[#ea580c] text-white font-display font-bold text-sm flex items-center gap-3 shadow-[0_0_30px_rgba(140,74,50,0.6)] transition-all cursor-pointer shrink-0 group"
            >
              <span>Launch Onboarding Galaxy</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 4 Holographic Quantum Metric Tiles */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {/* Metric 1 */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#8C4A32]/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Global Workforce</span>
                <Users className="w-4 h-4 text-[#f97316]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-display text-white">18,420+</div>
              <div className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +14.2% YoY Growth
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#38bdf8]/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">AI Operations Rate</span>
                <Cpu className="w-4 h-4 text-[#38bdf8]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-display text-white">99.8%</div>
              <div className="text-[11px] font-mono text-[#38bdf8] mt-1 flex items-center gap-1">
                <Zap className="w-3 h-3" /> 0.02ms Latency
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Talent Velocity</span>
                <Activity className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-display text-white">4.2 Days</div>
              <div className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 68% Faster Onboarding
              </div>
            </div>

            {/* Metric 4 */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-500/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Quantum Compliance</span>
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-display text-white">100%</div>
              <div className="text-[11px] font-mono text-amber-400 mt-1 flex items-center gap-1">
                <Award className="w-3 h-3" /> ISO 27001 • SOC2
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Global Interactive 3D Node Fleet Map */}
        <div className="rounded-3xl bg-[#0f1420]/80 backdrop-blur-2xl border border-white/10 p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#38bdf8] animate-pulse" />
                <h2 className="text-xl font-bold font-display text-white">Worldwide Telemetry Map</h2>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Interactive real-time node mesh across global centers. Click any node to inspect telemetry.
              </p>
            </div>

            {/* Active City Inspector Pill */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-black/50 border border-white/10 text-xs font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f97316] animate-ping" />
              <span>Inspecting: <strong className="text-white">{activeCity} Hub</strong></span>
            </div>
          </div>

          {/* SVG World Map Canvas with Interactive Nodes */}
          <div className="relative w-full h-[280px] sm:h-[340px] rounded-2xl bg-[#080b12] border border-white/10 overflow-hidden flex items-center justify-center p-4">
            {/* World Grid Matrix Lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

            {/* Stylized World Continent Silhouette SVG */}
            <svg className="w-full h-full opacity-25 text-slate-600" viewBox="0 0 1000 500" fill="currentColor">
              {/* Americas */}
              <path d="M150,120 Q180,100 240,110 Q280,150 250,220 Q220,270 260,330 Q280,390 230,440 Q200,420 180,340 Q160,260 120,200 Z" />
              <path d="M220,60 Q260,40 310,70 Q280,120 230,100 Z" />
              {/* Europe & Africa */}
              <path d="M460,90 Q520,70 540,120 Q500,160 450,150 Z" />
              <path d="M450,180 Q520,170 560,240 Q530,340 480,380 Q430,320 420,240 Z" />
              {/* Asia */}
              <path d="M570,90 Q720,60 820,130 Q860,230 760,280 Q670,270 600,200 Z" />
              {/* Australia */}
              <path d="M780,340 Q860,320 890,380 Q840,430 770,400 Z" />
            </svg>

            {/* Render Pulsing City Nodes */}
            {worldNodes.map((node) => {
              const isSelected = activeCity === node.city;
              return (
                <div
                  key={node.city}
                  onClick={() => { sound.playClick(); setActiveCity(node.city); }}
                  onMouseEnter={() => sound.playHover()}
                  style={{ left: node.x, top: node.y }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                >
                  <div className="relative flex items-center justify-center">
                    <span className={`absolute w-8 h-8 rounded-full ${isSelected ? 'bg-[#f97316]/50 animate-ping' : 'bg-white/10 group-hover:animate-ping'}`} />
                    <span className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow-lg transition-transform ${isSelected ? 'bg-[#f97316] scale-125' : 'bg-[#8C4A32] group-hover:scale-125'}`} />
                  </div>

                  {/* Node Hover Tooltip Card */}
                  <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-xl bg-[#0f1420]/95 border border-white/20 shadow-2xl backdrop-blur-xl pointer-events-none transition-all ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'}`}>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {node.city}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      {node.activeStaff} Staff • {node.latency}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Node Summary Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/10">
            {worldNodes.slice(0, 4).map((node) => (
              <div
                key={node.city}
                onClick={() => { sound.playClick(); setActiveCity(node.city); }}
                className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                  activeCity === node.city
                    ? 'bg-[#8C4A32]/25 border-[#f97316]'
                    : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>{node.city}</span>
                  <span className="text-[10px] font-mono text-emerald-400">{node.latency}</span>
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-0.5">{node.activeStaff} Active</div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: Enterprise Universe Launchpads (6 Interactive Modules) */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#f97316]" />
                <h2 className="text-2xl font-bold font-display text-white">Universe Module Launchpads</h2>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Select an operational workspace to enter its dedicated high-velocity environment.
              </p>
            </div>

            <span className="text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
              6 Modules Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {launchpadModules.map((mod) => {
              const Icon = mod.icon;
              return (
                <motion.div
                  key={mod.id}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => { sound.playClick(); mod.action(); }}
                  onMouseEnter={() => sound.playHover()}
                  className={`relative p-6 rounded-3xl bg-[#0f1420]/80 backdrop-blur-2xl border transition-all cursor-pointer overflow-hidden flex flex-col justify-between group shadow-xl ${
                    mod.highlight
                      ? 'border-[#8C4A32] shadow-[0_10px_35px_rgba(140,74,50,0.3)] ring-1 ring-[#f97316]/50'
                      : 'border-white/10 hover:border-white/25 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                  }`}
                >
                  {/* Glowing ambient background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${mod.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/15 shadow-md group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: `${mod.color}33`, color: mod.color }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-white uppercase tracking-wider">
                        {mod.badge}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1">
                      {mod.tag}
                    </span>
                    <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-[#fed7aa] transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-6">
                      {mod.desc}
                    </p>
                  </div>

                  <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#f97316] font-semibold">
                      {mod.stats}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#8C4A32] border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-white transition-all group-hover:translate-x-1">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* SECTION: Live Cyber Stream & Security Audit Ticker */}
        <div className="rounded-3xl bg-[#0f1420]/80 backdrop-blur-2xl border border-white/10 p-6 md:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <h3 className="text-base font-bold font-display text-white">Live Activity Cyber Stream</h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-400">Quantum Feed Live</span>
          </div>

          <div className="space-y-3">
            {activityLogs.map((log, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors text-xs font-mono"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#f97316]" />
                  <span className="text-slate-200">{log.text}</span>
                </div>
                <span className="text-slate-500 text-[11px] shrink-0 ml-4">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 bg-black/40 px-6 py-4 text-center text-xs font-mono text-slate-500">
        PRIMUS PARTNERS ENTERPRISE ERA PORTAL • v4.9 QUANTUM CORE • ALL RIGHTS RESERVED 2026
      </footer>
    </div>
  );
};
