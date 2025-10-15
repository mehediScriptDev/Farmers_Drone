import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { RiDashboardLine } from 'react-icons/ri';
import { PiUsersThreeBold } from 'react-icons/pi';
import { FiShoppingCart } from 'react-icons/fi';
import { FaRegCreditCard } from 'react-icons/fa';
import { LuHeadset } from 'react-icons/lu';
import { LuMessageCircle } from 'react-icons/lu';

const EmployeeSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: 'dashboard',
      label: t('sidebar.employee.dashboard'),
      icon: RiDashboardLine,
      path: '',
    },
    {
      id: 'customer',
      label: t('sidebar.employee.customer'),
      icon: PiUsersThreeBold,
      path: 'customers',
    },
    {
      id: 'orders',
      label: t('sidebar.employee.orders'),
      icon: FiShoppingCart,
      path: 'orders',
    },
    {
      id: 'payments',
      label: t('sidebar.employee.payments'),
      icon: FaRegCreditCard,
      path: 'payments',
    },
    {
      id: 'support',
      label: t('sidebar.employee.support'),
      icon: LuHeadset,
      path: 'supports',
    },
    {
      id: 'message',
      label: 'Message',
      icon: LuMessageCircle,
      path: 'messages',
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
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
        className={`bg-[#F5F7FA] shadow-lg transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out fixed lg:static inset-y-0 xl:pt-2 left-0 z-50 w-[304px] pt-10 lg:pt-0 xl:pl-9 overflow-y-auto`}
      >
        <div className='flex flex-col h-full'>
          {/* manual close btn */}
                              <button
                                onClick={() => setSidebarOpen(false)}
                                className="absolute top-4 right-3 rounded-full lg:hidden"
                              >
                                <HiX className="w-7 h-7 text-gray-700" />
                              </button>
          <button
            onClick={() => setSidebarOpen(false)}
            className='absolute top-4 right-3 rounded-full lg:hidden'
          >
            <HiX className='w-5 h-5 text-gray-700' />
          </button>
          {/* Menu Items */}
          <nav className='flex-1 px-3 py-4 overflow-y-auto'>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const pathSegments = location.pathname.split('/').filter(Boolean);
              const currentPath = pathSegments[pathSegments.length - 1] || '';
              const isActive =
                (item.path === '' && pathSegments.length === 1) || // Dashboard index route
                currentPath === item.path;

              return (
                <button
                  key={item.id}
                  type='button'
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg mb-1 transition-all duration-300 ${
                    isActive
                      ? 'bg-white border-l-4 border-green-600 font-semibold shadow-sm'
                      : 'text-black hover:bg-gray-50 border-l-4 border-transparent'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? 'text-green-600' : 'text-gray-500'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 z-30 bg-black/40 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default EmployeeSidebar;
