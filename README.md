# Heart Failure Prediction Platform

A modern, full-stack web application designed to predict the risk of heart failure in patients based on clinical records. This project utilizes a Machine Learning model (Random Forest) served via a FastAPI backend and a responsive React frontend.

## 🚀 Features

-   **Real-time Prediction**: Instant analysis of patient data using a trained Random Forest model.
-   **Clinical Inputs**: Takes 11 key clinical features including Age, Ejection Fraction, Serum Creatinine, and more.
-   **Interactive UI**: A clean, user-friendly interface built with React and Tailwind CSS.
-   **Serverless Architecture**: Backend deployed as Serverless Functions on Vercel for scalability and low maintenance.
-   **Responsive Design**: optimized for both desktop and mobile devices.

## 🛠️ Tech Stack

### Frontend
-   **React** (Vite)
-   **Tailwind CSS** for styling
-   **Lucide React** for icons
-   **React Router** for navigation

### Backend
-   **FastAPI** (Python)
-   **Scikit-learn** for ML model
-   **Joblib** for model serialization
-   **Numpy/Pandas** for data processing

### Deployment
-   **Vercel** (Frontend & Serverless Backend)

## 📂 Project Structure

```
├── api/                 # Backend (Vercel Serverless Function)
│   ├── index.py         # FastAPI entrypoint
│   ├── *.joblib         # Trained ML Model & Scaler
│
├── frontend/            # React Frontend
│   ├── src/             # Source code (Components, Pages)
│   ├── public/          # Static assets
│
└── vercel.json          # Deployment configuration
```

## ⚡ Getting Started

### Prerequisites

-   Node.js (v18+)
-   Python (3.9+)

### 1. Clone the Repository

```bash
git clone https://github.com/ingGibran/Heart-Failure-Predictor.git
cd Heart-Failure-Predictor
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
The frontend will run at `http://localhost:5173`.

### 3. Backend Setup

Open a new terminal in the root directory:

```bash
# Create a virtual environment
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the API locally
uvicorn api.index:app --reload
```
The API will run at `http://127.0.0.1:8000`.

> **Note**: For local development, ensure `frontend/src/pages/SurveyPage.jsx` points to your local API URL if not proxying.

## 🧠 Model Details

The application uses a **Random Forest Classifier** trained on clinical data. It predicts the probability of heart failure events.

**Input Features:**
1.  Age
2.  Anaemia
3.  Creatinine Phosphokinase
4.  Diabetes
5.  Ejection Fraction
6.  High Blood Pressure
7.  Platelets
8.  Serum Creatinine
9.  Serum Sodium
10. Sex
11. Smoking

## 🌍 Deployment

This project is configured for seamless deployment on **Vercel**.

1.  Push code to GitHub.
2.  Import project in Vercel.
3.  Vercel automatically detects the `vercel.json` configuration configures the Build Output Settings:
    -   **Output Directory**: `frontend/dist`
    -   **Install Command**: `cd frontend && npm install`
    -   **Build Command**: `cd frontend && npm run build`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
