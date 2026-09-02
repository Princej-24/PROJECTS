import React, { useState } from 'react';
import { CloudRain, CloudFog, ShieldAlert } from 'lucide-react';

export default function DisasterAlertCenter({ hazards = [] }) {
  const [activeHazards, setActiveHazards] = useState(hazards);

  const handleToggleSeverity = (hazardId, newSeverity) => {
    const updated = activeHazards.map(h => {
      if (h.id === hazardId) {
        return {
          ...h,
          severity: newSeverity,
          speed_cap_kmh: newSeverity === 'HIGH' ? 45 : newSeverity === 'MEDIUM' ? 60 : 130
        };
      }
      return h;
    });
    setActiveHazards(updated);
  };

  return (
    <div className="glass-panel" style={{ padding: '20px', marginTop: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldAlert size={22} color="#D92D20" />
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10243E', margin: 0 }}>Weather Hazards & Safety Speed Restriction Controls</h3>
            <p style={{ fontSize: '0.8rem', color: '#5D6B7A', margin: 0 }}>Configure real-time weather severity & mandatory safety speed caps across railway corridors</p>
          </div>
        </div>
        <span className="badge badge-warning">Safety Control Center</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {activeHazards.map(h => {
          const isHigh = h.severity === 'HIGH';
          const isMed = h.severity === 'MEDIUM';

          return (
            <div
              key={h.id}
              style={{
                background: isHigh ? '#FFF4F3' : '#FFF9EC',
                border: isHigh ? '1px solid rgba(217, 45, 32, 0.3)' : '1px solid rgba(242, 161, 27, 0.3)',
                borderLeft: isHigh ? '4px solid #D92D20' : '4px solid #F2A11B',
                borderRadius: '14px',
                padding: '16px',
                boxShadow: '3px 3px 6px rgba(163,174,184,.18), -3px -3px 6px rgba(255,255,255,.85)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 800, color: '#10243E', fontSize: '0.95rem' }}>{h.section}</span>
                <span className={isHigh ? 'badge badge-danger' : isMed ? 'badge badge-warning' : 'badge badge-green'}>
                  {h.severity} SEVERITY
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#10243E', fontSize: '0.85rem' }}>
                {h.hazard_type.includes('Rain') ? <CloudRain size={18} color="#0B8F68" /> : <CloudFog size={18} color="#A96700" />}
                <strong style={{ color: '#10243E' }}>{h.hazard_type}</strong>
              </div>

              <p style={{ fontSize: '0.75rem', color: '#5D6B7A', marginBottom: '14px' }}>{h.description}</p>

              <div className="neu-inset" style={{ padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', marginBottom: '12px', borderRadius: '10px' }}>
                <span style={{ color: '#5D6B7A', fontWeight: 600 }}>Mandatory Safety Speed Cap:</span>
                <strong style={{ color: '#0B8F68', fontSize: '0.95rem' }}>{h.speed_cap_kmh} km/h</strong>
              </div>

              {/* Severity Controls */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => handleToggleSeverity(h.id, 'HIGH')}
                  style={{
                    flex: 1, padding: '6px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700,
                    background: isHigh ? '#D92D20' : '#F4F6F8', color: isHigh ? '#FFF' : '#5D6B7A',
                    boxShadow: isHigh ? 'inset 2px 2px 4px rgba(0,0,0,0.2)' : '2px 2px 5px rgba(163,174,184,.15)'
                  }}
                >
                  High (45 km/h)
                </button>
                <button
                  onClick={() => handleToggleSeverity(h.id, 'MEDIUM')}
                  style={{
                    flex: 1, padding: '6px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700,
                    background: isMed ? '#F2A11B' : '#F4F6F8', color: isMed ? '#FFF' : '#5D6B7A',
                    boxShadow: isMed ? 'inset 2px 2px 4px rgba(0,0,0,0.2)' : '2px 2px 5px rgba(163,174,184,.15)'
                  }}
                >
                  Medium (60 km/h)
                </button>
                <button
                  onClick={() => handleToggleSeverity(h.id, 'CLEAR')}
                  style={{
                    flex: 1, padding: '6px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700,
                    background: h.severity === 'CLEAR' ? '#159A68' : '#F4F6F8', color: h.severity === 'CLEAR' ? '#FFF' : '#5D6B7A',
                    boxShadow: h.severity === 'CLEAR' ? 'inset 2px 2px 4px rgba(0,0,0,0.2)' : '2px 2px 5px rgba(163,174,184,.15)'
                  }}
                >
                  Clear (Normal)
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
