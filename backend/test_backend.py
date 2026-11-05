import pytest
from fastapi.testclient import TestClient
import sys
import os

# Add backend directory to sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from main import app
from executor import execute_python_code
from datasets import get_dataset_df, list_available_datasets

client = TestClient(app)

def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert "version" in data

def test_list_datasets():
    datasets = list_available_datasets()
    assert "placement.csv" in datasets
    assert "iris.csv" in datasets
    assert "ionosphere.csv" in datasets

def test_get_dataset():
    df = get_dataset_df("placement.csv")
    assert not df.empty
    assert "cgpa" in [col.lower() for col in df.columns]

    df_iris = get_dataset_df("iris.csv")
    assert len(df_iris) == 150

    response = client.get("/api/datasets/placement.csv")
    assert response.status_code == 200
    res_data = response.json()
    assert "columns" in res_data
    assert "data" in res_data
    assert len(res_data["data"]) > 0

def test_code_executor_basic():
    code = "print('Hello Deep Learning Lab!')\nx = 10 + 20\nprint('Result:', x)"
    result = execute_python_code(code)
    assert result["success"] is True
    assert "Hello Deep Learning Lab!" in result["stdout"]
    assert "Result: 30" in result["stdout"]
    assert result["execution_time"] > 0

def test_code_executor_with_plot():
    code = """
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 50)
y = np.sin(x)
plt.figure(figsize=(5, 3))
plt.plot(x, y, label='sin')
plt.title('Test Plot')
plt.legend()
plt.tight_layout()
"""
    result = execute_python_code(code)
    assert result["success"] is True
    assert len(result["images"]) == 1
    assert result["images"][0].startswith("data:image/png;base64,")

def test_code_executor_error_handling():
    code = "x = 1 / 0"
    result = execute_python_code(code)
    assert result["success"] is False
    assert "ZeroDivisionError" in result["stderr"]

def test_predict_digit_endpoint():
    # Pass a 28x28 dummy image (zeros with a vertical line in center like a '1')
    pixels = [0.0] * 784
    for r in range(5, 23):
        pixels[r * 28 + 14] = 1.0
    response = client.post("/api/predict/digit", json={"pixels": pixels})
    assert response.status_code == 200
    data = response.json()
    assert "prediction" in data
    assert "probabilities" in data
    assert len(data["probabilities"]) == 10

def test_predict_sentiment_endpoint():
    response = client.post("/api/predict/sentiment", json={"text": "This movie was absolutely fantastic, brilliant acting and superb direction!"})
    assert response.status_code == 200
    data = response.json()
    assert data["sentiment"] in ["positive", "negative"]
    assert "confidence" in data
    assert 0.0 <= data["confidence"] <= 1.0

