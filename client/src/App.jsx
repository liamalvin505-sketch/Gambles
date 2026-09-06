import React, { useState } from 'react';

export default function App() {
  const [balance, setBalance] = useState(5000);
  const [activeTab, setActiveTab] = useState('lobby');

  return (
    <div style={{ background: '#0b0f19', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', background: '#131b2e', padding: '15px 20px', borderRadius: '8px', border: '1px solid #1f293d' }}>
        <h2 style={{ color: '#00ffcc', margin: 0 }}>Gambles Casino Lobby</h2>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span style={{ background: '#1f293d', padding: '8px 15px', borderRadius: '8px' }}>
            Balance: <strong style={{ color: '#00ffcc' }}>{balance} BDT</strong>
          </span>
          <button onClick={() => setActiveTab('deposit')} style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Cash In</button>
          <button onClick={() => setActiveTab('withdraw')} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Cash Out</button>
        </div>
      </header>

      <div style={{ background: '#1e293b', padding: '25px', borderRadius: '10px', textAlign: 'center', border: '1px solid #334155' }}>
        <h3>Welcome to the Live Platform</h3>
        <p style={{ color: '#94a3b8' }}>Your MERN casino lobby interface is active and ready!</p>
      </div>
    </div>
  );
}
