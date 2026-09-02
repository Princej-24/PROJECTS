from fastapi import APIRouter
from app.predictor import TrainETAPredictor
from app.database import TRAINS

router = APIRouter(prefix="/api/predict", tags=["Predict"])

@router.get("/{train_id}")
def predict_eta_for_train(train_id: str):
    # Find matching train
    train = next((t for t in TRAINS if t["id"] == train_id or t["number"] == train_id), None)
    if not train:
        return {"error": "Train not found"}
    return TrainETAPredictor.calculate_dynamic_eta(train["id"])

@router.get("/")
def predict_all_fleet_eta():
    predictions = []
    for t in TRAINS:
        predictions.append(TrainETAPredictor.calculate_dynamic_eta(t["id"]))
    return predictions
