import React from 'react';

export default function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', color: '#fff', background: '#0b0f19', height: '100vh', padding: '20px' }}>
      <h1>Gambles Casino Lobby</h1>
      <p>System is running successfully!</p>
    </div>
  );
}
import React from 'react';
import AllInOneCasino from './components/AllInOneCasino';

export default function App() {
  return (
    <div>
      <AllInOneCasino />
    </div>
  );
}
