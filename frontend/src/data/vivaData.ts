import { VivaQuestion } from '../types';

export const VIVA_QUESTIONS: VivaQuestion[] = [
  {
  "id": "viva-1-1",
  "experimentId": 1,
  "question": "What is a biological neuron vs an artificial perceptron?",
  "shortAnswer": "A biological neuron sums inputs in soma and fires through axon; a perceptron computes w^T x + b and applies step activation.",
  "detailedAnswer": "Biological neurons communicate via electrochemical action potentials. The artificial perceptron abstracts this into inputs, synaptic weights, bias, summation, and threshold activation.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-1-2",
  "experimentId": 1,
  "question": "What is the role of bias b?",
  "shortAnswer": "Bias shifts the decision boundary away from the origin.",
  "detailedAnswer": "Without bias, the hyperplane w^T x = 0 must pass through (0,0), preventing separation of offset clusters.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-1-3",
  "experimentId": 1,
  "question": "Why can't Perceptron solve XOR?",
  "shortAnswer": "XOR is not linearly separable in 2D Euclidean space.",
  "detailedAnswer": "Positive points (0,1) and (1,0) cannot be separated from (0,0) and (1,1) by any single straight line.",
  "category": "external-viva",
  "difficulty": "intermediate"
},
  {
  "id": "viva-1-4",
  "experimentId": 1,
  "question": "State the Perceptron learning rule.",
  "shortAnswer": "w_new = w_old + eta * (y - y_hat) * x.",
  "detailedAnswer": "Weights are updated only when a sample is misclassified, shifting the hyperplane towards the misclassified point.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-1-5",
  "experimentId": 1,
  "question": "State the Novikoff Convergence Theorem.",
  "shortAnswer": "If data is linearly separable with margin gamma, Perceptron converges in at most (R/gamma)^2 mistakes.",
  "detailedAnswer": "R is the maximum norm of input vectors. The theorem proves guaranteed termination for separable data.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-1-6",
  "experimentId": 1,
  "question": "What features are in placement.csv?",
  "shortAnswer": "CGPA and Resume Score predicting binary placed status.",
  "detailedAnswer": "A 2D feature matrix X where columns represent grades and resume quality.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-1-7",
  "experimentId": 1,
  "question": "How are weights and bias accessed in sklearn Perceptron?",
  "shortAnswer": "Via clf.coef_ and clf.intercept_ attributes.",
  "detailedAnswer": "coef_ gives weight vector [w1, w2], intercept_ gives scalar b.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-1-8",
  "experimentId": 1,
  "question": "How do you plot the decision boundary line in 2D?",
  "shortAnswer": "x2 = -(w1*x1 + b) / w2.",
  "detailedAnswer": "Setting w1*x1 + w2*x2 + b = 0 and solving for x2 gives the line equation.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-1-9",
  "experimentId": 1,
  "question": "What if w2 equals zero during plotting?",
  "shortAnswer": "Division by zero occurs; the line is vertical at x1 = -b / w1.",
  "detailedAnswer": "Vertical boundaries must be drawn as vertical lines using plt.axvline.",
  "category": "debugging",
  "difficulty": "intermediate"
},
  {
  "id": "viva-1-10",
  "experimentId": 1,
  "question": "Why encode string targets before training?",
  "shortAnswer": "String targets raise TypeError in numeric calculations.",
  "detailedAnswer": "LabelEncoder or pd.factorize converts text classes into 0 and 1.",
  "category": "debugging",
  "difficulty": "basic"
},
  {
  "id": "viva-1-11",
  "experimentId": 1,
  "question": "Why is XOR accuracy ~50% with a single perceptron?",
  "shortAnswer": "A line can at best classify 2 or 3 of the 4 XOR points correctly.",
  "detailedAnswer": "The maximum accuracy achievable on XOR with a single linear cut is 75% or 50%.",
  "category": "why-how",
  "difficulty": "basic"
},
  {
  "id": "viva-1-12",
  "experimentId": 1,
  "question": "How does learning rate eta impact Perceptron?",
  "shortAnswer": "eta scales the update step size; for separable data without margin, it scales weights but preserves line direction.",
  "detailedAnswer": "In basic perceptron, changing eta merely scales the weight vector uniformly.",
  "category": "why-how",
  "difficulty": "intermediate"
},
  {
  "id": "viva-1-13",
  "experimentId": 1,
  "question": "What caused the 1969 AI Winter?",
  "shortAnswer": "Minsky and Papert's book proving perceptrons cannot solve XOR.",
  "detailedAnswer": "Funding collapsed when researchers realized single-layer perceptrons could not compute basic non-linear logic.",
  "category": "external-viva",
  "difficulty": "intermediate"
},
  {
  "id": "viva-1-14",
  "experimentId": 1,
  "question": "How can XOR be solved with feature engineering?",
  "shortAnswer": "Add interaction feature x3 = x1 * x2 to lift into 3D.",
  "detailedAnswer": "In 3D, the four XOR points become linearly separable by a horizontal plane.",
  "category": "why-how",
  "difficulty": "advanced"
},
  {
  "id": "viva-1-15",
  "experimentId": 1,
  "question": "Perceptron vs Adaline difference?",
  "shortAnswer": "Perceptron updates on thresholded step output; Adaline updates on continuous linear activation before thresholding.",
  "detailedAnswer": "Adaline introduced LMS gradient descent on continuous errors.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-1-16",
  "experimentId": 1,
  "question": "Can a single perceptron classify 3 classes?",
  "shortAnswer": "No, a single unit splits space into 2 regions; 3 classes require One-vs-Rest ensemble.",
  "detailedAnswer": "Multi-class classification requires K binary perceptrons or a multi-output dense layer.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-1-17",
  "experimentId": 1,
  "question": "What loss function does Perceptron minimize?",
  "shortAnswer": "The Perceptron Criterion: -sum(y_i * (w^T x_i + b)) over misclassified samples.",
  "detailedAnswer": "Loss is zero when all samples are correctly classified.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-1-18",
  "experimentId": 1,
  "question": "Why scale features before perceptron training?",
  "shortAnswer": "Large magnitude features dominate weight updates and slow convergence.",
  "detailedAnswer": "StandardScaler ensures isotropic gradient steps in all feature directions.",
  "category": "debugging",
  "difficulty": "intermediate"
},
  {
  "id": "viva-1-19",
  "experimentId": 1,
  "question": "How do NOT and XNOR gates behave?",
  "shortAnswer": "NOT is 1D linearly separable; XNOR is non-separable just like XOR.",
  "detailedAnswer": "XNOR outputs 1 for (0,0) and (1,1), failing the linear separability test.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-1-20",
  "experimentId": 1,
  "question": "Can changing activation to Sigmoid solve XOR on a single unit?",
  "shortAnswer": "No, because the decision boundary sigma(w^T x + b) = 0.5 is still the linear line w^T x + b = 0.",
  "detailedAnswer": "Monotonic activation functions cannot alter the linearity of the underlying hyperplane.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-2-1",
  "experimentId": 2,
  "question": "What is an ANN and how does it extend Perceptron?",
  "shortAnswer": "An ANN stacks multiple non-linear layers, allowing it to learn arbitrary non-linear boundaries.",
  "detailedAnswer": "Hidden layers transform input features into higher-dimensional representations that solve non-linear problems.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-2-2",
  "experimentId": 2,
  "question": "Explain Backpropagation steps.",
  "shortAnswer": "Forward pass computes activations; error computed at output; gradients computed via chain rule; weights updated by optimizer.",
  "detailedAnswer": "Backprop applies dLoss/dw = dLoss/da * da/dz * dz/dw backwards across layers.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-2-3",
  "experimentId": 2,
  "question": "Compare Sigmoid, Tanh, and ReLU.",
  "shortAnswer": "Sigmoid: (0, 1); Tanh: (-1, 1), zero-centered; ReLU: max(0, z), non-saturating for z > 0.",
  "detailedAnswer": "ReLU computes fastest and prevents vanishing gradients. Tanh is zero-centered.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-2-4",
  "experimentId": 2,
  "question": "Why is Tanh better than Sigmoid in hidden layers?",
  "shortAnswer": "Tanh is zero-centered, preventing directional bias in weight updates.",
  "detailedAnswer": "All-positive Sigmoid outputs force all weights to update in the same sign direction.",
  "category": "why-how",
  "difficulty": "intermediate"
},
  {
  "id": "viva-2-5",
  "experimentId": 2,
  "question": "Why does ReLU train faster than Sigmoid?",
  "shortAnswer": "Derivative is constant 1.0 for z > 0, avoiding exponential calculations and saturation.",
  "detailedAnswer": "ReLU computes in 1 CPU cycle and keeps gradient signals strong across layers.",
  "category": "why-how",
  "difficulty": "intermediate"
},
  {
  "id": "viva-2-6",
  "experimentId": 2,
  "question": "Compare SGD and Adam.",
  "shortAnswer": "SGD updates along negative gradient; Adam maintains momentum and adaptive per-parameter learning rates.",
  "detailedAnswer": "Adam converges much faster with minimal hyperparameter tuning.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-2-7",
  "experimentId": 2,
  "question": "What happened with eta=5.0 in Week 2?",
  "shortAnswer": "Loss exploded and diverged towards infinity / NaN.",
  "detailedAnswer": "Large steps overshoot the loss valley, destabilizing numerical calculations.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-2-8",
  "experimentId": 2,
  "question": "What happened with eta=0.0001 in Week 2?",
  "shortAnswer": "Convergence was extremely slow, failing to reach good accuracy in 300 epochs.",
  "detailedAnswer": "Tiny learning rates take negligible steps and get stuck in flat regions.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-2-9",
  "experimentId": 2,
  "question": "Describe the Iris dataset.",
  "shortAnswer": "150 samples, 4 features, 3 balanced species classes (Setosa, Versicolor, Virginica).",
  "detailedAnswer": "Sepal and petal length/width measurements used for multi-class classification.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-2-10",
  "experimentId": 2,
  "question": "Why one-hot encode target labels?",
  "shortAnswer": "Prevents the model from assuming false numerical order between categories.",
  "detailedAnswer": "Setosa=0, Versicolor=1, Virginica=2 would falsely imply that Virginica > Setosa.",
  "category": "why-how",
  "difficulty": "basic"
},
  {
  "id": "viva-2-11",
  "experimentId": 2,
  "question": "What is Softmax activation?",
  "shortAnswer": "e^z_i / sum(e^z_j). Normalizes outputs into a probability distribution summing to 1.",
  "detailedAnswer": "Converts logits into valid posterior probabilities for mutually exclusive classes.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-2-12",
  "experimentId": 2,
  "question": "What is Categorical Cross-Entropy?",
  "shortAnswer": "Loss = -sum(y_true * log(y_pred)). Penalizes incorrect confident predictions heavily.",
  "detailedAnswer": "Approaches 0 as predicted probability for the true class approaches 1.0.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-2-13",
  "experimentId": 2,
  "question": "Why train with 30% train and 70% test in Week 2?",
  "shortAnswer": "To evaluate model generalization and overfitting under scarce training data.",
  "detailedAnswer": "Tests whether backpropagation can discover generalizable rules from very few samples.",
  "category": "why-how",
  "difficulty": "intermediate"
},
  {
  "id": "viva-2-14",
  "experimentId": 2,
  "question": "Describe the Ionosphere dataset.",
  "shortAnswer": "351 radar returns with 34 features predicting Good or Bad electromagnetic structure.",
  "detailedAnswer": "High-frequency radar signals from antenna arrays in Goose Bay, Labrador.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-2-15",
  "experimentId": 2,
  "question": "Fix for input_dim mismatch error?",
  "shortAnswer": "Set input_dim or input_shape of the first layer to match X.shape[1].",
  "detailedAnswer": "ValueError occurs if the first layer expects different feature dimension than input.",
  "category": "debugging",
  "difficulty": "basic"
},
  {
  "id": "viva-2-16",
  "experimentId": 2,
  "question": "Causes of Loss: NaN during training?",
  "shortAnswer": "Exploding gradients, high learning rate, log(0), or unnormalized large inputs.",
  "detailedAnswer": "Fix by standardizing inputs, lowering learning rate, and clipping gradients.",
  "category": "debugging",
  "difficulty": "intermediate"
},
  {
  "id": "viva-2-17",
  "experimentId": 2,
  "question": "Batch size tradeoffs?",
  "shortAnswer": "Small batch has noisy gradients that escape local minima; large batch offers vectorization speed.",
  "detailedAnswer": "Mini-batch size 16-64 provides the best empirical balance.",
  "category": "external-viva",
  "difficulty": "intermediate"
},
  {
  "id": "viva-2-18",
  "experimentId": 2,
  "question": "Epoch vs Batch vs Iteration?",
  "shortAnswer": "Epoch is 1 pass over all data; Batch is subset processed together; Iteration is 1 weight update.",
  "detailedAnswer": "If N=150 and batch=10, 1 epoch contains 15 iterations.",
  "category": "external-viva",
  "difficulty": "basic"
},
  {
  "id": "viva-2-19",
  "experimentId": 2,
  "question": "model.evaluate() vs model.predict()?",
  "shortAnswer": "evaluate returns loss and metrics with true y; predict returns class probabilities without y.",
  "detailedAnswer": "Use predict for inference on unseen data, evaluate for test set benchmarks.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-2-20",
  "experimentId": 2,
  "question": "Why can't backprop use Step activation?",
  "shortAnswer": "Derivative of Step is zero everywhere (undefined at 0), killing gradient flow.",
  "detailedAnswer": "Backpropagation requires non-zero derivatives to transmit error signals.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-3-1",
  "experimentId": 3,
  "question": "What is a Deep Feed-Forward ANN?",
  "shortAnswer": "A network with multiple successive hidden layers (>= 4 in Exp 3) learning hierarchical representations.",
  "detailedAnswer": "Each layer transforms the representations of previous layers into higher-level abstractions.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-3-2",
  "experimentId": 3,
  "question": "What is the Universal Approximation Theorem?",
  "shortAnswer": "A 1-hidden-layer network can approximate any continuous function, but depth offers exponential parameter efficiency.",
  "detailedAnswer": "Deep networks compose representations hierarchically, solving complex functions with far fewer neurons.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-3-3",
  "experimentId": 3,
  "question": "What weight initialization is best with ReLU?",
  "shortAnswer": "He (Kaiming) Normal or Uniform initialization.",
  "detailedAnswer": "He initialization samples from N(0, sqrt(2/n_in)), accounting for the 50% zeroing by ReLU.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-3-4",
  "experimentId": 3,
  "question": "What happens if all weights are initialized to 0?",
  "shortAnswer": "Symmetry breaking fails: all neurons in a layer compute identical outputs and gradients.",
  "detailedAnswer": "The network behaves as if each layer has only a single neuron.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-3-5",
  "experimentId": 3,
  "question": "What is the Dying ReLU problem?",
  "shortAnswer": "Neurons whose net input is consistently negative output 0 with 0 gradient permanently.",
  "detailedAnswer": "Once inactive, zero gradient prevents the weights from ever updating back to active state.",
  "category": "conceptual",
  "difficulty": "advanced"
},
  {
  "id": "viva-3-6",
  "experimentId": 3,
  "question": "How many parameters in: 34 -> 32 -> 24 -> 16 -> 8 -> 2?",
  "shortAnswer": "2,466 total trainable parameters.",
  "detailedAnswer": "34*32+32=1120; 32*24+24=792; 24*16+16=400; 16*8+8=136; 8*2+2=18. Total = 2,466.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-3-7",
  "experimentId": 3,
  "question": "How does deep ANN compare to shallow on Ionosphere?",
  "shortAnswer": "Deep ANN forms more complex non-linear decision regions, capturing higher-order radar interactions.",
  "detailedAnswer": "Empirical accuracy on test split improves due to compositional feature learning.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-3-8",
  "experimentId": 3,
  "question": "How do you stabilize oscillating loss in deep ANN?",
  "shortAnswer": "Reduce learning rate, add momentum/Adam, or apply learning rate decay schedules.",
  "detailedAnswer": "Smaller update steps allow the optimizer to traverse narrow ravines in the loss landscape.",
  "category": "debugging",
  "difficulty": "intermediate"
},
  {
  "id": "viva-3-9",
  "experimentId": 3,
  "question": "Why funnel layer widths (34 -> 32 -> 24 -> 16 -> 8 -> 2)?",
  "shortAnswer": "Acts as an information bottleneck, compressing signals and discarding noise.",
  "detailedAnswer": "Forces earlier layers to retain only the most discriminative latent factors.",
  "category": "why-how",
  "difficulty": "advanced"
},
  {
  "id": "viva-3-10",
  "experimentId": 3,
  "question": "How does EarlyStopping callback work in Keras?",
  "shortAnswer": "Monitors validation loss, halts training when no improvement occurs for patience epochs.",
  "detailedAnswer": "restore_best_weights=True ensures the model retains weights from the epoch with minimal val loss.",
  "category": "code-specific",
  "difficulty": "advanced"
},
  {
  "id": "viva-3-11",
  "experimentId": 3,
  "question": "What is internal representation in deep ANN?",
  "shortAnswer": "Latent feature vectors computed by intermediate hidden layers.",
  "detailedAnswer": "Earlier layers learn primitive linear combinations; later layers learn task-specific manifolds.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-3-12",
  "experimentId": 3,
  "question": "Why is deeper better than wider?",
  "shortAnswer": "Depth provides combinatorial expressive power by composing sub-functions exponentially.",
  "detailedAnswer": "A network with k layers of width n can express functions requiring exponential width in 1 layer.",
  "category": "why-how",
  "difficulty": "intermediate"
},
  {
  "id": "viva-3-13",
  "experimentId": 3,
  "question": "What is the vanishing gradient problem in deep ANNs?",
  "shortAnswer": "Gradients exponentially decay toward zero as they backpropagate through many layers.",
  "detailedAnswer": "Repeated multiplication of small derivatives (e.g. < 0.25 in Sigmoid) halts learning in early layers.",
  "category": "external-viva",
  "difficulty": "intermediate"
},
  {
  "id": "viva-3-14",
  "experimentId": 3,
  "question": "How does LeakyReLU differ from ReLU?",
  "shortAnswer": "LeakyReLU allows a small positive slope (e.g. 0.01*z) for z < 0.",
  "detailedAnswer": "Prevents dying neurons by ensuring a small non-zero gradient always flows backward.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-3-15",
  "experimentId": 3,
  "question": "What is ELU (Exponential Linear Unit)?",
  "shortAnswer": "Smooth activation equal to z for z > 0 and alpha*(e^z - 1) for z <= 0.",
  "detailedAnswer": "Produces negative values that bring mean unit activations closer to zero, speeding learning.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-3-16",
  "experimentId": 3,
  "question": "Why use He initialization instead of Xavier for ReLU?",
  "shortAnswer": "Xavier assumes linear or tanh activations; He accounts for half of ReLU activations being zero.",
  "detailedAnswer": "Xavier variance is 1/n_in; He variance is 2/n_in to keep variance constant across ReLU layers.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-3-17",
  "experimentId": 3,
  "question": "What causes overfitting in a deep ANN?",
  "shortAnswer": "Excessive parameter capacity relative to training sample count.",
  "detailedAnswer": "The network memorizes individual noise artifacts rather than underlying general trends.",
  "category": "why-how",
  "difficulty": "basic"
},
  {
  "id": "viva-3-18",
  "experimentId": 3,
  "question": "How to diagnose vanishing gradients in code?",
  "shortAnswer": "Inspect model.trainable_weights gradient norms during training steps.",
  "detailedAnswer": "If early layer gradients are 1e-7 while late layers are 1e-1, vanishing gradient is occurring.",
  "category": "debugging",
  "difficulty": "advanced"
},
  {
  "id": "viva-3-19",
  "experimentId": 3,
  "question": "What does model.summary() display?",
  "shortAnswer": "Layer names, output shapes, and parameter counts (trainable and non-trainable).",
  "detailedAnswer": "Used to verify layer dimensions, connections, and total memory footprint.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-3-20",
  "experimentId": 3,
  "question": "Can a Deep Feedforward ANN classify images reliably?",
  "shortAnswer": "It works on small digits (MNIST) but fails on complex scenes because it lacks translation invariance.",
  "detailedAnswer": "Flattening destroys spatial locality and requires millions of redundant parameters.",
  "category": "external-viva",
  "difficulty": "intermediate"
},
  {
  "id": "viva-4-1",
  "experimentId": 4,
  "question": "Why Flatten 28x28 images for Dense layers?",
  "shortAnswer": "Dense layers perform matrix dot product with 1D vectors; Flatten converts 28x28 into 784.",
  "detailedAnswer": "Fully connected weights connect to individual feature scalars, requiring flattened vectors.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-4-2",
  "experimentId": 4,
  "question": "Why divide MNIST pixels by 255.0?",
  "shortAnswer": "Normalizes pixels from [0, 255] to [0.0, 1.0], preventing gradient explosion and saturation.",
  "detailedAnswer": "Keeps forward weighted sums in well-behaved numeric ranges.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-4-3",
  "experimentId": 4,
  "question": "Sparse categorical vs categorical crossentropy?",
  "shortAnswer": "Sparse accepts integer class labels (0-9); categorical requires one-hot encoded vectors.",
  "detailedAnswer": "Sparse categorical crossentropy saves memory by avoiding one-hot target matrix creation.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-4-4",
  "experimentId": 4,
  "question": "Major flaw of Dense networks for images?",
  "shortAnswer": "Lack of translation invariance: a shifted digit appears as an entirely novel feature pattern.",
  "detailedAnswer": "Dense layers assign independent weights to each pixel location without spatial sharing.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-4-5",
  "experimentId": 4,
  "question": "What do off-diagonal confusion matrix elements show?",
  "shortAnswer": "Misclassifications where True Class != Predicted Class.",
  "detailedAnswer": "For example, cell [4, 9] counts how many true 4s were mispredicted as 9s.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-4-6",
  "experimentId": 4,
  "question": "Parameters in Flatten -> Dense(128)?",
  "shortAnswer": "784 * 128 + 128 = 100,480 parameters.",
  "detailedAnswer": "Each of the 128 neurons has 784 weights plus 1 bias term.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-4-7",
  "experimentId": 4,
  "question": "Why might a canvas hand-drawn digit fail on MNIST model?",
  "shortAnswer": "MNIST has black background (0) and white ink (255); black ink on white canvas is inverted.",
  "detailedAnswer": "Input pixels must be inverted (255 - pixel) and centered before feeding to the model.",
  "category": "debugging",
  "difficulty": "intermediate"
},
  {
  "id": "viva-4-8",
  "experimentId": 4,
  "question": "What is Precision in digit classification?",
  "shortAnswer": "True Positives / (True Positives + False Positives).",
  "detailedAnswer": "Measures the reliability of the model when it predicts a specific digit class.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-4-9",
  "experimentId": 4,
  "question": "Why does Deep ANN perform poorly on CIFAR-10 (~50%)?",
  "shortAnswer": "Natural 32x32x3 color images have complex backgrounds and pose shifts that require convolution.",
  "detailedAnswer": "Dense networks suffer from parameter explosion and cannot capture local translation invariance.",
  "category": "why-how",
  "difficulty": "intermediate"
},
  {
  "id": "viva-4-10",
  "experimentId": 4,
  "question": "How to detect overfitting from epoch accuracy curves?",
  "shortAnswer": "Training accuracy continues climbing while validation accuracy peaks and starts dropping.",
  "detailedAnswer": "The divergence point indicates when model begins memorizing training noise.",
  "category": "why-how",
  "difficulty": "intermediate"
},
  {
  "id": "viva-4-11",
  "experimentId": 4,
  "question": "What is HeNormal initialization in Keras?",
  "shortAnswer": "kernel_initializer='HeNormal' draws weights from N(0, sqrt(2/fan_in)).",
  "detailedAnswer": "Ensures activation variance remains stable through deep ReLU networks.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-4-12",
  "experimentId": 4,
  "question": "What is Macro F1 vs Weighted F1 score?",
  "shortAnswer": "Macro computes unweighted average across classes; Weighted weights by class support.",
  "detailedAnswer": "Macro F1 penalizes models that perform poorly on minority classes.",
  "category": "external-viva",
  "difficulty": "intermediate"
},
  {
  "id": "viva-4-13",
  "experimentId": 4,
  "question": "What is the MNIST dataset?",
  "shortAnswer": "60,000 training and 10,000 testing 28x28 grayscale handwritten digits (0-9).",
  "detailedAnswer": "Standard benchmark created by Yann LeCun, Corinna Cortes, and Christopher Burges.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-4-14",
  "experimentId": 4,
  "question": "What does validation_split=0.2 do in model.fit()?",
  "shortAnswer": "Reserves the last 20% of training data exclusively for validation after each epoch.",
  "detailedAnswer": "Allows monitoring generalization loss without touching the final test set.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-4-15",
  "experimentId": 4,
  "question": "Why use ReLU over Sigmoid in MNIST hidden layers?",
  "shortAnswer": "ReLU prevents saturation, trains 6x faster, and enables deeper networks.",
  "detailedAnswer": "Sigmoid saturates quickly on 784 inputs, stalling backpropagation.",
  "category": "why-how",
  "difficulty": "basic"
},
  {
  "id": "viva-4-16",
  "experimentId": 4,
  "question": "How to handle class imbalance in image classification?",
  "shortAnswer": "Use class_weight in model.fit() or apply focal loss / oversampling.",
  "detailedAnswer": "Balances loss gradient contributions so frequent classes don't dominate.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-4-17",
  "experimentId": 4,
  "question": "What is Top-k categorical accuracy?",
  "shortAnswer": "Measures if the true class is among the top k highest predicted probabilities.",
  "detailedAnswer": "Top-1 accuracy checks if argmax is correct; Top-5 checks if true class is in top 5.",
  "category": "external-viva",
  "difficulty": "basic"
},
  {
  "id": "viva-4-18",
  "experimentId": 4,
  "question": "Why are handwritten 4 and 9 commonly confused?",
  "shortAnswer": "They share similar vertical stems, horizontal crossbars, and upper loops.",
  "detailedAnswer": "When written hastily, the closed loop of 9 resembles the open prong of 4.",
  "category": "why-how",
  "difficulty": "intermediate"
},
  {
  "id": "viva-4-19",
  "experimentId": 4,
  "question": "What is the input shape of MNIST in Keras Sequential?",
  "shortAnswer": "input_shape=(28, 28) for Flatten layer, or (784,) if pre-flattened.",
  "detailedAnswer": "Specifying input shape informs Keras to build weight matrices on instantiation.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-4-20",
  "experimentId": 4,
  "question": "How to save and load trained MNIST weights?",
  "shortAnswer": "model.save('mnist_model.keras') and keras.models.load_model().",
  "detailedAnswer": "Saves architecture, weights, and optimizer state to a single HDF5/Keras zip file.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-5-1",
  "experimentId": 5,
  "question": "What is 2D Convolution?",
  "shortAnswer": "Sliding a weight kernel over an image, taking element-wise dot products, and adding bias to form feature maps.",
  "detailedAnswer": "Extracts local features such as edges, corners, and ridges across the spatial domain.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-5-2",
  "experimentId": 5,
  "question": "Output size of 28x28 convolved with 3x3 filter without padding?",
  "shortAnswer": "26 x 26 ((28 - 3 + 0)/1 + 1 = 26).",
  "detailedAnswer": "A valid convolution shrinks spatial dimensions by (kernel_size - 1) along each axis.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-5-3",
  "experimentId": 5,
  "question": "Purpose of Max Pooling?",
  "shortAnswer": "Downsamples feature maps, reduces computation and parameters, and provides local translation invariance.",
  "detailedAnswer": "Extracts the dominant maximum feature in each local window (e.g. 2x2).",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-5-4",
  "experimentId": 5,
  "question": "Parameters in Conv2D(32, (3, 3)) on 1-channel image?",
  "shortAnswer": "(3 * 3 * 1 + 1) * 32 = 320 parameters.",
  "detailedAnswer": "Each filter has 9 weights plus 1 bias. 32 filters have 320 parameters.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-5-5",
  "experimentId": 5,
  "question": "What is Receptive Field?",
  "shortAnswer": "The local patch in the input image that directly influences the activation of a neuron.",
  "detailedAnswer": "Grows larger as you move deeper through successive convolution and pooling layers.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-5-6",
  "experimentId": 5,
  "question": "Output shape after Conv2D(32, 3x3, valid) and MaxPool(2, 2) on 28x28x1?",
  "shortAnswer": "(13, 13, 32).",
  "detailedAnswer": "Conv2D shrinks 28 to 26; MaxPool divides 26 by 2 to get 13.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-5-7",
  "experimentId": 5,
  "question": "Output shape of Conv2D(64, 3x3, valid) on (13, 13, 32)?",
  "shortAnswer": "(11, 11, 64).",
  "detailedAnswer": "13 - 3 + 1 = 11. Spatial size becomes 11x11 across 64 feature channels.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-5-8",
  "experimentId": 5,
  "question": "Parameters in Conv2D(64, (3, 3)) on 32-channel input?",
  "shortAnswer": "(3 * 3 * 32 + 1) * 64 = 18,496 parameters.",
  "detailedAnswer": "Each filter has 3x3x32 = 288 weights plus 1 bias = 289. 64 filters have 18,496.",
  "category": "code-specific",
  "difficulty": "advanced"
},
  {
  "id": "viva-5-9",
  "experimentId": 5,
  "question": "Why do CNNs outperform Dense networks on images?",
  "shortAnswer": "Parameter sharing and spatial locality invariance.",
  "detailedAnswer": "A filter detecting an edge is applied across the whole image, drastically reducing parameters.",
  "category": "why-how",
  "difficulty": "basic"
},
  {
  "id": "viva-5-10",
  "experimentId": 5,
  "question": "How many units when Flattening (None, 5, 5, 64)?",
  "shortAnswer": "5 * 5 * 64 = 1,600 units.",
  "detailedAnswer": "Unrolls 3D tensor into a 1D vector feeding into Dense layers.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-5-11",
  "experimentId": 5,
  "question": "What is a Feature Map?",
  "shortAnswer": "The 2D output grid showing activations of a specific convolutional filter across the image.",
  "detailedAnswer": "Bright regions indicate strong match between the filter's kernel pattern and image patch.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-5-12",
  "experimentId": 5,
  "question": "Stride parameter in Conv2D?",
  "shortAnswer": "The step size by which the filter window slides across the input image.",
  "detailedAnswer": "Stride=1 shifts pixel-by-pixel; Stride=2 downsamples spatial dimensions by roughly half.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-5-13",
  "experimentId": 5,
  "question": "Average Pooling vs Max Pooling?",
  "shortAnswer": "Max pooling selects maximum value; Average pooling computes mean value.",
  "detailedAnswer": "Max pooling preserves sharp edges and contrast; Average pooling blurs features slightly.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-5-14",
  "experimentId": 5,
  "question": "Why is 3x3 filter preferred over larger filters?",
  "shortAnswer": "Stacking 3x3 filters covers large receptive fields with fewer parameters and more non-linearities.",
  "detailedAnswer": "Two 3x3 filters cover 5x5 with 18 weights vs 25 weights for a single 5x5.",
  "category": "why-how",
  "difficulty": "intermediate"
},
  {
  "id": "viva-5-15",
  "experimentId": 5,
  "question": "What are channel dimensions in RGB vs grayscale?",
  "shortAnswer": "Grayscale has 1 channel (H, W, 1); RGB has 3 channels (H, W, 3).",
  "detailedAnswer": "Convolution filters have depth matching the input channel count.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-5-16",
  "experimentId": 5,
  "question": "What is feature hierarchy in CNNs?",
  "shortAnswer": "Layer 1 detects edges; Layer 2 detects textures/corners; Layer 3 detects object parts.",
  "detailedAnswer": "Hierarchical abstraction mirrors the visual cortex in primate brains.",
  "category": "external-viva",
  "difficulty": "intermediate"
},
  {
  "id": "viva-5-17",
  "experimentId": 5,
  "question": "What is Translation Invariance vs Equivariance?",
  "shortAnswer": "Convolution is equivariant (shifted input produces shifted feature map); Pooling gives invariance.",
  "detailedAnswer": "Invariance means detecting a cat regardless of whether it is in the top-left or bottom-right.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-5-18",
  "experimentId": 5,
  "question": "Why use 1x1 convolutions?",
  "shortAnswer": "Performs cross-channel pooling, dimensionality reduction, and adds non-linearities.",
  "detailedAnswer": "Allows changing channel depth without altering spatial height and width.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-5-19",
  "experimentId": 5,
  "question": "Can CNNs handle variable input image sizes?",
  "shortAnswer": "Fully convolutional networks can; Dense heads require fixed input sizes or Global Pooling.",
  "detailedAnswer": "Dense layers have fixed weight matrices; Global Average Pooling enables variable inputs.",
  "category": "why-how",
  "difficulty": "advanced"
},
  {
  "id": "viva-5-20",
  "experimentId": 5,
  "question": "Fix for 'Negative dimension size' error in Conv2D?",
  "shortAnswer": "Reduce kernel size or add padding='same'.",
  "detailedAnswer": "Occurs when repeated valid convolutions shrink spatial dimension below filter size.",
  "category": "debugging",
  "difficulty": "intermediate"
},
  {
  "id": "viva-6-1",
  "experimentId": 6,
  "question": "Why stack 4+ convolution layers?",
  "shortAnswer": "Learns deep hierarchical abstractions from edges to complex object parts.",
  "detailedAnswer": "Deeper networks can represent more complex non-linear manifolds with fewer total parameters than wide shallow models.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-6-2",
  "experimentId": 6,
  "question": "Fashion MNIST validation accuracy across epochs 5, 10, 20?",
  "shortAnswer": "Steep rise by epoch 5 (~88%), steady gain by epoch 10 (~91%), plateau by epoch 20 (~93%).",
  "detailedAnswer": "Most generalization gains occur early; beyond epoch 10, risk of overfitting increases on small datasets.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-6-3",
  "experimentId": 6,
  "question": "Why does GPU run 8x-15x faster than CPU for CNNs?",
  "shortAnswer": "GPUs feature thousands of parallel CUDA/Tensor cores tailored for matrix tensor convolutions.",
  "detailedAnswer": "A CPU has 4-16 high-speed cores; a GPU has thousands of smaller cores executing SIMD matrix multiplications.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-6-4",
  "experimentId": 6,
  "question": "Risk of deep CNNs without normalization or skip connections?",
  "shortAnswer": "Vanishing or exploding gradients during backpropagation.",
  "detailedAnswer": "Repeated matrix multiplications cause gradients to decay or explode across multiple layers.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-6-5",
  "experimentId": 6,
  "question": "Receptive field of four stacked 3x3 conv layers?",
  "shortAnswer": "9 x 9 pixels.",
  "detailedAnswer": "Each 3x3 layer adds 2 pixels to the receptive field: 3 -> 5 -> 7 -> 9.",
  "category": "conceptual",
  "difficulty": "advanced"
},
  {
  "id": "viva-6-6",
  "experimentId": 6,
  "question": "Hardest classes to distinguish in Fashion MNIST?",
  "shortAnswer": "Pullover, Coat, and Shirt.",
  "detailedAnswer": "These garments share almost identical 28x28 grayscale torso silhouettes and collar lines.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-6-7",
  "experimentId": 6,
  "question": "Expected runtime on CPU vs Colab T4 GPU for 20 epochs?",
  "shortAnswer": "CPU: ~70-90s; GPU: ~8-12s (8-10x speedup).",
  "detailedAnswer": "Parallel CUDA convolution kernels process batches concurrently on GPU.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-6-8",
  "experimentId": 6,
  "question": "Check GPU availability in TensorFlow?",
  "shortAnswer": "tf.config.list_physical_devices('GPU').",
  "detailedAnswer": "Returns a non-empty list of available GPU devices recognized by TensorFlow runtime.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-6-9",
  "experimentId": 6,
  "question": "Effect of doubling batch size from 32 to 64 on GPU VRAM?",
  "shortAnswer": "Doubles memory allocated for intermediate activation and gradient tensors.",
  "detailedAnswer": "Larger batches require proportional GPU VRAM to store forward pass activations for backprop.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-6-10",
  "experimentId": 6,
  "question": "Sign of overfitting at 20 epochs on Fashion MNIST?",
  "shortAnswer": "Train loss drops to 0.08 while val loss rises from 0.28 to 0.42.",
  "detailedAnswer": "Widening divergence indicates memorization of training instances.",
  "category": "debugging",
  "difficulty": "intermediate"
},
  {
  "id": "viva-6-11",
  "experimentId": 6,
  "question": "How does filter count progression (32->32->64->64) work?",
  "shortAnswer": "Spatial size decreases through pooling while channel depth doubles to capture richer semantic combinations.",
  "detailedAnswer": "Preserves total informational capacity as spatial resolution shrinks.",
  "category": "why-how",
  "difficulty": "intermediate"
},
  {
  "id": "viva-6-12",
  "experimentId": 6,
  "question": "Why use two conv layers before each pooling layer?",
  "shortAnswer": "Increases receptive field and non-linearity before downsampling.",
  "detailedAnswer": "Stacking two 3x3 convs provides 5x5 receptive field with two ReLUs.",
  "category": "why-how",
  "difficulty": "intermediate"
},
  {
  "id": "viva-6-13",
  "experimentId": 6,
  "question": "What causes OOM (Out Of Memory) on GPU?",
  "shortAnswer": "Batch size or image resolution too large for available GPU VRAM.",
  "detailedAnswer": "Fix by reducing batch_size, downsampling image resolution, or using mixed precision float16.",
  "category": "debugging",
  "difficulty": "basic"
},
  {
  "id": "viva-6-14",
  "experimentId": 6,
  "question": "What is mixed precision training (fp16)?",
  "shortAnswer": "Using 16-bit half precision for matrix multiplies while maintaining 32-bit master weights.",
  "detailedAnswer": "Doubles computation speed on modern Tensor Cores and cuts VRAM usage by 50%.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-6-15",
  "experimentId": 6,
  "question": "Why does test accuracy lag training accuracy?",
  "shortAnswer": "Generalization gap due to statistical variance between train and unseen test distributions.",
  "detailedAnswer": "Overfitting causes the model to perform better on samples it has seen.",
  "category": "why-how",
  "difficulty": "basic"
},
  {
  "id": "viva-6-16",
  "experimentId": 6,
  "question": "What is gradient explosion and how to prevent it?",
  "shortAnswer": "Gradients grow exponentially large, causing NaN weights; prevented via gradient clipping or batch normalization.",
  "detailedAnswer": "clipnorm or clipvalue bounds gradient magnitudes before weight updates.",
  "category": "debugging",
  "difficulty": "intermediate"
},
  {
  "id": "viva-6-17",
  "experimentId": 6,
  "question": "How does Colab GPU runtime disconnect affect training?",
  "shortAnswer": "Ephemerality loses in-memory weights; ModelCheckpoint saves weights periodically to Google Drive.",
  "detailedAnswer": "Saving checkpoints ensures training can be resumed after session timeout.",
  "category": "debugging",
  "difficulty": "basic"
},
  {
  "id": "viva-6-18",
  "experimentId": 6,
  "question": "Difference between CUDA and cuDNN?",
  "shortAnswer": "CUDA is the general parallel computing platform; cuDNN is NVIDIA's specialized library of optimized deep learning primitives.",
  "detailedAnswer": "cuDNN provides hand-tuned assembly implementations of 2D convolutions, pooling, and activations.",
  "category": "external-viva",
  "difficulty": "intermediate"
},
  {
  "id": "viva-6-19",
  "experimentId": 6,
  "question": "What is TensorBoard and how is it used in Exp 6?",
  "shortAnswer": "Visualization toolkit for tracking epoch loss, accuracy curves, and weight histograms.",
  "detailedAnswer": "tf.keras.callbacks.TensorBoard logs training telemetry for real-time visualization.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-6-20",
  "experimentId": 6,
  "question": "Why do 4-layer CNNs achieve ~93% on Fashion MNIST but 99%+ on MNIST?",
  "shortAnswer": "Fashion MNIST has much higher intra-class variance and complex fabric textures than simple digits.",
  "detailedAnswer": "Digits are binary strokes with low ambiguity; clothing items have diverse styles and cuts.",
  "category": "external-viva",
  "difficulty": "intermediate"
},
  {
  "id": "viva-7-1",
  "experimentId": 7,
  "question": "Dimension formula for 2D convolution output?",
  "shortAnswer": "W_out = floor((W - F + 2P)/S) + 1.",
  "detailedAnswer": "Standard spatial formula accounting for input width W, filter F, padding P, and stride S.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-7-2",
  "experimentId": 7,
  "question": "What does padding='same' do in Keras?",
  "shortAnswer": "Pads zeros so that output spatial dimensions equal input dimensions when stride=1.",
  "detailedAnswer": "Prevents spatial shrinkage and preserves edge boundary information.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-7-3",
  "experimentId": 7,
  "question": "What is Internal Covariate Shift?",
  "shortAnswer": "Continuous shift in the distribution of layer inputs as preceding layer parameters update during training.",
  "detailedAnswer": "Slows down training by forcing layers to constantly adapt to shifting input distributions.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-7-4",
  "experimentId": 7,
  "question": "Two learnable parameters in Batch Normalization?",
  "shortAnswer": "Gamma (scale) and Beta (shift).",
  "detailedAnswer": "Allows the network to learn the optimal scale and shift, even undoing normalization if needed.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-7-5",
  "experimentId": 7,
  "question": "How does Batch Normalization behave at inference time?",
  "shortAnswer": "Uses exponential running averages of mean and variance accumulated during training.",
  "detailedAnswer": "Ensures deterministic predictions for single samples without depending on a batch.",
  "category": "conceptual",
  "difficulty": "advanced"
},
  {
  "id": "viva-7-6",
  "experimentId": 7,
  "question": "Output of 28x28 with 5x5 filter, stride 1, padding 'valid'?",
  "shortAnswer": "24 x 24 ((28 - 5 + 0)/1 + 1 = 24).",
  "detailedAnswer": "Shrinks spatial dimension by (5 - 1) = 4 pixels along each dimension.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-7-7",
  "experimentId": 7,
  "question": "Why does BN allow much higher learning rates?",
  "shortAnswer": "Prevents activation distributions from exploding or vanishing, stabilizing gradient updates.",
  "detailedAnswer": "Keeps layer inputs in linear or non-saturated regimes throughout training.",
  "category": "why-how",
  "difficulty": "intermediate"
},
  {
  "id": "viva-7-8",
  "experimentId": 7,
  "question": "Regularizing side effect of Batch Normalization?",
  "shortAnswer": "Mini-batch stochastic noise in mean/variance acts as mild regularizer, reducing need for dropout.",
  "detailedAnswer": "Slight noise perturbation prevents overfitting to individual training samples.",
  "category": "why-how",
  "difficulty": "intermediate"
},
  {
  "id": "viva-7-9",
  "experimentId": 7,
  "question": "Where to place BatchNormalization in CNN layer order?",
  "shortAnswer": "Immediately after Conv2D and before ReLU (Conv2D -> BN -> ReLU).",
  "detailedAnswer": "Normalizes the linear transformation z before squashing through non-linear activation.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-7-10",
  "experimentId": 7,
  "question": "Number of means/variances for input (32, 28, 28, 64) in BN?",
  "shortAnswer": "64 pairs of mean and variance (one pair per feature channel).",
  "detailedAnswer": "Statistics are calculated across batch (32) and spatial dimensions (28x28).",
  "category": "code-specific",
  "difficulty": "advanced"
},
  {
  "id": "viva-7-11",
  "experimentId": 7,
  "question": "What is zero padding?",
  "shortAnswer": "Adding rows and columns of zeros around the perimeter of an image.",
  "detailedAnswer": "Allows filters to center on border pixels without violating matrix boundaries.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-7-12",
  "experimentId": 7,
  "question": "Why does 'valid' padding cause spatial shrinkage?",
  "shortAnswer": "Filters cannot extend past image borders, shrinking each dimension by F-1.",
  "detailedAnswer": "In deep networks without padding, spatial dimensions shrink to 1x1 within a few layers.",
  "category": "why-how",
  "difficulty": "basic"
},
  {
  "id": "viva-7-13",
  "experimentId": 7,
  "question": "Difference between Batch Normalization and Layer Normalization?",
  "shortAnswer": "BN normalizes across the batch per channel; LN normalizes across features/channels per sample.",
  "detailedAnswer": "LN is preferred in RNNs and Transformers where batch sizes are small or variable.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-7-14",
  "experimentId": 7,
  "question": "What is Group Normalization?",
  "shortAnswer": "Divides channels into groups and normalizes within each group per sample.",
  "detailedAnswer": "Stable across arbitrary batch sizes (even batch_size=1) unlike Batch Normalization.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-7-15",
  "experimentId": 7,
  "question": "Why does BN fail with batch_size=1 during training?",
  "shortAnswer": "Variance is 0, causing division by zero or NaN.",
  "detailedAnswer": "BN requires at least 8-16 samples to calculate meaningful sample statistics.",
  "category": "debugging",
  "difficulty": "intermediate"
},
  {
  "id": "viva-7-16",
  "experimentId": 7,
  "question": "What does momentum=0.99 mean in BatchNormalization?",
  "shortAnswer": "Weight given to historical running mean vs current batch mean when updating moving statistics.",
  "detailedAnswer": "running_mean = 0.99 * running_mean + 0.01 * batch_mean.",
  "category": "code-specific",
  "difficulty": "advanced"
},
  {
  "id": "viva-7-17",
  "experimentId": 7,
  "question": "What is epsilon in Batch Normalization?",
  "shortAnswer": "Small constant (e.g. 1e-3) added to variance to prevent division by zero.",
  "detailedAnswer": "sqrt(variance + epsilon) ensures numerical stability.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-7-18",
  "experimentId": 7,
  "question": "Can BN be folded into convolution weights at deployment?",
  "shortAnswer": "Yes, gamma and beta can be mathematically folded into kernel weights and biases for zero inference overhead.",
  "detailedAnswer": "Eliminates BN calculation during production serving by modifying Conv2D weights directly.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-7-19",
  "experimentId": 7,
  "question": "Does SAME padding with stride 2 preserve spatial size?",
  "shortAnswer": "No, output size is ceil(W / S) = ceil(28 / 2) = 14x14.",
  "detailedAnswer": "Stride 2 downsamples spatial dimension by half even with padding='same'.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-7-20",
  "experimentId": 7,
  "question": "Why did models with BN train faster in Week 7?",
  "shortAnswer": "Loss converged in ~4 epochs compared to ~11 epochs without BN.",
  "detailedAnswer": "BN maintains stable gradient flow, allowing confident optimizer trajectory toward minima.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-8-1",
  "experimentId": 8,
  "question": "Difference between L1 and L2 regularization?",
  "shortAnswer": "L1 penalizes sum of absolute weights inducing sparsity; L2 penalizes sum of squared weights shrinking weights smoothly.",
  "detailedAnswer": "L1 does feature selection by zeroing weights; L2 shrinks all weights toward zero without setting them strictly to zero.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-8-2",
  "experimentId": 8,
  "question": "How does Dropout combat overfitting?",
  "shortAnswer": "Randomly deactivates a fraction p of neurons during each training step, preventing co-adaptation.",
  "detailedAnswer": "Forces each neuron to learn robust, generalizable features independently of its neighbors.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-8-3",
  "experimentId": 8,
  "question": "Inverted Dropout scaling during training?",
  "shortAnswer": "Active activations are divided by (1 - p) so expected value matches test time without post-scaling.",
  "detailedAnswer": "If rate=0.5, active units are multiplied by 2.0 during training.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-8-4",
  "experimentId": 8,
  "question": "How does Dropout behave during testing?",
  "shortAnswer": "It is turned off completely: all neurons remain active with no scaling.",
  "detailedAnswer": "During inference, the model behaves as an ensemble average over all thinned subnetworks.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-8-5",
  "experimentId": 8,
  "question": "Which model had smallest generalization gap in Week 8?",
  "shortAnswer": "Model e: L2 Regularization combined with Dropout (~0.1% gap).",
  "detailedAnswer": "Combines weight shrinkage with ensemble feature decorrelation for optimal generalization.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-8-6",
  "experimentId": 8,
  "question": "Gradient penalty added by L2 regularization?",
  "shortAnswer": "lambda * w (proportional weight decay).",
  "detailedAnswer": "Continuously subtracts a fraction of the weight during each gradient update step.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-8-7",
  "experimentId": 8,
  "question": "What visual curve defines underfitting?",
  "shortAnswer": "Both training accuracy and validation accuracy remain low and flat.",
  "detailedAnswer": "The model lacks capacity or is over-regularized, failing to capture training trends.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-8-8",
  "experimentId": 8,
  "question": "Active units in Dense(512) with Dropout(0.25)?",
  "shortAnswer": "512 * 0.75 = 384 active units on average.",
  "detailedAnswer": "25% of the units are randomly masked with zero during each training forward pass.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-8-9",
  "experimentId": 8,
  "question": "What happens if Dropout rate is set to 0.95?",
  "shortAnswer": "Severe underfitting because 95% of information capacity is lost.",
  "detailedAnswer": "Signals cannot propagate effectively through the network, preventing learning.",
  "category": "why-how",
  "difficulty": "intermediate"
},
  {
  "id": "viva-8-10",
  "experimentId": 8,
  "question": "Why not place Dropout on final Softmax layer?",
  "shortAnswer": "It would zero out class probability logits, disrupting cross-entropy calculation.",
  "detailedAnswer": "Output units must produce a valid normalized distribution summing to 1.0.",
  "category": "why-how",
  "difficulty": "advanced"
},
  {
  "id": "viva-8-11",
  "experimentId": 8,
  "question": "What is weight decay in AdamW?",
  "shortAnswer": "Decoupled weight decay applied directly to weights rather than added to the loss gradient.",
  "detailedAnswer": "Loshchilov & Hutter (2019) showed standard L2 in Adam interacts poorly with adaptive learning rates.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-8-12",
  "experimentId": 8,
  "question": "Why does L1 induce exact zero weights (sparsity)?",
  "shortAnswer": "The derivative of |w| is a constant +-1, continuing to pull weights to zero even when small.",
  "detailedAnswer": "L2 derivative lambda*w shrinks as w approaches 0, slowing down near the origin.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-8-13",
  "experimentId": 8,
  "question": "What is Early Stopping as a form of regularization?",
  "shortAnswer": "Halting training before weights overfit to the training distribution.",
  "detailedAnswer": "Restricts effective parameter search space to neighborhoods close to initial weights.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-8-14",
  "experimentId": 8,
  "question": "Can Dropout be applied to Convolutional layers?",
  "shortAnswer": "Yes, but SpatialDropout2D is preferred over standard Dropout for feature maps.",
  "detailedAnswer": "SpatialDropout2D drops entire feature channels rather than individual isolated pixels.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-8-15",
  "experimentId": 8,
  "question": "What is Monte Carlo Dropout (Gal & Ghahramani)?",
  "shortAnswer": "Keeping Dropout active at test time to sample multiple stochastic predictions for uncertainty estimation.",
  "detailedAnswer": "Allows standard neural networks to approximate Bayesian Gaussian processes.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-8-16",
  "experimentId": 8,
  "question": "How does label smoothing act as regularizer?",
  "shortAnswer": "Replaces hard 0 and 1 targets with 0.05 and 0.95, preventing overconfident output logits.",
  "detailedAnswer": "Discourages the network from driving weights to infinity to satisfy extreme softmax outputs.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-8-17",
  "experimentId": 8,
  "question": "Difference between kernel_regularizer and activity_regularizer?",
  "shortAnswer": "kernel_regularizer penalizes weight values; activity_regularizer penalizes neuron activation values.",
  "detailedAnswer": "Activity regularizers encourage sparse firing of hidden neurons.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-8-18",
  "experimentId": 8,
  "question": "Why did Base Model overfit in Week 8 on Fashion MNIST?",
  "shortAnswer": "Base model has no weight penalties, memorizing training patterns with ~8.4% generalization gap.",
  "detailedAnswer": "Train acc reached 96.5% while test acc was only 88.1%.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-8-19",
  "experimentId": 8,
  "question": "How to choose the L2 regularization factor lambda?",
  "shortAnswer": "Typically hyperparameter tuned across logarithmic grid [1e-5, 1e-4, 1e-3, 1e-2].",
  "detailedAnswer": "Too large causes underfitting; too small provides insufficient regularization.",
  "category": "debugging",
  "difficulty": "intermediate"
},
  {
  "id": "viva-8-20",
  "experimentId": 8,
  "question": "Does Dropout slow down training time per epoch?",
  "shortAnswer": "Negligible compute overhead, but requires more total epochs to converge to minimum.",
  "detailedAnswer": "Because capacity is halved during each pass, the network needs more steps to integrate weights.",
  "category": "why-how",
  "difficulty": "basic"
},
  {
  "id": "viva-9-1",
  "experimentId": 9,
  "question": "Objective of Data Augmentation?",
  "shortAnswer": "Artificially expands training size and diversity using label-preserving domain transformations to improve generalization.",
  "detailedAnswer": "Prevents overfitting by teaching the model to ignore irrelevant visual perturbations.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-9-2",
  "experimentId": 9,
  "question": "What does horizontal_flip=True do in ImageDataGenerator?",
  "shortAnswer": "Randomly mirrors images horizontally from left to right with 50% probability.",
  "detailedAnswer": "Teaches the model horizontal reflection invariance.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-9-3",
  "experimentId": 9,
  "question": "Why avoid vertical_flip=True on MNIST digits?",
  "shortAnswer": "Inverts digits into different classes or invalid characters (e.g. '6' becomes '9').",
  "detailedAnswer": "Augmentations must be strictly label-preserving.",
  "category": "why-how",
  "difficulty": "basic"
},
  {
  "id": "viva-9-4",
  "experimentId": 9,
  "question": "What does fill_mode='nearest' do?",
  "shortAnswer": "Fills newly exposed boundary pixels with the value of the nearest valid pixel.",
  "detailedAnswer": "Prevents black borders from appearing when images are rotated or shifted.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-9-5",
  "experimentId": 9,
  "question": "What transformation is applied by shear_range=0.2?",
  "shortAnswer": "Affine shear angle distortion shifting coordinates proportionally to distance from axis.",
  "detailedAnswer": "Simulates viewing objects from an oblique perspective angle.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-9-6",
  "experimentId": 9,
  "question": "What scaling occurs with zoom_range=0.2?",
  "shortAnswer": "Randomly zooms image between [0.8, 1.2] (80% to 120% scale).",
  "detailedAnswer": "Simulates objects appearing closer or further away from camera.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-9-7",
  "experimentId": 9,
  "question": "How does Data Augmentation benefit medical datasets with 50 scans?",
  "shortAnswer": "Creates thousands of realistic synthetic variations, preventing memorization on small cohorts.",
  "detailedAnswer": "Crucial regularizer when acquiring physical clinical patient data is expensive or rare.",
  "category": "why-how",
  "difficulty": "intermediate"
},
  {
  "id": "viva-9-8",
  "experimentId": 9,
  "question": "Is data augmentation applied during test set evaluation?",
  "shortAnswer": "No, test evaluation is performed strictly on unmodified original raw test images.",
  "detailedAnswer": "Ensures realistic, unadulterated measurement of real-world generalization.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-9-9",
  "experimentId": 9,
  "question": "What does brightness_range=[0.7, 1.3] simulate?",
  "shortAnswer": "Varying illumination conditions, such as bright direct sunlight vs dim indoor lighting.",
  "detailedAnswer": "Forces feature detectors to rely on contrast and geometry rather than raw intensity.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-9-10",
  "experimentId": 9,
  "question": "Risk of extreme augmentation (e.g. rotation=180, zoom=4.0)?",
  "shortAnswer": "Distorts images beyond recognizable reality, injecting misleading noise and degrading accuracy.",
  "detailedAnswer": "Violates label preservation and corrupts feature representations.",
  "category": "debugging",
  "difficulty": "intermediate"
},
  {
  "id": "viva-9-11",
  "experimentId": 9,
  "question": "Offline vs Online data augmentation?",
  "shortAnswer": "Offline generates and saves files to disk beforehand; Online synthesizes batches in RAM dynamically during training.",
  "detailedAnswer": "Online augmentation requires zero additional disk storage and presents fresh variations every epoch.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-9-12",
  "experimentId": 9,
  "question": "What is Albumentations library?",
  "shortAnswer": "Fast, highly optimized Python image augmentation library based on OpenCV.",
  "detailedAnswer": "Offers superior execution speed and broader transform suites than Keras ImageDataGenerator.",
  "category": "external-viva",
  "difficulty": "intermediate"
},
  {
  "id": "viva-9-13",
  "experimentId": 9,
  "question": "What is Test-Time Augmentation (TTA)?",
  "shortAnswer": "Augmenting test images multiple ways, predicting each, and averaging predictions for final class.",
  "detailedAnswer": "Improves test accuracy by 1-2% at the cost of N-times higher inference latency.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-9-14",
  "experimentId": 9,
  "question": "What does width_shift_range=0.2 do?",
  "shortAnswer": "Randomly translates the image horizontally by up to 20% of its total width.",
  "detailedAnswer": "Teaches translation invariance across the camera viewport.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-9-15",
  "experimentId": 9,
  "question": "How to augment image masks for semantic segmentation?",
  "shortAnswer": "Both image and segmentation mask must receive the exact identical geometric transform seed.",
  "detailedAnswer": "Flipping the image without flipping the mask destroys alignment.",
  "category": "debugging",
  "difficulty": "advanced"
},
  {
  "id": "viva-9-16",
  "experimentId": 9,
  "question": "What is AutoAugment (Cubuk et al. 2019)?",
  "shortAnswer": "Reinforcement learning search algorithm that automatically discovers optimal augmentation policies for a dataset.",
  "detailedAnswer": "Learns probabilities and magnitudes for 16 image transforms.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-9-17",
  "experimentId": 9,
  "question": "What is RandAugment?",
  "shortAnswer": "Simplified augmentation strategy with only 2 parameters: number of transforms N and magnitude M.",
  "detailedAnswer": "Dramatically reduces search space while matching AutoAugment performance.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-9-18",
  "experimentId": 9,
  "question": "How to display augmented images with matplotlib?",
  "shortAnswer": "Iterate over datagen.flow() generator and plot batch images using plt.imshow().",
  "detailedAnswer": "Useful for visually confirming that augmentations look realistic and label-preserving.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-9-19",
  "experimentId": 9,
  "question": "Why does ImageDataGenerator require 4D tensor input?",
  "shortAnswer": "Expects shape (batch_size, height, width, channels) or (1, H, W, C) for a single image.",
  "detailedAnswer": "Single images must be expanded using np.expand_dims(img, axis=0).",
  "category": "debugging",
  "difficulty": "basic"
},
  {
  "id": "viva-9-20",
  "experimentId": 9,
  "question": "Can data augmentation replace the need for more real training data?",
  "shortAnswer": "It alleviates overfitting and boosts accuracy, but cannot completely replace diverse real-world samples.",
  "detailedAnswer": "Synthetic transforms cannot introduce novel real-world visual concepts that are absent from original data.",
  "category": "external-viva",
  "difficulty": "intermediate"
},
  {
  "id": "viva-10-1",
  "experimentId": 10,
  "question": "Test accuracy gain from data augmentation on CIFAR-10 in Exp 10?",
  "shortAnswer": "Validation accuracy increased by ~7% (from ~75.2% to ~82.4%).",
  "detailedAnswer": "Overfitting gap dropped from ~17% to ~2%, proving strong generalization benefits.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-10-2",
  "experimentId": 10,
  "question": "Why CIFAR-10 benefits more from augmentation than MNIST?",
  "shortAnswer": "Natural color objects have rich real-world orientation, lighting, and scale variations.",
  "detailedAnswer": "Digits are mostly centered and upright; real vehicles and animals appear in arbitrary poses.",
  "category": "why-how",
  "difficulty": "basic"
},
  {
  "id": "viva-10-3",
  "experimentId": 10,
  "question": "Does datagen.flow() increase dataset size on disk?",
  "shortAnswer": "No, transforms are computed on-the-fly in RAM per batch during training.",
  "detailedAnswer": "Saves disk space and provides infinite subtle variations across epochs.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-10-4",
  "experimentId": 10,
  "question": "Why does training loss decrease more slowly with augmentation?",
  "shortAnswer": "The model faces a harder task because it never sees the exact same image twice.",
  "detailedAnswer": "Prevents early training memorization while steadily building robust representations.",
  "category": "why-how",
  "difficulty": "intermediate"
},
  {
  "id": "viva-10-5",
  "experimentId": 10,
  "question": "What is Cutout augmentation?",
  "shortAnswer": "Randomly masking square patches of an image with zero or gray pixels.",
  "detailedAnswer": "Forces network to attend to multiple distributed visual cues rather than a single cue.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-10-6",
  "experimentId": 10,
  "question": "What is Mixup augmentation (Zhang et al. 2017)?",
  "shortAnswer": "Linearly blends pairs of images and labels: x = lambda*x1 + (1-lambda)*x2.",
  "detailedAnswer": "Encourages linear behavior between classes and smooths decision boundaries.",
  "category": "conceptual",
  "difficulty": "advanced"
},
  {
  "id": "viva-10-7",
  "experimentId": 10,
  "question": "Why horizontal flip is valid for cars and ships in CIFAR-10?",
  "shortAnswer": "Vehicles and animals retain their semantic category whether facing left or right.",
  "detailedAnswer": "Horizontal reflection is naturally label-preserving for symmetric natural objects.",
  "category": "why-how",
  "difficulty": "basic"
},
  {
  "id": "viva-10-8",
  "experimentId": 10,
  "question": "Effect of augmentation on training time per epoch?",
  "shortAnswer": "Slightly increases time per epoch due to CPU tensor preprocessing.",
  "detailedAnswer": "Asynchronous multi-threaded data loaders or GPU tf.data pipelines mitigate this latency.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-10-9",
  "experimentId": 10,
  "question": "How to confirm superior generalization from metrics?",
  "shortAnswer": "Higher validation/test accuracy paired with a smaller generalization gap (Train Acc - Val Acc).",
  "detailedAnswer": "Model with 85% train / 83% val is far superior to 95% train / 75% val.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-10-10",
  "experimentId": 10,
  "question": "Modern Keras syntax for training with ImageDataGenerator?",
  "shortAnswer": "model.fit(datagen.flow(x_train, y_train, batch_size=32), ...).",
  "detailedAnswer": "In TF2.x, model.fit natively consumes Python generators and tf.data pipelines.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-10-11",
  "experimentId": 10,
  "question": "What is CIFAR-10 dataset composition?",
  "shortAnswer": "60,000 32x32 color images across 10 classes (airplane, automobile, bird, cat, deer, dog, frog, horse, ship, truck).",
  "detailedAnswer": "50,000 training and 10,000 testing images created by Alex Krizhevsky.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-10-12",
  "experimentId": 10,
  "question": "Why normalize CIFAR-10 by channel mean and standard deviation?",
  "shortAnswer": "Standardizes pixel distribution per channel, accelerating gradient descent convergence.",
  "detailedAnswer": "Centering RGB around 0 prevents directional bias in convolution filters.",
  "category": "why-how",
  "difficulty": "intermediate"
},
  {
  "id": "viva-10-13",
  "experimentId": 10,
  "question": "What is CutMix augmentation?",
  "shortAnswer": "Cuts a patch from one image and pastes it into another image, proportionally mixing labels.",
  "detailedAnswer": "Combines the benefits of Cutout and Mixup, preventing local patch over-reliance.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-10-14",
  "experimentId": 10,
  "question": "Why is rotation limited to 15 degrees on CIFAR-10?",
  "shortAnswer": "Large rotations tilt horizon lines unrealistically and blur low-resolution 32x32 pixels.",
  "detailedAnswer": "Subtle 15-degree rotations preserve object recognizability without excessive interpolation blur.",
  "category": "debugging",
  "difficulty": "intermediate"
},
  {
  "id": "viva-10-15",
  "experimentId": 10,
  "question": "How to use tf.keras.layers.RandomFlip inside Sequential model?",
  "shortAnswer": "Add layers.RandomFlip('horizontal') directly as the first layer in the model.",
  "detailedAnswer": "Executes on GPU alongside model tensors, eliminating CPU bottleneck.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-10-16",
  "experimentId": 10,
  "question": "What is validation loss divergence in unaugmented CIFAR CNN?",
  "shortAnswer": "Val loss drops until epoch 8, then starts rising while training loss keeps falling.",
  "detailedAnswer": "Clear empirical signature of model memorizing training set noise.",
  "category": "debugging",
  "difficulty": "basic"
},
  {
  "id": "viva-10-17",
  "experimentId": 10,
  "question": "What optimizer works best on CIFAR-10 with augmentation?",
  "shortAnswer": "SGD with Momentum (0.9) and learning rate decay, or AdamW.",
  "detailedAnswer": "SGD with momentum often finds flatter, more generalizable minima on CIFAR-10.",
  "category": "external-viva",
  "difficulty": "intermediate"
},
  {
  "id": "viva-10-18",
  "experimentId": 10,
  "question": "What is Mosaic augmentation in YOLO?",
  "shortAnswer": "Combines 4 training images into 1 composite frame with random center crop.",
  "detailedAnswer": "Enables detection of objects at multiple scales and across different contextual backgrounds.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-10-19",
  "experimentId": 10,
  "question": "Why does CIFAR-10 require more convolution filters than MNIST?",
  "shortAnswer": "Color images with 3 channels and complex natural backgrounds require higher representational capacity.",
  "detailedAnswer": "Requires 32, 64, 128+ filters to capture diverse textures, colors, and shapes.",
  "category": "why-how",
  "difficulty": "basic"
},
  {
  "id": "viva-10-20",
  "experimentId": 10,
  "question": "What accuracy can a modern ResNet achieve on CIFAR-10 with augmentation?",
  "shortAnswer": "Over 95% test accuracy with data augmentation and residual connections.",
  "detailedAnswer": "Standard unaugmented basic CNNs typically stall around 75-80%.",
  "category": "external-viva",
  "difficulty": "intermediate"
},
  {
  "id": "viva-11-1",
  "experimentId": 11,
  "question": "Input dimensions of original LeNet-5 (1998)?",
  "shortAnswer": "32 x 32 grayscale single-channel image.",
  "detailedAnswer": "Allowed 28x28 digits to appear centered with border margins for feature extraction.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-11-2",
  "experimentId": 11,
  "question": "Activation function originally used in LeNet-5?",
  "shortAnswer": "Scaled Hyperbolic Tangent (Tanh).",
  "detailedAnswer": "Tanh was standard in 1998 before ReLU was popularized by AlexNet in 2012.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-11-3",
  "experimentId": 11,
  "question": "Subsampling operation in S2 and S4 of LeNet-5?",
  "shortAnswer": "2x2 Average Pooling with trainable coefficient and bias per map.",
  "detailedAnswer": "Subsampling averaged 4 pixels, multiplied by a trainable weight, and added bias.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-11-4",
  "experimentId": 11,
  "question": "Number of feature maps produced by C1?",
  "shortAnswer": "6 feature maps of size 28x28.",
  "detailedAnswer": "Applies six 5x5 filters to the 32x32 input: (32 - 5 + 1) = 28x28.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-11-5",
  "experimentId": 11,
  "question": "Primary commercial deployment of LeNet-5 in 1990s?",
  "shortAnswer": "Reading handwritten cheque amounts across NCR bank ATMs and US postal sorting centers.",
  "detailedAnswer": "Processed millions of handwritten cheques daily for major commercial banks.",
  "category": "external-viva",
  "difficulty": "basic"
},
  {
  "id": "viva-11-6",
  "experimentId": 11,
  "question": "Filters in C3 and output spatial size?",
  "shortAnswer": "16 filters of size 5x5, yielding 10x10 feature maps.",
  "detailedAnswer": "Input S2 is 14x14; convolution with 5x5 yields (14 - 5 + 1) = 10x10 maps.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-11-7",
  "experimentId": 11,
  "question": "Total trainable parameters in LeNet-5?",
  "shortAnswer": "Approximately 60,000 parameters.",
  "detailedAnswer": "Extremely compact by modern standards, enabling execution on 1990s microprocessors.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-11-8",
  "experimentId": 11,
  "question": "How were output logits calculated in original LeNet-5?",
  "shortAnswer": "Euclidean Radial Basis Function (RBF) units computing distance to target bitmap prototypes.",
  "detailedAnswer": "Each class corresponded to a fixed 7x12 ASCII bitmap pattern.",
  "category": "conceptual",
  "difficulty": "advanced"
},
  {
  "id": "viva-11-9",
  "experimentId": 11,
  "question": "Why was C5 termed convolution instead of dense?",
  "shortAnswer": "Applying 120 filters of size 5x5 to a 5x5 input reduces spatial dimensions to 1x1.",
  "detailedAnswer": "Mathematically identical to a dense layer of 120 units, but formulated as convolution.",
  "category": "why-how",
  "difficulty": "advanced"
},
  {
  "id": "viva-11-10",
  "experimentId": 11,
  "question": "Modern modifications to LeNet-5 for MNIST today?",
  "shortAnswer": "Use ReLU activations, Max Pooling, and Softmax output with cross-entropy loss.",
  "detailedAnswer": "ReLU trains faster without vanishing gradients; MaxPool gives sharper features.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-11-11",
  "experimentId": 11,
  "question": "Why did C3 not connect to all S2 feature maps originally?",
  "shortAnswer": "To keep parameter count low and break architectural symmetry, forcing diverse feature specialization.",
  "detailedAnswer": "Filters in C3 connected to non-contiguous subsets of 3, 4, or all 6 S2 maps.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-11-12",
  "experimentId": 11,
  "question": "Number of units in layer F6 of LeNet-5?",
  "shortAnswer": "84 hidden units.",
  "detailedAnswer": "Chosen to match the 7x12 dimensions of the ASCII character bitmaps in the output layer.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-11-13",
  "experimentId": 11,
  "question": "Why was LeNet-5 revolutionary for AI history?",
  "shortAnswer": "Proved that end-to-end backpropagation through convolution and pooling could solve real-world computer vision.",
  "detailedAnswer": "Laid the foundation for all modern deep learning convolutional architectures.",
  "category": "external-viva",
  "difficulty": "basic"
},
  {
  "id": "viva-11-14",
  "experimentId": 11,
  "question": "How to adapt LeNet-5 for 28x28 MNIST in Keras?",
  "shortAnswer": "Use padding='same' on C1 or add ZeroPadding2D((2,2)) at the start.",
  "detailedAnswer": "Padding restores the 32x32 input size expected by LeNet-5 layers.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-11-15",
  "experimentId": 11,
  "question": "Parameters in C1 layer of LeNet-5?",
  "shortAnswer": "(5 * 5 * 1 + 1) * 6 = 156 parameters.",
  "detailedAnswer": "6 filters, each having 25 weights plus 1 bias term.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-11-16",
  "experimentId": 11,
  "question": "Why did average pooling fall out of favor compared to max pooling?",
  "shortAnswer": "Max pooling preserves sharp high-contrast features and edges better than averaging.",
  "detailedAnswer": "Average pooling smooths out edge gradients, reducing feature distinctiveness.",
  "category": "why-how",
  "difficulty": "intermediate"
},
  {
  "id": "viva-11-17",
  "experimentId": 11,
  "question": "Can LeNet-5 be used on Fashion MNIST?",
  "shortAnswer": "Yes, it achieves ~88-90% accuracy on Fashion MNIST clothing categories.",
  "detailedAnswer": "Demonstrates LeNet's versatility beyond simple numeric digits.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-11-18",
  "experimentId": 11,
  "question": "What hardware ran LeNet-5 in 1998?",
  "shortAnswer": "DSP (Digital Signal Processors) and early Intel Pentium processors at ~200 MHz.",
  "detailedAnswer": "Small parameter count allowed real-time ATM cheque scanning without GPUs.",
  "category": "external-viva",
  "difficulty": "basic"
},
  {
  "id": "viva-11-19",
  "experimentId": 11,
  "question": "How does LeNet-5 compare to modern AlexNet (2012)?",
  "shortAnswer": "LeNet-5 has 60k parameters; AlexNet has 60 million parameters (1,000x larger), with ReLU, Dropout, and GPU training.",
  "detailedAnswer": "AlexNet scaled LeNet principles to millions of parameters and 1,000 ImageNet classes.",
  "category": "external-viva",
  "difficulty": "intermediate"
},
  {
  "id": "viva-11-20",
  "experimentId": 11,
  "question": "Why was weight decay used in LeNet-5?",
  "shortAnswer": "To constrain weight growth and prevent saturation of Tanh activations.",
  "detailedAnswer": "LeCun used L2 weight decay to maintain smooth gradients across layers.",
  "category": "why-how",
  "difficulty": "intermediate"
},
  {
  "id": "viva-12-1",
  "experimentId": 12,
  "question": "Architectural breakthrough of VGGNet (2014)?",
  "shortAnswer": "Replacing large convolution filters with deep stacks of small 3x3 convolution filters.",
  "detailedAnswer": "Showed that network depth with simple uniform 3x3 filters achieves state-of-the-art vision accuracy.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-12-2",
  "experimentId": 12,
  "question": "Effective receptive field of two stacked 3x3 convs?",
  "shortAnswer": "5 x 5 spatial receptive field.",
  "detailedAnswer": "Two 3x3 layers cover 5x5 input pixels while saving parameters and adding non-linearity.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-12-3",
  "experimentId": 12,
  "question": "Effective receptive field of three stacked 3x3 convs?",
  "shortAnswer": "7 x 7 spatial receptive field.",
  "detailedAnswer": "Three 3x3 layers cover 7x7 input pixels with 3 non-linear ReLUs instead of 1.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-12-4",
  "experimentId": 12,
  "question": "Parameter reduction of three 3x3 convs vs one 7x7 conv?",
  "shortAnswer": "Three 3x3 layers use 27 C^2 weights vs 49 C^2 for one 7x7 layer (45% reduction).",
  "detailedAnswer": "3 * (3^2 * C^2) = 27 C^2 vs 7^2 * C^2 = 49 C^2 parameters.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-12-5",
  "experimentId": 12,
  "question": "Layers in VGG-16 vs VGG-19?",
  "shortAnswer": "VGG-16: 13 conv + 3 dense = 16 layers; VGG-19: 16 conv + 3 dense = 19 layers.",
  "detailedAnswer": "VGG-19 adds 3 additional 3x3 convolution layers in Blocks 3, 4, and 5.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-12-6",
  "experimentId": 12,
  "question": "Why freeze base layers in Transfer Learning?",
  "shortAnswer": "To preserve pre-trained general ImageNet features and avoid destroying learned weights.",
  "detailedAnswer": "Prevents random gradients from the uninitialized classification head from corrupting the backbone.",
  "category": "why-how",
  "difficulty": "basic"
},
  {
  "id": "viva-12-7",
  "experimentId": 12,
  "question": "Where are 75% of VGG-16 parameters located?",
  "shortAnswer": "In the first Dense(4096) layer connecting 7x7x512 = 25,088 flattened inputs (~102 million weights).",
  "detailedAnswer": "Flattening the high-dimensional feature map creates an enormous dense weight matrix.",
  "category": "code-specific",
  "difficulty": "advanced"
},
  {
  "id": "viva-12-8",
  "experimentId": 12,
  "question": "What is 'fine-tuning' in Transfer Learning?",
  "shortAnswer": "Unfreezing top conv blocks and training them with a very small learning rate (e.g. 1e-5).",
  "detailedAnswer": "Allows high-level task-specific features to adapt subtly to the target dataset.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-12-9",
  "experimentId": 12,
  "question": "Input dimensions expected by pre-trained VGG-16?",
  "shortAnswer": "224 x 224 x 3 RGB images.",
  "detailedAnswer": "Images must be resized and preprocessed with ImageNet channel mean subtraction.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-12-10",
  "experimentId": 12,
  "question": "Why replace Dense(4096) with Global Average Pooling (GAP)?",
  "shortAnswer": "GAP averages each 7x7 feature map into a single scalar, reducing parameters from 102M to zero.",
  "detailedAnswer": "Radically reduces model size and acts as a powerful structural regularizer against overfitting.",
  "category": "why-how",
  "difficulty": "advanced"
},
  {
  "id": "viva-12-11",
  "experimentId": 12,
  "question": "What is ImageNet dataset?",
  "shortAnswer": "1.4 million images across 1,000 diverse categories used for pre-training visual backbones.",
  "detailedAnswer": "Large-scale visual database curated by Fei-Fei Li's group at Stanford.",
  "category": "external-viva",
  "difficulty": "basic"
},
  {
  "id": "viva-12-12",
  "experimentId": 12,
  "question": "What is include_top=False in keras.applications.VGG16?",
  "shortAnswer": "Excludes the final 3 fully connected dense layers, keeping only the convolutional feature extractor.",
  "detailedAnswer": "Allows attaching a custom classification head suited to your specific number of classes.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-12-13",
  "experimentId": 12,
  "question": "How many max pooling layers in VGG-16?",
  "shortAnswer": "5 MaxPool layers of size 2x2 with stride 2.",
  "detailedAnswer": "Each pooling layer divides spatial resolution by half: 224 -> 112 -> 56 -> 28 -> 14 -> 7.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-12-14",
  "experimentId": 12,
  "question": "What causes slow inference speed in VGG-16?",
  "shortAnswer": "138 million parameters and heavy memory bandwidth needed for 7x7x512 tensor activations.",
  "detailedAnswer": "High floating-point operations (FLOPs) make VGG heavy for mobile edge devices.",
  "category": "debugging",
  "difficulty": "intermediate"
},
  {
  "id": "viva-12-15",
  "experimentId": 12,
  "question": "How does VGG handle multiple scales during testing?",
  "shortAnswer": "Rescales test image to multiple dimensions, averages predictions across scales (multi-crop evaluation).",
  "detailedAnswer": "Improves classification robustness on objects of varying sizes.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-12-16",
  "experimentId": 12,
  "question": "Why was VGG-16 preferred over GoogLeNet despite being larger?",
  "shortAnswer": "Simplicity and uniformity of design made VGG easy to adapt as a universal feature extractor.",
  "detailedAnswer": "GoogLeNet was deeper and faster but had complex parallel Inception branches.",
  "category": "external-viva",
  "difficulty": "intermediate"
},
  {
  "id": "viva-12-17",
  "experimentId": 12,
  "question": "What is preprocess_input in keras.applications.vgg16?",
  "shortAnswer": "Converts RGB to BGR and zero-centers each color channel with respect to ImageNet means.",
  "detailedAnswer": "Ensures input pixel format matches exactly how VGG was pre-trained.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-12-18",
  "experimentId": 12,
  "question": "Why use learning rate 1e-5 during fine-tuning instead of 1e-3?",
  "shortAnswer": "A large learning rate would overwrite and destroy pre-trained feature weights.",
  "detailedAnswer": "A tiny learning rate ensures conservative parameter fine-tuning.",
  "category": "debugging",
  "difficulty": "intermediate"
},
  {
  "id": "viva-12-19",
  "experimentId": 12,
  "question": "Difference between Feature Extraction and Fine-Tuning?",
  "shortAnswer": "Feature extraction trains only the new dense head; fine-tuning trains top conv layers too.",
  "detailedAnswer": "Feature extraction is faster and avoids overfitting on very small datasets.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-12-20",
  "experimentId": 12,
  "question": "Total file size of standard VGG-16 model weights on disk?",
  "shortAnswer": "Over 528 MB (in float32 format).",
  "detailedAnswer": "Large size due to the 102 million dense layer parameters.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-13-1",
  "experimentId": 13,
  "question": "Mathematical recurrence for SimpleRNN hidden state?",
  "shortAnswer": "h_t = tanh(W_xh * x_t + W_hh * h_{t-1} + b_h).",
  "detailedAnswer": "Non-linear combination of current input vector x_t and preceding hidden state h_{t-1}.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-13-2",
  "experimentId": 13,
  "question": "Purpose of Embedding layer in sentiment analysis?",
  "shortAnswer": "Maps discrete sparse word IDs into dense continuous semantic vectors of fixed dimension.",
  "detailedAnswer": "Captures semantic relationships (e.g. king - man + woman = queen) in a low-dimensional space.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-13-3",
  "experimentId": 13,
  "question": "Why pad movie review sequences with maxlen=500?",
  "shortAnswer": "Ensures uniform tensor dimensions across variable-length review sentences.",
  "detailedAnswer": "Enables efficient batched matrix multiplications on GPU.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-13-4",
  "experimentId": 13,
  "question": "Why SimpleRNN fails on long movie reviews (>100 tokens)?",
  "shortAnswer": "Vanishing gradient problem during BPTT prevents error signals from reaching early words.",
  "detailedAnswer": "Repeated matrix multiplications of W_hh over time decay gradients to zero.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-13-5",
  "experimentId": 13,
  "question": "Output layer for binary sentiment classification?",
  "shortAnswer": "Dense(1, activation='sigmoid') paired with binary_crossentropy loss.",
  "detailedAnswer": "Produces a single scalar probability between 0 (negative) and 1 (positive).",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-13-6",
  "experimentId": 13,
  "question": "What does 'unrolling through time' mean for RNN?",
  "shortAnswer": "Visualizing the recurrent loop as a sequence of feedforward stages across time steps t=1 to T.",
  "detailedAnswer": "Illustrates how weights are shared across every token position in time.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-13-7",
  "experimentId": 13,
  "question": "What is gradient clipping in RNN training?",
  "shortAnswer": "Capping gradient vector norm to a threshold (e.g. clipnorm=1.0) to prevent exploding gradients.",
  "detailedAnswer": "Prevents catastrophic parameter corruption when gradients explode across long sequences.",
  "category": "debugging",
  "difficulty": "intermediate"
},
  {
  "id": "viva-13-8",
  "experimentId": 13,
  "question": "Parameters in Embedding(10000, 32)?",
  "shortAnswer": "10,000 * 32 = 320,000 parameters.",
  "detailedAnswer": "Each of the 10,000 vocabulary words has a learned 32-dimensional embedding vector.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-13-9",
  "experimentId": 13,
  "question": "return_sequences=True vs False in Keras SimpleRNN?",
  "shortAnswer": "True returns hidden state at every time step (shape [B, T, U]); False returns only final state (shape [B, U]).",
  "detailedAnswer": "Use True when stacking multiple recurrent layers; False before dense classification head.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-13-10",
  "experimentId": 13,
  "question": "Why Tanh activation in SimpleRNN recurrent cell?",
  "shortAnswer": "Bounds activations between [-1, +1], preventing exponential explosion over long unrolled steps.",
  "detailedAnswer": "Unbound activations like ReLU cause activations to grow exponentially over time.",
  "category": "why-how",
  "difficulty": "intermediate"
},
  {
  "id": "viva-13-11",
  "experimentId": 13,
  "question": "What is Backpropagation Through Time (BPTT)?",
  "shortAnswer": "Applying backpropagation along the unrolled temporal computational graph from t=T back to t=1.",
  "detailedAnswer": "Calculates gradients with respect to shared recurrent weights W_hh summed across time steps.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-13-12",
  "experimentId": 13,
  "question": "What is Truncated BPTT?",
  "shortAnswer": "Forward pass through whole sequence, but backward pass terminates after k time steps.",
  "detailedAnswer": "Limits memory usage and prevents vanishing gradients on very long documents.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-13-13",
  "experimentId": 13,
  "question": "What is an Out-of-Vocabulary (OOV) token?",
  "shortAnswer": "A special token (e.g. <UNK>) assigned to words that do not exist in the training vocabulary.",
  "detailedAnswer": "Allows the model to handle unseen words gracefully without crashing.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-13-14",
  "experimentId": 13,
  "question": "Pre-padding vs Post-padding in sequences?",
  "shortAnswer": "Pre-padding places zeros at the beginning; Post-padding places zeros at the end.",
  "detailedAnswer": "Pre-padding is often preferred in RNNs so the final hidden state is not dominated by trailing zeros.",
  "category": "why-how",
  "difficulty": "advanced"
},
  {
  "id": "viva-13-15",
  "experimentId": 13,
  "question": "What is the IMDB Movie Review dataset?",
  "shortAnswer": "50,000 highly polarized positive and negative movie reviews from the Internet Movie Database.",
  "detailedAnswer": "25,000 training and 25,000 testing reviews curated by Andrew Maas.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-13-16",
  "experimentId": 13,
  "question": "Can word embeddings be pre-trained?",
  "shortAnswer": "Yes, using Word2Vec, GloVe, or FastText trained on billions of Wikipedia/crawl tokens.",
  "detailedAnswer": "Provides rich semantic representations even before fine-tuning on movie reviews.",
  "category": "external-viva",
  "difficulty": "intermediate"
},
  {
  "id": "viva-13-17",
  "experimentId": 13,
  "question": "Difference between bag-of-words and RNN?",
  "shortAnswer": "Bag-of-words ignores word order; RNN explicitly processes temporal sequential syntax.",
  "detailedAnswer": "RNN recognizes that 'not bad' means good, whereas bag-of-words sees 'bad' as negative.",
  "category": "why-how",
  "difficulty": "basic"
},
  {
  "id": "viva-13-18",
  "experimentId": 13,
  "question": "Why does SimpleRNN underperform LSTM on IMDB?",
  "shortAnswer": "SimpleRNN achieves ~80-83% accuracy; LSTM reaches 88%+ due to cell state memory.",
  "detailedAnswer": "SimpleRNN forgets earlier paragraph context when reaching the end of a long review.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-13-19",
  "experimentId": 13,
  "question": "How many gate mechanisms in SimpleRNN?",
  "shortAnswer": "Zero gates; SimpleRNN is a single unguarded recurrent equation with no gating.",
  "detailedAnswer": "Lack of gates makes it vulnerable to vanishing and exploding gradients.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-13-20",
  "experimentId": 13,
  "question": "How to inspect individual word embeddings in Python?",
  "shortAnswer": "Access model.layers[0].get_weights()[0] to inspect the (10000, 32) embedding matrix.",
  "detailedAnswer": "Can calculate cosine similarity between word vectors to verify semantic clustering.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-14-1",
  "experimentId": 14,
  "question": "Core advantage of Bidirectional LSTM over unidirectional RNN?",
  "shortAnswer": "Processes text in both directions (past-to-future and future-to-past), capturing preceding and succeeding context.",
  "detailedAnswer": "Concatenates forward and backward hidden states at each position for complete context.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-14-2",
  "experimentId": 14,
  "question": "Three gating mechanisms in an LSTM cell?",
  "shortAnswer": "Forget Gate (f_t), Input Gate (i_t), and Output Gate (o_t).",
  "detailedAnswer": "Regulate what information is discarded, what new info is stored, and what is output.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-14-3",
  "experimentId": 14,
  "question": "Purpose of the Forget Gate f_t = sigmoid(W_f * [h_{t-1}, x_t] + b_f)?",
  "shortAnswer": "Decides what proportion (0.0 to 1.0) of previous cell state C_{t-1} to retain.",
  "detailedAnswer": "Multiplies C_{t-1} element-wise; 0 means completely erase, 1 means completely retain.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-14-4",
  "experimentId": 14,
  "question": "What is the Cell State C_t ('constant error carousel')?",
  "shortAnswer": "An uninterrupted additive information highway where gradients flow without multiplicative decay.",
  "detailedAnswer": "Enables error signals to backpropagate across hundreds of time steps without vanishing.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-14-5",
  "experimentId": 14,
  "question": "Output shape of Bidirectional(LSTM(64)) with return_sequences=False?",
  "shortAnswer": "(None, 128) - 64 forward units concatenated with 64 backward units.",
  "detailedAnswer": "Combines the final forward hidden state and initial backward hidden state.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-14-6",
  "experimentId": 14,
  "question": "How does BiLSTM resolve 'The movie was not good at all'?",
  "shortAnswer": "Forward pass carries 'not'; backward pass carries 'at all', properly qualifying 'good'.",
  "detailedAnswer": "Both directional contexts fuse together to correctly classify the sentence as negative.",
  "category": "why-how",
  "difficulty": "intermediate"
},
  {
  "id": "viva-14-7",
  "experimentId": 14,
  "question": "Why are LSTM gates strictly activated with Sigmoid?",
  "shortAnswer": "Sigmoid squashes outputs to [0, 1], acting as continuous open/close multiplier valves.",
  "detailedAnswer": "A value of 0 closes the gate completely; 1 opens the gate fully.",
  "category": "why-how",
  "difficulty": "basic"
},
  {
  "id": "viva-14-8",
  "experimentId": 14,
  "question": "Parameter count of BiLSTM vs SimpleRNN?",
  "shortAnswer": "An LSTM cell has 4x parameters of SimpleRNN; Bidirectional doubles that to 8x.",
  "detailedAnswer": "Each LSTM cell has 4 internal weight matrices; Bidirectional runs two complete LSTMs.",
  "category": "code-specific",
  "difficulty": "advanced"
},
  {
  "id": "viva-14-9",
  "experimentId": 14,
  "question": "What is recurrent_dropout in Keras LSTM?",
  "shortAnswer": "Applies a constant dropout mask across recurrent state connections over time steps.",
  "detailedAnswer": "Prevents overfitting on recurrent transitions without corrupting sequence temporal dynamics.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-14-10",
  "experimentId": 14,
  "question": "Why can't BiLSTM be used for live streaming speech transcription?",
  "shortAnswer": "Backward LSTM requires the entire utterance to finish before computing backward states.",
  "detailedAnswer": "Introduces unacceptable latency waiting for future words that have not yet been spoken.",
  "category": "why-how",
  "difficulty": "advanced"
},
  {
  "id": "viva-14-11",
  "experimentId": 14,
  "question": "Who invented LSTM and when?",
  "shortAnswer": "Sepp Hochreiter and J\u00fcrgen Schmidhuber in 1997.",
  "detailedAnswer": "Designed specifically to overcome the vanishing gradient problem in recurrent networks.",
  "category": "external-viva",
  "difficulty": "basic"
},
  {
  "id": "viva-14-12",
  "experimentId": 14,
  "question": "What is a GRU (Gated Recurrent Unit)?",
  "shortAnswer": "A simplified LSTM variant with only 2 gates (Reset and Update) and no separate cell state.",
  "detailedAnswer": "Cho et al. (2014) showed GRU runs faster with fewer parameters while matching LSTM accuracy.",
  "category": "external-viva",
  "difficulty": "intermediate"
},
  {
  "id": "viva-14-13",
  "experimentId": 14,
  "question": "Mathematical formula for cell state update C_t?",
  "shortAnswer": "C_t = f_t * C_{t-1} + i_t * C_tilde_t.",
  "detailedAnswer": "Adds candidate content scaled by input gate i_t to preserved old memory scaled by forget gate f_t.",
  "category": "conceptual",
  "difficulty": "advanced"
},
  {
  "id": "viva-14-14",
  "experimentId": 14,
  "question": "Candidate memory cell C_tilde_t activation?",
  "shortAnswer": "Uses Tanh activation to bound candidate values between -1 and +1.",
  "detailedAnswer": "Ensures new information added to the cell state has bounded magnitude.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-14-15",
  "experimentId": 14,
  "question": "Output hidden state h_t formula in LSTM?",
  "shortAnswer": "h_t = o_t * tanh(C_t).",
  "detailedAnswer": "Output gate filters the squashed cell state memory to produce the visible output.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-14-16",
  "experimentId": 14,
  "question": "Why did BiLSTM achieve ~89% on IMDB vs 80% for SimpleRNN?",
  "shortAnswer": "Captures subtle negations and long-range semantic dependencies without forgetting.",
  "detailedAnswer": "Dual-direction analysis ensures that context following an ambiguous word is fully utilized.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-14-17",
  "experimentId": 14,
  "question": "Can you stack multiple Bidirectional LSTM layers in Keras?",
  "shortAnswer": "Yes, set return_sequences=True on all intermediate layers.",
  "detailedAnswer": "e.g. Bidirectional(LSTM(64, return_sequences=True)) -> Bidirectional(LSTM(32)).",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-14-18",
  "experimentId": 14,
  "question": "What is peephole connection in LSTM (Gers & Schmidhuber)?",
  "shortAnswer": "Allows gate layers to inspect the current cell state C directly.",
  "detailedAnswer": "Provides gates with direct visibility into internal memory levels.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-14-19",
  "experimentId": 14,
  "question": "Difference between LSTM and Transformer for NLP?",
  "shortAnswer": "LSTMs process tokens sequentially; Transformers process all tokens in parallel using Self-Attention.",
  "detailedAnswer": "Transformers eliminate sequential bottlenecks and scale better on large language corpora.",
  "category": "external-viva",
  "difficulty": "intermediate"
},
  {
  "id": "viva-14-20",
  "experimentId": 14,
  "question": "How to prevent overfitting in Bidirectional LSTM on small text datasets?",
  "shortAnswer": "Add spatial dropout on embeddings, recurrent_dropout, L2 weight decay, and early stopping.",
  "detailedAnswer": "Reduces overparameterization when training vocabulary size is large.",
  "category": "debugging",
  "difficulty": "intermediate"
},
  {
  "id": "viva-15-1",
  "experimentId": 15,
  "question": "Game-theoretic formulation of GANs (Goodfellow 2014)?",
  "shortAnswer": "Two-player zero-sum minimax game: min_G max_D V(D, G) between Generator G and Discriminator D.",
  "detailedAnswer": "Generator tries to fool Discriminator; Discriminator tries to distinguish real from synthetic images.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-15-2",
  "experimentId": 15,
  "question": "Input to Generator in standard DCGAN?",
  "shortAnswer": "Random latent noise vector z sampled from prior distribution (e.g. N(0, I) or U(-1, 1)).",
  "detailedAnswer": "Acts as the seed that the generator transforms into high-dimensional image pixels.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-15-3",
  "experimentId": 15,
  "question": "Role of Conv2DTranspose in Generator?",
  "shortAnswer": "Upsampling low-resolution spatial feature maps into high-resolution images (7x7 -> 14x14 -> 28x28).",
  "detailedAnswer": "Learnable transposed convolution expands spatial dimensions smoothly.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-15-4",
  "experimentId": 15,
  "question": "Why LeakyReLU in Discriminator?",
  "shortAnswer": "Provides non-zero gradient for negative values, preventing dead neurons and maintaining training gradients for G.",
  "detailedAnswer": "Ensures generator receives informative gradient feedback even when discriminator rejects a sample.",
  "category": "why-how",
  "difficulty": "intermediate"
},
  {
  "id": "viva-15-5",
  "experimentId": 15,
  "question": "Nash Equilibrium value of D(x) for all inputs?",
  "shortAnswer": "D(x) = 0.5 (Discriminator is completely unable to distinguish real from generated images).",
  "detailedAnswer": "Indicates generated distribution p_g matches real data distribution p_data perfectly.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-15-6",
  "experimentId": 15,
  "question": "What is Mode Collapse in GANs?",
  "shortAnswer": "Generator produces only a narrow set of similar images (e.g. only digit '1') that fools the discriminator.",
  "detailedAnswer": "Lacks sample diversity because G discovers one pattern that easily tricks D and ignores other modes.",
  "category": "debugging",
  "difficulty": "intermediate"
},
  {
  "id": "viva-15-7",
  "experimentId": 15,
  "question": "Why train G with max log(D) instead of min log(1-D) early on?",
  "shortAnswer": "Avoids vanishing gradients early in training when D easily detects fakes.",
  "detailedAnswer": "log(1 - D) saturates early on; maximizing log(D) provides much larger gradients.",
  "category": "why-how",
  "difficulty": "advanced"
},
  {
  "id": "viva-15-8",
  "experimentId": 15,
  "question": "Image preprocessing when Generator uses Tanh output?",
  "shortAnswer": "Real images must be normalized to [-1.0, 1.0] via (X - 127.5) / 127.5.",
  "detailedAnswer": "Matches the output range of Tanh so real and generated distributions can be compared fairly.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-15-9",
  "experimentId": 15,
  "question": "Why omit Batch Normalization from G output and D input?",
  "shortAnswer": "Directly normalizing raw pixel outputs causes color distortion and sample oscillation.",
  "detailedAnswer": "Radford et al. (DCGAN 2015) established this design rule for stable image generation.",
  "category": "why-how",
  "difficulty": "advanced"
},
  {
  "id": "viva-15-10",
  "experimentId": 15,
  "question": "Metric to evaluate GAN image fidelity and diversity?",
  "shortAnswer": "Fr\u00e9chet Inception Distance (FID) or Inception Score (IS).",
  "detailedAnswer": "FID calculates Wasserstein-2 distance between Gaussian feature representations in InceptionV3.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-15-11",
  "experimentId": 15,
  "question": "What is a Conditional GAN (cGAN)?",
  "shortAnswer": "Injects class label y into both Generator and Discriminator to control generated digit class.",
  "detailedAnswer": "Allows prompting the model to generate a specific digit (e.g. 'draw an 8').",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-15-12",
  "experimentId": 15,
  "question": "What is Wasserstein GAN (WGAN)?",
  "shortAnswer": "Replaces JS-Divergence with Earth Mover's Distance, eliminating mode collapse and vanishing gradients.",
  "detailedAnswer": "Uses a Critic with 1-Lipschitz continuity enforced via weight clipping or Gradient Penalty.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-15-13",
  "experimentId": 15,
  "question": "Loss curve behavior during healthy GAN training?",
  "shortAnswer": "D loss and G loss oscillate dynamically around stable values without either reaching zero.",
  "detailedAnswer": "If D loss drops to 0, it overwhelms G; if G loss drops to 0, D is failing.",
  "category": "debugging",
  "difficulty": "intermediate"
},
  {
  "id": "viva-15-14",
  "experimentId": 15,
  "question": "What is Label Smoothing in GAN Discriminator?",
  "shortAnswer": "Setting real targets to 0.9 instead of 1.0 to prevent overconfident discriminator predictions.",
  "detailedAnswer": "Prevents discriminator from driving logits to extremes, keeping gradients healthy for G.",
  "category": "external-viva",
  "difficulty": "intermediate"
},
  {
  "id": "viva-15-15",
  "experimentId": 15,
  "question": "Difference between GAN and Autoencoder?",
  "shortAnswer": "Autoencoder reconstructs specific inputs via latent bottleneck; GAN synthesizes novel samples from random noise.",
  "detailedAnswer": "Autoencoders optimize explicit reconstruction loss; GANs optimize adversarial game loss.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-15-16",
  "experimentId": 15,
  "question": "Why does Generator use batch size normalization?",
  "shortAnswer": "Batch Normalization stabilizes deep generators by preventing all samples from collapsing to a single point.",
  "detailedAnswer": "Crucial for preventing internal covariate shift during transposed convolutions.",
  "category": "why-how",
  "difficulty": "intermediate"
},
  {
  "id": "viva-15-17",
  "experimentId": 15,
  "question": "Checkerboard artifacts in GAN images cause?",
  "shortAnswer": "Uneven overlap in Conv2DTranspose when kernel size is not divisible by stride.",
  "detailedAnswer": "Using kernel size 4 with stride 2 or bilinear upsampling prevents checkerboard artifacts.",
  "category": "debugging",
  "difficulty": "advanced"
},
  {
  "id": "viva-15-18",
  "experimentId": 15,
  "question": "What is Latent Space Interpolation in GANs?",
  "shortAnswer": "Linear blending between two latent vectors z1 and z2: z = alpha*z1 + (1-alpha)*z2.",
  "detailedAnswer": "Decoded images smoothly morph from one digit into another, proving continuous manifold learning.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-15-19",
  "experimentId": 15,
  "question": "Can GANs generate color images?",
  "shortAnswer": "Yes, output Conv2DTranspose has 3 filters with shape (H, W, 3) for RGB channels.",
  "detailedAnswer": "DCGAN was famously demonstrated on CelebA face datasets and CIFAR-10.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-15-20",
  "experimentId": 15,
  "question": "What is StyleGAN?",
  "shortAnswer": "Karras et al. architecture using adaptive instance normalization (AdaIN) to control visual styles at multiple scales.",
  "detailedAnswer": "State-of-the-art for photorealistic human face generation.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-16-1",
  "experimentId": 16,
  "question": "Foundational architecture of an Autoencoder?",
  "shortAnswer": "Encoder compresses input x into a low-dimensional latent bottleneck z; Decoder reconstructs x_hat from z.",
  "detailedAnswer": "Trained in an unsupervised / self-supervised manner to minimize reconstruction difference.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-16-2",
  "experimentId": 16,
  "question": "Input and target pair in Denoising Autoencoder?",
  "shortAnswer": "Input is artificially corrupted with noise (x_noisy); target for loss is clean original image (x_clean).",
  "detailedAnswer": "Forces the model to strip noise and discover the underlying clean manifold.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-16-3",
  "experimentId": 16,
  "question": "Why Denoising Autoencoder doesn't learn identity f(x)=x?",
  "shortAnswer": "Noisy inputs do not match clean targets, so an identity mapping would yield high loss.",
  "detailedAnswer": "The network must actively suppress noise components to match clean targets.",
  "category": "why-how",
  "difficulty": "intermediate"
},
  {
  "id": "viva-16-4",
  "experimentId": 16,
  "question": "Standard loss function for image reconstruction?",
  "shortAnswer": "Mean Squared Error (MSE) or Binary Cross-Entropy.",
  "detailedAnswer": "Measures pixel-by-pixel difference between clean ground truth and reconstructed output.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-16-5",
  "experimentId": 16,
  "question": "What is the latent bottleneck and why is it crucial?",
  "shortAnswer": "Middle compressed layer with fewer dimensions than input; forces model to drop noise and retain key features.",
  "detailedAnswer": "Without a bottleneck, an overcomplete autoencoder could simply memorize pixels without learning.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-16-6",
  "experimentId": 16,
  "question": "Downsampling and upsampling layers in Conv Autoencoder?",
  "shortAnswer": "Conv2D with stride=2 (downsampling) and Conv2DTranspose with stride=2 (upsampling).",
  "detailedAnswer": "Replaces pooling with strided convolutions for learnable spatial resizing.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-16-7",
  "experimentId": 16,
  "question": "Decibel (dB) metric for image denoising quality?",
  "shortAnswer": "Peak Signal-to-Noise Ratio (PSNR).",
  "detailedAnswer": "PSNR = 10 * log10(MAX_I^2 / MSE). Higher dB values indicate cleaner reconstructions.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-16-8",
  "experimentId": 16,
  "question": "Why apply np.clip(noisy, 0.0, 1.0) after adding Gaussian noise?",
  "shortAnswer": "Prevents invalid pixel values below 0.0 or above 1.0 that violate image boundaries.",
  "detailedAnswer": "Adding Gaussian noise pushes extreme pixels outside valid floating-point visual ranges.",
  "category": "debugging",
  "difficulty": "basic"
},
  {
  "id": "viva-16-9",
  "experimentId": 16,
  "question": "How to use Denoising Autoencoder for industrial anomaly detection?",
  "shortAnswer": "Normal defect-free items reconstruct with low MSE; defective items reconstruct poorly with high residual error.",
  "detailedAnswer": "The autoencoder only knows the manifold of healthy items, failing to reconstruct anomalies.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-16-10",
  "experimentId": 16,
  "question": "Difference between standard Autoencoder and VAE?",
  "shortAnswer": "VAE maps inputs to probability distribution parameters (mean, variance) and uses KL Divergence for generative sampling.",
  "detailedAnswer": "Standard autoencoders have unconstrained latent spaces that may contain discontinuous gaps.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-16-11",
  "experimentId": 16,
  "question": "Types of noise used in Denoising Autoencoders?",
  "shortAnswer": "Additive Gaussian noise, Salt-and-Pepper noise, and Random Masking / Cutout noise.",
  "detailedAnswer": "Exposes the model to diverse corruption modes matching real camera sensor defects.",
  "category": "conceptual",
  "difficulty": "basic"
},
  {
  "id": "viva-16-12",
  "experimentId": 16,
  "question": "Why is Sigmoid used on final Conv2DTranspose layer?",
  "shortAnswer": "Squashes reconstructed pixel values strictly into [0.0, 1.0] to match normalized image scale.",
  "detailedAnswer": "Ensures reconstructed outputs have valid visual pixel range.",
  "category": "why-how",
  "difficulty": "basic"
},
  {
  "id": "viva-16-13",
  "experimentId": 16,
  "question": "What is SSIM (Structural Similarity Index)?",
  "shortAnswer": "Perceptual metric measuring luminance, contrast, and structural degradation between two images.",
  "detailedAnswer": "Aligns better with human visual perception than simple mean squared error.",
  "category": "external-viva",
  "difficulty": "intermediate"
},
  {
  "id": "viva-16-14",
  "experimentId": 16,
  "question": "Can autoencoders be used for dimensionality reduction like PCA?",
  "shortAnswer": "Yes; a linear autoencoder with MSE loss learns the exact same subspace as Principal Component Analysis.",
  "detailedAnswer": "Non-linear autoencoders generalize PCA to complex non-linear manifolds.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-16-15",
  "experimentId": 16,
  "question": "What is a Sparse Autoencoder?",
  "shortAnswer": "Adds an L1 or KL penalty on hidden activations to encourage only a small percentage of neurons to fire.",
  "detailedAnswer": "Learns overcomplete sparse dictionary representations.",
  "category": "external-viva",
  "difficulty": "advanced"
},
  {
  "id": "viva-16-16",
  "experimentId": 16,
  "question": "Why do denoised images sometimes appear slightly blurry?",
  "shortAnswer": "MSE loss averages all possible plausible reconstructions, resulting in smooth median pixels.",
  "detailedAnswer": "Adding adversarial loss (like in GANs) or perceptual VGG loss sharpens edge textures.",
  "category": "why-how",
  "difficulty": "advanced"
},
  {
  "id": "viva-16-17",
  "experimentId": 16,
  "question": "How many filters in decoder relative to encoder?",
  "shortAnswer": "Typically symmetric: Encoder 32 -> 64; Decoder 64 -> 32 -> 1.",
  "detailedAnswer": "Symmetric mirror architecture balances information compression with reconstruction capacity.",
  "category": "code-specific",
  "difficulty": "intermediate"
},
  {
  "id": "viva-16-18",
  "experimentId": 16,
  "question": "What is an Undercomplete vs Overcomplete Autoencoder?",
  "shortAnswer": "Undercomplete has latent dimension < input dimension; Overcomplete has latent dimension > input dimension.",
  "detailedAnswer": "Overcomplete autoencoders require sparsity or denoising penalties to prevent trivial identity learning.",
  "category": "conceptual",
  "difficulty": "intermediate"
},
  {
  "id": "viva-16-19",
  "experimentId": 16,
  "question": "How to plot original, noisy, and denoised side-by-side?",
  "shortAnswer": "Use plt.subplots(1, 3) and display clean, noisy, and model.predict(noisy) with imshow.",
  "detailedAnswer": "Allows immediate visual evaluation of noise suppression and edge preservation.",
  "category": "code-specific",
  "difficulty": "basic"
},
  {
  "id": "viva-16-20",
  "experimentId": 16,
  "question": "Can Autoencoders remove watermarks and text from images?",
  "shortAnswer": "Yes, by training on image pairs where input has synthetic text overlays and target is clean.",
  "detailedAnswer": "Known as image inpainting or document restoration autoencoders.",
  "category": "external-viva",
  "difficulty": "intermediate"
}
];

export function getVivaByExperiment(experimentId: number): VivaQuestion[] {
  return VIVA_QUESTIONS.filter(q => q.experimentId === experimentId).map(q => ({
    ...q,
    short_answer: q.shortAnswer,
    detailed_answer: q.detailedAnswer,
    experiment_id: q.experimentId,
    is_external_viva: q.category === 'external-viva',
  }));
}

export const allVivaQuestions: VivaQuestion[] = VIVA_QUESTIONS.map(q => ({
  ...q,
  short_answer: q.shortAnswer,
  detailed_answer: q.detailedAnswer,
  experiment_id: q.experimentId,
  is_external_viva: q.category === 'external-viva',
}));

export const vivaByExperiment: Record<number, VivaQuestion[]> = {};
for (const q of allVivaQuestions) {
  const expId = q.experimentId || q.experiment_id || 1;
  if (!vivaByExperiment[expId]) {
    vivaByExperiment[expId] = [];
  }
  vivaByExperiment[expId].push(q);
}

