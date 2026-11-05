import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
  "id": "q-1-1",
  "experimentId": 1,
  "question": "What is the mathematical formulation of Frank Rosenblatt's classical Perceptron output for inputs x and weights w?",
  "options": [
    "y = step(sum(w_i * x_i) + b)",
    "y = sigmoid(sum(w_i * x_i) + b)",
    "y = softmax(sum(w_i * x_i))",
    "y = max(0, sum(w_i * x_i))"
  ],
  "correctAnswer": 0,
  "explanation": "The single-unit Perceptron computes the linear combination sum(w_i * x_i) + b and passes it through a step function.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-1-2",
  "experimentId": 1,
  "question": "Why is a single-unit Perceptron fundamentally incapable of classifying XOR gate data?",
  "options": [
    "XOR requires continuous non-binary inputs",
    "The XOR truth table is not linearly separable in 2D Euclidean space",
    "The Perceptron learning rate cannot be fractional",
    "The Perceptron only works with negative bias"
  ],
  "correctAnswer": 1,
  "explanation": "As proven by Minsky and Papert (1969), no single straight line in 2D can separate (0,1) and (1,0) from (0,0) and (1,1).",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-1-3",
  "experimentId": 1,
  "question": "During Perceptron weight update, what is the weight adjustment rule when sample x is misclassified with target y and prediction y_hat?",
  "options": [
    "w_new = w_old + eta * (y - y_hat) * x",
    "w_new = w_old - eta * (y + y_hat) / x",
    "w_new = w_old * eta + (y - y_hat)",
    "w_new = w_old + eta * (y_hat - y)"
  ],
  "correctAnswer": 0,
  "explanation": "The Perceptron learning rule updates weights in direction of the error: w_new = w_old + eta * (y - y_hat) * x.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-1-4",
  "experimentId": 1,
  "question": "In a 2D feature space with inputs x1 (CGPA) and x2 (Resume Score), what defines the decision boundary of a Perceptron?",
  "options": [
    "A parabolic curve: x2 = a * x1^2 + b",
    "A straight line: w1 * x1 + w2 * x2 + b = 0",
    "A circular hypersphere around the origin",
    "A step discontinuity"
  ],
  "correctAnswer": 1,
  "explanation": "The decision boundary occurs where net input equals 0: w1*x1 + w2*x2 + b = 0, which is a straight line in 2D.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-1-5",
  "experimentId": 1,
  "question": "What is guaranteed by the Novikoff Perceptron Convergence Theorem?",
  "options": [
    "Perceptron reaches 100% accuracy on any non-linear dataset",
    "If training data is linearly separable with margin gamma, it converges to zero error in finite steps",
    "Weights asymptotically reach global minimum of cross-entropy",
    "Backpropagation adds hidden layers automatically"
  ],
  "correctAnswer": 1,
  "explanation": "The theorem guarantees convergence in at most (R / gamma)^2 updates if a separating hyperplane with margin gamma exists.",
  "difficulty": "advanced",
  "type": "conceptual"
},
  {
  "id": "q-1-6",
  "experimentId": 1,
  "question": "In placement.csv, a student has CGPA=8.0 and Resume Score=7.0. If learned weights are w1=0.8, w2=0.6, and bias b=-9.5, what will the Perceptron predict?",
  "options": [
    "Net input = 1.1 > 0 -> Placed (1)",
    "Net input = -0.3 <= 0 -> Not Placed (0)",
    "Net input = 0.0 -> Undefined",
    "Net input = 10.6 -> Placed (1)"
  ],
  "correctAnswer": 0,
  "explanation": "z = 0.8*8.0 + 0.6*7.0 - 9.5 = 6.4 + 4.2 - 9.5 = 1.1. Since 1.1 > 0, output is 1 (Placed).",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-1-7",
  "experimentId": 1,
  "question": "If you train sklearn Perceptron on an AND gate dataset (4 samples), what training accuracy will you achieve?",
  "options": [
    "50%",
    "75%",
    "100%",
    "0%"
  ],
  "correctAnswer": 2,
  "explanation": "AND is linearly separable (e.g. x1 + x2 - 1.5 = 0), so Perceptron converges to 100% accuracy.",
  "difficulty": "basic",
  "type": "application"
},
  {
  "id": "q-1-8",
  "experimentId": 1,
  "question": "Suppose you train a Perceptron on XOR data for 10,000 epochs. What behavior will you observe in the decision boundary?",
  "options": [
    "Boundary converges to an ellipse",
    "Boundary oscillates endlessly between different misclassifications without converging",
    "Weights decay to zero",
    "Learning rate is doubled automatically"
  ],
  "correctAnswer": 1,
  "explanation": "Because XOR is non-linearly separable, weights oscillate endlessly between misclassifications.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-1-9",
  "experimentId": 1,
  "question": "In scikit-learn, what happens if you set penalty='l2' and alpha=0.01 in the Perceptron() constructor?",
  "options": [
    "Converts to K-Means model",
    "Adds L2 ridge penalty to objective function shrinking large weights to reduce overfitting",
    "Enables softmax classification",
    "Replaces step function with LeakyReLU"
  ],
  "correctAnswer": 1,
  "explanation": "Adding penalty='l2' introduces weight decay shrinkage to regularize weights against noisy margins.",
  "difficulty": "advanced",
  "type": "application"
},
  {
  "id": "q-1-10",
  "experimentId": 1,
  "question": "To solve the XOR problem while preserving the Perceptron paradigm, what architectural or feature engineering modification is required?",
  "options": [
    "Add non-linear feature x3 = x1 * x2, or add a hidden layer to form an MLP",
    "Decrease learning rate to 0.000001",
    "Remove the bias term b entirely",
    "Replace numpy arrays with pandas dataframes"
  ],
  "correctAnswer": 0,
  "explanation": "Mapping to 3D with x3 = x1*x2 makes XOR linearly separable in 3D, or an MLP with hidden neurons can compose two lines.",
  "difficulty": "advanced",
  "type": "application"
},
  {
  "id": "q-2-1",
  "experimentId": 2,
  "question": "What is the primary role of the Backpropagation algorithm in Artificial Neural Networks?",
  "options": [
    "Random weight initialization",
    "Efficient computation of partial derivatives dLoss/dw using calculus chain rule",
    "Converting CSV to RGB image",
    "Eliminating activation functions"
  ],
  "correctAnswer": 1,
  "explanation": "Backpropagation applies the chain rule from output back to input to compute exact gradients for optimization.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-2-2",
  "experimentId": 2,
  "question": "Why does the Sigmoid activation function suffer from the vanishing gradient problem in deep networks?",
  "options": [
    "Its maximum derivative is only 0.25 (at z=0) and approaches 0 for |z| >> 0",
    "It always produces negative values",
    "It is non-differentiable at origin",
    "It requires matrix inversion"
  ],
  "correctAnswer": 0,
  "explanation": "Max derivative of Sigmoid is 0.25. Chaining many layers multiplies terms <= 0.25, exponentially shrinking gradients.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-2-3",
  "experimentId": 2,
  "question": "How does the Rectified Linear Unit (ReLU) activation function mitigate the vanishing gradient problem?",
  "options": [
    "Limits values strictly between -1 and +1",
    "For all positive inputs (z > 0), its derivative is exactly 1.0, preserving gradient magnitude",
    "Calculates inverse weight matrix",
    "Forces negative weights to positive"
  ],
  "correctAnswer": 1,
  "explanation": "For z > 0, d(ReLU)/dz = 1.0, allowing error signals to flow back without multiplicative attenuation.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-2-4",
  "experimentId": 2,
  "question": "What is the key advantage of the Adam optimizer over basic Stochastic Gradient Descent (SGD)?",
  "options": [
    "Combines momentum with adaptive per-parameter learning rates",
    "Does not require a loss function",
    "Computes exact Hessian matrix",
    "Runs only on quantum hardware"
  ],
  "correctAnswer": 0,
  "explanation": "Adam adapts per-parameter learning rates using exponentially decaying averages of gradients and squared gradients.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-2-5",
  "experimentId": 2,
  "question": "What occurs during training if the learning rate in SGD is set excessively high (e.g., eta = 5.0 as tested in Week 2)?",
  "options": [
    "Model converges in 1 epoch",
    "Loss oscillates wildly and diverges toward infinity/NaN due to overshooting the minima",
    "Weights remain frozen at zero",
    "Switches to Adam automatically"
  ],
  "correctAnswer": 1,
  "explanation": "An excessively high learning rate overshoots the loss basin, causing divergent oscillations or numeric overflow.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-2-6",
  "experimentId": 2,
  "question": "In the Iris classification problem (3 species), what activation function and loss function should be paired in the output layer?",
  "options": [
    "Sigmoid activation with MSE",
    "Softmax activation with Categorical Cross-Entropy",
    "ReLU activation with Binary Cross-Entropy",
    "Tanh activation with Hinge Loss"
  ],
  "correctAnswer": 1,
  "explanation": "For mutually exclusive multi-class problems, Softmax produces a normalized probability distribution paired with Categorical Cross-Entropy.",
  "difficulty": "basic",
  "type": "application"
},
  {
  "id": "q-2-7",
  "experimentId": 2,
  "question": "In Week 2's prescribed experiment, why is the dataset partitioned into 30% training data and 70% testing data?",
  "options": [
    "To test model generalization under severe data constraint and evaluate robustness against overfitting",
    "GPU memory cannot hold more than 30%",
    "Scikit-learn limits training to 50 samples",
    "To force test loss to zero"
  ],
  "correctAnswer": 0,
  "explanation": "The manual tests how well backpropagation generalizes when trained on a sparse sample of observations.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-2-8",
  "experimentId": 2,
  "question": "When training on Ionosphere dataset (34 features), what is the shape of weight matrix W1 if hidden layer has 16 neurons?",
  "options": [
    "(34, 16)",
    "(16, 34)",
    "(34, 1)",
    "(16, 2)"
  ],
  "correctAnswer": 0,
  "explanation": "Layer connecting 34 inputs to 16 hidden neurons requires a (34, 16) weight matrix.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-2-9",
  "experimentId": 2,
  "question": "During Iris training, your model achieves 100% training accuracy but only 62% test accuracy. What is the issue?",
  "options": [
    "Underfitting",
    "Overfitting; apply weight decay (L2 regularization), dropout, or reduce network capacity",
    "Learning rate too low",
    "Data scaling is invalid"
  ],
  "correctAnswer": 1,
  "explanation": "A massive gap between training accuracy (100%) and test accuracy (62%) is the hallmark of overfitting.",
  "difficulty": "advanced",
  "type": "application"
},
  {
  "id": "q-2-10",
  "experimentId": 2,
  "question": "Why must feature scaling (StandardScaler) be applied before training an ANN with Backpropagation on Iris or Ionosphere?",
  "options": [
    "Without scaling, features with large magnitudes dominate gradients, causing slow, erratic zig-zagging convergence",
    "Neural networks only accept numbers between 0 and 1",
    "Scaling converts text to integers",
    "Ensures bias vector is zero"
  ],
  "correctAnswer": 0,
  "explanation": "Standardizing feature scales creates spherical loss contours, speeding up gradient descent convergence.",
  "difficulty": "advanced",
  "type": "application"
},
  {
  "id": "q-3-1",
  "experimentId": 3,
  "question": "What defines a 'Deep' Feed-Forward ANN compared to a shallow ANN?",
  "options": [
    "Contains two or more hidden layers (in our manual, hidden layers >= 4) enabling hierarchical representation learning",
    "Runs only on 64-bit OS",
    "Uses feedback recurrent loops",
    "Does not use backprop"
  ],
  "correctAnswer": 0,
  "explanation": "Deep networks stack multiple hidden layers (>= 4 in Exp 3) where each layer computes higher-level abstractions.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-3-2",
  "experimentId": 3,
  "question": "What does the Universal Approximation Theorem state regarding neural networks?",
  "options": [
    "A single hidden layer can approximate any continuous function, but deep networks can represent complex functions with exponentially fewer parameters",
    "Shallow networks cannot compute linear functions",
    "Deep networks never overfit",
    "Only networks with 100+ layers can approximate functions"
  ],
  "correctAnswer": 0,
  "explanation": "While a 1-layer network can theoretically approximate any function, it may require infinite width. Depth provides exponential efficiency.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-3-3",
  "experimentId": 3,
  "question": "When constructing a deep ANN with 4 hidden layers, what weight initialization is optimal when using ReLU activations?",
  "options": [
    "He (Kaiming) Normal or Uniform initialization",
    "Xavier (Glorot) initialization",
    "All weights initialized to constant 0.0",
    "All weights initialized to +1.0"
  ],
  "correctAnswer": 0,
  "explanation": "He initialization samples from N(0, sqrt(2/n_in)), preventing vanishing variance across deep ReLU layers.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-3-4",
  "experimentId": 3,
  "question": "What critical bug occurs if all weights in a deep feed-forward ANN are initialized to constant zeros?",
  "options": [
    "Divide-by-zero crash",
    "Symmetry breaking fails: all neurons compute identical activations and gradients, preventing feature specialization",
    "Learning rate is forced to zero",
    "Loss becomes negative"
  ],
  "correctAnswer": 1,
  "explanation": "Zero initialization prevents symmetry breaking; every neuron updates identically, reducing the effective layer width to 1.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-3-5",
  "experimentId": 3,
  "question": "What is the 'Dying ReLU' problem in deep feedforward architectures?",
  "options": [
    "Neurons whose net input z is consistently negative output 0 and have zero gradient, becoming permanently inactive",
    "ReLU overflows when numbers exceed 255",
    "ReLU switches to Sigmoid after 100 epochs",
    "Weights decay to NaN"
  ],
  "correctAnswer": 0,
  "explanation": "If a neuron receives updates that push it into z < 0 for all training data, its gradient is 0 and it can never recover.",
  "difficulty": "advanced",
  "type": "conceptual"
},
  {
  "id": "q-3-6",
  "experimentId": 3,
  "question": "Consider a Deep ANN: Input (34) -> H1 (32) -> H2 (24) -> H3 (16) -> H4 (8) -> Output (2). How many total parameters are in the network?",
  "options": [
    "1,088",
    "2,338",
    "2,466",
    "3,124"
  ],
  "correctAnswer": 2,
  "explanation": "34*32+32=1120; 32*24+24=792; 24*16+16=400; 16*8+8=136; 8*2+2=18. Total = 1120+792+400+136+18 = 2,466.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-3-7",
  "experimentId": 3,
  "question": "In Experiment 3 on Ionosphere data, how does the 4-hidden-layer network compare to a 1-hidden-layer network?",
  "options": [
    "Shallow always wins by 50%",
    "The deep network creates more nuanced non-linear decision regions capturing higher-order radar feature interactions",
    "Deep trains in fewer milliseconds",
    "Deep produces only linear boundaries"
  ],
  "correctAnswer": 1,
  "explanation": "Deep layers compose hierarchical feature abstractions that separate radar signals with higher fidelity.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-3-8",
  "experimentId": 3,
  "question": "If training loss oscillates wildly from 0.4 to 2.8 between epochs in a 4-layer ANN, what is the best fix?",
  "options": [
    "Add 10 more layers",
    "Reduce learning rate or use an adaptive optimizer with learning rate decay",
    "Remove activation functions",
    "Set batch size to 1"
  ],
  "correctAnswer": 1,
  "explanation": "Lowering the learning rate prevents the optimizer from overshooting narrow loss valleys.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-3-9",
  "experimentId": 3,
  "question": "Why is it standard practice to funnel down layer dimensions in a deep classifier (e.g. 34 -> 32 -> 24 -> 16 -> 8 -> 2)?",
  "options": [
    "Forces network to compress information into a dense bottleneck, discarding noise and isolating discriminative features",
    "GPUs cannot allocate more than 64 neurons",
    "Expanding layers makes it unsupervised",
    "Prevents output exceeding 1.0"
  ],
  "correctAnswer": 0,
  "explanation": "Progressive narrowing creates an information bottleneck that eliminates redundant noise before final classification.",
  "difficulty": "advanced",
  "type": "application"
},
  {
  "id": "q-3-10",
  "experimentId": 3,
  "question": "In Keras, which callback halts training when validation loss stops improving for 15 epochs and keeps the best weights?",
  "options": [
    "keras.callbacks.EarlyStopping(monitor='val_loss', patience=15, restore_best_weights=True)",
    "keras.callbacks.ModelCheckpoint(save_best_only=False)",
    "keras.callbacks.TerminateOnNaN()",
    "keras.callbacks.CSVLogger()"
  ],
  "correctAnswer": 0,
  "explanation": "EarlyStopping monitors validation loss, halts after patience epochs without improvement, and restores best weights.",
  "difficulty": "advanced",
  "type": "application"
},
  {
  "id": "q-4-1",
  "experimentId": 4,
  "question": "Why must a 2D image matrix of shape (28, 28) be passed through a Flatten layer before feeding into a Dense layer?",
  "options": [
    "Dense layers perform matrix multiplication with 1D weight vectors, requiring a 784-element vector per sample",
    "Increases image resolution",
    "Removes background noise",
    "Inverts pixel intensities"
  ],
  "correctAnswer": 0,
  "explanation": "Dense layers require 1D input vectors. A 28x28 image must be unrolled into a 784-dimensional vector.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-4-2",
  "experimentId": 4,
  "question": "What is the primary benefit of dividing raw MNIST pixel values [0, 255] by 255.0?",
  "options": [
    "Normalizes pixel intensities to [0.0, 1.0], preventing exploding gradients and ensuring numerical stability",
    "Converts grayscale to RGB",
    "Compresses file size on disk",
    "Eliminates need for output activation"
  ],
  "correctAnswer": 0,
  "explanation": "Unscaled inputs up to 255 cause huge forward weighted sums, saturating activations and destabilizing gradients.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-4-3",
  "experimentId": 4,
  "question": "Why is sparse_categorical_crossentropy preferred over categorical_crossentropy for integer labels (0 to 9)?",
  "options": [
    "Accepts raw integer labels directly without requiring one-hot encoded vectors, saving memory",
    "Only computes loss on 10% of samples",
    "Runs faster on quantum hardware",
    "Replaces the Softmax layer"
  ],
  "correctAnswer": 0,
  "explanation": "Sparse categorical crossentropy operates directly on class index integers without allocating one-hot target matrices.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-4-4",
  "experimentId": 4,
  "question": "What is a major limitation of using a Deep Feedforward (Dense) network for image classification rather than a CNN?",
  "options": [
    "Dense networks lack translation invariance: a shifted digit appears as an entirely different feature pattern",
    "Dense networks cannot use backpropagation",
    "Dense networks cannot exceed 10 neurons",
    "Dense networks only accept binary inputs"
  ],
  "correctAnswer": 0,
  "explanation": "Flattening discards 2D spatial locality. Dense layers assign independent weights to each pixel position, lacking translation invariance.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-4-5",
  "experimentId": 4,
  "question": "In a confusion matrix for 10-class MNIST digit recognition, what do non-zero values off the main diagonal represent?",
  "options": [
    "Misclassifications (e.g. true digit 4 predicted as 9)",
    "Unlabeled images",
    "Correctly classified digits",
    "Dead ReLU neurons"
  ],
  "correctAnswer": 0,
  "explanation": "Off-diagonal elements C[i, j] (i != j) count error occurrences where true class i was predicted as class j.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-4-6",
  "experimentId": 4,
  "question": "If an MNIST network has architecture: Flatten -> Dense(128) -> Dense(64) -> Dense(10), how many parameters are in the first Dense layer?",
  "options": [
    "784 * 128 + 128 = 100,480",
    "28 * 28 + 128 = 912",
    "128 * 64 + 64 = 8,256",
    "784 * 10 = 7,840"
  ],
  "correctAnswer": 0,
  "explanation": "Input is 784 pixels. For 128 neurons, parameters = 784 * 128 weights + 128 biases = 100,480.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-4-7",
  "experimentId": 4,
  "question": "When testing on a custom hand-drawn digit canvas, why might white background with black ink cause failure on an MNIST model?",
  "options": [
    "Standard MNIST digits have black backgrounds (0) and white strokes (255); an inverted canvas inverts all input signals",
    "Canvas has higher DPI than Keras supports",
    "Canvas contains color",
    "Learning rate is inverted"
  ],
  "correctAnswer": 0,
  "explanation": "MNIST has black background (0) and white strokes (~255). Drawing black strokes on white canvas must be inverted before inference.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-4-8",
  "experimentId": 4,
  "question": "In classification report metrics, what is the Precision for digit '8' if 90 out of 100 predicted '8's are truly '8'?",
  "options": [
    "90% (0.90)",
    "100% (1.00)",
    "80% (0.80)",
    "10% (0.10)"
  ],
  "correctAnswer": 0,
  "explanation": "Precision = True Positives / (True Positives + False Positives) = 90 / 100 = 0.90 (90%).",
  "difficulty": "basic",
  "type": "application"
},
  {
  "id": "q-4-9",
  "experimentId": 4,
  "question": "When evaluating Deep Feedforward NN on CIFAR-10 (32x32x3 color images), why is accuracy much lower (~55%) than on MNIST (~97%)?",
  "options": [
    "CIFAR-10 has natural objects with backgrounds, colors, and pose shifts that flat dense weights cannot model without convolution",
    "CIFAR-10 has 100 classes",
    "CIFAR-10 images cannot be flattened",
    "Dense layers only work on grayscale"
  ],
  "correctAnswer": 0,
  "explanation": "Natural color images have high intra-class spatial variance. Without spatial convolution, flat dense layers overfit quickly.",
  "difficulty": "advanced",
  "type": "application"
},
  {
  "id": "q-4-10",
  "experimentId": 4,
  "question": "If training accuracy reaches 99.8% while validation accuracy peaks at epoch 6 (96.5%) and declines to 94.1%, what has occurred?",
  "options": [
    "Overfitting begins after epoch 6",
    "Underfitting throughout",
    "Learning rate too small",
    "Zero noise in data"
  ],
  "correctAnswer": 0,
  "explanation": "Divergence between climbing training accuracy and falling validation accuracy is the textbook sign of overfitting.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-5-1",
  "experimentId": 5,
  "question": "What is the fundamental operation performed by a 2D convolution layer in a CNN?",
  "options": [
    "Computing the element-wise dot product between a sliding kernel filter and local image patches plus bias",
    "Inverting the RGB color channels",
    "Computing K-Means clustering on pixels",
    "Sorting pixels by intensity"
  ],
  "correctAnswer": 0,
  "explanation": "A 2D convolution slides a weight kernel across the input, computing element-wise multiplications and summing to produce a feature map.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-5-2",
  "experimentId": 5,
  "question": "What is the spatial output size when a 28x28 single-channel image is convolved with a 3x3 filter without padding (stride=1)?",
  "options": [
    "26 x 26",
    "28 x 28",
    "24 x 24",
    "14 x 14"
  ],
  "correctAnswer": 0,
  "explanation": "Output = (W - F + 2P)/S + 1 = (28 - 3 + 0)/1 + 1 = 26 x 26.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-5-3",
  "experimentId": 5,
  "question": "What is the primary architectural purpose of Max Pooling (e.g. pool_size=(2, 2)) in CNNs?",
  "options": [
    "Reduces spatial dimensions, decreases parameter count, and provides local translation invariance",
    "Doubles image resolution",
    "Adds L1 regularization to weights",
    "Inverts image colors"
  ],
  "correctAnswer": 0,
  "explanation": "Max pooling downsamples feature maps by taking the maximum value in each window, retaining dominant features while reducing computation.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-5-4",
  "experimentId": 5,
  "question": "How many trainable parameters exist in a Conv2D(32, (3, 3)) layer operating on a 1-channel grayscale image?",
  "options": [
    "(3 * 3 * 1 + 1) * 32 = 320",
    "3 * 3 * 32 = 288",
    "28 * 28 * 32 = 25,088",
    "32 * 32 = 1,024"
  ],
  "correctAnswer": 0,
  "explanation": "Each of the 32 filters has 3x3x1 weights plus 1 bias = 10 parameters. 32 * 10 = 320 parameters.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-5-5",
  "experimentId": 5,
  "question": "What is the 'receptive field' of a neuron in a convolutional neural network?",
  "options": [
    "The specific region in the input image that directly influences the activation of that neuron",
    "The total RAM allocated to the layer",
    "The number of training epochs",
    "The learning rate multiplier"
  ],
  "correctAnswer": 0,
  "explanation": "The receptive field is the spatial footprint in the input space that contributes to a particular unit's response.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-5-6",
  "experimentId": 5,
  "question": "If an input image of shape (28, 28, 1) passes through Conv2D(32, 3x3, valid) followed by MaxPooling2D(2, 2), what is the output shape?",
  "options": [
    "(13, 13, 32)",
    "(14, 14, 32)",
    "(26, 26, 32)",
    "(7, 7, 32)"
  ],
  "correctAnswer": 0,
  "explanation": "Conv2D produces (26, 26, 32). Max pooling with 2x2 reduces spatial dimensions by half: floor(26/2) = (13, 13, 32).",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-5-7",
  "experimentId": 5,
  "question": "If a second layer Conv2D(64, (3, 3), valid) is placed on top of (13, 13, 32), what is the resulting feature map shape before pooling?",
  "options": [
    "(11, 11, 64)",
    "(13, 13, 64)",
    "(10, 10, 64)",
    "(5, 5, 64)"
  ],
  "correctAnswer": 0,
  "explanation": "Output width = (13 - 3 + 0)/1 + 1 = 11. Shape is (11, 11, 64).",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-5-8",
  "experimentId": 5,
  "question": "How many trainable parameters are in Conv2D(64, (3, 3)) when the input tensor has 32 channels?",
  "options": [
    "(3 * 3 * 32 + 1) * 64 = 18,496",
    "3 * 3 * 64 = 576",
    "32 * 64 = 2,048",
    "64 * 64 = 4,096"
  ],
  "correctAnswer": 0,
  "explanation": "Each of the 64 filters spans all 32 input channels: (3 * 3 * 32 weights + 1 bias) * 64 = 289 * 64 = 18,496 parameters.",
  "difficulty": "advanced",
  "type": "application"
},
  {
  "id": "q-5-9",
  "experimentId": 5,
  "question": "Why do CNNs achieve vastly superior accuracy over Dense Feedforward networks on multi-category image datasets?",
  "options": [
    "Through parameter sharing (same filter across whole image) and local connectivity matching spatial structure",
    "They require zero training data",
    "They run on CPU without floating point arithmetic",
    "They eliminate the loss function"
  ],
  "correctAnswer": 0,
  "explanation": "Parameter sharing and local receptive fields allow CNNs to detect visual patterns regardless of spatial position with far fewer parameters.",
  "difficulty": "basic",
  "type": "application"
},
  {
  "id": "q-5-10",
  "experimentId": 5,
  "question": "When Flatten() is applied to a feature map tensor of shape (None, 5, 5, 64), how many units enter the subsequent Dense layer?",
  "options": [
    "5 * 5 * 64 = 1,600",
    "5 * 64 = 320",
    "64 units",
    "25 units"
  ],
  "correctAnswer": 0,
  "explanation": "Flattening unrolls the spatial dimensions and channels: 5 * 5 * 64 = 1,600 feature values per sample.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-6-1",
  "experimentId": 6,
  "question": "Why do modern deep CNNs stack 4 or more convolution layers rather than relying on just 1 or 2 wide layers?",
  "options": [
    "Deep hierarchies allow early layers to extract edges/textures while deeper layers compose them into complex motifs and whole objects",
    "Shallow layers are illegal in Keras",
    "Deeper networks use less RAM",
    "GPUs can only execute networks with 4+ layers"
  ],
  "correctAnswer": 0,
  "explanation": "Visual feature representations are naturally hierarchical: low-level edges -> textures -> object parts -> complete semantic objects.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-6-2",
  "experimentId": 6,
  "question": "In Week 6's benchmark comparing epochs 5, 10, and 20, what trajectory is typically observed in validation accuracy on Fashion MNIST?",
  "options": [
    "Steep gain up to epoch 5 (~88%), steady improvement by epoch 10 (~91%), plateauing with potential overfitting by epoch 20 (~92-93%)",
    "Decreases continuously with every epoch",
    "Stays strictly at 50%",
    "Reaches 100% on epoch 1"
  ],
  "correctAnswer": 0,
  "explanation": "Most generalization gains happen in the first 5-10 epochs; beyond that, validation gains saturate while training accuracy keeps climbing.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-6-3",
  "experimentId": 6,
  "question": "Why does training a 4+ layer CNN on GPU (Google Colab T4) run 8x-15x faster than on a modern multi-core CPU?",
  "options": [
    "GPUs feature thousands of parallel arithmetic logic units (ALUs) and Tensor Cores optimized for parallel 2D matrix convolutions",
    "GPUs have faster clock speeds than CPUs (10 GHz)",
    "CPUs cannot perform floating point math",
    "GPUs skip backpropagation"
  ],
  "correctAnswer": 0,
  "explanation": "Convolutions are massively parallel matrix tensor operations. A GPU with 2,560+ CUDA cores computes hundreds of patches concurrently.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-6-4",
  "experimentId": 6,
  "question": "In a deep 4+ layer CNN, what mathematical pathology occurs if weight initialization or normalization is flawed?",
  "options": [
    "Vanishing or exploding gradients during backpropagation across multiple layers",
    "Image resolution increases by 4x",
    "Loss function becomes convex",
    "Labels are inverted"
  ],
  "correctAnswer": 0,
  "explanation": "Repeated matrix multiplications over many layers cause gradients to either exponentially vanish toward 0 or explode toward infinity.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-6-5",
  "experimentId": 6,
  "question": "What is the effective receptive field of four successive 3x3 convolution layers without pooling (stride=1)?",
  "options": [
    "9 x 9",
    "12 x 12",
    "6 x 6",
    "16 x 16"
  ],
  "correctAnswer": 0,
  "explanation": "Each 3x3 layer adds (F - 1) = 2 to the receptive field: Layer 1 = 3x3, Layer 2 = 5x5, Layer 3 = 7x7, Layer 4 = 9x9.",
  "difficulty": "advanced",
  "type": "conceptual"
},
  {
  "id": "q-6-6",
  "experimentId": 6,
  "question": "On the Fashion MNIST dataset, which clothing categories typically show the highest classification confusion in a 4-layer CNN?",
  "options": [
    "Pullover, Coat, and Shirt (due to similar torso contours and collar geometries)",
    "Sandal and Ankle boot",
    "T-shirt and Bag",
    "Trouser and Sneaker"
  ],
  "correctAnswer": 0,
  "explanation": "Pullovers, Coats, and Shirts share virtually identical 28x28 grayscale torso silhouettes, causing the greatest confusion.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-6-7",
  "experimentId": 6,
  "question": "If training for 20 epochs on an Intel Core i3 CPU takes 71.4 seconds, approximately how long will it take on an NVIDIA T4 GPU in Colab?",
  "options": [
    "Approximately 8.3 seconds (~8.6x speedup)",
    "714 seconds",
    "0.01 seconds",
    "Same time as CPU"
  ],
  "correctAnswer": 0,
  "explanation": "Empirical benchmarks in the lab demonstrate an 8.6x acceleration on Colab GPU (8.3s vs 71.4s on CPU).",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-6-8",
  "experimentId": 6,
  "question": "Which Python code snippet correctly checks whether TensorFlow is utilizing an active GPU accelerator?",
  "options": [
    "print(tf.config.list_physical_devices('GPU'))",
    "print(tf.gpu.is_active())",
    "print(keras.hardware.gpu())",
    "print(os.get_gpu())"
  ],
  "correctAnswer": 0,
  "explanation": "tf.config.list_physical_devices('GPU') returns a non-empty list of available GPU devices recognized by TensorFlow runtime.",
  "difficulty": "basic",
  "type": "application"
},
  {
  "id": "q-6-9",
  "experimentId": 6,
  "question": "What happens to GPU VRAM consumption when increasing batch size from 32 to 128 during deep CNN training?",
  "options": [
    "Increases proportionally by ~4x due to larger forward activation and gradient tensors held in memory",
    "Decreases by 4x",
    "Removes all memory usage",
    "Has zero impact on VRAM"
  ],
  "correctAnswer": 0,
  "explanation": "Intermediate activation maps must be stored for each sample in the mini-batch during the forward pass for backprop gradient calculation.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-6-10",
  "experimentId": 6,
  "question": "When monitoring a 4-layer CNN during training, what indicates that 20 epochs has caused overfitting on Fashion MNIST?",
  "options": [
    "Training loss drops to 0.08 while validation loss rises from 0.28 to 0.42",
    "Training loss equals validation loss",
    "Accuracy drops to zero",
    "Validation loss is zero"
  ],
  "correctAnswer": 0,
  "explanation": "A widening divergence where training loss keeps falling but validation loss turns upward is the canonical diagnostic of overfitting.",
  "difficulty": "advanced",
  "type": "application"
},
  {
  "id": "q-7-1",
  "experimentId": 7,
  "question": "What is the standard formula for output spatial dimension W_out given input W, filter F, padding P, and stride S?",
  "options": [
    "W_out = floor((W - F + 2*P) / S) + 1",
    "W_out = (W * F) / (P + S)",
    "W_out = (W - F) * P + S",
    "W_out = W / (F + S)"
  ],
  "correctAnswer": 0,
  "explanation": "The spatial dimension after 2D convolution is W_out = floor((W - F + 2*P) / S) + 1.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-7-2",
  "experimentId": 7,
  "question": "In Keras, what does padding='same' guarantee when stride S=1?",
  "options": [
    "The output feature map spatial dimensions match the input dimensions exactly (e.g. 28x28 -> 28x28)",
    "The filter weights are identical to input",
    "The batch size is doubled",
    "All negative activations are set to zero"
  ],
  "correctAnswer": 0,
  "explanation": "When S=1, padding='same' automatically computes the zero-padding P needed so that output height and width equal input height and width.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-7-3",
  "experimentId": 7,
  "question": "What is 'Internal Covariate Shift', which Batch Normalization (Ioffe & Szegedy 2015) was designed to eliminate?",
  "options": [
    "The continuous shift in the distribution of layer inputs as the parameters of upstream layers change during training",
    "Hardware clock drift in GPUs",
    "Shifting of bounding boxes in object detection",
    "Label noise in training datasets"
  ],
  "correctAnswer": 0,
  "explanation": "Internal covariate shift refers to how earlier layer parameter updates continuously alter the input distribution of deeper layers, slowing training.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-7-4",
  "experimentId": 7,
  "question": "What are the two learnable parameters introduced per feature channel in a Batch Normalization layer?",
  "options": [
    "Gamma (scale) and Beta (shift)",
    "Alpha (momentum) and Epsilon (regularizer)",
    "Weight (W) and Bias (b)",
    "Learning rate (eta) and decay"
  ],
  "correctAnswer": 0,
  "explanation": "Batch Normalization scales and shifts the normalized activation: y = gamma * x_norm + beta, allowing the network to restore representation power.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-7-5",
  "experimentId": 7,
  "question": "During inference / evaluation (model.predict()), how does Batch Normalization calculate mean and variance?",
  "options": [
    "Using moving exponential running averages accumulated during training, not the test batch statistics",
    "Using the mean of the test batch",
    "Setting mean=0 and variance=1",
    "Randomly sampling from standard normal"
  ],
  "correctAnswer": 0,
  "explanation": "During evaluation, Batch Normalization freezes its running mean and running variance to produce deterministic predictions for individual samples.",
  "difficulty": "advanced",
  "type": "conceptual"
},
  {
  "id": "q-7-6",
  "experimentId": 7,
  "question": "If input is 28x28, filter is 5x5, stride is 1, and padding is 'valid' (P=0), what is the output spatial size?",
  "options": [
    "24 x 24",
    "28 x 28",
    "23 x 23",
    "20 x 20"
  ],
  "correctAnswer": 0,
  "explanation": "W_out = (28 - 5 + 0)/1 + 1 = 23 + 1 = 24 x 24.",
  "difficulty": "basic",
  "type": "application"
},
  {
  "id": "q-7-7",
  "experimentId": 7,
  "question": "Why does Batch Normalization enable the use of significantly higher learning rates during training?",
  "options": [
    "It prevents activation distributions from saturating non-linearities and stabilizes gradient magnitudes throughout deep layers",
    "It automatically doubles GPU clock speed",
    "It replaces gradient descent with linear algebra",
    "It eliminates the need for test datasets"
  ],
  "correctAnswer": 0,
  "explanation": "By constraining activations to unit scale, BN prevents gradients from exploding or vanishing, allowing bold gradient steps with high learning rates.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-7-8",
  "experimentId": 7,
  "question": "What subtle regularization side-effect does Batch Normalization exhibit during training?",
  "options": [
    "The stochastic noise introduced by estimating mean/variance over mini-batches acts as a mild regularizer, reducing need for dropout",
    "It enforces exact L1 sparsity",
    "It randomly drops entire layers",
    "It inverts class probabilities"
  ],
  "correctAnswer": 0,
  "explanation": "Because statistics vary slightly from mini-batch to mini-batch, activations receive subtle noise, imparting a mild regularizing effect.",
  "difficulty": "advanced",
  "type": "application"
},
  {
  "id": "q-7-9",
  "experimentId": 7,
  "question": "In modern CNN design, where is BatchNormalization typically positioned relative to convolution and activation?",
  "options": [
    "Immediately after Conv2D and before the non-linear activation (Conv2D -> BN -> ReLU)",
    "Before the input image",
    "After the Softmax layer",
    "Only in the loss function"
  ],
  "correctAnswer": 0,
  "explanation": "The canonical formulation places BN right after linear transformation (Conv2D) to normalize z before passing through ReLU.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-7-10",
  "experimentId": 7,
  "question": "If an input tensor to BatchNormalization has shape (32, 28, 28, 64), how many mean and variance values are calculated?",
  "options": [
    "64 means and 64 variances (one pair per channel computed across batch, height, and width)",
    "32 pairs",
    "784 pairs",
    "1 pair"
  ],
  "correctAnswer": 0,
  "explanation": "In CNNs, normalization is per-channel: statistics are pooled across batch (32) and spatial dimensions (28x28), yielding 64 channel statistics.",
  "difficulty": "advanced",
  "type": "application"
},
  {
  "id": "q-8-1",
  "experimentId": 8,
  "question": "What is the structural difference between L1 (Lasso) and L2 (Ridge) weight regularization?",
  "options": [
    "L1 penalizes sum of absolute weights inducing sparsity (zero weights); L2 penalizes sum of squared weights shrinking all weights smoothly",
    "L1 is for classification, L2 is for regression",
    "L1 uses GPU, L2 uses CPU",
    "L1 doubles weights, L2 halves them"
  ],
  "correctAnswer": 0,
  "explanation": "L1 penalty (lambda * |w|) has a constant gradient driving unimportant weights to exactly zero. L2 penalty (lambda * w^2) shrinks weights smoothly.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-8-2",
  "experimentId": 8,
  "question": "How does Dropout (Srivastava et al. 2014) combat neural network overfitting?",
  "options": [
    "By randomly deactivating a fraction p of neurons during each training pass, preventing co-adaptation of features",
    "By dropping corrupted images from the dataset",
    "By dropping the last layer of the network",
    "By skipping every second epoch"
  ],
  "correctAnswer": 0,
  "explanation": "Dropout breaks co-adaptation: neurons cannot rely on specific neighboring neurons to correct their mistakes, forcing robust distributed representations.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-8-3",
  "experimentId": 8,
  "question": "In Keras Inverted Dropout with rate=0.5, what scaling is applied to active neuron activations during training?",
  "options": [
    "Activations are divided by (1 - 0.5) = multiplied by 2.0 so expected values match test time without post-scaling",
    "Divided by 2.0",
    "Multiplied by 0.5",
    "Left unscaled"
  ],
  "correctAnswer": 0,
  "explanation": "Inverted Dropout scales active units by 1/(1-p) during training so that during test time (when all neurons are active), no weight scaling is required.",
  "difficulty": "advanced",
  "type": "conceptual"
},
  {
  "id": "q-8-4",
  "experimentId": 8,
  "question": "At test/inference time, how does a Dropout layer behave?",
  "options": [
    "It is completely deactivated: all neurons remain active and weights are applied normally",
    "It drops 50% of test images",
    "It drops random pixels from test inputs",
    "It doubles inference time"
  ],
  "correctAnswer": 0,
  "explanation": "During inference, dropout is turned off; the full ensemble of learned features is active to make deterministic predictions.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-8-5",
  "experimentId": 8,
  "question": "In Experiment 8 on Fashion MNIST, which model configuration achieved the smallest generalization gap (Train Acc - Test Acc)?",
  "options": [
    "Model e: L2 Regularization combined with Dropout (gap ~0.1%)",
    "Model a: Base Model (gap ~8.4%)",
    "Model b: L1 Regularization alone",
    "Model c: No activation"
  ],
  "correctAnswer": 0,
  "explanation": "Combining L2 weight decay with Dropout regularizes both weight magnitudes and feature co-adaptations, shrinking the generalization gap to ~0.1%.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-8-6",
  "experimentId": 8,
  "question": "What gradient penalty term is added to backpropagation weight updates by L2 regularization with coefficient lambda?",
  "options": [
    "lambda * w (proportional weight decay)",
    "lambda * sign(w)",
    "lambda / w",
    "lambda * w^2"
  ],
  "correctAnswer": 0,
  "explanation": "The derivative of (1/2 * lambda * w^2) with respect to w is lambda * w, which continuously decays weight magnitudes during gradient descent.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-8-7",
  "experimentId": 8,
  "question": "What diagnostic curve behavior characterizes an 'underfitting' model?",
  "options": [
    "Both training accuracy and validation accuracy remain low and do not achieve acceptable performance",
    "Training accuracy is 100% while validation accuracy is 20%",
    "Validation loss is zero",
    "Model trains in 1 microsecond"
  ],
  "correctAnswer": 0,
  "explanation": "Underfitting occurs when the model lacks capacity or is over-regularized, failing to capture even the underlying training data patterns.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-8-8",
  "experimentId": 8,
  "question": "If a Dense layer has 512 units and Dropout(0.25) is applied during training, how many units are expected to be active in any given forward pass?",
  "options": [
    "512 * (1 - 0.25) = 384 units",
    "128 units",
    "512 units",
    "256 units"
  ],
  "correctAnswer": 0,
  "explanation": "A dropout rate of 0.25 deactivates 25% of neurons on average: 512 * 0.75 = 384 active units per forward pass.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-8-9",
  "experimentId": 8,
  "question": "What is the detrimental outcome if the Dropout rate is set excessively high (e.g. rate = 0.95)?",
  "options": [
    "Severe underfitting because the network loses 95% of its capacity to transmit signals through the layer",
    "Zero training time",
    "100% test accuracy",
    "Model turns into a CNN"
  ],
  "correctAnswer": 0,
  "explanation": "Dropping 95% of units destroys information flow, preventing the network from learning meaningful representations.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-8-10",
  "experimentId": 8,
  "question": "Why should Dropout generally NOT be placed directly on the final classification output layer?",
  "options": [
    "It would randomly zero out output class probabilities, corrupting the cross-entropy loss computation",
    "It would convert multi-class to binary",
    "It would double the number of classes",
    "It is syntax error in Python"
  ],
  "correctAnswer": 0,
  "explanation": "The output layer must produce valid logits/probabilities for all classes. Dropping output units disrupts normalization and loss evaluation.",
  "difficulty": "advanced",
  "type": "application"
},
  {
  "id": "q-9-1",
  "experimentId": 9,
  "question": "What is the primary objective of Data Augmentation in deep learning computer vision?",
  "options": [
    "Artificially expanding training dataset size and diversity using label-preserving domain transformations to improve generalization",
    "Compressing PNG files to JPEG",
    "Reducing the number of training epochs to 1",
    "Generating synthetic labels without images"
  ],
  "correctAnswer": 0,
  "explanation": "Data augmentation applies transformations (rotations, flips, shifts) that preserve the object's identity, preventing memorization of training pixels.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-9-2",
  "experimentId": 9,
  "question": "In Keras ImageDataGenerator, what transformation does horizontal_flip=True perform?",
  "options": [
    "Randomly mirrors images horizontally (left to right)",
    "Inverts top and bottom",
    "Rotates by 180 degrees",
    "Blurs horizontal edges"
  ],
  "correctAnswer": 0,
  "explanation": "horizontal_flip=True randomly flips the image across the vertical axis, mirroring left and right.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-9-3",
  "experimentId": 9,
  "question": "Why should vertical_flip=True NOT be used when augmenting handwritten digit datasets (MNIST)?",
  "options": [
    "Vertical flipping inverts digits into different classes or invalid characters (e.g. '6' becomes '9')",
    "Vertical flipping crashes TensorFlow",
    "Digits are non-square",
    "MNIST images are 1-channel"
  ],
  "correctAnswer": 0,
  "explanation": "A vertically flipped '6' looks like a '9', destroying label integrity. Augmentations must be strictly label-preserving.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-9-4",
  "experimentId": 9,
  "question": "What does fill_mode='nearest' do when an image is rotated or translated?",
  "options": [
    "Fills newly exposed empty boundary pixels with the value of the nearest valid pixel",
    "Fills exposed pixels with pure black (0)",
    "Leaves pixels as NaN",
    "Deletes the image"
  ],
  "correctAnswer": 0,
  "explanation": "fill_mode='nearest' replicates the boundary edge pixels to fill the void created by rotations or translations.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-9-5",
  "experimentId": 9,
  "question": "What transformation does shear_range=0.2 apply to an image?",
  "options": [
    "Applies affine shear angle distortion where pixel coordinates are shifted proportionally to their distance from an axis",
    "Increases image brightness by 20%",
    "Zooms into center by 20%",
    "Crops 20% of the border"
  ],
  "correctAnswer": 0,
  "explanation": "Shearing slides horizontal or vertical lines in opposite directions, altering rectangular angles into parallelograms.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-9-6",
  "experimentId": 9,
  "question": "When using zoom_range=0.2 in ImageDataGenerator, what range of scaling is applied?",
  "options": [
    "Images are randomly zoomed between [0.8, 1.2] (80% to 120% scale)",
    "Images are zoomed to 20x magnification",
    "Images are cropped by 2 pixels",
    "Zoom is fixed at 200%"
  ],
  "correctAnswer": 0,
  "explanation": "zoom_range=0.2 creates a random zoom factor uniformly chosen from [1 - 0.2, 1 + 0.2] = [0.8, 1.2].",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-9-7",
  "experimentId": 9,
  "question": "How does Data Augmentation specifically benefit medical imaging when only 50 rare cancer biopsy scans exist?",
  "options": [
    "Generates thousands of realistic synthetic variations (subtle tilts, shifts, brightness changes), allowing CNNs to learn without memorizing",
    "Proves that biopsies are unnecessary",
    "Automatically labels the diagnosis",
    "Converts 2D scans to 3D MRIs"
  ],
  "correctAnswer": 0,
  "explanation": "Augmentation acts as an essential regularizer for small datasets, creating diverse orientations to train deep feature detectors.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-9-8",
  "experimentId": 9,
  "question": "Is data augmentation applied during standard model evaluation (model.evaluate(X_test, y_test))?",
  "options": [
    "No, test evaluation is performed strictly on unmodified original raw test images to measure true real-world performance",
    "Yes, test data is augmented 10x",
    "Yes, but only horizontal flipping",
    "Test evaluation only runs on augmented data"
  ],
  "correctAnswer": 0,
  "explanation": "Test data must remain clean and pristine to measure realistic unadulterated generalization performance.",
  "difficulty": "basic",
  "type": "application"
},
  {
  "id": "q-9-9",
  "experimentId": 9,
  "question": "What real-world visual condition is simulated by brightness_range=[0.7, 1.3]?",
  "options": [
    "Varying lighting conditions, such as sunny outdoor vs dim indoor camera captures",
    "Motion blur from fast cameras",
    "Lens chromatic aberration",
    "Defective camera sensor pixels"
  ],
  "correctAnswer": 0,
  "explanation": "Modulating brightness simulates lighting changes throughout the day, teaching the CNN to recognize objects under variable illumination.",
  "difficulty": "basic",
  "type": "application"
},
  {
  "id": "q-9-10",
  "experimentId": 9,
  "question": "What is the danger of applying extreme augmentation parameters (e.g. rotation_range=180, zoom_range=4.0)?",
  "options": [
    "Transforms images beyond biological/physical recognizability, injecting misleading noise and degrading model accuracy",
    "GPU hardware overheating",
    "Zero file size on disk",
    "Code syntax errors"
  ],
  "correctAnswer": 0,
  "explanation": "Excessive distortions destroy recognizable geometric features, turning training samples into uninformative artifacts.",
  "difficulty": "advanced",
  "type": "application"
},
  {
  "id": "q-10-1",
  "experimentId": 10,
  "question": "In Experiment 10, what was the test accuracy improvement on CIFAR-10 when adding Data Augmentation to the CNN?",
  "options": [
    "Validation accuracy increased by ~7% (from ~75.2% to ~82.4%), significantly reducing the overfitting gap",
    "Accuracy dropped by 20%",
    "Accuracy reached 100% in 1 epoch",
    "Zero change in accuracy"
  ],
  "correctAnswer": 0,
  "explanation": "Data augmentation prevents CIFAR-10 CNNs from memorizing specific training pixels, boosting test accuracy by ~7%.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-10-2",
  "experimentId": 10,
  "question": "Why does CIFAR-10 benefit more significantly from Data Augmentation than MNIST?",
  "options": [
    "CIFAR-10 contains complex natural color images with intrinsic variations in orientation, scale, background, and lighting",
    "CIFAR-10 has fewer images than MNIST",
    "MNIST does not work with CNNs",
    "CIFAR-10 has 100,000 classes"
  ],
  "correctAnswer": 0,
  "explanation": "Natural objects (airplanes, horses, cars) exhibit diverse real-world poses and scales, which data augmentation effectively mimics.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-10-3",
  "experimentId": 10,
  "question": "When training with datagen.flow(x_train, y_train, batch_size=32), does the dataset file size on disk increase?",
  "options": [
    "No, augmented images are synthesized on-the-fly in RAM dynamically per batch during the forward pass",
    "Yes, it creates 10,000 new PNG files in the working directory",
    "Yes, disk fills up immediately",
    "It replaces the training set permanently on disk"
  ],
  "correctAnswer": 0,
  "explanation": "Keras ImageDataGenerator performs on-the-fly streaming transformation in memory without saving static images to disk.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-10-4",
  "experimentId": 10,
  "question": "What happens to the training loss curve when Data Augmentation is introduced?",
  "options": [
    "Training loss decreases more slowly because the model never sees identical duplicate images, but validation loss improves",
    "Training loss drops to zero instantly",
    "Training loss diverges to infinity",
    "Training loss remains strictly constant"
  ],
  "correctAnswer": 0,
  "explanation": "Because every batch presents freshly perturbed variations, the training task is harder, so training loss decreases more gradually while validation loss drops lower.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-10-5",
  "experimentId": 10,
  "question": "What is 'Cutout' or 'Random Erasing' augmentation in modern vision pipelines?",
  "options": [
    "Randomly occluding rectangular sub-regions with black or noise pixels, forcing the network to attend to multiple distinct object parts",
    "Cutting the image in half",
    "Deleting 10% of the training images",
    "Cropping the image corners"
  ],
  "correctAnswer": 0,
  "explanation": "Random erasing forces the CNN to avoid over-relying on a single distinctive feature (e.g. recognizing a dog only by its nose).",
  "difficulty": "advanced",
  "type": "conceptual"
},
  {
  "id": "q-10-6",
  "experimentId": 10,
  "question": "What does 'Mixup' augmentation (Zhang et al. 2017) do?",
  "options": [
    "Computes a convex linear combination of two random training images and their one-hot target vectors: x_new = lambda*x1 + (1-lambda)*x2",
    "Randomly shuffles pixel positions in an image",
    "Swaps labels between classes",
    "Converts RGB to HSV"
  ],
  "correctAnswer": 0,
  "explanation": "Mixup blends pairs of images and labels linearly, encouraging linear behavior in the regions between training manifolds.",
  "difficulty": "advanced",
  "type": "conceptual"
},
  {
  "id": "q-10-7",
  "experimentId": 10,
  "question": "In CIFAR-10, why is horizontal_flip=True valid for classes like 'automobile', 'ship', and 'dog', but not for asymmetric directional signs?",
  "options": [
    "Cars and animals maintain identical semantic identity whether facing left or right",
    "Ships can only sail to the right",
    "Animals cannot be mirrored in real life",
    "CIFAR-10 does not have cars"
  ],
  "correctAnswer": 0,
  "explanation": "Horizontal reflection preserves object identity for isotropic or horizontally symmetric real-world objects.",
  "difficulty": "basic",
  "type": "application"
},
  {
  "id": "q-10-8",
  "experimentId": 10,
  "question": "How does Data Augmentation impact training throughput (time per epoch)?",
  "options": [
    "Increases time per epoch slightly due to CPU real-time image transformation overhead",
    "Decreases time per epoch by 10x",
    "Has zero impact on compute time",
    "Freezes the CPU"
  ],
  "correctAnswer": 0,
  "explanation": "Synthesizing transforms per batch on the CPU introduces modest preprocessing latency unless multi-worker pipelines are configured.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-10-9",
  "experimentId": 10,
  "question": "If a baseline CNN has 92% train and 75% val accuracy, and an augmented CNN achieves 85% train and 83% val accuracy, which model is superior?",
  "options": [
    "The augmented model, because its validation accuracy is +8% higher and the generalization gap narrowed from 17% to 2%",
    "The baseline model because 92% > 85% on train",
    "Both are underfitting",
    "Neither can be used"
  ],
  "correctAnswer": 0,
  "explanation": "Generalization performance on unseen validation/test data is the true objective of machine learning, not training set memorization.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-10-10",
  "experimentId": 10,
  "question": "Which Keras method trains a model using an ImageDataGenerator batch stream in modern TensorFlow?",
  "options": [
    "model.fit(datagen.flow(x_train, y_train, batch_size=32), epochs=20, validation_data=(x_test, y_test))",
    "model.train_generator()",
    "model.fit_augmented()",
    "model.evaluate_generator()"
  ],
  "correctAnswer": 0,
  "explanation": "In modern Keras/TF2.x, model.fit() natively accepts Python generators or tf.data datasets returned by datagen.flow().",
  "difficulty": "basic",
  "type": "application"
},
  {
  "id": "q-11-1",
  "experimentId": 11,
  "question": "In Yann LeCun's classic 1998 LeNet-5 architecture, what are the spatial dimensions of the input layer?",
  "options": [
    "32 x 32 grayscale single-channel image",
    "28 x 28 x 3 RGB image",
    "224 x 224 x 3 image",
    "64 x 64 image"
  ],
  "correctAnswer": 0,
  "explanation": "The original LeNet-5 specified a 32x32 input to allow 28x28 digits to appear centered with border margins for feature extraction.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-11-2",
  "experimentId": 11,
  "question": "What activation function was originally used in LeNet-5 (1998)?",
  "options": [
    "Scaled Hyperbolic Tangent (Tanh)",
    "ReLU",
    "GELU",
    "Softplus"
  ],
  "correctAnswer": 0,
  "explanation": "In 1998, scaled Tanh (A * tanh(S * z)) was standard; ReLU had not yet been popularized for deep networks.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-11-3",
  "experimentId": 11,
  "question": "What subsampling operation was performed in layers S2 and S4 of original LeNet-5?",
  "options": [
    "Average Pooling with trainable coefficient and bias per map",
    "Max Pooling 3x3",
    "Global Average Pooling",
    "Stochastic Pooling"
  ],
  "correctAnswer": 0,
  "explanation": "Original LeNet-5 used 2x2 average pooling followed by a trainable multiplier coefficient and additive bias before Tanh activation.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-11-4",
  "experimentId": 11,
  "question": "How many feature maps does convolution layer C1 produce in LeNet-5?",
  "options": [
    "6 feature maps of size 28x28",
    "16 feature maps of size 14x14",
    "32 feature maps of size 32x32",
    "120 feature maps"
  ],
  "correctAnswer": 0,
  "explanation": "Layer C1 applies 6 filters of size 5x5 to the 32x32 input, producing 6 feature maps of size (32 - 5 + 1) = 28x28.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-11-5",
  "experimentId": 11,
  "question": "What was the prominent commercial deployment of LeNet-5 in the 1990s?",
  "options": [
    "Reading handwritten numeric amounts on bank cheques across NCR ATMs and US postal sorting centers",
    "Self-driving cars in California",
    "Face recognition on smartphones",
    "Satellite surveillance"
  ],
  "correctAnswer": 0,
  "explanation": "LeNet-5 was deployed commercially by Bell Labs and NCR to read handwritten cheque digits, processing millions of bank cheques daily.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-11-6",
  "experimentId": 11,
  "question": "How many filters are in layer C3 of LeNet-5, and what is its output spatial dimension?",
  "options": [
    "16 filters of size 5x5, yielding 10x10 feature maps",
    "6 filters yielding 14x14 maps",
    "120 filters yielding 1x1 maps",
    "84 filters yielding 5x5 maps"
  ],
  "correctAnswer": 0,
  "explanation": "Layer C3 applies 16 filters of size 5x5 to the 14x14 subsampled input S2, yielding 10x10 feature maps.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-11-7",
  "experimentId": 11,
  "question": "Approximately how many total trainable parameters exist in the complete LeNet-5 architecture?",
  "options": [
    "~60,000 parameters",
    "~138 million parameters",
    "~5 million parameters",
    "~1,000 parameters"
  ],
  "correctAnswer": 0,
  "explanation": "LeNet-5 has approximately 60,000 trainable parameters, small enough to run on 1990s microprocessors.",
  "difficulty": "basic",
  "type": "application"
},
  {
  "id": "q-11-8",
  "experimentId": 11,
  "question": "In original LeNet-5, how were the output layer classification logits calculated?",
  "options": [
    "Euclidean Radial Basis Function (RBF) units computing distance to predetermined target bitmaps",
    "Softmax crossentropy",
    "Linear regression",
    "Sigmoid step"
  ],
  "correctAnswer": 0,
  "explanation": "The original LeNet-5 used 10 Euclidean RBF units whose weights were fixed 7x12 ASCII bitmap representations of each digit.",
  "difficulty": "advanced",
  "type": "application"
},
  {
  "id": "q-11-9",
  "experimentId": 11,
  "question": "Why was layer C5 termed a convolution layer even though its output shape is 1x1x120?",
  "options": [
    "Applying 120 filters of size 5x5 to a 5x5 feature map reduces spatial dimensions to 1x1, which is mathematically equivalent to a dense layer",
    "It used 1x1 convolutions",
    "It was a typographical error in the 1998 paper",
    "It used pooling internally"
  ],
  "correctAnswer": 0,
  "explanation": "Because the kernel size (5x5) matches the input spatial dimension (5x5), convolution produces a 1x1 spatial output across 120 filters.",
  "difficulty": "advanced",
  "type": "application"
},
  {
  "id": "q-11-10",
  "experimentId": 11,
  "question": "When adapting LeNet-5 for modern MNIST pipelines in Keras, what architectural updates are standard?",
  "options": [
    "Replacing Tanh with ReLU, Average Pooling with MaxPooling2D, and RBF with Softmax Dense(10)",
    "Removing convolution layers",
    "Increasing input size to 1024x1024",
    "Replacing backprop with genetic algorithms"
  ],
  "correctAnswer": 0,
  "explanation": "Modern implementations replace Tanh with ReLU to avoid vanishing gradients, use MaxPooling for sharper features, and Softmax for cross-entropy loss.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-12-1",
  "experimentId": 12,
  "question": "What was the seminal architectural principle introduced by VGGNet (Simonyan & Zisserman, Oxford 2014)?",
  "options": [
    "Replacing large convolution filters (11x11, 7x7) with deep stacks of small 3x3 convolution filters",
    "Eliminating convolution layers in favor of pure self-attention",
    "Using only 1x1 convolutions",
    "Removing all pooling layers"
  ],
  "correctAnswer": 0,
  "explanation": "VGG proved that stacking small 3x3 convolutions increases non-linear decision capacity while drastically reducing parameter count.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-12-2",
  "experimentId": 12,
  "question": "What is the effective receptive field of two stacked 3x3 convolution layers without pooling?",
  "options": [
    "5 x 5 spatial receptive field",
    "6 x 6 receptive field",
    "3 x 3 receptive field",
    "9 x 9 receptive field"
  ],
  "correctAnswer": 0,
  "explanation": "A 3x3 filter on top of a 3x3 filter covers a 5x5 patch in the input layer ((3-1) + (3-1) + 1 = 5).",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-12-3",
  "experimentId": 12,
  "question": "What is the effective receptive field of three stacked 3x3 convolution layers?",
  "options": [
    "7 x 7 spatial receptive field",
    "9 x 9 receptive field",
    "6 x 6 receptive field",
    "14 x 14 receptive field"
  ],
  "correctAnswer": 0,
  "explanation": "Three 3x3 conv layers cover an effective 7x7 receptive field while incorporating three non-linear activation functions instead of one.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-12-4",
  "experimentId": 12,
  "question": "Why is a stack of three 3x3 conv layers with C channels computationally superior to a single 7x7 conv layer?",
  "options": [
    "Three 3x3 layers use 3 * (3^2 * C^2) = 27 C^2 parameters vs 1 * (7^2 * C^2) = 49 C^2 (45% reduction) with more non-linearities",
    "Three 3x3 layers require no floating point operations",
    "A 7x7 filter cannot run on GPU",
    "Three 3x3 layers eliminate backprop"
  ],
  "correctAnswer": 0,
  "explanation": "Stacking three 3x3 layers cuts parameters by 45% (27 C^2 vs 49 C^2) and introduces three non-linear ReLU stages for greater representational capacity.",
  "difficulty": "advanced",
  "type": "conceptual"
},
  {
  "id": "q-12-5",
  "experimentId": 12,
  "question": "How many weight layers exist in VGG-16 vs VGG-19?",
  "options": [
    "VGG-16 has 13 conv + 3 dense = 16 layers; VGG-19 has 16 conv + 3 dense = 19 layers",
    "VGG-16 has 16 conv layers, VGG-19 has 19 conv layers",
    "VGG-16 has 16 dense layers, VGG-19 has 19 dense layers",
    "VGG-16 has 8 conv layers, VGG-19 has 16 conv layers"
  ],
  "correctAnswer": 0,
  "explanation": "VGG-16 comprises 13 convolutional layers plus 3 fully connected dense layers. VGG-19 adds 3 additional conv layers in Blocks 3, 4, and 5.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-12-6",
  "experimentId": 12,
  "question": "In Transfer Learning with VGG-16 for Cats vs Dogs, why are the base convolutional layers frozen (layer.trainable = False)?",
  "options": [
    "To preserve general ImageNet visual features (edges, textures, shapes) and avoid destroying pre-trained weights while training the new head",
    "Because Keras freezes weights automatically",
    "To reduce input image resolution",
    "To force the learning rate to zero"
  ],
  "correctAnswer": 0,
  "explanation": "Freezing the convolutional backbone preserves rich visual feature extractors learned from 1.4 million ImageNet photos.",
  "difficulty": "basic",
  "type": "application"
},
  {
  "id": "q-12-7",
  "experimentId": 12,
  "question": "Where are over 75% of the total 138 million parameters located in standard VGG-16?",
  "options": [
    "In the first fully connected layer Dense(4096) connecting 7x7x512 = 25,088 flattened inputs (~102 million weights)",
    "In the first 3x3 convolution layer",
    "In the max pooling layers",
    "In the output layer"
  ],
  "correctAnswer": 0,
  "explanation": "Connecting flattened 25,088 features to 4,096 dense neurons requires 25,088 * 4096 = 102,760,448 weights in that single layer alone.",
  "difficulty": "advanced",
  "type": "application"
},
  {
  "id": "q-12-8",
  "experimentId": 12,
  "question": "What is 'fine-tuning' in transfer learning with VGG-16?",
  "options": [
    "Unfreezing the topmost convolutional block (Block 5) and training it with a very small learning rate (e.g. 1e-5) alongside the new classifier head",
    "Re-initializing all weights to zero",
    "Training only on CPU",
    "Multiplying weights by 2"
  ],
  "correctAnswer": 0,
  "explanation": "Fine-tuning unfreezes high-level convolutional blocks to subtly adapt high-order feature representations to the target domain.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-12-9",
  "experimentId": 12,
  "question": "What input image dimension does standard pre-trained VGG-16 expect?",
  "options": [
    "224 x 224 x 3 RGB images",
    "28 x 28 x 1 grayscale images",
    "32 x 32 x 3 color images",
    "512 x 512 x 1 images"
  ],
  "correctAnswer": 0,
  "explanation": "VGG-16 was designed and pre-trained on ImageNet using 224x224 RGB image inputs.",
  "difficulty": "basic",
  "type": "application"
},
  {
  "id": "q-12-10",
  "experimentId": 12,
  "question": "Why is Global Average Pooling (GAP) frequently used in modern networks to replace VGG's classic Dense(4096) layers?",
  "options": [
    "GAP averages each 7x7 feature map into a single scalar, reducing parameters from 102 million to zero while preventing overfitting",
    "GAP doubles parameter count",
    "GAP converts images to text",
    "GAP requires specialized hardware"
  ],
  "correctAnswer": 0,
  "explanation": "GAP eliminates millions of dense weights between convolutional backbones and classifiers, radically shrinking model size.",
  "difficulty": "advanced",
  "type": "application"
},
  {
  "id": "q-13-1",
  "experimentId": 13,
  "question": "What is the mathematical recurrence relation for the hidden state h_t in a standard SimpleRNN?",
  "options": [
    "h_t = tanh(W_xh * x_t + W_hh * h_{t-1} + b_h)",
    "h_t = x_t * h_{t-1}",
    "h_t = softmax(W * x_t)",
    "h_t = max(0, x_t)"
  ],
  "correctAnswer": 0,
  "explanation": "The standard SimpleRNN updates its hidden state via non-linear combination of current input x_t and previous hidden state h_{t-1}.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-13-2",
  "experimentId": 13,
  "question": "What is the primary role of an Embedding layer in sentiment analysis on movie reviews?",
  "options": [
    "Maps sparse discrete integer word tokens into dense continuous semantic vector representations of fixed dimension",
    "Removes stop-words from reviews",
    "Translates English reviews to French",
    "Calculates classification accuracy"
  ],
  "correctAnswer": 0,
  "explanation": "An Embedding layer acts as a lookup table mapping high-cardinality word IDs (e.g. 10,000 vocab) into dense vectors (e.g. 32-dim) capturing semantic similarity.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-13-3",
  "experimentId": 13,
  "question": "In IMDB movie review processing with maxlen=500, what happens to reviews shorter than 500 words?",
  "options": [
    "They are padded with zeros (pre-padding or post-padding) to ensure identical tensor dimensions across batches",
    "They are discarded from the dataset",
    "They are duplicated until reaching 500 words",
    "They trigger an error in Keras"
  ],
  "correctAnswer": 0,
  "explanation": "sequence.pad_sequences() adds zeros to short texts so that variable-length sentences can be packed into uniform rectangular batch tensors.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-13-4",
  "experimentId": 13,
  "question": "What fundamental mathematical pathology causes standard SimpleRNNs to fail on long movie reviews (>100 tokens)?",
  "options": [
    "Vanishing gradient problem during Backpropagation Through Time (BPTT) due to continuous multiplication of W_hh matrices",
    "Division by zero in Tanh",
    "Vocabulary size explosion",
    "Overheating of RAM"
  ],
  "correctAnswer": 0,
  "explanation": "Backpropagating over many time steps multiplies the recurrent weight matrix repeatedly; if spectral radius < 1, gradients decay to 0.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-13-5",
  "experimentId": 13,
  "question": "In binary sentiment classification (positive vs negative review), what is the proper output layer specification?",
  "options": [
    "Dense(1, activation='sigmoid') paired with binary_crossentropy loss",
    "Dense(2, activation='relu') paired with MSE",
    "Dense(10, activation='softmax')",
    "Dense(1, activation='linear')"
  ],
  "correctAnswer": 0,
  "explanation": "A single neuron with Sigmoid activation outputs a probability in [0, 1] representing positive sentiment probability, optimized via binary cross-entropy.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-13-6",
  "experimentId": 13,
  "question": "What does 'unrolling through time' mean when conceptualizing a Recurrent Neural Network?",
  "options": [
    "Visualizing the recurrent loop as a sequence of feedforward stages across time-steps t=1 to T sharing identical weights",
    "Running the network backward in time",
    "Deleting historical timestamps",
    "Expanding the text to 10,000 words"
  ],
  "correctAnswer": 0,
  "explanation": "Unrolling depicts the temporal progression explicitly as a feedforward graph across each token position, making backpropagation through time clear.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-13-7",
  "experimentId": 13,
  "question": "What is 'gradient clipping' (e.g. clipnorm=1.0 or clipvalue=0.5), and why is it vital in RNN training?",
  "options": [
    "Capping gradient vector magnitudes to a maximum threshold, preventing exploding gradients from destabilizing weights",
    "Truncating reviews to 10 words",
    "Dropping 50% of weights",
    "Removing negative gradients"
  ],
  "correctAnswer": 0,
  "explanation": "When recurrent gradients explode exponentially, gradient clipping bounds the update step norm, preserving stable trajectory directions.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-13-8",
  "experimentId": 13,
  "question": "If vocabulary size is 10,000 and embedding dimension is 32, how many parameters are in the Embedding layer?",
  "options": [
    "10,000 * 32 = 320,000 parameters",
    "10,000 + 32 = 10,032",
    "32 * 32 = 1,024",
    "10,000 / 32 = 312"
  ],
  "correctAnswer": 0,
  "explanation": "The embedding weight matrix has shape (vocab_size, embedding_dim) = 10,000 * 32 = 320,000 trainable weights.",
  "difficulty": "basic",
  "type": "application"
},
  {
  "id": "q-13-9",
  "experimentId": 13,
  "question": "What is the difference between return_sequences=True and return_sequences=False in Keras SimpleRNN?",
  "options": [
    "True returns the hidden state vector at every time-step (shape [batch, time, units]); False returns only the final hidden state vector",
    "True enables GPU; False uses CPU",
    "True skips padding",
    "False deletes the weights"
  ],
  "correctAnswer": 0,
  "explanation": "return_sequences=True outputs full sequences for stacking recurrent layers; return_sequences=False outputs the last state for classification.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-13-10",
  "experimentId": 13,
  "question": "Why is Tanh activation preferred over ReLU inside the recurrent cell of SimpleRNN?",
  "options": [
    "Tanh strictly bounds activations between [-1, +1], preventing state activations from exploding toward infinity over 100+ unrolled time steps",
    "Tanh is faster to compute than ReLU",
    "ReLU is not supported in Keras RNN",
    "Tanh forces all weights to zero"
  ],
  "correctAnswer": 0,
  "explanation": "Because hidden states are fed back into the cell repeatedly, unbound activations like ReLU can easily cause exponential activation explosion.",
  "difficulty": "advanced",
  "type": "application"
},
  {
  "id": "q-14-1",
  "experimentId": 14,
  "question": "What key architectural innovation enables Bidirectional LSTM to outperform standard unidirectional RNNs on text sentiment?",
  "options": [
    "It processes input text in both directions: forward (past to future) and backward (future to past), concatenating both hidden state vectors",
    "It uses two GPUs simultaneously",
    "It doubles the learning rate automatically",
    "It ignores negative words"
  ],
  "correctAnswer": 0,
  "explanation": "Bidirectional LSTM processes words with both preceding context and succeeding context available simultaneously at every token position.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-14-2",
  "experimentId": 14,
  "question": "What are the three fundamental gating mechanisms inside a Long Short-Term Memory (LSTM) cell?",
  "options": [
    "Forget Gate, Input Gate, Output Gate",
    "Start Gate, Middle Gate, Stop Gate",
    "Convolution Gate, Pooling Gate, Dense Gate",
    "Read Gate, Write Gate, Erase Gate"
  ],
  "correctAnswer": 0,
  "explanation": "An LSTM cell regulates information flow using three multiplicative gates: Forget Gate (f_t), Input Gate (i_t), and Output Gate (o_t).",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-14-3",
  "experimentId": 14,
  "question": "What is the mathematical purpose of the Forget Gate: f_t = sigmoid(W_f * [h_{t-1}, x_t] + b_f)?",
  "options": [
    "Decides what proportion (0.0 to 1.0) of information in the previous cell state C_{t-1} should be retained vs discarded",
    "Erases the entire model memory",
    "Deletes words with spelling errors",
    "Resets weights to zero"
  ],
  "correctAnswer": 0,
  "explanation": "The forget gate produces values between 0 (completely forget) and 1 (completely retain) multiplied element-wise by the previous cell state C_{t-1}.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-14-4",
  "experimentId": 14,
  "question": "What is the 'Cell State' (C_t) in an LSTM, and why is it referred to as an 'error carousel'?",
  "options": [
    "A linear information highway where gradients can flow backward through time with minimal multiplicative decay",
    "A temporary cache in GPU VRAM",
    "A circular buffer for storing text",
    "The output probability distribution"
  ],
  "correctAnswer": 0,
  "explanation": "The cell state operates with purely additive updates, allowing backpropagating error gradients to flow across hundreds of time steps without vanishing.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-14-5",
  "experimentId": 14,
  "question": "If Bidirectional(LSTM(64)) has return_sequences=False, what is the output vector dimension for each review?",
  "options": [
    "128 (64 units forward concatenated with 64 units backward)",
    "64 units",
    "32 units",
    "256 units"
  ],
  "correctAnswer": 0,
  "explanation": "The layer outputs the concatenated final states: [h_forward_T, h_backward_1] = 64 + 64 = 128 dimensions.",
  "difficulty": "basic",
  "type": "application"
},
  {
  "id": "q-14-6",
  "experimentId": 14,
  "question": "In the movie review 'The acting was not bad, actually quite good', how does Bidirectional LSTM resolve the sentiment of 'bad'?",
  "options": [
    "The forward pass detects the preceding 'not', while backward pass detects 'actually quite good', neutralizing the negative word",
    "It deletes the word 'bad'",
    "It assigns negative score immediately",
    "It flags the review as spam"
  ],
  "correctAnswer": 0,
  "explanation": "Bidirectional context allows the network to recognize that 'bad' is negated by 'not' and supported by 'quite good' in the trailing text.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-14-7",
  "experimentId": 14,
  "question": "What activation function is strictly used for the gating mechanisms (forget, input, output) in an LSTM cell?",
  "options": [
    "Sigmoid activation (because it outputs values in [0, 1] acting as smooth binary open/close valves)",
    "ReLU",
    "Softmax",
    "Linear"
  ],
  "correctAnswer": 0,
  "explanation": "Sigmoid squashes activations strictly into [0, 1], where 0 represents 'gate fully closed' and 1 represents 'gate fully open'.",
  "difficulty": "basic",
  "type": "application"
},
  {
  "id": "q-14-8",
  "experimentId": 14,
  "question": "How does the computational complexity and parameter count of Bidirectional LSTM compare to a SimpleRNN with the same hidden size?",
  "options": [
    "An LSTM cell has ~4x the parameters of a SimpleRNN; Bidirectional doubles that to ~8x parameters and computation",
    "Bidirectional LSTM has fewer parameters",
    "Both have identical parameter counts",
    "LSTM uses 50% less RAM"
  ],
  "correctAnswer": 0,
  "explanation": "Each LSTM cell has 4 internal weight matrices (forget, input, candidate, output); Bidirectional runs two separate LSTMs (forward & backward), quadrupling simple RNN.",
  "difficulty": "advanced",
  "type": "application"
},
  {
  "id": "q-14-9",
  "experimentId": 14,
  "question": "In Keras LSTM, what is the function of recurrent_dropout=0.2?",
  "options": [
    "Applies the dropout mask consistently across the recurrent hidden state connections across time steps",
    "Drops 20% of words in input text",
    "Drops 20% of training epochs",
    "Turns off the forget gate 20% of the time"
  ],
  "correctAnswer": 0,
  "explanation": "Recurrent dropout (Gal & Ghahramani 2016) masks recurrent connections with a fixed mask across all time steps, preventing overfitting in recurrent transitions.",
  "difficulty": "advanced",
  "type": "application"
},
  {
  "id": "q-14-10",
  "experimentId": 14,
  "question": "Why can Bidirectional LSTM NOT be deployed for real-time streaming speech transcription where text must appear word-by-word as spoken?",
  "options": [
    "The backward LSTM requires the entire complete utterance to be finished before it can compute backward hidden states",
    "Speech cannot be tokenized",
    "LSTMs only work on written text",
    "Microphones do not support bidirectional audio"
  ],
  "correctAnswer": 0,
  "explanation": "Bidirectional models require full sequence lookahead (future context), introducing unacceptable latency until speech has completely terminated.",
  "difficulty": "advanced",
  "type": "application"
},
  {
  "id": "q-15-1",
  "experimentId": 15,
  "question": "What is the game-theoretic formulation of Generative Adversarial Networks (Goodfellow et al. 2014)?",
  "options": [
    "A two-player zero-sum minimax game: min_G max_D V(D, G) where Generator G tries to fool Discriminator D",
    "A cooperative reinforcement learning game",
    "A multi-agent auction mechanism",
    "A single-player dynamic programming puzzle"
  ],
  "correctAnswer": 0,
  "explanation": "GANs pit two models against each other: Generator G synthesizes fake samples to deceive Discriminator D, which aims to distinguish real from fake.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-15-2",
  "experimentId": 15,
  "question": "What is the input to the Generator network in a standard Deep Convolutional GAN (DCGAN) on MNIST?",
  "options": [
    "A random noise vector z sampled from a latent prior distribution (e.g. Gaussian or Uniform in 100-D)",
    "A clean 28x28 digit image",
    "One-hot class labels only",
    "A text description of the digit"
  ],
  "correctAnswer": 0,
  "explanation": "The generator takes an unconstrained latent noise vector z ~ N(0, I) and maps it through transposed convolutions to generate a realistic image.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-15-3",
  "experimentId": 15,
  "question": "What is the role of Conv2DTranspose (transposed convolution) layers in the DCGAN Generator?",
  "options": [
    "Upsampling low-resolution spatial feature maps into high-resolution images (e.g. 7x7 -> 14x14 -> 28x28)",
    "Downsampling images to extract features",
    "Computing classification probabilities",
    "Applying Gaussian blur"
  ],
  "correctAnswer": 0,
  "explanation": "Conv2DTranspose performs learnable fractionally strided upsampling, expanding spatial dimensions progressively into a full-resolution 28x28 image.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-15-4",
  "experimentId": 15,
  "question": "Why is LeakyReLU activation preferred over standard ReLU in the Discriminator of a DCGAN?",
  "options": [
    "It provides a non-zero gradient (e.g. slope 0.2) for negative values, preventing dead neurons and maintaining training gradients for G",
    "It produces negative probabilities",
    "It bounds outputs strictly between 0 and 1",
    "It removes the need for backpropagation"
  ],
  "correctAnswer": 0,
  "explanation": "LeakyReLU ensures that even when a neuron is inactive (z < 0), a small gradient flows backward so the Generator can continue learning from its mistakes.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-15-5",
  "experimentId": 15,
  "question": "What is the theoretical Nash Equilibrium value of the Discriminator output D(x) for all inputs when training reaches perfection?",
  "options": [
    "D(x) = 0.5 (the discriminator is completely unable to distinguish real samples from generated fakes)",
    "D(x) = 1.0 everywhere",
    "D(x) = 0.0 everywhere",
    "D(x) oscillates between -1 and +1"
  ],
  "correctAnswer": 0,
  "explanation": "At the theoretical optimum, the generator's distribution matches the real data distribution p_g = p_data, so D outputs 0.5 (random guess) everywhere.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-15-6",
  "experimentId": 15,
  "question": "What severe failure mode is known as 'Mode Collapse' in GAN training?",
  "options": [
    "The generator discovers a single or narrow set of samples that fools the discriminator and produces only that sample repeatedly, ignoring diversity",
    "The discriminator loss reaches zero",
    "The computer runs out of memory",
    "The learning rate becomes negative"
  ],
  "correctAnswer": 0,
  "explanation": "Mode collapse occurs when G specializes in producing only one digit (e.g. only drawing numeral '1') that tricks D, failing to generate the other 9 digits.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-15-7",
  "experimentId": 15,
  "question": "Why is the Generator trained using the objective max_G log(D(G(z))) rather than min_G log(1 - D(G(z))) early in training?",
  "options": [
    "Early in training, D easily rejects fakes, causing log(1 - D(G(z))) gradients to saturate and vanish; max log(D) provides strong early gradients",
    "It saves GPU memory",
    "It converts binary loss to MSE",
    "It eliminates the discriminator"
  ],
  "correctAnswer": 0,
  "explanation": "min log(1 - D) suffers from vanishing gradients when D is strong early on. Maximizing log(D) provides much larger gradients in early epochs.",
  "difficulty": "advanced",
  "type": "application"
},
  {
  "id": "q-15-8",
  "experimentId": 15,
  "question": "If the Generator output layer uses Tanh activation, how must real training images from MNIST be preprocessed?",
  "options": [
    "Normalized to the range [-1.0, 1.0] via (X - 127.5) / 127.5",
    "Normalized to [0.0, 1.0] via X / 255.0",
    "Binarized to {0, 1}",
    "Left as raw integers [0, 255]"
  ],
  "correctAnswer": 0,
  "explanation": "Tanh outputs values strictly in [-1.0, 1.0]. Real images must be mapped to the exact same range for the discriminator to compare them fairly.",
  "difficulty": "basic",
  "type": "application"
},
  {
  "id": "q-15-9",
  "experimentId": 15,
  "question": "Why does standard DCGAN design omit Batch Normalization from the Generator output layer and Discriminator input layer?",
  "options": [
    "Normalizing raw output pixels directly causes sample oscillation and visual color distortion",
    "Batch Normalization is unsupported on GPUs",
    "It slows down training by 100x",
    "It causes syntax errors in Keras"
  ],
  "correctAnswer": 0,
  "explanation": "Radford et al. (2015) established that applying BN to the generator output layer and discriminator input layer destabilizes pixel distributions.",
  "difficulty": "advanced",
  "type": "application"
},
  {
  "id": "q-15-10",
  "experimentId": 15,
  "question": "What popular quantitative metric evaluates GAN image fidelity and diversity by comparing feature statistics against real ImageNet distributions?",
  "options": [
    "Fr\u00e9chet Inception Distance (FID)",
    "Mean Squared Error (MSE)",
    "R-squared Score",
    "Confusion Matrix Accuracy"
  ],
  "correctAnswer": 0,
  "explanation": "FID extracts deep features using InceptionV3 and calculates Wasserstein-2 distance between Gaussian approximations of real and generated feature spaces.",
  "difficulty": "advanced",
  "type": "application"
},
  {
  "id": "q-16-1",
  "experimentId": 16,
  "question": "What is the foundational architecture of an Autoencoder?",
  "options": [
    "An Encoder network that compresses input x into a low-dimensional latent bottleneck z, and a Decoder network that reconstructs x_hat from z",
    "A classifier followed by a regression tree",
    "A single recurrent cell with feedback",
    "A discriminator competing with a generator"
  ],
  "correctAnswer": 0,
  "explanation": "Autoencoders consist of two symmetric sub-networks: an Encoder mapping input to latent code z, and a Decoder reconstructing the input from z.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-16-2",
  "experimentId": 16,
  "question": "In a Denoising Autoencoder, how are the training inputs and targets structured?",
  "options": [
    "Input to encoder is artificially corrupted with noise (x_noisy); target for reconstruction loss is the original clean image (x_clean)",
    "Both input and target are clean images",
    "Both input and target are pure noise",
    "Input is target label integer"
  ],
  "correctAnswer": 0,
  "explanation": "Denoising Autoencoders receive corrupted inputs x_tilde and are trained to output the clean uncorrupted target x, learning to strip noise.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-16-3",
  "experimentId": 16,
  "question": "Why does a Denoising Autoencoder not simply learn the trivial identity function f(x) = x?",
  "options": [
    "Because the input contains noise while the target is clean, forcing the model to learn the underlying manifold of valid clean images",
    "Because hidden layers have zero weights",
    "Because Keras prevents identity mappings",
    "Because it uses non-differentiable layers"
  ],
  "correctAnswer": 0,
  "explanation": "Since noisy inputs do not match clean targets, an identity function would yield high loss. The network must remove noise to minimize MSE.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-16-4",
  "experimentId": 16,
  "question": "What loss function is most commonly minimized when training an Autoencoder on normalized [0, 1] images?",
  "options": [
    "Mean Squared Error (MSE) or Binary Cross-Entropy",
    "Categorical Hinge Loss",
    "Kullback-Leibler Divergence alone",
    "Sparse Categorical Cross-Entropy"
  ],
  "correctAnswer": 0,
  "explanation": "Pixel-wise reconstruction error is evaluated using MSE (mean squared difference between clean and reconstructed pixels) or Binary Cross-Entropy.",
  "difficulty": "basic",
  "type": "conceptual"
},
  {
  "id": "q-16-5",
  "experimentId": 16,
  "question": "What is the 'latent bottleneck', and why is its restricted dimensionality essential?",
  "options": [
    "The compressed middle representation with fewer dimensions than the input; it forces the network to retain only essential features and drop noise",
    "The GPU memory buffer",
    "The final output layer",
    "The data loading pipeline"
  ],
  "correctAnswer": 0,
  "explanation": "An information bottleneck prevents trivial memorization, compelling the encoder to extract the most compact, robust semantic summary.",
  "difficulty": "intermediate",
  "type": "conceptual"
},
  {
  "id": "q-16-6",
  "experimentId": 16,
  "question": "In a Convolutional Denoising Autoencoder for 28x28 images, which layer pair achieves spatial downsampling and upsampling?",
  "options": [
    "Conv2D with stride=2 (downsampling) and Conv2DTranspose with stride=2 (upsampling)",
    "Dense layers and Flatten",
    "AveragePooling and Dropout",
    "BatchNormalization and Softmax"
  ],
  "correctAnswer": 0,
  "explanation": "Strided Conv2D reduces spatial dimensions into the bottleneck; Conv2DTranspose reconstructs full spatial dimensions back to 28x28.",
  "difficulty": "intermediate",
  "type": "application"
},
  {
  "id": "q-16-7",
  "experimentId": 16,
  "question": "What decibel (dB) metric measures image restoration quality by comparing maximum signal power to mean squared reconstruction noise?",
  "options": [
    "Peak Signal-to-Noise Ratio (PSNR)",
    "Accuracy Percentage",
    "Area Under ROC Curve",
    "Perplexity"
  ],
  "correctAnswer": 0,
  "explanation": "PSNR = 10 * log10(MAX_I^2 / MSE). Higher PSNR (e.g. 25-35 dB) indicates superior denoising restoration quality.",
  "difficulty": "basic",
  "type": "application"
},
  {
  "id": "q-16-8",
  "experimentId": 16,
  "question": "If Gaussian noise with mean 0 and std 0.4 is added to normalized pixels in [0, 1], why must np.clip(noisy, 0.0, 1.0) be applied?",
  "options": [
    "To prevent invalid pixel values below 0.0 or above 1.0 that violate physical image representation bounds",
    "To invert the colors",
    "To accelerate matrix multiplication",
    "To convert grayscale to RGB"
  ],
  "correctAnswer": 0,
  "explanation": "Adding random Gaussian noise can push pixel values below 0 or above 1. Clipping bounds values to valid normalized visual ranges.",
  "difficulty": "basic",
  "type": "application"
},
  {
  "id": "q-16-9",
  "experimentId": 16,
  "question": "How can a trained Denoising Autoencoder be utilized for automated industrial anomaly / defect detection?",
  "options": [
    "Normal defect-free items reconstruct with very low MSE loss; defective or foreign items reconstruct poorly with high anomaly reconstruction error",
    "It classifies products using a decision tree",
    "It generates marketing photos",
    "It increases assembly line speed"
  ],
  "correctAnswer": 0,
  "explanation": "Having only learned the manifold of healthy normal items, the autoencoder fails to reconstruct unfamiliar defects, flagging them via high pixel residuals.",
  "difficulty": "advanced",
  "type": "application"
},
  {
  "id": "q-16-10",
  "experimentId": 16,
  "question": "How does a Variational Autoencoder (VAE) differ from a standard deterministic Denoising Autoencoder?",
  "options": [
    "A VAE maps inputs to parameters of a probability distribution (mean and variance) and uses KL Divergence to enable smooth generative sampling",
    "A VAE has no decoder",
    "A VAE cannot denoise images",
    "A VAE only works on audio signals"
  ],
  "correctAnswer": 0,
  "explanation": "VAEs enforce a continuous, probabilistic latent prior (standard Gaussian), allowing random latent vectors to be decoded into novel synthetic samples.",
  "difficulty": "advanced",
  "type": "application"
}
];

export function getQuizByExperiment(experimentId: number): QuizQuestion[] {
  return QUIZ_QUESTIONS.filter(q => q.experimentId === experimentId);
}

export function getComprehensiveExam(questionCount: number = 30): QuizQuestion[] {
  const shuffled = [...QUIZ_QUESTIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(questionCount, shuffled.length)).map(q => ({
    ...q,
    correct_answer: q.correctAnswer,
    experiment_id: q.experimentId,
  }));
}

export const generateComprehensiveExam = getComprehensiveExam;

export const quizzesByExperiment: Record<number, QuizQuestion[]> = {};
for (const q of QUIZ_QUESTIONS) {
  const expId = q.experimentId || q.experiment_id || 1;
  if (!quizzesByExperiment[expId]) {
    quizzesByExperiment[expId] = [];
  }
  quizzesByExperiment[expId].push({
    ...q,
    correct_answer: q.correctAnswer,
    experiment_id: q.experimentId,
  });
}

