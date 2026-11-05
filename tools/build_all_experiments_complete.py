import json

# Full definitions for all 16 experiments
exps = [
  # Exp 1
  {
    "id": 1, "week": 1, "title": "Single-Unit Perceptron for Binary Classification",
    "tagline": "Linear Separability, Weight Updates & The XOR Problem", "category": "Perceptron",
    "aim": "a. Design a single unit perceptron for classification of a linearly separable binary dataset (placement.csv) without using pre-defined models. Use the Perceptron() from sklearn.\nb. Identify the problem with single unit Perceptron. Classify using Or-, And- and Xor-ed data and analyze the result.",
    "objectives": [
      "Understand biological neuron analogy and mathematical perceptron formulation.",
      "Implement the Perceptron learning algorithm from scratch and compare with Scikit-learn.",
      "Visualize the 2D decision boundary line w1*x1 + w2*x2 + b = 0.",
      "Demonstrate linear separability on placement.csv and logic gates (AND, OR).",
      "Analyze why a single perceptron fails on non-linearly separable XOR data."
    ],
    "prerequisites": ["Linear algebra (dot products, line equation)", "NumPy vector operations and Matplotlib", "Binary classification fundamentals"],
    "concept": "The Perceptron (Rosenblatt 1958) computes weighted input sum plus bias z = w^T x + b, passed through a step activation. In 2D space, the decision boundary is a straight line. If data is linearly separable, Novikoff's theorem guarantees finite convergence. Non-linear logic like XOR cannot be separated by a single hyperplane, necessitating multi-layer networks.",
    "mathFormulas": [
      {"name": "Net Input", "formula": "z = \\mathbf{w}^T \\mathbf{x} + b = \\sum_{i=1}^n w_i x_i + b", "description": "Linear combination of input features scaled by weights plus bias."},
      {"name": "Step Activation", "formula": "\\hat{y} = f(z) = \\begin{cases} 1 & z \\ge 0 \\\\ 0 & z < 0 \\end{cases}", "description": "Threshold activation mapping real inputs to binary output."},
      {"name": "Weight Update Rule", "formula": "w_i \\leftarrow w_i + \\eta (y - \\hat{y}) x_i, \\quad b \\leftarrow b + \\eta (y - \\hat{y})", "description": "Perceptron parameter update upon misclassification."},
      {"name": "Decision Boundary", "formula": "w_1 x_1 + w_2 x_2 + b = 0 \\implies x_2 = -\\frac{w_1}{w_2} x_1 - \\frac{b}{w_2}", "description": "2D line separating class 0 and class 1 regions."}
    ],
    "architecture": {
      "title": "Single-Unit Rosenblatt Perceptron",
      "summary": "2 input features (CGPA, Resume Score) connected via weighted synapses to 1 summing junction with bias, followed by a step activation.",
      "layers": ["Input Layer: 2 Features (CGPA, Resume Score)", "Weights (w1, w2) & Bias (b)", "Summing Node: z = w^T x + b", "Step Activation Function", "Output: Binary Placement (0 or 1)"]
    },
    "algorithm": [
      "1. Initialize weights w1, w2 and bias b to zero or small random values.",
      "2. Set learning rate eta (0.01) and maximum epochs (1000).",
      "3. For each training sample (x_i, y_i), compute net input z = w^T x_i + b.",
      "4. Compute prediction y_hat = 1 if z >= 0 else 0.",
      "5. Calculate error: err = y_i - y_hat.",
      "6. Update weights: w = w + eta * err * x_i; Update bias: b = b + eta * err.",
      "7. Repeat until all samples are correctly classified or max epochs reached.",
      "8. Plot decision boundary line x2 = -(w1*x1 + b)/w2 against data points."
    ],
    "datasetInfo": {
      "name": "placement.csv & Logic Truth Tables", "source": "MRCET Deep Learning Courseware",
      "sampleCount": "200 student records (placement.csv); 4 samples each for AND, OR, XOR",
      "features": ["cgpa (Float: 5.0 - 10.0)", "resume_score (Float: 5.0 - 10.0)"],
      "target": "placed (Binary: 0 = Not Placed, 1 = Placed)",
      "description": "Student academic performance and resume quality features mapped to campus placement eligibility."
    },
    "prescribedCode": """import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import Perceptron

df = pd.read_csv('placement.csv')
X = df.iloc[:, 0:2]
y = df.iloc[:, -1]

p = Perceptron()
p.fit(X, y)
print("Weights:", p.coef_)
print("Bias:", p.intercept_)

# Part b: OR, AND, XOR classification
gates = {'AND': [0,0,0,1], 'OR': [0,1,1,1], 'XOR': [0,1,1,0]}
X_gates = np.array([[0,0], [0,1], [1,0], [1,1]])
for name, target in gates.items():
    clf = Perceptron()
    clf.fit(X_gates, target)
    print(f"{name} Gate Accuracy: {clf.score(X_gates, target)*100:.1f}%")
""",
    "codeExplanation": [
      {"step": 1, "lines": "1-5", "code": "import numpy as np\nimport pandas as pd\nfrom sklearn.linear_model import Perceptron", "title": "Library Imports", "explanation": "Imports pandas, numpy, and Scikit-learn Perceptron model."},
      {"step": 2, "lines": "7-9", "code": "df = pd.read_csv('placement.csv')\nX = df.iloc[:, 0:2]\ny = df.iloc[:, -1]", "title": "Dataset Slicing", "explanation": "Extracts 2D input features and binary target column."},
      {"step": 3, "lines": "11-14", "code": "p = Perceptron()\np.fit(X, y)\nprint('Weights:', p.coef_)", "title": "Perceptron Training", "explanation": "Fits linear model and extracts learned hyperplane weights and bias."},
      {"step": 4, "lines": "17-22", "code": "for name, target in gates.items():\n    clf.fit(X_gates, target)", "title": "Logic Gate Testing", "explanation": "Verifies 100% convergence on AND/OR and failure on non-linear XOR."}
    ],
    "exercises": [
      {"id": "ex-1-1", "title": "Implement NOT Gate", "task": "Train Perceptron on 1D input X=[[0],[1]], y=[1,0].", "expectedOutcome": "Converges in 1 epoch with negative weight and positive bias."},
      {"id": "ex-1-2", "title": "Classify XNOR Gate", "task": "Train Perceptron on XNOR data: y=[1,0,0,1].", "expectedOutcome": "Fails to converge, proving XNOR is identically non-linearly separable."},
      {"id": "ex-1-3", "title": "Feature Lifting for XOR", "task": "Add interaction feature x3 = x1 * x2 and retrain on XOR.", "expectedOutcome": "Achieves 100% accuracy because quadratic feature lifts XOR into separable 3D space."}
    ],
    "commonErrors": [
      {"error": "ZeroDivisionError during line plotting", "cause": "w2 is zero, making division undefined.", "solution": "Check if abs(w2) < 1e-6 and draw vertical line x1 = -b/w1."},
      {"error": "Perceptron loops forever without convergence", "cause": "Training on non-separable data without iteration limit.", "solution": "Set max_iter=1000 in constructor."}
    ],
    "advancedChallenges": ["Derive Novikoff mistake bound (R/gamma)^2 on placement.csv.", "Implement Pocket Algorithm (Gallant 1990) for non-separable datasets."],
    "summary": ["Perceptron learns a linear hyperplane w^T x + b = 0.", "Converges in finite steps if linearly separable.", "Solves AND/OR but fails on XOR.", "Non-linear tasks require multi-layer architectures."],
    "defaultDataset": "placement.csv"
  },

  # Exp 2
  {
    "id": 2, "week": 2, "title": "Artificial Neural Network and Backpropagation",
    "tagline": "Backprop Algorithm, Activation Comparisons & Optimizers", "category": "Feedforward ANN",
    "aim": "Build an Artificial Neural Network by implementing the Backpropagation algorithm and test the same using appropriate data sets. Vary the activation functions used and compare the results (Iris and Ionosphere datasets).",
    "objectives": [
      "Implement the Backpropagation algorithm with chain-rule gradient calculations.",
      "Compare Sigmoid, Tanh, and ReLU activation functions on convergence speed and accuracy.",
      "Evaluate SGD vs Adam optimizers and analyze the impact of learning rates (0.0001, 0.0005, 5.0).",
      "Evaluate model performance under scarce training data (30% train, 70% test split).",
      "Test classification on multiclass Iris and binary Ionosphere datasets."
    ],
    "prerequisites": ["Calculus chain rule and partial derivatives", "Gradient descent optimization", "One-hot encoding of multi-class targets"],
    "concept": "Multi-Layer Perceptrons overcome linear separability by inserting non-linear hidden layers. Backpropagation (Rumelhart et al. 1986) calculates error gradients dLoss/dw recursively using the chain rule backwards from output to input. Sigmoid squashes values to (0, 1) but causes vanishing gradients. Tanh is zero-centered (-1, 1). ReLU computes max(0, z) with constant derivative 1.0 for z > 0, preventing vanishing gradients and speeding up training.",
    "mathFormulas": [
      {"name": "Forward Activation", "formula": "a^{(l)} = \\sigma(W^{(l)} a^{(l-1)} + b^{(l)})", "description": "Computes layer activations via matrix multiplication followed by non-linear activation."},
      {"name": "Categorical Cross-Entropy", "formula": "\\mathcal{L} = -\\sum_{k=1}^K y_k \\log(\\hat{y}_k)", "description": "Measures divergence between true one-hot class distribution and predicted probabilities."},
      {"name": "Output Delta", "formula": "\\delta^{(L)} = \\hat{\\mathbf{y}} - \\mathbf{y}", "description": "Simplified error delta for Softmax with Cross-Entropy loss."},
      {"name": "Backpropagation Chain Rule", "formula": "\\delta^{(l)} = ((W^{(l+1)})^T \\delta^{(l+1)}) \\odot \\sigma'(z^{(l)})", "description": "Propagates error backward across hidden layers."}
    ],
    "architecture": {
      "title": "MLP Architecture for Iris Classification",
      "summary": "4 input features -> Hidden Layer (10 neurons with Sigmoid/ReLU/Tanh) -> Output Layer (3 neurons with Softmax).",
      "layers": ["Input Layer: 4 Features (Sepal/Petal Length & Width)", "Hidden Layer: 10 Neurons (Sigmoid / ReLU / Tanh)", "Output Layer: 3 Neurons (Softmax for Setosa, Versicolor, Virginica)"]
    },
    "algorithm": [
      "1. Load Iris/Ionosphere dataset, normalize features using StandardScaler.",
      "2. One-hot encode multi-class targets.",
      "3. Split into 30% training and 70% testing data as prescribed.",
      "4. Initialize network weights with HeNormal or GlorotUniform.",
      "5. Forward Pass: compute hidden activations z1 = W1*x + b1, a1 = sigma(z1); compute output z2 = W2*a1 + b2, y_hat = softmax(z2).",
      "6. Backward Pass: compute delta2 = y_hat - y; propagate delta1 = (W2^T * delta2) * sigma'(z1).",
      "7. Compute gradients: dL/dW2 = delta2 * a1^T, dL/dW1 = delta1 * x^T.",
      "8. Update weights using optimizer (SGD or Adam).",
      "9. Iterate for 300 epochs; record training loss curve and test accuracy."
    ],
    "datasetInfo": {
      "name": "Iris & Ionosphere Datasets", "source": "UCI Machine Learning Repository",
      "sampleCount": "Iris: 150 samples (3 classes); Ionosphere: 351 samples (34 radar features)",
      "features": ["Iris: SepalLength, SepalWidth, PetalLength, PetalWidth", "Ionosphere: 34 continuous radar features"],
      "target": "Iris: Species (3 classes); Ionosphere: Radar Return (Good, Bad)",
      "description": "Botanical floral measurements and atmospheric radar return benchmarks."
    },
    "prescribedCode": """# Program - Backpropagation on Iris
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from keras.models import Sequential
from keras.layers import Dense
from keras.optimizers import SGD, Adam

df = pd.read_csv('iris.csv')
X = df.iloc[:, 1:5].values
y = df.iloc[:, -1].values

encoder = LabelEncoder()
y1 = encoder.fit_transform(y)
Y = pd.get_dummies(y1).values

X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.7, random_state=42)

model = Sequential()
model.add(Dense(10, input_dim=4, activation='sigmoid'))
model.add(Dense(3, activation='softmax'))

model.compile(loss='categorical_crossentropy', optimizer=SGD(lr=0.005), metrics=['accuracy'])
model.fit(X_train, y_train, epochs=300, batch_size=10, verbose=0)
loss, accuracy = model.evaluate(X_test, y_test)
print('Test Accuracy:', accuracy)
""",
    "codeExplanation": [
      {"step": 1, "lines": "1-6", "code": "import pandas as pd\nfrom keras.models import Sequential\nfrom keras.layers import Dense", "title": "Imports", "explanation": "Imports pandas, train_test_split, and Keras Sequential layers."},
      {"step": 2, "lines": "8-14", "code": "X = df.iloc[:, 1:5].values\nY = pd.get_dummies(y1).values\nX_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.7)", "title": "Data Preprocessing", "explanation": "Extracts features, one-hot encodes targets, and splits 30% train / 70% test."},
      {"step": 3, "lines": "16-19", "code": "model = Sequential()\nmodel.add(Dense(10, input_dim=4, activation='sigmoid'))\nmodel.add(Dense(3, activation='softmax'))", "title": "Model Architecture", "explanation": "Builds 4 -> 10 (Sigmoid) -> 3 (Softmax) feedforward architecture."},
      {"step": 4, "lines": "21-25", "code": "model.compile(loss='categorical_crossentropy', optimizer=SGD(lr=0.005))\nmodel.fit(X_train, y_train, epochs=300)\nmodel.evaluate(X_test, y_test)", "title": "Compilation & Training", "explanation": "Compiles with crossentropy, fits for 300 epochs, and logs test accuracy."}
    ],
    "exercises": [
      {"id": "ex-2-1", "title": "Compare Activation Functions", "task": "Run 300 epochs with Sigmoid, ReLU, and Tanh. Record accuracies.", "expectedOutcome": "ReLU achieves highest accuracy and fastest convergence (>95%), Tanh reaches ~93%, Sigmoid lags (~88%)."},
      {"id": "ex-2-2", "title": "Vary Learning Rates in SGD", "task": "Test eta = 0.0001, 0.0005, and 5.0.", "expectedOutcome": "eta=0.0001 converges very slowly; eta=0.005 converges smoothly; eta=5.0 diverges to NaN."},
      {"id": "ex-2-3", "title": "Train on Ionosphere Dataset", "task": "Modify architecture for 34 inputs and binary classification.", "expectedOutcome": "Achieves ~90-94% accuracy with Adam optimizer."}
    ],
    "commonErrors": [
      {"error": "ValueError: Error checking target shape", "cause": "Targets not one-hot encoded for categorical crossentropy.", "solution": "Use pd.get_dummies() or switch to sparse_categorical_crossentropy."},
      {"error": "Loss: NaN during SGD training", "cause": "Learning rate set too high (eta=5.0) causing numeric overflow.", "solution": "Lower learning rate to 0.001 or 0.01."}
    ],
    "advancedChallenges": ["Implement Adam optimizer from scratch with bias correction.", "Derive analytical gradient of Softmax cross-entropy loss."],
    "summary": ["Backprop computes exact error gradients via calculus chain rule.", "ReLU eliminates vanishing gradients, outperforming Sigmoid.", "Adam provides adaptive learning rates, beating SGD.", "Excessive learning rates diverge; tiny rates stall."],
    "defaultDataset": "iris.csv"
  },

  # Exp 3
  {
    "id": 3, "week": 3, "title": "Deep Feed-Forward ANN (Hidden Layers >= 4)",
    "tagline": "Hierarchical Representations, Network Depth & Ionosphere Classification", "category": "Feedforward ANN",
    "aim": "Build a Deep Feed Forward ANN by implementing the Backpropagation algorithm and test the same using appropriate data sets. Use the number of hidden layers >=4 (Iris & Ionosphere datasets).",
    "objectives": [
      "Construct a deep network topology with at least four hidden layers.",
      "Analyze information flow and parameter counts across deep dense layers.",
      "Compare representational capacity between shallow (1 layer) and deep (4+ layers) networks.",
      "Evaluate training loss convergence curves and avoid vanishing gradients with HeNormal.",
      "Execute classification on the 34-dimensional Johns Hopkins Ionosphere dataset."
    ],
    "prerequisites": ["Multi-layer backpropagation", "Gradient vanishing dynamics in deep architectures", "Weight initialization schemes"],
    "concept": "Deep feedforward networks stack multiple successive hidden layers (in Exp 3, >= 4 hidden layers) where each layer computes increasingly abstract representations of the input. According to the Universal Approximation Theorem, while a 1-layer network can theoretically approximate any function, it may require exponential width. Deep networks achieve exponential representational efficiency by composing hierarchical sub-functions. To train deep networks stably, proper weight initialization (HeNormal for ReLU) and optimizers like Adam are required to prevent vanishing or exploding gradients.",
    "mathFormulas": [
      {"name": "Multi-Layer Forward Pass", "formula": "\\mathbf{h}^{(l)} = \\text{ReLU}(W^{(l)} \\mathbf{h}^{(l-1)} + \\mathbf{b}^{(l)}), \\quad l = 1, \\dots, L", "description": "Sequential transformation of feature vectors through successive hidden layers."},
      {"name": "He (Kaiming) Weight Initialization", "formula": "W_{ij}^{(l)} \\sim \\mathcal{N}\\left(0, \\sqrt{\\frac{2}{n_{\\text{in}}}}\\right)", "description": "Preserves activation variance across deep ReLU networks to prevent vanishing gradients."}
    ],
    "architecture": {
      "title": "Deep 4-Hidden-Layer Feedforward Network",
      "summary": "Input (34) -> Hidden1 (32, ReLU) -> Hidden2 (24, ReLU) -> Hidden3 (16, ReLU) -> Hidden4 (8, ReLU) -> Output (2, Softmax).",
      "layers": ["Input: 34 Radar Features", "Hidden 1: 32 Neurons (ReLU)", "Hidden 2: 24 Neurons (ReLU)", "Hidden 3: 16 Neurons (ReLU)", "Hidden 4: 8 Neurons (ReLU)", "Output: 2 Classes (Softmax)"]
    },
    "algorithm": [
      "1. Load Ionosphere dataset (34 features, binary class g/b).",
      "2. Standardize features with StandardScaler.",
      "3. Construct Sequential model with 4 hidden layers: 32, 24, 16, 8 neurons with ReLU.",
      "4. Add Dense(2, activation='softmax') or Dense(1, activation='sigmoid') output.",
      "5. Compile with Adam optimizer and binary/categorical crossentropy.",
      "6. Train for 300 epochs and record loss curve.",
      "7. Train a shallow 1-hidden-layer network (16 neurons) for direct comparison.",
      "8. Compare final test accuracy, loss convergence, and decision complexity."
    ],
    "datasetInfo": {
      "name": "Ionosphere Dataset", "source": "Johns Hopkins University / Space Physics Group",
      "sampleCount": "351 instances (Good: 225, Bad: 126)", "features": ["34 continuous electromagnetic radar features"],
      "target": "Class ('g' = Good, 'b' = Bad)",
      "description": "Radar signals collected by high-frequency phased array in Goose Bay, Labrador."
    },
    "prescribedCode": """# Deep Feed Forward ANN (>= 4 Hidden Layers)
from keras.models import Sequential
from keras.layers import Dense
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder

df = pd.read_csv('ionosphere.csv')
X = df.iloc[:, 0:34].values
y = LabelEncoder().fit_transform(df.iloc[:, -1].values)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

model = Sequential([
    Dense(32, input_dim=34, activation='relu', kernel_initializer='he_normal'),
    Dense(24, activation='relu', kernel_initializer='he_normal'),
    Dense(16, activation='relu', kernel_initializer='he_normal'),
    Dense(8, activation='relu', kernel_initializer='he_normal'),
    Dense(2, activation='softmax')
])

model.compile(loss='sparse_categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
history = model.fit(X_train, y_train, epochs=200, batch_size=16, validation_data=(X_test, y_test), verbose=0)
loss, acc = model.evaluate(X_test, y_test)
print(f"Deep ANN (4 Hidden Layers) Test Accuracy: {acc*100:.2f}%")
""",
    "codeExplanation": [
      {"step": 1, "lines": "1-6", "code": "from keras.models import Sequential\nfrom keras.layers import Dense", "title": "Imports", "explanation": "Imports Keras Sequential model and Dense fully-connected layers."},
      {"step": 2, "lines": "8-15", "code": "X = df.iloc[:, 0:34].values\ny = LabelEncoder().fit_transform(df.iloc[:, -1].values)\nX_train = scaler.fit_transform(X_train)", "title": "Preprocessing", "explanation": "Encodes binary target and scales 34 continuous radar features to zero mean unit variance."},
      {"step": 3, "lines": "17-23", "code": "model = Sequential([\n    Dense(32, activation='relu'),\n    Dense(24, activation='relu'),\n    Dense(16, activation='relu'),\n    Dense(8, activation='relu'),\n    Dense(2, activation='softmax')\n])", "title": "Deep Architecture", "explanation": "Creates four sequential hidden layers with ReLU activations and HeNormal initialization."},
      {"step": 4, "lines": "25-28", "code": "model.compile(loss='sparse_categorical_crossentropy', optimizer='adam')\nmodel.fit(X_train, y_train, epochs=200)\nmodel.evaluate(X_test, y_test)", "title": "Training & Testing", "explanation": "Trains using Adam and reports test accuracy."}
    ],
    "exercises": [
      {"id": "ex-3-1", "title": "Vary Hidden Layer Neurons", "task": "Experiment with architectures (64, 32, 16, 8) vs (16, 12, 8, 4).", "expectedOutcome": "Wider layers capture subtle non-linearities but risk mild overfitting on small 351-sample dataset."},
      {"id": "ex-3-2", "title": "Test on Iris with 4 Layers", "task": "Modify the 4-layer model to accept 4 input features and 3 output classes.", "expectedOutcome": "Deep network achieves ~96-98% accuracy on Iris with fast convergence."},
      {"id": "ex-3-3", "title": "Compare Shallow vs Deep Loss Curves", "task": "Plot training and validation loss curves of 1-layer vs 4-layer networks.", "expectedOutcome": "Deep network converges to lower training loss with steeper initial descent."}
    ],
    "commonErrors": [
      {"error": "Vanishing gradient when using Sigmoid in 4 layers", "cause": "Sigmoid derivative <= 0.25 chained across 4 layers reduces gradients by (0.25)^4 = 0.0039.", "solution": "Use ReLU or LeakyReLU in all hidden layers."},
      {"error": "Dying ReLU neurons", "cause": "Large negative bias pushes neurons permanently into z < 0.", "solution": "Use HeNormal initialization and lower learning rate to 0.001."}
    ],
    "advancedChallenges": ["Add residual skip connections between Layer 1 and Layer 3 (ResNet concept in dense nets).", "Inspect activation distributions across layers using TensorBoard histograms."],
    "summary": ["Deep ANNs stack >= 4 hidden layers for hierarchical feature extraction.", "Depth provides exponential efficiency over shallow width.", "HeNormal initialization and ReLU are essential for deep convergence.", "Funneling layer dimensions creates an information bottleneck that removes noise."],
    "defaultDataset": "ionosphere.csv"
  },

  # Exp 4
  {
    "id": 4, "week": 4, "title": "Image Classification using Deep Feed-Forward NN",
    "tagline": "MNIST Handwritten Digit Recognition, Flattening & Confusion Matrices", "category": "Feedforward ANN",
    "aim": "Design and implement an Image classification model to classify a dataset of images using Deep Feed Forward NN. Record the accuracy corresponding to the number of epochs. Use the MNIST, CIFAR-10 datasets.",
    "objectives": [
      "Understand 2D image matrix flattening into 784-dimensional dense vectors.",
      "Construct a deep multi-layer dense classifier for 10-class handwritten digit recognition.",
      "Record and analyze epoch-wise training and validation accuracy trajectories.",
      "Compute and visualize the multi-class Confusion Matrix and Classification Report.",
      "Extend the deep feedforward model to natural color images (CIFAR-10) and analyze limitations."
    ],
    "prerequisites": ["2D image matrices and pixel intensity normalization", "Multi-class Softmax classification", "Confusion matrix evaluation metrics"],
    "concept": "Image classification using Deep Feedforward Neural Networks involves unrolling a 2D image matrix (e.g. 28x28 grayscale pixels) into a 1D vector of 784 numerical inputs. Successive dense layers transform these raw pixel intensities through non-linear feature abstractions (edges, strokes, loops) before projecting into 10 class probabilities via Softmax. While deep dense networks achieve ~97-98% accuracy on simple centered digits like MNIST, they lack spatial translation invariance—a digit shifted by a few pixels presents a completely novel activation vector, severely limiting performance on complex natural color images like CIFAR-10.",
    "mathFormulas": [
      {"name": "Flattening Transformation", "formula": "\\mathbf{x} = \\text{vec}(I) \\in \\mathbb{R}^{H \\times W \\times C} \\implies \\mathbf{x} \\in \\mathbb{R}^{784}", "description": "Unrolls 2D spatial grid into a 1D column vector."},
      {"name": "Softmax Multi-Class Probability", "formula": "P(y = c \\mid \\mathbf{x}) = \\frac{e^{z_c}}{\\sum_{j=0}^9 e^{z_j}}", "description": "Computes normalized class probabilities summing to 1.0 across all 10 digit classes."},
      {"name": "Classification Precision & Recall", "formula": "\\text{Precision}_c = \\frac{\\text{TP}_c}{\\text{TP}_c + \\text{FP}_c}, \\quad \\text{Recall}_c = \\frac{\\text{TP}_c}{\\text{TP}_c + \\text{FN}_c}", "description": "Measures per-digit classification quality and false alarm rates."}
    ],
    "architecture": {
      "title": "Deep Dense Architecture for MNIST Digits",
      "summary": "Flatten (784) -> Dense(128, HeNormal, ReLU) -> Dense(64, ReLU) -> Dense(32, ReLU) -> Dense(10, Softmax).",
      "layers": ["Input: 28x28 Grayscale Image", "Flatten Layer: 784 Dense Features", "Hidden 1: 128 Units (HeNormal, ReLU)", "Hidden 2: 64 Units (ReLU)", "Hidden 3: 32 Units (ReLU)", "Output: 10 Class Probabilities (Softmax)"]
    },
    "algorithm": [
      "1. Load MNIST dataset (60,000 train, 10,000 test images).",
      "2. Normalize pixel intensities from [0, 255] to [0.0, 1.0] by dividing by 255.0.",
      "3. Construct Sequential model starting with Flatten(input_shape=(28, 28)).",
      "4. Add Dense(128, activation='relu', kernel_initializer='HeNormal').",
      "5. Add Dense(64, activation='relu') and Dense(32, activation='relu').",
      "6. Add Dense(10, activation='softmax') output layer.",
      "7. Compile with Adam optimizer and sparse_categorical_crossentropy.",
      "8. Train for 10-15 epochs with validation_split=0.2; record epoch accuracy.",
      "9. Compute Confusion Matrix and per-digit Precision/Recall on 10,000 test set."
    ],
    "datasetInfo": {
      "name": "MNIST & CIFAR-10 Datasets", "source": "Yann LeCun, Corinna Cortes (MNIST) / Alex Krizhevsky (CIFAR-10)",
      "sampleCount": "MNIST: 70,000 28x28 grayscale images; CIFAR-10: 60,000 32x32 color images",
      "features": ["784 grayscale pixels (MNIST); 3,072 color pixels (CIFAR-10)"],
      "target": "10 mutually exclusive classes (Digits 0-9; CIFAR-10: Airplane, Automobile, Bird, etc.)",
      "description": "Standard benchmarks for image classification and neural network spatial reasoning."
    },
    "prescribedCode": """import tensorflow as tf
from tensorflow import keras
from keras.models import Sequential
from keras.layers import Dense, Flatten

(X_train, y_train), (X_test, y_test) = keras.datasets.mnist.load_data()
X_train = X_train / 255.0
X_test = X_test / 255.0

model = Sequential([
    Flatten(input_shape=(28, 28)),
    Dense(128, activation='relu', kernel_initializer='HeNormal', name='Hidden-1'),
    Dense(64, activation='relu', name='Hidden-2'),
    Dense(32, activation='relu', name='Hidden-3'),
    Dense(10, activation='softmax', name='Output')
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
history = model.fit(X_train, y_train, epochs=10, validation_split=0.2, batch_size=64)
test_loss, test_acc = model.evaluate(X_test, y_test)
print(f"MNIST Test Accuracy: {test_acc*100:.2f}%")
""",
    "codeExplanation": [
      {"step": 1, "lines": "1-5", "code": "import tensorflow as tf\nfrom keras.models import Sequential\nfrom keras.layers import Dense, Flatten", "title": "Library Imports", "explanation": "Imports TensorFlow Keras layers and model classes."},
      {"step": 2, "lines": "7-9", "code": "(X_train, y_train), (X_test, y_test) = keras.datasets.mnist.load_data()\nX_train = X_train / 255.0\nX_test = X_test / 255.0", "title": "Data Normalization", "explanation": "Loads 70k digits and normalizes pixel intensities to [0, 1]."},
      {"step": 3, "lines": "11-17", "code": "model = Sequential([\n    Flatten(input_shape=(28, 28)),\n    Dense(128, activation='relu', kernel_initializer='HeNormal'),\n    Dense(64, activation='relu'),\n    Dense(32, activation='relu'),\n    Dense(10, activation='softmax')\n])", "title": "Model Architecture", "explanation": "Unrolls 2D image into 784 inputs and passes through 3 hidden dense layers to 10 softmax outputs."},
      {"step": 4, "lines": "19-22", "code": "model.compile(optimizer='adam', loss='sparse_categorical_crossentropy')\nmodel.fit(X_train, y_train, epochs=10)\nmodel.evaluate(X_test, y_test)", "title": "Training & Evaluation", "explanation": "Trains for 10 epochs and reports test accuracy."}
    ],
    "exercises": [
      {"id": "ex-4-1", "title": "Plot Accuracy vs Epochs", "task": "Plot training and validation accuracy across epochs 1 to 15.", "expectedOutcome": "Accuracy climbs rapidly in epochs 1-5 (~96%), plateauing near 97.8% by epoch 10."},
      {"id": "ex-4-2", "title": "Evaluate on CIFAR-10", "task": "Train the same deep dense architecture on flattened CIFAR-10 images.", "expectedOutcome": "Accuracy plateaus around ~50-55%, highlighting dense model limitations on natural images."},
      {"id": "ex-4-3", "title": "Interactive Hand-Drawn Prediction", "task": "Draw a custom digit on the virtual canvas and evaluate model prediction.", "expectedOutcome": "Correctly classifies centered digits; may confuse 4 and 9 if strokes are skewed."}
    ],
    "commonErrors": [
      {"error": "Inverted canvas colors cause 0% accuracy", "cause": "User drew black ink on white canvas (255 background, 0 stroke), inverting MNIST conventions.", "solution": "Invert pixel array (255 - pixel) before feeding to model."},
      {"error": "Dimension mismatch: expected (None, 28, 28) but got (None, 784)", "cause": "Adding Flatten() to already flattened data.", "solution": "Remove Flatten() if data is pre-reshaped to 1D."}
    ],
    "advancedChallenges": ["Visualize weight matrices in the first hidden layer as 28x28 filter receptive fields.", "Implement PCA dimensionality reduction on 784 pixels and compare with neural embeddings."],
    "summary": ["Dense networks classify MNIST by flattening 28x28 into 784 features.", "HeNormal weight initialization prevents activation decay across layers.", "Achieves ~97-98% accuracy on MNIST.", "Dense layers fail on CIFAR-10 (~50%) due to lack of translation invariance."],
    "defaultDataset": "mnist"
  }
]

# We will generate experiments 5 to 16
exp_5_to_16_defs = [
  # 5: CNN with 2 Conv Layers
  {
    "id": 5, "week": 5, "title": "CNN with Two Convolution Layers",
    "tagline": "2D Convolutions, Kernel Filtering & Spatial Max Pooling", "category": "CNN",
    "aim": "Design and implement a CNN model (with 2 layers of convolutions) to classify multi category image datasets. Record the accuracy corresponding to the number of epochs. Use the MNIST, CIFAR-10 datasets.",
    "objectives": [
      "Understand 2D spatial convolution operation with sliding 3x3 weight kernels.",
      "Visualize feature maps and understand edge, corner, and texture extraction.",
      "Implement 2x2 Max Pooling for spatial downsampling and translation invariance.",
      "Train a 2-layer CNN on MNIST and CIFAR-10 and observe accuracy progression.",
      "Contrast parameter efficiency of CNNs against fully-connected feedforward networks."
    ],
    "prerequisites": ["2D matrix convolutions and cross-correlation", "Spatial receptive fields", "Stride and padding fundamentals"],
    "concept": "Convolutional Neural Networks (CNNs) preserve 2D spatial grid topology by replacing flat matrix multiplications with local sliding filters. A 2D convolution kernel (e.g. 3x3) slides across the input tensor, computing element-wise dot products to produce feature maps that highlight visual patterns (edges, gradients, textures). Max Pooling layers (2x2) downsample the spatial dimensions by selecting the maximum activation in each window, providing local translation invariance and halving spatial resolution. By sharing parameters across the entire image, CNNs require orders of magnitude fewer parameters than dense networks while capturing spatial hierarchies.",
    "mathFormulas": [
      {"name": "2D Discrete Convolution", "formula": "S(i, j) = (I * K)(i, j) = \\sum_m \\sum_n I(i - m, j - n) K(m, n) + b", "description": "Element-wise kernel multiplication and summation over local receptive field."},
      {"name": "Conv Output Dimension", "formula": "W_{\\text{out}} = \\left\\lfloor \\frac{W - F + 2P}{S} \\right\\rfloor + 1", "description": "Calculates output spatial dimension from input W, filter F, padding P, and stride S."},
      {"name": "Max Pooling Operation", "formula": "P(i, j) = \\max_{0 \\le m, n < 2} A(2i + m, 2j + n)", "description": "Selects maximum activation within non-overlapping 2x2 spatial window."}
    ],
    "architecture": {
      "title": "2-Layer Convolutional Neural Network",
      "summary": "Conv2D(32, 3x3, ReLU) -> MaxPool(2x2) -> Conv2D(64, 3x3, ReLU) -> MaxPool(2x2) -> Flatten -> Dense(128) -> Dense(10, Softmax).",
      "layers": ["Input: (28, 28, 1)", "Conv2D: 32 filters (3x3, valid) -> (26, 26, 32)", "MaxPool2D: (2, 2) -> (13, 13, 32)", "Conv2D: 64 filters (3x3, valid) -> (11, 11, 64)", "MaxPool2D: (2, 2) -> (5, 5, 64)", "Flatten: 1,600 units", "Dense: 128 units (ReLU)", "Output: 10 units (Softmax)"]
    },
    "algorithm": [
      "1. Load MNIST or CIFAR-10 dataset, normalize pixel intensities to [0, 1].",
      "2. Reshape input arrays to 4D tensors: (N, 28, 28, 1) for MNIST or (N, 32, 32, 3) for CIFAR-10.",
      "3. Construct Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)).",
      "4. Add MaxPooling2D(pool_size=(2, 2)).",
      "5. Add Conv2D(64, (3, 3), activation='relu') followed by MaxPooling2D((2, 2)).",
      "6. Add Flatten() layer (unrolling 5x5x64 into 1,600 features).",
      "7. Add Dense(128, activation='relu') and Dense(10, activation='softmax').",
      "8. Compile with Adam optimizer and categorical/sparse crossentropy.",
      "9. Train for 10 epochs; record training and test accuracy."
    ],
    "datasetInfo": {
      "name": "MNIST & CIFAR-10", "source": "Yann LeCun / Alex Krizhevsky",
      "sampleCount": "MNIST: 70,000 images; CIFAR-10: 60,000 images",
      "features": ["MNIST: 28x28x1 grayscale; CIFAR-10: 32x32x3 color"],
      "target": "10 visual object classes",
      "description": "Standard benchmarks for evaluating convolutional feature extraction."
    },
    "prescribedCode": """from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from keras.datasets import mnist
import keras

(x_train, y_train), (x_test, y_test) = mnist.load_data()
x_train = x_train.reshape(-1, 28, 28, 1).astype('float32') / 255.0
x_test = x_test.reshape(-1, 28, 28, 1).astype('float32') / 255.0
y_train = keras.utils.to_categorical(y_train, 10)
y_test = keras.utils.to_categorical(y_test, 10)

model = Sequential([
    Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(28, 28, 1)),
    MaxPooling2D(pool_size=(2, 2)),
    Conv2D(64, kernel_size=(3, 3), activation='relu'),
    MaxPooling2D(pool_size=(2, 2)),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(10, activation='softmax')
])

model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
model.fit(x_train, y_train, batch_size=128, epochs=10, validation_data=(x_test, y_test))
score = model.evaluate(x_test, y_test, verbose=0)
print('Test loss:', score[0])
print('Test accuracy:', score[1])
""",
    "codeExplanation": [
      {"step": 1, "lines": "1-4", "code": "from keras.models import Sequential\nfrom keras.layers import Conv2D, MaxPooling2D, Flatten, Dense", "title": "Imports", "explanation": "Imports 2D convolution, pooling, flattening, and dense layer primitives."},
      {"step": 2, "lines": "6-11", "code": "x_train = x_train.reshape(-1, 28, 28, 1) / 255.0\ny_train = keras.utils.to_categorical(y_train, 10)", "title": "4D Reshaping", "explanation": "Reshapes images to include channel dimension and one-hot encodes targets."},
      {"step": 3, "lines": "13-21", "code": "model = Sequential([\n    Conv2D(32, (3,3), activation='relu'),\n    MaxPooling2D((2,2)),\n    Conv2D(64, (3,3), activation='relu'),\n    MaxPooling2D((2,2)),\n    Flatten(),\n    Dense(128, activation='relu'),\n    Dense(10, activation='softmax')\n])", "title": "2-Layer CNN Pipeline", "explanation": "Defines two stages of Conv2D + MaxPool2D followed by classification head."},
      {"step": 4, "lines": "23-27", "code": "model.compile(loss='categorical_crossentropy', optimizer='adam')\nmodel.fit(x_train, y_train, epochs=10)\nmodel.evaluate(x_test, y_test)", "title": "Training & Scoring", "explanation": "Compiles with Adam and trains for 10 epochs, reaching ~99% accuracy on MNIST."}
    ],
    "exercises": [
      {"id": "ex-5-1", "title": "Visualize Learned Feature Maps", "task": "Extract activations of the first Conv2D layer for a test digit and plot all 32 filters.", "expectedOutcome": "Filters visibly highlight horizontal edges, vertical boundaries, and diagonal stroke intersections."},
      {"id": "ex-5-2", "title": "Train on CIFAR-10", "task": "Modify input_shape to (32, 32, 3) and evaluate on CIFAR-10.", "expectedOutcome": "Reaches ~70% accuracy, vastly outperforming dense feedforward networks (~50%)."},
      {"id": "ex-5-3", "title": "Inspect Parameter Efficiency", "task": "Compare total parameters of 2-layer CNN vs equivalent dense network.", "expectedOutcome": "CNN achieves higher accuracy with 90% fewer parameters."}
    ],
    "commonErrors": [
      {"error": "ValueError: expected conv2d_input to have 4 dimensions, but got array with shape (28, 28)", "cause": "Missing channel dimension in input tensor.", "solution": "Use x.reshape(-1, 28, 28, 1) or np.expand_dims(x, axis=-1)."},
      {"error": "Negative dimension size in Conv2D", "cause": "Too many unpadded conv/pooling layers shrinking spatial size below 1x1.", "solution": "Use padding='same' or reduce pooling operations."}
    ],
    "advancedChallenges": ["Implement 2D convolution from scratch using NumPy sliding window stride tricks.", "Compute class activation maps (Grad-CAM) to visualize what regions the CNN focuses on."],
    "summary": ["CNNs preserve 2D image topology via local sliding weight filters.", "Parameter sharing drastically reduces parameter count vs dense networks.", "Max pooling downsamples spatial size and confers translation invariance.", "2-layer CNN reaches ~99% on MNIST and ~70% on CIFAR-10."],
    "defaultDataset": "mnist"
  },

  # 6: CNN with 4+ Conv Layers
  {
    "id": 6, "week": 6, "title": "CNN with Four or More Convolution Layers (CPU vs GPU)",
    "tagline": "Deep Feature Hierarchies, Epoch Benchmarks & Hardware Acceleration", "category": "CNN Architecture",
    "aim": "Design and implement a CNN model (with 4+ layers of convolutions) to classify multi category image datasets. Use the MNIST, Fashion MNIST, CIFAR-10 datasets. Set the No. of Epoch as 5, 10 and 20. Record the accuracy corresponding to the number of epochs. Record the time required to run the program, using CPU as well as using GPU in Colab.",
    "objectives": [
      "Construct a deep convolutional architecture with at least four convolution layers.",
      "Track epoch-wise accuracy and loss progression across 5, 10, and 20 epochs.",
      "Benchmark execution time on CPU vs GPU (NVIDIA T4 in Google Colab).",
      "Analyze hierarchical feature extraction across deeper layers (edges -> motifs -> object parts).",
      "Evaluate on Fashion MNIST clothing categories and analyze class confusion."
    ],
    "prerequisites": ["Deep convolutional architectures", "GPU hardware acceleration principles (CUDA)", "Model performance benchmarking"],
    "concept": "Stacking 4 or more convolution layers creates a deep feature hierarchy where early layers extract low-level spatial primitives (edges, color gradients), intermediate layers compose them into geometric motifs (stripes, corners), and deep layers recognize high-level semantic object components (sleeves, collars, shoe soles). Because deep convolutions require billions of floating-point operations (FLOPs), training on a CPU is computationally bottlenecked. GPUs, with thousands of specialized SIMD arithmetic cores and high-bandwidth VRAM, accelerate tensor matrix convolutions by 8x to 15x.",
    "mathFormulas": [
      {"name": "Effective Receptive Field", "formula": "R_{k} = R_{k-1} + (F_k - 1) \\times \\prod_{i=1}^{k-1} S_i", "description": "Computes cumulative receptive field covering input pixels across k stacked layers."},
      {"name": "FLOPs for 2D Convolution", "formula": "\\text{FLOPs} = 2 \\times H_{\\text{out}} \\times W_{\\text{out}} \\times (C_{\\text{in}} \\times F^2) \\times C_{\\text{out}}", "description": "Calculates total floating point operations per convolutional forward pass."}
    ],
    "architecture": {
      "title": "4-Layer Deep Convolutional Architecture",
      "summary": "Conv2D(32) -> Conv2D(32) -> MaxPool -> Conv2D(64) -> Conv2D(64) -> MaxPool -> Flatten -> Dense(256) -> Dense(10).",
      "layers": ["Input: (28, 28, 1)", "Conv1: 32 filters (3x3, ReLU) -> (26, 26, 32)", "Conv2: 32 filters (3x3, ReLU) -> (24, 24, 32)", "MaxPool1: (2, 2) -> (12, 12, 32)", "Conv3: 64 filters (3x3, ReLU) -> (10, 10, 64)", "Conv4: 64 filters (3x3, ReLU) -> (8, 8, 64)", "MaxPool2: (2, 2) -> (4, 4, 64)", "Flatten: 1,024 units", "Dense: 256 units (ReLU)", "Output: 10 units (Softmax)"]
    },
    "algorithm": [
      "1. Load Fashion MNIST dataset (60k train, 10k test 28x28 grayscale images).",
      "2. Normalize pixel intensities to [0.0, 1.0] and reshape to (N, 28, 28, 1).",
      "3. Construct 4-layer CNN with two conv blocks separated by max pooling.",
      "4. Compile with categorical crossentropy and Adam optimizer.",
      "5. Benchmark execution: train for 5 epochs on CPU; record elapsed time and test accuracy.",
      "6. Train for 10 epochs on CPU; record elapsed time and accuracy.",
      "7. Train for 20 epochs on CPU; record elapsed time and accuracy.",
      "8. Execute the identical program in Google Colab with GPU enabled (NVIDIA T4); record times.",
      "9. Plot CPU vs GPU runtime bar chart and epoch-wise accuracy curves."
    ],
    "datasetInfo": {
      "name": "Fashion MNIST", "source": "Zalando Research (Xiao, Rasul, & Vollgraf 2017)",
      "sampleCount": "70,000 28x28 grayscale images",
      "features": ["784 grayscale pixels arranged in 28x28 grid"],
      "target": "10 apparel categories: T-shirt, Trouser, Pullover, Dress, Coat, Sandal, Shirt, Sneaker, Bag, Ankle boot",
      "description": "More challenging drop-in replacement for MNIST with realistic fabric textures and silhouette ambiguities."
    },
    "prescribedCode": """import time
from keras.datasets import fashion_mnist
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
import keras

(x_train, y_train), (x_test, y_test) = fashion_mnist.load_data()
x_train = x_train.reshape(-1, 28, 28, 1).astype('float32') / 255.0
x_test = x_test.reshape(-1, 28, 28, 1).astype('float32') / 255.0
y_train = keras.utils.to_categorical(y_train, 10)
y_test = keras.utils.to_categorical(y_test, 10)

def build_4layer_cnn():
    return Sequential([
        Conv2D(32, (3,3), activation='relu', input_shape=(28,28,1)),
        Conv2D(32, (3,3), activation='relu'),
        MaxPooling2D((2,2)),
        Conv2D(64, (3,3), activation='relu'),
        Conv2D(64, (3,3), activation='relu'),
        MaxPooling2D((2,2)),
        Flatten(),
        Dense(256, activation='relu'),
        Dense(10, activation='softmax')
    ])

for ep in [5, 10, 20]:
    model = build_4layer_cnn()
    model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
    start = time.time()
    model.fit(x_train, y_train, epochs=ep, batch_size=128, verbose=0)
    elapsed = time.time() - start
    _, acc = model.evaluate(x_test, y_test, verbose=0)
    print(f"Epochs: {ep:2d} | Time: {elapsed:6.2f}s | Test Accuracy: {acc*100:.2f}%")
""",
    "codeExplanation": [
      {"step": 1, "lines": "1-6", "code": "import time\nfrom keras.datasets import fashion_mnist\nfrom keras.models import Sequential", "title": "Imports", "explanation": "Imports timing library, Fashion MNIST loader, and Sequential layers."},
      {"step": 2, "lines": "8-12", "code": "x_train = x_train.reshape(-1, 28, 28, 1) / 255.0\ny_train = keras.utils.to_categorical(y_train, 10)", "title": "Data Prep", "explanation": "Normalizes 60,000 fashion clothing images and one-hot encodes labels."},
      {"step": 3, "lines": "14-25", "code": "def build_4layer_cnn():\n    return Sequential([\n        Conv2D(32, (3,3), activation='relu'),\n        Conv2D(32, (3,3), activation='relu'),\n        MaxPooling2D((2,2)),\n        Conv2D(64, (3,3), activation='relu'),\n        Conv2D(64, (3,3), activation='relu'),\n        MaxPooling2D((2,2)),\n        Flatten(), Dense(256), Dense(10)\n    ])", "title": "4-Layer Architecture", "explanation": "Constructs 4 convolutional layers organized in two 2-conv blocks."},
      {"step": 4, "lines": "27-34", "code": "for ep in [5, 10, 20]:\n    start = time.time()\n    model.fit(epochs=ep)\n    elapsed = time.time() - start", "title": "Benchmark Loop", "explanation": "Iterates across epochs 5, 10, 20, measuring wall-clock execution time and accuracy."}
    ],
    "exercises": [
      {"id": "ex-6-1", "title": "Colab GPU Benchmark", "task": "Run the program in Google Colab with GPU runtime enabled and compare execution times.", "expectedOutcome": "GPU executes 20 epochs in ~8.3 seconds vs ~71.4 seconds on CPU (~8.6x acceleration)."},
      {"id": "ex-6-2", "title": "Plot Confusion Matrix", "task": "Generate a confusion matrix for the 20-epoch model on Fashion MNIST.", "expectedOutcome": "Highest confusion observed between Pullover, Coat, and Shirt due to similar torso shapes."},
      {"id": "ex-6-3", "title": "Evaluate Overfitting at Epoch 20", "task": "Compare training loss vs validation loss across all 20 epochs.", "expectedOutcome": "Training loss keeps falling to ~0.08 while validation loss begins rising after epoch 12."}
    ],
    "commonErrors": [
      {"error": "ResourceExhaustedError: OOM on GPU", "cause": "Batch size too large for GPU VRAM.", "solution": "Reduce batch_size from 256 to 64 or 32."},
      {"error": "TensorFlow not utilizing GPU in Colab", "cause": "Colab runtime type was set to CPU.", "solution": "Navigate to Runtime -> Change runtime type -> select T4 GPU."}
    ],
    "advancedChallenges": ["Implement learning rate warm-up and cosine annealing decay across 20 epochs.", "Profile kernel execution times using TensorFlow Profiler to detect bottlenecks."],
    "summary": ["4+ layer CNNs learn rich hierarchical feature representations.", "Accuracy increases from 88% (epoch 5) to ~93% (epoch 20).", "GPUs accelerate deep CNN training by 8x to 15x over multi-core CPUs.", "Epoch 20 begins to show mild overfitting without regularization."],
    "defaultDataset": "fashion_mnist"
  },

  # 7: Padding and Batch Normalization
  {
    "id": 7, "week": 7, "title": "Padding and Batch Normalization",
    "tagline": "Spatial Dimension Preservation, Internal Covariate Shift & Training Stability", "category": "Optimization",
    "aim": "Design and implement a CNN model (with 2+ layers of convolutions) to classify multi category image datasets. Use the concept of padding and Batch Normalization while designing the CNN model. Record the accuracy corresponding to the number of epochs. Use the Fashion MNIST datasets.",
    "objectives": [
      "Understand the mathematical difference between VALID and SAME padding.",
      "Calculate spatial output dimensions using W_out = floor((W - F + 2P)/S) + 1.",
      "Explain how Batch Normalization eliminates Internal Covariate Shift.",
      "Analyze the role of learnable scale (gamma) and shift (beta) parameters.",
      "Compare training convergence speed and stability with and without Batch Normalization."
    ],
    "prerequisites": ["Batch statistics (mean and variance)", "Convolution spatial dimension formulas", "Gradient vanishing and exploding mechanisms"],
    "concept": "Valid convolution causes spatial feature maps to shrink by (F - 1) pixels per layer, eroding boundary information. 'SAME' padding adds zero-padding around the image perimeter so that output spatial dimensions equal input dimensions (W_out = W when S=1). Batch Normalization (Ioffe & Szegedy 2015) normalizes layer inputs across the mini-batch to zero mean and unit variance, followed by a learnable affine scale (gamma) and shift (beta). This stabilizes activation distributions, eliminates Internal Covariate Shift, allows significantly higher learning rates, accelerates convergence by 3x-5x, and imparts a mild regularizing effect.",
    "mathFormulas": [
      {"name": "Batch Normalization Step", "formula": "\\hat{x}_i = \\frac{x_i - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}}, \\quad y_i = \\gamma \\hat{x}_i + \\beta", "description": "Normalizes activations across mini-batch B, then applies learnable scale gamma and shift beta."},
      {"name": "SAME Padding Formula", "formula": "P = \\left\\lceil \\frac{(W - 1)S + F - W}{2} \\right\\rceil", "description": "Computes exact symmetric zero-padding needed to preserve spatial dimension."},
      {"name": "Running Moving Average at Inference", "formula": "\\mu_{\\text{run}} \\leftarrow (1 - m) \\mu_{\\text{run}} + m \\mu_B", "description": "Accumulates exponential running mean during training for deterministic test evaluation."}
    ],
    "architecture": {
      "title": "CNN with SAME Padding and Batch Normalization",
      "summary": "Conv2D(32, 3x3, same) -> BatchNorm -> Conv2D(64, 3x3, same) -> BatchNorm -> MaxPool -> Dense(128) -> BatchNorm -> Softmax.",
      "layers": ["Input: (28, 28, 1)", "Conv2D: 32 filters (3x3, SAME padding) -> (28, 28, 32)", "BatchNormalization()", "Conv2D: 64 filters (3x3, SAME padding) -> (28, 28, 64)", "BatchNormalization()", "MaxPooling2D((2,2)) -> (14, 14, 64)", "Flatten: 12,544 units", "Dense: 128 units (ReLU)", "BatchNormalization()", "Output: 10 units (Softmax)"]
    },
    "algorithm": [
      "1. Load Fashion MNIST dataset, normalize pixel intensities to [0, 1].",
      "2. Calculate theoretical dimensions for VALID vs SAME padding using spatial formula.",
      "3. Construct Model A (Baseline without Batch Normalization).",
      "4. Construct Model B (Identical architecture with BatchNormalization added after conv layers).",
      "5. Compile both models with identical Adam optimizer (learning rate 0.005).",
      "6. Train both models for 15 epochs; log epoch loss and validation accuracy.",
      "7. Plot loss curves side-by-side to observe convergence speed and oscillation reduction.",
      "8. Verify that Model B converges to >90% accuracy in fewer epochs with smoother loss trajectory."
    ],
    "datasetInfo": {
      "name": "Fashion MNIST", "source": "Zalando Research",
      "sampleCount": "70,000 28x28 grayscale clothing images",
      "features": ["28x28 grayscale normalized tensors"],
      "target": "10 clothing categories",
      "description": "Apparel dataset used to test training stabilization and spatial border preservation."
    },
    "prescribedCode": """from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, BatchNormalization
from keras.datasets import fashion_mnist
import keras

(x_train, y_train), (x_test, y_test) = fashion_mnist.load_data()
x_train = x_train.reshape(-1, 28, 28, 1).astype('float32') / 255.0
x_test = x_test.reshape(-1, 28, 28, 1).astype('float32') / 255.0
y_train = keras.utils.to_categorical(y_train, 10)
y_test = keras.utils.to_categorical(y_test, 10)

model = Sequential([
    Conv2D(32, (3, 3), padding='same', activation='relu', input_shape=(28, 28, 1)),
    BatchNormalization(),
    Conv2D(64, (3, 3), padding='same', activation='relu'),
    BatchNormalization(),
    MaxPooling2D((2, 2)),
    Flatten(),
    Dense(128, activation='relu'),
    BatchNormalization(),
    Dense(10, activation='softmax')
])

model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
history = model.fit(x_train, y_train, epochs=10, batch_size=64, validation_data=(x_test, y_test))
""",
    "codeExplanation": [
      {"step": 1, "lines": "1-3", "code": "from keras.models import Sequential\nfrom keras.layers import Conv2D, BatchNormalization, MaxPooling2D", "title": "Imports", "explanation": "Imports BatchNormalization layer along with standard convolution and pooling layers."},
      {"step": 2, "lines": "12-16", "code": "Conv2D(32, (3,3), padding='same', activation='relu'),\nBatchNormalization(),\nConv2D(64, (3,3), padding='same', activation='relu'),\nBatchNormalization(),", "title": "Padding & Normalization", "explanation": "Applies padding='same' to preserve 28x28 dimensions and normalizes activations after each conv layer."},
      {"step": 3, "lines": "18-21", "code": "Dense(128, activation='relu'),\nBatchNormalization(),\nDense(10, activation='softmax')", "title": "Dense Head Normalization", "explanation": "Applies BatchNormalization before the final classification output layer."},
      {"step": 4, "lines": "24-25", "code": "model.compile(loss='categorical_crossentropy', optimizer='adam')\nmodel.fit(epochs=10)", "title": "Training", "explanation": "Trains for 10 epochs with stable, rapid convergence."}
    ],
    "exercises": [
      {"id": "ex-7-1", "title": "Compare Loss Convergence Curves", "task": "Train with and without Batch Normalization; plot loss curves on same graph.", "expectedOutcome": "Model with BN reaches 90% accuracy in ~4 epochs vs ~11 epochs without BN, with lower jitter."},
      {"id": "ex-7-2", "title": "Test High Learning Rate", "task": "Set learning rate to 0.05 on both models.", "expectedOutcome": "Model without BN diverges to NaN; Model with BN trains stably."},
      {"id": "ex-7-3", "title": "Inspect Non-Trainable Parameters", "task": "Print model.summary() and count trainable vs non-trainable weights in BN layers.", "expectedOutcome": "Shows 4 parameters per channel: 2 trainable (gamma, beta) and 2 non-trainable (moving mean, variance)."}
    ],
    "commonErrors": [
      {"error": "BatchNormalization fails with batch_size=1", "cause": "Sample variance cannot be computed for a single sample.", "solution": "Ensure batch_size >= 8 during training."},
      {"error": "BN placed after activation instead of before", "cause": "Suboptimal placement order.", "solution": "Place BN immediately after Conv2D and before ReLU (or use Conv2D without activation, followed by BN, followed by Activation('relu'))."}
    ],
    "advancedChallenges": ["Implement Layer Normalization and compare with Batch Normalization on small batches.", "Fold learned BN gamma and beta weights directly into Conv2D kernels for zero inference overhead."],
    "summary": ["SAME padding preserves spatial dimensions; VALID padding shrinks them by F-1.", "Batch Normalization normalizes activations to zero mean and unit variance per channel.", "Eliminates Internal Covariate Shift and enables higher learning rates.", "Accelerates convergence by ~3x and smooths the loss landscape."],
    "defaultDataset": "fashion_mnist"
  },

  # 8: Regularization and Dropout
  {
    "id": 8, "week": 8, "title": "Regularization and Dropout",
    "tagline": "L1 Lasso, L2 Ridge, Inverted Dropout & Overfitting Mitigation", "category": "Optimization",
    "aim": "Design and implement a CNN model (with 4+ layers of convolutions) to classify multi category image datasets. Use the concept of regularization and dropout while designing the CNN model. Use the Fashion MNIST datasets. Record the Training accuracy and Test accuracy corresponding to the following architectures:\na. Base Model\nb. Model with L1 Regularization\nc. Model with L2 Regularization\nd. Model with Dropout\ne. Model with both L2 (or L1) and Dropout",
    "objectives": [
      "Understand the mathematical principles of L1 (Lasso) and L2 (Ridge) weight regularization.",
      "Implement Srivastava's Inverted Dropout (2014) to break neuron co-adaptation.",
      "Train and record Train vs Test accuracies across all 5 prescribed architectures on Fashion MNIST.",
      "Quantify the Generalization Gap (Train Acc - Test Acc) for each model variant.",
      "Identify optimal hyperparameter combinations that minimize overfitting without underfitting."
    ],
    "prerequisites": ["Overfitting and generalization error", "Lp norms and constrained optimization", "Ensemble learning principles"],
    "concept": "Overparameterized deep CNNs easily overfit by memorizing individual training instances rather than discovering general visual manifolds, causing high training accuracy but poor test performance. L1 regularization adds the sum of absolute weights (lambda * |w|) to the loss, driving non-essential weights to exact zero (sparsity). L2 regularization adds the sum of squared weights (lambda * w^2), continuously decaying large weights toward zero. Dropout randomly deactivates a fraction p of neurons during each training step, preventing co-adaptation and forcing the network to learn redundant, distributed representations. At test time, dropout is deactivated, functioning as an ensemble average over 2^N thinned subnetworks.",
    "mathFormulas": [
      {"name": "L1 (Lasso) Regularized Loss", "formula": "\\mathcal{L}_{\\text{L1}} = \\mathcal{L}_0 + \\lambda_1 \\sum_{w} |w|", "description": "Penalizes absolute weight magnitudes, inducing sparse weight tensors."},
      {"name": "L2 (Ridge / Weight Decay) Loss", "formula": "\\mathcal{L}_{\\text{L2}} = \\mathcal{L}_0 + \\frac{1}{2} \\lambda_2 \\sum_w w^2", "description": "Continuously shrinks weights toward zero via weight decay update w -> (1 - eta*lambda)*w."},
      {"name": "Inverted Dropout Forward Pass", "formula": "r_j \\sim \\text{Bernoulli}(1 - p), \\quad \\tilde{a}_j = \\frac{r_j \\cdot a_j}{1 - p}", "description": "Applies binary mask r and scales active units by 1/(1-p) during training."}
    ],
    "architecture": {
      "title": "5 Comparative Architectures for Fashion MNIST",
      "summary": "a) Base Model; b) L1(0.01); c) L2(0.01); d) Dropout(0.5); e) L2(0.01) + Dropout(0.5).",
      "layers": ["Conv Block 1: Conv2D(64, 3x3) -> Conv2D(64, 3x3) -> MaxPool", "Conv Block 2: Conv2D(128, 3x3) -> Conv2D(128, 3x3) -> MaxPool", "Dense Head: Dense(256) -> Dense(10, Softmax)", "Regularization Variants: L1 vs L2 vs Dropout vs L2+Dropout"]
    },
    "algorithm": [
      "1. Load Fashion MNIST dataset, normalize to [0, 1].",
      "2. Build and train Model A (Base CNN without regularization) for 15 epochs.",
      "3. Build and train Model B with kernel_regularizer=l1(0.01) on conv and dense layers.",
      "4. Build and train Model C with kernel_regularizer=l2(0.01) on conv and dense layers.",
      "5. Build and train Model D with Dropout(0.5) added before dense layer.",
      "6. Build and train Model E combining L2(0.01) and Dropout(0.5).",
      "7. Record Training Accuracy, Test Accuracy, and Generalization Gap for all 5 models.",
      "8. Plot comparative grouped bar chart showing Train vs Test performance across all 5 models."
    ],
    "datasetInfo": {
      "name": "Fashion MNIST", "source": "Zalando Research",
      "sampleCount": "70,000 images (60k train, 10k test)", "features": ["28x28 grayscale clothing silhouettes"],
      "target": "10 clothing categories",
      "description": "Apparel dataset used for rigorous overfitting and generalization benchmark comparison."
    },
    "prescribedCode": """import keras
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from keras.regularizers import l1, l2
from keras.datasets import fashion_mnist

(x_train, y_train), (x_test, y_test) = fashion_mnist.load_data()
x_train = x_train.reshape(-1, 28, 28, 1).astype('float32') / 255.0
x_test = x_test.reshape(-1, 28, 28, 1).astype('float32') / 255.0
y_train = keras.utils.to_categorical(y_train, 10)
y_test = keras.utils.to_categorical(y_test, 10)

# Model e: L2 Regularization + Dropout
model_e = Sequential([
    Conv2D(64, (3,3), activation='relu', kernel_regularizer=l2(0.01), input_shape=(28,28,1)),
    MaxPooling2D((2,2)),
    Conv2D(128, (3,3), activation='relu', kernel_regularizer=l2(0.01)),
    MaxPooling2D((2,2)),
    Flatten(),
    Dense(256, activation='relu', kernel_regularizer=l2(0.01)),
    Dropout(0.5),
    Dense(10, activation='softmax')
])

model_e.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
model_e.fit(x_train, y_train, epochs=10, batch_size=64, validation_data=(x_test, y_test))
""",
    "codeExplanation": [
      {"step": 1, "lines": "1-5", "code": "from keras.layers import Dropout\nfrom keras.regularizers import l1, l2", "title": "Imports", "explanation": "Imports Dropout layer and L1/L2 regularizers."},
      {"step": 2, "lines": "14-22", "code": "Conv2D(64, (3,3), kernel_regularizer=l2(0.01)),\nMaxPooling2D((2,2)),\nFlatten(),\nDense(256, kernel_regularizer=l2(0.01)),\nDropout(0.5),", "title": "L2 + Dropout Pipeline", "explanation": "Attaches L2 penalty to kernel weights and applies 50% neuron deactivation via Dropout."},
      {"step": 3, "lines": "25-27", "code": "model_e.compile(loss='categorical_crossentropy', optimizer='adam')\nmodel_e.fit(epochs=10)", "title": "Training & Scoring", "explanation": "Trains regularized model, observing minimal generalization gap between train and val."}
    ],
    "exercises": [
      {"id": "ex-8-1", "title": "Record All 5 Model Accuracies", "task": "Run models a, b, c, d, e and compile a comparison table of Train Acc vs Test Acc.", "expectedOutcome": "Base model overfits (96.5% train, 88.1% test, gap 8.4%); Model e achieves 89.6% train, 89.5% test, gap ~0.1%."},
      {"id": "ex-8-2", "title": "Vary Dropout Rates", "task": "Test Dropout rates 0.1, 0.5, and 0.9 on Model d.", "expectedOutcome": "rate=0.1 has mild effect; rate=0.5 gives optimal generalization; rate=0.9 causes underfitting."},
      {"id": "ex-8-3", "title": "Visualize Zero Weights in L1", "task": "Extract weight histograms of L1 model and count exact zero weights.", "expectedOutcome": "L1 model has ~30-40% of weights driven to exact zero (sparsity)."}
    ],
    "commonErrors": [
      {"error": "Dropout placed on Softmax layer", "cause": "Zeros out output class probabilities.", "solution": "Place Dropout only before the final classification layer."},
      {"error": "Model underfitting with L1(0.1)", "cause": "Regularization coefficient lambda is set too high.", "solution": "Lower lambda to 0.01, 0.001, or 1e-4."}
    ],
    "advancedChallenges": ["Implement Monte Carlo Dropout at test time to compute prediction uncertainty distributions.", "Compare standard L2 in Adam against decoupled weight decay in AdamW (Loshchilov & Hutter 2019)."],
    "summary": ["Overfitting creates a wide gap between training and testing accuracy.", "L1 regularization induces sparse zero weights.", "L2 regularization continuously shrinks weight magnitudes.", "Dropout deactivates neurons during training to break co-adaptation.", "Combining L2 + Dropout shrinks the generalization gap to ~0.1%."],
    "defaultDataset": "fashion_mnist"
  },

  # 9: Data Augmentation
  {
    "id": 9, "week": 9, "title": "Data Augmentation on a Single Image",
    "tagline": "Synthetic Dataset Multipliers, Geometric Transforms & Invariance", "category": "Augmentation",
    "aim": "Use the concept of data augmentation to increase the data size from a single image (rotation, width/height shift, shear, zoom, horizontal/vertical flip, brightness).",
    "objectives": [
      "Understand label-preserving domain transformations in computer vision.",
      "Implement Keras ImageDataGenerator with rotation, shifts, shear, zoom, and flips.",
      "Generate and visualize multiple diverse synthetic variations from a single input photo.",
      "Explain how data augmentation acts as an implicit regularizer for limited-data regimes.",
      "Analyze valid vs invalid augmentation operations (e.g. why vertical flips corrupt digits)."
    ],
    "prerequisites": ["Affine geometric transformations", "Image interpolation and boundary fill modes", "Keras ImageDataGenerator API"],
    "concept": "Deep learning models are notoriously data-hungry and prone to memorization when trained on limited samples. Data Augmentation artificially expands dataset size and diversity by applying label-preserving affine transformations to existing images. By introducing rotations (up to 40 degrees), horizontal reflections, spatial width/height shifts (20%), zoom perturbations (0.8x to 1.2x), shear distortions, and brightness modulations, data augmentation forces convolutional kernels to learn invariant features (such as contour geometry) rather than memorizing absolute pixel coordinates. When newly exposed borders are created by rotations, fill modes like 'nearest' replicate perimeter pixels.",
    "mathFormulas": [
      {"name": "2D Affine Transformation Matrix", "formula": "\\begin{bmatrix} x' \\\\ y' \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} s_x \\cos\\theta & -\\sin(\\theta + \\phi) & t_x \\\\ \\sin(\\theta) & s_y \\cos(\\theta - \\phi) & t_y \\\\ 0 & 0 & 1 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\\\ 1 \\end{bmatrix}", "description": "Unified matrix combining rotation theta, shear phi, scale s, and translation t."},
      {"name": "Brightness Modulation", "formula": "I_{\\text{aug}}(x, y) = \\text{clip}(\\alpha \\cdot I(x, y) + \\beta, 0, 255)", "description": "Modulates lighting contrast alpha and brightness offset beta."}
    ],
    "architecture": {
      "title": "Data Augmentation Pipeline",
      "summary": "1 Single Input Image -> ImageDataGenerator Transform Engine -> Flow Generator -> N Diverse Augmented Output Images.",
      "layers": ["Input Image (H, W, C)", "Random Rotation Engine ([-40, +40] deg)", "Horizontal Mirroring (50% prob)", "Width & Height Shift (+-20%)", "Shear & Zoom Engine ([0.8, 1.2])", "Fill Mode: 'nearest'", "Output: Batch of N Augmented Images"]
    },
    "algorithm": [
      "1. Load a single reference image (e.g. sample digit or photo) and convert to NumPy array.",
      "2. Reshape array to 4D tensor (1, H, W, C) expected by Keras.",
      "3. Instantiate ImageDataGenerator with rotation_range=40, width_shift_range=0.2, height_shift_range=0.2, shear_range=0.2, zoom_range=0.2, horizontal_flip=True, fill_mode='nearest'.",
      "4. Initialize datagen.flow() generator streaming from the single image.",
      "5. Sample batches of transformed images in a loop.",
      "6. Plot a 3x3 or 4x4 visual montage showing 16 unique variations generated from the single seed image.",
      "7. Verify that semantic object identity is preserved despite geometric deformations."
    ],
    "datasetInfo": {
      "name": "Single Reference Image", "source": "User upload / Lab Manual Sample",
      "sampleCount": "1 single image expanded into infinite synthetic variations",
      "features": ["RGB or Grayscale pixels (H, W, C)"],
      "target": "Preserved ground truth label",
      "description": "Demonstrates dataset multiplication from a single sample for scarce data domains."
    },
    "prescribedCode": """from keras.preprocessing.image import ImageDataGenerator, img_to_array, load_img
import numpy as np
import matplotlib.pyplot as plt

datagen = ImageDataGenerator(
    rotation_range=40,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest'
)

# Load sample image
img = load_img('sample.jpg', target_size=(150, 150))
x = img_to_array(img)
x = x.reshape((1,) + x.shape)

fig, axes = plt.subplots(2, 4, figsize=(12, 6))
i = 0
for batch in datagen.flow(x, batch_size=1):
    axes[i//4, i%4].imshow(batch[0].astype('uint8'))
    axes[i//4, i%4].axis('off')
    i += 1
    if i >= 8:
        break
plt.suptitle("8 Augmented Variations Generated from 1 Single Image")
plt.tight_layout()
plt.show()
""",
    "codeExplanation": [
      {"step": 1, "lines": "1-3", "code": "from keras.preprocessing.image import ImageDataGenerator", "title": "Imports", "explanation": "Imports ImageDataGenerator for real-time tensor transformations."},
      {"step": 2, "lines": "5-13", "code": "datagen = ImageDataGenerator(\n    rotation_range=40,\n    width_shift_range=0.2,\n    shear_range=0.2,\n    zoom_range=0.2,\n    horizontal_flip=True,\n    fill_mode='nearest')", "title": "Generator Configuration", "explanation": "Configures geometric transformations and nearest-pixel boundary interpolation."},
      {"step": 3, "lines": "15-18", "code": "x = img_to_array(img)\nx = x.reshape((1,) + x.shape)", "title": "4D Tensor Expansion", "explanation": "Expands 3D image array to 4D batch tensor of shape (1, 150, 150, 3)."},
      {"step": 4, "lines": "20-29", "code": "for batch in datagen.flow(x, batch_size=1):\n    axes[i//4, i%4].imshow(batch[0].astype('uint8'))", "title": "Batch Streaming & Plotting", "explanation": "Iterates through the infinite generator, rendering 8 unique synthetic variations."}
    ],
    "exercises": [
      {"id": "ex-9-1", "title": "Test Fill Modes", "task": "Compare fill_mode='nearest', 'constant', 'reflect', and 'wrap' on a 45-degree rotated image.", "expectedOutcome": "'nearest' extends border; 'constant' leaves black borders; 'reflect' creates mirrored boundary edges."},
      {"id": "ex-9-2", "title": "Interactive Augmentation Studio", "task": "Adjust rotation, zoom, and shift sliders live in the interactive application zone.", "expectedOutcome": "Observe instant re-rendering of augmented image variations in real time."},
      {"id": "ex-9-3", "title": "Explain Label Invalidation", "task": "List 3 domains where vertical_flip=True corrupts ground truth labels.", "expectedOutcome": "Handwritten digits (6 vs 9), traffic signs (up vs down arrows), and medical chest X-rays (situs inversus)."}
    ],
    "commonErrors": [
      {"error": "ValueError: Input array must be 4D, got 3D", "cause": "Image array has shape (H, W, C) without batch dimension.", "solution": "Use np.expand_dims(img, axis=0) or img.reshape((1,) + img.shape)."},
      {"error": "Black borders around rotated image", "cause": "Using fill_mode='constant' with default cval=0.", "solution": "Switch to fill_mode='nearest' or 'reflect'."}
    ],
    "advancedChallenges": ["Implement Cutout and Mixup augmentation routines using NumPy.", "Use Albumentations to apply advanced optical distortion and motion blur."],
    "summary": ["Data Augmentation creates diverse label-preserving synthetic variations.", "Acts as an essential regularizer for small datasets (e.g. rare medical imaging).", "ImageDataGenerator computes transforms on-the-fly without saving to disk.", "Transformations must preserve semantic identity without inverting labels."],
    "defaultDataset": "sample.jpg"
  },

  # 10: CNN with Data Augmentation
  {
    "id": 10, "week": 10, "title": "CNN with Data Augmentation on CIFAR-10",
    "tagline": "Overcoming Overfitting on Natural Objects & On-The-Fly Generators", "category": "Augmentation",
    "aim": "Design and implement a CNN model to classify CIFAR10 image dataset. Use the concept of Data Augmentation while designing the CNN model. Record the accuracy corresponding to the number of epochs.",
    "objectives": [
      "Build a deep CNN with convolution, pooling, dropout, and dense classification head.",
      "Integrate ImageDataGenerator.flow() for real-time batch augmentation during training.",
      "Compare model training trajectories with vs without data augmentation on CIFAR-10.",
      "Demonstrate a +7% boost in validation accuracy and eliminate severe generalization gap.",
      "Analyze training loss dynamics when learning from non-stationary augmented batches."
    ],
    "prerequisites": ["CIFAR-10 32x32 color image structure", "ImageDataGenerator.flow() training integration", "Train vs validation generalization metrics"],
    "concept": "Training CNNs on complex natural color datasets like CIFAR-10 without regularization results in severe overfitting: models quickly reach 92%+ training accuracy while validation accuracy stalls around 75%, suffering a 17% generalization gap. Data augmentation introduces random horizontal flips, subtle rotations (+-15 degrees), and width/height shifts (+-10%) on-the-fly per training batch. Because the network never encounters identical duplicate images across epochs, it cannot memorize individual pixel coordinates. Consequently, training loss decreases more gradually, but test accuracy rises from ~75% to ~82.4% (+7.2% improvement), demonstrating genuine visual generalization.",
    "mathFormulas": [
      {"name": "Augmented Mini-Batch Expectation", "formula": "\\mathcal{L}_{\\text{aug}}(\\theta) = \\mathbb{E}_{(\\mathbf{x}, y) \\sim \\mathcal{D}, T \\sim \\mathcal{T}} \\left[ \\mathcal{L}(f_\\theta(T(\\mathbf{x})), y) \\right]", "description": "Minimizes expected loss over the distribution of stochastically transformed images T(x)."},
      {"name": "Generalization Gap Reduction", "formula": "\\Delta_{\\text{gap}} = |\\text{Acc}_{\\text{train}} - \\text{Acc}_{\\text{val}}| \\implies \\Delta_{\\text{no\\_aug}} \\approx 17\\%, \\quad \\Delta_{\\text{aug}} \\approx 2\\%", "description": "Quantifies the dramatic shrinkage in overfitting achieved via augmentation."}
    ],
    "architecture": {
      "title": "CIFAR-10 Deep CNN with Augmentation Pipeline",
      "summary": "Data Augmentation Flow -> Conv2D(32) -> Conv2D(32) -> MaxPool -> Dropout(0.25) -> Conv2D(64) -> Conv2D(64) -> MaxPool -> Dropout(0.25) -> Dense(512) -> Dropout(0.5) -> Softmax(10).",
      "layers": ["Input: (32, 32, 3)", "Augmentation Engine (Rotations, Flips, Shifts)", "Block 1: Conv2D(32) x2 -> MaxPool -> Dropout(0.25)", "Block 2: Conv2D(64) x2 -> MaxPool -> Dropout(0.25)", "Flatten: 2,304 units", "Dense: 512 units (ReLU) -> Dropout(0.5)", "Output: 10 units (Softmax)"]
    },
    "algorithm": [
      "1. Load CIFAR-10 dataset (50,000 train, 10,000 test 32x32 color images).",
      "2. Normalize pixel values to [0.0, 1.0] and one-hot encode 10 classes.",
      "3. Construct baseline CNN model_1 without augmentation; train for 20 epochs; record curves.",
      "4. Instantiate ImageDataGenerator(rotation_range=15, width_shift_range=0.1, height_shift_range=0.1, horizontal_flip=True).",
      "5. Fit generator statistics to training data using datagen.fit(x_train).",
      "6. Construct identical model_2 and train using model_2.fit(datagen.flow(x_train, y_train, batch_size=32), epochs=20, validation_data=(x_test, y_test)).",
      "7. Record validation accuracy progression across all 20 epochs.",
      "8. Plot side-by-side comparative curves showing validation accuracy rising from 75% to 82.4%."
    ],
    "datasetInfo": {
      "name": "CIFAR-10", "source": "Alex Krizhevsky (Canadian Institute for Advanced Research)",
      "sampleCount": "60,000 32x32 color images in 10 classes",
      "features": ["32x32 RGB pixels (3,072 features per sample)"],
      "target": "10 object categories (airplane, automobile, bird, cat, deer, dog, frog, horse, ship, truck)",
      "description": "Natural image classification benchmark with realistic background clutter and diverse orientations."
    },
    "prescribedCode": """import keras
from keras.datasets import cifar10
from keras.preprocessing.image import ImageDataGenerator
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout

(x_train, y_train), (x_test, y_test) = cifar10.load_data()
x_train = x_train.astype('float32') / 255.0
x_test = x_test.astype('float32') / 255.0
y_train = keras.utils.to_categorical(y_train, 10)
y_test = keras.utils.to_categorical(y_test, 10)

model = Sequential([
    Conv2D(32, (3,3), padding='same', activation='relu', input_shape=(32,32,3)),
    Conv2D(32, (3,3), activation='relu'),
    MaxPooling2D((2,2)),
    Dropout(0.25),
    Conv2D(64, (3,3), padding='same', activation='relu'),
    Conv2D(64, (3,3), activation='relu'),
    MaxPooling2D((2,2)),
    Dropout(0.25),
    Flatten(),
    Dense(512, activation='relu'),
    Dropout(0.5),
    Dense(10, activation='softmax')
])

model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

datagen = ImageDataGenerator(
    rotation_range=15,
    width_shift_range=0.1,
    height_shift_range=0.1,
    horizontal_flip=True
)
datagen.fit(x_train)

history = model.fit(datagen.flow(x_train, y_train, batch_size=64),
                    epochs=20, validation_data=(x_test, y_test))
""",
    "codeExplanation": [
      {"step": 1, "lines": "1-5", "code": "from keras.datasets import cifar10\nfrom keras.preprocessing.image import ImageDataGenerator", "title": "Imports", "explanation": "Imports CIFAR-10 dataset and image augmentation tools."},
      {"step": 2, "lines": "13-26", "code": "model = Sequential([\n    Conv2D(32, (3,3), padding='same'),\n    MaxPooling2D((2,2)), Dropout(0.25),\n    Conv2D(64, (3,3)), MaxPooling2D((2,2)),\n    Dense(512), Dropout(0.5), Dense(10)\n])", "title": "CNN Architecture", "explanation": "Builds 4-conv layer architecture with dropout regularizers for natural images."},
      {"step": 3, "lines": "30-36", "code": "datagen = ImageDataGenerator(rotation_range=15, horizontal_flip=True)\ndatagen.fit(x_train)", "title": "Augmentation Setup", "explanation": "Configures 15-deg rotation and horizontal reflection on CIFAR training set."},
      {"step": 4, "lines": "38-40", "code": "model.fit(datagen.flow(x_train, y_train, batch_size=64), epochs=20)", "title": "Streaming Training", "explanation": "Trains using datagen.flow() stream, achieving ~82.4% test accuracy."}
    ],
    "exercises": [
      {"id": "ex-10-1", "title": "Side-by-Side Accuracy Comparison", "task": "Train with and without augmentation for 20 epochs; plot both validation accuracy curves.", "expectedOutcome": "Augmented model reaches 82.4% validation accuracy vs 75.2% for unaugmented model (+7.2% boost)."},
      {"id": "ex-10-2", "title": "Add Random Erasing (Cutout)", "task": "Add a preprocessing function to datagen that masks random 8x8 rectangles.", "expectedOutcome": "Further improves test accuracy by +1.5% by preventing over-reliance on single patches."},
      {"id": "ex-10-3", "title": "Inspect Class-Wise Accuracies", "task": "Compute test accuracy for each of the 10 CIFAR classes.", "expectedOutcome": "Automobile and Ship achieve highest accuracy (>90%); Cat and Dog show greatest mutual confusion."}
    ],
    "commonErrors": [
      {"error": "MemoryError when fitting ImageDataGenerator", "cause": "Trying to generate millions of images in a list instead of streaming batches.", "solution": "Use datagen.flow() generator streaming dynamically per batch."},
      {"error": "model.fit_generator is deprecated in TF 2.x", "cause": "Legacy Keras method syntax.", "solution": "Use model.fit(datagen.flow(...)) directly in TensorFlow 2.x."}
    ],
    "advancedChallenges": ["Implement Mixup data augmentation and evaluate calibration error.", "Deploy GPU tensor augmentations using tf.keras.layers.RandomFlip and RandomRotation."],
    "summary": ["CIFAR-10 natural images overfit severely without regularization.", "Data augmentation introduces on-the-fly random flips, rotations, and shifts.", "Validation accuracy increases by +7.2% (from 75.2% to 82.4%).", "Overfitting gap is virtually eliminated as the network learns invariant visual features."],
    "defaultDataset": "cifar10"
  },

  # 11: LeNet-5 Architecture
  {
    "id": 11, "week": 11, "title": "LeNet-5 CNN Architecture",
    "tagline": "Yann LeCun's 1998 Seminal Architecture & Cheque Digit Recognition", "category": "CNN Architecture",
    "aim": "Implement the standard LeNet-5 CNN architecture model to classify multi-category image dataset (MNIST, Fashion MNIST) and check the accuracy.",
    "objectives": [
      "Recreate Yann LeCun's 1998 LeNet-5 architecture with strict adherence to layer topology.",
      "Understand the classic layer sequence: C1 -> S2 -> C3 -> S4 -> C5 -> F6 -> Output.",
      "Explain the historical use of Average Pooling and Tanh activations before modern ReLU.",
      "Train LeNet-5 on MNIST and Fashion MNIST and evaluate classification performance.",
      "Analyze LeNet-5's historic deployment for bank cheque digit processing at NCR ATMs."
    ],
    "prerequisites": ["Convolution and average pooling fundamentals", "History of deep learning architectures", "MNIST classification pipelines"],
    "concept": "LeNet-5, developed by Yann LeCun, Léon Bottou, Yoshua Bengio, and Patrick Haffner in 1998, is the seminal convolutional neural network that demonstrated the power of backpropagation for computer vision. Engineered specifically for commercial handwritten cheque digit recognition, it takes a 32x32 input and applies layer C1 (6 filters of 5x5), subsampling S2 (2x2 average pooling), layer C3 (16 filters of 5x5), subsampling S4 (2x2 average pooling), layer C5 (120 feature units), and fully connected layer F6 (84 units with Tanh), concluding with an output layer. With only ~60,000 trainable parameters, LeNet-5 processed millions of bank cheques daily on 1990s microprocessors, laying the bedrock for all modern deep learning vision systems.",
    "mathFormulas": [
      {"name": "LeNet-5 Subsampling (Average Pooling)", "formula": "a_j = \\tanh\\left( w_j \\cdot \\frac{1}{4} \\sum_{m=0}^1 \\sum_{n=0}^1 x_{2i+m, 2j+n} + b_j \\right)", "description": "Original LeNet subsampling: computes 2x2 average, multiplies by learned coefficient w_j, and adds bias."},
      {"name": "Scaled Tanh Activation", "formula": "f(z) = A \\tanh(S z) = 1.7159 \\tanh\\left( \\frac{2}{3} z \\right)", "description": "Original activation function chosen so that variance of activations is close to 1.0."}
    ],
    "architecture": {
      "title": "Classic LeNet-5 Architectural Specifications (LeCun 1998)",
      "summary": "Input (32x32) -> C1 (6@28x28) -> S2 (6@14x14) -> C3 (16@10x10) -> S4 (16@5x5) -> C5 (120) -> F6 (84) -> Output (10).",
      "layers": ["Input: 32x32 Grayscale Image", "C1 (Conv): 6 filters (5x5, Tanh) -> 28x28x6", "S2 (AvgPool): 2x2 window (stride 2) -> 14x14x6", "C3 (Conv): 16 filters (5x5, Tanh) -> 10x10x16", "S4 (AvgPool): 2x2 window (stride 2) -> 5x5x16", "C5 (Conv/Dense): 120 units (Tanh)", "F6 (Dense): 84 units (Tanh)", "Output: 10 units (Softmax)"]
    },
    "algorithm": [
      "1. Load MNIST dataset, normalize pixel intensities to [0.0, 1.0].",
      "2. Pad 28x28 images with 2 pixels of zeros on each side to reach LeNet's 32x32 input size (or use padding='same' on C1).",
      "3. Construct Conv2D(6, (5, 5), activation='tanh', padding='same', input_shape=(28, 28, 1)).",
      "4. Add AveragePooling2D(pool_size=(2, 2), strides=2).",
      "5. Add Conv2D(16, (5, 5), activation='tanh').",
      "6. Add AveragePooling2D(pool_size=(2, 2), strides=2).",
      "7. Add Conv2D(120, (5, 5), activation='tanh') followed by Flatten().",
      "8. Add Dense(84, activation='tanh') and Dense(10, activation='softmax').",
      "9. Compile with Adam/SGD and train for 15 epochs; verify ~98.8% test accuracy on MNIST."
    ],
    "datasetInfo": {
      "name": "MNIST & Fashion MNIST", "source": "Yann LeCun / Zalando Research",
      "sampleCount": "70,000 images each", "features": ["28x28 grayscale digits and fashion items"],
      "target": "10 classes",
      "description": "Historical handwritten digit recognition and modern clothing classification benchmarks."
    },
    "prescribedCode": """from keras.models import Sequential
from keras.layers import Conv2D, AveragePooling2D, Flatten, Dense
from keras.datasets import mnist
import keras

(x_train, y_train), (x_test, y_test) = mnist.load_data()
x_train = x_train.reshape(-1, 28, 28, 1).astype('float32') / 255.0
x_test = x_test.reshape(-1, 28, 28, 1).astype('float32') / 255.0
y_train = keras.utils.to_categorical(y_train, 10)
y_test = keras.utils.to_categorical(y_test, 10)

model = Sequential([
    Conv2D(6, (5, 5), activation='tanh', padding='same', input_shape=(28, 28, 1), name='C1'),
    AveragePooling2D((2, 2), strides=2, name='S2'),
    Conv2D(16, (5, 5), activation='tanh', name='C3'),
    AveragePooling2D((2, 2), strides=2, name='S4'),
    Conv2D(120, (5, 5), activation='tanh', name='C5'),
    Flatten(),
    Dense(84, activation='tanh', name='F6'),
    Dense(10, activation='softmax', name='Output')
])

model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
model.fit(x_train, y_train, batch_size=128, epochs=10, validation_data=(x_test, y_test))
_, acc = model.evaluate(x_test, y_test)
print(f"LeNet-5 Test Accuracy: {acc*100:.2f}%")
""",
    "codeExplanation": [
      {"step": 1, "lines": "1-5", "code": "from keras.layers import Conv2D, AveragePooling2D, Flatten, Dense", "title": "Imports", "explanation": "Imports original LeNet layers including AveragePooling2D."},
      {"step": 2, "lines": "13-22", "code": "model = Sequential([\n    Conv2D(6, (5,5), activation='tanh', padding='same'),\n    AveragePooling2D((2,2), strides=2),\n    Conv2D(16, (5,5), activation='tanh'),\n    AveragePooling2D((2,2), strides=2),\n    Conv2D(120, (5,5), activation='tanh'),\n    Flatten(),\n    Dense(84, activation='tanh'),\n    Dense(10, activation='softmax')\n])", "title": "LeNet-5 Pipeline", "explanation": "Faithfully recreates C1 -> S2 -> C3 -> S4 -> C5 -> F6 topology."},
      {"step": 3, "lines": "24-27", "code": "model.compile(loss='categorical_crossentropy', optimizer='adam')\nmodel.fit(epochs=10)\nmodel.evaluate(x_test, y_test)", "title": "Training & Testing", "explanation": "Trains for 10 epochs, achieving ~98.8% test accuracy on MNIST."}
    ],
    "exercises": [
      {"id": "ex-11-1", "title": "Modernize LeNet-5", "task": "Replace Tanh with ReLU and AveragePooling with MaxPooling. Compare convergence speed.", "expectedOutcome": "Modernized LeNet converges ~2x faster and reaches ~99.1% accuracy."},
      {"id": "ex-11-2", "title": "Train on Fashion MNIST", "task": "Train LeNet-5 on Fashion MNIST clothing items.", "expectedOutcome": "Reaches ~89.5% accuracy, proving LeNet's versatility beyond simple digits."},
      {"id": "ex-11-3", "title": "Calculate Exact Parameter Count", "task": "Compute parameters for each layer manually and compare with model.summary().", "expectedOutcome": "Manual calculation matches exactly 60,000 trainable weights."}
    ],
    "commonErrors": [
      {"error": "Dimension error in C5: input shape negative", "cause": "Not using padding='same' on C1 for 28x28 inputs causes spatial size to shrink too fast.", "solution": "Set padding='same' on C1 or add ZeroPadding2D((2,2))."},
      {"error": "Slow training when using SGD without momentum", "cause": "Tanh activations combined with un-accelerated SGD suffer from gradient plateaus.", "solution": "Use Adam or SGD with momentum=0.9."}
    ],
    "advancedChallenges": ["Recreate the original non-contiguous connection scheme of C3 (connecting subsets of S2 maps).", "Quantize LeNet-5 to 8-bit integers (int8) and benchmark on an embedded microcontroller."],
    "summary": ["LeNet-5 (1998) is the seminal CNN that launched commercial computer vision.", "Used 5x5 filters, average pooling, and scaled Tanh activations.", "Contains only ~60,000 parameters yet reaches ~98.8% accuracy on MNIST.", "Formed the architectural foundation for AlexNet, VGG, and modern vision models."],
    "defaultDataset": "mnist"
  },

  # 12: VGG-16 and VGG-19
  {
    "id": 12, "week": 12, "title": "VGG-16 and VGG-19 CNN Architectures",
    "tagline": "Transfer Learning, Deep 3x3 Stacks & Large-Scale Visual Recognition", "category": "CNN Architecture",
    "aim": "Implement the standard VGG-16 & 19 CNN architecture model to classify multi category image dataset (Cats vs Dogs / CIFAR-10) and check the accuracy.",
    "objectives": [
      "Understand the VGGNet philosophy: replacing large filters with deep stacks of 3x3 convolutions.",
      "Prove the receptive field equivalence: two 3x3 layers equal a 5x5; three 3x3 layers equal a 7x7.",
      "Implement Transfer Learning with pre-trained ImageNet weights on VGG-16.",
      "Freeze convolutional feature extractor base and train a custom classification head.",
      "Fine-tune top convolutional blocks (Block 5) with a reduced learning rate."
    ],
    "prerequisites": ["Transfer learning and domain adaptation", "Pre-trained ImageNet weights", "Feature extraction vs fine-tuning"],
    "concept": "VGGNet (Simonyan & Zisserman, Oxford 2014) revolutionized computer vision by proving that network depth using simple, uniform 3x3 convolution filters is key to visual recognition. Stacking two 3x3 convolutions gives an effective receptive field of 5x5, while three 3x3 convolutions span 7x7, but with 45% fewer parameters and three non-linear ReLU activations instead of one. In Transfer Learning, pre-trained VGG-16 weights (learned from 1.4 million ImageNet photos) are reused as a universal feature extractor. By freezing the convolutional backbone (layer.trainable = False) and training only a new dense head, deep models achieve 97%+ accuracy on custom datasets in minutes without massive training data.",
    "mathFormulas": [
      {"name": "Stack Parameter Savings", "formula": "\\frac{3 \\times (3^2 C^2)}{1 \\times (7^2 C^2)} = \\frac{27 C^2}{49 C^2} \\approx 55.1\\% \\implies 44.9\\% \\text{ parameter reduction}", "description": "Mathematical proof that three 3x3 conv layers use 45% fewer weights than one 7x7 layer."},
      {"name": "Receptive Field Expansion", "formula": "R_3 = 1 + 3 \\times (3 - 1) = 7 \\implies 7 \\times 7 \\text{ effective field}", "description": "Cumulative receptive field of 3 stacked 3x3 convolution layers."}
    ],
    "architecture": {
      "title": "VGG-16 vs VGG-19 Structural Comparison",
      "summary": "VGG-16 (13 conv + 3 dense = 16 layers, 138M params); VGG-19 (16 conv + 3 dense = 19 layers, 144M params).",
      "layers": ["Input: 224x224x3 RGB", "Block 1: Conv2D(64) x2 -> MaxPool", "Block 2: Conv2D(128) x2 -> MaxPool", "Block 3: Conv2D(256) x3 (x4 in VGG-19) -> MaxPool", "Block 4: Conv2D(512) x3 (x4 in VGG-19) -> MaxPool", "Block 5: Conv2D(512) x3 (x4 in VGG-19) -> MaxPool", "Flatten -> Dense(4096) -> Dense(4096) -> Dense(1000)"]
    },
    "algorithm": [
      "1. Load pre-trained VGG16 with weights='imagenet' and include_top=False.",
      "2. Freeze all convolutional layers by setting layer.trainable = False.",
      "3. Construct custom classification head: Flatten() -> Dense(256, activation='relu') -> Dropout(0.5) -> Dense(2, activation='softmax').",
      "4. Connect pre-trained backbone output to custom head using Functional API: Model(inputs=base.input, outputs=pred).",
      "5. Preprocess input images using keras.applications.vgg16.preprocess_input.",
      "6. Phase 1 (Feature Extraction): Train classification head for 5 epochs with Adam (lr=1e-3).",
      "7. Phase 2 (Fine-Tuning): Unfreeze Block 5 convolutional layers; recompile with tiny learning rate (lr=1e-5).",
      "8. Train for 5 additional epochs; evaluate test accuracy on target dataset."
    ],
    "datasetInfo": {
      "name": "Kaggle Cats vs Dogs / CIFAR-10", "source": "ImageNet / Kaggle",
      "sampleCount": "25,000 photographic color images",
      "features": ["224x224x3 RGB photographic color images"],
      "target": "Binary (Cat, Dog) or 10 visual categories",
      "description": "Photographic object classification benchmark demonstrating transfer learning efficiency."
    },
    "prescribedCode": """from keras.applications.vgg16 import VGG16, preprocess_input
from keras.models import Model
from keras.layers import Dense, Flatten, Dropout
import numpy as np

# Load pre-trained VGG-16 backbone
base_model = VGG16(weights='imagenet', include_top=False, input_shape=(224, 224, 3))

# Freeze convolutional backbone
for layer in base_model.layers:
    layer.trainable = False

# Attach custom classification head
x = Flatten()(base_model.output)
x = Dense(256, activation='relu')(x)
x = Dropout(0.5)(x)
predictions = Dense(2, activation='softmax')(x)

model = Model(inputs=base_model.input, outputs=predictions)
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
print("Total parameters:", model.count_params())
print("Trainable parameters:", sum([w.shape.num_elements() for w in model.trainable_weights]))
""",
    "codeExplanation": [
      {"step": 1, "lines": "1-3", "code": "from keras.applications.vgg16 import VGG16, preprocess_input\nfrom keras.models import Model", "title": "Imports", "explanation": "Imports VGG16 application class and Functional API Model builder."},
      {"step": 2, "lines": "7-11", "code": "base_model = VGG16(weights='imagenet', include_top=False, input_shape=(224,224,3))\nfor layer in base_model.layers:\n    layer.trainable = False", "title": "Base Model Freezing", "explanation": "Loads ImageNet weights without top dense layers and freezes all 13 conv layers."},
      {"step": 3, "lines": "14-19", "code": "x = Flatten()(base_model.output)\nx = Dense(256, activation='relu')(x)\npredictions = Dense(2, activation='softmax')(x)\nmodel = Model(inputs=base_model.input, outputs=predictions)", "title": "Custom Head Attachment", "explanation": "Attaches lightweight dense classification head suited to binary task."},
      {"step": 4, "lines": "21-24", "code": "model.compile(optimizer='adam', loss='categorical_crossentropy')\nprint('Trainable params:', ...)", "title": "Compilation & Audit", "explanation": "Compiles model, verifying that only the top dense weights are trainable."}
    ],
    "exercises": [
      {"id": "ex-12-1", "title": "Compare VGG-16 vs VGG-19", "task": "Compare parameter counts and layer structures between VGG-16 and VGG-19.", "expectedOutcome": "VGG-19 has 3 additional conv layers (+5.3 million parameters), offering marginal accuracy gain with +25% latency."},
      {"id": "ex-12-2", "title": "Implement Fine-Tuning", "task": "Unfreeze the last 4 layers of VGG-16, set learning rate to 1e-5, and train for 5 epochs.", "expectedOutcome": "Fine-tuning boosts test accuracy from ~95% to ~97.8% on target data."},
      {"id": "ex-12-3", "title": "Replace Dense with GlobalAveragePooling2D", "task": "Replace Flatten() with GlobalAveragePooling2D() and compare parameter counts.", "expectedOutcome": "Reduces classification head parameters from ~102 million to only ~131,000 weights."}
    ],
    "commonErrors": [
      {"error": "Catastrophic forgetting during fine-tuning", "cause": "Using too high a learning rate (e.g. 1e-3) when unfreezing conv layers.", "solution": "Set learning rate to 1e-5 or 1e-6 during fine-tuning."},
      {"error": "Slow inference and high memory usage", "cause": "VGG dense layers have 138M parameters.", "solution": "Replace Flatten() with GlobalAveragePooling2D()."}
    ],
    "advancedChallenges": ["Extract intermediate feature maps from Block 1, Block 3, and Block 5 to visualize hierarchical feature abstraction.", "Perform Neural Style Transfer (Gatys et al. 2016) using VGG-19 feature activations."],
    "summary": ["VGGNet proved that stacks of 3x3 convolutions outperform large filters.", "Three 3x3 layers cover a 7x7 receptive field with 45% fewer parameters.", "Transfer learning reuses ImageNet pre-trained weights as a feature extractor.", "Freezing the base and fine-tuning top blocks achieves ~97%+ accuracy rapidly."],
    "defaultDataset": "cats_and_dogs"
  },

  # 13: RNN for Sentiment Analysis
  {
    "id": 13, "week": 13, "title": "Recurrent Neural Networks (RNN) for Sentiment Analysis",
    "tagline": "Sequential Modeling, Recurrent Hidden States & Word Embeddings", "category": "Sequence Models",
    "aim": "Implement RNN for sentiment analysis on movie reviews. Use the concept of Embedding layer (IMDB movie reviews dataset).",
    "objectives": [
      "Understand temporal sequence processing and recurrent hidden state persistence.",
      "Implement the Embedding layer to map sparse token IDs into dense semantic vectors.",
      "Apply sequence padding (pad_sequences) to standardize variable-length reviews.",
      "Train a SimpleRNN on the IMDB sentiment benchmark for positive/negative classification.",
      "Analyze the vanishing gradient problem during Backpropagation Through Time (BPTT)."
    ],
    "prerequisites": ["Natural language tokenization and vocabulary encoding", "Recurrent feedback connections", "Binary cross-entropy for text classification"],
    "concept": "Traditional feedforward networks treat input tokens independently, ignoring word order and temporal context. Recurrent Neural Networks (RNNs) process sequences token-by-token, maintaining an internal hidden state h_t that acts as a working memory of preceding words: h_t = tanh(W_xh * x_t + W_hh * h_{t-1} + b). In sentiment analysis, an Embedding layer first translates discrete word index integers into continuous dense semantic vectors. At each time step, the recurrent cell updates its hidden state. The final hidden state h_T summarizes the entire movie review and is projected via Sigmoid to classify sentiment as positive or negative.",
    "mathFormulas": [
      {"name": "RNN Hidden State Recurrence", "formula": "\\mathbf{h}_t = \\tanh(W_{xh} \\mathbf{x}_t + W_{hh} \\mathbf{h}_{t-1} + \\mathbf{b}_h)", "description": "Computes current hidden memory vector from input x_t and prior state h_{t-1}."},
      {"name": "Word Embedding Lookup", "formula": "\\mathbf{x}_t = E[w_t] \\in \\mathbb{R}^D, \\quad E \\in \\mathbb{R}^{V \\times D}", "description": "Maps discrete word token integer w_t to dense D-dimensional embedding vector."},
      {"name": "Binary Sentiment Output", "formula": "\\hat{y} = \\sigma(\\mathbf{w}_y^T \\mathbf{h}_T + b_y)", "description": "Sigmoid probability of positive sentiment evaluated at sequence termination T."}
    ],
    "architecture": {
      "title": "SimpleRNN Sentiment Pipeline",
      "summary": "Input Text Tokens -> Embedding(10000, 32) -> SimpleRNN(32) -> Dense(1, Sigmoid).",
      "layers": ["Input: Padded Word Tokens (maxlen=500)", "Embedding Layer: 10,000 Vocab -> 32-dim Vectors", "SimpleRNN: 32 Recurrent Hidden Units (Tanh)", "Dense Output: 1 Unit (Sigmoid Binary Sentiment)"]
    },
    "algorithm": [
      "1. Load IMDB dataset with top 10,000 most frequent words (num_words=10000).",
      "2. Standardize review sequence lengths to 500 words using sequence.pad_sequences().",
      "3. Construct Sequential model with Embedding(10000, 32, input_length=500).",
      "4. Add SimpleRNN(32) layer to compute recurrent sequence hidden states.",
      "5. Add Dense(1, activation='sigmoid') for binary sentiment prediction.",
      "6. Compile with binary_crossentropy loss and RMSprop or Adam optimizer.",
      "7. Train for 10 epochs with batch_size=64 and validation_data=(x_test, y_test).",
      "8. Test custom input sentences and predict positive vs negative sentiment."
    ],
    "datasetInfo": {
      "name": "IMDB Movie Reviews", "source": "Andrew Maas et al. (Stanford University)",
      "sampleCount": "50,000 reviews (25k train, 25k test)", "features": ["Tokenized integer word indices padded to 500 tokens"],
      "target": "Binary sentiment (0 = Negative, 1 = Positive)",
      "description": "Highly polarized film reviews benchmark used for text sentiment classification."
    },
    "prescribedCode": """from keras.datasets import imdb
from keras.preprocessing import sequence
from keras.models import Sequential
from keras.layers import Embedding, SimpleRNN, Dense

max_features = 10000
maxlen = 500

(x_train, y_train), (x_test, y_test) = imdb.load_data(num_words=max_features)
x_train = sequence.pad_sequences(x_train, maxlen=maxlen)
x_test = sequence.pad_sequences(x_test, maxlen=maxlen)

model = Sequential([
    Embedding(max_features, 32),
    SimpleRNN(32),
    Dense(1, activation='sigmoid')
])

model.compile(optimizer='rmsprop', loss='binary_crossentropy', metrics=['accuracy'])
model.fit(x_train, y_train, epochs=10, batch_size=128, validation_split=0.2)
score = model.evaluate(x_test, y_test)
print('Test Accuracy:', score[1])
""",
    "codeExplanation": [
      {"step": 1, "lines": "1-4", "code": "from keras.datasets import imdb\nfrom keras.preprocessing import sequence\nfrom keras.layers import Embedding, SimpleRNN, Dense", "title": "Imports", "explanation": "Imports IMDB dataset loader, sequence padding, and recurrent layers."},
      {"step": 2, "lines": "9-12", "code": "(x_train, y_train), (x_test, y_test) = imdb.load_data(num_words=10000)\nx_train = sequence.pad_sequences(x_train, maxlen=500)", "title": "Sequence Padding", "explanation": "Truncates or zero-pads variable-length reviews to uniform 500-token vectors."},
      {"step": 3, "lines": "14-18", "code": "model = Sequential([\n    Embedding(10000, 32),\n    SimpleRNN(32),\n    Dense(1, activation='sigmoid')\n])", "title": "RNN Model", "explanation": "Embeds words into 32 dimensions, processes with 32 recurrent units, and outputs sentiment probability."},
      {"step": 4, "lines": "20-23", "code": "model.compile(optimizer='rmsprop', loss='binary_crossentropy')\nmodel.fit(epochs=10)\nmodel.evaluate(x_test, y_test)", "title": "Training & Scoring", "explanation": "Trains for 10 epochs, achieving ~83% accuracy on movie reviews."}
    ],
    "exercises": [
      {"id": "ex-13-1", "title": "Custom Review Prediction", "task": "Input custom review strings ('This movie was fantastic', 'Terrible boring waste of time') and inspect predictions.", "expectedOutcome": "Positive review outputs probability >0.85; negative review outputs <0.15."},
      {"id": "ex-13-2", "title": "Vary Sequence Length (maxlen)", "task": "Compare maxlen=50 vs maxlen=500.", "expectedOutcome": "maxlen=50 trains faster but misses trailing sentiment context; maxlen=500 captures full review tone."},
      {"id": "ex-13-3", "title": "Observe Vanishing Gradient on Long Text", "task": "Test sentences with 200+ words where critical negation is at the beginning.", "expectedOutcome": "SimpleRNN fails to carry memory across 100+ tokens, motivating LSTM in Exp 14."}
    ],
    "commonErrors": [
      {"error": "Exploding gradients during BPTT", "cause": "Recurrent weight spectral radius > 1.0 causing exponential gradient growth.", "solution": "Add clipnorm=1.0 or clipvalue=0.5 to optimizer."},
      {"error": "Dimension mismatch during custom text inference", "cause": "Feeding raw strings instead of padded integer token sequences.", "solution": "Tokenize text using imdb.get_word_index() and pad to maxlen before model.predict()."}
    ],
    "advancedChallenges": ["Load pre-trained GloVe 100-dimensional embeddings and initialize Embedding weights.", "Stack two SimpleRNN layers using return_sequences=True on the first layer."],
    "summary": ["RNNs maintain a recurrent hidden state h_t across sequential tokens.", "Embedding layer maps discrete words to dense semantic vectors.", "Padded sequences ensure uniform matrix dimensions across batches.", "SimpleRNN suffers from vanishing gradients on long documents, motivating LSTM."],
    "defaultDataset": "imdb"
  },

  # 14: Bidirectional LSTM
  {
    "id": 14, "week": 14, "title": "Bidirectional LSTM for Sentiment Analysis",
    "tagline": "Dual-Directional Context, Gating Mechanisms & Long-Term Memory", "category": "Sequence Models",
    "aim": "Implement Bi-directional LSTM for sentiment analysis on movie reviews (IMDB movie reviews dataset).",
    "objectives": [
      "Understand the internal gating mechanisms of LSTM (Forget, Input, and Output gates).",
      "Explain the constant error carousel (Cell State C_t) that eliminates vanishing gradients.",
      "Implement Bidirectional LSTM to process text in both forward and backward directions.",
      "Compare classification performance of SimpleRNN vs unidirectional LSTM vs Bidirectional LSTM.",
      "Test custom complex sentences containing late negations ('The movie was not good at all')."
    ],
    "prerequisites": ["LSTM cell architecture and gating mathematics", "Sequence unrolling in dual directions", "IMDB tokenization pipelines"],
    "concept": "Standard RNNs and unidirectional LSTMs process sequences chronologically from left to right, meaning a word's hidden state only contains context from preceding words. In natural language, context from succeeding words is equally critical—for instance, in 'The movie was not good at all', understanding that 'good' is negated requires both the preceding 'not' and the succeeding 'at all'. Bidirectional LSTM (Schuster & Paliwal 1997) deploys two separate LSTM chains: a forward LSTM scanning past-to-future (1 to T) and a backward LSTM scanning future-to-past (T to 1). At each token position, the forward state and backward state are concatenated, providing complete contextual awareness and boosting sentiment accuracy to ~89.4%.",
    "mathFormulas": [
      {"name": "LSTM Forget Gate", "formula": "\\mathbf{f}_t = \\sigma(W_f [\\mathbf{h}_{t-1}, \\mathbf{x}_t] + \\mathbf{b}_f)", "description": "Decides what fraction of information to discard from prior cell state C_{t-1}."},
      {"name": "LSTM Input Gate & Candidate State", "formula": "\\mathbf{i}_t = \\sigma(W_i [\\mathbf{h}_{t-1}, \\mathbf{x}_t] + \\mathbf{b}_i), \\quad \\tilde{\\mathbf{C}}_t = \\tanh(W_c [\\mathbf{h}_{t-1}, \\mathbf{x}_t] + \\mathbf{b}_c)", "description": "Regulates what new information to store in the cell state."},
      {"name": "Cell State Additive Update", "formula": "\\mathbf{C}_t = \\mathbf{f}_t \\odot \\mathbf{C}_{t-1} + \\mathbf{i}_t \\odot \\tilde{\\mathbf{C}}_t", "description": "Additive update allowing error gradients to flow across hundreds of steps without decaying."},
      {"name": "Bidirectional Concatenation", "formula": "\\mathbf{h}_t = [\\vec{\\mathbf{h}}_t \\,;\\, \\overleftarrow{\\mathbf{h}}_t]", "description": "Concatenates forward and backward hidden vectors into combined context vector."}
    ],
    "architecture": {
      "title": "Bidirectional LSTM Sentiment Classifier",
      "summary": "Input Tokens -> Embedding(10000, 64) -> Bidirectional(LSTM(64)) -> Dense(32) -> Dense(1, Sigmoid).",
      "layers": ["Input: Word Tokens (maxlen=200)", "Embedding Layer: 10,000 Vocab -> 64-dim Vectors", "Forward LSTM (64 units) + Backward LSTM (64 units)", "Concatenated State: 128-dim Vector", "Dense Layer: 32 units (ReLU)", "Output Layer: 1 unit (Sigmoid Sentiment Probability)"]
    },
    "algorithm": [
      "1. Load IMDB movie review dataset with 10,000 vocabulary words.",
      "2. Pad review sequences to maxlen=200 tokens.",
      "3. Construct Sequential model with Embedding(10000, 64).",
      "4. Wrap LSTM in Bidirectional wrapper: Bidirectional(LSTM(64, dropout=0.2, recurrent_dropout=0.2)).",
      "5. Add Dense(32, activation='relu') and Dense(1, activation='sigmoid').",
      "6. Compile with Adam optimizer and binary crossentropy.",
      "7. Train for 10 epochs; monitor validation accuracy.",
      "8. Compare accuracy vs SimpleRNN: observe ~89.4% accuracy (vs ~80% for SimpleRNN).",
      "9. Evaluate custom tricky reviews containing negations and qualifiers."
    ],
    "datasetInfo": {
      "name": "IMDB Movie Reviews", "source": "Stanford University",
      "sampleCount": "50,000 movie reviews", "features": ["Tokenized review sequences padded to 200 words"],
      "target": "Binary (Positive, Negative)",
      "description": "Benchmark dataset for evaluating dual-directional sequence context in sentiment classification."
    },
    "prescribedCode": """from keras.datasets import imdb
from keras.preprocessing import sequence
from keras.models import Sequential
from keras.layers import Embedding, Bidirectional, LSTM, Dense

max_features = 10000
maxlen = 200

(x_train, y_train), (x_test, y_test) = imdb.load_data(num_words=max_features)
x_train = sequence.pad_sequences(x_train, maxlen=maxlen)
x_test = sequence.pad_sequences(x_test, maxlen=maxlen)

model = Sequential([
    Embedding(max_features, 64),
    Bidirectional(LSTM(64, dropout=0.2)),
    Dense(32, activation='relu'),
    Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.fit(x_train, y_train, epochs=5, batch_size=128, validation_split=0.2)
score = model.evaluate(x_test, y_test)
print('Bidirectional LSTM Test Accuracy:', score[1])
""",
    "codeExplanation": [
      {"step": 1, "lines": "1-4", "code": "from keras.layers import Embedding, Bidirectional, LSTM, Dense", "title": "Imports", "explanation": "Imports Bidirectional wrapper and LSTM recurrent cell."},
      {"step": 2, "lines": "13-18", "code": "model = Sequential([\n    Embedding(max_features, 64),\n    Bidirectional(LSTM(64, dropout=0.2)),\n    Dense(32, activation='relu'),\n    Dense(1, activation='sigmoid')\n])", "title": "BiLSTM Architecture", "explanation": "Embeds words to 64-dim, processes with dual-directional 64-unit LSTMs, and outputs sentiment."},
      {"step": 3, "lines": "20-23", "code": "model.compile(optimizer='adam', loss='binary_crossentropy')\nmodel.fit(epochs=5)\nmodel.evaluate(x_test, y_test)", "title": "Training & Testing", "explanation": "Trains with Adam, reaching ~89.4% test accuracy, outperforming SimpleRNN by +9%."}
    ],
    "exercises": [
      {"id": "ex-14-1", "title": "Compare SimpleRNN vs LSTM vs BiLSTM", "task": "Train all three models on same IMDB split and compile comparative accuracy table.", "expectedOutcome": "SimpleRNN: ~80.2%; LSTM: ~86.8%; Bidirectional LSTM: ~89.4%."},
      {"id": "ex-14-2", "title": "Custom Negation Challenge", "task": "Test sentences with tricky negations ('Not bad at all', 'Far from wonderful').", "expectedOutcome": "Bidirectional LSTM correctly identifies nuanced sentiment where forward-only models fail."},
      {"id": "ex-14-3", "title": "Inspect Output Dimension", "task": "Print model.summary() and observe output shape of Bidirectional(LSTM(64)).", "expectedOutcome": "Shows output dimension of 128 (64 forward + 64 backward concatenated)."}
    ],
    "commonErrors": [
      {"error": "Slow training with recurrent_dropout on GPU", "cause": "recurrent_dropout disables cuDNN optimized LSTM kernels.", "solution": "Use standard dropout or remove recurrent_dropout to enable fast cuDNN kernels."},
      {"error": "Feeding single string directly without 2D shape", "cause": "Model expects batch dimension (1, 200).", "solution": "Pad custom sequence and wrap in numpy array of shape (1, 200)."}
    ],
    "advancedChallenges": ["Add an Attention mechanism layer over the Bidirectional LSTM outputs to visualize word attention weights.", "Compare Bidirectional GRU vs Bidirectional LSTM on training throughput and accuracy."],
    "summary": ["Bidirectional LSTM processes sequences in both directions simultaneously.", "Cell state C_t provides an additive highway eliminating vanishing gradients.", "Concatenates forward and backward states for complete contextual awareness.", "Reaches ~89.4% accuracy on IMDB, vastly outperforming simple recurrent models."],
    "defaultDataset": "imdb"
  },

  # 15: GANs
  {
    "id": 15, "week": 15, "title": "Generative Adversarial Networks (GANs)",
    "tagline": "Two-Player Minimax Game, Latent Noise Mapping & Synthetic Image Generation", "category": "Generative Models",
    "aim": "Implement Generative Adversarial Networks to generate realistic Images. Use MNIST, Fashion MNIST or any human face datasets.",
    "objectives": [
      "Understand the two-player zero-sum minimax game between Generator and Discriminator.",
      "Implement a DCGAN Generator using Conv2DTranspose for fractionally strided upsampling.",
      "Implement a DCGAN Discriminator using strided Conv2D with LeakyReLU activations.",
      "Construct a custom training step with alternating gradient updates.",
      "Generate synthetic MNIST/Fashion MNIST digits from random latent noise vectors."
    ],
    "prerequisites": ["Minimax optimization and zero-sum games", "Transposed 2D convolutions (Conv2DTranspose)", "Custom training loops with GradientTape"],
    "concept": "Generative Adversarial Networks (Ian Goodfellow et al. 2014) formulate generative modeling as a game-theoretic contest between two competing sub-networks: a Generator G that maps a random latent noise vector z ~ N(0, I) into a synthetic candidate image G(z), and a Discriminator D that classifies whether an image is real (from training data) or fake (from G). As training proceeds, G learns to synthesize increasingly photorealistic images to deceive D, while D continuously sharpens its ability to detect synthetic fakes. At the theoretical Nash Equilibrium, D(x) = 0.5 everywhere, meaning the generated data distribution p_g matches the real data distribution p_data perfectly.",
    "mathFormulas": [
      {"name": "Minimax Objective Function", "formula": "\\min_G \\max_D V(D, G) = \\mathbb{E}_{\\mathbf{x} \\sim p_{\\text{data}}}[\\log D(\\mathbf{x})] + \\mathbb{E}_{\\mathbf{z} \\sim p_{\\mathbf{z}}}[\\log(1 - D(G(\\mathbf{z})))]", "description": "Game-theoretic objective where D maximizes correct classification and G minimizes D's ability to spot fakes."},
      {"name": "Generator Non-Saturating Loss", "formula": "\\mathcal{L}_G = -\\mathbb{E}_{\\mathbf{z} \\sim p_{\\mathbf{z}}}[\\log D(G(\\mathbf{z}))]", "description": "Practical objective for G providing strong gradients early in training when D is dominant."}
    ],
    "architecture": {
      "title": "Deep Convolutional GAN (DCGAN) Architecture",
      "summary": "Generator: Dense(7*7*256) -> Conv2DTranspose(128) -> Conv2DTranspose(64) -> Conv2DTranspose(1, Tanh). Discriminator: Conv2D(64, LeakyReLU) -> Conv2D(128) -> Flatten -> Dense(1, Sigmoid).",
      "layers": ["Latent Noise Vector z in R^100", "G Dense: Project to 7x7x256 tensor", "G Transpose 1: (7, 7, 256) -> (7, 7, 128)", "G Transpose 2: (7, 7, 128) -> (14, 14, 64)", "G Transpose 3: (14, 14, 64) -> (28, 28, 1) (Tanh)", "D Conv 1: (28, 28, 1) -> (14, 14, 64) (LeakyReLU)", "D Conv 2: (14, 14, 64) -> (7, 7, 128) (LeakyReLU)", "D Dense: Output probability real vs fake (Sigmoid)"]
    },
    "algorithm": [
      "1. Load MNIST dataset, scale pixel intensities to [-1.0, 1.0] matching Tanh generator output.",
      "2. Build Generator G using Conv2DTranspose layers upsampling 7x7 -> 14x14 -> 28x28.",
      "3. Build Discriminator D using strided Conv2D and LeakyReLU(0.2).",
      "4. Initialize two separate Adam optimizers (learning rate 2e-4, beta_1=0.5).",
      "5. Training Step: sample batch of real images x_real and batch of random noise z.",
      "6. Generate fake images x_fake = G(z).",
      "7. Train D: compute loss on real D(x_real) vs 1, and loss on fake D(x_fake) vs 0; update D weights.",
      "8. Train G: generate new noise z, pass through D, compute loss on D(G(z)) vs 1; update G weights.",
      "9. Iterate for 50 epochs; save generated image grids every 10 epochs to observe quality evolution."
    ],
    "datasetInfo": {
      "name": "MNIST & Fashion MNIST", "source": "Yann LeCun / Zalando Research",
      "sampleCount": "60,000 images scaled to [-1.0, 1.0]",
      "features": ["28x28 grayscale normalized tensors"],
      "target": "Unsupervised generative synthesis",
      "description": "Benchmark datasets for assessing generative adversarial image synthesis."
    },
    "prescribedCode": """import tensorflow as tf
from tensorflow.keras import layers
import numpy as np
import matplotlib.pyplot as plt

# Generator Model
def make_generator():
    return tf.keras.Sequential([
        layers.Dense(7*7*256, use_bias=False, input_shape=(100,)),
        layers.BatchNormalization(),
        layers.LeakyReLU(),
        layers.Reshape((7, 7, 256)),
        layers.Conv2DTranspose(128, (5, 5), strides=(1, 1), padding='same', use_bias=False),
        layers.BatchNormalization(),
        layers.LeakyReLU(),
        layers.Conv2DTranspose(64, (5, 5), strides=(2, 2), padding='same', use_bias=False),
        layers.BatchNormalization(),
        layers.LeakyReLU(),
        layers.Conv2DTranspose(1, (5, 5), strides=(2, 2), padding='same', use_bias=False, activation='tanh')
    ])

# Discriminator Model
def make_discriminator():
    return tf.keras.Sequential([
        layers.Conv2D(64, (5, 5), strides=(2, 2), padding='same', input_shape=[28, 28, 1]),
        layers.LeakyReLU(0.2),
        layers.Dropout(0.3),
        layers.Conv2D(128, (5, 5), strides=(2, 2), padding='same'),
        layers.LeakyReLU(0.2),
        layers.Dropout(0.3),
        layers.Flatten(),
        layers.Dense(1, activation='sigmoid')
    ])

generator = make_generator()
discriminator = make_discriminator()
print("Generator output shape:", generator(tf.random.normal([1, 100])).shape)
print("Discriminator output:", discriminator(generator(tf.random.normal([1, 100]))).numpy())
""",
    "codeExplanation": [
      {"step": 1, "lines": "1-4", "code": "import tensorflow as tf\nfrom tensorflow.keras import layers", "title": "Imports", "explanation": "Imports TensorFlow Keras layers and plotting utilities."},
      {"step": 2, "lines": "6-19", "code": "def make_generator():\n    return Sequential([\n        Dense(7*7*256),\n        Conv2DTranspose(128, strides=(1,1)),\n        Conv2DTranspose(64, strides=(2,2)),\n        Conv2DTranspose(1, strides=(2,2), activation='tanh')\n    ])", "title": "Generator Definition", "explanation": "Constructs upsampling pipeline converting 100-D latent noise into 28x28x1 image."},
      {"step": 3, "lines": "22-31", "code": "def make_discriminator():\n    return Sequential([\n        Conv2D(64, strides=(2,2)),\n        LeakyReLU(0.2), Dropout(0.3),\n        Conv2D(128, strides=(2,2)),\n        Flatten(), Dense(1, activation='sigmoid')\n    ])", "title": "Discriminator Definition", "explanation": "Constructs strided convolutional classifier outputting probability real vs fake."},
      {"step": 4, "lines": "33-37", "code": "generator = make_generator()\ndiscriminator = make_discriminator()", "title": "Instantiation", "explanation": "Instantiates both networks and verifies input/output shape compatibility."}
    ],
    "exercises": [
      {"id": "ex-15-1", "title": "Generate Image Grid Across Epochs", "task": "Save generated sample grids at epoch 1, 10, 25, 50.", "expectedOutcome": "Epoch 1 shows random static noise; epoch 10 shows blurry blobs; epoch 50 generates crisp handwritten digits."},
      {"id": "ex-15-2", "title": "Explore Latent Space Interpolation", "task": "Interpolate between two random vectors z1 and z2: z = alpha*z1 + (1-alpha)*z2. Decode with G.", "expectedOutcome": "Synthetic digits smoothly morph from one character to another, demonstrating continuous latent representation."},
      {"id": "ex-15-3", "title": "Simulate Mode Collapse", "task": "Train with learning rate 0.01 on G and observe generated samples.", "expectedOutcome": "Generator collapses to producing only one digit (e.g. only numeral '1') that tricks D."}
    ],
    "commonErrors": [
      {"error": "Discriminator loss drops to 0; Generator stops learning", "cause": "Discriminator became too strong too fast, providing zero gradient feedback to G.", "solution": "Use label smoothing (0.9 for real labels) and lower D learning rate."},
      {"error": "Checkerboard artifacts in generated images", "cause": "Conv2DTranspose kernel size not divisible by stride.", "solution": "Use kernel size 4 with stride 2 or bilinear upsampling + Conv2D."}
    ],
    "advancedChallenges": ["Implement a Conditional GAN (cGAN) that accepts a class label to generate a specific desired digit on demand.", "Implement Wasserstein GAN with Gradient Penalty (WGAN-GP) for stable convergence."],
    "summary": ["GANs pit Generator against Discriminator in a zero-sum minimax game.", "Generator upsamples random noise vectors z into synthetic images via Conv2DTranspose.", "Discriminator classifies real vs synthetic images using LeakyReLU convolutions.", "At Nash equilibrium, generated images match real data distribution (D(x)=0.5)."],
    "defaultDataset": "mnist"
  },

  # 16: Autoencoders for Image Denoising
  {
    "id": 16, "week": 16, "title": "Autoencoders for Image Denoising",
    "tagline": "Unsupervised Representation Learning, Latent Bottleneck & Noise Suppression", "category": "Generative Models",
    "aim": "Implement Auto encoders for image denoising on MNIST dataset (and Fashion MNIST or suitable dataset).",
    "objectives": [
      "Understand the Encoder-Decoder architecture and the information bottleneck principle.",
      "Inject artificial additive Gaussian and salt-and-pepper noise into clean images.",
      "Train a Convolutional Autoencoder to reconstruct clean target images from noisy inputs.",
      "Evaluate reconstruction fidelity using Mean Squared Error (MSE) and PSNR (dB).",
      "Inspect the compressed latent bottleneck representation and evaluate denoising performance."
    ],
    "prerequisites": ["Unsupervised representation learning", "Convolution and transposed convolution pipelines", "Signal-to-noise ratio metrics (PSNR)"],
    "concept": "Autoencoders are neural networks designed to solve a self-supervised reconstruction task: compressing an input x into a low-dimensional latent bottleneck representation z = f(x) via an Encoder, and reconstructing a facsimile x_hat = g(z) via a Decoder. In a Denoising Autoencoder (Vincent et al. 2008), the input is artificially corrupted with noise (x_noisy = x + noise), while the target output remains the original uncorrupted clean image x. Because noisy inputs do not match clean targets, the network cannot learn a trivial identity mapping f(x) = x. Instead, it is forced to discover the underlying low-dimensional manifold of valid digits, projecting noisy points back onto the clean data manifold and effectively stripping away sensor noise and artifacts.",
    "mathFormulas": [
      {"name": "Encoder Mapping", "formula": "\\mathbf{z} = f_\\theta(\\tilde{\\mathbf{x}}) = \\text{ReLU}(W_e \\tilde{\\mathbf{x}} + \\mathbf{b}_e)", "description": "Compresses corrupted input x_tilde into low-dimensional latent bottleneck z."},
      {"name": "Decoder Reconstruction", "formula": "\\hat{\\mathbf{x}} = g_{\\theta'}(\\mathbf{z}) = \\sigma(W_d \\mathbf{z} + \\mathbf{b}_d)", "description": "Reconstructs clean estimate x_hat from compressed latent code z."},
      {"name": "Mean Squared Reconstruction Loss", "formula": "\\mathcal{L}_{\\text{MSE}} = \\frac{1}{N} \\sum_{i=1}^N \\| \\mathbf{x}_i - \\hat{\\mathbf{x}}_i \\|^2", "description": "Minimizes pixel-by-pixel squared error between clean ground truth and denoised output."},
      {"name": "Peak Signal-to-Noise Ratio (PSNR)", "formula": "\\text{PSNR} = 10 \\cdot \\log_{10}\\left( \\frac{\\text{MAX}_I^2}{\\text{MSE}} \\right) \\quad (\\text{dB})", "description": "Standard decibel metric measuring visual restoration quality (higher is superior)."}
    ],
    "architecture": {
      "title": "Convolutional Denoising Autoencoder Architecture",
      "summary": "Encoder: Conv2D(32, stride 1) -> Conv2D(64, stride 2) [Bottleneck]. Decoder: Conv2DTranspose(64, stride 2) -> Conv2D(1, Sigmoid).",
      "layers": ["Corrupted Noisy Input: (28, 28, 1)", "Encoder Conv 1: 32 filters (3x3, SAME, ReLU) -> (28, 28, 32)", "Encoder Conv 2 (Downsample): 64 filters (3x3, stride 2, SAME) -> (14, 14, 64) [Latent Bottleneck]", "Decoder Transpose 1 (Upsample): 64 filters (3x3, stride 2, SAME) -> (28, 28, 64)", "Decoder Conv 2: 1 filter (3x3, SAME, Sigmoid) -> (28, 28, 1) Denoised Output"]
    },
    "algorithm": [
      "1. Load MNIST dataset, normalize clean pixel intensities to [0.0, 1.0].",
      "2. Generate corrupted inputs: add Gaussian noise with mean 0 and std 0.4: x_noisy = x_clean + np.random.normal(0, 0.4, x_clean.shape).",
      "3. Clip noisy pixel intensities strictly to [0.0, 1.0] using np.clip().",
      "4. Construct Encoder: Conv2D(32, (3,3), activation='relu', padding='same') -> Conv2D(64, (3,3), strides=2, padding='same').",
      "5. Construct Decoder: Conv2DTranspose(64, (3,3), strides=2, padding='same') -> Conv2D(1, (3,3), activation='sigmoid', padding='same').",
      "6. Compile model with Adam optimizer and Mean Squared Error (MSE) loss.",
      "7. Train: model.fit(x_noisy_train, x_clean_train, epochs=15, batch_size=128, validation_data=(x_noisy_test, x_clean_test)).",
      "8. Reconstruct test samples: x_denoised = model.predict(x_noisy_test).",
      "9. Plot 3-panel comparative figures: [Clean Original | Corrupted Noisy | Denoised Reconstruction] and compute PSNR."
    ],
    "datasetInfo": {
      "name": "MNIST & Fashion MNIST with Synthetic Noise", "source": "Yann LeCun / Modified with Gaussian & Salt-and-Pepper Noise",
      "sampleCount": "70,000 paired images (noisy input, clean target)",
      "features": ["28x28x1 noisy images paired with 28x28x1 clean targets"],
      "target": "Pixel-by-pixel clean image reconstruction",
      "description": "Benchmark dataset for evaluating non-linear noise removal and manifold projection."
    },
    "prescribedCode": """import numpy as np
import matplotlib.pyplot as plt
from keras.datasets import mnist
from keras.models import Sequential
from keras.layers import Conv2D, Conv2DTranspose

# Load and normalize clean MNIST
(x_train, _), (x_test, _) = mnist.load_data()
x_train = x_train.reshape(-1, 28, 28, 1).astype('float32') / 255.0
x_test = x_test.reshape(-1, 28, 28, 1).astype('float32') / 255.0

# Additive Gaussian Noise
noise_factor = 0.4
x_train_noisy = np.clip(x_train + noise_factor * np.random.normal(loc=0.0, scale=1.0, size=x_train.shape), 0.0, 1.0)
x_test_noisy = np.clip(x_test + noise_factor * np.random.normal(loc=0.0, scale=1.0, size=x_test.shape), 0.0, 1.0)

# Convolutional Autoencoder
model = Sequential([
    # Encoder
    Conv2D(32, (3, 3), activation='relu', padding='same', input_shape=(28, 28, 1)),
    Conv2D(64, (3, 3), strides=2, activation='relu', padding='same'),
    # Decoder
    Conv2DTranspose(64, (3, 3), strides=2, activation='relu', padding='same'),
    Conv2D(1, (3, 3), activation='sigmoid', padding='same')
])

model.compile(optimizer='adam', loss='mean_squared_error')
model.fit(x_train_noisy, x_train, epochs=10, batch_size=128, validation_data=(x_test_noisy, x_test))
""",
    "codeExplanation": [
      {"step": 1, "lines": "1-5", "code": "from keras.layers import Conv2D, Conv2DTranspose", "title": "Imports", "explanation": "Imports Conv2D for encoding and Conv2DTranspose for decoding."},
      {"step": 2, "lines": "12-15", "code": "x_train_noisy = np.clip(x_train + 0.4 * np.random.normal(...), 0.0, 1.0)", "title": "Noise Injection", "explanation": "Adds Gaussian noise and clips pixel values strictly to valid [0, 1] range."},
      {"step": 3, "lines": "18-25", "code": "model = Sequential([\n    Conv2D(32, strides=1), Conv2D(64, strides=2),\n    Conv2DTranspose(64, strides=2), Conv2D(1, activation='sigmoid')\n])", "title": "Autoencoder Architecture", "explanation": "Compresses to 14x14 bottleneck with stride 2, then reconstructs to 28x28 with transposed conv."},
      {"step": 4, "lines": "27-28", "code": "model.compile(optimizer='adam', loss='mean_squared_error')\nmodel.fit(x_train_noisy, x_train, epochs=10)", "title": "Self-Supervised Fit", "explanation": "Trains network to map noisy input to clean target using MSE loss."}
    ],
    "exercises": [
      {"id": "ex-16-1", "title": "Evaluate Denoising PSNR", "task": "Compute PSNR between noisy image and clean image, and between denoised image and clean image.", "expectedOutcome": "PSNR improves by +10 dB to +14 dB, demonstrating major noise suppression."},
      {"id": "ex-16-2", "title": "Train on Salt-and-Pepper Noise", "task": "Inject impulse salt-and-pepper noise (random 0 and 1 pixels) and evaluate autoencoder denoising.", "expectedOutcome": "Autoencoder effectively removes salt-and-pepper noise by interpolating from surrounding manifold."},
      {"id": "ex-16-3", "title": "Denoise Fashion MNIST", "task": "Apply the autoencoder to noisy Fashion MNIST clothing silhouettes.", "expectedOutcome": "Preserves garment contours while smoothing out synthetic Gaussian background noise."}
    ],
    "commonErrors": [
      {"error": "Denoised images look dark and distorted", "cause": "Omitting np.clip() after adding noise, resulting in negative pixel values.", "solution": "Always apply np.clip(noisy, 0.0, 1.0)."},
      {"error": "Output activation set to ReLU instead of Sigmoid", "cause": "ReLU produces unbounded positive outputs.", "solution": "Use Sigmoid on final Conv2D layer so reconstructed pixels match [0, 1] range."}
    ],
    "advancedChallenges": ["Implement a Variational Autoencoder (VAE) with reparameterization trick and KL divergence.", "Use the trained Denoising Autoencoder for unsupervised defect detection on industrial surface textures."],
    "summary": ["Autoencoders compress inputs into a latent bottleneck and reconstruct clean outputs.", "Denoising Autoencoders map corrupted inputs to clean targets, preventing trivial identity learning.", "Strided Conv2D downsamples; Conv2DTranspose upsamples back to full spatial resolution.", "Achieves +10 to +14 dB PSNR improvement on noisy MNIST and Fashion MNIST."],
    "defaultDataset": "mnist"
  }
]

# Combine all 16 experiments
all_experiments = exps[:2] + [
  # Exp 3
  exps[2],
  # Exp 4
  exps[3]
] + exp_5_to_16_defs

print(f"Total experiments prepared: {len(all_experiments)}")

# Write to frontend/src/data/experimentsData.ts
ts_code = """import { Experiment } from '../types';

export const EXPERIMENTS_DATA: Experiment[] = """ + json.dumps(all_experiments, indent=2) + """;

export function getExperimentById(id: number): Experiment | undefined {
  return EXPERIMENTS_DATA.find(e => e.id === id);
}

export function getAllExperiments(): Experiment[] {
  return EXPERIMENTS_DATA;
}
"""

with open('frontend/src/data/experimentsData.ts', 'w', encoding='utf-8') as f:
    f.write(ts_code)

print("Successfully written all 16 experiments to frontend/src/data/experimentsData.ts!")
