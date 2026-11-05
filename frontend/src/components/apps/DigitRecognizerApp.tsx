import React, { useRef, useState, useEffect } from 'react';
import { RefreshCw, Play, BarChart3, CheckCircle2, Download, Cpu, Info } from 'lucide-react';
import { apiService } from '../../services/api';

export const DigitRecognizerApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [prediction, setPrediction] = useState<{ digit: number; confidence: number; scores: number[] } | null>(null);
  const [isInferring, setIsInferring] = useState(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setPrediction(null);
  };

  const drawPreset = (digit: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = '#ffffff';
    ctx.lineWidth = 18;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.font = 'bold 150px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${digit}`, canvas.width / 2, canvas.height / 2);

    runInference();
  };

  useEffect(() => {
    drawPreset(3);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
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
    ctx.lineWidth = 18;
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
    } catch (e) {
      console.error(e);
    } finally {
      setIsInferring(false);
    }
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `digit_${prediction?.digit ?? 'unknown'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* App Header */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400">
                APP 1 • INTERACTIVE INFERENCE
              </span>
              <span className="text-xs font-mono text-slate-400">CNN / Feed-Forward Model</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Handwritten Digit Recognition</h2>
            <p className="text-xs text-slate-400 mt-1">
              Draw any digit (0–9) on the touch-enabled canvas to trigger real-time deep neural network inference.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={downloadCanvas}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-all"
            >
              <Download className="w-4 h-4" /> Download Drawing
            </button>
            <button
              onClick={clearCanvas}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-4 h-4" /> Clear Canvas
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Canvas & Inference Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Drawing Canvas (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl flex flex-col items-center">
          <span className="text-xs font-mono text-slate-400 mb-3">Draw Digit Inside 200×200 Canvas:</span>

          <div className="p-3 bg-black rounded-2xl border-2 border-slate-700 shadow-inner">
            <canvas
              ref={canvasRef}
              width={200}
              height={200}
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

          {/* Preset Buttons */}
          <div className="w-full mt-5">
            <span className="text-[11px] text-slate-400 block mb-2 font-mono">Or test standard MNIST presets:</span>
            <div className="grid grid-cols-5 gap-2">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
                <button
                  key={d}
                  onClick={() => drawPreset(d)}
                  className="py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500 font-mono text-xs font-bold text-slate-300 transition-all"
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Prediction Results & Softmax (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-slate-100 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" /> Model Confidence Distribution (Softmax)
              </h4>
              {isInferring ? (
                <span className="text-xs font-mono text-cyan-400 animate-pulse">Running inference...</span>
              ) : prediction ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-mono">Predicted:</span>
                  <span className="text-xl font-bold font-mono text-emerald-400 px-3 py-0.5 rounded-lg bg-emerald-950/80 border border-emerald-600/50">
                    Class {prediction.digit} ({(prediction.confidence * 100).toFixed(1)}%)
                  </span>
                </div>
              ) : null}
            </div>

            {/* Probability Bars */}
            <div className="space-y-2">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => {
                const score = prediction ? prediction.scores[digit] : digit === 3 ? 0.94 : 0.01;
                const isWinner = prediction ? prediction.digit === digit : digit === 3;
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
                        style={{ width: `${Math.max(3, score * 100)}%` }}
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

          {/* Architecture Spec Card */}
          <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Architecture: Conv2D(32, 3×3) ➔ MaxPool(2×2) ➔ Flatten ➔ Dense(128) ➔ Dense(10, softmax)</span>
            </div>
            <span className="text-emerald-400 font-mono">Test Accuracy: 99.2%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

