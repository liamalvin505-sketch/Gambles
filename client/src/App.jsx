import React, { useState } from 'react';

export default function App() {
  const [balance, setBalance] = useState(5.15);
  const [activeTab, setActiveTab] = useState('hot');
  const [activeProvider, setActiveProvider] = useState('all');
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // ছবিতে দেওয়া সমস্ত প্রোভাইডারের তালিকা
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

  // হট গেমস (৩য় ছবির আদলে)
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

  // প্রতিটি প্রোভাইডারের গেম অটো জেনারেটর (জনপ্রিয় গেমগুলো উপরে থাকবে)
  const generateProviderGames = () => {
    let list = [...hotGames]; // জনপ্রিয় হট গেমগুলো প্রথমে থাকবে
    const sampleWords = ['Slot', 'Bonanza', 'Gold', 'Fortune', 'Mega', 'Wild', 'Super', 'Crazy', 'Royal', 'Magic'];
    
    allProviders.forEach(prov => {
      // প্রতিটি কোম্পানির ৫টি করে ডিফল্ট গেম তৈরি করা হলো
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

  // সার্চ এবং ফিল্টার লজিক
  const filteredGames = allGames.filter(game => {
    const matchesProvider = activeProvider === 'all' || game.provider.toLowerCase() === activeProvider.toLowerCase();
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProvider && matchesSearch;
  });

  return (
    <div style={{ background: '#0f1423', color: '#fff', minHeight: '100vh', fontFamily: 'Arial, sans-serif', paddingBottom: '70px' }}>
      
      {/* টপ হেডার (QQ777.com) */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', background: '#1a2238', borderBottom: '1px solid #2a3655' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ fontSize: '20px', fontWeight: '900', color: '#ffcc00', fontStyle: 'italic', letterSpacing: '1px' }}>QQ777<span style={{color: '#fff', fontSize: '12px'}}>.COM</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#00ffcc' }}>{balance}</span>
          <button onClick={() => window.location.reload()} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '16px' }}>🔄</button>
          <span style={{ fontSize: '18px', cursor: 'pointer' }}>✉️</span>
        </div>
      </header>

      {/* মেইন ক্যাটাগরি ট্যাব (গরম, স্লট, লাইভ, পকার, স্পোর্টস) */}
      <div style={{ display: 'flex', justifyContent: 'space-around', background: '#121826', padding: '10px 5px', borderBottom: '1px solid #222d42' }}>
        <div onClick={() => { setActiveTab('hot'); setSelectedGame(null); setActiveProvider('all'); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'hot' ? '#ff3366' : '#94a3b8' }}>
          <div style={{ fontSize: '20px' }}>🔥</div>
          <span style={{ fontSize: '11px', fontWeight: 'bold' }}>গরম</span>
        </div>
        <div onClick={() => { setActiveTab('slot'); setSelectedGame(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'slot' ? '#3b82f6' : '#94a3b8' }}>
          <div style={{ fontSize: '20px' }}>🎰</div>
          <span style={{ fontSize: '11px', fontWeight: 'bold' }}>স্লট</span>
        </div>
        <div onClick={() => { setActiveTab('live'); setSelectedGame(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'live' ? '#3b82f6' : '#94a3b8' }}>
          <div style={{ fontSize: '20px' }}>🎲</div>
          <span style={{ fontSize: '11px', fontWeight: 'bold' }}>লাইভ</span>
        </div>
        <div onClick={() => { setActiveTab('poker'); setSelectedGame(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'poker' ? '#3b82f6' : '#94a3b8' }}>
          <div style={{ fontSize: '20px' }}>♟️</div>
          <span style={{ fontSize: '11px', fontWeight: 'bold' }}>পকার</span>
        </div>
        <div onClick={() => { setActiveTab('sports'); setSelectedGame(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'sports' ? '#3b82f6' : '#94a3b8' }}>
          <div style={{ fontSize: '20px' }}>⚽</div>
          <span style={{ fontSize: '11px', fontWeight: 'bold' }}>স্পোর্টস</span>
        </div>
      </div>

      {/* মূল কন্টেন্ট এরিয়া */}
      <main style={{ padding: '15px' }}>
        {selectedGame ? (
          <div>
            <button onClick={() => setSelectedGame(null)} style={{ marginBottom: '15px', background: '#334155', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>← লবিতে ফিরুন</button>
            <div style={{ width: '100%', height: '500px', background: '#000', borderRadius: '10px', overflow: 'hidden' }}>
              <iframe src={selectedGame.url} title={selectedGame.name} width="100%" height="100%" style={{ border: 'none' }} allowFullScreen></iframe>
            </div>
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

            {/* যদি স্লট ট্যাব সিলেক্ট করা হয়, তবে ছবি ৩৩৯০/৩৯১ এর মতো কোম্পানির লিস্ট দেখানো হবে */}
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

            {/* গেম গ্রিড (৩য় ছবির মতো লেআউট) */}
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
        <div style={{ textAlign: 'center', cursor: 'pointer', color: '#94a3b8' }}>
          <div style={{ fontSize: '18px' }}>🔄</div>
          <span style={{ fontSize: '10px' }}>শেয়ার</span>
        </div>
        <div style={{ textAlign: 'center', cursor: 'pointer', color: '#94a3b8' }}>
          <div style={{ fontSize: '18px' }}>🎁</div>
          <span style={{ fontSize: '10px' }}>প্রমোশন</span>
        </div>
        <div style={{ textAlign: 'center', cursor: 'pointer', color: '#94a3b8' }}>
          <div style={{ fontSize: '18px' }}>💳</div>
          <span style={{ fontSize: '10px' }}>ডিপোজিট</span>
        </div>
        <div style={{ textAlign: 'center', cursor: 'pointer', color: '#94a3b8' }}>
          <div style={{ fontSize: '18px' }}>👤</div>
          <span style={{ fontSize: '10px' }}>সদস্যতা</span>
        </div>
      </nav>

    </div>
  );
}
