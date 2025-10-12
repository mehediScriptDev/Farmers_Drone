import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  HiHome,
  HiOutlineClipboardCheck,
  HiOutlineCalendar,
  HiOutlineDocumentText,
  HiOutlineUser,
  HiOutlineChatAlt,
  HiOutlineAcademicCap,
  HiMenuAlt3,
  HiX,
} from 'react-icons/hi';

// Import employee components
import MyTasks from './MyTasks';
import Schedule from './Schedule';
import Reports from './Reports';
import Profile from './Profile';
import Messages from './Messages';
import Training from './Training';

const EmployeeDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useTranslation();

  const menuItems = [
    { id: 'dashboard', label: t('navigation.dashboard'), icon: HiHome },
    {
      id: 'my-tasks',
      label: t('sidebar.employee.myTasks'),
      icon: HiOutlineClipboardCheck,
    },
    {
      id: 'schedule',
      label: t('sidebar.employee.schedule'),
      icon: HiOutlineCalendar,
    },
    {
      id: 'reports',
      label: t('sidebar.employee.reports'),
      icon: HiOutlineDocumentText,
    },
    {
      id: 'profile',
      label: t('sidebar.employee.profile'),
      icon: HiOutlineUser,
    },
    {
      id: 'messages',
      label: t('sidebar.employee.messages'),
      icon: HiOutlineChatAlt,
    },
    {
      id: 'training',
      label: t('sidebar.employee.training'),
      icon: HiOutlineAcademicCap,
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className='min-h-screen bg-gray-50 w-full'>
            <div className='w-full px-4 sm:px-6 lg:px-8 py-6'>
              {/* Header Section */}
              <div className='bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8'>
                <div className='flex items-center justify-between flex-wrap gap-4'>
                  <div className='flex items-center'>
                    <div className='bg-sky-100 p-3 rounded-lg mr-4'>
                      <HiHome className='w-8 h-8 text-sky-600' />
                    </div>
                    <div>
                      <h1 className='text-2xl sm:text-3xl font-bold text-gray-900'>
                        Employee Dashboard
                      </h1>
                      <p className='text-gray-600 mt-1'>
                        Your personal workspace and company resources
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span className='bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm font-medium'>
                      Employee
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                <div className='bg-white p-6 rounded-xl shadow-sm'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium text-gray-600'>
                        Tasks Completed
                      </p>
                      <p className='text-2xl font-bold text-gray-900'>18/25</p>
                    </div>
                    <div className='bg-blue-100 p-3 rounded-lg'>
                      <HiOutlineClipboardCheck className='w-6 h-6 text-blue-600' />
                    </div>
                  </div>
                </div>

                <div className='bg-white p-6 rounded-xl shadow-sm'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium text-gray-600'>
                        This Week Hours
                      </p>
                      <p className='text-2xl font-bold text-gray-900'>38.5</p>
                    </div>
                    <div className='bg-green-100 p-3 rounded-lg'>
                      <HiOutlineCalendar className='w-6 h-6 text-green-600' />
                    </div>
                  </div>
                </div>

                <div className='bg-white p-6 rounded-xl shadow-sm'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium text-gray-600'>
                        Pending Reports
                      </p>
                      <p className='text-2xl font-bold text-gray-900'>3</p>
                    </div>
                    <div className='bg-yellow-100 p-3 rounded-lg'>
                      <HiOutlineDocumentText className='w-6 h-6 text-yellow-600' />
                    </div>
                  </div>
                </div>

                <div className='bg-white p-6 rounded-xl shadow-sm'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium text-gray-600'>
                        Unread Messages
                      </p>
                      <p className='text-2xl font-bold text-gray-900'>7</p>
                    </div>
                    <div className='bg-purple-100 p-3 rounded-lg'>
                      <HiOutlineChatAlt className='w-6 h-6 text-purple-600' />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Grid */}
              <div className='bg-white rounded-xl shadow-sm p-6'>
                <h2 className='text-xl font-bold text-gray-900 mb-4'>
                  Welcome to Your Dashboard
                </h2>
                <p className='text-gray-600'>
                  Use the sidebar to navigate between different sections of your
                  employee portal.
                </p>
              </div>
            </div>
          </div>
        );
      case 'my-tasks':
        return <MyTasks />;
      case 'schedule':
        return <Schedule />;
      case 'reports':
        return <Reports />;
      case 'profile':
        return <Profile />;
      case 'messages':
        return <Messages />;
      case 'training':
        return <Training />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Mobile menu button - only show when sidebar is closed */}
      {!sidebarOpen && (
        <div className='lg:hidden fixed top-4 left-4 z-50'>
          <button
            onClick={() => setSidebarOpen(true)}
            className='bg-white p-3 rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-200 border border-gray-200'
          >
            <HiMenuAlt3 className='w-5 h-5 text-gray-700' />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        <div className='flex flex-col h-full'>
          {/* Logo */}
          <div className='flex items-center justify-between h-16 px-4 border-b border-gray-200'>
            <div className='flex items-center min-w-0 flex-1'>
              <div className='w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0'>
                <span className='text-white font-bold text-sm'>P</span>
              </div>
              <h1 className='text-base font-semibold text-gray-900 truncate'>
                {t('sidebar.prasadDashboard')}
              </h1>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className='lg:hidden p-2 rounded-md hover:bg-gray-100 ml-4 flex-shrink-0'
            >
              <HiX className='w-5 h-5 text-gray-500' />
            </button>
          </div>

          {/* Navigation */}
          <nav className='flex-1 px-4 py-6 space-y-2 overflow-y-auto'>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200
                    ${
                      activeSection === item.id
                        ? 'bg-sky-50 text-sky-700 border-r-2 border-sky-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className='w-5 h-5 mr-3' />
                  <span className='font-medium'>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className='flex-1 flex flex-col overflow-hidden lg:ml-0'>
        {/* Mobile header spacer */}
        <div className='lg:hidden h-20'></div>
        <main className='flex-1 overflow-x-hidden overflow-y-auto bg-gray-100'>
          <div className='min-h-full'>{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
