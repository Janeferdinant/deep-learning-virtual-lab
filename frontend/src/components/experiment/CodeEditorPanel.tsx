import React, { useState } from 'react';
import { Play, RotateCcw, Copy, Check, Download, ExternalLink, Code2 } from 'lucide-react';

interface CodeEditorPanelProps {
  code: string;
  onCodeChange: (code: string) => void;
  onRun: () => void;
  onReset: () => void;
  isRunning: boolean;
  colabUrl?: string;
  experimentTitle: string;
}

export const CodeEditorPanel: React.FC<CodeEditorPanelProps> = ({
  code,
  onCodeChange,
  onRun,
  onReset,
  isRunning,
  colabUrl,
  experimentTitle,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${experimentTitle.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}.py`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 flex flex-col h-full">
      {/* Editor Header Toolbar */}
      <div className="bg-[#0b1220] px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold text-slate-200">
            Python 3 Live Code Sandbox (TensorFlow / Keras)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 text-xs flex items-center gap-1.5 transition-all"
            title="Copy Code to Clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {/* Download .py Button */}
          <button
            onClick={handleDownload}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 text-xs flex items-center gap-1.5 transition-all"
            title="Download Python Script (.py)"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">.py</span>
          </button>

          {/* Reset Code */}
          <button
            onClick={onReset}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 text-xs flex items-center gap-1.5 transition-all"
            title="Reset to Manual Code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Colab Link */}
          {colabUrl && (
            <a
              href={colabUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 text-xs flex items-center gap-1.5 transition-all"
              title="Launch in Google Colab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Colab</span>
            </a>
          )}

          {/* Run Button */}
          <button
            onClick={onRun}
            disabled={isRunning}
            className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 disabled:opacity-50 transition-all ml-1"
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-pulse' : ''}`} />
            <span>{isRunning ? 'Running...' : 'Execute Script'}</span>
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="relative flex-1 min-h-[380px] bg-[#070b14]">
        <textarea
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          spellCheck={false}
          className="w-full h-full p-4 bg-transparent text-slate-200 font-mono text-xs leading-relaxed resize-none focus:outline-none selection:bg-cyan-500/40"
        />
      </div>
    </div>
  );
};

