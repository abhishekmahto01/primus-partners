import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Search,
  ChevronDown,
  ChevronRight,
  LogOut,
  ArrowLeft,
  UserCheck,
  Save,
  Maximize,
  RefreshCw,
  Clock,
  Sparkles,
  Command,
  Volume2,
  VolumeX,
  Layers,
  FileCheck,
  Laptop,
  CheckSquare,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { CommandPaletteModal } from '../common/CommandPaletteModal';
import { sound } from '../../utils/soundEffects';

export const HRMS_MENU_ITEMS = [
  {
    id: 'onboarding',
    title: 'Onboarding Galaxy',
    icon: UserCheck,
    isPrimary: true,
    badge: 'Active Hub',
    path: '/hrms/onboarding',
    subItems: [
      { id: 'all-pipeline', title: '5-Stage Kanban Board', path: '/hrms/onboarding' },
      { id: 'candidate-pipeline', title: 'Candidate Pipeline', path: '/hrms/module/candidate-pipeline' },
      { id: 'document-verification', title: 'Document Verification', path: '/hrms/module/document-verification' },
      { id: 'asset-allocation', title: 'Asset Allocation Matrix', path: '/hrms/module/asset-allocation' },
      { id: 'induction-checklist', title: 'Induction & Clearance', path: '/hrms/module/induction-checklist' },
    ]
  }
];

export const HrmsLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 1024 : false));
  const [sidebarOpen, setSidebarOpen] = useState(() => (typeof window !== 'undefined' ? window.innerWidth >= 1024 : true));
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMenu, setExpandedMenu] = useState({ onboarding: true });
  const [selectedUnit, setSelectedUnit] = useState('Universe Unit-02');
  const [timeStr, setTimeStr] = useState('');
  const [isSavedNotice, setIsSavedNotice] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.isMuted());

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const toggleMenu = (menuId) => {
    sound.playClick();
    setExpandedMenu((prev) => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const handleNavClick = (path) => {
    sound.playClick();
    navigate(path);
    if (isMobile) setSidebarOpen(false);
  };

  const handleLogout = () => {
    sound.playClick();
    logout();
    navigate('/login');
  };

  const toggleAudio = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  const handleFullscreenToggle = () => {
    sound.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleSaveState = () => {
    sound.playSuccess();
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2200);
  };

  const handleReload = () => {
    sound.playClick();
    window.location.reload();
  };

  const filteredMenuItems = HRMS_MENU_ITEMS.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const matchesTitle = item.title.toLowerCase().includes(query);
    const matchesSub = item.subItems?.some((sub) => sub.title.toLowerCase().includes(query));
    return matchesTitle || matchesSub;
  });

  return (
    <div className="min-h-screen w-full bg-[#080a0f] text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* Global Command Omnibar Modal */}
      <CommandPaletteModal isOpen={isCommandOpen} onClose={setIsCommandOpen} />

      {/* TOP NAVBAR HEADER */}
      <header className="sticky top-0 z-40 bg-[#0c1017]/90 backdrop-blur-2xl border-b border-white/10 px-4 md:px-6 py-2.5 flex items-center justify-between shadow-2xl">
        {/* Left: Sidebar Toggle & Brand Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => { sound.playClick(); setSidebarOpen(!sidebarOpen); }}
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Toggle Menu Panel"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            onClick={() => handleNavClick('/hrms/onboarding')}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#8C4A32]/20 border border-[#8C4A32]/50 hover:bg-[#8C4A32]/30 transition-all cursor-pointer shadow-sm group"
          >
            <span className="font-display font-extrabold text-[#fed7aa] text-sm tracking-tight group-hover:text-white">
              PRIMUS PARTNERS
            </span>
            <span className="text-[10px] font-mono font-bold bg-[#8C4A32] text-white px-2 py-0.5 rounded-md shadow">
              TALENT HORIZON
            </span>
          </div>
        </div>

        {/* Center: Command Palette Trigger */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => { sound.playClick(); setIsCommandOpen(true); }}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#f97316]/50 hover:bg-white/10 text-slate-300 text-xs font-mono transition-all cursor-pointer w-64 justify-between"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-[#f97316]" />
              <span>Omnibar Search...</span>
            </div>
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded border border-white/10 text-[10px] text-slate-400">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Actions, Clock, User & Navigation */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Clock */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-slate-300">
            <Clock className="w-3.5 h-3.5 text-[#f97316]" />
            <span>{timeStr || '12:00:00 AM'}</span>
          </div>

          {/* Unit Selector */}
          <select
            value={selectedUnit}
            onChange={(e) => { sound.playClick(); setSelectedUnit(e.target.value); }}
            className="bg-black/50 border border-white/15 text-xs font-mono text-[#fed7aa] font-bold py-1.5 px-2.5 rounded-xl outline-none cursor-pointer hover:border-[#f97316]"
          >
            <option value="Universe Unit-01">Unit-01 (HQ)</option>
            <option value="Universe Unit-02">Unit-02 (APAC)</option>
            <option value="Universe Unit-03">Unit-03 (EMEA)</option>
          </select>

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={toggleAudio}
            onMouseEnter={() => sound.playHover()}
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-[#f97316]" />}
          </button>

          {/* Return to Command Center Hub */}
          <button
            onClick={() => { sound.playClick(); navigate('/dashboard'); }}
            onMouseEnter={() => sound.playHover()}
            className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Universe Command Center"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#f97316]" />
            <span className="hidden sm:inline">Universe Hub</span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-white/5 border border-white/10">
            <div className="w-6 h-6 rounded-lg bg-[#8C4A32] flex items-center justify-center text-xs font-bold text-white">
              {user?.userId ? user.userId.charAt(0).toUpperCase() : 'A'}
            </div>
            <span className="text-xs font-bold text-white hidden xl:inline font-display">
              {user?.name || user?.userId || 'Admin'}
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            onMouseEnter={() => sound.playHover()}
            className="p-2 rounded-xl bg-rose-500/15 border border-rose-500/30 hover:bg-rose-500/25 text-rose-300 transition-all cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* BODY LAYOUT: SIDEBAR + OUTLET */}
      <div className="flex flex-1 relative w-full overflow-hidden">
        {/* Mobile Backdrop */}
        {isMobile && sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 lg:hidden"
          />
        )}

        {/* SIDEBAR NAVIGATION */}
        <aside
          className={`
            ${isMobile ? 'fixed inset-y-0 left-0 z-40 w-72' : 'relative'}
            ${sidebarOpen ? (isMobile ? 'translate-x-0' : 'w-72') : (isMobile ? '-translate-x-full' : 'w-0')}
            bg-[#0a0d14]/95 backdrop-blur-2xl border-r border-white/10 transition-all duration-300 ease-in-out overflow-hidden flex flex-col shrink-0
          `}
        >
          <div className="w-72 p-4 h-full overflow-y-auto flex flex-col justify-between">
            <div>
              {/* Sidebar Header on Mobile */}
              {isMobile && (
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                  <div className="text-sm font-bold font-display text-[#fed7aa] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#f97316]" /> HRMS Navigation
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Search Menu Input */}
              <div className="relative mb-5">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter HRMS routes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#080a0f] border border-white/10 focus:border-[#f97316] rounded-xl py-2 pl-9 pr-8 text-xs font-mono text-white placeholder-slate-500 outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Menu Categories */}
              <nav className="space-y-1.5">
                {filteredMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isExpanded = expandedMenu[item.id];
                  const isActive = location.pathname.startsWith('/hrms');

                  return (
                    <div key={item.id} className="space-y-1">
                      {/* Main Group Header */}
                      <div
                        onClick={() => toggleMenu(item.id)}
                        className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                          isActive
                            ? 'bg-[#8C4A32]/25 border border-[#8C4A32]/50 text-white shadow-md'
                            : 'bg-white/[0.02] border border-transparent hover:bg-white/[0.05] text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isActive ? 'bg-[#8C4A32] text-white' : 'bg-white/5 text-slate-400'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold font-display block leading-tight">
                              {item.title}
                            </span>
                            <span className="text-[10px] font-mono text-[#f97316]">
                              {item.badge}
                            </span>
                          </div>
                        </div>

                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        )}
                      </div>

                      {/* Sub-menu Route Items */}
                      {isExpanded && item.subItems && (
                        <div className="ml-4 pl-3 border-l border-white/10 space-y-1 pt-1">
                          {item.subItems.map((sub) => {
                            const isSubActive = location.pathname === sub.path;
                            return (
                              <div
                                key={sub.id}
                                onClick={() => handleNavClick(sub.path)}
                                onMouseEnter={() => sound.playHover()}
                                className={`p-2 rounded-xl text-xs font-mono cursor-pointer transition-all flex items-center justify-between ${
                                  isSubActive
                                    ? 'bg-[#8C4A32]/30 border border-[#f97316]/60 text-white font-bold shadow-sm'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                <span>{sub.title}</span>
                                {isSubActive && <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse" />}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Telemetry Card */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 mt-6">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold font-display text-white">Quantum SLA Active</span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 leading-relaxed">
                All candidates encrypted via SHA-256 Quantum Vault.
              </p>
            </div>
          </div>
        </aside>

        {/* MAIN OUTLET CONTAINER */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto flex flex-col w-full max-w-7xl mx-auto">
          {/* Action Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="hover:text-white cursor-pointer" onClick={() => navigate('/dashboard')}>Universe</span>
              <span>/</span>
              <span className="text-[#f97316] font-bold">HRMS Talent Horizon</span>
            </div>

            {/* Toolbar Buttons */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#0c1017]/80 border border-white/10 backdrop-blur-xl shadow-lg">
              {/* Save State Action */}
              <button
                onClick={handleSaveState}
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 text-purple-300 text-xs font-mono font-bold transition-all cursor-pointer"
                title="Save State"
              >
                <Save className="w-3.5 h-3.5 text-purple-400" />
                <span>{isSavedNotice ? 'Saved!' : 'Save'}</span>
              </button>

              {/* Fullscreen Action */}
              <button
                onClick={handleFullscreenToggle}
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold transition-all cursor-pointer"
                title="Toggle Fullscreen"
              >
                <Maximize className="w-3.5 h-3.5 text-emerald-400" />
                <span>Fullscreen</span>
              </button>

              {/* Reload Action */}
              <button
                onClick={handleReload}
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 hover:bg-sky-500/20 text-sky-300 text-xs font-mono font-bold transition-all cursor-pointer"
                title="Reload Route"
              >
                <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
                <span>Reload</span>
              </button>
            </div>
          </div>

          {/* Child Route Outlet Component */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};
