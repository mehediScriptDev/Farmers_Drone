import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { FaRupeeSign, FaAngleUp, FaAngleDown, FaTrophy } from "react-icons/fa";
import { PiUsersThreeBold } from "react-icons/pi";
import { FiUserPlus } from "react-icons/fi";
import AddCustomerModal from "./AddCustomerModal";
import axiosInstance from "../../config/axiosConfig";
import { FiFilter, FiChevronDown } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";

const FieldAgentDashboard = () => {
  const { t } = useTranslation();

  const [statsData, setStatsData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  // Sorting state
  const [sortKey, setSortKey] = useState("customerList");
  const [sortDir, setSortDir] = useState("asc");
  // user rank

  const [rank, setRank] = useState("Silver");

  const usersPerPage = 4;
  const [searchTerm, setSearchTerm] = useState("");

  const ICONS = {
    PiUsersThreeBold: PiUsersThreeBold,
    FaRupeeSign: FaRupeeSign,
  };

  const menuItems = [
    { label: "User", value: "user" },
    { label: "Role", value: "role" },
    { label: "Registration Commission", value: "registration" },
    { label: "First Order Commission", value: "first-order" },
    { label: "Effective Date", value: "effective-date" },
  ];

  const staticCardHeaders = [
    { title: t("dashboard.fieldAgent.fieldAgentSummery.userAdded") },
    { title: t("dashboard.fieldAgent.fieldAgentSummery.ActiveCustomers") },
    { title: t("dashboard.fieldAgent.fieldAgentSummery.totalcommition") },
    { title: t("dashboard.fieldAgent.fieldAgentSummery.totalPayments") },
  ];

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        setLoading(true);
        const data = await axiosInstance.get(
          "/fieldAgent/data/fieldAgentData.json"
        );
        setStatsData(data.data.statsData);
        setTableData(data.data.tableData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgentData();
  }, []);

  // Sorting helpers
  const handleSortChange = (key) => {
    const next = sortKey === key && sortDir === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortDir(next);
    setCurrentPage(1);
  };

  const sortedData = useMemo(() => {
    const copy = [...tableData];
    copy.sort((a, b) => {
      const av = a?.[sortKey] ?? "";
      const bv = b?.[sortKey] ?? "";

      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;

      const an = Number(av);
      const bn = Number(bv);
      if (!Number.isNaN(an) && !Number.isNaN(bn)) {
        return sortDir === "asc" ? an - bn : bn - an;
      }

      const ad = Date.parse(av);
      const bd = Date.parse(bv);
      if (!Number.isNaN(ad) && !Number.isNaN(bd)) {
        return sortDir === "asc" ? ad - bd : bd - ad;
      }

      const res = String(av).localeCompare(String(bv));
      return sortDir === "asc" ? res : -res;
    });
    return copy;
  }, [tableData, sortKey, sortDir]);


  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return sortedData;
    const rx = new RegExp(
      searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "i"
    );

    return sortedData.filter((row) => {
      const haystacks = [
        row.customerList,
        row.role,
        row.registrationCommission,
        row.firstOrderCommission,
        row.effectiveDate,
        row.registrationDate,
        row.customerType,
        row.nextFollowUpDate,
        row.serviceInterest,
        row.quickActions,
      ];
      return haystacks.some((h) => rx.test((h ?? "").toString()));
    });
  }, [sortedData, searchTerm]);

  // Pagination based on sorted data
  const totalUsers = filteredData.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (item) => {
    console.log("Selected:", item.label);
    setIsOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {String(error)}</p>;

  return (
    <div className="   bg-[#FAFFFD] p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {statsData.map((stat, index) => {
            const IconComponent = ICONS[stat.icon]; // get actual component
            return (
              <div
                key={stat.id}
                className="bg-white rounded-lg shadow-sm p-5 relative"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-black text-sm md:text-base mb-2 font-bold">
                      {staticCardHeaders[index].title}
                    </p>

                    <h3 className="text-2xl md:text-4xl font-semi text-black mb-2">
                      {stat.value}
                    </h3>
                    <p className="text-button-primary text-sm font-medium">
                      {stat.change}
                    </p>
                  </div>
                  <div className={`${stat.bgColor} rounded-lg p-3 ml-4`}>
                    {IconComponent && (
                      <IconComponent className="text-white" size={24} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-white p-8 sm:p-12 rounded-2xl  w-full max-w-xs border border-gray-100 mb-10">
          <div className="flex justify-center mb-1">
            {rank == "Gold" && (
              <FaTrophy
                className="text-8xl"
                style={{
                  color: "#FFD700",
                  filter: "drop-shadow(0 6px 8px rgba(255, 215, 0, 0.3))",
                }}
                aria-label="Gold Trophy Icon"
              />
            )}
            {rank == "Silver" && (
              <FaTrophy
                className="text-8xl"
                style={{
                  color: "#C0C0C0",
                  filter: "drop-shadow(0 8px 16px rgba(192, 192, 192, 0.4)))",
                }}
                aria-label="Silver Trophy Icon"
              />
            )}
            {rank == "Bronze" && (
              <FaTrophy
                className="text-8xl"
                style={{
                  color: "#CD7F32",
                  filter: "drop-shadow(0 8px 16px rgba(205, 127, 50, 0.4))",
                }}
                aria-label="Silver Trophy Icon"
              />
            )}
          </div>

          {/* Text - styled in green as shown in the original image */}
          <p className="md:text-2xl font-medium tracking-wider text-green-600 text-center">
            {rank}
          </p>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="flex justify-between items-center p-2 sm:p-4 md:p-6 flex-col lg:flex-row gap-3">
            <h2 className="sm:text-lg md:text-2xl font-semibold text-black">
              {t("dashboard.fieldAgent.userAdd.AddedByYou")}
            </h2>
            <div className="flex items-center flex-col gap-2 md:flex-row">
              <div className="flex gap-4 mr-2">
                <div className="relative w-full md:w-1/2 lg:w-2/3">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-2xl">
                    <CiSearch />
                  </span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-100 rounded-xl text-base"
                  />
                </div>
                <div className="relative inline-block text-left">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full shadow-sm bg-transparent hover:bg-gray-100 transition duration-150 ease-in-out"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                  >
                    <FiFilter className="w-5 h-5 text-gray-700" />
                    <span className="text-gray-700 font-medium">Filter</span>
                    <FiChevronDown
                      className={`w-4 h-4 text-gray-700 transition-transform duration-200 ${
                        isOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      className="absolute left-0 mt-2 w-64 origin-top-right rounded-lg bg-white shadow-lg "
                      role="menu"
                      aria-orientation="vertical"
                    >
                      <div className="py-1" role="none">
                        {menuItems.map((item, index) => (
                          <a
                            key={index}
                            onClick={() => handleSelect(item)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600 transition duration-150 ease-in-out cursor-pointer"
                            role="menuitem" // Accessibility attribute
                          >
                            {item.label === "User" && (
                              <div className="w-1 h-5 mr-3 rounded-sm bg-green-500"></div>
                            )}
                            {item.label !== "User" && (
                              <div className="w-1 h-5 mr-3 bg-transparent"></div>
                            )}

                            {/* The Label Text */}
                            <span
                              className={
                                item.label === "User" ? "font-semibold" : ""
                              }
                            >
                              {item.label}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#28A844] hover:bg-green-700 hover:cursor-pointer text-white px-1 sm:px-2 py-2 md:px-6  sm:py-1 md:py-2.5 rounded-sm font-medium flex items-center gap-2 text-sm md:text-base transition-colors"
              >
                <FiUserPlus size={18} />
                {t("dashboard.fieldAgent.userAdd.AddCustomer")}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full lg:w-[1800px]  text-left">
              <thead className="bg-[#F5F7FA]">
                <tr>
                  {/* Always visible columns */}
                  <th
                    className="w-64 text-left text-sm md:text-base font-semibold text-black px-6 py-4"
                    aria-sort={
                      sortKey === "customerList"
                        ? sortDir === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    <button
                      type="button"
                      onClick={() => handleSortChange("customerList")}
                      className="flex gap-2 items-center"
                    >
                      <span>
                        {t("dashboard.fieldAgent.tableHeader.CustomerList")}
                      </span>
                      <span className="flex flex-col leading-none -space-y-1 text-slate-500">
                        <FaAngleUp
                          className={`h-3.5 w-3.5 ${
                            sortKey === "customerList" && sortDir === "asc"
                              ? "text-slate-900"
                              : ""
                          }`}
                        />
                        <FaAngleDown
                          className={`h-3.5 w-3.5 -mt-1 ${
                            sortKey === "customerList" && sortDir === "desc"
                              ? "text-slate-900"
                              : ""
                          }`}
                        />
                      </span>
                    </button>
                  </th>
                  <th
                    className="w-64 text-left text-sm md:text-base font-semibold text-black px-6 py-4"
                    aria-sort={
                      sortKey === "role"
                        ? sortDir === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    <button
                      type="button"
                      onClick={() => handleSortChange("role")}
                      className="flex gap-2 items-center"
                    >
                      <span>{t("dashboard.fieldAgent.tableHeader.Role")}</span>
                      <span className="flex flex-col leading-none -space-y-1 text-slate-500">
                        <FaAngleUp
                          className={`h-3.5 w-3.5 ${
                            sortKey === "role" && sortDir === "asc"
                              ? "text-slate-900"
                              : ""
                          }`}
                        />
                        <FaAngleDown
                          className={`h-3.5 w-3.5 -mt-1 ${
                            sortKey === "role" && sortDir === "desc"
                              ? "text-slate-900"
                              : ""
                          }`}
                        />
                      </span>
                    </button>
                  </th>
                  <th
                    className="w-64 text-left text-sm md:text-base font-semibold text-black px-6 py-4"
                    aria-sort={
                      sortKey === "registrationCommission"
                        ? sortDir === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    <button
                      type="button"
                      onClick={() => handleSortChange("registrationCommission")}
                      className="flex gap-2 items-center"
                    >
                      <span>
                        {t(
                          "dashboard.fieldAgent.tableHeader.RegistrationCommission"
                        )}
                      </span>
                      <span className="flex flex-col leading-none -space-y-1 text-slate-500">
                        <FaAngleUp
                          className={`h-3.5 w-3.5 ${
                            sortKey === "registrationCommission" &&
                            sortDir === "asc"
                              ? "text-slate-900"
                              : ""
                          }`}
                        />
                        <FaAngleDown
                          className={`h-3.5 w-3.5 -mt-1 ${
                            sortKey === "registrationCommission" &&
                            sortDir === "desc"
                              ? "text-slate-900"
                              : ""
                          }`}
                        />
                      </span>
                    </button>
                  </th>
                  <th
                    className="w-64 text-left text-sm md:text-base font-semibold text-black px-6 py-4"
                    aria-sort={
                      sortKey === "firstOrderCommission"
                        ? sortDir === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    <button
                      type="button"
                      onClick={() => handleSortChange("firstOrderCommission")}
                      className="flex gap-2 items-center"
                    >
                      <span>
                        {t(
                          "dashboard.fieldAgent.tableHeader.FirstOrderCommission"
                        )}
                      </span>
                      <span className="flex flex-col leading-none -space-y-1 text-slate-500">
                        <FaAngleUp
                          className={`h-3.5 w-3.5 ${
                            sortKey === "firstOrderCommission" &&
                            sortDir === "asc"
                              ? "text-slate-900"
                              : ""
                          }`}
                        />
                        <FaAngleDown
                          className={`h-3.5 w-3.5 -mt-1 ${
                            sortKey === "firstOrderCommission" &&
                            sortDir === "desc"
                              ? "text-slate-900"
                              : ""
                          }`}
                        />
                      </span>
                    </button>
                  </th>
                  <th
                    className="w-64 text-left text-sm md:text-base font-semibold text-black px-6 py-4"
                    aria-sort={
                      sortKey === "effectiveDate"
                        ? sortDir === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    <button
                      type="button"
                      onClick={() => handleSortChange("effectiveDate")}
                      className="flex gap-2 items-center"
                    >
                      <span>
                        {t("dashboard.fieldAgent.tableHeader.EffectiveDate")}
                      </span>
                      <span className="flex flex-col leading-none -space-y-1 text-slate-500">
                        <FaAngleUp
                          className={`h-3.5 w-3.5 ${
                            sortKey === "effectiveDate" && sortDir === "asc"
                              ? "text-slate-900"
                              : ""
                          }`}
                        />
                        <FaAngleDown
                          className={`h-3.5 w-3.5 -mt-1 ${
                            sortKey === "effectiveDate" && sortDir === "desc"
                              ? "text-slate-900"
                              : ""
                          }`}
                        />
                      </span>
                    </button>
                  </th>

                  {/* Scrollable columns */}
                  <th
                    className="w-64 text-left text-sm md:text-base font-semibold text-black px-6 py-4"
                    aria-sort={
                      sortKey === "registrationDate"
                        ? sortDir === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    <button
                      type="button"
                      onClick={() => handleSortChange("registrationDate")}
                      className="flex gap-2 items-center"
                    >
                      <span>
                        {t("dashboard.fieldAgent.tableHeader.RegistrationDate")}
                      </span>
                      <span className="flex flex-col leading-none -space-y-1 text-slate-500">
                        <FaAngleUp
                          className={`h-3.5 w-3.5 ${
                            sortKey === "registrationDate" && sortDir === "asc"
                              ? "text-slate-900"
                              : ""
                          }`}
                        />
                        <FaAngleDown
                          className={`h-3.5 w-3.5 -mt-1 ${
                            sortKey === "registrationDate" && sortDir === "desc"
                              ? "text-slate-900"
                              : ""
                          }`}
                        />
                      </span>
                    </button>
                  </th>
                  <th
                    className="w-64 text-left text-sm md:text-base font-semibold text-black px-6 py-4"
                    aria-sort={
                      sortKey === "customerType"
                        ? sortDir === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    <button
                      type="button"
                      onClick={() => handleSortChange("customerType")}
                      className="flex gap-2 items-center"
                    >
                      <span>
                        {t("dashboard.fieldAgent.tableHeader.CustomerType")}
                      </span>
                      <span className="flex flex-col leading-none -space-y-1 text-slate-500">
                        <FaAngleUp
                          className={`h-3.5 w-3.5 ${
                            sortKey === "customerType" && sortDir === "asc"
                              ? "text-slate-900"
                              : ""
                          }`}
                        />
                        <FaAngleDown
                          className={`h-3.5 w-3.5 -mt-1 ${
                            sortKey === "customerType" && sortDir === "desc"
                              ? "text-slate-900"
                              : ""
                          }`}
                        />
                      </span>
                    </button>
                  </th>
                  <th
                    className="w-64 text-left text-sm md:text-base font-semibold text-black px-6 py-4"
                    aria-sort={
                      sortKey === "nextFollowUpDate"
                        ? sortDir === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    <button
                      type="button"
                      onClick={() => handleSortChange("nextFollowUpDate")}
                      className="flex gap-2 items-center"
                    >
                      <span>
                        {t("dashboard.fieldAgent.tableHeader.NextFollowUpDate")}
                      </span>
                      <span className="flex flex-col leading-none -space-y-1 text-slate-500">
                        <FaAngleUp
                          className={`h-3.5 w-3.5 ${
                            sortKey === "nextFollowUpDate" && sortDir === "asc"
                              ? "text-slate-900"
                              : ""
                          }`}
                        />
                        <FaAngleDown
                          className={`h-3.5 w-3.5 -mt-1 ${
                            sortKey === "nextFollowUpDate" && sortDir === "desc"
                              ? "text-slate-900"
                              : ""
                          }`}
                        />
                      </span>
                    </button>
                  </th>
                  <th
                    className="w-64 text-left text-sm md:text-base font-semibold text-black px-6 py-4"
                    aria-sort={
                      sortKey === "serviceInterest"
                        ? sortDir === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    <button
                      type="button"
                      onClick={() => handleSortChange("serviceInterest")}
                      className="flex gap-2 items-center"
                    >
                      <span>
                        {t("dashboard.fieldAgent.tableHeader.ServiceInterest")}
                      </span>
                      <span className="flex flex-col leading-none -space-y-1 text-slate-500">
                        <FaAngleUp
                          className={`h-3.5 w-3.5 ${
                            sortKey === "serviceInterest" && sortDir === "asc"
                              ? "text-slate-900"
                              : ""
                          }`}
                        />
                        <FaAngleDown
                          className={`h-3.5 w-3.5 -mt-1 ${
                            sortKey === "serviceInterest" && sortDir === "desc"
                              ? "text-slate-900"
                              : ""
                          }`}
                        />
                      </span>
                    </button>
                  </th>
                  <th className="w-64 text-left text-sm md:text-base font-semibold text-black px-6 py-4">
                    {t("dashboard.fieldAgent.tableHeader.QuickActions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <td className="py-4 px-6 text-sm text-black">
                      {row.customerList}
                    </td>
                    <td className="py-4 px-6 text-sm text-black">{row.role}</td>
                    <td className="py-4 px-6 text-sm text-black lg:text-center">
                      {row.registrationCommission}
                    </td>
                    <td className="py-4 px-6 text-sm text-black lg:text-center">
                      {row.firstOrderCommission}
                    </td>
                    <td className="py-4 px-6 text-sm text-black">
                      {row.effectiveDate}
                    </td>

                    {/* Scrollable columns */}
                    <td className="py-4 px-6 text-sm text-black">
                      {row.registrationDate}
                    </td>
                    <td className="py-4 px-6 text-sm text-black">
                      {row.customerType}
                    </td>
                    <td className="py-4 px-6 text-sm text-black">
                      {row.nextFollowUpDate}
                    </td>
                    <td className="py-4 px-6 text-sm text-black lg:text-center">
                      {row.serviceInterest}
                    </td>
                    <td className="py-4 px-6 text-sm text-black">
                      {row.quickActions}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="py-4 md:py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-200 pb-2 md:pb-3">
              <p className="text-sm text-black px-4 md:px-6">
                {t("dashboard.fieldAgent.pagination.showing")}{" "}
                {currentUsers.length} of {totalUsers}{" "}
                {t("dashboard.fieldAgent.pagination.users")}
              </p>
              <div className="flex flex-row flex-wrap items-center gap-0.5 sm:gap-2 px-3 sm:px-4 md:px-6">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="px-2 sm:px-3 py-1.5 text-sm text-gray-600 !bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {t("dashboard.fieldAgent.pagination.previous")}
                </button>

                {/* Dynamically create page number buttons */}
                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    className={`px-3 py-1.5 text-sm rounded transition-colors ${
                      currentPage === number
                        ? "bg-[#28A844] text-white font-medium"
                        : "!bg-gray-100 text-black hover:bg-gray-200"
                    }`}
                  >
                    {number}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-2 sm:px-3 py-1.5 text-sm text-gray-600 !bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {t("dashboard.fieldAgent.pagination.next")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <AddCustomerModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default FieldAgentDashboard;
