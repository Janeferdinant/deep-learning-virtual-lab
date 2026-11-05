import React from 'react';
import { Terminal, Clock, CheckCircle2, AlertTriangle, Image as ImageIcon } from 'lucide-react';
import { ExecutionResult } from '../../types';

interface ExecutionConsoleProps {
  result: ExecutionResult | null;
  isRunning: boolean;
}

export const ExecutionConsole: React.FC<ExecutionConsoleProps> = ({ result, isRunning }) => {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 flex flex-col h-full bg-[#070b14]">
      {/* Console Header */}
      <div className="bg-[#0b1220] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold text-slate-200">Terminal Output & Visuals</span>
        </div>

        <div className="flex items-center gap-3">
          {isRunning ? (
            <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Executing in Python sandbox...
            </span>
          ) : result ? (
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                {(result.execution_time * 1000).toFixed(0)} ms
              </span>
              {result.success ? (
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Exit Code 0
                </span>
              ) : (
                <span className="text-xs font-mono text-rose-400 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Execution Error
                </span>
              )}
            </div>
          ) : (
            <span className="text-xs font-mono text-slate-500">Ready to execute</span>
          )}
        </div>
      </div>

      {/* Console Content */}
      <div className="p-4 flex-1 overflow-y-auto font-mono text-xs space-y-4">
        {isRunning && (
          <div className="text-slate-400 animate-pulse space-y-1">
            <p className="text-cyan-400">&gt; Initializing Python environment...</p>
            <p>&gt; Importing TensorFlow, Keras, NumPy, Matplotlib...</p>
            <p>&gt; Executing script AST...</p>
          </div>
        )}

        {!isRunning && !result && (
          <div className="text-slate-500 italic py-8 text-center">
            Click "Execute Script" above to run this experiment in the Python execution environment.
            <br />
            Terminal stdout, epoch metrics, and Matplotlib plots will render here.
          </div>
        )}

        {!isRunning && result && (
          <>
            {/* Standard Output */}
            {result.stdout && (
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">
                  STDOUT:
                </span>
                <pre className="text-slate-200 whitespace-pre-wrap leading-relaxed bg-black/40 p-3 rounded-xl border border-slate-900">
                  {result.stdout}
                </pre>
              </div>
            )}

            {/* Error Output */}
            {result.stderr && (
              <div className="space-y-1">
                <span className="text-[10px] text-rose-400 font-bold block uppercase tracking-wider">
                  STDERR / TRACEBACK:
                </span>
                <pre className="text-rose-300 whitespace-pre-wrap leading-relaxed bg-rose-950/30 p-3 rounded-xl border border-rose-900/50">
                  {result.stderr}
                </pre>
              </div>
            )}

            {/* Generated Base64 Matplotlib Figures */}
            {result.figures && result.figures.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] text-cyan-400 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                  <ImageIcon className="w-3.5 h-3.5" /> Generated Matplotlib Figures ({result.figures.length}):
                </span>
                <div className="grid grid-cols-1 gap-3">
                  {result.figures.map((fig, idx) => (
                    <div
                      key={idx}
                      className="bg-black p-2 rounded-xl border border-slate-800 flex flex-col items-center"
                    >
                      <img
                        src={fig}
                        alt={`Matplotlib Figure ${idx + 1}`}
                        className="rounded-lg max-h-[380px] object-contain w-full"
                      />
                      <span className="text-[10px] text-slate-500 mt-2 font-mono">
                        Figure {idx + 1} • Captured via plt.savefig()
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

