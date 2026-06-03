import React, { useState, useEffect } from 'react';
import { dashboardApi, DashboardStats } from '../../services/api';
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  Activity, 
  Clock, 
  AlertTriangle, 
  UserPlus, 
  Megaphone, 
  TrendingUp, 
  Calendar,
  Landmark,
  MoreVertical,
  Search,
  ListChecks
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsRes = await dashboardApi.getStats();
        if (statsRes.data.success) {
          setStats(statsRes.data.data);
        }
      } catch (err) {
        console.error('Error fetching dashboard summary:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center bg-transparent">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
        <span className="ml-3 text-on-surface-variant font-medium">{t('common.loading')}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-md md:gap-gutter relative">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
        {/* Metric Card 1: Deposits */}
        <div className="bg-white p-6 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-[#e2e2f0] flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-[#00085a]/5 text-[#00085a] flex items-center justify-center">
              <Landmark className="h-5 w-5" />
            </div>
            <span className="bg-green-50 text-green-700 text-[12px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> 12%
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500">Total Deposits</p>
            <p className="text-2xl font-bold text-[#00085a] mt-1">
              ₹{Number(stats?.totalExpectedMonthlySavings || 4520000).toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* Metric Card 2: Active Groups */}
        <div className="bg-white p-6 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-[#e2e2f0] flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
            <span className="bg-purple-50 text-purple-700 text-[12px] font-semibold px-2 py-0.5 rounded-full">
              +5 this week
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500">Active Groups</p>
            <p className="text-2xl font-bold text-[#00085a] mt-1">
              {stats?.totalGroups || 128}
            </p>
          </div>
        </div>

        {/* Metric Card 3: Total Members */}
        <div className="bg-white p-6 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-[#e2e2f0] flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-[#00085a]/5 text-[#00085a] flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
            <span className="bg-gray-100 text-gray-700 text-[12px] font-semibold px-2 py-0.5 rounded-full">
              Registered
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500">Total Members</p>
            <p className="text-2xl font-bold text-[#00085a] mt-1">
              {stats?.totalMembers || 824}
            </p>
          </div>
        </div>

        {/* Metric Card 4: System Users */}
        <div className="bg-white p-6 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-[#e2e2f0] flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">
              <Activity className="h-5 w-5" />
            </div>
            <span className="bg-gray-100 text-gray-700 text-[12px] font-semibold px-2 py-0.5 rounded-full">
              System Wide
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500">System Users</p>
            <p className="text-2xl font-bold text-[#00085a] mt-1">
              {stats?.totalSystemUsers || 12}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-md md:gap-gutter w-full">
        {/* Left Column (2/3 on Large) */}
        <div className="w-full lg:w-2/3 flex flex-col gap-md md:gap-gutter">
          {/* Action Items (Checklist) */}
          <div className="bg-white rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-[#e2e2f0] overflow-hidden">
            <div className="p-5 border-b border-[#e2e2f0] flex justify-between items-center bg-white">
              <h3 className="text-base font-bold text-[#1b1b21] flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-[#00085a]" />
                <span>Action Items</span>
              </h3>
              <span className="bg-[#ba1a1a] text-white text-[12px] font-bold px-2.5 py-0.5 rounded-full">
                3 High Priority
              </span>
            </div>
            <div className="divide-y divide-gray-100">
              {/* Task 1 */}
              <div className="p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:bg-gray-50/50 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-[#e8ebf7] flex items-center justify-center text-[#00085a] shrink-0">
                  <UserPlus className="h-6 w-6" />
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-semibold text-[#1b1b21]">Approve 2 Members for "Savitribai Group"</h4>
                  <p className="text-xs text-gray-500 mt-1">KYC documents verified automatically. Final admin review needed.</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0 shrink-0">
                  <button className="flex-grow sm:flex-none border border-[#00085a] text-[#00085a] hover:bg-[#00085a]/5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors">Review</button>
                  <button className="flex-grow sm:flex-none bg-[#00085a] hover:bg-[#00054d] text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors">Approve</button>
                </div>
              </div>
              {/* Task 2 */}
              <div className="p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:bg-gray-50/50 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-700 shrink-0">
                  <Megaphone className="h-6 w-6" />
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-semibold text-[#1b1b21]">Post Monthly Update to all Gat Leaders</h4>
                  <p className="text-xs text-gray-500 mt-1">Draft is ready. Scheduled for tomorrow at 10:00 AM.</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0 shrink-0">
                  <button className="flex-grow sm:flex-none bg-gray-100 hover:bg-gray-200 text-[#33334d] px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors">Edit Draft</button>
                  <button className="flex-grow sm:flex-none bg-[#00085a] hover:bg-[#00054d] text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors">Publish Now</button>
                </div>
              </div>
              {/* Task 3 */}
              <div className="p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:bg-gray-50/50 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600 shrink-0">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-semibold text-[#1b1b21]">Resolve Disputed Transaction #8821</h4>
                  <p className="text-xs text-gray-500 mt-1">Amount mismatch reported by "Laxmi Bachat Gat".</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0 shrink-0">
                  <button className="w-full sm:w-auto border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors">View Details</button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Registrations Cards */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-base font-bold text-[#1b1b21]">Recent Member Registrations</h3>
              <a className="text-[#00085a] text-xs font-semibold hover:underline" href="/members">View All</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              {/* Card 1 */}
              <div className="bg-white p-5 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-[#e2e2f0] relative overflow-hidden group">
                <button className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:bg-gray-50 transition-colors">
                  <MoreVertical className="h-4.5 w-4.5" />
                </button>
                <div className="flex flex-col items-center text-center gap-2 mt-2">
                  <img 
                    alt="Member Avatar" 
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-gray-50" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdmUG1IBKoVXz2-2sAKXO4fX9MQJqEl2nDRwPnK0bM2n1SWpVeh1Cb-TNYOX-B5TL322lsgSRLzcP1ueWUElg6JwIOER2qgDDegE6lI5Z1fG1-YxWsQ41dJYjk9ULYGKgJoQ_aJjAtbbFs_lr1Lo7BYNWug9Tj1RLjSG1r3K3hYn1eZfFgliqD0Gw6nfw1GmFXW36-me-ODoiK5CNVvH6ygdfff3nXjHYYHS76rBQX6N3ygMAkSnzqF1oIf288Npo9yl_qt-mCvvKI"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#1b1b21]">Radha Patil</h4>
                    <p className="text-xs text-gray-500">Laxmi Group • Joined 2d ago</p>
                  </div>
                  <div className="mt-4 w-full">
                    <div className="flex justify-between text-xs mb-1 font-semibold">
                      <span className="text-gray-500">KYC Status</span>
                      <span className="text-[#1b6d24] font-bold">Verified</span>
                    </div>
                    <div className="w-full bg-green-50 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#1b6d24] h-full w-full rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card 2 */}
              <div className="bg-white p-5 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-[#e2e2f0] relative overflow-hidden group">
                <button className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:bg-gray-50 transition-colors">
                  <MoreVertical className="h-4.5 w-4.5" />
                </button>
                <div className="flex flex-col items-center text-center gap-2 mt-2">
                  <img 
                    alt="Member Avatar" 
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-gray-50" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFGPA223Si-Cy_elNHd-FE4j1iBBiZxHThrXYIY0XyLM0nY7NBHBkIdn_PgaUl7K4rAkZEDe8ky3kwVqAwANgwo8zyBESdgtUYx8za6heDmwU6jKrYkiHfLEEQSF0_DD7d8IWIz-Rb1-7yTLkTNTGK4Es8VHz8H8sXM1NOy423AdmazznBQQjJTe1IQEHKA6c-GhK_R_R5AXYuBXc5NqGqmgE9NZIgMEzclfiUcqQiOZKgql4hWXuwf3twRuPyXoTa_iPEyTWBcySo"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#1b1b21]">Sunita Kale</h4>
                    <p className="text-xs text-gray-500">Savitribai Group • Joined 3d ago</p>
                  </div>
                  <div className="mt-4 w-full">
                    <div className="flex justify-between text-xs mb-1 font-semibold">
                      <span className="text-gray-500">KYC Status</span>
                      <span className="text-gray-500 font-bold">Pending</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gray-400 h-full w-[40%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1/3 on Large) */}
        <div className="w-full lg:w-1/3 flex flex-col gap-md md:gap-gutter">
          {/* Recent Activity Timeline Feed */}
          <div className="bg-white rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-[#e2e2f0] p-6 flex flex-col">
            <h3 className="text-base font-bold text-[#1b1b21] mb-2 flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#00085a]" /> 
              <span>Activity Feed</span>
            </h3>
            
            <div className="relative pl-6 mt-4 border-l border-gray-200 space-y-6 pb-2">
              {/* Activity 1 */}
              <div className="relative">
                <div className="absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#00085a] border-4 border-white shadow-sm"></div>
                <p className="text-[11px] font-semibold text-gray-400 mb-0.5">10 mins ago</p>
                <p className="text-xs text-[#1b1b21] leading-relaxed">
                  Deposit Received: ₹50,000 from <a href="#" className="font-semibold text-[#00085a] hover:underline">Navdurga Group</a>
                </p>
              </div>
              {/* Activity 2 */}
              <div className="relative">
                <div className="absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#1b6d24] border-4 border-white shadow-sm"></div>
                <p className="text-[11px] font-semibold text-gray-400 mb-0.5">2 hours ago</p>
                <p className="text-xs text-[#1b1b21] leading-relaxed">
                  Loan Approved: Application #442 for <span className="font-bold text-[#1b1b21]">Prerna Mahila Gat</span>
                </p>
              </div>
              {/* Activity 3 */}
              <div className="relative">
                <div className="absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full bg-gray-400 border-4 border-white shadow-sm"></div>
                <p className="text-[11px] font-semibold text-gray-400 mb-0.5">Yesterday, 14:30</p>
                <p className="text-xs text-[#1b1b21] leading-relaxed">
                  System Alert: Monthly backup completed successfully.
                </p>
              </div>
            </div>
            
            <button className="mt-4 w-full py-2 text-center text-[#00085a] hover:text-[#00054d] text-xs font-bold transition-colors">
              Load More
            </button>
          </div>

          {/* Upcoming Events Panel */}
          <div className="bg-[#1a237e] text-white rounded-2xl shadow-lg p-5 relative overflow-hidden">
            {/* Background design glow */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
              <Calendar className="h-4.5 w-4.5" />
              <span>Upcoming Events</span>
            </h3>
            <div className="flex flex-col gap-2.5">
              <div className="bg-white/10 p-2.5 rounded-xl flex items-center gap-3 backdrop-blur-sm border border-white/5">
                <div className="bg-white text-[#1a237e] rounded-lg px-1.5 py-1 flex flex-col items-center min-w-[42px] font-bold">
                  <span className="text-[9px] uppercase tracking-wider font-bold">OCT</span>
                  <span className="text-sm leading-none">12</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold">Q3 Review Meeting</h4>
                  <p className="text-[10px] opacity-80 mt-0.5">Online • 14:00 - 15:30</p>
                </div>
              </div>
              <div className="bg-white/10 p-2.5 rounded-xl flex items-center gap-3 backdrop-blur-sm border border-white/5">
                <div className="bg-white text-[#1a237e] rounded-lg px-1.5 py-1 flex flex-col items-center min-w-[42px] font-bold">
                  <span className="text-[9px] uppercase tracking-wider font-bold">OCT</span>
                  <span className="text-sm leading-none">15</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold">Monthly Deposit Deadline</h4>
                  <p className="text-[10px] opacity-80 mt-0.5">System Wide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <button className="w-12 h-12 bg-[#00085a] hover:bg-[#00054d] text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 text-2xl font-light">
          +
        </button>
        <button className="w-12 h-12 bg-white hover:bg-gray-50 text-[#33334d] border border-gray-200 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95">
          <Search className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

