import React from 'react';
import { HiOutlineTruck } from 'react-icons/hi';

const VehicleManagement = () => {
  return (
    <div className='min-h-screen bg-gray-50 w-full'>
      <div className='w-full px-4 sm:px-6 lg:px-8 py-6'>
        {/* Header Section */}
        <div className='bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8'>
          <div className='flex items-center justify-between flex-wrap gap-4'>
            <div className='flex items-center'>
              <div className='bg-orange-100 p-3 rounded-lg mr-4'>
                <HiOutlineTruck className='w-8 h-8 text-orange-600' />
              </div>
              <div>
                <h1 className='text-2xl sm:text-3xl font-bold text-gray-900'>
                  Vehicle Management
                </h1>
                <p className='text-gray-600 mt-1'>
                  Manage your assigned vehicle and maintenance
                </p>
              </div>
            </div>
            <div className='flex items-center space-x-2'>
              <span className='bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium'>
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <h2 className='text-xl font-bold text-gray-900 mb-4'>
            Vehicle Status
          </h2>
          <p className='text-gray-600 mb-6'>
            This page will contain vehicle management functionality.
          </p>

          {/* Demo Content */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <h3 className='font-semibold text-gray-900 mb-2'>Fuel Level</h3>
              <p className='text-2xl font-bold text-green-600'>75%</p>
            </div>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <h3 className='font-semibold text-gray-900 mb-2'>Mileage</h3>
              <p className='text-2xl font-bold text-blue-600'>45,892</p>
            </div>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <h3 className='font-semibold text-gray-900 mb-2'>Last Service</h3>
              <p className='text-2xl font-bold text-yellow-600'>15 days</p>
            </div>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <h3 className='font-semibold text-gray-900 mb-2'>Status</h3>
              <p className='text-2xl font-bold text-green-600'>Good</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleManagement;
