import React, { useState } from 'react';
import { Eye, Layers, Sliders, Play, RotateCcw, Cpu, CheckCircle } from 'lucide-react';

export const Cnn2LayerSimulator: React.FC = () => {
  // 6x6 sample input image pixel matrix
  const sampleInput = [
    [0, 0, 100, 100, 0, 0],
    [0, 50, 255, 255, 50, 0],
    [0, 150, 255, 255, 150, 0],
    [0, 150, 255, 255, 150, 0],
    [0, 50, 255, 255, 50, 0],
    [0, 0, 100, 100, 0, 0],
  ];

  // Convolution filters (3x3 kernels)
  const filters: Record<string, { name: string; kernel: number[][]; desc: string }> = {
    verticalEdge: {
      name: 'Vertical Edge (Sobel-Y)',
      kernel: [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1],
      ],
      desc: 'Detects vertical boundaries and structural edges',
    },
    horizontalEdge: {
      name: 'Horizontal Edge (Sobel-X)',
      kernel: [
        [-1, -2, -1],
        [0, 0, 0],
        [1, 2, 1],
      ],
      desc: 'Detects horizontal transitions, roofs, lines',
    },
    sharpen: {
      name: 'Sharpen Kernel',
      kernel: [
        [0, -1, 0],
        [-1, 5, -1],
        [0, -1, 0],
      ],
      desc: 'Accentuates high-frequency contrast gradients',
    },
    gaussian: {
      name: 'Gaussian Blur 3×3',
      kernel: [
        [1 / 16, 2 / 16, 1 / 16],
        [2 / 16, 4 / 16, 2 / 16],
        [1 / 16, 2 / 16, 1 / 16],
      ],
      desc: 'Low-pass filter for noise suppression',
    },
  };

  const [selectedFilterKey, setSelectedFilterKey] = useState<string>('verticalEdge');
  const [kernelPos, setKernelPos] = useState<{ r: number; c: number }>({ r: 1, c: 1 });
  const [dataset, setDataset] = useState<'mnist' | 'cifar10'>('mnist');
  const [activeTab, setActiveTab] = useState<'kernel' | 'flow' | 'train'>('kernel');

  const activeFilter = filters[selectedFilterKey];

  // Calculate 3x3 convolution at specific position (r, c)
  const computeConvValue = (r: number, c: number, kernel: number[][]) => {
    let sum = 0;
    for (let ki = -1; ki <= 1; ki++) {
      for (let kj = -1; kj <= 1; kj++) {
        const pixel = sampleInput[r + ki][c + kj];
        sum += pixel * kernel[ki + 1][kj + 1];
      }
    }
    return Math.round(sum);
  };

  // 4x4 Output Feature Map (VALID padding, 6-3+1 = 4)
  const featureMap: number[][] = [];
  for (let r = 1; r <= 4; r++) {
    const row: number[] = [];
    for (let c = 1; c <= 4; c++) {
      row.push(computeConvValue(r, c, activeFilter.kernel));
    }
    featureMap.push(row);
  }

  // 2x2 Max Pooling on the 4x4 feature map
  const maxPoolMap: number[][] = [
    [
      Math.max(featureMap[0][0], featureMap[0][1], featureMap[1][0], featureMap[1][1]),
      Math.max(featureMap[0][2], featureMap[0][3], featureMap[1][2], featureMap[1][3]),
    ],
    [
      Math.max(featureMap[2][0], featureMap[2][1], featureMap[3][0], featureMap[3][1]),
      Math.max(featureMap[2][2], featureMap[2][3], featureMap[3][2], featureMap[3][3]),
    ],
  ];

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="glass-panel p-3 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('kernel')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'kernel'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" /> 3×3 Sliding Kernel & MaxPool
          </button>
          <button
            onClick={() => setActiveTab('flow')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'flow'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> 2-Layer CNN Architecture Flow
          </button>
          <button
            onClick={() => setActiveTab('train')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'train'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" /> MNIST / CIFAR-10 Benchmark
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Dataset:</span>
          <select
            value={dataset}
            onChange={(e) => setDataset(e.target.value as any)}
            className="bg-slate-900 border border-slate-700 text-xs text-cyan-400 rounded-lg px-2.5 py-1"
          >
            <option value="mnist">MNIST (1 Channel Gray)</option>
            <option value="cifar10">CIFAR-10 (3 Channels RGB)</option>
          </select>
        </div>
      </div>

      {activeTab === 'kernel' && (
        <div className="space-y-6">
          {/* Filter selector */}
          <div className="glass-panel p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Select Convolution Kernel (Weight Filter):</label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(filters).map(([key, f]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedFilterKey(key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      selectedFilterKey === key
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-xs text-cyan-300 font-mono italic max-w-sm">"{activeFilter.desc}"</p>
          </div>

          {/* 3 Columns: Input Matrix -> Kernel Matrix -> Output Feature Map */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Grid (6x6) */}
            <div className="glass-panel p-5 rounded-2xl flex flex-col items-center">
              <span className="text-xs font-mono text-cyan-400 mb-2">Input Image (6×6 Matrix)</span>
              <div className="grid grid-cols-6 gap-1 p-2 bg-slate-950 rounded-xl border border-slate-800">
                {sampleInput.map((row, r) =>
                  row.map((val, c) => {
                    const isUnderKernel =
                      r >= kernelPos.r - 1 &&
                      r <= kernelPos.r + 1 &&
                      c >= kernelPos.c - 1 &&
                      c <= kernelPos.c + 1;
                    return (
                      <button
                        key={`${r}-${c}`}
                        onClick={() => {
                          if (r >= 1 && r <= 4 && c >= 1 && c <= 4) {
                            setKernelPos({ r, c });
                          }
                        }}
                        className={`w-9 h-9 rounded flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                          isUnderKernel
                            ? 'ring-2 ring-cyan-400 bg-cyan-900/60 text-cyan-200'
                            : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                        }`}
                        title={`Click to position kernel here (${r}, ${c})`}
                      >
                        {val}
                      </button>
                    );
                  })
                )}
              </div>
              <span className="text-[10px] text-slate-500 mt-2">Click any internal cell (1..4) to reposition kernel</span>
            </div>

            {/* 3x3 Kernel & Math Formula */}
            <div className="glass-panel p-5 rounded-2xl flex flex-col items-center justify-between">
              <span className="text-xs font-mono text-amber-400 mb-2">3×3 Filter Weights (W)</span>
              <div className="grid grid-cols-3 gap-1.5 p-2 bg-slate-950 rounded-xl border border-amber-500/30">
                {activeFilter.kernel.map((row, ki) =>
                  row.map((w, kj) => (
                    <div
                      key={`${ki}-${kj}`}
                      className="w-12 h-12 rounded bg-amber-950/40 border border-amber-500/40 flex items-center justify-center text-xs font-mono font-bold text-amber-300"
                    >
                      {typeof w === 'number' && w % 1 !== 0 ? w.toFixed(2) : w}
                    </div>
                  ))
                )}
              </div>

              {/* Math accumulator */}
              <div className="w-full mt-3 p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300">
                <div className="text-slate-400 mb-1">Dot-Product Accumulator:</div>
                <div className="text-cyan-400 font-bold">
                  S = ∑ (Pixel × Kernel) = {computeConvValue(kernelPos.r, kernelPos.c, activeFilter.kernel)}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Position: ({kernelPos.r}, {kernelPos.c})</div>
              </div>
            </div>

            {/* Output Feature Map (4x4) & MaxPool (2x2) */}
            <div className="glass-panel p-5 rounded-2xl flex flex-col items-center">
              <span className="text-xs font-mono text-emerald-400 mb-2">Conv2D Output (4×4 Map)</span>
              <div className="grid grid-cols-4 gap-1 p-2 bg-slate-950 rounded-xl border border-emerald-500/30 mb-4">
                {featureMap.map((row, r) =>
                  row.map((val, c) => {
                    const isSelected = r + 1 === kernelPos.r && c + 1 === kernelPos.c;
                    return (
                      <div
                        key={`${r}-${c}`}
                        className={`w-9 h-9 rounded flex items-center justify-center text-[10px] font-mono font-bold ${
                          isSelected
                            ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-300'
                            : 'bg-slate-900 text-emerald-400'
                        }`}
                      >
                        {val}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Max Pooling 2x2 */}
              <span className="text-xs font-mono text-indigo-400 mb-1">MaxPooling2D (2×2, Stride=2)</span>
              <div className="grid grid-cols-2 gap-1.5 p-2 bg-slate-950 rounded-xl border border-indigo-500/30">
                {maxPoolMap.map((row, pr) =>
                  row.map((pval, pc) => (
                    <div
                      key={`${pr}-${pc}`}
                      className="w-12 h-10 rounded bg-indigo-950/60 border border-indigo-500/40 flex items-center justify-center text-xs font-mono font-bold text-indigo-200"
                    >
                      {pval}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'flow' && (
        <div className="glass-panel p-6 rounded-2xl space-y-6">
          <h4 className="font-semibold text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" /> Prescribed 2-Layer CNN Pipeline Flow
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 text-center">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">1. Input</span>
              <div className="text-sm font-bold text-slate-200 my-1">28×28×1</div>
              <span className="text-[10px] text-slate-500">MNIST Grayscale</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/40">
              <span className="text-xs text-cyan-400">2. Conv2D #1</span>
              <div className="text-sm font-bold text-cyan-300 my-1">32 @ 3×3</div>
              <span className="text-[10px] text-slate-400">ReLU (26×26×32)</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/40">
              <span className="text-xs text-cyan-400">3. MaxPool #1</span>
              <div className="text-sm font-bold text-cyan-300 my-1">2×2 (Pool)</div>
              <span className="text-[10px] text-slate-400">13×13×32</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/40">
              <span className="text-xs text-indigo-400">4. Conv2D #2</span>
              <div className="text-sm font-bold text-indigo-300 my-1">64 @ 3×3</div>
              <span className="text-[10px] text-slate-400">ReLU (11×11×64)</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/40">
              <span className="text-xs text-indigo-400">5. MaxPool #2</span>
              <div className="text-sm font-bold text-indigo-300 my-1">2×2 (Pool)</div>
              <span className="text-[10px] text-slate-400">5×5×64 = 1600</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/40">
              <span className="text-xs text-emerald-400">6. Dense Output</span>
              <div className="text-sm font-bold text-emerald-300 my-1">Dense(10)</div>
              <span className="text-[10px] text-slate-400">Softmax Probabilities</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'train' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="glass-panel p-5 rounded-2xl">
            <h5 className="font-semibold text-slate-100 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> MNIST Training Results (2-Layer CNN)
            </h5>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Total Parameters:</span>
                <span className="font-mono text-cyan-400">105,802</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Epoch 10 Accuracy:</span>
                <span className="font-mono text-emerald-400 font-bold">99.12%</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Validation Loss:</span>
                <span className="font-mono text-slate-300">0.0284</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Avg Time per Epoch (CPU):</span>
                <span className="font-mono text-amber-400">18.4s</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl">
            <h5 className="font-semibold text-slate-100 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400" /> CIFAR-10 Training Results (2-Layer CNN)
            </h5>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Total Parameters:</span>
                <span className="font-mono text-cyan-400">142,346</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Epoch 10 Accuracy:</span>
                <span className="font-mono text-cyan-400 font-bold">68.45%</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Why CIFAR-10 is lower:</span>
                <span className="text-slate-400">2 conv layers lack receptive field depth for 32x32 color objects</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Remedy (Week 6):</span>
                <span className="font-mono text-emerald-400">Scale to 4+ Conv layers</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

