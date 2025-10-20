import React from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineUserGroup, HiOutlineInformationCircle } from 'react-icons/hi';

const FieldAgentManagementTable = ({ fieldAgents, onShowDetails }) => {
  const { t } = useTranslation();

  return (
    <div className='overflow-x-auto'>
      <table className='w-full table-fixed'>
        <thead className='bg-gray-50'>
          <tr>
            <th
              scope='col'
              className='w-[18%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
            >
              {t(
                'dashboard.admin.fieldAgentManagement.tableHeaders.fieldAgent'
              )}
            </th>
            <th
              scope='col'
              className='w-[16%] px-3 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
            >
              {t(
                'dashboard.admin.fieldAgentManagement.tableHeaders.totalAddCustomer'
              )}
            </th>
            <th
              scope='col'
              className='w-[16%] px-3 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
            >
              {t(
                'dashboard.admin.fieldAgentManagement.tableHeaders.totalAddOperator'
              )}
            </th>
            <th
              scope='col'
              className='w-[16%] px-3 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
            >
              {t(
                'dashboard.admin.fieldAgentManagement.tableHeaders.totalBookOrders'
              )}
            </th>
            <th
              scope='col'
              className='w-[16%] px-3 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
            >
              {t('dashboard.admin.fieldAgentManagement.tableHeaders.status')}
            </th>
            <th
              scope='col'
              className='w-[18%] px-3 py-3 text-center text-sm font-bold text-gray-700 uppercase tracking-wider'
            >
              {t('dashboard.admin.fieldAgentManagement.tableHeaders.actions')}
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {fieldAgents.length > 0 ? (
            fieldAgents.map((agent) => (
              <tr key={agent.id} className='hover:bg-gray-50'>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  {agent.name}
                </td>
                <td className='px-3 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {agent.totalAddCustomer}
                </td>
                <td className='px-3 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {agent.totalAddOperator}
                </td>
                <td className='px-3 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {agent.totalBookOrders}
                </td>
                <td className='px-3 py-4 whitespace-nowrap'>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                      agent.status === 'Active'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {agent.status === 'Active'
                      ? t('dashboard.admin.fieldAgentManagement.status.active')
                      : t(
                          'dashboard.admin.fieldAgentManagement.status.suspended'
                        )}
                  </span>
                </td>
                <td className='px-3 py-4 whitespace-nowrap text-sm font-medium'>
                  <div className='flex items-center justify-center space-x-4'>
                    <button
                      onClick={() => onShowDetails(agent)}
                      className={`p-2 rounded-full transition ${
                        agent.status === 'Active'
                          ? 'text-green-600 hover:bg-green-50'
                          : 'text-red-600 hover:bg-red-50'
                      }`}
                      title='View Details'
                    >
                      <HiOutlineUserGroup className='w-5 h-5' />
                    </button>
                    <button
                      onClick={() => onShowDetails(agent)}
                      className='p-2 text-gray-600 hover:bg-gray-100 rounded-full transition'
                      title='More Information'
                    >
                      <HiOutlineInformationCircle className='w-5 h-5' />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr className='min-h-[408px]'>
              <td colSpan={6} className='text-center py-10 text-gray-500'>
                {t('dashboard.admin.fieldAgentManagement.noFieldAgentsFound')}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FieldAgentManagementTable;
