import React, { useState } from 'react';
import { Search, Clock, AlertOctagon, Sparkles, PieChart, ShieldCheck, MapPin, Layers, Filter } from 'lucide-react';
import { ResponsiveContainer as RC, BarChart as BC, Bar as B, XAxis as XA, YAxis as YA, Tooltip as TT, Cell as C } from 'recharts';

export default function PassengerDashboard({ trains = [], prediction, selectedTrainId, onSelectTrain, selectedCorridor, onSelectCorridor }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTrains = trains.filter(t => 
    t.number.includes(searchTerm) || t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedTrain = trains.find(t => t.id === selectedTrainId) || trains[0] || { number: "12301", name: "Express Train", source: "NDLS", destination: "BSB" };
  const predData = prediction || {};

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSelectTrain(searchTerm.trim());
    }
  };

  return (
    <div className="grid-passenger-layout" style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '20px', marginTop: '20px' }}>
      
      {/* Left Column: Universal Search & Train Selector List */}
      <div className="glass-panel" style={{ padding: '20px', height: 'fit-content' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Search size={18} color="var(--primary-cyan)" />
          Search & Track Any Train
        </h3>

        {/* Search Form supporting ANY train number */}
        <form onSubmit={handleSearchSubmit} style={{ position: 'relative', marginBottom: '14px' }}>
          <input
            type="text"
            placeholder="Search train no. (e.g. 12951, 12626, 12002)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px 10px 36px',
              borderRadius: '10px',
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid var(--bg-card-border)',
              color: '#FFF',
              fontSize: '0.85rem'
            }}
          />
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
        </form>

        {/* Corridor Quick Filter Buttons */}
        <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', marginBottom: '14px', paddingBottom: '4px' }}>
          {['All', 'North-East', 'West', 'South', 'Central'].map(c => (
            <button
              key={c}
              onClick={() => onSelectCorridor(c)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                background: selectedCorridor === c ? 'var(--primary-cyan)' : 'rgba(255,255,255,0.05)',
                color: selectedCorridor === c ? '#000' : 'var(--text-muted)'
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Train List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '460px', overflowY: 'auto' }}>
          {filteredTrains.map(t => {
            const isSelected = t.id === selectedTrainId;
            const delay = t.telemetry?.current_delay_min || 0;
            const isDelayed = delay > 20;

            return (
              <div
                key={t.id}
                onClick={() => onSelectTrain(t.id)}
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  background: isSelected ? 'rgba(0, 242, 254, 0.12)' : 'rgba(255,255,255,0.03)',
                  border: isSelected ? '1px solid var(--primary-cyan)' : '1px solid var(--bg-card-border)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 800, color: '#FFF', fontSize: '0.9rem' }}>{t.number}</span>
                  <span className={isDelayed ? "badge badge-danger" : "badge badge-green"}>
                    {isDelayed ? `+${delay}m` : `+${delay}m On Time`}
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 600 }}>{t.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {t.source} ➔ {t.destination}
                </div>
              </div>
            );
          })}

          {filteredTrains.length === 0 && (
            <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              Press Enter or click Search to generate AI Dynamic Forecast for <strong>"{searchTerm}"</strong>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Dynamic Forecast & Explainability Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Dynamic ETA Hero Card */}
        <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(16, 23, 38, 0.9) 0%, rgba(26, 36, 58, 0.9) 100%)', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{selectedTrain.number} - {selectedTrain.name}</h2>
                <span className="badge badge-cyan">AI Forecast Active</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                Route: {selectedTrain.source} ➔ {selectedTrain.destination} | Live Status: <strong>{selectedTrain.telemetry?.status || 'In Transit'}</strong>
              </p>
            </div>

            {/* Confidence Score Pill */}
            <div style={{ background: 'rgba(0, 242, 254, 0.1)', border: '1px solid rgba(0, 242, 254, 0.3)', padding: '10px 16px', borderRadius: '12px', textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Forecast Confidence</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-cyan)' }}>
                {predData.confidence_score || 92}%
              </div>
            </div>
          </div>

          {/* Forecast Metric Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginTop: '24px' }}>
            
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid var(--bg-card-border)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} color="var(--primary-cyan)" />
                Current Delay
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: predData.current_delay_min > 20 ? 'var(--status-red)' : 'var(--status-green)', marginTop: '4px' }}>
                +{predData.current_delay_min || 0} mins
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '2px' }}>Reported at last station</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid var(--bg-card-border)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} color="var(--primary-blue)" />
                AI Predicted Addl. Delay
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--status-yellow)', marginTop: '4px' }}>
                +{predData.predicted_additional_delay || 0} mins
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '2px' }}>Factors weather & signal queues</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid var(--bg-card-border)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} color="var(--status-green)" />
                Total Predicted Arrival Window
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFF', marginTop: '4px' }}>
                +{predData.total_predicted_delay || 0}m <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}> (±{predData.uncertainty_range_min || 4}m)</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '2px' }}>Range confidence window</div>
            </div>
          </div>

          {/* Warnings & Cascading Outer Signal Alerts */}
          {predData.cascading_lockup_warning && (
            <div style={{ marginTop: '20px', background: 'rgba(255, 61, 0, 0.12)', border: '1px solid rgba(255, 61, 0, 0.3)', padding: '14px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <AlertOctagon size={24} color="var(--status-red)" className="pulse-red" />
              <div>
                <strong style={{ color: '#FF8A80', fontSize: '0.85rem' }}>CASCADING TRACK / SIGNAL WARNING PREDICTION:</strong>
                <p style={{ fontSize: '0.8rem', color: '#FFF', marginTop: '2px' }}>{predData.cascading_lockup_warning}</p>
              </div>
            </div>
          )}
        </div>

        {/* SHAP Explainable Delay Factors & Station Timeline Grid */}
        <div className="grid-two-column" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          {/* Explainable Delay Factor Card (SHAP Style) */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PieChart size={18} color="var(--primary-cyan)" />
              SHAP Delay Attribution Factor Breakdown
            </h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Transparent explainability showing root-cause percentages driving the forecast:
            </p>

            <div style={{ height: '200px', width: '100%' }}>
              <RC width="100%" height="100%">
                <BC data={predData.shap_breakdown || []} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <XA type="number" domain={[0, 100]} stroke="var(--text-dim)" unit="%" />
                  <YA type="category" dataKey="factor" stroke="var(--text-muted)" fontSize={11} width={120} />
                  <TT contentStyle={{ background: '#101726', border: '1px solid #1E293B', borderRadius: '8px', color: '#FFF' }} />
                  <B dataKey="percentage" radius={[0, 6, 6, 0]}>
                    {(predData.shap_breakdown || []).map((entry, index) => (
                      <C key={`cell-${index}`} fill={index === 0 ? '#4FACFE' : index === 1 ? '#FF3D00' : index === 2 ? '#FFD600' : '#00E676'} />
                    ))}
                  </B>
                </BC>
              </RC>
            </div>
          </div>

          {/* Digital Platform & Coach Predictor Card */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={18} color="var(--status-green)" />
              Platform & Digital Coach Position Predictor
            </h4>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '14px', borderRadius: '12px', border: '1px solid var(--bg-card-border)', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Expected Platform at Destination:</span>
                <span className="badge badge-green" style={{ fontSize: '0.85rem' }}>Platform 2 (89% Confidence)</span>
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
              Expected Coach Alignment at Platform:
            </div>
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px' }}>
              {['LOCO', 'H1', 'A1', 'A2', 'B1', 'B2', 'B3', 'M1', 'S1', 'SL', 'EOG'].map((c, i) => (
                <div
                  key={i}
                  style={{
                    minWidth: '40px',
                    height: '48px',
                    background: c === 'LOCO' ? '#FF9100' : c.startsWith('A') || c.startsWith('H') ? '#7F56D9' : '#00F2FE',
                    color: '#000',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    borderRadius: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span>{c}</span>
                  <span style={{ fontSize: '0.6rem', opacity: 0.8 }}>C-{i+1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Station-wise Predicted Arrival Window Table */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={18} color="var(--primary-cyan)" />
            Station-wise Predicted Arrival Schedule Window
          </h4>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--bg-card-border)', color: 'var(--text-muted)', textAlign: 'left' }}>
                  <th style={{ padding: '10px' }}>Station</th>
                  <th style={{ padding: '10px' }}>Scheduled Arr</th>
                  <th style={{ padding: '10px' }}>AI Predicted Arrival Window</th>
                  <th style={{ padding: '10px' }}>Platform</th>
                  <th style={{ padding: '10px' }}>Risk Status</th>
                </tr>
              </thead>
              <tbody>
                {(predData.station_predictions || []).map((s, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 10px', fontWeight: 700, color: '#FFF' }}>{s.station_name} ({s.station_code})</td>
                    <td style={{ padding: '12px 10px', color: 'var(--text-muted)' }}>{s.scheduled_arr}</td>
                    <td style={{ padding: '12px 10px', fontWeight: 700, color: 'var(--primary-cyan)' }}>{s.predicted_eta_window}</td>
                    <td style={{ padding: '12px 10px' }}>
                      <span style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px' }}>Platform {s.platform_predicted}</span>
                    </td>
                    <td style={{ padding: '12px 10px' }}>
                      <span className={s.risk_level === 'CRITICAL' ? 'badge badge-danger' : s.risk_level === 'HIGH' ? 'badge badge-warning' : 'badge badge-green'}>
                        {s.risk_level}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
