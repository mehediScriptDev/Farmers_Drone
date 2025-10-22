// import React, { useState, useCallback, memo, useEffect } from 'react';
// import { X, ChevronDown } from 'lucide-react';

// // Validation utilities
// const validators = {
//   email: (value) => {
//     if (!value.trim()) return "Email or phone is required";
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^[\d\s\-+()]+$/;
//     if (!emailRegex.test(value) && !phoneRegex.test(value)) {
//       return "Please enter a valid email or phone number";
//     }
//     return "";
//   },
//   required: (value, fieldName) => {
//     return !value.trim() ? `${fieldName} is required` : "";
//   },
//   phone: (value) => {
//     if (!value.trim()) return "Phone is required";
//     const phoneRegex = /^[\d\s\-+()]{10,}$/;
//     return !phoneRegex.test(value) ? "Please enter a valid phone number" : "";
//   },
// };

// // Input component
// const Input = memo(
//   ({
//     label,
//     name,
//     value,
//     onChange,
//     placeholder,
//     type = "text",
//     required = false,
//     error,
//     className = "",
//   }) => (
//     <div>
//       <label className="block text-sm md:text-base font-medium text-[#002244]">
//         {label}
//         {required && <span className="text-red-500">*</span>}
//       </label>
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className={`mt-1 w-full px-3 md:px-4 py-2 border ${error ? "border-red-500" : "border-gray-300"
//           } rounded-md md:rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
//       />
//       {error && <p className="text-xs md:text-sm text-red-500 mt-1">{error}</p>}
//     </div>
//   )
// );

// // Select component
// const Select = memo(
//   ({ label, name, value, onChange, options, required = false, error }) => (
//     <div>
//       <label className="block text-sm md:text-base font-medium text-[#002244]">
//         {label}
//         {required && <span className="text-red-500">*</span>}
//       </label>
//       <select
//         name={name}
//         value={value}
//         onChange={onChange}
//         className={`mt-1 w-full px-3 md:px-4 py-2 border ${error ? "border-red-500" : "border-gray-300"
//           } rounded-md md:rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500`}
//       >
//         {options.map((opt) => (
//           <option key={opt.value} value={opt.value}>
//             {opt.label}
//           </option>
//         ))}
//       </select>
//       {error && <p className="text-xs md:text-sm text-red-500 mt-1">{error}</p>}
//     </div>
//   )
// );

// // Main MultiStep Modal Component
// export default function ProfileSetupModal() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [currentStep, setCurrentStep] = useState('step1');
//   const [email, setEmail] = useState("");
//   const [setupType, setSetupType] = useState("");
//   const [notes, setNotes] = useState("");
//   const [errors, setErrors] = useState({});

//   // Personal Info State
//   const [personalInfo, setPersonalInfo] = useState({
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     alsoKnownAs: "",
//     phone: "",
//     email: "",
//     geoLocation: "",
//     district: "",
//     mandal: "",
//     village: "",
//     registeredBy: "",
//   });
//   const [personalErrors, setPersonalErrors] = useState({});

//   // Verification State
//   const [verificationInfo, setVerificationInfo] = useState({
//     kycDocument: null,
//     street: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     country: "",
//     industry: "",
//   });
//   const [verificationErrors, setVerificationErrors] = useState({});

//   // Service Location State
//   const [locations, setLocations] = useState([
//     { id: 1, lat: "", long: "" },
//     { id: 2, lat: "", long: "" },
//     { id: 3, lat: "", long: "" },
//   ]);
//   const [acres, setAcres] = useState("");

//   // Reset all state when modal closes
//   useEffect(() => {
//     if (!isOpen) {
//       setCurrentStep('step1');
//       setEmail("");
//       setSetupType("");
//       setNotes("");
//       setErrors({});
//       setPersonalInfo({
//         firstName: "",
//         middleName: "",
//         lastName: "",
//         alsoKnownAs: "",
//         phone: "",
//         email: "",
//         geoLocation: "",
//         district: "",
//         mandal: "",
//         village: "",
//         registeredBy: "",
//       });
//       setPersonalErrors({});
//       setVerificationInfo({
//         kycDocument: null,
//         street: "",
//         city: "",
//         state: "",
//         postalCode: "",
//         country: "",
//         industry: "",
//       });
//       setVerificationErrors({});
//       setLocations([
//         { id: 1, lat: "", long: "" },
//         { id: 2, lat: "", long: "" },
//         { id: 3, lat: "", long: "" },
//       ]);
//       setAcres("");
//     }
//   }, [isOpen]);

//   // Step 1: Validate and proceed
//   const handleStep1Submit = useCallback(() => {
//     const newErrors = {
//       email: validators.email(email),
//       setupType: validators.required(setupType, "Setup type"),
//     };

//     const hasErrors = Object.values(newErrors).some((err) => err);

//     if (hasErrors) {
//       setErrors(newErrors);
//       return;
//     }

//     if (setupType === "Personal Information") {
//       setCurrentStep('step2');
//       setPersonalInfo(prev => ({ ...prev, email }));
//     } else if (setupType === "Verification Details") {
//       setCurrentStep('step3');
//     } else if (setupType === "Service Location") {
//       setCurrentStep('step4');
//     }
//   }, [email, setupType]);

//   // Step 2: Personal Info handlers
//   const handlePersonalChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setPersonalInfo(prev => ({ ...prev, [name]: value }));
//     setPersonalErrors(prev => ({ ...prev, [name]: "" }));
//   }, []);

//   const handlePersonalSave = useCallback(() => {
//     const newErrors = {
//       firstName: validators.required(personalInfo.firstName, "First Name"),
//       lastName: validators.required(personalInfo.lastName, "Last Name"),
//       phone: validators.phone(personalInfo.phone),
//       geoLocation: validators.required(personalInfo.geoLocation, "Geo Location"),
//       registeredBy: validators.required(personalInfo.registeredBy, "Registered By"),
//     };

//     const hasErrors = Object.values(newErrors).some((err) => err);

//     if (hasErrors) {
//       setPersonalErrors(newErrors);
//       return;
//     }

//     console.log("Personal Info Saved:", { customerEmail: email, ...personalInfo });
//     setIsOpen(false);
//   }, [personalInfo, email]);

//   // Step 3: Verification handlers
//   const handleVerificationChange = useCallback((e) => {
//     const { name, value, files } = e.target;
//     setVerificationInfo(prev => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//     setVerificationErrors(prev => ({ ...prev, [name]: "" }));
//   }, []);

//   const handleVerificationSave = useCallback(() => {
//     const newErrors = {
//       street: validators.required(verificationInfo.street, "Street"),
//       city: validators.required(verificationInfo.city, "City"),
//       state: validators.required(verificationInfo.state, "State"),
//       postalCode: validators.required(verificationInfo.postalCode, "Postal Code"),
//       country: validators.required(verificationInfo.country, "Country"),
//       industry: validators.required(verificationInfo.industry, "Industry"),
//     };

//     const hasErrors = Object.values(newErrors).some((err) => err);

//     if (hasErrors) {
//       setVerificationErrors(newErrors);
//       return;
//     }

//     console.log("Verification Details Saved:", { customerEmail: email, ...verificationInfo });
//     setIsOpen(false);
//   }, [verificationInfo, email]);

//   // Step 4: Service Location handlers
//   const handleLocationChange = useCallback((id, field, value) => {
//     setLocations(prev =>
//       prev.map(loc => (loc.id === id ? { ...loc, [field]: value } : loc))
//     );
//   }, []);

//   const addLocation = useCallback(() => {
//     setLocations(prev => [
//       ...prev,
//       { id: Math.max(...prev.map(l => l.id), 0) + 1, lat: "", long: "" },
//     ]);
//   }, []);

//   const handleServiceLocationSave = useCallback(() => {
//     const validLocations = locations.filter((loc) => loc.lat || loc.long);

//     if (validLocations.length === 0) {
//       alert("Please enter at least one Latitude/Longitude pair.");
//       return;
//     }

//     const formData = {
//       locations: validLocations,
//       acres,
//     };
//     console.log("Service Location Saved:", { email, ...formData });
//     setIsOpen(false);
//   }, [locations, acres, email]);

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <button
//         onClick={() => setIsOpen(true)}
//         className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md transition text-lg"
//       >
//         Assist in Profile Setup
//       </button>

//       {/* STEP 1: Initial Modal */}
//       {isOpen && currentStep === 'step1' && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-xl">
//             <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300">
//               <h2 className="text-lg md:text-xl font-semibold text-[#002244]">
//                 Assist in Profile Setup
//               </h2>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <div className="px-4 md:px-6 py-6 space-y-5">
//               <div>
//                 <label className="block text-base font-medium text-[#002244] mb-2">
//                   Customer email or phone
//                 </label>
//                 <input
//                   type="text"
//                   value={email}
//                   onChange={(e) => {
//                     setEmail(e.target.value);
//                     setErrors(prev => ({ ...prev, email: "" }));
//                   }}
//                   placeholder="Enter customer email or phone"
//                   className={`w-full text-sm px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"
//                     } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
//                 />
//                 {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
//               </div>

//               <div>
//                 <label className="block text-base font-medium text-[#002244] mb-2">
//                   Setup Type<span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <select
//                     value={setupType}
//                     onChange={(e) => {
//                       setSetupType(e.target.value);
//                       setErrors(prev => ({ ...prev, setupType: "" }));
//                     }}
//                     className={`w-full text-sm px-3 py-2 border ${errors.setupType ? "border-red-500" : "border-gray-300"
//                       } rounded-md bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-green-500`}
//                   >
//                     <option value="">Select Setup Type</option>
//                     <option value="Personal Information">Personal Information</option>
//                     <option value="Verification Details">Verification Details</option>
//                     <option value="Service Location">Service Location</option>
//                   </select>
//                   <ChevronDown
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
//                     size={20}
//                   />
//                 </div>
//                 {errors.setupType && <p className="text-sm text-red-500 mt-1">{errors.setupType}</p>}
//               </div>

//               <div>
//                 <label className="block text-base font-medium text-[#002244] mb-2">
//                   Notes
//                 </label>
//                 <textarea
//                   value={notes}
//                   onChange={(e) => setNotes(e.target.value)}
//                   placeholder="Add any notes about the setup assistance needed..."
//                   rows={4}
//                   className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
//                 />
//               </div>

//               <button
//                 onClick={handleStep1Submit}
//                 className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition-colors"
//               >
//                 Start Setup Assistance
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* STEP 2: Personal Information Modal */}
//       {isOpen && currentStep === 'step2' && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
//             <div className="flex justify-between items-center px-6 py-4 border-b">
//               <div>
//                 <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
//                   Customer Information
//                 </h2>
//                 <p className="text-sm text-gray-500 mt-1">Customer: {email}</p>
//               </div>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <div className="px-6 py-4 overflow-y-auto flex-1 space-y-3">
//               <Input
//                 label="First Name"
//                 name="firstName"
//                 value={personalInfo.firstName}
//                 onChange={handlePersonalChange}
//                 placeholder="First Name"
//                 required
//                 error={personalErrors.firstName}
//               />
//               <Input
//                 label="Middle Name"
//                 name="middleName"
//                 value={personalInfo.middleName}
//                 onChange={handlePersonalChange}
//                 placeholder="Middle Name"
//               />
//               <Input
//                 label="Last Name"
//                 name="lastName"
//                 value={personalInfo.lastName}
//                 onChange={handlePersonalChange}
//                 placeholder="Last Name"
//                 required
//                 error={personalErrors.lastName}
//               />
//               <Input
//                 label="Also Known As"
//                 name="alsoKnownAs"
//                 value={personalInfo.alsoKnownAs}
//                 onChange={handlePersonalChange}
//                 placeholder="Nickname"
//               />
//               <Input
//                 label="Phone"
//                 name="phone"
//                 type="tel"
//                 value={personalInfo.phone}
//                 onChange={handlePersonalChange}
//                 placeholder="+92 9876543210"
//                 required
//                 error={personalErrors.phone}
//               />
//               <Input
//                 label="Email"
//                 name="email"
//                 type="email"
//                 value={personalInfo.email}
//                 onChange={handlePersonalChange}
//                 placeholder="example@gmail.com"
//               />
//               <Input
//                 label="Geo Location"
//                 name="geoLocation"
//                 value={personalInfo.geoLocation}
//                 onChange={handlePersonalChange}
//                 placeholder="Select on map"
//                 required
//                 error={personalErrors.geoLocation}
//               />
//               <Input
//                 label="District"
//                 name="district"
//                 value={personalInfo.district}
//                 onChange={handlePersonalChange}
//                 placeholder="Enter District"
//               />
//               <Input
//                 label="Mandal"
//                 name="mandal"
//                 value={personalInfo.mandal}
//                 onChange={handlePersonalChange}
//                 placeholder="Enter Mandal"
//               />
//               <Input
//                 label="Village"
//                 name="village"
//                 value={personalInfo.village}
//                 onChange={handlePersonalChange}
//                 placeholder="Enter Village"
//               />
//               <Select
//                 label="Registered By"
//                 name="registeredBy"
//                 value={personalInfo.registeredBy}
//                 onChange={handlePersonalChange}
//                 required
//                 error={personalErrors.registeredBy}
//                 options={[
//                   { value: "", label: "Select Agent" },
//                   { value: "agent1", label: "Field Agent" },
//                 ]}
//               />
//             </div>

//             <div className="px-6 py-4 border-t">
//               <button
//                 onClick={handlePersonalSave}
//                 className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition-colors"
//               >
//                 Save Personal Information
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* STEP 3: Verification Details Modal */}
//       {isOpen && currentStep === 'step3' && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-y-auto">
//             <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white">
//               <div>
//                 <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#002244]">
//                   Verification Details
//                 </h2>
//                 <p className="text-sm text-gray-500 mt-1">Customer: {email}</p>
//               </div>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <div className="px-6 py-6 flex-1 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   KYC Documents
//                 </label>
//                 <input
//                   type="file"
//                   name="kycDocument"
//                   accept=".doc,.docx,.jpg,.pdf,.png"
//                   onChange={handleVerificationChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>
//               <Input
//                 label="Street"
//                 name="street"
//                 value={verificationInfo.street}
//                 onChange={handleVerificationChange}
//                 placeholder="Street address"
//                 required
//                 error={verificationErrors.street}
//               />
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Input
//                   label="City"
//                   name="city"
//                   value={verificationInfo.city}
//                   onChange={handleVerificationChange}
//                   placeholder="City"
//                   required
//                   error={verificationErrors.city}
//                 />
//                 <Input
//                   label="State"
//                   name="state"
//                   value={verificationInfo.state}
//                   onChange={handleVerificationChange}
//                   placeholder="State"
//                   required
//                   error={verificationErrors.state}
//                 />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Input
//                   label="Postal Code"
//                   name="postalCode"
//                   value={verificationInfo.postalCode}
//                   onChange={handleVerificationChange}
//                   placeholder="400020"
//                   required
//                   error={verificationErrors.postalCode}
//                 />
//                 <Input
//                   label="Country"
//                   name="country"
//                   value={verificationInfo.country}
//                   onChange={handleVerificationChange}
//                   placeholder="India"
//                   required
//                   error={verificationErrors.country}
//                 />
//               </div>
//               <Select
//                 label="Industry"
//                 name="industry"
//                 value={verificationInfo.industry}
//                 onChange={handleVerificationChange}
//                 required
//                 error={verificationErrors.industry}
//                 options={[
//                   { value: "", label: "Select industry" },
//                   { value: "agriculture", label: "Agriculture" },
//                   { value: "survey", label: "Survey & Mapping" },
//                 ]}
//               />
//             </div>

//             <div className="px-6 py-4 border-t sticky bottom-0 bg-white">
//               <button
//                 onClick={handleVerificationSave}
//                 className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition-colors"
//               >
//                 Save Verification Details
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* STEP 4: Service Location Modal */}
//       {isOpen && currentStep === 'step4' && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-y-auto">
//             <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white">
//               <div>
//                 <h2 className="text-lg md:text-xl font-semibold text-[#002244]">
//                   Service Location
//                 </h2>
//                 <p className="text-sm text-gray-500 mt-1">Customer: {email}</p>
//               </div>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <div className="px-6 py-6 flex-1 space-y-4">
//               {locations.map((loc, idx) => (
//                 <div key={loc.id}>
//                   <label className="text-sm font-medium mb-1 flex justify-between items-center">
//                     <span>
//                       {idx + 1}
//                       {idx === 0
//                         ? "st"
//                         : idx === 1
//                           ? "nd"
//                           : idx === 2
//                             ? "rd"
//                             : "th"}{" "}
//                       Latitude/Longitude
//                     </span>
//                     {idx === locations.length - 1 && (
//                       <button
//                         type="button"
//                         onClick={addLocation}
//                         className="text-green-600 text-xl font-bold px-2 hover:bg-green-50 rounded"
//                       >
//                         +
//                       </button>
//                     )}
//                   </label>
//                   <input
//                     type="text"
//                     value={`${loc.lat}${loc.lat && loc.long ? ", " : ""}${loc.long}`}
//                     onChange={(e) => {
//                       const [lat, long] = e.target.value
//                         .split(",")
//                         .map((s) => s.trim());
//                       handleLocationChange(loc.id, "lat", lat || "");
//                       handleLocationChange(loc.id, "long", long || "");
//                     }}
//                     placeholder="Lat, Long"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//                   />
//                 </div>
//               ))}
//               <Input
//                 label="Number of acres"
//                 name="acres"
//                 value={acres}
//                 onChange={(e) => setAcres(e.target.value)}
//                 placeholder="Land area in acres"
//               />
//             </div>

//             <div className="px-6 py-4 border-t sticky bottom-0 bg-white">
//               <button
//                 onClick={handleServiceLocationSave}
//                 className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition-colors"
//               >
//                 Confirm Registration
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }








import React, { useState, useCallback, memo, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';

// Validation utilities
const validators = {
  email: (value) => {
    if (!value.trim()) return "Email or phone is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-+()]+$/;
    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      return "Please enter a valid email or phone number";
    }
    return "";
  },
  required: (value, fieldName) => {
    return !value.trim() ? `${fieldName} is required` : "";
  },
  phone: (value) => {
    if (!value.trim()) return "Phone is required";
    const phoneRegex = /^[\d\s\-+()]{10,}$/;
    return !phoneRegex.test(value) ? "Please enter a valid phone number" : "";
  },
};

// Input component
const Input = memo(
  ({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    required = false,
    error,
    className = "",
  }) => (
    <div>
      <label className="block text-sm md:text-base font-medium text-[#002244]">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-1 w-full px-3 md:px-4 py-2 border ${error ? "border-red-500" : "border-gray-300"
          } rounded-md md:rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
      />
      {error && <p className="text-xs md:text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
);

// Select component
const Select = memo(
  ({ label, name, value, onChange, options, required = false, error }) => (
    <div>
      <label className="block text-sm md:text-base font-medium text-[#002244]">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-1 w-full px-3 md:px-4 py-2 border ${error ? "border-red-500" : "border-gray-300"
          } rounded-md md:rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs md:text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
);

export default function ProfileSetupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState('step1');
  const [email, setEmail] = useState("");
  const [setupType, setSetupType] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});

  // Personal Info State
  const [personalInfo, setPersonalInfo] = useState({
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
  });
  const [personalErrors, setPersonalErrors] = useState({});

  // Verification State
  const [verificationInfo, setVerificationInfo] = useState({
    kycDocument: null,
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    industry: "",
  });
  const [verificationErrors, setVerificationErrors] = useState({});

  // Service Location State
  const [locations, setLocations] = useState([
    { id: 1, lat: "", long: "" },
    { id: 2, lat: "", long: "" },
    { id: 3, lat: "", long: "" },
  ]);
  const [acres, setAcres] = useState("");

  // Reset all state when modal closes
  const resetAll = useCallback(() => {
    setCurrentStep('step1');
    setEmail("");
    setSetupType("");
    setNotes("");
    setErrors({});
    setPersonalInfo({
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
    });
    setPersonalErrors({});
    setVerificationInfo({
      kycDocument: null,
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      industry: "",
    });
    setVerificationErrors({});
    setLocations([
      { id: 1, lat: "", long: "" },
      { id: 2, lat: "", long: "" },
      { id: 3, lat: "", long: "" },
    ]);
    setAcres("");
  }, []);

  useEffect(() => {
    if (!isOpen) resetAll();
  }, [isOpen, resetAll]);

  // Step 1: Validate and proceed
  const handleStep1Submit = useCallback(() => {
    const newErrors = {
      email: validators.email(email),
      setupType: validators.required(setupType, "Setup type"),
    };

    const hasErrors = Object.values(newErrors).some((err) => err);

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    if (setupType === "Personal Information") {
      setCurrentStep('step2');
      setPersonalInfo(prev => ({ ...prev, email }));
    } else if (setupType === "Verification Details") {
      setCurrentStep('step3');
    } else if (setupType === "Service Location") {
      setCurrentStep('step4');
    }
  }, [email, setupType]);

  // Step 2: Personal Info handlers
  const handlePersonalChange = useCallback((e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
    setPersonalErrors(prev => ({ ...prev, [name]: "" }));
  }, []);

  const handlePersonalSave = useCallback(() => {
    const newErrors = {
      firstName: validators.required(personalInfo.firstName, "First Name"),
      lastName: validators.required(personalInfo.lastName, "Last Name"),
      phone: validators.phone(personalInfo.phone),
      geoLocation: validators.required(personalInfo.geoLocation, "Geo Location"),
      registeredBy: validators.required(personalInfo.registeredBy, "Registered By"),
    };

    const hasErrors = Object.values(newErrors).some((err) => err);

    if (hasErrors) {
      setPersonalErrors(newErrors);
      return;
    }

    console.log("Personal Info Saved:", { customerEmail: email, ...personalInfo });
    setIsOpen(false);
    setCurrentStep('step1');
  }, [personalInfo, email]);

  // Step 3: Verification handlers
  const handleVerificationChange = useCallback((e) => {
    const { name, value, files } = e.target;
    setVerificationInfo(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setVerificationErrors(prev => ({ ...prev, [name]: "" }));
  }, []);

  const handleVerificationSave = useCallback(() => {
    const newErrors = {
      street: validators.required(verificationInfo.street, "Street"),
      city: validators.required(verificationInfo.city, "City"),
      state: validators.required(verificationInfo.state, "State"),
      postalCode: validators.required(verificationInfo.postalCode, "Postal Code"),
      country: validators.required(verificationInfo.country, "Country"),
      industry: validators.required(verificationInfo.industry, "Industry"),
    };

    const hasErrors = Object.values(newErrors).some((err) => err);

    if (hasErrors) {
      setVerificationErrors(newErrors);
      return;
    }

    console.log("Verification Details Saved:", { customerEmail: email, ...verificationInfo });
    setIsOpen(false);
    setCurrentStep('step1');
  }, [verificationInfo, email]);

  // Step 4: Service Location handlers
  const handleLocationChange = useCallback((id, field, value) => {
    setLocations(prev =>
      prev.map(loc => (loc.id === id ? { ...loc, [field]: value } : loc))
    );
  }, []);

  const addLocation = useCallback(() => {
    setLocations(prev => [
      ...prev,
      { id: Math.max(...prev.map(l => l.id), 0) + 1, lat: "", long: "" },
    ]);
  }, []);

  const handleServiceLocationSave = useCallback(() => {
    const validLocations = locations.filter((loc) => loc.lat || loc.long);

    if (validLocations.length === 0) {
      alert("Please enter at least one Latitude/Longitude pair.");
      return;
    }

    const formData = {
      locations: validLocations,
      acres,
    };
    console.log("Service Location Saved:", { email, ...formData });
    setIsOpen(false);
    setCurrentStep('step1');
  }, [locations, acres, email]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md transition text-lg"
      >
        Assist in Profile Setup
      </button>

      {/* STEP 1 */}
      {isOpen && currentStep === 'step1' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300">
              <h2 className="text-lg md:text-xl font-semibold text-[#002244]">
                Assist in Profile Setup
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="px-4 md:px-6 py-6 space-y-5">
              <div>
                <label className="block text-base font-medium text-[#002244] mb-2">
                  Customer email or phone
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors(prev => ({ ...prev, email: "" }));
                  }}
                  placeholder="Enter customer email or phone"
                  className={`w-full text-sm px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-base font-medium text-[#002244] mb-2">
                  Setup Type<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={setupType}
                    onChange={(e) => {
                      setSetupType(e.target.value);
                      setErrors(prev => ({ ...prev, setupType: "" }));
                    }}
                    className={`w-full text-sm px-3 py-2 border ${errors.setupType ? "border-red-500" : "border-gray-300"
                      } rounded-md bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-green-500`}
                  >
                    <option value="">Select Setup Type</option>
                    <option value="Personal Information">Personal Information</option>
                    <option value="Verification Details">Verification Details</option>
                    <option value="Service Location">Service Location</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={20}
                  />
                </div>
                {errors.setupType && <p className="text-sm text-red-500 mt-1">{errors.setupType}</p>}
              </div>

              <div>
                <label className="block text-base font-medium text-[#002244] mb-2">
                  Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any notes about the setup assistance needed..."
                  rows={4}
                  className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
              </div>

              <button
                onClick={handleStep1Submit}
                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition-colors"
              >
                Start Setup Assistance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Personal Info Modal */}
      {isOpen && currentStep === 'step2' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                  Customer Information
                </h2>
                <p className="text-sm text-gray-500 mt-1">Customer: {email}</p>
              </div>
              <button
                onClick={() => { setIsOpen(false); setCurrentStep('step1'); }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="px-6 py-4 overflow-y-auto flex-1 space-y-3">
              <Input
                label="First Name"
                name="firstName"
                value={personalInfo.firstName}
                onChange={handlePersonalChange}
                placeholder="First Name"
                required
                error={personalErrors.firstName}
              />
              <Input
                label="Middle Name"
                name="middleName"
                value={personalInfo.middleName}
                onChange={handlePersonalChange}
                placeholder="Middle Name"
              />
              <Input
                label="Last Name"
                name="lastName"
                value={personalInfo.lastName}
                onChange={handlePersonalChange}
                placeholder="Last Name"
                required
                error={personalErrors.lastName}
              />
              <Input
                label="Also Known As"
                name="alsoKnownAs"
                value={personalInfo.alsoKnownAs}
                onChange={handlePersonalChange}
                placeholder="Nickname"
              />
              <Input
                label="Phone"
                name="phone"
                type="tel"
                value={personalInfo.phone}
                onChange={handlePersonalChange}
                placeholder="+92 9876543210"
                required
                error={personalErrors.phone}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={personalInfo.email}
                onChange={handlePersonalChange}
                placeholder="example@gmail.com"
              />
              <Input
                label="Geo Location"
                name="geoLocation"
                value={personalInfo.geoLocation}
                onChange={handlePersonalChange}
                placeholder="Select on map"
                required
                error={personalErrors.geoLocation}
              />
              <Input
                label="District"
                name="district"
                value={personalInfo.district}
                onChange={handlePersonalChange}
                placeholder="Enter District"
              />
              <Input
                label="Mandal"
                name="mandal"
                value={personalInfo.mandal}
                onChange={handlePersonalChange}
                placeholder="Enter Mandal"
              />
              <Input
                label="Village"
                name="village"
                value={personalInfo.village}
                onChange={handlePersonalChange}
                placeholder="Enter Village"
              />
              <Select
                label="Registered By"
                name="registeredBy"
                value={personalInfo.registeredBy}
                onChange={handlePersonalChange}
                required
                error={personalErrors.registeredBy}
                options={[
                  { value: "", label: "Select Agent" },
                  { value: "agent1", label: "Field Agent" },
                ]}
              />
            </div>

            <div className="px-6 py-4 border-t">
              <button
                onClick={handlePersonalSave}
                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition-colors"
              >
                Save Personal Information
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Verification Modal */}
      {isOpen && currentStep === 'step3' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-y-auto">
            <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white">
              <div>
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#002244]">
                  Verification Details
                </h2>
                <p className="text-sm text-gray-500 mt-1">Customer: {email}</p>
              </div>
              <button
                onClick={() => { setIsOpen(false); setCurrentStep('step1'); }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="px-6 py-4 flex-1 space-y-3">
              <Input
                label="Street"
                name="street"
                value={verificationInfo.street}
                onChange={handleVerificationChange}
                required
                error={verificationErrors.street}
              />
              <Input
                label="City"
                name="city"
                value={verificationInfo.city}
                onChange={handleVerificationChange}
                required
                error={verificationErrors.city}
              />
              <Input
                label="State"
                name="state"
                value={verificationInfo.state}
                onChange={handleVerificationChange}
                required
                error={verificationErrors.state}
              />
              <Input
                label="Postal Code"
                name="postalCode"
                value={verificationInfo.postalCode}
                onChange={handleVerificationChange}
                required
                error={verificationErrors.postalCode}
              />
              <Input
                label="Country"
                name="country"
                value={verificationInfo.country}
                onChange={handleVerificationChange}
                required
                error={verificationErrors.country}
              />
              <Input
                label="Industry"
                name="industry"
                value={verificationInfo.industry}
                onChange={handleVerificationChange}
                required
                error={verificationErrors.industry}
              />
            </div>

            <div className="px-6 py-4 border-t">
              <button
                onClick={handleVerificationSave}
                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition-colors"
              >
                Save Verification Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Service Location Modal */}
      {isOpen && currentStep === 'step4' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-y-auto">
            <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white">
              <h2 className="text-xl font-semibold text-gray-800">Service Locations</h2>
              <button
                onClick={() => { setIsOpen(false); setCurrentStep('step1'); }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="px-6 py-4 space-y-3 flex-1 overflow-y-auto">
              {locations.map((loc) => (
                <div key={loc.id} className="flex gap-3 items-center">
                  <Input
                    label={`Latitude ${loc.id}`}
                    name={`lat-${loc.id}`}
                    value={loc.lat}
                    onChange={(e) => handleLocationChange(loc.id, "lat", e.target.value)}
                  />
                  <Input
                    label={`Longitude ${loc.id}`}
                    name={`long-${loc.id}`}
                    value={loc.long}
                    onChange={(e) => handleLocationChange(loc.id, "long", e.target.value)}
                  />
                </div>
              ))}
              <button
                onClick={addLocation}
                className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm transition"
              >
                Add Another Location
              </button>

              <Input
                label="Acres"
                name="acres"
                value={acres}
                onChange={(e) => setAcres(e.target.value)}
              />
            </div>

            <div className="px-6 py-4 border-t">
              <button
                onClick={handleServiceLocationSave}
                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition-colors"
              >
                Save Service Locations
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
