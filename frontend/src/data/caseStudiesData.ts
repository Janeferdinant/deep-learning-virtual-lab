import { CaseStudy } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  // Exp 1: Single-Unit Perceptron
  {
    id: 'cs-1-1',
    experimentId: 1,
    title: 'University Campus Placement Screening Engine',
    industry: 'Education',
    problemStatement: 'Manual placement shortlisting across thousands of engineering applicants based on academic CGPA and resume project score is time-consuming and subjective.',
    realWorldRequirement: 'A lightweight, fast, interpretable binary classifier providing instant linear decision boundaries for student eligibility cutoffs.',
    dataset: 'MRCET College Placements Record (placement.csv, 200 student samples, features: CGPA [0-10], Resume Score [0-10], Placed [0/1]).',
    preprocessing: 'Min-max feature scaling, zero-handling, 80/20 train-test stratification.',
    modelArchitecture: 'Single-unit Rosenblatt Perceptron: $y = \\text{step}(w_1 \\cdot \\text{CGPA} + w_2 \\cdot \\text{ResumeScore} + b)$.',
    trainingMethodology: 'Perceptron learning rule with learning rate $\\eta=0.01$, max_iter=1000, error correction upon misclassification.',
    evaluationMetrics: 'Classification accuracy, precision, recall, and decision hyperplane margin.',
    results: '91.5% classification accuracy on test split with clear linear separating line ($0.82 \\cdot x_1 + 0.58 \\cdot x_2 - 9.4 = 0$).',
    limitations: 'Cannot capture non-linear interactions where low CGPA candidates with extraordinary specialized GitHub portfolios get placed.',
    futureImprovements: 'Upgrade to Multi-Layer Perceptron (MLP) with non-linear activation functions and soft probability confidence scores.'
  },
  {
    id: 'cs-1-2',
    experimentId: 1,
    title: 'Bank Loan Pre-Qualification Filter',
    industry: 'Finance',
    problemStatement: 'Retail banks require an instantaneous first-pass qualification gate to filter viable credit applications before heavy automated underwriting.',
    realWorldRequirement: 'Strictly linear, fully auditable and legally explainable binary boundary based on Credit Score and Debt-to-Income ratio.',
    dataset: 'Retail Banking Credit Records (10,000 anonymized records with Income-to-Debt and FICO score).',
    preprocessing: 'Standard z-score scaling, outlier removal using 1.5 IQR rule.',
    modelArchitecture: 'Perceptron with hard step activation and bias threshold.',
    trainingMethodology: 'Stochastic weight updates with margin penalty.',
    evaluationMetrics: 'False Positive Rate (critical to prevent default), False Negative Rate, Accuracy.',
    results: '88.2% accuracy with 0% risk of hidden non-linear algorithmic bias for compliance auditors.',
    limitations: 'Susceptible to non-convergence if applicant classes overlap around boundary.',
    futureImprovements: 'Incorporate soft margin support vector machines (SVM) or logistic regression.'
  },

  // Exp 2: ANN and Backpropagation
  {
    id: 'cs-2-1',
    experimentId: 2,
    title: 'Automated Botanical Species Identification for Agro-Robotics',
    industry: 'Agriculture',
    problemStatement: 'Autonomous weeding robots need to differentiate valuable botanical crops from invasive weed species in real time using geometric petal and sepal dimensions.',
    realWorldRequirement: 'Multi-class classification with fast backpropagation convergence and high precision on floral morphology.',
    dataset: 'Fisher Iris Dataset (150 samples across Setosa, Versicolor, and Virginica with 4 morphological measurements).',
    preprocessing: 'StandardScaler normalisation, one-hot encoding of target classes.',
    modelArchitecture: 'ANN with 4 input nodes, 10 hidden neurons (ReLU / Sigmoid / Tanh comparison), and 3 Softmax output nodes.',
    trainingMethodology: 'Backpropagation with Adam optimizer, batch size 10, cross-entropy loss, 300 epochs.',
    evaluationMetrics: 'Macro F1-score, multiclass cross-entropy loss, convergence epoch count.',
    results: '97.3% accuracy achieved with ReLU activation and Adam optimizer (converged in 65 epochs vs 210 epochs for Sigmoid).',
    limitations: 'Overlaps between Versicolor and Virginica petal dimensions cause occasional boundary confusion.',
    futureImprovements: 'Integrate visual RGB leaf texture inputs through convolutional layers.'
  },
  {
    id: 'cs-2-2',
    experimentId: 2,
    title: 'Atmospheric Radar Echo Signal Classification (Good vs Bad Returns)',
    industry: 'Computer Vision',
    problemStatement: 'High-frequency radar antennas targeting free electrons in the ionosphere produce noisy signals; returns returning evidence of structure (Good) must be separated from non-returns (Bad).',
    realWorldRequirement: 'Robust radar signal classification on 34 continuous electromagnetic features.',
    dataset: 'Johns Hopkins Ionosphere Dataset (351 radar instances, 34 continuous features, binary target [g/b]).',
    preprocessing: 'Removal of zero-variance feature column 2, stratified 70/30 test split.',
    modelArchitecture: 'ANN: 34 inputs -> 16 hidden neurons (Tanh) -> 1 Sigmoid output.',
    trainingMethodology: 'Backpropagation with learning rate comparisons (0.0001, 0.0005, 5.0) and SGD vs Adam.',
    evaluationMetrics: 'ROC-AUC, Precision-Recall curve, Binary Crossentropy.',
    results: '93.4% ROC-AUC; verified that $\\eta=5.0$ causes catastrophic divergence while $\\eta=0.001$ with Adam achieves optimal stability.',
    limitations: 'Relatively small dataset size (351 rows) poses risk of overfitting without regularization.',
    futureImprovements: 'Apply Dropout and Monte Carlo cross-validation.'
  },

  // Exp 3: Deep Feed-Forward ANN
  {
    id: 'cs-3-1',
    experimentId: 3,
    title: 'Oncology Genomic Profile Multi-Stage Risk Stratification',
    industry: 'Healthcare',
    problemStatement: 'Early detection of oncological stage based on high-dimensional cellular microarray biomarkers requires hierarchical representation learning.',
    realWorldRequirement: 'Deep architecture capable of learning hierarchical feature abstractions across multi-tier cellular pathways.',
    dataset: 'Gene Expression Microarray Profile (34 radar/biomarker features, multi-stage risk).',
    preprocessing: 'Variance threshold filtering, robust scaling, synthetic minority oversampling (SMOTE).',
    modelArchitecture: 'Deep Feed-Forward ANN: Input (34) -> Hidden1 (64) -> Hidden2 (32) -> Hidden3 (16) -> Hidden4 (8) -> Output (1/3).',
    trainingMethodology: 'Backpropagation with HeNormal initialization, Adam optimizer, early stopping with patience=20.',
    evaluationMetrics: 'Sensitivity, Specificity, Brier Score, Multiclass Loss.',
    results: 'Deep 4-hidden-layer network achieved 94.8% test accuracy, outperforming shallow 1-layer ANN (87.2%) by +7.6%.',
    limitations: 'Deep networks require careful initialization to prevent vanishing gradients in early layers.',
    futureImprovements: 'Introduce skip/residual connections to enable deeper architectures up to 10+ layers.'
  },
  {
    id: 'cs-3-2',
    experimentId: 3,
    title: 'High-Frequency Algorithmic Trading Order Flow Predictor',
    industry: 'Finance',
    problemStatement: 'Financial market microstructure data contains complex non-linear cross-asset momentum signals that shallow models cannot capture.',
    realWorldRequirement: 'Sub-millisecond inference with deep non-linear feature transformation over 40 order-book depth levels.',
    dataset: 'Limit Order Book (LOB) tick-level feature dataset (order book depth, bid-ask spreads, order volume).',
    preprocessing: 'Rolling window standardisation, stationarity transformation via log-differencing.',
    modelArchitecture: 'Deep Feedforward ANN with 5 hidden layers (128 -> 64 -> 32 -> 16 -> 8) with LeakyReLU activations.',
    trainingMethodology: 'Mini-batch SGD with momentum=0.9, weight decay=1e-4.',
    evaluationMetrics: 'Directional Accuracy, Sharpe Ratio, Maximum Drawdown.',
    results: '63.4% directional accuracy on next 50-tick horizon, yielding consistent positive alpha in backtesting.',
    limitations: 'Concept drift during sudden macro volatility shocks causes model degradation.',
    futureImprovements: 'Combine with Transformer attention mechanisms for long-range temporal context.'
  },

  // Exp 4: Deep Feedforward NN for Image Classification (MNIST)
  {
    id: 'cs-4-1',
    experimentId: 4,
    title: 'Postal Mail Sorting & ZIP Code Automated Recognition',
    industry: 'Manufacturing',
    problemStatement: 'Postal distribution centers process millions of envelopes daily; manual ZIP code reading is slow, expensive, and error-prone.',
    realWorldRequirement: 'Automated 10-class handwritten digit classifier operating on flattened 28x28 grayscale camera scans with high speed.',
    dataset: 'MNIST Handwritten Digits (60,000 train, 10,000 test, 28x28 pixel images).',
    preprocessing: 'Pixel intensity normalization ($X/255.0$), flattening 2D matrix into 784-dimensional vector.',
    modelArchitecture: 'Deep Feedforward NN: Input (784) -> Dense(128, HeNormal, ReLU) -> Dense(64, ReLU) -> Dense(32, ReLU) -> Dense(10, Softmax).',
    trainingMethodology: 'Adam optimizer, sparse categorical crossentropy, 15 epochs, batch size 64.',
    evaluationMetrics: 'Test accuracy, Confusion Matrix, inference latency per digit.',
    results: '97.8% test accuracy, sorting envelopes in under 1.2 milliseconds per envelope.',
    limitations: 'Flattening discards 2D spatial locality and spatial translations/rotations.',
    futureImprovements: 'Transition to Convolutional Neural Networks (Exp 5) to exploit translation invariance.'
  },
  {
    id: 'cs-4-2',
    experimentId: 4,
    title: 'Legacy Paper Document Archival & Meter Reading Digitization',
    industry: 'Education',
    problemStatement: 'University examination offices and utility companies possess vast physical logbooks with handwritten marks and meter numbers needing indexing.',
    realWorldRequirement: 'Robust optical character classification pipeline converting scanned document crops into structured JSON.',
    dataset: 'Synthetic & real digit crops from scanned examination attendance sheets.',
    preprocessing: 'Otsu thresholding, bounding box crop, center-mass padding to 28x28.',
    modelArchitecture: 'Deep Feedforward ANN (784 -> 256 -> 128 -> 64 -> 10).',
    trainingMethodology: 'Categorical crossentropy with learning rate annealing.',
    evaluationMetrics: 'Character Error Rate (CER), Top-1 and Top-2 accuracy.',
    results: '98.1% top-1 accuracy on clean crops, accelerating record digitization by 40x.',
    limitations: 'Performance drops when digits are touching or broken.',
    futureImprovements: 'Integrate automated segmentation and morphological dilation.'
  },

  // Exp 5: CNN with 2 Convolution Layers
  {
    id: 'cs-5-1',
    experimentId: 5,
    title: 'Automated Surface Scratch & Defect Detection on Assembly Lines',
    industry: 'Manufacturing',
    problemStatement: 'High-speed smartphone screen manufacturing produces micro-scratches that human quality inspectors miss due to visual fatigue.',
    realWorldRequirement: 'Edge and feature extraction using 2D spatial convolution filters with sub-pixel receptive fields.',
    dataset: 'Industrial Surface Defect Inspection Dataset (grayscale 28x28 / 64x64 patches).',
    preprocessing: 'Zero-mean unit-variance normalization, random crop alignment.',
    modelArchitecture: '2-Layer CNN: Conv2D(32, 3x3, ReLU) -> MaxPool(2x2) -> Conv2D(64, 3x3, ReLU) -> MaxPool(2x2) -> Flatten -> Dense(128) -> Output(2).',
    trainingMethodology: 'Adam optimizer, categorical crossentropy, batch size 32, 20 epochs.',
    evaluationMetrics: 'Defect Recall (false-negative critical), Precision, Inspection FPS.',
    results: '99.1% defect detection rate at 180 frames per second on assembly line camera feeds.',
    limitations: '2 convolution layers capture local edges and textures but struggle with complex multi-scale composite anomalies.',
    futureImprovements: 'Deepen the network to 4+ layers (Exp 6) and integrate multi-scale feature pyramids.'
  },
  {
    id: 'cs-5-2',
    experimentId: 5,
    title: 'Drone Aerial Crop Health Surveillance',
    industry: 'Agriculture',
    problemStatement: 'Agricultural drones capturing aerial multispectral imagery must distinguish healthy crop patches from weed infestations and barren soil.',
    realWorldRequirement: 'Fast low-power embedded CNN inference on drone companion boards (e.g., Raspberry Pi / Jetson Nano).',
    dataset: 'Aerial agricultural crop tiles (CIFAR-10 adapted multispectral patches).',
    preprocessing: 'Histogram equalization, channel-wise standardisation.',
    modelArchitecture: 'Conv2D(32, 3x3) -> MaxPool(2x2) -> Conv2D(64, 3x3) -> MaxPool(2x2) -> Dense(64) -> Softmax(4).',
    trainingMethodology: 'Adam with weight decay, 25 epochs.',
    evaluationMetrics: 'Mean Intersection over Union (mIoU), classification accuracy, inference wattage.',
    results: '92.4% accuracy with under 3.5 Watts total compute power during flight.',
    limitations: 'Severe shadows and sunlight glare degrade edge detection filters.',
    futureImprovements: 'Add data augmentation (Exp 9) to simulate diverse illumination conditions.'
  },

  // Exp 6: CNN with 4+ Conv Layers (CPU vs GPU)
  {
    id: 'cs-6-1',
    experimentId: 6,
    title: 'E-Commerce Fashion Product Auto-Cataloging & Tagging',
    industry: 'Retail',
    problemStatement: 'Online apparel marketplaces receive over 50,000 merchant product photos daily needing automated category categorization (Shoes, Bags, Shirts, etc.).',
    realWorldRequirement: 'Deep feature hierarchy extracting textures, silhouettes, and fabric patterns across 10 fashion categories.',
    dataset: 'Fashion MNIST (70,000 28x28 grayscale images across 10 clothing categories).',
    preprocessing: 'Channel reshaping $(28, 28, 1)$, division by 255.0, one-hot encoding.',
    modelArchitecture: '4-Layer CNN: Conv2D(32) -> Conv2D(32) -> MaxPool -> Conv2D(64) -> Conv2D(64) -> MaxPool -> Dense(256) -> Dense(10).',
    trainingMethodology: 'Benchmark across epochs 5, 10, 20; tested on CPU (Intel i3) vs GPU (NVIDIA T4 in Google Colab).',
    evaluationMetrics: 'Test accuracy, epoch-wise execution time (CPU vs GPU speedup ratio).',
    results: '93.2% accuracy at 20 epochs; GPU accelerated training by 8.6x (8.3s vs 71.4s on CPU).',
    limitations: 'Grayscale 28x28 format limits fine-grained luxury item pattern differentiation.',
    futureImprovements: 'Train on full-color high-resolution images with transfer learning (VGG-16, Exp 12).'
  },
  {
    id: 'cs-6-2',
    experimentId: 6,
    title: 'Autonomous Vehicle Traffic Sign Recognition System',
    industry: 'Automotive',
    problemStatement: 'Self-driving vehicles require near-perfect perception of traffic warning, speed limit, and mandatory regulatory signs under real-time safety constraints.',
    realWorldRequirement: 'High-capacity deep CNN with sub-5ms GPU tensor execution.',
    dataset: 'German Traffic Sign Recognition Benchmark (GTSRB) / CIFAR-10 road subset.',
    preprocessing: 'Local contrast normalization, spatial jittering.',
    modelArchitecture: '4-Layer Deep CNN with hierarchical spatial receptive fields.',
    trainingMethodology: 'Cosine annealing learning rate schedule, GPU TensorRT acceleration.',
    evaluationMetrics: 'Top-1 accuracy, worst-case inference latency, safety hazard rate.',
    results: '98.7% test accuracy, 3.2ms latency on onboard automotive GPU.',
    limitations: 'Heavy snow and mud occlusions cause occasional false rejections.',
    futureImprovements: 'Combine with temporal video frame tracking.'
  },

  // Exp 7: Padding and Batch Normalization
  {
    id: 'cs-7-1',
    experimentId: 7,
    title: 'High-Throughput Pharmaceutical Pill Defect Screening',
    industry: 'Healthcare',
    problemStatement: 'Pharmaceutical packaging requires high-speed verification of blister pack tablet integrity without spatial feature erosion near image borders.',
    realWorldRequirement: 'Border information preservation via SAME padding and elimination of internal covariate shift via Batch Normalization.',
    dataset: 'High-speed industrial tablet inspection camera feed (Fashion MNIST / Defect benchmark).',
    preprocessing: 'Batch-wise normalization, SAME padding $(P=1, S=1)$.',
    modelArchitecture: 'Conv2D(32, 3x3, padding="same") -> BatchNormalization() -> Conv2D(64, 3x3, padding="same") -> BatchNormalization() -> MaxPool -> Dense(128) -> BN -> Softmax.',
    trainingMethodology: 'Adam optimizer with initial learning rate 0.01 (enabled by BN without gradient explosion), 15 epochs.',
    evaluationMetrics: 'Convergence speed (epochs to 90% acc), gradient variance, border defect recall.',
    results: 'Reached 92% accuracy in just 4 epochs (vs 11 epochs without BN); SAME padding prevented edge clipping.',
    limitations: 'Batch size must be $\\ge 16$ for stable batch statistics estimation during training.',
    futureImprovements: 'Use Group Normalization or Layer Normalization for single-sample streaming.'
  },
  {
    id: 'cs-7-2',
    experimentId: 7,
    title: 'Satellite Remote Sensing Urban Land Cover Mapping',
    industry: 'Computer Vision',
    problemStatement: 'Satellite multispectral tiles suffer from severe variance in atmospheric reflectance across different orbits and seasonal passes.',
    realWorldRequirement: 'Feature map normalization to stabilize training across diverse illumination distributions.',
    dataset: 'Sentinel-2 Land Cover multispectral benchmark.',
    preprocessing: 'Top-of-atmosphere radiance calibration, tile segmentation.',
    modelArchitecture: 'Multi-layer CNN with SAME padding and Batch Normalization after every convolution block.',
    trainingMethodology: 'Mini-batch gradient descent with momentum.',
    evaluationMetrics: 'Mean IoU across water, vegetation, built-up, and barren classes.',
    results: '8.4% improvement in urban boundary delineation due to zero spatial shrinkage from SAME padding.',
    limitations: 'Slight inference overhead due to moving mean and variance updates.',
    futureImprovements: 'Fold batch normalization weights into convolution kernels at deployment.'
  },

  // Exp 8: Regularization and Dropout
  {
    id: 'cs-8-1',
    experimentId: 8,
    title: 'Clinical Diagnostic Decision Support under Severe Data Scarcity',
    industry: 'Healthcare',
    problemStatement: 'Rare pulmonary disease X-ray datasets contain few patient samples; complex deep CNNs easily overfit by memorizing patient-specific artifacts.',
    realWorldRequirement: 'Aggressive regularization preventing co-adaptation of neurons and shrinking generalization gap.',
    dataset: 'Pediatric Chest X-Ray / Fashion MNIST surrogate benchmark.',
    preprocessing: 'Standardized normalization, stratified patient cross-validation.',
    modelArchitecture: 'Comparative study across 5 architectures: a) Base, b) L1 Reg, c) L2 Reg, d) Dropout (0.5), e) L2 + Dropout.',
    trainingMethodology: 'Adam optimizer, 30 epochs, tracking train vs test accuracy gap.',
    evaluationMetrics: 'Generalization gap $(\\text{Acc}_{\\text{train}} - \\text{Acc}_{\\text{test}})$, test loss, AUC.',
    results: 'Base model overfit with 8.4% generalization gap (96.5% train vs 88.1% test). L2 + Dropout achieved best generalization: 89.5% test accuracy with only 0.1% gap!',
    limitations: 'Heavy dropout during training slows down initial epoch convergence.',
    futureImprovements: 'Implement Monte Carlo Dropout for Bayesian uncertainty estimation in clinical diagnoses.'
  },
  {
    id: 'cs-8-2',
    experimentId: 8,
    title: 'Credit Card Fraud Detection on Imbalanced Transaction Streams',
    industry: 'Finance',
    problemStatement: 'Fraudulent transaction patterns change continuously; overparameterized neural nets memorize historical fraud tricks and fail on novel fraud variants.',
    realWorldRequirement: 'Weight sparsity via L1 regularization and ensemble robustness via Dropout.',
    dataset: 'European Credit Card Fraud dataset (284,807 transactions, 28 PCA features).',
    preprocessing: 'RobustScaler, precision-recall split, class weight balancing.',
    modelArchitecture: 'Dense Network with L1 weight regularizer and Dropout(0.4) on penultimate layer.',
    trainingMethodology: 'Focal loss optimization with Adam.',
    evaluationMetrics: 'AUPRC (Area Under Precision-Recall Curve), False Positive Dollar Cost.',
    results: 'L1 regularization eliminated 35% of noisy features by zeroing weights; Dropout prevented catastrophic false positives.',
    limitations: 'Requires delicate hyperparameter tuning of $\\lambda$ regularization coefficient.',
    futureImprovements: 'AutoML Bayesian optimization for regularization strength scheduling.'
  },

  // Exp 9: Data Augmentation
  {
    id: 'cs-9-1',
    experimentId: 9,
    title: 'Rare Dermatological Lesion Dataset Multiplier for Melanoma Screening',
    industry: 'Healthcare',
    problemStatement: 'Dermoscopic images of rare malignant melanoma are scarce; clinical clinics only have a few hundred validated biopsy-proven scans.',
    realWorldRequirement: 'Generate 10x-50x biologically plausible variations from a single skin lesion image without losing lesion margins.',
    dataset: 'ISIC Skin Lesion single biopsy crop.',
    preprocessing: 'Center crop, hair artifact removal.',
    modelArchitecture: 'Keras ImageDataGenerator / Albumentations pipeline: rotation 40°, width/height shift 0.2, shear 0.2, zoom 0.2, horizontal flip, brightness range [0.8, 1.2].',
    trainingMethodology: 'On-the-fly random batch augmentation during streaming.',
    evaluationMetrics: 'Visual fidelity, Fréchet Inception Distance (FID), downstream classifier sensitivity.',
    results: 'Expanded effective training dataset from 300 to 15,000 diverse samples; boosted dermatologist-level sensitivity from 78.4% to 93.6%.',
    limitations: 'Excessive vertical flipping on certain non-isotropic medical scans can generate invalid physiological orientations.',
    futureImprovements: 'Combine heuristic spatial augmentations with generative diffusion models.'
  },
  {
    id: 'cs-9-2',
    experimentId: 9,
    title: 'Precision Agricultural Weed Detection across Diverse Solar Angles',
    industry: 'Agriculture',
    problemStatement: 'Field robots encounter plants under dawn, noon, and dusk sunlight with extreme shadows and camera perspective distortions.',
    realWorldRequirement: 'Synthesize morning/evening lighting variations and optical camera angle shears from a single midday training photo.',
    dataset: 'Single plant canopy photo dataset from tractor-mounted cameras.',
    preprocessing: 'RGB channel normalization, affine transformations.',
    modelArchitecture: 'Affine transformation matrix applying rotation, shear, perspective tilt, and HSV value modulation.',
    trainingMethodology: 'Offline and online augmentation batch generators.',
    evaluationMetrics: 'Invariance score across illumination levels, mAP@0.5.',
    results: 'Eliminated robot false detections during sunrise/sunset by 67%.',
    limitations: 'Shear angles beyond 30° distorted leaf botanical structure.',
    futureImprovements: 'Use physically-based rendering (PBR) simulation.'
  },

  // Exp 10: CNN with Data Augmentation (CIFAR-10)
  {
    id: 'cs-10-1',
    experimentId: 10,
    title: 'Autonomous Drone Maritime Search and Rescue Object Classification',
    industry: 'Computer Vision',
    problemStatement: 'Search and rescue drones over water must identify lifeboats, swimmers, and debris despite variable wave rotations, sea spray, and boat orientations.',
    realWorldRequirement: 'Object classification model robust to 360-degree orientation and zoom scales.',
    dataset: 'CIFAR-10 (60,000 32x32 color images across 10 categories including ships, airplanes, birds, etc.).',
    preprocessing: 'Real-time ImageDataGenerator augmentation: random horizontal flip, random rotation 15°, width/height shift 0.1.',
    modelArchitecture: 'Deep CNN with Conv2D(32), Conv2D(64), Conv2D(128), MaxPool, Dense(512), Dropout(0.5), Softmax(10).',
    trainingMethodology: 'Trained for 25 epochs: Run A (Without Augmentation) vs Run B (With Augmentation).',
    evaluationMetrics: 'Validation accuracy, Test error rate, Orientation invariance score.',
    results: 'Model without augmentation overfit heavily (92% train, 75.2% val); augmented model achieved 82.4% validation accuracy (+7.2% generalization boost).',
    limitations: 'Increased training time per epoch by ~22% due to CPU real-time augmentation overhead.',
    futureImprovements: 'Perform GPU-accelerated tensor augmentations using tf.data or KerasCV.'
  },
  {
    id: 'cs-10-2',
    experimentId: 10,
    title: 'Retail Smart Cart Automated Item Recognition',
    industry: 'Retail',
    problemStatement: 'Shoppers drop grocery items into smart shopping carts at unpredictable angles, upside down, or partially obscured.',
    realWorldRequirement: 'Rotation- and shift-invariant multi-category package recognition.',
    dataset: 'CIFAR-10 grocery surrogate subset (packaged goods, containers, bottles).',
    preprocessing: 'Random perspective warp, zoom range [0.85, 1.15], horizontal flip.',
    modelArchitecture: 'Convolutional neural network with augmented data pipeline.',
    trainingMethodology: 'Mini-batch SGD with Nesterov momentum, 30 epochs.',
    evaluationMetrics: 'Top-1 grocery item accuracy, checkout scan speed.',
    results: 'Accuracy increased from 71.3% to 83.1% on tilted/tumbled products.',
    limitations: 'Does not fully resolve heavy occlusions where 80% of packaging is covered.',
    futureImprovements: 'Add multi-view camera fusion inside the cart.'
  },

  // Exp 11: LeNet-5 Architecture
  {
    id: 'cs-11-1',
    experimentId: 11,
    title: 'Bank ATM Automated Handwritten Cheque Amount Digitizer',
    industry: 'Finance',
    problemStatement: 'Bank ATM deposit machines need to process handwritten numeric deposit amounts on cheques instantly without human teller intervention.',
    realWorldRequirement: 'Strict adherence to Yann LeCun’s seminal LeNet-5 architecture (1998) engineered specifically for commercial cheque processing.',
    dataset: 'MNIST Handwritten Digits & NIST Special Database 19 (cheque numeric courtesy boxes).',
    preprocessing: 'Binarization, 32x32 / 28x28 normalized grayscale framing.',
    modelArchitecture: 'LeNet-5: Input (28x28) -> C1 (6 filters, 5x5, Tanh) -> S2 (AvgPool 2x2, stride 2) -> C3 (16 filters, 5x5, Tanh) -> S4 (AvgPool 2x2) -> C5 (120 units) -> F6 (84 units) -> Output (10 Softmax).',
    trainingMethodology: 'SGD optimizer, learning rate 0.01, 20 epochs, crossentropy loss.',
    evaluationMetrics: 'Cheque digit error rate, Zero-False-Acceptance security threshold.',
    results: '98.9% test accuracy on handwritten digits; processed each cheque digit in under 0.8ms.',
    limitations: 'Average pooling and Tanh activations are slower to train than modern MaxPool and ReLU.',
    futureImprovements: 'Update activations to ReLU and integrate spatial transformer networks for skewed writing.'
  },
  {
    id: 'cs-11-2',
    experimentId: 11,
    title: 'Embedded Microcontroller Water Meter Counter Reader',
    industry: 'Manufacturing',
    problemStatement: 'Smart IoT water meters running on low-power coin-cell microcontrollers must read mechanical rolling number dials with tiny RAM budgets (<256 KB).',
    realWorldRequirement: 'Extremely lightweight CNN architecture with under 60,000 parameters.',
    dataset: 'Mechanical water meter counter digit crops.',
    preprocessing: 'Grayscale downsampling to 28x28.',
    modelArchitecture: 'Exact LeNet-5 topology (~60,000 total parameters; ~240 KB in float32, 60 KB in int8 quantization).',
    trainingMethodology: 'Quantization-aware training (QAT) in TensorFlow Lite.',
    evaluationMetrics: 'Model size (KB), inference cycles on ARM Cortex-M4, Accuracy.',
    results: '98.2% digit recognition accuracy running entirely in 64 KB RAM on a $2 microcontroller!',
    limitations: 'Mechanical dials halfway between digits require transitional logic.',
    futureImprovements: 'Add temporal smoothing across sequential readings.'
  },

  // Exp 12: VGG-16 and VGG-19 CNN Architecture
  {
    id: 'cs-12-1',
    experimentId: 12,
    title: 'Veterinary Telemedicine Automated Canine vs Feline Dermopathy Classifier',
    industry: 'Healthcare',
    problemStatement: 'Remote pet telemedicine apps need accurate species and skin condition categorization from user-submitted mobile smartphone photos.',
    realWorldRequirement: 'High-capacity deep visual feature extractor using pre-trained ImageNet weights (Transfer Learning).',
    dataset: 'Kaggle Cats vs Dogs / Oxford-IIIT Pet Dataset (25,000 photographic color images).',
    preprocessing: 'Resize to 224x224x3, ImageNet channel mean subtraction.',
    modelArchitecture: 'VGG-16: 13 convolution layers (stacks of 3x3 filters), 5 MaxPool layers, feature extractor frozen -> custom classification head (Flatten -> Dense(256, ReLU) -> Dense(2, Softmax)).',
    trainingMethodology: 'Transfer learning: Frozen base for 5 epochs with Adam (lr=1e-3), followed by fine-tuning top conv block with lr=1e-5.',
    evaluationMetrics: 'Top-1 accuracy, Precision, Recall, Confusion Matrix.',
    results: '97.6% classification accuracy achieved with pre-trained VGG-16 vs only 82.1% when trained from scratch.',
    limitations: 'VGG-16 has 138 million parameters and a large 500+ MB model file size due to dense fully-connected layers.',
    futureImprovements: 'Replace dense layers with Global Average Pooling (GAP) or migrate to MobileNetV3 for mobile deployment.'
  },
  {
    id: 'cs-12-2',
    experimentId: 12,
    title: 'Retail Store Automated Shelf Inventory & Brand Auditing',
    industry: 'Retail',
    problemStatement: 'Supermarket robotic auditors scanning grocery aisles must recognize hundreds of packaged consumer products under variable perspective angles.',
    realWorldRequirement: 'Fine-grained visual feature hierarchy comparing VGG-16 (16 layers) vs VGG-19 (19 layers).',
    dataset: 'Retail product packaging high-resolution catalog.',
    preprocessing: 'Multi-scale crop, bilinear interpolation to 224x224.',
    modelArchitecture: 'VGG-19 architecture (16 conv + 3 dense layers) with deeper Block 3, 4, 5 representations.',
    trainingMethodology: 'Transfer learning with cosine decay learning rate schedule.',
    evaluationMetrics: 'Top-1 and Top-5 product classification accuracy, inference latency.',
    results: 'VGG-19 delivered 91.2% top-1 accuracy on complex product packaging, slightly outperforming VGG-16 (90.3%) at the cost of +27% higher inference latency.',
    limitations: 'High computational footprint makes VGG-19 heavy for edge camera hardware.',
    futureImprovements: 'Knowledge distillation into a lightweight student model.'
  },

  // Exp 13: RNN for Sentiment Analysis
  {
    id: 'cs-13-1',
    experimentId: 13,
    title: 'E-Commerce Customer Product Review Sentiment & Churn Monitor',
    industry: 'Retail',
    problemStatement: 'Retail platforms receive millions of product reviews; negative customer sentiment on newly launched items must trigger immediate seller notifications.',
    realWorldRequirement: 'Sequential natural language processing pipeline learning word representations and recurrent temporal context.',
    dataset: 'IMDB Movie Reviews / Amazon Customer Reviews (50,000 reviews labeled positive/negative).',
    preprocessing: 'Vocabulary truncation (top 10,000 words), tokenization, sequence padding to fixed length 500 tokens.',
    modelArchitecture: 'Embedding Layer (10,000 vocab, dim 32) -> SimpleRNN(32 units) -> Dense(1, Sigmoid).',
    trainingMethodology: 'RMSprop optimizer, binary crossentropy, batch size 64, 10 epochs.',
    evaluationMetrics: 'Binary accuracy, AUC-ROC, false negative sentiment rate.',
    results: '83.2% sentiment accuracy on test set; correctly surfaced frustrated customer reviews.',
    limitations: 'SimpleRNN suffers from vanishing gradients; loses context on reviews longer than 80 words.',
    futureImprovements: 'Upgrade to Long Short-Term Memory (LSTM) or Bidirectional LSTM (Exp 14).'
  },
  {
    id: 'cs-13-2',
    experimentId: 13,
    title: 'Financial News Headline Real-Time Market Sentiment Radar',
    industry: 'Finance',
    problemStatement: 'Quantitative hedge funds require instant algorithmic sentiment classification of breaking news headlines to manage trade risk.',
    realWorldRequirement: 'Low-latency sequential RNN processing of short headline text streams.',
    dataset: 'Financial PhraseBank (headline sentiment benchmark: positive, negative, neutral).',
    preprocessing: 'Financial stop-word preservation, tokenization, sequence padding to 30 words.',
    modelArchitecture: 'Word2Vec pretrained embedding -> SimpleRNN(64) -> Dense(3, Softmax).',
    trainingMethodology: 'Adam optimizer with gradient clipping to prevent gradient explosion.',
    evaluationMetrics: 'Macro F1-score, sentiment latency (<15ms).',
    results: '85.4% F1-score with 4.2ms inference latency per headline.',
    limitations: 'Complex double negatives and sarcastic financial commentary confuse the simple recurrent cell.',
    futureImprovements: 'Employ Bidirectional LSTM (Exp 14) or FinBERT.'
  },

  // Exp 14: Bidirectional LSTM
  {
    id: 'cs-14-1',
    experimentId: 14,
    title: 'Hospital Patient Feedback Clinical Grievance Detection',
    industry: 'Healthcare',
    problemStatement: 'Patient post-discharge survey responses contain nuanced complaints ("The doctor was helpful, but the nursing staff never administered the medication on time") where critical negations appear late.',
    realWorldRequirement: 'Dual-directional sequential modeling capturing both preceding and succeeding context simultaneously.',
    dataset: 'Healthcare Patient Survey Reviews / IMDB Sentiment Dataset (50,000 reviews).',
    preprocessing: 'Sequence padding to 200 words, out-of-vocabulary hashing.',
    modelArchitecture: 'Embedding(10,000, 64) -> Bidirectional(LSTM(64 units, dropout=0.2, recurrent_dropout=0.2)) -> Dense(32, ReLU) -> Dense(1, Sigmoid).',
    trainingMethodology: 'Adam optimizer, binary crossentropy, early stopping with patience=3.',
    evaluationMetrics: 'Test accuracy, F1-score on negative complaint class, Attention saliency.',
    results: '89.6% classification accuracy, beating unidirectional RNN (76.5%) by +13.1% due to dual forward and backward context vectors.',
    limitations: 'Bidirectional processing requires the entire sentence before starting inference, preventing streaming speech transcription.',
    futureImprovements: 'Implement attention pooling over the BiLSTM hidden states.'
  },
  {
    id: 'cs-14-2',
    experimentId: 14,
    title: 'Legal Contract Risk & Indemnity Clause Compliance Analyzer',
    industry: 'Education',
    problemStatement: 'Corporate legal departments must review thousands of contract clauses for liability caps where qualifying terms ("except when", "provided however") invert legal meaning.',
    realWorldRequirement: 'Deep semantic understanding across long sentence structures with long-range dependencies.',
    dataset: 'CUAD (Contract Understanding Atticus Dataset) / Legal text corpus.',
    preprocessing: 'Legal tokenization, subword BPE encoding, max length 256.',
    modelArchitecture: 'Bi-directional LSTM with memory cell states $(C_t)$ and forget gates $(f_t)$.',
    trainingMethodology: 'AdamW with weight decay, 15 epochs.',
    evaluationMetrics: 'Clause categorization accuracy, precision on high-risk indemnity clauses.',
    results: '91.8% precision, identifying risky non-standard clauses across vendor contracts.',
    limitations: 'Training compute is roughly double that of unidirectional LSTM.',
    futureImprovements: 'Fine-tune pre-trained Legal-BERT models.'
  },

  // Exp 15: Generative Adversarial Networks (GANs)
  {
    id: 'cs-15-1',
    experimentId: 15,
    title: 'Synthetic Patient Data Generation for Privacy-Preserving Health Analytics',
    industry: 'Healthcare',
    problemStatement: 'HIPAA and GDPR privacy regulations prohibit sharing raw patient clinical scans across research universities, choking collaborative medical AI research.',
    realWorldRequirement: 'Generate high-fidelity synthetic patient biomarker images from pure random noise that contain no direct 1-to-1 match with any real individual.',
    dataset: 'MNIST / Medical Imaging synthetic benchmark (28x28 grayscale biomarker projections).',
    preprocessing: 'Pixel scaling to $[-1, 1]$ matching tanh generator output.',
    modelArchitecture: 'Deep Convolutional GAN (DCGAN): Generator (Dense 7x7x256 -> Conv2DTranspose 128 -> Conv2DTranspose 64 -> Conv2DTranspose 1 (Tanh)) vs Discriminator (Conv2D 64 (LeakyReLU) -> Conv2D 128 -> Flatten -> Dense 1 (Sigmoid)).',
    trainingMethodology: 'Minimax game with alternating updates: Discriminator on real + fake; Generator trained via discriminator feedback with Adam (lr=2e-4, beta_1=0.5).',
    evaluationMetrics: 'Fréchet Inception Distance (FID), Inception Score, Membership Inference Privacy test.',
    results: 'Generated synthetic image quality improved progressively from epoch 1 (random noise) to epoch 50 (crisp realistic structural patterns); 0% training patient records memorized.',
    limitations: 'Prone to mode collapse if generator discovers a single pattern that repeatedly tricks the discriminator.',
    futureImprovements: 'Implement Wasserstein GAN with Gradient Penalty (WGAN-GP) for stable convergence.'
  },
  {
    id: 'cs-15-2',
    experimentId: 15,
    title: 'Virtual Apparel Prototyping & Generative Fashion Design Studio',
    industry: 'Retail',
    problemStatement: 'Fashion brands spend months and millions of dollars manufacturing physical textile samples before consumer testing.',
    realWorldRequirement: 'Rapid synthetic generation of diverse clothing concepts (dresses, coats, shirts) from random latent vectors.',
    dataset: 'Fashion MNIST (70,000 fashion silhouettes) / DeepFashion.',
    preprocessing: 'Normalization to $[-1, 1]$, random latent vector sampling $z \\sim \\mathcal{N}(0, 1)^{100}$.',
    modelArchitecture: 'DCGAN with conditional class vector injection (cGAN).',
    trainingMethodology: 'Two-player minimax optimization with label smoothing on real targets (0.9 instead of 1.0).',
    evaluationMetrics: 'Visual diversity score, consumer appeal preference score.',
    results: 'Generated thousands of novel fashion silhouettes, cutting concept ideation cycle time by 75%.',
    limitations: 'Occasional structural artifacts on complex sleeve and collar geometries.',
    futureImprovements: 'Employ High-Resolution StyleGAN or Latent Diffusion models.'
  },

  // Exp 16: Autoencoders for Image Denoising
  {
    id: 'cs-16-1',
    experimentId: 16,
    title: 'Low-Dose Pediatric X-Ray Denoising & Radiation Dose Minimization',
    industry: 'Healthcare',
    problemStatement: 'Minimizing radiation exposure in pediatric radiography requires using ultra-low X-ray dosages, but this introduces severe quantum mottle and Poisson/Gaussian noise.',
    realWorldRequirement: 'Deep convolutional autoencoder capable of reconstructing high-clarity diagnostic X-rays from severely degraded noisy inputs.',
    dataset: 'MNIST / Pediatric Chest Radiograph crops with injected Gaussian noise (mean=0, std=0.45).',
    preprocessing: 'Min-max scaling to $[0, 1]$, noise addition with clipping to $[0, 1]$.',
    modelArchitecture: 'Convolutional Autoencoder: Encoder (Conv2D 32, 3x3 -> Conv2D 64, stride 2 [Latent Bottleneck]) -> Decoder (Conv2DTranspose 64, stride 2 -> Conv2D 1, Sigmoid).',
    trainingMethodology: 'Adam optimizer, Mean Squared Error (MSE) reconstruction loss, batch size 64, 25 epochs.',
    evaluationMetrics: 'Peak Signal-to-Noise Ratio (PSNR), Structural Similarity Index (SSIM), Mean Squared Error.',
    results: 'Achieved +12.4 dB PSNR improvement; reduced reconstruction error by 81.3% while preserving bone boundary edges.',
    limitations: 'Extreme latent compression can over-smooth fine micro-fractures.',
    futureImprovements: 'Incorporate perceptual loss using VGG feature matching alongside MSE.'
  },
  {
    id: 'cs-16-2',
    experimentId: 16,
    title: 'Night-Vision Security Camera Thermal Sensor Denoising',
    industry: 'Manufacturing',
    problemStatement: 'Industrial thermal cameras operating at night suffer from heavy sensor thermal noise and sensor gain grain.',
    realWorldRequirement: 'Real-time video frame denoising on edge security appliances.',
    dataset: 'Thermal sensor security crops with simulated sensor grain noise.',
    preprocessing: 'Grayscale normalization, sliding window noise modeling.',
    modelArchitecture: 'Symmetric Convolutional Autoencoder with skip connections (U-Net style).',
    trainingMethodology: 'L1 + SSIM compound loss optimization.',
    evaluationMetrics: 'SSIM (Structural Similarity), Video processing FPS, human silhouette detectability.',
    results: 'Restored clean silhouettes with SSIM rising from 0.44 to 0.89 at 45 FPS.',
    limitations: 'Rapidly moving objects can show slight temporal ghosting.',
    futureImprovements: 'Integrate recurrent spatiotemporal autoencoders (ConvLSTM).'
  }
];

export const caseStudies = CASE_STUDIES;

export const caseStudiesByExperiment: Record<number, CaseStudy[]> = {};
for (const cs of CASE_STUDIES) {
  const expId = cs.experimentId || 1;
  if (!caseStudiesByExperiment[expId]) {
    caseStudiesByExperiment[expId] = [];
  }
  caseStudiesByExperiment[expId].push({
    ...cs,
    description: cs.problemStatement,
    architecture_used: cs.modelArchitecture,
    impact_metrics: cs.results,
  });
}

