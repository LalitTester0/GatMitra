import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  FileText,
  Search,
  Bell,
  Settings,
  Download,
  FileDown,
  User,
  Calendar,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Menu,
  LogOut
} from 'lucide-react';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

interface AuditRow {
  id: number;
  date: string;
  time: string;
  userInitial: string;
  userName: string;
  userRole: string;
  action: string;
  ip: string;
  status: 'Success' | 'Failed' | 'Warning';
  severity: 'Low' | 'Med' | 'High';
  userColorClass: string;
  details: any;
}

export const SuperAdminAudits: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [actionFilter, setActionFilter] = useState<string>('All Actions');
  const [severityFilter, setSeverityFilter] = useState<'All' | 'Low' | 'Med' | 'High'>('All');
  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});

  const [auditLogs] = useState<AuditRow[]>([
    {
      id: 1,
      date: 'Oct 24, 2023',
      time: '14:22:15',
      userInitial: 'AS',
      userName: 'Anjali Sharma',
      userRole: 'Super Admin',
      action: 'Updated Interest Rate for Mahila Pragati Group',
      ip: '192.168.1.45',
      status: 'Success',
      severity: 'High',
      userColorClass: 'bg-[#e0e0ff] text-[#000767]',
      details: {
        event_id: 'LOG_89231-X',
        resource: 'INTEREST_RATE_CONFIG',
        previous_value: '12.5%',
        new_value: '11.8%',
        approval_id: 'REQ-772-B',
        browser_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    },
    {
      id: 2,
      date: 'Oct 24, 2023',
      time: '14:15:02',
      userInitial: 'RK',
      userName: 'Rahul Kulkarni',
      userRole: 'Field Officer',
      action: 'Failed login attempt (Incorrect Password)',
      ip: '203.0.113.12',
      status: 'Failed',
      severity: 'High',
      userColorClass: 'bg-[#e4e1ea] text-[#454652]',
      details: {
        event_id: 'LOG_89232-Y',
        resource: 'AUTH_PORTAL',
        reason: 'Invalid Credentials',
        attempt_number: 3,
        browser_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    },
    {
      id: 3,
      date: 'Oct 24, 2023',
      time: '13:50:44',
      userInitial: 'SM',
      userName: 'Sita More',
      userRole: 'Audit Manager',
      action: "New Group 'Navjeevan SHG' Created",
      ip: '192.168.1.122',
      status: 'Success',
      severity: 'Med',
      userColorClass: 'bg-[#ffdbd0] text-[#7b2e12]',
      details: {
        event_id: 'LOG_89233-Z',
        resource: 'SHG_REGISTRY',
        group_id: 'SHG-9921',
        members_count: 12,
        initial_deposit: '₹15,000'
      }
    },
    {
      id: 4,
      date: 'Oct 24, 2023',
      time: '13:42:10',
      userInitial: 'VP',
      userName: 'Vijay Patil',
      userRole: 'Super Admin',
      action: 'System configuration exported to PDF',
      ip: '172.16.0.5',
      status: 'Warning',
      severity: 'Low',
      userColorClass: 'bg-[#a3f69c] text-[#002204]',
      details: {
        event_id: 'LOG_89234-W',
        resource: 'SYS_CONFIG',
        format: 'PDF',
        records_exported: 150,
        destination: 'Local Download'
      }
    }
  ]);

  const toggleDetails = (id: number) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleExportCSV = () => {
    alert('Exporting Audit Logs to CSV...');
  };

  const handleReportPDF = () => {
    alert('Generating Audit Log PDF Report...');
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.userName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.ip.includes(searchQuery);
    
    const matchesAction = actionFilter === 'All Actions' || 
                          (actionFilter === 'Login' && log.action.toLowerCase().includes('login')) ||
                          (actionFilter === 'Group Created' && log.action.toLowerCase().includes('created')) ||
                          (actionFilter === 'Member Added' && log.action.toLowerCase().includes('member')) ||
                          (actionFilter === 'Record Edited' && log.action.toLowerCase().includes('edited'));

    const matchesSeverity = severityFilter === 'All' || log.severity === severityFilter;

    return matchesSearch && matchesAction && matchesSeverity;
  });

  return (
    <div className="bg-[#fbf8ff] min-h-screen text-[#1b1b21] font-sans flex select-none overflow-hidden h-screen w-full">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        
        {/* Top App Bar */}
        <Header />

        {/* Content Canvas */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          <div className="max-w-7xl mx-auto w-full space-y-6">
            
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-[#000666]">Audit Logs</h2>
                <p className="text-sm text-[#454652]">Track system-wide activities, security events, and administrative changes.</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 px-4 h-11 border-2 border-[#000666] text-[#000666] font-semibold text-sm rounded-lg hover:bg-[#000666]/5 transition-colors"
                >
                  <Download className="h-4.5 w-4.5" />
                  <span>Export CSV</span>
                </button>
                <button 
                  onClick={handleReportPDF}
                  className="flex items-center gap-1.5 px-4 h-11 bg-[#000666] text-white font-semibold text-sm rounded-lg hover:shadow-md transition-shadow active:opacity-90"
                >
                  <FileDown className="h-4.5 w-4.5" />
                  <span>Report PDF</span>
                </button>
              </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white rounded-xl shadow-sm p-5 border border-[#c6c5d4]/40">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                {/* User Search */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#454652]">User / Admin</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#454652] h-4.5 w-4.5" />
                    <input 
                      className="w-full pl-9 pr-4 py-2 border-2 border-[#efecf5] rounded-lg focus:border-[#000666] focus:ring-0 transition-colors text-sm" 
                      placeholder="Search by name..." 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Action Type */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#454652]">Action Type</label>
                  <select 
                    className="w-full px-4 py-2 border-2 border-[#efecf5] rounded-lg focus:border-[#000666] focus:ring-0 transition-colors text-sm bg-transparent"
                    value={actionFilter}
                    onChange={(e) => setActionFilter(e.target.value)}
                  >
                    <option>All Actions</option>
                    <option>Login</option>
                    <option>Group Created</option>
                    <option>Member Added</option>
                    <option>Record Edited</option>
                  </select>
                </div>

                {/* Date Range */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#454652]">Date Range</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#454652] h-4.5 w-4.5" />
                    <input 
                      className="w-full pl-9 pr-4 py-2 border-2 border-[#efecf5] rounded-lg focus:border-[#000666] focus:ring-0 transition-colors text-sm" 
                      type="date"
                      defaultValue="2023-10-24"
                    />
                  </div>
                </div>

                {/* Severity */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#454652]">Severity</label>
                  <div className="flex gap-1.5">
                    {(['Low', 'Med', 'High'] as const).map(sev => {
                      const isActive = severityFilter === sev;
                      return (
                        <button
                          key={sev}
                          onClick={() => setSeverityFilter(isActive ? 'All' : sev)}
                          className={`flex-1 py-2 rounded-lg border-2 text-xs font-bold transition-all ${
                            isActive 
                              ? 'border-[#000666] bg-[#bdc2ff] text-[#000767]' 
                              : 'border-[#efecf5] text-[#454652] hover:border-[#000666]'
                          }`}
                        >
                          {sev}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-xl shadow-sm border border-[#c6c5d4]/40 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-[#f5f2fb] border-b border-[#c6c5d4]/30">
                      <th className="px-6 py-4 text-xs font-bold text-[#454652] uppercase tracking-wider">Timestamp</th>
                      <th className="px-6 py-4 text-xs font-bold text-[#454652] uppercase tracking-wider">User</th>
                      <th className="px-6 py-4 text-xs font-bold text-[#454652] uppercase tracking-wider">Action</th>
                      <th className="px-6 py-4 text-xs font-bold text-[#454652] uppercase tracking-wider">IP Address</th>
                      <th className="px-6 py-4 text-xs font-bold text-[#454652] uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-[#454652] uppercase tracking-wider text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c6c5d4]/20">
                    {filteredLogs.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-sm text-[#454652]">
                          No audit logs found matching current filters.
                        </td>
                      </tr>
                    ) : (
                      filteredLogs.map(log => (
                        <React.Fragment key={log.id}>
                          <tr className="hover:bg-[#f5f2fb]/30 transition-colors">
                            <td className="px-6 py-4 text-sm">
                              <div className="flex flex-col">
                                <span className="font-medium text-[#1b1b21]">{log.date}</span>
                                <span className="text-xs text-[#454652]">{log.time}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${log.userColorClass}`}>
                                  {log.userInitial}
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-sm font-semibold text-[#1b1b21]">{log.userName}</span>
                                  <span className="text-xs text-[#454652]">{log.userRole}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-[#1b1b21]">
                              <p className="max-w-xs truncate" title={log.action}>{log.action}</p>
                            </td>
                            <td className="px-6 py-4 text-sm font-mono text-[#454652]">{log.ip}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                                log.status === 'Success' 
                                  ? 'bg-[#a0f399]/30 text-[#1b6d24]' 
                                  : log.status === 'Warning'
                                    ? 'bg-[#ffdbd0] text-[#7b2e12]'
                                    : 'bg-[#ffdad6] text-[#ba1a1a]'
                              }`}>
                                {log.status === 'Success' && <CheckCircle2 className="h-3.5 w-3.5" />}
                                {log.status === 'Warning' && <AlertCircle className="h-3.5 w-3.5" />}
                                {log.status === 'Failed' && <XCircle className="h-3.5 w-3.5" />}
                                <span>{log.status}</span>
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button 
                                onClick={() => toggleDetails(log.id)}
                                className="p-2 text-[#000666] hover:bg-[#000666]/5 rounded-full transition-colors"
                              >
                                <ChevronsUpDown className="h-4.5 w-4.5" />
                              </button>
                            </td>
                          </tr>
                          {expandedRows[log.id] && (
                            <tr className="bg-[#f5f2fb]/20">
                              <td className="px-6 py-4" colSpan={6}>
                                <div className="bg-white border border-[#c6c5d4]/40 rounded-lg p-4 shadow-inner space-y-3">
                                  <div className="flex justify-between items-start">
                                    <h4 className="text-sm font-bold text-[#000666]">Event Metadata</h4>
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                                      log.severity === 'High' 
                                        ? 'bg-[#ffdad6] text-[#ba1a1a]' 
                                        : log.severity === 'Med' 
                                          ? 'bg-[#ffdbd0] text-[#7b2e12]' 
                                          : 'bg-[#e0e0ff] text-[#000767]'
                                    }`}>
                                      {log.severity} Severity
                                    </span>
                                  </div>
                                  <pre className="font-mono text-xs bg-[#efecf5] text-[#1b1b21] p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
                                    {JSON.stringify(log.details, null, 2)}
                                  </pre>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 bg-[#f5f2fb] flex items-center justify-between border-t border-[#c6c5d4]/30">
                <span className="text-xs text-[#454652]">Showing 1-{filteredLogs.length} of {filteredLogs.length} results</span>
                <div className="flex gap-1">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#c6c5d4] text-[#454652] hover:bg-[#eae7ef] transition-colors">
                    <ChevronLeft className="h-4.5 w-4.5" />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#000666] text-white font-bold text-xs">1</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#c6c5d4] text-[#454652] hover:bg-[#eae7ef] transition-colors text-xs font-medium">2</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#c6c5d4] text-[#454652] hover:bg-[#eae7ef] transition-colors">
                    <ChevronRight className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-[#000666] border border-[#c6c5d4]/20">
                <p className="text-xs font-semibold text-[#454652] mb-1">Total Logs (24h)</p>
                <h3 className="text-2xl font-bold text-[#000666]">1,204</h3>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-[#ba1a1a] border border-[#c6c5d4]/20">
                <p className="text-xs font-semibold text-[#454652] mb-1">Security Alerts</p>
                <h3 className="text-2xl font-bold text-[#ba1a1a]">12</h3>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-[#1b6d24] border border-[#c6c5d4]/20">
                <p className="text-xs font-semibold text-[#454652] mb-1">Successful Operations</p>
                <h3 className="text-2xl font-bold text-[#1b6d24]">98.4%</h3>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
};
