import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Building, 
  Users, 
  ChevronRight, 
  Edit, 
  Info, 
  User, 
  TrendingUp, 
  IndianRupee, 
  Wallet,
  Calendar,
  Clock,
  Phone
} from 'lucide-react';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

export const BachatGatDetails: React.FC = () => {
  const navigate = useNavigate();

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
          <div className="max-w-6xl mx-auto w-full space-y-8">
          
          {/* Hero Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#e0e0ff] flex items-center justify-center text-[#1a237e] shrink-0">
                <Building className="h-10 w-10" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#000666]">Kiran Mahila Bachat Gat</h2>
                  <span className="px-3 py-1 bg-[#a0f399]/40 text-[#217128] rounded-full text-xs font-bold uppercase tracking-wider">Active</span>
                </div>
                <p className="text-sm text-[#454652] mt-1">Registration ID: BG-MH-PUN-2023-0842 • Established Jan 2023</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => navigate('/bachatgat/edit-preview')}
                className="flex items-center gap-2 px-6 py-3 bg-[#000666] text-white rounded-xl font-bold shadow-md hover:bg-[#1a237e] transition active:scale-[0.98] text-sm"
              >
                <Edit className="h-4.5 w-4.5" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          {/* Bento Layout Grid */}
          <div className="grid grid-cols-12 gap-6">
            
            {/* Left Column: Primary Info */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              
              {/* Group Info Card */}
              <div className="bg-white rounded-xl shadow-sm border border-[#c6c5d4]/40 overflow-hidden">
                <div className="px-6 py-4 border-b border-[#eae7ef] bg-[#fbf8ff] flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#1b1b21] flex items-center gap-2 uppercase tracking-wider">
                    <Info className="h-5 w-5 text-[#000666]" />
                    <span>Group Information</span>
                  </h3>
                  <span className="text-[10px] text-[#454652] font-semibold italic">Last updated: 2 days ago</span>
                </div>
                
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-[#454652] block mb-1">Village/Location</label>
                      <p className="text-sm font-medium text-[#1b1b21]">Kothrud, Pune District, Maharashtra</p>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#454652] block mb-1">Bank Branch</label>
                      <p className="text-sm font-medium text-[#1b1b21]">State Bank of India - Kothrud Main</p>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#454652] block mb-1">Meeting Frequency</label>
                      <p className="text-sm font-medium text-[#1b1b21]">Monthly (First Sunday)</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-[#454652] block mb-1">Focus Area</label>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 bg-[#f5f2fb] text-[#454652] border border-[#c6c5d4]/20 rounded text-xs font-semibold">Agriculture</span>
                        <span className="px-2.5 py-1 bg-[#f5f2fb] text-[#454652] border border-[#c6c5d4]/20 rounded text-xs font-semibold">Small Retail</span>
                        <span className="px-2.5 py-1 bg-[#f5f2fb] text-[#454652] border border-[#c6c5d4]/20 rounded text-xs font-semibold">Handicrafts</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#454652] block mb-1">Primary Objective</label>
                      <p className="text-sm text-[#1b1b21] leading-relaxed">
                        Mutual credit for women entrepreneurs in agricultural processing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Information Card */}
              <div className="bg-white rounded-xl shadow-sm border border-[#c6c5d4]/40 overflow-hidden">
                <div className="px-6 py-4 border-b border-[#eae7ef] bg-[#fbf8ff]">
                  <h3 className="text-sm font-bold text-[#1b1b21] flex items-center gap-2 uppercase tracking-wider">
                    <User className="h-5 w-5 text-[#000666]" />
                    <span>Admin Information</span>
                  </h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  <div className="p-4 bg-[#f5f2fb] rounded-lg border border-[#c6c5d4]/20 hover:shadow-sm transition">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#000666] text-white flex items-center justify-center font-bold text-sm">SP</div>
                      <div>
                        <p className="text-xs font-bold text-[#1b1b21]">Sunita Patil</p>
                        <p className="text-[10px] text-[#1b6d24] font-bold">President</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#454652] flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5 text-[#767683]" />
                      <span>+91 98765-43210</span>
                    </p>
                  </div>

                  <div className="p-4 bg-[#f5f2fb] rounded-lg border border-[#c6c5d4]/20 hover:shadow-sm transition">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#ffdbd0] text-[#7b2e12] flex items-center justify-center font-bold text-sm">RK</div>
                      <div>
                        <p className="text-xs font-bold text-[#1b1b21]">Rani Kulkarni</p>
                        <p className="text-[10px] text-[#1b6d24] font-bold">Secretary</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#454652] flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5 text-[#767683]" />
                      <span>+91 98765-43211</span>
                    </p>
                  </div>

                  <div className="p-4 bg-[#f5f2fb] rounded-lg border border-[#c6c5d4]/20 hover:shadow-sm transition">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#a3f69c] text-[#002204] flex items-center justify-center font-bold text-sm">MD</div>
                      <div>
                        <p className="text-xs font-bold text-[#1b1b21]">Meena Deshmukh</p>
                        <p className="text-[10px] text-[#1b6d24] font-bold">Treasurer</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#454652] flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5 text-[#767683]" />
                      <span>+91 98765-43212</span>
                    </p>
                  </div>

                </div>
              </div>

            </div>

            {/* Right Column: Financial Status & Timeline */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              
              {/* Financial Status Summary */}
              <div className="bg-white rounded-xl shadow-sm border border-[#c6c5d4]/40 p-6">
                <h3 className="text-sm font-bold text-[#1b1b21] mb-6 flex items-center gap-2 uppercase tracking-wider">
                  <TrendingUp className="h-5 w-5 text-[#000666]" />
                  <span>Financial Status</span>
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#454652]">Total Members</p>
                      <p className="text-3xl font-extrabold text-[#000666] mt-1">12</p>
                    </div>
                    <div className="w-12 h-12 bg-[#e0e0ff] rounded-full flex items-center justify-center text-[#000666]">
                      <Users className="h-6 w-6" />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-[#eae7ef]">
                    <div className="flex justify-between items-end mb-1.5">
                      <p className="text-xs font-bold text-[#454652]">Group Corpus</p>
                      <p className="text-md font-bold text-[#1b1b21] flex items-center">
                        <IndianRupee className="h-4 w-4 shrink-0" />
                        <span>4,25,000</span>
                      </p>
                    </div>
                    <div className="w-full bg-[#f5f2fb] h-2.5 rounded-full overflow-hidden border border-[#c6c5d4]/20">
                      <div className="bg-[#1b6d24] h-full rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <p className="text-[10px] text-[#454652] mt-2">75% of annual savings goal achieved</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3.5 bg-[#f5f2fb] rounded-lg border border-[#c6c5d4]/10">
                      <p className="text-[10px] font-bold text-[#454652] uppercase tracking-wider">Loans Active</p>
                      <p className="text-md font-bold text-[#1b1b21] mt-1">₹ 1.8L</p>
                    </div>
                    <div className="p-3.5 bg-[#f5f2fb] rounded-lg border border-[#c6c5d4]/10">
                      <p className="text-[10px] font-bold text-[#454652] uppercase tracking-wider">Repayment</p>
                      <p className="text-md font-bold text-[#1b6d24] mt-1">98.2%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activities Timeline */}
              <div className="bg-white rounded-xl shadow-sm border border-[#c6c5d4]/40 overflow-hidden">
                <div className="px-6 py-4 border-b border-[#c6c5d4]/30 bg-[#fbf8ff]">
                  <h3 className="text-sm font-bold text-[#1b1b21] uppercase tracking-wider">Recent Activities</h3>
                </div>
                <div className="p-6">
                  <div className="relative space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#eae7ef]">
                    
                    {/* Activity 1 */}
                    <div className="relative pl-8">
                      <span className="absolute left-0 top-1 w-6 h-6 bg-[#a3f69c] rounded-full flex items-center justify-center text-[#002204] border-4 border-white">
                        <Wallet className="h-3 w-3" />
                      </span>
                      <div>
                        <p className="text-xs font-bold text-[#1b1b21]">Monthly Deposit Collected</p>
                        <p className="text-[11px] text-[#454652] mt-0.5">12 members contributed ₹ 12,000</p>
                        <p className="text-[9px] text-[#454652] mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Oct 05, 2023 • 10:30 AM</span>
                        </p>
                      </div>
                    </div>

                    {/* Activity 2 */}
                    <div className="relative pl-8">
                      <span className="absolute left-0 top-1 w-6 h-6 bg-[#e0e0ff] rounded-full flex items-center justify-center text-[#000666] border-4 border-white">
                        <IndianRupee className="h-3 w-3" />
                      </span>
                      <div>
                        <p className="text-xs font-bold text-[#1b1b21]">Loan Sanctioned</p>
                        <p className="text-[11px] text-[#454652] mt-0.5">₹ 50,000 disbursed to S. Patil for Agribusiness</p>
                        <p className="text-[9px] text-[#454652] mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Sep 28, 2023 • 02:15 PM</span>
                        </p>
                      </div>
                    </div>

                    {/* Activity 3 */}
                    <div className="relative pl-8">
                      <span className="absolute left-0 top-1 w-6 h-6 bg-[#eae7ef] rounded-full flex items-center justify-center text-[#454652] border-4 border-white">
                        <Calendar className="h-3 w-3" />
                      </span>
                      <div>
                        <p className="text-xs font-bold text-[#1b1b21]">Meeting Conducted</p>
                        <p className="text-[11px] text-[#454652] mt-0.5">Regular monthly review meeting completed</p>
                        <p className="text-[9px] text-[#454652] mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Sep 03, 2023 • 04:00 PM</span>
                        </p>
                      </div>
                    </div>

                  </div>
                  <button className="w-full mt-6 py-2 border border-[#c6c5d4] rounded-lg text-xs font-bold hover:bg-[#f5f2fb] transition text-[#000666] uppercase">View All Activities</button>
                </div>
              </div>

            </div>

          </div>

          </div>
        </div>
      </main>
    </div>
  );
};
