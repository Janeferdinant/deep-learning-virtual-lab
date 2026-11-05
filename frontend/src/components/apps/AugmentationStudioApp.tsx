import React, { useState } from 'react';
import { Sliders, RotateCw, ZoomIn, Sun, Move, RefreshCw, Grid, Download, Code2 } from 'lucide-react';

export const AugmentationStudioApp: React.FC = () => {
  const [rotation, setRotation] = useState<number>(15);
  const [zoom, setZoom] = useState<number>(1.1);
  const [flipH, setFlipH] = useState<boolean>(true);
  const [flipV, setFlipV] = useState<boolean>(false);
  const [shiftX, setShiftX] = useState<number>(5);
  const [shiftY, setShiftY] = useState<number>(-5);
  const [brightness, setBrightness] = useState<number>(110);
  const [specimen, setSpecimen] = useState<'cat' | 'car' | 'mri' | 'leaf'>('car');

  const specimens = {
    car: { name: 'Autonomous Vehicle (City Object)', icon: '🚗', color: 'from-blue-600 to-indigo-900' },
    cat: { name: 'Animal Specimen (CIFAR Cat)', icon: '🐱', color: 'from-amber-600 to-orange-900' },
    mri: { name: 'Medical MRI (Clinical Radiology)', icon: '🧠', color: 'from-purple-600 to-slate-900' },
    leaf: { name: 'Crop Foliage (Agri Plant Disease)', icon: '🍃', color: 'from-emerald-600 to-teal-900' },
  };

  const resetAll = () => {
    setRotation(0);
    setZoom(1);
    setFlipH(false);
    setFlipV(false);
    setShiftX(0);
    setShiftY(0);
    setBrightness(100);
  };

  // 6 batch variations for real-time augmentation grid
  const variations = [
    { rot: 15, z: 1.15, fh: true, b: 110, name: 'Var #1: Rot + Zoom + Flip' },
    { rot: -20, z: 0.9, fh: false, b: 85, name: 'Var #2: Counter-Rot + Low Light' },
    { rot: 8, z: 1.25, fh: true, b: 125, name: 'Var #3: Zoom In + Brightness' },
    { rot: -12, z: 1.05, fh: false, b: 95, name: 'Var #4: Subtle Tilt' },
    { rot: 25, z: 0.85, fh: false, b: 115, name: 'Var #5: Zoom Out + High Tilt' },
    { rot: -5, z: 1.2, fh: true, b: 105, name: 'Var #6: Mirror + Center Crop' },
  ];

  return (
    <div className="space-y-6">
      {/* App Header */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400">
                APP 5 • DATA SYNTHESIS & INVARIANCE
              </span>
              <span className="text-xs font-mono text-slate-400">Keras ImageDataGenerator / tf.keras.layers</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Image Augmentation Studio</h2>
            <p className="text-xs text-slate-400 mt-1">
              Test geometric and photometric transforms interactively to build rotation-, translation-, and illumination-invariant vision pipelines.
            </p>
          </div>

          <button
            onClick={resetAll}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Reset Transforms
          </button>
        </div>
      </div>

      {/* Main Grid: Transform Controls & Live Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl space-y-4">
          <h4 className="font-semibold text-slate-100 text-sm flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" /> Transformation Sliders
          </h4>

          {/* Specimen picker */}
          <div>
            <label className="text-xs text-slate-400 block mb-1.5">Specimen Type:</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(specimens).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => setSpecimen(key as any)}
                  className={`p-2 rounded-xl border text-left text-xs flex items-center gap-2 transition-all ${
                    specimen === key
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="truncate">{item.name.split(' (')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Rotation */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span className="flex items-center gap-1">
                <RotateCw className="w-3.5 h-3.5 text-cyan-400" /> Rotation:
              </span>
              <span className="font-mono text-cyan-400 font-bold">{rotation}°</span>
            </div>
            <input
              type="range"
              min={-90}
              max={90}
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Zoom */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span className="flex items-center gap-1">
                <ZoomIn className="w-3.5 h-3.5 text-cyan-400" /> Zoom Scale:
              </span>
              <span className="font-mono text-cyan-400 font-bold">{zoom.toFixed(2)}×</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={1.8}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Brightness */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span className="flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-cyan-400" /> Brightness:
              </span>
              <span className="font-mono text-cyan-400 font-bold">{brightness}%</span>
            </div>
            <input
              type="range"
              min={40}
              max={180}
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Translation Shift */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span className="flex items-center gap-1">
                <Move className="w-3.5 h-3.5 text-cyan-400" /> Translation Shift (X, Y):
              </span>
              <span className="font-mono text-cyan-400 font-bold">({shiftX}px, {shiftY}px)</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="range"
                min={-30}
                max={30}
                value={shiftX}
                onChange={(e) => setShiftX(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
              <input
                type="range"
                min={-30}
                max={30}
                value={shiftY}
                onChange={(e) => setShiftY(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>
          </div>

          {/* Flip Toggles */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => setFlipH(!flipH)}
              className={`py-2 text-xs rounded-xl border font-semibold transition-all ${
                flipH
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              Horizontal Flip ({flipH ? 'ON' : 'OFF'})
            </button>
            <button
              onClick={() => setFlipV(!flipV)}
              className={`py-2 text-xs rounded-xl border font-semibold transition-all ${
                flipV
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              Vertical Flip ({flipV ? 'ON' : 'OFF'})
            </button>
          </div>
        </div>

        {/* Viewport (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-slate-400">Real-Time Canvas Transformation</span>
            <span className="text-xs font-mono text-cyan-400">{specimens[specimen].name}</span>
          </div>

          {/* Interactive Transform Render Box */}
          <div className="w-64 h-64 bg-slate-950 border-2 border-slate-800 rounded-2xl flex items-center justify-center overflow-hidden relative shadow-inner">
            <div
              className={`w-48 h-48 rounded-xl bg-gradient-to-br ${specimens[specimen].color} border border-cyan-500/40 flex flex-col items-center justify-center transition-transform duration-100 ease-out select-none shadow-2xl`}
              style={{
                transform: `rotate(${rotation}deg) scale(${zoom}) scaleX(${flipH ? -1 : 1}) scaleY(${
                  flipV ? -1 : 1
                }) translate(${shiftX}px, ${shiftY}px)`,
                filter: `brightness(${brightness}%)`,
              }}
            >
              <div className="text-7xl mb-2">{specimens[specimen].icon}</div>
              <span className="text-xs font-mono text-white font-bold">{specimen.toUpperCase()}</span>
            </div>
          </div>

          {/* Keras Code Generator */}
          <div className="w-full mt-5 p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
            <div className="text-cyan-400 flex items-center gap-1.5 mb-1.5">
              <Code2 className="w-4 h-4" /> Keras Augmentation Pipeline:
            </div>
            <pre className="text-slate-400 overflow-x-auto whitespace-pre">
{`datagen = ImageDataGenerator(
    rotation_range=${Math.abs(rotation)},
    zoom_range=${(Math.abs(zoom - 1)).toFixed(2)},
    horizontal_flip=${flipH ? 'True' : 'False'},
    width_shift_range=${(Math.abs(shiftX) / 100).toFixed(2)},
    height_shift_range=${(Math.abs(shiftY) / 100).toFixed(2)},
    brightness_range=[${(brightness / 120).toFixed(2)}, ${(brightness / 90).toFixed(2)}]
)`}
            </pre>
          </div>
        </div>
      </div>

      {/* Batch Variations Grid */}
      <div className="glass-panel p-6 rounded-3xl">
        <h4 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
          <Grid className="w-4 h-4 text-cyan-400" /> Multi-Sample Synthetic Batch (6 Variations from 1 Image)
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {variations.map((v, i) => (
            <div key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden mb-2 border border-slate-800">
                <div
                  className="text-3xl"
                  style={{
                    transform: `rotate(${v.rot}deg) scale(${v.z}) scaleX(${v.fh ? -1 : 1})`,
                    filter: `brightness(${v.b}%)`,
                  }}
                >
                  {specimens[specimen].icon}
                </div>
              </div>
              <span className="text-[11px] font-semibold text-slate-300">{v.name.split(':')[0]}</span>
              <span className="text-[10px] text-cyan-400 font-mono mt-0.5">Augmented #{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

