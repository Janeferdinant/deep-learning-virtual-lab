import json

experiments_meta = [
  (1, "Single-Unit Perceptron", "placement.csv & Logic Gates"),
  (2, "Artificial Neural Network and Backpropagation", "Iris & Ionosphere"),
  (3, "Deep Feed-Forward ANN", "Hidden layers >= 4"),
  (4, "Image Classification using Deep Feedforward NN", "MNIST & CIFAR-10"),
  (5, "CNN with Two Convolution Layers", "MNIST & CIFAR-10"),
  (6, "CNN with Four or More Convolution Layers", "CPU vs GPU Benchmarks"),
  (7, "Padding and Batch Normalization", "SAME vs VALID & BN"),
  (8, "Regularization and Dropout", "Base, L1, L2, Dropout, L2+Dropout"),
  (9, "Data Augmentation", "Rotation, zoom, flip, shift, shear, brightness"),
  (10, "CNN with Data Augmentation", "CIFAR-10 Generalization"),
  (11, "LeNet-5 Architecture", "Yann LeCun 1998, Cheque Digit Recognition"),
  (12, "VGG-16 and VGG-19 CNN Architectures", "Transfer Learning & Deep 3x3 Stacks"),
  (13, "Recurrent Neural Networks (RNN)", "IMDB Movie Sentiment Analysis"),
  (14, "Bidirectional LSTM", "Forward & Backward Context Flow"),
  (15, "Generative Adversarial Networks (GANs)", "Minimax Game, Generator & Discriminator"),
  (16, "Autoencoders for Image Denoising", "Encoder-Decoder Latent Bottleneck & MSE Loss")
]

# Write complete quiz definitions for 5-16
print("Writing build_quizzes.py...")

