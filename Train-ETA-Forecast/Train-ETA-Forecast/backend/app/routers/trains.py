from fastapi import APIRouter, Query
from app.database import STATIONS, TRAINS, LIVE_TELEMETRY, get_or_create_train
from typing import Optional

router = APIRouter(prefix="/api/trains", tags=["Trains"])

@router.get("/")
def get_all_trains(corridor: Optional[str] = Query(None)):
    result = []
    for t in TRAINS:
        if corridor and corridor != "All" and t.get("corridor") != corridor:
            continue
        telemetry = LIVE_TELEMETRY.get(t["id"], {})
        result.append({
            **t,
            "telemetry": telemetry
        })
    return result

@router.get("/stations")
def get_all_stations(corridor: Optional[str] = Query(None)):
    if corridor and corridor != "All":
        return [s for s in STATIONS if s.get("corridor") == corridor]
    return STATIONS

@router.get("/{query}")
def get_train_by_query(query: str):
    train = get_or_create_train(query)
    telemetry = LIVE_TELEMETRY.get(train["id"], {})
    return {**train, "telemetry": telemetry}
