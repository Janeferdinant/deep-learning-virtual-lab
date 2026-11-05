# Generates complete vivaData.ts with all 16 experiments x 20 questions = 320 questions
import json

experiments = [
  (1, "Single-Unit Perceptron"),
  (2, "Artificial Neural Network and Backpropagation"),
  (3, "Deep Feed-Forward ANN"),
  (4, "Image Classification using Deep Feedforward NN"),
  (5, "CNN with Two Convolution Layers"),
  (6, "CNN with Four or More Convolution Layers"),
  (7, "Padding and Batch Normalization"),
  (8, "Regularization and Dropout"),
  (9, "Data Augmentation"),
  (10, "CNN with Data Augmentation"),
  (11, "LeNet-5 Architecture"),
  (12, "VGG-16 and VGG-19 CNN Architectures"),
  (13, "Recurrent Neural Networks (RNN)"),
  (14, "Bidirectional LSTM"),
  (15, "Generative Adversarial Networks (GANs)"),
  (16, "Autoencoders for Image Denoising")
]

all_viva = []

def add_v(exp_id, q, s, d, cat, diff):
    all_viva.append({
        "id": f"viva-{exp_id}-{len([x for x in all_viva if x['experimentId'] == exp_id]) + 1}",
        "experimentId": exp_id,
        "question": q,
        "shortAnswer": s,
        "detailedAnswer": d,
        "category": cat,
        "difficulty": diff
    })

# Experiment 1
for q, s, d, cat, diff in [
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
]: add_v(1, q, s, d, cat, diff)

# Experiment 2
for q, s, d, cat, diff in [
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
]: add_v(2, q, s, d, cat, diff)

# Experiment 3
for q, s, d, cat, diff in [
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
]: add_v(3, q, s, d, cat, diff)

# Experiment 4
for q, s, d, cat, diff in [
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
]: add_v(4, q, s, d, cat, diff)

# Experiment 5
for q, s, d, cat, diff in [
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
]: add_v(5, q, s, d, cat, diff)

# Experiments 6 to 16
for eid, title in [
  (6, "CNN with Four or More Convolution Layers"),
  (7, "Padding and Batch Normalization"),
  (8, "Regularization and Dropout"),
  (9, "Data Augmentation"),
  (10, "CNN with Data Augmentation"),
  (11, "LeNet-5 Architecture"),
  (12, "VGG-16 and VGG-19 CNN Architectures"),
  (13, "Recurrent Neural Networks (RNN)"),
  (14, "Bidirectional LSTM"),
  (15, "Generative Adversarial Networks (GANs)"),
  (16, "Autoencoders for Image Denoising")
]:
  # Add 20 questions per experiment
  if eid == 6:
    qs = [
      ("Why stack 4+ convolution layers?", "Learns deep hierarchical abstractions from edges to complex object parts.", "Deeper networks can represent more complex non-linear manifolds with fewer total parameters than wide shallow models.", "conceptual", "basic"),
      ("Fashion MNIST validation accuracy across epochs 5, 10, 20?", "Steep rise by epoch 5 (~88%), steady gain by epoch 10 (~91%), plateau by epoch 20 (~93%).", "Most generalization gains occur early; beyond epoch 10, risk of overfitting increases on small datasets.", "conceptual", "intermediate"),
      ("Why does GPU run 8x-15x faster than CPU for CNNs?", "GPUs feature thousands of parallel CUDA/Tensor cores tailored for matrix tensor convolutions.", "A CPU has 4-16 high-speed cores; a GPU has thousands of smaller cores executing SIMD matrix multiplications.", "conceptual", "basic"),
      ("Risk of deep CNNs without normalization or skip connections?", "Vanishing or exploding gradients during backpropagation.", "Repeated matrix multiplications cause gradients to decay or explode across multiple layers.", "conceptual", "intermediate"),
      ("Receptive field of four stacked 3x3 conv layers?", "9 x 9 pixels.", "Each 3x3 layer adds 2 pixels to the receptive field: 3 -> 5 -> 7 -> 9.", "conceptual", "advanced"),
      ("Hardest classes to distinguish in Fashion MNIST?", "Pullover, Coat, and Shirt.", "These garments share almost identical 28x28 grayscale torso silhouettes and collar lines.", "code-specific", "basic"),
      ("Expected runtime on CPU vs Colab T4 GPU for 20 epochs?", "CPU: ~70-90s; GPU: ~8-12s (8-10x speedup).", "Parallel CUDA convolution kernels process batches concurrently on GPU.", "code-specific", "intermediate"),
      ("Check GPU availability in TensorFlow?", "tf.config.list_physical_devices('GPU').", "Returns a non-empty list of available GPU devices recognized by TensorFlow runtime.", "code-specific", "basic"),
      ("Effect of doubling batch size from 32 to 64 on GPU VRAM?", "Doubles memory allocated for intermediate activation and gradient tensors.", "Larger batches require proportional GPU VRAM to store forward pass activations for backprop.", "code-specific", "intermediate"),
      ("Sign of overfitting at 20 epochs on Fashion MNIST?", "Train loss drops to 0.08 while val loss rises from 0.28 to 0.42.", "Widening divergence indicates memorization of training instances.", "debugging", "intermediate"),
      ("How does filter count progression (32->32->64->64) work?", "Spatial size decreases through pooling while channel depth doubles to capture richer semantic combinations.", "Preserves total informational capacity as spatial resolution shrinks.", "why-how", "intermediate"),
      ("Why use two conv layers before each pooling layer?", "Increases receptive field and non-linearity before downsampling.", "Stacking two 3x3 convs provides 5x5 receptive field with two ReLUs.", "why-how", "intermediate"),
      ("What causes OOM (Out Of Memory) on GPU?", "Batch size or image resolution too large for available GPU VRAM.", "Fix by reducing batch_size, downsampling image resolution, or using mixed precision float16.", "debugging", "basic"),
      ("What is mixed precision training (fp16)?", "Using 16-bit half precision for matrix multiplies while maintaining 32-bit master weights.", "Doubles computation speed on modern Tensor Cores and cuts VRAM usage by 50%.", "external-viva", "advanced"),
      ("Why does test accuracy lag training accuracy?", "Generalization gap due to statistical variance between train and unseen test distributions.", "Overfitting causes the model to perform better on samples it has seen.", "why-how", "basic"),
      ("What is gradient explosion and how to prevent it?", "Gradients grow exponentially large, causing NaN weights; prevented via gradient clipping or batch normalization.", "clipnorm or clipvalue bounds gradient magnitudes before weight updates.", "debugging", "intermediate"),
      ("How does Colab GPU runtime disconnect affect training?", "Ephemerality loses in-memory weights; ModelCheckpoint saves weights periodically to Google Drive.", "Saving checkpoints ensures training can be resumed after session timeout.", "debugging", "basic"),
      ("Difference between CUDA and cuDNN?", "CUDA is the general parallel computing platform; cuDNN is NVIDIA's specialized library of optimized deep learning primitives.", "cuDNN provides hand-tuned assembly implementations of 2D convolutions, pooling, and activations.", "external-viva", "intermediate"),
      ("What is TensorBoard and how is it used in Exp 6?", "Visualization toolkit for tracking epoch loss, accuracy curves, and weight histograms.", "tf.keras.callbacks.TensorBoard logs training telemetry for real-time visualization.", "code-specific", "basic"),
      ("Why do 4-layer CNNs achieve ~93% on Fashion MNIST but 99%+ on MNIST?", "Fashion MNIST has much higher intra-class variance and complex fabric textures than simple digits.", "Digits are binary strokes with low ambiguity; clothing items have diverse styles and cuts.", "external-viva", "intermediate")
    ]
  elif eid == 7:
    qs = [
      ("Dimension formula for 2D convolution output?", "W_out = floor((W - F + 2P)/S) + 1.", "Standard spatial formula accounting for input width W, filter F, padding P, and stride S.", "conceptual", "basic"),
      ("What does padding='same' do in Keras?", "Pads zeros so that output spatial dimensions equal input dimensions when stride=1.", "Prevents spatial shrinkage and preserves edge boundary information.", "conceptual", "basic"),
      ("What is Internal Covariate Shift?", "Continuous shift in the distribution of layer inputs as preceding layer parameters update during training.", "Slows down training by forcing layers to constantly adapt to shifting input distributions.", "conceptual", "intermediate"),
      ("Two learnable parameters in Batch Normalization?", "Gamma (scale) and Beta (shift).", "Allows the network to learn the optimal scale and shift, even undoing normalization if needed.", "conceptual", "intermediate"),
      ("How does Batch Normalization behave at inference time?", "Uses exponential running averages of mean and variance accumulated during training.", "Ensures deterministic predictions for single samples without depending on a batch.", "conceptual", "advanced"),
      ("Output of 28x28 with 5x5 filter, stride 1, padding 'valid'?", "24 x 24 ((28 - 5 + 0)/1 + 1 = 24).", "Shrinks spatial dimension by (5 - 1) = 4 pixels along each dimension.", "code-specific", "basic"),
      ("Why does BN allow much higher learning rates?", "Prevents activation distributions from exploding or vanishing, stabilizing gradient updates.", "Keeps layer inputs in linear or non-saturated regimes throughout training.", "why-how", "intermediate"),
      ("Regularizing side effect of Batch Normalization?", "Mini-batch stochastic noise in mean/variance acts as mild regularizer, reducing need for dropout.", "Slight noise perturbation prevents overfitting to individual training samples.", "why-how", "intermediate"),
      ("Where to place BatchNormalization in CNN layer order?", "Immediately after Conv2D and before ReLU (Conv2D -> BN -> ReLU).", "Normalizes the linear transformation z before squashing through non-linear activation.", "code-specific", "intermediate"),
      ("Number of means/variances for input (32, 28, 28, 64) in BN?", "64 pairs of mean and variance (one pair per feature channel).", "Statistics are calculated across batch (32) and spatial dimensions (28x28).", "code-specific", "advanced"),
      ("What is zero padding?", "Adding rows and columns of zeros around the perimeter of an image.", "Allows filters to center on border pixels without violating matrix boundaries.", "conceptual", "basic"),
      ("Why does 'valid' padding cause spatial shrinkage?", "Filters cannot extend past image borders, shrinking each dimension by F-1.", "In deep networks without padding, spatial dimensions shrink to 1x1 within a few layers.", "why-how", "basic"),
      ("Difference between Batch Normalization and Layer Normalization?", "BN normalizes across the batch per channel; LN normalizes across features/channels per sample.", "LN is preferred in RNNs and Transformers where batch sizes are small or variable.", "external-viva", "advanced"),
      ("What is Group Normalization?", "Divides channels into groups and normalizes within each group per sample.", "Stable across arbitrary batch sizes (even batch_size=1) unlike Batch Normalization.", "external-viva", "advanced"),
      ("Why does BN fail with batch_size=1 during training?", "Variance is 0, causing division by zero or NaN.", "BN requires at least 8-16 samples to calculate meaningful sample statistics.", "debugging", "intermediate"),
      ("What does momentum=0.99 mean in BatchNormalization?", "Weight given to historical running mean vs current batch mean when updating moving statistics.", "running_mean = 0.99 * running_mean + 0.01 * batch_mean.", "code-specific", "advanced"),
      ("What is epsilon in Batch Normalization?", "Small constant (e.g. 1e-3) added to variance to prevent division by zero.", "sqrt(variance + epsilon) ensures numerical stability.", "code-specific", "basic"),
      ("Can BN be folded into convolution weights at deployment?", "Yes, gamma and beta can be mathematically folded into kernel weights and biases for zero inference overhead.", "Eliminates BN calculation during production serving by modifying Conv2D weights directly.", "external-viva", "advanced"),
      ("Does SAME padding with stride 2 preserve spatial size?", "No, output size is ceil(W / S) = ceil(28 / 2) = 14x14.", "Stride 2 downsamples spatial dimension by half even with padding='same'.", "code-specific", "intermediate"),
      ("Why did models with BN train faster in Week 7?", "Loss converged in ~4 epochs compared to ~11 epochs without BN.", "BN maintains stable gradient flow, allowing confident optimizer trajectory toward minima.", "code-specific", "intermediate")
    ]
  elif eid == 8:
    qs = [
      ("Difference between L1 and L2 regularization?", "L1 penalizes sum of absolute weights inducing sparsity; L2 penalizes sum of squared weights shrinking weights smoothly.", "L1 does feature selection by zeroing weights; L2 shrinks all weights toward zero without setting them strictly to zero.", "conceptual", "basic"),
      ("How does Dropout combat overfitting?", "Randomly deactivates a fraction p of neurons during each training step, preventing co-adaptation.", "Forces each neuron to learn robust, generalizable features independently of its neighbors.", "conceptual", "basic"),
      ("Inverted Dropout scaling during training?", "Active activations are divided by (1 - p) so expected value matches test time without post-scaling.", "If rate=0.5, active units are multiplied by 2.0 during training.", "conceptual", "intermediate"),
      ("How does Dropout behave during testing?", "It is turned off completely: all neurons remain active with no scaling.", "During inference, the model behaves as an ensemble average over all thinned subnetworks.", "conceptual", "basic"),
      ("Which model had smallest generalization gap in Week 8?", "Model e: L2 Regularization combined with Dropout (~0.1% gap).", "Combines weight shrinkage with ensemble feature decorrelation for optimal generalization.", "code-specific", "intermediate"),
      ("Gradient penalty added by L2 regularization?", "lambda * w (proportional weight decay).", "Continuously subtracts a fraction of the weight during each gradient update step.", "conceptual", "intermediate"),
      ("What visual curve defines underfitting?", "Both training accuracy and validation accuracy remain low and flat.", "The model lacks capacity or is over-regularized, failing to capture training trends.", "conceptual", "basic"),
      ("Active units in Dense(512) with Dropout(0.25)?", "512 * 0.75 = 384 active units on average.", "25% of the units are randomly masked with zero during each training forward pass.", "code-specific", "basic"),
      ("What happens if Dropout rate is set to 0.95?", "Severe underfitting because 95% of information capacity is lost.", "Signals cannot propagate effectively through the network, preventing learning.", "why-how", "intermediate"),
      ("Why not place Dropout on final Softmax layer?", "It would zero out class probability logits, disrupting cross-entropy calculation.", "Output units must produce a valid normalized distribution summing to 1.0.", "why-how", "advanced"),
      ("What is weight decay in AdamW?", "Decoupled weight decay applied directly to weights rather than added to the loss gradient.", "Loshchilov & Hutter (2019) showed standard L2 in Adam interacts poorly with adaptive learning rates.", "external-viva", "advanced"),
      ("Why does L1 induce exact zero weights (sparsity)?", "The derivative of |w| is a constant +-1, continuing to pull weights to zero even when small.", "L2 derivative lambda*w shrinks as w approaches 0, slowing down near the origin.", "external-viva", "advanced"),
      ("What is Early Stopping as a form of regularization?", "Halting training before weights overfit to the training distribution.", "Restricts effective parameter search space to neighborhoods close to initial weights.", "conceptual", "intermediate"),
      ("Can Dropout be applied to Convolutional layers?", "Yes, but SpatialDropout2D is preferred over standard Dropout for feature maps.", "SpatialDropout2D drops entire feature channels rather than individual isolated pixels.", "external-viva", "advanced"),
      ("What is Monte Carlo Dropout (Gal & Ghahramani)?", "Keeping Dropout active at test time to sample multiple stochastic predictions for uncertainty estimation.", "Allows standard neural networks to approximate Bayesian Gaussian processes.", "external-viva", "advanced"),
      ("How does label smoothing act as regularizer?", "Replaces hard 0 and 1 targets with 0.05 and 0.95, preventing overconfident output logits.", "Discourages the network from driving weights to infinity to satisfy extreme softmax outputs.", "external-viva", "advanced"),
      ("Difference between kernel_regularizer and activity_regularizer?", "kernel_regularizer penalizes weight values; activity_regularizer penalizes neuron activation values.", "Activity regularizers encourage sparse firing of hidden neurons.", "code-specific", "intermediate"),
      ("Why did Base Model overfit in Week 8 on Fashion MNIST?", "Base model has no weight penalties, memorizing training patterns with ~8.4% generalization gap.", "Train acc reached 96.5% while test acc was only 88.1%.", "code-specific", "basic"),
      ("How to choose the L2 regularization factor lambda?", "Typically hyperparameter tuned across logarithmic grid [1e-5, 1e-4, 1e-3, 1e-2].", "Too large causes underfitting; too small provides insufficient regularization.", "debugging", "intermediate"),
      ("Does Dropout slow down training time per epoch?", "Negligible compute overhead, but requires more total epochs to converge to minimum.", "Because capacity is halved during each pass, the network needs more steps to integrate weights.", "why-how", "basic")
    ]
  elif eid == 9:
    qs = [
      ("Objective of Data Augmentation?", "Artificially expands training size and diversity using label-preserving domain transformations to improve generalization.", "Prevents overfitting by teaching the model to ignore irrelevant visual perturbations.", "conceptual", "basic"),
      ("What does horizontal_flip=True do in ImageDataGenerator?", "Randomly mirrors images horizontally from left to right with 50% probability.", "Teaches the model horizontal reflection invariance.", "code-specific", "basic"),
      ("Why avoid vertical_flip=True on MNIST digits?", "Inverts digits into different classes or invalid characters (e.g. '6' becomes '9').", "Augmentations must be strictly label-preserving.", "why-how", "basic"),
      ("What does fill_mode='nearest' do?", "Fills newly exposed boundary pixels with the value of the nearest valid pixel.", "Prevents black borders from appearing when images are rotated or shifted.", "code-specific", "basic"),
      ("What transformation is applied by shear_range=0.2?", "Affine shear angle distortion shifting coordinates proportionally to distance from axis.", "Simulates viewing objects from an oblique perspective angle.", "conceptual", "intermediate"),
      ("What scaling occurs with zoom_range=0.2?", "Randomly zooms image between [0.8, 1.2] (80% to 120% scale).", "Simulates objects appearing closer or further away from camera.", "code-specific", "basic"),
      ("How does Data Augmentation benefit medical datasets with 50 scans?", "Creates thousands of realistic synthetic variations, preventing memorization on small cohorts.", "Crucial regularizer when acquiring physical clinical patient data is expensive or rare.", "why-how", "intermediate"),
      ("Is data augmentation applied during test set evaluation?", "No, test evaluation is performed strictly on unmodified original raw test images.", "Ensures realistic, unadulterated measurement of real-world generalization.", "conceptual", "basic"),
      ("What does brightness_range=[0.7, 1.3] simulate?", "Varying illumination conditions, such as bright direct sunlight vs dim indoor lighting.", "Forces feature detectors to rely on contrast and geometry rather than raw intensity.", "code-specific", "basic"),
      ("Risk of extreme augmentation (e.g. rotation=180, zoom=4.0)?", "Distorts images beyond recognizable reality, injecting misleading noise and degrading accuracy.", "Violates label preservation and corrupts feature representations.", "debugging", "intermediate"),
      ("Offline vs Online data augmentation?", "Offline generates and saves files to disk beforehand; Online synthesizes batches in RAM dynamically during training.", "Online augmentation requires zero additional disk storage and presents fresh variations every epoch.", "conceptual", "intermediate"),
      ("What is Albumentations library?", "Fast, highly optimized Python image augmentation library based on OpenCV.", "Offers superior execution speed and broader transform suites than Keras ImageDataGenerator.", "external-viva", "intermediate"),
      ("What is Test-Time Augmentation (TTA)?", "Augmenting test images multiple ways, predicting each, and averaging predictions for final class.", "Improves test accuracy by 1-2% at the cost of N-times higher inference latency.", "external-viva", "advanced"),
      ("What does width_shift_range=0.2 do?", "Randomly translates the image horizontally by up to 20% of its total width.", "Teaches translation invariance across the camera viewport.", "code-specific", "basic"),
      ("How to augment image masks for semantic segmentation?", "Both image and segmentation mask must receive the exact identical geometric transform seed.", "Flipping the image without flipping the mask destroys alignment.", "debugging", "advanced"),
      ("What is AutoAugment (Cubuk et al. 2019)?", "Reinforcement learning search algorithm that automatically discovers optimal augmentation policies for a dataset.", "Learns probabilities and magnitudes for 16 image transforms.", "external-viva", "advanced"),
      ("What is RandAugment?", "Simplified augmentation strategy with only 2 parameters: number of transforms N and magnitude M.", "Dramatically reduces search space while matching AutoAugment performance.", "external-viva", "advanced"),
      ("How to display augmented images with matplotlib?", "Iterate over datagen.flow() generator and plot batch images using plt.imshow().", "Useful for visually confirming that augmentations look realistic and label-preserving.", "code-specific", "basic"),
      ("Why does ImageDataGenerator require 4D tensor input?", "Expects shape (batch_size, height, width, channels) or (1, H, W, C) for a single image.", "Single images must be expanded using np.expand_dims(img, axis=0).", "debugging", "basic"),
      ("Can data augmentation replace the need for more real training data?", "It alleviates overfitting and boosts accuracy, but cannot completely replace diverse real-world samples.", "Synthetic transforms cannot introduce novel real-world visual concepts that are absent from original data.", "external-viva", "intermediate")
    ]
  elif eid == 10:
    qs = [
      ("Test accuracy gain from data augmentation on CIFAR-10 in Exp 10?", "Validation accuracy increased by ~7% (from ~75.2% to ~82.4%).", "Overfitting gap dropped from ~17% to ~2%, proving strong generalization benefits.", "code-specific", "intermediate"),
      ("Why CIFAR-10 benefits more from augmentation than MNIST?", "Natural color objects have rich real-world orientation, lighting, and scale variations.", "Digits are mostly centered and upright; real vehicles and animals appear in arbitrary poses.", "why-how", "basic"),
      ("Does datagen.flow() increase dataset size on disk?", "No, transforms are computed on-the-fly in RAM per batch during training.", "Saves disk space and provides infinite subtle variations across epochs.", "code-specific", "basic"),
      ("Why does training loss decrease more slowly with augmentation?", "The model faces a harder task because it never sees the exact same image twice.", "Prevents early training memorization while steadily building robust representations.", "why-how", "intermediate"),
      ("What is Cutout augmentation?", "Randomly masking square patches of an image with zero or gray pixels.", "Forces network to attend to multiple distributed visual cues rather than a single cue.", "conceptual", "intermediate"),
      ("What is Mixup augmentation (Zhang et al. 2017)?", "Linearly blends pairs of images and labels: x = lambda*x1 + (1-lambda)*x2.", "Encourages linear behavior between classes and smooths decision boundaries.", "conceptual", "advanced"),
      ("Why horizontal flip is valid for cars and ships in CIFAR-10?", "Vehicles and animals retain their semantic category whether facing left or right.", "Horizontal reflection is naturally label-preserving for symmetric natural objects.", "why-how", "basic"),
      ("Effect of augmentation on training time per epoch?", "Slightly increases time per epoch due to CPU tensor preprocessing.", "Asynchronous multi-threaded data loaders or GPU tf.data pipelines mitigate this latency.", "code-specific", "intermediate"),
      ("How to confirm superior generalization from metrics?", "Higher validation/test accuracy paired with a smaller generalization gap (Train Acc - Val Acc).", "Model with 85% train / 83% val is far superior to 95% train / 75% val.", "conceptual", "basic"),
      ("Modern Keras syntax for training with ImageDataGenerator?", "model.fit(datagen.flow(x_train, y_train, batch_size=32), ...).", "In TF2.x, model.fit natively consumes Python generators and tf.data pipelines.", "code-specific", "basic"),
      ("What is CIFAR-10 dataset composition?", "60,000 32x32 color images across 10 classes (airplane, automobile, bird, cat, deer, dog, frog, horse, ship, truck).", "50,000 training and 10,000 testing images created by Alex Krizhevsky.", "code-specific", "basic"),
      ("Why normalize CIFAR-10 by channel mean and standard deviation?", "Standardizes pixel distribution per channel, accelerating gradient descent convergence.", "Centering RGB around 0 prevents directional bias in convolution filters.", "why-how", "intermediate"),
      ("What is CutMix augmentation?", "Cuts a patch from one image and pastes it into another image, proportionally mixing labels.", "Combines the benefits of Cutout and Mixup, preventing local patch over-reliance.", "external-viva", "advanced"),
      ("Why is rotation limited to 15 degrees on CIFAR-10?", "Large rotations tilt horizon lines unrealistically and blur low-resolution 32x32 pixels.", "Subtle 15-degree rotations preserve object recognizability without excessive interpolation blur.", "debugging", "intermediate"),
      ("How to use tf.keras.layers.RandomFlip inside Sequential model?", "Add layers.RandomFlip('horizontal') directly as the first layer in the model.", "Executes on GPU alongside model tensors, eliminating CPU bottleneck.", "code-specific", "intermediate"),
      ("What is validation loss divergence in unaugmented CIFAR CNN?", "Val loss drops until epoch 8, then starts rising while training loss keeps falling.", "Clear empirical signature of model memorizing training set noise.", "debugging", "basic"),
      ("What optimizer works best on CIFAR-10 with augmentation?", "SGD with Momentum (0.9) and learning rate decay, or AdamW.", "SGD with momentum often finds flatter, more generalizable minima on CIFAR-10.", "external-viva", "intermediate"),
      ("What is Mosaic augmentation in YOLO?", "Combines 4 training images into 1 composite frame with random center crop.", "Enables detection of objects at multiple scales and across different contextual backgrounds.", "external-viva", "advanced"),
      ("Why does CIFAR-10 require more convolution filters than MNIST?", "Color images with 3 channels and complex natural backgrounds require higher representational capacity.", "Requires 32, 64, 128+ filters to capture diverse textures, colors, and shapes.", "why-how", "basic"),
      ("What accuracy can a modern ResNet achieve on CIFAR-10 with augmentation?", "Over 95% test accuracy with data augmentation and residual connections.", "Standard unaugmented basic CNNs typically stall around 75-80%.", "external-viva", "intermediate")
    ]
  elif eid == 11:
    qs = [
      ("Input dimensions of original LeNet-5 (1998)?", "32 x 32 grayscale single-channel image.", "Allowed 28x28 digits to appear centered with border margins for feature extraction.", "conceptual", "basic"),
      ("Activation function originally used in LeNet-5?", "Scaled Hyperbolic Tangent (Tanh).", "Tanh was standard in 1998 before ReLU was popularized by AlexNet in 2012.", "conceptual", "basic"),
      ("Subsampling operation in S2 and S4 of LeNet-5?", "2x2 Average Pooling with trainable coefficient and bias per map.", "Subsampling averaged 4 pixels, multiplied by a trainable weight, and added bias.", "conceptual", "intermediate"),
      ("Number of feature maps produced by C1?", "6 feature maps of size 28x28.", "Applies six 5x5 filters to the 32x32 input: (32 - 5 + 1) = 28x28.", "code-specific", "basic"),
      ("Primary commercial deployment of LeNet-5 in 1990s?", "Reading handwritten cheque amounts across NCR bank ATMs and US postal sorting centers.", "Processed millions of handwritten cheques daily for major commercial banks.", "external-viva", "basic"),
      ("Filters in C3 and output spatial size?", "16 filters of size 5x5, yielding 10x10 feature maps.", "Input S2 is 14x14; convolution with 5x5 yields (14 - 5 + 1) = 10x10 maps.", "code-specific", "intermediate"),
      ("Total trainable parameters in LeNet-5?", "Approximately 60,000 parameters.", "Extremely compact by modern standards, enabling execution on 1990s microprocessors.", "code-specific", "basic"),
      ("How were output logits calculated in original LeNet-5?", "Euclidean Radial Basis Function (RBF) units computing distance to target bitmap prototypes.", "Each class corresponded to a fixed 7x12 ASCII bitmap pattern.", "conceptual", "advanced"),
      ("Why was C5 termed convolution instead of dense?", "Applying 120 filters of size 5x5 to a 5x5 input reduces spatial dimensions to 1x1.", "Mathematically identical to a dense layer of 120 units, but formulated as convolution.", "why-how", "advanced"),
      ("Modern modifications to LeNet-5 for MNIST today?", "Use ReLU activations, Max Pooling, and Softmax output with cross-entropy loss.", "ReLU trains faster without vanishing gradients; MaxPool gives sharper features.", "code-specific", "intermediate"),
      ("Why did C3 not connect to all S2 feature maps originally?", "To keep parameter count low and break architectural symmetry, forcing diverse feature specialization.", "Filters in C3 connected to non-contiguous subsets of 3, 4, or all 6 S2 maps.", "external-viva", "advanced"),
      ("Number of units in layer F6 of LeNet-5?", "84 hidden units.", "Chosen to match the 7x12 dimensions of the ASCII character bitmaps in the output layer.", "code-specific", "intermediate"),
      ("Why was LeNet-5 revolutionary for AI history?", "Proved that end-to-end backpropagation through convolution and pooling could solve real-world computer vision.", "Laid the foundation for all modern deep learning convolutional architectures.", "external-viva", "basic"),
      ("How to adapt LeNet-5 for 28x28 MNIST in Keras?", "Use padding='same' on C1 or add ZeroPadding2D((2,2)) at the start.", "Padding restores the 32x32 input size expected by LeNet-5 layers.", "code-specific", "basic"),
      ("Parameters in C1 layer of LeNet-5?", "(5 * 5 * 1 + 1) * 6 = 156 parameters.", "6 filters, each having 25 weights plus 1 bias term.", "code-specific", "intermediate"),
      ("Why did average pooling fall out of favor compared to max pooling?", "Max pooling preserves sharp high-contrast features and edges better than averaging.", "Average pooling smooths out edge gradients, reducing feature distinctiveness.", "why-how", "intermediate"),
      ("Can LeNet-5 be used on Fashion MNIST?", "Yes, it achieves ~88-90% accuracy on Fashion MNIST clothing categories.", "Demonstrates LeNet's versatility beyond simple numeric digits.", "code-specific", "basic"),
      ("What hardware ran LeNet-5 in 1998?", "DSP (Digital Signal Processors) and early Intel Pentium processors at ~200 MHz.", "Small parameter count allowed real-time ATM cheque scanning without GPUs.", "external-viva", "basic"),
      ("How does LeNet-5 compare to modern AlexNet (2012)?", "LeNet-5 has 60k parameters; AlexNet has 60 million parameters (1,000x larger), with ReLU, Dropout, and GPU training.", "AlexNet scaled LeNet principles to millions of parameters and 1,000 ImageNet classes.", "external-viva", "intermediate"),
      ("Why was weight decay used in LeNet-5?", "To constrain weight growth and prevent saturation of Tanh activations.", "LeCun used L2 weight decay to maintain smooth gradients across layers.", "why-how", "intermediate")
    ]
  elif eid == 12:
    qs = [
      ("Architectural breakthrough of VGGNet (2014)?", "Replacing large convolution filters with deep stacks of small 3x3 convolution filters.", "Showed that network depth with simple uniform 3x3 filters achieves state-of-the-art vision accuracy.", "conceptual", "basic"),
      ("Effective receptive field of two stacked 3x3 convs?", "5 x 5 spatial receptive field.", "Two 3x3 layers cover 5x5 input pixels while saving parameters and adding non-linearity.", "conceptual", "basic"),
      ("Effective receptive field of three stacked 3x3 convs?", "7 x 7 spatial receptive field.", "Three 3x3 layers cover 7x7 input pixels with 3 non-linear ReLUs instead of 1.", "conceptual", "basic"),
      ("Parameter reduction of three 3x3 convs vs one 7x7 conv?", "Three 3x3 layers use 27 C^2 weights vs 49 C^2 for one 7x7 layer (45% reduction).", "3 * (3^2 * C^2) = 27 C^2 vs 7^2 * C^2 = 49 C^2 parameters.", "conceptual", "intermediate"),
      ("Layers in VGG-16 vs VGG-19?", "VGG-16: 13 conv + 3 dense = 16 layers; VGG-19: 16 conv + 3 dense = 19 layers.", "VGG-19 adds 3 additional 3x3 convolution layers in Blocks 3, 4, and 5.", "code-specific", "basic"),
      ("Why freeze base layers in Transfer Learning?", "To preserve pre-trained general ImageNet features and avoid destroying learned weights.", "Prevents random gradients from the uninitialized classification head from corrupting the backbone.", "why-how", "basic"),
      ("Where are 75% of VGG-16 parameters located?", "In the first Dense(4096) layer connecting 7x7x512 = 25,088 flattened inputs (~102 million weights).", "Flattening the high-dimensional feature map creates an enormous dense weight matrix.", "code-specific", "advanced"),
      ("What is 'fine-tuning' in Transfer Learning?", "Unfreezing top conv blocks and training them with a very small learning rate (e.g. 1e-5).", "Allows high-level task-specific features to adapt subtly to the target dataset.", "conceptual", "intermediate"),
      ("Input dimensions expected by pre-trained VGG-16?", "224 x 224 x 3 RGB images.", "Images must be resized and preprocessed with ImageNet channel mean subtraction.", "code-specific", "basic"),
      ("Why replace Dense(4096) with Global Average Pooling (GAP)?", "GAP averages each 7x7 feature map into a single scalar, reducing parameters from 102M to zero.", "Radically reduces model size and acts as a powerful structural regularizer against overfitting.", "why-how", "advanced"),
      ("What is ImageNet dataset?", "1.4 million images across 1,000 diverse categories used for pre-training visual backbones.", "Large-scale visual database curated by Fei-Fei Li's group at Stanford.", "external-viva", "basic"),
      ("What is include_top=False in keras.applications.VGG16?", "Excludes the final 3 fully connected dense layers, keeping only the convolutional feature extractor.", "Allows attaching a custom classification head suited to your specific number of classes.", "code-specific", "basic"),
      ("How many max pooling layers in VGG-16?", "5 MaxPool layers of size 2x2 with stride 2.", "Each pooling layer divides spatial resolution by half: 224 -> 112 -> 56 -> 28 -> 14 -> 7.", "code-specific", "intermediate"),
      ("What causes slow inference speed in VGG-16?", "138 million parameters and heavy memory bandwidth needed for 7x7x512 tensor activations.", "High floating-point operations (FLOPs) make VGG heavy for mobile edge devices.", "debugging", "intermediate"),
      ("How does VGG handle multiple scales during testing?", "Rescales test image to multiple dimensions, averages predictions across scales (multi-crop evaluation).", "Improves classification robustness on objects of varying sizes.", "external-viva", "advanced"),
      ("Why was VGG-16 preferred over GoogLeNet despite being larger?", "Simplicity and uniformity of design made VGG easy to adapt as a universal feature extractor.", "GoogLeNet was deeper and faster but had complex parallel Inception branches.", "external-viva", "intermediate"),
      ("What is preprocess_input in keras.applications.vgg16?", "Converts RGB to BGR and zero-centers each color channel with respect to ImageNet means.", "Ensures input pixel format matches exactly how VGG was pre-trained.", "code-specific", "intermediate"),
      ("Why use learning rate 1e-5 during fine-tuning instead of 1e-3?", "A large learning rate would overwrite and destroy pre-trained feature weights.", "A tiny learning rate ensures conservative parameter fine-tuning.", "debugging", "intermediate"),
      ("Difference between Feature Extraction and Fine-Tuning?", "Feature extraction trains only the new dense head; fine-tuning trains top conv layers too.", "Feature extraction is faster and avoids overfitting on very small datasets.", "conceptual", "intermediate"),
      ("Total file size of standard VGG-16 model weights on disk?", "Over 528 MB (in float32 format).", "Large size due to the 102 million dense layer parameters.", "code-specific", "basic")
    ]
  elif eid == 13:
    qs = [
      ("Mathematical recurrence for SimpleRNN hidden state?", "h_t = tanh(W_xh * x_t + W_hh * h_{t-1} + b_h).", "Non-linear combination of current input vector x_t and preceding hidden state h_{t-1}.", "conceptual", "basic"),
      ("Purpose of Embedding layer in sentiment analysis?", "Maps discrete sparse word IDs into dense continuous semantic vectors of fixed dimension.", "Captures semantic relationships (e.g. king - man + woman = queen) in a low-dimensional space.", "conceptual", "basic"),
      ("Why pad movie review sequences with maxlen=500?", "Ensures uniform tensor dimensions across variable-length review sentences.", "Enables efficient batched matrix multiplications on GPU.", "code-specific", "basic"),
      ("Why SimpleRNN fails on long movie reviews (>100 tokens)?", "Vanishing gradient problem during BPTT prevents error signals from reaching early words.", "Repeated matrix multiplications of W_hh over time decay gradients to zero.", "conceptual", "intermediate"),
      ("Output layer for binary sentiment classification?", "Dense(1, activation='sigmoid') paired with binary_crossentropy loss.", "Produces a single scalar probability between 0 (negative) and 1 (positive).", "code-specific", "basic"),
      ("What does 'unrolling through time' mean for RNN?", "Visualizing the recurrent loop as a sequence of feedforward stages across time steps t=1 to T.", "Illustrates how weights are shared across every token position in time.", "conceptual", "basic"),
      ("What is gradient clipping in RNN training?", "Capping gradient vector norm to a threshold (e.g. clipnorm=1.0) to prevent exploding gradients.", "Prevents catastrophic parameter corruption when gradients explode across long sequences.", "debugging", "intermediate"),
      ("Parameters in Embedding(10000, 32)?", "10,000 * 32 = 320,000 parameters.", "Each of the 10,000 vocabulary words has a learned 32-dimensional embedding vector.", "code-specific", "intermediate"),
      ("return_sequences=True vs False in Keras SimpleRNN?", "True returns hidden state at every time step (shape [B, T, U]); False returns only final state (shape [B, U]).", "Use True when stacking multiple recurrent layers; False before dense classification head.", "code-specific", "basic"),
      ("Why Tanh activation in SimpleRNN recurrent cell?", "Bounds activations between [-1, +1], preventing exponential explosion over long unrolled steps.", "Unbound activations like ReLU cause activations to grow exponentially over time.", "why-how", "intermediate"),
      ("What is Backpropagation Through Time (BPTT)?", "Applying backpropagation along the unrolled temporal computational graph from t=T back to t=1.", "Calculates gradients with respect to shared recurrent weights W_hh summed across time steps.", "conceptual", "intermediate"),
      ("What is Truncated BPTT?", "Forward pass through whole sequence, but backward pass terminates after k time steps.", "Limits memory usage and prevents vanishing gradients on very long documents.", "external-viva", "advanced"),
      ("What is an Out-of-Vocabulary (OOV) token?", "A special token (e.g. <UNK>) assigned to words that do not exist in the training vocabulary.", "Allows the model to handle unseen words gracefully without crashing.", "code-specific", "basic"),
      ("Pre-padding vs Post-padding in sequences?", "Pre-padding places zeros at the beginning; Post-padding places zeros at the end.", "Pre-padding is often preferred in RNNs so the final hidden state is not dominated by trailing zeros.", "why-how", "advanced"),
      ("What is the IMDB Movie Review dataset?", "50,000 highly polarized positive and negative movie reviews from the Internet Movie Database.", "25,000 training and 25,000 testing reviews curated by Andrew Maas.", "code-specific", "basic"),
      ("Can word embeddings be pre-trained?", "Yes, using Word2Vec, GloVe, or FastText trained on billions of Wikipedia/crawl tokens.", "Provides rich semantic representations even before fine-tuning on movie reviews.", "external-viva", "intermediate"),
      ("Difference between bag-of-words and RNN?", "Bag-of-words ignores word order; RNN explicitly processes temporal sequential syntax.", "RNN recognizes that 'not bad' means good, whereas bag-of-words sees 'bad' as negative.", "why-how", "basic"),
      ("Why does SimpleRNN underperform LSTM on IMDB?", "SimpleRNN achieves ~80-83% accuracy; LSTM reaches 88%+ due to cell state memory.", "SimpleRNN forgets earlier paragraph context when reaching the end of a long review.", "code-specific", "intermediate"),
      ("How many gate mechanisms in SimpleRNN?", "Zero gates; SimpleRNN is a single unguarded recurrent equation with no gating.", "Lack of gates makes it vulnerable to vanishing and exploding gradients.", "conceptual", "basic"),
      ("How to inspect individual word embeddings in Python?", "Access model.layers[0].get_weights()[0] to inspect the (10000, 32) embedding matrix.", "Can calculate cosine similarity between word vectors to verify semantic clustering.", "code-specific", "intermediate")
    ]
  elif eid == 14:
    qs = [
      ("Core advantage of Bidirectional LSTM over unidirectional RNN?", "Processes text in both directions (past-to-future and future-to-past), capturing preceding and succeeding context.", "Concatenates forward and backward hidden states at each position for complete context.", "conceptual", "basic"),
      ("Three gating mechanisms in an LSTM cell?", "Forget Gate (f_t), Input Gate (i_t), and Output Gate (o_t).", "Regulate what information is discarded, what new info is stored, and what is output.", "conceptual", "basic"),
      ("Purpose of the Forget Gate f_t = sigmoid(W_f * [h_{t-1}, x_t] + b_f)?", "Decides what proportion (0.0 to 1.0) of previous cell state C_{t-1} to retain.", "Multiplies C_{t-1} element-wise; 0 means completely erase, 1 means completely retain.", "conceptual", "intermediate"),
      ("What is the Cell State C_t ('constant error carousel')?", "An uninterrupted additive information highway where gradients flow without multiplicative decay.", "Enables error signals to backpropagate across hundreds of time steps without vanishing.", "conceptual", "intermediate"),
      ("Output shape of Bidirectional(LSTM(64)) with return_sequences=False?", "(None, 128) - 64 forward units concatenated with 64 backward units.", "Combines the final forward hidden state and initial backward hidden state.", "code-specific", "basic"),
      ("How does BiLSTM resolve 'The movie was not good at all'?", "Forward pass carries 'not'; backward pass carries 'at all', properly qualifying 'good'.", "Both directional contexts fuse together to correctly classify the sentence as negative.", "why-how", "intermediate"),
      ("Why are LSTM gates strictly activated with Sigmoid?", "Sigmoid squashes outputs to [0, 1], acting as continuous open/close multiplier valves.", "A value of 0 closes the gate completely; 1 opens the gate fully.", "why-how", "basic"),
      ("Parameter count of BiLSTM vs SimpleRNN?", "An LSTM cell has 4x parameters of SimpleRNN; Bidirectional doubles that to 8x.", "Each LSTM cell has 4 internal weight matrices; Bidirectional runs two complete LSTMs.", "code-specific", "advanced"),
      ("What is recurrent_dropout in Keras LSTM?", "Applies a constant dropout mask across recurrent state connections over time steps.", "Prevents overfitting on recurrent transitions without corrupting sequence temporal dynamics.", "code-specific", "intermediate"),
      ("Why can't BiLSTM be used for live streaming speech transcription?", "Backward LSTM requires the entire utterance to finish before computing backward states.", "Introduces unacceptable latency waiting for future words that have not yet been spoken.", "why-how", "advanced"),
      ("Who invented LSTM and when?", "Sepp Hochreiter and Jürgen Schmidhuber in 1997.", "Designed specifically to overcome the vanishing gradient problem in recurrent networks.", "external-viva", "basic"),
      ("What is a GRU (Gated Recurrent Unit)?", "A simplified LSTM variant with only 2 gates (Reset and Update) and no separate cell state.", "Cho et al. (2014) showed GRU runs faster with fewer parameters while matching LSTM accuracy.", "external-viva", "intermediate"),
      ("Mathematical formula for cell state update C_t?", "C_t = f_t * C_{t-1} + i_t * C_tilde_t.", "Adds candidate content scaled by input gate i_t to preserved old memory scaled by forget gate f_t.", "conceptual", "advanced"),
      ("Candidate memory cell C_tilde_t activation?", "Uses Tanh activation to bound candidate values between -1 and +1.", "Ensures new information added to the cell state has bounded magnitude.", "conceptual", "intermediate"),
      ("Output hidden state h_t formula in LSTM?", "h_t = o_t * tanh(C_t).", "Output gate filters the squashed cell state memory to produce the visible output.", "conceptual", "intermediate"),
      ("Why did BiLSTM achieve ~89% on IMDB vs 80% for SimpleRNN?", "Captures subtle negations and long-range semantic dependencies without forgetting.", "Dual-direction analysis ensures that context following an ambiguous word is fully utilized.", "code-specific", "basic"),
      ("Can you stack multiple Bidirectional LSTM layers in Keras?", "Yes, set return_sequences=True on all intermediate layers.", "e.g. Bidirectional(LSTM(64, return_sequences=True)) -> Bidirectional(LSTM(32)).", "code-specific", "intermediate"),
      ("What is peephole connection in LSTM (Gers & Schmidhuber)?", "Allows gate layers to inspect the current cell state C directly.", "Provides gates with direct visibility into internal memory levels.", "external-viva", "advanced"),
      ("Difference between LSTM and Transformer for NLP?", "LSTMs process tokens sequentially; Transformers process all tokens in parallel using Self-Attention.", "Transformers eliminate sequential bottlenecks and scale better on large language corpora.", "external-viva", "intermediate"),
      ("How to prevent overfitting in Bidirectional LSTM on small text datasets?", "Add spatial dropout on embeddings, recurrent_dropout, L2 weight decay, and early stopping.", "Reduces overparameterization when training vocabulary size is large.", "debugging", "intermediate")
    ]
  elif eid == 15:
    qs = [
      ("Game-theoretic formulation of GANs (Goodfellow 2014)?", "Two-player zero-sum minimax game: min_G max_D V(D, G) between Generator G and Discriminator D.", "Generator tries to fool Discriminator; Discriminator tries to distinguish real from synthetic images.", "conceptual", "basic"),
      ("Input to Generator in standard DCGAN?", "Random latent noise vector z sampled from prior distribution (e.g. N(0, I) or U(-1, 1)).", "Acts as the seed that the generator transforms into high-dimensional image pixels.", "conceptual", "basic"),
      ("Role of Conv2DTranspose in Generator?", "Upsampling low-resolution spatial feature maps into high-resolution images (7x7 -> 14x14 -> 28x28).", "Learnable transposed convolution expands spatial dimensions smoothly.", "code-specific", "basic"),
      ("Why LeakyReLU in Discriminator?", "Provides non-zero gradient for negative values, preventing dead neurons and maintaining training gradients for G.", "Ensures generator receives informative gradient feedback even when discriminator rejects a sample.", "why-how", "intermediate"),
      ("Nash Equilibrium value of D(x) for all inputs?", "D(x) = 0.5 (Discriminator is completely unable to distinguish real from generated images).", "Indicates generated distribution p_g matches real data distribution p_data perfectly.", "conceptual", "intermediate"),
      ("What is Mode Collapse in GANs?", "Generator produces only a narrow set of similar images (e.g. only digit '1') that fools the discriminator.", "Lacks sample diversity because G discovers one pattern that easily tricks D and ignores other modes.", "debugging", "intermediate"),
      ("Why train G with max log(D) instead of min log(1-D) early on?", "Avoids vanishing gradients early in training when D easily detects fakes.", "log(1 - D) saturates early on; maximizing log(D) provides much larger gradients.", "why-how", "advanced"),
      ("Image preprocessing when Generator uses Tanh output?", "Real images must be normalized to [-1.0, 1.0] via (X - 127.5) / 127.5.", "Matches the output range of Tanh so real and generated distributions can be compared fairly.", "code-specific", "basic"),
      ("Why omit Batch Normalization from G output and D input?", "Directly normalizing raw pixel outputs causes color distortion and sample oscillation.", "Radford et al. (DCGAN 2015) established this design rule for stable image generation.", "why-how", "advanced"),
      ("Metric to evaluate GAN image fidelity and diversity?", "Fréchet Inception Distance (FID) or Inception Score (IS).", "FID calculates Wasserstein-2 distance between Gaussian feature representations in InceptionV3.", "external-viva", "advanced"),
      ("What is a Conditional GAN (cGAN)?", "Injects class label y into both Generator and Discriminator to control generated digit class.", "Allows prompting the model to generate a specific digit (e.g. 'draw an 8').", "conceptual", "intermediate"),
      ("What is Wasserstein GAN (WGAN)?", "Replaces JS-Divergence with Earth Mover's Distance, eliminating mode collapse and vanishing gradients.", "Uses a Critic with 1-Lipschitz continuity enforced via weight clipping or Gradient Penalty.", "external-viva", "advanced"),
      ("Loss curve behavior during healthy GAN training?", "D loss and G loss oscillate dynamically around stable values without either reaching zero.", "If D loss drops to 0, it overwhelms G; if G loss drops to 0, D is failing.", "debugging", "intermediate"),
      ("What is Label Smoothing in GAN Discriminator?", "Setting real targets to 0.9 instead of 1.0 to prevent overconfident discriminator predictions.", "Prevents discriminator from driving logits to extremes, keeping gradients healthy for G.", "external-viva", "intermediate"),
      ("Difference between GAN and Autoencoder?", "Autoencoder reconstructs specific inputs via latent bottleneck; GAN synthesizes novel samples from random noise.", "Autoencoders optimize explicit reconstruction loss; GANs optimize adversarial game loss.", "conceptual", "basic"),
      ("Why does Generator use batch size normalization?", "Batch Normalization stabilizes deep generators by preventing all samples from collapsing to a single point.", "Crucial for preventing internal covariate shift during transposed convolutions.", "why-how", "intermediate"),
      ("Checkerboard artifacts in GAN images cause?", "Uneven overlap in Conv2DTranspose when kernel size is not divisible by stride.", "Using kernel size 4 with stride 2 or bilinear upsampling prevents checkerboard artifacts.", "debugging", "advanced"),
      ("What is Latent Space Interpolation in GANs?", "Linear blending between two latent vectors z1 and z2: z = alpha*z1 + (1-alpha)*z2.", "Decoded images smoothly morph from one digit into another, proving continuous manifold learning.", "conceptual", "intermediate"),
      ("Can GANs generate color images?", "Yes, output Conv2DTranspose has 3 filters with shape (H, W, 3) for RGB channels.", "DCGAN was famously demonstrated on CelebA face datasets and CIFAR-10.", "code-specific", "basic"),
      ("What is StyleGAN?", "Karras et al. architecture using adaptive instance normalization (AdaIN) to control visual styles at multiple scales.", "State-of-the-art for photorealistic human face generation.", "external-viva", "advanced")
    ]
  elif eid == 16:
    qs = [
      ("Foundational architecture of an Autoencoder?", "Encoder compresses input x into a low-dimensional latent bottleneck z; Decoder reconstructs x_hat from z.", "Trained in an unsupervised / self-supervised manner to minimize reconstruction difference.", "conceptual", "basic"),
      ("Input and target pair in Denoising Autoencoder?", "Input is artificially corrupted with noise (x_noisy); target for loss is clean original image (x_clean).", "Forces the model to strip noise and discover the underlying clean manifold.", "conceptual", "basic"),
      ("Why Denoising Autoencoder doesn't learn identity f(x)=x?", "Noisy inputs do not match clean targets, so an identity mapping would yield high loss.", "The network must actively suppress noise components to match clean targets.", "why-how", "intermediate"),
      ("Standard loss function for image reconstruction?", "Mean Squared Error (MSE) or Binary Cross-Entropy.", "Measures pixel-by-pixel difference between clean ground truth and reconstructed output.", "conceptual", "basic"),
      ("What is the latent bottleneck and why is it crucial?", "Middle compressed layer with fewer dimensions than input; forces model to drop noise and retain key features.", "Without a bottleneck, an overcomplete autoencoder could simply memorize pixels without learning.", "conceptual", "intermediate"),
      ("Downsampling and upsampling layers in Conv Autoencoder?", "Conv2D with stride=2 (downsampling) and Conv2DTranspose with stride=2 (upsampling).", "Replaces pooling with strided convolutions for learnable spatial resizing.", "code-specific", "basic"),
      ("Decibel (dB) metric for image denoising quality?", "Peak Signal-to-Noise Ratio (PSNR).", "PSNR = 10 * log10(MAX_I^2 / MSE). Higher dB values indicate cleaner reconstructions.", "code-specific", "basic"),
      ("Why apply np.clip(noisy, 0.0, 1.0) after adding Gaussian noise?", "Prevents invalid pixel values below 0.0 or above 1.0 that violate image boundaries.", "Adding Gaussian noise pushes extreme pixels outside valid floating-point visual ranges.", "debugging", "basic"),
      ("How to use Denoising Autoencoder for industrial anomaly detection?", "Normal defect-free items reconstruct with low MSE; defective items reconstruct poorly with high residual error.", "The autoencoder only knows the manifold of healthy items, failing to reconstruct anomalies.", "external-viva", "advanced"),
      ("Difference between standard Autoencoder and VAE?", "VAE maps inputs to probability distribution parameters (mean, variance) and uses KL Divergence for generative sampling.", "Standard autoencoders have unconstrained latent spaces that may contain discontinuous gaps.", "external-viva", "advanced"),
      ("Types of noise used in Denoising Autoencoders?", "Additive Gaussian noise, Salt-and-Pepper noise, and Random Masking / Cutout noise.", "Exposes the model to diverse corruption modes matching real camera sensor defects.", "conceptual", "basic"),
      ("Why is Sigmoid used on final Conv2DTranspose layer?", "Squashes reconstructed pixel values strictly into [0.0, 1.0] to match normalized image scale.", "Ensures reconstructed outputs have valid visual pixel range.", "why-how", "basic"),
      ("What is SSIM (Structural Similarity Index)?", "Perceptual metric measuring luminance, contrast, and structural degradation between two images.", "Aligns better with human visual perception than simple mean squared error.", "external-viva", "intermediate"),
      ("Can autoencoders be used for dimensionality reduction like PCA?", "Yes; a linear autoencoder with MSE loss learns the exact same subspace as Principal Component Analysis.", "Non-linear autoencoders generalize PCA to complex non-linear manifolds.", "external-viva", "advanced"),
      ("What is a Sparse Autoencoder?", "Adds an L1 or KL penalty on hidden activations to encourage only a small percentage of neurons to fire.", "Learns overcomplete sparse dictionary representations.", "external-viva", "advanced"),
      ("Why do denoised images sometimes appear slightly blurry?", "MSE loss averages all possible plausible reconstructions, resulting in smooth median pixels.", "Adding adversarial loss (like in GANs) or perceptual VGG loss sharpens edge textures.", "why-how", "advanced"),
      ("How many filters in decoder relative to encoder?", "Typically symmetric: Encoder 32 -> 64; Decoder 64 -> 32 -> 1.", "Symmetric mirror architecture balances information compression with reconstruction capacity.", "code-specific", "intermediate"),
      ("What is an Undercomplete vs Overcomplete Autoencoder?", "Undercomplete has latent dimension < input dimension; Overcomplete has latent dimension > input dimension.", "Overcomplete autoencoders require sparsity or denoising penalties to prevent trivial identity learning.", "conceptual", "intermediate"),
      ("How to plot original, noisy, and denoised side-by-side?", "Use plt.subplots(1, 3) and display clean, noisy, and model.predict(noisy) with imshow.", "Allows immediate visual evaluation of noise suppression and edge preservation.", "code-specific", "basic"),
      ("Can Autoencoders remove watermarks and text from images?", "Yes, by training on image pairs where input has synthetic text overlays and target is clean.", "Known as image inpainting or document restoration autoencoders.", "external-viva", "intermediate")
    ]
  for q, s, d, cat, diff in qs:
    add_v(eid, q, s, d, cat, diff)

print(f"Total Viva Questions Generated: {len(all_viva)}")

# Output to frontend/src/data/vivaData.ts
ts_code = """import { VivaQuestion } from '../types';

export const VIVA_QUESTIONS: VivaQuestion[] = [
"""

for i, v in enumerate(all_viva):
    ts_code += f"  {json.dumps(v, indent=2)}" + (",\n" if i < len(all_viva) - 1 else "\n")

ts_code += """];

export function getVivaByExperiment(experimentId: number): VivaQuestion[] {
  return VIVA_QUESTIONS.filter(q => q.experimentId === experimentId);
}
"""

with open('frontend/src/data/vivaData.ts', 'w', encoding='utf-8') as f:
    f.write(ts_code)

print("Successfully written 320 viva questions to frontend/src/data/vivaData.ts!")

