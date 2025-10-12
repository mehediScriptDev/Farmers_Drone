import React, { useState } from 'react'
import { X, Calendar, Clock, } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CancleModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    customer: '',
    serviceType: 'Mapping & Surveying',
    preferredDate: '',
    preferredTime: '',
    specialInstruction: ''
  });
 const { t } = useTranslation();
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
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">{t('dashboard.employee.pages.order.cancelServiceOrder.title')}</h2>
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
            {t('dashboard.employee.pages.order.cancelServiceOrder.orderId')}
            </label>
            <input
              type="text"
              placeholder={t('dashboard.employee.pages.order.cancelServiceOrder.customerName')}
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Service Type Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('dashboard.employee.pages.order.cancelServiceOrder.action')}
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
              <option>{t('dashboard.employee.pages.order.cancelServiceOrder.mappingSurveying')}</option>
            
            </select>
          </div>

         
          {/* Special Instruction Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('dashboard.employee.pages.order.cancelServiceOrder.reason')}
            </label>
            <textarea
              
              value={formData.specialInstruction}
              onChange={(e) => setFormData({ ...formData, specialInstruction: e.target.value })}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-red-700 hover:bg-red-900 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 text-sm md:text-base"
          >
           {t('dashboard.employee.pages.order.cancelServiceOrder.cancel')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CancleModal
