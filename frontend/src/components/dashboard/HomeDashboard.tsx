import React from 'react';
import {
  BookOpen,
  Award,
  CheckCircle2,
  Cpu,
  ArrowRight,
  TrendingUp,
  Sparkles,
  FileText,
  Clock,
  Layers,
  ExternalLink
} from 'lucide-react';
import { Experiment, StudentProgress } from '../../types';

interface HomeDashboardProps {
  experiments: Experiment[];
  progress: StudentProgress;
  onSelectExperiment: (id: number) => void;
  onNavigateTab: (tab: 'dashboard' | 'experiment' | 'apps' | 'quiz' | 'viva' | 'record') => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  experiments,
  progress,
  onSelectExperiment,
  onNavigateTab,
}) => {
  const completedCount = progress.completed_experiments.length;
  const progressPercent = Math.round((completedCount / 16) * 100);

  // Compute average quiz accuracy
  const quizScores = Object.values(progress.quiz_scores);
  const avgQuizScore =
    quizScores.length > 0
      ? Math.round((quizScores.reduce((acc: number, q: any) => acc + (q.score / q.total), 0) / quizScores.length) * 100)
      : 0;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Hero Header */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl relative overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-950/20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/80 border border-cyan-800 text-cyan-400">
              MRCET AUTONOMOUS • R-20 REGULATION
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300">
              COURSE CODE: R20A6683
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-indigo-950/80 border border-indigo-800 text-indigo-300">
              B.TECH IV YEAR – I SEMESTER
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
            Interactive Deep Learning <span className="text-cyan-400">Virtual Laboratory</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Hands-on virtual laboratory learning platform strictly designed for CSE (AI & ML), AI & ML, and AI & DS students. Master all 16 prescribed deep learning experiments through live interactive simulators, safe Python code execution, 160 MCQs, and 320+ viva-voce questions.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectExperiment(1)}
              className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-xl shadow-cyan-500/25 transition-all"
            >
              <span>Start Week 1: Perceptron</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateTab('apps')}
              className="px-6 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 hover:border-cyan-400 text-slate-200 text-sm font-semibold flex items-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Explore 8 Real-Time Apps</span>
            </button>
          </div>
        </div>
      </div>

      {/* Student Progress Overview Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Experiments Completed */}
        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-cyan-500 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Experiments Completed</span>
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-cyan-400 my-1">
              {completedCount} <span className="text-sm text-slate-500 font-normal">/ 16</span>
            </div>
          </div>
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden mt-3">
            <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Quiz Mastery */}
        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-emerald-500 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Average Quiz Mastery</span>
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-emerald-400 my-1">
              {avgQuizScore}%
            </div>
          </div>
          <span className="text-xs text-slate-500 mt-3 font-mono">
            {Object.keys(progress.quiz_scores).length} quizzes attempted
          </span>
        </div>

        {/* Real-Time Apps */}
        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-indigo-500 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Real-Time Applications</span>
              <Cpu className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-indigo-300 my-1">
              8 Apps
            </div>
          </div>
          <span className="text-xs text-slate-500 mt-3 font-mono">
            Vision, NLP & Generative AI
          </span>
        </div>

        {/* Course Regulation */}
        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-amber-500 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Syllabus Compliance</span>
              <FileText className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-bold text-slate-200 my-1">
              100% Preserved
            </div>
          </div>
          <span className="text-xs text-amber-400 mt-3 font-mono">
            MRCET Autonomous Manual
          </span>
        </div>
      </div>

      {/* 16 Experiments Complete Course Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-slate-100">Prescribed Laboratory Experiments (1–16)</h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {completedCount} of 16 Completed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {experiments.map((exp) => {
            const isCompleted = progress.completed_experiments.includes(exp.id);
            const quizScore = progress.quiz_scores[exp.id];

            return (
              <div
                key={exp.id}
                onClick={() => onSelectExperiment(exp.id)}
                className={`glass-panel p-5 rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.01] flex flex-col justify-between border ${
                  isCompleted ? 'border-emerald-500/40' : 'border-slate-800 hover:border-cyan-500/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      WEEK {exp.id}
                    </span>

                    {isCompleted ? (
                      <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Done
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-slate-500">Incomplete</span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-100 text-sm mb-2 line-clamp-2 hover:text-cyan-300 transition-colors">
                    {exp.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {exp.aim}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-500">
                    {quizScore ? (
                      <span className="text-emerald-400 font-bold">
                        Quiz: {quizScore.score}/{quizScore.total}
                      </span>
                    ) : (
                      'Quiz Pending'
                    )}
                  </span>

                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    Open Lab <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Course Outcomes Mapping Table */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-cyan-400" /> Academic Course Outcomes (CO) Mapping
        </h3>
        <p className="text-xs text-slate-300">
          This virtual laboratory satisfies all 5 Course Outcomes specified in MRCET Autonomous R20A6683:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-mono font-bold text-cyan-400 block mb-1">CO1</span>
            <p className="text-xs text-slate-300">
              Formulate single-unit and multi-layer perceptron models with backpropagation learning algorithms.
            </p>
            <span className="text-[10px] text-slate-500 font-mono mt-2 block">Weeks 1–3</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-mono font-bold text-cyan-400 block mb-1">CO2</span>
            <p className="text-xs text-slate-300">
              Construct deep feed-forward and convolutional neural networks for image and spatial pattern classification.
            </p>
            <span className="text-[10px] text-slate-500 font-mono mt-2 block">Weeks 4–6</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-mono font-bold text-cyan-400 block mb-1">CO3</span>
            <p className="text-xs text-slate-300">
              Apply regularization, batch normalization, padding, and data augmentation to overcome overfitting.
            </p>
            <span className="text-[10px] text-slate-500 font-mono mt-2 block">Weeks 7–10</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-mono font-bold text-cyan-400 block mb-1">CO4</span>
            <p className="text-xs text-slate-300">
              Evaluate standard deep architectures (LeNet-5, VGG-16, VGG-19) and transfer learning pipelines.
            </p>
            <span className="text-[10px] text-slate-500 font-mono mt-2 block">Weeks 11–12</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-mono font-bold text-cyan-400 block mb-1">CO5</span>
            <p className="text-xs text-slate-300">
              Design sequential (RNN, BiLSTM) and generative models (GAN, Denoising Autoencoder) for temporal and synthetic tasks.
            </p>
            <span className="text-[10px] text-slate-500 font-mono mt-2 block">Weeks 13–16</span>
          </div>
        </div>
      </div>
    </div>
  );
};
