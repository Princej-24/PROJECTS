from fastapi import APIRouter
from app.database import PNR_DB

router = APIRouter(prefix="/api/pnr", tags=["PNR Checker"])

@router.get("/{pnr_number}")
def check_pnr_status(pnr_number: str):
    record = PNR_DB.get(pnr_number)
    if record:
        return record
    
    # Generate realistic dynamic response for any 10-digit PNR mock query
    return {
        "pnr": pnr_number,
        "train_number": "12301",
        "train_name": "Howrah Rajdhani Express",
        "journey_date": "2026-08-25",
        "from_station": "NDLS",
        "to_station": "PRYJ",
        "class": "3A",
        "passengers": [
            {"name": "Passenger 1", "booking_status": "WL 12", "current_status": "WL 4", "predicted_status": "CNF (Confirmed)"}
        ],
        "confirmation_probability": 89,
        "predicted_platform": "Platform 1"
    }
