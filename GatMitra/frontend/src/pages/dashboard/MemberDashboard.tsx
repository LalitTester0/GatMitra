import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { 
  LayoutDashboard, 
  HelpCircle, 
  Wallet, 
  IndianRupee, 
  Calendar, 
  Lightbulb, 
  Phone, 
  MessageSquare,
  TrendingUp,
  Menu,
  LogOut
} from 'lucide-react';

export const MemberDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="bg-[#fbf8ff] min-h-screen text-[#1b1b21] font-sans flex select-none overflow-hidden h-screen w-full">
      
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        
        {/* Top Navbar */}
        <Header />

        {/* Dashboard Body */}
        <div className="overflow-y-auto p-4 md:p-12 space-y-8 flex-grow">
          
          {/* Welcome Section */}
          <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#000666]">Hello, Savita 👋</h2>
              <p className="text-md text-[#454652] mt-1">Here is your savings and loan summary.</p>
            </div>
            <button className="px-5 py-2.5 border-2 border-[#000666] text-[#000666] font-bold rounded-lg hover:bg-[#f5f2fb] transition-colors active:scale-95 text-sm">
              Download Report
            </button>
          </section>

          {/* Stat Cards Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#1b6d24] hover:-translate-y-1 transition duration-300">
              <div className="flex justify-between items-start mb-4">
                <span className="p-2 bg-[#a0f399]/20 text-[#1b6d24] rounded-lg">
                  <Wallet className="h-6 w-6" />
                </span>
                <span className="text-[#1b6d24] font-bold text-xs flex items-center gap-0.5">
                  <TrendingUp className="h-3 w-3" /> +4.5% vs last mo
                </span>
              </div>
              <p className="text-[#454652] text-xs font-semibold uppercase tracking-wider">Total Savings</p>
              <h3 className="text-3xl font-bold text-[#1b1b21] mt-1 flex items-center">
                <IndianRupee className="h-6 w-6 shrink-0" />
                <span>12,500.00</span>
              </h3>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#000666] hover:-translate-y-1 transition duration-300">
              <div className="flex justify-between items-start mb-4">
                <span className="p-2 bg-[#e0e0ff] text-[#343d96] rounded-lg">
                  <IndianRupee className="h-6 w-6" />
                </span>
                <span className="text-[#000666] font-bold text-xs">Agricultural Loan</span>
              </div>
              <p className="text-[#454652] text-xs font-semibold uppercase tracking-wider">Active Loan</p>
              <h3 className="text-3xl font-bold text-[#1b1b21] mt-1 flex items-center">
                <IndianRupee className="h-6 w-6 shrink-0" />
                <span>5,000.00</span>
              </h3>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#ba1a1a] hover:-translate-y-1 transition duration-300">
              <div className="flex justify-between items-start mb-4">
                <span className="p-2 bg-[#ffdad6] text-[#ba1a1a] rounded-lg">
                  <Calendar className="h-6 w-6" />
                </span>
                <span className="text-[#ba1a1a] font-bold text-xs">Due in 5 days</span>
              </div>
              <p className="text-[#454652] text-xs font-semibold uppercase tracking-wider">Next Repayment</p>
              <h3 className="text-3xl font-bold text-[#1b1b21] mt-1 flex items-center">
                <IndianRupee className="h-6 w-6 shrink-0" />
                <span>1,200.00</span>
              </h3>
            </div>
          </section>

          {/* Main Interactive Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Repayment Progress circle */}
            <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-[#c6c5d4]/20 flex flex-col items-center justify-center text-center">
              <h4 className="text-sm font-bold text-[#000666] mb-6 self-start uppercase tracking-wider">Repayment Status</h4>
              <div className="relative mb-6">
                <svg className="w-44 h-44">
                  <circle className="text-[#eae7ef]" cx="88" cy="88" fill="transparent" r="70" stroke="currentColor" strokeWidth="10"></circle>
                  <circle 
                    className="text-[#1b6d24] progress-ring-circle" 
                    cx="88" 
                    cy="88" 
                    fill="transparent" 
                    r="70" 
                    stroke="currentColor" 
                    strokeDasharray="439.8" 
                    strokeDashoffset="131.9" 
                    strokeLinecap="round" 
                    strokeWidth="10"
                    style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold text-[#1b1b21] leading-none">70%</span>
                  <span className="text-xs text-[#454652] mt-1">Paid Off</span>
                </div>
              </div>
              <div className="w-full bg-[#a0f399]/10 p-4 rounded-xl text-left border border-[#a0f399]/40">
                <p className="font-semibold text-xs text-[#217128] mb-1 flex items-center gap-1.5">
                  <span>Eligibility Bonus</span>
                </p>
                <p className="text-xs text-[#217128]">Repay your current loan to unlock <strong>₹15,000</strong> limit.</p>
              </div>
            </div>

            {/* Recent Transactions Table */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-[#c6c5d4]/20">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-sm font-bold text-[#000666] uppercase tracking-wider">Recent Transactions</h4>
                <button className="text-[#000666] font-bold text-xs hover:underline uppercase">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#c6c5d4]/30 text-[#454652] text-xs font-semibold">
                      <th className="py-3 px-2">Date</th>
                      <th className="py-3 px-2">Description</th>
                      <th className="py-3 px-2">Amount</th>
                      <th className="py-3 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c6c5d4]/10 text-sm">
                    <tr className="hover:bg-[#f5f2fb]/40 transition">
                      <td className="py-3 px-2 text-[#454652]">Oct 05, 2023</td>
                      <td className="py-3 px-2 font-medium">Monthly Savings Deposit</td>
                      <td className="py-3 px-2 font-bold text-[#1b6d24]">₹500.00</td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-0.5 bg-[#a0f399]/30 text-[#217128] rounded-full text-[10px] font-bold">Success</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-[#f5f2fb]/40 transition">
                      <td className="py-3 px-2 text-[#454652]">Sep 28, 2023</td>
                      <td className="py-3 px-2 font-medium">Loan Repayment #INST-4</td>
                      <td className="py-3 px-2 font-bold text-[#1b1b21]">₹1,200.00</td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-0.5 bg-[#a0f399]/30 text-[#217128] rounded-full text-[10px] font-bold">Success</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-[#f5f2fb]/40 transition">
                      <td className="py-3 px-2 text-[#454652]">Sep 05, 2023</td>
                      <td className="py-3 px-2 font-medium">Monthly Savings Deposit</td>
                      <td className="py-3 px-2 font-bold text-[#1b6d24]">₹500.00</td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-0.5 bg-[#a0f399]/30 text-[#217128] rounded-full text-[10px] font-bold">Success</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-[#f5f2fb]/40 transition">
                      <td className="py-3 px-2 text-[#454652]">Aug 28, 2023</td>
                      <td className="py-3 px-2 font-medium">Loan Repayment #INST-3</td>
                      <td className="py-3 px-2 font-bold text-[#1b1b21]">₹1,200.00</td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-0.5 bg-[#a0f399]/30 text-[#217128] rounded-full text-[10px] font-bold">Success</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Upcoming Events */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#c6c5d4]/20">
              <h4 className="text-sm font-bold text-[#000666] mb-4 uppercase tracking-wider">Upcoming Events</h4>
              <div className="space-y-4">
                <div className="flex gap-4 items-start p-2 rounded-lg hover:bg-[#f5f2fb]/50 transition">
                  <div className="bg-[#000666] text-white p-2 rounded-lg text-center min-w-[50px] text-xs">
                    <p className="font-medium">OCT</p>
                    <p className="text-lg font-bold">18</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1b1b21]">Monthly Group Meeting</p>
                    <p className="text-[11px] text-[#454652] mt-0.5">4:00 PM • Community Center</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-2 rounded-lg hover:bg-[#f5f2fb]/50 transition">
                  <div className="bg-[#5c1800] text-white p-2 rounded-lg text-center min-w-[50px] text-xs">
                    <p className="font-medium">OCT</p>
                    <p className="text-lg font-bold">25</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1b1b21]">Finance Literacy Workshop</p>
                    <p className="text-[11px] text-[#454652] mt-0.5">10:00 AM • Primary School</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Tip */}
            <div className="bg-[#1a237e] p-6 rounded-xl shadow-sm text-white relative overflow-hidden group">
              <div className="relative z-10">
                <Lightbulb className="h-10 w-10 text-[#8690ee] mb-4" />
                <h4 className="text-sm font-bold mb-2 uppercase tracking-wider">Financial Tip</h4>
                <p className="text-xs opacity-90 leading-relaxed mb-4">
                  Regular savings of just ₹100 per week can help you secure a higher loan limit during emergency times.
                </p>
                <p className="text-xs italic text-[#bdc2ff]">"Small savings, big dreams."</p>
              </div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#8690ee]/15 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
            </div>

            {/* Helpline support */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#c6c5d4]/20 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#000666] mb-2 uppercase tracking-wider">Helpline Support</h4>
                <p className="text-xs text-[#454652]">Contact your Group Leader or our 24/7 helpline.</p>
              </div>
              <div className="space-y-2 mt-4">
                <button className="w-full py-2.5 flex items-center justify-center gap-2 border-2 border-[#000666] text-[#000666] font-bold rounded-lg hover:bg-[#f5f2fb] transition text-xs">
                  <Phone className="h-4 w-4" />
                  <span>Call Helpline</span>
                </button>
                <button className="w-full py-2.5 flex items-center justify-center gap-2 bg-[#1b6d24] text-white font-bold rounded-lg hover:opacity-90 transition text-xs">
                  <MessageSquare className="h-4 w-4" />
                  <span>WhatsApp Support</span>
                </button>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Mobile Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white h-16 flex justify-around items-center border-t border-[#c6c5d4]/30 px-4 z-50 shadow-lg">
        <button className="flex flex-col items-center gap-1 text-[#000666]">
          <LayoutDashboard className="h-5 w-5" />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#454652] hover:text-[#000666]">
          <IndianRupee className="h-5 w-5" />
          <span className="text-[10px] font-medium">Loans</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#454652] hover:text-[#000666]">
          <Wallet className="h-5 w-5" />
          <span className="text-[10px] font-medium">Savings</span>
        </button>
        <button 
          onClick={() => { logout(); navigate('/login'); }}
          className="flex flex-col items-center gap-1 text-[#ba1a1a]"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-[10px] font-medium text-[#ba1a1a]">Logout</span>
        </button>
      </nav>
    </div>
  );
};
