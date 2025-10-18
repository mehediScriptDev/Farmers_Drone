
import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { IoChevronDown } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CancleModal = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const modalRef = useRef(null);
  const dropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    customer: '',
    serviceType: 'Mapping & Surveying',
    specialInstruction: ''
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const serviceTypes = [
    'Mapping & Surveying',
    'Land Survey',
    'Construction Survey',
    'Topographic Survey',
  ];

  // Outside click for modal & dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleSubmit = () => {
    if (!formData.customer || !formData.serviceType || !formData.specialInstruction) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (onSubmit) onSubmit(formData);

    toast.success('Service request cancelled successfully!');
    setFormData({
      customer: '',
      serviceType: 'Mapping & Surveying',
      specialInstruction: ''
    });
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
            {t('dashboard.employee.pages.order.cancelServiceOrder.title')}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5">
          {/* Customer */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              {t('dashboard.employee.pages.order.cancelServiceOrder.orderId')}
            </label>
            <input
              type="text"
              placeholder={t('dashboard.employee.pages.order.cancelServiceOrder.customerName')}
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
          </div>

          {/* Action Dropdown */}
          <div className="mb-4 relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('dashboard.employee.pages.order.cancelServiceOrder.action')}
            </label>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-green-500 text-base bg-white"
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

          {/* Reason */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('dashboard.employee.pages.order.cancelServiceOrder.reason')}
            </label>
            <textarea
              value={formData.specialInstruction}
              onChange={(e) => setFormData({ ...formData, specialInstruction: e.target.value })}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm resize-none"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-red-700 hover:bg-red-900 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 text-sm md:text-base"
          >
            {t('dashboard.employee.pages.order.cancelServiceOrder.cancel')}
          </button>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CancleModal;
