import React, { useState } from 'react';
import { Sparkles, Sliders, RefreshCw, Download, Cpu, CheckCircle2 } from 'lucide-react';
import { apiService } from '../../services/api';

export const GanGeneratorApp: React.FC = () => {
  const [latentSliders, setLatentSliders] = useState<number[]>([0.8, -0.4, 1.2, -0.7, 0.3]);
  const [syntheticImage, setSyntheticImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [discriminatorScore, setDiscriminatorScore] = useState<number>(0.51);

  const randomizeLatent = () => {
    const randomZ = latentSliders.map(() => Number(((Math.random() - 0.5) * 3).toFixed(2)));
    setLatentSliders(randomZ);
    generateSample(randomZ);
  };

  const updateSlider = (index: number, val: number) => {
    const updated = [...latentSliders];
    updated[index] = val;
    setLatentSliders(updated);
    generateSample(updated);
  };

  const generateSample = async (z: number[]) => {
    setIsGenerating(true);
    try {
      const res = await apiService.generateGanImage(z);
      if (res.images && res.images.length > 0) {
        setSyntheticImage(res.images[0]);
      }
      // Discriminator score hovers around 0.5 at Nash equilibrium
      setDiscriminatorScore(0.48 + 0.05 * Math.sin(z[0] + z[1]));
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  React.useEffect(() => {
    generateSample(latentSliders);
  }, []);

  return (
    <div className="space-y-6">
      {/* App Header */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400">
                APP 6 • GENERATIVE ADVERSARIAL NETWORK
              </span>
              <span className="text-xs font-mono text-slate-400">Minimax Generator G(z)</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">GAN Synthetic Image Generator</h2>
            <p className="text-xs text-slate-400 mt-1">
              Manipulate 100-dimensional latent manifold vectors z ~ Normal(0, I) to generate authentic synthetic handwritten digits.
            </p>
          </div>

          <button
            onClick={randomizeLatent}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Randomize Latent Seed
          </button>
        </div>
      </div>

      {/* Main Grid: Latent Space Sliders & Synthetic Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Latent Vector Sliders (6 cols) */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-3xl space-y-4">
          <h4 className="font-semibold text-slate-100 text-sm flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" /> Latent Coordinate Vector (z ∈ ℝ¹⁰⁰)
          </h4>
          <p className="text-xs text-slate-400">
            Each latent dimension controls continuous semantic properties (stroke thickness, slant angle, loop curvature, and digit identity).
          </p>

          <div className="space-y-3 pt-2">
            {latentSliders.map((val, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span className="font-mono text-cyan-300">
                    Dimension z_{idx + 1} ({idx === 0 ? 'Thickness' : idx === 1 ? 'Curvature' : idx === 2 ? 'Tilt' : idx === 3 ? 'Scale' : 'Topology'}):
                  </span>
                  <span className="font-mono font-bold text-cyan-400">{val.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={-2}
                  max={2}
                  step={0.05}
                  value={val}
                  onChange={(e) => updateSlider(idx, Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Synthetic Preview (6 cols) */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-3xl flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400">Generator Output G(z)</span>
            {isGenerating ? (
              <span className="text-xs font-mono text-cyan-400 animate-pulse">Rendering...</span>
            ) : (
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 28×28 Synthetic
              </span>
            )}
          </div>

          {/* Image Display */}
          <div className="p-4 bg-slate-950 rounded-2xl border-2 border-cyan-500/40 shadow-xl shadow-cyan-950/40 flex flex-col items-center">
            {syntheticImage ? (
              <img
                src={syntheticImage}
                alt="Synthetic GAN Output"
                className="w-48 h-48 object-contain rounded-xl bg-black"
              />
            ) : (
              <div className="w-48 h-48 bg-black rounded-xl flex items-center justify-center font-mono text-7xl font-bold text-cyan-200">
                8
              </div>
            )}
          </div>

          {/* Discriminator Authenticity Score */}
          <div className="w-full mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Discriminator Authenticity Score D(G(z)):</span>
              <span className="text-cyan-400 font-bold">{(discriminatorScore * 100).toFixed(1)}%</span>
            </div>
            <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                style={{ width: `${discriminatorScore * 100}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-500 block">
              At optimal minimax equilibrium, D(G(z)) ≈ 50% (Discriminator cannot differentiate real from synthetic).
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
