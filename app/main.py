from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib 
import numpy as np
import os
import sys

# Configuración para la Nube
DIR_PATH = os.path.dirname(os.path.realpath(__file__))
MODEL_PATH = os.path.join(DIR_PATH, "heart_failure_model.joblib")
SCALER_PATH = os.path.join(DIR_PATH, "heart_failure_scaler.joblib")

# Iniciar aplicación
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI(title="Modelo de Predicción de Fallo Cardiaco")

# Mount assets first (specific path)
app.mount("/assets", StaticFiles(directory="../frontend/dist/assets"), name="assets")

# Root path serves index.html
@app.get("/")
async def read_root():
    return FileResponse('../frontend/dist/index.html')

origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:3000",
    "https://frontend.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Importar modelo y scaler
model = None
scaler = None
load_error = None

try:
    if os.path.exists(MODEL_PATH) and os.path.exists(SCALER_PATH):
        model = joblib.load(MODEL_PATH)
        scaler = joblib.load(SCALER_PATH)
    else:
        load_error = f"Files not found. Dir: {DIR_PATH}, Contents: {os.listdir(DIR_PATH) if os.path.exists(DIR_PATH) else 'Dir not found'}"
except Exception as e:
    load_error = str(e)
    print(f"Error loading model: {e}")

@app.get("/health")
def health_check():
    return {
        "status": "online",
        "model_loaded": model is not None,
        "scaler_loaded": scaler is not None,
        "load_error": load_error,
        "python_version": sys.version
    }

# Definir clase de datos de entrada
class PatientData(BaseModel):
    age: int
    anemia: int
    creatinine_phosphokinase: float
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
    if model is None or scaler is None:
        raise HTTPException(status_code=503, detail=f"Model not loaded. Error: {load_error}")
        
    numeric_values = [
        data.age,
        data.creatinine_phosphokinase,
        data.ejection_fraction,
        data.platelets,
        data.serum_creatinine,
        data.serum_sodium
    ]
    
    numeric_array = np.array(numeric_values).reshape(1, -1)
    
    scaled_numeric = scaler.transform(numeric_array)[0] # Obtenemos el array plano
    
    final_input = [
        scaled_numeric[0],
        data.anemia,
        scaled_numeric[1],
        data.diabetes,
        scaled_numeric[2],
        data.high_blood_pressure,
        scaled_numeric[3],
        scaled_numeric[4],
        data.sex,
        data.smoking
    ]
    
    final_input_array = np.array(final_input).reshape(1, -1)
    probs = model.predict_proba(final_input_array)
    prob_muerte = probs[0][1]

    umbral = 0.55
    prediction = 1 if prob_muerte >= umbral else 0
    label = f"{'Alto' if prediction == 1 else 'Bajo'} Riesgo ({prob_muerte:.2%})"
    
    return {
        "prediction": prediction,
        "label": label,
        "probability": prob_muerte
    }