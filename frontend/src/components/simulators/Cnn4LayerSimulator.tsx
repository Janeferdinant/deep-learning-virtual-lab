import React, { useState } from 'react';
import { Layers, Zap, Clock, TrendingUp, Cpu, Server, CheckCircle2 } from 'lucide-react';

export const Cnn4LayerSimulator: React.FC = () => {
  const [selectedEpochs, setSelectedEpochs] = useState<5 | 10 | 20>(10);
  const [hardware, setHardware] = useState<'cpu' | 'gpu'>('gpu');
  const [activeFeatureLayer, setActiveFeatureLayer] = useState<1 | 2 | 3 | 4>(1);

  // Benchmarks for Fashion-MNIST on 4-Layer Deep CNN
  const epochBenchmarks = {
    5: {
      trainAcc: 88.4,
      valAcc: 87.1,
      trainLoss: 0.324,
      valLoss: 0.345,
      cpuTime: '2m 15s',
      gpuTime: '18s',
    },
    10: {
      trainAcc: 93.6,
      valAcc: 91.8,
      trainLoss: 0.178,
      valLoss: 0.224,
      cpuTime: '4m 32s',
      gpuTime: '36s',
    },
    20: {
      trainAcc: 97.2,
      valAcc: 93.4,
      trainLoss: 0.082,
      valLoss: 0.205,
      cpuTime: '8m 58s',
      gpuTime: '1m 12s',
    },
  };

  const featureLayerDescriptions = {
    1: {
      title: 'Layer 1: Low-Level Edges & Gradients (32 Filters @ 3×3)',
      desc: 'Extracts oriented Gabor-like edges, horizontal/vertical contrast boundaries, and diagonal stroke limits.',
      visuals: ['Vertical Edges', 'Horizontal Edges', '45° Slants', 'High-Contrast Points'],
      color: 'border-cyan-500/50 text-cyan-400',
    },
    2: {
      title: 'Layer 2: Textures & Corners (64 Filters @ 3×3)',
      desc: 'Combines simple edges into junctions, corners, crossed lines, and fabric textures (herringbone, weave).',
      visuals: ['T-Junctions', 'Right Angles', 'Grid Patterns', 'Fabric Texture'],
      color: 'border-indigo-500/50 text-indigo-400',
    },
    3: {
      title: 'Layer 3: Structural Parts & Motifs (128 Filters @ 3×3)',
      desc: 'Assembles corners into recognizable object components: sleeves, collars, shoe soles, heels, bag straps.',
      visuals: ['Shoe Sole', 'Shirt Collar', 'Handbag Strap', 'Round Neckline'],
      color: 'border-purple-500/50 text-purple-400',
    },
    4: {
      title: 'Layer 4: High-Level Semantics (128 Filters @ 3×3)',
      desc: 'Complete silhouette representations encoding class identity: Sneaker vs Ankle Boot vs Pullover vs Coat.',
      visuals: ['Footwear Profile', 'Outerwear Silhouette', 'Trouser Shape', 'Apparel Class'],
      color: 'border-emerald-500/50 text-emerald-400',
    },
  };

  const currentStats = epochBenchmarks[selectedEpochs];
  const layerInfo = featureLayerDescriptions[activeFeatureLayer];

  return (
    <div className="space-y-6">
      {/* Control bar */}
      <div className="glass-panel p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        {/* Epoch toggle */}
        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-400">Epoch Comparison:</label>
          <div className="flex rounded-lg bg-slate-900 border border-slate-700 p-0.5">
            {([5, 10, 20] as const).map((ep) => (
              <button
                key={ep}
                onClick={() => setSelectedEpochs(ep)}
                className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
                  selectedEpochs === ep
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {ep} Epochs
              </button>
            ))}
          </div>
        </div>

        {/* Hardware toggle */}
        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-400">Accelerator:</label>
          <div className="flex rounded-lg bg-slate-900 border border-slate-700 p-0.5">
            <button
              onClick={() => setHardware('cpu')}
              className={`px-3 py-1 text-xs rounded-md font-medium flex items-center gap-1.5 transition-all ${
                hardware === 'cpu'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" /> CPU (Intel i7)
            </button>
            <button
              onClick={() => setHardware('gpu')}
              className={`px-3 py-1 text-xs rounded-md font-medium flex items-center gap-1.5 transition-all ${
                hardware === 'gpu'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" /> GPU (CUDA T4)
            </button>
          </div>
        </div>
      </div>

      {/* 4-Layer Architecture Pipeline Visualizer */}
      <div className="glass-panel p-6 rounded-2xl">
        <h4 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" /> Hierarchical Feature Extraction (Click layer to inspect)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {([1, 2, 3, 4] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setActiveFeatureLayer(lvl)}
              className={`p-4 rounded-xl border text-left transition-all ${
                activeFeatureLayer === lvl
                  ? 'bg-slate-900/90 border-cyan-400 shadow-lg shadow-cyan-500/15'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-cyan-400">Conv2D #{lvl}</span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {lvl === 1 ? '32 filters' : lvl === 2 ? '64 filters' : '128 filters'}
                </span>
              </div>
              <h5 className="text-sm font-semibold text-slate-200 mb-1">
                {lvl === 1 ? 'Edges & Contours' : lvl === 2 ? 'Corners & Textures' : lvl === 3 ? 'Object Parts' : 'Class Semantics'}
              </h5>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                {featureLayerDescriptions[lvl].desc}
              </p>
            </button>
          ))}
        </div>

        {/* Feature Inspector Detail Card */}
        <div className="mt-4 p-5 bg-slate-950 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <h5 className={`font-semibold text-sm ${layerInfo.color}`}>{layerInfo.title}</h5>
            <span className="text-[11px] text-slate-400 font-mono">Receptive Field: {activeFeatureLayer * 4 + 3}×{activeFeatureLayer * 4 + 3} px</span>
          </div>
          <p className="text-xs text-slate-300 mb-4">{layerInfo.desc}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {layerInfo.visuals.map((vis, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded bg-slate-950 border border-slate-700 flex items-center justify-center font-mono text-cyan-400 text-xs">
                  f_{activeFeatureLayer}.{idx + 1}
                </div>
                <span className="text-[11px] text-slate-300 font-medium">{vis}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Epoch & Hardware Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Accuracy Card */}
        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">Classification Accuracy</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-emerald-400 mb-1">
            {currentStats.valAcc}%
          </div>
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>Train: {currentStats.trainAcc}%</span>
            <span>Val: {currentStats.valAcc}%</span>
          </div>
        </div>

        {/* Loss Card */}
        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-cyan-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">Cross-Entropy Loss</span>
            <Server className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-cyan-400 mb-1">
            {currentStats.valLoss.toFixed(3)}
          </div>
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>Train: {currentStats.trainLoss.toFixed(3)}</span>
            <span>Val: {currentStats.valLoss.toFixed(3)}</span>
          </div>
        </div>

        {/* Execution Time Benchmark */}
        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">Training Wall-Clock Time</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-amber-400 mb-1">
            {hardware === 'gpu' ? currentStats.gpuTime : currentStats.cpuTime}
          </div>
          <div className="text-xs text-slate-400">
            {hardware === 'gpu' ? (
              <span className="text-emerald-400 font-medium">⚡ 7.5× GPU acceleration speedup</span>
            ) : (
              <span className="text-amber-400 font-medium">⚠️ CPU matrix multiplications bottleneck</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

