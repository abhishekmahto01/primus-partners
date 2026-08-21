import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCheck,
  Plus,
  Search,
  CheckCircle2,
  Laptop,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  X,
  Eye,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { sound } from '../../utils/soundEffects';

const INITIAL_CANDIDATES = [
  {
    id: 'CAN-8091',
    name: 'Maya Chen',
    role: 'Principal Engineer',
    dept: 'Engineering',
    stage: 'offer_accepted',
    location: 'Singapore',
    startDate: '2026-09-01',
    avatar: 'MC',
    progress: 25,
    equipment: ['MacBook Pro M4', 'Security Key', 'Monitor 5K'],
    docsVerified: 2,
    docsTotal: 4
  },
  {
    id: 'CAN-8092',
    name: 'Dr. Aris Thorne',
    role: 'Staff Scientist',
    dept: 'Research & AI',
    stage: 'identity_verification',
    location: 'London',
    startDate: '2026-08-28',
    avatar: 'AT',
    progress: 45,
    equipment: ['MacBook Pro M4', 'Security Token'],
    docsVerified: 3,
    docsTotal: 4
  },
  {
    id: 'CAN-8093',
    name: 'Priya Sharma',
    role: 'Lead UX Designer',
    dept: 'Product Design',
    stage: 'identity_verification',
    location: 'Bengaluru',
    startDate: '2026-08-30',
    avatar: 'PS',
    progress: 50,
    equipment: ['MacBook Pro M4', 'Apple Vision Pro'],
    docsVerified: 3,
    docsTotal: 4
  },
  {
    id: 'CAN-8094',
    name: 'Lucas Silva',
    role: 'Systems Architect',
    dept: 'Infrastructure',
    stage: 'asset_provisioning',
    location: 'San Francisco',
    startDate: '2026-08-26',
    avatar: 'LS',
    progress: 70,
    equipment: ['MacBook Pro M4 Max', 'Studio Display'],
    docsVerified: 4,
    docsTotal: 4
  },
  {
    id: 'CAN-8095',
    name: 'Sophia Rossi',
    role: 'Director of Governance',
    dept: 'Legal & Risk',
    stage: 'induction_clearance',
    location: 'Zurich',
    startDate: '2026-08-25',
    avatar: 'SR',
    progress: 85,
    equipment: ['MacBook Pro M4', 'Hardware Key'],
    docsVerified: 4,
    docsTotal: 4
  },
  {
    id: 'CAN-8096',
    name: 'Kai Takahashi',
    role: 'Robotics Lead',
    dept: 'Engineering',
    stage: 'day1_ready',
    location: 'Tokyo',
    startDate: '2026-08-24',
    avatar: 'KT',
    progress: 100,
    equipment: ['MacBook Pro M4 Max', 'Telemetry Kit'],
    docsVerified: 4,
    docsTotal: 4
  }
];

const STAGES = [
  { id: 'offer_accepted', title: 'Offer Accepted', color: '#f59e0b' },
  { id: 'identity_verification', title: 'Document Verification', color: '#38bdf8' },
  { id: 'asset_provisioning', title: 'Asset Allocation', color: '#a855f7' },
  { id: 'induction_clearance', title: 'Induction Checklist', color: '#ec4899' },
  { id: 'day1_ready', title: 'Day-1 Ready', color: '#10b981' }
];

export const OnboardingPage = () => {
  const { themeColor, themeAccent } = useTheme();
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New hire form state
  const [newHire, setNewHire] = useState({
    name: '',
    role: '',
    dept: 'Engineering',
    location: 'Singapore',
    startDate: '2026-09-15'
  });

  const departments = ['All', 'Engineering', 'Research & AI', 'Product Design', 'Infrastructure', 'Legal & Risk'];

  const filteredCandidates = candidates.filter((can) => {
    const matchesQuery =
      can.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      can.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      can.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      can.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || can.dept === selectedDept;
    return matchesQuery && matchesDept;
  });

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
      equipment: ['MacBook Pro M4', 'Security Key'],
      docsVerified: 1,
      docsTotal: 4
    };

    setCandidates([created, ...candidates]);
    setIsAddModalOpen(false);
    setNewHire({ name: '', role: '', dept: 'Engineering', location: 'Singapore', startDate: '2026-09-15' });
  };

  return (
    <div className="flex-1 flex flex-col gap-6 w-full font-sans select-none">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0f1420]/80 backdrop-blur-2xl border border-white/10 shadow-xl">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">Onboarding Pipeline</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track and manage employee lifecycle across onboarding stages.
          </p>
        </div>

        <button
          onClick={() => { sound.playClick(); setIsAddModalOpen(true); }}
          onMouseEnter={() => sound.playHover()}
          style={{
            background: `linear-gradient(135deg, ${themeColor}, ${themeAccent})`,
            boxShadow: `0 0 20px var(--primary-glow)`
          }}
          className="px-5 py-2.5 rounded-2xl text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shrink-0 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add Candidate</span>
        </button>
      </div>

      {/* FILTER & SEARCH TOOLBAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-[#0f1420]/80 backdrop-blur-xl border border-white/10">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search candidate by name, role, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#080a0f] border border-white/10 focus:border-white/40 rounded-xl py-2 pl-10 pr-4 text-xs font-mono text-white placeholder-slate-500 outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => { sound.playClick(); setSelectedDept(dept); }}
              onMouseEnter={() => sound.playHover()}
              style={selectedDept === dept ? { backgroundColor: themeColor } : {}}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedDept === dept
                  ? 'text-white shadow-md'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* 5-STAGE KANBAN PIPELINE */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 items-start overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageCandidates = filteredCandidates.filter((c) => c.stage === stage.id);
          return (
            <div
              key={stage.id}
              className="rounded-3xl bg-[#0f1420]/75 backdrop-blur-2xl border border-white/10 p-4 min-h-[460px] flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Column Header */}
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
                      className="p-3.5 rounded-2xl bg-[#0a0d14]/90 border border-white/10 hover:border-white/30 cursor-pointer transition-all shadow-md group relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-slate-400 font-semibold">{cand.id}</span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                          {cand.progress}%
                        </span>
                      </div>

                      {/* Name & Avatar */}
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-sm"
                          style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeAccent})` }}
                        >
                          {cand.avatar}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white group-hover:text-[#fed7aa] transition-colors leading-tight">
                            {cand.name}
                          </h4>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{cand.role}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-3">
                        <span>{cand.dept}</span>
                        <span>{cand.location}</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
                        <div
                          className="h-full"
                          style={{
                            width: `${cand.progress}%`,
                            background: `linear-gradient(90deg, ${themeColor}, ${themeAccent})`
                          }}
                        />
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setSelectedCandidate(cand); }}
                          className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3 h-3" /> View
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
                              style={{
                                backgroundColor: 'var(--primary-subtle)',
                                borderColor: 'var(--primary-border)'
                              }}
                              className="px-2 py-1 rounded-lg border text-white text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
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
                    <div className="py-12 text-center text-slate-500 text-xs border border-dashed border-white/10 rounded-2xl">
                      No candidates
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CANDIDATE DETAILS MODAL */}
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
              style={{
                borderColor: 'var(--primary-border)',
                boxShadow: `0 25px 90px rgba(0,0,0,0.9), 0 0 40px var(--primary-glow)`
              }}
              className="relative w-full max-w-lg bg-[#0f1420]/95 border rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden z-10"
            >
              <button
                onClick={() => setSelectedCandidate(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-lg shrink-0"
                  style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeAccent})` }}
                >
                  {selectedCandidate.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold font-display text-white">{selectedCandidate.name}</h3>
                    <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-full">
                      {selectedCandidate.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">{selectedCandidate.role}</p>
                  <p className="text-xs text-slate-500">{selectedCandidate.dept} • {selectedCandidate.location}</p>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-xs text-slate-400 block mb-1">Documents</span>
                  <div className="text-base font-bold text-white">
                    {selectedCandidate.docsVerified} of {selectedCandidate.docsTotal} Verified
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-xs text-slate-400 block mb-1">Target Start Date</span>
                  <div className="text-base font-bold text-white">{selectedCandidate.startDate}</div>
                </div>
              </div>

              {/* Hardware */}
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 mb-6">
                <span className="text-xs text-slate-400 block mb-2">Assigned Equipment</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidate.equipment.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center justify-end pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => handleAdvanceStage(selectedCandidate.id)}
                  style={{
                    background: `linear-gradient(135deg, ${themeColor}, ${themeAccent})`,
                    boxShadow: `0 4px 20px var(--primary-glow)`
                  }}
                  className="px-6 py-2.5 rounded-xl text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 shadow-lg"
                >
                  <span>Advance Stage</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD CANDIDATE MODAL */}
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
              style={{ borderColor: 'var(--primary-border)' }}
              className="relative w-full max-w-md bg-[#0f1420]/95 border rounded-3xl p-6 md:p-8 shadow-2xl z-10"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <h3 className="text-xl font-bold font-display text-white">Add New Candidate</h3>
                <p className="text-xs text-slate-400 mt-1">Register incoming team member to pipeline.</p>
              </div>

              <form onSubmit={handleCreateNewHire} className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Liam Vance"
                    value={newHire.name}
                    onChange={(e) => setNewHire({ ...newHire, name: e.target.value })}
                    className="w-full bg-[#080a0f] border border-white/15 focus:border-white/40 rounded-xl p-3 text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Role / Position</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Software Engineer"
                    value={newHire.role}
                    onChange={(e) => setNewHire({ ...newHire, role: e.target.value })}
                    className="w-full bg-[#080a0f] border border-white/15 focus:border-white/40 rounded-xl p-3 text-white text-xs outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Department</label>
                    <select
                      value={newHire.dept}
                      onChange={(e) => setNewHire({ ...newHire, dept: e.target.value })}
                      className="w-full bg-[#080a0f] border border-white/15 focus:border-white/40 rounded-xl p-3 text-white text-xs outline-none cursor-pointer"
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Research & AI">Research & AI</option>
                      <option value="Product Design">Product Design</option>
                      <option value="Infrastructure">Infrastructure</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Location</label>
                    <select
                      value={newHire.location}
                      onChange={(e) => setNewHire({ ...newHire, location: e.target.value })}
                      className="w-full bg-[#080a0f] border border-white/15 focus:border-white/40 rounded-xl p-3 text-white text-xs outline-none cursor-pointer"
                    >
                      <option value="Singapore">Singapore</option>
                      <option value="London">London</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="San Francisco">San Francisco</option>
                      <option value="Tokyo">Tokyo</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    background: `linear-gradient(135deg, ${themeColor}, ${themeAccent})`,
                    boxShadow: `0 4px 20px var(--primary-glow)`
                  }}
                  className="w-full mt-4 py-3 rounded-xl text-white font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg"
                >
                  Create Candidate
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
