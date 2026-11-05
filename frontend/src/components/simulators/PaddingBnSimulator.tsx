import React, { useState } from 'react';
import { Calculator, Sparkles, TrendingUp, ShieldCheck, ArrowRight, Layers } from 'lucide-react';

export const PaddingBnSimulator: React.FC = () => {
  // Dimension Calculator States
  const [inputWidth, setInputWidth] = useState<number>(28);
  const [filterSize, setFilterSize] = useState<number>(3);
  const [stride, setStride] = useState<number>(1);
  const [paddingMode, setPaddingMode] = useState<'VALID' | 'SAME' | 'CUSTOM'>('SAME');
  const [customPadding, setCustomPadding] = useState<number>(1);

  // Active Tab: Calculator vs Batch Normalization
  const [tab, setTab] = useState<'padding' | 'batchnorm'>('padding');

  // Compute padding value P
  let p = 0;
  if (paddingMode === 'VALID') {
    p = 0;
  } else if (paddingMode === 'SAME') {
    p = Math.floor((filterSize - 1) / 2);
  } else {
    p = customPadding;
  }

  // Formula: O = floor((W - F + 2P) / S) + 1
  const outputDim = Math.floor((inputWidth - filterSize + 2 * p) / stride) + 1;

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="glass-panel p-3 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab('padding')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              tab === 'padding'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" /> SAME vs VALID Dimension Calculator
          </button>
          <button
            onClick={() => setTab('batchnorm')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              tab === 'batchnorm'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Batch Normalization & Internal Covariate Shift
          </button>
        </div>
      </div>

      {tab === 'padding' ? (
        <div className="space-y-6">
          {/* Formula Display Banner */}
          <div className="glass-panel p-5 rounded-2xl bg-cyan-950/20 border-cyan-500/30">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-semibold text-cyan-300 mb-1">
                  Convolution Output Dimension Formula (Spatial Size)
                </h4>
                <div className="font-mono text-lg text-slate-100 font-bold">
                  Output Width (O) = ⌊ (W − F + 2P) / S ⌋ + 1
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-right">
                <span className="text-xs text-slate-400 block">Computed Dimension</span>
                <span className="text-2xl font-bold font-mono text-cyan-400">
                  {outputDim} × {outputDim}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Sliders & Visuals */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sliders (5 cols) */}
            <div className="lg:col-span-5 glass-panel p-5 rounded-2xl space-y-4">
              <h5 className="font-semibold text-slate-200 text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" /> Hyperparameter Sliders
              </h5>

              {/* Input Dimension W */}
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Input Spatial Dimension (W = H):</span>
                  <span className="font-mono text-cyan-400 font-bold">{inputWidth} px</span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={64}
                  value={inputWidth}
                  onChange={(e) => setInputWidth(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              {/* Filter Kernel Size F */}
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Kernel Filter Size (F):</span>
                  <span className="font-mono text-cyan-400 font-bold">{filterSize} × {filterSize}</span>
                </div>
                <div className="flex gap-2">
                  {[1, 3, 5, 7].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilterSize(f)}
                      className={`flex-1 py-1 text-xs rounded border font-mono ${
                        filterSize === f
                          ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                          : 'bg-slate-900 border-slate-800 text-slate-300'
                      }`}
                    >
                      {f}×{f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stride S */}
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Stride Step (S):</span>
                  <span className="font-mono text-cyan-400 font-bold">{stride}</span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStride(s)}
                      className={`flex-1 py-1 text-xs rounded border font-mono ${
                        stride === s
                          ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                          : 'bg-slate-900 border-slate-800 text-slate-300'
                      }`}
                    >
                      S = {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Padding Mode P */}
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Padding Mode (P):</span>
                  <span className="font-mono text-cyan-400 font-bold">P = {p} px</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['SAME', 'VALID', 'CUSTOM'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setPaddingMode(mode)}
                      className={`py-1 text-xs rounded border font-medium ${
                        paddingMode === mode
                          ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                          : 'bg-slate-900 border-slate-800 text-slate-300'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
                {paddingMode === 'CUSTOM' && (
                  <input
                    type="range"
                    min={0}
                    max={6}
                    value={customPadding}
                    onChange={(e) => setCustomPadding(Number(e.target.value))}
                    className="w-full mt-2 accent-cyan-400"
                  />
                )}
              </div>
            </div>

            {/* Visualizer (7 cols) */}
            <div className="lg:col-span-7 glass-panel p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <h5 className="font-semibold text-slate-200 text-sm mb-4">
                  Feature-Map Spatial Transformation Visualizer
                </h5>

                <div className="flex flex-col sm:flex-row items-center justify-around gap-6 p-6 bg-slate-950 rounded-xl border border-slate-800">
                  {/* Input Box */}
                  <div className="flex flex-col items-center">
                    <div
                      className="border-2 border-indigo-400/80 bg-indigo-950/40 rounded flex items-center justify-center font-mono font-bold text-indigo-300 transition-all"
                      style={{
                        width: `${Math.min(130, Math.max(60, inputWidth * 3.5))}px`,
                        height: `${Math.min(130, Math.max(60, inputWidth * 3.5))}px`,
                      }}
                    >
                      {inputWidth}×{inputWidth}
                    </div>
                    <span className="text-xs text-slate-400 mt-2">Input Matrix</span>
                    {p > 0 && (
                      <span className="text-[10px] text-cyan-400 font-mono">
                        +{p}px zero-pad rim
                      </span>
                    )}
                  </div>

                  {/* Operation Arrow */}
                  <div className="flex flex-col items-center text-slate-400">
                    <span className="text-xs font-mono text-cyan-400 mb-1">
                      Conv2D(F={filterSize}, S={stride})
                    </span>
                    <ArrowRight className="w-6 h-6 text-cyan-400" />
                    <span className="text-[10px] text-slate-500 uppercase font-mono">{paddingMode} Padding</span>
                  </div>

                  {/* Output Feature Map */}
                  <div className="flex flex-col items-center">
                    <div
                      className="border-2 border-emerald-400/80 bg-emerald-950/40 rounded flex items-center justify-center font-mono font-bold text-emerald-300 transition-all"
                      style={{
                        width: `${Math.min(130, Math.max(40, outputDim * 3.5))}px`,
                        height: `${Math.min(130, Math.max(40, outputDim * 3.5))}px`,
                      }}
                    >
                      {outputDim}×{outputDim}
                    </div>
                    <span className="text-xs text-slate-400 mt-2">Output Feature Map</span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {outputDim === inputWidth ? 'Preserved (SAME)' : `Shrunk by ${inputWidth - outputDim}px`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Math breakdown */}
              <div className="mt-4 p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
                Calculation: ⌊({inputWidth} − {filterSize} + 2×{p}) / {stride}⌋ + 1 = ⌊({inputWidth - filterSize + 2 * p}) / {stride}⌋ + 1 = <span className="text-cyan-400 font-bold">{outputDim}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Batch Normalization Comparison */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Without BatchNorm */}
            <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-rose-500">
              <h5 className="font-semibold text-slate-100 mb-2 flex items-center gap-2">
                Standard CNN (Without Batch Normalization)
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Internal Covariate Shift causes hidden layer input distributions to drift wildly across training iterations. Requires tiny learning rates ($10^{-4}$) to prevent exploding gradients.
              </p>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400">Max Stable Learning Rate:</span>
                  <span className="text-amber-400">0.0005 (Sensitive)</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400">Epoch 15 Validation Loss:</span>
                  <span className="text-rose-400">0.312 (Oscillating)</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400">Convergence Speed:</span>
                  <span className="text-slate-400">Slow (25+ epochs)</span>
                </div>
              </div>
            </div>

            {/* With BatchNorm */}
            <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-emerald-500">
              <h5 className="font-semibold text-slate-100 mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> With Batch Normalization (Layer-wise)
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Zero-centers and normalizes each mini-batch (μ_B = 0, σ_B = 1), followed by learned affine scaling γ·x̂ + β. Smoothes the optimization loss landscape.
              </p>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400">Max Stable Learning Rate:</span>
                  <span className="text-emerald-400 font-bold">0.01 (20× Higher!)</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400">Epoch 15 Validation Loss:</span>
                  <span className="text-emerald-400 font-bold">0.142 (Smooth monotonic)</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400">Convergence Speed:</span>
                  <span className="text-cyan-400 font-bold">3.2× Faster (8 epochs)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
