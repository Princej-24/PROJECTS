from fastapi import APIRouter
from app.models import WhatIfSimulationRequest
from app.simulator import RailwaySimulator

router = APIRouter(prefix="/api/whatif", tags=["What-If Dispatcher Simulator"])

@router.post("/simulate")
def run_simulation(req: WhatIfSimulationRequest):
    return RailwaySimulator.run_whatif_simulation(
        train_id=req.train_id,
        action_type=req.action_type,
        new_platform=req.new_platform,
        dwell_reduction_min=req.dwell_reduction_min
    )
