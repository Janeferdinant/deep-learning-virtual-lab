import json
import os

# Build full 320 questions (20 per experiment across 16 experiments)
# Let's write the complete generator to output frontend/src/data/vivaData.ts

with open('tools/make_complete_viva.py', 'w', encoding='utf-8') as f:
    f.write('''# Comprehensive Viva Generator
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

# We will populate each experiment with 20 verified questions
viva_list = []
''')

print("Created placeholder")

