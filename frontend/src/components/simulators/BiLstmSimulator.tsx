import React, { useState } from 'react';
import { ArrowLeftRight, CheckCircle2, Sliders, ShieldCheck, Cpu } from 'lucide-react';
import { apiService } from '../../services/api';

export const BiLstmSimulator: React.FC = () => {
  const [inputText, setInputText] = useState<string>(
    'The acting was not bad at all, in fact it was remarkably subtle.'
  );
  const [activeGate, setActiveGate] = useState<'forget' | 'input' | 'cell' | 'output'>('forget');
  const [result, setResult] = useState<{ sentiment: string; confidence: number; scores: { positive: number; negative: number } } | null>({
    sentiment: 'Positive',
    confidence: 0.96,
    scores: { positive: 0.96, negative: 0.04 },
  });
  const [isInferring, setIsInferring] = useState(false);

  const words = inputText.trim().split(/\s+/).filter(Boolean);

  const handleInference = async () => {
    setIsInferring(true);
    try {
      const res = await apiService.predictSentiment(inputText);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsInferring(false);
    }
  };

  const gateDetails = {
    forget: {
      name: 'Forget Gate (f_t)',
      formula: 'f_t = σ(W_f · [h_{t-1}, x_t] + b_f)',
      purpose: 'Determines what percentage of past cell memory C_{t-1} should be discarded (0 = forget, 1 = retain).',
      metric: '0.82 (Retains context across sentences)',
    },
    input: {
      name: 'Input Gate (i_t) & Candidate (C̃_t)',
      formula: 'i_t = σ(W_i · [h_{t-1}, x_t] + b_i),   C̃_t = tanh(W_c · [h_{t-1}, x_t] + b_c)',
      purpose: 'Identifies new candidate information to incorporate into the persistent cell memory line.',
      metric: '0.91 (Writes current word sentiment)',
    },
    cell: {
      name: 'Cell State Update (C_t)',
      formula: 'C_t = f_t ⊙ C_{t-1} + i_t ⊙ C̃_t',
      purpose: 'Linear constant error carousel allowing gradients to flow uninterrupted over hundreds of tokens.',
      metric: 'Highway gradient conveyor belt',
    },
    output: {
      name: 'Output Gate (o_t) & State (h_t)',
      formula: 'o_t = σ(W_o · [h_{t-1}, x_t] + b_o),   h_t = o_t ⊙ tanh(C_t)',
      purpose: 'Filters cell memory through a non-linear tanh mask to produce the current time-step hidden emission.',
      metric: 'Emission Vector (64 dimensions)',
    },
  };

  return (
    <div className="space-y-6">
      {/* Input bar */}
      <div className="glass-panel p-5 rounded-2xl space-y-4">
        <label className="text-xs font-semibold text-slate-300 block">
          Input Sequence (Try phrases with double negatives or delayed sentiment):
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleInference()}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
          />
          <button
            onClick={handleInference}
            disabled={isInferring}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition-all shrink-0"
          >
            {isInferring ? 'Analyzing...' : 'BiLSTM Classify'}
          </button>
        </div>
      </div>

      {/* Bidirectional Information Flow Visualization */}
      <div className="glass-panel p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-slate-100 flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-cyan-400" /> Bidirectional Pass: Forward (→) & Backward (←)
          </h4>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950/70 border border-cyan-800/60 px-2.5 py-0.5 rounded-full">
            h_t = [ h⃗_t ; h⃖_t ] (128 Concatenated Features)
          </span>
        </div>

        {/* Word Sequence Cards */}
        <div className="space-y-3">
          {/* Forward Pass Stream */}
          <div className="flex items-center gap-2 overflow-x-auto p-3 bg-slate-950/80 rounded-xl border border-cyan-500/20">
            <span className="text-[10px] text-cyan-400 font-mono font-bold w-16 shrink-0">
              FORWARD ➔
            </span>
            {words.slice(0, 8).map((w, idx) => (
              <div
                key={`fwd-${idx}`}
                className="px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-200 shrink-0"
              >
                h⃗_{idx + 1} ("{w}")
              </div>
            ))}
          </div>

          {/* Tokens Display */}
          <div className="flex items-center gap-2 overflow-x-auto px-4 py-1">
            <span className="text-[10px] text-slate-500 font-mono w-16 shrink-0">TOKENS:</span>
            {words.slice(0, 8).map((w, idx) => (
              <div
                key={`tok-${idx}`}
                className="px-3 py-1 text-xs font-bold text-slate-300 font-sans shrink-0 bg-slate-900 rounded"
              >
                {w}
              </div>
            ))}
          </div>

          {/* Backward Pass Stream */}
          <div className="flex items-center gap-2 overflow-x-auto p-3 bg-slate-950/80 rounded-xl border border-indigo-500/20">
            <span className="text-[10px] text-indigo-400 font-mono font-bold w-16 shrink-0">
              BACKWARD ⬅
            </span>
            {words.slice(0, 8).map((w, idx) => (
              <div
                key={`bwd-${idx}`}
                className="px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-xs font-mono text-indigo-200 shrink-0"
              >
                h⃖_{idx + 1} ("{w}")
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Internal LSTM Gates Architecture Explorer */}
      <div className="glass-panel p-6 rounded-2xl">
        <h4 className="font-semibold text-slate-100 mb-3 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" /> Internal LSTM Cell Gates Breakdown
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {(['forget', 'input', 'cell', 'output'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setActiveGate(g)}
              className={`p-3 rounded-xl border text-left transition-all ${
                activeGate === g
                  ? 'bg-cyan-500/20 border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className="text-xs font-bold font-mono text-cyan-300 block capitalize">{g} Gate</span>
              <span className="text-[10px] text-slate-400 font-mono block mt-1">
                {g === 'forget' ? 'f_t' : g === 'input' ? 'i_t & C̃_t' : g === 'cell' ? 'C_t' : 'o_t & h_t'}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Gate Card */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <h5 className="font-semibold text-sm text-cyan-300">{gateDetails[activeGate].name}</h5>
            <span className="text-xs font-mono text-emerald-400">{gateDetails[activeGate].metric}</span>
          </div>
          <div className="p-2 bg-slate-900 rounded font-mono text-xs text-amber-300">
            {gateDetails[activeGate].formula}
          </div>
          <p className="text-xs text-slate-300">{gateDetails[activeGate].purpose}</p>
        </div>
      </div>

      {/* Performance Comparison: Vanilla RNN vs BiLSTM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="glass-panel p-5 rounded-2xl">
          <h5 className="text-sm font-semibold text-slate-300 mb-3">SimpleRNN Baseline</h5>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400">IMDb Test Accuracy:</span>
              <span className="font-mono text-amber-400">78.2%</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Gradient Stability:</span>
              <span className="text-rose-400">Vanishes after ~20 words</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Context Access:</span>
              <span className="text-slate-400">Past context only (left-to-right)</span>
            </div>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-emerald-500">
          <h5 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Bidirectional LSTM
          </h5>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400">IMDb Test Accuracy:</span>
              <span className="font-mono text-emerald-400 font-bold">88.9% (+10.7% boost)</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Gradient Stability:</span>
              <span className="text-emerald-400">Preserved via additive cell state</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Context Access:</span>
              <span className="text-emerald-400 font-bold">Full past and future context simultaneously</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

