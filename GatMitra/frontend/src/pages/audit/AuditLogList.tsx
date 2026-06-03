import React, { useState } from 'react';
import { 
  Download, 
  Calendar, 
  SlidersHorizontal, 
  UserPlus, 
  FileText, 
  Landmark, 
  LogIn, 
  AlertTriangle, 
  Eye, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';

interface MockAuditLog {
  id: string;
  timestampDate: string;
  timestampTime: string;
  avatarColor: string;
  avatarText: string;
  userName: string;
  userRole: string;
  actionMain: string;
  actionDetailIcon: React.ReactNode;
  actionDetailText: string;
  ipAddress: string;
  status: 'SUCCESS' | 'FAILED';
  severity: 'LOW' | 'HIGH';
}

export const AuditLogList: React.FC = () => {
  
  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'ALL' | 'LOW' | 'HIGH'>('ALL');

  const mockDataList: MockAuditLog[] = [
    {
      id: "1",
      timestampDate: "Oct 27, 2023",
      timestampTime: "14:22:18",
      avatarColor: "bg-[#a0f399]/30 text-[#1b6d24]",
      avatarText: "SM",
      userName: "Sunita More",
      userRole: "GAT HEAD",
      actionMain: "Added",
      actionDetailIcon: <UserPlus className="h-3.5 w-3.5 text-[#00085a]" />,
      actionDetailText: "Member: Laxmi Patil",
      ipAddress: "192.168.1.184",
      status: "SUCCESS",
      severity: "LOW"
    },
    {
      id: "2",
      timestampDate: "Oct 27, 2023",
      timestampTime: "13:45:02",
      avatarColor: "bg-orange-100 text-orange-700",
      avatarText: "RK",
      userName: "Rahul Kulkarni",
      userRole: "FIELD AGENT",
      actionMain: "Updated",
      actionDetailIcon: <FileText className="h-3.5 w-3.5 text-[#00085a]" />,
      actionDetailText: "KYC Documents",
      ipAddress: "45.12.98.221",
      status: "FAILED",
      severity: "HIGH"
    },
    {
      id: "3",
      timestampDate: "Oct 27, 2023",
      timestampTime: "11:10:55",
      avatarColor: "bg-blue-100 text-blue-700",
      avatarText: "JD",
      userName: "Jayashree Deshpande",
      userRole: "SECRETARY",
      actionMain: "Approved",
      actionDetailIcon: <Landmark className="h-3.5 w-3.5 text-[#00085a]" />,
      actionDetailText: "Loan: ₹25,000",
      ipAddress: "182.14.0.8",
      status: "SUCCESS",
      severity: "LOW"
    },
    {
      id: "4",
      timestampDate: "Oct 26, 2023",
      timestampTime: "18:05:40",
      avatarColor: "bg-[#a0f399]/30 text-[#1b6d24]",
      avatarText: "SM",
      userName: "Sunita More",
      userRole: "GAT HEAD",
      actionMain: "System Login",
      actionDetailIcon: <LogIn className="h-3.5 w-3.5 text-[#00085a]" />,
      actionDetailText: "",
      ipAddress: "192.168.1.184",
      status: "SUCCESS",
      severity: "LOW"
    }
  ];

  // Filter logs locally
  const filteredLogs = mockDataList.filter(log => {
    // Filter by Severity
    if (severityFilter !== 'ALL' && log.severity !== severityFilter) {
      return false;
    }
    
    // Filter by search query (dropdown or text input)
    const q = searchQuery.toLowerCase();
    if (q) {
      const matchesName = log.userName.toLowerCase().includes(q);
      const matchesAction = log.actionMain.toLowerCase().includes(q) || log.actionDetailText.toLowerCase().includes(q);
      const matchesIp = log.ipAddress.includes(q);
      if (!matchesName && !matchesAction && !matchesIp) {
        return false;
      }
    }
    return true;
  });

  const handleExportCSV = () => {
    const headers = ['Timestamp', 'User', 'Role', 'Action Main', 'Action Detail', 'IP Address', 'Status'];
    const rows = filteredLogs.map(l => [
      `${l.timestampDate} ${l.timestampTime}`,
      l.userName,
      l.userRole,
      l.actionMain,
      l.actionDetailText,
      l.ipAddress,
      l.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${(val || '').toString().replace(/"/g, '""')}"`).join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `gatmitra_audit_logs.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-md md:gap-gutter">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-2">
        <div>
          <h1 className="text-[26px] font-bold text-[#1b1b21] tracking-tight leading-tight">
            Audit Logs
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed mt-1">
            Monitoring activity across the Khed-Shivapur Region Bachat Gats
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50 bg-white font-bold transition shadow-xs"
        >
          <Download className="h-4 w-4 text-gray-500" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Bento Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-[#e2e2f0] flex flex-col justify-between h-[104px]">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Logs (24H)</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-[#00085a] font-sans">1,284</span>
            <span className="text-xs font-bold text-[#1b6d24] flex items-center gap-0.5">+12%</span>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-[#e2e2f0] flex flex-col justify-between h-[104px]">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Failed Actions</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-[#00085a] font-sans">42</span>
            <span className="text-xs font-bold text-[#ba1a1a]">-4%</span>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-[#e2e2f0] flex flex-col justify-between h-[104px]">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Active Admins</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-[#00085a] font-sans">18</span>
            <span className="text-xs font-semibold text-gray-400">Active Now</span>
          </div>
        </div>
        {/* Card 4 */}
        <div className="bg-[#00085a] text-white p-5 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-[#00085a] flex flex-col justify-between h-[104px] relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-16 h-16 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
          <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider">Health Status</span>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xl font-bold">Secure</span>
            <span className="h-2.5 w-2.5 rounded-full bg-[#a0f399] border-2 border-[#a0f399]/40 shadow-[0_0_10px_#a0f399] animate-pulse"></span>
          </div>
          <p className="text-[10px] text-white/50">Last security scan: 4 mins ago</p>
        </div>
      </div>

      {/* Filter Controls Row */}
      <div className="bg-white p-5 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-[#e2e2f0]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
          {/* Action Type */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Action Type</label>
            <select
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-250 rounded-lg focus:border-[#00085a] focus:ring-0 outline-none bg-white text-[#1b1b21] text-sm font-semibold transition-colors"
            >
              <option value="">All Actions</option>
              <option value="Added">Added Member</option>
              <option value="Updated">Updated KYC</option>
              <option value="Approved">Approved Loan</option>
              <option value="System Login">System Login</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Date Range</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4.5 w-4.5" />
              <input
                type="text"
                readOnly
                value="Oct 20, 2023 - ..."
                className="w-full pl-10 pr-3 py-2 border border-gray-250 rounded-lg focus:border-[#00085a] focus:ring-0 outline-none bg-[#f8f8fd] text-gray-500 text-sm font-semibold cursor-default"
              />
            </div>
          </div>

          {/* Severity Selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Severity</label>
            <div className="flex bg-[#f0f2f5] rounded-lg p-1 border border-gray-200">
              <button
                type="button"
                onClick={() => setSeverityFilter('ALL')}
                className={`flex-1 py-1 px-3 rounded text-xs font-bold transition-all ${
                  severityFilter === 'ALL' ? 'bg-white shadow-xs text-[#00085a]' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setSeverityFilter('LOW')}
                className={`flex-1 py-1 px-3 rounded text-xs font-bold transition-all ${
                  severityFilter === 'LOW' ? 'bg-white shadow-xs text-[#00085a]' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Low
              </button>
              <button
                type="button"
                onClick={() => setSeverityFilter('HIGH')}
                className={`flex-1 py-1 px-3 rounded text-xs font-bold transition-all ${
                  severityFilter === 'HIGH' ? 'bg-white shadow-xs text-[#00085a]' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                High
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="flex items-end">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50 bg-white font-bold transition"
            >
              <SlidersHorizontal className="h-4.5 w-4.5 text-gray-500" />
              <span>Advanced Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Logs Table Card */}
      <div className="bg-white rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-[#e2e2f0] overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-150">
                <th className="px-6 py-4 text-xs font-bold text-gray-500">TIMESTAMP</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500">USER</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500">ACTION PERFORMED</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500">IP ADDRESS</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500">STATUS</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 text-center">DETAILS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-500 text-sm">
                    No logs found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/50 transition-colors group">
                    {/* Timestamp */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col text-left font-medium">
                        <span className="text-xs text-gray-750 font-semibold">{log.timestampDate}</span>
                        <span className="text-[10px] text-gray-400 mt-0.5">{log.timestampTime}</span>
                      </div>
                    </td>

                    {/* User Profile avatar + details */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${log.avatarColor}`}>
                          {log.avatarText}
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-bold text-gray-800 leading-normal">{log.userName}</span>
                          <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider">{log.userRole}</span>
                        </div>
                      </div>
                    </td>

                    {/* Action Performed */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-semibold text-gray-750">{log.actionMain}</span>
                        {log.actionDetailText && (
                          <div className="flex items-center gap-1.5 mt-1 text-[10px] text-gray-450 font-semibold">
                            {log.actionDetailIcon}
                            <span>{log.actionDetailText}</span>
                          </div>
                        )}
                        {!log.actionDetailText && log.actionMain === "System Login" && (
                          <div className="flex items-center gap-1.5 mt-1 text-[10px] text-gray-450 font-semibold">
                            <LogIn className="h-3.5 w-3.5 text-[#00085a]" />
                            <span>System Login</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* IP Address */}
                    <td className="px-6 py-4 font-mono text-xs text-gray-500 font-medium">
                      {log.ipAddress}
                    </td>

                    {/* Status badge */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                        log.status === 'SUCCESS' 
                          ? 'bg-[#a0f399]/30 text-[#1b6d24]' 
                          : 'bg-[#ffdad6] text-[#ba1a1a]'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          log.status === 'SUCCESS' ? 'bg-[#1b6d24]' : 'bg-[#ba1a1a]'
                        }`} />
                        <span>{log.status === 'SUCCESS' ? 'Success' : 'Failed'}</span>
                      </span>
                    </td>

                    {/* View Details Eye action */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <button
                          type="button"
                          className="p-1 hover:bg-gray-100 text-gray-400 hover:text-[#00085a] rounded transition-colors"
                          title="View log details"
                        >
                          <Eye className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Pagination & Summary Row */}
        <div className="px-6 py-4 bg-gray-50/75 border-t border-gray-150 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-gray-505 font-medium">
            Showing 1 to {filteredLogs.length} of 1,284 entries
          </span>
          
          <div className="flex items-center gap-1.5">
            <button className="px-2 py-1.5 border border-gray-250 text-gray-400 rounded-lg text-xs font-semibold hover:bg-white bg-white/50 transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="px-3 py-1.5 bg-[#00085a] text-white rounded-lg text-xs font-bold shadow-sm">
              1
            </button>
            <button className="px-3 py-1.5 border border-gray-250 text-gray-600 rounded-lg text-xs font-semibold hover:bg-white transition-colors bg-white/50">
              2
            </button>
            <button className="px-3 py-1.5 border border-gray-250 text-gray-600 rounded-lg text-xs font-semibold hover:bg-white transition-colors bg-white/50">
              3
            </button>
            <span className="text-xs text-gray-400 px-1">...</span>
            <button className="px-3 py-1.5 border border-gray-250 text-gray-600 rounded-lg text-xs font-semibold hover:bg-white transition-colors bg-white/50">
              129
            </button>
            <button className="px-2 py-1.5 border border-gray-250 text-gray-600 rounded-lg text-xs font-semibold hover:bg-white transition-colors bg-white/50">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Security Attention Required Warning Banner */}
      <div className="bg-[#ba1a1a]/5 border border-[#ba1a1a]/10 rounded-2xl p-5 flex items-start gap-4 mt-2">
        <div className="w-10 h-10 rounded-xl bg-[#ba1a1a]/10 flex items-center justify-center text-[#ba1a1a] shrink-0">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="text-left">
          <h4 className="text-sm font-bold text-[#ba1a1a]">Security Attention Required</h4>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            There were 3 failed login attempts from an unrecognized IP in the last 2 hours. Please verify recent group activities and contact system support if this persists.
          </p>
        </div>
      </div>
    </div>
  );
};
