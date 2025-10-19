// import React, { useState, useRef, useEffect } from 'react';
// import { FaTimes, FaCalendarAlt, FaClock } from 'react-icons/fa';
// import { IoChevronDown } from 'react-icons/io5';
// import { useTranslation } from 'react-i18next';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ServiceRequestModal = ({ isOpen, onClose, onSubmit }) => {
//   const { t } = useTranslation();
//   const modalRef = useRef(null);
//   const dropdownRef = useRef(null);

//   const [formData, setFormData] = useState({
//     customer: '',
//     serviceType: 'Mapping & Surveying',
//     preferredDate: '',
//     preferredTime: '',
//     specialInstruction: ''
//   });

//   const [dropdownOpen, setDropdownOpen] = useState(false);


//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setDropdownOpen(false);
//       }
//       if (modalRef.current && !modalRef.current.contains(e.target)) {
//         handleClose();
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const serviceTypes = [
//     'Mapping & Surveying',
//     'Land Survey',
//     'Construction Survey',
//     'Topographic Survey',
//   ];

//   const resetForm = () => {
//     setFormData({
//       customer: '',
//       serviceType: 'Mapping & Surveying',
//       preferredDate: '',
//       preferredTime: '',
//       specialInstruction: ''
//     });
//   };

//   const handleClose = () => {
//     resetForm();
//     onClose();
//   };

//   const handleSubmit = () => {
//     const { customer, preferredDate, preferredTime } = formData;
//     if (!customer || !preferredDate || !preferredTime) {
//       toast.error('Please fill in all required fields.');
//       return;
//     }
//     toast.success('Service request created successfully!');
//     if (onSubmit) onSubmit(formData);
//     setTimeout(() => {
//       resetForm();
//       onClose();
//     }, 3800);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//       <div
//         ref={modalRef}
//         className="bg-white rounded-lg shadow-2xl w-full max-w-md md:max-w-lg lg:max-w-xl relative"
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
//           <h2 className="text-lg md:text-xl font-semibold text-gray-800">
//             {t('dashboard.employee.pages.order.modal.createServiceRequest')}
//           </h2>
//           <button
//             onClick={handleClose}
//             className="text-gray-500 hover:text-gray-700 transition-colors"
//           >
//             <FaTimes className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Form */}
//         <div className="px-6 py-5">
//           {/* Customer Field */}
//           <div className="mb-4">
//             <label className="block text-base font-medium text-gray-800 mb-2">
//               {t('dashboard.employee.pages.order.modal.customer')}
//             </label>
//             <input
//               type="text"
//               placeholder={t('dashboard.employee.pages.order.modal.enterCustomerNameOrPhone')}
//               value={formData.customer}
//               onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
//             />
//           </div>

//           {/* Service Type Dropdown */}
//           <div className="mb-4 relative" ref={dropdownRef}>
//             <label className="block text-base font-medium text-gray-800 mb-2">
//               {t('dashboard.employee.pages.order.modal.serviceType')}
//             </label>
//             <button
//               type="button"
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-green-500 text-base bg-white"
//             >
//               <span>{formData.serviceType}</span>
//               <IoChevronDown
//                 className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
//               />
//             </button>

//             {dropdownOpen && (
//               <div className="absolute mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 z-50">
//                 {serviceTypes.map((type) => (
//                   <div
//                     key={type}
//                     onClick={() => {
//                       setFormData({ ...formData, serviceType: type });
//                       setDropdownOpen(false);
//                     }}
//                     className={`px-3 py-2 hover:bg-green-50 cursor-pointer ${formData.serviceType === type ? 'bg-[#28A844] font-medium' : ''
//                       }`}
//                   >
//                     {type}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Date & Time */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             {/* Preferred Date */}
//             <div>
//               <label className="block text-base font-medium text-gray-800 mb-2">
//                 {t('dashboard.employee.pages.order.modal.preferredDate')}
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder={t('dashboard.employee.pages.order.modal.dateFormat')}
//                   value={formData.preferredDate}
//                   onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
//                   className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
//                 />
//                 <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
//               </div>
//             </div>

//             {/* Preferred Time */}
//             <div>
//               <label className="block text-base font-medium text-gray-800 mb-2">
//                 {t('dashboard.employee.pages.order.modal.preferredTime')}
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder={t('dashboard.employee.pages.order.modal.timeFormat')}
//                   value={formData.preferredTime}
//                   onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
//                   className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
//                 />
//                 <FaClock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
//               </div>
//             </div>
//           </div>

//           {/* Special Instruction */}
//           <div className="mb-6">
//             <label className="block text-base font-medium text-gray-800 mb-2">
//               {t('dashboard.employee.pages.order.modal.specialInstruction')}
//             </label>
//             <textarea
//               placeholder="Any special instructions or requirements..."
//               value={formData.specialInstruction}
//               onChange={(e) => setFormData({ ...formData, specialInstruction: e.target.value })}
//               rows="4"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm resize-none"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             onClick={handleSubmit}
//             className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 text-sm md:text-base"
//           >
//             {t('dashboard.employee.pages.order.modal.createRequest') || 'Create Request'}
//           </button>
//         </div>
//       </div>

//       {/* Toast Container */}
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default ServiceRequestModal;







// import React, { useState, useRef, useEffect } from 'react';
// import { FaTimes, FaCalendarAlt, FaClock } from 'react-icons/fa';
// import { IoChevronDown } from 'react-icons/io5';
// import { useTranslation } from 'react-i18next';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ServiceRequestModal = ({ isOpen, onClose, onSubmit }) => {
//   const { t } = useTranslation();
//   const modalRef = useRef(null);
//   const dropdownRef = useRef(null);
//   const dateInputRef = useRef(null);
//   const timeInputRef = useRef(null);

//   const [formData, setFormData] = useState({
//     customer: '',
//     serviceType: 'Mapping & Surveying',
//     preferredDate: '',
//     preferredTime: '',
//     specialInstruction: ''
//   });

//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setDropdownOpen(false);
//       }
//       if (modalRef.current && !modalRef.current.contains(e.target)) {
//         handleClose();
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const serviceTypes = [
//     'Mapping & Surveying',
//     'Land Survey',
//     'Construction Survey',
//     'Topographic Survey',
//   ];

//   const resetForm = () => {
//     setFormData({
//       customer: '',
//       serviceType: 'Mapping & Surveying',
//       preferredDate: '',
//       preferredTime: '',
//       specialInstruction: ''
//     });
//   };

//   const handleClose = () => {
//     resetForm();
//     onClose();
//   };

//   const handleSubmit = () => {
//     const { customer, preferredDate, preferredTime } = formData;
//     if (!customer || !preferredDate || !preferredTime) {
//       toast.error('Please fill in all required fields.');
//       return;
//     }
//     toast.success('Service request created successfully!');
//     if (onSubmit) onSubmit(formData);
//     setTimeout(() => {
//       resetForm();
//       onClose();
//     }, 3000);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//       <div
//         ref={modalRef}
//         className="bg-white rounded-lg shadow-2xl w-full max-w-md md:max-w-lg lg:max-w-xl relative"
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
//           <h2 className="text-lg md:text-xl font-semibold text-gray-800">
//             {t('dashboard.employee.pages.order.modal.createServiceRequest')}
//           </h2>
//           <button
//             onClick={handleClose}
//             className="text-gray-500 hover:text-gray-700 transition-colors"
//           >
//             <FaTimes className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Form */}
//         <div className="px-6 py-5">
//           {/* Customer Field */}
//           <div className="mb-4">
//             <label className="block text-base font-medium text-gray-800 mb-2">
//               {t('dashboard.employee.pages.order.modal.customer')}
//             </label>
//             <input
//               type="text"
//               placeholder={t('dashboard.employee.pages.order.modal.enterCustomerNameOrPhone')}
//               value={formData.customer}
//               onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
//             />
//           </div>

//           {/* Service Type Dropdown */}
//           <div className="mb-4 relative" ref={dropdownRef}>
//             <label className="block text-base font-medium text-gray-800 mb-2">
//               {t('dashboard.employee.pages.order.modal.serviceType')}
//             </label>
//             <button
//               type="button"
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-green-500 text-base bg-white"
//             >
//               <span>{formData.serviceType}</span>
//               <IoChevronDown
//                 className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
//               />
//             </button>

//             {dropdownOpen && (
//               <div className="absolute mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 z-50">
//                 {serviceTypes.map((type) => (
//                   <div
//                     key={type}
//                     onClick={() => {
//                       setFormData({ ...formData, serviceType: type });
//                       setDropdownOpen(false);
//                     }}
//                     className={`px-3 py-2 hover:bg-green-50 cursor-pointer ${formData.serviceType === type ? 'bg-[#28A844] text-white font-medium' : ''
//                       }`}
//                   >
//                     {type}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Date & Time */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             {/* Preferred Date */}
//             <div>
//               <label className="block text-base font-medium text-gray-800 mb-2">
//                 {t('dashboard.employee.pages.order.modal.preferredDate')}
//               </label>
//               <div className="relative">
//                 <input
//                   ref={dateInputRef}
//                   type="date"
//                   value={formData.preferredDate}
//                   onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
//                   className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
//                 />
//                 <FaCalendarAlt
//                   onClick={() => dateInputRef.current && dateInputRef.current.showPicker()}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
//                 />
//               </div>
//             </div>

//             {/* Preferred Time */}
//             <div>
//               <label className="block text-base font-medium text-gray-800 mb-2">
//                 {t('dashboard.employee.pages.order.modal.preferredTime')}
//               </label>
//               <div className="relative">
//                 <input
//                   ref={timeInputRef}
//                   type="time"
//                   value={formData.preferredTime}
//                   onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
//                   className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
//                 />
//                 <button
//                   onClick={() => timeInputRef.current && timeInputRef.current.showPicker()}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
//                 ></button>
//               </div>
//             </div>
//           </div>

//           {/* Special Instruction */}
//           <div className="mb-6">
//             <label className="block text-base font-medium text-gray-800 mb-2">
//               {t('dashboard.employee.pages.order.modal.specialInstruction')}
//             </label>
//             <textarea
//               placeholder="Any special instructions or requirements..."
//               value={formData.specialInstruction}
//               onChange={(e) => setFormData({ ...formData, specialInstruction: e.target.value })}
//               rows="4"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm resize-none"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             onClick={handleSubmit}
//             className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 text-sm md:text-base"
//           >
//             {t('dashboard.employee.pages.order.modal.createRequest') || 'Create Request'}
//           </button>
//         </div>
//       </div>

//       {/* Toast Container */}
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default ServiceRequestModal;








import React, { useState, useRef, useEffect } from 'react';
import { FaTimes, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { IoChevronDown } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ServiceRequestModal = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const modalRef = useRef(null);
  const dropdownRef = useRef(null);
  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);

  const [formData, setFormData] = useState({
    customer: '',
    serviceType: 'Mapping & Surveying',
    preferredDate: '',
    preferredTime: '',
    specialInstruction: ''
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const serviceTypes = [
    'Mapping & Surveying',
    'Land Survey',
    'Construction Survey',
    'Topographic Survey',
  ];

  const resetForm = () => {
    setFormData({
      customer: '',
      serviceType: 'Mapping & Surveying',
      preferredDate: '',
      preferredTime: '',
      specialInstruction: ''
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = () => {
    const { customer, preferredDate, preferredTime } = formData;
    if (!customer || !preferredDate || !preferredTime) {
      toast.error('Please fill in all required fields.');
      return;
    }
    toast.success('Service request created successfully!');
    if (onSubmit) onSubmit(formData);
    setTimeout(() => {
      resetForm();
      onClose();
    }, 3000);
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
          </div>

          {/* Service Type Dropdown */}
          <div className="mb-4 relative" ref={dropdownRef}>
            <label className="block text-base font-medium text-gray-800 mb-2">
              {t('dashboard.employee.pages.order.modal.serviceType')}
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
                    className={`px-3 py-2 hover:bg-green-50 cursor-pointer ${formData.serviceType === type ? 'bg-[#28A844] text-white font-medium' : ''
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
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute"
                />
                <FaCalendarAlt
                  onClick={() => dateInputRef.current && dateInputRef.current.showPicker()}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                />
              </div>
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
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute"
                />
                <FaClock
                  onClick={() => timeInputRef.current && timeInputRef.current.showPicker()}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                />
              </div>
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
              onChange={(e) => setFormData({ ...formData, specialInstruction: e.target.value })}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 text-sm md:text-base"
          >
            {t('dashboard.employee.pages.order.modal.createRequest') || 'Create Request'}
          </button>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ServiceRequestModal;
