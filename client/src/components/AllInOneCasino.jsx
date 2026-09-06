import React, { useState } from 'react';

const AllInOneCasino = () => {
  const [balance, setBalance] = useState(0);
  const [walletType, setWalletType] = useState('bKash');
  const [amount, setAmount] = useState('');
  const [trxId, setTrxId] = useState('');
  const [activeTab, setActiveTab] = useState('casino');
  const [selectedGame, setSelectedGame] = useState(null);

  // ডেমো গেম লিস্ট (আইফ্রেম সহ)
  const games = [
    { id: 1, name: 'Aviator (Spribe)', type: 'Crash', url: 'https://demo.spribe.co/launch/aviator' },
    { id: 2, name: 'Gates of Olympus', type: 'Slot', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 3, name: 'Mahjong Ways 2', type: 'Slot', url: 'https://democasino.pgsoft.com/games/slot/id/74' },
    { id: 4, name: 'Live Roulette', type: 'Live', url: 'https://casino.delawartest.com/iframe-roulette' }
  ];

  const handleDeposit = (e) => {
    e.preventDefault();
    if (!amount || !trxId) {
      alert('দয়া করে পরিমাণ এবং ট্রানজেকশন আইডি দিন।');
      return;
    }
    alert(`আপনার ${walletType} এর মাধ্যমে ${amount} BDT ডিপোজিট রিকোয়েস্ট সফলভাবে জমা হয়েছে! অ্যাডমিন চেক করার পর ব্যালেন্স যোগ করা হবে।`);
    setAmount('');
    setTrxId('');
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    if (!amount) {
      alert('উত্তোলনের পরিমাণ লিখুন।');
      return;
    }
    if (Number(amount) > balance) {
      alert('আপনার অ্যাকাউন্টে পর্যাপ্ত ব্যালেন্স নেই!');
      return;
    }
    alert(`${walletType}-এ ${amount} BDT উত্তোলনের রিকোয়েস্ট সফল হয়েছে। ২৪ ঘণ্টার মধ্যে পেমেন্ট পেয়ে যাবেন।`);
    setAmount('');
  };

  return (
    <div style={{ background: '#0b0f19', color: '#fff', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* হেডার */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', background: '#131b2e', borderBottom: '1px solid #1f293d' }}>
        <h2 style={{ color: '#00ffcc', margin: 0 }}>Gambles Casino</h2>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span style={{ background: '#1f293d', padding: '8px 15px', borderRadius: '8px', fontSize: '14px' }}>
            Balance: <strong style={{ color: '#00ffcc' }}>{balance} BDT</strong>
          </span>
          <button onClick={() => setActiveTab('deposit')} style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Cash In</button>
          <button onClick={() => setActiveTab('withdraw')} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Cash Out</button>
        </div>
      </header>

      {/* নেভিগেশন ট্যাব */}
      <nav style={{ display: 'flex', gap: '10px', padding: '15px 20px', background: '#0f172a' }}>
        <button onClick={() => { setActiveTab('casino'); setSelectedGame(null); }} style={{ padding: '10px 20px', background: activeTab === 'casino' && !selectedGame ? '#3b82f6' : '#1e293b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Casino Lobby</button>
        <button onClick={() => setActiveTab('deposit')} style={{ padding: '10px 20px', background: activeTab === 'deposit' ? '#3b82f6' : '#1e293b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Deposit (BDT)</button>
        <button onClick={() => setActiveTab('withdraw')} style={{ padding: '10px 20px', background: activeTab === 'withdraw' ? '#3b82f6' : '#1e293b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Withdraw (BDT)</button>
      </nav>

      {/* মূল কন্টেন্ট */}
      <main style={{ padding: '20px' }}>
        {selectedGame ? (
          <div>
            <button onClick={() => setSelectedGame(null)} style={{ marginBottom: '15px', background: '#334155', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>← Back to Lobby</button>
            <div style={{ width: '100%', height: '600px', background: '#000', borderRadius: '10px', overflow: 'hidden' }}>
              <iframe src={selectedGame.url} title={selectedGame.name} width="100%" height="100%" style={{ border: 'none' }} allowFullScreen></iframe>
            </div>
          </div>
        ) : activeTab === 'casino' ? (
          <div>
            <h3>Popular Demo Games</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '15px' }}>
              {games.map((game) => (
                <div key={game.id} style={{ background: '#1e293b', padding: '20px', borderRadius: '10px', textAlign: 'center', border: '1px solid #334155' }}>
                  <h4>{game.name}</h4>
                  <p style={{ color: '#94a3b8', fontSize: '13px' }}>Category: {game.type}</p>
                  <button onClick={() => setSelectedGame(game)} style={{ marginTop: '10px', background: '#00ffcc', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>Play Demo</button>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'deposit' ? (
          <div style={{ maxWidth: '400px', margin: '0 auto', background: '#1e293b', padding: '25px', borderRadius: '10px', border: '1px solid #334155' }}>
            <h3>Manual Deposit (bKash / Nagad)</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>আমাদের মার্চেন্ট নম্বর: <strong>01700000000</strong> (Personal/Send Money)</p>
            <form onSubmit={handleDeposit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
              <select value={walletType} onChange={(e) => setWalletType(e.target.value)} style={{ padding: '10px', background: '#0f172a', color: '#fff', border: '1px solid #475569', borderRadius: '5px' }}>
                <option value="bKash">bKash</option>
                <option value="Nagad">Nagad</option>
                <option value="Rocket">Rocket</option>
              </select>
              <input type="number" placeholder="Amount (BDT)" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ padding: '10px', background: '#0f172a', color: '#fff', border: '1px solid #475569', borderRadius: '5px' }} />
              <input type="text" placeholder="Transaction ID (TrxID)" value={trxId} onChange={(e) => setTrxId(e.target.value)} style={{ padding: '10px', background: '#0f172a', color: '#fff', border: '1px solid #475569', borderRadius: '5px' }} />
              <button type="submit" style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Submit Deposit</button>
            </form>
          </div>
        ) : (
          <div style={{ maxWidth: '400px', margin: '0 auto', background: '#1e293b', padding: '25px', borderRadius: '10px', border: '1px solid #334155' }}>
            <h3>Manual Withdraw</h3>
            <form onSubmit={handleWithdraw} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
              <select value={walletType} onChange={(e) => setWalletType(e.target.value)} style={{ padding: '10px', background: '#0f172a', color: '#fff', border: '1px solid #475569', borderRadius: '5px' }}>
                <option value="bKash">bKash</option>
                <option value="Nagad">Nagad</option>
              </select>
              <input type="number" placeholder="Withdraw Amount (BDT)" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ padding: '10px', background: '#0f172a', color: '#fff', border: '1px solid #475569', borderRadius: '5px' }} />
              <button type="submit" style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Request Withdraw</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllInOneCasino;
