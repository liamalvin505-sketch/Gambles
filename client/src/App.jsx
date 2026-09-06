import React, { useState, useEffect } from 'react';
import AuthModal from './components/AuthModal';
export default function App() {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('la94_balance');
    return saved !== null ? parseFloat(saved) : 0.00;
  });

  const [activeTab, setActiveTab] = useState('home'); // home, deposit, account, withdraw
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('All');
  const [subPage, setSubPage] = useState(null);

  // ডিপোজিট স্টেপ ও রিকোয়েস্ট ম্যানেজমেন্ট
  const [depositMethod, setDepositMethod] = useState('Bkash');
  const [depositChannel, setDepositChannel] = useState('চ্যানেল 80');
  const [depositAmount, setDepositAmount] = useState('500');
  const [trxId, setTrxId] = useState('');
  const [depositStep, setDepositStep] = useState(1); // 1: Amount selection, 2: Gateway Details & TrxID
  const [pendingDeposits, setPendingDeposits] = useState(() => {
    const saved = localStorage.getItem('la94_pending');
    return saved ? JSON.parse(saved) : [];
  });

  const [withdrawAmount, setWithdrawAmount] = useState('');const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [winAlert, setWinAlert] = useState('স্বাগতম LA94.COM-এ! ডিপোজিট করে খেলা শুরু করুন।');

  useEffect(() => {
    localStorage.setItem('la94_balance', balance);
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('la94_pending', JSON.stringify(pendingDeposits));
  }, [pendingDeposits]);

  // উইনিং ফেক নোটিফিকেশন টিকার
  useEffect(() => {
    const names = ['Rahim***', 'Karim***', 'Hasan***', 'Ripon***', 'Aminul***', 'Sojib***', 'Tanvir***'];
    const games = ['Aviator', 'Super Ace', 'Wild Bounty', 'Fortune Gems', 'Gates of Olympus', 'Sweet Bonanza'];
    const amounts = [500, 1200, 2500, 5000, 10000, 25000];

    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomGame = games[Math.floor(Math.random() * games.length)];
      const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
      setWinAlert(`🎉 ${randomName} won ৳${randomAmount} in ${randomGame}!`);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // প্রোভাইডার লিস্ট (স্ক্রিনশটের আদলে)
  const providers = [
    'All', 'Jili', 'Pocket Games Soft', 'BNG', 'JDB', 'FA CHAI Gaming', 
    'BTGaming', 'Naga Games', 'KA Gaming', 'PLAYSTAR', 'Askmeslot', 'Victory Ark',
    'First Person', 'Fastspin', 'Evoplay', 'MAHA Gaming', 'Micro Gaming', 'Gemini',
    'AVATAR UX', 'YELLOW BAT', 'Baison Poker', 'Ameba Entertainment', 'FunTa Gaming', 'BGaming',
    'Red Tiger', 'Wazdan', 'Octoplay', 'Spadegaming', 'NetEnt', 'MAS',
    'Big Time Gaming', 'Nextspin', 'Triple Profits Games', 'BoomingGames', 'GPI', 'Mega Entertainment',
    'Relax Gaming', '5G', 'Smartsoft', 'No Limit City', 'Spribe', 'Joker', 'PP', 'KingMidas', 'Aviator', 'InOut'
  ];

  // ৩১০+ গেমের ডাটাবেস জেনারেটর ও লিস্ট
  const generateMassiveGames = () => {
    const baseNames = [
      { name: 'Aviator', prov: 'Spribe', url: 'https://demo.spribe.co/launch/aviator' },
      { name: 'Super Ace', prov: 'Jili', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
      { name: 'Wild Bounty Showdown', prov: 'Pocket Games Soft', url: 'https://democasino.pgsoft.com/games/slot/id/74' },
      { name: 'Fortune Gems 3', prov: 'Jili', url: 'https://democasino.pgsoft.com/games/slot/id/74' },
      { name: 'Gates of Olympus', prov: 'PP', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
      { name: 'Sweet Bonanza', prov: 'PP', url: 'https://democasino.pgsoft.com/games/slot/id/74' },
      { name: 'Boxing King', prov: 'Jili', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
      { name: 'Super Ace Deluxe', prov: 'Jili', url: 'https://democasino.pgsoft.com/games/slot/id/74' },
      { name: 'Money Coming', prov: 'Jili', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
      { name: 'Roma', prov: 'Jili', url: 'https://democasino.pgsoft.com/games/slot/id/74' },
      { name: 'Mahjong Ways 2', prov: 'Pocket Games Soft', url: 'https://democasino.pgsoft.com/games/slot/id/74' },
      { name: 'Treasures of Aztec', prov: 'Pocket Games Soft', url: 'https://democasino.pgsoft.com/games/slot/id/69' }
    ];

    let allGames = [...baseNames];
    let idCounter = 13;

    providers.forEach(prov => {
      if (prov !== 'All') {
        for (let i = 1; i <= 8; i++) {
          allGames.push({
            id: `g_${idCounter++}`,
            name: `${prov} Slot ${i}`,
            prov: prov,
            url: i % 2 === 0 ? 'https://democasino.pgsoft.com/games/slot/id/69' : 'https://demo.spribe.co/launch/aviator'
          });
        }
      }
    });

    return allGames;
  };

  const [allGamesList] = useState(generateMassiveGames());

  // ডিপোজিট ফাইনাল সাবমিট
  const handleFinalDepositSubmit = (e) => {
    e.preventDefault();
    if (!trxId || trxId.length < 5) {
      alert('সঠিক ট্রানজেকশন আইডি (TrxID) দিন!');
      return;
    }
    const newReq = {
      id: Date.now(),
      method: depositMethod,
      amount: parseFloat(depositAmount),
      trxId: trxId,
      time: new Date().toLocaleTimeString(),
      status: 'Pending'
    };
    setPendingDeposits([newReq, ...pendingDeposits]);
    alert('ডিপোজিট সফলভাবে জমা হয়েছে! অ্যাডমিন অ্যাপ্রুভ করলে ব্যালেন্স যোগ হবে।');
    setTrxId('');
    setDepositStep(1);
    setActiveTab('home');
  };

  // অ্যাডমিন সিমুলেশন প্যানেল (অ্যাপ্রুভ করার জন্য)
  const approveDeposit = (id, amount) => {
    setBalance(prev => prev + amount);
    setPendingDeposits(pendingDeposits.filter(item => item.id !== id));
    alert(`৳ ${amount} সফলভাবে অ্যাপ্রুভ করা হয়েছে! অ্যাকাউন্টে যোগ হয়েছে।`);
  };

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount <= 0) {
      alert('সঠিক পরিমাণ লিখুন!');
      return;
    }
    if (amount > balance) {
      alert('পর্যাপ্ত ব্যালেন্স নেই!');
      return;
    }
    setBalance(prev => prev - amount);
    alert(`উত্তোলন অনুরোধ সফল হয়েছে! ৳ ${amount} কাটা হয়েছে।`);
    setWithdrawAmount('');
    setActiveTab('home');
  };

  const renderSubPageView = () => {
    return (
      <div style={{ background: '#182030', padding: '15px', borderRadius: '10px', border: '1px solid #222d42', minHeight: '350px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #222d42', paddingBottom: '10px' }}>
          <h3 style={{ color: '#ffb800', fontSize: '15px', margin: 0 }}>{subPage}</h3>
          <button onClick={() => setSubPage(null)} style={{ background: '#222d42', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '11px' }}>← পেছনে</button>
        </div>

        {subPage === 'জমা রেকর্ড' && (
          <div>
            <p style={{ fontSize: '12px', color: '#aaa', marginBottom: '10px' }}>আপনার ডিপোজিট হিস্ট্রি ও স্ট্যাটাস:</p>
            {pendingDeposits.length === 0 ? (
              <div style={{ color: '#aaa', fontSize: '11px', textAlign: 'center', padding: '20px' }}>কোনো পেন্ডিং বা সফল ডিপোজিট নেই।</div>
            ) : (
              pendingDeposits.map(item => (
                <div key={item.id} style={{ background: '#121824', padding: '10px', borderRadius: '6px', fontSize: '11px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{item.method} - ৳ {item.amount}</div>
                    <div style={{ color: '#888', fontSize: '9px' }}>TrxID: {item.trxId} | {item.time}</div>
                  </div>
                  <div>
                    <span style={{ background: '#eab308', color: '#000', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', fontWeight: 'bold', marginRight: '5px' }}>{item.status}</span>
                    <button onClick={() => approveDeposit(item.id, item.amount)} style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '10px', cursor: 'pointer' }}>অ্যাপ্রুভ</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {subPage === 'পুরস্কার সেন্টার' && (
          <div>
            <p style={{ fontSize: '12px', color: '#aaa', marginBottom: '10px' }}>আপনার বর্তমান রিওয়ার্ড এবং বোনাস:</p>
            <div style={{ background: '#121824', padding: '10px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 'bold' }}>ডেইলি চেক-ইন বোনাস</div>
                <div style={{ fontSize: '10px', color: '#22c55e' }}>৳ ৫০.০০ উপলব্ধ</div>
              </div>
              <button onClick={() => { setBalance(b => b + 50); alert('৳৫০ যোগ হয়েছে!'); }} style={{ background: '#22c55e', border: 'none', color: '#fff', padding: '5px 10px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}>দাবি করুন</button>
            </div>
          </div>
        )}

        {subPage === 'কাউন্টার সার্ভিস' && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: '#aaa', marginBottom: '15px' }}>যেকোনো সহায়তার জন্য আমাদের লাইভ সাপোর্টে যোগাযোগ করুন:</p>
            <a href="https://t.me/" target="_blank" rel="noreferrer" style={{ display: 'block', background: '#3b82f6', color: '#fff', padding: '10px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '12px' }}>💬 টেলিগ্রাম লাইভ সাপোর্ট</a>
          </div>
        )}

        {!['জমা রেকর্ড', 'পুরস্কার সেন্টার', 'কাউন্টার সার্ভিস'].includes(subPage) && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '30px', marginBottom: '10px' }}>🛠️</div>
            <p style={{ fontSize: '12px', color: '#aaa' }}>{subPage} সেকশনটি সক্রিয় রয়েছে।</p>
          </div>
        )}
      </div>
    );
  };

  // ফিল্টার্ড গেমস
  const filteredGames = allGamesList.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) || game.prov.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProv = selectedProvider === 'All' || game.prov.toLowerCase() === selectedProvider.toLowerCase();
    return matchesSearch && matchesProv;
  });

  return (
    <div style={{ background: '#121824', color: '#fff', minHeight: '100vh', fontFamily: 'Arial, sans-serif', paddingBottom: '70px', maxWidth: '480px', margin: '0 auto', position: 'relative' }}>
      
      {/* টপ হেডার */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', background: '#182030', borderBottom: '1px solid #222d42', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span onClick={() => setDrawerOpen(true)} style={{ fontSize: '22px', cursor: 'pointer', color: '#fff' }}>☰</span>
          <span style={{ fontSize: '20px', fontWeight: '900', color: '#ffb800', fontStyle: 'italic', letterSpacing: '1px' }}>LA94<span style={{color: '#fff', fontSize: '11px'}}>.COM</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: '#0e131f', padding: '4px 10px', borderRadius: '20px', border: '1px solid #ffb800' }}>
            <span style={{ fontSize: '11px', color: '#ffb800' }}>৳ </span>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>{balance.toFixed(2)}</span>
          </div>
          <button onClick={() => window.location.reload()} style={{ background: '#222d42', border: 'none', color: '#fff', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', fontSize: '12px' }}>🔄</button>
        </div>
      </header>

      {/* সাইড মেনু */}
      {drawerOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', zIndex: 2000, display: 'flex' }}>
          <div style={{ width: '280px', background: '#182030', height: '100%', padding: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222d42', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '35px', height: '35px', background: '#333', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>👤</div>
                <div>
                  <div style={{ fontSize: '12px', color: '#aaa' }}>স্বাগত</div>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#ffb800' }}>liamalvin</div>
                </div>
              </div>
              <span onClick={() => setDrawerOpen(false)} style={{ fontSize: '20px', cursor: 'pointer', color: '#aaa' }}>✕</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => { setActiveTab('deposit'); setDrawerOpen(false); setSubPage(null); }} style={{ flex: 1, background: '#ef4444', border: 'none', color: '#fff', padding: '8px', borderRadius: '5px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>ডিপোজিট</button>
              <button onClick={() => { setActiveTab('withdraw'); setDrawerOpen(false); setSubPage(null); }} style={{ flex: 1, background: '#3b82f6', border: 'none', color: '#fff', padding: '8px', borderRadius: '5px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>উত্তোলন</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#ccc' }}>
              <div onClick={() => { setActiveTab('deposit'); setDrawerOpen(false); setSubPage(null); }} style={{ cursor: 'pointer' }}>🏛️ ডিপোজিট</div>
              <div onClick={() => { setActiveTab('withdraw'); setDrawerOpen(false); setSubPage(null); }} style={{ cursor: 'pointer' }}>💳 উত্তোলন করুন</div>
              <div onClick={() => { setActiveTab('account'); setDrawerOpen(false); setSubPage(null); }} style={{ cursor: 'pointer' }}>👤 আমার অ্যাকাউন্ট</div>
              <div onClick={() => { setActiveTab('home'); setDrawerOpen(false); setSubPage(null); }} style={{ cursor: 'pointer' }}>🏠 হোম পেজ</div>
            </div>
          </div>
          <div style={{ flex: 1 }} onClick={() => setDrawerOpen(false)}></div>
        </div>
      )}

      {/* নোটিফিকেশন টিকার */}
      <div style={{ background: '#1e293b', color: '#ffcc00', padding: '6px 12px', fontSize: '11px', borderBottom: '1px solid #283548', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        📢 <span>{winAlert}</span>
      </div>

      {/* মেইন বডি */}
      <main style={{ padding: '10px' }}>
        {selectedGame ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <button onClick={() => setSelectedGame(null)} style={{ background: '#222d42', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '5px', cursor: 'pointer', fontSize: '11px' }}>← লবিতে ফিরুন</button>
            </div>
            <div style={{ width: '100%', height: '500px', background: '#000', borderRadius: '8px', overflow: 'hidden', border: '1px solid #222d42' }}>
              <iframe src={selectedGame.url} title={selectedGame.name} width="100%" height="100%" style={{ border: 'none' }} allowFullScreen></iframe>
            </div>
          </div>
        ) : activeTab === 'deposit' ? (
          <div style={{ background: '#182030', padding: '15px', borderRadius: '10px', border: '1px solid #222d42' }}>
            <h3 style={{ color: '#ffb800', marginBottom: '15px', textAlign: 'center', fontSize: '15px' }}>টাকা জমা দিন (ডিপোজিট)</h3>

            {depositStep === 1 ? (
              <div>
                {/* আমানতের মোড */}
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '8px' }}>আমানতের মোড</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                    {['Bkash', 'Nagad', 'Rocket', 'USDT'].map((m) => (
                      <div key={m} onClick={() => setDepositMethod(m)} style={{ background: depositMethod === m ? '#2b374e' : '#121824', border: depositMethod === m ? '2px solid #ef4444' : '1px solid #222d42', padding: '10px 5px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer' }}>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>{m}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* পেমেন্ট চ্যানেল সিলেকশন */}
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '8px' }}>পেমেন্ট চ্যানেল</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                    {['চ্যানেল 80', 'চ্যানেল 8', 'চ্যানেল 1', 'চ্যানেল 2'].map((ch) => (
                      <div key={ch} onClick={() => setDepositChannel(ch)} style={{ background: depositChannel === ch ? '#2b374e' : '#121824', border: depositChannel === ch ? '2px solid #ef4444' : '1px solid #222d42', padding: '8px', borderRadius: '6px', textAlign: 'center', cursor: 'pointer', fontSize: '12px' }}>
                        {ch}
                      </div>
                    ))}
                  </div>
                </div>

                {/* জমা পরিমাণ */}
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '8px' }}>জমা পরিমাণ</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '10px' }}>
                    {['100', '200', '500', '1000', '3000', '5000', '10000', '20000', '50000'].map((amt) => (
                      <div key={amt} onClick={() => setDepositAmount(amt)} style={{ background: depositAmount === amt ? '#2b374e' : '#121824', border: depositAmount === amt ? '2px solid #ef4444' : '1px solid #222d42', padding: '8px', borderRadius: '6px', textAlign: 'center', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                        {amt}
                      </div>
                    ))}
                  </div>
                  <input type="number" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} style={{ width: '100%', padding: '9px', background: '#121824', color: '#fff', border: '1px solid #222d42', borderRadius: '6px', outline: 'none', fontSize: '13px' }} />
                </div>

                <button onClick={() => setDepositStep(2)} style={{ width: '100%', background: '#ef4444', color: '#fff', border: 'none', padding: '11px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>পরবর্তী</button>
              </div>
            ) : (
              <div>
                {/* টার্গেট অ্যাকাউন্ট ব্ল্যাঙ্ক রাখা হয়েছে */}
                <div style={{ background: '#121824', padding: '12px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #222d42' }}>
                  <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '6px' }}>অ্যাকাউন্ট পে করুন ({depositMethod} Send Money):</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#ef4444' }}>[ এখানে নম্বর বসবে ]</span>
                    <button onClick={() => { navigator.clipboard.writeText(''); alert('নম্বর কপি করা হয়েছে!'); }} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>Copy</button>
                  </div>
                  <div style={{ fontSize: '12px', color: '#aaa' }}>প্রকৃত পেমেন্ট পরিমাণ: <strong style={{ color: '#ffb800' }}>৳ {depositAmount}.00</strong></div>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '6px' }}>Enter TrxID / ট্রানজেকশন আইডি প্রবেশ করান</label>
                  <input type="text" placeholder="যেমন: 9N78X..." value={trxId} onChange={(e) => setTrxId(e.target.value)} style={{ width: '100%', padding: '10px', background: '#121824', color: '#fff', border: '1px solid #222d42', borderRadius: '6px', outline: 'none', fontSize: '13px' }} />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => setDepositStep(1)} style={{ flex: 1, background: '#334155', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>পেছনে</button>
                  <button onClick={handleFinalDepositSubmit} style={{ flex: 2, background: '#22c55e', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>Submit (সাবমিট)</button>
                </div>
              </div>
            )}
          </div>
        ) : activeTab === 'withdraw' ? (
          <div style={{ background: '#182030', padding: '15px', borderRadius: '10px', border: '1px solid #222d42' }}>
            <h3 style={{ color: '#3b82f6', marginBottom: '10px', textAlign: 'center', fontSize: '15px' }}>টাকা উত্তোলন</h3>
            <form onSubmit={handleWithdrawSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>উত্তোলনের পরিমাণ (BDT)</label>
                <input type="number" placeholder="যেমন: 500" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} style={{ width: '100%', padding: '9px', background: '#121824', color: '#fff', border: '1px solid #222d42', borderRadius: '6px', outline: 'none', fontSize: '13px' }} />
              </div>
              <button type="submit" style={{ width: '100%', background: '#3b82f6', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>উত্তোলন অনুরোধ পাঠান</button>
            </form>
          </div>
        ) : activeTab === 'account' ? (
          subPage ? renderSubPageView() : (
            <div>
              {/* ৩য় ছবির মতো একাউন্ট ড্যাশবোর্ড */}
              <div style={{ background: 'linear-gradient(135deg, #2b374e, #182030)', padding: '15px', borderRadius: '10px', border: '1px solid #ffb800', marginBottom: '15px', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{ width: '45px', height: '45px', background: '#444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>👨‍💼</div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>liamalvin</div>
                    <span style={{ background: '#ffb800', color: '#000', fontSize: '10px', padding: '1px 6px', borderRadius: '4px', fontWeight: 'bold' }}>VIP4</span>
                  </div>
                </div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffb800', margin: '10px 0' }}>৳ {balance.toFixed(2)}</div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  <button onClick={() => setActiveTab('deposit')} style={{ background: '#ef4444', border: 'none', color: '#fff', padding: '6px 15px', borderRadius: '5px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>জমা দিন</button>
                  <button onClick={() => setActiveTab('withdraw')} style={{ background: '#3b82f6', border: 'none', color: '#fff', padding: '6px 15px', borderRadius: '5px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>উত্তোলন</button>
                </div>
              </div>

              {/* ৩য় ছবির মতো ১২টি অপশন গ্রিড */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', textAlign: 'center' }}>
                {[
                  { name: 'পুরস্কার সেন্টার', icon: '🏆', color: '#fbbf24' },
                  { name: 'বেটিং রেকর্ড', icon: '📊', color: '#38bdf8' },
                  { name: 'লাভ এবং লস', icon: '📈', color: '#4ade80' },
                  { name: 'জমা রেকর্ড', icon: '📥', color: '#f87171' },
                  { name: 'উত্তোলন রেকর্ড', icon: '📤', color: '#818cf8' },
                  { name: 'অ্যাকাউন্ট রেকর্ড', icon: '📑', color: '#34d399' },
                  { name: 'আমার অ্যাকাউন্ট', icon: '👤', color: '#60a5fa' },
                  { name: 'সুরক্ষা কেন্দ্র', icon: '🛡️', color: '#f472b6' },
                  { name: 'বন্ধুদের আমন্ত্রণ', icon: '🤝', color: '#a78bfa' },
                  { name: 'মিশন', icon: '🎁', color: '#fb7185' },
                  { name: 'রিবেট', icon: '💰', color: '#facc15' },
                  { name: 'কাউন্টার সার্ভিস', icon: '🎧', color: '#38bdf8' }
                ].map((item, idx) => (
                  <div key={idx} onClick={() => setSubPage(item.name)} style={{ background: '#182030', padding: '12px 5px', borderRadius: '10px', border: '1px solid #222d42', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '24px', marginBottom: '6px', color: item.color }}>{item.icon}</div>
                    <span style={{ fontSize: '10px', color: '#e2e8f0', fontWeight: '600' }}>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        ) : (
          <div>
            <div style={{ background: 'linear-gradient(135deg, #3b1c24, #182030)', padding: '15px', borderRadius: '10px', marginBottom: '12px', border: '1px solid #ff3366', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ background: '#ff3366', color: '#fff', fontSize: '9px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>VIP সুবিধা</span>
                <h3 style={{ color: '#ffb800', fontSize: '14px', margin: '5px 0' }}>প্রচার বোনাস: ৳ ২০,০০,০০০</h3>
                <p style={{ color: '#aaa', fontSize: '10px', margin: 0 }}>সাপ্তাহিক বেতন: ৳ ৪,০০,০০০</p>
              </div>
              <div style={{ fontSize: '30px' }}>👑</div>
            </div>

            {/* সার্চ */}
            <div style={{ marginBottom: '12px' }}>
              <input type="text" placeholder="৩০০+ গেম বা প্রোভাইডার খুঁজুন..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#182030', color: '#fff', border: '1px solid #ffb800', borderRadius: '8px', outline: 'none', fontSize: '12px' }} />
            </div>

            {/* প্রোভাইডার পিল বাটন লিস্ট */}
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '12px', scrollbarWidth: 'none' }}>
              {providers.map((prov) => (
                <button key={prov} onClick={() => setSelectedProvider(prov)} style={{ background: selectedProvider === prov ? '#ffb800' : '#182030', color: selectedProvider === prov ? '#000' : '#fff', border: '1px solid #222d42', padding: '6px 14px', borderRadius: '20px', fontSize: '11px', whiteSpace: 'nowrap', cursor: 'pointer', fontWeight: selectedProvider === prov ? 'bold' : 'normal' }}>
                  {prov}
                </button>
              ))}
            </div>

            {/* গেম লিস্ট */}
            <h4 style={{ fontSize: '13px', color: '#ffb800', marginBottom: '8px' }}>🔥 জনপ্রিয় ক্যাসিনো গেমস ({filteredGames.length})</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {filteredGames.map(game => (
                <div key={game.id} onClick={() => setSelectedGame(game)} style={{ background: '#182030', borderRadius: '8px', padding: '8px', textAlign: 'center', border: '1px solid #222d42', cursor: 'pointer' }}>
                  <div style={{ background: '#111622', height: '60px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '5px', fontSize: '20px', color: '#ffb800' }}>🎰</div>
                  <h4 style={{ fontSize: '10px', margin: '0 0 2px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'bold' }}>{game.name}</h4>
                  <span style={{ fontSize: '8px', color: '#aaa', display: 'block', marginBottom: '6px' }}>{game.prov}</span>
                  <div style={{ background: '#ffb800', color: '#000', padding: '4px 0', borderRadius: '4px', fontWeight: 'bold', fontSize: '9px' }}>খেলুন</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ফুটার নেভিগেশন */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#182030', borderTop: '1px solid #222d42', display: 'flex', justifyContent: 'space-around', padding: '8px 0', zIndex: 100, maxWidth: '480px', margin: '0 auto' }}>
        <div onClick={() => { setActiveTab('home'); setSelectedGame(null); setSubPage(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'home' ? '#ff3366' : '#aaa' }}>
          <div style={{ fontSize: '16px' }}>🏠</div>
          <span style={{ fontSize: '9px' }}>হোম</span>
        </div>
        <div onClick={() => { setActiveTab('deposit'); setSelectedGame(null); setSubPage(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'deposit' ? '#22c55e' : '#aaa' }}>
          <div style={{ fontSize: '16px' }}>🤝</div>
          <span style={{ fontSize: '9px' }}>শেয়ার</span>
        </div>
        <div onClick={() => { setActiveTab('home'); setSelectedGame(null); setSubPage(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: '#ffb800' }}>
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
