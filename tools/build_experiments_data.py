import json

# Comprehensive 16 Experiments Data for frontend/src/data/experimentsData.ts
experiments = [
  {
    "id": 1,
    "week": 1,
    "title": "Single-Unit Perceptron for Binary Classification",
    "tagline": "Linear Separability, Weight Updates & The XOR Problem",
    "category": "Perceptron",
    "aim": "a. Design a single unit perceptron for classification of a linearly separable binary dataset (placement.csv) without using pre-defined models. Use the Perceptron() from sklearn.\nb. Identify the problem with single unit Perceptron. Classify using Or-, And- and Xor-ed data and analyze the result.",
    "objectives": [
      "Understand the biological neuron analogy and the mathematical perceptron formulation.",
      "Implement the Perceptron learning algorithm from scratch and compare with Scikit-learn.",
      "Visualize the 2D decision boundary defined by w1*x1 + w2*x2 + b = 0.",
      "Demonstrate linear separability on placement.csv and logic gates (AND, OR).",
      "Analyze why a single perceptron fails on non-linearly separable XOR data."
    ],
    "prerequisites": [
      "Linear algebra (vector dot products, equation of a line)",
      "Python NumPy vector operations and Matplotlib 2D plotting",
      "Basic supervised binary classification concepts"
    ],
    "concept": "The Perceptron, invented by Frank Rosenblatt in 1958, is the foundational building block of artificial neural networks. It computes the weighted sum of its inputs plus a bias term, z = sum(w_i * x_i) + b, and passes this net input through a Heaviside step activation function. Geometrically, in an n-dimensional space, the decision boundary is an (n-1)-dimensional hyperplane that partitions the feature space into two distinct decision regions. If a dataset is linearly separable, Novikoff's Perceptron Convergence Theorem guarantees convergence in a finite number of weight updates. However, for non-linearly separable problems like XOR (first proven mathematically by Minsky and Papert in 1969), a single hyperplane cannot separate the classes, necessitating multi-layer networks.",
    "mathFormulas": [
      {
        "name": "Net Input (Pre-activation)",
        "formula": "z = \\sum_{i=1}^{n} w_i x_i + b = \\mathbf{w}^T \\mathbf{x} + b",
        "description": "Computes the linear combination of input features scaled by synaptic weights plus bias."
      },
      {
        "name": "Heaviside Step Activation",
        "formula": "\\hat{y} = f(z) = \\begin{cases} 1 & \\text{if } z \\ge 0 \\\\ 0 & \\text{if } z < 0 \\end{cases}",
        "description": "Threshold activation mapping real-valued continuous input into binary output class."
      },
      {
        "name": "Perceptron Weight Update Rule",
        "formula": "w_i^{(t+1)} = w_i^{(t)} + \\eta (y - \\hat{y}) x_i, \\quad b^{(t+1)} = b^{(t)} + \\eta (y - \\hat{y})",
        "description": "Adjusts weights proportionally to the error (y - y_hat) and input vector with learning rate eta."
      },
      {
        "name": "2D Decision Boundary Line",
        "formula": "w_1 x_1 + w_2 x_2 + b = 0 \\implies x_2 = -\\frac{w_1}{w_2} x_1 - \\frac{b}{w_2}",
        "description": "Converts weights into slope m = -w1/w2 and y-intercept c = -b/w2 for 2D visualization."
      }
    ],
    "architecture": {
      "title": "Single-Unit Rosenblatt Perceptron Topology",
      "summary": "2 input nodes (CGPA, Resume Score) connected via weighted synapses to 1 summing junction with bias, followed by a step activation function.",
      "layers": [
        "Input Layer: 2 features (x1: CGPA, x2: Resume Score)",
        "Synaptic Weights: w1, w2, Bias: b",
        "Summing Node: z = w1*x1 + w2*x2 + b",
        "Activation: Step / Sign function",
        "Output: Binary Class y in {0, 1}"
      ]
    },
    "algorithm": [
      "1. Initialize weights w1, w2 and bias b to zero or small random values.",
      "2. Set learning rate eta (e.g. 0.01) and maximum epochs (e.g. 1000).",
      "3. For each epoch, iterate through each training sample (x_i, y_i):",
      "4. Compute net input: z = w^T x_i + b.",
      "5. Compute predicted output: y_hat = 1 if z >= 0 else 0.",
      "6. Calculate error: err = y_i - y_hat.",
      "7. Update weights: w = w + eta * err * x_i; Update bias: b = b + eta * err.",
      "8. Repeat until zero misclassifications or max_epochs reached.",
      "9. For evaluation, compute accuracy on test split and plot decision boundary line."
    ],
    "datasetInfo": {
      "name": "placement.csv & Logic Truth Tables",
      "source": "MRCET Deep Learning Laboratory Courseware",
      "sampleCount": "200 student placement records; 4 samples each for AND, OR, XOR",
      "features": ["cgpa (Float: 5.0 - 10.0)", "resume_score (Float: 5.0 - 10.0)"],
      "target": "placed (Binary: 0 = Not Placed, 1 = Placed)",
      "description": "A synthetic placement dataset containing student academic CGPA and technical resume scores. Points with high CGPA and strong resume scores are linearly separable from lower-tier candidates."
    },
    "prescribedCode": `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import Perceptron
from mlxtend.plotting import plot_decision_regions

# Load dataset
df = pd.read_csv('placement.csv')
print(df.head())
X = df.iloc[:, 0:2]
y = df.iloc[:, -1]

# Train Perceptron
p = Perceptron()
p.fit(X, y)
print("Weights:", p.coef_)
print("Bias:", p.intercept_)

# Plot decision regions
plot_decision_regions(X.values, y.values, clf=p, legend=2)
plt.title("Perceptron Decision Boundary on Placement Data")
plt.xlabel("CGPA")
plt.ylabel("Resume Score")
plt.show()

# Part b: OR, AND, XOR classification
gates = {'AND': [0,0,0,1], 'OR': [0,1,1,1], 'XOR': [0,1,1,0]}
X_gates = np.array([[0,0], [0,1], [1,0], [1,1]])
for name, target in gates.items():
    clf = Perceptron()
    clf.fit(X_gates, target)
    print(f"{name} Gate Accuracy: {clf.score(X_gates, target)*100:.1f}%")
`,
    "codeExplanation": [
      {
        "step": 1,
        "lines": "1-5",
        "code": "import numpy as np\nimport pandas as pd\nfrom sklearn.linear_model import Perceptron",
        "title": "Library Imports",
        "explanation": "Imports core numerical routines (numpy), tabular DataFrame handlers (pandas), and the Scikit-learn linear Perceptron estimator."
      },
      {
        "step": 2,
        "lines": "7-10",
        "code": "df = pd.read_csv('placement.csv')\nX = df.iloc[:, 0:2]\ny = df.iloc[:, -1]",
        "title": "Dataset Partitioning",
        "explanation": "Loads placement.csv and slices the first two columns (CGPA, resume_score) as input matrix X, and the last column (placed) as target vector y."
      },
      {
        "step": 3,
        "lines": "13-16",
        "code": "p = Perceptron()\np.fit(X, y)\nprint('Weights:', p.coef_)\nprint('Bias:', p.intercept_)",
        "title": "Model Fitting & Parameter Inspection",
        "explanation": "Instantiates the Perceptron classifier, fits it on X and y using the perceptron learning rule, and extracts the learned coefficient weights w and intercept bias b."
      },
      {
        "step": 4,
        "lines": "19-24",
        "code": "plot_decision_regions(X.values, y.values, clf=p, legend=2)\nplt.title('Perceptron Decision Boundary')",
        "title": "Decision Region Visualization",
        "explanation": "Renders the 2D Cartesian plane highlighting class 0 and class 1 regions separated by the linear decision boundary line."
      },
      {
        "step": 5,
        "lines": "27-32",
        "code": "for name, target in gates.items():\n    clf.fit(X_gates, target)",
        "title": "Logic Gate Linearity Verification",
        "explanation": "Trains independent Perceptrons on AND, OR, and XOR truth tables, proving that AND and OR reach 100% accuracy while XOR fails due to non-linear separability."
      }
    ],
    "exercises": [
      {
        "id": "ex-1-1",
        "title": "Implement Single-Unit NOT Gate",
        "task": "Construct a 1D dataset for the NOT gate: X = [[0], [1]], y = [1, 0]. Fit a Perceptron and verify 100% accuracy.",
        "expectedOutcome": "Perceptron converges in 1 epoch with negative weight w1 < 0 and positive bias b > 0."
      },
      {
        "id": "ex-1-2",
        "title": "Classify XNOR Gate and Compare with XOR",
        "task": "Test the XNOR truth table: X = [[0,0],[0,1],[1,0],[1,1]], y = [1,0,0,1]. Explain whether it is linearly separable.",
        "expectedOutcome": "Accuracy will plateau at 50% or 75%, proving XNOR is identically non-linearly separable."
      },
      {
        "id": "ex-1-3",
        "title": "Feature Engineering XOR into 3D",
        "task": "Add a third feature x3 = x1 * x2 to the XOR dataset and retrain Perceptron on (x1, x2, x3).",
        "expectedOutcome": "Perceptron reaches 100% accuracy because the quadratic interaction lifts XOR into a linearly separable 3D plane."
      }
    ],
    "commonErrors": [
      {
        "error": "ZeroDivisionError: float division by zero during line plotting",
        "cause": "Occurs when weight w2 is zero, making -(w1*x1 + b)/w2 undefined.",
        "solution": "Check if abs(w2) < 1e-6; if so, draw a vertical line using plt.axvline(x=-b/w1)."
      },
      {
        "error": "Perceptron oscillates forever without convergence",
        "cause": "Occurs when training on noisy or non-linearly separable data with strict convergence criteria.",
        "solution": "Set max_iter=1000 and tol=1e-3 in sklearn Perceptron to guarantee termination."
      }
    ],
    "advancedChallenges": [
      "Derive the exact Novikoff mistake bound (R/gamma)^2 on placement.csv by computing the geometric margin gamma.",
      "Implement the Pocket Algorithm (Gallant 1990) to retain the best hyperplane found so far when data is non-separable."
    ],
    "summary": [
      "A single-unit perceptron learns a linear decision hyperplane w^T x + b = 0.",
      "Guaranteed to converge in finite steps if data is linearly separable.",
      "AND and OR gates are linearly separable and easily solved.",
      "XOR and XNOR gates are non-linearly separable and fundamentally cannot be solved by a single unit.",
      "Solving non-linear problems requires multi-layer perceptrons (MLPs) with non-linear activation functions."
    ],
    "defaultDataset": "placement.csv"
  }
]

print("Script template ready")
