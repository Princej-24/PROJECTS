"""
Real-time Train Movement & Operational Simulator Engine
Handles telemetry updates, block section occupancy, and what-if dispatch simulations.
"""
from app.database import LIVE_TELEMETRY, WEATHER_DISRUPTIONS, TRAINS

class RailwaySimulator:
    @staticmethod
    def simulate_telemetry_step():
        """Simulate realistic slight movement for active trains"""
        for t_id, data in LIVE_TELEMETRY.items():
            if data["speed_kmh"] > 0:
                # Move slightly east along latitude/longitude corridor
                data["lat"] -= 0.002
                data["lng"] += 0.005

    @staticmethod
    def run_whatif_simulation(train_id: str, action_type: str, new_platform: int = None, dwell_reduction_min: int = 5):
        telemetry = LIVE_TELEMETRY.get(train_id)
        if not telemetry:
            return {"status": "error", "message": "Train telemetry missing"}

        original_delay = telemetry["current_delay_min"]
        
        if action_type == "reassign_platform":
            # Reassigning platform relieves signal hold for downstream trains
            recovered_min = 14
            new_delay = max(0, original_delay - recovered_min)
            return {
                "status": "success",
                "train_id": train_id,
                "action": f"Reassigned platform to Platform {new_platform or 3}",
                "original_network_delay": original_delay,
                "simulated_network_delay": new_delay,
                "delay_recovered_min": recovered_min,
                "network_benefit": "Outer signal hold cleared for trailing train 12582"
            }
        elif action_type == "reduce_dwell":
            recovered_min = dwell_reduction_min or 5
            new_delay = max(0, original_delay - recovered_min)
            return {
                "status": "success",
                "train_id": train_id,
                "action": f"Dwell time reduced by {recovered_min} minutes at Kanpur Central",
                "original_network_delay": original_delay,
                "simulated_network_delay": new_delay,
                "delay_recovered_min": recovered_min,
                "network_benefit": "Section throughput increased by 12%"
            }
        else:
            return {"status": "error", "message": "Unknown what-if action"}
