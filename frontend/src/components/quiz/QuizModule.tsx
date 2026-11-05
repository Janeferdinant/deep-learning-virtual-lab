import React, { useState, useEffect } from 'react';
import {
  FileQuestion,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  BookOpen
} from 'lucide-react';
import { QuizQuestion } from '../../types';
import { quizzesByExperiment, generateComprehensiveExam } from '../../data/quizData';

interface QuizModuleProps {
  initialExpId?: number;
  onUpdateScore?: (expId: number, score: number, total: number) => void;
}

export const QuizModule: React.FC<QuizModuleProps> = ({ initialExpId = 1, onUpdateScore }) => {
  const [selectedExpId, setSelectedExpId] = useState<number | 'comprehensive'>(initialExpId);
  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: { selected: number; isCorrect: boolean } }>({});
  const [isExamFinished, setIsExamFinished] = useState<boolean>(false);

  // Load questions when experiment or mode changes
  useEffect(() => {
    if (selectedExpId === 'comprehensive') {
      const examQuestions = generateComprehensiveExam(20);
      setCurrentQuestions(examQuestions);
    } else {
      const expQuestions = quizzesByExperiment[selectedExpId] || [];
      setCurrentQuestions(expQuestions);
    }
    resetQuiz();
  }, [selectedExpId]);

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserAnswers({});
    setIsExamFinished(false);
  };

  const currentQ = currentQuestions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !currentQ) return;
    const correctAns = currentQ.correct_answer ?? currentQ.correctAnswer ?? 0;
    const isCorrect = selectedOption === correctAns;
    setIsAnswerSubmitted(true);
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: { selected: selectedOption, isCorrect },
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsExamFinished(true);
      // Compute score
      const correctTotal = Object.values(userAnswers).filter((a) => a.isCorrect).length;
      if (typeof selectedExpId === 'number' && onUpdateScore) {
        onUpdateScore(selectedExpId, correctTotal, currentQuestions.length);
      }
    }
  };

  // Score stats
  const totalAnswered = Object.keys(userAnswers).length;
  const totalCorrect = Object.values(userAnswers).filter((a) => a.isCorrect).length;
  const scorePercent = currentQuestions.length > 0 ? (totalCorrect / currentQuestions.length) * 100 : 0;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Quiz Top Navigation Bar */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400">
                SECTION 7 • ASSESSMENT ENGINE
              </span>
              <span className="text-xs font-mono text-slate-400">160 Prescribed MCQs + Diagnostic Exam</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Deep Learning Mastery Assessment</h2>
            <p className="text-xs text-slate-400 mt-1">
              Test conceptual understanding and practical problem-solving with immediate feedback, detailed rationales, and diagnostics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedExpId('comprehensive')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                selectedExpId === 'comprehensive'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 border-slate-700 text-amber-400 hover:border-amber-500'
              }`}
            >
              ★ Comprehensive Final Exam (All 16 Weeks)
            </button>
          </div>
        </div>

        {/* Experiment 1 to 16 Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-5 pb-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((expNum) => (
            <button
              key={expNum}
              onClick={() => setSelectedExpId(expNum)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium shrink-0 border transition-all ${
                selectedExpId === expNum
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              Week {expNum}
            </button>
          ))}
        </div>
      </div>

      {/* Main Quiz Body */}
      {!isExamFinished && currentQ ? (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
          {/* Question Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-800">
                Question {currentIndex + 1} of {currentQuestions.length}
              </span>
              <span className="text-xs font-mono text-slate-400 capitalize px-2 py-1 rounded bg-slate-900 border border-slate-800">
                {currentQ.type}
              </span>
              <span
                className={`text-xs font-mono capitalize px-2 py-1 rounded border ${
                  currentQ.difficulty === 'basic'
                    ? 'text-emerald-400 border-emerald-900/60 bg-emerald-950/40'
                    : currentQ.difficulty === 'intermediate'
                    ? 'text-cyan-400 border-cyan-900/60 bg-cyan-950/40'
                    : 'text-purple-400 border-purple-900/60 bg-purple-950/40'
                }`}
              >
                {currentQ.difficulty}
              </span>
            </div>

            <div className="text-xs font-mono text-slate-400">
              Score: <strong className="text-cyan-400">{totalCorrect}</strong> / {totalAnswered}
            </div>
          </div>

          {/* Question Text */}
          <h3 className="text-base sm:text-lg font-semibold text-slate-100 leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Options List */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = idx === (currentQ.correct_answer ?? currentQ.correctAnswer);
              let btnStyle = 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700';

              if (isAnswerSubmitted) {
                if (isCorrectAnswer) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-500/10';
                } else if (isSelected && !isCorrectAnswer) {
                  btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                } else {
                  btnStyle = 'opacity-40 bg-slate-950/40 border-slate-800 text-slate-500';
                }
              } else if (isSelected) {
                btnStyle = 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/20';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all ${btnStyle}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-xs sm:text-sm leading-relaxed flex-1">{option}</span>
                  {isAnswerSubmitted && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner (Shows immediately after submission) */}
          {isAnswerSubmitted && (
            <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold font-mono">
                <Lightbulb className="w-4 h-4 text-cyan-400" /> Pedagogical Explanation & Reference:
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={resetQuiz}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Restart Quiz
            </button>

            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs disabled:opacity-40 transition-all shadow-lg shadow-cyan-500/20"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
              >
                <span>{currentIndex < currentQuestions.length - 1 ? 'Next Question' : 'View Final Results'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : isExamFinished ? (
        /* Results Card */
        <div className="glass-panel p-8 rounded-3xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center mx-auto text-cyan-400 shadow-xl shadow-cyan-500/20">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-100">Assessment Complete!</h3>
            <p className="text-xs text-slate-400 mt-1">
              Performance diagnostic for{' '}
              {selectedExpId === 'comprehensive' ? 'Comprehensive Final Assessment' : `Week ${selectedExpId}`}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400">Total Score</span>
              <div className="text-3xl font-bold font-mono text-cyan-400 my-1">
                {totalCorrect} / {currentQuestions.length}
              </div>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400">Accuracy Rate</span>
              <div className="text-3xl font-bold font-mono text-emerald-400 my-1">
                {scorePercent.toFixed(1)}%
              </div>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400">Status</span>
              <div className="text-sm font-bold font-mono text-cyan-300 my-3">
                {scorePercent >= 80 ? 'Mastery Achieved' : scorePercent >= 60 ? 'Passing Grade' : 'Revision Needed'}
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={resetQuiz}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <RotateCcw className="w-4 h-4" /> Retake Quiz
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
