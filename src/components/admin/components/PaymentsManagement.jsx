import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  HiOutlineChartBar,
  HiOutlineUserGroup,
  HiOutlineUser,
} from 'react-icons/hi';
import { BsCurrencyDollar } from 'react-icons/bs';
import axiosInstance from '../../../config/axiosConfig';
import { LoadingSpinner } from '../../common/LoadingSpinner';

const PaymentsManagement = () => {
  const { t } = useTranslation();
  const [paymentsData, setPaymentsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchPaymentsData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/admin/data/payments.json');
        setPaymentsData(response.data);
      } catch (err) {
        console.error('Error fetching payments:', err);
        setError(err.message || 'Failed to load payments data');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentsData();
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen bg-[#fafffd] w-full flex items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-[#fafffd] w-full flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-red-600 mb-4'>Error: {error}</p>
          <button
            className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    {
      id: 'overview',
      label: t('dashboard.admin.paymentsManagement.tabs.overview'),
      icon: HiOutlineChartBar,
    },
    {
      id: 'customerPayments',
      label: t('dashboard.admin.paymentsManagement.tabs.customerPayments'),
      icon: HiOutlineUserGroup,
    },
    {
      id: 'operatorPayments',
      label: t('dashboard.admin.paymentsManagement.tabs.operatorPayments'),
      icon: HiOutlineUser,
    },
  ];

  return (
    <div className='min-h-screen bg-[#fafffd] w-full overflow-auto'>
      <div className='w-full px-6 xl:px-11 py-3 lg:py-6'>
        {/* Header Section */}
        <div className='w-[482px] mb-8 flex flex-col gap-1'>
          <div className='text-neutral-950 text-2xl font-semibold font-["Poppins"] leading-9'>
            {t('dashboard.admin.paymentsManagement.title')}
          </div>
          <div className='text-gray-800 text-base font-normal font-["Lato"] leading-normal'>
            {t('dashboard.admin.paymentsManagement.subtitle')}
          </div>
        </div>

        {/* Tabs */}
        <div className='w-full border-t border-b border-gray-100 flex gap-5 mb-8'>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-b-2 border-green-500 shadow-[0px_8px_24px_0px_rgba(149,157,165,0.20)]'
                    : ''
                }`}
              >
                <Icon
                  className={`w-6 h-6 ${
                    activeTab === tab.id ? 'text-neutral-950' : 'text-gray-700'
                  }`}
                />
                <div
                  className={`text-base font-medium font-["Poppins"] leading-normal ${
                    activeTab === tab.id ? 'text-neutral-950' : 'text-gray-700'
                  }`}
                >
                  {tab.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Stats Cards */}
        {activeTab === 'overview' && (
          <div className='grid grid-cols-3 gap-6'>
            {/* Revenue Card */}
            <div className='flex-1 p-5 bg-white rounded-lg border border-zinc-100 flex flex-col gap-2.5'>
              <div className='w-full flex justify-between items-center'>
                <div className='w-32 flex flex-col gap-2'>
                  <div className='text-gray-800 text-xs font-normal font-["Lato"] leading-none'>
                    {t('dashboard.admin.paymentsManagement.stats.revenue')}
                  </div>
                  <div className='text-gray-800 text-2xl font-semibold font-["Poppins"] leading-9'>
                    {paymentsData?.overview?.revenue?.value}
                  </div>
                  <div className='text-green-500 text-xs font-normal font-["Lato"] leading-none'>
                    {paymentsData?.overview?.revenue?.change}
                  </div>
                </div>
                <div className='w-10 h-10 p-2 bg-green-50 rounded-lg flex items-center justify-center'>
                  <BsCurrencyDollar className='w-6 h-6 text-neutral-700' />
                </div>
              </div>
            </div>

            {/* Active Integrations Card */}
            <div className='flex-1 p-5 bg-white rounded-lg border border-zinc-100 flex flex-col gap-2.5'>
              <div className='w-full flex justify-start items-center gap-7'>
                <div className='w-32 flex flex-col gap-2'>
                  <div className='text-gray-800 text-xs font-normal font-["Lato"] leading-none'>
                    {t(
                      'dashboard.admin.paymentsManagement.stats.activeIntegrations'
                    )}
                  </div>
                  <div className='text-gray-800 text-2xl font-semibold font-["Poppins"] leading-9'>
                    {paymentsData?.overview?.activeIntegrations?.value}
                  </div>
                  <div className='text-green-500 text-xs font-normal font-["Lato"] leading-none'>
                    {paymentsData?.overview?.activeIntegrations?.change}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods Card */}
            <div className='flex-1 p-5 bg-white rounded-lg border border-zinc-100 flex flex-col justify-center gap-2.5'>
              <div className='w-full flex justify-start items-center gap-7'>
                <div className='w-32 flex flex-col gap-2'>
                  <div className='text-gray-800 text-xs font-normal font-["Lato"] leading-none'>
                    {t(
                      'dashboard.admin.paymentsManagement.stats.paymentMethods'
                    )}
                  </div>
                  <div className='text-gray-800 text-2xl font-semibold font-["Poppins"] leading-9'>
                    {paymentsData?.overview?.paymentMethods?.value}
                  </div>
                  <div className='text-green-500 text-xs font-normal font-["Lato"] leading-none'>
                    {paymentsData?.overview?.paymentMethods?.change}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Customer Payments Tab Content */}
        {activeTab === 'customerPayments' && (
          <div className='bg-white rounded-lg border border-zinc-100 p-8'>
            <h3 className='text-xl font-semibold font-["Poppins"] text-neutral-950 mb-4'>
              Customer Payments
            </h3>
            <p className='text-gray-600 font-["Lato"]'>
              Customer payment details will be displayed here.
            </p>
          </div>
        )}

        {/* Operator Payments Tab Content */}
        {activeTab === 'operatorPayments' && (
          <div className='bg-white rounded-lg border border-zinc-100 p-8'>
            <h3 className='text-xl font-semibold font-["Poppins"] text-neutral-950 mb-4'>
              Operator Payments
            </h3>
            <p className='text-gray-600 font-["Lato"]'>
              Operator payment details will be displayed here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsManagement;
