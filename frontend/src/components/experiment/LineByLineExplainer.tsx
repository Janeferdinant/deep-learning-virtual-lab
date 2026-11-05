import React, { useState } from 'react';
import { BookOpen, CheckCircle, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';

interface LineExplanation {
  line_number: number;
  code_snippet: string;
  explanation: string;
  concept_tag?: string;
}

interface LineByLineExplainerProps {
  explanations: LineExplanation[];
}

export const LineByLineExplainer: React.FC<LineByLineExplainerProps> = ({ explanations }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  if (!explanations || explanations.length === 0) {
    return (
      <div className="glass-panel p-6 rounded-2xl text-center text-xs text-slate-500">
        Detailed line-by-line explanation is being prepared for this experiment.
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 rounded-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <h4 className="font-semibold text-slate-100 text-sm">Line-by-Line Code Breakdown & Pedagogical Analysis</h4>
        </div>
        <span className="text-xs font-mono text-cyan-400">
          {explanations.length} Annotated Steps
        </span>
      </div>

      <div className="space-y-2.5">
        {explanations.map((item, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-xl border transition-all ${
                isExpanded
                  ? 'bg-slate-900/90 border-cyan-500/40 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className="w-full p-3.5 flex items-center justify-between text-left gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {item.line_number}
                  </span>
                  <code className="text-xs font-mono text-slate-200 line-clamp-1">
                    {item.code_snippet}
                  </code>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.concept_tag && (
                    <span className="hidden sm:inline text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {item.concept_tag}
                    </span>
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 space-y-3 border-t border-slate-800/60">
                  <div className="p-2.5 rounded-lg bg-black/60 font-mono text-xs text-cyan-300 border border-slate-900 overflow-x-auto">
                    {item.code_snippet}
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>{item.explanation}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

