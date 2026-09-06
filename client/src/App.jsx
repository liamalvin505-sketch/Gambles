import React, { useState } from 'react';

export default function App() {
  const [balance, setBalance] = useState(0);
  const [activeTab, setActiveTab] = useState('hot');
  const [activeProvider, setActiveProvider] = useState('all');
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // ডিপোজিট স্টেট
  const [depositAmount, setDepositAmount] = useState('');
  const [trxId, setTrxId] = useState('');

  // প্রোভাইডার তালিকা
  const allProviders = [
    'Jili', 'Pocket Games Soft', 'BNG', 'JDB', 'FA CHAI Gaming', 
    'BTGaming', 'Naga Games', 'KA Gaming', 'PLAYSTAR', 'Askmeslot', 
    'Victory Ark', 'First Person', 'Fastspin', 'Evoplay', 'MAHA Gaming', 
    'Micro Gaming', 'Gemini', 'AVATAR UX', 'YELLOW BAT', 'Baison Poker', 
    'Ameba Entertainment', 'FunTa Gaming', 'BGaming', 'Red Tiger', 'Wazdan', 
    'Octoplay', 'Spadegaming', 'NetEnt', 'MAS', 'Big Time Gaming', 
    'Nextspin', 'Triple Profits Games', 'BoomingGames', 'GPI', 'Mega Entertainment', 
    'Relax Gaming', '5G', 'Smartsoft', 'No Limit City', 'Spribe', 
    'Joker', 'PP', 'KingMidas', 'InOut', 'Rich Paradise'
  ];

  // হট গেমস
  const hotGames = [
    { id: 'h1', name: 'Aviator', provider: 'Spribe', url: 'https://demo.spribe.co/launch/aviator' },
    { id: 'h2', name: 'Super Ace', provider: 'Jili', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 'h3', name: 'High Flyer', provider: 'Spribe', url: 'https://demo.spribe.co/launch/aviator' },
    { id: 'h4', name: 'Wild Bounty Showdown', provider: 'Pocket Games Soft', url: 'https://democasino.pgsoft.com/games/slot/id/74' },
    { id: 'h5', name: 'Super Ace Deluxe', provider: 'Jili', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 'h6', name: 'Super Elements', provider: 'FA CHAI Gaming', url: 'https://democasino.pgsoft.com/games/slot/id/74' },
    { id: 'h7', name: 'Boxing King', provider: 'Jili', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 'h8', name: 'Fortune Gems 3', provider: 'Jili', url: 'https://democasino.pgsoft.com/games/slot/id/74' },
    { id: 'h9', name: 'Garuda Yoddha 500', provider: 'Jili', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 'h10', name: 'Magic Ace Wild Lock', provider: 'Jili', url: 'https://democasino.pgsoft.com/games/slot/id/74' },
    { id: 'h11', name: 'Crazy Time A', provider: 'Evoplay', url: 'https://casino.delawartest.com/iframe-roulette' },
    { id: 'h12', name: 'FlyX', provider: 'Smartsoft', url: 'https://demo.spribe.co/launch/aviator' }
  ];

  const generateProviderGames = () => {
    let list = [...hotGames];
    const sampleWords = ['Slot', 'Bonanza', 'Gold', 'Fortune', 'Mega', 'Wild', 'Super', 'Crazy', 'Royal', 'Magic'];
    
    allProviders.forEach(prov => {
      for (let i = 1; i <= 5; i++) {
        list.push({
          id: `${prov}-${i}`,
          name: `${prov} ${sampleWords[i % sampleWords.length]} ${i}`,
          provider: prov,
          url: 'https://democasino.pgsoft.com/games/slot/id/69'
        });
      }
    });
    return list;
  };

  const allGames = generateProviderGames();

  const filteredGames = allGames.filter(game => {
    const matchesProvider = activeProvider === 'all' || game.provider.toLowerCase() === activeProvider.toLowerCase();
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProvider && matchesSearch;
  });

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (!amount || amount <= 0) {
      alert('সঠিক পরিমাণ লিখুন!');
      return;
    }
    if (!trxId) {
      alert('ট্রানজেকশন আইডি দিন!');
      return;
    }

    setBalance(prev => prev + amount);
    alert(`সফল! আপনার অ্যাকাউন্টে ৳ ${amount} যোগ হয়েছে।`);
    setDepositAmount('');
    setTrxId('');
    setActiveTab('hot');
  };

  return (
    <div style={{ background: '#0b0e14', color: '#fff', minHeight: '100vh', fontFamily: 'Arial, sans-serif', paddingBottom: '70px' }}>
      
      {/* LA94 টপ হেডার */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 15px', background: '#131924', borderBottom: '1px solid #1f293d', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '20px', fontWeight: '900', color: '#ffb800', fontStyle: 'italic', letterSpacing: '1px' }}>LA94<span style={{color: '#fff', fontSize: '11px'}}>.COM</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: '#0b0e14', padding: '4px 10px', borderRadius: '20px', border: '1px solid #00ffcc' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>৳ </span>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#00ffcc' }}>{balance.toFixed(2)}</span>
          </div>
          <button onClick={() => window.location.reload()} style={{ background: '#1f293d', border: 'none', color: '#fff', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', fontSize: '12px' }}>🔄</button>
        </div>
      </header>

      {/* মেইন ক্যাটাগরি ট্যাব */}
      <div style={{ display: 'flex', justifyContent: 'space-around', background: '#131924', padding: '10px 5px', borderBottom: '1px solid #1f293d' }}>
        <div onClick={() => { setActiveTab('hot'); setSelectedGame(null); setActiveProvider('all'); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'hot' ? '#ff3366' : '#94a3b8' }}>
          <div style={{ fontSize: '18px' }}>🔥</div>
          <span style={{ fontSize: '10px', fontWeight: 'bold' }}>গরম</span>
        </div>
        <div onClick={() => { setActiveTab('slot'); setSelectedGame(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'slot' ? '#3b82f6' : '#94a3b8' }}>
          <div style={{ fontSize: '18px' }}>🎰</div>
          <span style={{ fontSize: '10px', fontWeight: 'bold' }}>স্লট</span>
        </div>
        <div onClick={() => { setActiveTab('deposit'); setSelectedGame(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'deposit' ? '#22c55e' : '#94a3b8' }}>
          <div style={{ fontSize: '18px' }}>💳</div>
          <span style={{ fontSize: '10px', fontWeight: 'bold' }}>ক্যাশইন</span>
        </div>
      </div>

      {/* মূল কন্টেন্ট এরিয়া */}
      <main style={{ padding: '12px' }}>
        {selectedGame ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <button onClick={() => setSelectedGame(null)} style={{ background: '#1f293d', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '5px', cursor: 'pointer', fontSize: '11px' }}>← লবিতে ফিরুন</button>
              <div style={{ background: '#131924', padding: '4px 10px', borderRadius: '6px', border: '1px solid #00ffcc', fontSize: '11px' }}>
                রিয়েল ব্যালেন্স: <strong style={{ color: '#00ffcc' }}>৳ {balance.toFixed(2)}</strong>
              </div>
            </div>
            {/* গেম আইফ্রেম ভিউ */}
            <div style={{ width: '100%', height: '500px', background: '#000', borderRadius: '8px', overflow: 'hidden', border: '1px solid #1f293d' }}>
              <iframe src={selectedGame.url} title={selectedGame.name} width="100%" height="100%" style={{ border: 'none' }} allowFullScreen></iframe>
            </div>
          </div>
        ) : activeTab === 'deposit' ? (
          /* ক্যাশইন পেজ */
          <div style={{ background: '#131924', padding: '15px', borderRadius: '10px', border: '1px solid #1f293d', maxWidth: '400px', margin: '15px auto' }}>
            <h3 style={{ color: '#00ffcc', marginBottom: '12px', textAlign: 'center', fontSize: '16px' }}>টাকা ক্যাশইন (Deposit)</h3>
            <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', marginBottom: '12px' }}>বিকাশ/নগদ পার্সোনাল নম্বর: <strong style={{ color: '#fff' }}>01700000000</strong></p>
            
            <form onSubmit={handleDepositSubmit}>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>টাকার পরিমাণ (BDT)</label>
                <input 
                  type="number" 
                  placeholder="যেমন: 500" 
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  style={{ width: '100%', padding: '9px', background: '#0b0e14', color: '#fff', border: '1px solid #1f293d', borderRadius: '6px', outline: 'none', fontSize: '13px' }} 
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>ট্রানজেকশন আইডি (TrxID)</label>
                <input 
                  type="text" 
                  placeholder="TrxID দিন" 
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  style={{ width: '100%', padding: '9px', background: '#0b0e14', color: '#fff', border: '1px solid #1f293d', borderRadius: '6px', outline: 'none', fontSize: '13px' }} 
                />
              </div>
              <button type="submit" style={{ width: '100%', background: '#22c55e', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>ক্যাশইন কনফার্ম করুন</button>
            </form>
          </div>
        ) : (
          <div>
            {/* সার্চ বক্স */}
            <div style={{ marginBottom: '12px' }}>
              <input 
                type="text" 
                placeholder="গেম খুঁজুন..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', background: '#131924', color: '#fff', border: '1px solid #1f293d', borderRadius: '8px', outline: 'none', fontSize: '12px' }}
              />
            </div>

            {/* প্রোভাইডার ফিল্টার বাটন */}
            {activeTab === 'slot' && (
              <div style={{ marginBottom: '15px' }}>
                <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '6px' }}>প্রোভাইডার সিলেক্ট করুন:</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', maxHeight: '150px', overflowY: 'auto', background: '#131924', padding: '6px', borderRadius: '8px', border: '1px solid #1f293d' }}>
                  <button 
                    onClick={() => setActiveProvider('all')}
                    style={{ background: activeProvider === 'all' ? '#3b82f6' : '#0b0e14', color: '#fff', border: '1px solid #1f293d', padding: '6px 4px', borderRadius: '15px', fontSize: '10px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    All
                  </button>
                  {allProviders.map(prov => (
                    <button 
                      key={prov}
                      onClick={() => setActiveProvider(prov)}
                      style={{ background: activeProvider === prov ? '#3b82f6' : '#0b0e14', color: '#fff', border: '1px solid #1f293d', padding: '6px 4px', borderRadius: '15px', fontSize: '10px', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {prov}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* গেম গ্রিড */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {(activeTab === 'hot' && searchQuery === '' && activeProvider === 'all' ? hotGames : filteredGames).map(game => (
                <div key={game.id} onClick={() => setSelectedGame(game)} style={{ background: '#131924', borderRadius: '8px', padding: '6px', textAlign: 'center', border: '1px solid #1f293d', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ background: '#1b2436', height: '60px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '5px', fontSize: '18px', color: '#ffb800' }}>
                    🎮
                  </div>
                  <h4 style={{ fontSize: '10px', margin: '0 0 2px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{game.name}</h4>
                  <span style={{ fontSize: '8px', color: '#94a3b8', display: 'block', marginBottom: '5px' }}>{game.provider}</span>
                  <div style={{ background: '#00ffcc', color: '#000', padding: '3px 0', borderRadius: '4px', fontWeight: 'bold', fontSize: '9px' }}>খেলুন</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ফুটার নেভিগেশন */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#131924', borderTop: '1px solid #1f293d', display: 'flex', justifyContent: 'space-around', padding: '8px 0', zIndex: 1000 }}>
        <div onClick={() => { setActiveTab('hot'); setSelectedGame(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'hot' ? '#00ffcc' : '#94a3b8' }}>
          <div style={{ fontSize: '16px' }}>🏠</div>
          <span style={{ fontSize: '9px' }}>হোম</span>
        </div>
        <div onClick={() => { setActiveTab('deposit'); setSelectedGame(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'deposit' ? '#00ffcc' : '#94a3b8' }}>
          <div style={{ fontSize: '16px' }}>💳</div>
          <span style={{ fontSize: '9px' }}>ক্যাশইন</span>
        </div>
      </nav>

    </div>
  );
}
