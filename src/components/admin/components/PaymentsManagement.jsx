import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  HiOutlineChartBar,
  HiOutlineUserGroup,
  HiOutlineUser,
} from 'react-icons/hi';
import { BsCurrencyDollar } from 'react-icons/bs';
import axiosInstance from '../../../config/axiosConfig';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import Pagination from '../../common/Pagination';

const PaymentsManagement = () => {
  const { t } = useTranslation();
  const [paymentsData, setPaymentsData] = useState(null);
  const [customerPaymentsData, setCustomerPaymentsData] = useState([]);
  const [operatorPaymentsData, setOperatorPaymentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentPage, setCurrentPage] = useState(1);
  const [operatorCurrentPage, setOperatorCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  useEffect(() => {
    if (activeTab === 'customerPayments') {
      setCurrentPage(1); // Reset to page 1 when switching to this tab
      const fetchCustomerPayments = async () => {
        try {
          const response = await axiosInstance.get(
            '/admin/data/customerPayments.json'
          );
          setCustomerPaymentsData(response.data.transactions || []);
        } catch (err) {
          console.error('Error fetching customer payments:', err);
        }
      };
      fetchCustomerPayments();
    } else if (activeTab === 'operatorPayments') {
      setOperatorCurrentPage(1); // Reset to page 1 when switching to this tab
      const fetchOperatorPayments = async () => {
        try {
          const response = await axiosInstance.get(
            '/admin/data/operatorPayments.json'
          );
          setOperatorPaymentsData(response.data.transactions || []);
        } catch (err) {
          console.error('Error fetching operator payments:', err);
        }
      };
      fetchOperatorPayments();
    }
  }, [activeTab]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return customerPaymentsData.slice(startIndex, startIndex + itemsPerPage);
  }, [customerPaymentsData, currentPage, itemsPerPage]);

  const paginatedOperatorTransactions = useMemo(() => {
    const startIndex = (operatorCurrentPage - 1) * itemsPerPage;
    return operatorPaymentsData.slice(startIndex, startIndex + itemsPerPage);
  }, [operatorPaymentsData, operatorCurrentPage, itemsPerPage]);

  const getStatusBadgeClass = (status) => {
    if (status === 'Done') {
      return 'bg-green-50 text-green-700';
    } else if (status === 'Failed') {
      return 'bg-rose-600/5 text-rose-600';
    }
    return 'bg-gray-100 text-gray-700';
  };

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
          <div className='bg-white rounded-lg border border-zinc-100'>
            {customerPaymentsData.length === 0 ? (
              <div className='p-8 text-center text-gray-600'>
                Loading customer payment data...
              </div>
            ) : (
              <>
                <div className='overflow-x-auto'>
                  <table className='w-full table-fixed'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th
                          scope='col'
                          className='w-[20%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
                        >
                          {t(
                            'dashboard.admin.paymentsManagement.customerPayments.tableHeaders.userName'
                          )}
                        </th>
                        <th
                          scope='col'
                          className='w-[25%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
                        >
                          {t(
                            'dashboard.admin.paymentsManagement.customerPayments.tableHeaders.paymentMethod'
                          )}
                        </th>
                        <th
                          scope='col'
                          className='w-[15%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
                        >
                          {t(
                            'dashboard.admin.paymentsManagement.customerPayments.tableHeaders.status'
                          )}
                        </th>
                        <th
                          scope='col'
                          className='w-[15%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
                        >
                          {t(
                            'dashboard.admin.paymentsManagement.customerPayments.tableHeaders.transactions'
                          )}
                        </th>
                        <th
                          scope='col'
                          className='w-[25%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
                        >
                          {t(
                            'dashboard.admin.paymentsManagement.customerPayments.tableHeaders.dateTime'
                          )}
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                      {paginatedTransactions.map((transaction) => (
                        <tr key={transaction.id} className='hover:bg-gray-50'>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 font-["Lato"]'>
                            {transaction.userName}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex flex-col gap-1'>
                              <span className='text-neutral-950 text-base font-medium font-["Poppins"] leading-normal'>
                                {transaction.paymentMethod}{' '}
                                <span className='text-green-500 text-xs font-normal font-["Lato"] leading-none'>
                                  ({transaction.paymentType})
                                </span>
                              </span>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <span
                              className={`inline-flex px-3 py-1 text-[10px] font-normal font-["Lato"] leading-none rounded-lg ${getStatusBadgeClass(
                                transaction.status
                              )}`}
                            >
                              {transaction.status}
                            </span>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 font-["Lato"]'>
                            {transaction.transactions}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 font-["Lato"]'>
                            {transaction.dateTime}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className='px-6 py-4 border-t border-gray-200 flex justify-between items-center'>
                  <div className='text-sm text-gray-700 font-["Lato"]'>
                    {t(
                      'dashboard.admin.paymentsManagement.customerPayments.showing',
                      {
                        count: paginatedTransactions.length,
                        total: customerPaymentsData.length,
                      }
                    )}
                  </div>
                  <div className='flex items-center space-x-1'>
                    <button
                      onClick={() =>
                        currentPage > 1 && setCurrentPage(currentPage - 1)
                      }
                      className='px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>

                    {Array.from(
                      {
                        length: Math.ceil(
                          customerPaymentsData.length / itemsPerPage
                        ),
                      },
                      (_, i) => i + 1
                    )
                      .slice(
                        Math.max(0, currentPage - 1),
                        Math.min(
                          currentPage + 1,
                          Math.ceil(customerPaymentsData.length / itemsPerPage)
                        )
                      )
                      .map((page) => (
                        <button
                          key={page}
                          className={`px-3 py-2 text-sm font-medium rounded ${
                            currentPage === page
                              ? 'bg-green-500 text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      ))}

                    <button
                      onClick={() =>
                        currentPage <
                          Math.ceil(
                            customerPaymentsData.length / itemsPerPage
                          ) && setCurrentPage(currentPage + 1)
                      }
                      className='px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'
                      disabled={
                        currentPage ===
                        Math.ceil(customerPaymentsData.length / itemsPerPage)
                      }
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Operator Payments Tab Content */}
        {activeTab === 'operatorPayments' && (
          <div className='bg-white rounded-lg border border-zinc-100'>
            {operatorPaymentsData.length === 0 ? (
              <div className='p-8 text-center text-gray-600'>
                Loading operator payment data...
              </div>
            ) : (
              <>
                <div className='overflow-x-auto'>
                  <table className='w-full table-fixed'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th
                          scope='col'
                          className='w-[20%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
                        >
                          {t(
                            'dashboard.admin.paymentsManagement.operatorPayments.tableHeaders.serviceProvider'
                          )}
                        </th>
                        <th
                          scope='col'
                          className='w-[25%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
                        >
                          {t(
                            'dashboard.admin.paymentsManagement.operatorPayments.tableHeaders.paymentMethod'
                          )}
                        </th>
                        <th
                          scope='col'
                          className='w-[15%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
                        >
                          {t(
                            'dashboard.admin.paymentsManagement.operatorPayments.tableHeaders.status'
                          )}
                        </th>
                        <th
                          scope='col'
                          className='w-[15%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
                        >
                          {t(
                            'dashboard.admin.paymentsManagement.operatorPayments.tableHeaders.payouts'
                          )}
                        </th>
                        <th
                          scope='col'
                          className='w-[25%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
                        >
                          {t(
                            'dashboard.admin.paymentsManagement.operatorPayments.tableHeaders.dateTime'
                          )}
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                      {paginatedOperatorTransactions.map((transaction) => (
                        <tr key={transaction.id} className='hover:bg-gray-50'>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 font-["Lato"]'>
                            {transaction.serviceProvider}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex flex-col gap-1'>
                              <span className='text-neutral-950 text-base font-medium font-["Poppins"] leading-normal'>
                                {transaction.paymentMethod}{' '}
                                <span className='text-green-500 text-xs font-normal font-["Lato"] leading-none'>
                                  ({transaction.paymentType})
                                </span>
                              </span>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <span
                              className={`inline-flex px-3 py-1 text-[10px] font-normal font-["Lato"] leading-none rounded-lg ${getStatusBadgeClass(
                                transaction.status
                              )}`}
                            >
                              {transaction.status}
                            </span>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 font-["Lato"]'>
                            {transaction.payouts}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900 font-["Lato"]'>
                            {transaction.dateTime}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className='px-6 py-4 border-t border-gray-200 flex justify-between items-center'>
                  <div className='text-sm text-gray-700 font-["Lato"]'>
                    {t(
                      'dashboard.admin.paymentsManagement.operatorPayments.showing',
                      {
                        count: paginatedOperatorTransactions.length,
                        total: operatorPaymentsData.length,
                      }
                    )}
                  </div>
                  <div className='flex items-center space-x-1'>
                    <button
                      onClick={() =>
                        operatorCurrentPage > 1 &&
                        setOperatorCurrentPage(operatorCurrentPage - 1)
                      }
                      className='px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'
                      disabled={operatorCurrentPage === 1}
                    >
                      Previous
                    </button>

                    {Array.from(
                      {
                        length: Math.ceil(
                          operatorPaymentsData.length / itemsPerPage
                        ),
                      },
                      (_, i) => i + 1
                    )
                      .slice(
                        Math.max(0, operatorCurrentPage - 1),
                        Math.min(
                          operatorCurrentPage + 1,
                          Math.ceil(operatorPaymentsData.length / itemsPerPage)
                        )
                      )
                      .map((page) => (
                        <button
                          key={page}
                          className={`px-3 py-2 text-sm font-medium rounded ${
                            operatorCurrentPage === page
                              ? 'bg-green-500 text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          onClick={() => setOperatorCurrentPage(page)}
                        >
                          {page}
                        </button>
                      ))}

                    <button
                      onClick={() =>
                        operatorCurrentPage <
                          Math.ceil(
                            operatorPaymentsData.length / itemsPerPage
                          ) && setOperatorCurrentPage(operatorCurrentPage + 1)
                      }
                      className='px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'
                      disabled={
                        operatorCurrentPage ===
                        Math.ceil(operatorPaymentsData.length / itemsPerPage)
                      }
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsManagement;
