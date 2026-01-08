from fastapi import FastAPI
from pydantic import BaseModel
import joblib 
import pandas as pd

# Iniciar aplicación
app = FastAPI(title="Modelo de Predicción de Fallo Cardiaco")

# Importar modelo y scaler
model = joblib.load("heart_failure_model.joblib")
scaler = joblib.load("heat_failure_scaler.joblib")

# Definir clase de datos de entrada
class PatientData(BaseModel):
    age: int
    anemia: int
    creatinine_phospholinase: float
    diabetes: int
    ejection_fraction: float
    high_blood_pressure: int
    platelets: float
    serum_creatinine: float
    serum_sodium: float
    sex: int
    smoking: int

# Endpoint predicción
@app.post("/predict")
def predict_heart_failure(data: PatientData):
    # 1. Convertir y Escalar
    input_df = pd.DataFrame([data.dict()])
    input_scaled = scaler.transform(input_df)

    # 2. Obtener Probabilidad
    probs = model.predict_proba(input_scaled)
    prob_muerte = probs[0][1]

    umbral = 0.55
    
    if prob_muerte >= umbral:
        prediction = 1
        label = f"Alto Riesgo (Probabilidad: {prob_muerte:.2%})"
    else:
        prediction = 0
        label = f"Bajo Riesgo (Probabilidad: {prob_muerte:.2%})"
    
    return {
        "prediction": prediction,
        "label": label,
        "umbral_usado": umbral
    }