import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  ShieldAlert, 
  LogOut, 
  Globe, 
  Menu, 
  X, 
  UserCheck,
  Sparkles
} from 'lucide-react';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  const menuItems = [
    { name: t('common.dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('common.bachatGat'), path: '/bachatgat', icon: BookOpen },
    { name: t('common.members'), path: '/members', icon: Users },
    { name: t('common.audits'), path: '/audits', icon: ShieldAlert },
    { name: 'Stitch Showcase', path: '/stitch', icon: Sparkles },
  ];

  return (
    <div className="flex min-h-screen bg-[#080c14] text-slate-100 overflow-hidden relative">
      {/* Background blobs for top tier aesthetic */}
      <div className="bg-glow-purple top-[-100px] left-[-100px]"></div>
      <div className="bg-glow-cyan bottom-[-100px] right-[-100px]"></div>

      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 glass-panel border-r border-slate-800/40 p-5 z-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
            <UserCheck className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight gradient-text">{t('common.appName')}</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Management System</p>
          </div>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-brand-600/30 to-brand-500/10 border-l-4 border-brand-500 text-brand-300 font-semibold' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-slate-800/60 mt-auto">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="h-9 w-9 rounded-full bg-slate-700/60 flex items-center justify-center text-xs font-bold text-brand-300">
              {user?.username?.substring(0, 2).toUpperCase()}
            </div>
            <div className="truncate">
              <p className="text-sm font-medium leading-none">{user?.username}</p>
              <p className="text-[10px] text-slate-500 mt-1">{user?.roles?.[0]}</p>
            </div>
          </div>

          <button
            onClick={() => { logout(); navigate('/login'); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded-xl transition-all duration-200 text-sm"
          >
            <LogOut className="h-4 w-4" />
            <span>{t('common.logout')}</span>
          </button>
        </div>
      </aside>

      {/* Main content grid */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header bar */}
        <header className="h-16 glass-panel border-b border-slate-800/40 px-6 flex items-center justify-between z-10 shrink-0">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-850 hover:text-slate-100"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden lg:block text-slate-400 text-sm">
            GatMitra Bachat Gat Portal
          </div>

          {/* Lang Selector & User Profile */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Lang Dropdown */}
            <div className="flex items-center gap-1 bg-slate-900/60 border border-slate-800/60 rounded-lg px-2 py-1.5 text-xs text-slate-300">
              <Globe className="h-3.5 w-3.5 text-brand-400" />
              <select 
                value={i18n.language} 
                onChange={(e) => changeLanguage(e.target.value)}
                className="bg-transparent border-none text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="en" className="bg-[#0b0f19]">English</option>
                <option value="mr" className="bg-[#0b0f19]">मराठी</option>
                <option value="hi" className="bg-[#0b0f19]">हिंदी</option>
              </select>
            </div>
          </div>
        </header>

        {/* Dashboard inner layout content container */}
        <main className="flex-1 p-6 relative">
          {children}
        </main>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Overlay background */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          
          <aside className="relative flex flex-col w-64 max-w-xs h-full bg-[#0b0f19] border-r border-slate-800 p-5 z-50">
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-100"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-8 mt-2">
              <div className="h-9 w-9 rounded-lg bg-brand-600 flex items-center justify-center">
                <UserCheck className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-lg font-bold gradient-text">{t('common.appName')}</h1>
            </div>

            <nav className="flex-1 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => { navigate(item.path); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-brand-600/20 text-brand-300 border-l-4 border-brand-500 font-semibold' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/10'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-slate-800 mt-auto">
              <button
                onClick={() => { logout(); navigate('/login'); setMobileMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-950/20 rounded-xl transition-all duration-200 text-sm"
              >
                <LogOut className="h-4 w-4" />
                <span>{t('common.logout')}</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};
