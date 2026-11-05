import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { HomeDashboard } from './components/dashboard/HomeDashboard';
import { ExperimentView } from './components/experiment/ExperimentView';
import { AppGallery } from './components/apps/AppGallery';
import { QuizModule } from './components/quiz/QuizModule';
import { VivaPortal } from './components/viva/VivaPortal';
import { LabRecordExport } from './components/dashboard/LabRecordExport';
import { experiments } from './data/experimentsData';
import { StudentProgress } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'experiment' | 'apps' | 'quiz' | 'viva' | 'record'>('dashboard');
  const [selectedExpId, setSelectedExpId] = useState<number>(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Student progress state with localStorage persistence
  const [progress, setProgress] = useState<StudentProgress>(() => {
    try {
      const saved = localStorage.getItem('dl_student_progress');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return {
      completed_experiments: [1], // Week 1 completed by default as intro
      quiz_scores: { 1: { score: 9, total: 10 } },
      viva_mastered: [1, 2, 3],
      overall_accuracy: 90.0,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('dl_student_progress', JSON.stringify(progress));
    } catch (e) {
      console.error(e);
    }
  }, [progress]);

  const handleToggleComplete = (id: number) => {
    setProgress((prev) => {
      const exists = prev.completed_experiments.includes(id);
      const updated = exists
        ? prev.completed_experiments.filter((expId: number) => expId !== id)
        : [...prev.completed_experiments, id];
      return { ...prev, completed_experiments: updated };
    });
  };

  const handleUpdateQuizScore = (expId: number, score: number, total: number) => {
    setProgress((prev) => {
      const updatedScores = {
        ...prev.quiz_scores,
        [expId]: { score, total },
      };
      // calculate overall accuracy
      const scoreValues = Object.values(updatedScores);
      const avg =
        scoreValues.reduce((acc: number, curr: any) => acc + (curr.score / curr.total), 0) / scoreValues.length;
      return {
        ...prev,
        quiz_scores: updatedScores,
        overall_accuracy: Number((avg * 100).toFixed(1)),
      };
    });
  };

  const handleSelectExperiment = (id: number) => {
    setSelectedExpId(id);
    setActiveTab('experiment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentExperiment = experiments.find((e: any) => e.id === selectedExpId) || experiments[0];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Global Navigation Header */}
      <Header
        activeTab={activeTab}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        progress={progress}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex">
        {/* Sidebar only shown on Experiment view or when toggled */}
        {activeTab === 'experiment' && (
          <Sidebar
            experiments={experiments}
            selectedExpId={selectedExpId}
            completedExpIds={progress.completed_experiments}
            onSelectExperiment={handleSelectExperiment}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Content Container */}
        <main
          className={`flex-1 p-4 sm:p-6 lg:p-8 transition-all ${
            activeTab === 'experiment' ? 'lg:pl-80' : ''
          }`}
        >
          {activeTab === 'dashboard' && (
            <HomeDashboard
              experiments={experiments}
              progress={progress}
              onSelectExperiment={handleSelectExperiment}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'experiment' && (
            <ExperimentView
              experiment={currentExperiment}
              isCompleted={progress.completed_experiments.includes(selectedExpId)}
              onToggleComplete={handleToggleComplete}
              onNavigateExperiment={handleSelectExperiment}
            />
          )}

          {activeTab === 'apps' && <AppGallery />}

          {activeTab === 'quiz' && (
            <QuizModule
              initialExpId={selectedExpId}
              onUpdateScore={handleUpdateQuizScore}
            />
          )}

          {activeTab === 'viva' && <VivaPortal />}

          {activeTab === 'record' && <LabRecordExport />}
        </main>
      </div>
    </div>
  );
};
export default App;
