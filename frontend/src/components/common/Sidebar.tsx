import React from 'react';
import { CheckCircle2, ChevronRight, X, Layers, BookOpen } from 'lucide-react';
import { Experiment } from '../../types';

interface SidebarProps {
  experiments: Experiment[];
  selectedExpId: number;
  completedExpIds: number[];
  onSelectExperiment: (id: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  experiments,
  selectedExpId,
  completedExpIds,
  onSelectExperiment,
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-72 bg-[#080d1a] border-r border-slate-800 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
              Experiments (1–16)
            </span>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Experiment List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {experiments.map((exp) => {
            const isSelected = selectedExpId === exp.id;
            const isCompleted = completedExpIds.includes(exp.id);

            return (
              <button
                key={exp.id}
                onClick={() => {
                  onSelectExperiment(exp.id);
                  onClose();
                }}
                className={`w-full p-2.5 rounded-xl text-left flex items-start gap-2.5 transition-all text-xs ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400 font-semibold shadow-sm shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5 ${
                    isCompleted
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : isSelected
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                      : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}
                >
                  {isCompleted ? '✓' : exp.id}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-cyan-400">Week {exp.id}</span>
                    {isCompleted && (
                      <span className="text-[10px] text-emerald-400 font-mono">Done</span>
                    )}
                  </div>
                  <p className="truncate text-slate-300 font-medium mt-0.5">{exp.title}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Meta */}
        <div className="p-3 border-t border-slate-800 bg-[#070b14] text-[10px] text-slate-500 font-mono text-center">
          MRCET R-20 • Deep Learning Lab
        </div>
      </aside>
    </>
  );
};

