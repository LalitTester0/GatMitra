import React, { useState, useEffect } from 'react';
import { dashboardApi, auditApi, DashboardStats, AuditLog } from '../../services/api';
import { useTranslation } from 'react-i18next';
import { 
  BookOpen, 
  Users, 
  IndianRupee, 
  Activity, 
  CheckCircle2, 
  XCircle,
  Clock
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsRes = await dashboardApi.getStats();
        if (statsRes.data.success) {
          setStats(statsRes.data.data);
        }
        
        const auditRes = await auditApi.getActivityAudits();
        if (auditRes.data.success) {
          setActivities(auditRes.data.data.slice(0, 5)); // Show recent 5 audits
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
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-500"></div>
        <span className="ml-3 text-slate-400">{t('common.loading')}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight gradient-text">{t('dashboard.title')}</h1>
          <p className="text-xs text-slate-400 mt-1">{t('dashboard.welcomeAdmin')}</p>
        </div>
      </div>

      {/* Grid count panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel glass-panel-hover p-6 rounded-2xl relative overflow-hidden transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{t('dashboard.groupsCount')}</p>
              <h3 className="text-2xl font-extrabold mt-2 text-slate-100">{stats?.totalGroups || 0}</h3>
            </div>
            <div className="p-3 bg-brand-500/10 rounded-xl text-brand-400 border border-brand-500/20">
              <BookOpen className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 text-[10px] text-brand-400 flex items-center gap-1">
            <span className="font-semibold">+100%</span> active status records
          </div>
        </div>

        <div className="glass-panel glass-panel-hover p-6 rounded-2xl relative overflow-hidden transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{t('dashboard.membersCount')}</p>
              <h3 className="text-2xl font-extrabold mt-2 text-slate-100">{stats?.totalMembers || 0}</h3>
            </div>
            <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 text-[10px] text-cyan-400 flex items-center gap-1">
            <span className="font-semibold">ACTIVE</span> status checks
          </div>
        </div>

        <div className="glass-panel glass-panel-hover p-6 rounded-2xl relative overflow-hidden transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{t('dashboard.savingsSum')}</p>
              <h3 className="text-2xl font-extrabold mt-2 text-slate-100 flex items-center gap-0.5">
                <IndianRupee className="h-5 w-5" />
                {stats?.totalExpectedMonthlySavings || '0.00'}
              </h3>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
              <Landmark className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 text-[10px] text-emerald-400 flex items-center gap-1">
            <span className="font-semibold">Expected</span> monthly ledger sum
          </div>
        </div>

        <div className="glass-panel glass-panel-hover p-6 rounded-2xl relative overflow-hidden transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">System Users</p>
              <h3 className="text-2xl font-extrabold mt-2 text-slate-100">{stats?.totalSystemUsers || 0}</h3>
            </div>
            <div className="p-3 bg-violet-500/10 rounded-xl text-violet-400 border border-violet-500/20">
              <Activity className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 text-[10px] text-violet-400 flex items-center gap-1">
            <span className="font-semibold">Registered</span> profiles
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Login Security Ratios */}
        <div className="glass-panel p-6 rounded-2xl lg:col-span-1 border border-white/5">
          <h3 className="text-sm font-bold text-slate-350 uppercase tracking-wider mb-6 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-brand-400" />
            <span>Login Security Audit Ratios</span>
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 bg-slate-900/40 rounded-xl border border-slate-800/40">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-950/40 text-emerald-400 rounded-lg">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">{t('dashboard.successLogins')}</p>
                  <p className="text-lg font-bold text-slate-200 mt-0.5">{stats?.successfulLoginsCount || 0}</p>
                </div>
              </div>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full font-semibold">Secure</span>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-900/40 rounded-xl border border-slate-800/40">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-950/40 text-red-400 rounded-lg">
                  <XCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">{t('dashboard.failedLogins')}</p>
                  <p className="text-lg font-bold text-slate-200 mt-0.5">{stats?.failedLoginsCount || 0}</p>
                </div>
              </div>
              <span className="text-xs bg-red-500/10 text-red-400 px-2 py-1 rounded-full font-semibold">Blocked</span>
            </div>
          </div>
        </div>

        {/* Activity audit registers */}
        <div className="glass-panel p-6 rounded-2xl lg:col-span-2 border border-white/5">
          <h3 className="text-sm font-bold text-slate-350 uppercase tracking-wider mb-6 flex items-center gap-2">
            <Clock className="h-4 w-4 text-cyan-450" />
            <span>{t('dashboard.recentActivity')}</span>
          </h3>

          <div className="flow-root">
            {activities.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">No recent admin operations logged.</p>
            ) : (
              <ul className="-mb-8">
                {activities.map((act, actIdx) => (
                  <li key={act.id}>
                    <div className="relative pb-8">
                      {actIdx !== activities.length - 1 ? (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-800" aria-hidden="true" />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center ring-8 ring-[#0b0f19]">
                            <Activity className="h-4 w-4 text-brand-400" />
                          </span>
                        </div>
                        <div className="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-xs text-slate-300">
                              <span className="font-semibold text-brand-350">{act.username}</span> performed{' '}
                              <code className="bg-slate-900 border border-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[10px]">
                                {act.action}
                              </code>
                            </p>
                            <p className="text-[10px] text-slate-500 mt-1">{act.details}</p>
                          </div>
                          <div className="text-right text-[10px] whitespace-nowrap text-slate-500">
                            {act.timestamp?.substring(11, 19)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder imported references so compiler is robust
import { ShieldCheck, Landmark } from 'lucide-react';
