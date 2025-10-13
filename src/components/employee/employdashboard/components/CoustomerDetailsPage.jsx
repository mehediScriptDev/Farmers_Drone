import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";

function CustomerDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { customerId } = useParams();

  // eslint-disable-next-line no-unused-vars
  const [customer, setCustomer] = useState(location.state?.customer || null);

  // Fallback customer data
  const customerData = {
    name: customer?.name || 'Albert Flores',
    email: customer?.email || 'albert.flores@gmail.com',
    address: customer?.address || '2118 Thornridge Dr, Syracuse, Connecticut 35624',
    location: customer?.location || { latitude: '23.8103° N', longitude: '90.4125° E' }
  };

  // Fetch customer data if not available
  useEffect(() => {
    if (!customer && customerId) {
      // Replace with your API fetch logic if needed
      // Example:
      // axios.get(`/api/customers/${customerId}`).then(res => setCustomer(res.data));
    }
  }, [customer, customerId]);

  const orders = [
    { id: 1, service: 'Agro Drone Service', description: 'Precision crop monitoring and field insights powered by aerial data.', image: 4, videos: 2, inf: 1, time: '10 minutes ago', date: '8 Sep, 2023' },
    { id: 2, service: 'Agro Drone Service', description: 'Precision crop monitoring and field insights powered by aerial data.', image: 4, videos: 2, inf: 1, time: '10 minutes ago', date: '8 Sep, 2023' },
    { id: 3, service: 'Agro Drone Service', description: 'Precision crop monitoring and field insights powered by aerial data.', image: 4, videos: 2, inf: 1, time: '10 minutes ago', date: '8 Sep, 2023' },
    { id: 4, service: 'Agro Drone Service', description: 'Precision crop monitoring and field insights powered by aerial data.', image: 4, videos: 2, inf: 1, time: '10 minutes ago', date: '8 Sep, 2023' },
    { id: 5, service: 'Agro Drone Service', description: 'Precision crop monitoring and field insights powered by aerial data.', image: 4, videos: 2, inf: 1, time: '10 minutes ago', date: '8 Sep, 2023' },
    { id: 6, service: 'Agro Drone Service', description: 'Precision crop monitoring and field insights powered by aerial data.', image: 4, videos: 2, inf: 1, time: '10 minutes ago', date: '8 Sep, 2023' },
  ];

  const handleOrderClick = (order) => {
    navigate(`/order/${order.id}`, { state: { order, customer } });
  };

  const handleBackToDashboard = () => {
    // Navigate to previous page or default dashboard
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex-1 p-4 md:p-8">
        <button
          onClick={handleBackToDashboard}
          aria-label="Back to Dashboard"
          className="mb-6 text-2xl flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
        >
          <IoArrowBack className="w-4 h-4 " />
        
        </button>

        {/* Customer Profile Section */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm lg:bg-transparent lg:border-0 lg:shadow-none p-4 sm:p-5 lg:p-6 mb-6">
          <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-5 lg:gap-6">

            {/* Profile Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 flex-1 text-center sm:text-left">
              <img
                src="https://i.pravatar.cc/80?img=12"
                alt={`${customerData.name} Profile`}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{customerData.name}</h2>
                <p className="text-sm text-gray-600 mb-0.5">{customerData.email}</p>
                <p className="text-xs sm:text-sm text-gray-500">{customerData.address}</p>
              </div>
            </div>

            {/* Location Box */}
            <div className="bg-green-50 border border-green-100 px-4 py-2 sm:px-5 sm:py-3 rounded-lg w-full sm:w-auto">
              <div className="text-[11px] sm:text-xs text-gray-600 mb-1 font-medium">New Field (India Gate-wal)</div>
              <div className="text-xs sm:text-sm text-gray-800">
                Latitude: <span className="font-semibold">{customerData.location.latitude}</span>
              </div>
              <div className="text-xs sm:text-sm text-gray-800">
                Longitude: <span className="font-semibold">{customerData.location.longitude}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Total Order Complete <span className="text-gray-600">( {orders.length} )</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {orders.map((order) => (
              <div key={order.id} className="bg-[rgba(247,255,229,1)] border border-green-100 rounded-xl p-5">
                <div className="flex gap-4 mb-4">
                  <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                    <img src="https://cdn-icons-png.flaticon.com/512/3629/3629941.png" alt="Drone Service Icon" className="w-10 h-10 opacity-80" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1.5 text-base">{order.service}</h4>
                    <p className="text-sm text-gray-600 leading-snug">{order.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-4 text-sm text-gray-700">
                  <span className="font-medium">{order.image} Image</span>
                  <span className="font-medium">{order.videos} Videos</span>
                  <span className="font-medium">{order.inf} Inf</span>
                  <span className="ml-auto text-xs text-gray-500">{order.time}</span>
                </div>

                <button
                  onClick={() => handleOrderClick(order)}
                  className="w-full bg-[#00C805] hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors text-sm shadow-sm"
                >
                  Order Details
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* KYC Documents */}
        <div className="mt-6">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-gray-900">KYC Document</h2>
            <div className="flex -space-x-2">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop" 
                alt="User KYC 1"
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
              />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-purple-500 flex items-center justify-center text-white text-xs font-medium">
                I
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Aadhaar Card */}
            <div className="bg-gray-200 rounded-lg p-8 flex items-center justify-center min-h-[280px]">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 bg-red-500 rounded-full mb-1"></div>
                    <div className="w-12 h-1 bg-orange-500 mb-0.5"></div>
                    <div className="w-12 h-1 bg-white border border-gray-300 mb-0.5"></div>
                    <div className="w-12 h-1 bg-green-600"></div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-gray-700 mb-2">AADHAAR</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 h-28 bg-orange-100 rounded flex items-center justify-center">
                    <div className="w-16 h-20 bg-orange-200 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-1 text-xs">
                      <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                      <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-red-500">
                  <p className="text-center text-sm font-bold text-gray-900">AADHAAR CARD1</p>
                </div>
              </div>
            </div>

            {/* Passport */}
            <div className="bg-gray-300 rounded-lg p-8 flex items-center justify-center min-h-[280px]">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow-lg p-6 w-full max-w-md border-4 border-orange-400">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                    <div className="text-white text-xs font-bold">🦁</div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="text-[10px] font-bold text-gray-800">SPECIMEN - PASSPORT</div>
                    <div className="text-[9px] text-gray-700">REPUBLIC OF BHARATAIR</div>
                  </div>
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                    <div className="text-white text-xs font-bold">⚖️</div>
                  </div>
                </div>
                <div className="flex gap-4 mb-3">
                  <div className="w-24 h-28 bg-blue-100 rounded border-2 border-gray-400 flex items-center justify-center">
                    <div className="w-20 h-24 bg-blue-200 rounded-full"></div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="text-[9px] text-gray-700">Surname / Nom</div>
                    <div className="h-2 bg-white rounded"></div>
                    <div className="text-[9px] text-gray-700 mt-2">Given Name(s) / Prénom(s)</div>
                    <div className="h-2 bg-white rounded"></div>
                    <div className="text-[9px] text-gray-700 mt-2">Nationality / Nationalité</div>
                    <div className="h-2 bg-white rounded"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2 text-[9px]">
                  <div>
                    <div className="text-gray-700">Date of birth</div>
                    <div className="h-2 bg-white rounded mt-0.5"></div>
                  </div>
                  <div>
                    <div className="text-gray-700">Place of birth</div>
                    <div className="h-2 bg-white rounded mt-0.5"></div>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div className="space-y-0.5 text-[9px]">
                    <div className="h-2 bg-white rounded w-24"></div>
                    <div className="h-2 bg-white rounded w-20"></div>
                  </div>
                  <div className="w-16 h-16 bg-white rounded flex items-center justify-center border border-gray-400">
                    <div className="text-[8px] text-center">QR</div>
                  </div>
                </div>
                <div className="mt-2 border-t border-gray-400 pt-1">
                  <div className="text-center text-[8px] tracking-widest text-gray-800">
                    ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆1◆◆◆◆◆◆◆◆◆44◆
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetailsPage;
