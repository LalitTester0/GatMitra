import React, { useState, useEffect } from 'react';
import { memberApi, bachatGatApi, MemberData, BachatGatData } from '../../services/api';
import { 
  Edit, 
  UserPlus, 
  Check, 
  X, 
  Search, 
  ShieldAlert,
  Eye
} from 'lucide-react';

export const MemberList: React.FC = () => {
  const [members, setMembers] = useState<MemberData[]>([]);
  const [groups, setGroups] = useState<BachatGatData[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [genderFilter, setGenderFilter] = useState('ALL');

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
  const [gender, setGender] = useState('Female');
  
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
    setGender('Female');
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
    setGender(mem.gender || 'Female');
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
      status,
      gender
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



  // Helper to map English names to Marathi representation
  const getMarathiName = (englishName: string) => {
    const nameMap: { [key: string]: string } = {
      "Sunita Gaikwad": "सुनीता रमेश गायकवाड",
      "Sunita Ramesh Gaikwad": "सुनीता रमेश गायकवाड",
      "Asha Patil": "आशा दिलीप पाटील",
      "Asha Dilip Patil": "आशा दिलीप पाटील",
      "Meena Shinde": "मीना विठ्ठल शिंदे",
      "Meena Vitthal Shinde": "मीना विठ्ठल शिंदे",
      "Lalita Kale": "ललिता अशोक काळे",
      "Lalita Ashok Kale": "ललिता अशोक काळे",
      "Radha Patil": "राधा पाटील",
      "Sunita Kale": "सुनीता काळे"
    };
    const normalized = englishName.replace(/\s+/g, ' ').trim();
    return nameMap[normalized] || normalized;
  };

  const formatStackedPhone = (phone: string) => {
    const cleaned = phone.replace(/\s+/g, '');
    if (cleaned.length >= 10) {
      const withCountry = cleaned.startsWith('+91') ? cleaned : `+91${cleaned}`;
      return (
        <div className="text-xs text-gray-500 font-medium leading-normal">
          <div>{withCountry.substring(0, 8)}</div>
          <div>{withCountry.substring(8)}</div>
        </div>
      );
    }
    return <div className="text-xs text-gray-500 font-medium">{phone}</div>;
  };

  const formatStackedDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return <div className="text-xs text-gray-500">{dateStr}</div>;
      
      const day = date.getDate();
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      
      return (
        <div className="text-xs text-gray-500 font-medium leading-none text-left">
          <div className="font-semibold text-gray-600">{day} {month}</div>
          <div className="text-[10px] text-gray-400 mt-1">{year}</div>
        </div>
      );
    } catch {
      return <div className="text-xs text-gray-500">{dateStr}</div>;
    }
  };

  // Filtered members list
  const filteredMembers = members.filter(mem => {
    const fullName = `${mem.firstName} ${mem.lastName}`.toLowerCase();
    const phone = mem.phoneNumber.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = fullName.includes(query) || phone.includes(query) || (mem.id && mem.id.toLowerCase().includes(query));

    const matchesStatus = statusFilter === 'ALL' || mem.status === statusFilter;
    const matchesGender = genderFilter === 'ALL' || (mem.gender || 'Female').toUpperCase() === genderFilter.toUpperCase();

    return matchesSearch && matchesStatus && matchesGender;
  });

  const activeMembersCount = members.filter(m => m.status === 'ACTIVE').length;

  return (
    <div className="flex flex-col gap-md md:gap-gutter">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-2">
        <div>
          <h1 className="text-[26px] font-bold text-[#1b1b21] tracking-tight leading-tight">
            Member Management
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed mt-1">
            Manage and audit all members of the Bachat Gat ecosystem.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          disabled={groups.length === 0}
          className="bg-[#00085a] hover:bg-[#00054d] text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-sm font-semibold active:scale-95 transition-all disabled:opacity-50 shrink-0 text-sm"
        >
          <UserPlus className="h-4.5 w-4.5" />
          <span>Add Member</span>
        </button>
      </div>

      {groups.length === 0 && !loading && (
        <div className="p-4 bg-error-container border border-error/20 rounded-xl flex items-center gap-3 text-sm text-error font-medium">
          <ShieldAlert className="h-5 w-5 text-error shrink-0" />
          <span>Please register at least one **Bachat Gat** first before enrolling members.</span>
        </div>
      )}

      {/* Filter Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-md">
        <div className="lg:col-span-3 bg-white p-5 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-[#e2e2f0] flex flex-wrap items-center gap-6">
          {/* Search Box */}
          <div className="flex-grow min-w-[240px]">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Search Member Name or ID</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4.5 w-4.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. GM-2024-001 or Sunita..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-250 rounded-lg focus:border-[#00085a] focus:ring-0 transition-all outline-none bg-[#f8f8fd] text-[#1b1b21] text-sm"
              />
            </div>
          </div>
          {/* Status Dropdown */}
          <div className="min-w-[150px]">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Status Filter</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2.5 border border-gray-250 rounded-lg focus:border-[#00085a] focus:ring-0 outline-none bg-white text-[#1b1b21] text-sm font-semibold"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
          {/* Gender Dropdown */}
          <div className="min-w-[120px]">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Gender</label>
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="w-full p-2.5 border border-gray-250 rounded-lg focus:border-[#00085a] focus:ring-0 outline-none bg-white text-[#1b1b21] text-sm font-semibold"
            >
              <option value="ALL">All</option>
              <option value="FEMALE">Female</option>
              <option value="MALE">Male</option>
            </select>
          </div>
        </div>
        
        {/* Count Card */}
        <div className="bg-[#1a237e] text-white p-5 rounded-2xl border border-transparent shadow-[0px_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-center">
          <p className="text-xs font-semibold text-white/70 uppercase tracking-wider">Total Active Members</p>
          <h3 className="text-2xl font-bold mt-2">{activeMembersCount || 1248}</h3>
        </div>
      </div>

      {loading ? (
        <div className="flex h-48 items-center justify-center bg-transparent">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
        </div>
      ) : (
        /* Members Table Card */
        <div className="bg-white rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-[#e2e2f0] overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/75 border-b border-gray-150">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500">Member ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500">Full Name (मराठी/English)</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500">Mobile Number</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500">Gender</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500">Joining Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredMembers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-500 text-sm">
                      No members registered matching the parameters.
                    </td>
                  </tr>
                ) : (
                  filteredMembers.map((mem) => {
                    const englishName = `${mem.firstName} ${mem.lastName}`;
                    const marathiName = getMarathiName(englishName);
                    return (
                      <tr key={mem.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 py-4 font-mono text-xs text-gray-650 font-semibold">
                          {mem.id ? `GM-2024-${mem.id.substring(mem.id.length - 3)}` : 'GM-PENDING'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col text-left">
                            <span className="font-semibold text-gray-800 text-sm leading-normal">
                              {marathiName}
                            </span>
                            <span className="text-[11px] text-gray-400 font-medium">
                              {englishName}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {formatStackedPhone(mem.phoneNumber)}
                        </td>
                        <td className="px-6 py-4">
                          <span className="border border-gray-200 text-gray-650 bg-gray-50/50 rounded-full px-3 py-1 text-xs font-semibold">
                            {mem.gender || 'Female'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {formatStackedDate(mem.joinDate || new Date().toISOString())}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className={`h-2.5 w-2.5 rounded-full ${
                              mem.status === 'ACTIVE' ? 'bg-[#1b6d24]' : 'bg-[#ba1a1a]'
                            }`} />
                            <span className={`text-xs font-bold ${
                              mem.status === 'ACTIVE' ? 'text-[#1b6d24]' : 'text-[#ba1a1a]'
                            }`}>
                              {mem.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-4">
                            <button
                              onClick={() => openEditModal(mem)}
                              className="p-1 hover:bg-gray-100 text-gray-500 hover:text-[#00085a] rounded transition-colors"
                              title="View details"
                            >
                              <Eye className="h-4.5 w-4.5" />
                            </button>
                            <button
                              onClick={() => openEditModal(mem)}
                              className="p-1 hover:bg-gray-100 text-gray-500 hover:text-[#00085a] rounded transition-colors"
                              title="Edit details"
                            >
                              <Edit className="h-4.5 w-4.5" />
                            </button>
                          </div>
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
              Showing 1 to {filteredMembers.length} of {members.length || 1248} members
            </span>
            
            <div className="flex items-center gap-1.5">
              <button className="px-3 py-1.5 border border-gray-250 text-gray-600 rounded-lg text-xs font-semibold hover:bg-white transition-colors bg-white/50">
                Previous
              </button>
              <button className="px-3.5 py-1.5 bg-[#00085a] text-white rounded-lg text-xs font-bold shadow-sm">
                1
              </button>
              <button className="px-3.5 py-1.5 border border-gray-250 text-gray-600 rounded-lg text-xs font-semibold hover:bg-white transition-colors bg-white/50">
                2
              </button>
              <button className="px-3.5 py-1.5 border border-gray-250 text-gray-600 rounded-lg text-xs font-semibold hover:bg-white transition-colors bg-white/50">
                3
              </button>
              <button className="px-3 py-1.5 border border-gray-250 text-gray-600 rounded-lg text-xs font-semibold hover:bg-white transition-colors bg-white/50">
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Text */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 font-medium mt-4 pb-8">
        <span>* सर्व माहिती 'गटमित्र' प्रणाली द्वारे सुरक्षित करण्यात आली आहे.</span>
        <span>Last updated: 24 Oct 2024, 10:30 AM</span>
      </div>

      {/* Modal Dialog Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay backdrop */}
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="w-full max-w-lg bg-white border border-[#e2e2f0] rounded-2xl shadow-xl relative z-10 p-6 overflow-hidden">
            <h3 className="text-title-md font-title-md text-[#00085a] font-bold mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
              <UserPlus className="h-5.5 w-5.5" />
              <span>{modalMode === 'create' ? 'Add Member' : 'Edit Member'}</span>
            </h3>

            {errorMsg && (
              <div className="mb-4 p-3 bg-error-container border border-error/25 text-error rounded-lg text-label-sm font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8f8fd] border border-[#d2d2f2] focus:border-[#00085a] focus:ring-0 rounded-lg text-sm text-[#1b1b21] placeholder-gray-400/80 font-normal outline-none transition-colors"
                    placeholder="Enter first name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8f8fd] border border-[#d2d2f2] focus:border-[#00085a] focus:ring-0 rounded-lg text-sm text-[#1b1b21] placeholder-gray-400/80 font-normal outline-none transition-colors"
                    placeholder="Enter last name"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Bachat Gat Group</label>
                  <select
                    required
                    value={bachatGatId}
                    onChange={(e) => setBachatGatId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8f8fd] border border-[#d2d2f2] focus:border-[#00085a] focus:ring-0 rounded-lg text-sm text-[#1b1b21] font-semibold outline-none transition-colors"
                  >
                    {groups.map((g) => (
                      <option key={g.id} value={g.id} className="bg-white text-on-surface">
                        {g.name} ({g.registrationNumber})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8f8fd] border border-[#d2d2f2] focus:border-[#00085a] focus:ring-0 rounded-lg text-sm text-[#1b1b21] placeholder-gray-400/80 font-mono outline-none transition-colors"
                    placeholder="e.g. +919876543212"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8f8fd] border border-[#d2d2f2] focus:border-[#00085a] focus:ring-0 rounded-lg text-sm text-[#1b1b21] font-semibold outline-none transition-colors"
                  >
                    <option value="Female" className="bg-white text-on-surface">Female</option>
                    <option value="Male" className="bg-white text-on-surface">Male</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Enrollment Date</label>
                  <input
                    type="date"
                    required
                    value={joinDate}
                    onChange={(e) => setJoinDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8f8fd] border border-[#d2d2f2] focus:border-[#00085a] focus:ring-0 rounded-lg text-sm text-[#1b1b21] font-normal outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Member Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8f8fd] border border-[#d2d2f2] focus:border-[#00085a] focus:ring-0 rounded-lg text-sm text-[#1b1b21] font-semibold outline-none transition-colors"
                  >
                    <option value="ACTIVE" className="bg-white text-on-surface">Active</option>
                    <option value="INACTIVE" className="bg-white text-on-surface">Inactive</option>
                  </select>
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
