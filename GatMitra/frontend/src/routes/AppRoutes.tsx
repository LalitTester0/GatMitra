import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/auth/Login';
import { OtpSuccess } from '../pages/auth/OtpSuccess';
import { AdminDashboard } from '../pages/dashboard/AdminDashboard';
import { BachatGatList } from '../pages/bachatgat/BachatGatList';
import { MemberList } from '../pages/member/MemberList';
import { AuditLogList } from '../pages/audit/AuditLogList';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { StitchExplorer } from '../pages/stitch/StitchExplorer';

// Import newly created native pages
import { SessionExpired } from '../pages/error/SessionExpired';
import { Unauthorized } from '../pages/error/Unauthorized';
import { Deactivated } from '../pages/error/Deactivated';
import { MemberDashboard } from '../pages/dashboard/MemberDashboard';
import { SuperAdminDashboard } from '../pages/dashboard/SuperAdminDashboard';
import { AddMember } from '../pages/member/AddMember';
import { MemberDetails } from '../pages/member/MemberDetails';
import { MemberStatusDrawer } from '../pages/member/MemberStatusDrawer';
import { AddBachatGat } from '../pages/bachatgat/AddBachatGat';
import { EditBachatGat } from '../pages/bachatgat/EditBachatGat';
import { BachatGatDetails } from '../pages/bachatgat/BachatGatDetails';
import { SuperAdminAudits } from '../pages/audit/SuperAdminAudits';
import { Notifications } from '../pages/notifications/Notifications';
import { SuperAdminNotifications } from '../pages/notifications/SuperAdminNotifications';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />

      <Route 
        path="/otp-success" 
        element={
          <OtpSuccess />
        } 
      />

      {/* Mockup Native Screen Routes for standalone verification */}
      <Route path="/session-expired" element={<SessionExpired />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/deactivated" element={<Deactivated />} />
      <Route path="/member/dashboard" element={<MemberDashboard />} />
      <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
      <Route path="/members/add" element={<AddMember />} />
      <Route path="/members/detail-preview" element={<MemberDetails />} />
      <Route path="/members/status-drawer" element={<MemberStatusDrawer />} />
      <Route path="/bachatgat/add" element={<AddBachatGat />} />
      <Route path="/bachatgat/edit-preview" element={<EditBachatGat />} />
      <Route path="/bachatgat/detail-preview" element={<BachatGatDetails />} />
      <Route path="/superadmin/audits" element={<SuperAdminAudits />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/superadmin/notifications" element={<SuperAdminNotifications />} />

      {/* Stitch screen showcase public explorer */}
      <Route path="/stitch" element={<Navigate to="/stitch/login" replace />} />
      <Route path="/stitch/:screenPath" element={<StitchExplorer />} />

      {/* Protected routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/bachatgat" 
        element={
          <ProtectedRoute>
            <BachatGatList />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/members" 
        element={
          <ProtectedRoute>
            <MemberList />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/audits" 
        element={
          <ProtectedRoute>
            <AuditLogList />
          </ProtectedRoute>
        } 
      />

      {/* Wildcard redirect */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
