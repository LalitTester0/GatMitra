import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { 
  Download, 
  ShieldCheck, 
  Plus, 
  AlertOctagon, 
  UserX, 
  TrendingUp, 
  Calendar,
  Activity,
  IndianRupee,
  Users,
  FileText
} from 'lucide-react';

export const SuperAdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="bg-[#fbf8ff] min-h-screen text-[#1b1b21] font-sans flex overflow-hidden">
      
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        
        {/* Top App Bar */}
        <Header />

        {/* Dashboard Content */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#000666]">{t('superadmin.title', 'System Command Center')}</h1>
              <p className="text-sm text-[#454652]">{t('superadmin.desc', 'Monitoring enterprise-wide Gatmitra performance and security metrics.')}</p>
            </div>
            <div className="flex gap-2">
              <button className="px-5 h-12 bg-white border-2 border-[#000666] text-[#000666] font-bold rounded-xl hover:bg-[#f5f2fb] transition-colors flex items-center gap-2 text-sm">
                <Download className="h-4.5 w-4.5" />
                <span>{t('superadmin.exportReport', 'Export Report')}</span>
              </button>
              <button 
                onClick={() => alert("System status check: ALL GREEN (98.2% health, 0 database locks, 3 warnings resolved)")}
                className="px-5 h-12 bg-[#000666] text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all flex items-center gap-2 text-sm"
              >
                <ShieldCheck className="h-4.5 w-4.5" />
                <span>{t('superadmin.systemHealthCheck', 'System Health Check')}</span>
              </button>
            </div>
          </div>

          {/* Overview Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#c6c5d4]/40 shadow-sm flex flex-col justify-between">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-[#e0e0ff] text-[#1a237e] rounded-lg">
                  <Users className="h-6 w-6" />
                </div>
                <span className="text-[#1b6d24] font-bold text-xs flex items-center gap-0.5">
                  <TrendingUp className="h-3.5 w-3.5" /> +12%
                </span>
              </div>
              <p className="text-[#454652] text-xs font-semibold uppercase tracking-wider">{t('superadmin.totalActiveGroups', 'Total Active Groups')}</p>
              <h2 className="text-3xl font-extrabold text-[#000666] mt-1">2,842</h2>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#c6c5d4]/40 shadow-sm flex flex-col justify-between">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-[#a0f399]/30 text-[#1b6d24] rounded-lg">
                  <IndianRupee className="h-6 w-6" />
                </div>
                <span className="text-[#1b6d24] font-bold text-xs flex items-center gap-0.5">
                  <TrendingUp className="h-3.5 w-3.5" /> +8%
                </span>
              </div>
              <p className="text-[#454652] text-xs font-semibold uppercase tracking-wider">{t('superadmin.totalDeposits', 'Total Deposits')}</p>
              <h2 className="text-3xl font-extrabold text-[#000666] mt-1">₹18.4M</h2>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#c6c5d4]/40 shadow-sm flex flex-col justify-between">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-[#ffdbd0] text-[#7b2e12] rounded-lg">
                  <Calendar className="h-6 w-6" />
                </div>
                <span className="text-[#ba1a1a] font-bold text-xs uppercase">High</span>
              </div>
              <p className="text-[#454652] text-xs font-semibold uppercase tracking-wider">{t('superadmin.pendingApprovals', 'Pending Approvals')}</p>
              <h2 className="text-3xl font-extrabold text-[#000666] mt-1">24</h2>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#c6c5d4]/40 shadow-sm flex flex-col justify-between">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-[#e4e1ea] text-[#000666] rounded-lg">
                  <Activity className="h-6 w-6" />
                </div>
                <div className="w-16 h-2 bg-[#c6c5d4]/40 rounded-full mt-2.5 overflow-hidden">
                  <div className="bg-[#1b6d24] w-[98%] h-full"></div>
                </div>
              </div>
              <p className="text-[#454652] text-xs font-semibold uppercase tracking-wider">{t('superadmin.systemHealth', 'System Health')}</p>
              <h2 className="text-3xl font-extrabold text-[#000666] mt-1">98.2%</h2>
            </div>
          </div>

          {/* Main Bento Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* High-Priority Actions */}
              <div className="bg-white rounded-xl border border-[#c6c5d4]/40 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-[#c6c5d4]/40 flex justify-between items-center bg-[#fbf8ff]">
                  <h3 className="text-md font-bold text-[#000666] flex items-center gap-2">
                    <AlertOctagon className="h-5 w-5 text-[#ba1a1a]" />
                    <span>{t('superadmin.highPriorityActions', 'High-Priority Actions')}</span>
                  </h3>
                  <button className="text-[#000666] font-bold text-xs hover:underline">{t('superadmin.viewAll', 'View All')}</button>
                </div>
                <div className="divide-y divide-[#c6c5d4]/30">
                  <div className="p-6 hover:bg-[#f5f2fb]/40 transition flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#1a237e]/10 text-[#1a237e] flex items-center justify-center">
                        <Plus className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#1b1b21]">Approve 3 New Admins</h4>
                        <p className="text-xs text-[#454652] mt-0.5">Regional administrators for Pune and Nashik divisions await verification.</p>
                      </div>
                    </div>
                    <button className="bg-[#000666] text-white px-4 py-1.5 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition duration-150">Review</button>
                  </div>

                  <div className="p-6 hover:bg-[#f5f2fb]/40 transition flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#ba1a1a]/10 text-[#ba1a1a] flex items-center justify-center">
                        <AlertOctagon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#1b1b21] text-[#ba1a1a]">Resolve 2 System Alerts</h4>
                        <p className="text-xs text-[#454652] mt-0.5">Unusual withdrawal patterns detected in Group ID: #SHG-8821.</p>
                      </div>
                    </div>
                    <button className="bg-[#ba1a1a] text-white px-4 py-1.5 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition duration-150">Investigate</button>
                  </div>

                  <div className="p-6 hover:bg-[#f5f2fb]/40 transition flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#eae7ef] text-[#454652] flex items-center justify-center">
                        <UserX className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#1b1b21]">Review Pending Group Deactivations</h4>
                        <p className="text-xs text-[#454652] mt-0.5">5 groups have requested dissolution following final audit completion.</p>
                      </div>
                    </div>
                    <button className="bg-white border border-[#c6c5d4] text-[#1b1b21] px-4 py-1.5 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition duration-150">Audit</button>
                  </div>
                </div>
              </div>

              {/* Growth trends CSS graph */}
              <div className="bg-white p-6 rounded-xl border border-[#c6c5d4]/40 shadow-sm min-h-[380px] flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-bold text-[#000666] uppercase tracking-wider">{t('superadmin.networkGrowth', 'Network Growth & Financial Overview')}</h3>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-[#e4e1ea] rounded-lg text-xs font-bold text-[#454652]">1W</button>
                    <button className="px-3 py-1 bg-[#000666] text-white rounded-lg text-xs font-bold">1M</button>
                    <button className="px-3 py-1 bg-[#e4e1ea] rounded-lg text-xs font-bold text-[#454652]">1Y</button>
                  </div>
                </div>
                <div className="flex-grow flex items-end gap-4 px-4 pb-8 h-48">
                  <div className="flex-grow bg-[#1a237e]/10 rounded-t-lg relative group h-[40%] cursor-pointer hover:bg-[#1a237e]/20 transition">
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#000666] text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">₹4.2M</div>
                  </div>
                  <div className="flex-grow bg-[#1a237e]/20 rounded-t-lg relative group h-[60%] cursor-pointer hover:bg-[#1a237e]/35 transition">
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#000666] text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">₹6.8M</div>
                  </div>
                  <div className="flex-grow bg-[#1a237e]/10 rounded-t-lg relative group h-[55%] cursor-pointer hover:bg-[#1a237e]/20 transition">
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#000666] text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">₹5.9M</div>
                  </div>
                  <div className="flex-grow bg-[#1a237e]/30 rounded-t-lg relative group h-[80%] cursor-pointer hover:bg-[#1a237e]/45 transition">
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#000666] text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">₹11.2M</div>
                  </div>
                  <div className="flex-grow bg-[#1a237e]/15 rounded-t-lg relative group h-[45%] cursor-pointer hover:bg-[#1a237e]/25 transition">
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#000666] text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">₹7.1M</div>
                  </div>
                  <div className="flex-grow bg-[#000666] rounded-t-lg relative group h-[95%] cursor-pointer">
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#000666] text-white text-[10px] font-bold px-2 py-0.5 rounded transition">₹18.4M</div>
                  </div>
                </div>
                <div className="flex justify-between px-4 text-[11px] text-[#454652] font-semibold border-t border-[#c6c5d4]/10 pt-2">
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* System wide Events feed */}
              <div className="bg-white rounded-xl border border-[#c6c5d4]/40 shadow-sm flex flex-col h-[400px]">
                <div className="p-6 border-b border-[#c6c5d4]/40 bg-[#fbf8ff]">
                  <h3 className="text-sm font-bold text-[#000666] uppercase tracking-wider">{t('superadmin.systemEvents', 'System-wide Events')}</h3>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#a0f399]/30 text-[#1b6d24] flex items-center justify-center shrink-0">
                      <Plus className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-[#1b1b21] leading-relaxed"><span className="font-bold">Admin Priyanka</span> added new group <span className="text-[#000666] font-bold">'Tejaswini SHG'</span></p>
                      <p className="text-[10px] text-[#454652] mt-0.5">2 mins ago • Pune District</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-[#ba1a1a] font-bold">Security Alert: Multiple login failures</p>
                      <p className="text-xs text-[#454652] mt-0.5">IP 192.168.1.45 blocked after 5 unsuccessful attempts.</p>
                      <p className="text-[10px] text-[#454652] mt-0.5">15 mins ago • Global</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1a237e]/10 text-[#1a237e] flex items-center justify-center shrink-0">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-[#1b1b21]"><span className="font-bold">Audit Report</span> compiled for May 2024</p>
                      <p className="text-[10px] text-[#454652] mt-0.5">1 hour ago • System Generated</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#a0f399]/30 text-[#1b6d24] flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-[#1b1b21]"><span className="font-bold">Loan Milestone</span> cleared successfully</p>
                      <p className="text-xs text-[#454652] mt-0.5">Rural Empowerment Gat cleared 100% credit line balance.</p>
                      <p className="text-[10px] text-[#454652] mt-0.5">3 hours ago • Satara District</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Registrations list */}
              <div className="bg-white p-6 rounded-xl border border-[#c6c5d4]/40 shadow-sm">
                <h3 className="text-sm font-bold text-[#000666] mb-4 uppercase tracking-wider">{t('superadmin.recentRegistrations', 'Recent Registrations')}</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#f5f2fb] border border-[#c6c5d4]/20">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#454652] text-white flex items-center justify-center font-bold text-xs">SV</div>
                      <div>
                        <p className="text-xs font-bold text-[#1b1b21]">Savitribai Vikas</p>
                        <p className="text-[9px] text-[#454652]">Registered Today</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-[#a0f399]/30 text-[#1b6d24] text-[9px] font-bold rounded">NEW</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#f5f2fb] border border-[#c6c5d4]/20">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#000666] text-white flex items-center justify-center font-bold text-xs">AM</div>
                      <div>
                        <p className="text-xs font-bold text-[#1b1b21]">Admin Mahesh</p>
                        <p className="text-[9px] text-[#454652]">Verify Pending</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-[#ffdbd0] text-[#7b2e12] text-[9px] font-bold rounded">PENDING</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#f5f2fb] border border-[#c6c5d4]/20">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1b6d24] text-white flex items-center justify-center font-bold text-xs">JS</div>
                      <div>
                        <p className="text-xs font-bold text-[#1b1b21]">Jan Seva Gat</p>
                        <p className="text-[9px] text-[#454652]">Registered Yesterday</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-[#a0f399]/30 text-[#1b6d24] text-[9px] font-bold rounded">NEW</span>
                  </div>
                </div>
                <button className="w-full mt-4 py-2 border border-[#c6c5d4] rounded-lg text-xs font-bold hover:bg-[#f5f2fb] transition text-[#1b1b21] uppercase">{t('superadmin.manageEntities', 'Manage Entities')}</button>
              </div>

            </div>

          </div>

        </div>

      </main>
    </div>
  );
};
