# tools/generate_all_experiments.py
import json

experiments = [
  # Exp 1
  {
    "id": 1,
    "week": 1,
    "title": "Single-Unit Perceptron for Binary Classification",
    "tagline": "Linear Separability, Weight Updates & The XOR Problem",
    "category": "Perceptron",
    "aim": "a. Design a single unit perceptron for classification of a linearly separable binary dataset (placement.csv) without using pre-defined models. Use the Perceptron() from sklearn.\nb. Identify the problem with single unit Perceptron. Classify using Or-, And- and Xor-ed data and analyze the result.",
    "objectives": [
      "Understand biological neuron analogy and mathematical perceptron formulation.",
      "Implement the Perceptron learning algorithm from scratch and compare with Scikit-learn.",
      "Visualize the 2D decision boundary line w1*x1 + w2*x2 + b = 0.",
      "Demonstrate linear separability on placement.csv and logic gates (AND, OR).",
      "Analyze why a single perceptron fails on non-linearly separable XOR data."
    ],
    "prerequisites": [
      "Linear algebra (vector dot products, equation of a straight line)",
      "Python NumPy vector operations and Matplotlib plotting",
      "Basic supervised binary classification concepts"
    ],
    "concept": "The Perceptron, invented by Frank Rosenblatt in 1958, is the foundational building block of artificial neural networks. It computes the weighted sum of inputs plus bias, z = sum(w_i * x_i) + b, and passes it through a step activation function. In 2D, the decision boundary is a straight line separating the space into two half-planes. Novikoff's Perceptron Convergence Theorem guarantees convergence if data is linearly separable. For non-linear data like XOR (Minsky & Papert 1969), single perceptrons fail, motivating multi-layer networks.",
    "mathFormulas": [
      {
        "name": "Net Input",
        "formula": "z = \\mathbf{w}^T \\mathbf{x} + b = \\sum_{i=1}^n w_i x_i + b",
        "description": "Linear combination of input features scaled by weights plus scalar bias."
      },
      {
        "name": "Step Activation",
        "formula": "\\hat{y} = f(z) = \\begin{cases} 1 & z \\ge 0 \\\\ 0 & z < 0 \\end{cases}",
        "description": "Discontinuous threshold activation mapping continuous inputs to binary decisions."
      },
      {
        "name": "Weight Update Rule",
        "formula": "w_i \\leftarrow w_i + \\eta (y - \\hat{y}) x_i, \\quad b \\leftarrow b + \\eta (y - \\hat{y})",
        "description": "Perceptron learning update rule adjusting parameters on misclassification with learning rate eta."
      },
      {
        "name": "Decision Boundary",
        "formula": "w_1 x_1 + w_2 x_2 + b = 0 \\implies x_2 = -\\frac{w_1}{w_2} x_1 - \\frac{b}{w_2}",
        "description": "Hyperplane dividing the feature space into two distinct classification regions."
      }
    ],
    "architecture": {
      "title": "Single-Unit Rosenblatt Perceptron",
      "summary": "2 input features (CGPA, Resume Score) connected via weighted synapses to 1 summing junction with bias, followed by a step activation.",
      "layers": ["Input Layer (2 Features: CGPA, Resume Score)", "Weights (w1, w2) & Bias (b)", "Summing Junction: z = w^T x + b", "Step Activation Function", "Output: Binary Placement (0 or 1)"]
    },
    "algorithm": [
      "1. Initialize weights w1, w2 and bias b to small random values or zero.",
      "2. Set learning rate eta (0.01) and maximum epochs (1000).",
      "3. For each training sample (x_i, y_i), compute net input z = w^T x_i + b.",
      "4. Compute prediction y_hat = 1 if z >= 0 else 0.",
      "5. Calculate error: err = y_i - y_hat.",
      "6. Update weights: w = w + eta * err * x_i; Update bias: b = b + eta * err.",
      "7. Repeat until all samples are correctly classified or max epochs reached.",
      "8. Plot decision boundary line x2 = -(w1*x1 + b)/w2 against data points."
    ],
    "datasetInfo": {
      "name": "placement.csv & Logic Truth Tables",
      "source": "MRCET Deep Learning Lab Manual",
      "sampleCount": "200 student records (placement.csv); 4 samples each for AND, OR, XOR",
      "features": ["cgpa (Float: 5.0 - 10.0)", "resume_score (Float: 5.0 - 10.0)"],
      "target": "placed (Binary: 0 or 1)",
      "description": "Tabular records of student academic performance and resume strength used for campus placement eligibility classification."
    },
    "prescribedCode": `# Program (a) - placement.csv
import numpy as np
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

# Program (b) - OR, AND, XOR classification
gates = {'AND': [0,0,0,1], 'OR': [0,1,1,1], 'XOR': [0,1,1,0]}
X_gates = np.array([[0,0], [0,1], [1,0], [1,1]])
for name, target in gates.items():
    clf = Perceptron()
    clf.fit(X_gates, target)
    print(f"{name} Gate Accuracy: {clf.score(X_gates, target)*100:.1f}%")
`,
    "codeExplanation": [
      { "step": 1, "lines": "1-5", "code": "import numpy as np\nimport pandas as pd\nfrom sklearn.linear_model import Perceptron", "title": "Library Imports", "explanation": "Imports essential data manipulation and Scikit-learn Perceptron modules." },
      { "step": 2, "lines": "7-9", "code": "df = pd.read_csv('placement.csv')\nX = df.iloc[:, 0:2]\ny = df.iloc[:, -1]", "title": "Dataset Loading", "explanation": "Loads 2D student features and target placement status." },
      { "step": 3, "lines": "11-14", "code": "p = Perceptron()\np.fit(X, y)\nprint('Weights:', p.coef_)\nprint('Bias:', p.intercept_)", "title": "Model Training", "explanation": "Trains linear perceptron and extracts learned hyperplane parameters." },
      { "step": 4, "lines": "16-22", "code": "for name, target in gates.items():\n    clf.fit(X_gates, target)", "title": "Logic Gate Testing", "explanation": "Verifies 100% accuracy on linearly separable gates (AND, OR) and failure on XOR." }
    ],
    "exercises": [
      { "id": "ex-1-1", "title": "Implement NOT Gate", "task": "Train Perceptron on 1D input X=[[0],[1]], y=[1,0].", "expectedOutcome": "Converges in 1 epoch with negative weight and positive bias." },
      { "id": "ex-1-2", "title": "Classify XNOR Gate", "task": "Train Perceptron on XNOR data: y=[1,0,0,1].", "expectedOutcome": "Fails to converge, proving XNOR is identically non-linearly separable." },
      { "id": "ex-1-3", "title": "Feature Lifting for XOR", "task": "Add interaction feature x3 = x1 * x2 and retrain on XOR.", "expectedOutcome": "Achieves 100% accuracy because quadratic feature lifts XOR into separable 3D space." }
    ],
    "commonErrors": [
      { "error": "ZeroDivisionError: float division by zero during line plotting", "cause": "w2 is zero, making division undefined.", "solution": "Check if abs(w2) < 1e-6 and draw vertical line x1 = -b/w1." },
      { "error": "Perceptron loops forever without convergence", "cause": "Training on non-separable data without iteration limit.", "solution": "Set max_iter=1000 in constructor." }
    ],
    "advancedChallenges": [
      "Derive the exact Novikoff mistake bound (R/gamma)^2 on placement.csv.",
      "Implement the Pocket Algorithm (Gallant 1990) to retain the best hyperplane on noisy data."
    ],
    "summary": [
      "A single-unit perceptron learns a linear decision hyperplane w^T x + b = 0.",
      "Guaranteed to converge in finite steps if data is linearly separable.",
      "AND and OR gates are linearly separable; XOR and XNOR are non-separable.",
      "Overcoming non-linear problems requires Multi-Layer Perceptrons (MLPs)."
    ],
    "defaultDataset": "placement.csv"
  },

  # Exp 2
  {
    "id": 2,
    "week": 2,
    "title": "Artificial Neural Network and Backpropagation",
    "tagline": "Multi-Layer Feedforward, Activation Comparisons & Optimizers",
    "category": "Feedforward ANN",
    "aim": "Build an Artificial Neural Network by implementing the Backpropagation algorithm and test the same using appropriate data sets. Vary the activation functions used and compare the results (Iris and Ionosphere datasets).",
    "objectives": [
      "Implement the Backpropagation algorithm with chain-rule gradient calculations.",
      "Compare Sigmoid, Tanh, and ReLU activation functions on convergence speed and accuracy.",
      "Evaluate SGD vs Adam optimizers and analyze the impact of learning rates (0.0001, 0.0005, 5.0).",
      "Evaluate model performance under scarce training data (30% train, 70% test split).",
      "Test classification on multiclass Iris and binary Ionosphere datasets."
    ],
    "prerequisites": [
      "Calculus chain rule and partial derivatives",
      "Multivariate gradient descent optimization",
      "One-hot encoding of categorical targets"
    ],
    "concept": "Multi-Layer Artificial Neural Networks overcome the linear separability limitations of the Perceptron by inserting hidden layers between inputs and outputs. Backpropagation (Rumelhart, Hinton, & Williams 1986) efficiently computes the gradient of the loss function with respect to every weight using the calculus chain rule backwards from output to input. Activation functions introduce essential non-linearities: Sigmoid squashes values to (0, 1) but suffers from vanishing gradients; Tanh is zero-centered (-1, 1); ReLU computes max(0, z) with constant derivative 1.0 for z > 0, dramatically speeding up convergence. Optimizers like Adam adapt learning rates per parameter, vastly outperforming basic SGD.",
    "mathFormulas": [
      {
        "name": "Forward Activation",
        "formula": "a^{(l)} = \\sigma(W^{(l)} a^{(l-1)} + b^{(l)})",
        "description": "Computes layer activations via matrix-vector product followed by non-linear activation."
      },
      {
        "name": "Categorical Cross-Entropy Loss",
        "formula": "\\mathcal{L} = -\\sum_{k=1}^K y_k \\log(\\hat{y}_k)",
        "description": "Penalizes divergence between true one-hot class distribution and predicted probabilities."
      },
      {
        "name": "Output Layer Error Delta",
        "formula": "\\delta^{(L)} = \\nabla_{a^{(L)}} \\mathcal{L} \\odot \\sigma'(z^{(L)}) = \\hat{\\mathbf{y}} - \\mathbf{y}",
        "description": "For Softmax with cross-entropy, the output error delta simplifies elegantly to y_hat - y."
      },
      {
        "name": "Backpropagation Chain Rule",
        "formula": "\\delta^{(l)} = \\left( (W^{(l+1)})^T \\delta^{(l+1)} \\right) \\odot \\sigma'(z^{(l)}), \\quad \\frac{\\partial \\mathcal{L}}{\\partial W^{(l)}} = \\delta^{(l)} (a^{(l-1)})^T",
        "description": "Propagates error backward across layers and computes weight gradient updates."
      }
    ],
    "architecture": {
      "title": "Multi-Layer Perceptron (MLP) for Iris Classification",
      "summary": "4 input features -> Hidden Layer (10 neurons with Sigmoid/ReLU/Tanh) -> Output Layer (3 neurons with Softmax).",
      "layers": ["Input Layer: 4 Features (Sepal/Petal Length & Width)", "Hidden Layer: 10 Neurons (Sigmoid / ReLU / Tanh)", "Output Layer: 3 Neurons (Softmax for Setosa, Versicolor, Virginica)"]
    },
    "algorithm": [
      "1. Load Iris/Ionosphere dataset, normalize features using StandardScaler.",
      "2. One-hot encode multi-class targets using pd.get_dummies() or LabelBinarizer.",
      "3. Split into 30% training and 70% testing data as prescribed.",
      "4. Initialize network weights using HeNormal (for ReLU) or GlorotUniform (for Sigmoid/Tanh).",
      "5. Forward Pass: compute hidden activations z1 = W1*x + b1, a1 = sigma(z1); compute output z2 = W2*a1 + b2, y_hat = softmax(z2).",
      "6. Backward Pass: compute delta2 = y_hat - y; propagate delta1 = (W2^T * delta2) * sigma'(z1).",
      "7. Compute gradients: dL/dW2 = delta2 * a1^T, dL/dW1 = delta1 * x^T.",
      "8. Update weights using optimizer (SGD with momentum or Adam).",
      "9. Iterate for 300 epochs; record training loss curve and test accuracy."
    ],
    "datasetInfo": {
      "name": "Iris & Ionosphere Datasets",
      "source": "UCI Machine Learning Repository / Fisher (1936)",
      "sampleCount": "Iris: 150 samples (3 classes); Ionosphere: 351 samples (34 radar features)",
      "features": ["Iris: SepalLength, SepalWidth, PetalLength, PetalWidth", "Ionosphere: 34 continuous electromagnetic radar features"],
      "target": "Iris: Species (Setosa, Versicolor, Virginica); Ionosphere: Class (Good, Bad)",
      "description": "Standard benchmark datasets for assessing non-linear decision boundaries, multi-class classification, and activation dynamics."
    },
    "prescribedCode": `# Program - Backpropagation on Iris
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
`,
    "codeExplanation": [
      { "step": 1, "lines": "1-6", "code": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom keras.models import Sequential\nfrom keras.layers import Dense", "title": "Imports", "explanation": "Imports pandas, split functions, and Keras Sequential model builder." },
      { "step": 2, "lines": "8-14", "code": "X = df.iloc[:, 1:5].values\ny = df.iloc[:, -1].values\nY = pd.get_dummies(y1).values\nX_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.7)", "title": "Data Preparation", "explanation": "Extracts 4 features, one-hot encodes targets, and splits 30% train / 70% test." },
      { "step": 3, "lines": "16-19", "code": "model = Sequential()\nmodel.add(Dense(10, input_dim=4, activation='sigmoid'))\nmodel.add(Dense(3, activation='softmax'))", "title": "Architecture Setup", "explanation": "Builds 4 -> 10 (Sigmoid) -> 3 (Softmax) feedforward architecture." },
      { "step": 4, "lines": "21-24", "code": "model.compile(loss='categorical_crossentropy', optimizer=SGD(lr=0.005), metrics=['accuracy'])\nmodel.fit(X_train, y_train, epochs=300, batch_size=10)\nmodel.evaluate(X_test, y_test)", "title": "Compilation & Evaluation", "explanation": "Compiles with categorical crossentropy, trains for 300 epochs, and evaluates test accuracy." }
    ],
    "exercises": [
      { "id": "ex-2-1", "title": "Compare Activation Functions", "task": "Run 300 epochs with Sigmoid, ReLU, and Tanh. Record accuracies.", "expectedOutcome": "ReLU achieves highest accuracy and fastest convergence (>95%), Tanh reaches ~93%, Sigmoid lags (~88%)." },
      { "id": "ex-2-2", "title": "Vary Learning Rates in SGD", "task": "Test eta = 0.0001, 0.0005, and 5.0.", "expectedOutcome": "eta=0.0001 converges very slowly; eta=0.005 converges smoothly; eta=5.0 diverges to NaN." },
      { "id": "ex-2-3", "title": "Train on Ionosphere Dataset", "task": "Modify architecture for 34 inputs and binary classification.", "expectedOutcome": "Achieves ~90-94% accuracy with Adam optimizer." }
    ],
    "commonErrors": [
      { "error": "ValueError: Error when checking target: expected dense_2 to have shape (3,) but got array with shape (1,)", "cause": "Target labels were not one-hot encoded for categorical_crossentropy.", "solution": "Use pd.get_dummies() or switch to sparse_categorical_crossentropy." },
      { "error": "Loss: NaN during training with SGD", "cause": "Learning rate set too high (e.g. eta=5.0) causing numeric overflow.", "solution": "Lower learning rate to 0.001 or 0.01." }
    ],
    "advancedChallenges": [
      "Implement Adam optimizer from scratch with first and second moment bias corrections.",
      "Derive analytical gradient of Cross-Entropy loss combined with Softmax."
    ],
    "summary": [
      "Backpropagation computes exact error gradients via the calculus chain rule.",
      "ReLU eliminates vanishing gradients, outperforming Sigmoid in hidden layers.",
      "Adam provides adaptive learning rates, outperforming standard SGD.",
      "Excessive learning rates cause divergent oscillations; tiny rates cause slow plateaus."
    ],
    "defaultDataset": "iris.csv"
  }
]

# Write a python builder to append the rest of experiments 3-16
print("Base loaded. Appending remaining experiments 3 to 16...")
