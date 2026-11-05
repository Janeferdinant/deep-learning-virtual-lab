import React, { useState } from 'react';
import { TrendingUp, ShieldAlert, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const CnnAugmentedSimulator: React.FC = () => {
  const [selectedEpoch, setSelectedEpoch] = useState<number>(15);

  // Pre-calculated training curves for CIFAR-10 over 25 epochs
  const getMetricsAtEpoch = (ep: number) => {
    // Non-augmented model overfits rapidly
    const noAugTrainAcc = Math.min(98.5, 52 + 46.5 * (1 - Math.exp(-ep / 5)));
    const noAugValAcc = Math.min(73.2, 50 + 23.2 * (1 - Math.exp(-ep / 4)) - (ep > 8 ? (ep - 8) * 0.4 : 0));
    const noAugTrainLoss = Math.max(0.08, 1.6 * Math.exp(-ep / 4.5));
    const noAugValLoss = 0.95 + 0.03 * Math.max(0, ep - 6);

    // Augmented model generalizes stably
    const augTrainAcc = Math.min(86.8, 48 + 38.8 * (1 - Math.exp(-ep / 7)));
    const augValAcc = Math.min(85.4, 46 + 39.4 * (1 - Math.exp(-ep / 7.2)));
    const augTrainLoss = Math.max(0.38, 1.8 * Math.exp(-ep / 6));
    const augValLoss = Math.max(0.42, 1.8 * Math.exp(-ep / 6.5));

    return {
      noAug: { trainAcc: noAugTrainAcc, valAcc: noAugValAcc, trainLoss: noAugTrainLoss, valLoss: noAugValLoss },
      aug: { trainAcc: augTrainAcc, valAcc: augValAcc, trainLoss: augTrainLoss, valLoss: augValLoss },
    };
  };

  const metrics = getMetricsAtEpoch(selectedEpoch);
  const gapNoAug = (metrics.noAug.trainAcc - metrics.noAug.valAcc).toFixed(1);
  const gapAug = (metrics.aug.trainAcc - metrics.aug.valAcc).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Epoch Scrubber */}
      <div className="glass-panel p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <label className="text-xs text-slate-400 block mb-1">
            Scrub Training Epoch (1 to 25):
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={25}
              value={selectedEpoch}
              onChange={(e) => setSelectedEpoch(Number(e.target.value))}
              className="w-56 accent-cyan-400"
            />
            <span className="font-mono text-sm font-bold text-cyan-400">
              Epoch {selectedEpoch} / 25
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
            Dataset: CIFAR-10 (60,000 images, 10 classes)
          </span>
        </div>
      </div>

      {/* Side-by-Side Model Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Without Augmentation */}
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-rose-500 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-semibold text-slate-100 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" /> Standard CNN (No Augmentation)
              </h5>
              <span className="text-[11px] font-mono text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800/60">
                Overfitting Warning
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Model memorizes pixel positions and backgrounds in the 50,000 training images. Fails to generalize to unseen test images.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Training Accuracy</span>
                <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">
                  {metrics.noAug.trainAcc.toFixed(1)}%
                </div>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Validation Accuracy</span>
                <div className="text-2xl font-bold font-mono text-rose-400 mt-1">
                  {metrics.noAug.valAcc.toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Validation Loss:</span>
                <span className="text-rose-400">{metrics.noAug.valLoss.toFixed(3)} (diverging)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Generalization Gap:</span>
                <span className="text-rose-400 font-bold">{gapNoAug}% (Severe)</span>
              </div>
            </div>
          </div>

          <div className="mt-5 p-3 rounded-lg bg-rose-950/30 border border-rose-500/20 text-xs text-rose-200">
            ⚠️ Without data augmentation, the validation error starts increasing after epoch 8 while training loss plummets to near zero.
          </div>
        </div>

        {/* With Augmentation */}
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-emerald-500 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-semibold text-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" /> CNN with Data Augmentation
              </h5>
              <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                Robust Generalization
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Real-time on-the-fly random transformations (rotation ±15°, width/height shift 0.1, horizontal flip) expose the CNN to infinite variations.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Training Accuracy</span>
                <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">
                  {metrics.aug.trainAcc.toFixed(1)}%
                </div>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Validation Accuracy</span>
                <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                  {metrics.aug.valAcc.toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Validation Loss:</span>
                <span className="text-emerald-400">{metrics.aug.valLoss.toFixed(3)} (converging)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Generalization Gap:</span>
                <span className="text-emerald-400 font-bold">{gapAug}% (Tight)</span>
              </div>
            </div>
          </div>

          <div className="mt-5 p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-200">
            ✅ Invariance to translation and viewpoint preserves high test performance (+12.2% test accuracy lift over baseline).
          </div>
        </div>
      </div>
    </div>
  );
};

