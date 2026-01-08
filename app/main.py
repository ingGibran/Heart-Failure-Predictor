from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib 
import pandas as pd

# Iniciar aplicación
app = FastAPI(title="Modelo de Predicción de Fallo Cardiaco")

origins = [
    "https://localhost",
    "http://localhost",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Importar modelo y scaler
model = joblib.load("heart_failure_model.joblib")
scaler = joblib.load("heart_failure_scaler.joblib")

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
    # Mapping input data to match model feature names
    input_data = {
        'age': data.age,
        'anaemia': data.anemia, # Renamed from anemia
        'creatinine_phosphokinase': data.creatinine_phospholinase, # Renamed
        'diabetes': data.diabetes,
        'ejection_fraction': data.ejection_fraction,
        'high_blood_pressure': data.high_blood_pressure,
        'platelets': data.platelets,
        'serum_creatinine': data.serum_creatinine,
        'serum_sodium': data.serum_sodium,
        'sex': data.sex,
        'smoking': data.smoking
    }
    
    # Create DataFrame with all columns
    input_df = pd.DataFrame([input_data])
    
    # 1. Identify columns to scale (numeric)
    numeric_cols = ['age', 'creatinine_phosphokinase', 'ejection_fraction', 'platelets', 'serum_creatinine', 'serum_sodium']
    
    # 2. Scale numeric columns
    # Create a subset DF for scaling to ensure column order matches scaler expectation
    numeric_subset = input_df[numeric_cols]
    scaled_values = scaler.transform(numeric_subset)
    
    # 3. Update DataFrame with scaled values
    input_df[numeric_cols] = scaled_values
    
    # 4. Ensure Correct Column Order for Model
    model_cols = ['age', 'anaemia', 'creatinine_phosphokinase', 'diabetes', 'ejection_fraction', 'high_blood_pressure', 'platelets', 'serum_creatinine', 'serum_sodium', 'sex', 'smoking']
    final_input = input_df[model_cols]

    # 5. Obtener Probabilidad
    probs = model.predict_proba(final_input)
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