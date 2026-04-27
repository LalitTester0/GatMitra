import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Globe, CheckCircle2, Smartphone, Key } from 'lucide-react';

export default function MemberLogin() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Request OTP, 2: Verify OTP
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/request-otp', {
        mobileNumber
      });
      setSuccess(t('otpSent'));
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || t('invalidMobile'));
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        mobileNumber,
        otp
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.member));
      
      setSuccess(t('loginSuccess'));
      
      // Redirect based on role
      setTimeout(() => {
        if (response.data.member.role === 'ADMIN') {
          navigate('/president-dashboard');
        } else {
          navigate('/member-passbook');
        }
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.error || t('incorrectOTP'));
    }
  };

  return (
    <div className="login-layout animate-fade-in">
      {/* Left side banner */}
      <div className="login-banner">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t('bannerTitle')}</h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2rem' }}>{t('bannerSubtitle')}</p>
        
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '2rem' }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', fontSize: '1.05rem' }}>
            <CheckCircle2 color="#3b82f6" /> {t('bannerF1')}
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', fontSize: '1.05rem' }}>
            <CheckCircle2 color="#3b82f6" /> {t('bannerF2')}
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', fontSize: '1.05rem' }}>
            <CheckCircle2 color="#3b82f6" /> {t('bannerF3')}
          </li>
        </ul>
      </div>

      {/* Right side form */}
      <div className="login-form-container" style={{ position: 'relative' }}>
        
        <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Globe size={18} color="var(--text-muted)" />
          <select 
            onChange={(e) => i18n.changeLanguage(e.target.value)} 
            defaultValue={i18n.language}
            style={{ border: 'none', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', outline: 'none' }}
          >
            <option value="mr">मराठी</option>
            <option value="hi">हिंदी</option>
            <option value="en">English</option>
          </select>
        </div>

        <div style={{ width: '100%', maxWidth: '400px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
            {t('welcomeBack')}
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            {t('enterCredentials')}
          </p>
          
          {error && <p style={{ color: 'var(--danger)', fontSize: '0.9rem', marginBottom: '1rem', padding: '10px', background: '#fee2e2', borderRadius: '6px' }}>{error}</p>}
          {success && <p style={{ color: 'var(--success)', fontSize: '0.9rem', marginBottom: '1rem', padding: '10px', background: '#d1fae5', borderRadius: '6px' }}>{success}</p>}
          
          {step === 1 ? (
            <form onSubmit={handleRequestOTP}>
              <div className="input-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Smartphone size={16} /> {t('mobileNumber')}
                </label>
                <input 
                  type="tel" 
                  value={mobileNumber} 
                  onChange={(e) => setMobileNumber(e.target.value)} 
                  placeholder="9876543210"
                  pattern="[0-9]{10}"
                  required 
                />
              </div>
              
              <button type="submit" className="btn-primary" style={{ padding: '1rem', marginTop: '1rem' }}>
                {t('requestOTP')}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP}>
              <div className="input-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Key size={16} /> {t('enterOTP')}
                </label>
                <input 
                  type="text" 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
                  placeholder="1234"
                  maxLength="4"
                  required 
                />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '5px' }}>
                  OTP sent to {mobileNumber}. <span style={{ color: 'var(--primary-color)', cursor: 'pointer' }} onClick={() => setStep(1)}>Change Number</span>
                </p>
              </div>
              
              <button type="submit" className="btn-primary" style={{ padding: '1rem', marginTop: '1rem' }}>
                {t('verifyOTP')}
              </button>
            </form>
          )}

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Are you an administrator? <span style={{ color: 'var(--primary-color)', cursor: 'pointer' }} onClick={() => navigate('/admin-login')}>Admin Login</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
