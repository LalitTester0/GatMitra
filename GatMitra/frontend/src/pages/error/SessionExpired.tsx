import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

export const SessionExpired: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fbf8ff] min-h-screen flex flex-col font-sans text-[#1b1b21] antialiased select-none">
      <main className="flex-grow flex items-center justify-center p-4 md:p-12 relative overflow-hidden">
        {/* Subtle Background Decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-30">
          <div className="w-[800px] h-[800px] rounded-full bg-[#bdc2ff] blur-3xl mix-blend-multiply opacity-20 transform translate-x-1/4 -translate-y-1/4"></div>
          <div className="w-[600px] h-[600px] rounded-full bg-[#88d982] blur-3xl mix-blend-multiply opacity-20 transform -translate-x-1/3 translate-y-1/3"></div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-md w-full max-w-[420px] p-6 md:p-8 flex flex-col items-center text-center relative z-10 border border-[#c6c5d4]/30">
          {/* Logo */}
          <div className="w-24 h-24 mb-6 flex items-center justify-center">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQb0DvB5zO0bR00VGze-cxroJgflWWJ6PPM2yRsmjtoI9_XsXxlzROYaF5FLkTwOjlh7I75jlyuyqq_QtoftQNhkmn7c-HTcnGF2pyeV29kTy7_FLEQzh9igNKjlyBiB0yTlPyff1DgZsAqNCBd-tTZ-nrro8Zc6nM2jtmtEAWEDruoE3xDi15eQNaifaVRdhtxG68NQDDb6aeQE4yr08AOQ1YDYsksOsQ7bbSza9Npw2mVdRskSpA2gv0kSWPjdLKnlCGtYgUhSso" 
              alt="Gatmitra Logo" 
              className="w-full h-full object-contain"
            />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-[#1b1b21] mb-2">Session Expired</h1>
          <p className="text-sm text-[#454652] mb-8 px-1">
            For your security, your session has timed out due to inactivity. Please log in again to continue managing your Gatmitra account.
          </p>

          <button 
            onClick={() => navigate('/login')}
            className="w-full h-12 bg-[#000666] hover:bg-[#1a237e] text-white rounded font-medium transition-all duration-150 flex items-center justify-center gap-2"
          >
            <LogIn className="h-5 w-5" />
            <span>Login Again</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white w-full border-t border-[#c6c5d4]/35 py-6 px-4 md:px-12 flex flex-col md:flex-row items-center justify-between gap-3 relative z-10 shrink-0">
        <div className="text-xs text-[#1b6d24]">© 2024 Gatmitra FinTech. Secure & Trusted.</div>
        <div className="flex gap-4">
          <span className="text-xs text-[#000666] font-bold underline cursor-pointer">English</span>
          <span className="text-xs text-[#454652] hover:text-[#000666] cursor-pointer">मराठी</span>
          <span className="text-xs text-[#454652] hover:text-[#000666] cursor-pointer">हिन्दी</span>
        </div>
      </footer>
    </div>
  );
};
