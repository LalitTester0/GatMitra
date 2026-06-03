import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Globe, Bell, ChevronDown, UserCheck, LogOut } from 'lucide-react';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { t, i18n } = useTranslation();
  const [activeDropdown, setActiveDropdown] = useState<'notifications' | 'languages' | 'profile' | null>(null);

  const toggleDropdown = (dropdown: 'notifications' | 'languages' | 'profile') => {
    setActiveDropdown(prev => prev === dropdown ? null : dropdown);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    setActiveDropdown(null);
  };

  const path = window.location.pathname;
  const isSuperAdmin = user?.roles?.includes('superadmin') || path.startsWith('/superadmin');
  const isMember = user?.roles?.includes('member') || path.startsWith('/member');

  let username = user?.username || 'Guest Admin';
  let role = user?.roles?.[0] || 'Administrator';
  let avatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFGPA223Si-Cy_elNHd-FE4j1iBBiZxHThrXYIY0XyLM0nY7NBHBkIdn_PgaUl7K4rAkZEDe8ky3kwVqAwANgwo8zyBESdgtUYx8za6heDmwU6jKrYkiHfLEEQSF0_DD7d8IWIz-Rb1-7yTLkTNTGK4Es8VHz8H8sXM1NOy423AdmazznBQQjJTe1IQEHKA6c-GhK_R_R5AXYuBXc5NqGqmgE9NZIgMEzclfiUcqQiOZKgql4hWXuwf3twRuPyXoTa_iPEyTWBcySo';

  if (isSuperAdmin) {
    username = 'Admin Rahul';
    role = 'Super Administrator';
    avatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBr30lKaCwJ0DPjLKH0Ho6cwifRvHNfgvTPtZB4m67V5yZXXJ-6xuOgNWQ1no0Nxzk31jnQwXri2c3AFe6wZ_4ga55V3QwyVmCgbyQFrS1kJLQdvniMyrHtDbeKUpg9zQZRuXXAhbC9apP1QoeGF9G_vnvu9P3vgcuL6qneFrsTdcW_0RW5Qk2XmHYJxWBJGLxU1jE16x-ji-avBP5j4u9OijhBvTpSd__Bfrbx5GAiRK_oEbadnqvIOg9EiBnsI_k6MvLQnu6fenHJ';
  } else if (isMember) {
    username = 'Savita Patil';
    role = 'Member #SG4502';
    avatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD5Mx4VxeBAH6M7GHDv93hVb09iAEoxC5knrt13YwTK6b-oXgtDDvrPjBcshsg3uYyFv5WMdbXDBCrrlsMRenSfPyOBQnL9otMRszZ8J2vwzmLt1nKLQLN-4tAZUrppX17SuZ7udNASjgQSnUA6NqRk_3yBtJRFvmikExIbqc-41rHDVQQsgMWfgsKqFXEV_tcIFqlQa16VXsEzo7iUUvzI_aa2GGLajI83pWx5As3Vc_MBAAEL2GRIKM8hcKR90ra5Rpz9OGD_Aai';
  }

  const notificationLink = isSuperAdmin ? '/superadmin/notifications' : '/notifications';

  return (
    <>
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40 bg-transparent" 
          onClick={() => setActiveDropdown(null)}
        />
      )}

      <header className="w-full h-16 bg-white border-b border-[#c6c5d4]/40 shadow-sm flex items-center justify-between px-6 sticky top-0 z-40 shrink-0">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQb0DvB5zO0bR00VGze-cxroJgflWWJ6PPM2yRsmjtoI9_XsXxlzROYaF5FLkTwOjlh7I75jlyuyqq_QtoftQNhkmn7c-HTcnGF2pyeV29kTy7_FLEQzh9igNKjlyBiB0yTlPyff1DgZsAqNCBd-tTZ-nrro8Zc6nM2jtmtEAWEDruoE3xDi15eQNaifaVRdhtxG68NQDDb6aeQE4yr08AOQ1YDYsksOsQ7bbSza9Npw2mVdRskSpA2gv0kSWPjdLKnlCGtYgUhSso" 
              alt="GatMitra Logo" 
              className="h-10 w-auto object-contain"
            />
            {/* Kept text hidden on small screens if logo includes it, but visible otherwise to fulfill 'With Name As GatMitra' */}
            <h1 className="hidden sm:block text-xl font-bold text-[#000666]">GatMitra</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Earth Icon (Languages Dropdown) */}
          <div className="relative z-50">
            <button 
              onClick={() => toggleDropdown('languages')}
              className={`p-2 rounded-full text-[#454652] transition ${activeDropdown === 'languages' ? 'bg-[#eae7ef]' : 'hover:bg-[#eae7ef]'}`}
            >
              <Globe className="h-5 w-5" />
            </button>
            
            {activeDropdown === 'languages' && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-[#c6c5d4]/40 rounded-xl shadow-lg py-2 z-50 animate-fade-in">
                <button 
                  onClick={() => changeLanguage('en')}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-[#f5f2fb] transition-colors ${i18n.language === 'en' ? 'text-[#1a237e] bg-[#1a237e]/10' : 'text-[#454652]'}`}
                >
                  English (EN)
                </button>
                <button 
                  onClick={() => changeLanguage('mr')}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-[#f5f2fb] transition-colors ${i18n.language === 'mr' ? 'text-[#1a237e] bg-[#1a237e]/10' : 'text-[#454652]'}`}
                >
                  मराठी (MR)
                </button>
                <button 
                  onClick={() => changeLanguage('hi')}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-[#f5f2fb] transition-colors ${i18n.language === 'hi' ? 'text-[#1a237e] bg-[#1a237e]/10' : 'text-[#454652]'}`}
                >
                  हिंदी (HI)
                </button>
              </div>
            )}
          </div>

          {/* Notification Bell Icon (Notifications Dropdown) */}
          <div className="relative z-50">
            <button 
              onClick={() => toggleDropdown('notifications')}
              className={`p-2 rounded-full text-[#454652] transition relative ${activeDropdown === 'notifications' ? 'bg-[#eae7ef]' : 'hover:bg-[#eae7ef]'}`}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-white"></span>
            </button>

            {activeDropdown === 'notifications' && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-[#c6c5d4]/40 rounded-xl shadow-lg py-2 z-50 animate-fade-in flex flex-col">
                <div className="px-4 py-2 border-b border-[#c6c5d4]/20 flex justify-between items-center">
                  <span className="font-bold text-xs text-[#000666]">Notifications</span>
                  <span className="px-2 py-0.5 bg-[#ba1a1a]/10 text-[#ba1a1a] text-[9px] font-bold rounded-full">3 New</span>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-[#c6c5d4]/10">
                  <div className="px-4 py-2.5 hover:bg-[#f5f2fb]/40 transition cursor-pointer">
                    <p className="text-xs text-[#1b1b21] font-semibold">
                      {isSuperAdmin ? "Approve 3 New Admins" : "Deposit Received: ₹50,000"}
                    </p>
                    <p className="text-[10px] text-[#454652] mt-0.5">
                      {isSuperAdmin ? "Pune & Nashik divisions await verification." : "Navdurga Group deposited contribution."}
                    </p>
                    <p className="text-[9px] text-gray-400 mt-1">2 mins ago</p>
                  </div>
                  <div className="px-4 py-2.5 hover:bg-[#f5f2fb]/40 transition cursor-pointer">
                    <p className="text-xs text-[#ba1a1a] font-semibold">
                      {isSuperAdmin ? "Resolve 2 System Alerts" : "Loan Overdue Alert"}
                    </p>
                    <p className="text-[10px] text-[#454652] mt-0.5">
                      {isSuperAdmin ? "Unusual withdrawal patterns in Group #SHG-8821." : "Prerna Mahila Gat contribution is past due."}
                    </p>
                    <p className="text-[9px] text-gray-400 mt-1">15 mins ago</p>
                  </div>
                  <div className="px-4 py-2.5 hover:bg-[#f5f2fb]/40 transition cursor-pointer">
                    <p className="text-xs text-[#1b1b21] font-semibold">
                      {isSuperAdmin ? "Review Pending Deactivations" : "New Member Enrolled"}
                    </p>
                    <p className="text-[10px] text-[#454652] mt-0.5">
                      {isSuperAdmin ? "5 groups requested dissolution." : "Savita Gaikwad joined Ekta Mandal."}
                    </p>
                    <p className="text-[9px] text-gray-400 mt-1">1 hour ago</p>
                  </div>
                </div>
                <button 
                  onClick={() => { navigate(notificationLink); setActiveDropdown(null); }}
                  className="w-full text-center py-2.5 text-xs font-bold text-[#000666] border-t border-[#c6c5d4]/20 hover:bg-[#f5f2fb] transition-colors"
                >
                  View All Notifications
                </button>
              </div>
            )}
          </div>

          <div className="h-8 w-px bg-[#c6c5d4]/40 mx-2"></div>
          
          {/* Profile Dropdown */}
          <div className="relative z-50">
            <div 
              onClick={() => toggleDropdown('profile')}
              className={`flex items-center gap-3 cursor-pointer p-1 rounded-full transition group ${activeDropdown === 'profile' ? 'bg-[#f5f2fb]' : 'hover:bg-[#f5f2fb]'}`}
            >
              <img 
                alt="Profile Avatar" 
                className="w-8 h-8 rounded-full object-cover border border-[#c6c5d4]" 
                src={avatar}
              />
              <div className="hidden md:flex flex-col items-start pr-2">
                <span className="text-xs font-bold text-[#000666] leading-tight">{username}</span>
                <span className="text-[10px] text-[#454652] uppercase font-bold">{role}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-[#454652] group-hover:translate-y-0.5 transition-transform" />
            </div>

            {activeDropdown === 'profile' && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-[#c6c5d4]/40 rounded-xl shadow-lg py-2 z-50 animate-fade-in">
                <button 
                  onClick={() => { alert(`Profile Details: ${username}\nRole: ${role}`); setActiveDropdown(null); }}
                  className="w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-[#f5f2fb] transition-colors text-[#454652] flex items-center gap-2"
                >
                  <UserCheck className="h-4 w-4 text-[#1a237e]" />
                  <span>{t('superadmin.profileDetails', 'Profile Details')}</span>
                </button>
                <div className="h-px bg-[#c6c5d4]/20 my-1"></div>
                <button 
                  onClick={() => { logout(); navigate('/login'); }}
                  className="w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-[#ffdad6]/40 transition-colors text-[#ba1a1a] flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{t('superadmin.logout', 'Log out')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
