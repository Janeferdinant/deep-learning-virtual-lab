import React, { useState } from 'react';
import { Eye, Layers, Sliders, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import { apiService } from '../../services/api';

export const FeatureMapExplorerApp: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<1 | 2 | 3 | 4>(1);
  const [selectedFilterIdx, setSelectedFilterIdx] = useState<number>(0);
  const [specimen, setSpecimen] = useState<'cat' | 'digit7' | 'car' | 'sneaker'>('digit7');
  const [colormap, setColormap] = useState<'cyan' | 'viridis' | 'gray'>('cyan');

  const specimens = {
    digit7: { name: 'MNIST Digit 7', icon: '7', type: 'Handwritten Digit' },
    cat: { name: 'CIFAR-10 Cat', icon: '🐱', type: 'Natural Animal Specimen' },
    car: { name: 'Automobile', icon: '🚗', type: 'Rigid Industrial Geometry' },
    sneaker: { name: 'Fashion Sneaker', icon: '👟', type: 'Footwear Profile' },
  };

  const layerConfigs = {
    1: {
      name: 'Conv2D Layer 1 (32 Filters @ 3×3)',
      outputSize: '26 × 26 × 32',
      semanticLevel: 'Low-Level Sensory Primitives',
      description: 'Extracts oriented edges, lines, spatial contrast steps, and color transitions.',
      filters: ['Vertical Sobel', 'Horizontal Sobel', 'Diagonal 45°', 'Corner Apex', 'Gaussian Blur', 'Sharpen Ring'],
      kernels: [
        [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]],
        [[-1, -2, -1], [0, 0, 0], [1, 2, 1]],
        [[0, 1, 2], [-1, 0, 1], [-2, -1, 0]],
        [[1, 1, 1], [1, -7, 1], [1, 1, 1]],
        [[0.06, 0.12, 0.06], [0.12, 0.25, 0.12], [0.06, 0.12, 0.06]],
        [[0, -1, 0], [-1, 5, -1], [0, -1, 0]],
      ],
    },
    2: {
      name: 'Conv2D Layer 2 (64 Filters @ 3×3)',
      outputSize: '11 × 11 × 64',
      semanticLevel: 'Mid-Level Textures & Junctions',
      description: 'Combines simple edges into geometric corners, T-junctions, cross-hatchings, and fabric textures.',
      filters: ['Cross Junction', 'T-Intersection', 'Radial Texture', 'Right Angle', 'Circular Arc', 'Parallel Stripes'],
      kernels: [
        [[1, -2, 1], [-2, 4, -2], [1, -2, 1]],
        [[2, 2, 2], [-1, 2, -1], [-1, 2, -1]],
        [[0, 2, 0], [2, -4, 2], [0, 2, 0]],
        [[-1, 2, 2], [-1, 2, -1], [-1, -1, -1]],
        [[1, 2, 1], [2, 0, 2], [1, 2, 1]],
        [[-1, 2, -1], [-1, 2, -1], [-1, 2, -1]],
      ],
    },
    3: {
      name: 'Conv2D Layer 3 (128 Filters @ 3×3)',
      outputSize: '5 × 5 × 128',
      semanticLevel: 'High-Level Parts & Motifs',
      description: 'Assembles corners into semantic sub-components: wheels, eyes, shoe soles, digit loops.',
      filters: ['Loop Detector', 'Horizontal Bar', 'Wheel Hub', 'Sole Profile', 'Corner Tip', 'Sleeve Seam'],
      kernels: [
        [[1, 2, 1], [2, -6, 2], [1, 2, 1]],
        [[3, 3, 3], [-2, -2, -2], [-2, -2, -2]],
        [[1, 3, 1], [3, -8, 3], [1, 3, 1]],
        [[-2, -2, -2], [3, 3, 3], [-2, -2, -2]],
        [[3, 1, -2], [1, 2, -2], [-2, -2, -2]],
        [[-2, 3, 1], [-2, 3, 1], [-2, 3, 1]],
      ],
    },
    4: {
      name: 'Conv2D Layer 4 (128 Filters @ 3×3)',
      outputSize: '2 × 2 × 128',
      semanticLevel: 'Full Object Class Semantics',
      description: 'Abstract representations ready for dense classifier head: holistic class templates.',
      filters: ['Digit 7 Template', 'Footwear Signature', 'Vehicle Silhouette', 'Animal Facial Map', 'Stroke Junction', 'Global Layout'],
      kernels: [
        [[2, 3, 1], [-1, 2, -1], [-2, 2, -2]],
        [[-2, -1, 3], [3, 2, -1], [-2, -1, -2]],
        [[2, 2, 2], [1, -4, 1], [2, 2, 2]],
        [[1, 3, 1], [-2, 2, -2], [1, -2, 1]],
        [[3, -2, 1], [-1, 3, -1], [1, -2, 3]],
        [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
      ],
    },
  };

  const currentLayer = layerConfigs[activeLayer];
  const activeKernel = currentLayer.kernels[selectedFilterIdx] || currentLayer.kernels[0];

  return (
    <div className="space-y-6">
      {/* App Header */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400">
                APP 8 • CONVOLUTIONAL FEATURE VISUALIZER
              </span>
              <span className="text-xs font-mono text-slate-400">Layer-by-Layer Activation Maps</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">CNN Feature-Map Explorer</h2>
            <p className="text-xs text-slate-400 mt-1">
              Look inside deep convolutional filters to inspect how raw pixel matrices transform hierarchically into abstract semantic concepts.
            </p>
          </div>

          {/* Colormap toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Palette:</span>
            <div className="flex rounded-lg bg-slate-900 border border-slate-700 p-0.5">
              {(['cyan', 'viridis', 'gray'] as const).map((cm) => (
                <button
                  key={cm}
                  onClick={() => setColormap(cm)}
                  className={`px-3 py-1 text-xs rounded font-mono capitalize transition-all ${
                    colormap === cm
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cm}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Layer Step Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {([1, 2, 3, 4] as const).map((lvl) => (
          <button
            key={lvl}
            onClick={() => {
              setActiveLayer(lvl);
              setSelectedFilterIdx(0);
            }}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeLayer === lvl
                ? 'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400'
                : 'glass-panel hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold font-mono text-cyan-300">Level {lvl}</span>
              <span className="text-[10px] text-slate-400 font-mono">{layerConfigs[lvl].outputSize}</span>
            </div>
            <h5 className="font-semibold text-slate-200 text-xs mb-1">
              {layerConfigs[lvl].semanticLevel.split(' ')[0]}
            </h5>
            <p className="text-[10px] text-slate-400 line-clamp-1">
              {layerConfigs[lvl].semanticLevel}
            </p>
          </button>
        ))}
      </div>

      {/* Main Grid: Filter Activations & 3x3 Weights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Filter Activations List (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-slate-100 text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" /> {currentLayer.name}
            </h4>
            <span className="text-xs font-mono text-cyan-300">{currentLayer.outputSize}</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">{currentLayer.description}</p>

          {/* Filter Activation Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {currentLayer.filters.map((name, idx) => {
              const isSelected = selectedFilterIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedFilterIdx(idx)}
                  className={`p-3 rounded-2xl border flex flex-col items-center transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-400 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div
                    className={`w-20 h-20 rounded-xl mb-2 flex items-center justify-center font-mono font-bold text-lg select-none border ${
                      colormap === 'cyan'
                        ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300'
                        : colormap === 'viridis'
                        ? 'bg-emerald-950/80 border-emerald-500/50 text-amber-300'
                        : 'bg-black border-slate-700 text-slate-200'
                    }`}
                  >
                    {specimens[specimen].icon}
                  </div>
                  <span className="text-xs font-semibold text-slate-300 text-center line-clamp-1">
                    {name}
                  </span>
                  <span className="text-[10px] text-cyan-400 font-mono mt-0.5">Filter #{idx + 1}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3x3 Weight Kernel & Mathematics (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl flex flex-col justify-between">
          <div>
            <h4 className="font-semibold text-slate-100 text-sm mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-400" /> Learned 3×3 Kernel Weights
            </h4>
            <span className="text-xs font-mono text-slate-400 block mb-4">
              Filter: {currentLayer.filters[selectedFilterIdx]}
            </span>

            {/* 3x3 Kernel Matrix Grid */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950 rounded-2xl border border-amber-500/30 max-w-[240px] mx-auto">
              {activeKernel.map((row, r) =>
                row.map((val, c) => (
                  <div
                    key={`${r}-${c}`}
                    className="w-16 h-16 rounded-xl bg-amber-950/40 border border-amber-500/40 flex items-center justify-center text-xs font-mono font-bold text-amber-300"
                  >
                    {typeof val === 'number' && val % 1 !== 0 ? val.toFixed(2) : val}
                  </div>
                ))
              )}
            </div>

            {/* Specimen Switcher */}
            <div className="mt-5">
              <span className="text-xs font-mono text-slate-400 block mb-2">Input Image Stimulus:</span>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(specimens).map(([key, sp]) => (
                  <button
                    key={key}
                    onClick={() => setSpecimen(key as any)}
                    className={`p-2 rounded-xl border text-left text-xs flex items-center gap-2 transition-all ${
                      specimen === key
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span>{sp.icon}</span>
                    <span className="truncate">{sp.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800 text-xs text-slate-400 font-mono">
            Feature Map S = ReLU( Input ⊛ Kernel + Bias )
          </div>
        </div>
      </div>
    </div>
  );
};

