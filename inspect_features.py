import joblib
import pandas as pd
import sklearn
import numpy

print(f"Current Scikit-learn version: {sklearn.__version__}")
print(f"Current Numpy version: {numpy.__version__}")

try:
    scaler = joblib.load("api/heart_failure_scaler.joblib")
    print("\n--- SCALER ---")
    print(f"Type: {type(scaler)}")
    if hasattr(scaler, "n_features_in_"):
        print(f"Expected features: {scaler.n_features_in_}")
    if hasattr(scaler, "feature_names_in_"):
        print("Feature Names:", list(scaler.feature_names_in_))
    else:
        print("Scaler does not have feature_names_in_ attribute.")
except Exception as e:
    print(f"Error loading scaler: {e}")

try:
    model = joblib.load("api/heart_failure_model.joblib")
    print("\n--- MODEL ---")
    print(f"Type: {type(model)}")
    if hasattr(model, "n_features_in_"):
        print(f"Expected features: {model.n_features_in_}")
    if hasattr(model, "feature_names_in_"):
        print("Feature Names:", list(model.feature_names_in_))
    else:
        print("Model does not have feature_names_in_ attribute.")
except Exception as e:
    print(f"Error loading model: {e}")
