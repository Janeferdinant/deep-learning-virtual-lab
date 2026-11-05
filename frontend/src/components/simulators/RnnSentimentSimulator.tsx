import React, { useState } from 'react';
import { MessageSquare, ArrowRight, TrendingUp, Sparkles, AlertCircle, Play } from 'lucide-react';
import { apiService } from '../../services/api';

export const RnnSentimentSimulator: React.FC = () => {
  const [inputText, setInputText] = useState<string>(
    'The cinematography was stunning and the plot was genuinely thrilling and remarkable.'
  );
  const [result, setResult] = useState<{ sentiment: string; confidence: number; scores: { positive: number; negative: number } } | null>({
    sentiment: 'Positive',
    confidence: 0.94,
    scores: { positive: 0.94, negative: 0.06 },
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeWordIdx, setActiveWordIdx] = useState<number>(0);

  const sampleReviews = [
    { text: 'The movie was absolutely fantastic, brilliant acting and superb direction!', label: 'Positive' },
    { text: 'A completely dull, predictable, and utterly disappointing waste of time.', label: 'Negative' },
    { text: 'Started with great promise but collapsed into a confusing mess by the end.', label: 'Mixed / Negative' },
    { text: 'An emotional masterpiece with heartwarming performances throughout.', label: 'Positive' },
  ];

  const words = inputText.trim().split(/\s+/).filter(Boolean);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    try {
      const res = await apiService.predictSentiment(inputText);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Text Box */}
      <div className="glass-panel p-5 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-cyan-400" /> Enter Movie Review / Text to Classify:
          </label>
          <span className="text-[11px] text-slate-400 font-mono">
            {words.length} tokens in sequence
          </span>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
            placeholder="Type any movie or product review..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition-all shrink-0"
          >
            <Play className="w-4 h-4" /> {isAnalyzing ? 'Processing...' : 'Run RNN Inference'}
          </button>
        </div>

        {/* Quick Sample Presets */}
        <div>
          <span className="text-[11px] text-slate-400 block mb-1.5">Preset Test Reviews:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sampleReviews.map((rev, i) => (
              <button
                key={i}
                onClick={() => {
                  setInputText(rev.text);
                  setActiveWordIdx(0);
                }}
                className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-left hover:border-slate-700 transition-all text-xs"
              >
                <span className="text-slate-300 line-clamp-1">"{rev.text}"</span>
                <span className="text-[10px] text-cyan-400 font-mono mt-0.5 block">{rev.label} Sample</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recurrent Unrolling & Hidden State Visualizer */}
      <div className="glass-panel p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-semibold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" /> Sequential Hidden State Evolution: h(t) = tanh(W_xh · x_t + W_hh · h_(t-1) + b)
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Click any token in the sequence to inspect hidden memory state transmission.
            </p>
          </div>
        </div>

        {/* Horizontal Unrolled Token Stream */}
        <div className="flex items-center gap-2 overflow-x-auto p-4 bg-slate-950 rounded-xl border border-slate-800">
          {words.slice(0, 10).map((w, idx) => {
            const isSelected = activeWordIdx === idx;
            return (
              <React.Fragment key={idx}>
                <button
                  onClick={() => setActiveWordIdx(idx)}
                  className={`p-3 rounded-xl border flex flex-col items-center min-w-[90px] shrink-0 transition-all ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 shadow-md shadow-cyan-500/20 ring-1 ring-cyan-400'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] text-slate-500 font-mono">t = {idx + 1}</span>
                  <span className="text-xs font-bold text-slate-200 mt-1">"{w}"</span>
                  <span className="text-[10px] text-cyan-400 font-mono mt-1">h_{idx + 1}</span>
                </button>
                {idx < Math.min(words.length - 1, 9) && (
                  <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mathematical State Details */}
        <div className="mt-4 p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
          <div className="text-slate-400 mb-1">State Vector Transition at Step t = {activeWordIdx + 1}:</div>
          <div className="text-cyan-300">
            h_{activeWordIdx + 1} = tanh( W_xh · Embedding("{words[activeWordIdx] || 'token'}") + W_hh · h_{activeWordIdx} + b )
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Embedding Dimension: 64, Hidden Units: 32 (SimpleRNN Cell)
          </div>
        </div>
      </div>

      {/* Prediction Output & Confidence */}
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-cyan-500">
            <span className="text-xs text-slate-400">Classified Sentiment</span>
            <div className="flex items-center gap-3 my-2">
              <span
                className={`text-3xl font-bold font-mono ${
                  result.sentiment === 'Positive' ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {result.sentiment}
              </span>
              <span className="text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                Confidence: {(result.confidence * 100).toFixed(1)}%
              </span>
            </div>

            <div className="space-y-2 mt-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400">Positive:</span>
                <span>{(result.scores.positive * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${result.scores.positive * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-rose-400">Negative:</span>
                <span>{(result.scores.negative * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full"
                  style={{ width: `${result.scores.negative * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-amber-500">
            <h5 className="font-semibold text-slate-200 text-sm flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-amber-400" /> Vanishing Gradient Limitation in SimpleRNN
            </h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              When backpropagating through time (BPTT), the gradient factor contains repeated multiplications:
              ∂h_T / ∂h_1 = ∏ W_hh^T · diag(1 - h_k²).
              Because tanh' is bounded by 1.0 and typically &lt; 0.5, gradients vanish exponentially for sequences longer than 20–30 words.
            </p>
            <div className="mt-3 p-2.5 rounded bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200">
              👉 Week 14 upgrades this directly to <span className="font-semibold">Bidirectional LSTM</span> with constant error carousels!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
