import React, { useState, useEffect, useMemo } from 'react'; // Removed useRef
import { TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { GrUserSettings } from 'react-icons/gr';
import { CiSearch } from 'react-icons/ci';
import { BiChevronDown } from 'react-icons/bi';
import CreateTicketModal from './components/Modal/CreateTicketModal';
import EscalateTicketModal from './components/Modal/EscalateTicketModal';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../../../config/axiosConfig';

const SupportPage = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showEscalate, setShowEscalate] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [stats, setStats] = useState([]);
  const [supportData, setSupportData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();
  const ITEMS_PER_PAGE = 4;

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/employee/data/support.json');
        const data = response.data;

        const supportWithDate = data.supportData.map((item) => ({
          ...item,
          date: item.date || new Date().toLocaleDateString('en-GB'),
        }));

        setStats(data.stats);
        setSupportData(supportWithDate);
      } catch (error) {
        console.error('Error fetching support data:', error);
      }
    };

    fetchData();
  }, []);

  // Improved Search Logic
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return supportData;

    const query = searchQuery.toLowerCase();

    return supportData.filter(
      (item) =>
        (item.serviceName && item.serviceName.toLowerCase().includes(query)) ||
        (item.issues && item.issues.toLowerCase().includes(query)) ||
        (item.progress && item.progress.toLowerCase().includes(query)) ||
        (item.priority && item.priority.toLowerCase().includes(query))
    );
  }, [supportData, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage]);

  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };


  const handleManageTicket = () => {
    setShowManageModal(true);
    setActiveDropdown(null);
  };

  const getProgressColor = (progress) => {
    switch (progress) {
      case 'Completed':
        return 'bg-[#EAF6EC] text-[#24963E]';
      case 'Processed':
        return 'bg-blue-100 text-blue-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Escalated':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-[#DC3545] bg-[#FCEBEC]';
      case 'Medium':
        return 'text-[#FFC107] bg-[#FFF9E6]';
      case 'Low':
        return 'text-[#28A844] bg-[#EAF6EC]';
      default:
        return 'text-gray-600';
    }
  };


  useEffect(() => {
    const handleGlobalClick = (event) => {
      const tableContainer = document.getElementById('support-table-container');

      if (activeDropdown !== null) {

        // eslint-disable-next-line no-unused-vars
        const isTableClick = tableContainer && tableContainer.contains(event.target);
        const isDropdownButton = event.target.closest('.dropdown-toggle-button');
        const isDropdownMenu = event.target.closest('.dropdown-menu-content');

        if (!isDropdownButton && !isDropdownMenu) {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleGlobalClick);
    return () => document.removeEventListener('mousedown', handleGlobalClick);
  }, [activeDropdown]);


  return (
    <div className='flex-1 p-4 md:px-12 bg-[#fafffd] min-h-screen'>
      {/* Header */}
      <div className='mb-4 md:mb-6'>
        <h1 className='text-xl md:text-3xl font-bold text-[#002244] mb-2'>
          {t('dashboard.employee.title.supportPageTitle')}
        </h1>
        <p className='text-xs md:text-base text-[#464646]'>
          {t('dashboard.employee.subTitle.supportpageSub')}
        </p>
      </div>

      {/* Buttons */}
      <div className='flex flex-col sm:flex-row gap-2 md:gap-3 mb-4'>
        <button
          onClick={() => setShowCreate(true)}
          className='px-4 md:px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium text-sm md:text-base flex items-center justify-center'
        >
          <Plus className='w-5 h-5 mr-2' /> Create SUPPORT TICKET
        </button>
        <button
          onClick={() => setShowEscalate(true)}
          className='px-4 md:px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 font-medium text-sm md:text-base flex items-center justify-center'
        >
          <GrUserSettings className='w-5 h-5 mr-2' /> Escalate to technical team
        </button>
      </div>

      {/* Stats (omitted for brevity) */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6'>
        {/* ... Stats rendering ... */}
        {stats.map((stat, index) => {
          const bottomContent = stat.change || stat.subtext;
          return (
            <div
              key={index}
              className='bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200'
            >
              <div className='flex items-start justify-between mb-2 md:mb-3'>
                <span className='text-gray-600 text-xs md:text-sm'>
                  {stat.label}
                </span>
              </div>
              <div className='text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2'>
                {stat.value}
              </div>
              {bottomContent && (
                <div
                  className={`text-xs md:text-sm flex items-center gap-1 ${stat.change
                    ? stat.trend === 'up'
                      ? 'text-green-600'
                      : 'text-red-600'
                    : 'text-gray-500'
                    }`}
                >
                  {stat.change && stat.trend === 'up' && (
                    <TrendingUp className='w-4 h-4' />
                  )}
                  {stat.change && stat.trend !== 'up' && (
                    <TrendingDown className='w-4 h-4' />
                  )}
                  {bottomContent}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200' id="support-table-container">
        <div className='p-4 md:p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4'>
          <h2 className='text-lg md:text-xl font-bold text-gray-900'>
            Customer Support Activity
          </h2>
          <div className='relative w-full md:w-1/2 lg:w-1/3'>
            <span className='absolute inset-y-0 left-3 flex items-center text-gray-400 text-2xl'>
              <CiSearch />
            </span>
            <input
              type='text'
              placeholder='Search by service name, issue, progress or priority...'
              value={searchQuery}
              onChange={handleSearch}
              className='w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/30 text-base'
            />
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className='min-w-full table-fixed'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap'>
                  {t('dashboard.employee.table.serviceName')}
                </th>
                <th className='px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap'>
                  {t('dashboard.employee.table.tableIssues')}
                </th>
                <th className='px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap'>
                  {t('dashboard.employee.table.tableDate')}
                </th>
                <th className='px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap'>
                  {t('dashboard.employee.table.progress')}
                </th>
                <th className='px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap'>
                  {t('dashboard.employee.table.priority')}
                </th>
                <th className='px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap'>
                  {t('dashboard.employee.table.action')}
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => {
                  const dropdownIndex = index;

                  // Calculate if the dropdown is near the bottom of the visible items
                  const isNearBottom = dropdownIndex >= ITEMS_PER_PAGE - 2;

                  return (
                    <tr key={dropdownIndex} className='hover:bg-gray-50'>
                      <td className='px-3 md:px-6 py-4'>
                        <div className='font-medium text-gray-900 text-sm md:text-base'>
                          {item.serviceName}
                        </div>
                        <div className='text-xs md:text-sm text-gray-500'>
                          {item.name}
                        </div>
                      </td>
                      <td className='px-3 md:px-6 py-4 text-xs md:text-base text-gray-900'>
                        {item.issues}
                      </td>
                      <td className='px-3 md:px-6 py-4 text-xs md:text-base text-gray-900 whitespace-nowrap'>
                        {item.date}
                      </td>
                      <td className='px-3 md:px-6 py-4'>
                        <span
                          className={`inline-flex px-2 md:px-3 py-1 rounded-full text-xs md:text-sm ${getProgressColor(
                            item.progress
                          )}`}
                        >
                          {item.progress}
                        </span>
                      </td>
                      <td className='px-3 md:px-6 py-4 text-xs md:text-sm whitespace-nowrap'>
                        <span
                          className={`font-medium inline-flex px-2 md:px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap ${getPriorityColor(
                            item.priority
                          )}`}
                        >
                          {item.priority}
                        </span>
                      </td>
                      <td className='px-3 md:px-6 py-4 text-xs md:text-sm relative'>
                        <div className='relative inline-block'>
                          <button
                            onClick={() => toggleDropdown(dropdownIndex)}
                            className='text-2xl dropdown-toggle-button'
                          >
                            <BiChevronDown
                              className={`transition-transform duration-200 ${activeDropdown === dropdownIndex ? 'rotate-180' : ''
                                }`}
                            />
                          </button>

                          {activeDropdown === dropdownIndex && (
                            <div
                              // Added className for global click listener to identify the menu
                              className={`absolute right-0 w-48 bg-white border border-gray-200 rounded shadow-lg z-50 dropdown-menu-content ${
                                // Adjusted positioning logic
                                isNearBottom ? 'bottom-full mb-1' : 'top-full mt-1'
                                }`}
                            >
                              <button
                                onClick={handleManageTicket}
                                className='block w-full text-left px-4 py-2 text-gray-700 text-sm hover:bg-green-600 hover:text-white transition-colors'
                              >
                                Manage Ticket
                              </button>
                              <button
                                onClick={() => {
                                  setShowEscalate(true);
                                  setActiveDropdown(null); // Close dropdown when opening modal
                                }}
                                className='block w-full text-left px-4 py-2 text-gray-700 text-sm hover:bg-green-600 hover:text-white transition-colors border-t border-gray-100'
                              >
                                Escalate
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan='6' className='text-center py-6 text-gray-500'>
                    No matching records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination (omitted for brevity) */}
        <div className="px-4 md:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs md:text-sm text-gray-600">
            Showing{' '}
            {paginatedData.length === 0
              ? 0
              : (currentPage - 1) * ITEMS_PER_PAGE + 1}{' '}
            to{' '}
            {(currentPage - 1) * ITEMS_PER_PAGE + paginatedData.length} of{' '}
            {filteredData.length} results
          </div>

          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            <button
              onClick={handlePrevious}
              className="px-2 sm:px-3 py-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${currentPage === number
                  ? 'bg-[#28A844] text-white font-medium'
                  : 'bg-gray-100 text-black hover:bg-gray-200'
                  }`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={handleNext}
              className="px-2 sm:px-3 py-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <CreateTicketModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
      />
      <EscalateTicketModal
        isOpen={showEscalate}
        onClose={() => setShowEscalate(false)}
      />
      {showManageModal && (
        <CreateTicketModal
          isOpen={showManageModal}
          onClose={() => setShowManageModal(false)}
        />
      )}
    </div>
  );
};

export default SupportPage;