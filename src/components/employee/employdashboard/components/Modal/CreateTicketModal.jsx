


import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";


// ✅ Reusable Dropdown Component
const Dropdown = ({ label, options, selected, setSelected }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
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
      <label className="text-sm font-medium text-gray-700 block mb-1">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex justify-between items-center border border-gray-300 rounded-md px-3 py-2 text-sm bg-white 
        transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:outline-none hover:border-green-400`}
      >
        <span className={`${selected ? "text-gray-800" : "text-gray-400"}`}>
          {selected || `Select ${label}`}
        </span>
        <ChevronDown
          size={18}
          className={`text-gray-500 transform transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden z-50 border border-gray-200 transform transition-all duration-200 origin-top ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {options.map((option) => (
          <div
            key={option}
            onClick={() => {
              setSelected(option);
              setOpen(false);
            }}
            className={`px-3 py-2 cursor-pointer text-sm hover:bg-green-100 transition ${
              selected === option ? "bg-green-50 font-medium" : ""
            }`}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

const CreateTicketModal = ({ isOpen, onClose }) => {
  const [customer, setCustomer] = useState("");
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState("");
 const { t } = useTranslation();
  const modalRef = useRef(null);
  const priorities = [t("dashboard.employee.modal.low"), t("dashboard.employee.modal.medium"), t("dashboard.employee.modal.high")];
const categories = [t("dashboard.employee.modal.technicalIssue"), t("dashboard.employee.modal.billingIssue"), t("dashboard.employee.modal.other")];
const services = [t("dashboard.employee.modal.mappingSurveying"), t("dashboard.employee.modal.installation"), t("dashboard.employee.modal.maintenance")];


  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !customer ||
      !issueTitle ||
      !issueDescription ||
      !selectedPriority ||
      !selectedCategory ||
      !selectedService
    ) {
      toast.error("Please fill all required fields!");
      return;
    }

    toast.success("Ticket created successfully!");

    setTimeout(() => {
      onClose();
      // Clear form
      setCustomer("");
      setIssueTitle("");
      setIssueDescription("");
      setSelectedPriority("");
      setSelectedCategory("");
      setSelectedService("");
    }, 1000);
  };

  return (
    <>
      <ToastContainer position="top-right" />
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-2">
        <div
          ref={modalRef}
          className="bg-white rounded-lg shadow-lg w-full max-w-xl p-4 mx-2"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
            <h2 className="text-xl font-semibold">{t("dashboard.employee.modal.createTicket")}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 text-xl hover:text-gray-800"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-4 pt-4 pb-4 space-y-3">
            {/* Customer */}
            <div className="flex flex-col space-y-1">
              <label className="text-base font-medium text-gray-700">
                {t("dashboard.employee.modal.customer")} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder={t("dashboard.employee.modal.enterCustomerNameOrPhone")}
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-base outline-none focus:ring-2 focus:ring-green-500 focus:border-green-400"
              />
            </div>

            {/* Priority & Category */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Dropdown
                label={t("dashboard.employee.modal.priority")}
                options={priorities}
                selected={selectedPriority}
                setSelected={setSelectedPriority}
              />
              <Dropdown
                label={t("dashboard.employee.modal.category")}
                options={categories}
                selected={selectedCategory}
                setSelected={setSelectedCategory}
              />
            </div>

            {/* Issue Title */}
            <div className="flex flex-col space-y-1">
              <label className="text-base font-medium text-gray-700">
                {t("dashboard.employee.modal.issueTitle")} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder={t("dashboard.employee.modal.briefDescription")}
                value={issueTitle}
                onChange={(e) => setIssueTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-base outline-none focus:ring-2 focus:ring-green-500 focus:border-green-400"
              />
            </div>

            {/* Service Type */}
            <Dropdown
              label={t("dashboard.employee.modal.serviceType")}
              options={services}
              selected={selectedService}
              setSelected={setSelectedService}
            />

            {/* Issue Description */}
            <div className="flex flex-col space-y-1">
              <label className="text-base font-medium text-gray-700">
                {t("dashboard.employee.modal.issueDescription")} <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder={t("dashboard.employee.modal.detailedDescription")}
                rows="4"
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-base outline-none resize-none focus:ring-2 focus:ring-green-500 focus:border-green-400"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-md py-2 transition"
            >
              {t("dashboard.employee.modal.createTicket")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateTicketModal;
