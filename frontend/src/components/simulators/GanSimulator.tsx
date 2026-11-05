import React, { useState } from 'react';
import { Sparkles, Play, RefreshCw, Cpu, TrendingUp, Layers, CheckCircle2 } from 'lucide-react';
import { apiService } from '../../services/api';

export const GanSimulator: React.FC = () => {
  const [epoch, setEpoch] = useState<number>(35);
  const [latentDimension, setLatentDimension] = useState<number>(100);
  const [latentZ, setLatentZ] = useState<number[]>([0.5, -0.3, 0.8, -0.1, 0.4]);
  const [syntheticDigits, setSyntheticDigits] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Epoch stages simulation metrics
  const getEpochDetails = (ep: number) => {
    if (ep < 5) {
      return {
        stage: 'Pure Gaussian Noise',
        gLoss: 4.82,
        dLoss: 0.12,
        dRealConf: 0.98,
        dFakeConf: 0.04,
        blur: 'blur-md',
        opacity: 'opacity-40',
        desc: 'Generator outputs uncorrelated random static. Discriminator easily separates real from fake with 98% certainty.',
      };
    } else if (ep < 20) {
      return {
        stage: 'Coarse Blob Formations',
        gLoss: 2.95,
        dLoss: 0.38,
        dRealConf: 0.88,
        dFakeConf: 0.22,
        blur: 'blur-sm',
        opacity: 'opacity-70',
        desc: 'Generator learns that digits concentrate ink in the center of the 28x28 grid, producing blurry oval shapes.',
      };
    } else if (ep < 40) {
      return {
        stage: 'Structured Digit Stems & Loops',
        gLoss: 1.45,
        dLoss: 0.58,
        dRealConf: 0.72,
        dFakeConf: 0.41,
        blur: 'blur-none',
        opacity: 'opacity-90',
        desc: 'Distinct stroke topologies emerge: recognizable loops for 0 and 8, vertical stems for 1 and 7.',
      };
    } else {
      return {
        stage: 'Nash Equilibrium (Crisp Synthetic Digits)',
        gLoss: 0.82,
        dLoss: 0.68,
        dRealConf: 0.52,
        dFakeConf: 0.49,
        blur: 'blur-none',
        opacity: 'opacity-100',
        desc: 'Optimal minimax equilibrium: Discriminator cannot distinguish real from fake, predicting ~50% probability on both.',
      };
    }
  };

  const details = getEpochDetails(epoch);

  const generateSamples = async () => {
    setIsGenerating(true);
    try {
      const res = await apiService.generateGanImage(latentZ);
      setSyntheticDigits(res.images);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controller */}
      <div className="glass-panel p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <label className="text-xs text-slate-400 block mb-1">
            Simulate Adversarial Training Progress (Epoch 1 to 50):
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={50}
              value={epoch}
              onChange={(e) => setEpoch(Number(e.target.value))}
              className="w-56 accent-cyan-400"
            />
            <span className="font-mono text-sm font-bold text-cyan-400">
              Epoch {epoch} / 50
            </span>
          </div>
        </div>

        <button
          onClick={generateSamples}
          disabled={isGenerating}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          {isGenerating ? 'Synthesizing...' : 'Sample Latent Space z'}
        </button>
      </div>

      {/* Minimax Two-Player Architecture Visualizer */}
      <div className="glass-panel p-6 rounded-2xl">
        <h4 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" /> GAN Minimax Game: min_G max_D V(D, G)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
          {/* Generator G */}
          <div className="p-4 bg-slate-950 rounded-xl border border-cyan-500/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-cyan-400">Generator G(z)</span>
              <span className="text-[10px] text-slate-400 font-mono">z ∈ ℝ¹⁰⁰ ➔ 28×28</span>
            </div>
            <p className="text-xs text-slate-300 mb-3">
              Maps random noise latent vector $z$ through Dense(256) ➔ Dense(512) ➔ Dense(784, tanh) into synthetic images.
            </p>
            <div className="flex justify-between text-xs font-mono text-cyan-300 bg-slate-900 p-2 rounded">
              <span>Generator Loss:</span>
              <span className="font-bold">{details.gLoss.toFixed(2)}</span>
            </div>
          </div>

          {/* Generated vs Real Comparison Center */}
          <div className="flex flex-col items-center justify-center p-4 bg-slate-900/60 rounded-xl border border-slate-800">
            <span className="text-xs font-mono text-slate-400 mb-2">Synthetic Output (Epoch {epoch})</span>

            <div className="w-28 h-28 bg-black rounded-xl border-2 border-cyan-500/50 flex items-center justify-center overflow-hidden shadow-lg p-2">
              {syntheticDigits.length > 0 ? (
                <img
                  src={syntheticDigits[0]}
                  alt="Synthetic Digit"
                  className={`w-full h-full object-contain ${details.blur}`}
                />
              ) : (
                <div
                  className={`text-6xl font-bold font-mono text-white transition-all select-none ${details.blur} ${details.opacity}`}
                >
                  {epoch < 5 ? '░' : epoch < 20 ? '●' : '8'}
                </div>
              )}
            </div>

            <span className="text-xs font-semibold text-cyan-300 mt-2 font-mono">{details.stage}</span>
          </div>

          {/* Discriminator D */}
          <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-amber-400">Discriminator D(x)</span>
              <span className="text-[10px] text-slate-400 font-mono">28×28 ➔ [0, 1]</span>
            </div>
            <p className="text-xs text-slate-300 mb-3">
              Binary classifier judging whether input $x$ is authentic MNIST training data ($y=1$) or synthetic generator output ($y=0$).
            </p>
            <div className="flex justify-between text-xs font-mono text-amber-300 bg-slate-900 p-2 rounded">
              <span>Discriminator Loss:</span>
              <span className="font-bold">{details.dLoss.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Discriminator Probabilities & Training Evolution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-cyan-500">
          <h5 className="font-semibold text-slate-100 mb-3 text-sm flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" /> Discriminator Confidence at Epoch {epoch}
          </h5>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-emerald-400">D(x_real) Confidence:</span>
                <span>{(details.dRealConf * 100).toFixed(0)}%</span>
              </div>
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${details.dRealConf * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-amber-400">D(G(z_fake)) Confidence:</span>
                <span>{(details.dFakeConf * 100).toFixed(0)}%</span>
              </div>
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${details.dFakeConf * 100}%` }}
                />
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-4 leading-relaxed">{details.desc}</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-emerald-500">
          <h5 className="font-semibold text-slate-100 mb-3 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Latent Space Interpolation (z ∈ ℝ¹⁰⁰)
          </h5>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            By interpolating linearly between two random points $z_1$ and $z_2$ in latent space ($z(t) = (1-t)z_1 + t z_2$), the Generator morphs smoothly between different digit classes without discontinuous jumps.
          </p>
          <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
            <span className="text-cyan-400">z₁ (Digit 3)</span>
            <span className="text-slate-500">➔ t=0.25 ➔ t=0.50 ➔ t=0.75 ➔</span>
            <span className="text-emerald-400">z₂ (Digit 8)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

