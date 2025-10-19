import React, { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Header } from './Header';
import { useAuth } from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import MarketingSidebar from './MarketingSidebar';
import CustomerAgentServiceSidebar from './CustomerAgentServiceSidebar';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const mainRef = useRef(null);

  useEffect(() => {
    // If the layout uses an internal scrollable main, reset it on route change
    if (mainRef.current) {
      // prefer scrollTo if available
      if (typeof mainRef.current.scrollTo === 'function') {
        mainRef.current.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      } else {
        mainRef.current.scrollTop = 0;
      }
    }
  }, [location.pathname]);

  return (
    <div className='flex flex-col h-screen'>
      <Header /> {/* Navbar at the top */}
      <div className='flex flex-1 overflow-hidden'>
        {user?.role === 'admin' && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        {user?.role === 'marketing' && (
          <MarketingSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        )}
        {user?.role === 'employee' && (
          <CustomerAgentServiceSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        )}

        {/* {user?.role === 'field_agent' && (
      <FieldSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    )} */}
        <main
          ref={mainRef}
          className='flex-1 overflow-x-hidden overflow-y-auto bg-[#fafffd]'
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};
