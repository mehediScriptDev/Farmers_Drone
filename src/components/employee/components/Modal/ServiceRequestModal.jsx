import React, { useState } from 'react'
import { X, Calendar, Clock, } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ServiceRequestModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    customer: '',
    serviceType: 'Mapping & Surveying',
    preferredDate: '',
    preferredTime: '',
    specialInstruction: ''
  });
 const { t, i18n } = useTranslation();
  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    if (onSubmit) {
      onSubmit(formData);
    }
    // Reset form after submission
    setFormData({
      customer: '',
      serviceType: 'Mapping & Surveying',
      preferredDate: '',
      preferredTime: '',
      specialInstruction: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md md:max-w-lg lg:max-w-xl relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">{t('dashboard.employee.pages.order.modal.createServiceRequest')}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5">
          {/* Customer Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-white/950 mb-2">
              {t('dashboard.employee.pages.order.modal.customer')}
            </label>
            <input
              type="text"
              placeholder={t('dashboard.employee.pages.order.modal.enterCustomerNameOrPhone')}
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Service Type Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('dashboard.employee.pages.order.modal.serviceType')}
            </label>
            <select
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm bg-white appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center'
              }}
            >
              <option>Mapping & Surveying</option>
              <option>Land Survey</option>
              <option>Construction Survey</option>
              <option>Topographic Survey</option>
            </select>
          </div>

          {/* Date and Time Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Preferred Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
               {t('dashboard.employee.pages.order.modal.preferredDate')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('dashboard.employee.pages.order.modal.dateFormat')}
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Preferred Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('dashboard.employee.pages.order.modal.preferredTime')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('dashboard.employee.pages.order.modal.timeFormat')}
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Special Instruction Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('dashboard.employee.pages.order.modal.specialInstruction')}
            </label>
            <textarea
              placeholder="Any special instructions or requirements..."
              value={formData.specialInstruction}
              onChange={(e) => setFormData({ ...formData, specialInstruction: e.target.value })}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 text-sm md:text-base"
          >
            Create Request
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceRequestModal
