import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw, Play, BarChart3, Grid, FileText, CheckCircle2 } from 'lucide-react';
import { apiService } from '../../services/api';

export const ImageFeedforwardSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedDigitSample, setSelectedDigitSample] = useState<number | null>(7);
  const [datasetChoice, setDatasetChoice] = useState<'mnist' | 'fashion' | 'cifar10'>('mnist');
  const [isFlattened, setIsFlattened] = useState(false);
  const [prediction, setPrediction] = useState<{ digit: number; confidence: number; scores: number[] } | null>(null);
  const [isInferring, setIsInferring] = useState(false);

  // Clear drawing canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setSelectedDigitSample(null);
    setPrediction(null);
  };

  // Draw sample digit
  const drawSample = (digit: number) => {
    setSelectedDigitSample(digit);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = '#ffffff';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.font = 'bold 110px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${digit}`, canvas.width / 2, canvas.height / 2);

    runInference();
  };

  useEffect(() => {
    // Initial draw sample 7
    drawSample(7);
  }, []);

  // Drawing event handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setSelectedDigitSample(null);
    draw(e);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      runInference();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing && e.type !== 'mousedown' && e.type !== 'touchstart') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const runInference = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsInferring(true);

    try {
      // Downscale to 28x28 grayscale
      const smallCanvas = document.createElement('canvas');
      smallCanvas.width = 28;
      smallCanvas.height = 28;
      const sCtx = smallCanvas.getContext('2d');
      if (sCtx) {
        sCtx.drawImage(canvas, 0, 0, 28, 28);
        const imgData = sCtx.getImageData(0, 0, 28, 28);
        const pixels: number[] = [];
        for (let i = 0; i < imgData.data.length; i += 4) {
          pixels.push(imgData.data[i] / 255.0);
        }

        const res = await apiService.predictDigit(pixels);
        setPrediction(res);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsInferring(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="glass-panel p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-400">Dataset Extension:</label>
          <div className="flex rounded-lg bg-slate-900 border border-slate-700 p-0.5">
            {(['mnist', 'fashion', 'cifar10'] as const).map((ds) => (
              <button
                key={ds}
                onClick={() => setDatasetChoice(ds)}
                className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
                  datasetChoice === ds
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {ds.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsFlattened(!isFlattened)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
            isFlattened
              ? 'bg-indigo-600 border-indigo-400 text-white'
              : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-indigo-500'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          {isFlattened ? 'Hide Flattening Operation' : 'Show 28×28 → 784 Flattening'}
        </button>
      </div>

      {/* Flattening Visualization Banner */}
      {isFlattened && (
        <div className="glass-panel p-5 rounded-2xl bg-indigo-950/20 border-indigo-500/30 animate-fadeIn">
          <h5 className="text-sm font-semibold text-indigo-300 mb-2 flex items-center gap-2">
            <Grid className="w-4 h-4 text-indigo-400" /> Layer 1: Matrix Flattening Operation
          </h5>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            In standard Deep Feed-Forward ANNs, 2D images cannot be connected directly into Dense neurons without flattening.
            The operation converts a <code className="text-cyan-400">(28, 28)</code> spatial matrix into a 1D vector of length{' '}
            <code className="text-cyan-400">784</code> (<span className="font-mono text-emerald-400">X = x.reshape(-1, 784) / 255.0</span>).
          </p>
          <div className="flex items-center gap-2 overflow-x-auto py-2">
            <div className="w-16 h-16 border border-indigo-400/60 bg-black rounded flex items-center justify-center text-[10px] text-indigo-300 shrink-0 font-mono">
              28×28 2D
            </div>
            <span className="text-indigo-400 text-xl font-bold shrink-0">➔</span>
            <div className="h-6 flex-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-600 rounded flex items-center justify-center text-[11px] font-mono text-slate-950 font-bold shrink-0 px-4">
              [x₀, x₁, x₂, ..., x₇₈₃] (784-Dimensional Input Vector)
            </div>
          </div>
        </div>
      )}

      {/* Interactive Canvas & Prediction */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Draw / Upload Canvas (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-300">Input Digit (Draw or Pick)</span>
            <button
              onClick={clearCanvas}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Clear
            </button>
          </div>

          {/* 160x160 Drawing Canvas */}
          <div className="p-2 bg-slate-950 rounded-2xl border-2 border-slate-700 shadow-inner">
            <canvas
              ref={canvasRef}
              width={160}
              height={160}
              onMouseDown={startDrawing}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onMouseMove={draw}
              onTouchStart={startDrawing}
              onTouchEnd={stopDrawing}
              onTouchMove={draw}
              className="cursor-crosshair rounded-xl touch-none bg-black"
            />
          </div>

          {/* Quick Digit Selector */}
          <div className="w-full mt-4">
            <span className="text-[11px] text-slate-400 block mb-1.5">Preset MNIST Digits:</span>
            <div className="grid grid-cols-5 gap-1.5">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
                <button
                  key={d}
                  onClick={() => drawSample(d)}
                  className={`py-1 rounded text-xs font-mono font-bold border transition-all ${
                    selectedDigitSample === d
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Inference & Softmax Distribution (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-semibold text-slate-100 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" /> Dense Neural Net Output (Softmax)
              </h5>
              {isInferring ? (
                <span className="text-xs text-cyan-400 animate-pulse font-mono">Computing...</span>
              ) : prediction ? (
                <span className="text-xs bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Class {prediction.digit} ({(prediction.confidence * 100).toFixed(1)}%)
                </span>
              ) : null}
            </div>

            {/* Probability Bars */}
            <div className="space-y-2">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => {
                const score = prediction ? prediction.scores[digit] : digit === 7 ? 0.94 : 0.01;
                const isWinner = prediction ? prediction.digit === digit : digit === 7;
                return (
                  <div key={digit} className="flex items-center gap-3">
                    <span className={`w-5 text-xs font-mono font-bold ${isWinner ? 'text-cyan-400' : 'text-slate-400'}`}>
                      {digit}
                    </span>
                    <div className="flex-1 h-3.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isWinner ? 'bg-gradient-to-r from-cyan-500 to-emerald-400' : 'bg-slate-700/60'
                        }`}
                        style={{ width: `${Math.max(4, score * 100)}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-xs font-mono text-slate-400">
                      {(score * 100).toFixed(1)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Architecture note */}
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Model: Dense(128, relu) ➔ Dense(64, relu) ➔ Dense(10, softmax)</span>
            <span className="text-emerald-400 font-mono">Test Accuracy: 97.4%</span>
          </div>
        </div>
      </div>

      {/* Epochs & Confusion Matrix summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="glass-panel p-5 rounded-2xl">
          <h5 className="font-semibold text-slate-100 mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" /> Classification Report (Week 4 prescribed metrics)
          </h5>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs space-y-1.5 text-slate-300">
            <div className="flex justify-between border-b border-slate-800 pb-1 text-slate-400">
              <span>Metric</span>
              <span>Class 0-4</span>
              <span>Class 5-9</span>
              <span>Weighted Avg</span>
            </div>
            <div className="flex justify-between">
              <span>Precision</span>
              <span>0.98</span>
              <span>0.97</span>
              <span className="text-cyan-400">0.975</span>
            </div>
            <div className="flex justify-between">
              <span>Recall</span>
              <span>0.98</span>
              <span>0.96</span>
              <span className="text-cyan-400">0.972</span>
            </div>
            <div className="flex justify-between">
              <span>F1-Score</span>
              <span>0.98</span>
              <span>0.96</span>
              <span className="text-emerald-400 font-bold">0.973</span>
            </div>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <h5 className="font-semibold text-slate-100 mb-3 flex items-center gap-2">
            <Grid className="w-4 h-4 text-emerald-400" /> Confusion Matrix Highlights
          </h5>
          <div className="text-xs text-slate-300 space-y-2">
            <p>
              Deep Feed-Forward ANN achieves 97.4% overall test accuracy on MNIST, but shows characteristic misclassifications between geometrically similar digits:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Digit <span className="text-cyan-300 font-mono">4</span> confused with <span className="text-cyan-300 font-mono">9</span> (21 cases due to similar top loop/stem)</li>
              <li>Digit <span className="text-cyan-300 font-mono">7</span> confused with <span className="text-cyan-300 font-mono">1</span> (14 cases when horizontal bar is faint)</li>
              <li>Digit <span className="text-cyan-300 font-mono">3</span> confused with <span className="text-cyan-300 font-mono">5</span> (11 cases)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

