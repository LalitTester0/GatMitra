import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../services/api';
import { useTranslation } from 'react-i18next';
import { KeyRound, Phone, ShieldCheck, MessageSquare, Landmark, Globe } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Switch between 'password' and 'otp' modes
  const [authMode, setAuthMode] = useState<'password' | 'otp'>('password');
  
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

  const handleStandardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');
    setIsLoading(true);

    try {
      const response = await authApi.login({ username, password });
      if (response.data.success) {
        const { token, user } = response.data.data;
        login(token, user);
        navigate('/dashboard');
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
        const { token, user } = response.data.data;
        login(token, user);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Invalid or expired OTP code.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#070c14] relative p-4 overflow-hidden">
      {/* Visual background decorations */}
      <div className="absolute top-[-150px] left-[-150px] w-96 h-96 bg-brand-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Global Lang Select top right */}
      <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-2 text-xs">
        <Globe className="h-3.5 w-3.5 text-brand-400" />
        <select 
          value={i18n.language} 
          onChange={(e) => { i18n.changeLanguage(e.target.value); localStorage.setItem('i18nextLng', e.target.value); }}
          className="bg-transparent border-none text-slate-300 focus:outline-none cursor-pointer"
        >
          <option value="en" className="bg-[#0b0f19]">English</option>
          <option value="mr" className="bg-[#0b0f19]">मराठी</option>
          <option value="hi" className="bg-[#0b0f19]">हिंदी</option>
        </select>
      </div>

      <div className="w-full max-w-md glass-panel p-8 rounded-2xl shadow-2xl relative z-10 border border-white/5">
        <div className="text-center mb-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 mb-4 shadow-xl shadow-brand-500/10">
            <Landmark className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight gradient-text">{t('auth.login')}</h2>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            {t('auth.enterDetails')}
          </p>
        </div>

        {/* Notices */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-950/40 border border-red-500/30 text-red-300 rounded-xl text-xs text-center">
            {errorMsg}
          </div>
        )}
        {infoMsg && (
          <div className="mb-4 p-3 bg-brand-950/40 border border-brand-500/30 text-brand-300 rounded-xl text-xs text-center">
            {infoMsg}
          </div>
        )}

        {/* Selector Toggle */}
        <div className="flex bg-slate-900/60 p-1 rounded-xl border border-slate-800 mb-6">
          <button
            onClick={() => { setAuthMode('password'); setErrorMsg(''); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
              authMode === 'password' 
                ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <KeyRound className="h-3.5 w-3.5" />
            <span>Standard</span>
          </button>
          <button
            onClick={() => { setAuthMode('otp'); setErrorMsg(''); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
              authMode === 'otp' 
                ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>WhatsApp OTP</span>
          </button>
        </div>

        {/* Standard Credentials View */}
        {authMode === 'password' ? (
          <form onSubmit={handleStandardSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-350 mb-1.5">{t('common.username')}</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
                  placeholder="Enter username"
                />
                <ShieldCheck className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Hint: superadmin / admin_durga</div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-350 mb-1.5">{t('common.password')}</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
                  placeholder="Enter password"
                />
                <KeyRound className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Hint: password123</div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl btn-primary-gradient text-sm font-bold text-white mt-6 disabled:opacity-50"
            >
              {isLoading ? t('common.loading') : 'Sign In'}
            </button>
          </form>
        ) : (
          /* WhatsApp OTP Request / Validation View */
          <div>
            {!otpRequested ? (
              <form onSubmit={handleRequestOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-350 mb-1.5">{t('common.phone')}</label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
                      placeholder="e.g. +919876543210"
                    />
                    <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">Registered formats: +919876543210</div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl btn-primary-gradient text-sm font-bold text-white mt-6 disabled:opacity-50"
                >
                  {isLoading ? t('common.loading') : t('auth.requestOtp')}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-350 mb-1.5">Verification Code</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm text-center tracking-widest text-lg"
                      placeholder={t('auth.otpPlaceholder')}
                    />
                    <ShieldCheck className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1.5 text-center">
                    Check PostgreSQL `notification_logs` to get your generated code.
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl btn-primary-gradient text-sm font-bold text-white mt-6 disabled:opacity-50"
                >
                  {isLoading ? t('common.loading') : t('auth.verifyOtp')}
                </button>

                <button
                  type="button"
                  onClick={() => { setOtpRequested(false); setOtpCode(''); }}
                  className="w-full text-center text-xs text-slate-400 hover:text-slate-200 mt-2 transition"
                >
                  Change phone number
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
