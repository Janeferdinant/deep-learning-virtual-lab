import React, { useState } from 'react';
import { Sliders, RotateCw, ZoomIn, Sun, Move, RefreshCw, Grid } from 'lucide-react';

export const DataAugmentationSimulator: React.FC = () => {
  // Transform sliders
  const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [flipH, setFlipH] = useState<boolean>(false);
  const [flipV, setFlipV] = useState<boolean>(false);
  const [shiftX, setShiftX] = useState<number>(0);
  const [shiftY, setShiftY] = useState<number>(0);
  const [brightness, setBrightness] = useState<number>(100);
  const [selectedSubject, setSelectedSubject] = useState<'chest_xray' | 'brain_mri' | 'retina'>('chest_xray');

  const subjects = {
    chest_xray: {
      name: 'Chest X-Ray (Pneumonia Detection)',
      icon: '🫁',
      desc: 'Rare medical condition dataset (limited sample size)',
    },
    brain_mri: {
      name: 'Brain MRI (Tumor Segmentation)',
      icon: '🧠',
      desc: 'High-precision scans with small orientation shifts',
    },
    retina: {
      name: 'Retinal Fundus (Diabetic Retinopathy)',
      icon: '👁️',
      desc: 'Micro-aneurysm detection requiring invariant models',
    },
  };

  const resetTransforms = () => {
    setRotation(0);
    setZoom(1);
    setFlipH(false);
    setFlipV(false);
    setShiftX(0);
    setShiftY(0);
    setBrightness(100);
  };

  // 4 random pre-computed variants for the batch augmentation preview
  const batchVariants = [
    { rot: 15, z: 1.15, fh: true, b: 110, name: 'Variant A (Rot + Zoom + FlipH)' },
    { rot: -20, z: 0.9, fh: false, b: 85, name: 'Variant B (Counter-Rot + Dim)' },
    { rot: 8, z: 1.25, fh: true, b: 130, name: 'Variant C (Zoom In + Bright)' },
    { rot: -10, z: 1.05, fh: false, b: 95, name: 'Variant D (Slight Shift + Rot)' },
  ];

  return (
    <div className="space-y-6">
      {/* Subject Picker */}
      <div className="glass-panel p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400">Target Medical Specimen:</label>
          <div className="flex gap-2">
            {Object.entries(subjects).map(([key, s]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedSubject(key as any);
                  resetTransforms();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                  selectedSubject === key
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.name.split(' (')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={resetTransforms}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 border border-slate-700"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Transforms
        </button>
      </div>

      {/* Main Studio Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Panel (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl space-y-4">
          <h5 className="font-semibold text-slate-200 text-sm flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" /> Real-Time Augmentation Sliders
          </h5>

          {/* Rotation */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span className="flex items-center gap-1">
                <RotateCw className="w-3.5 h-3.5 text-cyan-400" /> Rotation Angle:
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
                <ZoomIn className="w-3.5 h-3.5 text-cyan-400" /> Zoom Scaling:
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
                <Sun className="w-3.5 h-3.5 text-cyan-400" /> Brightness Adjustment:
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

          {/* Shifts */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span className="flex items-center gap-1">
                <Move className="w-3.5 h-3.5 text-cyan-400" /> Translation Shift (X, Y):
              </span>
              <span className="font-mono text-cyan-400 font-bold">
                ({shiftX}px, {shiftY}px)
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="range"
                min={-30}
                max={30}
                value={shiftX}
                onChange={(e) => setShiftX(Number(e.target.value))}
                className="w-full accent-cyan-400"
                title="Shift X"
              />
              <input
                type="range"
                min={-30}
                max={30}
                value={shiftY}
                onChange={(e) => setShiftY(Number(e.target.value))}
                className="w-full accent-cyan-400"
                title="Shift Y"
              />
            </div>
          </div>

          {/* Flips */}
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
        <div className="lg:col-span-7 glass-panel p-5 rounded-2xl flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">Augmented Specimen Render</span>
            <span className="text-xs font-mono text-cyan-400">
              Keras ImageDataGenerator Equivalent
            </span>
          </div>

          {/* Canvas Simulation Container with Overflow Hidden */}
          <div className="w-64 h-64 bg-slate-950 border-2 border-slate-800 rounded-2xl flex items-center justify-center overflow-hidden relative shadow-inner">
            <div
              className="w-48 h-48 rounded-xl bg-gradient-to-br from-slate-800 via-slate-900 to-black border border-cyan-500/30 flex flex-col items-center justify-center transition-transform duration-100 ease-out select-none shadow-2xl"
              style={{
                transform: `rotate(${rotation}deg) scale(${zoom}) scaleX(${flipH ? -1 : 1}) scaleY(${
                  flipV ? -1 : 1
                }) translate(${shiftX}px, ${shiftY}px)`,
                filter: `brightness(${brightness}%)`,
              }}
            >
              <div className="text-6xl mb-2">{subjects[selectedSubject].icon}</div>
              <span className="text-[11px] font-mono text-cyan-300 font-bold text-center px-2">
                {subjects[selectedSubject].name.split(' (')[0]}
              </span>
              <span className="text-[9px] text-slate-400 font-mono mt-0.5">224×224 px</span>
            </div>
          </div>

          {/* Keras Python parameters */}
          <div className="w-full mt-4 p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400">
            <span className="text-cyan-400">ImageDataGenerator</span>(rotation_range=
            <span className="text-amber-300">{Math.abs(rotation) || 20}</span>, zoom_range=
            <span className="text-amber-300">0.2</span>, horizontal_flip=
            <span className="text-amber-300">True</span>, brightness_range=[0.8, 1.2])
          </div>
        </div>
      </div>

      {/* Batch Variations Preview Grid */}
      <div className="glass-panel p-5 rounded-2xl">
        <h5 className="font-semibold text-slate-100 mb-3 flex items-center gap-2">
          <Grid className="w-4 h-4 text-cyan-400" /> Automated Variations Generated for 1 Training Sample
        </h5>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {batchVariants.map((v, i) => (
            <div key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden mb-2 border border-slate-800">
                <div
                  className="text-3xl"
                  style={{
                    transform: `rotate(${v.rot}deg) scale(${v.z}) scaleX(${v.fh ? -1 : 1})`,
                    filter: `brightness(${v.b}%)`,
                  }}
                >
                  {subjects[selectedSubject].icon}
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-300">{v.name}</span>
              <span className="text-[10px] text-cyan-400 font-mono mt-0.5">Augmented #{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

