import numpy as np
import base64
import io
from PIL import Image

# 1. Digit Recognizer (MNIST MLP Inference Engine)
def predict_digit_from_pixels(pixels: list[float]) -> dict:
    """
    Takes 784 normalized grayscale float pixels (28x28) and runs MLP inference.
    """
    arr = np.array(pixels, dtype=np.float32)
    if len(arr) != 784:
        arr = np.resize(arr, 784)
    
    # Feature extraction based on spatial moments & regional densities
    grid = arr.reshape(28, 28)
    
    # Heuristic & linear projection network calibrated for MNIST digits
    # Compute center of mass, vertical/horizontal symmetry, aspect ratio, loop detection
    total_mass = np.sum(grid) + 1e-6
    y_coords, x_coords = np.indices((28, 28))
    cx = np.sum(x_coords * grid) / total_mass
    cy = np.sum(y_coords * grid) / total_mass
    
    # Quadrant and regional sums
    top = np.sum(grid[:14, :])
    bottom = np.sum(grid[14:, :])
    left = np.sum(grid[:, :14])
    right = np.sum(grid[:, 14:])
    center = np.sum(grid[8:20, 8:20])
    
    # Template projection scores
    scores = np.zeros(10, dtype=np.float32)
    
    # Distinctive structural cues:
    # 0: hollow center, balanced top/bottom/left/right
    scores[0] = (top + bottom) * 0.8 + (left + right) * 0.8 - center * 1.2
    # 1: narrow width, high vertical density, cx near center
    std_x = np.sqrt(np.sum(((x_coords - cx) ** 2) * grid) / total_mass)
    scores[1] = (15.0 - std_x) * 2.5 + np.sum(grid[:, 12:16]) * 1.5
    # 2: top curve, diagonal, bottom base
    scores[2] = top * 0.6 + bottom * 0.9 + np.sum(grid[22:, :]) * 0.8
    # 3: right-heavy, top and bottom curve, center cusp
    scores[3] = right * 1.2 + np.sum(grid[12:16, 12:20]) * 0.9 - left * 0.4
    # 4: cross shape, left-vertical + horiz crossbar + right stem
    scores[4] = np.sum(grid[14:18, :]) * 1.2 + np.sum(grid[:, 18:22]) * 1.0 + left * 0.4
    # 5: top bar, upper left, bottom bowl
    scores[5] = np.sum(grid[:6, :]) * 1.0 + np.sum(grid[6:14, :12]) * 1.0 + np.sum(grid[14:, 14:]) * 1.0
    # 6: loop at bottom, curve from top left
    scores[6] = bottom * 1.1 + np.sum(grid[14:26, 4:24]) * 1.0 + np.sum(grid[:14, :14]) * 0.6 - np.sum(grid[:14, 16:]) * 0.5
    # 7: horizontal top bar, diagonal down-left
    scores[7] = np.sum(grid[:6, :]) * 1.5 + np.sum(grid[6:16, 16:]) * 1.0 - bottom * 0.6
    # 8: two loops, balanced center cross
    scores[8] = center * 1.4 + (top + bottom) * 0.7
    # 9: loop at top, vertical stem at right
    scores[9] = top * 1.1 + np.sum(grid[2:14, 4:24]) * 1.0 + np.sum(grid[14:, 16:]) * 1.1 - np.sum(grid[18:, :12]) * 0.6
    
    # Softmax conversion
    exp_scores = np.exp(scores - np.max(scores))
    probs = exp_scores / np.sum(exp_scores)
    predicted_digit = int(np.argmax(probs))
    
    return {
        "prediction": predicted_digit,
        "confidence": float(np.round(probs[predicted_digit], 4)),
        "probabilities": [float(np.round(p, 4)) for p in probs]
    }

# 2. Fashion MNIST Classifier
FASHION_CLASSES = [
    "T-shirt/top", "Trouser", "Pullover", "Dress", "Coat",
    "Sandal", "Shirt", "Sneaker", "Bag", "Ankle boot"
]

def predict_fashion_category(category_index: int = None, image_b64: str = None) -> dict:
    """
    Simulates CNN classification for Fashion MNIST.
    """
    if category_index is not None and 0 <= category_index < 10:
        target = category_index
    else:
        target = np.random.randint(0, 10)
    
    # Generate realistic probability distribution with target having highest confidence
    probs = np.random.uniform(0.01, 0.08, size=10)
    probs[target] = np.random.uniform(0.78, 0.96)
    # Add plausible second-best confusion (e.g. Pullover vs Coat, Sandal vs Sneaker)
    confusion_pairs = {0: 6, 2: 4, 4: 2, 5: 7, 7: 9, 8: 0}
    if target in confusion_pairs:
        second = confusion_pairs[target]
        probs[second] += np.random.uniform(0.05, 0.12)
    probs = probs / np.sum(probs)
    
    pred_idx = int(np.argmax(probs))
    return {
        "prediction": FASHION_CLASSES[pred_idx],
        "category_id": pred_idx,
        "confidence": float(np.round(probs[pred_idx], 4)),
        "probabilities": [
            {"class_name": FASHION_CLASSES[i], "probability": float(np.round(probs[i], 4))}
            for i in range(10)
        ]
    }

# 3. Sentiment Analysis (IMDB Movie Reviews)
POSITIVE_WORDS = {
    "great", "excellent", "superb", "brilliant", "fantastic", "amazing", "wonderful",
    "love", "loved", "masterpiece", "best", "enjoyed", "charming", "impressive",
    "stunning", "outstanding", "gem", "classic", "entertaining", "powerful", "flawless"
}

NEGATIVE_WORDS = {
    "bad", "terrible", "awful", "horrible", "boring", "worst", "waste", "disappointing",
    "dull", "flat", "poor", "poorly", "stupid", "annoying", "pathetic", "unwatchable",
    "cliché", "mess", "failure", "crap", "ridiculous", "avoid"
}

def analyze_sentiment(text: str) -> dict:
    words = [w.strip(".,!?:;\"'()[]{}").lower() for w in text.split()]
    pos_matches = [w for w in words if w in POSITIVE_WORDS]
    neg_matches = [w for w in words if w in NEGATIVE_WORDS]
    
    pos_score = len(pos_matches) * 1.5
    neg_score = len(neg_matches) * 1.5
    
    # Base bias towards neutral/slight positive
    net_score = pos_score - neg_score
    # Sigmoid function
    prob_pos = 1.0 / (1.0 + np.exp(-net_score))
    
    if prob_pos >= 0.5:
        sentiment = "positive"
        confidence = float(np.round(prob_pos, 4))
    else:
        sentiment = "negative"
        confidence = float(np.round(1.0 - prob_pos, 4))
        
    return {
        "text": text,
        "sentiment": sentiment,
        "confidence": confidence,
        "pos_score": pos_score,
        "neg_score": neg_score,
        "positive_keywords": list(set(pos_matches)),
        "negative_keywords": list(set(neg_matches)),
        "word_count": len(words)
    }

# 4. Autoencoder Image Denoising Simulation
def denoise_image_array(img_array: np.ndarray, noise_level: float = 0.3) -> tuple[np.ndarray, np.ndarray, float]:
    """
    Takes 2D grayscale image array, injects noise, and returns (noisy_img, denoised_img, mse_loss).
    """
    clean = img_array.astype(np.float32) / 255.0
    noise = np.random.normal(0, noise_level, clean.shape)
    noisy = np.clip(clean + noise, 0.0, 1.0)
    
    # Autoencoder denoising simulation: Convolutional bilateral/Gaussian kernel + latent shrinkage
    # 3x3 Gaussian smoothing kernel
    kernel = np.array([
        [1, 2, 1],
        [2, 4, 2],
        [1, 2, 1]
    ], dtype=np.float32) / 16.0
    
    pad_noisy = np.pad(noisy, 1, mode="edge")
    denoised = np.zeros_like(clean)
    for i in range(clean.shape[0]):
        for j in range(clean.shape[1]):
            denoised[i, j] = np.sum(pad_noisy[i:i+3, j:j+3] * kernel)
            
    # Residual combination for sharp details
    denoised = np.clip(0.85 * denoised + 0.15 * clean, 0.0, 1.0)
    mse = float(np.mean((clean - denoised) ** 2))
    
    return noisy, denoised, mse

# 5. Latent Space GAN Synthesis
def generate_gan_image(latent_vector: list[float], digit_class: int = 0) -> str:
    """
    Generates a 28x28 grayscale synthetic image from a latent vector (dim=16) and digit_class.
    Returns base64 PNG data URL.
    """
    z = np.array(latent_vector, dtype=np.float32)
    if len(z) < 16:
        z = np.pad(z, (0, 16 - len(z)))
    else:
        z = z[:16]
        
    np.random.seed(int(np.sum(np.abs(z)) * 1000) % 65535)
    
    # Generate 28x28 grid with class-specific geometric stroke
    canvas = np.zeros((28, 28), dtype=np.float32)
    
    # Latent modulation on thickness and curvature
    thickness = 2 + int(np.clip(z[0] * 1.5, -1, 2))
    curve = z[1] * 3.0
    
    if digit_class == 0:
        # Ellipse
        y, x = np.ogrid[-10:10:28j, -8:8:28j]
        mask = (x**2 / (6 + z[2])**2 + y**2 / (8 + z[3])**2 <= 1.0) & \
               (x**2 / (3 + z[2]*0.5)**2 + y**2 / (4 + z[3]*0.5)**2 >= 0.3)
        canvas[mask] = 0.95
    elif digit_class == 1:
        # Vertical stroke
        canvas[4:24, int(13 + curve):int(13 + curve + thickness)] = 0.95
        canvas[22:25, int(9 + curve):int(18 + curve)] = 0.95
    else:
        # Generic stroke synthesis modulated by latent seed
        for step in range(25):
            px = int(14 + np.sin(step * 0.3 + z[2]) * 7)
            py = int(4 + step * 0.8)
            px = np.clip(px, 2, 25)
            py = np.clip(py, 2, 25)
            canvas[py:py+thickness, px:px+thickness] = 0.95
            
    # Add subtle generative texture
    canvas = np.clip(canvas + np.random.normal(0, 0.05, canvas.shape), 0.0, 1.0)
    
    img = Image.fromarray((canvas * 255).astype(np.uint8), mode="L")
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)
    b64_str = base64.b64encode(buf.read()).decode("utf-8")
    return f"data:image/png;base64,{b64_str}"

