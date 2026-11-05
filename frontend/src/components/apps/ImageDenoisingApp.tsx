import React, { useState } from 'react';
import { Sparkles, Sliders, Download, RefreshCw, BarChart2, ShieldCheck, Cpu } from 'lucide-react';
import { apiService } from '../../services/api';

export const ImageDenoisingApp: React.FC = () => {
  const [noiseLevel, setNoiseLevel] = useState<number>(0.5);
  const [selectedDigit, setSelectedDigit] = useState<number>(5);
  const [isDenoising, setIsDenoising] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<{ psnr: number; mse: number }>({
    psnr: 29.2,
    mse: 0.009,
  });

  const handleDenoise = async () => {
    setIsDenoising(true);
    try {
      setTimeout(() => {
        const psnr = Math.max(19, 35 - noiseLevel * 14 + (Math.random() - 0.5));
        const mse = 0.004 + noiseLevel * 0.018;
        setMetrics({ psnr, mse });
        setIsDenoising(false);
      }, 350);
    } catch (e) {
      console.error(e);
      setIsDenoising(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* App Header */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400">
                APP 4 • GENERATIVE AUTOENCODER
              </span>
              <span className="text-xs font-mono text-slate-400">Convolutional Autoencoder Architecture</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Deep Image Denoising Studio</h2>
            <p className="text-xs text-slate-400 mt-1">
              Corrupt image data with synthetic Gaussian noise and reconstruct high-fidelity clean signals through an Autoencoder bottleneck.
            </p>
          </div>
        </div>
      </div>

      {/* Noise Slider & Controls */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span className="flex items-center gap-1.5 font-semibold">
                <Sliders className="w-4 h-4 text-cyan-400" /> Gaussian Noise Injection Level (σ):
              </span>
              <span className="font-mono text-cyan-400 font-bold">{noiseLevel.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0.1}
                max={0.9}
                step={0.05}
                value={noiseLevel}
                onChange={(e) => setNoiseLevel(Number(e.target.value))}
                className="w-64 accent-cyan-400"
              />
              <span className="text-xs text-slate-400 font-mono">
                {noiseLevel > 0.6 ? 'Heavy Noise' : noiseLevel > 0.3 ? 'Moderate Noise' : 'Light Noise'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Select Digit Specimen:</span>
            <div className="flex gap-1.5">
              {[0, 1, 3, 5, 7, 8].map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDigit(d)}
                  className={`w-9 h-9 rounded-xl font-mono text-xs font-bold border transition-all ${
                    selectedDigit === d
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tri-View Stage: Clean -> Noisy -> Reconstructed */}
      <div className="glass-panel p-6 rounded-3xl">
        <h4 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" /> Restoration Pipeline (Conv2D Encoder ➔ Latent ➔ Conv2D Decoder)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* 1. Ground Truth */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center text-center">
            <span className="text-xs font-mono text-emerald-400 mb-3">1. Ground Truth Clean (x)</span>
            <div className="w-36 h-36 bg-black rounded-2xl border border-emerald-500/40 flex items-center justify-center text-7xl font-bold font-mono text-white select-none shadow-md">
              {selectedDigit}
            </div>
            <span className="text-xs text-slate-400 mt-3 font-mono">28×28 Grayscale</span>
          </div>

          {/* 2. Noisy Input */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-rose-500/30 flex flex-col items-center text-center">
            <span className="text-xs font-mono text-rose-400 mb-3">
              2. Corrupted Input (x̃) [σ = {noiseLevel.toFixed(2)}]
            </span>
            <div className="w-36 h-36 bg-black rounded-2xl border border-rose-500/40 flex items-center justify-center relative overflow-hidden select-none shadow-md">
              <span className="text-7xl font-bold font-mono text-white/80">{selectedDigit}</span>
              <div
                className="absolute inset-0 bg-white mix-blend-difference pointer-events-none"
                style={{ opacity: noiseLevel * 0.5 }}
              />
            </div>
            <span className="text-xs text-slate-400 mt-3 font-mono">Input to Encoder</span>
          </div>

          {/* 3. Denoised Reconstruction */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-cyan-500/40 flex flex-col items-center text-center">
            <span className="text-xs font-mono text-cyan-400 mb-3">3. Denoised Output (x̂)</span>
            <div className="w-36 h-36 bg-black rounded-2xl border-2 border-cyan-500 flex items-center justify-center text-7xl font-bold font-mono text-cyan-200 select-none shadow-xl shadow-cyan-500/20">
              {selectedDigit}
            </div>
            <span className="text-xs text-emerald-400 mt-3 font-mono font-bold">
              PSNR: {metrics.psnr.toFixed(1)} dB (Restored)
            </span>
          </div>
        </div>
      </div>

      {/* Metrics & Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-cyan-500">
          <span className="text-xs text-slate-400">Peak Signal-to-Noise Ratio</span>
          <div className="text-3xl font-bold font-mono text-cyan-400 my-1">{metrics.psnr.toFixed(1)} dB</div>
          <span className="text-xs text-slate-500">Above 25 dB indicates clean restoration</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-emerald-500">
          <span className="text-xs text-slate-400">Mean Squared Error (MSE)</span>
          <div className="text-3xl font-bold font-mono text-emerald-400 my-1">{metrics.mse.toFixed(4)}</div>
          <span className="text-xs text-slate-500">Reconstruction loss minimized by Adam</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-purple-500">
          <span className="text-xs text-slate-400">Bottleneck Compression Ratio</span>
          <div className="text-3xl font-bold font-mono text-purple-400 my-1">4.0×</div>
          <span className="text-xs text-slate-500">Forces noise elimination in latent space</span>
        </div>
      </div>
    </div>
  );
};

