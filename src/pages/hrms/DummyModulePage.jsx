import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileCheck,
  Laptop,
  CheckSquare,
  Boxes,
  ShieldCheck,
  Search,
  Plus,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Download,
  Fingerprint,
  Cpu,
  Zap,
  TrendingUp
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';

export const DummyModulePage = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Module Details Dictionary
  const moduleConfigs = {
    'candidate-pipeline': {
      title: 'Candidate Pipeline Matrix',
      category: 'Talent Velocity',
      icon: Boxes,
      color: '#38bdf8',
      desc: 'Real-time global talent recruitment pipeline, applicant telemetry, and AI matching analytics.',
      data: [
        { id: 'APP-101', name: 'Elena Rostova', role: 'Staff Robotics Engineer', status: 'Final Stage', score: '99.2%', date: 'Today' },
        { id: 'APP-102', name: 'Devon Vance', role: 'Quantum Cryptographer', status: 'Technical Review', score: '98.5%', date: 'Yesterday' },
        { id: 'APP-103', name: 'Aaliyah Patel', role: 'Spatial Product Lead', status: 'Executive Sync', score: '97.9%', date: '2d ago' },
        { id: 'APP-104', name: 'Liam O\'Connor', role: 'Neural Infrastructure Eng', status: 'Offer Stage', score: '99.6%', date: '3d ago' }
      ]
    },
    'document-verification': {
      title: 'Quantum Document Verification Hub',
      category: 'Security & KYC',
      icon: FileCheck,
      color: '#f59e0b',
      desc: 'Automated cryptographic KYC validation, biometric credential matching, and tamper-proof archival.',
      data: [
        { id: 'DOC-401', name: 'Dr. Aris Thorne', doc: 'Passport & Holographic Visa', status: 'Verified', confidence: '99.9%', time: '10m ago' },
        { id: 'DOC-402', name: 'Maya Chen', doc: 'Doctorate Degree & Transcripts', status: 'Verified', confidence: '100%', time: '1h ago' },
        { id: 'DOC-403', name: 'Priya Sharma', doc: 'Biometric Fingerprint Token', status: 'Pending Review', confidence: '94.2%', time: '3h ago' },
        { id: 'DOC-404', name: 'Lucas Silva', doc: 'NDA & IP Clearance Agreement', status: 'Verified', confidence: '99.8%', time: '5h ago' }
      ]
    },
    'asset-allocation': {
      title: 'Neural Asset Provisioning Matrix',
      category: 'Hardware & Keys',
      icon: Laptop,
      color: '#a855f7',
      desc: 'Automated dispatch and tracking of enterprise hardware, Apple M4 Max machines, and YubiKey Titan tokens.',
      data: [
        { id: 'AST-801', recipient: 'Maya Chen', asset: 'MacBook Pro M4 Max (64GB)', serial: 'MBP-2026-X99', status: 'Dispatched' },
        { id: 'AST-802', recipient: 'Dr. Aris Thorne', asset: 'YubiKey 5C Titan Cryptographic Token', serial: 'YBK-9912-Q', status: 'Configured' },
        { id: 'AST-803', recipient: 'Priya Sharma', asset: 'Apple Vision Pro Spatial Kit', serial: 'AVP-4401-SP', status: 'Delivered' },
        { id: 'AST-804', recipient: 'Lucas Silva', asset: 'Studio Display 5K Retina + Dock', serial: 'SDP-8821-K', status: 'In Transit' }
      ]
    },
    'induction-checklist': {
      title: 'Induction & Flight-Readiness Checklist',
      category: 'Clearance & Milestones',
      icon: CheckSquare,
      color: '#10b981',
      desc: 'Interactive compliance checkpoints, system clearances, and Day-1 onboarding flight activation.',
      data: [
        { id: 'CHK-01', item: 'Zero-Trust Quantum Security Induction', mandatory: 'Required', completion: '100%', status: 'Cleared' },
        { id: 'CHK-02', item: 'Global Corporate Governance & Compliance', mandatory: 'Required', completion: '100%', status: 'Cleared' },
        { id: 'CHK-03', item: 'Neural AI Tools & IDE Environment Setup', mandatory: 'Technical', completion: '85%', status: 'In Progress' },
        { id: 'CHK-04', item: 'Executive 1-on-1 Strategy Briefing', mandatory: 'Leadership', completion: '100%', status: 'Cleared' }
      ]
    }
  };

  const currentModule = moduleConfigs[moduleId] || {
    title: `${moduleId?.replace('-', ' ').toUpperCase()} WORKSPACE`,
    category: 'Enterprise Module',
    icon: Sparkles,
    color: '#8C4A32',
    desc: 'Unified enterprise workspace environment with live real-time synchronization.',
    data: []
  };

  const Icon = currentModule.icon;

  return (
    <div className="flex-1 flex flex-col gap-6 w-full font-sans select-none">
      {/* HEADER BANNER */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#0f1420]/80 backdrop-blur-2xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-30"
          style={{ backgroundColor: currentModule.color }}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/20 shadow-lg shrink-0"
              style={{ backgroundColor: `${currentModule.color}25`, color: currentModule.color }}
            >
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#f97316]" /> {currentModule.category}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
                {currentModule.title}
              </h1>
              <p className="text-xs sm:text-sm font-mono text-slate-300 mt-1 max-w-2xl">
                {currentModule.desc}
              </p>
            </div>
          </div>

          <button
            onClick={() => { sound.playClick(); navigate('/hrms/onboarding'); }}
            onMouseEnter={() => sound.playHover()}
            className="px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <span>Back to Kanban Board</span>
            <ArrowRight className="w-4 h-4 text-[#f97316]" />
          </button>
        </div>
      </div>

      {/* DATA & TELEMETRY SUITE */}
      <div className="p-6 rounded-3xl bg-[#0f1420]/80 backdrop-blur-2xl border border-white/10 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search records in this module..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#080a0f] border border-white/10 focus:border-[#f97316] rounded-xl py-2 pl-10 pr-4 text-xs font-mono text-white placeholder-slate-500 outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => sound.playSuccess()}
              className="px-4 py-2 rounded-xl bg-[#8C4A32] hover:bg-[#9d5339] text-white text-xs font-mono font-bold flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Download className="w-3.5 h-3.5" /> Export Telemetry Report
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-3 font-bold uppercase tracking-wider">Record ID</th>
                <th className="pb-3 font-bold uppercase tracking-wider">Subject / Item</th>
                <th className="pb-3 font-bold uppercase tracking-wider">Metric / Key</th>
                <th className="pb-3 font-bold uppercase tracking-wider">Operational Status</th>
                <th className="pb-3 font-bold uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {currentModule.data.map((row, idx) => (
                <tr
                  key={idx}
                  onMouseEnter={() => sound.playHover()}
                  className="hover:bg-white/[0.03] transition-colors"
                >
                  <td className="py-4 text-[#f97316] font-bold">{row.id}</td>
                  <td className="py-4 text-white font-bold font-sans">
                    {row.name || row.recipient || row.item}
                    <div className="text-[11px] text-slate-400 font-mono font-normal">
                      {row.role || row.doc || row.asset || row.mandatory}
                    </div>
                  </td>
                  <td className="py-4 text-slate-300">
                    {row.score || row.confidence || row.serial || row.completion}
                  </td>
                  <td className="py-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => sound.playClick()}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#8C4A32] text-slate-300 hover:text-white transition-all cursor-pointer text-[11px]"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
