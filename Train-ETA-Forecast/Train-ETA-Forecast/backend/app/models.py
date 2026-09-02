from pydantic import BaseModel
from typing import List, Optional

class StationModel(BaseModel):
    id: str
    code: str
    name: str
    lat: float
    lng: float
    platforms: int
    sequence: int
    distance_km: float

class ScheduleItem(BaseModel):
    station_code: str
    scheduled_arr: str
    scheduled_dep: str
    platform: int

class TrainModel(BaseModel):
    id: str
    number: str
    name: str
    type: str
    source: str
    destination: str
    max_speed: int
    schedule: List[ScheduleItem]

class TelemetryModel(BaseModel):
    train_id: str
    lat: float
    lng: float
    speed_kmh: float
    last_station: str
    next_station: str
    current_delay_min: int
    status: str
    assigned_platform: int

class WeatherDisruptionModel(BaseModel):
    id: str
    section: str
    start_station: str
    end_station: str
    hazard_type: str
    severity: str
    speed_cap_kmh: int
    affected_trains_count: int
    description: str

class WhatIfSimulationRequest(BaseModel):
    train_id: str
    target_station: str
    action_type: str  # "reassign_platform", "reduce_dwell", "bypass_disaster"
    new_platform: Optional[int] = None
    dwell_reduction_min: Optional[int] = None

class PNRRequest(BaseModel):
    pnr: str
