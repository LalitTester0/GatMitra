import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Monitor, 
  ExternalLink, 
  Compass, 
  Sparkles,
  ArrowLeft,
  Layers
} from 'lucide-react';

// Import all screen components for native rendering
import { Login } from '../auth/Login';
import { OtpSuccess } from '../auth/OtpSuccess';
import { AdminDashboard } from '../dashboard/AdminDashboard';
import { MemberList } from '../member/MemberList';
import { AddMember } from '../member/AddMember';
import { MemberDetails } from '../member/MemberDetails';
import { MemberStatusDrawer } from '../member/MemberStatusDrawer';
import { BachatGatList } from '../bachatgat/BachatGatList';
import { AddBachatGat } from '../bachatgat/AddBachatGat';
import { EditBachatGat } from '../bachatgat/EditBachatGat';
import { BachatGatDetails } from '../bachatgat/BachatGatDetails';
import { AuditLogList } from '../audit/AuditLogList';
import { MemberDashboard } from '../dashboard/MemberDashboard';
import { SuperAdminDashboard } from '../dashboard/SuperAdminDashboard';
import { SuperAdminNotifications } from '../notifications/SuperAdminNotifications';
import { SuperAdminAudits } from '../audit/SuperAdminAudits';
import { Notifications } from '../notifications/Notifications';
import { Unauthorized } from '../error/Unauthorized';
import { Deactivated } from '../error/Deactivated';
import { SessionExpired } from '../error/SessionExpired';

export interface StitchScreen {
  id: string;
  path: string;
  title: string;
  url: string;
  device: 'DESKTOP' | 'MOBILE';
}

export const STITCH_SCREENS: StitchScreen[] = [
  {
    id: "f87e1eb5346a42f5b6dd2df32f49b699",
    path: "login",
    title: "Login / Sign Up Portal",
    url: "/screens/login.html",
    device: "DESKTOP"
  },
  {
    id: "93a840f04e9c4c1a9f2ddb1a01577076",
    path: "otp-success",
    title: "OTP Verification - Success State",
    url: "/screens/otp-success.html",
    device: "DESKTOP"
  },
  {
    id: "9ee64671f4bc479ba5ccdf7387dc6447",
    path: "admin-dashboard",
    title: "Admin Dashboard - Updated Header",
    url: "/screens/admin-dashboard.html",
    device: "DESKTOP"
  },
  {
    id: "e202cf0de1864820a58232a0fbbddd85",
    path: "admin-member-management",
    title: "Bachat Gat Admin - Member Directory",
    url: "/screens/admin-member-management.html",
    device: "DESKTOP"
  },
  {
    id: "71a0e49b4b2d49c5b63b41b639fd4395",
    path: "add-member",
    title: "Add Member - Standard Form",
    url: "/screens/add-member.html",
    device: "DESKTOP"
  },
  {
    id: "5451324c195f465bba15a63a7a8e7073",
    path: "member-details",
    title: "Member Details - Standard Panel",
    url: "/screens/member-details.html",
    device: "DESKTOP"
  },
  {
    id: "db26c1759461460f8e05f78096f74ba2",
    path: "member-status-drawer",
    title: "Member Status - Action-Centric Drawer",
    url: "/screens/member-status-drawer.html",
    device: "DESKTOP"
  },
  {
    id: "5f166a3dd7c64ee38c3bf21007bb28d8",
    path: "bachatgat-management",
    title: "Bachat Gat Management - Directory View",
    url: "/screens/bachatgat-management.html",
    device: "DESKTOP"
  },
  {
    id: "403ce2ae0587467886dfe5bd4d100786",
    path: "add-bachatgat",
    title: "Add Bachat Gat - Config Form",
    url: "/screens/add-bachatgat.html",
    device: "DESKTOP"
  },
  {
    id: "5c465ef648a547a684b137814a7059fc",
    path: "edit-bachatgat",
    title: "Edit Bachat Gat - Param Modifiers",
    url: "/screens/edit-bachatgat.html",
    device: "DESKTOP"
  },
  {
    id: "ffb8152d0d0f4614b55dccb49122725b",
    path: "bachatgat-details",
    title: "Bachat Gat Details - Panel",
    url: "/screens/bachatgat-details.html",
    device: "DESKTOP"
  },
  {
    id: "86e1904f813a421d99715e0aba436866",
    path: "admin-audits",
    title: "Bachat Gat Admin - Audit Trail Logs",
    url: "/screens/admin-audits.html",
    device: "DESKTOP"
  },
  {
    id: "de52ca563133464fa1c4ca4d2463bfe9",
    path: "member-dashboard",
    title: "Member Dashboard - Aggregate Panel",
    url: "/screens/member-dashboard.html",
    device: "DESKTOP"
  },
  {
    id: "ca11a1170a7e47608d5f403393c7162e",
    path: "superadmin-dashboard",
    title: "Super Admin Dashboard - Executive",
    url: "/screens/superadmin-dashboard.html",
    device: "DESKTOP"
  },
  {
    id: "1a69b7038b114e5d813567664dc343fe",
    path: "superadmin-notifications",
    title: "Super Admin Notifications",
    url: "/screens/superadmin-notifications.html",
    device: "DESKTOP"
  },
  {
    id: "d4f4ab3e737f425fadf8d44ff37677cc",
    path: "superadmin-audits",
    title: "Super Admin Audit Logs Registers",
    url: "/screens/superadmin-audits.html",
    device: "DESKTOP"
  },
  {
    id: "087fa4a507e04fd9811ae2ab011fc5cf",
    path: "notifications",
    title: "Notifications Dispatch Ledger",
    url: "/screens/notifications.html",
    device: "DESKTOP"
  },
  {
    id: "71130d672ec4491e90bfbc367873aeba",
    path: "unauthorized",
    title: "Unauthorized Access Warning Page",
    url: "/screens/unauthorized.html",
    device: "DESKTOP"
  },
  {
    id: "850280cbd57843258ff3405a960a0c9a",
    path: "deactivated",
    title: "Account Deactivated Alert Page",
    url: "/screens/deactivated.html",
    device: "DESKTOP"
  },
  {
    id: "d49b3b5398d8421287a32c48f8c31186",
    path: "session-expired",
    title: "Session Expired Modal Alert",
    url: "/screens/session-expired.html",
    device: "DESKTOP"
  }
];

// Map paths to their actual React elements
const screenComponentMap: { [key: string]: React.ReactNode } = {
  "login": <Login />,
  "otp-success": <OtpSuccess />,
  "admin-dashboard": <AdminDashboard />,
  "admin-member-management": <MemberList />,
  "add-member": <AddMember />,
  "member-details": <MemberDetails />,
  "member-status-drawer": <MemberStatusDrawer />,
  "bachatgat-management": <BachatGatList />,
  "add-bachatgat": <AddBachatGat />,
  "edit-bachatgat": <EditBachatGat />,
  "bachatgat-details": <BachatGatDetails />,
  "admin-audits": <AuditLogList />,
  "member-dashboard": <MemberDashboard />,
  "superadmin-dashboard": <SuperAdminDashboard />,
  "superadmin-notifications": <SuperAdminNotifications />,
  "superadmin-audits": <SuperAdminAudits />,
  "notifications": <Notifications />,
  "unauthorized": <Unauthorized />,
  "deactivated": <Deactivated />,
  "session-expired": <SessionExpired />
};

export const StitchExplorer: React.FC = () => {
  const { screenPath } = useParams<{ screenPath?: string }>();
  const navigate = useNavigate();
  
  // Find matching screen or default to first
  const currentScreen = STITCH_SCREENS.find(s => s.path === screenPath) || STITCH_SCREENS[0];

  const handleSelectScreen = (path: string) => {
    navigate(`/stitch/${path}`);
  };

  // Full Screen isolated native render check
  const isFullScreen = window.location.search.includes('fullscreen=true');

  if (isFullScreen) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-white z-50 overflow-auto">
        {screenComponentMap[currentScreen.path] || (
          <div className="p-8 text-center text-slate-400">Component not implemented</div>
        )}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#080c14] text-slate-100 overflow-hidden font-sans relative">
      {/* Visual glowing effects */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-brand-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Screen Sidebar */}
      <aside className="w-80 glass-panel border-r border-slate-800/40 p-5 flex flex-col shrink-0 z-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/15">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>Stitch Explorer</span>
            </h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">High-Fidelity Mockups</p>
          </div>
        </div>

        <div className="mb-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center gap-2 py-2 px-3 bg-slate-900/60 border border-slate-800 hover:bg-slate-850/80 text-xs font-semibold text-slate-300 rounded-xl transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to GatMitra Central</span>
          </button>
        </div>

        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2.5 px-2">
          Stitch Screens List ({STITCH_SCREENS.length})
        </div>

        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
          {STITCH_SCREENS.map((screen) => {
            const isSelected = currentScreen.path === screen.path;
            return (
              <button
                key={screen.id}
                onClick={() => handleSelectScreen(screen.path)}
                className={`w-full text-left px-3.5 py-3 rounded-xl border transition-all text-xs flex items-center gap-2.5 ${
                  isSelected 
                    ? 'bg-gradient-to-r from-brand-600/20 to-brand-500/5 border-brand-500/40 text-brand-300 font-semibold' 
                    : 'bg-transparent border-transparent text-slate-450 hover:text-slate-200 hover:bg-slate-850/20'
                }`}
              >
                <Layers className={`h-4 w-4 shrink-0 ${isSelected ? 'text-brand-400' : 'text-slate-500'}`} />
                <span className="truncate">{screen.title}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Viewport Frame */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden z-10">
        <header className="h-14 glass-panel border-b border-slate-800/40 px-6 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-sm font-semibold text-slate-200">{currentScreen.title}</h2>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">Route: /stitch/{currentScreen.path}</p>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-450 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              <Monitor className="h-3 w-3" />
              <span>Desktop View (2560x2048)</span>
            </span>

            <button
              onClick={() => window.open(`/stitch/${currentScreen.path}?fullscreen=true`, '_blank')}
              className="p-1.5 bg-slate-900/60 border border-slate-800 hover:bg-slate-850 text-slate-400 hover:text-white rounded-lg transition"
              title="Launch isolated full screen"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Dynamic component viewer inside desktop device framing */}
        <div className="flex-1 p-6 flex items-center justify-center bg-[#05070c] overflow-y-auto">
          <div className="w-full h-full max-w-6xl max-h-[85vh] bg-white rounded-2xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden">
            {/* Browser top MockBar */}
            <div className="h-9 bg-slate-900 border-b border-slate-800/60 px-4 flex items-center gap-2 shrink-0">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/40" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
              </div>
              <div className="flex-1 max-w-md mx-auto bg-[#070c14] border border-slate-800 rounded-lg h-6 px-3 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <div className="flex items-center gap-1">
                  <Compass className="h-3 w-3 text-slate-600" />
                  <span>http://localhost:3000/stitch/{currentScreen.path}</span>
                </div>
              </div>
            </div>
            
            {/* Embedded Native React Component Container */}
            <div className="flex-1 w-full overflow-auto relative bg-[#F5F5F5]">
              {screenComponentMap[currentScreen.path] || (
                <div className="p-8 text-center text-slate-400">Component not implemented</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
