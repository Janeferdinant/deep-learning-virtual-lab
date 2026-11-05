import React from 'react';
import { Briefcase, Building, Cpu, TrendingUp, CheckCircle2 } from 'lucide-react';
import { CaseStudy } from '../../types';

interface CaseStudyCardProps {
  caseStudies: CaseStudy[];
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ caseStudies }) => {
  if (!caseStudies || caseStudies.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-cyan-400" />
        <h4 className="font-semibold text-slate-100 text-sm">
          Industry Deployments & Enterprise Case Studies (Prescribed 2 per experiment)
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {caseStudies.map((cs, idx) => (
          <div
            key={idx}
            className="glass-panel p-5 rounded-2xl flex flex-col justify-between border-t-2 border-t-cyan-500/80 hover:border-cyan-400 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 font-bold">
                  {cs.industry}
                </span>
                <span className="text-xs text-slate-500 font-mono">Case #{idx + 1}</span>
              </div>

              <h5 className="font-bold text-slate-100 text-base mb-2">{cs.title}</h5>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {cs.description}
              </p>

              {/* Architecture specs */}
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 mb-3 space-y-1.5 text-xs font-mono">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Cpu className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-slate-300">Architecture:</span>
                  <span className="text-cyan-300 font-bold">{cs.architecture_used}</span>
                </div>
              </div>
            </div>

            {/* Impact metric */}
            <div className="pt-3 border-t border-slate-800/80 flex items-start gap-2 text-xs text-emerald-400">
              <TrendingUp className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-emerald-300">Measured Business Impact: </span>
                <span className="text-slate-300">{cs.impact_metrics}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

