import React, { useState, useEffect } from 'react';
import { memberApi, bachatGatApi, MemberData, BachatGatData } from '../../services/api';
import { useTranslation } from 'react-i18next';
import { Plus, Edit, Trash2, User, UserPlus, Check, X, ShieldAlert } from 'lucide-react';

export const MemberList: React.FC = () => {
  const { t } = useTranslation();
  const [members, setMembers] = useState<MemberData[]>([]);
  const [groups, setGroups] = useState<BachatGatData[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [currentId, setCurrentId] = useState<string | null>(null);

  // Form Fields
  const [bachatGatId, setBachatGatId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [status, setStatus] = useState('ACTIVE');
  
  const [errorMsg, setErrorMsg] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const memRes = await memberApi.getAll();
      if (memRes.data.success) {
        setMembers(memRes.data.data);
      }

      const bgRes = await bachatGatApi.getAll();
      if (bgRes.data.success) {
        setGroups(bgRes.data.data);
      }
    } catch (err) {
      console.error('Failed to load member directory resources:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setModalMode('create');
    setCurrentId(null);
    setBachatGatId(groups[0]?.id || '');
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setJoinDate(new Date().toISOString().substring(0, 10));
    setStatus('ACTIVE');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const openEditModal = (mem: MemberData) => {
    setModalMode('edit');
    setCurrentId(mem.id || null);
    setBachatGatId(mem.bachatGatId);
    setFirstName(mem.firstName);
    setLastName(mem.lastName);
    setPhoneNumber(mem.phoneNumber);
    setJoinDate(mem.joinDate || '');
    setStatus(mem.status || 'ACTIVE');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const payload: MemberData = {
      bachatGatId,
      firstName,
      lastName,
      phoneNumber,
      joinDate: joinDate || undefined,
      status
    };

    try {
      if (modalMode === 'create') {
        await memberApi.create(payload);
      } else if (currentId) {
        await memberApi.update(currentId, payload);
      }
      setIsModalOpen(false);
      loadData();
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Transaction failed. Please verify input data.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this member profile?')) {
      try {
        await memberApi.delete(id);
        loadData();
      } catch (err) {
        console.error('Failed to remove member profile:', err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">{t('member.list')}</h1>
          <p className="text-xs text-slate-400 mt-1">Enroll members, update contact card registers, and change status parameters.</p>
        </div>
        <button
          onClick={openCreateModal}
          disabled={groups.length === 0}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl btn-primary-gradient text-xs font-bold text-white shadow-lg disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          <span>{t('member.create')}</span>
        </button>
      </div>

      {groups.length === 0 && !loading && (
        <div className="p-4 bg-brand-950/40 border border-brand-850/60 rounded-2xl flex items-center gap-3 text-xs text-brand-300">
          <ShieldAlert className="h-5 w-5 text-brand-400 shrink-0" />
          <span>Please register at least one **Bachat Gat** first before enrolling members.</span>
        </div>
      )}

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-500"></div>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl overflow-hidden border border-white/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/60 border-b border-slate-800/80 text-[10px] text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-4">Full Name</th>
                  <th className="px-6 py-4">{t('member.group')}</th>
                  <th className="px-6 py-4">{t('common.phone')}</th>
                  <th className="px-6 py-4">Enroll Date</th>
                  <th className="px-6 py-4">{t('common.status')}</th>
                  <th className="px-6 py-4 text-right">{t('common.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-sm">
                {members.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-slate-500 text-xs">
                      No members registered in directory. Add one to begin.
                    </td>
                  </tr>
                ) : (
                  members.map((mem) => (
                    <tr key={mem.id} className="hover:bg-slate-900/20 transition-all">
                      <td className="px-6 py-4 font-semibold text-slate-200">
                        <div className="flex items-center gap-2.5">
                          <User className="h-4 w-4 text-cyan-400 shrink-0" />
                          <span>{mem.firstName} {mem.lastName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-350">{mem.bachatGatName || 'Unassigned'}</td>
                      <td className="px-6 py-4 font-mono text-slate-400 text-xs">{mem.phoneNumber}</td>
                      <td className="px-6 py-4 text-slate-400 text-xs">{mem.joinDate || '-'}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                          mem.status === 'ACTIVE'
                            ? 'bg-emerald-500/10 text-emerald-400' 
                            : 'bg-red-500/10 text-red-400'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${mem.status === 'ACTIVE' ? 'bg-emerald-400' : 'bg-red-450'}`} />
                          {mem.status === 'ACTIVE' ? t('common.active') : t('common.inactive')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(mem)}
                            className="p-1.5 bg-slate-805 hover:bg-brand-500/10 text-slate-400 hover:text-brand-300 rounded-lg transition"
                            title="Edit details"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => mem.id && handleDelete(mem.id)}
                            className="p-1.5 bg-slate-805 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-lg transition"
                            title="Remove profile"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Dialog Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="w-full max-w-lg bg-[#0b0f19] border border-slate-800 rounded-2xl shadow-2xl relative z-10 p-6 overflow-hidden">
            <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-brand-400" />
              <span>{modalMode === 'create' ? t('member.create') : t('member.edit')}</span>
            </h3>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-950/40 border border-red-500/30 text-red-300 rounded-xl text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">{t('member.firstName')}</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                    placeholder="Enter first name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">{t('member.lastName')}</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                    placeholder="Enter last name"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">{t('member.group')}</label>
                  <select
                    required
                    value={bachatGatId}
                    onChange={(e) => setBachatGatId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm text-slate-200"
                  >
                    {groups.map((g) => (
                      <option key={g.id} value={g.id} className="bg-[#0b0f19]">
                        {g.name} ({g.registrationNumber})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">{t('common.phone')}</label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
                    placeholder="e.g. +919876543212"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Enrollment Date</label>
                  <input
                    type="date"
                    required
                    value={joinDate}
                    onChange={(e) => setJoinDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm text-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Member Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm text-slate-200"
                  >
                    <option value="ACTIVE" className="bg-[#0b0f19]">Active Status</option>
                    <option value="INACTIVE" className="bg-[#0b0f19]">Inactive Status</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-300 rounded-xl text-xs font-bold transition flex items-center gap-1"
                >
                  <X className="h-3.5 w-3.5" />
                  <span>{t('common.cancel')}</span>
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 btn-primary-gradient text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>{t('common.save')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
