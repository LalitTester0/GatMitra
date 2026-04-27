import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Users, Plus, X, Menu, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [stats, setStats] = useState({ totalGroups: 0, weekGroups: 0, monthGroups: 0 });
  const [groups, setGroups] = useState([]);
  
  const [groupName, setGroupName] = useState('');
  const [presidentName, setPresidentName] = useState('');
  const [presidentMobile, setPresidentMobile] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const { t } = useTranslation();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (activeTab === 'dashboard') fetchStats();
    if (activeTab === 'groups') fetchGroups();
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/superadmin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res.data);
    } catch(err) { console.error('Failed to fetch stats'); }
  };

  const fetchGroups = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/superadmin/groups', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGroups(res.data);
    } catch(err) { console.error('Failed to fetch groups'); }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.post(
        'http://localhost:5000/api/superadmin/create-group', 
        { groupName, presidentName, presidentMobile },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setMessage({ type: 'success', text: response.data.message });
      setGroupName(''); setPresidentName(''); setPresidentMobile('');
      
      // Auto-refresh lists
      if (activeTab === 'groups') fetchGroups();
      if (activeTab === 'dashboard') fetchStats();
      
      setTimeout(() => { setIsModalOpen(false); setMessage({ type: '', text: '' }); }, 2000);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to create group.' });
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
          <span className="sidebar-text" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Bachat Gat</span>
        </div>

        <div style={{ marginTop: '1rem', flex: 1 }}>
          <div 
            className={`sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={20} /> <span className="sidebar-text">Dashboard</span>
          </div>
          <div 
            className={`sidebar-item ${activeTab === 'groups' ? 'active' : ''}`}
            onClick={() => setActiveTab('groups')}
          >
            <Users size={20} /> <span className="sidebar-text">Manage Gats</span>
          </div>
        </div>

        <div 
          className="sidebar-item"
          onClick={() => { localStorage.removeItem('token'); window.location.href = '/admin-login'; }}
          style={{ marginBottom: '1rem' }}
        >
          <LogOut size={20} /> <span className="sidebar-text">Logout</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="dashboard-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2>{activeTab === 'dashboard' ? 'Overview' : 'Registered Bachat Gats'}</h2>
          
          <button className="btn-primary" style={{ width: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }} onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> Add New Gat
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="metrics-grid">
            <div className="metric-card">
              <span className="metric-label">Total Active Gats</span>
              <span className="metric-value">{stats.totalGroups}</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">Registered This Week</span>
              <span className="metric-value">{stats.weekGroups}</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">Registered This Month</span>
              <span className="metric-value">{stats.monthGroups}</span>
            </div>
          </div>
        )}

        {activeTab === 'groups' && (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead className="dashboard-table-header">
                <tr>
                  <th>Group Name</th>
                  <th>President Name</th>
                  <th>Members</th>
                  <th>Registered At</th>
                </tr>
              </thead>
              <tbody>
                {groups.map(g => (
                  <tr key={g.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px', fontWeight: '500' }}>{g.name}</td>
                    <td style={{ padding: '12px', color: 'var(--text-muted)' }}>
                      {g.members.length > 0 ? g.members[0].fullName : 'N/A'} <br/>
                      <small>{g.members.length > 0 ? g.members[0].mobileNumber : ''}</small>
                    </td>
                    <td style={{ padding: '12px' }}>{g._count.members}</td>
                    <td style={{ padding: '12px' }}>{new Date(g.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
                {groups.length === 0 && (
                  <tr><td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>No groups found. Please click + Add New Gat.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add New Gat Modal Overlay */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'var(--primary-color)', margin: 0 }}>Create New Group</h3>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setIsModalOpen(false)}>
                <X size={24} color="var(--text-muted)" />
              </button>
            </div>
            
            {message.text && (
              <div style={{ padding: '10px', borderRadius: '6px', marginBottom: '1rem', background: message.type === 'success' ? '#d1fae5' : '#fee2e2', color: message.type === 'success' ? '#047857' : '#b91c1c' }}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleCreateGroup}>
              <div className="input-group">
                <label>Bachat Gat Name</label>
                <input 
                  type="text" 
                  value={groupName} 
                  onChange={(e) => setGroupName(e.target.value)} 
                  placeholder="e.g. Laxmi Mahila Bachat Gat" required 
                />
              </div>

              <h4 style={{ marginBottom: '1rem', marginTop: '1.5rem', color: 'var(--text-main)' }}>Assign President</h4>
              
              <div className="input-group">
                <label>President Full Name</label>
                <input 
                  type="text" value={presidentName} 
                  onChange={(e) => setPresidentName(e.target.value)} 
                  placeholder="Full Name" required 
                />
              </div>

              <div className="input-group">
                <label>President Mobile Number</label>
                <input 
                  type="tel" value={presidentMobile} 
                  onChange={(e) => setPresidentMobile(e.target.value)} 
                  placeholder="10-digit mobile number" pattern="[0-9]{10}" required 
                />
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                Register Group
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
