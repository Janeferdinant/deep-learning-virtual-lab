import React, { useState } from 'react';
import { Layers, Info, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';

export const LeNetSimulator: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<string>('c1');
  const [testDataset, setTestDataset] = useState<'mnist' | 'fashion'>('mnist');

  // Full LeNet-5 layer specifications
  const lenetLayers: Record<
    string,
    {
      name: string;
      code: string;
      type: string;
      outputShape: string;
      params: number;
      activation: string;
      details: string;
      historicalNote: string;
    }
  > = {
    input: {
      name: 'Input Layer',
      code: 'Input',
      type: 'Raw Grayscale Image',
      outputShape: '32 × 32 × 1',
      params: 0,
      activation: 'None',
      details: 'MNIST digits (28×28) zero-padded to 32×32 so corner features are retained at layer C1.',
      historicalNote: 'Original 1998 Bell Labs specification by Yann LeCun.',
    },
    c1: {
      name: 'Layer C1 (Convolution)',
      code: 'C1',
      type: 'Conv2D (6 filters @ 5×5, stride 1, VALID)',
      outputShape: '28 × 28 × 6',
      params: (5 * 5 * 1 + 1) * 6, // 156
      activation: 'Tanh / Sigmoid',
      details: '6 distinct feature maps extracting oriented edge fragments and stroke endpoints.',
      historicalNote: 'Only 156 trainable parameters, establishing translational invariance.',
    },
    s2: {
      name: 'Layer S2 (Subsampling / AvgPool)',
      code: 'S2',
      type: 'AveragePooling2D (2×2, stride 2)',
      outputShape: '14 × 14 × 6',
      params: 6 * 2, // 12 (learned coefficient and bias in 1998)
      activation: 'Scaled Sigmoid',
      details: 'Reduces spatial resolution by half, providing spatial blur and minor distortion tolerance.',
      historicalNote: 'Modern implementations use MaxPooling2D; original 1998 paper used trainable average pooling.',
    },
    c3: {
      name: 'Layer C3 (Convolution)',
      code: 'C3',
      type: 'Conv2D (16 filters @ 5×5, stride 1, VALID)',
      outputShape: '10 × 10 × 16',
      params: 1516, // Non-complete connection map in original, ~2,416 if dense
      activation: 'Tanh',
      details: 'Combines multiple S2 feature maps using a non-symmetrical connection matrix to force complementary feature extraction.',
      historicalNote: 'Forces different maps to learn distinct higher-order features.',
    },
    s4: {
      name: 'Layer S4 (Subsampling / AvgPool)',
      code: 'S4',
      type: 'AveragePooling2D (2×2, stride 2)',
      outputShape: '5 × 5 × 16',
      params: 16 * 2, // 32
      activation: 'Scaled Sigmoid',
      details: 'Reduces dimension to 5×5 while preserving 16 distinct high-order channels.',
      historicalNote: 'Total spatial footprint reduces from 1024 input pixels to 400 features.',
    },
    c5: {
      name: 'Layer C5 (Convolutional Flattening)',
      code: 'C5',
      type: 'Conv2D (120 filters @ 5×5, stride 1, VALID)',
      outputShape: '1 × 1 × 120',
      params: (5 * 5 * 16 + 1) * 120, // 48,120
      activation: 'Tanh',
      details: 'Because the 5×5 kernel matches the 5×5 input size exactly, it acts as a fully connected layer with 120 outputs.',
      historicalNote: 'Often written as Dense(120) in modern Keras implementations.',
    },
    f6: {
      name: 'Layer F6 (Fully Connected)',
      code: 'F6',
      type: 'Dense (84 units)',
      outputShape: '84',
      params: 120 * 84 + 84, // 10,164
      activation: 'Scaled Tanh',
      details: '84 neurons matched the 7×12 bitmap representation of ASCII characters used in USPS postal zip automation.',
      historicalNote: '84 units originally chosen to decode bitmap characters.',
    },
    output: {
      name: 'Output Layer (RBF / Softmax)',
      code: 'Output',
      type: 'Dense (10 units / Euclidean RBF)',
      outputShape: '10',
      params: 84 * 10 + 10, // 850
      activation: 'Softmax / Euclidean Loss',
      details: 'Computes probability distribution across digits 0 through 9.',
      historicalNote: 'Processed over 10% of all US bank cheques in the late 1990s.',
    },
  };

  const active = lenetLayers[selectedLayer];
  const totalParams = Object.values(lenetLayers).reduce((acc, l) => acc + l.params, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="font-semibold text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" /> LeNet-5 Architecture (Yann LeCun et al., 1998)
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            The seminal Convolutional Neural Network that proved backpropagation for vision recognition tasks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Target Dataset:</span>
          <select
            value={testDataset}
            onChange={(e) => setTestDataset(e.target.value as any)}
            className="bg-slate-900 border border-slate-700 text-xs text-cyan-400 rounded-lg px-3 py-1.5 font-medium"
          >
            <option value="mnist">MNIST Handwritten Digits</option>
            <option value="fashion">Fashion MNIST Apparel</option>
          </select>
        </div>
      </div>

      {/* Layer Stack Interactive Pipeline */}
      <div className="glass-panel p-6 rounded-2xl">
        <span className="text-xs font-semibold text-slate-300 block mb-3">
          Interactive Layer Sequence (Click any block to inspect details):
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {Object.entries(lenetLayers).map(([key, layer]) => (
            <button
              key={key}
              onClick={() => setSelectedLayer(key)}
              className={`p-3 rounded-xl border text-center transition-all ${
                selectedLayer === key
                  ? 'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className="text-xs font-bold font-mono text-cyan-300 block">{layer.code}</span>
              <span className="text-[10px] text-slate-400 font-mono block mt-1">{layer.outputShape}</span>
              <span className="text-[9px] text-slate-500 block mt-0.5">{layer.params} params</span>
            </button>
          ))}
        </div>

        {/* Selected Layer Detail Card */}
        <div className="mt-5 p-5 bg-slate-950 rounded-xl border border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div>
              <h5 className="font-semibold text-slate-100 text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" /> {active.name}
              </h5>
              <span className="text-xs font-mono text-slate-400">{active.type}</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                Shape: {active.outputShape}
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400">
                Parameters: {active.params.toLocaleString()}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-3">{active.details}</p>

          <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200 flex items-start gap-2">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Historical Note:</span> {active.historicalNote}
            </div>
          </div>
        </div>
      </div>

      {/* Model Summary & Application Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-panel p-5 rounded-2xl">
          <span className="text-xs text-slate-400">Total Trainable Parameters</span>
          <div className="text-3xl font-bold font-mono text-cyan-400 my-1">
            ~60,000
          </div>
          <p className="text-xs text-slate-400">
            Remarkably lightweight; easily runs in real-time even on embedded 1990s hardware.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <span className="text-xs text-slate-400">
            {testDataset === 'mnist' ? 'MNIST Test Accuracy' : 'Fashion MNIST Accuracy'}
          </span>
          <div className="text-3xl font-bold font-mono text-emerald-400 my-1">
            {testDataset === 'mnist' ? '99.05%' : '90.2%'}
          </div>
          <p className="text-xs text-slate-400">
            Trained with Adam / SGD with learning rate decay over 20 epochs.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <span className="text-xs text-slate-400">Banking Automation Impact</span>
          <div className="text-xl font-bold text-slate-200 my-1">
            NCR 7731 Bank Check Scanner
          </div>
          <p className="text-xs text-slate-400">
            Processed hundreds of millions of cheques across North America in ATM deposit kiosks.
          </p>
        </div>
      </div>
    </div>
  );
};

