import React, { useState } from "react";

const RegistrationModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    aka: "",
    phone: "",
    email: "",
    geoLocation: "",
    district: "",
    mandal: "",
    village: "",
    kycDocument: null,
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    area: "",
    lat1: "",
    long1: "",
    lat2: "",
    long2: "",
    lat3: "",
    long3: "",
    acres: "",
  });

  const [errors, setErrors] = useState({});

  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      ["firstName", "lastName", "phone", "email", "geoLocation", "district", "mandal", "village"].forEach(key => {
        if (!formData[key]) newErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required`;
      });
    }

    if (step === 2) {
      ["kycDocument", "street", "city", "state", "postalCode", "country", "area"].forEach(key => {
        if (!formData[key]) newErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required`;
      });
    }

    if (step === 3) {
      ["lat1", "long1", "lat2", "long2", "lat3", "long3", "acres"].forEach(key => {
        if (!formData[key]) newErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required`;
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = () => {
    if (validateStep()) {
      console.log("Form Data:", formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  const formatLabel = (key) => {
    const labels = {
      firstName: "First Name*",
      middleName: "Middle Name",
      lastName: "Last Name*",
      aka: "Also Known As",
      phone: "Phone*",
      email: "Email*",
      geoLocation: "Geo Location*",
      district: "District*",
      mandal: "Mandal*",
      village: "Village*",
      kycDocument: "KYC Document*",
      street: "Street*",
      city: "City*",
      state: "State*",
      postalCode: "Postal Code*",
      country: "Country*",
      area: "Select Area*",
      lat1: "1st Latitude*",
      long1: "1st Longitude*",
      lat2: "2nd Latitude*",
      long2: "2nd Longitude*",
      lat3: "3rd Latitude*",
      long3: "3rd Longitude*",
      acres: "Number of Acres*",
    };
    return labels[key] || key;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-2xl p-6 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-xl"
        >
          &times;
        </button>

        {/* Back button */}
        {step > 1 && (
          <button
            onClick={prevStep}
            className="absolute top-4 left-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Back
          </button>
        )}

        {/* Header */}
        <h2 className="text-lg font-semibold mb-4 text-center">
          {step === 1 && "Step 1: Basic Info"}
          {step === 2 && "Step 2: Address & KYC"}
          {step === 3 && "Step 3: Coordinates & Acres"}
        </h2>

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {[
              "firstName", "middleName", "lastName", "aka", "phone", "email", "geoLocation", "district", "mandal", "village"
            ].map((key) => (
              <div key={key}>
                <label className="block mb-1 font-medium">{formatLabel(key)}</label>
                <input
                  type={key === "email" ? "email" : "text"}
                  placeholder={formatLabel(key)}
                  className="w-full border rounded p-2 bordeer-[#002244]"
                  value={formData[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                />
                {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-3">
            <div>
              <label className="block mb-1 font-medium">{formatLabel("kycDocument")}</label>
              <input
                type="file"
                onChange={(e) => setFormData({ ...formData, kycDocument: e.target.files[0] })}
                className="w-full bordeer-[#002244]"
              />
              {errors.kycDocument && <p className="text-red-500 text-sm">{errors.kycDocument}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium">{formatLabel("street")}</label>
              <input
                type="text"
                className="w-full border rounded p-2 bordeer-[#002244]"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              />
              {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["city", "state"].map(key => (
                <div key={key}>
                  <label className="block mb-1 font-medium">{formatLabel(key)}</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2 bordeer-[#002244]"
                    value={formData[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  />
                  {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["postalCode", "country"].map(key => (
                <div key={key}>
                  <label className="block mb-1 font-medium">{formatLabel(key)}</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2 bordeer-[#002244]"
                    value={formData[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  />
                  {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
                </div>
              ))}
            </div>

            {/* Dropdown select */}
            <div>
              <label className="block mb-1 font-medium">{formatLabel("area")}</label>
              <select
                className="w-full border rounded p-2 bordeer-[#002244]"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              >
                <option value="">-- Select Area --</option>
                <option value="Area1">Area 1</option>
                <option value="Area2">Area 2</option>
                <option value="Area3">Area 3</option>
              </select>
              {errors.area && <p className="text-red-500 text-sm">{errors.area}</p>}
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-3">
            {["lat1", "long1", "lat2", "long2", "lat3", "long3", "acres"].map(key => (
              <div key={key}>
                <label className="block mb-1 font-medium">{formatLabel(key)}</label>
                <input
                  type="text"
                  className="w-full border rounded p-2 bordeer-[#002244]"
                  value={formData[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                />
                {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
              </div>
            ))}
            <button
              onClick={handleSubmit}
              className="w-full mt-4 px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Complete Registration
            </button>
          </div>
        )}

        {/* Next button */}
        {step < 3 && (
          <button
            onClick={nextStep}
            className="w-full mt-4 px-4 py-3 bg-[#00C805] text-white rounded hover:bg-green-700"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;
