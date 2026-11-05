import React, { useState } from 'react';
import { MessageSquare, Play, Sparkles, TrendingUp, Cpu, Copy, Check } from 'lucide-react';
import { apiService } from '../../services/api';

export const SentimentAnalyzerApp: React.FC = () => {
  const [text, setText] = useState<string>(
    'The cinematography was breathtaking and the emotional performances were truly unforgettable.'
  );
  const [modelType, setModelType] = useState<'bilstm' | 'rnn'>('bilstm');
  const [result, setResult] = useState<{
    sentiment: string;
    confidence: number;
    scores: { positive: number; negative: number };
  }>({
    sentiment: 'Positive',
    confidence: 0.95,
    scores: { positive: 0.95, negative: 0.05 },
  });
  const [isInferring, setIsInferring] = useState(false);
  const [copied, setCopied] = useState(false);

  const presets = [
    { label: 'Glowing Praise', text: 'An absolute masterpiece of cinema with brilliant direction and acting!' },
    { label: 'Harsh Critique', text: 'Terrible pacing, dreadful dialogue, and a completely uninspired ending.' },
    { label: 'Subtle / Nuanced', text: 'The movie was not bad at all, though it had several slow pacing issues.' },
    { label: 'Product Review', text: 'Exceeded all my expectations. Build quality is top-notch and battery lasts 2 days.' },
  ];

  const handleInference = async () => {
    if (!text.trim()) return;
    setIsInferring(true);
    try {
      const res = await apiService.predictSentiment(text);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsInferring(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify({ text, ...result }, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Keyword token analysis
  const words = text.split(/\s+/).filter(Boolean);
  const positiveLexicon = new Set(['great', 'masterpiece', 'brilliant', 'breathtaking', 'unforgettable', 'stunning', 'good', 'superb', 'top-notch', 'exceeded']);
  const negativeLexicon = new Set(['bad', 'terrible', 'dreadful', 'uninspired', 'waste', 'boring', 'awful', 'poor', 'disappointing', 'horrible']);

  return (
    <div className="space-y-6">
      {/* App Header */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400">
                APP 3 • NLP SEQUENCE MODEL
              </span>
              <span className="text-xs font-mono text-slate-400">IMDb Movie Review Classifier</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Sentiment Analysis Engine</h2>
            <p className="text-xs text-slate-400 mt-1">
              Classify custom reviews into Positive or Negative polarity using Bidirectional LSTM / SimpleRNN recurrent networks.
            </p>
          </div>

          {/* Model Toggle */}
          <div className="flex rounded-xl bg-slate-900 border border-slate-700 p-1">
            <button
              onClick={() => setModelType('bilstm')}
              className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-all ${
                modelType === 'bilstm'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Bidirectional LSTM (88.9%)
            </button>
            <button
              onClick={() => setModelType('rnn')}
              className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-all ${
                modelType === 'rnn'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              SimpleRNN (78.2%)
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Input & Sentiment Attribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Panel (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl space-y-4">
          <label className="text-xs font-semibold text-slate-300 block">
            Enter Review / Comment to Classify:
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-sm text-slate-100 focus:outline-none focus:border-cyan-400 font-sans resize-none"
            placeholder="Type any product, service, or film feedback..."
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleInference}
                disabled={isInferring}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition-all"
              >
                <Play className="w-4 h-4" /> {isInferring ? 'Analyzing Sequence...' : 'Classify Sentiment'}
              </button>
              <button
                onClick={handleCopy}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-all"
                title="Copy Prediction JSON"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <span className="text-xs font-mono text-slate-500">{words.length} tokens</span>
          </div>

          {/* Preset Buttons */}
          <div className="pt-2">
            <span className="text-[11px] text-slate-400 block mb-2 font-mono">Sample Reviews:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setText(p.text)}
                  className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 text-left transition-all"
                >
                  <span className="text-xs font-semibold text-cyan-300 block">{p.label}</span>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">"{p.text}"</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Polarity & Keyword Heatmap (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl flex flex-col justify-between">
          <div>
            <h4 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" /> Polarity Gauge & Sentiment Output
            </h4>

            {/* Big Sentiment Card */}
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 text-center mb-4">
              <span className="text-xs text-slate-500 font-mono block mb-1">Inferred Classification</span>
              <div
                className={`text-3xl font-bold font-mono ${
                  result.sentiment === 'Positive' ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {result.sentiment}
              </div>
              <span className="text-xs text-slate-300 font-mono mt-1 block">
                Confidence: {(result.confidence * 100).toFixed(1)}%
              </span>
            </div>

            {/* Word-level Sentiment Highlight */}
            <div className="mb-4">
              <span className="text-xs font-mono text-slate-400 block mb-2">Lexical Token Heatmap:</span>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-1.5">
                {words.map((w, idx) => {
                  const clean = w.toLowerCase().replace(/[^a-z]/g, '');
                  const isPos = positiveLexicon.has(clean);
                  const isNeg = negativeLexicon.has(clean);
                  return (
                    <span
                      key={idx}
                      className={`px-2 py-0.5 rounded text-xs font-mono ${
                        isPos
                          ? 'bg-emerald-950 border border-emerald-600 text-emerald-300 font-bold'
                          : isNeg
                          ? 'bg-rose-950 border border-rose-600 text-rose-300 font-bold'
                          : 'text-slate-400'
                      }`}
                    >
                      {w}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1 font-mono">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Embedding(10000, 128) ➔ BiLSTM(64)
            </span>
            <span className="text-emerald-400 font-mono">IMDb Tested</span>
          </div>
        </div>
      </div>
    </div>
  );
};

