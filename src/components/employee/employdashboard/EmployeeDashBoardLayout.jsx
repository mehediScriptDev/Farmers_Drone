import React, { useState } from 'react'
import Sidebar from './components/Sidebar';
import { Header } from '../../common/Header';
import { Outlet } from 'react-router-dom';

const EmployeeDashBoardLayout = () => {
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
  )
}

export default EmployeeDashBoardLayout
