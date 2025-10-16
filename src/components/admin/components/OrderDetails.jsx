import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { FiLayers } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';
import axiosInstance from '../../../config/axiosConfig';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import Pagination from '../../common/Pagination';

const OrderDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { operatorId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          '/admin/data/orderDetails.json'
        );
        setOrderData(response.data);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError(err.message || 'Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [operatorId]);

  const paginatedOrders =
    orderData?.orders.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ) || [];

  const getStatusBadgeClass = (status) => {
    if (status === 'In progress') {
      return 'bg-green-50 text-green-700';
    } else if (status === 'Not started') {
      return 'bg-rose-600/5 text-rose-600';
    } else if (status === 'Completed') {
      return 'bg-green-50 text-green-700';
    }
    return 'bg-gray-100 text-gray-700';
  };

  const getProgressBarColor = (progress) => {
    if (progress === 100) return 'bg-green-500';
    if (progress > 0) return 'bg-green-500';
    return 'bg-green-50';
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-white w-full flex items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-white w-full flex items-center justify-center'>
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

  return (
    <div className='min-h-screen bg-[#fafffd] w-full overflow-auto'>
      <div className='max-w-[1400px] mx-auto px-8 py-8'>
        {/* Back Button */}
        <div className='w-full mb-8'>
          <button
            onClick={() => navigate(-1)}
            className='flex justify-start items-center gap-3 text-neutral-800 hover:text-green-600 transition-colors'
          >
            <HiOutlineArrowLeft className='w-6 h-6' />
          </button>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-4 gap-6 mb-10'>
          {orderData?.stats.map((stat, index) => (
            <div
              key={index}
              className='p-5 bg-white rounded-lg border border-zinc-100 inline-flex flex-col justify-center items-center gap-2.5'
            >
              <div className='w-32 inline-flex flex-col justify-center items-center gap-2'>
                <div className='self-stretch text-center text-gray-800 text-xs font-normal font-["Lato"] leading-none'>
                  {t(
                    `dashboard.admin.orderDetails.${stat.label.replace(
                      / /g,
                      ''
                    )}`
                  )}
                </div>
                <div className='self-stretch text-center text-gray-800 text-2xl font-semibold font-["Poppins"] leading-9'>
                  {stat.value}
                </div>
                <div className='text-center text-green-500 text-xs font-normal font-["Lato"] leading-none'>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Orders Table */}
        <div className='w-full flex flex-col gap-10'>
          <div className='flex flex-col gap-1'>
            <div className='text-neutral-950 text-2xl font-semibold font-["Poppins"] leading-9'>
              {t('dashboard.admin.orderDetails.title')}
            </div>
            <div>
              <span className='text-gray-800 text-base font-normal font-["Lato"] leading-normal'>
                {t('dashboard.admin.orderDetails.subtitle')}{' '}
              </span>
              <span className='text-green-500 text-base font-normal font-["Lato"] leading-normal'>
                {orderData?.operatorName}.
              </span>
            </div>
          </div>

          <div className='w-full py-10 bg-white rounded-lg border border-zinc-100'>
            <div className='self-stretch flex flex-col justify-start items-center gap-8'>
              <div className='w-full flex flex-col'>
                {/* Table Header */}
                <div className='w-full h-14 px-4 bg-gray-50 border-t border-b border-gray-100 flex justify-between items-center'>
                  <div className='flex-1 px-3 py-4 flex justify-start items-center gap-2.5'>
                    <div className='text-neutral-950 text-base font-medium font-["Poppins"] leading-normal'>
                      {t('dashboard.admin.orderDetails.tableHeaders.service')}
                    </div>
                  </div>
                  <div className='w-28 px-3 py-4 flex justify-start items-center gap-2.5'>
                    <div className='text-neutral-950 text-base font-medium font-["Poppins"] leading-normal'>
                      {t('dashboard.admin.orderDetails.tableHeaders.status')}
                    </div>
                  </div>
                  <div className='w-36 px-3 py-4 flex justify-start items-center gap-2.5'>
                    <div className='text-neutral-950 text-base font-medium font-["Poppins"] leading-normal'>
                      {t('dashboard.admin.orderDetails.tableHeaders.rating')}
                    </div>
                  </div>
                  <div className='flex-1 px-3 py-4 flex justify-start items-center gap-2.5'>
                    <div className='text-neutral-950 text-base font-medium font-["Poppins"] leading-normal'>
                      {t('dashboard.admin.orderDetails.tableHeaders.progress')}
                    </div>
                  </div>
                  <div className='w-36 px-3 py-4 flex justify-start items-center gap-2.5'>
                    <div className='text-neutral-950 text-base font-medium font-["Poppins"] leading-normal'>
                      {t('dashboard.admin.orderDetails.tableHeaders.orderId')}
                    </div>
                  </div>
                  <div className='flex-1 px-3 py-4 flex justify-start items-center gap-2.5'>
                    <div className='text-neutral-950 text-base font-medium font-["Poppins"] leading-normal'>
                      {t('dashboard.admin.orderDetails.tableHeaders.location')}
                    </div>
                  </div>
                  <div className='w-44 px-3 py-4 flex justify-start items-center gap-2.5'>
                    <div className='text-neutral-950 text-base font-medium font-["Poppins"] leading-normal'>
                      {t('dashboard.admin.orderDetails.tableHeaders.actions')}
                    </div>
                  </div>
                </div>

                {/* Table Rows */}
                {paginatedOrders.map((order) => (
                  <div
                    key={order.id}
                    className='w-full h-14 px-4 border-b border-gray-100 flex justify-between items-center'
                  >
                    {/* Service */}
                    <div className='flex-1 px-3 py-4 flex justify-start items-center gap-2.5'>
                      <div className='text-neutral-950 text-sm font-normal font-["Lato"] leading-snug'>
                        {order.service}
                      </div>
                    </div>

                    {/* Status */}
                    <div className='w-28 px-3 py-4 flex justify-start items-center gap-2.5'>
                      <div
                        className={`h-4 p-3 rounded-lg flex justify-center items-center gap-2.5 ${getStatusBadgeClass(
                          order.status
                        )}`}
                      >
                        <div className='text-[10px] font-normal font-["Lato"] leading-none'>
                          {order.status}
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className='w-36 px-3 py-4 flex justify-start items-center gap-2.5'>
                      {order.rating ? (
                        <div className='flex justify-start items-center gap-2'>
                          <div className='w-6 h-6 relative'>
                            <AiFillStar className='w-5 h-5 absolute left-[2px] top-[2.50px] text-yellow-400' />
                          </div>
                          <div className='text-neutral-950 text-sm font-normal font-["Lato"] leading-snug'>
                            {order.rating}{' '}
                            {t('dashboard.admin.orderDetails.outOfRating')}
                          </div>
                        </div>
                      ) : (
                        <div className='text-rose-600 text-sm font-normal font-["Lato"] leading-snug'>
                          {t('dashboard.admin.orderDetails.noRating')}
                        </div>
                      )}
                    </div>

                    {/* Progress */}
                    <div className='flex-1 px-3 py-4 flex justify-start items-center gap-2.5'>
                      <div className='flex-1 flex justify-start items-center gap-2'>
                        <div className='w-28 h-1.5 bg-green-50 rounded-[50px] relative overflow-hidden'>
                          <div
                            className={`h-1.5 rounded-[50px] ${getProgressBarColor(
                              order.progress
                            )}`}
                            style={{ width: `${order.progress}%` }}
                          />
                        </div>
                        <div className='text-black text-sm font-normal font-["Plus_Jakarta_Sans"] leading-tight'>
                          {order.progress}%
                        </div>
                      </div>
                    </div>

                    {/* Order ID */}
                    <div className='w-36 px-3 py-4 flex justify-start items-center gap-2.5'>
                      <div className='text-neutral-950 text-sm font-normal font-["Lato"] leading-snug'>
                        {order.orderId}
                      </div>
                    </div>

                    {/* Location */}
                    <div className='flex-1 px-3 py-4 flex justify-start items-center gap-2.5'>
                      <div className='text-neutral-950 text-sm font-normal font-["Lato"] leading-snug'>
                        {order.location}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className='w-44 px-3 py-4 flex justify-start items-center gap-2.5'>
                      <div className='flex justify-start items-center gap-6'>
                        <button className='w-6 h-6 relative text-green-500 hover:text-green-700 transition-colors'>
                          <FiLayers className='w-6 h-6' />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Pagination */}
                <div className='w-full h-14 px-4 border-b border-gray-100 flex justify-between items-center'>
                  <div className='px-10 py-4 flex justify-start items-center gap-2.5'>
                    <div className='text-gray-800 text-sm font-normal font-["Lato"] leading-snug'>
                      {t('dashboard.admin.orderDetails.showing', {
                        count: paginatedOrders.length,
                        total: orderData?.orders.length || 0,
                      })}
                    </div>
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    totalItems={orderData?.orders.length || 0}
                    itemsPerPage={itemsPerPage}
                    onPageChange={(page) => setCurrentPage(page)}
                    showingText=''
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
