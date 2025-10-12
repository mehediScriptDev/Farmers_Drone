
import {  TrendingUp, TrendingDown,  } from 'lucide-react';



const PaymentManagement = () => {


    const stats = [
        { label: "Today's Collections", value: '$2,847', change: '+25% vs last month', trend: 'up',  },
        { label: 'Pending Payments', value: '$438', change: '+15% vs last month', trend: 'up', },
        { label: 'Refund Processed', value: '$67', change: '-5% vs last month', trend: 'down', },

    ];

    const recentTransactions = [
        {
            serviceName: 'TXN-001',
            name: 'Eleanor Pena',
            serviceDate: '12/08/2025',
            payment: '$700',
            discount: '$125',
            outstanding: '$125',
            progress: 'Completed'
        },
        {
            serviceName: 'TXN-002',
            name: 'Esther Howard',
            serviceDate: '12/08/2025',
            payment: '$800',
            discount: '$200',
            outstanding: '$210',
            progress: 'Processed' 
        },
        {
            serviceName: 'TXN-003',
            name: 'Theresa Webb',
            serviceDate: '12/08/2025',
            payment: '$900',
            discount: '$300',
            outstanding: '$300',
            progress: 'Pending' 
        },
        {
            serviceName: 'TXN-004',
            name: 'Floyd Miles',
            serviceDate: '12/08/2025',
            payment: '$1000',
            discount: '$400',
            outstanding: '$400',
            progress: 'Completed' 
        },
    ];


    return (
        <div className="flex-1 p-4 md:p-8 ">
            <div className="mb-4 md:mb-6">
                <h1 className="text-lg md:text-2xl font-bold text-gray-900">
                    Payment Management
                </h1>
                <p className="text-xs md:text-base text-gray-600">
                    Handle payments, discounts, and billing issues
                </p>
            </div>
            <div className="flex  gap-2 md:gap-3 mb-2 md:mb-4">
                <button className="px-4 md:px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium text-sm md:text-base">
                    Register New Customer
                </button>
                <button className="px-4 md:px-6 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 font-medium text-sm md:text-base">
                    Assist in Profile Setup
                </button>
                <button className="px-4 md:px-6 py-2 bg-[#DC3545] text-white rounded-lg hover:bg-red-700 font-medium text-sm md:text-base">
                    Report Analysis
                </button>
            </div>
            {/* <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200"
                        >
                            <div className="flex items-start justify-between mb-3 md:mb-4">
                                <span className="text-gray-600 text-xs md:text-sm">{stat.label}</span>
                              
                            </div>
                            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                {stat.value}
                            </div>
                            <div
                                className={`text-xs md:text-sm flex items-center gap-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                            >
                                {stat.trend === "up" ? (
                                    <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                                ) : (
                                    <TrendingDown className="w-3 h-3 md:w-4 md:h-4" />
                                )}
                                {stat.change}
                            </div>
                        </div>
                    );
                })}
            </div> */}

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
  {stats.map((stat, index) => {
    const Icon = stat.icon;
    return (
      <div
        key={index}
        className={`bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200
          ${index === 2 ? "col-span-2 lg:col-span-1" : ""}`}
      >
        <div className="flex items-start justify-between mb-3 md:mb-4">
          <span className="text-gray-600 text-xs md:text-sm">{stat.label}</span>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {stat.value}
        </div>
        <div
          className={`text-xs md:text-sm flex items-center gap-1 ${
            stat.trend === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          {stat.trend === "up" ? (
            <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
          ) : (
            <TrendingDown className="w-3 h-3 md:w-4 md:h-4" />
          )}
          {stat.change}
        </div>
      </div>
    );
  })}
</div>


            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-4 md:p-6 border-b border-gray-200">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <h2 className="text-lg md:text-xl font-bold text-gray-900">Recent Transaction</h2>

                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-max">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">Service/ name</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">Service Date</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">Payment</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">Discount</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">Outstanding</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">Progress</th>

                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {recentTransactions.map((recentTransaction, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-3 md:px-6 py-4">
                                        <div className="flex items-center gap-2 md:gap-3">

                                            <div className="min-w-0">
                                                <div className="font-medium text-gray-900 text-sm md:text-base whitespace-nowrap">{recentTransaction.serviceName}</div>
                                                <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">{recentTransaction.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 md:px-6 py-4">
                                        <div className="text-xs md:text-sm text-gray-900 whitespace-nowrap">{recentTransaction.serviceDate}</div>

                                    </td>
                                    <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">{recentTransaction.payment}</td>
                                    <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">{recentTransaction.discount}</td>
                                    <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">{recentTransaction.outstanding}</td>


                                    <td className="px-3 md:px-6 py-4">
                                        <span className={`inline-flex px-2 md:px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap ${recentTransaction.progress === 'Completed'
                                                ? 'bg-green-100 text-green-700'

                                                : recentTransaction.progress === 'Processed'
                                                    ? 'bg-blue-100 text-blue-700'

                                                    : recentTransaction.progress === 'Pending'
                                                        ? 'bg-yellow-100 text-yellow-700'

                                                        : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {recentTransaction.progress}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-4 md:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs md:text-sm text-gray-600">Showing 1 to 4 of 4 results</div>
                    <div className="flex gap-2">
                        <button className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-xs md:text-sm text-gray-700 hover:bg-gray-50">
                            Previous
                        </button>
                        <button className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-xs md:text-sm text-gray-700 hover:bg-gray-50">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentManagement
