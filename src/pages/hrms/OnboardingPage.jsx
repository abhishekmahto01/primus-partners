import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCheck,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Laptop,
  ShieldCheck,
  FileCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Eye,
  AlertCircle,
  QrCode,
  Fingerprint,
  Zap,
  TrendingUp,
  Award,
  ChevronRight
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';

const INITIAL_CANDIDATES = [
  {
    id: 'CAN-8091',
    name: 'Maya Chen',
    role: 'Principal Quantum Engineer',
    dept: 'Quantum Labs',
    stage: 'offer_accepted',
    location: 'Singapore Hub',
    startDate: '2026-09-01',
    avatar: 'MC',
    progress: 25,
    risk: 'Low',
    equipment: ['MacBook M4 Max', 'Quantum YubiKey', 'Spatial Vision Pro'],
    skillsScore: '99.4%',
    docsVerified: 2,
    docsTotal: 4
  },
  {
    id: 'CAN-8092',
    name: 'Dr. Aris Thorne',
    role: 'Staff AI Alignment Scientist',
    dept: 'Neural AI',
    stage: 'identity_verification',
    location: 'London Hub',
    startDate: '2026-08-28',
    avatar: 'AT',
    progress: 45,
    risk: 'Low',
    equipment: ['MacBook M4 Max', 'Titan Key', 'Neural Headset'],
    skillsScore: '98.8%',
    docsVerified: 3,
    docsTotal: 4
  },
  {
    id: 'CAN-8093',
    name: 'Priya Sharma',
    role: 'Lead Spatial UX Designer',
    dept: 'Design Systems',
    stage: 'identity_verification',
    location: 'Bengaluru Hub',
    startDate: '2026-08-30',
    avatar: 'PS',
    progress: 50,
    risk: 'Low',
    equipment: ['MacBook Pro M4', 'Apple Vision Pro', 'YubiKey 5C'],
    skillsScore: '97.5%',
    docsVerified: 3,
    docsTotal: 4
  },
  {
    id: 'CAN-8094',
    name: 'Lucas Silva',
    role: 'Distributed Systems Architect',
    dept: 'Infrastructure',
    stage: 'asset_provisioning',
    location: 'San Francisco Hub',
    startDate: '2026-08-26',
    avatar: 'LS',
    progress: 70,
    risk: 'Low',
    equipment: ['MacBook M4 Max', 'Dual 5K Displays', 'Hardware Titan Key'],
    skillsScore: '98.2%',
    docsVerified: 4,
    docsTotal: 4
  },
  {
    id: 'CAN-8095',
    name: 'Sophia Rossi',
    role: 'Director of Global Governance',
    dept: 'Legal & Risk',
    stage: 'induction_clearance',
    location: 'Zurich Hub',
    startDate: '2026-08-25',
    avatar: 'SR',
    progress: 85,
    risk: 'Low',
    equipment: ['MacBook Pro M4', 'Quantum Hardware Token'],
    skillsScore: '99.1%',
    docsVerified: 4,
    docsTotal: 4
  },
  {
    id: 'CAN-8096',
    name: 'Kai Takahashi',
    role: 'Autonomous Robotics Lead',
    dept: 'Robotics Core',
    stage: 'day1_ready',
    location: 'Tokyo Hub',
    startDate: '2026-08-24',
    avatar: 'KT',
    progress: 100,
    risk: 'Low',
    equipment: ['MacBook M4 Max', 'Robotics Telemetry Rig', 'YubiKey Titan'],
    skillsScore: '99.9%',
    docsVerified: 4,
    docsTotal: 4
  }
];

const STAGES = [
  { id: 'offer_accepted', title: 'Offer Accepted', color: '#f59e0b', tag: 'Pre-Board' },
  { id: 'identity_verification', title: 'Quantum KYC & ID', color: '#38bdf8', tag: 'Verification' },
  { id: 'asset_provisioning', title: 'Asset Provisioning', color: '#a855f7', tag: 'Hardware' },
  { id: 'induction_clearance', title: 'Induction & Clearance', color: '#ec4899', tag: 'Security' },
  { id: 'day1_ready', title: 'Day-1 Flight Ready', color: '#10b981', tag: 'Active' }
];

export const OnboardingPage = () => {
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [scanningDoc, setScanningDoc] = useState(false);

  // New hire form state
  const [newHire, setNewHire] = useState({
    name: '',
    role: '',
    dept: 'Neural AI',
    location: 'Singapore Hub',
    startDate: '2026-09-15'
  });

  const departments = ['All', 'Neural AI', 'Quantum Labs', 'Design Systems', 'Infrastructure', 'Legal & Risk', 'Robotics Core'];

  const filteredCandidates = candidates.filter((can) => {
    const matchesQuery =
      can.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      can.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      can.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      can.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || can.dept === selectedDept;
    return matchesQuery && matchesDept;
  });

  // Stage Advancement Handler
  const handleAdvanceStage = (candId, e) => {
    if (e) e.stopPropagation();
    sound.playSuccess();
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === candId) {
          const currentIndex = STAGES.findIndex((s) => s.id === c.stage);
          if (currentIndex < STAGES.length - 1) {
            const nextStage = STAGES[currentIndex + 1].id;
            const nextProgress = Math.min(100, Math.round(((currentIndex + 2) / STAGES.length) * 100));
            return { ...c, stage: nextStage, progress: nextProgress };
          }
        }
        return c;
      })
    );
    if (selectedCandidate && selectedCandidate.id === candId) {
      setSelectedCandidate((prev) => {
        const currentIndex = STAGES.findIndex((s) => s.id === prev.stage);
        if (currentIndex < STAGES.length - 1) {
          const nextStage = STAGES[currentIndex + 1].id;
          const nextProgress = Math.min(100, Math.round(((currentIndex + 2) / STAGES.length) * 100));
          return { ...prev, stage: nextStage, progress: nextProgress };
        }
        return prev;
      });
    }
  };

  // Revert Stage Handler
  const handleRevertStage = (candId, e) => {
    if (e) e.stopPropagation();
    sound.playClick();
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === candId) {
          const currentIndex = STAGES.findIndex((s) => s.id === c.stage);
          if (currentIndex > 0) {
            const prevStage = STAGES[currentIndex - 1].id;
            const prevProgress = Math.round((currentIndex / STAGES.length) * 100);
            return { ...c, stage: prevStage, progress: prevProgress };
          }
        }
        return c;
      })
    );
  };

  // Add New Hire Handler
  const handleCreateNewHire = (e) => {
    e.preventDefault();
    if (!newHire.name.trim() || !newHire.role.trim()) return;

    sound.playSuccess();
    const initials = newHire.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const created = {
      id: `CAN-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newHire.name,
      role: newHire.role,
      dept: newHire.dept,
      stage: 'offer_accepted',
      location: newHire.location,
      startDate: newHire.startDate,
      avatar: initials || 'NH',
      progress: 20,
      risk: 'Low',
      equipment: ['MacBook M4 Max', 'Quantum Titan Key'],
      skillsScore: '98.5%',
      docsVerified: 1,
      docsTotal: 4
    };

    setCandidates([created, ...candidates]);
    setIsAddModalOpen(false);
    setNewHire({ name: '', role: '', dept: 'Neural AI', location: 'Singapore Hub', startDate: '2026-09-15' });
  };

  // Laser Document Scanner Simulation
  const handleTriggerDocScan = () => {
    sound.playScan();
    setScanningDoc(true);
    setTimeout(() => {
      setScanningDoc(false);
      sound.playSuccess();
      if (selectedCandidate) {
        setSelectedCandidate((prev) => ({
          ...prev,
          docsVerified: prev.docsTotal
        }));
      }
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col gap-6 w-full font-sans select-none">
      {/* HEADER HERO BANNER */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#0f1420]/80 backdrop-blur-2xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#8C4A32]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8C4A32]/20 border border-[#8C4A32]/40 text-[#f97316] text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> High-Velocity Onboarding Universe
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
              Onboarding Galaxy & Pipeline Board
            </h1>
            <p className="text-xs sm:text-sm font-mono text-slate-300 mt-1">
              Interactive 5-stage candidate lifecycle orchestration with real-time biometric & asset telemetry.
            </p>
          </div>

          {/* New Hire Wizard Trigger */}
          <button
            onClick={() => { sound.playClick(); setIsAddModalOpen(true); }}
            onMouseEnter={() => sound.playHover()}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#8C4A32] to-[#f97316] hover:from-[#9d5339] hover:to-[#ea580c] text-white font-display font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(140,74,50,0.6)] transition-all cursor-pointer shrink-0 group"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            <span>Add Incoming Personnel</span>
          </button>
        </div>

        {/* 4 Live Onboarding Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 relative z-10">
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Active In Pipeline</span>
            <div className="text-xl sm:text-2xl font-black font-display text-white mt-0.5">{candidates.length} Personnel</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Day-1 Ready</span>
            <div className="text-xl sm:text-2xl font-black font-display text-emerald-400 mt-0.5">
              {candidates.filter((c) => c.stage === 'day1_ready').length} Cleared
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Avg Onboard Time</span>
            <div className="text-xl sm:text-2xl font-black font-display text-[#38bdf8] mt-0.5">4.2 Days</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-[10px] font-mono text-slate-400 uppercase">KYC Verification Rate</span>
            <div className="text-xl sm:text-2xl font-black font-display text-[#f97316] mt-0.5">100% SLA</div>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH TOOLBAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-[#0f1420]/80 backdrop-blur-xl border border-white/10">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search candidate by name, role, ID, or hub..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#080a0f] border border-white/10 focus:border-[#f97316] rounded-xl py-2 pl-10 pr-4 text-xs font-mono text-white placeholder-slate-500 outline-none transition-colors"
          />
        </div>

        {/* Department Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {departments.slice(0, 5).map((dept) => (
            <button
              key={dept}
              onClick={() => { sound.playClick(); setSelectedDept(dept); }}
              onMouseEnter={() => sound.playHover()}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedDept === dept
                  ? 'bg-[#8C4A32] text-white shadow-md'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* 5-STAGE INTERACTIVE KANBAN PIPELINE */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 items-start overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageCandidates = filteredCandidates.filter((c) => c.stage === stage.id);
          return (
            <div
              key={stage.id}
              className="rounded-3xl bg-[#0f1420]/75 backdrop-blur-2xl border border-white/10 p-4 min-h-[500px] flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Stage Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
                    <span className="text-xs font-bold font-display text-white">{stage.title}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                    {stageCandidates.length}
                  </span>
                </div>

                {/* Candidate Cards List */}
                <div className="space-y-3">
                  {stageCandidates.map((cand) => (
                    <motion.div
                      key={cand.id}
                      whileHover={{ y: -3 }}
                      onClick={() => { sound.playClick(); setSelectedCandidate(cand); }}
                      onMouseEnter={() => sound.playHover()}
                      className="p-3.5 rounded-2xl bg-[#0a0d14]/90 border border-white/10 hover:border-[#8C4A32]/60 cursor-pointer transition-all shadow-md group relative overflow-hidden"
                    >
                      {/* Top Bar of Card */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-[#f97316] font-bold">{cand.id}</span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                          {cand.skillsScore} Match
                        </span>
                      </div>

                      {/* Name & Avatar */}
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8C4A32] to-[#f97316] flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-sm">
                          {cand.avatar}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold font-display text-white group-hover:text-[#fed7aa] transition-colors leading-tight">
                            {cand.name}
                          </h4>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{cand.role}</p>
                        </div>
                      </div>

                      {/* Location & Dept */}
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-3">
                        <span>{cand.dept}</span>
                        <span>{cand.location}</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
                        <div
                          className="h-full bg-gradient-to-r from-[#8C4A32] to-[#f97316]"
                          style={{ width: `${cand.progress}%` }}
                        />
                      </div>

                      {/* Card Action Controls */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setSelectedCandidate(cand); }}
                          className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3 h-3" /> Dossier
                        </button>

                        <div className="flex items-center gap-1">
                          {stage.id !== 'offer_accepted' && (
                            <button
                              type="button"
                              onClick={(e) => handleRevertStage(cand.id, e)}
                              className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
                              title="Previous Stage"
                            >
                              <ArrowLeft className="w-3 h-3" />
                            </button>
                          )}
                          {stage.id !== 'day1_ready' && (
                            <button
                              type="button"
                              onClick={(e) => handleAdvanceStage(cand.id, e)}
                              className="px-2 py-1 rounded-lg bg-[#8C4A32]/30 hover:bg-[#8C4A32] border border-[#8C4A32]/60 text-white text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors"
                              title="Advance Stage"
                            >
                              <span>Next</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {stageCandidates.length === 0 && (
                    <div className="py-12 text-center text-slate-500 font-mono text-xs border border-dashed border-white/10 rounded-2xl">
                      No candidates in this stage
                    </div>
                  )}
                </div>
              </div>

              {/* Stage Footer Tag */}
              <div className="text-center pt-3 mt-3 border-t border-white/5 text-[10px] font-mono text-slate-500">
                Stage SLA: 24-48 hrs
              </div>
            </div>
          );
        })}
      </div>

      {/* HOLOGRAPHIC CANDIDATE DOSSIER 3D MODAL */}
      <AnimatePresence>
        {selectedCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCandidate(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0f1420]/95 border border-[#8C4A32]/50 rounded-3xl p-6 md:p-8 shadow-[0_25px_90px_rgba(0,0,0,0.9),0_0_40px_rgba(140,74,50,0.3)] overflow-hidden z-10"
            >
              {/* Laser Scanning Line on top */}
              {scanningDoc && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f97316]/30 to-transparent h-20 w-full animate-scanline pointer-events-none z-30" />
              )}

              {/* Close Button */}
              <button
                onClick={() => setSelectedCandidate(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Dossier Bar */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#8C4A32] to-[#f97316] flex items-center justify-center text-xl font-bold text-white shadow-lg shrink-0">
                  {selectedCandidate.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold font-display text-white">{selectedCandidate.name}</h3>
                    <span className="text-[10px] font-mono font-bold bg-[#8C4A32]/30 text-[#f97316] border border-[#8C4A32]/50 px-2 py-0.5 rounded-full">
                      {selectedCandidate.id}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-300 mt-0.5">{selectedCandidate.role}</p>
                  <p className="text-xs font-mono text-slate-500">{selectedCandidate.dept} • {selectedCandidate.location}</p>
                </div>
              </div>

              {/* Dossier Tabs & Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Quantum Skills Radar */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-slate-400">Neural Skills Index</span>
                    <Sparkles className="w-4 h-4 text-[#f97316]" />
                  </div>
                  <div className="text-2xl font-black font-display text-white">{selectedCandidate.skillsScore}</div>
                  <p className="text-[11px] font-mono text-emerald-400 mt-1">✓ Verified by Neural AI Matcher</p>
                </div>

                {/* KYC & Identity Status */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-slate-400">Quantum Identity Status</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black font-display text-white">
                    {selectedCandidate.docsVerified} / {selectedCandidate.docsTotal} Docs
                  </div>
                  <p className="text-[11px] font-mono text-slate-400 mt-1">Biometric & Passport Match</p>
                </div>
              </div>

              {/* Hardware Asset Distribution Matrix */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-6">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Laptop className="w-4 h-4 text-[#38bdf8]" /> Assigned Hardware & Quantum Keys
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.equipment.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-200 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Toolbar */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 gap-3">
                <button
                  type="button"
                  onClick={handleTriggerDocScan}
                  disabled={scanningDoc}
                  className="px-4 py-2.5 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-mono font-bold hover:bg-sky-500/25 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Fingerprint className="w-4 h-4" />
                  {scanningDoc ? 'Scanning Holographic KYC...' : 'Laser Verify Documents'}
                </button>

                <button
                  type="button"
                  onClick={() => handleAdvanceStage(selectedCandidate.id)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8C4A32] to-[#f97316] text-white text-xs font-display font-bold hover:from-[#9d5339] hover:to-[#ea580c] transition-all cursor-pointer flex items-center gap-2 shadow-lg"
                >
                  <span>Advance to Next Stage</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD NEW HIRE MODAL */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0f1420]/95 border border-[#8C4A32]/50 rounded-3xl p-6 md:p-8 shadow-2xl z-10"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <h3 className="text-xl font-bold font-display text-white">Register Incoming Personnel</h3>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  Add new talent to the automated onboarding pipeline.
                </p>
              </div>

              <form onSubmit={handleCreateNewHire} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Liam Vance"
                    value={newHire.name}
                    onChange={(e) => setNewHire({ ...newHire, name: e.target.value })}
                    className="w-full bg-[#080a0f] border border-white/15 focus:border-[#f97316] rounded-xl p-3 text-white text-xs font-mono outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">Role / Position</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior AI Architect"
                    value={newHire.role}
                    onChange={(e) => setNewHire({ ...newHire, role: e.target.value })}
                    className="w-full bg-[#080a0f] border border-white/15 focus:border-[#f97316] rounded-xl p-3 text-white text-xs font-mono outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">Department</label>
                    <select
                      value={newHire.dept}
                      onChange={(e) => setNewHire({ ...newHire, dept: e.target.value })}
                      className="w-full bg-[#080a0f] border border-white/15 focus:border-[#f97316] rounded-xl p-3 text-white text-xs font-mono outline-none cursor-pointer"
                    >
                      <option value="Neural AI">Neural AI</option>
                      <option value="Quantum Labs">Quantum Labs</option>
                      <option value="Design Systems">Design Systems</option>
                      <option value="Infrastructure">Infrastructure</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">Primary Hub</label>
                    <select
                      value={newHire.location}
                      onChange={(e) => setNewHire({ ...newHire, location: e.target.value })}
                      className="w-full bg-[#080a0f] border border-white/15 focus:border-[#f97316] rounded-xl p-3 text-white text-xs font-mono outline-none cursor-pointer"
                    >
                      <option value="Singapore Hub">Singapore Hub</option>
                      <option value="London Hub">London Hub</option>
                      <option value="Bengaluru Hub">Bengaluru Hub</option>
                      <option value="San Francisco Hub">San Francisco Hub</option>
                      <option value="Tokyo Hub">Tokyo Hub</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-[#8C4A32] to-[#f97316] text-white font-display font-bold text-xs uppercase tracking-wider hover:from-[#9d5339] hover:to-[#ea580c] transition-all cursor-pointer shadow-lg"
                >
                  Initiate Onboarding Workflow
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
