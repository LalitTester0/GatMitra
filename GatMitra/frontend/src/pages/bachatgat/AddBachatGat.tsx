import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { 
  Building, 
  User, 
  Lock, 
  Info, 
  ArrowRight
} from 'lucide-react';

export const AddBachatGat: React.FC = () => {
  const navigate = useNavigate();

  // Form States
  const [groupName, setGroupName] = useState('');
  const [regNo, setRegNo] = useState('');
  const [estDate, setEstDate] = useState('');
  const [address, setAddress] = useState('');
  const [village, setVillage] = useState('');
  const [taluka, setTaluka] = useState('');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');
  const [contribution, setContribution] = useState('');
  const [prefLang, setPrefLang] = useState('marathi');

  // Admin States
  const [adminName, setAdminName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [adminLang, setAdminLang] = useState('marathi');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName || !estDate || !address || !village || !taluka || !district || !pincode || !contribution || !adminName || !mobile || !username) {
      alert("Please fill in all mandatory fields (*) marked with an asterisk.");
      return;
    }
    console.log("Creating Bachat Gat:", {
      groupName, regNo, estDate, address, village, taluka, district, pincode, contribution, prefLang,
      adminName, mobile, email, username, adminLang
    });
    alert("Bachat Gat group created successfully!");
    navigate('/bachatgat');
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
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-[#000666] mb-2">Create New Bachat Gat</h2>
            <p className="text-sm text-[#454652] max-w-2xl">
              Establish a new self-help group and assign an administrator to manage financial contributions, loans, and reports.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Section 1: Bachat Gat Information */}
            <div className="bg-white rounded-xl shadow-sm border border-[#c6c5d4]/40 overflow-hidden">
              <div className="p-6 bg-[#f5f2fb] border-b border-[#c6c5d4]/30 flex items-center gap-4">
                <div className="p-3 bg-[#e0e0ff] text-[#000666] rounded-xl">
                  <Building className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-md font-bold text-[#1b1b21]">Bachat Gat Information</h3>
                  <p className="text-xs text-[#454652]">Core details and geographical location of the group.</p>
                </div>
              </div>

              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#1b1b21]" htmlFor="group_name">Group Name *</label>
                  <input 
                    className="w-full px-4 py-2.5 bg-white border-2 border-[#c6c5d4]/60 rounded-lg focus:border-[#000666] focus:outline-none transition text-sm" 
                    id="group_name" 
                    placeholder="e.g. Mahila Pragati Bachat Gat" 
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    required 
                    type="text" 
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#1b1b21]" htmlFor="reg_no">Registration Number</label>
                  <input 
                    className="w-full px-4 py-2.5 bg-white border-2 border-[#c6c5d4]/60 rounded-lg focus:border-[#000666] focus:outline-none transition text-sm" 
                    id="reg_no" 
                    placeholder="REG-2024-XXXX" 
                    value={regNo}
                    onChange={(e) => setRegNo(e.target.value)}
                    type="text" 
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#1b1b21]" htmlFor="est_date">Establishment Date *</label>
                  <input 
                    className="w-full px-4 py-2.5 bg-white border-2 border-[#c6c5d4]/60 rounded-lg focus:border-[#000666] focus:outline-none transition text-sm cursor-pointer" 
                    id="est_date" 
                    value={estDate}
                    onChange={(e) => setEstDate(e.target.value)}
                    required 
                    type="date" 
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#1b1b21]" htmlFor="address">Full Address *</label>
                  <textarea 
                    className="w-full px-4 py-2.5 bg-white border-2 border-[#c6c5d4]/60 rounded-lg focus:border-[#000666] focus:outline-none transition text-sm resize-none" 
                    id="address" 
                    placeholder="Street, landmark, and building details" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required 
                    rows={2}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#1b1b21]" htmlFor="village">Village / City *</label>
                  <input 
                    className="w-full px-4 py-2.5 bg-white border-2 border-[#c6c5d4]/60 rounded-lg focus:border-[#000666] focus:outline-none transition text-sm" 
                    id="village" 
                    placeholder="Village name" 
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    required 
                    type="text" 
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#1b1b21]" htmlFor="taluka">Taluka *</label>
                  <input 
                    className="w-full px-4 py-2.5 bg-white border-2 border-[#c6c5d4]/60 rounded-lg focus:border-[#000666] focus:outline-none transition text-sm" 
                    id="taluka" 
                    placeholder="Taluka name" 
                    value={taluka}
                    onChange={(e) => setTaluka(e.target.value)}
                    required 
                    type="text" 
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#1b1b21]" htmlFor="district">District *</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-white border-2 border-[#c6c5d4]/60 rounded-lg focus:border-[#000666] focus:outline-none transition text-sm" 
                    id="district" 
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                  >
                    <option value="">Select District</option>
                    <option value="pune">Pune</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="nagpur">Nagpur</option>
                    <option value="nashik">Nashik</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#1b1b21]" htmlFor="state">State *</label>
                  <input 
                    className="w-full px-4 py-2.5 bg-[#efecf5] border-2 border-[#c6c5d4]/60 rounded-lg text-sm font-bold text-[#1b1b21] focus:outline-none" 
                    id="state" 
                    readOnly 
                    type="text" 
                    value="Maharashtra" 
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#1b1b21]" htmlFor="pincode">Pincode *</label>
                  <input 
                    className="w-full px-4 py-2.5 bg-white border-2 border-[#c6c5d4]/60 rounded-lg focus:border-[#000666] focus:outline-none transition text-sm" 
                    id="pincode" 
                    maxLength={6} 
                    placeholder="411001" 
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    required 
                    type="text" 
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#1b1b21]" htmlFor="contribution">Monthly Contribution (₹) *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#767683]">₹</span>
                    <input 
                      className="w-full pl-8 pr-4 py-2.5 bg-white border-2 border-[#c6c5d4]/60 rounded-lg focus:border-[#000666] focus:outline-none transition text-sm font-semibold" 
                      id="contribution" 
                      placeholder="500" 
                      value={contribution}
                      onChange={(e) => setContribution(e.target.value)}
                      required 
                      type="number" 
                    />
                  </div>
                  <p className="mt-1 text-[10px] text-[#454652] italic">Standard per member per month.</p>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#1b1b21]" htmlFor="pref_lang">Preferred Language *</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-white border-2 border-[#c6c5d4]/60 rounded-lg focus:border-[#000666] focus:outline-none transition text-sm" 
                    id="pref_lang" 
                    value={prefLang}
                    onChange={(e) => setPrefLang(e.target.value)}
                    required
                  >
                    <option value="marathi">Marathi</option>
                    <option value="hindi">Hindi</option>
                    <option value="english">English</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Admin Information */}
            <div className="bg-white rounded-xl shadow-sm border border-[#c6c5d4]/40 overflow-hidden">
              <div className="p-6 bg-[#f5f2fb] border-b border-[#c6c5d4]/30 flex items-center gap-4">
                <div className="p-3 bg-[#a0f399]/40 text-[#217128] rounded-xl">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-md font-bold text-[#1b1b21]">Admin Information</h3>
                  <p className="text-xs text-[#454652]">Assign a primary leader for this Bachat Gat.</p>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-[#1b1b21]" htmlFor="admin_name">Full Name *</label>
                      <input 
                        className="w-full px-4 py-2.5 bg-white border-2 border-[#c6c5d4]/60 rounded-lg focus:border-[#000666] focus:outline-none transition text-sm" 
                        id="admin_name" 
                        placeholder="Enter leader's full name" 
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                        required 
                        type="text" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-[#1b1b21]" htmlFor="admin_mobile">Mobile Number *</label>
                        <input 
                          className="w-full px-4 py-2.5 bg-white border-2 border-[#c6c5d4]/60 rounded-lg focus:border-[#000666] focus:outline-none transition text-sm" 
                          id="admin_mobile" 
                          placeholder="98XXXXXXXX" 
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          required 
                          type="tel" 
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-[#1b1b21]" htmlFor="email">Email Address</label>
                        <input 
                          className="w-full px-4 py-2.5 bg-white border-2 border-[#c6c5d4]/60 rounded-lg focus:border-[#000666] focus:outline-none transition text-sm" 
                          id="email" 
                          placeholder="name@email.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="bg-[#efecf5] p-6 rounded-xl space-y-6">
                    <div className="flex items-center gap-2.5">
                      <Lock className="h-5 w-5 text-[#000666]" />
                      <span className="text-xs font-bold text-[#000666] uppercase tracking-wider">System Credentials</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-[#1b1b21]" htmlFor="username">Username *</label>
                      <div className="relative">
                        <input 
                          className="w-full pl-6 pr-4 py-2.5 bg-white border-2 border-[#c6c5d4]/60 rounded-lg focus:border-[#000666] focus:outline-none transition text-sm font-semibold" 
                          id="username" 
                          placeholder="admin_name_01" 
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required 
                          type="text" 
                        />
                      </div>
                      <p className="mt-1 text-[10px] text-[#454652]">Suggested: Initial_Lastname</p>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-[#1b1b21]">Admin Interface Language</label>
                      <div className="flex gap-4 mt-1">
                        <label className="flex-1 cursor-pointer">
                          <input 
                            checked={adminLang === 'marathi'} 
                            className="hidden peer" 
                            name="admin_lang" 
                            type="radio" 
                            value="marathi"
                            onChange={() => setAdminLang('marathi')}
                          />
                          <div className="px-4 py-2.5 text-xs font-bold border-2 border-[#c6c5d4] rounded-lg text-center peer-checked:border-[#000666] peer-checked:bg-[#000666] peer-checked:text-white transition-all">
                            Marathi
                          </div>
                        </label>
                        <label className="flex-1 cursor-pointer">
                          <input 
                            checked={adminLang === 'english'} 
                            className="hidden peer" 
                            name="admin_lang" 
                            type="radio" 
                            value="english"
                            onChange={() => setAdminLang('english')}
                          />
                          <div className="px-4 py-2.5 text-xs font-bold border-2 border-[#c6c5d4] rounded-lg text-center peer-checked:border-[#000666] peer-checked:bg-[#000666] peer-checked:text-white transition-all">
                            English
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Footer Actions */}
            <footer className="fixed bottom-0 left-0 md:left-72 right-0 bg-white border-t border-[#c6c5d4] px-6 py-4 z-40 shadow-lg shrink-0">
              <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="hidden sm:flex items-center gap-2 text-[#454652]">
                  <Info className="h-4.5 w-4.5 text-[#000666]" />
                  <span className="text-xs">Ensure all fields marked with * are completed.</span>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <button 
                    onClick={() => navigate('/bachatgat')}
                    className="flex-grow sm:flex-grow-0 px-8 py-3 rounded-lg border-2 border-[#000666] text-[#000666] font-bold hover:bg-[#f5f2fb] transition text-sm" 
                    type="button"
                  >
                    Cancel
                  </button>
                  <button 
                    className="flex-grow sm:flex-grow-0 px-8 py-3 rounded-lg bg-[#000666] text-white font-bold shadow-md hover:bg-[#1a237e] transition flex items-center justify-center gap-2 text-sm" 
                    type="submit"
                  >
                    <span>Create Bachat Gat</span>
                    <ArrowRight className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            </footer>

          </form>
          </div>
        </div>
      </main>
    </div>
  );
};
