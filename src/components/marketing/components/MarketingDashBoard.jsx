import { FaChevronDown, FaPlus, FaRegClock } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { FaArrowTrendUp, FaDollarSign } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { HiOutlineChevronUp } from "react-icons/hi"; // For the custom dropdown arrow

import { useEffect, useState } from "react";
import axiosInstance from "../../../config/axiosConfig";
import CampaignModal from "./modals/CampaignModal";
import { Link, useLocation } from "react-router-dom";

const iconMap = {
  HiCursorClick: HiCursorClick,
  FaArrowTrendUp: FaArrowTrendUp,
  FaDollarSign: FaDollarSign,
};

// --- Custom Dropdown Component ---
const LeadStatusDropdown = ({ selectedStatus, setSelectedStatus }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Changed "Cool" to "Cold" to match your original image.
  const options = [
    { label: 'All Leads', value: 'All' },
    { label: 'Hot', value: 'Hot' },
    { label: 'Warm', value: 'Warm' },
    { label: 'Cold', value: 'Cold' },
  ];

  const handleSelect = (value) => {
    setSelectedStatus(value);
    setIsOpen(false);
  };

  // The active background color, matching the bright green in your image
  const activeBg = 'bg-lime-400';

  return (
    <div
      className='relative inline-block text-left'
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Button/Display for the Dropdown */}
      <button
        type='button'
        className='w-full justify-between items-center inline-flex px-2 md:px-4 py-1.5 md:py-2 border border-gray-300 rounded-lg text-xs md:text-base text-gray-700 bg-white shadow-sm hover:bg-gray-50 transition-colors'
        id='options-menu'
        aria-haspopup='true'
        aria-expanded={isOpen}
      >
        {options.find((opt) => opt.value === selectedStatus)?.label}
        <HiOutlineChevronUp
          className={`-mr-1 ml-2 h-5 w-5 transition-transform duration-200 ${
            isOpen ? 'rotate-0' : 'rotate-180'
          }`}
          aria-hidden='true'
        />
      </button>

      {/* Dropdown Options List */}
      {isOpen && (
        <div
          className='origin-top-right absolute right-0 mt-2 w-full min-w-[150px] rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='options-menu'
        >
          <div className='py-1'>
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`
                  block px-4 py-2 text-xs md:text-sm cursor-pointer transition-colors
                  ${
                    option.value === selectedStatus
                      ? // ACTIVE/SELECTED STYLE: full bright background
                        `${activeBg} text-gray-900 font-semibold`
                      : // HOVER STYLE: lighter background on hover
                        `text-gray-700 hover:${activeBg}/70`
                  }
                `}
                role='menuitem'
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------

const MarketingDashBoard = () => {
  const [open, setOpen] = useState(false);
  const [isAutomationModalOpen, setIsAutomationModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [seasonalPage, setSeasonalPage] = useState(1);
  const [loyaltyPage, setLoyaltyPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const rowsPerPage = 4;

  const [automationSettings, setAutomationSettings] = useState('');
  const [stats, setStats] = useState([]);
  const [activities, setActivities] = useState([]);
  const [statusStyles, setStatusStyles] = useState({});
  const [leads, setLeads] = useState([]);
  const [allSeasonalCampaigns, setAllSeasonalCampaigns] = useState([]);
  const [allLoyaltyPrograms, setAllLoyaltyPrograms] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('30'); // 30 days default
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [campaignModal, setCampaignModal] = useState(false);
  const totalPages = Math.ceil(filteredActivities.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredActivities.slice(
    startIndex,
    startIndex + rowsPerPage
  );
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth < 768) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };

    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        const data = await axiosInstance.get(
          "/MarketingDashboard/data/marketingLandingPage.json"
        );
        // Original setActivities
        setActivities(data.data.activities);
        setAutomationSettings(data.data.automationSettings);
        setStats(data.data.stats);
        setStatusStyles(data.data.statusStyles);
        setLeads(data.data.leads);
        setAllSeasonalCampaigns(data.data.allSeasonalCampaigns);
        setAllLoyaltyPrograms(data.data.allLoyaltyPrograms);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAgentData();
  }, []);
  useEffect(() => {
    if (!activities) return;
    const today = new Date();
    const days = parseInt(selectedPeriod, 10);

    const filtered = activities.filter((item) => {
      const activityDate = new Date(item.date);
      const diffTime = today - activityDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      const matchDays = diffDays <= days;
      const matchStatus =
        selectedStatus === 'All' || item.status === selectedStatus;

      return matchDays && matchStatus;
    });

    setFilteredActivities(filtered);
    setCurrentPage(1);
  }, [selectedPeriod, selectedStatus, activities]);

  const getPaginatedData = (data, currentPage) => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPages = (data) => {
    return Math.ceil(data.length / cardsPerPage);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleToggleAutomation = (id) => {
    setAutomationSettings((prev) =>
      prev.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const handleDeleteAutomation = (id) => {
    setAutomationSettings((prev) =>
      prev.filter((setting) => setting.id !== id)
    );
  };

  const handleAddAutomationRule = () => {
    const newId =
      automationSettings.length > 0
        ? Math.max(...automationSettings.map((s) => s.id)) + 1
        : 1;
    setAutomationSettings((prev) => [
      ...prev,
      {
        id: newId,
        title: 'Automation Settings',
        subtext: '3 of 4 rules active',
        enabled: false,
      },
    ]);
  };

  const renderPagination = (currentPage, setCurrentPage, totalPages) => {
    const getPageNumbers = () => {
      const pages = [];
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          pages.push(1, 2, 3, '...', totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
        } else {
          pages.push(1, '...', currentPage, '...', totalPages);
        }
      }
      return pages;
    };

    return (
      <div className='flex items-center justify-center gap-2 mt-6'>
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className='p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <IoIosArrowBack size={20} />
        </button>

        {getPageNumbers().map((page, idx) => (
          <button
            key={idx}
            onClick={() => typeof page === 'number' && setCurrentPage(page)}
            disabled={page === '...'}
            className={`w-8 h-8 rounded ${
              page === currentPage
                ? 'bg-yellow-400 text-white font-semibold'
                : page === '...'
                ? 'cursor-default'
                : 'hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className='p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <IoIosArrowForward size={20} />
        </button>
      </div>
    );
  };

  const seasonalCampaigns = getPaginatedData(
    allSeasonalCampaigns,
    seasonalPage
  );
  const seasonalTotalPages = getTotalPages(allSeasonalCampaigns);

  const loyaltyPrograms = getPaginatedData(allLoyaltyPrograms, loyaltyPage);
  const loyaltyTotalPages = getTotalPages(allLoyaltyPrograms);

  return (
    <div className='bg-[#fafffd] p-4 lg:pt-5 md:px-12'>
      <div className='flex-1  mt-2'>
        <div className='mb-1 md:mb-6 flex flex-col md:flex-row justify-between'>
          <div>
            <h1 className='!text-xl md:!text-4xl font-bold text-[#002244]'>
              Marketing Dashboard
            </h1>
            <p className='text-xs md:text-base text-[#464646]'>
              Monitor your customer service performance
            </p>
          </div>
        </div>

        <div className='pb-3 md:pb-5'>
          <h2 className='text-sm md:!text-xl font-normal text-gray-700'>
            Last 30 days overview
          </h2>
        </div>
        <div className="relative mb-4 md:mb-6 w-34">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="w-full px-2 md:px-4 py-1.5 md:py-2 bg-white border border-gray-300 rounded-lg text-xs md:text-base text-[#1A1A1A] appearance-none"
          >
            <option value='7'>Last 7 days</option>
            <option value='30'>Last 30 days</option>
            <option value='90'>Last 90 days</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <FaChevronDown />
          </div>
        </div>
        {/* Stats Grid */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8'>
          {stats.map((stat, index) => {
            const Icon = iconMap[stat.icon]; // convert string to component
            return (
              <div
                key={index}
                className='bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between gap-3'
              >
                <div className='text-gray-500 text-sm font-medium'>
                  {stat.label}
                </div>

                <div className='flex items-center justify-between'>
                  <span className='text-2xl md:text-3xl font-semibold text-gray-900'>
                    {stat.value}
                  </span>

                  <div className={`${stat.iconBg} p-2 rounded-xl`}>
                    {Icon ? (
                      <Icon className="w-6 h-6 " />
                    ) : (
                      <span className='text-gray-400'>?</span>
                    )}
                  </div>
                </div>

                <div
                  className={`text-xs md:text-sm ${
                    stat.trend === 'up'
                      ? 'text-green-500'
                      : stat.trend === 'down'
                      ? 'text-red-500'
                      : 'text-gray-500'
                  }`}
                >
                  {stat.change}
                </div>
              </div>
            );
          })}
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
          <div className='p-4 md:p-6 border-b border-gray-200'>
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
              <div className='md:text-center lg:text-left'>
                <h2 className='text-lg md:text-2xl font-bold text-[#464646]'>
                  Lead Management
                </h2>
                <h3 className='text-[#464646] '>
                  Truck and nuture your marketing leads
                </h3>
              </div>
              <div className='flex flex-col sm:flex-row gap-3 md:gap-4 md:mx-auto lg:mx-0'>
                {/* --- REPLACED CODE BLOCK START --- */}
                <LeadStatusDropdown
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                />
                {/* --- REPLACED CODE BLOCK END --- */}
                <button
                  onClick={() => setOpen(true)}
                  className='px-4 md:px-6 py-2 bg-[#28A844] text-white rounded-lg hover:bg-green-600 font-medium text-sm md:text-base'
                >
                  Export Leads
                </button>
                <button
                  onClick={() => setIsAutomationModalOpen(true)}
                  className='px-3 md:px-6 py-2 bg-[#FFC107] text-white rounded-lg hover:bg-red-700 font-medium text-sm md:text-base flex items-center justify-center gap-1 '
                >
                  Automation
                </button>
              </div>
            </div>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full min-w-max'>
              <thead className='bg-gray-50 border-b border-gray-200'>
                <tr>
                  <th className='px-3 md:px-6 py-3 text-left text-xs md:text-lg font-medium text-black  whitespace-nowrap'>
                    Lead
                  </th>
                  <th className='px-3 md:px-6 py-3 text-left text-xs md:text-lg font-medium text-black  whitespace-nowrap'>
                    Contact
                  </th>
                  <th className='px-3 md:px-6 py-3 text-left text-xs md:text-lg font-medium text-black  whitespace-nowrap'>
                    Source
                  </th>
                  <th className='px-3 md:px-6 py-3 text-left text-xs md:text-lg font-medium text-black  whitespace-nowrap'>
                    Location
                  </th>
                  <th className='px-3 md:px-6 py-3 text-left text-xs md:text-lg font-medium text-black  whitespace-nowrap'>
                    Score
                  </th>
                  <th className='px-3 md:px-6 py-3 text-left text-xs md:text-lg font-medium text-black  whitespace-nowrap'>
                    Status
                  </th>
                  <th className='px-3 md:px-6 py-3 text-left text-xs md:text-lg font-medium text-black  whitespace-nowrap'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {paginatedData.map((activity) => (
                  <tr key={activity.id} className='hover:bg-gray-50'>
                    <td className='py-3 px-4'>{activity.lead}</td>
                    <td className='py-3 px-4 whitespace-pre-line'>
                      {activity.contact}
                    </td>
                    <td className='py-3 px-4'>{activity.source}</td>
                    <td className='py-3 px-4'>{activity.location}</td>
                    <td
                      className={`py-3 px-4 font-semibold ${
                        activity.status === 'Hot'
                          ? 'text-red-600'
                          : activity.status === 'Warm'
                          ? 'text-yellow-600'
                          : 'text-green-600'
                      }`}
                    >
                      {activity.score}
                    </td>
                    <td className='py-3 px-4'>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          statusStyles[activity.status]
                        }`}
                      >
                        {activity.status}
                      </span>
                    </td>
                    <td className='py-3 px-4'>
                      <button className='rounded-full p-1  text-green-200 transition'>
                        <FaRegClock />
                      </button>
                    </td>
                  </tr>
                ))}
                {paginatedData.length === 0 && (
                  <tr>
                    <td colSpan='7' className='text-center py-4 text-gray-500'>
                      No activities in this period
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className='px-4 md:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4'>
            <div className='text-xs md:text-sm text-gray-600'>
              Showing {startIndex + 1} to{' '}
              {Math.min(startIndex + rowsPerPage, activities.length)} of{' '}
              {activities.length} results
            </div>

            <div className='flex gap-2 items-center'>
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-xs md:text-sm ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>

              <span className='text-gray-600 text-xs md:text-sm'>
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-xs md:text-sm ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Seasonal Campaigns Section */}
        <div className='my-4 md:my-12 bg-white p-3 md:p-6 rounded-2xl'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-xl md:text-2xl font-bold text-gray-800 w-1/2'>
              Seasonal campaigns
            </h2>
            <button
              onClick={() => setCampaignModal(true)}
              className="bg-green-500 hover:opacity-90 text-white font- md:font-medium py-2 px-1  md:px-4 rounded flex items-center justify-center gap-1 md:gap-2 transition-opacity w-1/2 md:w-44"
            >
              <FaPlus size={20} />
              Create Campaign
            </button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {seasonalCampaigns.map((campaign, idx) => (
              <div
                key={idx}
                className='bg-[#F9FAFB] rounded-lg shadow-md overflow-hidden transition-transform hover:scale-103'
              >
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className='w-full h-72 object-cover'
                />
                <div className='p-4'>
                  <h3 className='font-semibold text-lg mb-2 text-gray-800'>
                    {campaign.title}
                  </h3>
                  <p className='text-sm text-gray-600 mb-4 line-clamp-3'>
                    {campaign.description}
                  </p>
                  <Link to={`campaigns/seasonal/${campaign.id}`}>
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors">
                      See Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {renderPagination(seasonalPage, setSeasonalPage, seasonalTotalPages)}
        </div>

        {/* Loyalty Programs Section */}
        <div className='my-4 md:my-6 bg-white p-3 md:p-6 rounded-2xl'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-xl md:text-2xl font-bold text-gray-800 w-1/2'>
              Loyalty programs
            </h2>
            <button
              onClick={() => setCampaignModal(true)}
              className="bg-green-500 hover:opacity-90 text-white font-medium py-2 px-1  md:px-4 rounded flex items-center justify-center gap-2 transition-opacity w-1/2 md:w-44"
            >
              <FaPlus size={20} />
              Create Campaign
            </button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {loyaltyPrograms.map((program, idx) => (
              <div
                key={idx}
                className='bg-[#F9FAFB] rounded-lg shadow-md overflow-hidden transition-transform hover:scale-103'
              >
                {}
                <img
                  src={program.image}
                  alt={program.title}
                  className='w-full h-72 object-cover'
                />
                <div className='p-4'>
                  <h3 className='font-semibold text-lg mb-2 text-gray-800'>
                    {program.title}
                  </h3>
                  <p className='text-sm text-gray-600 mb-4 line-clamp-3'>
                    {program.description}
                  </p>
                  <Link to={`campaigns/loyality/${program.id}`}>
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors">
                      See Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {renderPagination(loyaltyPage, setLoyaltyPage, loyaltyTotalPages)}
        </div>
      </div>

      {/* Automation Settings Modal */}
      {isAutomationModalOpen && (
        <div className='fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-xl w-full max-w-md max-h-[70vh] overflow-hidden flex flex-col'>
            {/* Modal Header */}
            <div className='flex items-center justify-between p-4 md:p-5 border-gray-200'>
              <div>
                <h2 className='text-base md:text-lg font-semibold text-gray-900'>
                  if lead is hot
                </h2>
                <p className='text-xs md:text-sm text-gray-500 mt-0.5'>
                  3 of 4 rules active
                </p>
              </div>
              <button
                onClick={() => setIsAutomationModalOpen(false)}
                className='text-gray-400 hover:text-gray-600 transition-colors'
              >
                <MdClose size={24} />
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <div className='flex-1 overflow-y-auto p-4 md:p-5'>
              {/* Automation Settings List */}
              <div className='space-y-3'>
                {automationSettings.map((setting) => (
                  <div
                    key={setting.id}
                    className='bg-gray-50 rounded-lg p-3 md:p-4'
                  >
                    <div className='flex items-start justify-between gap-3'>
                      <div className='flex-1 min-w-0'>
                        <h3 className='text-sm md:text-base font-medium text-gray-900 mb-1'>
                          {setting.title}
                        </h3>
                        <p className='text-xs md:text-sm text-gray-500'>
                          {setting.subtext}
                        </p>
                      </div>
                      <div className='flex items-center gap-2 flex-shrink-0'>
                        {/* Toggle Switch */}
                        <label className='relative inline-flex items-center cursor-pointer'>
                          <input
                            type='checkbox'
                            checked={setting.enabled}
                            onChange={() => handleToggleAutomation(setting.id)}
                            className='sr-only peer'
                          />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                        <span className='text-xs md:text-sm text-gray-500 min-w-[60px]'>
                          {setting.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteAutomation(setting.id)}
                          className='text-red-500 hover:text-red-700 transition-colors'
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Rule Button */}
              <button
                onClick={handleAddAutomationRule}
                className='w-full mt-4 py-3 text-gray-700 font-medium text-sm md:text-base flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all'
              >
                <FaPlus size={14} className='text-gray-600' />
                Add new automation rule
              </button>
            </div>
          </div>
        </div>
      )}
      {campaignModal && (
        <CampaignModal onClose={() => setCampaignModal(false)} />
      )}
    </div>
  );
};

export default MarketingDashBoard;
