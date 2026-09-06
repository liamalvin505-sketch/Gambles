import React, { useState, useEffect } from 'react';

export default function App() {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('la94_balance');
    return saved !== null ? parseFloat(saved) : 0;
  });

  // রেকর্ড বা হিস্ট্রি ডাটা লোকালস্টোরেজ থেকে লোড করা
  const [depositHistory, setDepositHistory] = useState(() => {
    const saved = localStorage.getItem('la94_deposits');
    return saved ? JSON.parse(saved) : [];
  });

  const [betHistory, setBetHistory] = useState(() => {
    const saved = localStorage.getItem('la94_bets');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState('home'); 
  const [subPage, setSubPage] = useState(null); // 'depositRecord', 'betRecord', 'profitRecord', etc.
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [depositAmount, setDepositAmount] = useState('');
  const [trxId, setTrxId] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [winAlert, setWinAlert] = useState('স্বাগতম LA94.COM-এ! ফাস্ট ক্যাশইন ও গেম প্লে।');

  useEffect(() => {
    localStorage.setItem('la94_balance', balance);
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('la94_deposits', JSON.stringify(depositHistory));
  }, [depositHistory]);

  useEffect(() => {
    localStorage.setItem('la94_bets', JSON.stringify(betHistory));
  }, [betHistory]);

  useEffect(() => {
    const names = ['Rahim***', 'Karim***', 'Hasan***', 'Ripon***', 'Aminul***'];
    const games = ['Aviator', 'Super Ace', 'Wild Bounty', 'Fortune Gems'];
    const amounts = [500, 1200, 2500, 5000, 10000];

    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomGame = games[Math.floor(Math.random() * games.length)];
      const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
      setWinAlert(`🎉 ${randomName} won ৳${randomAmount} in ${randomGame}!`);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const hotGames = [
    { id: 'h1', name: 'Aviator', provider: 'Spribe', url: 'https://demo.spribe.co/launch/aviator' },
    { id: 'h2', name: 'Super Ace', provider: 'Jili', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 'h3', name: 'Wild Bounty Showdown', provider: 'Pocket Games Soft', url: 'https://democasino.pgsoft.com/games/slot/id/74' },
    { id: 'h4', name: 'Fortune Gems 3', provider: 'Jili', url: 'https://democasino.pgsoft.com/games/slot/id/74' },
    { id: 'h5', name: 'Boxing King', provider: 'Jili', url: 'https://democasino.pgsoft.com/games/slot/id/69' },
    { id: 'h6', name: 'Super Ace Deluxe', provider: 'Jili', url: 'https://democasino.pgsoft.com/games/slot/id/69' }
  ];

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (!amount || amount <= 0 || !trxId) {
      alert('সঠিক পরিমাণ ও TrxID দিন!');
      return;
    }

    setBalance(prev => prev + amount);
    
    // ডিপোজিট রেকর্ড যুক্ত করা
    const newDeposit = {
      id: Date.now(),
      amount: amount,
      trxId: trxId,
      date: new Date().toLocaleString(),
      status: 'সফল'
    };
    setDepositHistory([newDeposit, ...depositHistory]);

    alert(`সফল! অ্যাকাউন্টে ৳ ${amount} যোগ হয়েছে।`);
    setDepositAmount('');
    setTrxId('');
    setActiveTab('home');
    setSubPage(null);
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
    alert(`উত্তোলন সফল হয়েছে! ৳ ${amount} কাটা হয়েছে।`);
    setWithdrawAmount('');
    setActiveTab('home');
    setSubPage(null);
  };

  // গেম খেলার পর ফেক বেট বা লাভ-লস রেকর্ড জেনারেট করা
  const playGame = (game) => {
    setSelectedGame(game);
    const betAmt = 100;
    const isWin = Math.random() > 0.4; // ৬০% জেতার সম্ভাবনা
    const winAmt = isWin ? Math.floor(Math.random() * 400) + 50 : 0;
    const profitLoss = winAmt - betAmt;

    setBalance(prev => prev + profitLoss);

    const newBet = {
      id: Date.now(),
      gameName: game.name,
      bet: betAmt,
      result: winAmt,
      net: profitLoss,
      date: new Date().toLocaleTimeString()
    };
    setBetHistory([newBet, ...betHistory]);
  };

  return (
    <div style={{ background: '#121824', color: '#fff', minHeight: '100vh', fontFamily: 'Arial, sans-serif', paddingBottom: '70px', maxWidth: '480px', margin: '0 auto', position: 'relative' }}>
      
      {/* হেডার */}
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

      {/* সাইড মেনু ড্রয়ার */}
      {drawerOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', zIndex: 2000, display: 'flex' }}>
          <div style={{ width: '280px', background: '#182030', height: '100%', padding: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222d42', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '35px', height: '35px', background: '#333', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👤</div>
                <div>
                  <div style={{ fontSize: '12px', color: '#aaa' }}>স্বাগত</div>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#ffb800' }}>liamalvin</div>
                </div>
              </div>
              <span onClick={() => setDrawerOpen(false)} style={{ fontSize: '20px', cursor: 'pointer', color: '#aaa' }}>✕</span>
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => { setActiveTab('deposit'); setSubPage(null); setDrawerOpen(false); }} style={{ flex: 1, background: '#ef4444', border: 'none', color: '#fff', padding: '8px', borderRadius: '5px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>ডিপোজিট</button>
              <button onClick={() => { setActiveTab('withdraw'); setSubPage(null); setDrawerOpen(false); }} style={{ flex: 1, background: '#3b82f6', border: 'none', color: '#fff', padding: '8px', borderRadius: '5px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>উত্তোলন</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#ccc' }}>
              <div onClick={() => { setActiveTab('deposit'); setDrawerOpen(false); }} style={{ cursor: 'pointer' }}>🏛️ ডিপোজিট করুন</div>
              <div onClick={() => { setActiveTab('withdraw'); setDrawerOpen(false); }} style={{ cursor: 'pointer' }}>💳 উত্তোলন করুন</div>
              <div onClick={() => { setActiveTab('account'); setSubPage(null); setDrawerOpen(false); }} style={{ cursor: 'pointer' }}>👤 আমার অ্যাকাউন্ট</div>
              <div onClick={() => { setActiveTab('home'); setSubPage(null); setDrawerOpen(false); }} style={{ cursor: 'pointer' }}>🏠 হোম পেজ</div>
            </div>
          </div>
          <div style={{ flex: 1 }} onClick={() => setDrawerOpen(false)}></div>
        </div>
      )}

      {/* লাইভ উইনিং নোটিফিকেশন */}
      <div style={{ background: '#1e293b', color: '#ffcc00', padding: '6px 12px', fontSize: '11px', borderBottom: '1px solid #283548', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        📢 <span>{winAlert}</span>
      </div>

      <main style={{ padding: '10px' }}>
        {selectedGame ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <button onClick={() => setSelectedGame(null)} style={{ background: '#222d42', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '5px', cursor: 'pointer', fontSize: '11px' }}>← লবিতে ফিরুন</button>
              <div style={{ background: '#182030', padding: '4px 10px', borderRadius: '6px', border: '1px solid #ffb800', fontSize: '11px' }}>
                ব্যালেন্স: <strong style={{ color: '#ffb800' }}>৳ {balance.toFixed(2)}</strong>
              </div>
            </div>
            <div style={{ width: '100%', height: '500px', background: '#000', borderRadius: '8px', overflow: 'hidden', border: '1px solid #222d42' }}>
              <iframe src={selectedGame.url} title={selectedGame.name} width="100%" height="100%" style={{ border: 'none' }} allowFullScreen></iframe>
            </div>
          </div>
        ) : subPage === 'depositRecord' ? (
          /* জমা রেকর্ড পেজ */
          <div style={{ background: '#182030', padding: '15px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <h3 style={{ color: '#ffb800', fontSize: '15px', margin: 0 }}>📥 জমা রেকর্ড (Deposit History)</h3>
              <button onClick={() => setSubPage(null)} style={{ background: '#222d42', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>ফিরে যান</button>
            </div>
            {depositHistory.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#aaa', fontSize: '12px' }}>কোনো জমা রেকর্ড নেই!</p>
            ) : (
              depositHistory.map(item => (
                <div key={item.id} style={{ background: '#121824', padding: '10px', borderRadius: '6px', marginBottom: '8px', border: '1px solid #222d42', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <div>
                    <div style={{ color: '#22c55e', fontWeight: 'bold' }}>+ ৳ {item.amount}</div>
                    <div style={{ color: '#888', fontSize: '10px' }}>TrxID: {item.trxId}</div>
                    <div style={{ color: '#666', fontSize: '9px' }}>{item.date}</div>
                  </div>
                  <div style={{ color: '#ffb800', alignSelf: 'center' }}>{item.status}</div>
                </div>
              ))
            )}
          </div>
        ) : subPage === 'betRecord' || subPage === 'profitRecord' ? (
          /* বেটিং রেকর্ড ও লাভ-লস পেজ */
          <div style={{ background: '#182030', padding: '15px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <h3 style={{ color: '#ffb800', fontSize: '15px', margin: 0 }}>{subPage === 'betRecord' ? '📊 বেটিং রেকর্ড' : '📈 লাভ এবং লস'}</h3>
              <button onClick={() => setSubPage(null)} style={{ background: '#222d42', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>ফিরে যান</button>
            </div>
            {betHistory.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#aaa', fontSize: '12px' }}>কোনো গেম খেলার রেকর্ড নেই! গেম খেলে ট্রাই করুন।</p>
            ) : (
              betHistory.map(item => (
                <div key={item.id} style={{ background: '#121824', padding: '10px', borderRadius: '6px', marginBottom: '8px', border: '1px solid #222d42', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#fff' }}>{item.gameName}</div>
                    <div style={{ color: '#888', fontSize: '10px' }}>ব্যালেন্স বাজি: ৳ {item.bet} | সময়: {item.date}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: item.net >= 0 ? '#22c55e' : '#ef4444', fontWeight: 'bold' }}>
                      {item.net >= 0 ? `+৳ ${item.net}` : `-৳ ${Math.abs(item.net)}`}
                    </div>
                    <div style={{ fontSize: '10px', color: '#aaa' }}>{item.net >= 0 ? 'লাভ' : 'লস'}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : activeTab === 'deposit' ? (
          <div style={{ background: '#182030', padding: '15px', borderRadius: '10px', border: '1px solid #222d42' }}>
            <h3 style={{ color: '#ffb800', marginBottom: '10px', textAlign: 'center', fontSize: '15px' }}>টাকা ডিপোজিট</h3>
            <p style={{ fontSize: '11px', color: '#aaa', textAlign: 'center', marginBottom: '12px' }}>বিকাশ/নগদ নম্বর: <strong style={{ color: '#fff' }}>01700000000</strong></p>
            <form onSubmit={handleDepositSubmit}>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>পরিমাণ (BDT)</label>
                <input type="number" placeholder="যেমন: 500" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} style={{ width: '100%', padding: '9px', background: '#121824', color: '#fff', border: '1px solid #222d42', borderRadius: '6px', outline: 'none', fontSize: '13px' }} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>ট্রানজেকশন আইডি (TrxID)</label>
                <input type="text" placeholder="TrxID দিন" value={trxId} onChange={(e) => setTrxId(e.target.value)} style={{ width: '100%', padding: '9px', background: '#121824', color: '#fff', border: '1px solid #222d42', borderRadius: '6px', outline: 'none', fontSize: '13px' }} />
              </div>
              <button type="submit" style={{ width: '100%', background: '#22c55e', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>ডিপোজিট কনফার্ম করুন</button>
            </form>
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
          <div>
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

            {/* সদস্য সেন্টার গ্রিড - এখানে ক্লিক করলে সরাসরি কার্যকরী পেজ আসবে */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', textAlign: 'center' }}>
              <div onClick={() => alert('পুরস্কার সেন্টার')} style={{ background: '#182030', padding: '10px 5px', borderRadius: '8px', border: '1px solid #222d42', cursor: 'pointer' }}>
                <div style={{ fontSize: '20px', marginBottom: '5px' }}>🏆</div>
                <span style={{ fontSize: '9px', color: '#ccc' }}>পুরস্কার সেন্টার</span>
              </div>
              <div onClick={() => setSubPage('betRecord')} style={{ background: '#182030', padding: '10px 5px', borderRadius: '8px', border: '1px solid #222d42', cursor: 'pointer' }}>
                <div style={{ fontSize: '20px', marginBottom: '5px' }}>📊</div>
                <span style={{ fontSize: '9px', color: '#ccc' }}>বেটিং রেকর্ড</span>
              </div>
              <div onClick={() => setSubPage('profitRecord')} style={{ background: '#182030', padding: '10px 5px', borderRadius: '8px', border: '1px solid #222d42', cursor: 'pointer' }}>
                <div style={{ fontSize: '20px', marginBottom: '5px' }}>📈</div>
                <span style={{ fontSize: '9px', color: '#ccc' }}>লাভ এবং লস</span>
              </div>
              <div onClick={() => setSubPage('depositRecord')} style={{ background: '#182030', padding: '10px 5px', borderRadius: '8px', border: '1px solid #222d42', cursor: 'pointer' }}>
                <div style={{ fontSize: '20px', marginBottom: '5px' }}>📥</div>
                <span style={{ fontSize: '9px', color: '#ccc' }}>জমা রেকর্ড</span>
              </div>
              <div onClick={() => alert('উত্তোলন রেকর্ড')} style={{ background: '#182030', padding: '10px 5px', borderRadius: '8px', border: '1px solid #222d42', cursor: 'pointer' }}>
                <div style={{ fontSize: '20px', marginBottom: '5px' }}>📤</div>
                <span style={{ fontSize: '9px', color: '#ccc' }}>উত্তোলন রেকর্ড</span>
              </div>
              <div onClick={() => alert('অ্যাকাউন্ট রেকর্ড')} style={{ background: '#182030', padding: '10px 5px', borderRadius: '8px', border: '1px solid #222d42', cursor: 'pointer' }}>
                <div style={{ fontSize: '20px', marginBottom: '5px' }}>📑</div>
                <span style={{ fontSize: '9px', color: '#ccc' }}>অ্যাকাউন্ট রেকর্ড</span>
              </div>
              <div onClick={() => alert('আমার অ্যাকাউন্ট')} style={{ background: '#182030', padding: '10px 5px', borderRadius: '8px', border: '1px solid #222d42', cursor: 'pointer' }}>
                <div style={{ fontSize: '20px', marginBottom: '5px' }}>👤</div>
                <span style={{ fontSize: '9px', color: '#ccc' }}>আমার অ্যাকাউন্ট</span>
              </div>
              <div onClick={() => alert('সুরক্ষা কেন্দ্র')} style={{ background: '#182030', padding: '10px 5px', borderRadius: '8px', border: '1px solid #222d42', cursor: 'pointer' }}>
                <div style={{ fontSize: '20px', marginBottom: '5px' }}>🛡️</div>
                <span style={{ fontSize: '9px', color: '#ccc' }}>সুরক্ষা কেন্দ্র</span>
              </div>
            </div>
          </div>
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

            {/* প্রোফাইল কার্ড */}
            <div style={{ background: '#182030', padding: '12px', borderRadius: '10px', marginBottom: '15px', border: '1px solid #222d42', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', background: '#333', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👤</div>
                <div>
                  <div style={{ fontSize: '12px', color: '#aaa' }}>স্বাগতম</div>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#ffb800' }}>liamalvin</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => setActiveTab('deposit')} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>জমা দিন</button>
                <button onClick={() => setActiveTab('withdraw')} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>উত্তোলন</button>
              </div>
            </div>

            {/* গেম গ্রিড */}
            <h4 style={{ fontSize: '13px', color: '#ffb800', marginBottom: '8px' }}>🔥 গরম গেমস (খেললে লাভ/লস ও বেটিং রেকর্ড বাড়বে)</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {hotGames.map(game => (
                <div key={game.id} onClick={() => playGame(game)} style={{ background: '#182030', borderRadius: '8px', padding: '6px', textAlign: 'center', border: '1px solid #222d42', cursor: 'pointer' }}>
                  <div style={{ background: '#111622', height: '60px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '5px', fontSize: '18px', color: '#ffb800' }}>🎮</div>
                  <h4 style={{ fontSize: '10px', margin: '0 0 2px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{game.name}</h4>
                  <span style={{ fontSize: '8px', color: '#aaa', display: 'block', marginBottom: '5px' }}>{game.provider}</span>
                  <div style={{ background: '#ffb800', color: '#000', padding: '3px 0', borderRadius: '4px', fontWeight: 'bold', fontSize: '9px' }}>খেলুন</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ফুটার নেভিগেশন */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#182030', borderTop: '1px solid #222d42', display: 'flex', justifyContent: 'space-around', padding: '8px 0', zIndex: 100, maxWidth: '480px', margin: '0 auto' }}>
        <div onClick={() => { setActiveTab('home'); setSubPage(null); setSelectedGame(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'home' && !subPage ? '#ff3366' : '#aaa' }}>
          <div style={{ fontSize: '16px' }}>🏠</div>
          <span style={{ fontSize: '9px' }}>হোম</span>
        </div>
        <div onClick={() => { setActiveTab('deposit'); setSubPage(null); setSelectedGame(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'deposit' ? '#22c55e' : '#aaa' }}>
          <div style={{ fontSize: '16px' }}>🤝</div>
          <span style={{ fontSize: '9px' }}>শেয়ার</span>
        </div>
        <div onClick={() => { setActiveTab('home'); setSubPage(null); setSelectedGame(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: '#ffb800' }}>
          <div style={{ fontSize: '18px' }}>🎁</div>
          <span style={{ fontSize: '9px' }}>প্রমোশন</span>
        </div>
        <div onClick={() => { setActiveTab('deposit'); setSubPage(null); setSelectedGame(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'deposit' ? '#22c55e' : '#aaa' }}>
          <div style={{ fontSize: '16px' }}>💳</div>
          <span style={{ fontSize: '9px' }}>ডিপোজিট</span>
        </div>
        <div onClick={() => { setActiveTab('account'); setSubPage(null); setSelectedGame(null); }} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'account' ? '#3b82f6' : '#aaa' }}>
          <div style={{ fontSize: '16px' }}>👤</div>
          <span style={{ fontSize: '9px' }}>সদস্যরা</span>
        </div>
      </nav>

    </div>
  );
}
