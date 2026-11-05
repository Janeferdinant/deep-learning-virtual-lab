import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Plus, Minus, Layers, TrendingUp, Cpu, Info } from 'lucide-react';

export const DeepAnnsSimulator: React.FC = () => {
  // Network configuration: at least 4 hidden layers by default
  const [hiddenLayers, setHiddenLayers] = useState<number[]>([8, 12, 10, 6]);
  const [dataset, setDataset] = useState<'iris' | 'ionosphere'>('iris');
  const [activation, setActivation] = useState<'relu' | 'sigmoid' | 'tanh'>('relu');
  const [isTraining, setIsTraining] = useState(false);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [history, setHistory] = useState<{ epoch: number; deepLoss: number; deepAcc: number; shallowLoss: number; shallowAcc: number }[]>([]);

  const inputSize = dataset === 'iris' ? 4 : 34;
  const outputSize = dataset === 'iris' ? 3 : 2;

  // Add a hidden layer (up to 6)
  const addLayer = () => {
    if (hiddenLayers.length < 6) {
      setHiddenLayers([...hiddenLayers, 8]);
    }
  };

  // Remove a hidden layer (minimum 4 to satisfy syllabus requirements)
  const removeLayer = () => {
    if (hiddenLayers.length > 4) {
      setHiddenLayers(hiddenLayers.slice(0, -1));
    }
  };

  // Adjust neuron count of a specific layer
  const updateNeuronCount = (index: number, count: number) => {
    const updated = [...hiddenLayers];
    updated[index] = Math.max(2, Math.min(16, count));
    setHiddenLayers(updated);
  };

  const resetSimulation = () => {
    setIsTraining(false);
    setCurrentEpoch(0);
    setHistory([]);
  };

  // Simulation step
  useEffect(() => {
    let timer: any;
    if (isTraining && currentEpoch < 50) {
      timer = setTimeout(() => {
        const nextEpoch = currentEpoch + 1;
        const totalHiddenNeurons = hiddenLayers.reduce((a, b) => a + b, 0);

        // Theoretical convergence curves: deeper networks handle complex boundaries (Ionosphere) better
        const deepLoss = Math.max(0.04, 1.8 * Math.exp(-nextEpoch / (dataset === 'ionosphere' ? 12 : 8)) + 0.05 * Math.random());
        const deepAcc = Math.min(0.99, 0.45 + 0.53 * (1 - Math.exp(-nextEpoch / 10)) + 0.01 * (Math.random() - 0.5));

        // Shallow network (1 hidden layer of 8 neurons) plateaus earlier on high-dim data
        const shallowLoss = Math.max(0.22, 1.8 * Math.exp(-nextEpoch / 14) + (dataset === 'ionosphere' ? 0.18 : 0.08) + 0.05 * Math.random());
        const shallowAcc = Math.min(dataset === 'ionosphere' ? 0.82 : 0.93, 0.40 + 0.50 * (1 - Math.exp(-nextEpoch / 12)));

        setHistory((prev) => [...prev, { epoch: nextEpoch, deepLoss, deepAcc, shallowLoss, shallowAcc }]);
        setCurrentEpoch(nextEpoch);
      }, 100);
    } else if (currentEpoch >= 50) {
      setIsTraining(false);
    }
    return () => clearTimeout(timer);
  }, [isTraining, currentEpoch, dataset, hiddenLayers]);

  const latest = history[history.length - 1] || { deepLoss: 1.8, deepAcc: 0.33, shallowLoss: 1.8, shallowAcc: 0.33 };

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="glass-panel p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Target Dataset</label>
            <select
              value={dataset}
              onChange={(e) => {
                setDataset(e.target.value as 'iris' | 'ionosphere');
                resetSimulation();
              }}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-cyan-400 focus:outline-none focus:border-cyan-500"
            >
              <option value="iris">Iris Flowers (4 inputs, 3 classes)</option>
              <option value="ionosphere">Ionosphere Radar (34 inputs, 2 classes)</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Activation Function</label>
            <select
              value={activation}
              onChange={(e) => setActivation(e.target.value as any)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="relu">ReLU (Rectified Linear Unit)</option>
              <option value="sigmoid">Sigmoid</option>
              <option value="tanh">Hyperbolic Tangent (Tanh)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsTraining(!isTraining)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
              isTraining
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
            }`}
          >
            <Play className={`w-4 h-4 ${isTraining ? 'animate-pulse' : ''}`} />
            {isTraining ? 'Pause Training' : currentEpoch === 50 ? 'Retrain Model' : 'Train Deep ANN'}
          </button>
          <button
            onClick={resetSimulation}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
            title="Reset Simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Layer Architect Grid */}
      <div className="glass-panel p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h4 className="font-semibold text-slate-100">Deep Feed-Forward Network Architecture Builder</h4>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 font-mono">
              {hiddenLayers.length} Hidden Layers (Prescribed ≥ 4)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={addLayer}
              disabled={hiddenLayers.length >= 6}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs rounded-lg flex items-center gap-1 text-slate-200"
            >
              <Plus className="w-3.5 h-3.5" /> Add Hidden Layer
            </button>
            <button
              onClick={removeLayer}
              disabled={hiddenLayers.length <= 4}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs rounded-lg flex items-center gap-1 text-slate-200"
            >
              <Minus className="w-3.5 h-3.5" /> Remove Layer
            </button>
          </div>
        </div>

        {/* Neural Flow Visualizer */}
        <div className="bg-[#080d1a] border border-slate-800/80 rounded-xl p-5 overflow-x-auto">
          <div className="min-w-[700px] flex items-center justify-between gap-4 py-4">
            {/* Input Layer */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-mono text-emerald-400 mb-2">Input Layer</span>
              <div className="bg-slate-900 border border-emerald-500/40 rounded-xl p-3 flex flex-col items-center gap-1.5 shadow-md shadow-emerald-500/10">
                <span className="text-sm font-bold text-emerald-300">{inputSize}</span>
                <span className="text-[10px] text-slate-400">Features</span>
                <div className="flex flex-col gap-1 my-1">
                  {[...Array(Math.min(inputSize, 5))].map((_, i) => (
                    <div key={i} className="w-3 h-3 rounded-full bg-emerald-400/80"></div>
                  ))}
                  {inputSize > 5 && <span className="text-[10px] text-slate-500 font-bold">⋮</span>}
                </div>
              </div>
            </div>

            {/* Hidden Layers */}
            {hiddenLayers.map((neurons, idx) => (
              <React.Fragment key={idx}>
                {/* Arrow / Connection */}
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className={`h-0.5 w-full bg-gradient-to-r from-slate-700 via-cyan-500 to-slate-700 ${isTraining ? 'animate-pulse' : ''}`} />
                  <span className="text-[10px] text-slate-500 font-mono mt-1">Dense W{idx + 1}</span>
                </div>

                {/* Layer Box */}
                <div className="flex flex-col items-center">
                  <span className="text-xs font-mono text-cyan-400 mb-2">Hidden {idx + 1}</span>
                  <div className="bg-slate-900 border border-cyan-500/40 rounded-xl p-3 flex flex-col items-center gap-1.5 shadow-md shadow-cyan-500/10">
                    <span className="text-sm font-bold text-cyan-300">{neurons} Neurons</span>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">{activation}</span>
                    <div className="flex flex-col gap-1 my-1">
                      {[...Array(Math.min(neurons, 4))].map((_, ni) => (
                        <div
                          key={ni}
                          className={`w-3 h-3 rounded-full ${
                            isTraining ? 'bg-cyan-400 signal-node' : 'bg-cyan-600'
                          }`}
                        />
                      ))}
                      {neurons > 4 && <span className="text-[10px] text-slate-500 font-bold">⋮</span>}
                    </div>
                    {/* Stepper buttons */}
                    <div className="flex items-center gap-1 mt-1">
                      <button
                        onClick={() => updateNeuronCount(idx, neurons - 2)}
                        disabled={neurons <= 2}
                        className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center justify-center"
                      >
                        -
                      </button>
                      <button
                        onClick={() => updateNeuronCount(idx, neurons + 2)}
                        disabled={neurons >= 16}
                        className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}

            {/* Output Layer */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className={`h-0.5 w-full bg-gradient-to-r from-slate-700 via-indigo-500 to-slate-700 ${isTraining ? 'animate-pulse' : ''}`} />
              <span className="text-[10px] text-slate-500 font-mono mt-1">Softmax</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-xs font-mono text-indigo-400 mb-2">Output Layer</span>
              <div className="bg-slate-900 border border-indigo-500/40 rounded-xl p-3 flex flex-col items-center gap-1.5 shadow-md shadow-indigo-500/10">
                <span className="text-sm font-bold text-indigo-300">{outputSize}</span>
                <span className="text-[10px] text-slate-400">Softmax Classes</span>
                <div className="flex flex-col gap-1 my-1">
                  {[...Array(outputSize)].map((_, i) => (
                    <div key={i} className="w-3 h-3 rounded-full bg-indigo-400"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shallow vs Deep Comparison Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Deep Network Live Metrics */}
        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-cyan-500">
          <div className="flex items-center justify-between mb-3">
            <h5 className="font-semibold text-slate-100 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" /> Deep ANN (Your Architecture)
            </h5>
            <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded">
              Epoch {currentEpoch}/50
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Cross-Entropy Loss</span>
              <p className="text-2xl font-bold font-mono text-cyan-400 mt-1">{latest.deepLoss.toFixed(4)}</p>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Test Accuracy</span>
              <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">{(latest.deepAcc * 100).toFixed(1)}%</p>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Multi-layer representation allows hierarchical feature extraction. Deeper layers combine lower-level signals into non-linear decision manifolds.
          </p>
        </div>

        {/* Shallow Benchmark Comparison */}
        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between mb-3">
            <h5 className="font-semibold text-slate-100 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-400" /> Shallow ANN (Baseline: 1 Hidden Layer)
            </h5>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded">
              8 Neurons
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Cross-Entropy Loss</span>
              <p className="text-2xl font-bold font-mono text-amber-400 mt-1">{latest.shallowLoss.toFixed(4)}</p>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Test Accuracy</span>
              <p className="text-2xl font-bold font-mono text-slate-300 mt-1">{(latest.shallowAcc * 100).toFixed(1)}%</p>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            The shallow network struggles with non-convex boundaries on higher dimensional datasets like Ionosphere (34 features), plateauing with underfitting.
          </p>
        </div>
      </div>

      {/* Observation Box */}
      <div className="glass-card p-4 rounded-xl flex items-start gap-3 text-xs text-slate-300 border-l-2 border-l-cyan-400">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-100">Lab Insight (Week 3 Aim):</span> Building networks with 4 or more hidden layers allows deep representation learning. However, as layers increase, proper choice of activation (ReLU instead of Sigmoid) prevents vanishing gradients across the backpropagation weight product chain ∏ W_l.
        </div>
      </div>
    </div>
  );
};
