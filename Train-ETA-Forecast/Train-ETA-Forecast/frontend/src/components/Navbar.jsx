import React from 'react';
import { Train, User, Cpu, AlertTriangle, Radio } from 'lucide-react';

export default function Navbar({ activeRole, setActiveRole, onOpenLogin, user, activeTab, setActiveTab }) {
  return (
    <header style={{ background: '#EEF1F4', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '4px 4px 10px rgba(163,174,184,.2)' }}>
      {/* Top Emergency Ticker */}
      <div style={{ background: '#FFF4F3', borderBottom: '1px solid rgba(217, 45, 32, 0.2)', padding: '6px 16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', color: '#D92D20' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
          <AlertTriangle size={14} className="pulse-red" color="#D92D20" />
          <span><strong>WEATHER & SAFETY ALERT:</strong> Kanpur-Fatehpur Section. Safety speed restriction (45 km/h) active.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600 }}>
          <Radio size={12} color="#0B8F68" />
          <span style={{ color: '#087A59' }}>Live Telemetry Engine Stream Active</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="nav-header-container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#0B8F68', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '3px 3px 6px rgba(163,174,184,.2), -3px -3px 6px rgba(255,255,255,.8)' }}>
            <Train size={24} color="#FFF" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10243E', margin: 0 }}>RAIL-AI ETA</h1>
              <span className="badge badge-cyan">Predictive Intelligence</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#5D6B7A', margin: 0, fontWeight: 600 }}>Dynamic Train Arrival & Operational Forecast System</p>
          </div>
        </div>

        {/* Responsive Tab Navigation */}
        <nav className="nav-tabs-wrapper neu-inset" style={{ display: 'flex', gap: '8px', padding: '4px', borderRadius: '12px' }}>
          <button 
            onClick={() => setActiveTab('passenger')}
            style={{ 
              padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap',
              background: activeTab === 'passenger' ? '#0B8F68' : 'transparent',
              color: activeTab === 'passenger' ? '#FFF' : '#5D6B7A'
            }}
          >
            Commuter / Passenger View
          </button>
          <button 
            onClick={() => setActiveTab('controller')}
            style={{ 
              padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap',
              background: activeTab === 'controller' ? '#7F56D9' : 'transparent',
              color: activeTab === 'controller' ? '#FFF' : '#5D6B7A'
            }}
          >
            Railway Command Center
          </button>
          <button 
            onClick={() => setActiveTab('pnr')}
            style={{ 
              padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap', border: 'none',
              background: activeTab === 'pnr' ? '#DDF3EB' : 'transparent',
              color: activeTab === 'pnr' ? '#0B8F68' : '#5D6B7A'
            }}
          >
            PNR Predictor
          </button>
        </nav>

        {/* User Auth & Role Control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
            <Cpu size={12} />
            {activeRole === 'official' ? 'ROLE: RAILWAY OFFICIAL' : 'ROLE: CITIZEN'}
          </div>
          
          <button className="btn-secondary" onClick={onOpenLogin} style={{ fontSize: '0.85rem' }}>
            <User size={16} />
            {user ? user.name : 'Sign In'}
          </button>
        </div>
      </div>
    </header>
  );
}
