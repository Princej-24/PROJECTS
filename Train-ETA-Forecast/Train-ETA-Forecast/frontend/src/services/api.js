/**
 * API Service Client for SIH26028 Frontend
 * Handles REST requests to backend with resilient offline fallback mode
 */

const BASE_URL = 'https://train-eta-forecast.onrender.com/api';

// Offline Mock Fallback Data across All-India Corridors
const MOCK_DATA = {
  trains: [
    // North-East Corridor
    {
      id: "12301",
      number: "12301",
      name: "Howrah Rajdhani Express",
      type: "Superfast Rajdhani",
      corridor: "North-East",
      source: "New Delhi (NDLS)",
      destination: "Howrah Jn (HWH)",
      max_speed: 130,
      telemetry: {
        train_id: "12301",
        lat: 26.6500,
        lng: 79.9800,
        speed_kmh: 105,
        last_station: "NDLS",
        next_station: "CNB",
        current_delay_min: 14,
        status: "In Transit",
        assigned_platform: 2
      },
      schedule: [
        { station_code: "NDLS", scheduled_arr: "16:55", scheduled_dep: "16:55", platform: 9 },
        { station_code: "CNB", scheduled_arr: "21:30", scheduled_dep: "21:35", platform: 2 },
        { station_code: "PRYJ", scheduled_arr: "23:43", scheduled_dep: "23:45", platform: 1 },
        { station_code: "BSB", scheduled_arr: "01:40", scheduled_dep: "01:50", platform: 2 }
      ]
    },
    {
      id: "22436",
      number: "22436",
      name: "Vande Bharat Express",
      type: "Vande Bharat",
      corridor: "North-East",
      source: "New Delhi (NDLS)",
      destination: "Varanasi Jn (BSB)",
      max_speed: 160,
      telemetry: {
        train_id: "22436",
        lat: 25.8000,
        lng: 81.2000,
        speed_kmh: 135,
        last_station: "CNB",
        next_station: "PRYJ",
        current_delay_min: 2,
        status: "In Transit",
        assigned_platform: 2
      },
      schedule: [
        { station_code: "NDLS", scheduled_arr: "06:00", scheduled_dep: "06:00", platform: 16 },
        { station_code: "CNB", scheduled_arr: "10:08", scheduled_dep: "10:10", platform: 1 },
        { station_code: "PRYJ", scheduled_arr: "12:08", scheduled_dep: "12:10", platform: 2 },
        { station_code: "BSB", scheduled_arr: "14:00", scheduled_dep: "14:00", platform: 1 }
      ]
    },
    {
      id: "12401",
      number: "12401",
      name: "Purushottam Express",
      type: "Superfast Express",
      corridor: "North-East",
      source: "New Delhi (NDLS)",
      destination: "Puri (PURI)",
      max_speed: 110,
      telemetry: {
        train_id: "12401",
        lat: 26.4542,
        lng: 80.3500,
        speed_kmh: 0,
        last_station: "CNB",
        next_station: "PRYJ",
        current_delay_min: 42,
        status: "Halted at Platform 4",
        assigned_platform: 4
      },
      schedule: [
        { station_code: "NDLS", scheduled_arr: "22:40", scheduled_dep: "22:40", platform: 8 },
        { station_code: "CNB", scheduled_arr: "04:00", scheduled_dep: "04:05", platform: 4 },
        { station_code: "PRYJ", scheduled_arr: "06:55", scheduled_dep: "07:00", platform: 3 },
        { station_code: "BSB", scheduled_arr: "09:40", scheduled_dep: "09:50", platform: 5 }
      ]
    },

    // Western Corridor
    {
      id: "12951",
      number: "12951",
      name: "Mumbai Rajdhani Express",
      type: "Superfast Rajdhani",
      corridor: "West",
      source: "Mumbai Central (MMCT)",
      destination: "New Delhi (NDLS)",
      max_speed: 130,
      telemetry: {
        train_id: "12951",
        lat: 20.1000,
        lng: 72.8300,
        speed_kmh: 118,
        last_station: "MMCT",
        next_station: "ST",
        current_delay_min: 5,
        status: "In Transit",
        assigned_platform: 1
      },
      schedule: [
        { station_code: "MMCT", scheduled_arr: "17:00", scheduled_dep: "17:00", platform: 1 },
        { station_code: "ST", scheduled_arr: "19:43", scheduled_dep: "19:48", platform: 1 },
        { station_code: "BRC", scheduled_arr: "21:16", scheduled_dep: "21:26", platform: 2 },
        { station_code: "ADI", scheduled_arr: "22:45", scheduled_dep: "22:55", platform: 1 }
      ]
    },
    {
      id: "20901",
      number: "20901",
      name: "Mumbai-Ahmedabad Vande Bharat",
      type: "Vande Bharat",
      corridor: "West",
      source: "Mumbai Central (MMCT)",
      destination: "Gandhinagar Capital",
      max_speed: 160,
      telemetry: {
        train_id: "20901",
        lat: 22.0000,
        lng: 73.1000,
        speed_kmh: 142,
        last_station: "ST",
        next_station: "BRC",
        current_delay_min: 0,
        status: "On Time",
        assigned_platform: 1
      },
      schedule: [
        { station_code: "MMCT", scheduled_arr: "06:00", scheduled_dep: "06:00", platform: 5 },
        { station_code: "ST", scheduled_arr: "08:55", scheduled_dep: "08:58", platform: 3 },
        { station_code: "BRC", scheduled_arr: "10:13", scheduled_dep: "10:18", platform: 1 },
        { station_code: "ADI", scheduled_arr: "11:25", scheduled_dep: "11:30", platform: 2 }
      ]
    },

    // Southern Corridor
    {
      id: "12639",
      number: "12639",
      name: "Brindavan Express",
      type: "Superfast Express",
      corridor: "South",
      source: "Chennai Central (MAS)",
      destination: "KSR Bengaluru (SBC)",
      max_speed: 110,
      telemetry: {
        train_id: "12639",
        lat: 12.9800,
        lng: 78.5000,
        speed_kmh: 85,
        last_station: "KPD",
        next_station: "SBC",
        current_delay_min: 18,
        status: "In Transit",
        assigned_platform: 4
      },
      schedule: [
        { station_code: "MAS", scheduled_arr: "07:40", scheduled_dep: "07:40", platform: 8 },
        { station_code: "KPD", scheduled_arr: "09:38", scheduled_dep: "09:40", platform: 1 },
        { station_code: "SBC", scheduled_arr: "13:40", scheduled_dep: "13:40", platform: 4 }
      ]
    },

    // Central Corridor
    {
      id: "12002",
      number: "12002",
      name: "Bhopal Shatabdi Express",
      type: "Shatabdi Express",
      corridor: "Central",
      source: "New Delhi (NDLS)",
      destination: "Rani Kamlapati (RKMP)",
      max_speed: 150,
      telemetry: {
        train_id: "12002",
        lat: 25.5000,
        lng: 77.8000,
        speed_kmh: 140,
        last_station: "AGC",
        next_station: "BPL",
        current_delay_min: 8,
        status: "In Transit",
        assigned_platform: 1
      },
      schedule: [
        { station_code: "NDLS", scheduled_arr: "06:00", scheduled_dep: "06:00", platform: 1 },
        { station_code: "AGC", scheduled_arr: "07:50", scheduled_dep: "07:55", platform: 1 },
        { station_code: "BPL", scheduled_arr: "14:05", scheduled_dep: "14:15", platform: 1 }
      ]
    }
  ],
  stations: [
    { id: "NDLS", code: "NDLS", name: "New Delhi", lat: 28.6143, lng: 77.2182, platforms: 16, corridor: "North-East", distance_km: 0 },
    { id: "CNB", code: "CNB", name: "Kanpur Central", lat: 26.4542, lng: 80.3500, platforms: 10, corridor: "North-East", distance_km: 440 },
    { id: "PRYJ", code: "PRYJ", name: "Prayagraj", lat: 25.4358, lng: 81.8463, platforms: 10, corridor: "North-East", distance_km: 634 },
    { id: "BSB", code: "BSB", name: "Banaras", lat: 25.3176, lng: 82.9739, platforms: 9, corridor: "North-East", distance_km: 759 },
    { id: "PNBE", code: "PNBE", name: "Patna Junction", lat: 25.6093, lng: 85.1235, platforms: 10, corridor: "North-East", distance_km: 990 },
    { id: "GHY", code: "GHY", name: "Guwahati", lat: 26.1806, lng: 91.7539, platforms: 7, corridor: "North-East", distance_km: 1860 },
    
    { id: "MMCT", code: "MMCT", name: "Mumbai Central", lat: 18.9696, lng: 72.8193, platforms: 9, corridor: "West", distance_km: 0 },
    { id: "ST", code: "ST", name: "Surat", lat: 21.2049, lng: 72.8406, platforms: 4, corridor: "West", distance_km: 263 },
    { id: "BRC", code: "BRC", name: "Vadodara", lat: 22.3107, lng: 73.1812, platforms: 7, corridor: "West", distance_km: 392 },
    { id: "ADI", code: "ADI", name: "Ahmedabad", lat: 23.0225, lng: 72.5714, platforms: 12, corridor: "West", distance_km: 491 },

    { id: "MAS", code: "MAS", name: "Chennai Central", lat: 13.0827, lng: 80.2707, platforms: 12, corridor: "South", distance_km: 0 },
    { id: "KPD", code: "KPD", name: "Katpadi", lat: 12.9702, lng: 79.1378, platforms: 5, corridor: "South", distance_km: 130 },
    { id: "SBC", code: "SBC", name: "KSR Bengaluru", lat: 12.9784, lng: 77.5684, platforms: 10, corridor: "South", distance_km: 356 },

    { id: "AGC", code: "AGC", name: "Agra Cantt", lat: 27.1593, lng: 78.0063, platforms: 6, corridor: "Central", distance_km: 195 },
    { id: "BPL", code: "BPL", name: "Bhopal", lat: 23.2599, lng: 77.4126, platforms: 6, corridor: "Central", distance_km: 701 }
  ],
  hazards: [
    {
      id: "DISASTER-01",
      section: "CNB-PRYJ Section",
      start_station: "CNB",
      end_station: "PRYJ",
      hazard_type: "Torrential Rain & Waterlogging",
      severity: "HIGH",
      speed_cap_kmh: 45,
      affected_trains_count: 3,
      description: "Kanpur-Fatehpur belt automatic signals forced to caution aspect."
    },
    {
      id: "DISASTER-02",
      section: "PRYJ-BSB Section",
      start_station: "PRYJ",
      end_station: "BSB",
      hazard_type: "Dense Fog Hazard Zone",
      severity: "MEDIUM",
      speed_cap_kmh: 30,
      affected_trains_count: 2,
      description: "Visibility restricted below 50 meters near Handia Khas."
    }
  ]
};

export async function fetchTrains(corridor) {
  try {
    const url = corridor && corridor !== 'All' ? `${BASE_URL}/trains?corridor=${corridor}` : `${BASE_URL}/trains`;
    const res = await fetch(url);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Backend API offline, using mock trains data");
  }

  if (corridor && corridor !== 'All') {
    return MOCK_DATA.trains.filter(t => t.corridor === corridor);
  }
  return MOCK_DATA.trains;
}

export async function fetchStations(corridor) {
  try {
    const url = corridor && corridor !== 'All' ? `${BASE_URL}/trains/stations?corridor=${corridor}` : `${BASE_URL}/trains/stations`;
    const res = await fetch(url);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Backend API offline, using mock stations data");
  }

  if (corridor && corridor !== 'All') {
    return MOCK_DATA.stations.filter(s => s.corridor === corridor);
  }
  return MOCK_DATA.stations;
}

export async function fetchPrediction(trainQuery) {
  try {
    const res = await fetch(`${BASE_URL}/predict/${trainQuery}`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Backend API offline, computing mock dynamic prediction");
  }
  
  // Find or generate dynamic mock train
  let train = MOCK_DATA.trains.find(t => t.id === trainQuery || t.number === trainQuery || t.name.toLowerCase().includes(String(trainQuery).toLowerCase()));
  if (!train) {
    const num = String(trainQuery).replace(/\D/g, '') || "12999";
    train = {
      id: num,
      number: num,
      name: `Express Train (${num})`,
      type: "Superfast Express",
      corridor: "All India",
      source: "New Delhi (NDLS)",
      destination: "Kolkata / Mumbai / Chennai",
      max_speed: 110,
      telemetry: { current_delay_min: 12, status: "In Transit", assigned_platform: 2 },
      schedule: [
        { station_code: "NDLS", scheduled_arr: "08:00", scheduled_dep: "08:00", platform: 4 },
        { station_code: "CNB", scheduled_arr: "13:15", scheduled_dep: "13:20", platform: 2 },
        { station_code: "PRYJ", scheduled_arr: "15:45", scheduled_dep: "15:50", platform: 1 },
        { station_code: "BSB", scheduled_arr: "18:30", scheduled_dep: "18:40", platform: 3 }
      ]
    };
  }

  const delay = train.telemetry ? train.telemetry.current_delay_min : 10;
  
  let cascading = 0;
  let cascading_reason = "Clear station block entry signal";
  if (train.id === "12582") {
    cascading = 18;
    cascading_reason = "Train 12401 occupying CNB Platform 4 -> Outer Signal Hold (1.5 km back)";
  }

  const total = delay + cascading + 8;

  return {
    train_id: train.id,
    train_number: train.number,
    train_name: train.name,
    current_delay_min: delay,
    predicted_additional_delay: cascading + 8,
    total_predicted_delay: total,
    confidence_score: Math.max(68, 96 - Math.floor(total / 5)),
    uncertainty_range_min: Math.max(2, Math.ceil(total * 0.12)),
    weather_warning: "Heavy Downpour detected in Kanpur section -> Speed restricted to 45 km/h",
    cascading_lockup_warning: cascading_reason,
    shap_breakdown: [
      { factor: "Prior Station Delay", percentage: Math.round((delay / total) * 100) || 50, minutes: delay },
      { factor: "Disaster / Weather Restr.", percentage: 25, minutes: 12 },
      { factor: "Signal & Platform Congestion", percentage: Math.round((cascading / total) * 100) || 15, minutes: cascading },
      { factor: "Station Dwell Overhead", percentage: 10, minutes: 5 }
    ],
    station_predictions: (train.schedule || []).map(s => ({
      station_code: s.station_code,
      station_name: s.station_code === 'NDLS' ? 'New Delhi' : s.station_code === 'CNB' ? 'Kanpur Central' : s.station_code === 'PRYJ' ? 'Prayagraj' : s.station_code === 'BSB' ? 'Banaras' : s.station_code,
      scheduled_arr: s.scheduled_arr,
      predicted_delay_min: total,
      predicted_eta_window: `${s.scheduled_arr} (+${total}m ±4m)`,
      platform_predicted: s.platform,
      risk_level: total > 40 ? "CRITICAL" : total > 15 ? "HIGH" : "LOW"
    }))
  };
}

export async function fetchHazards() {
  try {
    const res = await fetch(`${BASE_URL}/disaster/hazards`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Backend API offline, using mock disaster hazards");
  }
  return MOCK_DATA.hazards;
}

export async function checkPNR(pnrNumber) {
  try {
    const res = await fetch(`${BASE_URL}/pnr/${pnrNumber}`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Backend API offline, computing mock PNR prediction");
  }
  
  return {
    pnr: pnrNumber,
    train_number: "12301",
    train_name: "Howrah Rajdhani Express",
    journey_date: "2026-08-25",
    from_station: "NDLS",
    to_station: "BSB",
    class: "3A",
    passengers: [
      { name: "Aman Kumar", booking_status: "WL 14", current_status: "WL 3", predicted_status: "CNF (Confirmed)" }
    ],
    confirmation_probability: 94,
    predicted_platform: "Platform 2"
  };
}

export async function simulateWhatIf(req) {
  try {
    const res = await fetch(`${BASE_URL}/whatif/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req)
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Backend API offline, using mock what-if calculation");
  }

  return {
    status: "success",
    train_id: req.train_id,
    action: req.action_type === "reassign_platform" 
      ? `Reassigned platform to Platform ${req.new_platform || 3}`
      : `Dwell time reduced by ${req.dwell_reduction_min || 5} minutes at Kanpur Central`,
    original_network_delay: 55,
    simulated_network_delay: 37,
    delay_recovered_min: 18,
    network_benefit: "Cleared 1.5 km outer signal hold for trailing Train 12582"
  };
}
