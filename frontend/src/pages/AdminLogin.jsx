import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Globe, CheckCircle2 } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://localhost:5000/api/superadmin/login', {
        username,
        password
      });
      localStorage.setItem('token', response.data.token);
      setSuccess(t('loginSuccess'));
      setTimeout(() => navigate('/admin-dashboard'), 1000);
    } catch (err) {
      setError(t('loginFailed'));
    }
  };

  return (
    <div className="login-layout animate-fade-in">
      {/* Left side standard split banner */}
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
        
        {/* Local language switcher since global strictly hidden */}
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
          
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>{t('adminId')}</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="admin"
                required 
              />
            </div>
            
            <div className="input-group">
              <label>{t('password')}</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
                required 
              />
            </div>
            
            <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
              <a href="#" style={{ color: 'var(--primary-color)', fontSize: '0.875rem', textDecoration: 'none' }}>
                {t('forgotPassword')}
              </a>
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '1rem' }}>
              {t('signIn')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
