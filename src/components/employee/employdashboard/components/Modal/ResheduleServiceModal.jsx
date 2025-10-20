import React, { useState, useRef, useEffect } from 'react';
import { X, Calendar as FaCalendarAlt, Clock as FaClock } from 'lucide-react';
import { IoChevronDown } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResheduleServiceModal = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useTranslation();

  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);
  const modalRef = useRef(null);
  const dropdownRef = useRef(null);

  const initialFormData = {
    customer: '',
    serviceType: 'Mapping & Surveying',
    preferredDate: '',
    preferredTime: '',
    specialInstruction: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const serviceTypes = [
    'Mapping & Surveying',
    'Land Survey',
    'Construction Survey',
    'Topographic Survey',
  ];

  // Modal close হলে ফর্ম reset
  const handleClose = () => {
    setFormData(initialFormData);
    setErrors({});
    setDropdownOpen(false);
    onClose();
  };

  // Outside click handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.customer) newErrors.customer = 'This field is required';
    if (!formData.preferredDate) newErrors.preferredDate = 'This field is required';
    if (!formData.preferredTime) newErrors.preferredTime = 'This field is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (onSubmit) onSubmit(formData);
    toast.success('Service request rescheduled successfully!');

    setFormData(initialFormData);
    setErrors({});
    setDropdownOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-2xl w-full max-w-md md:max-w-lg lg:max-w-xl relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            {t('dashboard.employee.pages.order.rescheduleServiceOrder.title')}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5">
          {/* Customer Field */}
          <div className="mb-4">
            <label className="block text-base font-medium text-gray-800 mb-2">
              {t('dashboard.employee.pages.order.rescheduleServiceOrder.orderId')}
            </label>
            <input
              type="text"
              placeholder={t('dashboard.employee.pages.order.rescheduleServiceOrder.customerName')}
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              className={`w-full px-3 py-2 border ${
                errors.customer ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 ${
                errors.customer ? 'focus:ring-red-500' : 'focus:ring-black/70'
              } text-base`}
            />
            {errors.customer && (
              <p className="text-red-500 text-base mt-1">{errors.customer}</p>
            )}
          </div>

          {/* Service Type Dropdown */}
          <div className="mb-4 relative" ref={dropdownRef}>
            <label className="block text-base font-medium text-gray-800 mb-2">
              {t('dashboard.employee.pages.order.rescheduleServiceOrder.serviceType')}
            </label>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-black/70 text-base bg-white"
            >
              <span>{formData.serviceType}</span>
              <IoChevronDown
                className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 z-50">
                {serviceTypes.map((type) => (
                  <div
                    key={type}
                    onClick={() => {
                      setFormData({ ...formData, serviceType: type });
                      setDropdownOpen(false);
                    }}
                    className={`px-3 py-2 hover:bg-green-50 cursor-pointer ${
                      formData.serviceType === type ? 'bg-green-100 font-medium' : ''
                    }`}
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Preferred Date */}
            <div>
              <label className="block text-base font-medium text-gray-800 mb-2">
                {t('dashboard.employee.pages.order.modal.preferredDate')}
              </label>
              <div className="relative">
                <input
                  ref={dateInputRef}
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className={`w-full px-3 py-2 pr-10 border ${
                    errors.preferredDate ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 ${
                    errors.preferredDate ? 'focus:ring-red-500' : 'focus:ring-black/70'
                  } text-sm appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute`}
                />
                <FaCalendarAlt
                  onClick={() => dateInputRef.current && dateInputRef.current.showPicker()}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                />
              </div>
              {errors.preferredDate && (
                <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>
              )}
            </div>

            {/* Preferred Time */}
            <div>
              <label className="block text-base font-medium text-gray-800 mb-2">
                {t('dashboard.employee.pages.order.modal.preferredTime')}
              </label>
              <div className="relative">
                <input
                  ref={timeInputRef}
                  type="time"
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className={`w-full px-3 py-2 pr-10 border ${
                    errors.preferredTime ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 ${
                    errors.preferredTime ? 'focus:ring-red-500' : 'focus:ring-black/70'
                  } text-sm appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute`}
                />
                <FaClock
                  onClick={() => timeInputRef.current && timeInputRef.current.showPicker()}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                />
              </div>
              {errors.preferredTime && (
                <p className="text-red-500 text-xs mt-1">{errors.preferredTime}</p>
              )}
            </div>
          </div>

          {/* Special Instruction Field */}
          <div className="mb-6">
            <label className="block text-base font-medium text-gray-800 mb-2">
              {t('dashboard.employee.pages.order.rescheduleServiceOrder.specialInstruction')}
            </label>
            <textarea
              value={formData.specialInstruction}
              onChange={(e) => setFormData({ ...formData, specialInstruction: e.target.value })}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/70 text-sm resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#28A844] hover:bg-green-600 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 text-sm md:text-base"
          >
            {t('dashboard.employee.pages.order.rescheduleServiceOrder.createRequest')}
          </button>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ResheduleServiceModal;
