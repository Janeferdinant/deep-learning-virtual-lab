import React from 'react';
import {
  Cpu,
  Layers,
  Sparkles,
  FileQuestion,
  HelpCircle,
  FileText,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';
import { StudentProgress } from '../../types';

interface HeaderProps {
  activeTab: 'dashboard' | 'experiment' | 'apps' | 'quiz' | 'viva' | 'record';
  onNavigateTab: (tab: 'dashboard' | 'experiment' | 'apps' | 'quiz' | 'viva' | 'record') => void;
  progress: StudentProgress;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onNavigateTab,
  progress,
  onToggleSidebar,
  isSidebarOpen,
}) => {
  const completedCount = progress.completed_experiments.length;
  const progressPercent = Math.round((completedCount / 16) * 100);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Cpu },
    { id: 'experiment', label: 'Experiments 1–16', icon: Layers },
    { id: 'apps', label: 'Real-Time Apps (8)', icon: Sparkles },
    { id: 'quiz', label: 'Quiz Hub (160)', icon: FileQuestion },
    { id: 'viva', label: 'Viva-Voce (320+)', icon: HelpCircle },
    { id: 'record', label: 'Lab Record Export', icon: FileText },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-[#070b14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900"
              title="Toggle Syllabus Navigation"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}

          <div
            onClick={() => onNavigateTab('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm sm:text-base text-slate-100 tracking-tight group-hover:text-cyan-400 transition-colors">
                  Deep Learning Lab
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  R20A6683
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono hidden sm:block">
                MRCET Autonomous • B.Tech IV-I
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigateTab(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Student Progress Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end text-right">
            <span className="text-[10px] text-slate-400 font-mono">Lab Progress</span>
            <span className="text-xs font-mono font-bold text-cyan-400">
              {completedCount}/16 ({progressPercent}%)
            </span>
          </div>

          <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-cyan-400 shrink-0">
            {completedCount}
          </div>
        </div>
      </div>

      {/* Mobile Tab Row */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-slate-800/60 bg-[#070b14]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigateTab(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 transition-all ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{item.label.split(' (')[0]}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};

