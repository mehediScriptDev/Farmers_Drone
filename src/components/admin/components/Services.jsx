import React from 'react';
import { useTranslation } from 'react-i18next';
import { Settings } from 'lucide-react';

const Services = () => {
  const { t } = useTranslation();

  return (
    <div className='w-full bg-[#fafffd] px-6 xl:px-11 py-3 lg:py-6'>
      <div className='bg-white rounded-lg shadow-sm p-8'>
        <div className='flex items-center gap-4 mb-6'>
          <div className='p-3 bg-green-100 rounded-lg'>
            <Settings className='w-8 h-8 text-green-600' />
          </div>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>
              {t('sidebar.admin.services')}
            </h1>
            <p className='text-gray-600 mt-1'>Manage your services</p>
          </div>
        </div>
        <div className='text-center py-20'>
          <p className='text-gray-500 text-lg'>
            Services management coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
