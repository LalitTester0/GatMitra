import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  FileText,
  Search,
  Bell,
  Globe,
  CheckCheck,
  Shield,
  UserCheck,
  RefreshCw,
  TrendingUp,
  Info,
  ChevronDown,
  LogOut,
  DollarSign,
  Menu
} from 'lucide-react';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

interface NotificationItem {
  id: number;
  category: 'Security' | 'System' | 'User Management' | 'Audit';
  title: string;
  time: string;
  message: string;
  isUnread: boolean;
  borderClass: string;
  bgIconClass: string;
  icon: React.ReactNode;
  primaryAction?: {
    text: string;
    onClick: () => void;
  };
  secondaryAction?: {
    text: string;
    onClick: () => void;
  };
}

export const SuperAdminNotifications: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      category: 'Security',
      title: 'Security Alert',
      time: '10 minutes ago',
      message: "Unauthorized login attempt detected from IP 192.168.1.45. Multiple failed attempts recorded for 'SuperAdmin_Main'.",
      isUnread: true,
      borderClass: 'border-l-4 border-[#ba1a1a]',
      bgIconClass: 'bg-[#ffdad6] text-[#ba1a1a]',
      icon: <Shield className="h-6 w-6" />,
      primaryAction: {
        text: 'View Details',
        onClick: () => alert('Viewing security event details...')
      },
      secondaryAction: {
        text: 'Block IP',
        onClick: () => alert('IP address 192.168.1.45 has been blocked.')
      }
    },
    {
      id: 2,
      category: 'User Management',
      title: 'User Management',
      time: '2 hours ago',
      message: '3 new Bachat Gat Admin registrations pending approval from the Satara regional district.',
      isUnread: true,
      borderClass: 'border-l-4 border-[#000666]',
      bgIconClass: 'bg-[#e0e0ff] text-[#000666]',
      icon: <UserCheck className="h-6 w-6" />,
      primaryAction: {
        text: 'Approve All',
        onClick: () => alert('All 3 registrations approved successfully.')
      },
      secondaryAction: {
        text: 'Review Users',
        onClick: () => navigate('/bachatgat')
      }
    },
    {
      id: 3,
      category: 'System',
      title: 'System Update',
      time: '5 hours ago',
      message: 'Database maintenance scheduled for Sunday at 2:00 AM. Expect up to 15 minutes of intermittent service disruption.',
      isUnread: true,
      borderClass: 'border-l-4 border-[#e17c5a]',
      bgIconClass: 'bg-[#ffdbd0] text-[#7b2e12]',
      icon: <RefreshCw className="h-6 w-6" />,
      primaryAction: {
        text: 'Acknowledged',
        onClick: () => handleDismiss(3)
      },
      secondaryAction: {
        text: 'Reschedule',
        onClick: () => alert('Rescheduling feature is disabled. Contact system operators.')
      }
    },
    {
      id: 4,
      category: 'Audit',
      title: 'Audit Report Ready',
      time: 'Yesterday',
      message: 'The consolidated audit report for November 2023 is ready for download. Verification by the Regional Finance Officer is complete.',
      isUnread: false,
      borderClass: 'border-l-4 border-[#1b6d24]',
      bgIconClass: 'bg-[#a0f399]/30 text-[#1b6d24]',
      icon: <TrendingUp className="h-6 w-6" />,
      primaryAction: {
        text: 'Download PDF',
        onClick: () => alert('Downloading PDF Audit Report...')
      },
      secondaryAction: {
        text: 'Dismiss',
        onClick: () => handleDismiss(4)
      }
    },
    {
      id: 5,
      category: 'System',
      title: 'Policy Update',
      time: '2 days ago',
      message: 'Updated terms of service for rural micro-finance partnerships have been applied to all accounts.',
      isUnread: false,
      borderClass: 'border-l-4 border-[#767683]',
      bgIconClass: 'bg-[#e4e1ea] text-[#454652]',
      icon: <Info className="h-6 w-6" />,
      primaryAction: {
        text: 'View Policy',
        onClick: () => alert('Loading Policy documents...')
      }
    }
  ]);

  const handleMarkAllRead = () => {
    setNotifications(prev =>
      prev.map(item => ({
        ...item,
        isUnread: false
      }))
    );
  };

  const handleDismiss = (id: number) => {
    setNotifications(prev => prev.filter(item => item.id !== id));
  };

  const categories = ['All', 'Security', 'System', 'User Management', 'Audit'];

  const filteredNotifications = notifications.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-[#F5F5F5] text-[#1b1b21] font-sans overflow-hidden h-screen w-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        
        {/* Top App Bar */}
        <Header />

        {/* Content Canvas */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          <div className="max-w-7xl mx-auto w-full space-y-6">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-[#000666]">Notifications</h1>
                <p className="text-sm text-[#454652]">Manage and respond to system-wide alerts and updates.</p>
              </div>
              <button 
                onClick={handleMarkAllRead}
                className="flex items-center gap-1.5 text-[#000666] font-bold text-sm hover:underline"
              >
                <CheckCheck className="h-4.5 w-4.5" />
                <span>Mark all as read</span>
              </button>
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
              {categories.map(cat => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                      isActive 
                        ? 'bg-[#000666] text-white' 
                        : 'bg-[#e4e1ea] text-[#454652] hover:bg-[#c6c5d4]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Notification List */}
            <div className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <div className="bg-white p-8 rounded-xl shadow-sm text-center text-sm text-[#454652] border border-[#c6c5d4]/40">
                  No notifications found matching active filters.
                </div>
              ) : (
                filteredNotifications.map(item => (
                  <div 
                    key={item.id} 
                    className={`bg-white rounded-xl p-5 border border-[#c6c5d4]/30 shadow-sm flex gap-4 items-start transition-all hover:translate-x-1 ${
                      !item.isUnread ? 'opacity-70' : ''
                    } ${item.borderClass}`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${item.bgIconClass}`}>
                      {item.icon}
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className={`text-md font-bold ${
                          item.category === 'Security' ? 'text-[#ba1a1a]' : 'text-[#1b1b21]'
                        }`}>
                          {item.title}
                        </h3>
                        <span className="text-xs text-[#454652]">{item.time}</span>
                      </div>
                      
                      <p className="text-sm text-[#1b1b21] mb-4 leading-relaxed">{item.message}</p>
                      
                      {item.isUnread && (item.primaryAction || item.secondaryAction) && (
                        <div className="flex gap-2.5">
                          {item.primaryAction && (
                            <button 
                              onClick={item.primaryAction.onClick}
                              className="px-4 py-1.5 bg-[#000666] text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-all shadow-sm"
                            >
                              {item.primaryAction.text}
                            </button>
                          )}
                          {item.secondaryAction && (
                            <button 
                              onClick={item.secondaryAction.onClick}
                              className="px-4 py-1.5 border-2 border-[#000666] text-[#000666] rounded-lg text-xs font-semibold hover:bg-[#efecf5] transition-all"
                            >
                              {item.secondaryAction.text}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination / Load More */}
            <div className="mt-8 flex justify-center">
              <button 
                onClick={() => alert('Loading older notifications...')}
                className="px-6 py-2.5 border-2 border-[#c6c5d4] text-[#454652] rounded-full text-xs font-bold hover:bg-[#efecf5] transition-all flex items-center gap-1.5"
              >
                <span>Load earlier notifications</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
};
