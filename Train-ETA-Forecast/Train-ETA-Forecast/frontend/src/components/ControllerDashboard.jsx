import React, { useState } from 'react';
import { ShieldAlert, Cpu, AlertTriangle, Sliders, RefreshCw, Zap, Play, CheckCircle2 } from 'lucide-react';
import { simulateWhatIf } from '../services/api';

export default function ControllerDashboard({ trains = [], hazards = [], onRefreshData }) {
  const [selectedTrain, setSelectedTrain] = useState('12582');
  const [actionType, setActionType] = useState('reassign_platform');
  const [newPlatform, setNewPlatform] = useState(3);
  const [simulationResult, setSimulationResult] = useState(null);
  const [loadingSim, setLoadingSim] = useState(false);

  const handleRunSimulation = async () => {
    setLoadingSim(true);
    const res = await simulateWhatIf({
      train_id: selectedTrain,
      action_type: actionType,
      new_platform: Number(newPlatform),
      dwell_reduction_min: 5
    });
    setSimulationResult(res);
    setLoadingSim(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
      
      {/* Top Controller Status Banner */}
      <div className="glass-panel" style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(127, 86, 217, 0.2) 0%, rgba(16, 23, 38, 0.8) 100%)', border: '1px solid var(--accent-purple)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Cpu size={28} color="var(--accent-purple)" />
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Railway Controller & Disaster Operations Command Center</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Division: North Central Railway (CNB - PRYJ Block Control)</p>
            </div>
          </div>

          <button className="btn-secondary" onClick={onRefreshData}>
            <RefreshCw size={16} />
            Refresh Telemetry Feed
          </button>
        </div>
      </div>

      {/* Grid Layout: Fleet Delay Matrix & What-If Simulator */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '20px' }}>
        
        {/* Fleet-Wide Dynamic Delay Matrix */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={18} color="var(--status-yellow)" />
            Active Fleet Delay Propagation & Block Occupancy Matrix
          </h3>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--bg-card-border)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Train</th>
                <th style={{ padding: '10px' }}>Current Location</th>
                <th style={{ padding: '10px' }}>Delay</th>
                <th style={{ padding: '10px' }}>Predicted Addl.</th>
                <th style={{ padding: '10px' }}>Signal / Outer Lockup Warning</th>
                <th style={{ padding: '10px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {trains.map(t => {
                const telemetry = t.telemetry || {};
                const delay = telemetry.current_delay_min || 0;
                const isCritical = delay > 35;

                return (
                  <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 10px' }}>
                      <strong style={{ color: '#FFF' }}>{t.number}</strong><br />
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.name}</span>
                    </td>
                    <td style={{ padding: '12px 10px', color: 'var(--text-muted)' }}>
                      {telemetry.status || 'In Transit'} (P-{telemetry.assigned_platform})
                    </td>
                    <td style={{ padding: '12px 10px', fontWeight: 700, color: isCritical ? 'var(--status-red)' : 'var(--status-yellow)' }}>
                      +{delay} mins
                    </td>
                    <td style={{ padding: '12px 10px', color: 'var(--primary-cyan)' }}>
                      +{t.id === '12582' ? 26 : t.id === '12401' ? 12 : 6} mins
                    </td>
                    <td style={{ padding: '12px 10px' }}>
                      {t.id === '12582' ? (
                        <span style={{ color: '#FF8A80', fontSize: '0.75rem', fontWeight: 600 }}>⚠️ Outer Signal Hold (1.5 km back)</span>
                      ) : t.id === '12401' ? (
                        <span style={{ color: '#FFD600', fontSize: '0.75rem' }}>Platform 4 Occupied</span>
                      ) : (
                        <span style={{ color: 'var(--status-green)', fontSize: '0.75rem' }}>Clear Block Section</span>
                      )}
                    </td>
                    <td style={{ padding: '12px 10px' }}>
                      <button
                        className="btn-secondary"
                        style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                        onClick={() => setSelectedTrain(t.id)}
                      >
                        Simulate Action
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* What-If Operational Dispatch Simulator */}
        <div className="glass-panel" style={{ padding: '20px', border: '1px solid var(--primary-cyan)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={18} color="var(--primary-cyan)" />
            "What-If" Operational Dispatch Simulator
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Test dispatch actions to relieve outer signal congestion and recover cascading network delays.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Select Target Train</label>
              <select
                value={selectedTrain}
                onChange={(e) => setSelectedTrain(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--bg-card-border)', color: '#FFF' }}
              >
                {trains.map(t => (
                  <option key={t.id} value={t.id}>{t.number} - {t.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Operational Action Type</label>
              <select
                value={actionType}
                onChange={(e) => setActionType(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--bg-card-border)', color: '#FFF' }}
              >
                <option value="reassign_platform">Reassign Arrival Platform (Relieve Lockup)</option>
                <option value="reduce_dwell">Reduce Dwell Time by 5 mins (Speedup)</option>
              </select>
            </div>

            {actionType === 'reassign_platform' && (
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Assign New Platform</label>
                <input
                  type="number"
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--bg-card-border)', color: '#FFF' }}
                  min="1"
                  max="10"
                />
              </div>
            )}

            <button className="btn-primary" onClick={handleRunSimulation} disabled={loadingSim} style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
              <Play size={16} />
              {loadingSim ? 'Computing Network Recovery...' : 'Run Simulation'}
            </button>
          </div>

          {/* Simulation Output Card */}
          {simulationResult && (
            <div style={{ marginTop: '20px', background: 'rgba(0, 230, 118, 0.1)', border: '1px solid rgba(0, 230, 118, 0.3)', padding: '16px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--status-green)', fontWeight: 700, fontSize: '0.9rem' }}>
                <CheckCircle2 size={18} />
                Simulation Calculated Successfully!
              </div>

              <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#FFF' }}>
                <p><strong>Action Executed:</strong> {simulationResult.action}</p>
                <p style={{ marginTop: '4px' }}>Original Network Delay: <span style={{ color: 'var(--status-red)' }}>+{simulationResult.original_network_delay}m</span></p>
                <p style={{ marginTop: '2px' }}>Simulated Network Delay: <span style={{ color: 'var(--status-green)' }}>+{simulationResult.simulated_network_delay}m</span></p>
                <p style={{ marginTop: '6px', fontWeight: 800, color: 'var(--primary-cyan)' }}>
                  Total Delay Recovered: {simulationResult.delay_recovered_min} Minutes!
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Benefit: {simulationResult.network_benefit}
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
