import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Home, Lock } from 'lucide-react';

export const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fbf8ff] min-h-screen flex flex-col font-sans text-[#1b1b21] antialiased select-none">
      {/* TopAppBar */}
      <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-12 h-16 border-b border-[#c6c5d4]/10 shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            aria-label="Go back" 
            className="text-[#000666] hover:bg-[#eae7ef] p-2 rounded-full transition active:scale-95 duration-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQb0DvB5zO0bR00VGze-cxroJgflWWJ6PPM2yRsmjtoI9_XsXxlzROYaF5FLkTwOjlh7I75jlyuyqq_QtoftQNhkmn7c-HTcnGF2pyeV29kTy7_FLEQzh9igNKjlyBiB0yTlPyff1DgZsAqNCBd-tTZ-nrro8Zc6nM2jtmtEAWEDruoE3xDi15eQNaifaVRdhtxG68NQDDb6aeQE4yr08AOQ1YDYsksOsQ7bbSza9Npw2mVdRskSpA2gv0kSWPjdLKnlCGtYgUhSso" 
              alt="Gatmitra Logo" 
              className="h-10 w-auto"
            />
            <h1 className="text-xl font-bold tracking-tight text-[#000666]">Gatmitra</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 md:p-12 mt-16">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-[#c6c5d4]/30 flex flex-col items-center text-center">
            {/* Icon Container */}
            <div className="w-24 h-24 rounded-full bg-[#ffdad6] flex items-center justify-center mb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#ba1a1a]/10 animate-pulse"></div>
              <AlertTriangle className="h-12 w-12 text-[#ba1a1a]" />
            </div>

            {/* Message */}
            <h2 className="text-2xl md:text-3xl font-semibold text-[#ba1a1a] mb-3">Access Denied</h2>
            <p className="text-sm text-[#454652] mb-8 max-w-sm">
              You do not have the required permissions to view this secure financial information. Please contact your group administrator if you believe this is an error.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-[#000666] text-white font-medium h-12 rounded-lg hover:bg-[#1a237e] transition shadow-sm active:scale-95 flex items-center justify-center gap-2"
              >
                <Home className="h-5 w-5" />
                <span>Return to Home</span>
              </button>
              <button 
                onClick={() => alert('Support request submitted. We will contact you soon.')}
                className="flex-1 bg-white text-[#000666] border-2 border-[#000666] font-medium h-12 rounded-lg hover:bg-[#eae7ef] transition active:scale-95 flex items-center justify-center"
              >
                Contact Support
              </button>
            </div>

            {/* Security Note */}
            <div className="mt-8 pt-4 border-t border-[#c6c5d4]/20 w-full flex items-center justify-center gap-1 text-[#767683] text-xs">
              <Lock className="h-4 w-4" />
              <span>Secure Gatmitra Environment</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#c6c5d4]/35 w-full py-6 px-4 md:px-12 flex flex-col md:flex-row items-center justify-between gap-3 shrink-0">
        <div className="text-xs font-bold text-[#000666]">Gatmitra</div>
        <div className="flex gap-4">
          <span className="text-xs text-[#000666] font-bold underline cursor-pointer">English</span>
          <span className="text-xs text-[#454652] hover:text-[#000666] cursor-pointer">मराठी</span>
          <span className="text-xs text-[#454652] hover:text-[#000666] cursor-pointer">हिन्दी</span>
        </div>
        <div className="text-xs text-[#1b6d24]">© 2024 Gatmitra FinTech. Secure & Trusted.</div>
      </footer>
    </div>
  );
};
