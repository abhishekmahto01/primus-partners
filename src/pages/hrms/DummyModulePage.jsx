import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileCheck,
  Laptop,
  CheckSquare,
  Boxes,
  Search,
  ArrowRight,
  Sparkles,
  Download
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';

export const DummyModulePage = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const moduleConfigs = {
    'candidate-pipeline': {
      title: 'Candidate Pipeline',
      category: 'Recruitment',
      icon: Boxes,
      color: '#38bdf8',
      desc: 'Track applicants across interview stages and hiring milestones.',
      data: [
        { id: 'APP-101', name: 'Elena Rostova', role: 'Staff Engineer', status: 'Final Stage', score: '99%', date: 'Today' },
        { id: 'APP-102', name: 'Devon Vance', role: 'Security Analyst', status: 'Technical Review', score: '98%', date: 'Yesterday' },
        { id: 'APP-103', name: 'Aaliyah Patel', role: 'Product Lead', status: 'Executive Review', score: '97%', date: '2d ago' },
        { id: 'APP-104', name: 'Liam O\'Connor', role: 'Infrastructure Engineer', status: 'Offer Extended', score: '99%', date: '3d ago' }
      ]
    },
    'document-verification': {
      title: 'Document Verification',
      category: 'Compliance',
      icon: FileCheck,
      color: '#f59e0b',
      desc: 'Verify and manage employee identity documents and KYC verification status.',
      data: [
        { id: 'DOC-401', name: 'Dr. Aris Thorne', doc: 'Passport & Visa', status: 'Verified', confidence: '100%', time: '10m ago' },
        { id: 'DOC-402', name: 'Maya Chen', doc: 'Degree Certificate', status: 'Verified', confidence: '100%', time: '1h ago' },
        { id: 'DOC-403', name: 'Priya Sharma', doc: 'Identity Proof', status: 'Pending', confidence: '95%', time: '3h ago' },
        { id: 'DOC-404', name: 'Lucas Silva', doc: 'Employment Agreement', status: 'Verified', confidence: '100%', time: '5h ago' }
      ]
    },
    'asset-allocation': {
      title: 'Asset Allocation',
      category: 'IT & Hardware',
      icon: Laptop,
      color: '#a855f7',
      desc: 'Track equipment, hardware, and IT assets assigned to employees.',
      data: [
        { id: 'AST-801', recipient: 'Maya Chen', asset: 'MacBook Pro M4 (64GB)', serial: 'MBP-2026-X99', status: 'Dispatched' },
        { id: 'AST-802', recipient: 'Dr. Aris Thorne', asset: 'Security Hardware Token', serial: 'SEC-9912-Q', status: 'Delivered' },
        { id: 'AST-803', recipient: 'Priya Sharma', asset: 'Design Tablet & Display', serial: 'DSP-4401-SP', status: 'Delivered' },
        { id: 'AST-804', recipient: 'Lucas Silva', asset: 'Monitor 5K + Dock', serial: 'MON-8821-K', status: 'In Transit' }
      ]
    },
    'induction-checklist': {
      title: 'Induction Checklist',
      category: 'Onboarding Tasks',
      icon: CheckSquare,
      color: '#10b981',
      desc: 'Review compliance tasks, security setup, and onboarding checklists.',
      data: [
        { id: 'CHK-01', item: 'Corporate Security Induction', mandatory: 'Required', completion: '100%', status: 'Completed' },
        { id: 'CHK-02', item: 'Company Policy & Governance', mandatory: 'Required', completion: '100%', status: 'Completed' },
        { id: 'CHK-03', item: 'Development Environment Setup', mandatory: 'Technical', completion: '85%', status: 'In Progress' },
        { id: 'CHK-04', item: 'Manager 1-on-1 Briefing', mandatory: 'Leadership', completion: '100%', status: 'Completed' }
      ]
    }
  };

  const currentModule = moduleConfigs[moduleId] || {
    title: `${moduleId?.replace('-', ' ').toUpperCase()}`,
    category: 'HRMS Module',
    icon: Sparkles,
    color: '#8C4A32',
    desc: 'Manage and review records for this section.',
    data: []
  };

  const Icon = currentModule.icon;

  return (
    <div className="flex-1 flex flex-col gap-6 w-full font-sans select-none">
      {/* HEADER */}
      <div className="p-6 rounded-3xl bg-[#0f1420]/80 backdrop-blur-2xl border border-white/10 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 shrink-0 shadow-md"
            style={{ backgroundColor: `${currentModule.color}20`, color: currentModule.color }}
          >
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-display text-white">{currentModule.title}</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{currentModule.desc}</p>
          </div>
        </div>

        <button
          onClick={() => { sound.playClick(); navigate('/hrms/onboarding'); }}
          onMouseEnter={() => sound.playHover()}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shrink-0"
        >
          <span>Back to Pipeline</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* TABLE */}
      <div className="p-6 rounded-3xl bg-[#0f1420]/80 backdrop-blur-2xl border border-white/10 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search records..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#080a0f] border border-white/10 focus:border-white/40 rounded-xl py-2 pl-10 pr-4 text-xs font-mono text-white placeholder-slate-500 outline-none"
            />
          </div>

          <button
            onClick={() => sound.playSuccess()}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Export Data
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-3 font-semibold uppercase">ID</th>
                <th className="pb-3 font-semibold uppercase">Name / Item</th>
                <th className="pb-3 font-semibold uppercase">Details</th>
                <th className="pb-3 font-semibold uppercase">Status</th>
                <th className="pb-3 font-semibold uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {currentModule.data.map((row, idx) => (
                <tr
                  key={idx}
                  onMouseEnter={() => sound.playHover()}
                  className="hover:bg-white/[0.03] transition-colors"
                >
                  <td className="py-3.5 text-slate-300 font-semibold">{row.id}</td>
                  <td className="py-3.5 text-white font-semibold font-sans">
                    {row.name || row.recipient || row.item}
                    <div className="text-[11px] text-slate-400 font-mono font-normal">
                      {row.role || row.doc || row.asset || row.mandatory}
                    </div>
                  </td>
                  <td className="py-3.5 text-slate-400">
                    {row.score || row.confidence || row.serial || row.completion}
                  </td>
                  <td className="py-3.5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => sound.playClick()}
                      className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer text-xs"
                    >
                      View
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
