




import { Eye } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import RegistrationModal from './components/Modal/RegistrationModal';

import { useTranslation } from 'react-i18next';
import { AssistProfileSetupModal2, PersonalInfoModal, ServiceLocationModal, VerificationModal } from './components/Modal/AssistProfileSetupModal';
import axiosInstance from '../../../config/axiosConfig';


const Coustomerpage = () => {
  const [open, setOpen] = useState(false);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  
   const [mainModalOpen, setMainModalOpen] = useState(false);
    const [subModalType, setSubModalType] = useState(null);
    const [customerEmail, setCustomerEmail] = useState("");
  
    const handleOpenSubModal = useCallback((setupType, email) => {
      setCustomerEmail(email);
      setSubModalType(setupType);
      setMainModalOpen(false);
    }, []);
  
    const handleCloseSubModal = useCallback(() => {
      setSubModalType(null);
      setMainModalOpen(true);
    }, []);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(activities.length / itemsPerPage);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setLoading(true);
          const response = await axiosInstance.get(
          '/employee/data/customerManagementData.json'
        );
        const data = response.data;
        setActivities(
          data.customers.map((customer) => ({
            name: customer.serviceName,
            company: customer.company,
            contact: customer.contact,
            phone: customer.phone,
            location: 'Gujrat, India',
            server: 'Unassigned',
            progress: 'In Progress',
            priority: 'Medium',
            avatar: customer.serviceName
              .split(' ')
              .map((w) => w[0])
              .join('')
              .toUpperCase(),
          }))
        );
      } catch (err) {
        console.error('Error fetching customers:', err);
        setError(err.message || 'Failed to load customer data');
      } finally {
        setLoading(false);
      }
    };
    fetchCustomerData();
  }, []);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedActivities = activities.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading)
    return (
      <div className="p-8 text-center text-gray-600 font-medium">
        Loading customers...
      </div>
    );
  if (error)
    return (
      <div className="p-8 text-center text-red-500 font-medium">
        {error}
      </div>
    );

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          {t('dashboard.employee.title.customPageTitle')}
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          {t('dashboard.employee.subTitle.custompageSub')}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              {t('dashboard.employee.table.tableTitle')}
            </h2>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              <button
                onClick={() => setOpen(true)}
                className="px-4 md:px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium text-sm md:text-base"
              >
                {t('dashboard.employee.button.registerNewCustomer')}
              </button>
              <button
                onClick={() => setMainModalOpen(true)}
                className="px-4 md:px-6 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 font-medium text-sm md:text-base"
              >
                {t('dashboard.employee.button.assistProfile')}
              </button>
              <button
                
                className="px-4 md:px-6 py-2 bg-[#DC3545] text-white rounded-lg hover:bg-red-700 font-medium text-sm md:text-base"
              >
                {t('dashboard.employee.button.reportAnalysis')}
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">
                  {t('dashboard.employee.table.serviceName')}
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">
                  {t('dashboard.employee.table.contact')}
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">
                  {t('dashboard.employee.table.location')}
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">
                  {t('dashboard.employee.table.served')}
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">
                  {t('dashboard.employee.table.progress')}
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">
                  {t('dashboard.employee.table.priority')}
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">
                  {t('dashboard.employee.table.action')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedActivities.map((activity, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-3 md:px-6 py-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-medium text-xs md:text-sm">
                        {activity.avatar}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 text-sm md:text-base whitespace-nowrap">
                          {activity.name}
                        </div>
                        <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">
                          {activity.company}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 md:px-6 py-4">
                    <div className="text-xs md:text-sm text-gray-900 whitespace-nowrap">
                      {activity.contact}
                    </div>
                    <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">
                      {activity.phone}
                    </div>
                  </td>
                  <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                    {activity.location}
                  </td>
                  <td className="px-3 md:px-6 py-4">
                    <span
                      className={`inline-flex px-2 md:px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap ${
                        activity.server === 'Unassigned'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {activity.server}
                    </span>
                  </td>
                  <td className="px-3 md:px-6 py-4">
                    <select className="px-2 md:px-3 py-1 bg-[#394C6B] text-white rounded text-xs md:text-sm">
                      <option>{activity.progress}</option>
                    </select>
                  </td>
                  <td className="px-3 md:px-6 py-4">
                    <span
                      className={`inline-flex px-2 md:px-3 py-1 rounded text-xs md:text-sm font-medium whitespace-nowrap ${
                        activity.priority === 'High'
                          ? 'text-red-600'
                          : activity.priority === 'Medium'
                          ? 'text-yellow-600'
                          : 'text-green-600'
                      }`}
                    >
                      {activity.priority}
                    </span>
                  </td>
                  <td className="px-3 md:px-6 py-4">
                    <button
                      className="text-gray-600 hover:text-gray-900"
                      
                    >
                      <Eye className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 md:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs md:text-sm text-gray-600">
            Showing{' '}
            {paginatedActivities.length > 0 ? startIndex + 1 : 0} to{' '}
            {startIndex + paginatedActivities.length} of {activities.length}{' '}
            results
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-xs md:text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-xs md:text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

       <RegistrationModal isOpen={open} onClose={() => setOpen(false)} />
      {/* <AssistProfileSetupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
        <AssistProfileSetupModal2
        isOpen={mainModalOpen}
        onClose={() => setMainModalOpen(false)}
        onOpenSubModal={handleOpenSubModal}
      />

      <PersonalInfoModal
        isOpen={subModalType === "Personal Information"}
        onClose={handleCloseSubModal}
        email={customerEmail}
      />

      <VerificationModal
        isOpen={subModalType === "Verification Details"}
        onClose={handleCloseSubModal}
        email={customerEmail}
      />

      <ServiceLocationModal
        isOpen={subModalType === "Service Location"}
        onClose={handleCloseSubModal}
        email={customerEmail}
      />
    </div>
  );
};  

export default Coustomerpage;
