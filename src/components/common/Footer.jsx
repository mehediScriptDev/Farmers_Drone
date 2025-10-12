import React from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-800 text-white w-full'>
      <div className='w-full px-8 lg:px-16 py-6'>
        <div className='text-center'>
          <p className='text-sm'>
            © {currentYear} Prasad Dashboard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
