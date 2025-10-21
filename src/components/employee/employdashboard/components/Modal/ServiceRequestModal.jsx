







import React, { useState, useRef, useEffect } from 'react';
import { FaTimes, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { IoChevronDown } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ServiceRequestModal = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const modalRef = useRef(null);
  const serviceTypeDropdownRef = useRef(null);
  const priorityDropdownRef = useRef(null);
  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);

  // Service Types with subcategories
  const serviceTypesData = {
    mappingAndSurveying: {
      label: 'Mapping & Surveying',
      subcategories: ['Land Mapping', 'Terrain Survey', 'Boundary Survey', 'Topographic Survey']
    },
    aerialMediaServices: {
      label: 'Aerial Media Services',
      subcategories: ['Photography', 'Videography', 'Thermal Imaging', '3D Modeling']
    },
    agriculture: {
      label: 'Agriculture',
      subcategories: ['Crop Monitoring', 'Soil Analysis', 'Irrigation Planning', 'Yield Estimation']
    },
    inspectionAndInfrastructure: {
      label: 'Inspection & Infrastructure',
      subcategories: ['Bridge Inspection', 'Power Line Inspection', 'Pipeline Inspection', 'Building Assessment']
    },
    specializedOperations: {
      label: 'Specialized Operations',
      subcategories: ['Search & Rescue', 'Emergency Response', 'Environmental Monitoring', 'Wildlife Tracking']
    },
    supportAndTraining: {
      label: 'Support & Training',
      subcategories: ['Pilot Training', 'Technical Support', 'Maintenance Service', 'Consultation']
    },
    other: {
      label: 'Other',
      subcategories: ['Custom Service', 'Additional Service']
    }
  };

  const serviceTypes = [
    'mappingAndSurveying',
    'aerialMediaServices',
    'agriculture',
    'inspectionAndInfrastructure',
    'specializedOperations',
    'supportAndTraining',
    'other'
  ];

  const priorities = ['low', 'medium', 'high', 'critical'];

  const [formData, setFormData] = useState({
    customer: '',
    serviceType: 'mappingAndSurveying',
    serviceSubType: '',
    priority: 'low',
    preferredDate: '',
    preferredTime: '',
    specialInstruction: ''
  });

  const [errors, setErrors] = useState({
    customer: '',
    preferredDate: '',
    preferredTime: ''
  });

  const [serviceTypeOpen, setServiceTypeOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [priorityOpen, setPriorityOpen] = useState(false);

  // Handle dropdown outside click only
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (serviceTypeDropdownRef.current && !serviceTypeDropdownRef.current.contains(e.target)) {
        setServiceTypeOpen(false);
      }
      if (priorityDropdownRef.current && !priorityDropdownRef.current.contains(e.target)) {
        setPriorityOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const resetForm = () => {
    setFormData({
      customer: '',
      serviceType: 'mappingAndSurveying',
      serviceSubType: '',
      priority: 'low',
      preferredDate: '',
      preferredTime: '',
      specialInstruction: ''
    });
    setErrors({
      customer: '',
      preferredDate: '',
      preferredTime: ''
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validate = () => {
    let tempErrors = { customer: '', preferredDate: '', preferredTime: '' };
    let isValid = true;

    if (!formData.customer.trim()) {
      tempErrors.customer = 'This field is required';
      isValid = false;
    }
    if (!formData.preferredDate.trim()) {
      tempErrors.preferredDate = 'This field is required';
      isValid = false;
    }
    if (!formData.preferredTime.trim()) {
      tempErrors.preferredTime = 'This field is required';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubCategorySelect = (category, subCategory) => {
    setFormData({
      ...formData,
      serviceType: category,
      serviceSubType: subCategory
    });
    setServiceTypeOpen(false);
    setHoveredMenu(null);
  };

  const handleSubmit = () => {
    if (!validate()) return;

    toast.success('Service request created successfully!');
    if (onSubmit) onSubmit(formData);
    setTimeout(() => {
      resetForm();
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-2xl w-full max-w-md md:max-w-xl lg:max-w-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            {t('dashboard.employee.pages.order.modal.createServiceRequest')}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5">
          {/* Customer Field */}
          <div className="mb-4">
            <label className="block text-base font-medium text-gray-800 mb-2">
              {t('dashboard.employee.pages.order.modal.customer')}
            </label>
            <input
              type="text"
              placeholder={t('dashboard.employee.pages.order.modal.enterCustomerNameOrPhone')}
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black/70 text-sm ${
                errors.customer ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.customer && (
              <p className="text-red-500 text-xs mt-1">{errors.customer}</p>
            )}
          </div>

          {/* Service Type Dropdown with Nested Menu */}
          <div className="mb-4" ref={serviceTypeDropdownRef}>
            <label className="block text-base font-medium text-gray-800 mb-2">
              {t('dashboard.employee.pages.order.modal.serviceType')}
            </label>
            <button
              type="button"
              onClick={() => setServiceTypeOpen(!serviceTypeOpen)}
              className="w-1/2 px-3 py-2  bg-[#F7FFE5] rounded-md flex items-center justify-between  text-base"
            >
              <span className="truncate">
                {formData.serviceSubType || t(`dashboard.employee.dropdown.${formData.serviceType}`)}
              </span>
              <IoChevronDown
                className={`transition-transform duration-200 flex-shrink-0 ${serviceTypeOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {serviceTypeOpen && (
              <div className="absolute w-1/2 mt-1 bg-white shadow-lg rounded-md border border-gray-200 z-50 max-h-96 overflow-visible">
                {serviceTypes.map((type) => (
                  <div
                    key={type}
                    className="relative"
                    data-menu-item={type}
                    onMouseEnter={() => setHoveredMenu(type)}
                    onMouseLeave={() => setHoveredMenu(null)}
                  >
                    {/* Main Category */}
                    <div
                      onClick={() => {
                        setFormData({ ...formData, serviceType: type });
                      }}
                      className={`px-3 py-2 cursor-pointer hover:bg-gray-100 transition ${
                        formData.serviceType === type ? 'bg-[#F7FFE5] border-l-2 border-green-400 font-medium' : ''
                      }`}
                    >
                      {t(`dashboard.employee.dropdown.${type}`)}
                     
                    </div>

                    {/* Submenu - appears on hover */}
                    {hoveredMenu === type && (
                      <div className="fixed bg-white shadow-lg rounded-md border border-gray-200 z-50 w-48" style={{
                        top: document.querySelector(`[data-menu-item="${type}"]`)?.getBoundingClientRect().top || '0px',
                        left: (document.querySelector(`[data-menu-item="${type}"]`)?.getBoundingClientRect().right || 0) + 10 + 'px',
                      }}>
                        {serviceTypesData[type].subcategories.map((subCat) => (
                          <div
                            key={subCat}
                            onClick={() => handleSubCategorySelect(type, subCat)}
                            className={`px-3 py-2 cursor-pointer text-sm hover:bg-green-50 transition ${
                              formData.serviceSubType === subCat
                                ? 'bg-[#28A844] text-white font-medium'
                                : ''
                            }`}
                          >
                            {subCat}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Priority Dropdown */}
          <div className="mb-4 relative" ref={priorityDropdownRef}>
            <label className="block text-base font-medium text-gray-800 mb-2">
              Priority
            </label>
            <button
              type="button"
              onClick={() => setPriorityOpen(!priorityOpen)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-black/70 text-base bg-white"
            >
              <span>{t(`dashboard.employee.dropdown.${formData.priority}`)}</span>
              <IoChevronDown
                className={`transition-transform duration-200 ${priorityOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {priorityOpen && (
              <div className="absolute mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 z-50">
                {priorities.map((level) => (
                  <div
                    key={level}
                    onClick={() => {
                      setFormData({ ...formData, priority: level });
                      setPriorityOpen(false);
                    }}
                    className={`px-3 py-2 cursor-pointer ${
                      formData.priority === level ? 'bg-[#28A844] text-white font-medium' : ''
                    }`}
                  >
                    {t(`dashboard.employee.dropdown.${level}`)}
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
                  onChange={(e) =>
                    setFormData({ ...formData, preferredDate: e.target.value })
                  }
                  className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-black/70 text-sm appearance-none ${
                    errors.preferredDate ? 'border-red-500' : 'border-gray-300'
                  } [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute`}
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
                  onChange={(e) =>
                    setFormData({ ...formData, preferredTime: e.target.value })
                  }
                  className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-black/70 text-sm appearance-none ${
                    errors.preferredTime ? 'border-red-500' : 'border-gray-300'
                  } [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute`}
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

          {/* Special Instruction */}
          <div className="mb-6">
            <label className="block text-base font-medium text-gray-800 mb-2">
              {t('dashboard.employee.pages.order.modal.specialInstruction')}
            </label>
            <textarea
              placeholder="Any special instructions or requirements..."
              value={formData.specialInstruction}
              onChange={(e) =>
                setFormData({ ...formData, specialInstruction: e.target.value })
              }
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#28A844] hover:bg-green-600 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 text-sm md:text-base"
          >
            {t('dashboard.employee.pages.order.modal.createRequest') || 'Create Request'}
          </button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ServiceRequestModal;