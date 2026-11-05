import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Eye,
  Shirt,
  MessageSquare,
  Layers,
  Sliders,
  Cpu,
  PenTool,
  CheckCircle2
} from 'lucide-react';

// Applications
import { DigitRecognizerApp } from './DigitRecognizerApp';
import { FashionClassifierApp } from './FashionClassifierApp';
import { SentimentAnalyzerApp } from './SentimentAnalyzerApp';
import { ImageDenoisingApp } from './ImageDenoisingApp';
import { AugmentationStudioApp } from './AugmentationStudioApp';
import { GanGeneratorApp } from './GanGeneratorApp';
import { PerceptronPlaygroundApp } from './PerceptronPlaygroundApp';
import { FeatureMapExplorerApp } from './FeatureMapExplorerApp';

export const AppGallery: React.FC = () => {
  const [activeAppId, setActiveAppId] = useState<number | null>(null);

  const apps = [
    {
      id: 1,
      name: 'Handwritten Digit Recognition',
      desc: 'Draw digits on an interactive touch canvas and watch a deep neural network classify them in real-time.',
      icon: PenTool,
      architecture: 'Conv2D ➔ MaxPool ➔ Flatten ➔ Dense (Softmax)',
      weekLink: 4,
      tag: 'Computer Vision',
      color: 'from-cyan-500/20 to-blue-500/5',
      borderColor: 'border-cyan-500/40',
    },
    {
      id: 2,
      name: 'Fashion Product Classifier',
      desc: 'Identify apparel products across 10 Zalando Fashion-MNIST categories with multi-class softmax probabilities.',
      icon: Shirt,
      architecture: '4-Layer Deep Convolutional Network',
      weekLink: 6,
      tag: 'E-Commerce AI',
      color: 'from-indigo-500/20 to-purple-500/5',
      borderColor: 'border-indigo-500/40',
    },
    {
      id: 3,
      name: 'Movie Review Sentiment Analyzer',
      desc: 'Predict Positive/Negative polarity on custom user text with attention attribution keyword heatmaps.',
      icon: MessageSquare,
      architecture: 'Bidirectional LSTM + Word Embeddings',
      weekLink: 14,
      tag: 'Natural Language Processing',
      color: 'from-emerald-500/20 to-teal-500/5',
      borderColor: 'border-emerald-500/40',
    },
    {
      id: 4,
      name: 'Image Denoising Studio',
      desc: 'Corrupt images with Gaussian noise and reconstruct clean signals via an Autoencoder bottleneck with PSNR metrics.',
      icon: Sparkles,
      architecture: 'Convolutional Autoencoder (Encoder-Decoder)',
      weekLink: 16,
      tag: 'Restoration & Healthcare',
      color: 'from-amber-500/20 to-yellow-500/5',
      borderColor: 'border-amber-500/40',
    },
    {
      id: 5,
      name: 'Data Augmentation Studio',
      desc: 'Interactive rotation, scaling, shifting, flipping, and brightness transforms with automated multi-sample batch synthesis.',
      icon: Sliders,
      architecture: 'tf.keras.preprocessing.image.ImageDataGenerator',
      weekLink: 9,
      tag: 'Data Engineering',
      color: 'from-rose-500/20 to-pink-500/5',
      borderColor: 'border-rose-500/40',
    },
    {
      id: 6,
      name: 'GAN Synthetic Image Generator',
      desc: 'Sample and interpolate across 100-dimensional latent noise manifolds to generate synthetic digits via Minimax optimization.',
      icon: Cpu,
      architecture: 'Generative Adversarial Network (Generator-Discriminator)',
      weekLink: 15,
      tag: 'Generative AI',
      color: 'from-purple-500/20 to-indigo-500/5',
      borderColor: 'border-purple-500/40',
    },
    {
      id: 7,
      name: 'Perceptron 2D Decision Playground',
      desc: 'Plot custom binary classification points on a 2D plane and watch the Rosenblatt learning rule train the decision line.',
      icon: Layers,
      architecture: 'Single-Unit Perceptron (Linear Threshold Unit)',
      weekLink: 1,
      tag: 'Foundational ML',
      color: 'from-blue-500/20 to-cyan-500/5',
      borderColor: 'border-blue-500/40',
    },
    {
      id: 8,
      name: 'CNN Feature-Map Explorer',
      desc: 'Deconstruct internal convolutional filters layer-by-layer: edges, corners, textures, parts, and class signatures.',
      icon: Eye,
      architecture: 'Hierarchical Deep Convolutional Neural Network',
      weekLink: 5,
      tag: 'Interpretability & XAI',
      color: 'from-teal-500/20 to-emerald-500/5',
      borderColor: 'border-teal-500/40',
    },
  ];

  const renderActiveApp = () => {
    switch (activeAppId) {
      case 1:
        return <DigitRecognizerApp />;
      case 2:
        return <FashionClassifierApp />;
      case 3:
        return <SentimentAnalyzerApp />;
      case 4:
        return <ImageDenoisingApp />;
      case 5:
        return <AugmentationStudioApp />;
      case 6:
        return <GanGeneratorApp />;
      case 7:
        return <PerceptronPlaygroundApp />;
      case 8:
        return <FeatureMapExplorerApp />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Gallery Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden border border-cyan-500/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400">
                SECTION 6 • REAL-TIME APPLICATIONS
              </span>
              <span className="text-xs font-mono text-slate-400">8 Standalone Interactive Systems</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
              Deep Learning Real-Time Application Gallery
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Explore 8 fully-functional applications spanning computer vision, natural language processing, generative AI, and model interpretability. Each application connects directly to deep neural network inference engines.
            </p>
          </div>

          {activeAppId !== null && (
            <button
              onClick={() => setActiveAppId(null)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all"
            >
              ← Back to App Gallery
            </button>
          )}
        </div>
      </div>

      {/* Render Active App or Gallery Grid */}
      {activeAppId !== null ? (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveAppId(null)}
              className="text-xs font-mono text-cyan-400 hover:underline"
            >
              Gallery Home
            </button>
            <span className="text-xs text-slate-600">/</span>
            <span className="text-xs font-mono text-slate-300">
              {apps.find((a) => a.id === activeAppId)?.name}
            </span>
          </div>

          {renderActiveApp()}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <div
                key={app.id}
                onClick={() => setActiveAppId(app.id)}
                className={`glass-panel p-6 rounded-3xl cursor-pointer transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between border ${app.borderColor} bg-gradient-to-br ${app.color} group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-cyan-400 shadow-md group-hover:border-cyan-400 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-cyan-300">
                      {app.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-100 mb-2 group-hover:text-cyan-300 transition-colors">
                    {app.name}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                    {app.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="text-[11px] font-mono text-slate-500 truncate">
                    {app.architecture}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-cyan-400 font-mono">Week {app.weekLink} Concept</span>
                    <span className="text-xs font-bold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Launch App <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

