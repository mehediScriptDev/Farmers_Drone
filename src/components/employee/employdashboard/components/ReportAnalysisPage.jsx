import { useEffect, useState } from "react";
import { FiTrendingUp, FiShoppingCart, FiClock, FiCreditCard, FiChevronDown, FiChevronUp, FiSearch } from "react-icons/fi";
import axiosInstance from "../../../../config/axiosConfig";

const CustomDropdown = ({ label, options, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
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
  const [selectedPeriod, setSelectedPeriod] = useState("last30days");
  // eslint-disable-next-line no-unused-vars
  const [filters, setFilters] = useState({
    customerTypes: ["Aerial Media Services", "Ground Media Services"],
    serviceCategories: ["Aerial Photography & Videography (MP)", "Event Photography"],
  });

  const [summary, setSummary] = useState({});
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomerType, setSelectedCustomerType] = useState("");
  const [selectedServiceCategory, setSelectedServiceCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const itemsPerPage = 4;

  const periodOptions = [
    { key: "last7days", label: "Last 7 Days" },
    { key: "last30days", label: "Last 30 Days" },
    { key: "last60days", label: "Last 60 Days" },
    { key: "last90days", label: "Last 90 Days" },
    { key: "last6months", label: "Last 6 Months" },
    { key: "last12months", label: "Last 12 Months" },
  ];

  // Fetch data
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
      label: "Total Customers",
      value: summary.totalCustomers,
      change: "+13% vs last month",
      positive: true,
      icon: FiTrendingUp,
      bgColor: "bg-green-50",
    },
    {
      label: "Total Revenue",
      value: summary.totalRevenue,
      change: "+8% vs last month",
      positive: true,
      icon: FiShoppingCart,
      bgColor: "bg-blue-50",
    },
    {
      label: "Avg Duration",
      value: summary.avgDuration,
      change: "-5% vs last month",
      positive: false,
      icon: FiClock,
      bgColor: "bg-orange-50",
    },
    {
      label: "Pending Payments",
      value: summary.pendingPayments,
      change: "+12% vs last month",
      positive: true,
      icon: FiCreditCard,
      bgColor: "bg-purple-50",
    },
  ];

  // Filter customers
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

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="flex-1 p-4 md:px-12">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Customer Management</h1>
        <p className="text-sm md:text-base text-gray-600">
          Manage customer registration and profile setup
        </p>
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
              <div className="relative w-52">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 md:px-4 md:py-2 border border-[#E6E6E6] rounded-lg text-xs md:text-sm text-gray-700 transition-all duration-200"
                >
                  {periodOptions.find((p) => p.key === selectedPeriod)?.label}
                  {dropdownOpen ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <CustomDropdown
                label="Customer Type"
                options={filters.customerTypes}
                value={selectedCustomerType}
                onChange={(val) => {
                  setSelectedCustomerType(val);
                  setCurrentPage(1);
                }}
                placeholder="All Customer Types"
              />

              <CustomDropdown
                label="Service Category"
                options={filters.serviceCategories}
                value={selectedServiceCategory}
                onChange={(val) => {
                  setSelectedServiceCategory(val);
                  setCurrentPage(1);
                }}
                placeholder="All Service Categories"
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
                    <p className={`text-xs ${stat.positive ? "text-green-600" : "text-red-600"}`}>{stat.change}</p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Customer Table */}
      <div className="p-4 md:p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 md:p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">Customer Details</h2>

          {/* Search Field */}
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-xl">
              <FiSearch className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search by service name or company..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border-2 border-[#C2C2C2] rounded-xl focus:outline-none focus:ring-2 focus:ring-black/30 text-sm"
            />
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Loading customer data...</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-max">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">
                      Service / Name
                    </th>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">
                      Contact
                    </th>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">
                      Date
                    </th>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">
                      Duration
                    </th>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">
                      Revenue
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
                        <div className="text-xs md:text-sm text-gray-900 whitespace-nowrap">{customer.contact || "-"}</div>
                        <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">{customer.phone || "-"}</div>
                      </td>
                      <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">{customer.date || "-"}</td>
                      <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">{customer.duration || "-"}</td>
                      <td className="px-3 md:px-6 py-4 text-xs md:text-sm font-medium text-gray-900 whitespace-nowrap">
                        ${customer.revenue || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {/* Pagination */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Showing Text */}
              <div className="text-xs md:text-sm text-gray-600">
                Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} results
              </div>

              {/* Pagination Buttons */}
              <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                {/* Previous */}
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="px-2 sm:px-3 py-1.5 text-sm text-gray-600 !bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <button
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    className={`px-3 py-1.5 text-sm rounded transition-colors ${currentPage === number
                        ? "bg-[#28A844] text-white font-medium"
                        : "!bg-gray-100 text-black hover:bg-gray-200"
                      }`}
                  >
                    {number}
                  </button>
                ))}

                {/* Next */}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-2 sm:px-3 py-1.5 text-sm text-gray-600 !bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>

          </>
        )}
      </div>
    </div>
  );
};

export default ReportAnalysisPage;
