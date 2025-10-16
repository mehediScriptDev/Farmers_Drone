import React from 'react';
import { useTranslation } from 'react-i18next';
import { HiCheck, HiX } from 'react-icons/hi';

const DroneOperatorTable = ({
  operators,
  activeSubTab,
  onShowDetails,
  onApprove,
  onReject,
}) => {
  const { t } = useTranslation();

  return (
    <div className='overflow-x-auto'>
      {/* Change 1: Simplified classes to ensure it takes full width */}
      <table className='w-full table-fixed'>
        <thead className='bg-gray-50'>
          <tr>
            <th
              scope='col'
              className='w-[20%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
            >
              {t('dashboard.admin.droneOperator.tableHeaders.dateTime')}
            </th>
            <th
              scope='col'
              className='w-[20%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
            >
              {t('dashboard.admin.droneOperator.tableHeaders.name')}
            </th>
            <th
              scope='col'
              className='w-[25%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
            >
              {t('dashboard.admin.droneOperator.tableHeaders.location')}
            </th>
            <th
              scope='col'
              className='w-[15%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
            >
              {t('dashboard.admin.droneOperator.tableHeaders.registrationId')}
            </th>
            {/* Change 2: Set header text to center to match its content */}
            <th
              scope='col'
              className='w-[20%] px-6 py-3 text-center text-sm font-bold text-gray-700 uppercase tracking-wider'
            >
              {t('dashboard.admin.droneOperator.tableHeaders.actions')}
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {operators.length > 0 ? (
            operators.map((operator) => (
              <tr key={operator.id} className='hover:bg-gray-50'>
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
                  <div className='flex items-center justify-center space-x-4'>
                    {activeSubTab === 'pending' && (
                      <>
                        <button
                          onClick={() => onReject(operator.id)}
                          className='text-red-600 hover:text-red-900'
                          title='Reject'
                        >
                          <HiX className='w-5 h-5' />
                        </button>
                        <button
                          onClick={() => onApprove(operator.id)}
                          className='text-green-600 hover:text-green-900'
                          title='Approve'
                        >
                          <HiCheck className='w-5 h-5' />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => onShowDetails(operator)}
                      className='px-4 py-2 bg-green-600 text-white text-xs font-semibold rounded-md hover:bg-green-700 transition'
                    >
                      {t('dashboard.admin.droneOperator.seeDetails')}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            // Kept min-height on this empty state to prevent jump
            <tr className='min-h-[408px]'>
              <td colSpan={5} className='text-center py-10 text-gray-500'>
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
