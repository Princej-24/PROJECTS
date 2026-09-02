import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { Compass, Filter } from 'lucide-react';

// Natural Railway Corridor Geometries with Natural Segment Intermediate Points
const CORRIDOR_ROUTES = {
  'North-East': [
    [28.6143, 77.2182], // NDLS
    [27.8920, 78.0700], // Aligarh
    [27.2000, 78.2300], // Tundla
    [26.7760, 79.0270], // Etawah
    [26.4542, 80.3500], // CNB
    [25.9280, 80.8060], // Fatehpur
    [25.4358, 81.8463], // PRYJ
    [25.3410, 82.4180], // Gyanpur
    [25.3176, 82.9739], // BSB
    [25.5642, 83.9785], // Buxar
    [25.5562, 84.6644], // Ara
    [25.6093, 85.1235], // PNBE (Patna Jn)
    [25.3789, 86.4764], // Katihar/Munger
    [26.7125, 88.4312], // New Jalpaiguri (NJP)
    [26.1806, 91.7539]  // GHY (Guwahati)
  ],
  'West': [
    [18.9696, 72.8193], // MMCT
    [20.3800, 72.9000], // Vapi
    [21.2049, 72.8406], // ST
    [21.7050, 72.9900], // Bharuch
    [22.3107, 73.1812], // BRC
    [22.6900, 72.8600], // Nadiad
    [23.0225, 72.5714], // ADI
    [23.3315, 75.0367], // Ratlam
    [23.1765, 75.7885], // Ujjain
    [23.2599, 77.4126]  // BPL (Connecting West to Central Line)
  ],
  'South': [
    [13.0827, 80.2707], // MAS
    [13.0780, 79.6670], // Arakkonam
    [12.9702, 79.1378], // KPD
    [12.5600, 78.5700], // Jolarpettai
    [12.9800, 78.1700], // Bangarapet
    [12.9784, 77.5684]  // SBC
  ],
  'Central': [
    [28.6143, 77.2182], // NDLS
    [27.1593, 78.0063], // AGC
    [26.2180, 78.1820], // Gwalior
    [25.4480, 78.5680], // Jhansi
    [24.1800, 78.1800], // Bina
    [23.2599, 77.4126]  // BPL
  ]
};

// Hazard Specific Sub-routes for Risk Styling
const HAZARD_ROUTES = [
  {
    id: "CNB-PRYJ-HAZARD",
    severity: "HIGH",
    coords: [
      [26.4542, 80.3500], // CNB
      [25.9280, 80.8060], // Fatehpur
      [25.4358, 81.8463]  // PRYJ
    ]
  },
  {
    id: "PRYJ-BSB-HAZARD",
    severity: "MEDIUM",
    coords: [
      [25.4358, 81.8463], // PRYJ
      [25.3410, 82.4180], // Gyanpur
      [25.3176, 82.9739]  // BSB
    ]
  }
];

// Custom Train Marker - Compact Circular Neumorphic Marker
const createTrainIcon = (color, number, isSelected) => {
  const outerBorder = isSelected ? `3px solid ${color}` : `2px solid ${color}`;
  const size = isSelected ? 32 : 28;
  const shadow = '3px 3px 8px rgba(120,130,140,.25), -3px -3px 8px rgba(255,255,255,.9)';

  return L.divIcon({
    className: 'custom-train-marker-wrapper',
    html: `
      <div style="
        background: #F7F9FA;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: ${outerBorder};
        box-shadow: ${shadow};
        display: flex;
        align-items: center;
        justify-content: center;
        color: #10243E;
        font-weight: 800;
        font-size: 0.8rem;
        cursor: pointer;
      ">
        🚆
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
};

// Custom Station Marker - Raised Neumorphic Chip with High Contrast & Accent Dot
const createStationIcon = (code, name, isSelected, hazardStatus) => {
  let accentColor = '#159A68'; // Normal green
  if (hazardStatus === 'HIGH') accentColor = '#D92D20';
  else if (hazardStatus === 'MEDIUM') accentColor = '#F2A11B';
  else if (isSelected) accentColor = '#0B8F68';

  const bg = isSelected ? '#E1F3EC' : '#F4F6F8';
  const borderColor = isSelected ? 'rgba(11,143,104,0.45)' : 'rgba(255,255,255,0.85)';
  const shadow = '4px 4px 9px rgba(120,130,140,.28), -4px -4px 9px rgba(255,255,255,.95)';

  return L.divIcon({
    className: 'custom-station-marker',
    html: `
      <div style="
        background: ${bg};
        color: #10243E;
        border-radius: 9px;
        border: 1px solid ${borderColor};
        box-shadow: ${shadow};
        padding: 3px 8px;
        font-family: Inter, system-ui, -apple-system, sans-serif;
        font-weight: 700;
        font-size: 0.72rem;
        display: flex;
        align-items: center;
        gap: 6px;
        white-space: nowrap;
        cursor: pointer;
      ">
        <span style="
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: ${accentColor};
          display: inline-block;
          flex-shrink: 0;
        "></span>
        <span>${code}</span>
      </div>
    `,
    iconSize: [64, 22],
    iconAnchor: [32, 11]
  });
};

export default function LiveTrainMap({ trains = [], stations = [], hazards = [], selectedTrainId, onSelectTrain, selectedCorridor, onSelectCorridor }) {
  const filteredTrains = selectedCorridor && selectedCorridor !== 'All'
    ? trains.filter(t => t.corridor === selectedCorridor)
    : trains;

  const filteredStations = selectedCorridor && selectedCorridor !== 'All'
    ? stations.filter(s => s.corridor === selectedCorridor)
    : stations;

  // Active Corridors to render based on selection filter
  const corridorsToRender = selectedCorridor && selectedCorridor !== 'All'
    ? [selectedCorridor]
    : Object.keys(CORRIDOR_ROUTES);

  // Dynamic Map Center based on Corridor
  let mapCenter = [22.5937, 78.9629]; // All India Center
  let zoomLevel = 5;

  if (selectedCorridor === 'North-East') {
    mapCenter = [26.2542, 80.3500];
    zoomLevel = 6;
  } else if (selectedCorridor === 'West') {
    mapCenter = [21.0000, 73.0000];
    zoomLevel = 7;
  } else if (selectedCorridor === 'South') {
    mapCenter = [12.9700, 78.5000];
    zoomLevel = 7;
  } else if (selectedCorridor === 'Central') {
    mapCenter = [25.0000, 78.0000];
    zoomLevel = 6;
  }

  // Get selected train object for station highlighting
  const selectedTrainObj = trains.find(t => t.id === selectedTrainId);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Compass size={16} color="#0B8F68" style={{ flexShrink: 0 }} />
          <h3 style={{ fontSize: '0.9rem', fontWeight: 800, margin: 0, color: '#10243E' }}>Geospatial Railway Map</h3>
        </div>

        {/* Corridor Selection Filter Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100%', maxWidth: '320px' }}>
          <Filter size={13} color="#5D6B7A" style={{ flexShrink: 0 }} />
          <select
            value={selectedCorridor || 'All'}
            onChange={(e) => onSelectCorridor(e.target.value)}
            style={{
              background: 'var(--bg-dark)',
              color: '#10243E',
              padding: '6px 10px',
              borderRadius: '10px',
              fontSize: '0.75rem',
              fontWeight: 700,
              width: '100%',
              boxSizing: 'border-box',
              border: 'none',
              boxShadow: 'var(--shadow-inset)'
            }}
          >
            <option value="All">🌐 All India Network</option>
            <option value="North-East">📍 Northern-Eastern Corridor</option>
            <option value="West">📍 Western Corridor</option>
            <option value="South">📍 Southern Corridor</option>
            <option value="Central">📍 Central Corridor</option>
          </select>
        </div>
      </div>

      <div style={{ width: '100%', height: 'calc(100% - 44px)', borderRadius: '14px', overflow: 'hidden', position: 'relative' }}>
        <MapContainer center={mapCenter} zoom={zoomLevel} key={`${selectedCorridor}-${zoomLevel}`} scrollWheelZoom={true} style={{ width: '100%', height: '100%' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap &copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {/* Refined Thin Dashed Railway Corridor Routes */}
          {corridorsToRender.map(corrKey => {
            const coords = CORRIDOR_ROUTES[corrKey];
            if (!coords) return null;
            return (
              <Polyline
                key={`corr-${corrKey}`}
                positions={coords}
                color="#0B8F68"
                weight={2}
                opacity={0.8}
                dashArray="6, 6"
              />
            );
          })}

          {/* High-Risk / Watch Route Segments (Refined Thin Polyline Overlay) */}
          {HAZARD_ROUTES.map(hr => {
            const color = hr.severity === 'HIGH' ? '#D92D20' : '#F2A11B';
            return (
              <Polyline
                key={hr.id}
                positions={hr.coords}
                color={color}
                weight={2.5}
                opacity={0.85}
                dashArray="6, 6"
              />
            );
          })}

          {/* Weather & Disaster Warning Sector Circles */}
          {hazards.map((h, idx) => {
            const isHigh = h.severity === 'HIGH';
            return (
              <Circle
                key={idx}
                center={h.start_station === 'CNB' ? [26.2, 80.8] : h.start_station === 'ST' ? [21.5, 73.0] : [25.35, 82.3]}
                radius={isHigh ? 35000 : 22000}
                pathOptions={{
                  color: isHigh ? '#D92D20' : '#F2A11B',
                  fillColor: isHigh ? '#D92D20' : '#F2A11B',
                  fillOpacity: 0.15,
                  weight: 1
                }}
              >
                <Tooltip direction="top" offset={[0, -8]}>
                  ⚠️ {h.hazard_type} ({h.speed_cap_kmh} km/h speed cap)
                </Tooltip>
              </Circle>
            );
          })}

          {/* Station Markers with Raised Neumorphic Chips & Contrast Text */}
          {filteredStations.map(st => {
            const hazard = hazards.find(h => h.start_station === st.code || h.end_station === st.code);
            const hazardStatus = hazard ? hazard.severity : 'NORMAL';
            const isSelected = selectedTrainObj && (selectedTrainObj.telemetry?.next_station === st.name || selectedTrainObj.source.includes(st.code) || selectedTrainObj.destination.includes(st.code));

            return (
              <Marker
                key={st.code}
                position={[st.lat, st.lng]}
                icon={createStationIcon(st.code, st.name, isSelected, hazardStatus)}
              >
                <Popup>
                  <div style={{ color: '#10243E', padding: '4px', fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
                    <strong style={{ color: '#0B8F68' }}>{st.name} ({st.code})</strong><br />
                    Platforms: {st.platforms} | Corridor: {st.corridor}
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {/* Live Train Markers - Compact Circular Pins */}
          {filteredTrains.map(t => {
            const telemetry = t.telemetry || {};
            const isSelected = t.id === selectedTrainId;
            const isDelayed = telemetry.current_delay_min > 20;
            const markerColor = isDelayed ? '#D92D20' : '#0B8F68';

            return (
              <Marker
                key={t.id}
                position={[telemetry.lat || 26.5, telemetry.lng || 80.0]}
                icon={createTrainIcon(markerColor, t.number, isSelected)}
                eventHandlers={{
                  click: () => onSelectTrain(t.id)
                }}
              >
                <Popup>
                  <div style={{ color: '#10243E', padding: '4px', fontFamily: 'Inter, sans-serif' }}>
                    <h4 style={{ margin: 0, fontSize: '0.85rem', color: '#10243E' }}>{t.number} - {t.name}</h4>
                    <p style={{ margin: '4px 0', fontSize: '0.78rem', color: '#5D6B7A' }}>
                      Speed: <strong style={{ color: '#0B8F68' }}>{telemetry.speed_kmh} km/h</strong><br />
                      Current Delay: <strong style={{ color: isDelayed ? '#D92D20' : '#0B8F68' }}>+{telemetry.current_delay_min} mins</strong><br />
                      Platform: <strong>P-{telemetry.assigned_platform}</strong>
                    </p>
                    <button
                      onClick={() => onSelectTrain(t.id)}
                      style={{ background: '#0B8F68', color: '#FFF', border: 'none', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, fontSize: '0.72rem', width: '100%' }}
                    >
                      Inspect Dynamic ETA ➔
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
