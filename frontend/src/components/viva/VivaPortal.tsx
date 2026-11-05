import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  Search,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  BookOpen,
  Filter,
  Bookmark
} from 'lucide-react';
import { VivaQuestion } from '../../types';
import { vivaByExperiment, allVivaQuestions } from '../../data/vivaData';

export const VivaPortal: React.FC = () => {
  const [selectedExpId, setSelectedExpId] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'flashcard'>('list');

  // Flashcard mode state
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [revealDetailed, setRevealDetailed] = useState<boolean>(false);

  // Self-assessment status tracked in local state: { [qId: string]: 'mastered' | 'practice' }
  const [assessments, setAssessments] = useState<Record<string, 'mastered' | 'practice'>>(() => {
    try {
      const saved = localStorage.getItem('viva_assessments');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleAssess = (qId: any, status: 'mastered' | 'practice') => {
    const key = String(qId);
    const updated = { ...assessments, [key]: status };
    setAssessments(updated);
    try {
      localStorage.setItem('viva_assessments', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Filter questions
  const filteredQuestions = useMemo(() => {
    let list: VivaQuestion[] = [];
    if (selectedExpId === 'all') {
      list = allVivaQuestions;
    } else {
      list = vivaByExperiment[selectedExpId] || [];
    }

    return list.filter((q) => {
      const shortAns = q.short_answer || q.shortAnswer || '';
      const detAns = q.detailed_answer || q.detailedAnswer || '';
      const matchesSearch =
        searchQuery === '' ||
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shortAns.toLowerCase().includes(searchQuery.toLowerCase()) ||
        detAns.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || q.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesDifficulty =
        selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [selectedExpId, searchQuery, selectedCategory, selectedDifficulty]);

  // Flashcard navigation
  const currentFlashcard = filteredQuestions[flashcardIndex];

  const handleNextFlashcard = () => {
    if (flashcardIndex < filteredQuestions.length - 1) {
      setFlashcardIndex((prev) => prev + 1);
      setIsRevealed(false);
      setRevealDetailed(false);
    }
  };

  const handlePrevFlashcard = () => {
    if (flashcardIndex > 0) {
      setFlashcardIndex((prev) => prev - 1);
      setIsRevealed(false);
      setRevealDetailed(false);
    }
  };

  // Progress stats
  const totalMastered = Object.values(assessments).filter((v) => v === 'mastered').length;
  const totalPractice = Object.values(assessments).filter((v) => v === 'practice').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400">
                SECTION 8 • VIVA-VOCE MASTER PORTAL
              </span>
              <span className="text-xs font-mono text-slate-400">320+ Curated Questions with Flashcard Mode</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
              Viva-Voce Examination Preparation
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Prepare for internal and external lab viva evaluations. Features frequently asked external viva questions, short answers, in-depth architectural derivations, and personal self-assessment tracking.
            </p>
          </div>

          {/* Mastered Counter */}
          <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl">
            <div className="text-right">
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Self-Assessment</span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {totalMastered} Mastered • {totalPractice} Need Practice
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-600/40 flex items-center justify-center text-emerald-400 font-bold font-mono">
              {allVivaQuestions.length > 0
                ? `${Math.round((totalMastered / allVivaQuestions.length) * 100)}%`
                : '0%'}
            </div>
          </div>
        </div>

        {/* Experiment Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-6 pb-1">
          <button
            onClick={() => {
              setSelectedExpId('all');
              setFlashcardIndex(0);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium shrink-0 border transition-all ${
              selectedExpId === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            All 16 Weeks ({allVivaQuestions.length})
          </button>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((num) => (
            <button
              key={num}
              onClick={() => {
                setSelectedExpId(num);
                setFlashcardIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium shrink-0 border transition-all ${
                selectedExpId === num
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              Week {num}
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Mode Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setFlashcardIndex(0);
            }}
            placeholder="Search questions, concepts, keywords..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
          />
        </div>

        {/* Dropdowns & Mode Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setFlashcardIndex(0);
            }}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
          >
            <option value="all">All Categories</option>
            <option value="external_viva">External Viva Questions</option>
            <option value="external-viva">External Viva Questions</option>
            <option value="theory">Conceptual & Theory</option>
            <option value="program">Program Specific</option>
            <option value="debugging">Debugging & Errors</option>
            <option value="real_world">Real-World Application</option>
          </select>

          {/* Difficulty */}
          <select
            value={selectedDifficulty}
            onChange={(e) => {
              setSelectedDifficulty(e.target.value);
              setFlashcardIndex(0);
            }}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
          >
            <option value="all">All Difficulties</option>
            <option value="basic">Basic (30%)</option>
            <option value="intermediate">Intermediate (40%)</option>
            <option value="advanced">Advanced (30%)</option>
          </select>

          {/* Mode Switcher */}
          <div className="flex rounded-xl bg-slate-900 border border-slate-700 p-0.5">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => {
                setViewMode('flashcard');
                setFlashcardIndex(0);
                setIsRevealed(false);
              }}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                viewMode === 'flashcard'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Flashcard Mode
            </button>
          </div>
        </div>
      </div>

      {/* FLASHCARD MODE */}
      {viewMode === 'flashcard' ? (
        <div className="max-w-3xl mx-auto space-y-6">
          {currentFlashcard ? (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 border border-cyan-500/30 shadow-2xl">
              {/* Flashcard Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded-lg border border-cyan-800">
                    Flashcard {flashcardIndex + 1} of {filteredQuestions.length}
                  </span>
                  <span className="text-xs font-mono text-slate-400 px-2 py-1 rounded bg-slate-900 border border-slate-800">
                    Week {currentFlashcard.experiment_id || currentFlashcard.experimentId}
                  </span>
                  {(currentFlashcard.is_external_viva || currentFlashcard.category.includes('external')) && (
                    <span className="text-xs font-mono text-amber-300 bg-amber-950/80 px-2 py-1 rounded border border-amber-700/60 font-bold">
                      ★ External Viva Favorite
                    </span>
                  )}
                </div>

                {/* Mastered indicator */}
                {assessments[String(currentFlashcard.id)] && (
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${
                      assessments[String(currentFlashcard.id)] === 'mastered'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-600/50'
                        : 'bg-amber-950 text-amber-300 border-amber-600/50'
                    }`}
                  >
                    {assessments[String(currentFlashcard.id)] === 'mastered' ? '✓ Mastered' : 'Needs Practice'}
                  </span>
                )}
              </div>

              {/* Question Text */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-100 leading-relaxed">
                {currentFlashcard.question}
              </h3>

              {/* Reveal Answers */}
              {!isRevealed ? (
                <div className="py-12 text-center bg-slate-950/60 rounded-2xl border border-slate-800">
                  <button
                    onClick={() => setIsRevealed(true)}
                    className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 flex items-center gap-2 mx-auto transition-all"
                  >
                    <Eye className="w-4 h-4" /> Reveal Answer
                  </button>
                  <span className="text-xs text-slate-500 font-mono block mt-2">
                    Test yourself before viewing the verified viva answer
                  </span>
                </div>
              ) : (
                <div className="space-y-4 animate-fadeIn">
                  {/* Short Answer */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-xs font-mono text-cyan-400 font-bold block uppercase">
                      Quick Viva Answer (15-Second Response):
                    </span>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {currentFlashcard.short_answer || currentFlashcard.shortAnswer}
                    </p>
                  </div>

                  {/* Detailed Answer Toggle */}
                  <div className="pt-2">
                    <button
                      onClick={() => setRevealDetailed(!revealDetailed)}
                      className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1.5"
                    >
                      {revealDetailed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      {revealDetailed ? 'Hide In-Depth Derivation' : 'Show In-Depth Architectural Derivation'}
                    </button>

                    {revealDetailed && (
                      <div className="mt-3 p-4 rounded-2xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-slate-300 leading-relaxed">
                        {currentFlashcard.detailed_answer || currentFlashcard.detailedAnswer}
                      </div>
                    )}
                  </div>

                  {/* Self-Assessment Buttons */}
                  <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs text-slate-400 font-mono">How well did you know this?</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAssess(currentFlashcard.id, 'practice')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          assessments[String(currentFlashcard.id)] === 'practice'
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                            : 'bg-slate-900 border-slate-800 text-amber-400 hover:border-amber-600'
                        }`}
                      >
                        Needs Revision
                      </button>
                      <button
                        onClick={() => handleAssess(currentFlashcard.id, 'mastered')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          assessments[String(currentFlashcard.id)] === 'mastered'
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                            : 'bg-slate-900 border-slate-800 text-emerald-400 hover:border-emerald-600'
                        }`}
                      >
                        I Mastered This!
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Arrows */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={handlePrevFlashcard}
                  disabled={flashcardIndex === 0}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs flex items-center gap-1.5 disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <button
                  onClick={handleNextFlashcard}
                  disabled={flashcardIndex === filteredQuestions.length - 1}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 disabled:opacity-40 shadow-lg shadow-cyan-500/20"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              No questions matched your filter criteria.
            </div>
          )}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="space-y-4">
          <div className="text-xs text-slate-400 font-mono">
            Showing <strong className="text-cyan-400">{filteredQuestions.length}</strong> Viva Questions:
          </div>

          <div className="space-y-3">
            {filteredQuestions.map((q) => {
              const qKey = String(q.id);
              const isMastered = assessments[qKey] === 'mastered';
              const isPractice = assessments[qKey] === 'practice';
              const shortAns = q.short_answer || q.shortAnswer || '';
              const detAns = q.detailed_answer || q.detailedAnswer || '';
              const expNum = q.experiment_id || q.experimentId || 1;
              const isExt = q.is_external_viva || q.category.includes('external');

              return (
                <div
                  key={qKey}
                  className="glass-panel p-5 rounded-2xl space-y-3 border-l-4 border-l-cyan-500 hover:border-cyan-400 transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                        Week {expNum} • Q#{q.id}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 capitalize">
                        {q.category.replace('_', ' ').replace('-', ' ')}
                      </span>
                      {isExt && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 border border-amber-600/60 text-amber-300 font-bold">
                          ★ External Viva
                        </span>
                      )}
                    </div>

                    {/* Self assessment buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleAssess(q.id, 'mastered')}
                        className={`px-2 py-1 text-[11px] font-mono rounded-lg border transition-all ${
                          isMastered
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-emerald-300'
                        }`}
                      >
                        Mastered
                      </button>
                      <button
                        onClick={() => handleAssess(q.id, 'practice')}
                        className={`px-2 py-1 text-[11px] font-mono rounded-lg border transition-all ${
                          isPractice
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-amber-300'
                        }`}
                      >
                        Needs Work
                      </button>
                    </div>
                  </div>

                  <h4 className="text-sm font-semibold text-slate-100">{q.question}</h4>

                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <strong className="text-cyan-400 font-mono block mb-1">Answer:</strong>
                    {shortAns}
                  </div>

                  {detAns && (
                    <details className="text-xs text-slate-400 cursor-pointer pt-1">
                      <summary className="text-cyan-400 font-mono hover:underline">
                        View Detailed Architectural Explanation
                      </summary>
                      <p className="mt-2 pl-3 border-l border-cyan-500/40 text-slate-300 leading-relaxed">
                        {detAns}
                      </p>
                    </details>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
