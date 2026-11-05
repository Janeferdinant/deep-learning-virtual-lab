import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Plus, Trash2, Info, CheckCircle2, AlertTriangle } from 'lucide-react';

interface Point {
  x: number; // 0 to 1
  y: number; // 0 to 1
  label: number; // 0 or 1
}

interface PerceptronSimulatorProps {
  onAccuracyChange?: (acc: number) => void;
}

export const PerceptronSimulator: React.FC<PerceptronSimulatorProps> = ({ onAccuracyChange }) => {
  const [gate, setGate] = useState<'AND' | 'OR' | 'XOR' | 'NOT' | 'CUSTOM'>('AND');
  const [w1, setW1] = useState<number>(0.5);
  const [w2, setW2] = useState<number>(0.5);
  const [bias, setBias] = useState<number>(-0.7);
  const [eta, setEta] = useState<number>(0.1);
  const [epochsRun, setEpochsRun] = useState<number>(0);
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Preset gate points
  const getPresetPoints = (g: string): Point[] => {
    switch (g) {
      case 'AND':
        return [
          { x: 0.2, y: 0.2, label: 0 },
          { x: 0.2, y: 0.8, label: 0 },
          { x: 0.8, y: 0.2, label: 0 },
          { x: 0.8, y: 0.8, label: 1 }
        ];
      case 'OR':
        return [
          { x: 0.2, y: 0.2, label: 0 },
          { x: 0.2, y: 0.8, label: 1 },
          { x: 0.8, y: 0.2, label: 1 },
          { x: 0.8, y: 0.8, label: 1 }
        ];
      case 'XOR':
        return [
          { x: 0.2, y: 0.2, label: 0 },
          { x: 0.2, y: 0.8, label: 1 },
          { x: 0.8, y: 0.2, label: 1 },
          { x: 0.8, y: 0.8, label: 0 }
        ];
      case 'NOT':
        return [
          { x: 0.2, y: 0.5, label: 1 },
          { x: 0.8, y: 0.5, label: 0 }
        ];
      default:
        // Placement sample points (CGPA vs Resume Score)
        return [
          { x: 0.3, y: 0.4, label: 0 },
          { x: 0.25, y: 0.6, label: 0 },
          { x: 0.4, y: 0.3, label: 0 },
          { x: 0.5, y: 0.4, label: 0 },
          { x: 0.7, y: 0.8, label: 1 },
          { x: 0.85, y: 0.65, label: 1 },
          { x: 0.65, y: 0.9, label: 1 },
          { x: 0.9, y: 0.85, label: 1 },
          { x: 0.6, y: 0.7, label: 1 }
        ];
    }
  };

  const [points, setPoints] = useState<Point[]>(getPresetPoints('AND'));
  const [clickLabel, setClickLabel] = useState<number>(1);

  // Switch gate preset
  const handleGateChange = (newGate: 'AND' | 'OR' | 'XOR' | 'NOT' | 'CUSTOM') => {
    setGate(newGate);
    setPoints(getPresetPoints(newGate));
    setEpochsRun(0);
    if (newGate === 'AND') {
      setW1(0.6); setW2(0.6); setBias(-0.9);
    } else if (newGate === 'OR') {
      setW1(0.7); setW2(0.7); setBias(-0.4);
    } else if (newGate === 'XOR') {
      setW1(0.1); setW2(-0.2); setBias(0.05);
    } else if (newGate === 'NOT') {
      setW1(-0.8); setW2(0.0); setBias(0.4);
    }
  };

  // Prediction for a point
  const predict = (x: number, y: number, currentW1 = w1, currentW2 = w2, currentB = bias): number => {
    const z = currentW1 * x + currentW2 * y + currentB;
    return z >= 0 ? 1 : 0;
  };

  // Compute accuracy
  const correctCount = points.filter(p => predict(p.x, p.y) === p.label).length;
  const accuracy = points.length > 0 ? Math.round((correctCount / points.length) * 100) : 0;

  useEffect(() => {
    if (onAccuracyChange) onAccuracyChange(accuracy);
  }, [accuracy]);

  // Single step training
  const trainStep = () => {
    let newW1 = w1;
    let newW2 = w2;
    let newBias = bias;

    // Iterate through points and apply Rosenblatt rule
    points.forEach(p => {
      const pred = predict(p.x, p.y, newW1, newW2, newBias);
      const error = p.label - pred;
      if (error !== 0) {
        newW1 += eta * error * p.x;
        newW2 += eta * error * p.y;
        newBias += eta * error;
      }
    });

    setW1(parseFloat(newW1.toFixed(4)));
    setW2(parseFloat(newW2.toFixed(4)));
    setBias(parseFloat(newBias.toFixed(4)));
    setEpochsRun(prev => prev + 1);
  };

  // Multi-step training animation
  const trainContinuous = () => {
    if (isTraining) {
      setIsTraining(false);
      return;
    }
    setIsTraining(true);
    let iter = 0;
    const interval = setInterval(() => {
      trainStep();
      iter++;
      if (iter >= 40) {
        clearInterval(interval);
        setIsTraining(false);
      }
    }, 80);
  };

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.fillStyle = '#0c1322';
    ctx.fillRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let i = 0; i <= width; i += 40) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(width, i); ctx.stroke();
    }

    // Decision region shading (fine pixel scan or block scan)
    const step = 8;
    for (let px = 0; px < width; px += step) {
      for (let py = 0; py < height; py += step) {
        const normX = px / width;
        const normY = 1 - py / height; // Invert canvas Y so bottom-left is (0,0)
        const pred = predict(normX, normY);
        ctx.fillStyle = pred === 1 ? 'rgba(6, 182, 212, 0.08)' : 'rgba(239, 68, 68, 0.06)';
        ctx.fillRect(px, py, step, step);
      }
    }

    // Draw Decision Boundary Line: w1*x + w2*y + b = 0 => y = -(w1*x + b) / w2
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#f59e0b';
    ctx.setLineDash([6, 4]);
    ctx.beginPath();

    if (Math.abs(w2) > 0.001) {
      // Find x=0 and x=1 points
      const yAtX0 = -(w1 * 0 + bias) / w2;
      const yAtX1 = -(w1 * 1 + bias) / w2;

      const canvasY0 = height * (1 - yAtX0);
      const canvasY1 = height * (1 - yAtX1);

      ctx.moveTo(0, canvasY0);
      ctx.lineTo(width, canvasY1);
    } else {
      // Vertical line: x = -b / w1
      const xLine = -bias / (w1 || 0.001);
      const canvasX = width * xLine;
      ctx.moveTo(canvasX, 0);
      ctx.lineTo(canvasX, height);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Data Points
    points.forEach(p => {
      const px = p.x * width;
      const py = (1 - p.y) * height;
      const pred = predict(p.x, p.y);
      const isCorrect = pred === p.label;

      // Outer ring indicating classification correctness
      ctx.beginPath();
      ctx.arc(px, py, 11, 0, Math.PI * 2);
      ctx.fillStyle = isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.5)';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = isCorrect ? '#10b981' : '#ef4444';
      ctx.stroke();

      // Inner point color by class label
      ctx.beginPath();
      ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fillStyle = p.label === 1 ? '#06b6d4' : '#f43f5e';
      ctx.fill();
    });

  }, [w1, w2, bias, points]);

  // Click on canvas to add point in CUSTOM mode
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gate !== 'CUSTOM') setGate('CUSTOM');
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1 - (e.clientY - rect.top) / rect.height;
    setPoints(prev => [...prev, { x: parseFloat(x.toFixed(3)), y: parseFloat(y.toFixed(3)), label: clickLabel }]);
  };

  return (
    <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-5 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
            <span>⚡ Interactive Decision Boundary Playground</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
              w₁x₁ + w₂x₂ + b = 0
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Adjust weights, step-train, or select truth tables to observe real-time boundary shifts.
          </p>
        </div>

        {/* Gate selector pills */}
        <div className="flex flex-wrap gap-1.5 bg-[#070b14] p-1.5 rounded-lg border border-slate-800">
          {(['AND', 'OR', 'XOR', 'NOT', 'CUSTOM'] as const).map(g => (
            <button
              key={g}
              onClick={() => handleGateChange(g)}
              className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                gate === g
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 2D Canvas */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full max-w-[420px] aspect-square rounded-xl overflow-hidden border border-slate-700 shadow-inner bg-[#0c1322]">
            <canvas
              ref={canvasRef}
              width={420}
              height={420}
              onClick={handleCanvasClick}
              className="w-full h-full cursor-crosshair"
            />
            {/* Axis Labels */}
            <div className="absolute bottom-2 right-3 text-[10px] text-slate-500 font-mono">x₁ (Feature 1)</div>
            <div className="absolute top-2 left-3 text-[10px] text-slate-500 font-mono">x₂ (Feature 2)</div>

            {/* In-canvas accuracy badge */}
            <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2 shadow">
              <span className="text-xs text-slate-400">Accuracy:</span>
              <span className={`text-sm font-mono font-bold ${accuracy === 100 ? 'text-emerald-400' : accuracy >= 75 ? 'text-amber-400' : 'text-rose-400'}`}>
                {accuracy}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between w-full max-w-[420px] mt-3 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block" /> Class 1 (Placed)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" /> Class 0 (Not Placed)
              </span>
            </div>
            <span className="text-[11px] text-slate-500">Click canvas to add custom point</span>
          </div>

          {gate === 'XOR' && (
            <div className="mt-3 p-3 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-start gap-2 max-w-[420px]">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-rose-200">The XOR Barrier (Minsky & Papert 1969):</strong>
                <p className="mt-0.5 text-rose-300/90">
                  Notice how a single straight line can at best separate 3 out of 4 points (75% max). A single linear unit is mathematically incapable of solving non-linearly separable logic.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Controls & Equation */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* Current Equation Card */}
          <div className="bg-[#070b14] p-4 rounded-xl border border-slate-800 font-mono">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 mb-1">Learned Equation</div>
            <div className="text-sm font-bold text-amber-300">
              {w1 >= 0 ? `${w1}` : `- ${Math.abs(w1)}`}x₁ + {w2 >= 0 ? `${w2}` : `- ${Math.abs(w2)}`}x₂ + {bias >= 0 ? `${bias}` : `- ${Math.abs(bias)}`} = 0
            </div>
            <div className="text-xs text-slate-400 mt-2 flex justify-between">
              <span>Epochs: <strong className="text-white">{epochsRun}</strong></span>
              <span>Points: <strong className="text-white">{correctCount}/{points.length} correct</strong></span>
            </div>
          </div>

          {/* Interactive Sliders */}
          <div className="space-y-3.5 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div>
              <div className="flex justify-between text-xs mb-1 font-mono">
                <span className="text-slate-300">Weight w₁:</span>
                <span className="text-cyan-400 font-bold">{w1}</span>
              </div>
              <input
                type="range" min="-2.0" max="2.0" step="0.05"
                value={w1} onChange={e => setW1(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 font-mono">
                <span className="text-slate-300">Weight w₂:</span>
                <span className="text-cyan-400 font-bold">{w2}</span>
              </div>
              <input
                type="range" min="-2.0" max="2.0" step="0.05"
                value={w2} onChange={e => setW2(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 font-mono">
                <span className="text-slate-300">Bias b:</span>
                <span className="text-amber-400 font-bold">{bias}</span>
              </div>
              <input
                type="range" min="-2.5" max="2.5" step="0.05"
                value={bias} onChange={e => setBias(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 font-mono">
                <span className="text-slate-400">Learning Rate (η):</span>
                <span className="text-slate-300">{eta}</span>
              </div>
              <input
                type="range" min="0.01" max="0.5" step="0.01"
                value={eta} onChange={e => setEta(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={trainStep}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-lg transition-all"
              >
                <Play className="w-3.5 h-3.5" /> 1 Step Train
              </button>
              <button
                onClick={trainContinuous}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold shadow-lg transition-all ${
                  isTraining ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                {isTraining ? 'Pause' : 'Train 40 Steps'}
              </button>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-1 text-xs">
                <span className="text-slate-400">Add point:</span>
                <button
                  onClick={() => setClickLabel(1)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono ${clickLabel === 1 ? 'bg-cyan-500 text-black font-bold' : 'bg-slate-800 text-slate-300'}`}
                >
                  Class 1
                </button>
                <button
                  onClick={() => setClickLabel(0)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono ${clickLabel === 0 ? 'bg-rose-500 text-white font-bold' : 'bg-slate-800 text-slate-300'}`}
                >
                  Class 0
                </button>
              </div>

              <button
                onClick={() => handleGateChange(gate)}
                className="text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1 py-1 px-2 rounded hover:bg-slate-800"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

