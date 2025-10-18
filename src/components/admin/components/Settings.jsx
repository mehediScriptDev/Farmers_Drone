import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack, IoSettingsOutline } from 'react-icons/io5';
import { Header } from '../../common/Header';

const Settings = () => {
  const navigate = useNavigate();

  const paymentMethods = {
    indianSystems1: [
      {
        name: 'UPI Gateway',
        status: 'UPI Gateway',
        statusColor: 'text-White-950',
      },
      { name: 'BBPS', status: 'Testing', statusColor: 'text-Dark-Gray-400' },
      { name: 'AePS', status: 'UPI Gateway', statusColor: 'text-White-950' },
      {
        name: 'RuPAY',
        status: 'Active',
        statusColor: 'text-Lime-Green-500-Raw',
      },
      {
        name: 'IMPS',
        status: 'Active',
        statusColor: 'text-Lime-Green-500-Raw',
      },
    ],
    international: [
      {
        name: 'PayPal',
        status: 'Active',
        statusColor: 'text-Lime-Green-500-Raw',
      },
      {
        name: 'Stripe',
        status: 'Active',
        statusColor: 'text-Lime-Green-500-Raw',
      },
    ],
    indianSystems2: [
      {
        name: 'Razorpay',
        status: 'Active',
        statusColor: 'text-Lime-Green-500-Raw',
      },
      {
        name: 'PayU',
        status: 'Active',
        statusColor: 'text-Lime-Green-500-Raw',
      },
    ],
    walletServices: [
      {
        name: 'Paytm',
        status: 'Active',
        statusColor: 'text-Lime-Green-500-Raw',
      },
      {
        name: 'PhonePe',
        status: 'Active',
        statusColor: 'text-Lime-Green-500-Raw',
      },
      {
        name: 'Google Pay',
        status: 'Active',
        statusColor: 'text-Lime-Green-500-Raw',
      },
    ],
  };

  return (
    <>
      <Header />
      <div className='w-[1440px] min-h-screen mx-auto relative bg-white'>
        {/* Back Button */}
        <div className='w-[1200px] h-12 mx-auto absolute left-[120px] top-[120px]'>
          <button
            onClick={() => navigate('/admin')}
            className='flex justify-start items-center gap-3'
          >
            <IoArrowBack className='w-5 h-5 text-neutral-800' />
          </button>
        </div>

        {/* Main Content */}
        <div className='w-[1064px] absolute left-[188px] top-[200px] flex flex-col justify-start items-start gap-10'>
          {/* Header Section */}
          <div className='self-stretch flex justify-between items-center'>
            <div className='w-[482px] flex flex-col justify-start items-start gap-1'>
              <div className="self-stretch justify-start text-White-950 text-2xl font-semibold font-['Poppins'] leading-9">
                Backend Integrations
              </div>
              <div className="self-stretch justify-start text-White-800 text-base font-normal font-['Lato'] leading-normal">
                Manage payment gateway connections and API configurations
              </div>
            </div>
            <div className='px-6 py-3 bg-Lime-Green-500-Raw rounded flex justify-center items-center gap-2'>
              <div className="justify-start text-white text-base font-medium font-['Poppins'] leading-normal">
                Add payment methods
              </div>
            </div>
          </div>

          {/* First Row: Indian Systems & International */}
          <div className='self-stretch flex justify-start items-start gap-6'>
            {/* Indian Systems Card */}
            <div className='flex-1 pb-3 rounded-lg border border-White-200 flex flex-col justify-start items-start gap-8'>
              <div className='self-stretch px-6 py-3.5 border-b border-White-200 flex justify-start items-center gap-2'>
                <div className="justify-start text-White-950 text-xl font-medium font-['Poppins'] leading-loose">
                  Indian Systems
                </div>
              </div>
              <div className='self-stretch flex flex-col justify-center items-start'>
                {paymentMethods.indianSystems1.map((method, index) => (
                  <div
                    key={index}
                    className='self-stretch px-6 py-3 flex justify-between items-center'
                  >
                    <div className='flex flex-col justify-center items-start gap-2'>
                      <div className="justify-start text-White-950 text-base font-medium font-['Poppins'] leading-normal">
                        {method.name}
                      </div>
                      <div
                        className={`justify-start text-xs font-normal font-['Lato'] leading-none ${method.statusColor}`}
                      >
                        {method.status}
                      </div>
                    </div>
                    <button className='w-6 h-6 relative flex items-center justify-center'>
                      <IoSettingsOutline className='w-5 h-5 text-Dark-Gray-400' />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* International Card */}
            <div className='flex-1 pb-3 rounded-lg border border-White-200 flex flex-col justify-start items-start gap-8'>
              <div className='self-stretch px-6 py-3.5 border-b border-White-200 flex justify-start items-center gap-2'>
                <div className="justify-start text-White-950 text-xl font-medium font-['Poppins'] leading-loose">
                  International
                </div>
              </div>
              <div className='self-stretch flex flex-col justify-center items-start'>
                {paymentMethods.international.map((method, index) => (
                  <div
                    key={index}
                    className='self-stretch px-6 py-3 flex justify-between items-center'
                  >
                    <div className='flex flex-col justify-center items-start gap-2'>
                      <div className="justify-start text-White-950 text-base font-medium font-['Poppins'] leading-normal">
                        {method.name}
                      </div>
                      <div
                        className={`justify-start text-xs font-normal font-['Lato'] leading-none ${method.statusColor}`}
                      >
                        {method.status}
                      </div>
                    </div>
                    <button className='w-6 h-6 relative flex items-center justify-center'>
                      <IoSettingsOutline className='w-5 h-5 text-Dark-Gray-400' />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second Row: Indian Systems & Wallet Services */}
          <div className='self-stretch flex justify-start items-start gap-6'>
            {/* Indian Systems Card */}
            <div className='flex-1 pb-3 rounded-lg border border-White-200 flex flex-col justify-start items-start gap-8'>
              <div className='self-stretch px-6 py-3.5 border-b border-White-200 flex justify-start items-center gap-2'>
                <div className="justify-start text-White-950 text-xl font-medium font-['Poppins'] leading-loose">
                  Indian Systems
                </div>
              </div>
              <div className='self-stretch flex flex-col justify-center items-start'>
                {paymentMethods.indianSystems2.map((method, index) => (
                  <div
                    key={index}
                    className='self-stretch px-6 py-3 flex justify-between items-center'
                  >
                    <div className='flex flex-col justify-center items-start gap-2'>
                      <div className="justify-start text-White-950 text-base font-medium font-['Poppins'] leading-normal">
                        {method.name}
                      </div>
                      <div
                        className={`justify-start text-xs font-normal font-['Lato'] leading-none ${method.statusColor}`}
                      >
                        {method.status}
                      </div>
                    </div>
                    <button className='w-6 h-6 relative flex items-center justify-center'>
                      <IoSettingsOutline className='w-5 h-5 text-Dark-Gray-400' />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Wallet Services Card */}
            <div className='flex-1 pb-3 rounded-lg border border-White-200 flex flex-col justify-start items-start gap-8'>
              <div className='self-stretch px-6 py-3.5 border-b border-White-200 flex justify-start items-center gap-2'>
                <div className="justify-start text-White-950 text-xl font-medium font-['Poppins'] leading-loose">
                  Wallet Services
                </div>
              </div>
              <div className='self-stretch flex flex-col justify-center items-start'>
                {paymentMethods.walletServices.map((method, index) => (
                  <div
                    key={index}
                    className='self-stretch px-6 py-3 flex justify-between items-center'
                  >
                    <div className='flex flex-col justify-center items-start gap-2'>
                      <div className="justify-start text-White-950 text-base font-medium font-['Poppins'] leading-normal">
                        {method.name}
                      </div>
                      <div
                        className={`justify-start text-xs font-normal font-['Lato'] leading-none ${method.statusColor}`}
                      >
                        {method.status}
                      </div>
                    </div>
                    <button className='w-6 h-6 relative flex items-center justify-center'>
                      <IoSettingsOutline className='w-5 h-5 text-Dark-Gray-400' />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
