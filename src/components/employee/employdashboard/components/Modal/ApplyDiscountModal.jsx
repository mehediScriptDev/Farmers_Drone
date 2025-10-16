import { useState, useRef, useEffect } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";

const ApplyDiscountModal = ({ isOpen, onClose }) => {
  const initialState = {
    customer: '',
    discountType: 'Percentage Discount',
    amount: '',
    notes: '',
    isDropdownOpen: false,
  };

  const [state, setState] = useState(initialState);
  const modalRef = useRef(null);
  const dropdownRef = useRef(null);
  const { t } = useTranslation();

  const discountTypes = ['Percentage Discount', 'Referral Bonus', 'Loyalty Bonus', 'Campaign Discount'];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setState(prev => ({ ...prev, isDropdownOpen: false }));
      }
    };
    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => document.removeEventListener("mousedown", handleClickOutsideDropdown);
  }, []);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutsideModal);
    }
    return () => document.removeEventListener("mousedown", handleClickOutsideModal);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    // Reset state
    setState(initialState);
    onClose();
  };

  const handleSubmit = () => {
    const { customer, discountType, amount, notes } = state;

    if (!customer.trim()) {
      toast.error("Customer ID is required!");
      return;
    }
    if (!discountType) {
      toast.error("Discount type is required!");
      return;
    }
    if (!amount.trim()) {
      toast.error("Amount is required!");
      return;
    }
    if (!notes.trim()) {
      toast.error("Notes are required!");
      return;
    }

    toast.success("Discount applied successfully!");
    console.log({ customer, discountType, amount, notes });

    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-5 z-50">
        <div ref={modalRef} className="bg-white rounded-lg w-full max-w-xl shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-[#002244]">{t('dashboard.employee.modal.applyTitle')}</h2>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none"><IoMdClose />
</button>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-6">
            {/* Customer */}
            <div className="mb-4">
              <label className="block text-base font-medium text-[#002244] mb-1">{t('dashboard.employee.modal.customerLabel')}</label>
              <input
                type="text"
                placeholder={t('dashboard.employee.modal.applyCustomerPlaceholder')}
                value={state.customer}
                onChange={(e) => setState(prev => ({ ...prev, customer: e.target.value }))}
                className="w-full px-3 py-2 border border-[#002244] rounded focus:outline-none focus:border-green-500 text-base"
              />
            </div>

            {/* Discount Type */}
            <div className="mb-4 relative" ref={dropdownRef}>
              <label className="block text-base font-medium text-[#002244] mb-1">{t('dashboard.employee.modal.applyDiscountTypeLabel')}</label>
              <button
                onClick={() => setState(prev => ({ ...prev, isDropdownOpen: !prev.isDropdownOpen }))}
                className="w-full px-3 py-2 border border-[#002244] rounded text-left text-base text-[#002244] bg-white hover:border-gray-400 flex justify-between items-center"
              >
                {state.discountType}
                {state.isDropdownOpen ? <BiChevronUp className="text-xl text-[#002244]" /> : <BiChevronDown className="text-xl text-[#002244]" />}
              </button>
              {state.isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded mt-1 shadow-lg z-10 overflow-hidden">
                  {discountTypes.map((type, index) => (
                    <div
                      key={index}
                      onClick={() => setState(prev => ({ ...prev, discountType: type, isDropdownOpen: false }))}
                      className={`px-3 py-2 cursor-pointer text-base flex justify-between items-center transition-colors ${
                        state.discountType === type ? 'bg-green-500 text-white' : 'text-[#002244] hover:bg-gray-100'
                      }`}
                    >
                      {type}
                      {state.discountType === type && <span className="text-white">✓</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Amount */}
            <div className="mb-4">
              <label className="block text-base font-medium text-[#002244] mb-1">{t('dashboard.employee.modal.applyAmountLabel')}</label>
              <input
                type="text"
                placeholder="$00.00"
                value={state.amount}
                onChange={(e) => setState(prev => ({ ...prev, amount: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500 text-base"
              />
            </div>

            {/* Notes */}
            <div className="mb-4">
              <label className="block text-base font-medium text-[#002244] mb-1">{t('dashboard.employee.modal.notesLabel')}</label>
              <textarea
                placeholder={t('dashboard.employee.modal.applyNotesPlaceholder')}
                value={state.notes}
                onChange={(e) => setState(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500 text-base resize-none h-24"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded text-base transition-colors"
            >
              {t('dashboard.employee.modal.applyButton')}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default ApplyDiscountModal;
