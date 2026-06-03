import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#fbf8ff] text-[#1b1b21] font-sans overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 min-w-0 bg-[#F5F5F5] overflow-y-auto">
          <main className="flex-grow p-6 lg:p-8 max-w-7xl mx-auto w-full pb-24 md:pb-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
