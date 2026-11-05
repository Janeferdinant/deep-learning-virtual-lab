import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional

from executor import execute_python_code
from datasets import list_available_datasets, get_dataset_preview, get_dataset_df
from models import (
    predict_digit_from_pixels,
    predict_fashion_category,
    analyze_sentiment,
    generate_gan_image
)

app = FastAPI(
    title="Deep Learning Virtual Laboratory API (R20A6683)",
    description="Interactive backend for MRCET Deep Learning Laboratory Learning Platform",
    version="1.0.0"
)

# Enable CORS for frontend clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Request Models
class CodeExecutionRequest(BaseModel):
    code: str

class DigitPredictRequest(BaseModel):
    pixels: list[float] = Field(..., description="Array of 784 normalized pixel values")

class FashionPredictRequest(BaseModel):
    category_id: Optional[int] = None
    image_b64: Optional[str] = None

class SentimentPredictRequest(BaseModel):
    text: str

class GanGenerateRequest(BaseModel):
    latent_vector: list[float] = Field(default_factory=lambda: [0.0]*16)
    digit_class: int = 0

@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "version": "1.0.0",
        "lab": "R20A6683 Deep Learning Virtual Laboratory",
        "institution": "Malla Reddy College of Engineering & Technology (MRCET)"
    }

@app.post("/api/execute")
def execute_code(req: CodeExecutionRequest):
    if not req.code or not req.code.strip():
        raise HTTPException(status_code=400, detail="Code string cannot be empty.")
    result = execute_python_code(req.code)
    return result

@app.get("/api/datasets")
def list_datasets():
    return {"datasets": list_available_datasets()}

@app.get("/api/datasets/{name}")
def get_dataset(name: str):
    try:
        preview = get_dataset_preview(name)
        return preview
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail=f"Dataset '{name}' not found.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/predict/digit")
def predict_digit(req: DigitPredictRequest):
    return predict_digit_from_pixels(req.pixels)

@app.post("/api/predict/fashion")
def predict_fashion(req: FashionPredictRequest):
    return predict_fashion_category(req.category_id, req.image_b64)

@app.post("/api/predict/sentiment")
def predict_sentiment(req: SentimentPredictRequest):
    return analyze_sentiment(req.text)

@app.post("/api/predict/gan")
def predict_gan(req: GanGenerateRequest):
    image_url = generate_gan_image(req.latent_vector, req.digit_class)
    return {"image": image_url}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

