import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Header } from './Header';
import { useAuth } from '../../hooks/useAuth';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="flex flex-col h-screen bg-gray-50">
  <Header /> {/* Navbar at the top */}
  <div className="flex flex-1 overflow-hidden">
    {user?.role === 'admin' && (
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    )}
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
      <div className="w-full p-6">
        <Outlet />
      </div>
    </main>
  </div>
</div>
  );
};
