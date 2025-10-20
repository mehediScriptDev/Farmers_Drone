import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import axiosInstance from '../../../config/axiosConfig';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import Pagination from '../../common/Pagination';

const Complaints = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [complaintsData, setComplaintsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchComplaintsData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/admin/data/complaints.json');
        setComplaintsData(response.data.complaints || []);
      } catch (err) {
        setError('Failed to fetch complaints data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaintsData();
  }, []);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return complaintsData.slice(startIndex, endIndex);
  }, [complaintsData, currentPage, itemsPerPage]);

  const handleShowDetails = (complaintId) => {
    navigate(`/admin/complaint-details/${complaintId}`, {
      state: { from: 'complaints' },
    });
  };

  if (error) {
    return <div className='text-center py-10 text-red-500'>{error}</div>;
  }

  return (
    <>
      <div className='w-full bg-[#fafffd] px-6 xl:px-11 py-3 lg:py-6'>
        <div className='mb-6'>
          <h1 className='text-2xl font-semibold text-gray-900 font-Poppins'>
            {t('complaints.title')}
          </h1>
          <p className='text-base text-gray-600 font-Lato mt-1'>
            {t('complaints.subtitle')}
          </p>
        </div>

        <div className='bg-white rounded-lg shadow-sm'>
          {loading ? (
            <div className='flex justify-center items-center h-96'>
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <div className='min-h-[448px]'>
                <table className='w-full'>
                  <thead>
                    <tr className='bg-gray-50 border-t border-b border-gray-200'>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        {t('complaints.table.customer')}
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        {t('complaints.table.complainTitle')}
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        {t('complaints.table.ticketId')}
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        {t('complaints.table.rating')}
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        {t('complaints.table.actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((complaint) => (
                        <tr key={complaint.id} className='hover:bg-gray-50'>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                            {complaint.customer}
                          </td>
                          <td className='px-6 py-4 text-sm text-gray-900'>
                            <div className='max-w-xs truncate'>
                              {complaint.complainTitle}
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                            {complaint.ticketId}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                            <div className='flex items-center gap-2'>
                              <AiFillStar className='w-5 h-5 text-yellow-400' />
                              <span>{complaint.rating}</span>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm'>
                            <button
                              onClick={() => handleShowDetails(complaint.id)}
                              className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium'
                            >
                              {t('complaints.table.seeDetails')}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan='5'
                          className='px-6 py-8 text-center text-gray-500'
                        >
                          {t('dashboard.admin.userManagement.noUsersFound')}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <Pagination
                currentPage={currentPage}
                totalItems={complaintsData.length}
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => setCurrentPage(page)}
                showingText={t('complaints.pagination.showing', {
                  count: paginatedData.length,
                  total: complaintsData.length,
                })}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Complaints;
