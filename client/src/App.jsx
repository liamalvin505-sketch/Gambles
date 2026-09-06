import React, { useState } from 'react';

export default function App() {
  const [balance, setBalance] = useState(5.15);
  const [activeTab, setActiveTab] = useState('slot');
  const [activeProvider, setActiveProvider] = useState('all');
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // ৫০টি সেরা কোম্পানির জনপ্রিয় গেমসমূহের বিশাল তালিকা
  const games = [
    // 1. JILI Games
    { id: 1, name: 'Super Ace', provider: 'JILI', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 2, name: 'Fortune Gems', provider: 'JILI', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },
    { id: 3, name: 'Money Coming', provider: 'JILI', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 4, name: 'Golden Empire', provider: 'JILI', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },
    
    // 2. PG Soft
    { id: 5, name: 'Wild Bounty Showdown', provider: 'PG', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },
    { id: 6, name: 'Mahjong Ways 2', provider: 'PG', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },
    { id: 7, name: 'Treasures of Aztec', provider: 'PG', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 8, name: 'Lucky Neko', provider: 'PG', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },

    // 3. Pragmatic Play
    { id: 9, name: 'Gates of Olympus', provider: 'PRAGMATIC', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 10, name: 'Sweet Bonanza', provider: 'PRAGMATIC', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },
    { id: 11, name: 'Starlight Princess', provider: 'PRAGMATIC', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },

    // 4. Evolution Gaming
    { id: 12, name: 'Live Roulette', provider: 'EVO', category: 'live', url: 'https://casino.delawartest.com/iframe-roulette' },
    { id: 13, name: 'Baccarat Live', provider: 'EVO', category: 'live', url: 'https://casino.delawartest.com/iframe-roulette' },
    { id: 14, name: 'Crazy Time', provider: 'EVO', category: 'live', url: 'https://casino.delawartest.com/iframe-roulette' },

    // 5. Spribe
    { id: 15, name: 'Aviator', provider: 'SPRIBE', category: 'crash', url: 'https://demo.spribe.co/launch/aviator' },
    { id: 16, name: 'Spaceman', provider: 'SPRIBE', category: 'crash', url: 'https://demo.spribe.co/launch/aviator' },

    // 6. Microgaming (Games Global)
    { id: 17, name: 'Mega Moolah', provider: 'MICROGAMING', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 18, name: 'Immortal Romance', provider: 'MICROGAMING', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },

    // 7. NetEnt
    { id: 19, name: 'Starburst', provider: 'NETENT', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 20, name: 'Gonzo\'s Quest', provider: 'NETENT', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },

    // 8. Play'n GO
    { id: 21, name: 'Book of Dead', provider: 'PLAYNGO', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 22, name: 'Reactoonz', provider: 'PLAYNGO', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },

    // 9. Red Tiger
    { id: 23, name: 'Gonita\'s Gold', provider: 'REDTIGER', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 24, name: 'Dragon\'s Fire', provider: 'REDTIGER', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },

    // 10. Habanero
    { id: 25, name: 'Hot Hot Fruit', provider: 'HABANERO', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 26, name: 'Fa Cai Shen', provider: 'HABANERO', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },

    // 11. CQ9 Gaming
    { id: 27, name: 'Jump High', provider: 'CQ9', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 28, name: 'Thor II', provider: 'CQ9', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },

    // 12. JDB Gaming
    { id: 29, name: 'Open Sesame', provider: 'JDB', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 30, name: 'Kong', provider: 'JDB', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },

    // 13. Spadegaming
    { id: 31, name: 'Fishing God', provider: 'SPADE', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 32, name: 'Cai Shen 888', provider: 'SPADE', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },

    // 14. NoLimit City
    { id: 33, name: 'Mental', provider: 'NOLIMIT', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 34, name: 'San Quentin', provider: 'NOLIMIT', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },

    // 15. Hacksaw Gaming
    { id: 35, name: 'Wanted Dead or a Wild', provider: 'HACKSAW', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 36, name: 'Chaos Crew', provider: 'HACKSAW', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },

    // 16. Push Gaming
    { id: 37, name: 'Jammin\' Jars', provider: 'PUSH', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 38, name: 'Razor Shark', provider: 'PUSH', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },

    // 17. Relax Gaming
    { id: 39, name: 'Money Train 3', provider: 'RELAX', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 40, name: 'Temple Tumble', provider: 'RELAX', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },

    // 18. Yggdrasil
    { id: 41, name: 'Valley of the Gods', provider: 'YGGDRASIL', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 42, name: 'Holmes and the Stolen Stones', provider: 'YGGDRASIL', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },

    // 19. Quickspin
    { id: 43, name: 'Big Bad Wolf', provider: 'QUICKSPIN', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 44, name: 'Sakura Fortune', provider: 'QUICKSPIN', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },

    // 20. Playson
    { id: 45, name: 'Solar Queen', provider: 'PLAYSON', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 46, name: 'Buffalo Power', provider: 'PLAYSON', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },

    // 21-50 অন্যান্য জনপ্রিয় প্রোভাইডারসমূহ (Booongo, Betsoft, Wazdan, Evoplay ইত্যাদি)
    { id: 47, name: 'Book of Sun', provider: 'BOOONGO', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 48, name: 'Good Girl Bad Girl', provider: 'BETSOFT', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },
    { id: 49, name: 'Sizzling 777', provider: 'WAZDAN', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 50, name: 'Fruit Super Nova', provider: 'EVOPLAY', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },
    { id: 51, name: 'Rise of Egypt', provider: 'PLAYSON', category: 'slot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 52, name: 'Baccarat Deluxe', provider: 'PG', category: 'live', url: 'https://casino.delawartest.com/iframe-roulette' },
    { id: 53, name: 'Andar Bahar Live', provider: 'EVO', category: 'live', url: 'https://casino.delawartest.com/iframe-roulette' },
    { id: 54, name: 'Dragon Tiger Live', provider: 'EVO', category: 'live', url: 'https://casino.delawartest.com/iframe-roulette' }
  ];

  const filteredGames = games.filter(game => {
    const matchesProvider = activeProvider === 'all' || game.provider === activeProvider;
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProvider && matchesSearch;
  });

  return (
    <div style={{ background: '#0f1423', color: '#fff', minHeight: '100vh', fontFamily: 'Arial, sans-serif', paddingBottom: '70px' }}>
      
      {/* টপ হেডার (LA94.COM) */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', background: '#1a2238', borderBottom: '1px solid #2a3655' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffcc00', fontStyle: 'italic' }}>LA94<span style={{color: '#fff', fontSize: '12px'}}>.COM</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#00ffcc' }}>৳ {balance}</span>
          <button onClick={() => window.location.reload()} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '16px' }}>🔄</button>
          <span style={{ background: '#ff3366', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>9</span>
        </div>
      </header>

      {/* নোটিশ বার */}
      <div style={{ background: '#2c151d', color: '#ffcc00', padding: '8px 15px', fontSize: '12px', borderBottom: '1px solid #4a1f2d', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>📢</span>
        <marquee scrollamount="4">স্বাগত বোনাস ৫০০ কোটি টাকার! যেকোনো সমস্যায় লাইভ চ্যাট করুন।</marquee>
      </div>

      {/* ইউজার কুইক মেনু */}
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '12px 10px', background: '#151b2b', borderBottom: '1px solid #25304d', textAlign: 'center' }}>
        <div onClick={() => setActiveTab('deposit')} style={{ cursor: 'pointer' }}>
          <div style={{ background: '#223055', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px auto' }}>💳</div>
          <span style={{ fontSize: '11px', color: '#cbd5e1' }}>ডিপোজিট</span>
        </div>
        <div onClick={() => setActiveTab('withdraw')} style={{ cursor: 'pointer' }}>
          <div style={{ background: '#223055', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px auto' }}>🏦</div>
          <span style={{ fontSize: '11px', color: '#cbd5e1' }}>উত্তোলন</span>
        </div>
        <div style={{ cursor: 'pointer' }}>
          <div style={{ background: '#223055', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px auto' }}>🏆</div>
          <span style={{ fontSize: '11px', color: '#cbd5e1' }}>পুরস্কার</span>
        </div>
        <div style={{ cursor: 'pointer' }}>
          <div style={{ background: '#223055', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px auto' }}>💰</div>
          <span style={{ fontSize: '11px', color: '#cbd5e1' }}>রিবেট</span>
        </div>
      </div>

      {/* গেম ক্যাটাগরি মেনু */}
      <div style={{ display: 'flex', gap: '15px', padding: '12px 15px', overflowX: 'auto', background: '#121826' }}>
        <div onClick={() => { setActiveTab('slot'); setSelectedGame(null); }} style={{ textAlign: 'center', cursor: 'pointer', minWidth: '60px' }}>
          <div style={{ background: activeTab === 'slot' ? '#3b82f6' : '#1e293b', padding: '10px', borderRadius: '12px', fontSize: '18px' }}>🎰</div>
          <span style={{ fontSize: '11px', marginTop: '4px', display: 'block' }}>স্লট</span>
        </div>
        <div onClick={() => { setActiveTab('live'); setSelectedGame(null); }} style={{ textAlign: 'center', cursor: 'pointer', minWidth: '60px' }}>
          <div style={{ background: activeTab === 'live' ? '#3b82f6' : '#1e293b', padding: '10px', borderRadius: '12px', fontSize: '18px' }}>🎲</div>
          <span style={{ fontSize: '11px', marginTop: '4px', display: 'block' }}>লাইভ</span>
        </div>
        <div onClick={() => { setActiveTab('crash'); setSelectedGame(null); }} style={{ textAlign: 'center', cursor: 'pointer', minWidth: '60px' }}>
          <div style={{ background: activeTab === 'crash' ? '#3b82f6' : '#1e293b', padding: '10px', borderRadius: '12px', fontSize: '18px' }}>✈️</div>
          <span style={{ fontSize: '11px', marginTop: '4px', display: 'block' }}>ক্র্যাশ</span>
        </div>
      </div>

      {/* মূল কন্টেন্ট */}
      <main style={{ padding: '15px' }}>
        {selectedGame ? (
          <div>
            <button onClick={() => setSelectedGame(null)} style={{ marginBottom: '15px', background: '#334155', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>← লবিতে ফিরুন</button>
            <div style={{ width: '100%', height: '500px', background: '#000', borderRadius: '10px', overflow: 'hidden' }}>
              <iframe src={selectedGame.url} title={selectedGame.name} width="100%" height="100%" style={{ border: 'none' }} allowFullScreen></iframe>
            </div>
          </div>
        ) : activeTab === 'deposit' ? (
          <div style={{ background: '#1a2238', padding: '20px', borderRadius: '12px', border: '1px solid #2a3655', maxWidth: '400px', margin: '0 auto' }}>
            <h3 style={{ color: '#00ffcc', marginBottom: '15px' }}>ম্যানুয়াল ডিপোজিট (বিকাশ / নগদ)</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>নম্বর: <strong>01700000000</strong> (Personal)</p>
            <input type="number" placeholder="পরিমাণ (BDT)" style={{ width: '100%', padding: '10px', background: '#0f1423', color: '#fff', border: '1px solid #334155', borderRadius: '6px', margin: '10px 0' }} />
            <input type="text" placeholder="ট্রানজেকশন আইডি (TrxID)" style={{ width: '100%', padding: '10px', background: '#0f1423', color: '#fff', border: '1px solid #334155', borderRadius: '6px', margin: '10px 0' }} />
            <button onClick={() => alert('ডিপোজিট রিকোয়েস্ট সফল হয়েছে!')} style={{ width: '100%', background: '#22c55e', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>ডিপোজিট জমা দিন</button>
          </div>
        ) : activeTab === 'withdraw' ? (
          <div style={{ background: '#1a2238', padding: '20px', borderRadius: '12px', border: '1px solid #2a3655', maxWidth: '400px', margin: '0 auto' }}>
            <h3 style={{ color: '#ef4444', marginBottom: '15px' }}>টাকা উত্তোলন (Cash Out)</h3>
            <input type="number" placeholder="উত্তোলনের পরিমাণ" style={{ width: '100%', padding: '10px', background: '#0f1423', color: '#fff', border: '1px solid #334155', borderRadius: '6px', margin: '10px 0' }} />
            <button onClick={() => alert('উত্তোলন রিকোয়েস্ট সফল হয়েছে!')} style={{ width: '100%', background: '#ef4444', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>উত্তোলন রিকোয়েস্ট পাঠান</button>
          </div>
        ) : (
          <div>
            {/* জ্যাকপট ব্যানার */}
            <div style={{ background: 'linear-gradient(135deg, #2b1d0c, #4a2e0a)', border: '2px solid #f59e0b', borderRadius: '15px', padding: '20px', textAlign: 'center', marginBottom: '20px', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#fbbf24' }}>👑 BIG WIN JACKPOT 👑</span>
              <div style={{ fontSize: '26px', fontWeight: '900', color: '#ffcc00', margin: '8px 0', letterSpacing: '2px' }}>৳ 26,184,294.60</div>
            </div>

            {/* সার্চ ও প্রোভাইডার ফিল্টার */}
            <div style={{ marginBottom: '15px' }}>
              <input 
                type="text" 
                placeholder="গেম খুঁজুন..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '10px 15px', background: '#1a2238', color: '#fff', border: '1px solid #2a3655', borderRadius: '8px', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '15px', overflowX: 'auto' }}>
              {['all', 'JILI', 'PG', 'PRAGMATIC', 'EVO', 'SPRIBE', 'MICROGAMING', 'NETENT', 'PLAYNGO', 'HABANERO', 'HACKSAW'].map(provider => (
                <button 
                  key={provider}
                  onClick={() => setActiveProvider(provider)}
                  style={{ background: activeProvider === provider ? '#3b82f6' : '#1a2238', color: '#fff', border: '1px solid #2a3655', padding: '6px 15px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}
                >
                  {provider}
                </button>
              ))}
            </div>

            {/* গেম গ্রিড */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {filteredGames.map(game => (
                <div key={game.id} style={{ background: '#1a2238', borderRadius: '10px', padding: '12px', textAlign: 'center', border: '1px solid #2a3655' }}>
                  <div style={{ background: '#25304d', height: '90px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px', fontSize: '24px', fontWeight: 'bold', color: '#00ffcc' }}>
                    {game.name[0]}
                  </div>
                  <h4 style={{ fontSize: '13px', margin: '0 0 4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{game.name}</h4>
                  <span style={{ fontSize: '10px', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>{game.provider}</span>
                  <button onClick={() => setSelectedGame(game)} style={{ background: '#00ffcc', color: '#000', border: 'none', padding: '6px 12px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', width: '100%', fontSize: '12px' }}>খেলুন</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ফুটার নেভিগেশন বার */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#151b2b', borderTop: '1px solid #25304d', display: 'flex', justifyContent: 'space-around', padding: '10px 0', zIndex: 1000 }}>
        <div onClick={() => { setActiveTab('slot'); setSelectedGame(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: '#00ffcc' }}>
          <div style={{ fontSize: '18px' }}>🏠</div>
          <span style={{ fontSize: '10px' }}>হোম</span>
        </div>
        <div onClick={() => setActiveTab('deposit')} style={{ textAlign: 'center', cursor: 'pointer', color: '#94a3b8' }}>
          <div style={{ fontSize: '18px' }}>💳</div>
          <span style={{ fontSize: '10px' }}>ডিপোজিট</span>
        </div>
        <div onClick={() => setActiveTab('withdraw')} style={{ textAlign: 'center', cursor: 'pointer', color: '#94a3b8' }}>
          <div style={{ fontSize: '18px' }}>👤</div>
          <span style={{ fontSize: '10px' }}>সদস্যতা</span>
        </div>
      </nav>

    </div>
  );
}
