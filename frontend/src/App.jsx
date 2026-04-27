import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import MemberLogin from './pages/MemberLogin';
import PresidentDashboard from './pages/PresidentDashboard';
import { LogOut, Globe } from 'lucide-react';

function NavigationHeader() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  if (location.pathname === '/admin-login' || location.pathname === '/member-login') return null;

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/admin-login';
  };

  return (
    <header className="header">
      <h1>{t('appTitle')}</h1>
      
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Globe size={18} />
          <select 
            onChange={changeLanguage} 
            defaultValue={i18n.language}
            style={{
              background: 'transparent',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: '4px',
              padding: '2px 5px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="mr" style={{ color: 'black' }}>मराठी</option>
            <option value="hi" style={{ color: 'black' }}>हिंदी</option>
            <option value="en" style={{ color: 'black' }}>English</option>
          </select>
        </div>
        
        <button 
          onClick={handleLogout} 
          style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavigationHeader />
        <main className="main-content" style={{ padding: 0 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/member-login" replace />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/member-login" element={<MemberLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/president-dashboard" element={<PresidentDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
