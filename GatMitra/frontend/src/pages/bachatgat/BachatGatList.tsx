import React, { useState, useEffect } from 'react';
import { bachatGatApi, BachatGatData } from '../../services/api';
import { 
  Plus, 
  Download, 
  Calendar, 
  RotateCcw,
  SlidersHorizontal,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  PlusCircle
} from 'lucide-react';

export const BachatGatList: React.FC = () => {
  const [groups, setGroups] = useState<BachatGatData[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [dateFilter, setDateFilter] = useState('');
  
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

  // Helper to map mockup data names to corresponding attributes
  const getGroupMockDetails = (groupName: string, regNo: string) => {
    const nameClean = groupName.toLowerCase();
    if (nameClean.includes("ekta")) {
      return { 
        admin: "Sunita Deshmukh", 
        members: "12", 
        district: "Pune", 
        status: "ACTIVE", 
        date: "12 Oct 2023", 
        avatarColor: "bg-[#a0f399]/30 text-[#1b6d24]", 
        avatarText: "EM" 
      };
    }
    if (nameClean.includes("seva") || nameClean.includes("jai")) {
      return { 
        admin: "Rahul Patil", 
        members: "08", 
        district: "Nagpur", 
        status: "PENDING", 
        date: "05 Nov 2023", 
        avatarColor: "bg-orange-100 text-orange-700", 
        avatarText: "JS" 
      };
    }
    if (nameClean.includes("pragati") || nameClean.includes("sakhi")) {
      return { 
        admin: "Meera Kulkarni", 
        members: "15", 
        district: "Mumbai", 
        status: "DEACTIVATED", 
        date: "28 Aug 2023", 
        avatarColor: "bg-blue-100 text-blue-700", 
        avatarText: "PS" 
      };
    }

    // Dynamic fallback matching layout conventions for newly created records
    const districts = ["Pune", "Nagpur", "Mumbai", "Satara"];
    const admins = ["Asha Patil", "Sunita Kale", "Radha Patil", "Lalita Ashok"];
    const hash = regNo.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const avatarInitials = groupName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || "BG";
    const colors = [
      "bg-[#a0f399]/30 text-[#1b6d24]",
      "bg-orange-100 text-orange-700",
      "bg-blue-100 text-blue-700",
      "bg-purple-100 text-purple-700"
    ];
    return {
      admin: admins[hash % admins.length],
      members: String((hash % 10) + 8).padStart(2, '0'),
      district: districts[hash % districts.length],
      status: "ACTIVE",
      date: "10 Oct 2023",
      avatarColor: colors[hash % colors.length],
      avatarText: avatarInitials
    };
  };

  // Filter groups locally based on search filters
  const filteredGroups = groups.filter(g => {
    const details = getGroupMockDetails(g.name, g.registrationNumber);
    
    // Status Filter
    if (statusFilter !== 'ALL' && details.status !== statusFilter) {
      return false;
    }
    
    // District Filter
    if (districtFilter !== 'ALL' && details.district !== districtFilter) {
      return false;
    }

    // Name or RegNo Search Filter
    const q = searchQuery.toLowerCase();
    if (q) {
      const matchesName = g.name.toLowerCase().includes(q) || details.admin.toLowerCase().includes(q);
      const matchesReg = g.registrationNumber.toLowerCase().includes(q);
      if (!matchesName && !matchesReg) {
        return false;
      }
    }

    return true;
  });

  const activeGroupsCount = groups.filter(g => g.isActive !== false).length;

  const handleExportCSV = () => {
    const headers = ['Group Name', 'Reg. Number', 'Admin Name', 'Members', 'District', 'Status', 'Created Date'];
    const rows = filteredGroups.map(g => {
      const details = getGroupMockDetails(g.name, g.registrationNumber);
      return [
        g.name,
        g.registrationNumber,
        details.admin,
        details.members,
        details.district,
        details.status,
        details.date
      ];
    });

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${(val || '').toString().replace(/"/g, '""')}"`).join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `gatmitra_groups_directory.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-md md:gap-gutter">
      {/* Breadcrumbs and Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-2">
        <div className="text-left">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold mb-1">
            <span className="hover:underline cursor-pointer">Gatmitra</span>
            <span>&gt;</span>
            <span className="text-gray-500">Gatmitra Management</span>
          </nav>
          <h1 className="text-[26px] font-bold text-[#1b1b21] tracking-tight leading-tight">
            Gatmitra Management
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed mt-1">
            Oversee and manage regional self-help groups and their financial compliance.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50 bg-white font-bold transition shadow-xs"
          >
            <Download className="h-4 w-4 text-gray-500" />
            <span>Export</span>
          </button>
          <button
            onClick={openCreateModal}
            className="bg-[#00085a] hover:bg-[#00054d] text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-sm font-semibold active:scale-95 transition-all text-xs"
          >
            <Plus className="h-4 w-4" />
            <span>Add Gatmitra</span>
          </button>
        </div>
      </div>

      {/* Bento Grid & Filters Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-md">
        {/* Total Active Groups Card */}
        <div className="bg-[#1a237e] text-white p-5 rounded-2xl border border-transparent shadow-[0px_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[156px] relative overflow-hidden lg:col-span-1">
          <div className="absolute -right-6 -top-6 w-16 h-16 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <span className="bg-[#a0f399]/20 text-[#a0f399] text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
              +12%
            </span>
          </div>
          <div className="text-left">
            <h3 className="text-[32px] font-extrabold leading-none">{activeGroupsCount || 1248}</h3>
            <p className="text-xs text-white/70 uppercase font-bold tracking-wider mt-1.5">
              Total Active Groups
            </p>
          </div>
        </div>

        {/* Filters Card */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-[#e2e2f0] h-[156px] flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-4">
            {/* District */}
            <div className="text-left">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">District</label>
              <select
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-250 rounded-lg focus:border-[#00085a] focus:ring-0 outline-none bg-white text-[#1b1b21] text-sm font-semibold transition-colors"
              >
                <option value="ALL">All Districts</option>
                <option value="Pune">Pune</option>
                <option value="Nagpur">Nagpur</option>
                <option value="Mumbai">Mumbai</option>
              </select>
            </div>

            {/* Status */}
            <div className="text-left">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Status</label>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 pr-10 py-2 border border-gray-250 rounded-lg focus:border-[#00085a] focus:ring-0 outline-none bg-white text-[#1b1b21] text-sm font-semibold transition-colors appearance-none"
                >
                  <option value="ALL">All Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="PENDING">Pending</option>
                  <option value="DEACTIVATED">Deactivated</option>
                </select>
                <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3">
            {/* Creation Date */}
            <div className="flex-grow">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="dd-mm-yyyy"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-250 rounded-lg focus:border-[#00085a] focus:ring-0 outline-none bg-white text-[#1b1b21] text-sm font-medium transition-colors"
                />
              </div>
            </div>
            {/* Reset Button */}
            <button
              onClick={() => { setDistrictFilter('ALL'); setStatusFilter('ALL'); setDateFilter(''); setSearchQuery(''); }}
              className="p-2.5 border border-gray-250 hover:bg-gray-50 text-gray-600 rounded-lg transition-colors bg-white shrink-0"
              title="Reset filters"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Directory Table Grid Card */}
      {loading ? (
        <div className="flex h-48 items-center justify-center bg-transparent">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-[#e2e2f0] overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/75 border-b border-gray-150">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500">Group Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500">Reg. Number</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500">Admin Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500">Members</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500">District</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500">Created Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredGroups.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-500 text-sm">
                      No groups found matching the parameters.
                    </td>
                  </tr>
                ) : (
                  filteredGroups.map((group) => {
                    const details = getGroupMockDetails(group.name, group.registrationNumber);
                    return (
                      <tr 
                        key={group.id} 
                        onClick={() => openEditModal(group)}
                        className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                      >
                        {/* Group Name + Avatar initials */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${details.avatarColor}`}>
                              {details.avatarText}
                            </div>
                            <span className="font-bold text-gray-800 text-sm">
                              {group.name}
                            </span>
                          </div>
                        </td>

                        {/* Registration Number */}
                        <td className="px-6 py-4 font-mono text-xs text-gray-500 font-semibold">
                          {group.registrationNumber}
                        </td>

                        {/* Admin Name */}
                        <td className="px-6 py-4 text-xs font-bold text-gray-800">
                          {details.admin}
                        </td>

                        {/* Members count pill */}
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center justify-center w-7 h-6 rounded-md bg-gray-100 text-gray-650 text-[11px] font-bold">
                            {details.members}
                          </span>
                        </td>

                        {/* District */}
                        <td className="px-6 py-4 text-xs font-bold text-gray-800">
                          {details.district}
                        </td>

                        {/* Status bullet pill */}
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
                            details.status === 'ACTIVE' 
                              ? 'bg-green-100 text-[#1b6d24]' 
                              : details.status === 'PENDING'
                              ? 'bg-orange-105 text-[#c26210] border border-orange-100'
                              : 'bg-gray-100 text-gray-500'
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${
                              details.status === 'ACTIVE' 
                                ? 'bg-[#1b6d24]' 
                                : details.status === 'PENDING'
                                ? 'bg-[#c26210]'
                                : 'bg-gray-500'
                            }`} />
                            <span>
                              {details.status === 'ACTIVE' 
                                ? 'Active' 
                                : details.status === 'PENDING'
                                ? 'Pending'
                                : 'Deactivated'}
                            </span>
                          </span>
                        </td>

                        {/* Created Date */}
                        <td className="px-6 py-4 text-xs text-gray-500 font-semibold">
                          {details.date}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Bottom Pagination & Summary Row */}
          <div className="px-6 py-4 bg-gray-50/75 border-t border-gray-150 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-gray-500 font-medium">
              Showing 1 to {filteredGroups.length} of 1,248 groups
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
                125
              </button>
              <button className="px-2 py-1.5 border border-gray-250 text-gray-650 rounded-lg text-xs font-semibold hover:bg-white transition-colors bg-white/50">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Dialog Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay backdrop */}
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="w-full max-w-lg bg-white border border-[#e2e2f0] rounded-2xl shadow-xl relative z-10 p-6 overflow-hidden text-left">
            <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
              <PlusCircle className="h-5.5 w-5.5 text-[#00085a]" />
              <span>{modalMode === 'create' ? 'Create Gatmitra' : 'Edit Gatmitra'}</span>
            </h3>

            {errorMsg && (
              <div className="mb-4 p-3 bg-[#ffdad6] border border-[#ba1a1a]/25 text-[#ba1a1a] rounded-lg text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Group Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8f8fd] border border-[#d2d2f2] focus:border-[#00085a] focus:ring-0 rounded-lg text-sm text-[#1b1b21] placeholder-gray-450 outline-none transition-colors"
                    placeholder="Enter group name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Registration Number</label>
                  <input
                    type="text"
                    required
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8f8fd] border border-[#d2d2f2] focus:border-[#00085a] focus:ring-0 rounded-lg text-sm text-[#1b1b21] placeholder-gray-455 font-mono outline-none transition-colors"
                    placeholder="e.g. BG-2023-XXXX"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Monthly Savings Pool (₹)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={monthlySavingsAmount}
                    onChange={(e) => setMonthlySavingsAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#f8f8fd] border border-[#d2d2f2] focus:border-[#00085a] focus:ring-0 rounded-lg text-sm text-[#1b1b21] outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Established Date</label>
                  <input
                    type="date"
                    value={establishedDate}
                    onChange={(e) => setEstablishedDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8f8fd] border border-[#d2d2f2] focus:border-[#00085a] focus:ring-0 rounded-lg text-sm text-[#1b1b21] outline-none transition-colors font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Group Status</label>
                  <div className="flex items-center h-10 mt-1">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="rounded border-gray-300 text-[#00085a] focus:ring-[#00085a] h-4.5 w-4.5 cursor-pointer"
                    />
                    <label htmlFor="isActive" className="ml-2 text-xs text-gray-600 cursor-pointer font-bold select-none">
                      Mark as Active Group
                    </label>
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3.5 py-2.5 bg-[#f8f8fd] border border-[#d2d2f2] focus:border-[#00085a] focus:ring-0 rounded-lg text-sm text-[#1b1b21] outline-none transition-colors resize-none placeholder-gray-450 font-normal"
                    placeholder="Brief description of the Bachat Gat activities..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00085a] hover:bg-[#00054d] text-white rounded-lg text-xs font-bold shadow-sm transition flex items-center gap-1.5"
                >
                  <Check className="h-4 w-4" />
                  <span>Save</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
