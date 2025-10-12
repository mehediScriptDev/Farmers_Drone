import { useState } from "react";
import { useTranslation } from "react-i18next";

// Resolve Billing Modal Component
const ResolveBillingModal = ({ isOpen, onClose }) => {
  const [customer, setCustomer] = useState('');
  const [issueType, setIssueType] = useState('Incorrect charge');
  const [transactionId, setTransactionId] = useState('');
  const [notes, setNotes] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t } = useTranslation();
  const issueTypes = [
    t('dashboard.employee.modal.resolveIssueTypeOption1'),
    t('dashboard.employee.modal.resolveIssueTypeOption2'),
    t('dashboard.employee.modal.resolveIssueTypeOption3'),
    t('dashboard.employee.modal.resolveIssueTypeOption4'),
    t('dashboard.employee.modal.resolveIssueTypeOption5'),

  ];

  if (!isOpen) return null;

  const handleSubmit = () => {
    console.log({ customer, issueType, transactionId, notes });
    alert('Issue resolved successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-5 z-50">
      <div className="bg-white rounded-lg w-full max-w-lg shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">{t('dashboard.employee.modal.resolveTitle')}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
        </div>

        <div className="p-6">
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('dashboard.employee.modal.customerLabel')}</label>
            <input
              type="text"
              placeholder={t('dashboard.employee.modal.resolveCustomerPlaceholder')}
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-green-500 text-sm"
            />
          </div>

          <div className="mb-5 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('dashboard.employee.modal.resolveIssueTypeLabel')}</label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded text-left text-sm text-gray-700 bg-white hover:border-gray-400 flex justify-between items-center"
              >
                {issueType}
                <span className="text-xs">▼</span>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded mt-1 shadow-lg z-10">
                  {issueTypes.map((type, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setIssueType(type);
                        setIsDropdownOpen(false);
                      }}
                      className={`px-3 py-2.5 cursor-pointer text-sm ${
                        issueType === type
                          ? 'bg-green-500 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('dashboard.employee.modal.resolveTransactionIdLabel')}</label>
            <input
              type="text"
              placeholder={t('dashboard.employee.modal.resolveTransactionIdPlaceholder')}
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-green-500 text-sm"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('dashboard.employee.modal.notesLabel')}</label>
            <textarea
              placeholder={t('dashboard.employee.modal.resolveNotesPlaceholder')}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-green-500 text-sm resize-none h-24"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded text-sm transition-colors"
          >
          {t('dashboard.employee.modal.resolveButton')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResolveBillingModal