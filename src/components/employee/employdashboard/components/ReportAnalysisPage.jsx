

import { useEffect, useState, useRef, useMemo } from "react";
import {
  FiTrendingUp,
  FiShoppingCart,
  FiClock,
  FiCreditCard,
  FiChevronDown,
  FiChevronUp,
  FiSearch,
} from "react-icons/fi";
import axiosInstance from "../../../../config/axiosConfig";
import { useTranslation } from "react-i18next";
import Pagination from "../../../common/Pagination";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
//  Custom Dropdown with outside click handler
const CustomDropdown = ({ label, options, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  //  Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white transition"
      >
        <span>{value || placeholder}</span>
        <FiChevronDown className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <div
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer font-medium"
          >
            All
          </div>
          {options.map((opt, i) => (
            <div
              key={i}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ReportAnalysisPage = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({});
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomerType, setSelectedCustomerType] = useState("");
  const [selectedServiceCategory, setSelectedServiceCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const periodDropdownRef = useRef(null);
  const { t } = useTranslation();
 const [selectedPeriod, setSelectedPeriod] = useState("last30days");
  const filters = useMemo(() => ({
  customerTypes: [
    t("dashboard.employee.pages.dashboard.dropDown.customerType"),
    t("dashboard.employee.pages.dashboard.dropDown.groundMediaServices"),
  ],
  serviceCategories: [
    t("dashboard.employee.pages.dashboard.dropDown.aerialPhotographyVideographyMP"),
    t("dashboard.employee.pages.dashboard.dropDown.eventPhotography"),
  ],
}), [t]);
  const itemsPerPage = 4;

 const periodOptions = [
    { key: "last7days", label: t("dashboard.employee.pages.dashboard.dropDown.last7days") },
    { key: "last30days", label: t("dashboard.employee.pages.dashboard.dropDown.last30days") },
    { key: "last60days", label: t("dashboard.employee.pages.dashboard.dropDown.last60days") },
    { key: "last90days", label: t("dashboard.employee.pages.dashboard.dropDown.last90days") },
    { key: "last6months", label: t("dashboard.employee.pages.dashboard.dropDown.last6months") },
    { key: "last12months", label: t("dashboard.employee.pages.dashboard.dropDown.last12months") },
  ];

  //  Outside click for period dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (periodDropdownRef.current && !periodDropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //  Fetch data
  const fetchReportData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/employee/data/customerManagementData.json");
      const data = response.data;
      setSummary({
        totalCustomers: data.summary?.totalCustomers || 0,
        totalRevenue: data.summary?.totalRevenue || 0,
        avgDuration: data.summary?.avgDuration || 0,
        pendingPayments: data.summary?.pendingPayments || 0,
      });
      setCustomers(data.customers || []);
    } catch (error) {
      console.error("Error fetching report data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  const stats = [
    {
      label: t("dashboard.employee.pages.dashboard.card.totalCustomers"),
      value: summary.totalCustomers,
      change: "+13% vs last month",
      positive: true,
      icon: FiTrendingUp,
      bgColor: "bg-green-50",
    },
    {
      label: t("dashboard.employee.pages.dashboard.card.totalRevenue"),
      value: summary.totalRevenue,
      change: "+8% vs last month",
      positive: true,
      icon: FiShoppingCart,
      bgColor: "bg-blue-50",
    },
    {
      label: t("dashboard.employee.pages.dashboard.card.avgDuration"),
      value: summary.avgDuration,
      change: "-5% vs last month",
      positive: false,
      icon: FiClock,
      bgColor: "bg-orange-50",
    },
    {
      label: t("dashboard.employee.pages.dashboard.card.pendingPayments"),
      value: summary.pendingPayments,
      change: "+12% vs last month",
      positive: true,
      icon: FiCreditCard,
      bgColor: "bg-purple-50",
    },
  ];

  //  Filtering logic
  const filteredCustomers = customers.filter((customer) => {
    const matchesCustomerType = selectedCustomerType
      ? customer.customerType === selectedCustomerType
      : true;
    const matchesServiceCategory = selectedServiceCategory
      ? customer.serviceCategory === selectedServiceCategory
      : true;
    const matchesSearch = searchQuery
      ? customer.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCustomerType && matchesServiceCategory && matchesSearch;
  });
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }
  return (
    <div className="flex-1 p-4 md:px-12">
      {/* Header */}
      <div className="mb-6 md:mb-8">
         <button
            onClick={() => navigate(-1)}
          aria-label="Back"
          className="mb-2 text-xl  pt-2 cursor-pointer"
        >
          <IoArrowBack className="w-6 h-6" />
        </button>
      </div>

      {/* Filters & Analytics */}
      <div className="p-4 md:p-6 bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6">Filters & Analytics</h2>

        {loading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : (
          <>
            {/* Period Dropdown */}
            <div className="mb-4 md:mb-6 flex flex-col items-start gap-2 relative">
              <div ref={periodDropdownRef} className="relative w-52">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 md:px-4 md:py-2 border border-[#E6E6E6] rounded-lg text-xs md:text-sm text-gray-700 transition-all duration-200"
                >
                  {periodOptions.find((p) => p.key === selectedPeriod)?.label}
                  {dropdownOpen ? (
                    <FiChevronUp className="w-4 h-4" />
                  ) : (
                    <FiChevronDown className="w-4 h-4" />
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

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <CustomDropdown
                label={t("dashboard.employee.pages.dashboard.dropDown.customerType")}
                options={filters.customerTypes}
                value={selectedCustomerType}
                onChange={(val) => {
                  setSelectedCustomerType(val);
                  setCurrentPage(1);
                }}
                placeholder= {t("dashboard.employee.pages.dashboard.dropDown.customerType")}
              />

              <CustomDropdown
                label={t("dashboard.employee.pages.dashboard.dropDown.serviceCategory")}
                options={filters.serviceCategories}
                value={selectedServiceCategory}
                onChange={(val) => {
                  setSelectedServiceCategory(val);
                  setCurrentPage(1);
                }}
                placeholder={t("dashboard.employee.pages.dashboard.dropDown.allServiceCategories")}
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <div className={`w-8 h-8 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-gray-700" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    <p className={`text-xs ${stat.positive ? "text-green-600" : "text-red-600"}`}>
                      {stat.change}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-4 md:p-6 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">{ t("dashboard.employee.table.customerDetails") }</h2>

          {/* Search Field */}
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-xl">
              <FiSearch className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder={t('dashboard.employee.table.searchField')}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-[#C2C2C2] rounded-xl focus:outline-none focus:ring-2 focus:ring-black/70 text-sm"
            />
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Loading customer data...</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-max">
                <thead className="bg-gray-50 border-b h-14 border-gray-200">
                  <tr>
                    <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">
                      { t("dashboard.employee.table.serviceName") }
                    </th>
                    <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">
                      { t("dashboard.employee.table.contact") }

                    </th>
                    <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">
                      { t("dashboard.employee.table.tableDate") }
                      
                    </th>
                    <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">
                       { t("dashboard.employee.table.duration") }
                    </th>
                    <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">
                       { t("dashboard.employee.table.revenue") }
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentCustomers.map((customer, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-3 md:px-6 py-4">
                        <div className="font-medium text-gray-900 text-sm md:text-base whitespace-nowrap">
                          {customer.serviceName || "-"}
                        </div>
                        <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">
                          {customer.company || "-"}
                        </div>
                      </td>
                      <td className="px-3 md:px-6 py-4">
                        <div className="text-xs md:text-sm text-gray-900 whitespace-nowrap">
                          {customer.contact || "-"}
                        </div>
                        <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">
                          {customer.phone || "-"}
                        </div>
                      </td>
                      <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                        {customer.date || "-"}
                      </td>
                      <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                        {customer.duration || "-"}
                      </td>
                      <td className="px-3 md:px-6 py-4 text-xs md:text-sm font-medium text-gray-900 whitespace-nowrap">
                        ${customer.revenue || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              startIndex={startIndex}
              itemsPerPage={itemsPerPage}
              totalItems={filteredCustomers.length}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ReportAnalysisPage;
