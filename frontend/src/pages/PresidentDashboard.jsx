import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Users, Plus, X, Menu, LogOut, Wallet, Calendar } from 'lucide-react';

export default function PresidentDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [groupInfo, setGroupInfo] = useState({ name: '' });
  const [members, setMembers] = useState([]);
  
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberMobile, setNewMemberMobile] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('MEMBER');
  
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const { t } = useTranslation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchGroupInfo();
    if (activeTab === 'dashboard' || activeTab === 'members') fetchMembers();
  }, [activeTab]);

  const fetchGroupInfo = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/members/group-info', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGroupInfo(res.data);
    } catch(err) { console.error('Failed to fetch group info'); }
  };

  const fetchMembers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/members/list', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMembers(res.data);
    } catch(err) { console.error('Failed to fetch members'); }
  };

  const handleCreateMember = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.post(
        'http://localhost:5000/api/members/add', 
        { fullName: newMemberName, mobileNumber: newMemberMobile, role: newMemberRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setMessage({ type: 'success', text: response.data.message });
      setNewMemberName(''); setNewMemberMobile('');
      
      fetchMembers();
      setTimeout(() => { setIsModalOpen(false); setMessage({ type: '', text: '' }); }, 2000);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to add member.' });
    }
  };

  return (
    <div className="dashboard-layout animate-fade-in">
      {/* Sidebar Navigation */}
      <div className={`sidebar ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}>
        <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', color: 'white' }}>
          <button onClick={() => setIsSidebarExpanded(!isSidebarExpanded)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', padding: 0 }}>
            <Menu size={24} />
          </button>
          <span className="sidebar-text" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{groupInfo.name || 'Group Admin'}</span>
        </div>

        <div style={{ marginTop: '1rem', flex: 1 }}>
          <div 
            className={`sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={20} /> <span className="sidebar-text">{t('dashboard')}</span>
          </div>
          <div 
            className={`sidebar-item ${activeTab === 'members' ? 'active' : ''}`}
            onClick={() => setActiveTab('members')}
          >
            <Users size={20} /> <span className="sidebar-text">{t('members')}</span>
          </div>
          <div 
            className={`sidebar-item ${activeTab === 'savings' ? 'active' : ''}`}
            onClick={() => setActiveTab('savings')}
          >
            <Wallet size={20} /> <span className="sidebar-text">{t('savings')}</span>
          </div>
        </div>

        <div 
          className="sidebar-item"
          onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); window.location.href = '/member-login'; }}
          style={{ marginBottom: '1rem' }}
        >
          <LogOut size={20} /> <span className="sidebar-text">Logout</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="dashboard-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2>{activeTab === 'dashboard' ? t('welcomeMsg') : t(activeTab)}</h2>
          
          <button className="btn-primary" style={{ width: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }} onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> {t('addGroupMember')}
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="metrics-grid">
            <div className="metric-card">
              <span className="metric-label">{t('activeMembers')}</span>
              <span className="metric-value">{members.length}</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">{t('totalSavings')}</span>
              <span className="metric-value">₹0</span>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead className="dashboard-table-header">
                <tr>
                  <th>{t('memberName')}</th>
                  <th>{t('mobileNumber')}</th>
                  <th>{t('memberRole')}</th>
                </tr>
              </thead>
              <tbody>
                {members.map(m => (
                  <tr key={m.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px', fontWeight: '500' }}>{m.fullName}</td>
                    <td style={{ padding: '12px' }}>{m.mobileNumber}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontSize: '0.8rem',
                        background: m.role === 'ADMIN' ? '#dcfce7' : '#f1f5f9',
                        color: m.role === 'ADMIN' ? '#166534' : '#475569'
                      }}>
                        {m.role === 'ADMIN' ? t('roleAdmin') : t('roleMember')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Member Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'var(--primary-color)', margin: 0 }}>{t('addGroupMember')}</h3>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setIsModalOpen(false)}>
                <X size={24} color="var(--text-muted)" />
              </button>
            </div>
            
            {message.text && (
              <div style={{ padding: '10px', borderRadius: '6px', marginBottom: '1rem', background: message.type === 'success' ? '#d1fae5' : '#fee2e2', color: message.type === 'success' ? '#047857' : '#b91c1c' }}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleCreateMember}>
              <div className="input-group">
                <label>{t('memberName')}</label>
                <input 
                  type="text" 
                  value={newMemberName} 
                  onChange={(e) => setNewMemberName(e.target.value)} 
                  placeholder="Full Name" required 
                />
              </div>

              <div className="input-group">
                <label>{t('mobileNumber')}</label>
                <input 
                  type="tel" value={newMemberMobile} 
                  onChange={(e) => setNewMemberMobile(e.target.value)} 
                  placeholder="10-digit mobile number" pattern="[0-9]{10}" required 
                />
              </div>

              <div className="input-group">
                <label>{t('memberRole')}</label>
                <select value={newMemberRole} onChange={(e) => setNewMemberRole(e.target.value)}>
                  <option value="MEMBER">{t('roleMember')}</option>
                  <option value="ADMIN">{t('roleAdmin')}</option>
                </select>
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                {t('addGroupMember')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
