import os
import numpy as np
import pandas as pd
from sklearn.datasets import load_iris

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
os.makedirs(DATA_DIR, exist_ok=True)

def initialize_datasets():
    """Generates standard datasets if they don't already exist."""
    # 1. placement.csv for Experiment 1
    placement_path = os.path.join(DATA_DIR, "placement.csv")
    if not os.path.exists(placement_path):
        np.random.seed(42)
        n_samples = 200
        # CGPA between 5.0 and 10.0
        cgpa = np.random.uniform(5.0, 10.0, n_samples)
        # Resume score between 5.0 and 10.0
        resume_score = np.random.uniform(5.0, 10.0, n_samples)
        # Linearly separable boundary roughly: 0.8 * cgpa + 0.6 * resume_score >= 9.5
        boundary = 0.8 * cgpa + 0.6 * resume_score
        noise = np.random.normal(0, 0.3, n_samples)
        placed = ((boundary + noise) >= 9.5).astype(int)
        
        df_placement = pd.DataFrame({
            "cgpa": np.round(cgpa, 2),
            "resume_score": np.round(resume_score, 2),
            "placed": placed
        })
        df_placement.to_csv(placement_path, index=False)

    # 2. iris.csv for Experiment 2 and 3
    iris_path = os.path.join(DATA_DIR, "iris.csv")
    if not os.path.exists(iris_path):
        iris = load_iris(as_frame=True)
        df_iris = iris.frame.copy()
        df_iris.columns = ["SepalLengthCm", "SepalWidthCm", "PetalLengthCm", "PetalWidthCm", "target"]
        target_names = {0: "Iris-setosa", 1: "Iris-versicolor", 2: "Iris-virginica"}
        df_iris["Species"] = df_iris["target"].map(target_names)
        df_iris.drop(columns=["target"], inplace=True)
        df_iris.insert(0, "Id", range(1, len(df_iris) + 1))
        df_iris.to_csv(iris_path, index=False)

    # 3. ionosphere.csv for Experiment 2 & 3
    ionosphere_path = os.path.join(DATA_DIR, "ionosphere.csv")
    if not os.path.exists(ionosphere_path):
        np.random.seed(42)
        n_iono = 351
        cols = [f"f{i}" for i in range(1, 35)]
        data = np.random.uniform(-1.0, 1.0, size=(n_iono, 34))
        # Ensure column 1 is mostly 1s and col 2 mostly 0s as per standard Johns Hopkins dataset
        data[:, 0] = 1.0
        data[:, 1] = 0.0
        # Labels 'g' (good) and 'b' (bad)
        labels = np.random.choice(["g", "b"], size=n_iono, p=[0.64, 0.36])
        df_iono = pd.DataFrame(data, columns=cols)
        df_iono["Class"] = labels
        df_iono.to_csv(ionosphere_path, index=False)

# Run initialization on import
initialize_datasets()

def list_available_datasets():
    return [f for f in os.listdir(DATA_DIR) if f.endswith(".csv")]

def get_dataset_df(name: str) -> pd.DataFrame:
    path = os.path.join(DATA_DIR, name)
    if not os.path.exists(path):
        # Fallback check
        initialize_datasets()
        if not os.path.exists(path):
            raise FileNotFoundError(f"Dataset {name} not found.")
    return pd.read_csv(path)

def get_dataset_preview(name: str, limit: int = 50):
    df = get_dataset_df(name)
    preview_df = df.head(limit)
    return {
        "name": name,
        "total_rows": len(df),
        "columns": list(df.columns),
        "data": preview_df.to_dict(orient="records"),
        "summary": df.describe().to_dict() if not df.empty else {}
    }

