import React, { useState } from 'react';

export default function App() {
  const [balance, setBalance] = useState(5.15);
  const [activeTab, setActiveTab] = useState('home');
  const [subPage, setSubPage] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [trxId, setTrxId] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const hotGames = [
    { id: 'h1', name: 'Aviator', provider: 'Spribe', url: 'https://demo.spribe.co/launch/aviator' },
    { id: 'h2', name: 'Super Ace', provider: 'Jili', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 'h3', name: 'Wild Bounty Showdown', provider: 'Pocket Games Soft', url: 'https://democasino.pgsoft.com/games/slot/id/74' }
  ];

  return (
    <div style={{ background: '#121824', color: '#fff', minHeight: '100vh', fontFamily: 'Arial, sans-serif', paddingBottom: '70px', maxWidth: '480px', margin: '0 auto', position: 'relative' }}>
      
      {/* টপ হেডার */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', background: '#182030', borderBottom: '1px solid #222d42', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span onClick={() => setDrawerOpen(true)} style={{ fontSize: '22px', cursor: 'pointer', color: '#fff' }}>☰</span>
          <span style={{ fontSize: '20px', fontWeight: '900', color: '#ffb800', fontStyle: 'italic' }}>LA94<span style={{color: '#fff', fontSize: '11px'}}>.COM</span></span>
        </div>
        <div style={{ background: '#0e131f', padding: '4px 10px', borderRadius: '20px', border: '1px solid #ffb800' }}>
          <span style={{ fontSize: '11px', color: '#ffb800' }}>৳ </span>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>{balance.toFixed(2)}</span>
        </div>
      </header>

      {/* সাইড মেনু ড্রয়ার */}
      {drawerOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', zIndex: 2000, display: 'flex' }}>
          <div style={{ width: '280px', background: '#182030', height: '100%', padding: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222d42', paddingBottom: '10px' }}>
              <div style={{ color: '#ffb800', fontWeight: 'bold' }}>liamalvin</div>
              <span onClick={() => setDrawerOpen(false)} style={{ fontSize: '20px', cursor: 'pointer', color: '#aaa' }}>✕</span>
            </div>
            <div onClick={() => { setActiveTab('deposit'); setSubPage(null); setDrawerOpen(false); }} style={{ cursor: 'pointer', color: '#ccc' }}>🏛️ ডিপোজিট</div>
            <div onClick={() => { setActiveTab('withdraw'); setSubPage(null); setDrawerOpen(false); }} style={{ cursor: 'pointer', color: '#ccc' }}>💳 উত্তোলন</div>
            <div onClick={() => { setActiveTab('account'); setSubPage(null); setDrawerOpen(false); }} style={{ cursor: 'pointer', color: '#ccc' }}>👤 অ্যাকাউন্ট</div>
          </div>
          <div style={{ flex: 1 }} onClick={() => setDrawerOpen(false)}></div>
        </div>
      )}

      {/* মূল কন্টেন্ট */}
      <main style={{ padding: '10px' }}>
        {selectedGame ? (
          <div>
            <button onClick={() => setSelectedGame(null)} style={{ background: '#222d42', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '5px', marginBottom: '10px', cursor: 'pointer' }}>← লবিতে ফিরুন</button>
            <iframe src={selectedGame.url} title={selectedGame.name} width="100%" height="450px" style={{ border: 'none', borderRadius: '8px' }} allowFullScreen></iframe>
          </div>
        ) : subPage ? (
          <div style={{ background: '#182030', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
            <h3 style={{ color: '#ffb800' }}>{subPage}</h3>
            <button onClick={() => setSubPage(null)} style={{ background: '#222d42', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '5px', marginTop: '15px', cursor: 'pointer' }}>পেছনে যান</button>
          </div>
        ) : activeTab === 'deposit' ? (
          <div style={{ background: '#182030', padding: '15px', borderRadius: '10px' }}>
            <h3 style={{ color: '#ffb800', textAlign: 'center' }}>ডিপোজিট পেজ</h3>
            <input type="number" placeholder="পরিমাণ" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} style={{ width: '100%', padding: '10px', background: '#121824', color: '#fff', border: '1px solid #222d42', borderRadius: '6px', margin: '10px 0' }} />
            <button onClick={() => { setBalance(b => b + Number(depositAmount || 0)); setActiveTab('home'); }} style={{ width: '100%', background: '#22c55e', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold' }}>জমা কনফার্ম করুন</button>
          </div>
        ) : activeTab === 'withdraw' ? (
          <div style={{ background: '#182030', padding: '15px', borderRadius: '10px' }}>
            <h3 style={{ color: '#3b82f6', textAlign: 'center' }}>উত্তোলন পেজ</h3>
            <input type="number" placeholder="পরিমাণ" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} style={{ width: '100%', padding: '10px', background: '#121824', color: '#fff', border: '1px solid #222d42', borderRadius: '6px', margin: '10px 0' }} />
            <button onClick={() => { setBalance(b => b - Number(withdrawAmount || 0)); setActiveTab('home'); }} style={{ width: '100%', background: '#3b82f6', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold' }}>উত্তোলন পাঠান</button>
          </div>
        ) : activeTab === 'promotion' ? (
          <div style={{ background: '#182030', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
            <h3 style={{ color: '#ffb800' }}>প্রমোশন অফার</h3>
            <p style={{ color: '#aaa', fontSize: '12px' }}>চলমান কোনো অফার নেই।</p>
          </div>
        ) : activeTab === 'account' ? (
          <div>
            <div style={{ background: '#182030', padding: '15px', borderRadius: '10px', textAlign: 'center', marginBottom: '15px', border: '1px solid #ffb800' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffb800' }}>liamalvin (VIP4)</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', margin: '8px 0' }}>৳ {balance.toFixed(2)}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', textAlign: 'center' }}>
              {['পুরস্কার সেন্টার', 'বেটিং রেকর্ড', 'লাভ এবং লস', 'জমা রেকর্ড', 'উত্তোলন রেকর্ড', 'অ্যাকাউন্ট রেকর্ড', 'আমার অ্যাকাউন্ট', 'সুরক্ষা কেন্দ্র'].map((item, idx) => (
                <div key={idx} onClick={() => setSubPage(item)} style={{ background: '#182030', padding: '12px 5px', borderRadius: '8px', border: '1px solid #222d42', cursor: 'pointer' }}>
                  <div style={{ fontSize: '16px', marginBottom: '4px' }}>📂</div>
                  <span style={{ fontSize: '9px', color: '#ccc' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div style={{ background: '#182030', padding: '12px', borderRadius: '10px', marginBottom: '12px', border: '1px solid #ff3366' }}>
              <span style={{ background: '#ff3366', color: '#fff', fontSize: '9px', padding: '2px 6px', borderRadius: '4px' }}>VIP</span>
              <h4 style={{ color: '#ffb800', fontSize: '13px', margin: '5px 0' }}>প্রচার বোনাস: ৳ ২০,০০,০০০</h4>
            </div>

            <h4 style={{ fontSize: '13px', color: '#ffb800', marginBottom: '8px' }}>🔥 গরম গেমস</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {hotGames.map(game => (
                <div key={game.id} onClick={() => setSelectedGame(game)} style={{ background: '#182030', borderRadius: '8px', padding: '6px', textAlign: 'center', border: '1px solid #222d42', cursor: 'pointer' }}>
                  <div style={{ background: '#111622', height: '50px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px', color: '#ffb800' }}>🎮</div>
                  <h4 style={{ fontSize: '10px', margin: '0 0 2px 0' }}>{game.name}</h4>
                  <span style={{ fontSize: '8px', color: '#aaa' }}>{game.provider}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ফুটার নেভিগেশন বার */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#182030', borderTop: '1px solid #222d42', display: 'flex', justifyContent: 'space-around', padding: '8px 0', zIndex: 100, maxWidth: '480px', margin: '0 auto' }}>
        <div onClick={() => { setActiveTab('home'); setSelectedGame(null); setSubPage(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'home' && !subPage ? '#ff3366' : '#aaa' }}>
          <div style={{ fontSize: '16px' }}>🏠</div>
          <span style={{ fontSize: '9px' }}>হোম</span>
        </div>
        <div onClick={() => { setActiveTab('deposit'); setSelectedGame(null); setSubPage(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'deposit' ? '#22c55e' : '#aaa' }}>
          <div style={{ fontSize: '16px' }}>🤝</div>
          <span style={{ fontSize: '9px' }}>শেয়ার</span>
        </div>
        <div onClick={() => { setActiveTab('promotion'); setSelectedGame(null); setSubPage(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'promotion' ? '#ffb800' : '#aaa' }}>
          <div style={{ fontSize: '18px' }}>🎁</div>
          <span style={{ fontSize: '9px' }}>প্রমোশন</span>
        </div>
        <div onClick={() => { setActiveTab('deposit'); setSelectedGame(null); setSubPage(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'deposit' ? '#22c55e' : '#aaa' }}>
          <div style={{ fontSize: '16px' }}>💳</div>
          <span style={{ fontSize: '9px' }}>ডিপোজিট</span>
        </div>
        <div onClick={() => { setActiveTab('account'); setSelectedGame(null); setSubPage(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'account' ? '#3b82f6' : '#aaa' }}>
          <div style={{ fontSize: '16px' }}>👤</div>
          <span style={{ fontSize: '9px' }}>সদস্যরা</span>
        </div>
      </nav>

    </div>
  );
}
