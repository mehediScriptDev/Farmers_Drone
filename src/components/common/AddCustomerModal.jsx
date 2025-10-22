// import { AiOutlineClose } from 'react-icons/ai';

// import { useState, useCallback, useEffect, useRef } from 'react';
// import { FaChevronLeft } from 'react-icons/fa';
// import { HiLocationMarker } from 'react-icons/hi';
// import { FiUpload } from 'react-icons/fi';
// import { AiFillCloseCircle } from 'react-icons/ai';
// import { useTranslation } from 'react-i18next';
// import { IoChevronDown } from "react-icons/io5";

// const INITIAL_FORM = {
//   firstName: '',
//   middleName: '',
//   lastName: '',
//   alsoKnownAs: '',
//   phone: '',
//   email: '',
//   geoLocation: '',
//   district: '',
//   mandal: '',
//   village: '',
//   registeredBy: '',
//   kycDocument: null,
//   street: '',
//   city: '',
//   state: '',
//   postalCode: '',
//   country: '',
//   industry: '',
//   lat1: '',
//   lat2: '',
//   lat3: '',
//   acres: '',
// };

// export default function RegistrationModal({ isOpen, onClose }) {
//   const [modalStep, setModalStep] = useState(1);
//   const [validationError, setValidationError] = useState('');
//   const [formData, setFormData] = useState(INITIAL_FORM);
//   const { t } = useTranslation();
//   const panelRef = useRef(null);

//   const handleInputChange = useCallback(
//     (e) => {
//       const { name, value, files, type } = e.target;
//       if (validationError) setValidationError('');
//       setFormData((prev) => ({
//         ...prev,
//         [name]: type === 'file' ? files[0] : value,
//       }));
//     },
//     [validationError]
//   );

//   const handleClose = useCallback(() => {
//     setModalStep(1);
//     setValidationError('');
//     setFormData(INITIAL_FORM);
//     onClose();
//   }, [onClose]);

//   const validateStep = useCallback(() => {
//     const requiredFieldsByStep = {
//       1: ['firstName', 'lastName', 'phone', 'geoLocation', 'registeredBy'],
//       2: [
//         'street',
//         'city',
//         'state',
//         'postalCode',
//         'country',
//         'industry',
//         'kycDocument',
//       ],
//     };

//     const missingFields =
//       requiredFieldsByStep[modalStep]?.filter((key) => !formData[key]) || [];

//     if (missingFields.length > 0) {
//       return t(
//         modalStep === 1
//           ? 'Please fill all required fields in Customer Info (* marked).'
//           : 'Please fill all required fields in Address Details (* marked).'
//       );
//     }

//     return '';
//   }, [formData, modalStep, t]);

//   const nextStep = useCallback(() => {
//     const error = validateStep();
//     if (error) return setValidationError(error);
//     setModalStep((prev) => Math.min(prev + 1, 3));
//   }, [validateStep]);

//   const prevStep = useCallback(() => {
//     setModalStep((prev) => Math.max(prev - 1, 1));
//     setValidationError('');
//   }, []);

//   const handleConfirm = useCallback(() => {
//     console.log(' Final Form Submitted:', formData);
//     handleClose();
//   }, [formData, handleClose]);
//   useEffect(() => {
//     if (!isOpen) return;

//     const handleOutsideClick = (e) => {
//       if (panelRef.current && !panelRef.current.contains(e.target)) {
//         handleClose();
//       }
//     };

//     window.addEventListener('mousedown', handleOutsideClick);
//     return () => {
//       window.removeEventListener('mousedown', handleOutsideClick);
//     };
//   }, [isOpen, handleClose]);

//   if (!isOpen) return null;

//   const stepTitles = [
//     t('dashboard.fieldAgent.FirstModal.customerInfo'),
//     t('dashboard.fieldAgent.SecondModal.addressDetails'),
//     t('dashboard.fieldAgent.ThirdModal.serviceLocations'),
//   ];

//   return (
//     <div
//       className={`fixed inset-0 z-50 flex items-center justify-center
//       bg-black/60 transition-opacity duration-300
//       ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
//     >
//       <div
//         ref={panelRef}
//         className={`bg-white w-full max-w-xl mx-4 md:mx-6 rounded-lg shadow-lg max-h-[80vh] flex flex-col
//         transform transition-transform duration-300 px-2
//         ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
//       >
//         {/* Header */}
//         <div className='sticky top-0 bg-white border-b rounded-t-2xl border-gray-200 px-2 py-2 md:py-4 flex items-center gap-4 z-10'>
//           {/* STEP 1: No Back Button */}
//           {modalStep > 1 && (
//             <button
//               onClick={prevStep}
//               className='text-2xl text-gray-600 transition w-10 h-10 flex justify-center items-center'
//             >
//               <FaChevronLeft className='w-6 h-5' />
//             </button>
//           )}
//           <h2 className='text-xl  font-semibold  flex-1'>
//             {stepTitles[modalStep - 1]}
//           </h2>
//           {/* STEP 2 & 3: No Cross Button */}
//           {modalStep === 1 && (
//             <button
//               onClick={handleClose}
//               aria-label='Close'
//               className=' text-gray-600 transition w-10 h-10 flex justify-center items-center'
//             >
//               <AiOutlineClose className='w-5 h-5' />
//             </button>
//           )}
//         </div>

//         {/* Scrollable Body */}
//         <div className='flex-1 overflow-y-auto p-4 space-y-2.5 md:space-y-4'>
//           {/* Step 1 - Customer Info */}
//           {modalStep === 1 && (
//             <div className='space-y-2.5 md:space-y-3'>
//               {[
//                 {
//                   name: 'firstName',
//                   label: t('dashboard.fieldAgent.FirstModal.firstName'),
//                   required: true,
//                 },
//                 {
//                   name: 'middleName',
//                   label: t('dashboard.fieldAgent.FirstModal.middleName'),
//                 },
//                 {
//                   name: 'lastName',
//                   label: t('dashboard.fieldAgent.FirstModal.lastName'),
//                   required: true,
//                 },
//                 {
//                   name: 'alsoKnownAs',
//                   label: t('dashboard.fieldAgent.FirstModal.alsoKnownAs'),
//                 },
//                 {
//                   name: 'phone',
//                   label: t('dashboard.fieldAgent.FirstModal.phone'),
//                   required: true,
//                   type: 'tel',
//                   placeholder: '+92 9876543210',
//                 },
//                 {
//                   name: 'email',
//                   label: t('dashboard.fieldAgent.FirstModal.email'),
//                   type: 'email',
//                   placeholder: 'example@gmail.com',
//                 },
//               ].map((field) => (
//                 <div key={field.name}>
//                   <label className='block text-sm md:text-base font-medium'>
//                     {field.label}
//                     {field.required && <span className='text-red-500'>*</span>}
//                   </label>
//                   <input
//                     type={field.type || 'text'}
//                     name={field.name}
//                     value={formData[field.name]}
//                     onChange={handleInputChange}
//                     placeholder={field.placeholder || field.label}
//                     className='w-full px-4 py-2 border  border-black/30  rounded-lg focus:ring-black'
//                   />
//                 </div>
//               ))}

//               {/* Geo Location */}
//               <div>
//                 <label className='block text-sm md:text-base font-medium'>
//                   {t('dashboard.fieldAgent.FirstModal.geoLocation')}
//                   <span className='text-red-500'>*</span>
//                 </label>
//                 <div className='relative'>
//                   <input
//                     type='text'
//                     name='geoLocation'
//                     value={formData.geoLocation}
//                     onChange={handleInputChange}
//                     placeholder={t(
//                       'dashboard.fieldAgent.FirstModal.selectOnMap'
//                     )}
//                     className='w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black'
//                   />
//                   <HiLocationMarker className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
//                 </div>
//               </div>

//               {/* District / Mandal / Village */}
//               {['district', 'mandal', 'village'].map((key) => (
//                 <div key={key}>
//                   <label className='block text-sm md:text-base font-medium'>
//                     {t(`dashboard.fieldAgent.FirstModal.${key}`)}
//                   </label>
//                   <input
//                     type='text'
//                     name={key}
//                     value={formData[key]}
//                     onChange={handleInputChange}
//                     placeholder={t(
//                       `dashboard.fieldAgent.FirstModal.enter${key.charAt(0).toUpperCase() + key.slice(1)
//                       }`
//                     )}
//                     className='w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-green-500'
//                   />
//                 </div>
//               ))}

//               {/* Registered By */}
// <div>
//    <label className='block text-sm md:text-base pb-2 font-medium'>
//     {t('dashboard.fieldAgent.FirstModal.registeredBy')}
//     <span className='text-red-500'>*</span>
//   </label>
//   <div className="relative">

//   <select
//     name='registeredBy'
//     value={formData.registeredBy}
//     onChange={handleInputChange}
//     className=" focus:outline-none focus:ring-2 w-full px-4 py-2  border  border-black/30 rounded-lg focus:ring-black appearance-none  text-sm"
//   >
//     <option>
//       {t('dashboard.fieldAgent.FirstModal.selectAgent')}
//     </option>
//     <option>
//       {t('dashboard.fieldAgent.FirstModal.FieldAgent')}
//     </option>
//   </select>
//   <IoChevronDown
//     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
//     size={20}
//   />
// </div>
// </div>

//             </div>
//           )}

//           {/* Step 2 - Address */}
//           {modalStep === 2 && (
//             <div className='space-y-4'>
//               <div>
//                 <label className='block text-sm font-medium mb-1'>
//                   {t('dashboard.fieldAgent.SecondModal.kycDocumentsUpload')}
//                 </label>
//                 <div className='relative'>
//                   <input
//                     type='file'
//                     name='kycDocument'
//                     accept='.doc,.docx,.jpg,.pdf,.png'
//                     onChange={handleInputChange}
//                     className='w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black'
//                   />
//                   <FiUpload className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
//                 </div>
//               </div>

//               {/* Street */}
//               <div>
//                 <label className='block text-sm font-medium mb-1'>
//                   {t('dashboard.fieldAgent.SecondModal.street')}
//                   <span className='text-red-500'>*</span>
//                 </label>
//                 <input
//                   type='text'
//                   name='street'
//                   value={formData.street}
//                   onChange={handleInputChange}
//                   placeholder={t(
//                     'dashboard.fieldAgent.SecondModal.streetAddress'
//                   )}
//                   className='w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black'
//                 />
//               </div>

//               {/* City / State */}
//               <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//                 {['city', 'state'].map((field) => (
//                   <div key={field}>
//                     <label className='block text-sm font-medium mb-1'>
//                       {t(`dashboard.fieldAgent.SecondModal.${field}`)}
//                       <span className='text-red-500'>*</span>
//                     </label>
//                     <input
//                       type='text'
//                       name={field}
//                       value={formData[field]}
//                       onChange={handleInputChange}
//                       placeholder={t(
//                         `dashboard.fieldAgent.SecondModal.${field}`
//                       )}
//                       className='w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black'
//                     />
//                   </div>
//                 ))}
//               </div>

//               {/* Postal / Country */}
//               <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//                 {['postalCode', 'country'].map((field) => (
//                   <div key={field}>
//                     <label className='block text-sm font-medium mb-1'>
//                       {t(`dashboard.fieldAgent.SecondModal.${field}`)}
//                       <span className='text-red-500'>*</span>
//                     </label>
//                     <input
//                       type='text'
//                       name={field}
//                       value={formData[field]}
//                       onChange={handleInputChange}
//                       placeholder={
//                         field === 'postalCode'
//                           ? '400020'
//                           : t('dashboard.fieldAgent.SecondModal.enterCountry')
//                       }
//                       className='w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black'
//                     />
//                   </div>
//                 ))}
//               </div>

//               {/* Industry */}
//               <div>
//                 <label className='block text-sm font-medium mb-1'>
//                   {t('dashboard.fieldAgent.SecondModal.industry')}
//                   <span className='text-red-500'>*</span>
//                 </label>
//                 <div className='relative'>
//                   <select
//                   name='industry'
//                   value={formData.industry}
//                   onChange={handleInputChange}
//                   className=" focus:outline-none focus:ring-2 w-full px-4 py-2  border border-black/30 rounded-lg focus:ring-black appearance-none  text-sm"
//                 >
//                   <option value=''>
//                     {t('dashboard.fieldAgent.SecondModal.selectIndustry')}
//                   </option>
//                   <option value='agriculture'>
//                     {t('dashboard.fieldAgent.SecondModal.agriculture')}
//                   </option>
//                   <option value='survey'>
//                     {t('dashboard.fieldAgent.SecondModal.surveyMapping')}
//                   </option>
//                 </select>
//                 <IoChevronDown
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
//                   size={20}
//                 />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 3 - Service Locations */}
//           {modalStep === 3 && (
//             <div className='space-y-4'>
//               {['lat1', 'lat2', 'lat3', 'acres'].map((key, idx) => (
//                 <div key={key}>
//                   <label className=' text-sm font-medium mb-1 flex justify-between'>
//                     {t(
//                       `dashboard.fieldAgent.ThirdModal.${[
//                         'firstLatLong',
//                         'secondLatLong',
//                         'thirdLatLong',
//                         'numberOfAcres',
//                       ][idx]
//                       }`
//                     )}
//                     {key === 'lat3' && (
//                       <p className='!text-button-primary text-xl font-bold px-2'>
//                         +
//                       </p>
//                     )}
//                   </label>
//                   <input
//                     type='text'
//                     name={key}
//                     value={formData[key]}
//                     onChange={handleInputChange}
//                     placeholder={t(
//                       `dashboard.fieldAgent.ThirdModal.${[
//                         'firstLatLongValue',
//                         'secondLatLong',
//                         'thirdLatLong',
//                         'landAreaInAcres',
//                       ][idx]
//                       }`
//                     )}
//                     className='w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black'
//                   />
//                 </div>
//               ))}
//             </div>
//           )}
//           {validationError && (
//             <div className='flex items-center p-3 mb-4 text-sm font-medium text-red-800 bg-red-100 rounded-lg'>
//               <AiFillCloseCircle className='w-5 h-5 mr-2' />
//               {validationError}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className='sticky bottom-0 bg-white border-t border-gray-200 rounded-b-2xl px-6 py-4 z-10'>
//           {modalStep < 3 ? (
//             <button
//               onClick={nextStep}
//               className='w-full bg-[#28A844] hover:bg-green-600 text-white py-2.5 rounded-lg font-medium transition shadow-md disabled:bg-gray-400'
//             >
//               {t('Next')}
//             </button>
//           ) : (
//             <button
//               onClick={handleConfirm}
//               className='w-full bg-[#28A844] hover:bg-green-600 text-white py-2.5 rounded-lg font-medium transition shadow-md'
//             >
//               {t('Confirm Registration')}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useCallback, useEffect, useRef } from "react"; // React import ঠিক করা হয়েছে


const AiOutlineClose = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const FaChevronLeft = ({ className = "w-6 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
    fill="currentColor"
    className={className}
  >
    <path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z" />
  </svg>
);

const HiLocationMarker = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008.031-.015.031-.014C10.68 18.818 10.96 18.708 11.21 18.58c.25-.128.49-.27.73-.428.24-.158.47-.33.69-.514.22-.182.43-.38.62-.592.19-.214.37-.44.53-.681.17-.24.32-.49.46-.752.14-.262.26-.53.36-.807.1-.277.18-.56.25-.85.07-.29.12-.58.15-.88.03-.3.05-.6.05-.91s-.02-.61-.05-.91c-.03-.3-.08-.59-.15-.88-.07-.29-.15-.58-.25-.85a7.001 7.001 0 00-.82-1.559 7.003 7.003 0 00-1.15-1.275.75.75 0 10-1.06 1.06 5.5 5.5 0 01.82 3.653c.04.2.07.4.1.61.03.21.05.42.05.63s-.02.42-.05.63a5.5 5.5 0 01-.1.61c-.04.21-.08.41-.13.61-.05.2-.1.4-.17.59-.07.19-.15.38-.23.55a5.5 5.5 0 01-2.12 2.288A5.5 5.5 0 0110 17.5a5.5 5.5 0 01-2.99-1.02 5.5 5.5 0 01-2.12-2.288 5.51 5.51 0 01-.4-.1.14 5.5 5.5 0 01-.17-.59c-.05-.2-.09-.4-.13-.61-.04-.21-.07-.4-.1-.61-.03-.21-.05-.42-.05-.63s.02-.42.05-.63c.03-.21.06-.41.1-.61.04-.2.08-.4.13-.6.05-.2.1-.4.17-.59.07-.19.15-.38.23-.55.23-.46.5-1 .82-1.559a.75.75 0 10-1.06-1.06A7.003 7.003 0 003 9c0 4.39 3.5 9.1 6.69 10.067zM10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
      clipRule="evenodd"
    />
  </svg>
);

const FiUpload = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
    />
  </svg>
);

const AiFillCloseCircle = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
      clipRule="evenodd"
    />
  </svg>
);

const IoChevronDown = ({ className = "w-5 h-5", size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={size ? `w-${size} h-${size}` : className}
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

const useTranslation = () => ({
  t: (key) => {
    const parts = key.split(".");
    return parts[parts.length - 1];
  },
});
const categoryData = {
  "Mapping & Surveying": [
    "Drone Mapping & Surveying (MAP)",
    "General Surveying & Mapping (SRV)",
    "Ground Collection (GRC)",
    "Data Analysis (DAT)",
  ],
  "Aerial Media Services": [
    "Real Estate Photography",
    "Event Videography",
    "Cinematic Filming",
  ],
  "Real Estate & Marketing": [
    "Property Showcases",
    "Virtual Tours",
    "Commercial Property Ads",
  ],
  Agriculture: [
    "Crop Health Monitoring",
    "Field Analysis",
    "Automated Seeding",
  ],
  "Inspection & Infrastructure": [
    "Bridge Inspection",
    "Powerline Monitoring",
    "Building Facade Scan",
  ],
  "Specialized Operations": [
    "Search & Rescue Support",
    "Disaster Response",
    "Wildlife Monitoring",
  ],
  "Support & Training": [
    "Pilot Training Program",
    "Software Support",
    "Maintenance Package",
  ],
  Other: ["Custom Solutions", "General Inquiry"],
};

const RemoveIcon = () => (
  <svg
    viewBox="0 0 14 14"
    className="h-3.5 w-3.5 stroke-blue-700/50 group-hover:stroke-blue-700/75"
  >
    <path d="M4 4l6 6m0-6l-6 6" />
  </svg>
);

const INITIAL_FORM = {
  firstName: "",
  middleName: "",
  lastName: "",
  alsoKnownAs: "",
  phone: "",
  email: "",
  geoLocation: "",
  district: "",
  mandal: "",
  village: "",
  registeredBy: "",
  kycDocument: null,
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  industry: "",
  subcategories: [], 
  lat1: "",
  lat2: "",
  lat3: "",
  acres: "",
};

export default function RegistrationModal({ isOpen, onClose }) {
  const [modalStep, setModalStep] = useState(1);
  const [validationError, setValidationError] = useState("");
  const [formData, setFormData] = useState(INITIAL_FORM);
  const { t } = useTranslation();
  const panelRef = useRef(null);

  // --- নতুন স্টেট ও Ref ---
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const industryDropdownRef = useRef(null);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value, files, type } = e.target;
      if (validationError) setValidationError("");
      setFormData((prev) => ({
        ...prev,
        [name]: type === "file" ? files[0] : value,
      }));
    },
    [validationError]
  );

  const handleClose = useCallback(() => {
    setModalStep(1);
    setValidationError("");
    setFormData(INITIAL_FORM);
    setIsDropdownOpen(false); 
    onClose();
  }, [onClose]);

  const validateStep = useCallback(() => {
    const requiredFieldsByStep = {
      1: ["firstName", "lastName", "phone", "geoLocation", "registeredBy"],
      2: [
        "street",
        "city",
        "state",
        "postalCode",
        "country",
        "industry",
        "kycDocument",
      ],
    };

    const missingFields =
      requiredFieldsByStep[modalStep]?.filter((key) => !formData[key]) || [];

    if (missingFields.length > 0) {
      // 'subcategories'-এর জন্য কাস্টম চেক (যদি প্রয়োজন হয়)
      if (modalStep === 2 && formData.industry && formData.subcategories.length === 0) {
        return 'Please select at least one sub-category.';
      }

      return t(
        modalStep === 1
          ? "Please fill all required fields in Customer Info (* marked)."
          : "Please fill all required fields in Address Details (* marked)."
      );
    }

    return "";
  }, [formData, modalStep, t]);

  const nextStep = useCallback(() => {
    const error = validateStep();
    if (error) return setValidationError(error);
    setModalStep((prev) => Math.min(prev + 1, 3));
  }, [validateStep]);

  const prevStep = useCallback(() => {
    setModalStep((prev) => Math.max(prev - 1, 1));
    setValidationError("");
  }, []);

  const handleConfirm = useCallback(() => {
    console.log(" Final Form Submitted:", formData);
    handleClose();
  }, [formData, handleClose]);



  const handleIndustrySelect = useCallback(
    (industry) => {
      if (validationError) setValidationError("");
      setFormData((prev) => ({
        ...prev,
        industry: industry, 
        subcategories: [], 
      }));
      setIsDropdownOpen(false); 
    },
    [validationError]
  );

  const handleSubcategorySelect = useCallback(
    (subcategory) => {
      if (!formData.subcategories.includes(subcategory)) {
        const newList = [...formData.subcategories, subcategory];
        setFormData((prev) => ({ ...prev, subcategories: newList }));

        console.clear();
        console.log("====================================");
        console.log("প্রধান মেনু (Industry):", formData.industry);
        console.log("নির্বাচিত সাবমেনু (Sub category):", subcategory);
        console.log("------------------------------------");
        console.log("সম্পূর্ণ তালিকা:", newList);
        console.log("====================================");
        // ----------------------------------------
      }
    },
    [formData.industry, formData.subcategories]
  );


  const removeSubcategory = useCallback(
    (subcategoryToRemove) => {
      const newList = formData.subcategories.filter(
        (item) => item !== subcategoryToRemove
      );
      setFormData((prev) => ({ ...prev, subcategories: newList }));
    },
    [formData.subcategories]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        handleClose();
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, handleClose]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        industryDropdownRef.current &&
        !industryDropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [industryDropdownRef]);

  if (!isOpen) return null;

  const stepTitles = [
    t("dashboard.fieldAgent.FirstModal.customerInfo"),
    t("dashboard.fieldAgent.SecondModal.addressDetails"),
    t("dashboard.fieldAgent.ThirdModal.serviceLocations"),
  ];

  const industryList = Object.keys(categoryData);
  const subcategoryList = formData.industry
    ? categoryData[formData.industry]
    : [];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center
       bg-black/60 transition-opacity duration-300
       ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div
        ref={panelRef}
        className={`bg-white w-full max-w-xl mx-4 md:mx-6 rounded-lg shadow-lg max-h-[80vh] flex flex-col
         transform transition-transform duration-300 px-2 
         ${isOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b rounded-t-2xl border-gray-200 px-2 py-2 md:py-4 flex items-center gap-4 z-10">
          {/* STEP 1: No Back Button */}
          {modalStep > 1 && (
            <button
              onClick={prevStep}
              className="text-2xl text-gray-600 transition w-10 h-10 flex justify-center items-center"
            >
              <FaChevronLeft className="w-6 h-5" />
            </button>
          )}
          <h2 className="text-xl  font-semibold  flex-1">
            {stepTitles[modalStep - 1]}
          </h2>
          {/* STEP 2 & 3: No Cross Button */}
          {modalStep === 1 && (
            <button
              onClick={handleClose}
              aria-label="Close"
              className=" text-gray-600 transition w-10 h-10 flex justify-center items-center"
            >
              <AiOutlineClose className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 md:space-y-4">
          {/* Step 1 - Customer Info */}
          {modalStep === 1 && (
            <div className="space-y-2.5 md:space-y-3">
              {[
                {
                  name: "firstName",
                  label: t("dashboard.fieldAgent.FirstModal.firstName"),
                  required: true,
                },
                {
                  name: "middleName",
                  label: t("dashboard.fieldAgent.FirstModal.middleName"),
                },
                {
                  name: "lastName",
                  label: t("dashboard.fieldAgent.FirstModal.lastName"),
                  required: true,
                },
                {
                  name: "alsoKnownAs",
                  label: t("dashboard.fieldAgent.FirstModal.alsoKnownAs"),
                },
                {
                  name: "phone",
                  label: t("dashboard.fieldAgent.FirstModal.phone"),
                  required: true,
                  type: "tel",
                  placeholder: "+92 9876543210",
                },
                {
                  name: "email",
                  label: t("dashboard.fieldAgent.FirstModal.email"),
                  type: "email",
                  placeholder: "example@gmail.com",
                },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm md:text-base font-medium">
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder || field.label}
                    className="w-full px-4 py-2 border  border-black/30  rounded-lg focus:ring-black"
                  />
                </div>
              ))}

              {/* Geo Location */}
              <div>
                <label className="block text-sm md:text-base font-medium">
                  {t("dashboard.fieldAgent.FirstModal.geoLocation")}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="geoLocation"
                    value={formData.geoLocation}
                    onChange={handleInputChange}
                    placeholder={t(
                      "dashboard.fieldAgent.FirstModal.selectOnMap"
                    )}
                    className="w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black"
                  />
                  <HiLocationMarker className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              {/* District / Mandal / Village */}
              {["district", "mandal", "village"].map((key) => (
                <div key={key}>
                  <label className="block text-sm md:text-base font-medium">
                    {t(`dashboard.fieldAgent.FirstModal.${key}`)}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    placeholder={t(
                      `dashboard.fieldAgent.FirstModal.enter${
                        key.charAt(0).toUpperCase() + key.slice(1)
                      }`
                    )}
                    className="w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-green-500"
                  />
                </div>
              ))}

              {/* Registered By */}
              <div>
                <label className="block text-sm md:text-base pb-2 font-medium">
                  {t("dashboard.fieldAgent.FirstModal.registeredBy")}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="registeredBy"
                    value={formData.registeredBy}
                    onChange={handleInputChange}
                    className=" focus:outline-none focus:ring-2 w-full px-4 py-2  border  border-black/30 rounded-lg focus:ring-black text-sm"
                  >
                    <option>
                      {t("dashboard.fieldAgent.FirstModal.selectAgent")}
                    </option>
                    <option>
                      {t("dashboard.fieldAgent.FirstModal.FieldAgent")}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 - Address */}
          {modalStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("dashboard.fieldAgent.SecondModal.kycDocumentsUpload")}
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="kycDocument"
                    accept=".doc,.docx,.jpg,.pdf,.png"
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black"
                  />
                  <FiUpload className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              {/* Street */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("dashboard.fieldAgent.SecondModal.street")}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  placeholder={t(
                    "dashboard.fieldAgent.SecondModal.streetAddress"
                  )}
                  className="w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black"
                />
              </div>

              {/* City / State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["city", "state"].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium mb-1">
                      {t(`dashboard.fieldAgent.SecondModal.${field}`)}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      placeholder={t(
                        `dashboard.fieldAgent.SecondModal.${field}`
                      )}
                      className="w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black"
                    />
                  </div>
                ))}
              </div>

              {/* Postal / Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["postalCode", "country"].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium mb-1">
                      {t(`dashboard.fieldAgent.SecondModal.${field}`)}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      placeholder={
                        field === "postalCode"
                          ? "400020"
                          : t("dashboard.fieldAgent.SecondModal.enterCountry")
                      }
                      className="w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("dashboard.fieldAgent.SecondModal.industry")}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative" ref={industryDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="focus:outline-none focus:ring-2 w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black appearance-none text-sm text-left flex justify-between items-center"
                  >
                    <span
                      className={`block truncate ${
                        formData.industry ? "text-black" : "text-gray-500" 
                      }`}
                    >
                      {formData.industry
                        ? formData.industry
                        : t("dashboard.fieldAgent.SecondModal.selectIndustry")}
                    </span>
                    <IoChevronDown
                      className={`text-gray-400 transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                      size={6}
                    />
                  </button>

                  {isDropdownOpen && (
                    <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {industryList.map((industry) => (
                        <li
                          key={industry}
                          onClick={() => handleIndustrySelect(industry)}
                          className="text-gray-900 relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-gray-100"
                          role="option"
                        >
                          <span className="font-normal block truncate">
                            {industry}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {formData.industry && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sub category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {subcategoryList.map((subcategory) => {
                        const isSelected =
                          formData.subcategories.includes(subcategory);
                        return (
                          <button
                            key={subcategory}
                            type="button"
                            onClick={() => handleSubcategorySelect(subcategory)}
                            disabled={isSelected}
                            className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-all
                            ${
                              isSelected
                                ? "bg-gray-200 text-gray-500 border-gray-300 opacity-50 cursor-not-allowed"
                                : "text-lime-700 bg-lime-100 border-lime-300 hover:bg-lime-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
                            }`}
                          >
                            {subcategory}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-4">
                      <h3 className="text-xs font-medium text-gray-500 mb-2">
                        Selected:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {formData.subcategories.length === 0 ? (
                          <span className="text-sm text-gray-400">
                            Nothing has been selected yet.
                          </span>
                        ) : (
                          formData.subcategories.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-100 px-2.5 py-1 text-sm font-medium text-blue-800"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeSubcategory(tag)}
                                className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-blue-600/20"
                              >
                                <RemoveIcon />
                              </button>
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3 - Service Locations */}
          {modalStep === 3 && (
            <div className="space-y-4">
              {["lat1", "lat2", "lat3", "acres"].map((key, idx) => (
                <div key={key}>
                  <label className=" text-sm font-medium mb-1 flex justify-between">
                    {t(
                      `dashboard.fieldAgent.ThirdModal.${
                        [
                          "firstLatLong",
                          "secondLatLong",
                          "thirdLatLong",
                          "numberOfAcres",
                        ][idx]
                      }`
                    )}
                    {key === "lat3" && (
                      <p className="!text-button-primary text-xl font-bold px-2">
                        +
                      </p>
                    )}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    placeholder={t(
                      `dashboard.fieldAgent.ThirdModal.${
                        [
                          "firstLatLongValue",
                          "secondLatLong",
                          "thirdLatLong",
                          "landAreaInAcres",
                        ][idx]
                      }`
                    )}
                    className="w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black"
                  />
                </div>
              ))}
            </div>
          )}
          {validationError && (
            <div className="flex items-center p-3 mb-4 text-sm font-medium text-red-800 bg-red-100 rounded-lg">
              <AiFillCloseCircle className="w-5 h-5 mr-2" />
              {validationError}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 rounded-b-2xl px-6 py-4 z-10">
          {modalStep < 3 ? (
            <button
              onClick={nextStep}
              className="w-full bg-[#28A844] hover:bg-green-600 text-white py-2.5 rounded-lg font-medium transition shadow-md disabled:bg-gray-400"
            >
              {t("Next")}
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              className="w-full bg-[#28A844] hover:bg-green-600 text-white py-2.5 rounded-lg font-medium transition shadow-md"
            >
              {t("Confirm Registration")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
