export interface Experiment {
  id: number;
  week?: number;
  title: string;
  tagline?: string;
  category?: string;
  aim: string;
  objectives: string[];
  prerequisites: string[];
  concept: string;
  mathFormulas?: {
    name: string;
    formula: string;
    description: string;
  }[];
  architecture: any; // Can be string or structured object
  algorithm: string[];
  datasetInfo?: {
    name: string;
    source: string;
    sampleCount: string;
    features: string[];
    target: string;
    description: string;
  };
  prescribedCode?: string;
  codeExplanation?: {
    step: number;
    lines: string;
    code: string;
    title: string;
    explanation: string;
  }[];
  line_by_line?: {
    line_number: number;
    code_snippet: string;
    explanation: string;
    concept_tag?: string;
  }[];
  exercises: any[]; // Array of strings or objects
  commonErrors?: {
    error: string;
    cause: string;
    solution: string;
  }[];
  debugging_scenario?: string;
  advanced_challenge?: string;
  advancedChallenges?: string[];
  summary?: string[];
  defaultDataset?: string;
}

export interface QuizQuestion {
  id: any;
  experiment_id?: number;
  experimentId?: number;
  question: string;
  options: string[];
  correct_answer?: number;
  correctAnswer?: number;
  explanation: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  type: 'conceptual' | 'application' | string;
}

export interface VivaQuestion {
  id: any;
  experiment_id?: number;
  experimentId?: number;
  question: string;
  short_answer?: string;
  shortAnswer?: string;
  detailed_answer?: string;
  detailedAnswer?: string;
  category: string;
  difficulty: 'basic' | 'intermediate' | 'advanced' | string;
  is_external_viva?: boolean;
}

export interface CaseStudy {
  id: any;
  experimentId?: number;
  title: string;
  industry: string;
  description?: string;
  problemStatement?: string;
  realWorldRequirement?: string;
  dataset?: string;
  preprocessing?: string;
  modelArchitecture?: string;
  architecture_used?: string;
  trainingMethodology?: string;
  evaluationMetrics?: string;
  impact_metrics?: string;
  results?: string;
  limitations?: string;
  futureImprovements?: string;
}

export interface ExecutionResult {
  success: boolean;
  stdout: string;
  stderr: string;
  execution_time: number;
  images?: string[];
  figures?: string[];
}

export interface StudentProgress {
  completed_experiments: number[];
  completedExperiments?: number[];
  quiz_scores: Record<number, { score: number; total: number }>;
  quizScores?: Record<number, number>;
  viva_mastered: any[];
  vivaMastered?: string[];
  overall_accuracy: number;
  codeExecutions?: Record<number, number>;
}
