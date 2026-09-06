import React, { useState } from 'react';
import './Auth.css';

export default function Auth({ onClose }) {
  const [isLogin, setIsLogin] = useState(true); // true মানে লগইন ট্যাব, false মানে নিবন্ধন
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    agree: false,
    remember: false
  });

  const [errors, setErrors] = useState({});

  // ইনপুট পরিবর্তনের হ্যান্ডলার
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // ফর্ম সাবমিট হ্যান্ডলার (রিয়েল ফাংশনালিটি)
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (isLogin) {
      if (formData.username.length < 6 || formData.username.length > 13) {
        newErrors.username = 'দয়া করে ৬ - ১৩ বর্ণমালা এবং সংখ্যাসহ বিশেষ চিহ্ন ছাড়া একটি অক্ষর লিখুন';
      }
      if (formData.password.length < 6 || formData.password.length > 12) {
        newErrors.password = 'দয়া করে ৬ - ১২ বর্ণমালা এবং সংখ্যাসহ বিশেষ চিহ্ন ছাড়া একটি অক্ষর লিখুন';
      }
    } else {
      if (!formData.username) newErrors.username = 'ব্যবহারকারী নাম আবশ্যক';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'পাসওয়ার্ড মিলছে না';
      }
      if (!formData.mobile) newErrors.mobile = 'মোবাইল নম্বর আবশ্যক';
      if (!formData.agree) newErrors.agree = 'শর্তাবলীতে সম্মত হতে হবে';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert(isLogin ? 'সফলভাবে লগইন হয়েছে!' : 'সফলভাবে নিবন্ধন সম্পন্ন হয়েছে!');
      // এখানে আপনি API বা ব্যাকএন্ড কল করতে পারেন
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-card">
        {/* ব্যাক বা ক্লোজ বাটন */}
        <button className="close-btn" onClick={onClose}>✕</button>

        {/* লোগো */}
        <div className="auth-logo-area">
          <h2 className="logo-text">FB77</h2>
        </div>

        {/* লগইন এবং নিবন্ধন ট্যাব পরিবর্তন */}
        <div className="auth-tabs">
          <button 
            className={`tab-toggle ${isLogin ? 'active' : ''}`} 
            onClick={() => { setIsLogin(true); setErrors({}); }}
          >
            লগইন
          </button>
          <button 
            className={`tab-toggle {!isLogin ? 'active' : ''}`} 
            onClick={() => { setIsLogin(false); setErrors({}); }}
          >
            নিবন্ধন
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form-body">
          {/* ইউজারনেম ফিল্ড */}
          <div className="input-box">
            <input 
              type="text" 
              name="username" 
              placeholder="ব্যবহারকারী নাম" 
              value={formData.username}
              onChange={handleChange}
              required 
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>

          {/* পাসওয়ার্ড ফিল্ড */}
          <div className="input-box">
            <input 
              type="password" 
              name="password" 
              placeholder="পাসওয়ার্ড" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          {/* শুধুমাত্র নিবন্ধনের জন্য এক্সট্রা ফিল্ড */}
          {!isLogin && (
            <>
              <div className="input-box">
                <input 
                  type="password" 
                  name="confirmPassword" 
                  placeholder="পাসওয়ার্ড নিশ্চিত করুন" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required 
                />
                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
              </div>

              <div className="input-box">
                <input 
                  type="tel" 
                  name="mobile" 
                  placeholder="মোবাইল নম্বর" 
                  value={formData.mobile}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="terms-box">
                <input 
                  type="checkbox" 
                  name="agree" 
                  id="agree"
                  checked={formData.agree}
                  onChange={handleChange} 
                />
                <label htmlFor="agree"> আমি ১৮ বছরের এবং এই শর্তাদি গ্রহণ করতে সম্মত <span>《ব্যবহারের শর্তাবলি》</span></label>
              </div>
            </>
          )}

          {/* লগইনের অতিরিক্ত অপশন */}
          {isLogin && (
            <div className="login-extra">
              <label>
                <input 
                  type="checkbox" 
                  name="remember" 
                  checked={formData.remember}
                  onChange={handleChange} 
                /> মনে রাখুন
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('পাসওয়ার্ড পুনরুদ্ধারের নির্দেশনা পাঠানো হয়েছে'); }}>পাসওয়ার্ড ভুলে গেছেন?</a>
            </div>
          )}

          {/* সাবমিট বাটন */}
          <button type="submit" className="action-btn">
            {isLogin ? 'লগইন' : 'নিবন্ধন'}
          </button>
        </form>

        {/* ফুটার বা সোশ্যাল লগইন */}
        <div className="auth-footer-sec">
          <p>অথবা চালিয়ে যান</p>
          <button className="google-login-btn">G</button>
          <div className="support-link-text">
            গ্রাহক সেবা প্রশ্ন? <a href="#service">পরিষেবাগুলি</a>
          </div>
        </div>
      </div>
    </div>
  );
}
