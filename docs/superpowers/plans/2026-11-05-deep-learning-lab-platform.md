# Deep Learning Virtual Laboratory (R20A6683) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-grade, highly interactive Deep Learning Virtual Laboratory web application based strictly on the MRCET B.Tech IV Year I Semester "Lab Manual_R20A6683 Deep Learning", covering all 16 experiments, interactive concept simulators, live Python code execution, 8 real-time web applications, 160 MCQs + comprehensive final exam, 320+ viva-voce questions, and student progress tracking.

**Architecture:** A modern full-stack web application with a fast React 18 + TypeScript + Tailwind CSS + Lucide Icons frontend, paired with a high-performance Python FastAPI backend that executes live user code, captures stdout and matplotlib visual figures, provides real inference for 8 interactive AI applications, and serves standard datasets (`placement.csv`, `iris.csv`, `ionosphere.csv`, etc.). Client-side fallback computation ensures 100% interactive functionality even before or alongside backend execution.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, Lucide React, Canvas API, Chart.js / SVG visualization, Python 3.14, FastAPI, Uvicorn, NumPy, Scikit-learn, Matplotlib, Pillow.

**Spec:** Lab Manual_R20A6683 Deep Learning – Year-IV Semester-I (MRCET Autonomous R-20 Regulation).

## Global Constraints
- Strictly preserve original experiment numbering and sequence (Week 1 through Week 16).
- Include all 16 experiments without skipping any.
- Use the manual's datasets, algorithms, architectures, and terminology.
- Include line-by-line Python explanations for all prescribed code.
- Provide 10 MCQs per experiment (160 total) + Comprehensive Assessment.
- Provide at least 20 Viva questions per experiment (320+ total) with interactive reveal/mastery mode.
- Provide 2 real-world case studies per experiment (32 total).
- Provide 8 standalone real-time applications with actual inference and explanations.
- Provide live Python execution sandbox with console output, error reporting, and graph visualization.
- Ensure dark navy / slate glassmorphism design with responsive desktop and mobile support.

## Review Focus
1. Code execution timeout or syntax errors in live editor: Sandbox must capture stderr, traceback, execution time, and format error messages cleanly without crashing backend.
2. Canvas drawing coordinate scaling on high-DPI / mobile screens in Digit Recognizer: Preprocessing must properly center, normalize, and invert 28x28 grayscale inputs.
3. Live chart / image rendering from Python Matplotlib: Plots must be cleanly encoded to base64 PNG data URLs and displayed in the frontend execution console.
4. Quiz and Viva progress persistence: User scores, answers, and completion status must persist across page refreshes in `localStorage`.
5. Mobile responsiveness on navigation and dense parameter adjustment panels: Grid layouts must stack gracefully on small screens without horizontal clipping.

---

### Task 1: Project Setup and Backend Foundation
**Files:**
- Create: `backend/requirements.txt`
- Create: `backend/main.py`
- Create: `backend/executor.py`
- Create: `backend/datasets.py`
- Test: `backend/test_backend.py`

**Interfaces:**
- Produces:
  - `POST /api/execute`: `{ code: string } -> { stdout: string, stderr: string, execution_time: float, images: string[], success: bool }`
  - `GET /api/datasets/{name}`: returns CSV or JSON data for `placement.csv`, `iris.csv`, `ionosphere.csv`
  - `POST /api/predict/{task}`: returns inference results for digit, fashion, sentiment, denoise, augment, gan, feature-maps

- [ ] **Step 1: Write backend tests for execution, datasets, and API endpoints**
- [ ] **Step 2: Run tests to verify failure**
- [ ] **Step 3: Implement `backend/datasets.py` with synthetic placement.csv, iris, and ionosphere**
- [ ] **Step 4: Implement `backend/executor.py` with safe execution, stdout/stderr capture, and matplotlib base64 capture**
- [ ] **Step 5: Implement `backend/main.py` with FastAPI routes and CORS**
- [ ] **Step 6: Run tests to verify all backend tests pass**

---

### Task 2: React + Vite + Tailwind Frontend Foundation
**Files:**
- Create: `frontend/package.json`
- Create: `frontend/vite.config.ts`
- Create: `frontend/tailwind.config.js`
- Create: `frontend/src/index.css`
- Create: `frontend/src/App.tsx`
- Create: `frontend/src/types/index.ts`
- Create: `frontend/src/services/api.ts`

**Interfaces:**
- Consumes: Backend API endpoints (`/api/execute`, `/api/datasets`, `/api/predict/*`)
- Produces: Core layouts, Theme tokens, Navigation state, Progress state in `localStorage`

- [ ] **Step 1: Initialize Vite React TypeScript project with Tailwind CSS and Lucide React**
- [ ] **Step 2: Define TypeScript interfaces in `types/index.ts` for Experiment, Quiz, Viva, CaseStudy, DemoParams, ExecutionResult**
- [ ] **Step 3: Implement API client in `services/api.ts` with backend connectivity and resilient client-side fallbacks**
- [ ] **Step 4: Build navigation header, sidebar, breadcrumb, and student progress indicator in `App.tsx`**
- [ ] **Step 5: Verify frontend builds and runs cleanly**

---

### Task 3: Comprehensive Data Store (All 16 Experiments, 160 MCQs, 320 Viva Questions, 32 Case Studies)
**Files:**
- Create: `frontend/src/data/experimentsData.ts`
- Create: `frontend/src/data/quizData.ts`
- Create: `frontend/src/data/vivaData.ts`
- Create: `frontend/src/data/caseStudiesData.ts`
- Create: `frontend/src/data/codeTemplates.ts`
- Test: `frontend/src/data/__tests__/dataIntegrity.test.ts`

**Interfaces:**
- Produces:
  - `experimentsData`: 16 complete experiment objects (Aim, Objectives, Prerequisites, Concepts, Formulas, Architecture diagrams, Algorithms, Line-by-line code explanations, Exercises, Debugging tips, Summary)
  - `quizData`: 16 quizzes x 10 MCQs = 160 MCQs + 30 Comprehensive Final Exam questions
  - `vivaData`: 16 experiments x 20+ questions = 320+ viva questions with categories and detailed answers
  - `caseStudiesData`: 16 experiments x 2 = 32 industry case studies
  - `codeTemplates`: Exact code from the lab manual with corrections documented

- [ ] **Step 1: Write data integrity tests checking count, required fields, and non-empty content for all 16 experiments**
- [ ] **Step 2: Populate `codeTemplates.ts` with verbatim PDF code + annotated line-by-line explanations**
- [ ] **Step 3: Populate `experimentsData.ts` with all 20 structure sections for Experiments 1-16**
- [ ] **Step 4: Populate `quizData.ts` with 160 MCQs + Final Exam questions**
- [ ] **Step 5: Populate `vivaData.ts` with 320+ questions and answers**
- [ ] **Step 6: Populate `caseStudiesData.ts` with 32 industry case studies**
- [ ] **Step 7: Run verification test to confirm 100% data completeness**

---

### Task 4: Interactive Concept Simulators (Experiments 1 to 8)
**Files:**
- Create: `frontend/src/components/simulators/PerceptronSimulator.tsx` (Exp 1: OR, AND, XOR, decision boundary, weight tuning)
- Create: `frontend/src/components/simulators/BackpropSimulator.tsx` (Exp 2: Forward & Backprop animation, Sigmoid/ReLU/Tanh, SGD/Adam, Iris/Ionosphere)
- Create: `frontend/src/components/simulators/DeepAnnsSimulator.tsx` (Exp 3: Hidden layers >=4, depth comparison, information flow)
- Create: `frontend/src/components/simulators/ImageFeedforwardSimulator.tsx` (Exp 4: MNIST flattening, HeNormal, dense activation, confusion matrix)
- Create: `frontend/src/components/simulators/Cnn2LayerSimulator.tsx` (Exp 5: 3x3 convolution visualizer, 2x2 max pool, feature maps)
- Create: `frontend/src/components/simulators/Cnn4LayerSimulator.tsx` (Exp 6: 4+ conv layers, 5/10/20 epochs, CPU vs GPU benchmarks)
- Create: `frontend/src/components/simulators/PaddingBnSimulator.tsx` (Exp 7: SAME vs VALID dimension calculator, Batch Normalization)
- Create: `frontend/src/components/simulators/RegularizationSimulator.tsx` (Exp 8: Base, L1, L2, Dropout, L2+Dropout, neuron deactivation)

**Interfaces:**
- Produces: Interactive visual components embedded in the experiment detail view for Experiments 1-8

- [ ] **Step 1: Implement `PerceptronSimulator` with interactive 2D canvas and weights/bias controls**
- [ ] **Step 2: Implement `BackpropSimulator` with node activations, forward/backward data flow, and activation function curves**
- [ ] **Step 3: Implement `DeepAnnsSimulator` with configurable layers (>= 4) and live loss curves**
- [ ] **Step 4: Implement `ImageFeedforwardSimulator` with interactive digit canvas / test images and layer vector representations**
- [ ] **Step 5: Implement `Cnn2LayerSimulator` with step-by-step kernel sliding and max pooling interactive grids**
- [ ] **Step 6: Implement `Cnn4LayerSimulator` with multi-stage feature hierarchy and epoch/device speed benchmarks**
- [ ] **Step 7: Implement `PaddingBnSimulator` with padding visualizer, dimension formula calculator, and BN distribution curves**
- [ ] **Step 8: Implement `RegularizationSimulator` with interactive dropout masks and train/test generalization curves**

---

### Task 5: Interactive Concept Simulators (Experiments 9 to 16)
**Files:**
- Create: `frontend/src/components/simulators/DataAugmentationSimulator.tsx` (Exp 9: Rotation, zoom, flip, shift, shear, brightness)
- Create: `frontend/src/components/simulators/CnnAugmentedSimulator.tsx` (Exp 10: CIFAR-10 with vs without augmentation)
- Create: `frontend/src/components/simulators/LeNetSimulator.tsx` (Exp 11: Classic LeNet-5 C1->S2->C3->S4->C5->F6 visualizer)
- Create: `frontend/src/components/simulators/VggSimulator.tsx` (Exp 12: VGG-16 vs VGG-19 block explorer, transfer learning weights)
- Create: `frontend/src/components/simulators/RnnSentimentSimulator.tsx` (Exp 13: RNN sequence unrolling, hidden state vector, sentiment classification)
- Create: `frontend/src/components/simulators/BiLstmSimulator.tsx` (Exp 14: Bidirectional LSTM forward/backward flows, cell & gate visualizer)
- Create: `frontend/src/components/simulators/GanSimulator.tsx` (Exp 15: Generator vs Discriminator adversarial minimax loop, synthetic sample generation)
- Create: `frontend/src/components/simulators/AutoencoderDenoisingSimulator.tsx` (Exp 16: Noise injection, latent space compression, denoised reconstruction)

**Interfaces:**
- Produces: Interactive visual components embedded in the experiment detail view for Experiments 9-16

- [ ] **Step 1: Implement `DataAugmentationSimulator` with real-time canvas transformations and multi-variation grid**
- [ ] **Step 2: Implement `CnnAugmentedSimulator` with side-by-side training comparison curves**
- [ ] **Step 3: Implement `LeNetSimulator` with interactive 3D/2D layer stack and layer-by-layer feature map inspection**
- [ ] **Step 4: Implement `VggSimulator` with interactive block toggle, parameter counter, and transfer learning fine-tuning demo**
- [ ] **Step 5: Implement `RnnSentimentSimulator` with step-by-step token processing and word embedding lookup**
- [ ] **Step 6: Implement `BiLstmSimulator` with dual forward/backward flow arrows and gate explanations (Forget, Input, Output)**
- [ ] **Step 7: Implement `GanSimulator` with animated noise sampling, generator output morphing, and discriminator loss meter**
- [ ] **Step 8: Implement `AutoencoderDenoisingSimulator` with noise injection slider, encoder-decoder visual pipeline, and MSE/PSNR metrics**

---

### Task 6: Experiment Learning Page & Live Code Execution Environment
**Files:**
- Create: `frontend/src/components/experiment/ExperimentView.tsx`
- Create: `frontend/src/components/experiment/CodeEditorPanel.tsx`
- Create: `frontend/src/components/experiment/ExecutionConsole.tsx`
- Create: `frontend/src/components/experiment/DatasetViewer.tsx`
- Create: `frontend/src/components/experiment/LineByLineExplainer.tsx`
- Create: `frontend/src/components/experiment/CaseStudyCard.tsx`

**Interfaces:**
- Consumes: `experimentsData`, `codeTemplates`, `caseStudiesData`, `api.executeCode()`
- Produces: Complete 20-section experiment learning environment with tabbed navigation, live execution, download .py, and Colab integration

- [ ] **Step 1: Implement `CodeEditorPanel` with syntax-highlighted code editor, Run, Reset, Copy, Download .py, and Colab button**
- [ ] **Step 2: Implement `ExecutionConsole` with stdout display, error traceback, execution time, and rendered Matplotlib plots**
- [ ] **Step 3: Implement `DatasetViewer` with pagination, summary statistics, and column descriptions for all datasets**
- [ ] **Step 4: Implement `LineByLineExplainer` with synchronized code highlighting and detailed pedagogical notes**
- [ ] **Step 5: Assemble `ExperimentView` integrating all 20 required points in an intuitive tabbed/accordion layout**
- [ ] **Step 6: Verify code execution from editor through backend and client-side fallback**

---

### Task 7: Real-Time Application Zone (8 Interactive Tools)
**Files:**
- Create: `frontend/src/components/apps/AppGallery.tsx`
- Create: `frontend/src/components/apps/DigitRecognizerApp.tsx` (App 1: Drawing canvas + live neural net inference)
- Create: `frontend/src/components/apps/FashionClassifierApp.tsx` (App 2: Image upload / preset + CNN classification)
- Create: `frontend/src/components/apps/SentimentAnalyzerApp.tsx` (App 3: Live text input + RNN/LSTM sentiment scoring)
- Create: `frontend/src/components/apps/ImageDenoisingApp.tsx` (App 4: Upload/preset + noise slider + Autoencoder restoration)
- Create: `frontend/src/components/apps/AugmentationStudioApp.tsx` (App 5: Interactive image transformation workbench)
- Create: `frontend/src/components/apps/GanGeneratorApp.tsx` (App 6: Latent vector explorer + synthetic image generator)
- Create: `frontend/src/components/apps/PerceptronPlaygroundApp.tsx` (App 7: 2D interactive point classifier + boundary visualizer)
- Create: `frontend/src/components/apps/FeatureMapExplorerApp.tsx` (App 8: CNN layer-by-layer feature visualization)

**Interfaces:**
- Produces: Dedicated `/applications` portal with 8 production-quality interactive AI tools

- [ ] **Step 1: Implement `DigitRecognizerApp` with drawing canvas, clear, invert, predict, and confidence bars**
- [ ] **Step 2: Implement `FashionClassifierApp` with image dropzone, sample library, and prediction confidence breakdown**
- [ ] **Step 3: Implement `SentimentAnalyzerApp` with custom textarea, preset reviews, sentiment gauge, and keyword highlight**
- [ ] **Step 4: Implement `ImageDenoisingApp` with interactive noise injection, side-by-side comparison, and image export**
- [ ] **Step 5: Implement `AugmentationStudioApp` with transform sliders and batch variation download**
- [ ] **Step 6: Implement `GanGeneratorApp` with latent space sliders, random seed generator, and image morphing**
- [ ] **Step 7: Implement `PerceptronPlaygroundApp` with point addition, custom weights/bias, and animated decision boundary**
- [ ] **Step 8: Implement `FeatureMapExplorerApp` with multi-layer filter activations (Edges -> Textures -> Parts)**
- [ ] **Step 9: Assemble `AppGallery` with filter tabs, tool cards, architecture summaries, and quick launch**

---

### Task 8: Quiz Module & Comprehensive Final Assessment
**Files:**
- Create: `frontend/src/components/quiz/QuizModule.tsx`
- Create: `frontend/src/components/quiz/QuestionCard.tsx`
- Create: `frontend/src/components/quiz/QuizResults.tsx`
- Create: `frontend/src/components/quiz/ComprehensiveExam.tsx`

**Interfaces:**
- Consumes: `quizData`, Student progress store
- Produces: 16 experiment quizzes + 1 Comprehensive Final Exam with instant feedback, explanations, and weak-area analysis

- [ ] **Step 1: Implement `QuestionCard` with difficulty badges (Basic, Intermediate, Advanced), question types, and immediate feedback**
- [ ] **Step 2: Implement `QuizResults` with score breakdown, accuracy percentage, retry option, and revision links**
- [ ] **Step 3: Implement `QuizModule` for per-experiment testing with question shuffling and score persistence**
- [ ] **Step 4: Implement `ComprehensiveExam` covering all 16 experiments with a timed exam mode and topic-wise diagnostic report**

---

### Task 9: Viva-Voce Preparation Portal
**Files:**
- Create: `frontend/src/components/viva/VivaPortal.tsx`
- Create: `frontend/src/components/viva/VivaCard.tsx`
- Create: `frontend/src/components/viva/VivaProgressTracker.tsx`

**Interfaces:**
- Consumes: `vivaData`, Student progress store
- Produces: 320+ viva questions with interactive flashcard mode, filter by experiment & category, and self-assessment tracker

- [ ] **Step 1: Implement `VivaCard` with flashcard flip/reveal, short/detailed toggle, and "Mastered" / "Need Practice" buttons**
- [ ] **Step 2: Implement filter by experiment (1-16) and category (Conceptual, Code-specific, Debugging, External Viva)**
- [ ] **Step 3: Implement `VivaProgressTracker` showing readiness meter and mastered question count**
- [ ] **Step 4: Implement Quick Practice Shuffle mode for mock viva simulations**

---

### Task 10: Student Progress Dashboard & Lab Record Export
**Files:**
- Create: `frontend/src/components/dashboard/HomeDashboard.tsx`
- Create: `frontend/src/components/dashboard/ProgressReport.tsx`
- Create: `frontend/src/components/dashboard/LabRecordExport.tsx`

**Interfaces:**
- Consumes: User progress state, all experiment metadata
- Produces: Main landing dashboard, overall laboratory statistics, printable/exportable lab observation record

- [ ] **Step 1: Implement `HomeDashboard` with laboratory overview, syllabus objectives, experiment cards, and progress metrics**
- [ ] **Step 2: Implement `ProgressReport` with completion rates, quiz averages, viva readiness, and badges**
- [ ] **Step 3: Implement `LabRecordExport` formatted according to MRCET academic standard (Observation & Record sheet generation)**

---

### Task 11: Verification, Integration, and Documentation
**Files:**
- Create: `README.md`
- Create: `run_lab.bat` (Windows one-click launcher for frontend + backend)
- Create: `run_lab.sh` (Linux/Mac launcher)
- Verify: Full test suite, frontend build, API endpoints, responsive design

- [ ] **Step 1: Run comprehensive frontend build (`npm run build`) and fix any lint/type errors**
- [ ] **Step 2: Run backend test suite (`pytest`) and verify execution sandbox, datasets, and inference APIs**
- [ ] **Step 3: Test all 16 interactive experiment simulators, all 8 real-time applications, quiz scoring, and viva cards**
- [ ] **Step 4: Create comprehensive `README.md` with installation, execution guide, Colab links, and syllabus mapping**
- [ ] **Step 5: Verify completion with the `verification-before-completion` skill**

