from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, trains, predict, disaster, pnr, whatif

app = FastAPI(
    title="SIH26028 Dynamic Train ETA & Disaster Intelligence API",
    description="AI Engine & Decision Support System for Coaching Train ETA Forecasting and Disaster Management (Ministry of Railways)",
    version="1.0.0"
)

# CORS setup for Vercel integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(auth.router)
app.include_router(trains.router)
app.include_router(predict.router)
app.include_router(disaster.router)
app.include_router(pnr.router)
app.include_router(whatif.router)

@app.get("/")
def root():
    return {
        "title": "SIH26028 Dynamic Train ETA & Disaster Intelligence API",
        "status": "Online",
        "corridor": "NDLS - CNB - PRYJ - BSB",
        "docs_url": "/docs"
    }
