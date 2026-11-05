import React, { useState } from 'react';
import {
  BookOpen,
  Sliders,
  Terminal,
  FileQuestion,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Target,
  ListOrdered,
  AlertCircle,
  HelpCircle,
  Wrench,
  Check
} from 'lucide-react';
import { Experiment, ExecutionResult } from '../../types';
import { codeTemplates } from '../../data/codeTemplates';
import { caseStudiesByExperiment } from '../../data/caseStudiesData';
import { apiService } from '../../services/api';

// Simulators
import { PerceptronSimulator } from '../simulators/PerceptronSimulator';
import { BackpropSimulator } from '../simulators/BackpropSimulator';
import { DeepAnnsSimulator } from '../simulators/DeepAnnsSimulator';
import { ImageFeedforwardSimulator } from '../simulators/ImageFeedforwardSimulator';
import { Cnn2LayerSimulator } from '../simulators/Cnn2LayerSimulator';
import { Cnn4LayerSimulator } from '../simulators/Cnn4LayerSimulator';
import { PaddingBnSimulator } from '../simulators/PaddingBnSimulator';
import { RegularizationSimulator } from '../simulators/RegularizationSimulator';
import { DataAugmentationSimulator } from '../simulators/DataAugmentationSimulator';
import { CnnAugmentedSimulator } from '../simulators/CnnAugmentedSimulator';
import { LeNetSimulator } from '../simulators/LeNetSimulator';
import { VggSimulator } from '../simulators/VggSimulator';
import { RnnSentimentSimulator } from '../simulators/RnnSentimentSimulator';
import { BiLstmSimulator } from '../simulators/BiLstmSimulator';
import { GanSimulator } from '../simulators/GanSimulator';
import { AutoencoderDenoisingSimulator } from '../simulators/AutoencoderDenoisingSimulator';

// Sandbox Panels
import { CodeEditorPanel } from './CodeEditorPanel';
import { ExecutionConsole } from './ExecutionConsole';
import { DatasetViewer } from './DatasetViewer';
import { LineByLineExplainer } from './LineByLineExplainer';
import { CaseStudyCard } from './CaseStudyCard';

interface ExperimentViewProps {
  experiment: Experiment;
  isCompleted: boolean;
  onToggleComplete: (id: number) => void;
  onNavigateExperiment: (id: number) => void;
}

export const ExperimentView: React.FC<ExperimentViewProps> = ({
  experiment,
  isCompleted,
  onToggleComplete,
  onNavigateExperiment,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'simulator' | 'sandbox' | 'exercises' | 'casestudies'>('overview');

  const template = codeTemplates[experiment.id] || {
    raw_code: '# Code template loading...',
    documented_modifications: 'Standard Keras implementation',
    colab_link: 'https://colab.research.google.com/',
  };

  const [currentCode, setCurrentCode] = useState<string>(template.raw_code);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Sync code when experiment changes
  React.useEffect(() => {
    setCurrentCode(template.raw_code);
    setExecutionResult(null);
  }, [experiment.id]);

  const handleRunCode = async () => {
    setIsRunning(true);
    try {
      const res = await apiService.executeCode(currentCode);
      setExecutionResult(res);
    } catch (e: any) {
      setExecutionResult({
        stdout: '',
        stderr: e.message || 'Execution error encountered.',
        execution_time: 0.05,
        success: false,
        figures: [],
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleResetCode = () => {
    setCurrentCode(template.raw_code);
    setExecutionResult(null);
  };

  // Render the appropriate interactive simulator
  const renderSimulator = () => {
    switch (experiment.id) {
      case 1:
        return <PerceptronSimulator />;
      case 2:
        return <BackpropSimulator />;
      case 3:
        return <DeepAnnsSimulator />;
      case 4:
        return <ImageFeedforwardSimulator />;
      case 5:
        return <Cnn2LayerSimulator />;
      case 6:
        return <Cnn4LayerSimulator />;
      case 7:
        return <PaddingBnSimulator />;
      case 8:
        return <RegularizationSimulator />;
      case 9:
        return <DataAugmentationSimulator />;
      case 10:
        return <CnnAugmentedSimulator />;
      case 11:
        return <LeNetSimulator />;
      case 12:
        return <VggSimulator />;
      case 13:
        return <RnnSentimentSimulator />;
      case 14:
        return <BiLstmSimulator />;
      case 15:
        return <GanSimulator />;
      case 16:
        return <AutoencoderDenoisingSimulator />;
      default:
        return <div className="text-slate-400">Simulator ready.</div>;
    }
  };

  const caseStudies = caseStudiesByExperiment[experiment.id] || [];

  const lineExplanations =
    experiment.line_by_line ||
    (experiment.codeExplanation || []).map((ce) => ({
      line_number: ce.step,
      code_snippet: ce.code || ce.lines,
      explanation: `${ce.title} - ${ce.explanation}`,
      concept_tag: ce.lines,
    }));

  const exerciseList = (experiment.exercises || []).map((ex) =>
    typeof ex === 'string' ? ex : `${ex.title}: ${ex.task} (${ex.expectedOutcome || ''})`
  );

  const architectureText =
    typeof experiment.architecture === 'object' && experiment.architecture !== null
      ? `${experiment.architecture.title || ''}\n${experiment.architecture.summary || ''}\nLayers:\n${(
          experiment.architecture.layers || []
        )
          .map((l: string) => `• ${l}`)
          .join('\n')}`
      : String(experiment.architecture || '');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>MRCET R20A6683</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-cyan-400 font-bold">Week {experiment.id}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-200 truncate max-w-[280px]">{experiment.title}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Previous Experiment Button */}
          {experiment.id > 1 && (
            <button
              onClick={() => onNavigateExperiment(experiment.id - 1)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-all"
            >
              ← Week {experiment.id - 1}
            </button>
          )}

          {/* Next Experiment Button */}
          {experiment.id < 16 && (
            <button
              onClick={() => onNavigateExperiment(experiment.id + 1)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-all"
            >
              Week {experiment.id + 1} →
            </button>
          )}

          {/* Mark Complete Toggle */}
          <button
            onClick={() => onToggleComplete(experiment.id)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isCompleted
                ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-300'
                : 'bg-slate-800 border border-slate-700 text-slate-300 hover:border-emerald-500 hover:text-white'
            }`}
          >
            {isCompleted ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
            <span>{isCompleted ? 'Completed' : 'Mark Completed'}</span>
          </button>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-950/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/80 border border-cyan-800 text-cyan-400">
            EXPERIMENT #{experiment.id} • WEEK {experiment.id}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 border border-slate-800 text-slate-400">
            Target: IV B.Tech I Sem CSE (AI & ML)
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mb-3 tracking-tight">
          {experiment.title}
        </h1>

        <div className="text-sm text-cyan-200/90 font-mono bg-cyan-950/30 p-3 rounded-xl border border-cyan-800/40">
          <strong className="text-cyan-400 uppercase tracking-wider text-xs block mb-1">Prescribed Aim:</strong>
          {experiment.aim}
        </div>
      </div>

      {/* Main Tab Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {[
          { id: 'overview', label: '1. Theory & Algorithm', icon: BookOpen },
          { id: 'simulator', label: '2. Interactive Simulator', icon: Sliders },
          { id: 'sandbox', label: '3. Python Code Sandbox', icon: Terminal },
          { id: 'exercises', label: '4. Exercises & Viva', icon: FileQuestion },
          { id: 'casestudies', label: '5. Industry Case Studies', icon: Briefcase },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shrink-0 transition-all ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & THEORY */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Objectives & Prerequisites */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="glass-panel p-5 rounded-2xl">
              <h4 className="font-semibold text-slate-100 text-sm mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-400" /> Experiment Objectives
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {experiment.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel p-5 rounded-2xl">
              <h4 className="font-semibold text-slate-100 text-sm mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" /> Mathematical & Technical Prerequisites
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {experiment.prerequisites.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Deep Concept Explanation */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h4 className="font-semibold text-slate-100 text-base flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" /> Concept & Theoretical Foundations
            </h4>
            <div className="text-xs text-slate-300 leading-relaxed space-y-3">
              <p>{experiment.concept}</p>
            </div>
          </div>

          {/* Architecture & Algorithm */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 glass-panel p-5 rounded-2xl space-y-3">
              <h4 className="font-semibold text-slate-100 text-sm flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" /> Network Architecture Breakdown
              </h4>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-wrap">
                {architectureText}
              </div>
            </div>

            <div className="lg:col-span-7 glass-panel p-5 rounded-2xl space-y-3">
              <h4 className="font-semibold text-slate-100 text-sm flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-emerald-400" /> Prescribed Algorithm Steps
              </h4>
              <ol className="space-y-2 text-xs text-slate-300 list-decimal pl-5">
                {experiment.algorithm.map((step, i) => (
                  <li key={i} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          <div className="glass-panel p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300 font-medium">Interactive Demonstration Active</span>
              <span className="text-slate-500 font-mono">| Real-time WebGL / Canvas / Math Engine</span>
            </div>
          </div>
          {renderSimulator()}
        </div>
      )}

      {/* TAB 3: CODE SANDBOX */}
      {activeTab === 'sandbox' && (
        <div className="space-y-6">
          {/* Side-by-side Editor & Console */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[520px]">
            <div className="lg:col-span-7">
              <CodeEditorPanel
                code={currentCode}
                onCodeChange={setCurrentCode}
                onRun={handleRunCode}
                onReset={handleResetCode}
                isRunning={isRunning}
                colabUrl={template.colab_link}
                experimentTitle={experiment.title}
              />
            </div>

            <div className="lg:col-span-5">
              <ExecutionConsole result={executionResult} isRunning={isRunning} />
            </div>
          </div>

          {/* Dataset Table Inspector */}
          <DatasetViewer
            initialDataset={
              experiment.id === 1
                ? 'placement.csv'
                : experiment.id === 2 || experiment.id === 3
                ? 'iris.csv'
                : 'placement.csv'
            }
          />

          {/* Line by line explanation */}
          <LineByLineExplainer explanations={lineExplanations} />
        </div>
      )}

      {/* TAB 4: EXERCISES & VIVA */}
      {activeTab === 'exercises' && (
        <div className="space-y-6">
          {/* Prescribed Manual Exercises */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h4 className="font-semibold text-slate-100 text-sm flex items-center gap-2">
              <FileQuestion className="w-5 h-5 text-cyan-400" /> Prescribed Lab Exercises (From MRCET Manual)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exerciseList.map((ex, i) => (
                <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-xs font-mono font-bold text-cyan-400 block">Exercise {i + 1}</span>
                  <p className="text-xs text-slate-300 leading-relaxed">{ex}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Debugging Challenge */}
          <div className="glass-panel p-6 rounded-2xl space-y-3 border-l-4 border-l-amber-500">
            <h4 className="font-semibold text-slate-100 text-sm flex items-center gap-2">
              <Wrench className="w-4 h-4 text-amber-400" /> Debugging & Troubleshooting Challenge
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {experiment.debugging_scenario ||
                (experiment.commonErrors && experiment.commonErrors.length > 0
                  ? `${experiment.commonErrors[0].error}: ${experiment.commonErrors[0].cause} Solution: ${experiment.commonErrors[0].solution}`
                  : 'Ensure input tensor shape and batch dimensions match model layer definitions.')}
            </p>
          </div>

          {/* Advanced Challenge */}
          <div className="glass-panel p-6 rounded-2xl space-y-3 border-l-4 border-l-purple-500">
            <h4 className="font-semibold text-slate-100 text-sm flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-400" /> Advanced Research & Production Challenge
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {experiment.advanced_challenge ||
                (experiment.advancedChallenges
                  ? experiment.advancedChallenges.join(' ')
                  : 'Scale this architecture to larger multimodal datasets.')}
            </p>
          </div>
        </div>
      )}

      {/* TAB 5: CASE STUDIES */}
      {activeTab === 'casestudies' && (
        <div className="space-y-6">
          <CaseStudyCard caseStudies={caseStudies} />
        </div>
      )}
    </div>
  );
};
