import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Ban, Mail, Phone, LogIn } from 'lucide-react';

export const Deactivated: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fbf8ff] min-h-screen flex flex-col font-sans text-[#1b1b21] antialiased select-none">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-12 h-16 bg-white shadow-sm border-b border-[#c6c5d4]/10 shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            aria-label="Go back" 
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#eae7ef] transition-colors active:scale-95 duration-100 text-[#454652]"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQb0DvB5zO0bR00VGze-cxroJgflWWJ6PPM2yRsmjtoI9_XsXxlzROYaF5FLkTwOjlh7I75jlyuyqq_QtoftQNhkmn7c-HTcnGF2pyeV29kTy7_FLEQzh9igNKjlyBiB0yTlPyff1DgZsAqNCBd-tTZ-nrro8Zc6nM2jtmtEAWEDruoE3xDi15eQNaifaVRdhtxG68NQDDb6aeQE4yr08AOQ1YDYsksOsQ7bbSza9Npw2mVdRskSpA2gv0kSWPjdLKnlCGtYgUhSso" 
              alt="Gatmitra Logo" 
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold tracking-tight text-[#000666]">Gatmitra</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 pt-24 pb-16">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 w-full max-w-md flex flex-col items-center text-center gap-6 border border-[#c6c5d4]/30 relative">
          
          {/* Icon Indicator */}
          <div className="w-16 h-16 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
            <Ban className="h-8 w-8" />
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-1 w-full">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1b1b21]">Account Deactivated</h1>
            <p className="text-sm text-[#454652] leading-relaxed mt-2">
              For security purposes, this account has been suspended. Please review our terms or contact administrative support to resolve this issue and restore access to your financial group.
            </p>
          </div>

          {/* Support Contact Module */}
          <div className="bg-[#f5f2fb] rounded-lg p-6 w-full flex flex-col gap-3 text-left border border-[#c6c5d4]/40">
            <h2 className="text-md font-semibold text-[#1b1b21] mb-1">Support Contact</h2>
            <div className="flex items-center gap-3">
              <Mail className="h-4.5 w-4.5 text-[#767683]" />
              <a className="text-sm text-[#000666] hover:underline" href="mailto:support@gatmitra.com">
                support@gatmitra.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4.5 w-4.5 text-[#767683]" />
              <a className="text-sm text-[#454652] hover:text-[#000666] transition" href="tel:+918001234567">
                1800-123-4567 (Toll Free)
              </a>
            </div>
          </div>

          {/* Action Button */}
          <button 
            onClick={() => navigate('/login')}
            className="w-full h-12 bg-[#000666] text-white font-medium rounded-full hover:bg-[#1a237e] transition flex items-center justify-center gap-2"
          >
            <LogIn className="h-5 w-5" />
            <span>Return to Login</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 md:px-12 flex flex-col md:flex-row items-center justify-between gap-3 bg-white border-t border-[#c6c5d4] mt-auto shrink-0">
        <div className="text-xs text-[#000666] font-bold">© 2024 Gatmitra FinTech. Secure & Trusted.</div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-[#000666] font-bold underline cursor-pointer">English</span>
          <span className="text-xs text-[#454652] hover:text-[#000666] cursor-pointer">मराठी</span>
          <span className="text-xs text-[#454652] hover:text-[#000666] cursor-pointer">हिन्दी</span>
        </div>
      </footer>
    </div>
  );
};
