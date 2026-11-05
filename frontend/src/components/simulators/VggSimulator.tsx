import React, { useState } from 'react';
import { Layers, Zap, Database, ArrowRight, CheckCircle2, Lock, Unlock } from 'lucide-react';

export const VggSimulator: React.FC = () => {
  const [modelType, setModelType] = useState<'vgg16' | 'vgg19'>('vgg16');
  const [transferMode, setTransferMode] = useState<'extract' | 'finetune'>('extract');
  const [activeBlock, setActiveBlock] = useState<number>(1);

  // VGG blocks architecture
  const vggBlocks = [
    {
      id: 1,
      name: 'Block 1',
      layersVGG16: '2× Conv2D(64, 3×3) + MaxPool',
      layersVGG19: '2× Conv2D(64, 3×3) + MaxPool',
      outputShape: '112 × 112 × 64',
      params: '38,720',
      features: 'Low-level edges, color blobs, simple gradients',
      frozenExtract: true,
      frozenFineTune: true,
    },
    {
      id: 2,
      name: 'Block 2',
      layersVGG16: '2× Conv2D(128, 3×3) + MaxPool',
      layersVGG19: '2× Conv2D(128, 3×3) + MaxPool',
      outputShape: '56 × 56 × 128',
      params: '221,440',
      features: 'Corners, textures, simple line crossings',
      frozenExtract: true,
      frozenFineTune: true,
    },
    {
      id: 3,
      name: 'Block 3',
      layersVGG16: '3× Conv2D(256, 3×3) + MaxPool',
      layersVGG19: '4× Conv2D(256, 3×3) + MaxPool',
      outputShape: '28 × 28 × 256',
      params: '1,475,328',
      features: 'Complex textures, contour patterns, motif groups',
      frozenExtract: true,
      frozenFineTune: true,
    },
    {
      id: 4,
      name: 'Block 4',
      layersVGG16: '3× Conv2D(512, 3×3) + MaxPool',
      layersVGG19: '4× Conv2D(512, 3×3) + MaxPool',
      outputShape: '14 × 14 × 512',
      params: '5,899,776',
      features: 'Object components, wheels, animal eyes, petal shapes',
      frozenExtract: true,
      frozenFineTune: true,
    },
    {
      id: 5,
      name: 'Block 5',
      layersVGG16: '3× Conv2D(512, 3×3) + MaxPool',
      layersVGG19: '4× Conv2D(512, 3×3) + MaxPool',
      outputShape: '7 × 7 × 512',
      params: '7,079,424',
      features: 'High-level class semantics, domain-specific silhouettes',
      frozenExtract: true,
      frozenFineTune: false, // Unfrozen during fine-tuning!
    },
    {
      id: 6,
      name: 'Top Head (Classifier)',
      layersVGG16: 'Dense(4096) ➔ Dense(4096) ➔ Dense(N)',
      layersVGG19: 'Dense(4096) ➔ Dense(4096) ➔ Dense(N)',
      outputShape: 'N Custom Classes',
      params: '123,648,000 (ImageNet) / 102,400 (Custom)',
      features: 'Final task decision boundary',
      frozenExtract: false,
      frozenFineTune: false,
    },
  ];

  const currentBlock = vggBlocks[activeBlock - 1];

  return (
    <div className="space-y-6">
      {/* Model & Transfer Toggle */}
      <div className="glass-panel p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        {/* Model Switcher */}
        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-400">Model Architecture:</label>
          <div className="flex rounded-lg bg-slate-900 border border-slate-700 p-0.5">
            <button
              onClick={() => setModelType('vgg16')}
              className={`px-3.5 py-1.5 text-xs rounded-md font-semibold transition-all ${
                modelType === 'vgg16'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              VGG-16 (16 Weight Layers)
            </button>
            <button
              onClick={() => setModelType('vgg19')}
              className={`px-3.5 py-1.5 text-xs rounded-md font-semibold transition-all ${
                modelType === 'vgg19'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              VGG-19 (19 Weight Layers)
            </button>
          </div>
        </div>

        {/* Transfer Strategy */}
        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-400">Transfer Learning Strategy:</label>
          <div className="flex rounded-lg bg-slate-900 border border-slate-700 p-0.5">
            <button
              onClick={() => setTransferMode('extract')}
              className={`px-3 py-1.5 text-xs rounded-md font-semibold transition-all ${
                transferMode === 'extract'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Feature Extraction (Freeze Base)
            </button>
            <button
              onClick={() => setTransferMode('finetune')}
              className={`px-3 py-1.5 text-xs rounded-md font-semibold transition-all ${
                transferMode === 'finetune'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Fine-Tuning (Unfreeze Block 5)
            </button>
          </div>
        </div>
      </div>

      {/* VGG Architecture Block Flow */}
      <div className="glass-panel p-6 rounded-2xl">
        <h4 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" /> VGG Block Chain & Freezing States (Click block to inspect)
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {vggBlocks.map((b) => {
            const isFrozen = transferMode === 'extract' ? b.frozenExtract : b.frozenFineTune;
            const isSelected = activeBlock === b.id;
            return (
              <button
                key={b.id}
                onClick={() => setActiveBlock(b.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold font-mono text-cyan-300">{b.name}</span>
                  {isFrozen ? (
                    <span className="text-amber-400 flex items-center text-[10px] gap-0.5 font-mono">
                      <Lock className="w-3 h-3" /> Frozen
                    </span>
                  ) : (
                    <span className="text-emerald-400 flex items-center text-[10px] gap-0.5 font-mono">
                      <Unlock className="w-3 h-3" /> Trainable
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-300 font-mono line-clamp-1">
                  {modelType === 'vgg16' ? b.layersVGG16.split(' +')[0] : b.layersVGG19.split(' +')[0]}
                </div>
                <span className="text-[10px] text-slate-500 font-mono block mt-1">{b.outputShape}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Block Details */}
        <div className="mt-5 p-5 bg-slate-950 rounded-xl border border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div>
              <h5 className="font-semibold text-cyan-300 text-sm">{currentBlock.name}</h5>
              <span className="text-xs font-mono text-slate-400">
                {modelType === 'vgg16' ? currentBlock.layersVGG16 : currentBlock.layersVGG19}
              </span>
            </div>
            <div className="flex gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                Spatial: {currentBlock.outputShape}
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                Weights: {currentBlock.params}
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            <span className="font-semibold text-slate-200">Learned Representation:</span> {currentBlock.features}
          </p>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 font-mono">
            {transferMode === 'extract'
              ? currentBlock.frozenExtract
                ? '🔒 layer.trainable = False  # ImageNet pre-trained weights remain fixed'
                : '🔓 layer.trainable = True   # Custom classifier head trained from scratch'
              : currentBlock.frozenFineTune
              ? '🔒 layer.trainable = False  # Lower sensory layers preserved'
              : '🔓 layer.trainable = True   # Fine-tuned with low learning rate lr=1e-5'}
          </div>
        </div>
      </div>

      {/* VGG-16 vs VGG-19 Comparison Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-panel p-5 rounded-2xl">
          <span className="text-xs text-slate-400">Total ImageNet Parameters</span>
          <div className="text-2xl font-bold font-mono text-cyan-400 my-1">
            {modelType === 'vgg16' ? '138,357,544' : '143,667,240'}
          </div>
          <p className="text-xs text-slate-400">
            {modelType === 'vgg16' ? '~528 MB memory footprint' : '~548 MB memory footprint'}
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <span className="text-xs text-slate-400">Why Stacking 3×3 Filters Wins?</span>
          <div className="text-sm font-bold text-slate-200 my-1">
            Receptive Field Equivalency
          </div>
          <p className="text-xs text-slate-400">
            Two 3×3 conv layers cover 5×5 receptive field with 28% fewer parameters (18 vs 25) and two non-linear ReLUs.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <span className="text-xs text-slate-400">Transfer Learning Accuracy Lift</span>
          <div className="text-2xl font-bold font-mono text-emerald-400 my-1">
            {transferMode === 'extract' ? '92.4% (Fast)' : '95.8% (Fine-tuned)'}
          </div>
          <p className="text-xs text-slate-400">
            Achieves state-of-the-art results on custom medical or industrial datasets in only 5 epochs.
          </p>
        </div>
      </div>
    </div>
  );
};

