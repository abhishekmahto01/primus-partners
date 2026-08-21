import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Command,
  UserCheck,
  LayoutDashboard,
  ShieldCheck,
  Cpu,
  Boxes,
  FileCheck,
  Laptop,
  CheckSquare,
  Volume2,
  VolumeX,
  Maximize,
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';

export const CommandPaletteModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [isMuted, setIsMuted] = useState(sound.isMuted());
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        sound.playClick();
        onClose(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const commandItems = [
    {
      id: 'dashboard',
      category: 'Command Hub',
      title: 'Universe Command Center',
      desc: 'Global workforce telemetry and neural ops',
      icon: LayoutDashboard,
      action: () => navigate('/dashboard')
    },
    {
      id: 'onboarding',
      category: 'Talent Horizon',
      title: 'Onboarding Galaxy Pipeline',
      desc: 'Candidate flow, stages, and Day-1 activation',
      icon: UserCheck,
      action: () => navigate('/hrms/onboarding')
    },
    {
      id: 'pipeline',
      category: 'HRMS Modules',
      title: 'Candidate Pipeline Matrix',
      desc: 'Live applicant velocity & funnel tracking',
      icon: Boxes,
      action: () => navigate('/hrms/module/candidate-pipeline')
    },
    {
      id: 'documents',
      category: 'HRMS Modules',
      title: 'Quantum Document Verification',
      desc: 'Laser KYC, biometric credentials, tamper-proof ID',
      icon: FileCheck,
      action: () => navigate('/hrms/module/document-verification')
    },
    {
      id: 'assets',
      category: 'HRMS Modules',
      title: 'Neural Asset Provisioning',
      desc: 'Hardware distribution, cryptographic keys, hardware tokens',
      icon: Laptop,
      action: () => navigate('/hrms/module/asset-allocation')
    },
    {
      id: 'induction',
      category: 'HRMS Modules',
      title: 'Induction & Security Checklist',
      desc: 'Compliance milestones and flight-readiness test',
      icon: CheckSquare,
      action: () => navigate('/hrms/module/induction-checklist')
    },
    {
      id: 'sound',
      category: 'Universe Settings',
      title: isMuted ? 'Unmute Cyber Sound Synthesizer' : 'Mute Cyber Audio',
      desc: 'Toggle synthesized Web Audio feedback',
      icon: isMuted ? VolumeX : Volume2,
      action: () => {
        const nextMuted = sound.toggleMute();
        setIsMuted(nextMuted);
      }
    },
    {
      id: 'fullscreen',
      category: 'Universe Controls',
      title: 'Toggle Fullscreen Mode',
      desc: 'Immersive borderless enterprise view',
      icon: Maximize,
      action: () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      }
    }
  ];

  const filtered = commandItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item) => {
    sound.playClick();
    item.action();
    onClose(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 md:pt-28 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onClose(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-[#0f1420]/95 border border-[#8C4A32]/40 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_30px_rgba(140,74,50,0.25)] overflow-hidden backdrop-blur-2xl z-10"
        >
          {/* Header Search Input */}
          <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
            <Search className="w-5 h-5 text-[#8C4A32]" />
            <input
              type="text"
              autoFocus
              placeholder="Type a command, module name, or candidate..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white text-base placeholder-slate-500 font-sans"
            />
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2 py-1 rounded text-[11px] font-mono text-slate-400">
              <Command className="w-3 h-3" /> K
            </div>
            <button
              onClick={() => onClose(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-white/5">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-slate-400 font-mono text-xs">
                No quantum commands matching "{query}"
              </div>
            ) : (
              filtered.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => sound.playHover()}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#8C4A32]/15 border border-transparent hover:border-[#8C4A32]/30 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-[#8C4A32]/25 border border-white/10 group-hover:border-[#8C4A32]/50 flex items-center justify-center text-slate-300 group-hover:text-[#f97316] transition-colors">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white group-hover:text-[#fed7aa] transition-colors">
                            {item.title}
                          </span>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 group-hover:text-slate-300 line-clamp-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#f97316] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-4 py-2.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-3">
              <span><strong className="text-slate-200">↑↓</strong> Navigate</span>
              <span><strong className="text-slate-200">↵</strong> Execute</span>
              <span><strong className="text-slate-200">ESC</strong> Close</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#f97316]">
              <Sparkles className="w-3 h-3" /> ERA Omnibar v4.0
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
