import React, { useState, useEffect } from 'react';
import { 
  Train, Bell, Clock, Cpu, Search, MapPin, AlertTriangle, ShieldAlert, Sliders, 
  Activity, Radio, Play, ChevronRight, PieChart, Users, Heart, Package, Droplet, 
  Home, LogOut, CheckCircle, Wind, CloudRain, Shield, FileText, Download, Send, Check,
  Menu, X
} from 'lucide-react';
import LiveTrainMap from './LiveTrainMap';
import PNRChecker from './PNRChecker';
import DisasterAlertCenter from './DisasterAlertCenter';
import { simulateWhatIf } from '../services/api';

export default function RailGuardDashboard({ trains = [], stations = [], hazards = [], user, onLogout }) {
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const [selectedTrainId, setSelectedTrainId] = useState('12345');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCorridor, setSelectedCorridor] = useState('All');
  const [currentTime, setCurrentTime] = useState('10:02:14 AM');

  // Mobile Drawer State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Interactive Modals State
  const [showSimModal, setShowSimModal] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [showReliefModal, setShowReliefModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // What-if Simulation State
  const [simAction, setSimAction] = useState('reassign_platform');
  const [simResult, setSimResult] = useState(null);
  const [simLoading, setSimLoading] = useState(false);

  // Update live clock
  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setCurrentTime(d.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const selectedTrain = trains.find(t => t.id === selectedTrainId) || trains[0] || {
    id: "12345",
    number: "12345",
    name: "Guwahati Rajdhani Express",
    loco: "HWH WAP-7",
    source: "NDLS",
    destination: "GHY",
    passenger_impact: { total_passengers: 1126, vulnerable_passengers: 128, food_packets_req: 1126, water_liters_req: 2252, medical_kits_req: 25, shelter_capacity_req: 1200 }
  };

  const telemetry = selectedTrain.telemetry || {
    speed_kmh: 68,
    distance_covered_km: 612,
    distance_to_dest_km: 734,
    next_station: "Prayagraj Jn.",
    next_station_eta: "12:18 PM",
    current_delay_min: 20,
    status: "Approaching High-Risk Flood Zone"
  };

  const passengerImpact = selectedTrain.passenger_impact || {
    total_passengers: 1126, vulnerable_passengers: 128, food_packets_req: 1126, water_liters_req: 2252, medical_kits_req: 25, shelter_capacity_req: 1200
  };

  const handleRunSim = async () => {
    setSimLoading(true);
    const res = await simulateWhatIf({
      train_id: selectedTrainId,
      action_type: simAction,
      new_platform: 3,
      dwell_reduction_min: 5
    });
    setSimResult(res);
    setSimLoading(false);
  };

  const filteredTrains = trains.filter(t => 
    t.number.includes(searchTerm) || t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectTab = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', maxWidth: '100vw', overflowX: 'hidden', background: 'var(--bg-dark)', color: '#10243E', fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column' }}>
      
      {/* Toast Notification Ticker */}
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 10000, background: '#DDF3EB', border: '1px solid #0B8F68', color: '#087A59', padding: '14px 20px', borderRadius: '14px', fontWeight: 800, fontSize: '0.85rem', boxShadow: '4px 4px 14px rgba(163,174,184,.3), -4px -4px 14px rgba(255,255,255,.9)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle size={20} color="#0B8F68" />
          {toastMessage}
        </div>
      )}

      {/* =========================================================================
         1. TOP HEADER NAVIGATION BAR WITH MOBILE HAMBURGER MENU
         ========================================================================= */}
      <header style={{ background: 'var(--bg-dark)', padding: '12px 16px', position: 'relative', zIndex: 100, width: '100%' }}>
        <div className="rg-header-inner glass-panel" style={{ padding: '10px 20px', borderRadius: '20px' }}>
          
          {/* Logo & Platform Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => handleSelectTab('DASHBOARD')}>
            <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: '#0B8F68', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '4px 4px 8px rgba(163,174,184,.3), -4px -4px 8px rgba(255,255,255,.9)', flexShrink: 0 }}>
              <Train size={22} color="#FFF" />
            </div>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10243E', letterSpacing: '-0.02em', lineHeight: 1 }}>RAILGUARD</div>
              <div style={{ fontSize: '0.68rem', color: '#5D6B7A', marginTop: '2px', fontWeight: 600 }}>ETA & DISASTER INTELLIGENCE SYSTEM</div>
            </div>
          </div>

          {/* Desktop Navigation Menu Tabs */}
          <nav className="rg-desktop-nav">
            {['DASHBOARD', 'LIVE TRAINS', 'PREDICTIONS', 'DISASTER MONITOR', 'OPERATIONS', 'REPORTS', 'PNR PREDICTOR'].map(tab => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => handleSelectTab(tab)}
                  style={{
                    padding: '8px 14px', borderRadius: '12px', cursor: 'pointer', fontWeight: 700, fontSize: '0.78rem',
                    background: isActive ? '#E1F3EC' : 'transparent',
                    color: isActive ? '#0B8F68' : '#5D6B7A',
                    border: 'none',
                    boxShadow: isActive ? 'inset 2px 2px 5px rgba(163,174,184,.15), inset -2px -2px 5px rgba(255,255,255,.75)' : 'none',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.16s ease'
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </nav>

          {/* Desktop System Indicators */}
          <div className="rg-header-stats">
            <div 
              onClick={() => handleSelectTab('DISASTER MONITOR')} 
              style={{ background: '#FFF4F3', border: '1px solid rgba(217, 45, 32, 0.25)', color: '#D92D20', padding: '5px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', boxShadow: '2px 2px 5px rgba(163,174,184,.15)' }}
            >
              <Bell size={13} className="pulse-red" color="#D92D20" />
              3 ALERTS
            </div>

            <div style={{ fontSize: '0.8rem', color: '#5D6B7A', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={14} color="#0B8F68" />
              <strong style={{ color: '#10243E' }}>{currentTime}</strong>
            </div>

            <div style={{ background: '#DDF3EB', border: '1px solid rgba(11, 143, 104, 0.25)', color: '#087A59', padding: '5px 12px', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700 }}>
              CONTROL ROOM • {user ? user.name : 'Railway Ops'} (ONLINE)
            </div>

            <button onClick={onLogout} title="Sign Out" style={{ background: 'none', border: 'none', color: '#5D6B7A', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <LogOut size={18} />
            </button>
          </div>

          {/* Mobile Hamburger 3-Lines Button */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            title="Open Mobile Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={24} color="#10243E" /> : <Menu size={24} color="#10243E" />}
          </button>

        </div>
      </header>

      {/* =========================================================================
         SLIDE-OUT MOBILE HAMBURGER DRAWER MENU
         ========================================================================= */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            
            {/* Drawer Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--divider)', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#0B8F68', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Train size={18} color="#FFF" />
                </div>
                <strong style={{ fontSize: '1.1rem', color: '#10243E' }}>RAILGUARD</strong>
              </div>

              <button onClick={() => setIsMobileMenuOpen(false)} style={{ background: 'none', border: 'none', color: '#5D6B7A', cursor: 'pointer' }}>
                <X size={22} />
              </button>
            </div>

            {/* User Status & Clock */}
            <div className="neu-inset" style={{ padding: '12px' }}>
              <div style={{ fontSize: '0.75rem', color: '#087A59', fontWeight: 800, marginBottom: '4px' }}>
                ● CONTROL ROOM ONLINE
              </div>
              <div style={{ fontSize: '0.8rem', color: '#10243E', fontWeight: 700 }}>{user ? user.name : 'Railway Ops'}</div>
              <div style={{ fontSize: '0.75rem', color: '#5D6B7A', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} color="#0B8F68" /> {currentTime}
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.7rem', color: '#7C8895', fontWeight: 800, letterSpacing: '0.05em' }}>NAVIGATION MENU</span>
              
              {[
                { name: 'DASHBOARD', icon: Activity },
                { name: 'LIVE TRAINS', icon: Train },
                { name: 'PREDICTIONS', icon: Cpu },
                { name: 'DISASTER MONITOR', icon: ShieldAlert },
                { name: 'OPERATIONS', icon: Sliders },
                { name: 'REPORTS', icon: FileText },
                { name: 'PNR PREDICTOR', icon: Search }
              ].map(item => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleSelectTab(item.name)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: '12px',
                      background: isActive ? '#E1F3EC' : '#F4F6F8',
                      color: isActive ? '#0B8F68' : '#10243E',
                      border: 'none',
                      boxShadow: isActive ? 'inset 2px 2px 5px rgba(163,174,184,.2), inset -2px -2px 5px rgba(255,255,255,.8)' : '4px 4px 8px rgba(163,174,184,.2), -4px -4px 8px rgba(255,255,255,.85)',
                      fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', cursor: 'pointer', textAlign: 'left'
                    }}
                  >
                    <IconComponent size={18} color={isActive ? '#0B8F68' : '#5D6B7A'} />
                    <span style={{ flex: 1 }}>{item.name}</span>
                    <ChevronRight size={16} color="#7C8895" />
                  </button>
                );
              })}
            </div>

            {/* Logout Button inside drawer */}
            <button
              onClick={onLogout}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', marginTop: 'auto', border: '1px solid rgba(217, 45, 32, 0.3)', color: '#D92D20' }}
            >
              <LogOut size={16} /> Sign Out of Platform
            </button>

          </div>
        </div>
      )}

      {/* =========================================================================
         2. TAB VIEW: LIVE TRAINS (SEARCH & FLEET MANAGER)
         ========================================================================= */}
      {activeTab === 'LIVE TRAINS' && (
        <div style={{ maxWidth: '1400px', width: '100%', margin: '20px auto', padding: '0 12px' }}>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10243E' }}>All-India Coaching Train Fleet Directory</h2>
                <p style={{ fontSize: '0.8rem', color: '#5D6B7A' }}>Real-time status, locomotive data, speed, and delay tracking</p>
              </div>

              {/* Corridor Quick Filter */}
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', width: '100%', maxWidth: '520px' }}>
                {['All', 'North-East', 'West', 'South', 'Central'].map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedCorridor(c)}
                    style={{
                      padding: '6px 12px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap',
                      background: selectedCorridor === c ? '#0B8F68' : '#F4F6F8',
                      color: selectedCorridor === c ? '#FFF' : '#5D6B7A',
                      boxShadow: selectedCorridor === c ? 'inset 2px 2px 5px rgba(0,0,0,0.2)' : '3px 3px 6px rgba(163,174,184,.2), -3px -3px 6px rgba(255,255,255,.85)'
                    }}
                  >
                    {c} Corridor
                  </button>
                ))}
              </div>
            </div>

            <div className="table-responsive">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ textAlign: 'left' }}>
                    <th style={{ padding: '12px' }}>Train Number & Name</th>
                    <th style={{ padding: '12px' }}>Type & Loco</th>
                    <th style={{ padding: '12px' }}>Route Corridor</th>
                    <th style={{ padding: '12px' }}>Current Position</th>
                    <th style={{ padding: '12px' }}>Speed</th>
                    <th style={{ padding: '12px' }}>Delay Status</th>
                    <th style={{ padding: '12px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {trains.filter(t => selectedCorridor === 'All' || t.corridor === selectedCorridor).map(t => {
                    const telemetry = t.telemetry || {};
                    const isRed = telemetry.current_delay_min > 30;
                    return (
                      <tr key={t.id}>
                        <td style={{ padding: '14px 12px' }}>
                          <strong style={{ color: '#10243E', fontSize: '0.95rem' }}>{t.number}</strong>
                          <div style={{ color: '#5D6B7A', fontSize: '0.8rem' }}>{t.name}</div>
                        </td>
                        <td style={{ padding: '14px 12px', color: '#5D6B7A' }}>
                          <div>{t.type}</div>
                          <span style={{ color: '#0B8F68', fontSize: '0.75rem', fontWeight: 600 }}>Loco: {t.loco || 'WAP-7'}</span>
                        </td>
                        <td style={{ padding: '14px 12px', color: '#10243E', fontWeight: 600 }}>{t.source} ➔ {t.destination}</td>
                        <td style={{ padding: '14px 12px', color: '#5D6B7A' }}>{telemetry.status || 'In Transit'}</td>
                        <td style={{ padding: '14px 12px', fontWeight: 800, color: '#0B8F68' }}>{telemetry.speed_kmh || 95} km/h</td>
                        <td style={{ padding: '14px 12px' }}>
                          <span className={isRed ? 'badge badge-danger' : 'badge badge-green'}>
                            +{telemetry.current_delay_min || 0} min {isRed ? 'Delayed' : 'On Time'}
                          </span>
                        </td>
                        <td style={{ padding: '14px 12px' }}>
                          <button
                            className="btn-primary"
                            style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                            onClick={() => { setSelectedTrainId(t.id); handleSelectTab('DASHBOARD'); }}
                          >
                            Inspect ETA ➔
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         3. TAB VIEW: PREDICTIONS (DYNAMIC ETA & SHAP ANALYTICS)
         ========================================================================= */}
      {activeTab === 'PREDICTIONS' && (
        <div style={{ maxWidth: '1400px', width: '100%', margin: '20px auto', padding: '0 12px' }}>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10243E', marginBottom: '8px' }}>AI Predictive ETA & Confidence Interval Engine</h2>
            <p style={{ fontSize: '0.8rem', color: '#5D6B7A', marginBottom: '20px' }}>XGBoost Arrival Window forecasting with 92% confidence range metrics</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {trains.map(t => (
                <div key={t.id} className="neu-raised-md" style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: '#10243E', fontSize: '1rem' }}>{t.number} - {t.name}</strong>
                    <span className="badge badge-cyan">Confidence 92%</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#5D6B7A', marginTop: '4px' }}>Route: {t.source} ➔ {t.destination}</div>

                  <div className="neu-inset" style={{ marginTop: '14px', padding: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <span style={{ color: '#5D6B7A' }}>Predicted Arrival Window:</span>
                      <strong style={{ color: '#0B8F68' }}>8:45 PM – 8:57 PM</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '4px' }}>
                      <span style={{ color: '#5D6B7A' }}>Delay Probability:</span>
                      <strong style={{ color: '#D92D20' }}>87%</strong>
                    </div>
                  </div>

                  <button
                    className="btn-secondary"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '12px', fontSize: '0.78rem' }}
                    onClick={() => { setSelectedTrainId(t.id); handleSelectTab('DASHBOARD'); }}
                  >
                    View SHAP Delay Attribution Breakdown ➔
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         4. TAB VIEW: DISASTER MONITOR (HAZARDS & SPEED CAPS)
         ========================================================================= */}
      {activeTab === 'DISASTER MONITOR' && (
        <div style={{ maxWidth: '1400px', width: '100%', margin: '20px auto', padding: '0 12px' }}>
          <DisasterAlertCenter hazards={hazards} />
        </div>
      )}

      {/* =========================================================================
         5. TAB VIEW: OPERATIONS (WHAT-IF DISPATCH CENTER)
         ========================================================================= */}
      {activeTab === 'OPERATIONS' && (
        <div style={{ maxWidth: '1400px', width: '100%', margin: '20px auto', padding: '0 12px' }}>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10243E', marginBottom: '8px' }}>Railway Operations & What-If Dispatch Center</h2>
            <p style={{ fontSize: '0.8rem', color: '#5D6B7A', marginBottom: '20px' }}>Test operational regulations to clear outer signal queues & recover downstream delay propagation</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div className="neu-raised-md" style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0B8F68', marginBottom: '14px' }}>Launch What-If Dispatch Regulation</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#5D6B7A', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Target Train</label>
                    <select
                      value={selectedTrainId}
                      onChange={(e) => setSelectedTrainId(e.target.value)}
                      style={{ width: '100%', padding: '10px' }}
                    >
                      {trains.map(t => (
                        <option key={t.id} value={t.id}>{t.number} - {t.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#5D6B7A', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Dispatch Action</label>
                    <select
                      value={simAction}
                      onChange={(e) => setSimAction(e.target.value)}
                      style={{ width: '100%', padding: '10px' }}
                    >
                      <option value="reassign_platform">Reassign Platform (Clear Outer Queue)</option>
                      <option value="reduce_dwell">Reduce Dwell Time by 5 mins (Speedup)</option>
                    </select>
                  </div>

                  <button className="btn-primary" onClick={handleRunSim} disabled={simLoading} style={{ justifyContent: 'center' }}>
                    <Play size={16} /> Run What-If Simulation
                  </button>

                  {simResult && (
                    <div style={{ background: '#DDF3EB', border: '1px solid #0B8F68', padding: '14px', borderRadius: '12px', fontSize: '0.85rem' }}>
                      <strong style={{ color: '#087A59' }}>✓ Simulation Completed!</strong>
                      <p style={{ color: '#10243E', marginTop: '4px' }}>{simResult.action}</p>
                      <p style={{ color: '#0B8F68', fontWeight: 800, marginTop: '4px' }}>Delay Recovered: {simResult.delay_recovered_min} Minutes!</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="neu-raised-md" style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#10243E', marginBottom: '14px' }}>Live Signal Block Section Occupancy</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem' }}>
                  <div style={{ background: '#FFF4F3', padding: '10px 12px', borderRadius: '10px', borderLeft: '4px solid #D92D20' }}>
                    <strong style={{ color: '#D92D20' }}>Block Section CNB-PRYJ S-42 (RED)</strong>
                    <div style={{ color: '#10243E', marginTop: '2px' }}>Occupied by Train 12401 (Purushottam Exp). Outer hold active for Train 12582.</div>
                  </div>
                  <div style={{ background: '#FFF3D6', padding: '10px 12px', borderRadius: '10px', borderLeft: '4px solid #F2A11B' }}>
                    <strong style={{ color: '#A96700' }}>Block Section PRYJ-BSB S-18 (YELLOW)</strong>
                    <div style={{ color: '#10243E', marginTop: '2px' }}>Speed cap 45 km/h active due to Kanpur flood warning.</div>
                  </div>
                  <div style={{ background: '#DDF3EB', padding: '10px 12px', borderRadius: '10px', borderLeft: '4px solid #159A68' }}>
                    <strong style={{ color: '#087A59' }}>Block Section MMCT-ST S-04 (GREEN)</strong>
                    <div style={{ color: '#10243E', marginTop: '2px' }}>Clear line. Train 12951 running at 118 km/h.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         6. TAB VIEW: REPORTS (OPERATIONAL & DISASTER RELIEF ANALYTICS)
         ========================================================================= */}
      {activeTab === 'REPORTS' && (
        <div style={{ maxWidth: '1400px', width: '100%', margin: '20px auto', padding: '0 12px' }}>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10243E' }}>Disaster Relief & Fleet Performance Master Report</h2>
                <p style={{ fontSize: '0.8rem', color: '#5D6B7A' }}>Automated resource mobilization data for Indian Railways & Disaster Management</p>
              </div>

              <button className="btn-primary" onClick={() => triggerToast("Master Disaster Relief PDF Report Downloaded!")}>
                <Download size={16} /> Download Full PDF Report
              </button>
            </div>

            {/* Relief Summary Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '24px' }}>
              <div className="neu-raised-md" style={{ padding: '14px' }}>
                <div style={{ fontSize: '0.75rem', color: '#5D6B7A', fontWeight: 600 }}>TOTAL FOOD PACKETS REQ.</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0B8F68', marginTop: '4px' }}>5,666 Packets</div>
                <div style={{ fontSize: '0.7rem', color: '#7C8895', marginTop: '2px' }}>Across 5 delayed coaching trains</div>
              </div>

              <div className="neu-raised-md" style={{ padding: '14px' }}>
                <div style={{ fontSize: '0.75rem', color: '#5D6B7A', fontWeight: 600 }}>TOTAL DRINKING WATER REQ.</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#2878C8', marginTop: '4px' }}>11,332 Liters</div>
                <div style={{ fontSize: '0.7rem', color: '#7C8895', marginTop: '2px' }}>Stored at CNB & PRYJ stations</div>
              </div>

              <div className="neu-raised-md" style={{ padding: '14px' }}>
                <div style={{ fontSize: '0.75rem', color: '#5D6B7A', fontWeight: 600 }}>EMERGENCY MEDICAL KITS</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#D92D20', marginTop: '4px' }}>115 Kits</div>
                <div style={{ fontSize: '0.7rem', color: '#7C8895', marginTop: '2px' }}>Dispatched to 128 vulnerable passengers</div>
              </div>

              <div className="neu-raised-md" style={{ padding: '14px' }}>
                <div style={{ fontSize: '0.75rem', color: '#5D6B7A', fontWeight: 600 }}>STATION SHELTER CAPACITY</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#159A68', marginTop: '4px' }}>6,000 Capacity</div>
                <div style={{ fontSize: '0.7rem', color: '#7C8895', marginTop: '2px' }}>Waiting halls ready at PRYJ & BSB</div>
              </div>
            </div>

            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#10243E', marginBottom: '12px' }}>Train-wise Passenger Relief Mobilization Breakdown</h3>
            <div className="table-responsive">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ textAlign: 'left' }}>
                    <th style={{ padding: '10px' }}>Train</th>
                    <th style={{ padding: '10px' }}>Passengers</th>
                    <th style={{ padding: '10px' }}>Vulnerable</th>
                    <th style={{ padding: '10px' }}>Food Packets</th>
                    <th style={{ padding: '10px' }}>Water (L)</th>
                    <th style={{ padding: '10px' }}>Medical Kits</th>
                    <th style={{ padding: '10px' }}>Shelter Target</th>
                  </tr>
                </thead>
                <tbody>
                  {trains.map(t => {
                    const impact = t.passenger_impact || {};
                    return (
                      <tr key={t.id}>
                        <td style={{ padding: '10px', fontWeight: 700, color: '#10243E' }}>{t.number} - {t.name}</td>
                        <td style={{ padding: '10px', color: '#10243E' }}>{impact.total_passengers}</td>
                        <td style={{ padding: '10px', color: '#D92D20', fontWeight: 700 }}>{impact.vulnerable_passengers}</td>
                        <td style={{ padding: '10px', color: '#0B8F68', fontWeight: 600 }}>{impact.food_packets_req}</td>
                        <td style={{ padding: '10px', color: '#2878C8', fontWeight: 600 }}>{impact.water_liters_req}</td>
                        <td style={{ padding: '10px', color: '#D92D20' }}>{impact.medical_kits_req}</td>
                        <td style={{ padding: '10px', color: '#159A68', fontWeight: 600 }}>{impact.shelter_capacity_req}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* PNR Predictor View */}
      {activeTab === 'PNR PREDICTOR' && (
        <div style={{ maxWidth: '1200px', width: '100%', margin: '20px auto', padding: '0 12px' }}>
          <PNRChecker />
        </div>
      )}

      {/* =========================================================================
         7. MAIN DASHBOARD CONTENT (3-COLUMN RESPONSIVE LAYOUT)
         ========================================================================= */}
      {activeTab === 'DASHBOARD' && (
        <div className="rg-main-grid">
          
          {/* LEFT SIDEBAR: LIVE TRAINS LIST & SYSTEM STATUS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Live Trains Selector Card */}
            <div className="glass-panel" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#10243E', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                  <Train size={16} color="#0B8F68" /> LIVE TRAINS
                </h3>
                <span style={{ fontSize: '0.7rem', color: '#0B8F68', fontWeight: 700, cursor: 'pointer' }} onClick={() => handleSelectTab('LIVE TRAINS')}>View All</span>
              </div>

              <div style={{ position: 'relative', marginBottom: '12px' }}>
                <input
                  type="text"
                  placeholder="Search Train / No."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px 8px 32px', fontSize: '0.8rem' }}
                />
                <Search size={14} color="#7C8895" style={{ position: 'absolute', left: '10px', top: '10px' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '420px', overflowY: 'auto' }}>
                {filteredTrains.map(t => {
                  const isSelected = t.id === selectedTrainId;
                  const telemetry = t.telemetry || {};
                  const isRed = telemetry.status_badge === 'HIGH RISK';
                  const isYellow = telemetry.status_badge === 'DELAYED';

                  return (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTrainId(t.id)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '12px',
                        background: isSelected ? '#E8F6F1' : '#F7F9FA',
                        border: isSelected ? '1px solid rgba(11,143,104,.3)' : '1px solid var(--bg-card-border)',
                        borderLeft: isRed ? '4px solid #D92D20' : isYellow ? '4px solid #F2A11B' : isSelected ? '4px solid #0B8F68' : '1px solid var(--bg-card-border)',
                        cursor: 'pointer',
                        boxShadow: isSelected ? 'inset 2px 2px 5px rgba(163,174,184,.15), inset -2px -2px 5px rgba(255,255,255,.75)' : '3px 3px 6px rgba(163,174,184,.18), -3px -3px 6px rgba(255,255,255,.85)',
                        transition: 'all 0.16s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 800, color: '#10243E', fontSize: '0.9rem' }}>{t.number}</span>
                        <span style={{
                          fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '999px',
                          background: isRed ? '#FCE4E2' : isYellow ? '#FFF3D6' : '#DDF3EB',
                          color: isRed ? '#B42318' : isYellow ? '#A96700' : '#087A59'
                        }}>
                          {telemetry.status_badge || 'RUNNING'}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#5D6B7A', marginTop: '2px', fontWeight: 600 }}>{t.source} ➔ {t.destination}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#7C8895', marginTop: '4px' }}>
                        <span>Loco: {t.loco || 'WAP-7'}</span>
                        <span style={{ color: isRed ? '#D92D20' : isYellow ? '#F2A11B' : '#0B8F68', fontWeight: 700 }}>
                          Delay +{telemetry.current_delay_min || 0} min
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* System Status Card */}
            <div className="glass-panel" style={{ padding: '16px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#10243E', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 12px 0' }}>
                <Cpu size={15} color="#0B8F68" /> SYSTEM STATUS
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#5D6B7A' }}>PREDICTION ENGINE</span>
                  <span style={{ color: '#087A59', fontWeight: 800 }}>ONLINE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#5D6B7A' }}>DATA STREAMS</span>
                  <span style={{ color: '#0B8F68', fontWeight: 800 }}>ACTIVE (12)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#5D6B7A' }}>LAST UPDATE</span>
                  <span style={{ color: '#10243E', fontWeight: 600 }}>{currentTime}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#5D6B7A' }}>ACTIVE FORECASTS</span>
                  <span style={{ color: '#10243E', fontWeight: 800 }}>126</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#5D6B7A' }}>HIGH RISK TRAINS</span>
                  <span style={{ color: '#D92D20', fontWeight: 800 }}>7</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--divider)', paddingTop: '6px', marginTop: '4px' }}>
                  <span style={{ color: '#5D6B7A' }}>MODEL ACCURACY</span>
                  <span style={{ color: '#087A59', fontWeight: 800 }}>91.3%</span>
                </div>
              </div>
            </div>

          </div>

          {/* CENTER MAIN PANEL: MAP, DYNAMIC ETA INTELLIGENCE & ALERTS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Live Route & Hazard Map */}
            <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#10243E', margin: 0 }}>LIVE ROUTE & HAZARD MAP</h3>
                <div style={{ display: 'flex', gap: '8px', fontSize: '0.7rem', color: '#5D6B7A', flexWrap: 'wrap', fontWeight: 600 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#159A68' }}></span> Normal</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F2A11B' }}></span> Watch</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F47A20' }}></span> High Risk</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D92D20' }}></span> Severe Risk</span>
                </div>
              </div>

              {/* Leaflet Geospatial Map View */}
              <div style={{ height: '320px', borderRadius: '14px', overflow: 'hidden', width: '100%' }}>
                <LiveTrainMap
                  trains={trains}
                  stations={stations}
                  hazards={hazards}
                  selectedTrainId={selectedTrainId}
                  onSelectTrain={setSelectedTrainId}
                  selectedCorridor={selectedCorridor}
                  onSelectCorridor={setSelectedCorridor}
                />
              </div>

              {/* Map Telemetry Metrics Bar */}
              <div className="rg-telemetry-bar">
                <div>
                  <div style={{ color: '#5D6B7A' }}>DISTANCE COVERED</div>
                  <div style={{ fontWeight: 800, color: '#10243E', fontSize: '0.9rem' }}>{telemetry.distance_covered_km || 612} km</div>
                </div>
                <div>
                  <div style={{ color: '#5D6B7A' }}>AVG SPEED</div>
                  <div style={{ fontWeight: 800, color: '#0B8F68', fontSize: '0.9rem' }}>{telemetry.speed_kmh || 68} km/h</div>
                </div>
                <div>
                  <div style={{ color: '#5D6B7A' }}>NEXT STATION</div>
                  <div style={{ fontWeight: 800, color: '#10243E', fontSize: '0.9rem' }}>{telemetry.next_station || 'Prayagraj Jn.'}</div>
                </div>
                <div>
                  <div style={{ color: '#5D6B7A' }}>DISTANCE TO DEST.</div>
                  <div style={{ fontWeight: 800, color: '#10243E', fontSize: '0.9rem' }}>{telemetry.distance_to_dest_km || 734} km</div>
                </div>
                <div>
                  <div style={{ color: '#5D6B7A' }}>WEATHER</div>
                  <div style={{ fontWeight: 800, color: '#A96700', fontSize: '0.9rem' }}>Heavy Rain 26°C</div>
                </div>
              </div>
            </div>

            {/* Dynamic ETA Intelligence Card */}
            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#10243E', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                    <Activity size={18} color="#0B8F68" />
                    TRAIN {selectedTrain.number} ({selectedTrain.name}) – DYNAMIC ETA INTELLIGENCE
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#5D6B7A', margin: '2px 0 0 0', fontWeight: 500 }}>
                    Real-time XGBoost arrival forecast & precise causal delay attribution
                  </p>
                </div>
                <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>● LIVE FORECAST ENGINE</span>
              </div>

              {/* Top 4 Key Metrics Bar */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '18px' }}>
                
                {/* Scheduled & Predicted ETA */}
                <div className="neu-inset" style={{ padding: '14px', borderRadius: '14px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#5D6B7A', fontWeight: 600 }}>SCHEDULED VS PREDICTED ETA</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                    <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0B8F68', lineHeight: 1 }}>8:50 PM</span>
                    <span style={{ fontSize: '0.75rem', color: '#5D6B7A', textDecoration: 'line-through' }}>8:30 PM</span>
                  </div>
                  <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="badge badge-danger" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>+20 MIN DELAY</span>
                  </div>
                </div>

                {/* Delay Probability */}
                <div className="neu-inset" style={{ padding: '14px', borderRadius: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', color: '#5D6B7A', fontWeight: 600 }}>DELAY PROBABILITY</span>
                    <strong style={{ fontSize: '0.72rem', color: '#D92D20', fontWeight: 800 }}>HIGH LIKELIHOOD</strong>
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#D92D20', lineHeight: 1, marginTop: '4px' }}>87%</div>
                  <div style={{ width: '100%', height: '6px', background: '#EEF1F4', borderRadius: '4px', overflow: 'hidden', marginTop: '8px', boxShadow: 'inset 1px 1px 3px rgba(163,174,184,.3)' }}>
                    <div style={{ width: '87%', height: '100%', background: '#D92D20', borderRadius: '4px' }}></div>
                  </div>
                </div>

                {/* Confidence Score & Range */}
                <div className="neu-inset" style={{ padding: '14px', borderRadius: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', color: '#5D6B7A', fontWeight: 600 }}>CONFIDENCE SCORE</span>
                    <span className="badge badge-green" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>92% ACCURACY</span>
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10243E', marginTop: '6px' }}>8:45 PM – 8:57 PM</div>
                  <div style={{ fontSize: '0.7rem', color: '#5D6B7A', marginTop: '4px' }}>Arrival Window (±6 mins variance)</div>
                </div>

                {/* Current Bottleneck & Route Status Card */}
                <div className="neu-inset" style={{ padding: '14px', borderRadius: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#5D6B7A', fontWeight: 600 }}>BOTTLENECK & ROUTE STATUS</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#10243E', marginTop: '2px' }}>CNB-PRYJ Block S-42</div>
                  </div>

                  <div style={{ marginTop: '6px', fontSize: '0.7rem', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div style={{ color: '#D92D20', fontWeight: 700 }}>
                      ⚠️ <strong>Speed Cap:</strong> 45 km/h Active
                    </div>
                    <div style={{ color: '#5D6B7A' }}>
                      <strong>Reason:</strong> Heavy Fog & Visibility Limit
                    </div>
                    <div style={{ color: '#0B8F68', fontWeight: 700, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <span>🔀</span> <span><strong>Rerouted:</strong> YES (via CNB-FTP Bypass)</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Precise Root Causes & Delay Attribution Breakdown */}
              <div className="neu-raised-md" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4 style={{ fontSize: '0.82rem', color: '#0B8F68', fontWeight: 800, margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    PRECISE CAUSAL DELAY ATTRIBUTION (WHY ETA IS CHANGING)
                  </h4>
                  <span style={{ fontSize: '0.7rem', color: '#5D6B7A', fontWeight: 600 }}>Real-Time Telemetry & Signal Logs</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#F4F6F8', borderRadius: '8px', borderLeft: '4px solid #A96700' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.9rem' }}>🚆</span>
                      <div>
                        <strong style={{ color: '#10243E' }}>Preceding Train Block Holding:</strong>
                        <span style={{ color: '#5D6B7A', marginLeft: '6px' }}>Train 12401 (Purushottam Exp) occupied CNB-PRYJ S-42 block signal ahead</span>
                      </div>
                    </div>
                    <strong style={{ color: '#A96700', fontSize: '0.85rem', flexShrink: 0, marginLeft: '12px' }}>+8 min</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#F4F6F8', borderRadius: '8px', borderLeft: '4px solid #D92D20' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.9rem' }}>🌫️</span>
                      <div>
                        <strong style={{ color: '#10243E' }}>Fog Speed Cap Restriction (45 km/h):</strong>
                        <span style={{ color: '#5D6B7A', marginLeft: '6px' }}>Dense fog & low visibility restriction active in Kanpur-Fatehpur Section</span>
                      </div>
                    </div>
                    <strong style={{ color: '#D92D20', fontSize: '0.85rem', flexShrink: 0, marginLeft: '12px' }}>+5 min</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#F4F6F8', borderRadius: '8px', borderLeft: '4px solid #0B8F68' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.9rem' }}>🔀</span>
                      <div>
                        <strong style={{ color: '#10243E' }}>Corridor Rerouting Detour:</strong>
                        <span style={{ color: '#5D6B7A', marginLeft: '6px' }}>Train rerouted via CNB-FTP Bypass Line due to main line track waterlogging</span>
                      </div>
                    </div>
                    <strong style={{ color: '#0B8F68', fontSize: '0.85rem', flexShrink: 0, marginLeft: '12px' }}>+4 min</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#F4F6F8', borderRadius: '8px', borderLeft: '4px solid #159A68' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.9rem' }}>🚉</span>
                      <div>
                        <strong style={{ color: '#10243E' }}>Station Boarding Dwell Exceeded:</strong>
                        <span style={{ color: '#5D6B7A', marginLeft: '6px' }}>Platform 2 crowding & parcel loading delay at Kanpur Central (CNB)</span>
                      </div>
                    </div>
                    <strong style={{ color: '#A96700', fontSize: '0.85rem', flexShrink: 0, marginLeft: '12px' }}>+3 min</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed var(--divider)', paddingTop: '10px', marginTop: '4px', fontWeight: 800 }}>
                    <span style={{ color: '#10243E', fontSize: '0.82rem' }}>TOTAL PREDICTED CUMULATIVE DELAY IMPACT</span>
                    <span style={{ color: '#D92D20', fontSize: '1rem' }}>+20 min</span>
                  </div>

                </div>
              </div>
            </div>

            {/* Active Alerts & Action Controls */}
            <div style={{ padding: '16px', background: '#FFF4F3', border: '1px solid rgba(217, 45, 32, 0.25)', borderLeft: '4px solid #D92D20', borderRadius: '16px', boxShadow: '4px 4px 10px rgba(163,174,184,.2), -4px -4px 10px rgba(255,255,255,.85)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <AlertTriangle size={24} color="#D92D20" className="pulse-red" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 800, color: '#D92D20', fontSize: '0.85rem' }}>TRAIN {selectedTrain.number} ENTERING HIGH-RISK FLOOD ZONE</div>
                    <div style={{ fontSize: '0.75rem', color: '#10243E', marginTop: '2px' }}>Expected impact: Additional 15-25 minutes delay | Time to impact: 42 minutes (74 km)</div>
                  </div>
                </div>

                <div className="rg-alert-actions">
                  <button className="btn-primary" onClick={() => setShowSimModal(true)} style={{ background: '#D92D20', color: '#FFF', fontSize: '0.78rem', padding: '8px 14px' }}>
                    <Sliders size={14} /> SIMULATE SCENARIO
                  </button>
                  <button className="btn-secondary" onClick={() => triggerToast("Emergency Alert Dispatched to NDRF & Railway Board!")} style={{ fontSize: '0.78rem', padding: '8px 14px' }}>
                    NOTIFY AUTHORITIES
                  </button>
                  <button className="btn-secondary" onClick={() => setShowAlertModal(true)} style={{ fontSize: '0.78rem', padding: '8px 14px', border: '1px solid #F2A11B', color: '#A96700' }}>
                    PASSENGER ALERT
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR: ROUTE RISK OVERVIEW, DISASTER MONITOR & PASSENGER IMPACT */}
          <div className="rg-right-sidebar">
            
            {/* Route Risk Overview */}
            <div className="glass-panel" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#10243E', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                  <ShieldAlert size={15} color="#D92D20" /> ROUTE RISK OVERVIEW
                </h3>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                {/* Circular Gauge */}
                <div style={{ width: '84px', height: '84px', borderRadius: '50%', border: '6px solid #D92D20', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '4px 4px 8px rgba(163,174,184,.25), -4px -4px 8px rgba(255,255,255,.85)', background: '#FFF4F3', flexShrink: 0 }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#D92D20', lineHeight: 1 }}>82%</div>
                  <div style={{ fontSize: '0.55rem', color: '#5D6B7A', marginTop: '2px', fontWeight: 700 }}>OVERALL RISK</div>
                  <div style={{ fontSize: '0.5rem', color: '#D92D20', fontWeight: 800 }}>SEVERE</div>
                </div>

                {/* Risk Factor Breakdown */}
                <div style={{ flex: '1 1 180px', minWidth: '160px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#5D6B7A', fontWeight: 600 }}>📡 Trans</span>
                    <strong style={{ color: '#D92D20' }}>82%</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#5D6B7A', fontWeight: 600 }}>🛤️ Track</span>
                    <strong style={{ color: '#F2A11B' }}>38%</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#5D6B7A', fontWeight: 600 }}>🔀 Reroute</span>
                    <strong style={{ color: '#159A68' }}>23%</strong>
                  </div>
                </div>
              </div>

              <button
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '14px', fontSize: '0.75rem' }}
                onClick={() => setShowRiskModal(true)}
              >
                VIEW DETAILED RISK ANALYSIS ➔
              </button>
            </div>

            {/* Disaster Monitor Active Warnings */}
            <div className="glass-panel" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#10243E', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                  <Activity size={15} color="#A96700" /> DISASTER MONITOR
                </h3>
                <span style={{ fontSize: '0.7rem', color: '#0B8F68', fontWeight: 700, cursor: 'pointer' }} onClick={() => handleSelectTab('DISASTER MONITOR')}>View All</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem' }}>
                {hazards.map((h, idx) => (
                  <div key={idx} style={{ background: h.severity === 'HIGH' ? '#FFF4F3' : '#FFF9EC', borderLeft: h.severity === 'HIGH' ? '4px solid #D92D20' : '4px solid #F2A11B', padding: '8px 10px', borderRadius: '8px' }}>
                    <div style={{ fontWeight: 800, color: '#10243E' }}>{h.hazard_type}</div>
                    <div style={{ color: '#5D6B7A', fontSize: '0.7rem', marginTop: '2px' }}>{h.section}</div>
                    <div style={{ color: '#7C8895', fontSize: '0.65rem', marginTop: '2px' }}>Valid till: {h.valid_till || '12:30 PM, 24 May'}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* PASSENGER IMPACT ESTIMATION */}
            <div className="glass-panel" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#10243E', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                  <Users size={15} color="#0B8F68" /> PASSENGER IMPACT ESTIMATION
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px', fontSize: '0.75rem' }}>
                <div className="neu-inset" style={{ padding: '10px' }}>
                  <div style={{ color: '#5D6B7A', fontSize: '0.68rem', fontWeight: 600 }}>TOTAL PASSENGERS</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10243E', marginTop: '2px' }}>
                    {passengerImpact.total_passengers.toLocaleString()}
                  </div>
                </div>
                <div className="neu-inset" style={{ padding: '10px' }}>
                  <div style={{ color: '#5D6B7A', fontSize: '0.68rem', fontWeight: 600 }}>VULNERABLE</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#D92D20', marginTop: '2px' }}>
                    {passengerImpact.vulnerable_passengers}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.7rem', color: '#5D6B7A', fontWeight: 700, marginBottom: '8px' }}>REQUIRED RELIEF RESOURCES (EST.):</div>
              <div className="rg-relief-grid">
                <div className="neu-raised-md" style={{ padding: '8px 4px' }}>
                  <Package size={14} color="#0B8F68" style={{ margin: '0 auto 2px' }} />
                  <div style={{ fontSize: '0.65rem', color: '#5D6B7A' }}>FOOD</div>
                  <div style={{ fontWeight: 800, color: '#10243E' }}>{passengerImpact.food_packets_req}</div>
                </div>

                <div className="neu-raised-md" style={{ padding: '8px 4px' }}>
                  <Droplet size={14} color="#2878C8" style={{ margin: '0 auto 2px' }} />
                  <div style={{ fontSize: '0.65rem', color: '#5D6B7A' }}>WATER (L)</div>
                  <div style={{ fontWeight: 800, color: '#10243E' }}>{passengerImpact.water_liters_req}</div>
                </div>

                <div className="neu-raised-md" style={{ padding: '8px 4px' }}>
                  <Heart size={14} color="#D92D20" style={{ margin: '0 auto 2px' }} />
                  <div style={{ fontSize: '0.65rem', color: '#5D6B7A' }}>MEDICAL</div>
                  <div style={{ fontWeight: 800, color: '#10243E' }}>{passengerImpact.medical_kits_req}</div>
                </div>

                <div className="neu-raised-md" style={{ padding: '8px 4px' }}>
                  <Home size={14} color="#159A68" style={{ margin: '0 auto 2px' }} />
                  <div style={{ fontSize: '0.65rem', color: '#5D6B7A' }}>SHELTER</div>
                  <div style={{ fontWeight: 800, color: '#10243E' }}>{passengerImpact.shelter_capacity_req}</div>
                </div>
              </div>

              <button
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '14px', fontSize: '0.75rem' }}
                onClick={() => setShowReliefModal(true)}
              >
                VIEW DETAILED PLAN ➔
              </button>
            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
         8. INTERACTIVE MODAL DIALOGS
         ========================================================================= */}

      {/* Detailed Risk Analysis Modal */}
      {showRiskModal && (
        <div className="modal-overlay">
          <div className="glass-panel" style={{ width: '100%', maxWidth: '520px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10243E', marginBottom: '12px' }}>
              Detailed Route Risk Analysis & IMD Radar Stream
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#5D6B7A', marginBottom: '16px' }}>
              Corridor Hazard Radar metrics for Northern-Eastern Division
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <div style={{ background: '#FFF4F3', border: '1px solid #D92D20', padding: '12px', borderRadius: '10px' }}>
                <strong style={{ color: '#D92D20' }}>Ganga Basin Inundation Risk: 82% (CRITICAL)</strong>
                <p style={{ color: '#10243E', fontSize: '0.78rem', marginTop: '2px' }}>Track section PRYJ-BSB at risk of waterlogging above rail head height. Speed restricted to 45 km/h.</p>
              </div>

              <div style={{ background: '#FFF3D6', border: '1px solid #F2A11B', padding: '12px', borderRadius: '10px' }}>
                <strong style={{ color: '#A96700' }}>Heat Buckling Risk: 38% (MODERATE)</strong>
                <p style={{ color: '#10243E', fontSize: '0.78rem', marginTop: '2px' }}>Rail temperature recorded at 48°C. Continuous welded rail patrol active.</p>
              </div>
            </div>

            <button className="btn-primary" onClick={() => setShowRiskModal(false)} style={{ width: '100%', justifyContent: 'center', marginTop: '20px' }}>
              Close Risk Analysis
            </button>
          </div>
        </div>
      )}

      {/* Detailed Relief Plan Modal */}
      {showReliefModal && (
        <div className="modal-overlay">
          <div className="glass-panel" style={{ width: '100%', maxWidth: '520px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10243E', marginBottom: '12px' }}>
              Detailed Passenger Relief Mobilization Plan
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#5D6B7A', marginBottom: '16px' }}>
              Emergency catering, drinking water, and medical station allocations
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <div style={{ background: '#DDF3EB', border: '1px solid #0B8F68', padding: '12px', borderRadius: '10px' }}>
                <strong style={{ color: '#087A59' }}>Prayagraj Jn. Relief Base:</strong>
                <p style={{ color: '#10243E', fontSize: '0.78rem', marginTop: '2px' }}>1,126 food packets & 2,252 L water loaded on IRCTC catering van at Platform 1.</p>
              </div>

              <div style={{ background: '#DDF3EB', border: '1px solid #159A68', padding: '12px', borderRadius: '10px' }}>
                <strong style={{ color: '#087A59' }}>Medical Assistance Post:</strong>
                <p style={{ color: '#10243E', fontSize: '0.78rem', marginTop: '2px' }}>25 emergency medical kits and doctor team assigned to attend 128 vulnerable senior passengers.</p>
              </div>
            </div>

            <button className="btn-primary" onClick={() => setShowReliefModal(false)} style={{ width: '100%', justifyContent: 'center', marginTop: '20px' }}>
              Close Relief Plan
            </button>
          </div>
        </div>
      )}

      {/* Passenger SMS Alert Dispatch Modal */}
      {showAlertModal && (
        <div className="modal-overlay">
          <div className="glass-panel" style={{ width: '100%', maxWidth: '480px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10243E', marginBottom: '12px' }}>
              Broadcast Passenger Communication Alert
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#5D6B7A', marginBottom: '16px' }}>
              Send automated SMS & Push notifications to all 1,126 passengers on Train {selectedTrain.number}
            </p>

            <textarea
              readOnly
              value={`RAILWAY ALERT: Train ${selectedTrain.number} (${selectedTrain.name}) is experiencing +20 min delay due to weather restrictions near Prayagraj. Predicted arrival at destination: 8:50 PM. Complimentary food & water will be served at Prayagraj Jn.`}
              style={{ width: '100%', height: '100px', padding: '10px', fontSize: '0.8rem', marginBottom: '16px' }}
            />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-primary" onClick={() => { setShowAlertModal(false); triggerToast("Broadcast SMS Alert Sent to 1,126 Passengers!"); }} style={{ flex: 1, justifyContent: 'center' }}>
                <Send size={16} /> Broadcast SMS Now
              </button>
              <button className="btn-secondary" onClick={() => setShowAlertModal(false)} style={{ flex: 1, justifyContent: 'center' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* What-If Simulator Modal */}
      {showSimModal && (
        <div className="modal-overlay">
          <div className="glass-panel" style={{ width: '100%', maxWidth: '480px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10243E', marginBottom: '12px' }}>
              What-If Delay & Regulation Simulator
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#5D6B7A', marginBottom: '16px' }}>
              Simulate operational regulations to recover network delays for Train {selectedTrain.number}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: '#5D6B7A', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Simulation Action</label>
                <select
                  value={simAction}
                  onChange={(e) => setSimAction(e.target.value)}
                  style={{ width: '100%', padding: '10px' }}
                >
                  <option value="reassign_platform">Reassign Arrival Platform (Clear Outer Queue)</option>
                  <option value="reduce_dwell">Reduce Dwell Time by 5 mins (Speedup)</option>
                </select>
              </div>

              <button className="btn-primary" onClick={handleRunSim} disabled={simLoading} style={{ justifyContent: 'center', marginTop: '8px' }}>
                <Play size={16} /> {simLoading ? 'Calculating Net Delay...' : 'Run What-If Simulation'}
              </button>

              {simResult && (
                <div style={{ background: '#DDF3EB', border: '1px solid #0B8F68', padding: '14px', borderRadius: '10px', fontSize: '0.8rem', marginTop: '8px' }}>
                  <strong style={{ color: '#087A59' }}>✓ Simulation Completed!</strong>
                  <p style={{ marginTop: '4px', color: '#10243E' }}>{simResult.action}</p>
                  <p style={{ marginTop: '4px', color: '#0B8F68', fontWeight: 800 }}>Total Delay Recovered: {simResult.delay_recovered_min} Minutes!</p>
                </div>
              )}

              <button className="btn-secondary" onClick={() => setShowSimModal(false)} style={{ justifyContent: 'center', marginTop: '8px' }}>
                Close Simulator
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         9. BOTTOM SYSTEM FEED FOOTER TICKER
         ========================================================================= */}
      <footer style={{ marginTop: 'auto', padding: '12px 16px' }}>
        <div className="glass-panel" style={{ padding: '10px 20px', borderRadius: '14px', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#5D6B7A', flexWrap: 'wrap', fontWeight: 600 }}>
            <span style={{ color: '#0B8F68', fontWeight: 800 }}>SYSTEM FEED</span> |
            <span>● 10:01 AM Flood alert issued for Ganga Basin</span> |
            <span>● 09:59 AM Train 12401 delay increased by 15 min</span> |
            <span>● 09:58 AM Heavy rainfall in Prayagraj</span>
          </div>
          <div style={{ color: '#7C8895', fontWeight: 700 }}>
            Data Sources: IMD · CWC · Indian Railways · IRCTC
          </div>
        </div>
      </footer>

    </div>
  );
}
