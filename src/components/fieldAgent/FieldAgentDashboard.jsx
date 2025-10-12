import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  HiHome,
  HiClipboardList,
  HiLocationMarker,
  HiCamera,
  HiDocumentReport,
  HiCog,
  HiLogout,
  HiMenuAlt3,
  HiX,
} from 'react-icons/hi';

const FieldAgentDashboard = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: t('fieldAgent.dashboard'), icon: HiHome },
    {
      id: 'assignments',
      label: t('fieldAgent.assignments'),
      icon: HiClipboardList,
    },
    { id: 'location', label: t('fieldAgent.location'), icon: HiLocationMarker },
    { id: 'photos', label: t('fieldAgent.photos'), icon: HiCamera },
    { id: 'reports', label: t('fieldAgent.reports'), icon: HiDocumentReport },
    { id: 'settings', label: t('fieldAgent.settings'), icon: HiCog },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold text-gray-900'>
              {t('fieldAgent.welcome')}
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <div className='bg-white p-6 rounded-lg shadow'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  {t('fieldAgent.todayAssignments')}
                </h3>
                <p className='text-3xl font-bold text-blue-600'>8</p>
              </div>
              <div className='bg-white p-6 rounded-lg shadow'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  {t('fieldAgent.completedTasks')}
                </h3>
                <p className='text-3xl font-bold text-green-600'>5</p>
              </div>
              <div className='bg-white p-6 rounded-lg shadow'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  {t('fieldAgent.pendingTasks')}
                </h3>
                <p className='text-3xl font-bold text-yellow-600'>3</p>
              </div>
            </div>
          </div>
        );
      case 'assignments':
        return (
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold text-gray-900'>
              {t('fieldAgent.myAssignments')}
            </h2>
            <div className='bg-white rounded-lg shadow overflow-hidden'>
              <div className='p-6'>
                <div className='space-y-4'>
                  <div className='border-l-4 border-blue-500 pl-4'>
                    <h3 className='font-semibold text-gray-900'>
                      {t('fieldAgent.visitClient')}
                    </h3>
                    <p className='text-gray-600'>
                      {t('fieldAgent.clientAddress')}
                    </p>
                    <span className='inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-2'>
                      {t('fieldAgent.pending')}
                    </span>
                  </div>
                  <div className='border-l-4 border-green-500 pl-4'>
                    <h3 className='font-semibold text-gray-900'>
                      {t('fieldAgent.surveyArea')}
                    </h3>
                    <p className='text-gray-600'>
                      {t('fieldAgent.surveyLocation')}
                    </p>
                    <span className='inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-2'>
                      {t('fieldAgent.completed')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'location':
        return (
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold text-gray-900'>
              {t('fieldAgent.locationTracking')}
            </h2>
            <div className='bg-white p-6 rounded-lg shadow'>
              <p className='text-gray-600 mb-4'>
                {t('fieldAgent.currentLocation')}
              </p>
              <div className='bg-gray-100 h-64 flex items-center justify-center rounded-lg'>
                <p className='text-gray-500'>
                  {t('fieldAgent.mapPlaceholder')}
                </p>
              </div>
            </div>
          </div>
        );
      case 'photos':
        return (
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold text-gray-900'>
              {t('fieldAgent.photoGallery')}
            </h2>
            <div className='bg-white p-6 rounded-lg shadow'>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className='bg-gray-200 aspect-square rounded-lg flex items-center justify-center'
                  >
                    <HiCamera className='w-8 h-8 text-gray-400' />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold text-gray-900'>
              {t('fieldAgent.fieldReports')}
            </h2>
            <div className='bg-white rounded-lg shadow overflow-hidden'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      {t('fieldAgent.reportDate')}
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      {t('fieldAgent.reportType')}
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      {t('fieldAgent.status')}
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  <tr>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      2024-01-15
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {t('fieldAgent.siteVisit')}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                        {t('fieldAgent.submitted')}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold text-gray-900'>
              {t('fieldAgent.settings')}
            </h2>
            <div className='bg-white p-6 rounded-lg shadow'>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    {t('fieldAgent.notificationSettings')}
                  </label>
                  <div className='space-y-2'>
                    <label className='flex items-center'>
                      <input
                        type='checkbox'
                        defaultChecked
                        className='rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
                      />
                      <span className='ml-2 text-sm text-gray-600'>
                        {t('fieldAgent.emailNotifications')}
                      </span>
                    </label>
                    <label className='flex items-center'>
                      <input
                        type='checkbox'
                        defaultChecked
                        className='rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
                      />
                      <span className='ml-2 text-sm text-gray-600'>
                        {t('fieldAgent.pushNotifications')}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>{t('common.pageNotFound')}</div>;
    }
  };

  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Sidebar */}
      <div
        className={`bg-white shadow-lg transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out fixed lg:static inset-y-0 left-0 z-50 w-64 overflow-y-auto`}
      >
        <div className='flex items-center justify-between h-16 px-6 border-b border-gray-200'>
          <h1 className='text-xl font-bold text-gray-900'>
            {t('fieldAgent.fieldAgent')}
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className='lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          >
            <HiX className='w-6 h-6' />
          </button>
        </div>

        <nav className='mt-6'>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 ${
                  activeSection === item.id
                    ? 'bg-blue-50 border-r-2 border-blue-500 text-blue-600'
                    : 'text-gray-600'
                }`}
              >
                <Icon className='w-5 h-5 mr-3' />
                {item.label}
              </button>
            );
          })}

          <button className='w-full flex items-center px-6 py-3 text-left text-red-600 hover:bg-red-50 mt-4'>
            <HiLogout className='w-5 h-5 mr-3' />
            {t('common.logout')}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Top bar */}
        <header className='bg-white shadow-sm border-b border-gray-200 lg:hidden'>
          <div className='flex items-center justify-between px-6 py-4'>
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className='p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              >
                <HiMenuAlt3 className='w-6 h-6' />
              </button>
            )}
            <h1 className='text-lg font-semibold text-gray-900'>
              {t('fieldAgent.fieldAgent')}
            </h1>
            <div className='w-10'></div>
          </div>
        </header>

        {/* Main content area */}
        <main className='flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6'>
          {renderContent()}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40'
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default FieldAgentDashboard;
