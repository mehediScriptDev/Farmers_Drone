import React from 'react';
import { useTranslation } from 'react-i18next';
import { HiX } from 'react-icons/hi';

const UserDetailsModal = ({ isOpen, onClose, user, onApprove, onReject }) => {
  const { t } = useTranslation();

  if (!isOpen || !user) {
    return null;
  }

  const handleApproveClick = () => {
    onApprove(user.id);
    onClose();
  };

  const handleRejectClick = () => {
    onReject(user.id);
    onClose();
  };

  return (
    <div
      className='fixed inset-0 bg-black/70 bg-opacity-70 flex justify-center items-center z-50 p-4'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 md:p-12 relative'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className='absolute top-4 right-4 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition'
          aria-label='Close'
        >
          <HiX className='w-6 h-6 text-gray-800' />
        </button>

        <div className='flex flex-col md:flex-row items-center gap-6 mb-8'>
          <img
            className='w-36 h-36 rounded-full object-cover border-4 border-gray-100'
            src={user.avatarUrl}
            alt={user.name}
          />
          <div className='text-center md:text-left'>
            <h2 className='text-2xl font-semibold text-gray-900 leading-9'>
              {user.name}
            </h2>
            <p className='text-base text-gray-700 mt-2'>{user.phone}</p>
            <p className='text-base text-gray-700'>{user.email}</p>
            <p className='text-base text-gray-700'>{user.fullAddress}</p>
          </div>
        </div>

        <div>
          <h3 className='text-xl font-semibold text-gray-900 leading-9 mb-6'>
            {t('dashboard.admin.userManagement.modal.aboutTitle')}
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-lg'>
            <div className='text-base text-gray-500'>
              {t('dashboard.admin.userManagement.modal.fullName')}
            </div>
            <div className='text-base font-medium text-gray-900'>
              {user.name}
            </div>
            <div className='text-base text-gray-500'>
              {t('dashboard.admin.userManagement.modal.phoneNumber')}
            </div>
            <div className='text-base font-medium text-gray-900'>
              {user.phone}
            </div>
            <div className='text-base text-gray-500'>
              {t('dashboard.admin.userManagement.modal.email')}
            </div>
            <div className='text-base font-medium text-gray-900'>
              {user.email}
            </div>
            <div className='text-base text-gray-500'>
              {t('dashboard.admin.userManagement.modal.latLong')}
            </div>
            <div className='text-base font-medium text-gray-900'>
              {user.latitudeLongitude}
            </div>
            <div className='text-base text-gray-500'>
              {t('dashboard.admin.userManagement.modal.industry')}
            </div>
            <div className='text-base font-medium text-gray-900'>
              {user.industry}
            </div>
          </div>
        </div>

        <p className='mt-8 text-base text-gray-700 leading-normal'>
          {user.description}
        </p>

        {/* Conditional Buttons for Pending Status */}
        {user.status === 'pending' && (
          <div className='mt-8 pt-6 border-t border-gray-200 flex justify-end gap-4'>
            <button
              onClick={handleApproveClick}
              className='px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition'
            >
              {t('dashboard.admin.userManagement.modal.approveButton')}
            </button>
            <button
              onClick={handleRejectClick}
              className='px-6 py-2 bg-white text-gray-700 font-semibold border border-gray-300 rounded-lg hover:bg-gray-50 transition'
            >
              {t('dashboard.admin.userManagement.modal.cancelButton')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailsModal;
