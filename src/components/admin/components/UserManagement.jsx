import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineSearch } from 'react-icons/hi';
import axiosInstance from '../../../config/axiosConfig';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import Pagination from '../../common/Pagination';
import UserManagementTable from './UserManagementTable';
import CustomerManagementTable from './CustomerManagementTable';
import EmployeeManagementTable from './EmployeeManagementTable';
import FieldAgentManagementTable from './FieldAgentManagementTable';
import UserDetailsModal from '../../common/UserDetailsModal';
import CustomerDetailsModal from './CustomerDetailsModal';
import EmployeeDetailsModal from './EmployeeDetailsModal';
import FieldAgentDetailsModal from './FieldAgentDetailsModal';
import AddEmployeeModal from '../../common/AddEmployeeModal';

const TABS = [
  { id: 'user', labelKey: 'tabUser' },
  { id: 'customer', labelKey: 'tabCustomer' },
  { id: 'employee', labelKey: 'tabEmployee' },
  { id: 'fieldAgent', labelKey: 'tabFieldAgent' },
];

const SUB_TABS = [
  { id: 'all', labelKey: 'subTabAll' },
  { id: 'pending', labelKey: 'subTabPending' },
];

const UserManagement = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState('user');
  const [activeSubTab, setActiveSubTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Load different data based on active tab
        let endpoint = '/admin/data/userManagement.json';
        if (activeTab === 'customer') {
          endpoint = '/admin/data/customerManagement.json';
        } else if (activeTab === 'employee') {
          endpoint = '/admin/data/employees.json';
        } else if (activeTab === 'fieldAgent') {
          endpoint = '/admin/data/fieldAgents.json';
        }

        const response = await axiosInstance.get(endpoint);
        setData(response.data || []);
      } catch (err) {
        setError('Failed to fetch user management data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  // Fix: Reset to page 1 whenever search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleApproveUser = (userId) => {
    setData((prevData) =>
      prevData.map((user) =>
        user.id === userId ? { ...user, status: 'approved' } : user
      )
    );
  };

  const handleRejectUser = (userId) => {
    setData((prevData) => prevData.filter((user) => user.id !== userId));
  };

  const handleSuspendCustomer = (customerId) => {
    setData((prev) =>
      prev.map((customer) =>
        customer.id === customerId
          ? { ...customer, status: 'suspended' }
          : customer
      )
    );
  };

  const handleActivateCustomer = (customerId) => {
    setData((prev) =>
      prev.map((customer) =>
        customer.id === customerId
          ? { ...customer, status: 'active' }
          : customer
      )
    );
  };

  const handleActivateEmployee = (employeeId) => {
    setData((prev) =>
      prev.map((employee) =>
        employee.id === employeeId
          ? { ...employee, status: 'active' }
          : employee
      )
    );
  };

  const handleDeactivateEmployee = (employeeId) => {
    setData((prev) =>
      prev.map((employee) =>
        employee.id === employeeId
          ? { ...employee, status: 'inactive' }
          : employee
      )
    );
  };

  const handleSuspendFieldAgent = (agentId) => {
    setData((prev) =>
      prev.map((agent) =>
        agent.id === agentId ? { ...agent, status: 'Suspended' } : agent
      )
    );
  };

  const handleActivateFieldAgent = (agentId) => {
    setData((prev) =>
      prev.map((agent) =>
        agent.id === agentId ? { ...agent, status: 'Active' } : agent
      )
    );
  };

  const filteredData = useMemo(() => {
    let users = [];

    // For Customer, Employee, and Field Agent tabs - show all (no sub-tabs)
    if (activeTab === 'customer') {
      users = data; // Show all customers
    } else if (activeTab === 'employee') {
      users = data; // Show all employees
    } else if (activeTab === 'fieldAgent') {
      users = data; // Show all field agents
    } else {
      // For other tabs (User)
      if (activeSubTab === 'all') {
        users = data.filter((user) => user.status === 'approved');
      } else if (activeSubTab === 'pending') {
        users = data.filter((user) => user.status === 'pending');
      }
    }

    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, activeTab, activeSubTab, searchTerm]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const subTabCounts = useMemo(() => {
    if (activeTab === 'customer') {
      const allCount = data.filter((user) => user.status === 'active').length;
      const pendingCount = data.filter(
        (user) => user.status === 'suspended'
      ).length;
      return { all: allCount, pending: pendingCount };
    } else {
      const allCount = data.filter((user) => user.status === 'approved').length;
      const pendingCount = data.filter(
        (user) => user.status === 'pending'
      ).length;
      return { all: allCount, pending: pendingCount };
    }
  }, [data, activeTab]);

  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if (error) {
    return <div className='text-center py-10 text-red-500'>{error}</div>;
  }

  return (
    <>
      <div className='w-full bg-[#fafffd] px-6 xl:px-11 py-3 lg:py-6'>
        <div className='border-b border-gray-200'>
          <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-green-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-base`}
              >
                {t(`dashboard.admin.userManagement.${tab.labelKey}`)}
              </button>
            ))}
          </nav>
        </div>

        <div className='mt-8 bg-white rounded-lg shadow-sm'>
          {/* Show sub-tabs only for non-customer, non-employee, and non-fieldAgent tabs */}
          {activeTab !== 'customer' &&
            activeTab !== 'employee' &&
            activeTab !== 'fieldAgent' && (
              <div className='px-6 pt-4 border-b border-gray-200'>
                <nav className='-mb-px flex space-x-8' aria-label='Sub Tabs'>
                  {SUB_TABS.map((subTab) => (
                    <button
                      key={subTab.id}
                      onClick={() => {
                        setActiveSubTab(subTab.id);
                        setCurrentPage(1);
                      }}
                      className={`${
                        activeSubTab === subTab.id
                          ? 'border-green-500 text-green-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-base flex items-center gap-2`}
                    >
                      <span>
                        {t(`dashboard.admin.userManagement.${subTab.labelKey}`)}
                      </span>
                      <span className='bg-yellow-400 text-gray-800 text-xs font-semibold px-2 py-0.5 rounded-full'>
                        {subTabCounts[subTab.id]}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            )}

          <div className='p-4 border-b border-gray-200 flex justify-between items-center'>
            {/* Add employees button - only show on employee tab */}
            {activeTab === 'employee' && (
              <button
                onClick={() => setIsAddEmployeeModalOpen(true)}
                className='px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 font-medium'
              >
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 4v16m8-8H4'
                  />
                </svg>
                {t('dashboard.admin.employeeManagement.addEmployees')}
              </button>
            )}

            {/* Spacer for non-employee tabs */}
            {activeTab !== 'employee' && <div></div>}

            <div className='relative'>
              <input
                type='text'
                placeholder={t(
                  'dashboard.admin.userManagement.searchPlaceholder'
                )}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
              />
              <HiOutlineSearch className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
            </div>
          </div>

          {loading ? (
            <div className='flex justify-center items-center h-96'>
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <div className='min-h-[448px]'>
                {activeTab === 'customer' ? (
                  <CustomerManagementTable
                    customers={paginatedData}
                    onShowDetails={handleShowDetails}
                    onSuspend={handleSuspendCustomer}
                    onActivate={handleActivateCustomer}
                  />
                ) : activeTab === 'employee' ? (
                  <EmployeeManagementTable
                    employees={paginatedData}
                    onShowDetails={handleShowDetails}
                  />
                ) : activeTab === 'fieldAgent' ? (
                  <FieldAgentManagementTable
                    fieldAgents={paginatedData}
                    onShowDetails={handleShowDetails}
                  />
                ) : (
                  <UserManagementTable
                    users={paginatedData}
                    activeSubTab={activeSubTab}
                    onShowDetails={handleShowDetails}
                    onApprove={handleApproveUser}
                    onReject={handleRejectUser}
                  />
                )}
              </div>

              <Pagination
                currentPage={currentPage}
                totalItems={filteredData.length}
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => setCurrentPage(page)}
                showingText={t('dashboard.admin.userManagement.showing', {
                  count: paginatedData.length,
                  total: filteredData.length,
                })}
              />
            </>
          )}
        </div>
      </div>

      {activeTab === 'customer' ? (
        <CustomerDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          customer={selectedUser}
          onSuspend={handleSuspendCustomer}
          onActivate={handleActivateCustomer}
        />
      ) : activeTab === 'employee' ? (
        <EmployeeDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          employee={selectedUser}
          onActivate={handleActivateEmployee}
          onDeactivate={handleDeactivateEmployee}
        />
      ) : activeTab === 'fieldAgent' ? (
        <FieldAgentDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          fieldAgent={selectedUser}
          onSuspend={handleSuspendFieldAgent}
          onActivate={handleActivateFieldAgent}
        />
      ) : (
        <UserDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          user={selectedUser}
          onApprove={handleApproveUser}
          onReject={handleRejectUser}
        />
      )}

      {/* Add Employee Modal */}
      <AddEmployeeModal
        isOpen={isAddEmployeeModalOpen}
        onClose={() => setIsAddEmployeeModalOpen(false)}
        onSubmit={(formData) => {
          console.log('Employee data submitted:', formData);
          // TODO: Add API call to create employee
          // You can add the employee to the data array or refetch data
        }}
      />
    </>
  );
};

export default UserManagement;
