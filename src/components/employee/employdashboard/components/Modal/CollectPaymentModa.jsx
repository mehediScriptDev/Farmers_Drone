import { useState, useRef, useEffect } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CollectPaymentModal = ({ isOpen, onClose }) => {
  const [customer, setCustomer] = useState('');
  const [amount, setAmount] = useState('$00.00');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [notes, setNotes] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const modalRef = useRef(null);
  const dropdownRef = useRef(null);
  const { t } = useTranslation();

  const paymentMethods = ['Credit Card', 'Debit Card', 'Bank', 'Rupay'];

  // 🟢 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 🟢 Close modal when clicking outside modal box
  useEffect(() => {
    const handleOutsideModal = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideModal);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideModal);
    };
  }, [isOpen, onClose]);

  // 🟢 Handle submit with validation
  const handleSubmit = () => {
  if (!customer.trim()) {
    toast.error("Customer ID is required!");
    return;
  }
  if (!amount.trim() || amount === "$00.00") {
    toast.error("Amount is required!");
    return;
  }

  toast.success("Payment processed successfully!");

  setTimeout(() => {
    onClose();
  }, 3800); // close after 0.8s
};


  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-5 z-50">
        <div
          ref={modalRef}
          className="bg-white rounded-lg w-full max-w-xl shadow-2xl p-4 mx-2"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-[#002244]">
              {t('dashboard.employee.modal.collectTitle')}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>

          <div className="p-6">
            {/* Customer */}
            <div className="mb-5">
              <label className="block text-base font-medium text-[#002244] mb-2">
                {t('dashboard.employee.modal.customerLabel')}
              </label>
              <input
                type="text"
                placeholder={t('dashboard.employee.modal.customerPlaceholder')}
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-green-500 text-base"
              />
            </div>

            {/* Amount */}
            <div className="mb-5">
              <label className="block text-base font-medium text-[#002244] mb-2">
                {t('dashboard.employee.modal.amountLabel')}
              </label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-green-500 text-base"
              />
            </div>

            {/* Payment Method Dropdown */}
            <div className="mb-5 relative" ref={dropdownRef}>
              <label className="block text-base font-medium text-[#002244] mb-2">
                {t('dashboard.employee.modal.paymentMethodLabel')}
              </label>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded text-left text-base text-[#002244] bg-white hover:border-gray-400 flex justify-between items-center"
              >
                {paymentMethod}
                {isDropdownOpen ? (
                  <BiChevronUp className="text-xl text-gray-500" />
                ) : (
                  <BiChevronDown className="text-xl text-gray-500" />
                )}
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded mt-1 shadow-lg z-10 overflow-hidden">
                  {paymentMethods.map((method, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setPaymentMethod(method);
                        setIsDropdownOpen(false);
                      }}
                      className={`px-3 py-2.5 cursor-pointer text-base transition-colors ${
                        paymentMethod === method
                          ? 'bg-green-500 text-white'
                          : 'text-[#002244] hover:bg-gray-100'
                      }`}
                    >
                      {method}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="mb-5">
              <label className="block text-base font-medium text-[#002244] mb-2">
                {t('dashboard.employee.modal.notesLabel')}
              </label>
              <textarea
                placeholder={t('dashboard.employee.modal.notesPlaceholder')}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-green-500 text-base resize-none h-24"
              />
            </div>

            {/* Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded text-base transition-colors"
            >
              {t('dashboard.employee.modal.processButton')}
            </button>
          </div>
        </div>
      </div>

      {/* 🟢 Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default CollectPaymentModal;
