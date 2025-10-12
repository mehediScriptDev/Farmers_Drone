import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  HiHome,
  HiSpeakerphone,
  HiChartBar,
  HiUsers,
  HiMail,
  HiCog,
  HiLogout,
  HiMenuAlt3,
  HiX,
} from 'react-icons/hi';

const MarketingDashboard = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: t('marketing.dashboard'), icon: HiHome },
    { id: 'campaigns', label: t('marketing.campaigns'), icon: HiSpeakerphone },
    { id: 'analytics', label: t('marketing.analytics'), icon: HiChartBar },
    { id: 'leads', label: t('marketing.leads'), icon: HiUsers },
    { id: 'email', label: t('marketing.email'), icon: HiMail },
    { id: 'settings', label: t('marketing.settings'), icon: HiCog },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold text-gray-900'>
              {t('marketing.welcome')}
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              <div className='bg-white p-6 rounded-lg shadow'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  {t('marketing.activeCampaigns')}
                </h3>
                <p className='text-3xl font-bold text-blue-600'>12</p>
              </div>
              <div className='bg-white p-6 rounded-lg shadow'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  {t('marketing.totalLeads')}
                </h3>
                <p className='text-3xl font-bold text-green-600'>245</p>
              </div>
              <div className='bg-white p-6 rounded-lg shadow'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  {t('marketing.conversionRate')}
                </h3>
                <p className='text-3xl font-bold text-purple-600'>15.3%</p>
              </div>
              <div className='bg-white p-6 rounded-lg shadow'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  {t('marketing.revenue')}
                </h3>
                <p className='text-3xl font-bold text-yellow-600'>₹2.5L</p>
              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div className='bg-white p-6 rounded-lg shadow'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                  {t('marketing.recentCampaigns')}
                </h3>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>
                      {t('marketing.summerSale')}
                    </span>
                    <span className='px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800'>
                      {t('marketing.active')}
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>
                      {t('marketing.newProduct')}
                    </span>
                    <span className='px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800'>
                      {t('marketing.scheduled')}
                    </span>
                  </div>
                </div>
              </div>

              <div className='bg-white p-6 rounded-lg shadow'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                  {t('marketing.topPerforming')}
                </h3>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>
                      {t('marketing.emailMarketing')}
                    </span>
                    <span className='text-green-600 font-semibold'>25.6%</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>
                      {t('marketing.socialMedia')}
                    </span>
                    <span className='text-green-600 font-semibold'>18.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'campaigns':
        return (
          <div className='space-y-6'>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-bold text-gray-900'>
                {t('marketing.campaignManagement')}
              </h2>
              <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'>
                {t('marketing.createCampaign')}
              </button>
            </div>
            <div className='bg-white rounded-lg shadow overflow-hidden'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      {t('marketing.campaignName')}
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      {t('marketing.type')}
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      {t('marketing.status')}
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      {t('marketing.performance')}
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  <tr>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {t('marketing.summerSale')}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {t('marketing.email')}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                        {t('marketing.active')}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      25.6%
                    </td>
                  </tr>
                  <tr>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {t('marketing.newProduct')}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {t('marketing.social')}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800'>
                        {t('marketing.scheduled')}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      --
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold text-gray-900'>
              {t('marketing.marketingAnalytics')}
            </h2>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div className='bg-white p-6 rounded-lg shadow'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                  {t('marketing.trafficSources')}
                </h3>
                <div className='bg-gray-100 h-64 flex items-center justify-center rounded-lg'>
                  <p className='text-gray-500'>
                    {t('marketing.chartPlaceholder')}
                  </p>
                </div>
              </div>
              <div className='bg-white p-6 rounded-lg shadow'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                  {t('marketing.conversionFunnel')}
                </h3>
                <div className='bg-gray-100 h-64 flex items-center justify-center rounded-lg'>
                  <p className='text-gray-500'>
                    {t('marketing.chartPlaceholder')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'leads':
        return (
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold text-gray-900'>
              {t('marketing.leadManagement')}
            </h2>
            <div className='bg-white rounded-lg shadow overflow-hidden'>
              <div className='p-6 border-b border-gray-200'>
                <div className='flex space-x-4'>
                  <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
                    {t('marketing.allLeads')}
                  </button>
                  <button className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300'>
                    {t('marketing.newLeads')}
                  </button>
                  <button className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300'>
                    {t('marketing.qualified')}
                  </button>
                </div>
              </div>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      {t('marketing.leadName')}
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      {t('marketing.source')}
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      {t('marketing.score')}
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      {t('marketing.status')}
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  <tr>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      Rahul Sharma
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {t('marketing.website')}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      85/100
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'>
                        {t('marketing.contacted')}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'email':
        return (
          <div className='space-y-6'>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-bold text-gray-900'>
                {t('marketing.emailMarketing')}
              </h2>
              <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'>
                {t('marketing.createEmail')}
              </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='bg-white p-6 rounded-lg shadow'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  {t('marketing.sentEmails')}
                </h3>
                <p className='text-3xl font-bold text-blue-600'>1,234</p>
              </div>
              <div className='bg-white p-6 rounded-lg shadow'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  {t('marketing.openRate')}
                </h3>
                <p className='text-3xl font-bold text-green-600'>24.5%</p>
              </div>
              <div className='bg-white p-6 rounded-lg shadow'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  {t('marketing.clickRate')}
                </h3>
                <p className='text-3xl font-bold text-purple-600'>3.2%</p>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold text-gray-900'>
              {t('marketing.settings')}
            </h2>
            <div className='bg-white p-6 rounded-lg shadow'>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    {t('marketing.defaultCampaignSettings')}
                  </label>
                  <div className='space-y-2'>
                    <label className='flex items-center'>
                      <input
                        type='checkbox'
                        defaultChecked
                        className='rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
                      />
                      <span className='ml-2 text-sm text-gray-600'>
                        {t('marketing.autoOptimize')}
                      </span>
                    </label>
                    <label className='flex items-center'>
                      <input
                        type='checkbox'
                        defaultChecked
                        className='rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
                      />
                      <span className='ml-2 text-sm text-gray-600'>
                        {t('marketing.trackConversions')}
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
            {t('marketing.marketing')}
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
              {t('marketing.marketing')}
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

export default MarketingDashboard;
