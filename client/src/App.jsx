import React, { useState } from 'react';

export default function App() {
  const [balance, setBalance] = useState(5.15);
  const [activeTab, setActiveTab] = useState('hot');
  const [activeProvider, setActiveProvider] = useState('all');
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // ডিপোজিট ইনপুট স্টেট
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
    { id: 'h1', name: 'Aviator', provider: 'Spribe', category: 'hot', url: 'https://demo.spribe.co/launch/aviator' },
    { id: 'h2', name: 'Super Ace', provider: 'Jili', category: 'hot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 'h3', name: 'High Flyer', provider: 'Spribe', category: 'hot', url: 'https://demo.spribe.co/launch/aviator' },
    { id: 'h4', name: 'Wild Bounty Showdown', provider: 'Pocket Games Soft', category: 'hot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },
    { id: 'h5', name: 'Super Ace Deluxe', provider: 'Jili', category: 'hot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 'h6', name: 'Super Elements', provider: 'FA CHAI Gaming', category: 'hot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },
    { id: 'h7', name: 'Boxing King', provider: 'Jili', category: 'hot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 'h8', name: 'Fortune Gems 3', provider: 'Jili', category: 'hot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },
    { id: 'h9', name: 'Garuda Yoddha 500', provider: 'Jili', category: 'hot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 'h10', name: 'Magic Ace Wild Lock', provider: 'Jili', category: 'hot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },
    { id: 'h11', name: 'Crazy Time A', provider: 'Evoplay', category: 'hot', url: 'https://casino.delawartest.com/iframe-roulette' },
    { id: 'h12', name: 'FlyX', provider: 'Smartsoft', category: 'hot', url: 'https://demo.spribe.co/launch/aviator' }
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
          category: 'slot',
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

  // ডিপোজিট হ্যান্ডলার (যত টাকা ক্যাশইন করবে তত টাকা ব্যালেন্সে অটো যোগ হবে)
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
    <div style={{ background: '#0f1423', color: '#fff', minHeight: '100vh', fontFamily: 'Arial, sans-serif', paddingBottom: '70px' }}>
      
      {/* টপ হেডার */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', background: '#1a2238', borderBottom: '1px solid #2a3655' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ fontSize: '20px', fontWeight: '900', color: '#ffcc00', fontStyle: 'italic', letterSpacing: '1px' }}>QQ777<span style={{color: '#fff', fontSize: '12px'}}>.COM</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#0f1423', padding: '4px 10px', borderRadius: '15px', border: '1px solid #00ffcc' }}>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>বালেন্স: </span>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#00ffcc' }}>৳ {balance.toFixed(2)}</span>
          </div>
          <button onClick={() => window.location.reload()} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '14px' }}>🔄</button>
        </div>
      </header>

      {/* মেইন ক্যাটাগরি ট্যাব */}
      <div style={{ display: 'flex', justifyContent: 'space-around', background: '#121826', padding: '10px 5px', borderBottom: '1px solid #222d42' }}>
        <div onClick={() => { setActiveTab('hot'); setSelectedGame(null); setActiveProvider('all'); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'hot' ? '#ff3366' : '#94a3b8' }}>
          <div style={{ fontSize: '20px' }}>🔥</div>
          <span style={{ fontSize: '11px', fontWeight: 'bold' }}>গরম</span>
        </div>
        <div onClick={() => { setActiveTab('slot'); setSelectedGame(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'slot' ? '#3b82f6' : '#94a3b8' }}>
          <div style={{ fontSize: '20px' }}>🎰</div>
          <span style={{ fontSize: '11px', fontWeight: 'bold' }}>স্লট</span>
        </div>
        <div onClick={() => { setActiveTab('deposit'); setSelectedGame(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'deposit' ? '#22c55e' : '#94a3b8' }}>
          <div style={{ fontSize: '20px' }}>💳</div>
          <span style={{ fontSize: '11px', fontWeight: 'bold' }}>ক্যাশইন</span>
        </div>
      </div>

      {/* মূল কন্টেন্ট এরিয়া */}
      <main style={{ padding: '15px' }}>
        {selectedGame ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <button onClick={() => setSelectedGame(null)} style={{ background: '#334155', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px' }}>← লবিতে ফিরুন</button>
              <div style={{ background: '#1a2238', padding: '4px 10px', borderRadius: '6px', border: '1px solid #00ffcc', fontSize: '12px' }}>
                রিয়েল ব্যালেন্স: <strong style={{ color: '#00ffcc' }}>৳ {balance.toFixed(2)}</strong>
              </div>
            </div>
            {/* গেম স্ক্রিন উইদাউট ডেমো লোগো ফ্রেমিং */}
            <div style={{ width: '100%', height: '520px', background: '#000', borderRadius: '10px', overflow: 'hidden', border: '1px solid #2a3655' }}>
              <iframe src={selectedGame.url} title={selectedGame.name} width="100%" height="100%" style={{ border: 'none' }} allowFullScreen></iframe>
            </div>
          </div>
        ) : activeTab === 'deposit' ? (
          /* ক্যাশইন ফর্ম পেজ */
          <div style={{ background: '#1a2238', padding: '20px', borderRadius: '12px', border: '1px solid #2a3655', maxWidth: '400px', margin: '20px auto' }}>
            <h3 style={{ color: '#00ffcc', marginBottom: '15px', textAlign: 'center' }}>টাকা ক্যাশইন (Deposit)</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', textAlign: 'center', marginBottom: '15px' }}>বিকাশ/নগদ পার্সোনাল নম্বর: <strong style={{ color: '#fff' }}>01700000000</strong></p>
            
            <form onSubmit={handleDepositSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '5px' }}>টাকার পরিমাণ (BDT)</label>
                <input 
                  type="number" 
                  placeholder="যেমন: 1000" 
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: '#0f1423', color: '#fff', border: '1px solid #334155', borderRadius: '6px', outline: 'none' }} 
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '5px' }}>ট্রানজেকশন আইডি (TrxID)</label>
                <input 
                  type="text" 
                  placeholder="TrxID লিখুন" 
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: '#0f1423', color: '#fff', border: '1px solid #334155', borderRadius: '6px', outline: 'none' }} 
                />
              </div>
              <button type="submit" style={{ width: '100%', background: '#22c55e', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>ক্যাশইন কনফার্ম করুন</button>
            </form>
          </div>
        ) : (
          <div>
            {/* সার্চ বক্স */}
            <div style={{ marginBottom: '15px' }}>
              <input 
                type="text" 
                placeholder="গেম খুঁজুন..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '10px 15px', background: '#1a2238', color: '#fff', border: '1px solid #2a3655', borderRadius: '8px', outline: 'none' }}
              />
            </div>

            {/* স্লট ট্যাবে প্রোভাইডার ফিল্টার */}
            {activeTab === 'slot' && (
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>প্রোভাইডার সিলেক্ট করুন:</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', maxHeight: '160px', overflowY: 'auto', background: '#121826', padding: '8px', borderRadius: '8px', border: '1px solid #222d42' }}>
                  <button 
                    onClick={() => setActiveProvider('all')}
                    style={{ background: activeProvider === 'all' ? '#3b82f6' : '#1a2238', color: '#fff', border: '1px solid #2a3655', padding: '8px 5px', borderRadius: '20px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    All
                  </button>
                  {allProviders.map(prov => (
                    <button 
                      key={prov}
                      onClick={() => setActiveProvider(prov)}
                      style={{ background: activeProvider === prov ? '#3b82f6' : '#1a2238', color: '#fff', border: '1px solid #2a3655', padding: '8px 5px', borderRadius: '20px', fontSize: '11px', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {prov}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* গেম গ্রিড */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {(activeTab === 'hot' && searchQuery === '' && activeProvider === 'all' ? hotGames : filteredGames).map(game => (
                <div key={game.id} onClick={() => setSelectedGame(game)} style={{ background: '#1a2238', borderRadius: '10px', padding: '8px', textAlign: 'center', border: '1px solid #2a3655', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ background: '#25304d', height: '70px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px', fontSize: '20px', fontWeight: 'bold', color: '#ffcc00' }}>
                    🎮
                  </div>
                  <h4 style={{ fontSize: '11px', margin: '0 0 2px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{game.name}</h4>
                  <span style={{ fontSize: '9px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>{game.provider}</span>
                  <div style={{ background: '#00ffcc', color: '#000', padding: '4px 0', borderRadius: '4px', fontWeight: 'bold', fontSize: '10px' }}>খেলুন</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ফুটার নেভিগেশন বার */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#151b2b', borderTop: '1px solid #25304d', display: 'flex', justifyContent: 'space-around', padding: '10px 0', zIndex: 1000 }}>
        <div onClick={() => { setActiveTab('hot'); setSelectedGame(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'hot' ? '#00ffcc' : '#94a3b8' }}>
          <div style={{ fontSize: '18px' }}>🏠</div>
          <span style={{ fontSize: '10px' }}>হোম</span>
        </div>
        <div onClick={() => { setActiveTab('deposit'); setSelectedGame(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'deposit' ? '#00ffcc' : '#94a3b8' }}>
          <div style={{ fontSize: '18px' }}>💳</div>
          <span style={{ fontSize: '10px' }}>ক্যাশইন</span>
        </div>
      </nav>

    </div>
  );
}
