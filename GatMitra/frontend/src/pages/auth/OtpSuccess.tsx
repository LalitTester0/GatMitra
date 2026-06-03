import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Lock, Timer, ArrowRight, MessageSquare } from 'lucide-react';

const customTranslations = {
  en: {
    verifyNumber: "Verify Your Number",
    sentCode: "We've sent a 6-digit code to your mobile number.",
    edit: "Edit",
    resendOtp: "Resend OTP",
    verifyProceed: "Verify & Proceed",
    verifying: "Verifying...",
    havingTrouble: "Having trouble?",
    getOtpWhatsApp: "Get OTP on WhatsApp",
    smsFallback: "SMS Fallback",
    successMsg: "Identity Verified Successfully",
    english: "English",
    marathi: "मराठी",
    hindi: "हिन्दी",
    copyright: "© 2024 Bachat Gat FinTech. Secure & Trusted."
  },
  mr: {
    verifyNumber: "तुमचा नंबर सत्यापित करा",
    sentCode: "आम्ही तुमच्या मोबाईल नंबरवर ६-अंकी कोड पाठवला आहे.",
    edit: "संपादित करा",
    resendOtp: "ओटीपी पुन्हा पाठवा",
    verifyProceed: "सत्यापित करा आणि पुढे जा",
    verifying: "सत्यापित करत आहे...",
    havingTrouble: "अडचण येत आहे?",
    getOtpWhatsApp: "व्हाट्सएपवर ओटीपी मिळवा",
    smsFallback: "एसएमएस पर्याय",
    successMsg: "ओळख यशस्वीरित्या सत्यापित झाली",
    english: "English",
    marathi: "मराठी",
    hindi: "हिन्दी",
    copyright: "© २०२४ बचत गट फिनटेक. सुरक्षित आणि विश्वासू."
  },
  hi: {
    verifyNumber: "अपना नंबर सत्यापित करें",
    sentCode: "हमने आपके मोबाइल नंबर पर ६-अंकीय कोड भेजा है।",
    edit: "संपादित करें",
    resendOtp: "ओटीपी पुनः भेजें",
    verifyProceed: "सत्यापित करें और आगे बढ़ें",
    verifying: "सत्यापित किया जा रहा है...",
    havingTrouble: "कोई समस्या आ रही है?",
    getOtpWhatsApp: "व्हाट्सएप पर ओटीपी प्राप्त करें",
    smsFallback: "एसएमएस विकल्प",
    successMsg: "पहचान सफलतापूर्वक सत्यापित की गई",
    english: "English",
    marathi: "मराठी",
    hindi: "हिन्दी",
    copyright: "© २०२४ बचत गट फिनटेक। सुरक्षित और विश्वसनीय।"
  }
};

export const OtpSuccess: React.FC = () => {
  const { login } = useAuth();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  
  // Local active language state (syncs with i18n if set)
  const currentLang = (i18n.language as 'en' | 'mr' | 'hi') || 'en';
  const text = customTranslations[currentLang] || customTranslations.en;

  // OTP inputs state (6 digits)
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer state
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);

  // Submit states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  // Focus on first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Timer loop effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsResendDisabled(false);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Handle number input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    const cleanValue = value.replace(/[^0-9]/g, '');
    if (!cleanValue) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      return;
    }

    const char = cleanValue.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);

    // Focus next element
    if (index < 5 && char !== '') {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace key deletion
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '') {
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
          const newOtp = [...otp];
          newOtp[index - 1] = '';
          setOtp(newOtp);
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  // Handle paste events
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    pastedData.split('').forEach((char, idx) => {
      if (idx < 6) {
        newOtp[idx] = char;
      }
    });
    setOtp(newOtp);
    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  // Resend OTP trigger
  const handleResend = () => {
    if (isResendDisabled) return;
    setOtp(['', '', '', '', '', '']);
    setTimeLeft(60);
    setIsResendDisabled(true);
    inputRefs.current[0]?.focus();
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = otp.join('');
    if (fullCode.length === 6) {
      setIsLoading(true);
      // Simulate verification api call
      setTimeout(() => {
        setIsLoading(false);
        setIsVerified(true);
        
        // Log user in with mock credentials so they can access dashboard
        login('mock-jwt-token-otp', {
          id: 'mock-user-id',
          username: 'GatMitraMember',
          phoneNumber: '+919876543201',
          roles: ['ADMIN']
        });

        // Redirect to dashboard after success animation plays
        setTimeout(() => {
          navigate('/dashboard');
        }, 1800);
      }, 1500);
    }
  };

  const changeLanguage = (lang: 'en' | 'mr' | 'hi') => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
  };

  return (
    <div className="bg-[#fbf8ff] min-h-screen flex flex-col font-sans text-[#1b1b21] antialiased select-none">
      {/* Header */}
      <header className="w-full h-16 flex items-center justify-center px-4 md:px-12 bg-[#fbf8ff] shadow-sm border-b border-[#c6c5d4]/10 shrink-0">
        <h1 className="text-2xl font-bold tracking-tight text-[#000666]">Bachat Gat</h1>
      </header>

      {/* Main content canvas */}
      <main className="flex-grow flex items-center justify-center p-4 md:p-12">
        <div className="bg-white rounded-xl shadow-md w-full max-w-md p-6 border border-[#c6c5d4]/30 relative overflow-hidden transition-all duration-300">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 w-full h-2 bg-[#000666]"></div>

          {!isVerified ? (
            <div className="transition-opacity duration-300">
              {/* Form title/subtitle block */}
              <div className="flex flex-col items-center text-center mb-6 mt-3">
                <div className="w-16 h-16 bg-[#1a237e]/10 rounded-full flex items-center justify-center mb-3 text-[#000666]">
                  <Lock className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-semibold text-[#1b1b21] mb-1">{text.verifyNumber}</h2>
                <p className="text-sm text-[#454652]">{text.sentCode}</p>
                <p className="text-sm font-medium text-[#000666] mt-1">
                  +91 ******8901
                  <button 
                    type="button" 
                    onClick={() => navigate('/login')}
                    className="text-[#1b6d24] ml-2 underline hover:text-[#002204]"
                  >
                    {text.edit}
                  </button>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* 6-Digit OTP inputs */}
                <div className="flex justify-between gap-2 md:gap-3 px-3">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={el => (inputRefs.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(e, idx)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                      onPaste={idx === 0 ? handlePaste : undefined}
                      className="otp-input w-12 h-14 md:w-14 md:h-16 text-center text-xl font-semibold text-[#1b1b21] bg-[#fbf8ff] border-2 border-[#c6c5d4] rounded-lg focus:border-[#000666] focus:outline-none transition-colors"
                      disabled={isLoading}
                    />
                  ))}
                </div>

                {/* Live Timer and Resend block */}
                <div className="flex flex-col items-center gap-2 mt-2">
                  <div className="text-sm text-[#454652] flex items-center gap-1.5">
                    <Timer className="h-4.5 w-4.5" />
                    <span>00:{timeLeft.toString().padStart(2, '0')}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={isResendDisabled}
                    className={`text-sm transition ${
                      isResendDisabled
                        ? 'text-[#c6c5d4] cursor-not-allowed'
                        : 'text-[#000666] hover:text-[#1a237e] font-bold'
                    }`}
                  >
                    {text.resendOtp}
                  </button>
                </div>

                {/* Submit action */}
                <button
                  type="submit"
                  disabled={isLoading || otp.join('').length < 6}
                  className="w-full h-12 bg-[#000666] hover:bg-[#1a237e] text-white text-sm font-semibold rounded-lg shadow-sm transition-colors mt-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                      <span>{text.verifying}</span>
                    </>
                  ) : (
                    <>
                      <span>{text.verifyProceed}</span>
                      <ArrowRight className="h-4.5 w-4.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Having trouble divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-grow h-px bg-[#c6c5d4]/50"></div>
                <span className="text-xs font-medium text-[#454652] uppercase tracking-wider">{text.havingTrouble}</span>
                <div className="flex-grow h-px bg-[#c6c5d4]/50"></div>
              </div>

              {/* Alternative verification modes */}
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => alert("Simulating OTP dispatch via WhatsApp")}
                  className="w-full h-12 border-2 border-[#1b6d24] text-[#1b6d24] text-sm font-semibold rounded-lg hover:bg-[#a0f399]/20 transition-colors flex items-center justify-center gap-2 bg-[#fbf8ff]"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"></path>
                  </svg>
                  <span>{text.getOtpWhatsApp}</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert("Simulating OTP dispatch via SMS fallback")}
                  className="w-full h-12 border-2 border-[#c6c5d4] text-[#1b1b21] text-sm font-semibold rounded-lg hover:bg-[#eae7ef] transition-colors flex items-center justify-center gap-2 bg-[#fbf8ff]"
                >
                  <MessageSquare className="h-4.5 w-4.5" />
                  <span>{text.smsFallback}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Success State */
            <div className="flex flex-col items-center justify-center text-center py-12">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-[#1b6d24]/20 rounded-full animate-pulse-ring"></div>
                <div className="relative w-full h-full bg-[#1b6d24] text-white rounded-full flex items-center justify-center z-10">
                  <svg className="w-12 h-12" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
                    <circle className="checkmark__circle" cx="26" cy="26" fill="none" r="25"></circle>
                    <path className="checkmark__check" d="M14.1 27.2l7.1 7.2 16.7-16.8" fill="none"></path>
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-[#1b1b21] mb-1 animate-fade-in-up">{text.successMsg}</h2>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 md:px-12 flex flex-col md:flex-row items-center justify-between gap-3 bg-white border-t border-[#c6c5d4] shrink-0">
        <div className="text-sm font-bold text-[#000666]">Bachat Gat</div>
        
        {/* Language Selection */}
        <div className="flex gap-4">
          <button
            onClick={() => changeLanguage('en')}
            className={`text-xs cursor-pointer hover:text-[#000666] transition ${
              currentLang === 'en' ? 'font-bold text-[#000666] underline' : 'text-[#454652]'
            }`}
          >
            {text.english}
          </button>
          <button
            onClick={() => changeLanguage('mr')}
            className={`text-xs cursor-pointer hover:text-[#000666] transition ${
              currentLang === 'mr' ? 'font-bold text-[#000666] underline' : 'text-[#454652]'
            }`}
          >
            {text.marathi}
          </button>
          <button
            onClick={() => changeLanguage('hi')}
            className={`text-xs cursor-pointer hover:text-[#000666] transition ${
              currentLang === 'hi' ? 'font-bold text-[#000666] underline' : 'text-[#454652]'
            }`}
          >
            {text.hindi}
          </button>
        </div>

        <div className="text-xs text-[#1b6d24]">{text.copyright}</div>
      </footer>
    </div>
  );
};
