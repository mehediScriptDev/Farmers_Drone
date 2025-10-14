import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../common/Header';
import Sidebar from './SideBar';


export const MarketingDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Header />
        <main className='flex-1 overflow-x-hidden overflow-y-auto'>
          <div className=''>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
