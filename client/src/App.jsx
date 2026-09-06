import React, { useState, useEffect } from 'react';

export default function App() {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('la94_balance');
    return saved !== null ? parseFloat(saved) : 5.15;
  });

  const [activeTab, setActiveTab] = useState('home'); // home, deposit, account, withdraw
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // সাব-পেজ স্টেট (অ্যাকাউন্টের ১২টি অপশনের জন্য)
  const [subPage, setSubPage] = useState(null);

  // ডিপোজিট ও উইথড্র স্টেট
  const [depositAmount, setDepositAmount] = useState('');
  const [trxId, setTrxId] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  // সাইড মেনু ড্রয়ার স্টেট
  const [drawerOpen, setDrawerOpen] = useState(false);

  // লাইভ নোটিফিকেশন
  const [winAlert, setWinAlert] = useState('স্বাগতম LA94.COM-এ! ফাস্ট ডিপোজিট করুন এবং খেলুন।');

  useEffect(() => {
    localStorage.setItem('la94_balance', balance);
  }, [balance]);

  useEffect(() => {
    const names = ['Rahim***', 'Karim***', 'Hasan***', 'Ripon***', 'Aminul***', 'Sojib***'];
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
      alert('সঠিক তথ্য দিন!');
      return;
    }
    setBalance(prev => prev + amount);
    alert(`সফল! অ্যাকাউন্টে ৳ ${amount} যোগ হয়েছে।`);
    setDepositAmount('');
    setTrxId('');
    setActiveTab('home');
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
  };

  // সাব-পেজ রেন্ডার করার ফাংশন (যেখানে কোনো অ্যালার্ট পপআপ নেই)
  const renderSubPageView = () => {
    return (
      <div style={{ background: '#182030', padding: '15px', borderRadius: '10px', border: '1px solid #222d42', minHeight: '350px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #222d42', paddingBottom: '10px' }}>
          <h3 style={{ color: '#ffb800', fontSize: '15px', margin: 0 }}>{subPage}</h3>
          <button onClick={() => setSubPage(null)} style={{ background: '#222d42', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '11px' }}>← পেছনে</button>
        </div>

        {subPage === 'পুরস্কার সেন্টার' && (
          <div>
            <p style={{ fontSize: '12px', color: '#aaa', marginBottom: '10px' }}>আপনার বর্তমান রিওয়ার্ড এবং বোনাস क्লেইম করুন:</p>
            <div style={{ background: '#121824', padding: '10px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 'bold' }}>ডেইলি চেক-ইন বোনাস</div>
                <div style={{ fontSize: '10px', color: '#22c55e' }}>৳ ৫০.০০ উপলব্ধ</div>
              </div>
              <button onClick={() => { setBalance(b => b + 50); alert('৳৫০ যোগ হয়েছে!'); }} style={{ background: '#22c55e', border: 'none', color: '#fff', padding: '5px 10px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}>দাবি করুন</button>
            </div>
          </div>
        )}

        {subPage === 'বেটিং রেকর্ড' && (
          <div>
            <p style={{ fontSize: '12px', color: '#aaa', marginBottom: '10px' }}>আপনার সাম্প্রতিক গেম বেটিং হিস্ট্রি:</p>
            <div style={{ background: '#121824', padding: '10px', borderRadius: '6px', fontSize: '11px', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
              <span>🎮 Aviator (Spribe)</span>
              <span style={{ color: '#22c55e' }}>+৳ 320.00</span>
            </div>
            <div style={{ background: '#121824', padding: '10px', borderRadius: '6px', fontSize: '11px', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
              <span>🎮 Super Ace</span>
              <span style={{ color: '#ef4444' }}>-৳ 100.00</span>
            </div>
          </div>
        )}

        {subPage === 'জমা রেকর্ড' && (
          <div>
            <p style={{ fontSize: '12px', color: '#aaa', marginBottom: '10px' }}>আপনার সফল ডিপোজিট সমুহ:</p>
            <div style={{ background: '#121824', padding: '10px', borderRadius: '6px', fontSize: '11px', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
              <span>বিকাশ (TrxID: TRK8932)</span>
              <span style={{ color: '#22c55e' }}>সফল (+৳ 500)</span>
            </div>
          </div>
        )}

        {subPage === 'উত্তোলন রেকর্ড' && (
          <div>
            <p style={{ fontSize: '12px', color: '#aaa', marginBottom: '10px' }}>আপনার উত্তোলন হিস্ট্রি:</p>
            <div style={{ background: '#121824', padding: '10px', borderRadius: '6px', fontSize: '11px', marginBottom: '6px', textAlign: 'center', color: '#aaa' }}>
              কোনো উত্তোলন রেকর্ড পাওয়া যায়নি।
            </div>
          </div>
        )}

        {subPage === 'কাউন্টার সার্ভিস' && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: '#aaa', marginBottom: '15px' }}>যেকোনো সহায়তার জন্য আমাদের লাইভ সাপোর্টে যোগাযোগ করুন:</p>
            <a href="https://t.me/" target="_blank" rel="noreferrer" style={{ display: 'block', background: '#3b82f6', color: '#fff', padding: '10px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '12px' }}>💬 টেলিগ্রাম লাইভ সাপোর্ট</a>
          </div>
        )}

        {/* অন্য পেজগুলোর সাধারণ কন্টেন্ট */}
        {['লাভ এবং লস', 'অ্যাকাউন্ট রেকর্ড', 'আমার অ্যাকাউন্ট', 'সুরক্ষা কেন্দ্র', 'বন্ধুদের আমন্ত্রণ', 'মিশন', 'রিবেট'].includes(subPage) && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '30px', marginBottom: '10px' }}>🛠️</div>
            <p style={{ fontSize: '12px', color: '#aaa' }}>{subPage} সেকশনটির কাজ চলমান রয়েছে।</p>
          </div>
        )}
      </div>
    );
  };

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

      {/* সাইড মেনু ড্রয়ার */}
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

      {/* লাইভ নোটিফিকেশন */}
      <div style={{ background: '#1e293b', color: '#ffcc00', padding: '6px 12px', fontSize: '11px', borderBottom: '1px solid #283548', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        📢 <span>{winAlert}</span>
      </div>

      {/* মেইন কন্টেন্ট */}
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
          subPage ? renderSubPageView() : (
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

              {/* ১২টি সাব-পেজ অপশন গ্রিড */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', textAlign: 'center' }}>
                {[
                  { name: 'পুরস্কার সেন্টার', icon: '🏆' },
                  { name: 'বেটিং রেকর্ড', icon: '📊' },
                  { name: 'লাভ এবং লস', icon: '📈' },
                  { name: 'জমা রেকর্ড', icon: '📥' },
                  { name: 'উত্তোলন রেকর্ড', icon: '📤' },
                  { name: 'অ্যাকাউন্ট রেকর্ড', icon: '📑' },
                  { name: 'আমার অ্যাকাউন্ট', icon: '👤' },
                  { name: 'সুরক্ষা কেন্দ্র', icon: '🛡️' },
                  { name: 'বন্ধুদের আমন্ত্রণ', icon: '🤝' },
                  { name: 'মিশন', icon: '🎁' },
                  { name: 'রিবেট', icon: '💰' },
                  { name: 'কাউন্টার সার্ভিস', icon: '🎧' }
                ].map((item, idx) => (
                  <div key={idx} onClick={() => setSubPage(item.name)} style={{ background: '#182030', padding: '10px 5px', borderRadius: '8px', border: '1px solid #222d42', cursor: 'pointer' }}>
                    <div style={{ fontSize: '20px', marginBottom: '5px' }}>{item.icon}</div>
                    <span style={{ fontSize: '9px', color: '#ccc' }}>{item.name}</span>
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '15px', textAlign: 'center' }}>
              <div onClick={() => setActiveTab('deposit')} style={{ background: '#182030', padding: '10px 5px', borderRadius: '8px', border: '1px solid #222d42', cursor: 'pointer' }}>
                <div style={{ fontSize: '16px', color: '#22c55e' }}>💰</div>
                <span style={{ fontSize: '10px', color: '#ccc' }}>ডিপোজিট</span>
              </div>
              <div onClick={() => setActiveTab('withdraw')} style={{ background: '#182030', padding: '10px 5px', borderRadius: '8px', border: '1px solid #222d42', cursor: 'pointer' }}>
                <div style={{ fontSize: '16px', color: '#3b82f6' }}>💳</div>
                <span style={{ fontSize: '10px', color: '#ccc' }}>উত্তোলন</span>
              </div>
              <div onClick={() => { setActiveTab('account'); setSubPage('পুরস্কার সেন্টার'); }} style={{ background: '#182030', padding: '10px 5px', borderRadius: '8px', border: '1px solid #222d42', cursor: 'pointer' }}>
                <div style={{ fontSize: '16px', color: '#ffb800' }}>🏆</div>
                <span style={{ fontSize: '10px', color: '#ccc' }}>পুরস্কার</span>
              </div>
              <div onClick={() => { setActiveTab('account'); setSubPage('রিবেট'); }} style={{ background: '#182030', padding: '10px 5px', borderRadius: '8px', border: '1px solid #222d42', cursor: 'pointer' }}>
                <div style={{ fontSize: '16px', color: '#a855f7' }}>💵</div>
                <span style={{ fontSize: '10px', color: '#ccc' }}>রিবেট</span>
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <input type="text" placeholder="গেম খুঁজুন..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '9px 12px', background: '#182030', color: '#fff', border: '1px solid #222d42', borderRadius: '8px', outline: 'none', fontSize: '12px' }} />
            </div>

            <h4 style={{ fontSize: '13px', color: '#ffb800', marginBottom: '8px' }}>🔥 গরম গেমস</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {hotGames.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase())).map(game => (
                <div key={game.id} onClick={() => setSelectedGame(game)} style={{ background: '#182030', borderRadius: '8px', padding: '6px', textAlign: 'center', border: '1px solid #222d42', cursor: 'pointer' }}>
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
