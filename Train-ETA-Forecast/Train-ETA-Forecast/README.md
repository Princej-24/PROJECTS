# SIH26028: Dynamic Forecast of Expected Time of Arrival (ETA) for Coaching Trains
### AI-Powered Predictive Railway & Disaster Intelligence Platform (Ministry of Railways)

**Tagline:** *"Don't just track the train. Predict what happens next."*

---

## 🌟 Overview & Key Innovations

This project was built for **Smart India Hackathon (SIH 2026)** Problem Statement **SIH26028**. It replaces conventional static train tracking apps with an **AI predictive intelligence layer** that forecasts future arrivals, cascading multi-train block section lockups, extreme weather disaster impacts, and provides role-based decision support.

### Unique Differentiating Features:
1. **Multi-Train Cascading Signal Queue Predictor**:
   - Calculates when Train B (e.g. Rajdhani) must wait 1.5 km back at outer signals due to downstream platform lockup by Train A.
2. **Disaster Management Engine (SIH Theme Focus)**:
   - Live route weather hazard overlays (Kanpur Heavy Rain, Prayagraj Fog).
   - Mandatory safety speed caps (45 km/h) automatically factored into dynamic ETAs.
3. **Citizen View ("Where Is My Train"++)**:
   - Dynamic ETA confidence windows (e.g. 08:35 PM ± 4 min, 92% Confidence).
   - SHAP-style Explainable Delay Breakdown (% Weather, % Signal Queue, % Dwell).
   - Digital platform assignment & coach positioning predictor.
   - Predictive PNR Tracker with ML waitlist confirmation probability.
4. **Railway Controller Command Center**:
   - Fleet-wide delay propagation matrix.
   - Interactive "What-If" Dispatch Simulator for testing platform reassignments & dwell time reductions.

---

## 📁 Repository Structure

```
sih-train-eta-forecast/
├── backend/                  # FastAPI Python backend (Render-ready)
│   ├── app/
│   │   ├── main.py           # Application entrypoint & CORS
│   │   ├── database.py       # Indian Railways dataset (NDLS - CNB - PRYJ - BSB)
│   │   ├── simulator.py      # Telemetry & what-if simulator
│   │   ├── predictor.py      # AI dynamic ETA & SHAP explainability engine
│   │   └── routers/          # Modular API endpoints
│   ├── requirements.txt      # Python dependencies
│   └── render.yaml           # Deployment blueprint for Render
│
└── frontend/                 # React + Vite frontend (Vercel-ready)
    ├── src/
    │   ├── components/       # UI components (Map, Passenger, Controller, PNR, Disaster, Auth)
    │   ├── services/         # REST API client with resilient offline fallback
    │   ├── App.jsx           # Main layout & state manager
    │   └── index.css         # Cybernetic Dark Glassmorphic Theme
    ├── package.json
    └── vercel.json           # Deployment blueprint for Vercel
```

---

## 🚀 How to Run Locally

### 1. Run Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
- API Docs available at: `http://localhost:8000/docs`

### 2. Run Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
- Local app running at: `http://localhost:3000`

---

## ☁️ Cloud Deployment Instructions

### Deploy Frontend to Vercel:
1. Push `frontend/` folder to GitHub.
2. Import project in Vercel.
3. Vercel automatically detects `vercel.json` and Vite framework.
4. Deploy!

### Deploy Backend to Render:
1. Push `backend/` folder to GitHub.
2. Create new Web Service on Render.
3. Select Python environment and build command `pip install -r requirements.txt`.
4. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
5. Deploy!
