
import { useState, useEffect } from 'react';
import { Eye, Plus, Calendar, X } from 'lucide-react';
import ServiceRequestModal from './components/Modal/ServiceRequestModal';
import ResheduleServiceModal from './components/Modal/ResheduleServiceModal';
import CancleModal from './components/Modal/CancleModal';
import { useTranslation } from 'react-i18next';
import { CiSearch } from "react-icons/ci";
import axiosInstance from '../../../../config/axiosConfig';

const OrderManagementPage = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResheduleModalOpen, setIsResheduleModalOpen] = useState(false);
  const [cancleModal, setCancleModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleCreateServiceModal = (formdata) => {
    console.log('Form data received in parent:', formdata);
  };
  const handleResheduleModal = (formdata) => {
    console.log('Form data received in parent:', formdata);
  };
  const handleCancleModal = (formdata) => {
    console.log('Form data received in parent:', formdata);
  };
  // Fetch activities via ApiService
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          '/employee/data/order.json'
        );
        const data = response.data;
        setActivities(data || []);
        setFilteredActivities(data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message || 'Something went wrong');
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

// Filter activities based on search query (customerName and orderId)
useEffect(() => {
  const filtered = activities.filter(activity =>
    activity.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(activity.orderId).toLowerCase().includes(searchQuery.toLowerCase())
  );
  setFilteredActivities(filtered);
  setCurrentPage(1); // Reset to first page when search changes
}, [searchQuery, activities]);

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentActivities = filteredActivities.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex-1 p-4 md:p-8 ">
      <div className="mb-2 md:mb-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{t('dashboard.employee.title.orderPageTitle')}</h1>
        <p className="text-sm md:text-base text-gray-600 pt-2">{t('dashboard.employee.subTitle.orderpageSub')}</p>
      </div>

      <div className="flex gap-2 md:gap-3 mb-2 md:mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 md:px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium text-sm md:text-base"
        >
          <Plus className="inline-block w-6 h-8 mr-1 -ml-1 " />
          {t('dashboard.employee.button.createServiceRequest')}
        </button>
        <button
          onClick={() => setIsResheduleModalOpen(true)} 
          className="px-4 md:px-6 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 font-medium text-sm md:text-base"
        >
          <Calendar className="inline-block w-6 h-8 mr-1 -ml-1 " />
           {t('dashboard.employee.button.reshedule')}
        </button>
        <button
          onClick={() => setCancleModal(true)}
          className="px-4 md:px-6 py-2 bg-[#DC3545] text-white rounded-lg hover:bg-red-700 font-medium text-sm md:text-base"
        >
          <X className="inline-block w-6 h-8 mr-1 -ml-1 " />
          {t('dashboard.employee.button.cancel')}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 md:p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">{t('dashboard.employee.table.recentCustomer')}</h2>

          {/* Search Field */}
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-2xl">
              <CiSearch />
            </span>
            <input
              type="text"
              placeholder={t('dashboard.employee.table.searchField')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-[#C2C2C2] rounded-xl focus:outline-none focus:ring-2 focus:ring-black/30 text-base"
            />
          </div>
        </div>

        {loading && <div className="p-4 text-gray-700">Loading...</div>}
        {error && <div className="p-4 text-red-600">{error}</div>}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.orderIdName')}</th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.serviceName')}</th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.location')}</th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.assignTo')}</th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.progress')}</th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.priority')}</th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentActivities.map((activity, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-3 md:px-6 py-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 text-sm md:text-base whitespace-nowrap">{activity.orderId}</div>
                          <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">{activity.customerName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-4">
                      <div className="text-xs md:text-sm text-gray-900 whitespace-nowrap">{activity.serviceName}</div>
                      <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">{activity.date}</div>
                    </td>
                    <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">{activity.location}</td>
                    <td className="px-3 md:px-6 py-4">
                      <span className={`inline-flex px-2 md:px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap ${activity.assignTo === 'Unassigned'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                      }`}>
                        {activity.assignTo}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-4">
                      <select className="px-2 md:px-3 py-1 bg-[#394C6B] text-white rounded text-xs md:text-sm">
                        <option>{activity.progress}</option>
                      </select>
                    </td>
                    <td className="px-3 md:px-6 py-4">
                      <span className={`inline-flex px-2 md:px-3 py-1 rounded text-xs md:text-sm font-medium whitespace-nowrap ${activity.priority === 'High' ? 'text-red-600' :
                        activity.priority === 'Medium' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {activity.priority}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-4">
                      <button className="text-gray-600 hover:text-gray-900">
                        <Eye className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {currentActivities.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center p-4 text-gray-500">
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="px-4 md:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs md:text-sm text-gray-600">
            Showing {currentActivities.length > 0 ? indexOfFirstItem + 1 : 0} to {indexOfFirstItem + currentActivities.length} of {filteredActivities.length} results
          </div>
          <div className="flex gap-2">
            <button
              className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-xs md:text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-xs md:text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <ServiceRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreateServiceModal} />
      <ResheduleServiceModal isOpen={isResheduleModalOpen} onClose={() => setIsResheduleModalOpen(false)} onSubmit={handleResheduleModal} />
      <CancleModal isOpen={cancleModal} onClose={() => setCancleModal(false)} onSubmit={handleCancleModal} />
    </div>
  );
};

export default OrderManagementPage;
