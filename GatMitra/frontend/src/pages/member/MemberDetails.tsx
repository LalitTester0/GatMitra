import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { 
  MessageSquare, 
  Edit, 
  CheckCircle, 
  Users, 
  TrendingUp, 
  IndianRupee, 
  Wallet, 
  Plus, 
  Upload, 
  FileText,
  Camera,
  ChevronRight
} from 'lucide-react';

export const MemberDetails: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fbf8ff] min-h-screen text-[#1b1b21] font-sans flex flex-col select-none overflow-x-hidden">
      {/* TopAppBar */}
      {/* TopAppBar */}
      <Header />

      {/* Main Content Canvas */}
      <main className="mt-16 p-4 md:p-12 min-h-[calc(100vh-64px)] flex flex-col gap-6">
        
        {/* Header / Hero Section */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white p-6 rounded-xl shadow-sm border border-[#eae7ef]">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#f5f2fb] shadow-sm flex-shrink-0 relative group">
              <img 
                alt="Profile photo of Sunita Devi" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBcPwN8tNd21AeoYLAhly_zu24SttiOBB0eWGJAte80t2PBVPLQvhqlrkYgj75Lpp5Bj_Knq8qQ0D58kPYm-D8NOJNNCBKIyps4MYR-vp-XwN8NKKdmQ-8ZJPvHwQWhjGR5BPkDIR_oRZEl4jbH236Io3HH_L67XRoqIxpKcg2wOxZyAIk_yoHwxKfVU4u3shw4NB7FQV39uEtc8cxJberZ62QZt1QIAQkJ19KbMHXmdjl1qmeV7_hpmc11EM4qspw2276E81hFrcR"
              />
              <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center cursor-pointer transition-opacity">
                <Camera className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#1b1b21]">Sunita Devi</h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#a0f399]/40 text-[#217128] text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#1b6d24] mr-2"></span> Active Member
                </span>
                <span className="text-sm text-[#454652]">ID: BGF-2023-0892</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-[#000666] text-[#000666] font-semibold hover:bg-[#f5f2fb] transition active:scale-95 text-sm">
              <MessageSquare className="h-4.5 w-4.5" /> 
              <span>Message</span>
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#000666] text-white font-semibold shadow-sm hover:bg-[#1a237e] transition active:scale-95 text-sm">
              <Edit className="h-4.5 w-4.5" /> 
              <span>Update Status</span>
            </button>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Column 1: Core Details */}
          <div className="md:col-span-4 flex flex-col gap-6">
            
            {/* Personal Details */}
            <section className="bg-white rounded-xl p-6 shadow-sm border border-[#eae7ef]">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#eae7ef]">
                <h3 className="font-bold text-sm text-[#1b1b21] uppercase tracking-wider">Personal Details</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-[#454652] mb-1">Phone Number</p>
                  <p className="text-sm font-medium text-[#1b1b21]">+91 98765 43210</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#454652] mb-1">Date of Birth</p>
                  <p className="text-sm font-medium text-[#1b1b21]">14 Aug 1985 (38 yrs)</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#454652] mb-1">Address</p>
                  <p className="text-sm text-[#1b1b21] leading-relaxed">
                    House No. 42, Ward 3<br />Gram Panchayat Shirpur<br />Dist. Dhule, Maharashtra
                  </p>
                </div>
                <div className="pt-4 border-t border-[#eae7ef] flex items-center justify-between">
                  <span className="text-xs text-[#454652]">KYC Status</span>
                  <span className="flex items-center gap-1 text-xs text-[#1b6d24] font-semibold bg-[#a0f399]/20 px-2.5 py-1 rounded-full">
                    <CheckCircle className="h-3.5 w-3.5" /> Verified
                  </span>
                </div>
              </div>
            </section>

            {/* Group Details */}
            <section className="bg-white rounded-xl p-6 shadow-sm border border-[#eae7ef]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-[#1b1b21] uppercase tracking-wider">Group Details</h3>
                <Users className="h-5 w-5 text-[#454652]" />
              </div>
              <div className="bg-[#f5f2fb] p-4 rounded-lg mb-4 flex items-center gap-4 border border-[#c6c5d4]/20">
                <div className="w-12 h-12 rounded-full bg-[#1a237e] text-white flex items-center justify-center font-bold text-lg">
                  LM
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1b1b21]">Lakshmi Mahila Mandal</p>
                  <p className="text-xs text-[#454652]">Joined Mar 2021</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#454652] mb-1">Group Role</p>
                  <p className="text-sm font-semibold text-[#1b1b21]">President</p>
                </div>
                <div>
                  <p className="text-xs text-[#454652] mb-1">Meeting Attendance</p>
                  <p className="text-sm font-semibold text-[#1b6d24]">94% (Last 6 mo)</p>
                </div>
              </div>
            </section>

            {/* Financial Summary */}
            <section className="bg-[#1a237e] text-white rounded-xl p-6 shadow-sm relative overflow-hidden group">
              <h3 className="text-sm font-bold mb-4 opacity-90 uppercase tracking-wider">Financial Overview</h3>
              <div className="flex flex-col gap-4 relative z-10">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-80 mb-1">Total Savings</p>
                    <p className="text-2xl font-bold flex items-center">
                      <IndianRupee className="h-5.5 w-5.5 shrink-0" />
                      <span>12,450</span>
                    </p>
                  </div>
                  <Wallet className="h-10 w-10 opacity-30" />
                </div>
                <div className="h-px bg-white/20 w-full"></div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-80 mb-1">Active Loan Balance</p>
                    <p className="text-md font-semibold flex items-center">
                      <IndianRupee className="h-4.5 w-4.5 shrink-0" />
                      <span>45,000</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-80 mb-1">Next EMI</p>
                    <p className="text-xs font-bold text-[#8690ee]">5th Nov</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#8690ee]/15 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
            </section>

          </div>

          {/* Column 2: Deep Dives */}
          <div className="md:col-span-8 flex flex-col gap-6">
            
            {/* Timeline */}
            <section className="bg-white rounded-xl p-6 shadow-sm border border-[#eae7ef]">
              <div className="flex justify-between items-start mb-6 pb-4 border-b border-[#eae7ef]">
                <div>
                  <h3 className="font-bold text-sm text-[#000666] uppercase tracking-wider">Activity Timeline</h3>
                  <p className="text-xs text-[#454652] mt-1">Recent transactions and group engagements</p>
                </div>
                <button className="text-xs font-semibold text-[#000666] hover:underline flex items-center gap-0.5">
                  <span>View All</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="relative pl-6">
                {/* Vertical line */}
                <div className="absolute left-[11px] top-2 bottom-0 w-[2px] bg-[#eae7ef]"></div>

                {/* Timeline Item 1 */}
                <div className="relative mb-6 flex gap-4 items-start group">
                  <div className="absolute -left-[30px] w-6 h-6 rounded-full bg-[#a0f399]/30 border-2 border-white flex items-center justify-center z-10">
                    <span className="w-2 h-2 rounded-full bg-[#1b6d24]"></span>
                  </div>
                  <div className="flex-grow bg-[#f5f2fb] rounded-lg p-4 group-hover:bg-[#eae7ef]/40 transition">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-[#1b6d24]" />
                        <p className="text-xs font-bold text-[#1b1b21]">Savings Deposit</p>
                      </div>
                      <span className="text-[10px] text-[#454652]">Today, 10:30 AM</span>
                    </div>
                    <p className="text-xs text-[#454652]">Monthly fixed savings deposited via group leader.</p>
                    <p className="text-sm font-bold text-[#1b6d24] mt-2">+ ₹ 500.00</p>
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="relative mb-6 flex gap-4 items-start group">
                  <div className="absolute -left-[30px] w-6 h-6 rounded-full bg-[#e0e0ff] border-2 border-white flex items-center justify-center z-10">
                    <span className="w-2 h-2 rounded-full bg-[#1a237e]"></span>
                  </div>
                  <div className="flex-grow bg-[#f5f2fb] rounded-lg p-4 group-hover:bg-[#eae7ef]/40 transition">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-[#1a237e]" />
                        <p className="text-xs font-bold text-[#1b1b21]">Group Meeting Attended</p>
                      </div>
                      <span className="text-[10px] text-[#454652]">12 Oct 2023</span>
                    </div>
                    <p className="text-xs text-[#454652]">Attended monthly coordination meeting. Status marked present.</p>
                  </div>
                </div>

                {/* Timeline Item 3 */}
                <div className="relative flex gap-4 items-start group">
                  <div className="absolute -left-[30px] w-6 h-6 rounded-full bg-[#ffdad6] border-2 border-white flex items-center justify-center z-10">
                    <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
                  </div>
                  <div className="flex-grow bg-[#f5f2fb] rounded-lg p-4 group-hover:bg-[#eae7ef]/40 transition">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Wallet className="h-4 w-4 text-[#ba1a1a]" />
                        <p className="text-xs font-bold text-[#1b1b21]">EMI Payment Deducted</p>
                      </div>
                      <span className="text-[10px] text-[#454652]">5 Oct 2023</span>
                    </div>
                    <p className="text-xs text-[#454652]">Loan Acct #4920. Principal and interest component cleared.</p>
                    <p className="text-sm font-bold text-[#1b1b21] mt-2">- ₹ 2,150.00</p>
                  </div>
                </div>

              </div>
            </section>

            {/* KYC Documents */}
            <section className="bg-white rounded-xl p-6 shadow-sm border border-[#eae7ef]">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#eae7ef]">
                <h3 className="font-bold text-sm text-[#000666] uppercase tracking-wider">KYC Documents</h3>
                <button className="flex items-center gap-1 text-xs font-semibold text-[#000666] bg-[#e0e0ff] hover:bg-[#bdc2ff] px-3 py-1.5 rounded-full transition">
                  <Upload className="h-3.5 w-3.5" /> Upload New
                </button>
              </div>
              <p className="text-xs text-[#454652] mb-4">Required documents for identity and address verification.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Doc 1 */}
                <div className="border border-[#c6c5d4]/40 rounded-lg overflow-hidden group cursor-pointer hover:border-[#000666] transition">
                  <div className="aspect-[4/3] bg-[#eae7ef] relative">
                    <img 
                      alt="Aadhaar Card Front" 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHGoHfoqRMkl9wAHZZF2FU0k-g7BIVv4F3JRi5o8-7D6Rdpc-B5a8zylmADLoiVEcnRUgjYgCw1_1JpElamzSyOJ_uxAD-JOS7PBqTxBgRONWVuB_zeqzn67IQp_m10PIfbt_T4PaR8wzBl7p1iC0nCs93UZLV6FM2bHidGzkCozxVrp6qeBw-LgvdHsH7mdE5mAED6G5w2d4_lYzQlG9ZYYONdkmkyKa4CTfnBBuQbSnS3EpzbZwTkxvT03ohGhulwABmzw5rCRDT"
                    />
                  </div>
                  <div className="p-3 bg-white flex items-center justify-between border-t border-[#c6c5d4]/20">
                    <div>
                      <p className="text-xs font-bold text-[#1b1b21]">Aadhaar (Front)</p>
                      <p className="text-[10px] text-[#454652] mt-0.5">Verified on 12 Mar 2021</p>
                    </div>
                    <CheckCircle className="h-4.5 w-4.5 text-[#1b6d24]" />
                  </div>
                </div>

                {/* Doc 2 */}
                <div className="border border-[#c6c5d4]/40 rounded-lg overflow-hidden group cursor-pointer hover:border-[#000666] transition">
                  <div className="aspect-[4/3] bg-[#eae7ef] relative flex items-center justify-center">
                    <FileText className="h-10 w-10 text-[#767683] opacity-50" />
                  </div>
                  <div className="p-3 bg-white flex items-center justify-between border-t border-[#c6c5d4]/20">
                    <div>
                      <p className="text-xs font-bold text-[#1b1b21]">Aadhaar (Back)</p>
                      <p className="text-[10px] text-[#454652] mt-0.5">Verified on 12 Mar 2021</p>
                    </div>
                    <CheckCircle className="h-4.5 w-4.5 text-[#1b6d24]" />
                  </div>
                </div>

                {/* Doc 3 */}
                <div className="border border-dashed border-[#c6c5d4] rounded-lg overflow-hidden group cursor-pointer hover:border-[#000666] transition bg-[#f5f2fb] flex flex-col items-center justify-center aspect-[4/3] min-h-[150px]">
                  <Plus className="h-8 w-8 text-[#000666] mb-2" />
                  <p className="text-xs font-bold text-[#000666]">Add Pan Card</p>
                  <p className="text-[10px] text-[#454652] mt-1">Optional</p>
                </div>
              </div>
            </section>

          </div>

        </div>

      </main>
    </div>
  );
};
