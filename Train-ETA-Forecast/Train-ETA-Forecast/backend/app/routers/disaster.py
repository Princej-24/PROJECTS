from fastapi import APIRouter
from app.database import WEATHER_DISRUPTIONS
from pydantic import BaseModel

router = APIRouter(prefix="/api/disaster", tags=["Disaster & Weather Management"])

class HazardToggleRequest(BaseModel):
    hazard_id: str
    severity: str  # "HIGH", "MEDIUM", "CLEAR"
    speed_cap_kmh: int

@router.get("/hazards")
def get_weather_hazards():
    return WEATHER_DISRUPTIONS

@router.post("/toggle")
def toggle_hazard_severity(req: HazardToggleRequest):
    hazard = next((h for h in WEATHER_DISRUPTIONS if h["id"] == req.hazard_id), None)
    if hazard:
        hazard["severity"] = req.severity
        hazard["speed_cap_kmh"] = req.speed_cap_kmh
        return {"status": "updated", "hazard": hazard}
    return {"status": "error", "message": "Hazard ID not found"}
