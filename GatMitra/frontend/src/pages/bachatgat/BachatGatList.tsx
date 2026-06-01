import React, { useState, useEffect } from 'react';
import { bachatGatApi, BachatGatData } from '../../services/api';
import { useTranslation } from 'react-i18next';
import { Plus, Edit, Trash2, Landmark, PlusCircle, Check, X } from 'lucide-react';

export const BachatGatList: React.FC = () => {
  const { t } = useTranslation();
  const [groups, setGroups] = useState<BachatGatData[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [currentId, setCurrentId] = useState<string | null>(null);
  
  // Form fields
  const [name, setName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [establishedDate, setEstablishedDate] = useState('');
  const [monthlySavingsAmount, setMonthlySavingsAmount] = useState<number>(500);
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  
  const [errorMsg, setErrorMsg] = useState('');

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const res = await bachatGatApi.getAll();
      if (res.data.success) {
        setGroups(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching Bachat Gats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const openCreateModal = () => {
    setModalMode('create');
    setCurrentId(null);
    setName('');
    setRegistrationNumber('');
    setEstablishedDate('');
    setMonthlySavingsAmount(500);
    setDescription('');
    setIsActive(true);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const openEditModal = (group: BachatGatData) => {
    setModalMode('edit');
    setCurrentId(group.id || null);
    setName(group.name);
    setRegistrationNumber(group.registrationNumber);
    setEstablishedDate(group.establishedDate || '');
    setMonthlySavingsAmount(group.monthlySavingsAmount);
    setDescription(group.description || '');
    setIsActive(group.isActive !== false);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const payload: BachatGatData = {
      name,
      registrationNumber,
      establishedDate: establishedDate || undefined,
      monthlySavingsAmount: Number(monthlySavingsAmount),
      description,
      isActive
    };

    try {
      if (modalMode === 'create') {
        await bachatGatApi.create(payload);
      } else if (currentId) {
        await bachatGatApi.update(currentId, payload);
      }
      setIsModalOpen(false);
      fetchGroups();
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Transaction failed. Please verify unique fields.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this Bachat Gat record?')) {
      try {
        await bachatGatApi.delete(id);
        fetchGroups();
      } catch (err) {
        console.error('Failed to soft delete Bachat Gat:', err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">{t('bachatgat.list')}</h1>
          <p className="text-xs text-slate-400 mt-1">Manage self-help groups, registration details and savings standards.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl btn-primary-gradient text-xs font-bold text-white shadow-lg"
        >
          <Plus className="h-4 w-4" />
          <span>{t('bachatgat.create')}</span>
        </button>
      </div>

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
                  <th className="px-6 py-4">{t('bachatgat.name')}</th>
                  <th className="px-6 py-4">{t('bachatgat.regNo')}</th>
                  <th className="px-6 py-4">{t('bachatgat.savingsAmount')}</th>
                  <th className="px-6 py-4">{t('bachatgat.established')}</th>
                  <th className="px-6 py-4">{t('common.status')}</th>
                  <th className="px-6 py-4 text-right">{t('common.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-sm">
                {groups.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-slate-500 text-xs">
                      No Bachat Gats registered. Create one to begin.
                    </td>
                  </tr>
                ) : (
                  groups.map((group) => (
                    <tr key={group.id} className="hover:bg-slate-900/20 transition-all">
                      <td className="px-6 py-4 font-semibold text-slate-200">
                        <div className="flex items-center gap-2.5">
                          <Landmark className="h-4 w-4 text-brand-400 shrink-0" />
                          <span>{group.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-450 font-mono text-xs">{group.registrationNumber}</td>
                      <td className="px-6 py-4 font-mono text-slate-300">INR {group.monthlySavingsAmount.toFixed(2)}</td>
                      <td className="px-6 py-4 text-slate-400">{group.establishedDate || '-'}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                          group.isActive !== false
                            ? 'bg-emerald-500/10 text-emerald-400' 
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${group.isActive !== false ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                          {group.isActive !== false ? t('common.active') : t('common.inactive')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(group)}
                            className="p-1.5 bg-slate-805 hover:bg-brand-500/10 text-slate-400 hover:text-brand-300 rounded-lg transition"
                            title="Edit parameters"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => group.id && handleDelete(group.id)}
                            className="p-1.5 bg-slate-805 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-lg transition"
                            title="Soft delete"
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
              <PlusCircle className="h-5 w-5 text-brand-400" />
              <span>{modalMode === 'create' ? t('bachatgat.create') : t('bachatgat.edit')}</span>
            </h3>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-950/40 border border-red-500/30 text-red-300 rounded-xl text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">{t('bachatgat.name')}</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                    placeholder="Enter group name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">{t('bachatgat.regNo')}</label>
                  <input
                    type="text"
                    required
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
                    placeholder="e.g. BG-2023-XXXX"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">{t('bachatgat.savingsAmount')}</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={monthlySavingsAmount}
                    onChange={(e) => setMonthlySavingsAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">{t('bachatgat.established')}</label>
                  <input
                    type="date"
                    value={establishedDate}
                    onChange={(e) => setEstablishedDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm text-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Group Status</label>
                  <div className="flex items-center h-10 mt-1">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-800 text-brand-500 focus:ring-brand-500 h-4.5 w-4.5"
                    />
                    <label htmlFor="isActive" className="ml-2 text-xs text-slate-300 cursor-pointer">
                      Mark as Active Group
                    </label>
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">{t('bachatgat.desc')}</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                    placeholder="Brief description of the Bachat Gat activities..."
                  />
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
