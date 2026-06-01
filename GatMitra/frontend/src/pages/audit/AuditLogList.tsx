import React, { useState, useEffect } from 'react';
import { auditApi, AuditLog } from '../../services/api';
import { useTranslation } from 'react-i18next';
import { Server, KeyRound, Activity } from 'lucide-react';

export const AuditLogList: React.FC = () => {
  const { t } = useTranslation();
  
  // Tab Selection: 'activity' or 'login'
  const [activeTab, setActiveTab] = useState<'activity' | 'login'>('activity');
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      if (activeTab === 'activity') {
        const res = await auditApi.getActivityAudits();
        if (res.data.success) {
          setLogs(res.data.data);
        }
      } else {
        const res = await auditApi.getLoginAudits();
        if (res.data.success) {
          setLogs(res.data.data);
        }
      }
    } catch (err) {
      console.error('Failed to load audit logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [activeTab]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">{t('common.audits')}</h1>
          <p className="text-xs text-slate-400 mt-1">
            System administration compliance trail logs, access credentials monitoring, and active mutation logs.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800/80 gap-6">
        <button
          onClick={() => setActiveTab('activity')}
          className={`pb-3 text-sm font-semibold relative transition ${
            activeTab === 'activity' ? 'text-brand-400' : 'text-slate-450 hover:text-slate-200'
          }`}
        >
          {activeTab === 'activity' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full" />
          )}
          <span className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Operational Activity Audits</span>
          </span>
        </button>

        <button
          onClick={() => setActiveTab('login')}
          className={`pb-3 text-sm font-semibold relative transition ${
            activeTab === 'login' ? 'text-brand-400' : 'text-slate-450 hover:text-slate-200'
          }`}
        >
          {activeTab === 'login' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full" />
          )}
          <span className="flex items-center gap-2">
            <KeyRound className="h-4 w-4" />
            <span>Login Access Audits</span>
          </span>
        </button>
      </div>

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-500"></div>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl overflow-hidden border border-white/5">
          <div className="overflow-x-auto">
            {activeTab === 'activity' ? (
              /* Activity log table */
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/60 border-b border-slate-800/80 text-[10px] text-slate-400 uppercase tracking-widest">
                    <th className="px-6 py-4">Operator</th>
                    <th className="px-6 py-4">Action</th>
                    <th className="px-6 py-4">Impacted Entity</th>
                    <th className="px-6 py-4">Audit Details</th>
                    <th className="px-6 py-4">Logged Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-sm">
                  {logs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-slate-500 text-xs">
                        No operational activity logs found.
                      </td>
                    </tr>
                  ) : (
                    logs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-900/10">
                        <td className="px-6 py-4 font-semibold text-slate-250">{log.username}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 bg-slate-900 text-[10px] font-mono border border-slate-850 rounded text-brand-350">
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-400">
                          {log.entityName} <span className="text-[10px] text-slate-550 font-mono">({log.entityId?.substring(0, 8)}...)</span>
                        </td>
                        <td className="px-6 py-4 text-slate-350 text-xs">{log.details}</td>
                        <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                          {log.timestamp?.replace('T', ' ').substring(0, 19)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              /* Login audits table */
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/60 border-b border-slate-800/80 text-[10px] text-slate-400 uppercase tracking-widest">
                    <th className="px-6 py-4">Username</th>
                    <th className="px-6 py-4">Client IP</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Error / Notice details</th>
                    <th className="px-6 py-4">Login Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-sm">
                  {logs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-slate-500 text-xs">
                        No login audit logs found.
                      </td>
                    </tr>
                  ) : (
                    logs.map((log) => {
                      const isSuccess = log.status === 'SUCCESS' || log.status === 'SUCCESS_OTP';
                      return (
                        <tr key={log.id} className="hover:bg-slate-900/10">
                          <td className="px-6 py-4 font-semibold text-slate-250">{log.username}</td>
                          <td className="px-6 py-4 font-mono text-slate-400 text-xs flex items-center gap-1.5">
                            <Server className="h-3.5 w-3.5 text-slate-500" />
                            <span>{log.ipAddress || '0:0:0:0'}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                              isSuccess 
                                ? 'bg-emerald-500/10 text-emerald-400' 
                                : 'bg-red-500/10 text-red-400'
                            }`}>
                              {log.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-400 text-xs">{log.details || '-'}</td>
                          <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                            {log.loginTime?.replace('T', ' ').substring(0, 19)}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
