from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/api/auth", tags=["Auth"])

class LoginRequest(BaseModel):
    username: str
    password: str
    role: str  # "citizen" or "official"

@router.post("/login")
def login(req: LoginRequest):
    if req.role == "official":
        if req.username == "railway" and req.password == "sih2026":
            return {
                "token": "railway-official-jwt-token-sih2026",
                "role": "official",
                "user": {"name": "Chief Dispatcher (CNB Division)", "designation": "Railway Operations Control"}
            }
        else:
            raise HTTPException(status_code=401, detail="Invalid Official credentials (Try: railway / sih2026)")
    else:
        # Citizen login accepts any non-empty user
        return {
            "token": "citizen-jwt-token-sih2026",
            "role": "citizen",
            "user": {"name": req.username or "Passenger User", "designation": "Citizen / Commuter"}
        }
