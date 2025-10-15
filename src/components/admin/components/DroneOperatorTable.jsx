import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { HiCheck, HiX } from 'react-icons/hi';

const DroneOperatorTable = ({ operators, activeSubTab }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSeeDetails = (operatorId) => {
    navigate(`/admin/drone-operators/${operatorId}`);
  };

  const handleApprove = (operatorId) => {
    console.log(`Approving operator ${operatorId}`);
    // Here you would typically call an API to update the status
  };

  const handleReject = (operatorId) => {
    console.log(`Rejecting operator ${operatorId}`);
    // Here you would typically call an API to update the status
  };

  const tableHeaders = [
    'dateTime',
    'name',
    'location',
    'registrationId',
    'actions',
  ];

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white'>
        <thead className='bg-gray-50'>
          <tr>
            {tableHeaders.map((header) => (
              <th
                key={header}
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                {t(`dashboard.admin.droneOperator.tableHeaders.${header}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {operators.length > 0 ? (
            operators.map((operator) => (
              <tr key={operator.id}>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {new Date(operator.registrationDate).toLocaleString([], {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  {operator.name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {operator.location}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {operator.registrationId}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                  <div className='flex items-center space-x-4'>
                    {activeSubTab === 'pending' && (
                      <>
                        <button
                          onClick={() => handleReject(operator.id)}
                          className='text-red-600 hover:text-red-900'
                          title='Reject'
                        >
                          <HiX className='w-5 h-5' />
                        </button>
                        <button
                          onClick={() => handleApprove(operator.id)}
                          className='text-green-600 hover:text-green-900'
                          title='Approve'
                        >
                          <HiCheck className='w-5 h-5' />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleSeeDetails(operator.id)}
                      className='px-4 py-2 bg-green-600 text-white text-xs font-semibold rounded-md hover:bg-green-700 transition'
                    >
                      {t('dashboard.admin.droneOperator.seeDetails')}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={tableHeaders.length}
                className='text-center py-10 text-gray-500'
              >
                {t('dashboard.admin.droneOperator.noOperatorsFound')}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DroneOperatorTable;
