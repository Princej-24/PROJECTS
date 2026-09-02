"""
Expanded All-India Railway Network Dataset & Dynamic Train Generator
Corridors:
1. Northern-Eastern: New Delhi (NDLS) -> Kanpur (CNB) -> Prayagraj (PRYJ) -> Banaras (BSB) -> Patna (PNBE) -> Guwahati (GHY)
2. Western Corridor: Mumbai Central (MMCT) -> Surat (ST) -> Vadodara (BRC) -> Ahmedabad (ADI)
3. Southern Corridor: Chennai Central (MAS) -> Katpadi (KPD) -> Bengaluru (SBC) -> Mysuru (MYS)
4. Central Corridor: New Delhi (NDLS) -> Agra (AGC) -> Bhopal (BPL) -> Nagpur (NGP) -> Secunderabad (SC)
"""

# All-India Major Stations Database
STATIONS = [
  # Northern-Eastern Line
  {"id": "NDLS", "code": "NDLS", "name": "New Delhi", "lat": 28.6143, "lng": 77.2182, "platforms": 16, "corridor": "North-East", "distance_km": 0},
  {"id": "CNB", "code": "CNB", "name": "Kanpur Central", "lat": 26.4542, "lng": 80.3500, "platforms": 10, "corridor": "North-East", "distance_km": 440},
  {"id": "PRYJ", "code": "PRYJ", "name": "Prayagraj Jn", "lat": 25.4358, "lng": 81.8463, "platforms": 10, "corridor": "North-East", "distance_km": 634},
  {"id": "BSB", "code": "BSB", "name": "Varanasi (BSB)", "lat": 25.3176, "lng": 82.9739, "platforms": 9, "corridor": "North-East", "distance_km": 759},
  {"id": "PNBE", "code": "PNBE", "name": "Patna Junction", "lat": 25.6093, "lng": 85.1235, "platforms": 10, "corridor": "North-East", "distance_km": 990},
  {"id": "GHY", "code": "GHY", "name": "Guwahati", "lat": 26.1806, "lng": 91.7539, "platforms": 7, "corridor": "North-East", "distance_km": 1860},

  # Western Line
  {"id": "MMCT", "code": "MMCT", "name": "Mumbai Central", "lat": 18.9696, "lng": 72.8193, "platforms": 9, "corridor": "West", "distance_km": 0},
  {"id": "ST", "code": "ST", "name": "Surat", "lat": 21.2049, "lng": 72.8406, "platforms": 4, "corridor": "West", "distance_km": 263},
  {"id": "BRC", "code": "BRC", "name": "Vadodara Jn", "lat": 22.3107, "lng": 73.1812, "platforms": 7, "corridor": "West", "distance_km": 392},
  {"id": "ADI", "code": "ADI", "name": "Ahmedabad Jn", "lat": 23.0225, "lng": 72.5714, "platforms": 12, "corridor": "West", "distance_km": 491},

  # Southern Line
  {"id": "MAS", "code": "MAS", "name": "Chennai Central", "lat": 13.0827, "lng": 80.2707, "platforms": 12, "corridor": "South", "distance_km": 0},
  {"id": "KPD", "code": "KPD", "name": "Katpadi Jn", "lat": 12.9702, "lng": 79.1378, "platforms": 5, "corridor": "South", "distance_km": 130},
  {"id": "SBC", "code": "SBC", "name": "KSR Bengaluru", "lat": 12.9784, "lng": 77.5684, "platforms": 10, "corridor": "South", "distance_km": 356},

  # Central Line
  {"id": "AGC", "code": "AGC", "name": "Agra Cantt", "lat": 27.1593, "lng": 78.0063, "platforms": 6, "corridor": "Central", "distance_km": 195},
  {"id": "BPL", "code": "BPL", "name": "Bhopal Junction", "lat": 23.2599, "lng": 77.4126, "platforms": 6, "corridor": "Central", "distance_km": 701}
]

# Expanded Multi-Corridor Trains with Passenger Relief Estimates
TRAINS = [
    {
        "id": "12345",
        "number": "12345",
        "name": "Guwahati Rajdhani Express",
        "type": "Superfast Rajdhani",
        "loco": "HWH WAP-7",
        "corridor": "North-East",
        "source": "NDLS",
        "destination": "GHY",
        "max_speed": 130,
        "passenger_impact": {
            "total_passengers": 1126,
            "vulnerable_passengers": 128,
            "food_packets_req": 1126,
            "water_liters_req": 2252,
            "medical_kits_req": 25,
            "shelter_capacity_req": 1200
        },
        "schedule": [
            {"station_code": "NDLS", "scheduled_arr": "16:55", "scheduled_dep": "16:55", "platform": 9},
            {"station_code": "CNB", "scheduled_arr": "21:30", "scheduled_dep": "21:35", "platform": 2},
            {"station_code": "PRYJ", "scheduled_arr": "23:43", "scheduled_dep": "23:45", "platform": 1},
            {"station_code": "BSB", "scheduled_arr": "01:40", "scheduled_dep": "01:50", "platform": 2},
            {"station_code": "PNBE", "scheduled_arr": "05:15", "scheduled_dep": "05:25", "platform": 1},
            {"station_code": "GHY", "scheduled_arr": "20:30", "scheduled_dep": "20:30", "platform": 3}
        ]
    },
    {
        "id": "12951",
        "number": "12951",
        "name": "Mumbai Rajdhani Express",
        "type": "Superfast Rajdhani",
        "loco": "BRC WAP-7",
        "corridor": "West",
        "source": "MMCT",
        "destination": "NDLS",
        "max_speed": 130,
        "passenger_impact": {
            "total_passengers": 980,
            "vulnerable_passengers": 84,
            "food_packets_req": 980,
            "water_liters_req": 1960,
            "medical_kits_req": 18,
            "shelter_capacity_req": 1000
        },
        "schedule": [
            {"station_code": "MMCT", "scheduled_arr": "17:00", "scheduled_dep": "17:00", "platform": 1},
            {"station_code": "ST", "scheduled_arr": "19:43", "scheduled_dep": "19:48", "platform": 1},
            {"station_code": "BRC", "scheduled_arr": "21:16", "scheduled_dep": "21:26", "platform": 2},
            {"station_code": "ADI", "scheduled_arr": "22:45", "scheduled_dep": "22:55", "platform": 1}
        ]
    },
    {
        "id": "12401",
        "number": "12401",
        "name": "Purushottam Express",
        "type": "Superfast Express",
        "loco": "BKN WAP-4",
        "corridor": "North-East",
        "source": "BKN",
        "destination": "ASR",
        "max_speed": 110,
        "passenger_impact": {
            "total_passengers": 1420,
            "vulnerable_passengers": 195,
            "food_packets_req": 1420,
            "water_liters_req": 2840,
            "medical_kits_req": 35,
            "shelter_capacity_req": 1500
        },
        "schedule": [
            {"station_code": "NDLS", "scheduled_arr": "22:40", "scheduled_dep": "22:40", "platform": 8},
            {"station_code": "CNB", "scheduled_arr": "04:00", "scheduled_dep": "04:05", "platform": 4},
            {"station_code": "PRYJ", "scheduled_arr": "06:55", "scheduled_dep": "07:00", "platform": 3},
            {"station_code": "BSB", "scheduled_arr": "09:40", "scheduled_dep": "09:50", "platform": 5}
        ]
    },
    {
        "id": "12618",
        "number": "12618",
        "name": "Mangala Lakshadweep Express",
        "type": "Superfast Express",
        "loco": "ED WAP-7",
        "corridor": "South",
        "source": "MAS",
        "destination": "NDLS",
        "max_speed": 110,
        "passenger_impact": {
            "total_passengers": 1250,
            "vulnerable_passengers": 110,
            "food_packets_req": 1250,
            "water_liters_req": 2500,
            "medical_kits_req": 22,
            "shelter_capacity_req": 1300
        },
        "schedule": [
            {"station_code": "MAS", "scheduled_arr": "07:40", "scheduled_dep": "07:40", "platform": 8},
            {"station_code": "KPD", "scheduled_arr": "09:38", "scheduled_dep": "09:40", "platform": 1},
            {"station_code": "SBC", "scheduled_arr": "13:40", "scheduled_dep": "13:40", "platform": 4}
        ]
    },
    {
        "id": "20823",
        "number": "20823",
        "name": "Puri-Sainagar Shirdi Express",
        "type": "Superfast Express",
        "loco": "SRC WAP-7",
        "corridor": "Central",
        "source": "RNC",
        "destination": "BBS",
        "max_speed": 110,
        "passenger_impact": {
            "total_passengers": 890,
            "vulnerable_passengers": 72,
            "food_packets_req": 890,
            "water_liters_req": 1780,
            "medical_kits_req": 15,
            "shelter_capacity_req": 900
        },
        "schedule": [
            {"station_code": "NDLS", "scheduled_arr": "06:00", "scheduled_dep": "06:00", "platform": 1},
            {"station_code": "AGC", "scheduled_arr": "07:50", "scheduled_dep": "07:55", "platform": 1},
            {"station_code": "BPL", "scheduled_arr": "14:05", "scheduled_dep": "14:15", "platform": 1}
        ]
    }
]

# Initial Live Telemetry Mock for RAILGUARD Dashboard
LIVE_TELEMETRY = {
    "12345": {
        "train_id": "12345",
        "lat": 25.4358,
        "lng": 81.8463,
        "speed_kmh": 68,
        "distance_covered_km": 612,
        "distance_to_dest_km": 734,
        "last_station": "CNB",
        "next_station": "Prayagraj Jn.",
        "next_station_eta": "12:18 PM",
        "current_delay_min": 20,
        "status_badge": "ON TIME",
        "status_color": "green",
        "status": "Approaching High-Risk Flood Zone",
        "assigned_platform": 1
    },
    "12951": {
        "train_id": "12951",
        "lat": 21.2049,
        "lng": 72.8406,
        "speed_kmh": 92,
        "distance_covered_km": 263,
        "distance_to_dest_km": 1120,
        "last_station": "MMCT",
        "next_station": "Surat (ST)",
        "next_station_eta": "11:15 AM",
        "current_delay_min": 35,
        "status_badge": "DELAYED",
        "status_color": "yellow",
        "status": "In Transit",
        "assigned_platform": 1
    },
    "12401": {
        "train_id": "12401",
        "lat": 26.4542,
        "lng": 80.3500,
        "speed_kmh": 0,
        "distance_covered_km": 440,
        "distance_to_dest_km": 550,
        "last_station": "CNB",
        "next_station": "Prayagraj Jn.",
        "next_station_eta": "06:20 PM",
        "current_delay_min": 87,
        "status_badge": "HIGH RISK",
        "status_color": "red",
        "status": "Halted at Outer Signal (Platform Lockup)",
        "assigned_platform": 4
    },
    "12618": {
        "train_id": "12618",
        "lat": 13.0827,
        "lng": 80.2707,
        "speed_kmh": 105,
        "distance_covered_km": 130,
        "distance_to_dest_km": 2100,
        "last_station": "MAS",
        "next_station": "Katpadi (KPD)",
        "next_station_eta": "02:10 PM",
        "current_delay_min": 5,
        "status_badge": "ON TIME",
        "status_color": "green",
        "status": "In Transit",
        "assigned_platform": 2
    },
    "20823": {
        "train_id": "20823",
        "lat": 23.2599,
        "lng": 77.4126,
        "speed_kmh": 115,
        "distance_covered_km": 701,
        "distance_to_dest_km": 600,
        "last_station": "BPL",
        "next_station": "Nagpur (NGP)",
        "next_station_eta": "01:05 PM",
        "current_delay_min": 0,
        "status_badge": "RUNNING",
        "status_color": "cyan",
        "status": "On Time",
        "assigned_platform": 1
    }
}

# Weather Hazards & Operational Alert Database
WEATHER_DISRUPTIONS = [
    {
        "id": "DISASTER-01",
        "section": "Ganga Basin (Prayagraj - Varanasi)",
        "start_station": "PRYJ",
        "end_station": "BSB",
        "hazard_type": "Severe Flood Warning",
        "severity": "HIGH",
        "speed_cap_kmh": 45,
        "affected_trains_count": 3,
        "description": "Severe Flooding expected in Prayagraj-Varanasi section in next 2-3 hours. High Delay Probability.",
        "valid_till": "12:30 PM, 24 May"
    },
    {
        "id": "DISASTER-02",
        "section": "North East (Uttar Pradesh - Bihar)",
        "start_station": "CNB",
        "end_station": "PNBE",
        "hazard_type": "Heavy Rain Alert",
        "severity": "MEDIUM",
        "speed_cap_kmh": 60,
        "affected_trains_count": 4,
        "description": "Torrential rain in Kanpur-Fatehpur belt causing automatic signal slowdowns.",
        "valid_till": "03:00 PM, 24 May"
    },
    {
        "id": "DISASTER-03",
        "section": "North East (Assam, Arunachal)",
        "start_station": "PNBE",
        "end_station": "GHY",
        "hazard_type": "Landslide Watch",
        "severity": "LOW",
        "speed_cap_kmh": 50,
        "affected_trains_count": 2,
        "description": "Slope instability detected near Lumding section.",
        "valid_till": "11:00 PM, 24 May"
    }
]

# Universal Dynamic Train Synthesizer Function
def get_or_create_train(query: str):
    q = str(query).strip().upper()
    found = next((t for t in TRAINS if t["id"] == q or t["number"] == q or q in t["name"].upper()), None)
    if found:
        return found
    
    clean_num = ''.join(c for c in q if c.isdigit()) or "12999"
    synth_train = {
        "id": clean_num,
        "number": clean_num,
        "name": f"Express ({clean_num})",
        "type": "Superfast Express",
        "loco": "SRC WAP-7",
        "corridor": "All India",
        "source": "NDLS",
        "destination": "GHY",
        "max_speed": 110,
        "passenger_impact": {
            "total_passengers": 1050,
            "vulnerable_passengers": 95,
            "food_packets_req": 1050,
            "water_liters_req": 2100,
            "medical_kits_req": 20,
            "shelter_capacity_req": 1100
        },
        "schedule": [
            {"station_code": "NDLS", "scheduled_arr": "08:00", "scheduled_dep": "08:00", "platform": 4},
            {"station_code": "CNB", "scheduled_arr": "13:15", "scheduled_dep": "13:20", "platform": 2},
            {"station_code": "PRYJ", "scheduled_arr": "15:45", "scheduled_dep": "15:50", "platform": 1},
            {"station_code": "BSB", "scheduled_arr": "18:30", "scheduled_dep": "18:40", "platform": 3}
        ]
    }
    
    if clean_num not in LIVE_TELEMETRY:
        LIVE_TELEMETRY[clean_num] = {
            "train_id": clean_num,
            "lat": 26.5000,
            "lng": 80.2000,
            "speed_kmh": 98,
            "distance_covered_km": 500,
            "distance_to_dest_km": 600,
            "last_station": "NDLS",
            "next_station": "Kanpur Central",
            "next_station_eta": "01:15 PM",
            "current_delay_min": 12,
            "status_badge": "ON TIME",
            "status_color": "green",
            "status": "In Transit",
            "assigned_platform": 2
        }
    TRAINS.append(synth_train)
    return synth_train

# PNR Database Mock
PNR_DB = {
    "8420194821": {
        "pnr": "8420194821",
        "train_number": "12345",
        "train_name": "Guwahati Rajdhani Express",
        "journey_date": "2026-08-25",
        "from_station": "NDLS",
        "to_station": "GHY",
        "class": "3A",
        "passengers": [
            {"name": "Aman Kumar", "booking_status": "WL 14", "current_status": "WL 3", "predicted_status": "CNF (Confirmed)"}
        ],
        "confirmation_probability": 94,
        "predicted_platform": "Platform 1"
    }
}
