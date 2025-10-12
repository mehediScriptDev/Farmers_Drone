import { TrendingUp, ShoppingCart, Clock, CreditCard } from 'lucide-react';

const ReportAnalysisPage = () => {

    const customerDetails = [

        {

            name: 'Albert Flores',

            company: 'Agritech Solutions',

            contact: 'John@agritech.com',

            phone: '(225) 555-0118',

            date: '12/082025-16/08/2025',

            duration: '1h 30min',

            revenue: '$700'

        },

        {

            name: 'Jenny Wilson',

            company: 'Agritech Solutions',

            contact: 'John@agritech.com',

            phone: '(225) 555-0118',

            date: '12/082025-16/08/2025',

            duration: '1h 30min',

            revenue: '$900'

        },

        {

            name: 'Kristin Watson',

            company: 'Agritech Solutions',

            contact: 'John@agritech.com',

            phone: '(225) 555-0118',

            date: '12/082025-16/08/2025',

            duration: '1h 30min',

            revenue: '$400'

        },

        {

            name: 'Brooklyn Simmons',

            company: 'Agritech Solutions',

            contact: 'John@agritech.com',

            phone: '(225) 555-0118',

            date: '12/082025-16/08/2025',

            duration: '1h 30min',

            revenue: '$300'

        }

    ];

    const stats = [

        {

            label: 'Total Order',

            value: '2,847',

            change: '+13% vs last month',

            positive: true,

            icon: TrendingUp,

            bgColor: 'bg-green-50'

        },

        {

            label: 'Total Revenue',

            value: '438',

            change: '+8% vs last month',

            positive: true,

            icon: ShoppingCart,

            bgColor: 'bg-blue-50'

        },

        {

            label: 'Avg Duration',

            value: '67',

            change: '-5% vs last month',

            positive: false,

            icon: Clock,

            bgColor: 'bg-orange-50'

        },

        {

            label: 'Pending Payments',

            value: '23',

            change: '+12% vs last month',

            positive: true,

            icon: CreditCard,

            bgColor: 'bg-purple-50'

        }

    ];

    return (
        <div className="flex-1 p-4 md:p-8 bg-gray-50">
            <div className="mb-6 md:mb-8">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Customer Management</h1>
                <p className="text-sm md:text-base text-gray-600">Manage customer registration and profile setup</p>
            </div>

           
                <div className="p-4 md:p-6 bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6">Filters & Analytics</h2>
                    <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-2">Last 30 days overview</p>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                            <option>Last 30 days</option>
                            <option>Last 7 days</option>
                            <option>Last 90 days</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Customer Type</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm">
                                <option>Aerial Media Services</option>
                                <option>Agriculture Services</option>
                                <option>Inspection Services</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Service Category</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm">
                                <option>Aerial Photography & Videography (VTD)</option>
                                <option>Mapping & Survey</option>
                                <option>Inspection</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                        {stats.map((stat, index) => {

                            const Icon = stat.icon;

                            return (
                                <div key={index} className="p-4 rounded-lg border border-gray-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-sm text-gray-600">{stat.label}</p>
                                        <div className={`w-8 h-8 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                                            <Icon className="w-4 h-4 text-gray-700" />
                                        </div>
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                                    <p className={`text-xs ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>

                                        {stat.change}
                                    </p>
                                </div>

                            );

                        })}
                    </div>
                </div>

                <div className="p-4 md:p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Customer Details</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-max">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">Service / name</th>
                                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">Contact</th>
                                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">Date</th>
                                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">Duration</th>
                                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">Revenue</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">

                                {customerDetails.map((customer, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-3 md:px-6 py-4">
                                            <div className="font-medium text-gray-900 text-sm md:text-base whitespace-nowrap">{customer.name}</div>
                                            <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">{customer.company}</div>
                                        </td>
                                        <td className="px-3 md:px-6 py-4">
                                            <div className="text-xs md:text-sm text-gray-900 whitespace-nowrap">{customer.contact}</div>
                                            <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">{customer.phone}</div>
                                        </td>
                                        <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">{customer.date}</td>
                                        <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">{customer.duration}</td>
                                        <td className="px-3 md:px-6 py-4 text-xs md:text-sm font-medium text-gray-900 whitespace-nowrap">{customer.revenue}</td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
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

    );

};

export default ReportAnalysisPage;
