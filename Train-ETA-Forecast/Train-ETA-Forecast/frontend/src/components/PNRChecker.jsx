import React, { useState } from 'react';
import { Search, Ticket, CheckCircle, TrendingUp, Sparkles, MapPin } from 'lucide-react';
import { checkPNR } from '../services/api';

export default function PNRChecker() {
  const [pnrInput, setPnrInput] = useState('8420194821');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    const data = await checkPNR(pnrInput);
    setResult(data);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '800px', width: '100%', margin: '16px auto 0', padding: '0 8px', boxSizing: 'border-box' }}>
      
      {/* Search Header Card */}
      <div className="glass-panel" style={{ padding: '24px', textAlign: 'center', marginBottom: '16px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#DDF3EB', border: '1px solid rgba(11,143,104,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', boxShadow: '3px 3px 6px rgba(163,174,184,.2), -3px -3px 6px rgba(255,255,255,.8)' }}>
          <Ticket size={24} color="#0B8F68" />
        </div>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10243E', margin: 0 }}>AI Predictive PNR Status & Platform Predictor</h2>
        <p style={{ fontSize: '0.82rem', color: '#5D6B7A', marginTop: '4px' }}>
          ML confirmation probability forecast & predicted platform assignment
        </p>

        <form onSubmit={handleSearch} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '16px', maxWidth: '500px', width: '100%', margin: '16px auto 0' }}>
          <input
            type="text"
            placeholder="Enter 10-digit PNR (e.g. 8420194821)"
            value={pnrInput}
            onChange={(e) => setPnrInput(e.target.value)}
            style={{ flex: '1 1 200px', minWidth: '0', padding: '12px 14px', fontSize: '0.9rem' }}
          />
          <button type="submit" className="btn-primary" disabled={loading} style={{ flex: '1 1 140px', justifyContent: 'center' }}>
            <Search size={16} />
            {loading ? 'Analyzing...' : 'Predict Status'}
          </button>
        </form>
      </div>

      {/* PNR Analysis Result Card */}
      {result && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--divider)', paddingBottom: '14px', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span className="badge badge-cyan">PNR: {result.pnr}</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#10243E', marginTop: '6px', margin: 0 }}>{result.train_number} - {result.train_name}</h3>
              <p style={{ fontSize: '0.78rem', color: '#5D6B7A', marginTop: '4px', margin: 0 }}>Date: {result.journey_date} | Class: {result.class}</p>
            </div>

            {/* Confirmation Score Badge */}
            <div className="neu-inset" style={{ padding: '10px 16px', borderRadius: '14px', textAlign: 'right' }}>
              <div style={{ fontSize: '0.68rem', color: '#5D6B7A', textTransform: 'uppercase', fontWeight: 700 }}>ML Confirmation Chance</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0B8F68' }}>
                {result.confirmation_probability}%
              </div>
            </div>
          </div>

          {/* Passenger Ticket Status Table with Responsive Wrapper */}
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ fontSize: '0.85rem', color: '#5D6B7A', marginBottom: '10px', fontWeight: 700 }}>Passenger Booking Breakdown:</h4>
            <div className="table-responsive">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ textAlign: 'left' }}>
                    <th style={{ padding: '8px' }}>Passenger Name</th>
                    <th style={{ padding: '8px' }}>Booking Status</th>
                    <th style={{ padding: '8px' }}>Current Status</th>
                    <th style={{ padding: '8px' }}>AI Predicted Status</th>
                  </tr>
                </thead>
                <tbody>
                  {result.passengers.map((p, idx) => (
                    <tr key={idx}>
                      <td style={{ padding: '10px 8px', fontWeight: 700, color: '#10243E' }}>{p.name}</td>
                      <td style={{ padding: '10px 8px', color: '#5D6B7A' }}>{p.booking_status}</td>
                      <td style={{ padding: '10px 8px', color: '#A96700', fontWeight: 600 }}>{p.current_status}</td>
                      <td style={{ padding: '10px 8px' }}>
                        <span className="badge badge-green">{p.predicted_status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Platform Predictor Pill */}
          <div style={{ background: '#DDF3EB', border: '1px solid rgba(11,143,104,.25)', padding: '12px 16px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', boxShadow: '3px 3px 6px rgba(163,174,184,.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={18} color="#0B8F68" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.82rem', color: '#10243E', fontWeight: 600 }}>Predicted Arrival Platform at Destination:</span>
            </div>
            <strong style={{ color: '#0B8F68', fontSize: '1.1rem' }}>{result.predicted_platform}</strong>
          </div>
        </div>
      )}
    </div>
  );
}
