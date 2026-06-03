import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle, PauseCircle, Ban, Save } from 'lucide-react';

export const MemberStatusDrawer: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<'active' | 'inactive' | 'blocked'>('active');

  const handleSave = () => {
    alert(`Status updated to: ${selectedStatus.toUpperCase()}`);
    navigate('/members');
  };

  return (
    <div className="bg-[#fbf8ff] min-h-screen text-[#1b1b21] font-sans h-screen w-screen overflow-hidden relative select-none">
      
      {/* Backdrop Overlay simulation */}
      <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center pointer-events-none">
        <p className="text-sm font-semibold text-[#767683]">Main Application Canvas (Behind Drawer Backdrop)</p>
      </div>
      <div className="fixed inset-0 bg-[#303036] bg-opacity-40 z-40"></div>

      {/* Side Drawer Container */}
      <div 
        className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-white shadow-xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out border-l border-[#c6c5d4]/40"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#c6c5d4]/40 bg-white shrink-0">
          <h2 className="text-md font-bold text-[#1b1b21]">Manage Member Status</h2>
          <button 
            onClick={() => navigate('/members')}
            aria-label="Close panel" 
            className="p-2 rounded-full hover:bg-[#eae7ef] transition flex items-center justify-center text-[#454652] focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Contextual Info */}
          <div className="bg-[#f5f2fb] rounded-lg p-4 flex items-center gap-4 border border-[#c6c5d4]/20">
            <div className="w-12 h-12 rounded-full bg-[#1a237e] text-white flex items-center justify-center font-bold text-md">
              RK
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#454652] uppercase tracking-wider">Updating Status For</p>
              <p className="text-md font-bold text-[#1b1b21]">Ravi Kumar</p>
            </div>
          </div>

          <p className="text-sm text-[#454652] leading-relaxed">
            Select the appropriate operational status for this member within the Bachat Gat. Changes will affect their ability to participate in loans and savings.
          </p>

          {/* Status Selection Cards */}
          <fieldset className="flex flex-col gap-4">
            <legend className="sr-only">Select Member Status</legend>

            {/* Active Status Card */}
            <label 
              onClick={() => setSelectedStatus('active')}
              className={`relative flex items-start p-6 cursor-pointer rounded-xl border-2 transition transition-all ${
                selectedStatus === 'active'
                  ? 'border-[#1b6d24] bg-[#a0f399]/15'
                  : 'border-[#c6c5d4]/60 hover:bg-[#eae7ef]/50'
              }`}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="mt-1 shrink-0 text-[#1b6d24]">
                  <CheckCircle className="h-5.5 w-5.5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#1b1b21]">Active</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedStatus === 'active' ? 'border-[#1b6d24]' : 'border-[#c6c5d4]'
                    }`}>
                      {selectedStatus === 'active' && <div className="w-2.5 h-2.5 rounded-full bg-[#1b6d24]"></div>}
                    </div>
                  </div>
                  <p className="text-xs text-[#454652] mt-1.5 leading-relaxed">
                    Member is fully participating. Can deposit savings, request loans, and vote in meetings.
                  </p>
                </div>
              </div>
            </label>

            {/* Inactive Status Card */}
            <label 
              onClick={() => setSelectedStatus('inactive')}
              className={`relative flex items-start p-6 cursor-pointer rounded-xl border-2 transition transition-all ${
                selectedStatus === 'inactive'
                  ? 'border-[#000666] bg-[#e0e0ff]/20'
                  : 'border-[#c6c5d4]/60 hover:bg-[#eae7ef]/50'
              }`}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="mt-1 shrink-0 text-[#454652]">
                  <PauseCircle className="h-5.5 w-5.5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#1b1b21]">Inactive</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedStatus === 'inactive' ? 'border-[#000666]' : 'border-[#c6c5d4]'
                    }`}>
                      {selectedStatus === 'inactive' && <div className="w-2.5 h-2.5 rounded-full bg-[#000666]"></div>}
                    </div>
                  </div>
                  <p className="text-xs text-[#454652] mt-1.5 leading-relaxed">
                    Temporarily suspended. Savings are held, but cannot issue new loans or vote until reactivated.
                  </p>
                </div>
              </div>
            </label>

            {/* Blocked Status Card */}
            <label 
              onClick={() => setSelectedStatus('blocked')}
              className={`relative flex items-start p-6 cursor-pointer rounded-xl border-2 transition transition-all ${
                selectedStatus === 'blocked'
                  ? 'border-[#ba1a1a] bg-[#ffdad6]/20'
                  : 'border-[#c6c5d4]/60 hover:bg-[#ffdad6]/10 hover:border-[#ba1a1a]'
              }`}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="mt-1 shrink-0 text-[#ba1a1a]">
                  <Ban className="h-5.5 w-5.5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#ba1a1a]">Blocked</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedStatus === 'blocked' ? 'border-[#ba1a1a]' : 'border-[#c6c5d4]'
                    }`}>
                      {selectedStatus === 'blocked' && <div className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]"></div>}
                    </div>
                  </div>
                  <p className="text-xs text-[#454652] mt-1.5 leading-relaxed">
                    Permanently restricted due to policy violations. Requires committee review for any further action.
                  </p>
                </div>
              </div>
            </label>
          </fieldset>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[#c6c5d4]/40 bg-white flex justify-end gap-3 items-center shrink-0">
          <button 
            type="button"
            onClick={() => navigate('/members')}
            className="h-11 px-6 rounded-full border-2 border-[#000666] text-[#000666] font-semibold hover:bg-[#f5f2fb] transition text-sm"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={handleSave}
            className="h-11 px-6 rounded-full bg-[#000666] text-white font-semibold hover:bg-[#1a237e] transition flex items-center gap-1.5 shadow-sm text-sm"
          >
            <Save className="h-4.5 w-4.5" />
            <span>Save Changes</span>
          </button>
        </div>

      </div>
    </div>
  );
};
