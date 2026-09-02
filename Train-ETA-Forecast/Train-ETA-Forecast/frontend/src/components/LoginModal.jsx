import React, { useState } from 'react';
import { X, Lock, UserCheck, ShieldCheck, Key } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [role, setRole] = useState('citizen');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'official') {
      if (username === 'railway' && password === 'sih2026') {
        onLoginSuccess({ name: 'Chief Dispatcher (CNB Division)', role: 'official' });
        onClose();
      } else {
        setError('Invalid Official credentials! Use: username = railway, password = sih2026');
      }
    } else {
      onLoginSuccess({ name: username || 'Citizen Commuter', role: 'citizen' });
      onClose();
    }
  };

  const handleDemoPreset = (presetRole) => {
    if (presetRole === 'official') {
      setRole('official');
      setUsername('railway');
      setPassword('sih2026');
      setError('');
    } else {
      setRole('citizen');
      setUsername('Aman Kumar');
      setPassword('');
      setError('');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel" style={{ width: '100%', maxWidth: '440px', padding: '28px', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#5D6B7A', cursor: 'pointer' }}>
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#DDF3EB', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', boxShadow: '3px 3px 6px rgba(163,174,184,.2), -3px -3px 6px rgba(255,255,255,.8)' }}>
            <Lock size={24} color="#0B8F68" />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10243E', margin: 0 }}>Platform Access Login</h2>
          <p style={{ fontSize: '0.85rem', color: '#5D6B7A', marginTop: '4px' }}>Choose your profile to switch dashboard capabilities</p>
        </div>

        {/* Role Toggle Switcher */}
        <div className="neu-inset" style={{ display: 'flex', gap: '8px', padding: '4px', marginBottom: '20px' }}>
          <button
            type="button"
            onClick={() => setRole('citizen')}
            style={{
              flex: 1, padding: '8px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem',
              background: role === 'citizen' ? '#0B8F68' : 'transparent',
              color: role === 'citizen' ? '#FFF' : '#5D6B7A'
            }}
          >
            Citizen / Passenger
          </button>
          <button
            type="button"
            onClick={() => setRole('official')}
            style={{
              flex: 1, padding: '8px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem',
              background: role === 'official' ? '#7F56D9' : 'transparent',
              color: role === 'official' ? '#FFF' : '#5D6B7A'
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
            <label style={{ fontSize: '0.8rem', color: '#5D6B7A', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Username / PNR / Mobile</label>
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

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
            <ShieldCheck size={18} />
            Authenticate & Proceed
          </button>
        </form>

        {/* Demo Fast Preset Buttons */}
        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px dashed var(--divider)', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: '#7C8895', marginBottom: '8px', fontWeight: 600 }}>Fast Demo Credentials Preset:</p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <button type="button" onClick={() => handleDemoPreset('citizen')} className="btn-secondary" style={{ fontSize: '0.75rem', padding: '6px 12px' }}>
              Preset Passenger
            </button>
            <button type="button" onClick={() => handleDemoPreset('official')} className="btn-secondary" style={{ fontSize: '0.75rem', padding: '6px 12px' }}>
              Preset Official (railway / sih2026)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
