import joblib
import pandas as pd

try:
    scaler = joblib.load("app/heart_failure_scaler.joblib")
    if hasattr(scaler, "feature_names_in_"):
        print("Scaler Feature Names:", list(scaler.feature_names_in_))
    else:
        print("Scaler does not have feature_names_in_ attribute.")
except Exception as e:
    print(f"Error loading scaler: {e}")

try:
    model = joblib.load("app/heart_failure_model.joblib")
    if hasattr(model, "feature_names_in_"):
        print("Model Feature Names:", list(model.feature_names_in_))
    else:
        print("Model does not have feature_names_in_ attribute.")
except Exception as e:
    print(f"Error loading model: {e}")
