import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Landmark,
  LayoutDashboard,
  Users,
  FileText,
  Search,
  Bell,
  Globe,
  Settings,
  Menu,
  CheckCheck,
  Shield,
  CreditCard,
  RefreshCw,
  TrendingUp,
  ArrowRight,
  Sliders,
  DollarSign,
  MoreVertical
} from 'lucide-react';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

interface NotificationItem {
  id: number;
  category: 'Security' | 'Transaction' | 'Group' | 'System';
  title: string;
  time: string;
  message: string;
  isUnread: boolean;
  borderClass: string;
  bgIconClass: string;
  icon: React.ReactNode;
  actions?: {
    primaryText: string;
    secondaryText?: string;
    onPrimaryClick?: () => void;
  };
  link?: string;
}

export const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Category Filters
  const [selectedCategories, setSelectedCategories] = useState<{ [key: string]: boolean }>({
    Security: true,
    Transaction: true,
    Group: true,
    System: true
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      category: 'Security',
      title: 'Security Alert: New Login',
      time: '2 mins ago',
      message: "A new login was detected from a new Chrome browser on Linux (192.168.1.1). If this wasn't you, please change your password immediately.",
      isUnread: true,
      borderClass: 'border-l-4 border-[#ba1a1a]',
      bgIconClass: 'bg-[#ffdad6] text-[#ba1a1a]',
      icon: <Shield className="h-6 w-6" />,
      actions: {
        primaryText: 'Secure Account',
        secondaryText: 'Ignore',
        onPrimaryClick: () => alert('Securing your account...')
      }
    },
    {
      id: 2,
      category: 'Transaction',
      title: 'Transaction Successful',
      time: '1 hour ago',
      message: "Loan repayment of ₹5,400 from 'Mahila Shakti' group has been credited to the central treasury account.",
      isUnread: false,
      borderClass: 'border border-[#c6c5d4]/40',
      bgIconClass: 'bg-[#a0f399]/30 text-[#1b6d24]',
      icon: <CreditCard className="h-6 w-6" />
    },
    {
      id: 3,
      category: 'Group',
      title: 'New Group Request',
      time: '3 hours ago',
      message: "'Prerna Bachat Gat' has requested to join the platform. 12 members verification pending.",
      isUnread: true,
      borderClass: 'border-l-4 border-[#000666]',
      bgIconClass: 'bg-[#e0e0ff] text-[#000666]',
      icon: <Users className="h-6 w-6" />,
      link: '#'
    },
    {
      id: 4,
      category: 'System',
      title: 'System Maintenance Complete',
      time: 'Yesterday',
      message: 'Scheduled database optimization has been completed. All services are running optimally.',
      isUnread: false,
      borderClass: 'border border-[#c6c5d4]/40',
      bgIconClass: 'bg-[#e4e1ea] text-[#454652]',
      icon: <RefreshCw className="h-6 w-6" />
    },
    {
      id: 5,
      category: 'Transaction',
      title: 'Deposit Threshold Reached',
      time: 'Yesterday',
      message: "Group 'Gram Vikas' has exceeded the monthly savings threshold of ₹50,000. Consider high-yield investment options.",
      isUnread: true,
      borderClass: 'border-l-4 border-[#1b6d24]',
      bgIconClass: 'bg-[#a0f399]/30 text-[#1b6d24]',
      icon: <TrendingUp className="h-6 w-6" />
    }
  ]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => 
      prev.map(item => ({
        ...item,
        isUnread: false,
        borderClass: 'border border-[#c6c5d4]/40'
      }))
    );
  };

  const handleDismiss = (id: number) => {
    setNotifications(prev => prev.filter(item => item.id !== id));
  };

  // Count unread
  const unreadCount = notifications.filter(n => n.isUnread).length;

  // Filter list
  const filteredNotifications = notifications.filter(n => {
    const categoryAllowed = selectedCategories[n.category];
    const textMatches = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        n.message.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryAllowed && textMatches;
  });

  return (
    <div className="flex min-h-screen bg-[#F5F5F5] text-[#1b1b21] font-sans overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <Header />

        {/* Page Canvas */}
        <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full flex-grow overflow-y-auto">
          
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold text-[#1b1b21]">Notifications</h2>
              <p className="text-sm text-[#454652] mt-0.5">Stay updated with the latest activities across your Bachat Gats.</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleMarkAllRead}
                className="flex items-center gap-1.5 px-4 py-2 text-[#000666] border-2 border-[#000666] rounded-lg text-sm font-semibold hover:bg-[#000666] hover:text-white transition-all active:scale-[0.98]"
              >
                <CheckCheck className="h-4.5 w-4.5" />
                <span>Mark all as read</span>
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 bg-[#000666] text-white rounded-lg text-sm font-semibold hover:bg-[#1a237e] transition-all active:scale-[0.98]">
                <Sliders className="h-4.5 w-4.5" />
                <span>Preferences</span>
              </button>
            </div>
          </div>

          {/* Filters & Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Filters Sidebar */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Categories Card */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-[#c6c5d4]/40">
                <h3 className="text-md font-bold text-[#1b1b21] mb-4">Categories</h3>
                <div className="space-y-2">
                  {Object.keys(selectedCategories).map(cat => {
                    let color = 'text-[#000666]';
                    if (cat === 'Security') color = 'text-[#ba1a1a]';
                    if (cat === 'Transaction') color = 'text-[#1b6d24]';
                    if (cat === 'System') color = 'text-[#454652]';

                    return (
                      <label key={cat} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#f5f2fb] cursor-pointer group transition-all">
                        <div className="flex items-center gap-3">
                          <span className={`${color}`}>
                            {cat === 'Security' && <Shield className="h-5 w-5" />}
                            {cat === 'Transaction' && <DollarSign className="h-5 w-5" />}
                            {cat === 'Group' && <Users className="h-5 w-5" />}
                            {cat === 'System' && <Settings className="h-5 w-5" />}
                          </span>
                          <span className="text-sm font-medium">{cat}</span>
                        </div>
                        <input 
                          type="checkbox"
                          checked={selectedCategories[cat]}
                          onChange={() => toggleCategory(cat)}
                          className="rounded border-[#767683] text-[#000666] focus:ring-[#000666] h-5 w-5"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-[#1a237e] text-white p-6 rounded-xl shadow-sm relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-xs font-bold uppercase opacity-85 tracking-wider">Unread Alerts</h4>
                  <div className="text-4xl font-extrabold mt-1">{unreadCount}</div>
                  <p className="text-xs mt-3 opacity-90">Since your last login 2 hours ago.</p>
                </div>
                {/* Background Decoration */}
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              </div>

            </div>

            {/* Notification List */}
            <div className="lg:col-span-9 space-y-3">
              {filteredNotifications.length === 0 ? (
                <div className="bg-white p-8 rounded-xl border border-[#c6c5d4]/40 text-center text-sm text-[#454652]">
                  No notifications found matching your filters.
                </div>
              ) : (
                filteredNotifications.map(item => (
                  <div 
                    key={item.id} 
                    className={`p-5 rounded-xl flex gap-4 relative group hover:shadow-md transition-all ${
                      item.isUnread 
                        ? `${item.borderClass} bg-white shadow-sm` 
                        : 'bg-[#efecf5]/50 border border-[#c6c5d4]/30 opacity-80'
                    }`}
                  >
                    <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center ${item.bgIconClass}`}>
                      {item.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-base text-[#1b1b21] truncate">{item.title}</h4>
                        <span className="text-xs text-[#454652] whitespace-nowrap ml-4">{item.time}</span>
                      </div>
                      <p className="text-sm text-[#454652] leading-relaxed">{item.message}</p>
                      
                      {item.isUnread && (item.actions || item.link) && (
                        <div className="mt-4 flex items-center gap-3">
                          {item.actions && (
                            <>
                              <button 
                                onClick={item.actions.onPrimaryClick}
                                className="px-4 py-1.5 bg-[#ba1a1a] text-white rounded-lg text-xs font-bold hover:bg-[#ba1a1a]/95 transition-all"
                              >
                                {item.actions.primaryText}
                              </button>
                              {item.actions.secondaryText && (
                                <button 
                                  onClick={() => handleDismiss(item.id)}
                                  className="px-4 py-1.5 border border-[#c6c5d4] rounded-lg text-xs font-semibold hover:bg-[#f5f2fb] transition-all"
                                >
                                  {item.actions.secondaryText}
                                </button>
                              )}
                            </>
                          )}
                          {item.link && (
                            <a 
                              href={item.link}
                              onClick={(e) => { e.preventDefault(); navigate('/bachatgat'); }}
                              className="text-[#000666] font-bold text-xs hover:underline flex items-center gap-1"
                            >
                              <span>Review Application</span>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleDismiss(item.id)}
                        className="text-[#454652] hover:text-[#000666] p-1 rounded hover:bg-[#f5f2fb]"
                        title="Dismiss notification"
                      >
                        <MoreVertical className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}

              {/* Load More */}
              <div className="pt-4 flex justify-center">
                <button 
                  onClick={() => alert('Loading previous notifications...')}
                  className="px-6 py-2 text-[#000666] font-bold text-sm hover:bg-[#e0e0ff] rounded-lg transition-colors border border-[#c6c5d4]"
                >
                  Load Previous Notifications
                </button>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Contextual FAB */}
      <button 
        onClick={() => navigate('/superadmin/notifications')}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#000666] text-white rounded-2xl shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50 group"
        title="Broadcast Notification"
      >
        <Bell className="h-6 w-6" />
      </button>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#c6c5d4] flex justify-around items-center h-16 z-50">
        <a 
          href="#"
          onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}
          className="flex flex-col items-center justify-center w-full h-full text-[#454652]"
        >
          <LayoutDashboard className="h-5 w-5" />
          <span className="text-[10px]">Home</span>
        </a>
        <a 
          href="#"
          onClick={(e) => { e.preventDefault(); navigate('/bachatgat'); }}
          className="flex flex-col items-center justify-center w-full h-full text-[#454652]"
        >
          <Users className="h-5 w-5" />
          <span className="text-[10px]">Groups</span>
        </a>
        <a 
          href="#"
          className="flex flex-col items-center justify-center w-full h-full text-[#000666] font-bold"
        >
          <Bell className="h-5 w-5" />
          <span className="text-[10px]">Alerts</span>
        </a>
      </nav>
    </div>
  );
};
