import React, { useState } from 'react';
import { Sparkles, Sliders, Layers, ArrowRight, ShieldCheck, RefreshCw, BarChart2 } from 'lucide-react';
import { apiService } from '../../services/api';

export const AutoencoderDenoisingSimulator: React.FC = () => {
  const [noiseFactor, setNoiseFactor] = useState<number>(0.5);
  const [activeDigit, setActiveDigit] = useState<number>(3);
  const [isDenoising, setIsDenoising] = useState(false);
  const [reconstructedData, setReconstructedData] = useState<{ psnr: number; mse: number } | null>({
    psnr: 28.4,
    mse: 0.012,
  });

  const handleDenoise = async () => {
    setIsDenoising(true);
    try {
      // Simulate/call denoising API
      setTimeout(() => {
        const psnr = Math.max(18, 34 - noiseFactor * 14 + (Math.random() - 0.5));
        const mse = 0.005 + noiseFactor * 0.02;
        setReconstructedData({ psnr, mse });
        setIsDenoising(false);
      }, 400);
    } catch (e) {
      console.error(e);
      setIsDenoising(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="glass-panel p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        {/* Noise Factor Slider */}
        <div>
          <div className="flex justify-between text-xs text-slate-300 mb-1">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Gaussian Noise Factor (σ):
            </span>
            <span className="font-mono text-cyan-400 font-bold">{noiseFactor.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0.1}
              max={0.9}
              step={0.05}
              value={noiseFactor}
              onChange={(e) => setNoiseFactor(Number(e.target.value))}
              className="w-56 accent-cyan-400"
            />
            <span className="text-xs text-slate-400 font-mono">
              x̃ = clip(x + σ·𝒩(0, 1), 0, 1)
            </span>
          </div>
        </div>

        {/* Digit Picker */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Specimen Digit:</span>
          <div className="flex gap-1.5">
            {[0, 3, 5, 7, 8].map((d) => (
              <button
                key={d}
                onClick={() => setActiveDigit(d)}
                className={`w-8 h-8 rounded-lg text-xs font-mono font-bold border transition-all ${
                  activeDigit === d
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tri-View Visualizer: Original Clean -> Corrupted Noisy -> Reconstructed Clean */}
      <div className="glass-panel p-6 rounded-2xl">
        <h4 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" /> Denoising Autoencoder Pipeline: Original ➔ Corrupted ➔ Bottleneck Latent ➔ Clean
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* 1. Original Clean */}
          <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <span className="text-xs font-mono text-emerald-400 mb-2">1. Ground Truth Clean (x)</span>
            <div className="w-28 h-28 bg-black rounded-xl border border-emerald-500/40 flex items-center justify-center text-6xl font-bold font-mono text-white select-none shadow-md">
              {activeDigit}
            </div>
            <span className="text-[11px] text-slate-400 mt-2 font-mono">Target y = x (28×28)</span>
          </div>

          {/* 2. Noisy Corrupted */}
          <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-rose-500/30 text-center">
            <span className="text-xs font-mono text-rose-400 mb-2">
              2. Corrupted Input (x̃) [σ = {noiseFactor.toFixed(2)}]
            </span>
            <div className="w-28 h-28 bg-black rounded-xl border border-rose-500/40 flex items-center justify-center relative overflow-hidden select-none shadow-md">
              <span className="text-6xl font-bold font-mono text-white/80">{activeDigit}</span>
              {/* Synthetic noise texture overlay */}
              <div
                className="absolute inset-0 bg-white mix-blend-difference pointer-events-none"
                style={{ opacity: noiseFactor * 0.45 }}
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-2 font-mono">Input to Encoder</span>
          </div>

          {/* 3. Denoised Reconstruction */}
          <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-cyan-500/40 text-center">
            <span className="text-xs font-mono text-cyan-400 mb-2">3. Autoencoder Reconstruction (x̂)</span>
            <div className="w-28 h-28 bg-black rounded-xl border-2 border-cyan-500 flex items-center justify-center text-6xl font-bold font-mono text-cyan-200 select-none shadow-lg shadow-cyan-500/20">
              {activeDigit}
            </div>
            <span className="text-[11px] text-emerald-400 mt-2 font-mono font-bold">
              PSNR: {reconstructedData?.psnr.toFixed(1)} dB (Denoised)
            </span>
          </div>
        </div>

        {/* Bottleneck Latent Representation Banner */}
        <div className="mt-6 p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300">Latent Bottleneck Manifold:</span>
            <span className="text-cyan-400 font-bold">Conv2D(32) ➔ MaxPool ➔ 7×7×32 = 1568 units</span>
          </div>
          <div className="text-slate-400">
            Reconstruction Loss: MSE = <span className="text-emerald-400 font-bold">{reconstructedData?.mse.toFixed(4)}</span>
          </div>
        </div>
      </div>

      {/* Real-World Medical Application Insight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-cyan-500">
          <h5 className="font-semibold text-slate-100 mb-2 text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" /> Low-Dose CT Scan Denoising (Healthcare Case Study)
          </h5>
          <p className="text-xs text-slate-300 leading-relaxed">
            Reducing X-ray radiation dose in CT imaging causes quantum mottle noise. Denoising Autoencoders trained on paired low/normal dose scans restore diagnostic clarity without exposing patients to cancer-causing radiation bursts.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-emerald-500">
          <h5 className="font-semibold text-slate-100 mb-2 text-sm flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-emerald-400" /> Peak Signal-to-Noise Ratio (PSNR) Metric
          </h5>
          <div className="font-mono text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800 mb-2">
            PSNR = 10 · log₁₀ ( MAX_I² / MSE )
          </div>
          <p className="text-xs text-slate-400">
            A PSNR exceeding 25 dB denotes high perceptual quality and effective restoration of high-frequency anatomical edges.
          </p>
        </div>
      </div>
    </div>
  );
};

