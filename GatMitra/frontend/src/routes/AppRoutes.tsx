import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Login } from '../pages/auth/Login';
import { AdminDashboard } from '../pages/dashboard/AdminDashboard';
import { BachatGatList } from '../pages/bachatgat/BachatGatList';
import { MemberList } from '../pages/member/MemberList';
import { AuditLogList } from '../pages/audit/AuditLogList';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { StitchExplorer } from '../pages/stitch/StitchExplorer';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

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
