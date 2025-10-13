

import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { PiUsersThreeBold } from "react-icons/pi";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegCreditCard } from "react-icons/fa"
import { LuHeadset } from "react-icons/lu";
import { IoMdTrendingUp } from "react-icons/io";
import { IoMdTrendingDown } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { IoIosCalendar } from "react-icons/io";

import { useTranslation } from "react-i18next";
import axiosInstance from "../../../config/axiosConfig";
import RegistrationModal from "./components/Modal/RegistrationModal";
import { AssistProfileSetupModal2, PersonalInfoModal, ServiceLocationModal, VerificationModal } from "./components/Modal/AssistProfileSetupModal";
function DashBoard() {
  const [selectedPeriod, setSelectedPeriod] = useState("Last 30 days");
  const [open, setOpen] = useState(false);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({
    totalCustomers: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    avgDuration: 0,
    completedOrders: 0,
    canceledOrders: 0,
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { t } = useTranslation();
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

  const periodOptions = [
    { key: "last7days", label: t("dashboard.employee.pages.dashboard.dropDown.last7days") },
    { key: "last30days", label: t("dashboard.employee.pages.dashboard.dropDown.last30days") },
    { key: "last60days", label: t("dashboard.employee.pages.dashboard.dropDown.last60days") },
    { key: "last90days", label: t("dashboard.employee.pages.dashboard.dropDown.last90days") },
    { key: "last6months", label: t("dashboard.employee.pages.dashboard.dropDown.last6months") },
    { key: "last12months", label: t("dashboard.employee.pages.dashboard.dropDown.last12months") },
  ];
  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          '/employee/data/dashboardOverviewData.json'
        );
        const data = response.data;

        setActivities(data.recentActivities || []);
        setSummary(data.summary || {});
        setLoading(false);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(err.message || "Something went wrong while fetching data");
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Memoized summary stats
  const summaryStats = useMemo(() => {
    return [
      {
        label: t("dashboard.employee.pages.dashboard.card.1st"),
        value: summary.totalCustomers,
        trend: "up",
        icon: PiUsersThreeBold,
        bgColor: "bg-[#F7FFE5]"
      },
      {
        label: t("dashboard.employee.pages.dashboard.card.2nd"),
        value: summary.totalRevenue,
        trend: "up",
        icon: FiShoppingCart,
        bgColor: "bg-[#F7FFE5]"
      },
      {
        label: t("dashboard.employee.pages.dashboard.card.3rd"),
        value: summary.pendingPayments,
        trend: "down",
        icon: FaRegCreditCard,
        bgColor: "bg-[#F7FFE5]"
      },
      {
        label: t("dashboard.employee.pages.dashboard.card.4th"),
        value: summary.avgDuration,
        trend: "up",
        icon: LuHeadset,
        bgColor: "bg-[#ECFDF6]"
      },
      {
        label: t("dashboard.employee.pages.dashboard.card.5th"),
        value: summary.completedOrders,
        trend: "up",
        icon: FiShoppingCart,
        bgColor: "bg-[#ECFDF6]"
      },
      {
        label: t("dashboard.employee.pages.dashboard.card.6th"),
        value: summary.canceledOrders,
        trend: "down",
        icon: FiShoppingCart,
        bgColor: "bg-[#ECFDF6]"
      },
    ];
  }, [t, summary]);

  // Filter activities by selected period
  const filteredActivities = useMemo(() => {
    if (!activities) return [];
    const now = new Date();
    let days = 30;
    switch (selectedPeriod) {
      case "last7days": days = 7; break;
      case "last30days": days = 30; break;
      case "last60days": days = 60; break;
      case "last90days": days = 90; break;
      case "last6months": days = 180; break;
      case "last12months": days = 365; break;
      default: days = 30;
    }
    return activities.filter(a => {
      const activityDate = new Date(a.date);
      const diff = (now - activityDate) / (1000 * 60 * 60 * 24);
      return diff <= days;
    });
  }, [activities, selectedPeriod]);

  // Pagination
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePrevious = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  return (
    <div className="p-4 md:p-8 ">
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#002244] mb-2 text-center md:text-left">{t('dashboard.employee.title.dashPageTitle')}</h1>
        <p className="text-sm md:text-base text-gray-600">{t('dashboard.employee.subTitle.dashpageSub')}</p>
      </div>

      {/* Period Select */}
      <div className="mb-4 md:mb-6 flex flex-col items-start gap-2 relative">
        <h2 className="text-lg md:text-xl font-normal text-gray-700">  {periodOptions.find(p => p.key === selectedPeriod)?.label || t("dashboard.employee.pages.dashboard.dropDown.last30days")}
          {t("dashboard.employee.pages.dashboard.dropDown.overview")}</h2>
        <div className="relative ">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center gap-4 px-3 py-2 md:px-4 md:py-2 bg-gray-50 border border-[#E6E6E6] rounded-lg text-xs md:text-sm text-[#1A1A1A]  transition-all duration-200"
          ><IoIosCalendar className="w-6 h-6  font-bold" />
            {

              periodOptions.find(p => p.key === selectedPeriod)?.label ||
              t("dashboard.employee.pages.dashboard.dropDown.last30days")
            }
            {dropdownOpen ? (
              <FaChevronUp className="w-4 h-4 text-[#666666]" />
            ) : (
              <FaChevronDown className="w-4 h-4 text-[#666666]" />
            )}
          </button>
          {dropdownOpen && (
            <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-20">
              {periodOptions.map((period) => (
                <button
                  key={period.key}
                  onClick={() => {
                    setSelectedPeriod(period.key);
                    setDropdownOpen(false);
                    setCurrentPage(1);
                  }}
                  className={`block w-full text-left px-4 py-2 text-xs md:text-sm hover:bg-gray-100 ${selectedPeriod === period.key
                    ? "bg-gray-50 font-medium text-gray-900"
                    : "text-gray-700"
                    }`}
                >
                  {period.label}
                </button>
              ))}

            </div>
          )}
        </div>
      </div>

      {/* Loading & Error */}
      {loading && <div className="text-gray-700">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}

      {/* Stats */}
      {!loading && !error && (
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6 mb-6 md:mb-8">
          {summaryStats.map((stat, index) => {
            const Icon = stat.icon || PiUsersThreeBold;
            return (
              <div
                key={index}
                className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center"
              >
                {/* Left Side Text */}
                <div>
                  <span className="text-gray-600 text-xs md:text-sm">{stat.label}</span>
                  <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div
                    className={` flex items-center gap-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                  >
                    {stat.trend === "up" ? (
                      <IoMdTrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                    ) : (
                      <>  <IoMdTrendingDown className="w-3 h-3 md:w-4 md:h-4" /></>
                    )}
                    {stat.trend === "up" ? "+30 %" : " -7 %"}
                  </div>
                </div>

                {/* Right Side Icon */}
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                </div>
              </div>
            );
          })}

        </div>
      )}

      {/* Activities Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-4 md:p-6 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">{t('dashboard.employee.table.tableTitle')}</h2>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            <button onClick={() => setOpen(true)} className="px-4 md:px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium text-sm md:text-base">
              {t('dashboard.employee.button.registerNewCustomer')}
            </button>
            <button onClick={() => setMainModalOpen(true)} className="px-4 md:px-6 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 font-medium text-sm md:text-base">
              {t('dashboard.employee.button.assistProfile')}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.serviceName')}</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.contact')}</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.location')}</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.served')}</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.progress')}</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.priority')}</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {!loading && !error && paginatedActivities.map((activity, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-3 md:px-6 py-4">{activity.serviceName}</td>
                  <td className="px-3 md:px-6 py-4">
                    <div className="text-xs md:text-sm text-gray-900 whitespace-nowrap">{activity.contact}</div>
                    <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">{activity.phone}</div>
                  </td>
                  <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">{activity.location}</td>
                  <td className="px-3 md:px-6 py-4">
                    <span className={`inline-flex px-2 md:px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap ${activity.servedBy === "Unassigned" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                      {activity.servedBy}
                    </span>
                  </td>

                  {/* ✅ Progress Dropdown */}
                  <td className="px-3 md:px-6 py-4 relative">
                    <div className="relative inline-block w-full">
                      {/* Dropdown Button */}
                      <button
                        onClick={() =>
                          setActivities((prev) =>
                            prev.map((item) =>
                              item.id === activity.id
                                ? { ...item, dropdownOpen: !item.dropdownOpen }
                                : { ...item, dropdownOpen: false }
                            )
                          )
                        }
                        className={`w-full flex justify-between items-center px-3 py-1 rounded text-xs md:text-sm 
        transition-all duration-200
        bg-[#394C6B] text-white hover:bg-[#28A844]
      `}
                      >
                        {activity.progress}
                        {activity.dropdownOpen ? (
                          <FaChevronUp className="w-4 h-4 text-white pl-4" />
                        ) : (
                          <FaChevronDown className="w-4 h-4 text-white" />
                        )}
                      </button>

                      {/* Dropdown Menu */}
                      {activity.dropdownOpen && (
                        <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                          <button
                            onClick={() => {
                              setActivities((prev) =>
                                prev.map((item) =>
                                  item.id === activity.id
                                    ? { ...item, progress: "In Progress", dropdownOpen: false }
                                    : item
                                )
                              );
                            }}
                            className={`block w-full text-left px-4 py-2 text-xs md:text-sm transition-colors
            ${activity.progress === "In Progress"
                                ? "bg-[#28A844] text-white"
                                : "hover:bg-[#28A844] hover:text-white text-gray-700"
                              }
          `}
                          >
                            In Progress
                          </button>

                          <button
                            onClick={() => {
                              setActivities((prev) =>
                                prev.map((item) =>
                                  item.id === activity.id
                                    ? { ...item, progress: "Completed", dropdownOpen: false }
                                    : item
                                )
                              );
                            }}
                            className={`block w-full text-left px-4 py-2 text-xs md:text-sm transition-colors
            ${activity.progress === "Completed"
                                ? "bg-[#28A844] text-white"
                                : "hover:bg-[#28A844] hover:text-white text-gray-700"
                              }
          `}
                          >
                            Completed
                          </button>
                        </div>
                      )}
                    </div>
                  </td>



                  <td className="px-3 md:px-6 py-4">
                    <span className={`inline-flex px-2 md:px-3 py-1 rounded text-xs md:text-sm font-medium whitespace-nowrap ${activity.priority === "High" ? "text-red-600" : activity.priority === "Medium" ? "text-yellow-600" : "text-green-600"}`}>
                      {activity.priority}
                    </span>
                  </td>
                  <td className="px-3 md:px-6 py-4">
                    <button
                      onClick={() => navigate(`/employee/customers/${activity.id}`)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <LuEye className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 md:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs md:text-sm text-gray-600">
            Showing {paginatedActivities.length} of {filteredActivities.length} results
          </div>
          <div className="flex gap-2">
            <button onClick={handlePrevious} disabled={currentPage === 1} className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-xs md:text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50">Previous</button>
            <button onClick={handleNext} disabled={currentPage === totalPages || totalPages === 0} className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-xs md:text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>

      {/* Modals */}
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
}

export default DashBoard;