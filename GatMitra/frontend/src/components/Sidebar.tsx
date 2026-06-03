import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Menu } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isCollapsed.toString());
  }, [isCollapsed]);

  const isSuperAdminRoute = location.pathname.startsWith('/superadmin') || location.pathname.startsWith('/bachatgat');
  const isMemberRoute = location.pathname.startsWith('/member');

  let menuItems = [];
  if (isSuperAdminRoute) {
    menuItems = [
      { name: 'Dashboard', path: '/superadmin/dashboard', icon: LayoutDashboard },
      { name: 'Bachat Gat Management', path: '/bachatgat', icon: Users },
      { name: 'Audit Logs', path: '/superadmin/audits', icon: FileText },
    ];
  } else if (isMemberRoute) {
    menuItems = [
      { name: 'Dashboard', path: '/member/dashboard', icon: LayoutDashboard },
    ];
  } else {
    menuItems = [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { name: 'Member Management', path: '/members', icon: Users },
      { name: 'Audit Logs', path: '/audits', icon: FileText },
    ];
  }

  return (
    <aside className={`hidden md:flex flex-col h-screen bg-[#f5f2fb] border-r border-[#c6c5d4]/40 transition-all duration-300 z-50 shrink-0 ${isCollapsed ? 'w-20' : 'w-72'}`}>
      <div className={`flex items-center h-16 px-4 border-b border-[#c6c5d4]/40 ${isCollapsed ? 'justify-center' : 'justify-end'}`}>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-[#e4e1ea] text-[#454652] transition-colors"
          title="Toggle Sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          // Exact match or active logic
          const isActive = location.pathname === item.path || 
                           (item.path === '/bachatgat' && location.pathname.startsWith('/bachatgat')) || 
                           (item.path === '/members' && location.pathname.startsWith('/members'));
          
          return (
            <div key={item.path} className="px-3">
              <button 
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center px-4 py-3 rounded-xl gap-4 transition-all ${
                  isActive 
                    ? 'bg-[#1a237e] text-white font-semibold shadow-sm' 
                    : 'text-[#454652] hover:bg-[#e4e1ea]/50'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={item.name}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span className="text-sm whitespace-nowrap overflow-hidden">{item.name}</span>}
              </button>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};
