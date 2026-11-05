import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, AlertTriangle, ArrowRight, Zap, RefreshCw } from 'lucide-react';

export const BackpropSimulator: React.FC = () => {
  const [activation, setActivation] = useState<'sigmoid' | 'relu' | 'tanh'>('relu');
  const [optimizer, setOptimizer] = useState<'sgd' | 'adam'>('adam');
  const [lr, setLr] = useState<number>(0.005);
  const [epoch, setEpoch] = useState<number>(0);
  const [loss, setLoss] = useState<number>(1.09);
  const [accuracy, setAccuracy] = useState<number>(33.3);
  const [phase, setPhase] = useState<'idle' | 'forward' | 'backward'>('idle');
  const [lossHistory, setLossHistory] = useState<number[]>([1.09]);
  const [isDiverging, setIsDiverging] = useState<boolean>(false);

  // Reset
  const handleReset = () => {
    setEpoch(0);
    setLoss(1.09);
    setAccuracy(33.3);
    setLossHistory([1.09]);
    setIsDiverging(false);
    setPhase('idle');
  };

  // Perform single forward + backward step
  const stepTraining = () => {
    setPhase('forward');
    setTimeout(() => {
      setPhase('backward');
      setTimeout(() => {
        setPhase('idle');
        // Update math states based on lr & activation
        if (lr >= 2.0) {
          setIsDiverging(true);
          const newLoss = Math.min(loss * 1.5 + 0.8, 99.9);
          setLoss(parseFloat(newLoss.toFixed(2)));
          setAccuracy(parseFloat((Math.random() * 20 + 20).toFixed(1)));
          setLossHistory(prev => [...prev.slice(-30), newLoss]);
          setEpoch(e => e + 1);
          return;
        }

        setIsDiverging(false);
        // Realistic decay
        const actMultiplier = activation === 'relu' ? 0.93 : activation === 'tanh' ? 0.95 : 0.97;
        const optMultiplier = optimizer === 'adam' ? 0.92 : 0.96;
        const newLoss = Math.max(0.04, loss * actMultiplier * optMultiplier);
        const newAcc = Math.min(98.6, accuracy + (100 - accuracy) * (1 - optMultiplier) * 2.5);

        setLoss(parseFloat(newLoss.toFixed(4)));
        setAccuracy(parseFloat(newAcc.toFixed(1)));
        setLossHistory(prev => [...prev.slice(-30), newLoss]);
        setEpoch(e => e + 1);
      }, 300);
    }, 300);
  };

  // Activation function curve details
  const getActivationDetails = () => {
    switch (activation) {
      case 'sigmoid':
        return {
          formula: 'σ(z) = 1 / (1 + e⁻ᶻ)',
          deriv: "σ'(z) = σ(z)(1 - σ(z)) ≤ 0.25",
          note: 'Max gradient is only 0.25, causing vanishing gradients in deep networks.'
        };
      case 'tanh':
        return {
          formula: 'tanh(z) = (eᶻ - e⁻ᶻ) / (eᶻ + e⁻ᶻ)',
          deriv: "tanh'(z) = 1 - tanh²(z)",
          note: 'Zero-centered range (-1 to +1) eliminates directional weight update bias.'
        };
      case 'relu':
        return {
          formula: 'ReLU(z) = max(0, z)',
          deriv: "ReLU'(z) = 1 (z > 0), 0 (z < 0)",
          note: 'Constant derivative of 1.0 for z > 0 prevents vanishing gradients.'
        };
    }
  };

  return (
    <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-5 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
            <span>🧬 Backpropagation & Activation Visualizer</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
              Iris & Ionosphere Engine
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Simulate forward activation flow, loss calculation, and backward gradient propagation in real time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={stepTraining}
            disabled={phase !== 'idle'}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition disabled:opacity-50"
          >
            <Zap className="w-3.5 h-3.5" /> 1 Backprop Step
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
            title="Reset simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Network Architecture Animation */}
        <div className="lg:col-span-7 bg-[#070b14] p-4 rounded-xl border border-slate-800 relative overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-center text-xs text-slate-400 mb-4 px-2">
            <span>Input (4 Features)</span>
            <span>Hidden Layer (3 Neurons)</span>
            <span>Output (3 Classes)</span>
          </div>

          {/* SVG Network Graph */}
          <div className="relative w-full h-[220px] flex items-center justify-between px-6">
            {/* Input Nodes */}
            <div className="flex flex-col justify-between h-full py-2 z-10">
              {['Sepal.L', 'Sepal.W', 'Petal.L', 'Petal.W'].map((label, idx) => (
                <div key={label} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border transition-all duration-300 ${
                    phase === 'forward' ? 'bg-cyan-400 text-black border-cyan-300 scale-110 shadow-lg shadow-cyan-500/50' : 'bg-slate-800 text-cyan-300 border-slate-700'
                  }`}>
                    x{idx+1}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">{label}</span>
                </div>
              ))}
            </div>

            {/* Connecting Synapse Lines (SVG Overlay) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Lines from inputs to hidden */}
              {[0, 1, 2, 3].map(inIdx =>
                [0, 1, 2].map(hidIdx => {
                  const y1 = 28 + inIdx * 54;
                  const x1 = 50;
                  const y2 = 45 + hidIdx * 65;
                  const x2 = 210;
                  return (
                    <line
                      key={`syn-${inIdx}-${hidIdx}`}
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={phase === 'forward' ? '#06b6d4' : phase === 'backward' ? '#ec4899' : '#1e293b'}
                      strokeWidth={phase !== 'idle' ? 2 : 1}
                      strokeOpacity={phase !== 'idle' ? 0.7 : 0.3}
                      strokeDasharray={phase === 'backward' ? '4,4' : 'none'}
                    />
                  );
                })
              )}
              {/* Lines from hidden to outputs */}
              {[0, 1, 2].map(hidIdx =>
                [0, 1, 2].map(outIdx => {
                  const y1 = 45 + hidIdx * 65;
                  const x1 = 250;
                  const y2 = 45 + outIdx * 65;
                  const x2 = 380;
                  return (
                    <line
                      key={`syn-out-${hidIdx}-${outIdx}`}
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={phase === 'forward' ? '#06b6d4' : phase === 'backward' ? '#ec4899' : '#1e293b'}
                      strokeWidth={phase !== 'idle' ? 2 : 1}
                      strokeOpacity={phase !== 'idle' ? 0.7 : 0.3}
                      strokeDasharray={phase === 'backward' ? '4,4' : 'none'}
                    />
                  );
                })
              )}
            </svg>

            {/* Hidden Layer Nodes */}
            <div className="flex flex-col justify-around h-full py-4 z-10">
              {[1, 2, 3].map(idx => (
                <div key={idx} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex flex-col items-center justify-center font-mono border transition-all duration-300 ${
                    phase === 'forward' ? 'bg-cyan-500 text-black border-cyan-200 scale-110 shadow-lg shadow-cyan-500/50' :
                    phase === 'backward' ? 'bg-pink-500 text-white border-pink-300 scale-110 shadow-lg shadow-pink-500/50' :
                    'bg-slate-800 text-slate-200 border-slate-700'
                  }`}>
                    <span className="text-[10px] font-bold">h{idx}</span>
                    <span className="text-[8px] opacity-75">{activation}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Output Layer Nodes */}
            <div className="flex flex-col justify-around h-full py-4 z-10">
              {['Setosa', 'Versicolor', 'Virginica'].map((label, idx) => (
                <div key={label} className="flex items-center gap-2">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border transition-all duration-300 ${
                    phase === 'forward' ? 'bg-emerald-400 text-black border-emerald-200 scale-110 shadow-lg shadow-emerald-500/50' :
                    phase === 'backward' ? 'bg-pink-500 text-white border-pink-200 scale-110 shadow-lg shadow-pink-500/50' :
                    'bg-slate-800 text-emerald-300 border-slate-700'
                  }`}>
                    y{idx+1}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Phase Indicator Footer */}
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${phase === 'forward' ? 'bg-cyan-400 animate-pulse' : phase === 'backward' ? 'bg-pink-400 animate-pulse' : 'bg-slate-600'}`} />
              <span className="text-slate-300 font-mono text-[11px]">
                {phase === 'forward' ? 'Forward Pass: a = σ(Wx + b)' : phase === 'backward' ? 'Backward Pass: δ = (W^T δ) ⊙ σ\'(z)' : 'Ready for next training step'}
              </span>
            </div>
            <span className="text-slate-400 font-mono text-[11px]">Epoch: <strong className="text-white">{epoch}</strong></span>
          </div>
        </div>

        {/* Right Column: Hyperparameter Controls & Live Loss */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* Metrics Status Box */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#070b14] p-3 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400">Categorical Loss</div>
              <div className={`text-xl font-bold font-mono mt-0.5 ${isDiverging ? 'text-rose-400' : 'text-cyan-400'}`}>
                {loss}
              </div>
            </div>
            <div className="bg-[#070b14] p-3 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400">Test Accuracy</div>
              <div className="text-xl font-bold font-mono mt-0.5 text-emerald-400">
                {accuracy}%
              </div>
            </div>
          </div>

          {/* Divergence Warning */}
          {isDiverging && (
            <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-800 text-rose-300 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong>Learning Rate Divergence Warning (η = {lr}):</strong>
                <p className="mt-0.5 text-rose-200/90 text-[11px]">
                  An excessively large learning rate causes catastrophic gradient overshooting! Notice the loss blowing up toward infinity.
                </p>
              </div>
            </div>
          )}

          {/* Activation Function Selector */}
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Activation Function:</span>
              <span className="text-cyan-400 uppercase font-mono">{activation}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['relu', 'tanh', 'sigmoid'] as const).map(act => (
                <button
                  key={act}
                  onClick={() => { setActivation(act); handleReset(); }}
                  className={`py-1.5 rounded-lg text-xs font-medium uppercase font-mono transition ${
                    activation === act
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {act}
                </button>
              ))}
            </div>

            {/* Formula display */}
            <div className="text-[11px] bg-[#070b14] p-2.5 rounded-lg font-mono text-slate-300 border border-slate-800/80">
              <div className="text-amber-300">{getActivationDetails().formula}</div>
              <div className="text-slate-400 text-[10px] mt-0.5">{getActivationDetails().note}</div>
            </div>
          </div>

          {/* Optimizer & Learning Rate */}
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold">Optimizer:</span>
              <div className="flex gap-2 font-mono">
                {(['sgd', 'adam'] as const).map(opt => (
                  <button
                    key={opt}
                    onClick={() => setOptimizer(opt)}
                    className={`px-3 py-1 rounded text-xs uppercase font-bold transition ${
                      optimizer === opt ? 'bg-indigo-500 text-white shadow' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 font-mono">
                <span className="text-slate-300">Learning Rate (η):</span>
                <span className={`font-bold ${lr >= 2.0 ? 'text-rose-400' : 'text-cyan-400'}`}>{lr}</span>
              </div>
              <div className="flex gap-1.5">
                {[0.0001, 0.0005, 0.005, 5.0].map(val => (
                  <button
                    key={val}
                    onClick={() => { setLr(val); if (val >= 2.0) setIsDiverging(true); else setIsDiverging(false); }}
                    className={`flex-1 py-1 text-[11px] font-mono rounded border transition ${
                      lr === val
                        ? val === 5.0 ? 'bg-rose-500 text-white font-bold border-rose-400' : 'bg-cyan-600 text-white font-bold border-cyan-400'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
              <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                <span>0.0001 (Slow)</span>
                <span>0.005 (Optimal)</span>
                <span className="text-rose-400">5.0 (Diverges!)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

