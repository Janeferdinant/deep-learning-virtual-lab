import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Plus, Trash2, Cpu, CheckCircle2, AlertTriangle } from 'lucide-react';

interface Point {
  x: number;
  y: number;
  label: 0 | 1;
}

export const PerceptronPlaygroundApp: React.FC = () => {
  const [w1, setW1] = useState<number>(0.6);
  const [w2, setW2] = useState<number>(0.8);
  const [bias, setBias] = useState<number>(-0.5);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [activeLabel, setActiveLabel] = useState<0 | 1>(1);

  // Initial custom points
  const [points, setPoints] = useState<Point[]>([
    { x: 0.2, y: 0.8, label: 1 },
    { x: 0.4, y: 0.9, label: 1 },
    { x: 0.8, y: 0.7, label: 1 },
    { x: 0.6, y: 0.6, label: 1 },
    { x: 0.1, y: 0.2, label: 0 },
    { x: 0.3, y: 0.1, label: 0 },
    { x: 0.5, y: 0.2, label: 0 },
    { x: 0.7, y: 0.3, label: 0 },
  ]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render 2D Cartesian plane & decision boundary
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let i = 0; i <= width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    // Draw decision boundary: w1*x + w2*y + b = 0 => y = (-w1*x - b) / w2
    if (Math.abs(w2) > 0.001) {
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.beginPath();

      const yAtX0 = -bias / w2;
      const yAtX1 = (-w1 - bias) / w2;

      const px0 = 0;
      const py0 = height - yAtX0 * height;
      const px1 = width;
      const py1 = height - yAtX1 * height;

      ctx.moveTo(px0, py0);
      ctx.lineTo(px1, py1);
      ctx.stroke();
    }

    // Draw data points
    points.forEach((pt) => {
      const px = pt.x * width;
      const py = height - pt.y * height;

      // Check current prediction
      const z = w1 * pt.x + w2 * pt.y + bias;
      const pred = z >= 0 ? 1 : 0;
      const isCorrect = pred === pt.label;

      ctx.beginPath();
      ctx.arc(px, py, 7, 0, 2 * Math.PI);
      ctx.fillStyle = pt.label === 1 ? '#06b6d4' : '#f43f5e';
      ctx.fill();

      // Outer ring for correctness
      ctx.strokeStyle = isCorrect ? '#10b981' : '#f59e0b';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, [w1, w2, bias, points]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height));

    setPoints([...points, { x, y, label: activeLabel }]);
  };

  const trainOneEpoch = () => {
    let newW1 = w1;
    let newW2 = w2;
    let newBias = bias;

    points.forEach((pt) => {
      const z = newW1 * pt.x + newW2 * pt.y + newBias;
      const pred = z >= 0 ? 1 : 0;
      const error = pt.label - pred;
      newW1 += learningRate * error * pt.x;
      newW2 += learningRate * error * pt.y;
      newBias += learningRate * error;
    });

    setW1(Number(newW1.toFixed(3)));
    setW2(Number(newW2.toFixed(3)));
    setBias(Number(newBias.toFixed(3)));
  };

  const correctCount = points.filter((pt) => {
    const z = w1 * pt.x + w2 * pt.y + bias;
    const pred = z >= 0 ? 1 : 0;
    return pred === pt.label;
  }).length;

  const accuracy = points.length > 0 ? (correctCount / points.length) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* App Header */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400">
                APP 7 • LINEAR CLASSIFICATION PLAYGROUND
              </span>
              <span className="text-xs font-mono text-slate-400">Rosenblatt Perceptron Learning Rule</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Perceptron 2D Decision Playground</h2>
            <p className="text-xs text-slate-400 mt-1">
              Click anywhere on the coordinate plane to plot custom points and train the linear decision boundary in real time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={trainOneEpoch}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Play className="w-4 h-4" /> Train 1 Epoch (Δw = η·e·x)
            </button>
            <button
              onClick={() => setPoints([])}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-all"
              title="Clear Points"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Canvas & Weights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Plane (6 cols) */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-3xl flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400">Click to plot points on [0, 1]² plane</span>
            <div className="flex rounded-lg bg-slate-900 border border-slate-700 p-0.5">
              <button
                onClick={() => setActiveLabel(1)}
                className={`px-3 py-1 text-xs rounded-md font-semibold transition-all ${
                  activeLabel === 1
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                + Class 1 (Cyan)
              </button>
              <button
                onClick={() => setActiveLabel(0)}
                className={`px-3 py-1 text-xs rounded-md font-semibold transition-all ${
                  activeLabel === 0
                    ? 'bg-rose-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                + Class 0 (Rose)
              </button>
            </div>
          </div>

          <canvas
            ref={canvasRef}
            width={340}
            height={340}
            onClick={handleCanvasClick}
            className="rounded-2xl border-2 border-slate-700 cursor-crosshair shadow-inner"
          />

          <span className="text-[11px] text-slate-500 mt-2 font-mono">
            Line equation: {w1.toFixed(2)}·x₁ + {w2.toFixed(2)}·x₂ + {bias.toFixed(2)} = 0
          </span>
        </div>

        {/* Weights & Decision Accuracy (6 cols) */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-3xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-slate-100 text-sm">Hyperparameters & Weights</h4>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-600/40">
                Accuracy: {accuracy.toFixed(1)}% ({correctCount}/{points.length})
              </span>
            </div>

            {/* Weight 1 */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="font-mono">Weight w₁:</span>
                <span className="font-mono font-bold text-cyan-400">{w1.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={-2}
                max={2}
                step={0.05}
                value={w1}
                onChange={(e) => setW1(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            {/* Weight 2 */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="font-mono">Weight w₂:</span>
                <span className="font-mono font-bold text-cyan-400">{w2.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={-2}
                max={2}
                step={0.05}
                value={w2}
                onChange={(e) => setW2(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            {/* Bias */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="font-mono">Bias b:</span>
                <span className="font-mono font-bold text-cyan-400">{bias.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={-2}
                max={2}
                step={0.05}
                value={bias}
                onChange={(e) => setBias(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            {/* Learning Rate */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="font-mono">Learning Rate (η):</span>
                <span className="font-mono font-bold text-amber-400">{learningRate}</span>
              </div>
              <div className="flex gap-2">
                {[0.01, 0.05, 0.1, 0.2].map((lr) => (
                  <button
                    key={lr}
                    onClick={() => setLearningRate(lr)}
                    className={`flex-1 py-1 text-xs rounded border font-mono ${
                      learningRate === lr
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    {lr}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 mt-4">
            💡 If points are not linearly separable (like XOR), the Perceptron Cycling Theorem guarantees weights will oscillate endlessly without converging.
          </div>
        </div>
      </div>
    </div>
  );
};

