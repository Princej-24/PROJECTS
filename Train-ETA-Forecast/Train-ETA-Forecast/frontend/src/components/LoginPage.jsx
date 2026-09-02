import React, { useState } from 'react';
import { Train, ShieldCheck, Cpu, ArrowRight, Lock, User, Radio, Activity, Sparkles, MapPin } from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  const [role, setRole] = useState('citizen'); // 'citizen' or 'official'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'official') {
      if (username === 'railway' && password === 'sih2026') {
        onLoginSuccess({ name: 'Chief Dispatcher (CNB Division)', role: 'official' });
      } else {
        setError('Invalid Official credentials! (Try username: railway, passkey: sih2026)');
      }
    } else {
      onLoginSuccess({ name: username || 'Citizen Commuter', role: 'citizen' });
    }
  };

  const handleDemoPreset = (presetRole) => {
    if (presetRole === 'official') {
      onLoginSuccess({ name: 'Chief Dispatcher (CNB Control)', role: 'official' });
    } else {
      onLoginSuccess({ name: 'Aman Kumar (Passenger)', role: 'citizen' });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-dark)',
      display: 'flex',
      flexDirection: 'column',
      justify: 'space-between',
      color: '#10243E',
      fontFamily: 'var(--font-body)',
      padding: '20px'
    }}>
      
      {/* Top Brand Header */}
      <header style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#0B8F68', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '4px 4px 10px rgba(163,174,184,.3), -4px -4px 10px rgba(255,255,255,.9)', flexShrink: 0 }}>
            <Train size={24} color="#FFF" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10243E', letterSpacing: '-0.02em', margin: 0 }}>RAILGUARD</h1>
            <p style={{ fontSize: '0.72rem', color: '#5D6B7A', margin: 0, fontWeight: 600 }}>ETA & Disaster Intelligence System • Ministry of Railways</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-cyan" style={{ fontSize: '0.75rem' }}>
            <Radio size={12} color="#0B8F68" />
            TELEMETRY STREAM ONLINE
          </span>
        </div>
      </header>

      {/* Main Center Login Grid */}
      <div className="rg-login-grid">
        
        {/* Left Hero Overview */}
        <div>
          <div className="badge badge-cyan" style={{ marginBottom: '16px', fontSize: '0.8rem', padding: '6px 14px' }}>
            <Sparkles size={14} color="#0B8F68" />
            Train ETA Forecast AI Platform
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.15, marginBottom: '16px', color: '#10243E' }}>
            Don't Just Track the Train. <br />
            <span style={{ color: '#0B8F68' }}>Predict What Happens Next.</span>
          </h1>

          <p style={{ fontSize: '0.95rem', color: '#5D6B7A', marginBottom: '28px', maxWidth: '600px', lineHeight: 1.6, fontWeight: 500 }}>
            Real-time dynamic arrival forecasting, cascading track signal queue predictions, disaster hazard modeling, and passenger disaster relief resource estimation.
          </p>

          {/* Platform Live Stats Grid */}
          <div className="rg-stats-grid">
            <div className="neu-raised-md" style={{ padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#5D6B7A', fontWeight: 600 }}>Model Accuracy</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#159A68', marginTop: '4px' }}>91.3%</div>
              <div style={{ fontSize: '0.7rem', color: '#7C8895' }}>XGBoost Engine</div>
            </div>

            <div className="neu-raised-md" style={{ padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#5D6B7A', fontWeight: 600 }}>Active Forecasts</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0B8F68', marginTop: '4px' }}>126</div>
              <div style={{ fontSize: '0.7rem', color: '#7C8895' }}>All-India Network</div>
            </div>

            <div className="neu-raised-md" style={{ padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#5D6B7A', fontWeight: 600 }}>Disaster Monitor</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F2A11B', marginTop: '4px' }}>Active</div>
              <div style={{ fontSize: '0.7rem', color: '#7C8895' }}>Weather Speed Caps</div>
            </div>
          </div>
        </div>

        {/* Right Glassmorphic Login Form Card */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#DDF3EB', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', boxShadow: '3px 3px 6px rgba(163,174,184,.2), -3px -3px 6px rgba(255,255,255,.8)' }}>
              <Lock size={22} color="#0B8F68" />
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10243E', margin: 0 }}>Platform Authentication</h2>
            <p style={{ fontSize: '0.85rem', color: '#5D6B7A', marginTop: '4px' }}>Select your access role to enter RAILGUARD</p>
          </div>

          {/* Role Toggle Switcher */}
          <div className="neu-inset" style={{ display: 'flex', gap: '8px', padding: '4px', marginBottom: '20px' }}>
            <button
              type="button"
              onClick={() => { setRole('citizen'); setError(''); }}
              style={{
                flex: 1, padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem',
                background: role === 'citizen' ? '#0B8F68' : 'transparent',
                color: role === 'citizen' ? '#FFF' : '#5D6B7A',
                boxShadow: role === 'citizen' ? '3px 3px 6px rgba(163,174,184,.2)' : 'none'
              }}
            >
              Citizen / Passenger
            </button>
            <button
              type="button"
              onClick={() => { setRole('official'); setError(''); }}
              style={{
                flex: 1, padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem',
                background: role === 'official' ? '#7F56D9' : 'transparent',
                color: role === 'official' ? '#FFF' : '#5D6B7A',
                boxShadow: role === 'official' ? '3px 3px 6px rgba(163,174,184,.2)' : 'none'
              }}
            >
              Railway Official
            </button>
          </div>

          {error && (
            <div style={{ background: '#FFF4F3', border: '1px solid #D92D20', color: '#D92D20', padding: '10px 14px', borderRadius: '10px', fontSize: '0.8rem', marginBottom: '16px', fontWeight: 600 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#5D6B7A', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Username / Mobile / PNR</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={role === 'official' ? 'Enter "railway"' : 'Enter your name or mobile'}
                style={{ width: '100%', padding: '10px 14px', fontSize: '0.9rem' }}
                required
              />
            </div>

            {role === 'official' && (
              <div>
                <label style={{ fontSize: '0.8rem', color: '#5D6B7A', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Official Passkey</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter "sih2026"'
                  style={{ width: '100%', padding: '10px 14px', fontSize: '0.9rem' }}
                  required
                />
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem', marginTop: '6px' }}>
              <ShieldCheck size={18} />
              Authenticate & Launch RAILGUARD
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Demo Preset Launch Buttons */}
          <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px dashed var(--divider)', textAlign: 'center' }}>
            <p style={{ fontSize: '0.75rem', color: '#7C8895', marginBottom: '8px', fontWeight: 600 }}>⚡ Fast Demo Instant Launch Presets:</p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button type="button" onClick={() => handleDemoPreset('citizen')} className="btn-secondary" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>
                Launch Passenger Demo
              </button>
              <button type="button" onClick={() => handleDemoPreset('official')} className="btn-secondary" style={{ fontSize: '0.78rem', padding: '6px 12px', border: '1px solid #7F56D9', color: '#7F56D9' }}>
                Launch Official Demo (railway)
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Footer System Ticker */}
      <footer style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#7C8895', borderTop: '1px solid var(--divider)', paddingTop: '14px', flexWrap: 'wrap', gap: '8px', fontWeight: 600 }}>
        <div>• Ministry of Railways Problem Statement Solution</div>
        <div>DATA SOURCES: IMD • CWC • INDIAN RAILWAYS TELEMETRY</div>
      </footer>

    </div>
  );
}
