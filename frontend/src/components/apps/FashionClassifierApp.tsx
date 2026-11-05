import React, { useState } from 'react';
import { Shirt, Upload, CheckCircle2, BarChart2, Cpu, Download, Info } from 'lucide-react';
import { apiService } from '../../services/api';

export const FashionClassifierApp: React.FC = () => {
  const fashionClasses = [
    { id: 0, name: 'T-shirt / Top', icon: '👕', desc: 'Short sleeve casual upper body garment' },
    { id: 1, name: 'Trouser', icon: '👖', desc: 'Legwear with dual vertical leg contours' },
    { id: 2, name: 'Pullover', icon: '🧥', desc: 'Heavy long-sleeve knitwear with collar' },
    { id: 3, name: 'Dress', icon: '👗', desc: 'Continuous one-piece upper-to-lower silhouette' },
    { id: 4, name: 'Coat', icon: '🧥', desc: 'Long outerwear with lapels and button lines' },
    { id: 5, name: 'Sandal', icon: '👡', desc: 'Open footwear with thin strap geometries' },
    { id: 6, name: 'Shirt', icon: '👔', desc: 'Formal button-down with sharp triangular collar' },
    { id: 7, name: 'Sneaker', icon: '👟', desc: 'Sport footwear with flat cushioned sole profile' },
    { id: 8, name: 'Bag', icon: '👜', desc: 'Square or rounded pouch with top handle loop' },
    { id: 9, name: 'Ankle Boot', icon: '👢', desc: 'High-top closed footwear with heel contour' },
  ];

  const [selectedClassId, setSelectedClassId] = useState<number>(7); // Sneaker default
  const [prediction, setPrediction] = useState<{
    class_id: number;
    class_name: string;
    confidence: number;
    probabilities: number[];
  }>({
    class_id: 7,
    class_name: 'Sneaker',
    confidence: 0.962,
    probabilities: [0.005, 0.002, 0.003, 0.001, 0.004, 0.012, 0.006, 0.962, 0.003, 0.002],
  });
  const [isInferring, setIsInferring] = useState(false);

  const handleSelectSample = async (clsId: number) => {
    setSelectedClassId(clsId);
    setIsInferring(true);
    try {
      const res = await apiService.predictFashion(clsId);
      setPrediction(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsInferring(false);
    }
  };

  const currentClass = fashionClasses.find((c) => c.id === selectedClassId) || fashionClasses[0];

  return (
    <div className="space-y-6">
      {/* App Header */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400">
                APP 2 • E-COMMERCE APPAREL CLASSIFIER
              </span>
              <span className="text-xs font-mono text-slate-400">4-Layer Deep CNN Model</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Fashion Product Classification</h2>
            <p className="text-xs text-slate-400 mt-1">
              Select any fashion apparel item or test image to classify into one of the 10 Zalando Fashion-MNIST categories.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Sample Selector & Prediction */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sample Picker & Specimen Viewer (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono text-slate-400 block mb-3">
              Select Sample Product Specimen:
            </span>

            {/* 10 Catalog Buttons */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {fashionClasses.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectSample(item.id)}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                    selectedClassId === item.id
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/15'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <span className="text-xs font-semibold block">{item.name}</span>
                    <span className="text-[10px] font-mono text-slate-500">Class #{item.id}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Current Specimen Display */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-4xl shrink-0">
              {currentClass.icon}
            </div>
            <div>
              <span className="text-sm font-bold text-slate-100 block">{currentClass.name}</span>
              <p className="text-xs text-slate-400 mt-0.5">{currentClass.desc}</p>
            </div>
          </div>
        </div>

        {/* Prediction Results (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-slate-100 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-cyan-400" /> Multi-Class Probability Distribution
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">Predicted:</span>
                <span className="text-sm font-bold font-mono text-emerald-400 px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-600/50">
                  {prediction.class_name} ({(prediction.confidence * 100).toFixed(1)}%)
                </span>
              </div>
            </div>

            {/* Probability Bars */}
            <div className="space-y-2">
              {fashionClasses.map((item) => {
                const score = prediction.probabilities[item.id] || 0.01;
                const isWinner = prediction.class_id === item.id;
                return (
                  <div key={item.id} className="flex items-center gap-3">
                    <span className="w-5 text-base">{item.icon}</span>
                    <span className={`w-28 text-xs font-mono truncate ${isWinner ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}>
                      {item.name}
                    </span>
                    <div className="flex-1 h-3.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isWinner ? 'bg-gradient-to-r from-cyan-500 to-emerald-400' : 'bg-slate-700/60'
                        }`}
                        style={{ width: `${Math.max(3, score * 100)}%` }}
                      />
                    </div>
                    <span className="w-14 text-right text-xs font-mono text-slate-400">
                      {(score * 100).toFixed(1)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Architecture footer */}
          <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>4-Layer CNN: Conv2D(32) ➔ Conv2D(64) ➔ Conv2D(128) ➔ Conv2D(128) ➔ Dense(10)</span>
            </div>
            <span className="text-emerald-400 font-mono">Validation Accuracy: 93.4%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

