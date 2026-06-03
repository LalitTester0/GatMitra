import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../services/api';
import { useTranslation } from 'react-i18next';
import { KeyRound, ShieldCheck, ArrowRight, Lock } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Switch between 'otp' and 'password' modes (default to 'otp' to match Stitch)
  const [authMode, setAuthMode] = useState<'otp' | 'password'>('otp');
  
  // Fields state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  
  // OTP sub-state
  const [otpRequested, setOtpRequested] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  const handleStandardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');
    setIsLoading(true);

    try {
      const response = await authApi.login({ username, password });
      if (response.data.success) {
        const authData = response.data.data;
        login(authData.token, authData);
        if (authData.role === 'SUPERADMIN') {
          navigate('/superadmin/dashboard');
        } else if (authData.role === 'MEMBER') {
          navigate('/member/dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Login failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');
    setIsLoading(true);

    try {
      await authApi.requestOtp(phoneNumber);
      setOtpRequested(true);
      setInfoMsg(t('auth.otpSent'));
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Failed to dispatch OTP code.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');
    setIsLoading(true);

    try {
      const response = await authApi.verifyOtp(phoneNumber, otpCode);
      if (response.data.success) {
        const authData = response.data.data;
        login(authData.token, authData);
        if (authData.role === 'SUPERADMIN') {
          navigate('/superadmin/dashboard');
        } else if (authData.role === 'MEMBER') {
          navigate('/member/dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Invalid or expired OTP code.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md antialiased relative overflow-hidden">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-margin-mobile md:px-margin-desktop h-20 bg-transparent">
        <div className="flex items-center">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQb0DvB5zO0bR00VGze-cxroJgflWWJ6PPM2yRsmjtoI9_XsXxlzROYaF5FLkTwOjlh7I75jlyuyqq_QtoftQNhkmn7c-HTcnGF2pyeV29kTy7_FLEQzh9igNKjlyBiB0yTlPyff1DgZsAqNCBd-tTZ-nrro8Zc6nM2jtmtEAWEDruoE3xDi15eQNaifaVRdhtxG68NQDDb6aeQE4yr08AOQ1YDYsksOsQ7bbSza9Npw2mVdRskSpA2gv0kSWPjdLKnlCGtYgUhSso" 
            alt="Gatmitra Logo" 
            className="h-10 w-auto object-contain"
          />
        </div>
        {/* Language Toggle */}
        <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-full p-[3px] border border-[#e1e1f0] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <button 
            type="button"
            onClick={() => changeLanguage('en')}
            className={`px-4 py-1.5 rounded-full font-semibold text-xs transition-all duration-200 ${
              i18n.language === 'en' ? 'bg-[#00085a] text-white shadow-sm' : 'text-[#33334d] hover:bg-gray-100/60'
            }`}
          >
            EN
          </button>
          <button 
            type="button"
            onClick={() => changeLanguage('mr')}
            className={`px-4 py-1.5 rounded-full font-semibold text-xs transition-all duration-200 ${
              i18n.language === 'mr' ? 'bg-[#00085a] text-white shadow-sm' : 'text-[#33334d] hover:bg-gray-100/60'
            }`}
          >
            म
          </button>
          <button 
            type="button"
            onClick={() => changeLanguage('hi')}
            className={`px-4 py-1.5 rounded-full font-semibold text-xs transition-all duration-200 ${
              i18n.language === 'hi' ? 'bg-[#00085a] text-white shadow-sm' : 'text-[#33334d] hover:bg-gray-100/60'
            }`}
          >
            हि
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center px-margin-mobile md:px-margin-desktop pt-24 pb-24 relative overflow-hidden">
        {/* Background Decoration Elements */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-[#e3e2ff]/50 rounded-full blur-[100px] md:blur-[130px] z-0 pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] md:w-[600px] h-[500px] md:h-[600px] bg-[#dcfce7]/60 rounded-full blur-[90px] md:blur-[110px] z-0 pointer-events-none"></div>

        {/* Login Card */}
        <div className="relative z-10 w-full max-w-[440px] bg-white rounded-[24px] shadow-[0px_10px_40px_rgba(0,0,0,0.06)] p-8 md:p-10 flex flex-col border border-[#e2e2f0]">
          {/* Header */}
          <div className="text-center flex flex-col items-center">
            <div className="w-[84px] h-[84px] mb-4">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQb0DvB5zO0bR00VGze-cxroJgflWWJ6PPM2yRsmjtoI9_XsXxlzROYaF5FLkTwOjlh7I75jlyuyqq_QtoftQNhkmn7c-HTcnGF2pyeV29kTy7_FLEQzh9igNKjlyBiB0yTlPyff1DgZsAqNCBd-tTZ-nrro8Zc6nM2jtmtEAWEDruoE3xDi15eQNaifaVRdhtxG68NQDDb6aeQE4yr08AOQ1YDYsksOsQ7bbSza9Npw2mVdRskSpA2gv0kSWPjdLKnlCGtYgUhSso" 
                alt="Gatmitra Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-[26px] font-bold text-[#1b1b21] tracking-tight leading-tight">
              {t('auth.welcomeToGatmitra')}
            </h1>
            <p className="text-[14px] text-gray-500 leading-relaxed mt-2 text-center">
              {authMode === 'password' 
                ? t('auth.enterDetails') 
                : t('auth.enterMobileToAccess')}
            </p>
          </div>

          {/* Notices */}
          {errorMsg && (
            <div className="p-3 bg-error-container border border-error/25 text-error rounded-lg text-label-sm text-center mt-4">
              {errorMsg}
            </div>
          )}
          {infoMsg && (
            <div className="p-3 bg-secondary-container/20 border border-secondary-container text-on-secondary-container rounded-lg text-label-sm text-center font-medium mt-4">
              {infoMsg}
            </div>
          )}

          {/* Forms */}
          {authMode === 'password' ? (
            <form onSubmit={handleStandardSubmit} className="flex flex-col mt-6">
              <div className="flex flex-col mb-4">
                <label className="font-semibold text-sm text-[#1b1b21] mb-1.5 block text-left" htmlFor="username">
                  Username
                </label>
                <div className="flex items-center px-4 py-3 bg-[#f8f8fd] border border-[#d2d2f2] focus-within:border-[#000666] focus-within:ring-1 focus-within:ring-[#000666]/20 rounded-lg transition-colors w-full h-[52px]">
                  <ShieldCheck className="h-5 w-5 text-gray-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    id="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-transparent border-0 outline-none focus:ring-0 focus:outline-none p-0 text-[#1b1b21] placeholder-gray-400/80 font-normal w-full text-base"
                    placeholder="Enter username"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Hint: superadmin / admin_durga</p>
              </div>

              <div className="flex flex-col mb-4">
                <label className="font-semibold text-sm text-[#1b1b21] mb-1.5 block text-left" htmlFor="password">
                  Password
                </label>
                <div className="flex items-center px-4 py-3 bg-[#f8f8fd] border border-[#d2d2f2] focus-within:border-[#000666] focus-within:ring-1 focus-within:ring-[#000666]/20 rounded-lg transition-colors w-full h-[52px]">
                  <KeyRound className="h-5 w-5 text-gray-400 mr-2 shrink-0" />
                  <input
                    type="password"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-transparent border-0 outline-none focus:ring-0 focus:outline-none p-0 text-[#1b1b21] placeholder-gray-400/80 font-normal w-full text-base"
                    placeholder="Enter password"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Hint: password123</p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#00085a] hover:bg-[#00054d] disabled:opacity-50 text-white font-bold py-3.5 px-4 rounded-lg shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 h-[52px] mt-2"
              >
                {isLoading ? (
                  <span className="text-sm">{t('common.loading')}</span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div>
              {!otpRequested ? (
                <form onSubmit={handleRequestOtp} className="flex flex-col mt-6">
                  <div className="flex flex-col">
                    <label className="font-semibold text-sm text-[#1b1b21] mb-1.5 block text-left" htmlFor="mobile-number">
                      {t('auth.mobileNumber')}
                    </label>
                    <div className="flex items-center px-4 py-3 bg-[#f8f8fd] border border-[#d2d2f2] focus-within:border-[#000666] focus-within:ring-1 focus-within:ring-[#000666]/20 rounded-lg transition-colors w-full h-[52px]">
                      <span className="text-[#1b1b21] font-semibold mr-2">+91</span>
                      <input
                        type="tel"
                        id="mobile-number"
                        required
                        pattern="[0-9]{10}"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="bg-transparent border-0 outline-none focus:ring-0 focus:outline-none p-0 text-[#1b1b21] placeholder-gray-400/80 font-normal w-full text-base"
                        placeholder={t('auth.tenDigitMobileNumber')}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#00085a] hover:bg-[#00054d] disabled:opacity-50 text-white font-bold py-3.5 px-4 rounded-lg shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 h-[52px] mt-6"
                  >
                    {isLoading ? (
                      <span className="text-sm">{t('common.loading')}</span>
                    ) : (
                      <>
                        <span>{t('auth.sendOtp')}</span>
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="flex flex-col mt-6">
                  <div className="flex flex-col gap-xs">
                    <label className="font-semibold text-sm text-[#1b1b21] mb-1.5 block text-left" htmlFor="otp-code">
                      Verification Code
                    </label>
                    <div className="flex items-center px-4 py-3 bg-[#f8f8fd] border border-[#d2d2f2] focus-within:border-[#000666] focus-within:ring-1 focus-within:ring-[#000666]/20 rounded-lg transition-colors w-full h-[52px]">
                      <ShieldCheck className="h-5 w-5 text-gray-400 mr-2 shrink-0" />
                      <input
                        type="text"
                        id="otp-code"
                        required
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="bg-transparent border-0 outline-none focus:ring-0 focus:outline-none p-0 text-[#1b1b21] placeholder-gray-400/80 font-normal w-full text-base text-center tracking-widest"
                        placeholder={t('auth.otpPlaceholder')}
                      />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1 text-center">
                      Check PostgreSQL `notification_logs` to get your generated code.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#00085a] hover:bg-[#00054d] disabled:opacity-50 text-white font-bold py-3.5 px-4 rounded-lg shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 h-[52px] mt-6"
                  >
                    {isLoading ? (
                      <span className="text-sm">{t('common.loading')}</span>
                    ) : (
                      <>
                        <span>{t('auth.verifyOtp')}</span>
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => { setOtpRequested(false); setOtpCode(''); }}
                    className="mt-4 text-center text-xs text-gray-500 hover:text-[#00085a] transition font-semibold"
                  >
                    Change phone number
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Trust Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 bg-[#e8f7ec] border border-[#cbeecf] py-2.5 px-4 rounded-lg">
            <Lock className="h-4 w-4 text-[#1b6d24] shrink-0" />
            <span className="text-[13px] font-semibold text-[#1b6d24]">
              {t('auth.bankEncryption')}
            </span>
          </div>

          {/* Terms / Privacy Links */}
          <div className="text-center border-t border-gray-100 pt-6 mt-6 flex flex-col gap-3 items-center">
            <p className="text-[13px] text-gray-500 leading-normal font-normal">
              {t('auth.termsPrefix')}
              <a className="text-[#1b1b21] hover:underline font-semibold" href="#">{t('auth.termsOfService')}</a>
              {t('auth.termsAnd')}
              <a className="text-[#1b1b21] hover:underline font-semibold" href="#">{t('auth.privacyPolicy')}</a>
              {t('auth.termsSuffix')}
            </p>
            <button
              type="button"
              onClick={() => {
                setAuthMode(authMode === 'otp' ? 'password' : 'otp');
                setErrorMsg('');
                setInfoMsg('');
              }}
              className="text-xs text-[#00085a] hover:underline font-bold mt-1"
            >
              {authMode === 'otp' ? 'Login with Username/Password' : 'Login with Mobile Number'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
