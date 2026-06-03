import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { 
  Building, 
  User, 
  Lock, 
  Info, 
  ArrowRight,
  Save,
  Ban,
  ChevronRight,
  CheckCircle,
  Key,
  ShieldAlert
} from 'lucide-react';

export const EditBachatGat: React.FC = () => {
  const navigate = useNavigate();

  // Pre-filled mock Form States
  const [groupName, setGroupName] = useState('Mahila Pragati SHG');
  const [regNo, setRegNo] = useState('REG/2023/8921');
  const [estDate, setEstDate] = useState('2023-01-15');
  const [address, setAddress] = useState('12, Main Street, near Panchayat');
  const [village, setVillage] = useState('Shirpur');
  const [taluka, setTaluka] = useState('Shirpur');
  const [district, setDistrict] = useState('Dhule');
  const [pincode, setPincode] = useState('425405');
  const [contribution, setContribution] = useState('500');
  const [prefLang, setPrefLang] = useState('marathi');
  const [status, setStatus] = useState('Active');

  // Admin States
  const [adminName, setAdminName] = useState('Savita Gaikwad');
  const [mobile, setMobile] = useState('+91 9876543210');
  const [email, setEmail] = useState('savita.g@example.com');

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Bachat Gat details updated successfully!");
    navigate('/bachatgat');
  };

  const handleDeactivate = () => {
    const confirm = window.confirm("Are you sure you want to deactivate this Bachat Gat? Members will not be able to login.");
    if (confirm) {
      alert("Bachat Gat Deactivated.");
      navigate('/bachatgat');
    }
  };

  return (
    <div className="bg-[#fbf8ff] min-h-screen text-[#1b1b21] font-sans flex select-none overflow-hidden h-screen w-full">
      
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Wrapper */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        
        {/* TopNavBar */}
        <Header />

        {/* Page Canvas */}
        <div className="overflow-y-auto p-4 md:p-8 lg:p-12 w-full flex-grow pb-24">
          <div className="max-w-6xl mx-auto w-full">
          
          {/* Breadcrumb & Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[#c6c5d4]/20 pb-6">
            <div className="space-y-2">
              <nav className="flex items-center text-[10px] font-semibold text-[#454652] space-x-1.5">
                <span>Bachat Gat Management</span>
                <ChevronRight className="h-3.5 w-3.5 text-[#c6c5d4]" />
                <span>Details</span>
                <ChevronRight className="h-3.5 w-3.5 text-[#c6c5d4]" />
                <span className="text-[#000666] font-bold">Edit</span>
              </nav>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1b1b21]">Edit Bachat Gat</h2>
                <span className="px-3 py-1 bg-[#a0f399]/40 text-[#217128] rounded-full text-xs font-bold flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>Active</span>
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={() => navigate('/bachatgat')}
                className="px-5 py-2.5 border-2 border-[#000666] text-[#000666] font-bold rounded-lg hover:bg-[#f5f2fb] transition text-xs"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdate}
                className="px-5 py-2.5 bg-[#000666] text-white font-bold rounded-lg shadow-sm hover:bg-[#1a237e] transition text-xs flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            
            {/* Section 1: Bachat Gat Information */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              
              {/* Group Core Details card */}
              <section className="bg-white p-6 rounded-xl border border-[#c6c5d4]/40 shadow-sm">
                <div className="flex items-center gap-2 mb-6 border-b border-[#eae7ef] pb-4">
                  <Info className="h-5 w-5 text-[#000666]" />
                  <h3 className="text-sm font-bold text-[#1b1b21] uppercase tracking-wider">Bachat Gat Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#454652]">Group Name</label>
                    <input 
                      className="w-full p-3 border-2 border-[#c6c5d4]/60 rounded-lg text-sm focus:border-[#000666] focus:outline-none transition" 
                      type="text" 
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#454652]">Registration Number</label>
                    <input 
                      className="w-full p-3 border-2 border-[#c6c5d4]/40 rounded-lg bg-[#efecf5] text-sm text-[#454652] font-semibold focus:outline-none cursor-not-allowed" 
                      readOnly 
                      type="text" 
                      value={regNo} 
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#454652]">Establishment Date</label>
                    <div className="relative">
                      <input 
                        className="w-full p-3 border-2 border-[#c6c5d4]/60 rounded-lg text-sm focus:border-[#000666] focus:outline-none transition cursor-pointer" 
                        type="date" 
                        value={estDate}
                        onChange={(e) => setEstDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-2 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#454652]">Full Address</label>
                    <textarea 
                      className="w-full p-3 border-2 border-[#c6c5d4]/60 rounded-lg text-sm focus:border-[#000666] focus:outline-none transition resize-none" 
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#454652]">Village/City</label>
                    <input 
                      className="w-full p-3 border-2 border-[#c6c5d4]/60 rounded-lg text-sm focus:border-[#000666] focus:outline-none transition" 
                      type="text" 
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#454652]">Taluka</label>
                    <input 
                      className="w-full p-3 border-2 border-[#c6c5d4]/60 rounded-lg text-sm focus:border-[#000666] focus:outline-none transition" 
                      type="text" 
                      value={taluka}
                      onChange={(e) => setTaluka(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#454652]">District</label>
                    <select 
                      className="w-full p-3 border-2 border-[#c6c5d4]/60 rounded-lg text-sm focus:border-[#000666] focus:outline-none transition"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    >
                      <option>Pune</option>
                      <option>Mumbai</option>
                      <option>Nashik</option>
                      <option>Nagpur</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#454652]">State</label>
                    <input 
                      className="w-full p-3 border-2 border-[#c6c5d4]/40 rounded-lg bg-[#efecf5] text-sm text-[#454652] font-semibold focus:outline-none cursor-not-allowed" 
                      readOnly 
                      type="text" 
                      value="Maharashtra" 
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#454652]">Pincode</label>
                    <input 
                      className="w-full p-3 border-2 border-[#c6c5d4]/60 rounded-lg text-sm focus:border-[#000666] focus:outline-none transition" 
                      type="text" 
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#454652]">Monthly Contribution</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#767683]">₹</span>
                      <input 
                        className="w-full pl-8 pr-4 p-3 border-2 border-[#c6c5d4]/60 rounded-lg text-sm font-semibold focus:border-[#000666] focus:outline-none transition" 
                        type="number" 
                        value={contribution}
                        onChange={(e) => setContribution(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Admin Information */}
              <section className="bg-white p-6 rounded-xl border border-[#c6c5d4]/40 shadow-sm">
                <div className="flex items-center gap-2 mb-6 border-b border-[#eae7ef] pb-4">
                  <User className="h-5 w-5 text-[#000666]" />
                  <h3 className="text-sm font-bold text-[#1b1b21] uppercase tracking-wider">Admin Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#454652]">Full Name</label>
                    <input 
                      className="w-full p-3 border-2 border-[#c6c5d4]/60 rounded-lg text-sm focus:border-[#000666] focus:outline-none transition" 
                      type="text" 
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#454652]">Mobile Number</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#454652] font-semibold">+91</span>
                      <input 
                        className="w-full pl-12 pr-4 p-3 border-2 border-[#c6c5d4]/60 rounded-lg text-sm focus:border-[#000666] focus:outline-none transition" 
                        type="tel" 
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#454652]">Email Address</label>
                    <input 
                      className="w-full p-3 border-2 border-[#c6c5d4]/60 rounded-lg text-sm focus:border-[#000666] focus:outline-none transition" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#454652]">Preferred Language</label>
                    <select 
                      className="w-full p-3 border-2 border-[#c6c5d4]/60 rounded-lg text-sm focus:border-[#000666] focus:outline-none transition"
                      value={prefLang}
                      onChange={(e) => setPrefLang(e.target.value)}
                    >
                      <option>Marathi</option>
                      <option>English</option>
                      <option>Hindi</option>
                    </select>
                  </div>
                </div>
              </section>

            </div>

            {/* Section 2: Sidebar Stats & Credentials */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              
              <div className="bg-[#1a237e] text-white p-6 rounded-xl shadow-sm relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <Key className="h-28 w-28 rotate-12" />
                </div>
                
                <h3 className="text-sm font-bold mb-6 flex items-center gap-2 uppercase tracking-wider relative z-10">
                  <Lock className="h-4.5 w-4.5" />
                  <span>System Credentials</span>
                </h3>
                
                <div className="space-y-4 relative z-10 text-xs">
                  <div>
                    <p className="opacity-80 uppercase tracking-wider mb-1">Username</p>
                    <p className="text-sm font-bold text-[#bdc2ff]">sunita_patil_01</p>
                  </div>
                  <div className="h-px bg-white/20"></div>
                  <div>
                    <p className="opacity-80 uppercase tracking-wider mb-1">Interface Language</p>
                    <p className="text-sm font-bold">Marathi</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => alert("Password reset link sent to admin's email")}
                    className="w-full py-2 bg-white text-[#1a237e] hover:bg-[#bdc2ff] transition font-bold rounded-lg mt-4 text-xs"
                  >
                    Reset Password
                  </button>
                </div>
              </div>

            </div>

          </div>

          </form>

          {/* Delete / Suspension Action */}
          <div className="p-6 bg-[#ffdad6]/40 border-2 border-dashed border-[#ba1a1a]/30 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h4 className="text-md font-bold text-[#ba1a1a] flex items-center gap-1.5">
                <ShieldAlert className="h-5 w-5" /> Danger Zone
              </h4>
              <p className="text-xs text-[#93000a] mt-1">Deactivating this Bachat Gat will suspend all financial activities immediately.</p>
            </div>
            <button 
              onClick={handleDeactivate}
              className="px-6 py-2 border-2 border-[#ba1a1a] text-[#ba1a1a] font-bold rounded-lg hover:bg-[#ba1a1a] hover:text-white transition text-xs uppercase"
            >
              Deactivate Group
            </button>
          </div>

          </div>
        </div>
      </main>
    </div>
  );
};
