import React, { useState } from 'react';
import { Shield, Sparkles, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react';

export const RegularizationSimulator: React.FC = () => {
  type RegularizationMode = 'none' | 'l1' | 'l2' | 'dropout' | 'l2_dropout';
  const [mode, setMode] = useState<RegularizationMode>('dropout');
  const [dropoutRate, setDropoutRate] = useState<number>(0.3);
  const [l2Lambda, setL2Lambda] = useState<number>(0.001);
  const [seed, setSeed] = useState<number>(0);

  // Model performance profiles
  const profiles: Record<
    RegularizationMode,
    { name: string; trainAcc: number; testAcc: number; gap: number; weightNorm: string; status: string }
  > = {
    none: {
      name: 'Base CNN (No Regularization)',
      trainAcc: 99.4,
      testAcc: 86.8,
      gap: 12.6,
      weightNorm: 'High (||W||₂ = 84.2)',
      status: 'Severely Overfitting (Memorizing noise)',
    },
    l1: {
      name: 'L1 Regularization (Lasso, Sparse Weights)',
      trainAcc: 94.2,
      testAcc: 90.1,
      gap: 4.1,
      weightNorm: 'Sparse (68% weights = 0)',
      status: 'Feature Selection Active',
    },
    l2: {
      name: 'L2 Regularization (Weight Decay)',
      trainAcc: 95.8,
      testAcc: 92.4,
      gap: 3.4,
      weightNorm: 'Shrunk (||W||₂ = 14.6)',
      status: 'Smooth Weights, Low Variance',
    },
    dropout: {
      name: `Dropout (p = ${dropoutRate.toFixed(2)})`,
      trainAcc: 93.8,
      testAcc: 93.2,
      gap: 0.6,
      weightNorm: 'Ensemble Effect',
      status: 'Excellent Generalization',
    },
    l2_dropout: {
      name: `L2 (${l2Lambda}) + Dropout (${dropoutRate.toFixed(2)})`,
      trainAcc: 94.1,
      testAcc: 93.9,
      gap: 0.2,
      weightNorm: 'Optimal',
      status: 'Production Gold Standard',
    },
  };

  const activeProfile = profiles[mode];

  // 40 synthetic neurons in a hidden dense layer
  const totalNeurons = 36;
  const neurons = Array.from({ length: totalNeurons }, (_, i) => {
    // Determine whether this neuron is dropped based on dropout rate & pseudo-random seed
    if (mode === 'dropout' || mode === 'l2_dropout') {
      const pseudoRand = Math.sin((i + 1) * 997 + seed * 31) * 0.5 + 0.5;
      return { id: i, dropped: pseudoRand < dropoutRate };
    }
    return { id: i, dropped: false };
  });

  const droppedCount = neurons.filter((n) => n.dropped).length;

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="glass-panel p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              { id: 'none', label: 'Base CNN' },
              { id: 'l1', label: 'L1 (Lasso)' },
              { id: 'l2', label: 'L2 (Ridge)' },
              { id: 'dropout', label: 'Dropout' },
              { id: 'l2_dropout', label: 'L2 + Dropout' },
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                mode === m.id
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Sliders for active mode */}
        {(mode === 'dropout' || mode === 'l2_dropout') && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono">Dropout Rate (p):</span>
            <input
              type="range"
              min={0.1}
              max={0.6}
              step={0.05}
              value={dropoutRate}
              onChange={(e) => setDropoutRate(Number(e.target.value))}
              className="w-24 accent-cyan-400"
            />
            <span className="text-xs font-mono font-bold text-cyan-400 w-8">
              {dropoutRate.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* Interactive Neuron Deactivation Grid */}
      <div className="glass-panel p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-semibold text-slate-100 flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" /> Hidden Layer Neuron Mask (36 Dense Neurons)
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {mode === 'dropout' || mode === 'l2_dropout'
                ? `During forward pass, each neuron is deactivated with probability p=${dropoutRate.toFixed(2)}, forcing co-adaptation avoidance.`
                : 'All neurons are active during training. Prone to co-adaptation without regularization.'}
            </p>
          </div>

          {(mode === 'dropout' || mode === 'l2_dropout') && (
            <button
              onClick={() => setSeed((s) => s + 1)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 border border-slate-700"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Next Mini-Batch Sample
            </button>
          )}
        </div>

        {/* 6x6 Neuron Grid */}
        <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-12 gap-2.5 p-4 bg-slate-950 rounded-xl border border-slate-800">
          {neurons.map((n) => (
            <div
              key={n.id}
              className={`h-12 rounded-lg flex flex-col items-center justify-center font-mono text-[11px] font-bold transition-all ${
                n.dropped
                  ? 'bg-rose-950/40 border border-rose-500/30 text-rose-400 opacity-40 line-through'
                  : 'bg-cyan-950/50 border border-cyan-400/60 text-cyan-200 shadow-sm shadow-cyan-500/20'
              }`}
            >
              <span>N_{n.id + 1}</span>
              <span className="text-[9px] font-normal">{n.dropped ? 'OFF (0)' : 'ACTIVE'}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-3 text-xs text-slate-400 font-mono">
          <span>
            Active Neurons: <span className="text-emerald-400 font-bold">{totalNeurons - droppedCount}</span> / {totalNeurons}
          </span>
          <span>
            Deactivated: <span className="text-rose-400 font-bold">{droppedCount}</span> ({((droppedCount / totalNeurons) * 100).toFixed(0)}%)
          </span>
        </div>
      </div>

      {/* Generalization Gap & Overfitting Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-cyan-500">
          <span className="text-xs text-slate-400">Training Accuracy</span>
          <div className="text-3xl font-bold font-mono text-cyan-400 my-1">{activeProfile.trainAcc}%</div>
          <span className="text-xs text-slate-500">Fit on train partition</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-emerald-500">
          <span className="text-xs text-slate-400">Testing Accuracy</span>
          <div className="text-3xl font-bold font-mono text-emerald-400 my-1">{activeProfile.testAcc}%</div>
          <span className="text-xs text-slate-500">Real-world generalization</span>
        </div>

        <div
          className={`glass-panel p-5 rounded-2xl border-l-4 ${
            activeProfile.gap > 5 ? 'border-l-rose-500' : 'border-l-emerald-500'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Generalization Gap (Train - Test)</span>
            {activeProfile.gap > 5 && <AlertTriangle className="w-4 h-4 text-rose-400" />}
          </div>
          <div
            className={`text-3xl font-bold font-mono my-1 ${
              activeProfile.gap > 5 ? 'text-rose-400' : 'text-emerald-400'
            }`}
          >
            {activeProfile.gap.toFixed(1)}%
          </div>
          <span className="text-xs font-semibold text-slate-300">{activeProfile.status}</span>
        </div>
      </div>
    </div>
  );
};

