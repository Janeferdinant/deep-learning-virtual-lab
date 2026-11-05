import json

questions_by_exp = {}

# Experiment 1
questions_by_exp[1] = [
  ("What is a biological neuron vs an artificial perceptron?", "A biological neuron sums inputs in soma and fires through axon; a perceptron computes w^T x + b and applies step activation.", "Biological neurons communicate via electrochemical action potentials. The artificial perceptron abstracts this into inputs, synaptic weights, bias, summation, and threshold activation.", "conceptual", "basic"),
  ("What is the role of bias b?", "Bias shifts the decision boundary away from the origin.", "Without bias, the hyperplane w^T x = 0 must pass through (0,0), preventing separation of offset clusters.", "conceptual", "basic"),
  ("Why can't Perceptron solve XOR?", "XOR is not linearly separable in 2D Euclidean space.", "Positive points (0,1) and (1,0) cannot be separated from (0,0) and (1,1) by any single straight line.", "external-viva", "intermediate"),
  ("State the Perceptron learning rule.", "w_new = w_old + eta * (y - y_hat) * x.", "Weights are updated only when a sample is misclassified, shifting the hyperplane towards the misclassified point.", "conceptual", "intermediate"),
  ("State the Novikoff Convergence Theorem.", "If data is linearly separable with margin gamma, Perceptron converges in at most (R/gamma)^2 mistakes.", "R is the maximum norm of input vectors. The theorem proves guaranteed termination for separable data.", "external-viva", "advanced"),
  ("What features are in placement.csv?", "CGPA and Resume Score predicting binary placed status.", "A 2D feature matrix X where columns represent grades and resume quality.", "code-specific", "basic"),
  ("How are weights and bias accessed in sklearn Perceptron?", "Via clf.coef_ and clf.intercept_ attributes.", "coef_ gives weight vector [w1, w2], intercept_ gives scalar b.", "code-specific", "basic"),
  ("How do you plot the decision boundary line in 2D?", "x2 = -(w1*x1 + b) / w2.", "Setting w1*x1 + w2*x2 + b = 0 and solving for x2 gives the line equation.", "code-specific", "intermediate"),
  ("What if w2 equals zero during plotting?", "Division by zero occurs; the line is vertical at x1 = -b / w1.", "Vertical boundaries must be drawn as vertical lines using plt.axvline.", "debugging", "intermediate"),
  ("Why encode string targets before training?", "String targets raise TypeError in numeric calculations.", "LabelEncoder or pd.factorize converts text classes into 0 and 1.", "debugging", "basic"),
  ("Why is XOR accuracy ~50% with a single perceptron?", "A line can at best classify 2 or 3 of the 4 XOR points correctly.", "The maximum accuracy achievable on XOR with a single linear cut is 75% or 50%.", "why-how", "basic"),
  ("How does learning rate eta impact Perceptron?", "eta scales the update step size; for separable data without margin, it scales weights but preserves line direction.", "In basic perceptron, changing eta merely scales the weight vector uniformly.", "why-how", "intermediate"),
  ("What caused the 1969 AI Winter?", "Minsky and Papert's book proving perceptrons cannot solve XOR.", "Funding collapsed when researchers realized single-layer perceptrons could not compute basic non-linear logic.", "external-viva", "intermediate"),
  ("How can XOR be solved with feature engineering?", "Add interaction feature x3 = x1 * x2 to lift into 3D.", "In 3D, the four XOR points become linearly separable by a horizontal plane.", "why-how", "advanced"),
  ("Perceptron vs Adaline difference?", "Perceptron updates on thresholded step output; Adaline updates on continuous linear activation before thresholding.", "Adaline introduced LMS gradient descent on continuous errors.", "external-viva", "advanced"),
  ("Can a single perceptron classify 3 classes?", "No, a single unit splits space into 2 regions; 3 classes require One-vs-Rest ensemble.", "Multi-class classification requires K binary perceptrons or a multi-output dense layer.", "conceptual", "intermediate"),
  ("What loss function does Perceptron minimize?", "The Perceptron Criterion: -sum(y_i * (w^T x_i + b)) over misclassified samples.", "Loss is zero when all samples are correctly classified.", "external-viva", "advanced"),
  ("Why scale features before perceptron training?", "Large magnitude features dominate weight updates and slow convergence.", "StandardScaler ensures isotropic gradient steps in all feature directions.", "debugging", "intermediate"),
  ("How do NOT and XNOR gates behave?", "NOT is 1D linearly separable; XNOR is non-separable just like XOR.", "XNOR outputs 1 for (0,0) and (1,1), failing the linear separability test.", "code-specific", "intermediate"),
  ("Can changing activation to Sigmoid solve XOR on a single unit?", "No, because the decision boundary sigma(w^T x + b) = 0.5 is still the linear line w^T x + b = 0.", "Monotonic activation functions cannot alter the linearity of the underlying hyperplane.", "external-viva", "advanced")
]

# Experiment 2
questions_by_exp[2] = [
  ("What is an ANN and how does it extend Perceptron?", "An ANN stacks multiple non-linear layers, allowing it to learn arbitrary non-linear boundaries.", "Hidden layers transform input features into higher-dimensional representations that solve non-linear problems.", "conceptual", "basic"),
  ("Explain Backpropagation steps.", "Forward pass computes activations; error computed at output; gradients computed via chain rule; weights updated by optimizer.", "Backprop applies dLoss/dw = dLoss/da * da/dz * dz/dw backwards across layers.", "conceptual", "basic"),
  ("Compare Sigmoid, Tanh, and ReLU.", "Sigmoid: (0, 1); Tanh: (-1, 1), zero-centered; ReLU: max(0, z), non-saturating for z > 0.", "ReLU computes fastest and prevents vanishing gradients. Tanh is zero-centered.", "conceptual", "intermediate"),
  ("Why is Tanh better than Sigmoid in hidden layers?", "Tanh is zero-centered, preventing directional bias in weight updates.", "All-positive Sigmoid outputs force all weights to update in the same sign direction.", "why-how", "intermediate"),
  ("Why does ReLU train faster than Sigmoid?", "Derivative is constant 1.0 for z > 0, avoiding exponential calculations and saturation.", "ReLU computes in 1 CPU cycle and keeps gradient signals strong across layers.", "why-how", "intermediate"),
  ("Compare SGD and Adam.", "SGD updates along negative gradient; Adam maintains momentum and adaptive per-parameter learning rates.", "Adam converges much faster with minimal hyperparameter tuning.", "conceptual", "intermediate"),
  ("What happened with eta=5.0 in Week 2?", "Loss exploded and diverged towards infinity / NaN.", "Large steps overshoot the loss valley, destabilizing numerical calculations.", "code-specific", "intermediate"),
  ("What happened with eta=0.0001 in Week 2?", "Convergence was extremely slow, failing to reach good accuracy in 300 epochs.", "Tiny learning rates take negligible steps and get stuck in flat regions.", "code-specific", "intermediate"),
  ("Describe the Iris dataset.", "150 samples, 4 features, 3 balanced species classes (Setosa, Versicolor, Virginica).", "Sepal and petal length/width measurements used for multi-class classification.", "code-specific", "basic"),
  ("Why one-hot encode target labels?", "Prevents the model from assuming false numerical order between categories.", "Setosa=0, Versicolor=1, Virginica=2 would falsely imply that Virginica > Setosa.", "why-how", "basic"),
  ("What is Softmax activation?", "e^z_i / sum(e^z_j). Normalizes outputs into a probability distribution summing to 1.", "Converts logits into valid posterior probabilities for mutually exclusive classes.", "conceptual", "basic"),
  ("What is Categorical Cross-Entropy?", "Loss = -sum(y_true * log(y_pred)). Penalizes incorrect confident predictions heavily.", "Approaches 0 as predicted probability for the true class approaches 1.0.", "conceptual", "intermediate"),
  ("Why train with 30% train and 70% test in Week 2?", "To evaluate model generalization and overfitting under scarce training data.", "Tests whether backpropagation can discover generalizable rules from very few samples.", "why-how", "intermediate"),
  ("Describe the Ionosphere dataset.", "351 radar returns with 34 features predicting Good or Bad electromagnetic structure.", "High-frequency radar signals from antenna arrays in Goose Bay, Labrador.", "code-specific", "basic"),
  ("Fix for input_dim mismatch error?", "Set input_dim or input_shape of the first layer to match X.shape[1].", "ValueError occurs if the first layer expects different feature dimension than input.", "debugging", "basic"),
  ("Causes of Loss: NaN during training?", "Exploding gradients, high learning rate, log(0), or unnormalized large inputs.", "Fix by standardizing inputs, lowering learning rate, and clipping gradients.", "debugging", "intermediate"),
  ("Batch size tradeoffs?", "Small batch has noisy gradients that escape local minima; large batch offers vectorization speed.", "Mini-batch size 16-64 provides the best empirical balance.", "external-viva", "intermediate"),
  ("Epoch vs Batch vs Iteration?", "Epoch is 1 pass over all data; Batch is subset processed together; Iteration is 1 weight update.", "If N=150 and batch=10, 1 epoch contains 15 iterations.", "external-viva", "basic"),
  ("model.evaluate() vs model.predict()?", "evaluate returns loss and metrics with true y; predict returns class probabilities without y.", "Use predict for inference on unseen data, evaluate for test set benchmarks.", "code-specific", "basic"),
  ("Why can't backprop use Step activation?", "Derivative of Step is zero everywhere (undefined at 0), killing gradient flow.", "Backpropagation requires non-zero derivatives to transmit error signals.", "external-viva", "advanced")
]

# Experiment 3
questions_by_exp[3] = [
  ("What is a Deep Feed-Forward ANN?", "A network with multiple successive hidden layers (>= 4 in Exp 3) learning hierarchical representations.", "Each layer transforms the representations of previous layers into higher-level abstractions.", "conceptual", "basic"),
  ("What is the Universal Approximation Theorem?", "A 1-hidden-layer network can approximate any continuous function, but depth offers exponential parameter efficiency.", "Deep networks compose representations hierarchically, solving complex functions with far fewer neurons.", "conceptual", "intermediate"),
  ("What weight initialization is best with ReLU?", "He (Kaiming) Normal or Uniform initialization.", "He initialization samples from N(0, sqrt(2/n_in)), accounting for the 50% zeroing by ReLU.", "conceptual", "intermediate"),
  ("What happens if all weights are initialized to 0?", "Symmetry breaking fails: all neurons in a layer compute identical outputs and gradients.", "The network behaves as if each layer has only a single neuron.", "conceptual", "basic"),
  ("What is the Dying ReLU problem?", "Neurons whose net input is consistently negative output 0 with 0 gradient permanently.", "Once inactive, zero gradient prevents the weights from ever updating back to active state.", "conceptual", "advanced"),
  ("How many parameters in: 34 -> 32 -> 24 -> 16 -> 8 -> 2?", "2,466 total trainable parameters.", "34*32+32=1120; 32*24+24=792; 24*16+16=400; 16*8+8=136; 8*2+2=18. Total = 2,466.", "code-specific", "intermediate"),
  ("How does deep ANN compare to shallow on Ionosphere?", "Deep ANN forms more complex non-linear decision regions, capturing higher-order radar interactions.", "Empirical accuracy on test split improves due to compositional feature learning.", "code-specific", "intermediate"),
  ("How do you stabilize oscillating loss in deep ANN?", "Reduce learning rate, add momentum/Adam, or apply learning rate decay schedules.", "Smaller update steps allow the optimizer to traverse narrow ravines in the loss landscape.", "debugging", "intermediate"),
  ("Why funnel layer widths (34 -> 32 -> 24 -> 16 -> 8 -> 2)?", "Acts as an information bottleneck, compressing signals and discarding noise.", "Forces earlier layers to retain only the most discriminative latent factors.", "why-how", "advanced"),
  ("How does EarlyStopping callback work in Keras?", "Monitors validation loss, halts training when no improvement occurs for patience epochs.", "restore_best_weights=True ensures the model retains weights from the epoch with minimal val loss.", "code-specific", "advanced"),
  ("What is internal representation in deep ANN?", "Latent feature vectors computed by intermediate hidden layers.", "Earlier layers learn primitive linear combinations; later layers learn task-specific manifolds.", "conceptual", "basic"),
  ("Why is deeper better than wider?", "Depth provides combinatorial expressive power by composing sub-functions exponentially.", "A network with k layers of width n can express functions requiring exponential width in 1 layer.", "why-how", "intermediate"),
  ("What is the vanishing gradient problem in deep ANNs?", "Gradients exponentially decay toward zero as they backpropagate through many layers.", "Repeated multiplication of small derivatives (e.g. < 0.25 in Sigmoid) halts learning in early layers.", "external-viva", "intermediate"),
  ("How does LeakyReLU differ from ReLU?", "LeakyReLU allows a small positive slope (e.g. 0.01*z) for z < 0.", "Prevents dying neurons by ensuring a small non-zero gradient always flows backward.", "conceptual", "intermediate"),
  ("What is ELU (Exponential Linear Unit)?", "Smooth activation equal to z for z > 0 and alpha*(e^z - 1) for z <= 0.", "Produces negative values that bring mean unit activations closer to zero, speeding learning.", "external-viva", "advanced"),
  ("Why use He initialization instead of Xavier for ReLU?", "Xavier assumes linear or tanh activations; He accounts for half of ReLU activations being zero.", "Xavier variance is 1/n_in; He variance is 2/n_in to keep variance constant across ReLU layers.", "external-viva", "advanced"),
  ("What causes overfitting in a deep ANN?", "Excessive parameter capacity relative to training sample count.", "The network memorizes individual noise artifacts rather than underlying general trends.", "why-how", "basic"),
  ("How to diagnose vanishing gradients in code?", "Inspect model.trainable_weights gradient norms during training steps.", "If early layer gradients are 1e-7 while late layers are 1e-1, vanishing gradient is occurring.", "debugging", "advanced"),
  ("What does model.summary() display?", "Layer names, output shapes, and parameter counts (trainable and non-trainable).", "Used to verify layer dimensions, connections, and total memory footprint.", "code-specific", "basic"),
  ("Can a Deep Feedforward ANN classify images reliably?", "It works on small digits (MNIST) but fails on complex scenes because it lacks translation invariance.", "Flattening destroys spatial locality and requires millions of redundant parameters.", "external-viva", "intermediate")
]

# Experiment 4
questions_by_exp[4] = [
  ("Why Flatten 28x28 images for Dense layers?", "Dense layers perform matrix dot product with 1D vectors; Flatten converts 28x28 into 784.", "Fully connected weights connect to individual feature scalars, requiring flattened vectors.", "conceptual", "basic"),
  ("Why divide MNIST pixels by 255.0?", "Normalizes pixels from [0, 255] to [0.0, 1.0], preventing gradient explosion and saturation.", "Keeps forward weighted sums in well-behaved numeric ranges.", "conceptual", "basic"),
  ("Sparse categorical vs categorical crossentropy?", "Sparse accepts integer class labels (0-9); categorical requires one-hot encoded vectors.", "Sparse categorical crossentropy saves memory by avoiding one-hot target matrix creation.", "code-specific", "basic"),
  ("Major flaw of Dense networks for images?", "Lack of translation invariance: a shifted digit appears as an entirely novel feature pattern.", "Dense layers assign independent weights to each pixel location without spatial sharing.", "conceptual", "intermediate"),
  ("What do off-diagonal confusion matrix elements show?", "Misclassifications where True Class != Predicted Class.", "For example, cell [4, 9] counts how many true 4s were mispredicted as 9s.", "conceptual", "basic"),
  ("Parameters in Flatten -> Dense(128)?", "784 * 128 + 128 = 100,480 parameters.", "Each of the 128 neurons has 784 weights plus 1 bias term.", "code-specific", "intermediate"),
  ("Why might a canvas hand-drawn digit fail on MNIST model?", "MNIST has black background (0) and white ink (255); black ink on white canvas is inverted.", "Input pixels must be inverted (255 - pixel) and centered before feeding to the model.", "debugging", "intermediate"),
  ("What is Precision in digit classification?", "True Positives / (True Positives + False Positives).", "Measures the reliability of the model when it predicts a specific digit class.", "conceptual", "basic"),
  ("Why does Deep ANN perform poorly on CIFAR-10 (~50%)?", "Natural 32x32x3 color images have complex backgrounds and pose shifts that require convolution.", "Dense networks suffer from parameter explosion and cannot capture local translation invariance.", "why-how", "intermediate"),
  ("How to detect overfitting from epoch accuracy curves?", "Training accuracy continues climbing while validation accuracy peaks and starts dropping.", "The divergence point indicates when model begins memorizing training noise.", "why-how", "intermediate"),
  ("What is HeNormal initialization in Keras?", "kernel_initializer='HeNormal' draws weights from N(0, sqrt(2/fan_in)).", "Ensures activation variance remains stable through deep ReLU networks.", "code-specific", "intermediate"),
  ("What is Macro F1 vs Weighted F1 score?", "Macro computes unweighted average across classes; Weighted weights by class support.", "Macro F1 penalizes models that perform poorly on minority classes.", "external-viva", "intermediate"),
  ("What is the MNIST dataset?", "60,000 training and 10,000 testing 28x28 grayscale handwritten digits (0-9).", "Standard benchmark created by Yann LeCun, Corinna Cortes, and Christopher Burges.", "code-specific", "basic"),
  ("What does validation_split=0.2 do in model.fit()?", "Reserves the last 20% of training data exclusively for validation after each epoch.", "Allows monitoring generalization loss without touching the final test set.", "code-specific", "basic"),
  ("Why use ReLU over Sigmoid in MNIST hidden layers?", "ReLU prevents saturation, trains 6x faster, and enables deeper networks.", "Sigmoid saturates quickly on 784 inputs, stalling backpropagation.", "why-how", "basic"),
  ("How to handle class imbalance in image classification?", "Use class_weight in model.fit() or apply focal loss / oversampling.", "Balances loss gradient contributions so frequent classes don't dominate.", "external-viva", "advanced"),
  ("What is Top-k categorical accuracy?", "Measures if the true class is among the top k highest predicted probabilities.", "Top-1 accuracy checks if argmax is correct; Top-5 checks if true class is in top 5.", "external-viva", "basic"),
  ("Why are handwritten 4 and 9 commonly confused?", "They share similar vertical stems, horizontal crossbars, and upper loops.", "When written hastily, the closed loop of 9 resembles the open prong of 4.", "why-how", "intermediate"),
  ("What is the input shape of MNIST in Keras Sequential?", "input_shape=(28, 28) for Flatten layer, or (784,) if pre-flattened.", "Specifying input shape informs Keras to build weight matrices on instantiation.", "code-specific", "basic"),
  ("How to save and load trained MNIST weights?", "model.save('mnist_model.keras') and keras.models.load_model().", "Saves architecture, weights, and optimizer state to a single HDF5/Keras zip file.", "code-specific", "basic")
]

# Experiment 5
questions_by_exp[5] = [
  ("What is 2D Convolution?", "Sliding a weight kernel over an image, taking element-wise dot products, and adding bias to form feature maps.", "Extracts local features such as edges, corners, and ridges across the spatial domain.", "conceptual", "basic"),
  ("Output size of 28x28 convolved with 3x3 filter without padding?", "26 x 26 ((28 - 3 + 0)/1 + 1 = 26).", "A valid convolution shrinks spatial dimensions by (kernel_size - 1) along each axis.", "conceptual", "basic"),
  ("Purpose of Max Pooling?", "Downsamples feature maps, reduces computation and parameters, and provides local translation invariance.", "Extracts the dominant maximum feature in each local window (e.g. 2x2).", "conceptual", "basic"),
  ("Parameters in Conv2D(32, (3, 3)) on 1-channel image?", "(3 * 3 * 1 + 1) * 32 = 320 parameters.", "Each filter has 9 weights plus 1 bias. 32 filters have 320 parameters.", "code-specific", "intermediate"),
  ("What is Receptive Field?", "The local patch in the input image that directly influences the activation of a neuron.", "Grows larger as you move deeper through successive convolution and pooling layers.", "conceptual", "intermediate"),
  ("Output shape after Conv2D(32, 3x3, valid) and MaxPool(2, 2) on 28x28x1?", "(13, 13, 32).", "Conv2D shrinks 28 to 26; MaxPool divides 26 by 2 to get 13.", "code-specific", "intermediate"),
  ("Output shape of Conv2D(64, 3x3, valid) on (13, 13, 32)?", "(11, 11, 64).", "13 - 3 + 1 = 11. Spatial size becomes 11x11 across 64 feature channels.", "code-specific", "intermediate"),
  ("Parameters in Conv2D(64, (3, 3)) on 32-channel input?", "(3 * 3 * 32 + 1) * 64 = 18,496 parameters.", "Each filter has 3x3x32 = 288 weights plus 1 bias = 289. 64 filters have 18,496.", "code-specific", "advanced"),
  ("Why do CNNs outperform Dense networks on images?", "Parameter sharing and spatial locality invariance.", "A filter detecting an edge is applied across the whole image, drastically reducing parameters.", "why-how", "basic"),
  ("How many units when Flattening (None, 5, 5, 64)?", "5 * 5 * 64 = 1,600 units.", "Unrolls 3D tensor into a 1D vector feeding into Dense layers.", "code-specific", "basic"),
  ("What is a Feature Map?", "The 2D output grid showing activations of a specific convolutional filter across the image.", "Bright regions indicate strong match between the filter's kernel pattern and image patch.", "conceptual", "basic"),
  ("Stride parameter in Conv2D?", "The step size by which the filter window slides across the input image.", "Stride=1 shifts pixel-by-pixel; Stride=2 downsamples spatial dimensions by roughly half.", "conceptual", "intermediate"),
  ("Average Pooling vs Max Pooling?", "Max pooling selects maximum value; Average pooling computes mean value.", "Max pooling preserves sharp edges and contrast; Average pooling blurs features slightly.", "conceptual", "intermediate"),
  ("Why is 3x3 filter preferred over larger filters?", "Stacking 3x3 filters covers large receptive fields with fewer parameters and more non-linearities.", "Two 3x3 filters cover 5x5 with 18 weights vs 25 weights for a single 5x5.", "why-how", "intermediate"),
  ("What are channel dimensions in RGB vs grayscale?", "Grayscale has 1 channel (H, W, 1); RGB has 3 channels (H, W, 3).", "Convolution filters have depth matching the input channel count.", "conceptual", "basic"),
  ("What is feature hierarchy in CNNs?", "Layer 1 detects edges; Layer 2 detects textures/corners; Layer 3 detects object parts.", "Hierarchical abstraction mirrors the visual cortex in primate brains.", "external-viva", "intermediate"),
  ("What is Translation Invariance vs Equivariance?", "Convolution is equivariant (shifted input produces shifted feature map); Pooling gives invariance.", "Invariance means detecting a cat regardless of whether it is in the top-left or bottom-right.", "external-viva", "advanced"),
  ("Why use 1x1 convolutions?", "Performs cross-channel pooling, dimensionality reduction, and adds non-linearities.", "Allows changing channel depth without altering spatial height and width.", "external-viva", "advanced"),
  ("Can CNNs handle variable input image sizes?", "Fully convolutional networks can; Dense heads require fixed input sizes or Global Pooling.", "Dense layers have fixed weight matrices; Global Average Pooling enables variable inputs.", "why-how", "advanced"),
  ("Fix for 'Negative dimension size' error in Conv2D?", "Reduce kernel size or add padding='same'.", "Occurs when repeated valid convolutions shrink spatial dimension below filter size.", "debugging", "intermediate")
]

# Write out the remaining experiments 6 to 16 systematically
# Let's inspect
print("Populating 6 to 16...")

