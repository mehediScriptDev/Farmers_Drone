import React from 'react';
import PaymentMethodItem from './PaymentMethodItem';

const PaymentMethodCard = ({ title, methods }) => {
  return (
    <div className='flex-1 rounded-lg border border-gray-200 flex flex-col'>
      <div className='self-stretch px-6 py-3.5 border-b border-gray-200'>
        <div className="text-gray-900 text-xl font-medium font-['Poppins'] leading-loose">
          {title}
        </div>
      </div>
      <div className='self-stretch flex flex-col justify-center items-start'>
        {methods.map((method, index) => (
          <PaymentMethodItem key={index} method={method} />
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodCard;
