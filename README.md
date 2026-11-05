# Deep Learning Virtual Laboratory Learning Platform

**Course Code:** `R20A6683` | **Regulation:** `R-20 Autonomous`  
**Target Audience:** B.Tech IV Year – I Semester, CSE (AI & ML), AI & ML, and AI & DS  
**Institution:** Malla Reddy College of Engineering & Technology (MRCET Autonomous, Hyderabad)

---

## 🌟 Overview

The **Deep Learning Virtual Laboratory** is an interactive, full-stack learning platform built to provide an educational experience for all 16 prescribed laboratory experiments in the R20A6683 Deep Learning curriculum.

Rather than static notes or pre-rendered slides, this platform provides:
- **16 Custom Interactive Simulators** (one per experiment) for real-time parameter tweaking, decision boundary manipulation, and activation visualization.
- **Python Code Execution Sandbox** powered by FastAPI with live `stdout`/`stderr` capture, runtime metrics, and Base64 Matplotlib plot rendering.
- **Client-Side Fallback Inference Engine** so that drawing canvases, fashion classifiers, sentiment gauges, and denoising tools run smoothly even before starting the Python backend.
- **8 Standalone Real-Time Applications** in a dedicated interactive gallery.
- **160 Curated Multiple Choice Questions** (10 per experiment: 5 conceptual, 5 application-oriented) with immediate pedagogical explanations and a Comprehensive Final Exam generator.
- **320+ Curated Viva-Voce Questions** (20 per experiment) with flashcard flip mode, external viva favorites, in-depth architectural derivations, and a self-assessment mastery tracker.
- **32 Industry Case Studies** (2 per experiment) connecting academic lab concepts to production engineering deployments.
- **Lab Observation & Record Sheet Generator** formatted for printing and PDF export with evaluator signature blocks.

---

## 🚀 Quick Start Guide

### 1. One-Click Launch (Windows)
Double-click `run_lab.bat` in the project root. This starts both the FastAPI backend and React frontend, then automatically opens your browser:
```bat
run_lab.bat
```

### 2. One-Click Launch (Linux / macOS)
```bash
chmod +x run_lab.sh
./run_lab.sh
```

### 3. Manual Startup

#### Backend (FastAPI + Python 3.10+):
```bash
cd backend
python main.py
```
*API Swagger Documentation is available at: [http://localhost:8000/docs](http://localhost:8000/docs)*

#### Frontend (React + Vite + Tailwind CSS):
```bash
cd frontend
npm install
npm run dev
```
*Virtual Lab is accessible at: [http://localhost:5173](http://localhost:5173)*

#### Run Backend Unit Tests:
```bash
python -m pytest backend/test_backend.py
```

---

## 📚 16-Week Syllabus & Experiment Mapping

| Week | Experiment Title | Prescribed Dataset | Interactive Simulator & Pedagogical Focus |
| :---: | :--- | :--- | :--- |
| **1** | **Single-Unit Perceptron** | `placement.csv`, Logic Gates | 2D Cartesian plane, live decision line $w_1 x_1 + w_2 x_2 + b = 0$, step learning rule, XOR non-linear separability proof |
| **2** | **ANN & Backpropagation** | `iris.csv`, `ionosphere.csv` | Animated forward/backward flow, Sigmoid vs ReLU vs Tanh, SGD vs Adam comparison, learning rate divergence demo |
| **3** | **Deep Feed-Forward ANN** | `iris.csv`, `ionosphere.csv` | Layer architect builder ($\ge 4$ hidden layers), shallow vs deep comparison, vanishing gradient explanation |
| **4** | **Image Classification (ANN)** | `mnist`, `fashion`, `cifar10` | 28×28 drawing canvas, spatial matrix flattening ($28\times 28 \to 784$), confusion matrix, classification report |
| **5** | **CNN with 2 Conv Layers** | `mnist`, `cifar10` | $3\times 3$ sliding kernel dot-product visualizer, edge/sharpen/blur filters, $2\times 2$ max pooling stride 2 |
| **6** | **CNN with 4+ Conv Layers** | Fashion MNIST | Hierarchical feature extraction (Edges $\to$ Textures $\to$ Parts $\to$ Classes), 5/10/20 epoch comparison, CPU vs GPU benchmarks |
| **7** | **Padding & Batch Normalization** | Image Tensors | Interactive dimension calculator $O = \lfloor(W-F+2P)/S\rfloor + 1$, SAME vs VALID, Internal Covariate Shift mitigation |
| **8** | **Regularization & Dropout** | Fashion MNIST | Base vs L1 vs L2 vs Dropout vs L2+Dropout, interactive neuron mask (36 neurons), overfitting gap analysis |
| **9** | **Data Augmentation Studio** | Medical Specimen Scans | Live sliders for rotation, zoom, shift, horizontal/vertical flip, brightness, batch variation synthesizer |
| **10** | **CNN with Augmentation** | CIFAR-10 | Epoch-by-epoch curves comparing model with vs without augmentation, translation/rotation invariance proof |
| **11** | **LeNet-5 Architecture** | MNIST, Fashion MNIST | Yann LeCun (1998) 7-layer stack (C1 $\to$ S2 $\to$ C3 $\to$ S4 $\to$ C5 $\to$ F6 $\to$ Softmax), bank cheque recognition |
| **12** | **VGG-16 & VGG-19** | ImageNet Transfer | VGG block inspector, $3\times 3$ receptive field equivalency proof, feature extraction vs fine-tuning freezing |
| **13** | **RNN Sentiment Analysis** | IMDb Movie Reviews | Recurrent sequence unrolling across tokens $t$, $h_t = \tanh(W x_t + U h_{t-1} + b)$, vanishing gradient limitation |
| **14** | **Bidirectional LSTM** | Customer Feedback | Forward ($h^{\rightarrow}_t$) and backward ($h^{\leftarrow}_t$) pass concatenation, internal gates ($f_t, i_t, C_t, o_t$), double negation |
| **15** | **Generative Adversarial Nets** | Synthetic MNIST Digits | Generator vs Discriminator minimax loop $\min_G \max_D V(D, G)$, latent space $z \in \mathbb{R}^{100}$ interpolation, Nash equilibrium |
| **16** | **Autoencoders for Denoising** | Degraded Digit Images | Gaussian noise injection slider ($\sigma \in [0.1, 0.9]$), latent bottleneck, clean reconstruction, PSNR / MSE metrics |

---

## 🎨 8 Standalone Real-Time Applications

1. **Handwritten Digit Recognizer (`/apps`):** Draw any digit (0–9) on an interactive canvas with real-time deep CNN softmax classification.
2. **Fashion Product Classifier:** Classify apparel images across 10 Zalando categories with confidence bars.
3. **Movie Review Sentiment Analyzer:** Type any sentence or review to inspect live sentiment polarity and token keyword highlights.
4. **Deep Image Denoising Studio:** Inject custom Gaussian noise and restore clean images through an Autoencoder bottleneck with live PSNR (dB) metrics.
5. **Image Augmentation Studio:** Interactive rotation, zoom, flip, and brightness sliders with automated Keras `ImageDataGenerator` code export.
6. **GAN Synthetic Generator:** Manipulate latent space vectors $z \in \mathbb{R}^{100}$ to morph synthetic handwritten digits.
7. **Perceptron 2D Decision Playground:** Click to plot custom binary classification points and observe the Perceptron learning rule train the decision line.
8. **CNN Feature-Map Explorer:** Deconstruct convolutional filters layer-by-layer to see how edges transform into high-level object concepts.

---

## 🧠 Assessment & Viva-Voce Modules

- **160 Curated MCQs:** 10 questions per experiment, split 50% conceptual and 50% application-based. Provides immediate feedback, correct option highlight, and pedagogical explanations.
- **Comprehensive Final Exam:** Randomly samples questions across all 16 experiments with scoring, accuracy percentage, and diagnostic performance feedback.
- **320+ Viva Questions:** 20 questions per experiment covering external examiner favorites, why/how architectural derivations, debugging scenarios, and real-world deployment challenges.
- **Flashcard Mode:** Allows students to test their knowledge, reveal 15-second quick answers or in-depth derivations, and mark questions as *"Mastered"* or *"Needs Practice"* (saved in `localStorage`).

---

## 🖨️ Lab Record & Observation Export

The platform includes a **Lab Record Export** module matching the official MRCET Autonomous observation sheet format:
- Student Name, Hall Ticket Number, Branch, Date of Experiment.
- Prescribed Aim, Objectives, Theory, Algorithm, and Source Code.
- Formatted for clean printing or PDF download via `window.print()` with Evaluator Signature blocks (Record: 10M, Execution: 10M, Viva: 10M).

---

## 📂 Project Architecture

```
New folder (2)/
├── backend/
│   ├── data/                   # placement.csv, iris.csv, ionosphere.csv
│   ├── datasets.py             # Dataset generators & loader routines
│   ├── executor.py             # Python code execution sandbox with base64 plot capture
│   ├── models.py               # Inference engines (Digit, Fashion, Sentiment, GAN, Denoising)
│   ├── main.py                 # FastAPI application & REST endpoints
│   └── test_backend.py         # Pytest verification suite (8 tests)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── apps/           # 8 Standalone Real-Time Applications
│   │   │   ├── common/         # Header, Sidebar navigation
│   │   │   ├── dashboard/      # HomeDashboard, LabRecordExport
│   │   │   ├── experiment/     # CodeEditorPanel, ExecutionConsole, DatasetViewer, LineByLineExplainer, CaseStudyCard, ExperimentView
│   │   │   ├── quiz/           # QuizModule & ComprehensiveExam
│   │   │   ├── simulators/     # 16 Interactive Experiment Simulators
│   │   │   └── viva/           # VivaPortal (320+ questions, flashcard mode)
│   │   ├── data/
│   │   │   ├── caseStudiesData.ts  # 32 industry case studies
│   │   │   ├── codeTemplates.ts    # Verbatim PDF code & documented fixes
│   │   │   ├── experimentsData.ts  # Complete 16 experiment metadata (all 20 points)
│   │   │   ├── quizData.ts         # 160 MCQs
│   │   │   └── vivaData.ts         # 320 Viva questions
│   │   ├── services/
│   │   │   └── api.ts          # Backend API client with client-side fallback engines
│   │   ├── types/
│   │   │   └── index.ts        # TypeScript data contracts
│   │   ├── App.tsx             # Root state management & navigation
│   │   ├── index.css           # Tailwind directives & glassmorphism theme
│   │   └── main.tsx            # React application entry point
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── run_lab.bat                 # One-click Windows launcher
├── run_lab.sh                  # One-click Unix launcher
└── README.md                   # Complete documentation
```

---

## 🎓 Academic Compliance & Accreditation
Strictly adheres to **MRCET Autonomous R-20 Regulation** guidelines for the Department of Computer Science & Engineering (AI & ML). Designed to satisfy Course Outcomes **CO1 through CO5** for laboratory examinations, internal assessments, and university external evaluations.

