import React, { useState } from 'react';

const GAMES_LIST = [
  { id: 'aviator', name: 'Aviator', provider: 'spribe', icon: '✈️' },
  { id: 'super-ace', name: 'Super Ace', provider: 'jili', icon: '🃏' },
  { id: 'boxing-king', name: 'Boxing King', provider: 'jili', icon: '🥊' },
  { id: 'mahjong-ways', name: 'Mahjong Ways', provider: 'pgsoft', icon: '🀄' },
  { id: 'fortune-tiger', name: 'Fortune Tiger', provider: 'pgsoft', icon: '🐯' },
];

const DEMO_URLS = {
  'spribe_aviator': 'https://demogamesfree.spribe.io/games/aviator?currency=USD&lang=en',
  'jili_super-ace': 'https://demo.jiligg.com/SuperAce',
  'jili_boxing-king': 'https://demo.jiligg.com/BoxingKing',
  'pgsoft_mahjong-ways': 'https://m.pgsoft-games.com/1/index.html',
  'pgsoft_fortune-tiger': 'https://m.pgsoft-games.com/126/index.html'
};

const AllInOneCasino = () => {
  const [balance, setBalance] = useState(0);
  const [selectedGameUrl, setSelectedGameUrl] = useState('');
  const [activeGame, setActiveGame] = useState('');
  
  // Deposit / Withdraw States
  const [tab, setTab] = useState('deposit');
  const [method, setMethod] = useState('bKash');
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [trxId, setTrxId] = useState('');

  const handleTransaction = (e) => {
    e.preventDefault();
    if (tab === 'deposit') {
      alert(`ডিপোজিট রিকোয়েস্ট সফল হয়েছে!\nটাকা: ৳${amount}\nTrxID: ${trxId}\nঅ্যাডমিন যাচাই করে শীঘ্রই ওয়ালেটে ব্যালেন্স যুক্ত করে দেবে।`);
    } else {
      if (parseFloat(amount) > balance) return alert("পর্যাপ্ত ব্যালেন্স নেই!");
      alert(`উইথড্র রিকোয়েস্ট সফল হয়েছে!\nমেথড: ${method}\nটাকা: ৳${amount}\nনম্বর: ${phone}`);
    }
    setAmount('');
    setTrxId('');
    setPhone('');
  };

  const launchGame = (game) => {
    const key = `${game.provider}_${game.id}`;
    setSelectedGameUrl(DEMO_URLS[key]);
    setActiveGame(game.name);
  };

  return (
    <div style={{ padding: '20px', background: '#0f172a', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Wallet Balance Display */}
      <div style={{ background: '#1e293b', padding: '15px', borderRadius: '10px', textAlign: 'center', border: '1px solid #334155', marginBottom: '20px' }}>
        <h2>💰 Current Wallet Balance: <span style={{ color: '#22c55e' }}>৳{balance.toFixed(2)} BDT</span></h2>
      </div>

      {/* Cash In / Cash Out Panel */}
      <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', maxWidth: '500px', margin: '0 auto 30px auto', border: '1px solid #334155' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <button 
            onClick={() => setTab('deposit')} 
            style={{ flex: 1, padding: '10px', background: tab === 'deposit' ? '#22c55e' : '#334155', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            Cash In (Deposit)
          </button>
          <button 
            onClick={() => setTab('withdraw')} 
            style={{ flex: 1, padding: '10px', background: tab === 'withdraw' ? '#ef4444' : '#334155', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            Cash Out (Withdraw)
          </button>
        </div>

        <form onSubmit={handleTransaction} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <select value={method} onChange={(e) => setMethod(e.target.value)} style={{ padding: '10px', borderRadius: '6px', background: '#0f172a', color: '#fff', border: '1px solid #334155' }}>
            <option value="bKash">bKash (বিকাশ)</option>
            <option value="Nagad">Nagad (নগদ)</option>
            <option value="Rocket">Rocket (রকেট)</option>
          </select>

          {tab === 'deposit' && (
            <div style={{ background: '#0f172a', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', color: '#94a3b8' }}>
              📌 পার্সোনাল নম্বর: <b>01700000000</b> (Send Money করুন)
            </div>
          )}

          <input 
            type="number" 
            placeholder="টাকার পরিমাণ (BDT)" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            required 
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: '#fff' }}
          />

          <input 
            type="text" 
            placeholder={tab === 'deposit' ? "আপনার বিকাশ/নগদ নম্বর" : "যে নম্বরে টাকা নেবেন"} 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            required 
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: '#fff' }}
          />

          {tab === 'deposit' && (
            <input 
              type="text" 
              placeholder="Transaction ID (TrxID)" 
              value={trxId} 
              onChange={(e) => setTrxId(e.target.value)} 
              required 
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: '#fff' }}
            />
          )}

          <button type="submit" style={{ padding: '10px', background: tab === 'deposit' ? '#22c55e' : '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px' }}>
            {tab === 'deposit' ? 'Cash In Request' : 'Cash Out Request'}
          </button>
        </form>
      </div>

      {/* Casino Games Section */}
      <h2 style={{ textAlign: 'center', color: '#38bdf8' }}>🎮 Popular Casino Games</h2>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', margin: '20px 0' }}>
        {GAMES_LIST.map((game) => (
          <button
            key={game.id}
            onClick={() => launchGame(game)}
            style={{
              padding: '12px 20px',
              background: activeGame === game.name ? '#0284c7' : '#1e293b',
              color: '#fff',
              border: '1px solid #334155',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            {game.icon} {game.name} ({game.provider.toUpperCase()})
          </button>
        ))}
      </div>

      {/* Screen Frame */}
      <div style={{ width: '100%', height: '650px', background: '#000', borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155' }}>
        {selectedGameUrl ? (
          <iframe
            src={selectedGameUrl}
            title={activeGame}
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow="fullscreen"
          />
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#94a3b8' }}>
            <h3>খেলতে যেকোনো একটি গেম সিলেক্ট করুন</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllInOneCasino;
