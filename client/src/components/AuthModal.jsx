import React, { useState } from 'react';

export default function AuthModal({ isOpen, onClose }) {
  const [isLoginTab, setIsLoginTab] = useState(true);

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
      <div style={{ backgroundColor: '#f8fafc', color: '#000', width: '90%', maxWidth: '380px', padding: '20px', borderRadius: '8px', position: 'relative' }}>
        
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '10px', right: '12px', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          ✕
        </button>

        <h3 style={{ textAlign: 'center', color: '#d97706', marginBottom: '15px' }}>LA94 CASINO</h3>

        <div style={{ display: 'flex', backgroundColor: '#e2e8f0', borderRadius: '4px', marginBottom: '15px' }}>
          <button 
            onClick={() => setIsLoginTab(true)}
            style={{ flex: 1, padding: '8px', border: 'none', background: isLoginTab ? '#2563eb' : 'transparent', color: isLoginTab ? '#fff' : '#64748b', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}
          >
            লগইন
          </button>
          <button 
            onClick={() => setIsLoginTab(false)}
            style={{ flex: 1, padding: '8px', border: 'none', background: !isLoginTab ? '#2563eb' : 'transparent', color: !isLoginTab ? '#fff' : '#64748b', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}
          >
            নিবন্ধন
          </button>
        </div>

        {isLoginTab ? (
          <form onSubmit={(e) => { e.preventDefault(); alert('লগইন সফল হয়েছে!'); onClose(); }}>
            <div style={{ marginBottom: '12px' }}>
              <input type="text" placeholder="ব্যবহারকারী নাম" required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <input type="password" placeholder="পাসওয়ার্ড" required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', borderBox: 'box-sizing' }} />
            </div>
            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
              লগইন
            </button>
          </form>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); alert('নিবন্ধন সফল হয়েছে!'); onClose(); }}>
            <div style={{ marginBottom: '10px' }}>
              <input type="text" placeholder="ব্যবহারকারী নাম" required style={{ width: '100%', padding: '9px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <input type="password" placeholder="পাসওয়ার্ড" required style={{ width: '100%', padding: '9px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <input type="tel" placeholder="মোবাইল নম্বর" required style={{ width: '100%', padding: '9px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>
            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
              নিবন্ধন
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
