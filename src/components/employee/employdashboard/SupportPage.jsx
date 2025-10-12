import React from 'react'
import { TrendingUp, TrendingDown, Plus, Calendar, X ,Eye} from 'lucide-react';

const SupportPage = () => {

    const stats = [
        {
            label: 'Open Tickets',
            value: '23',
            change: '+2% vs last month',
            subtext: null,
            trend: 'up', // Assuming '+' sign means 'up' trend
        },
        {
            label: 'In Progress',
            value: '15',
            change: null, // No percentage change shown in the image
            subtext: 'Average response 2h', // Corresponds to the text below the value
            trend: null,
        },
        {
            label: 'Resolved Today',
            value: '34',
            change: '+18% from last month',
            subtext: null,
            trend: 'up', // Assuming '+' sign means 'up' trend
        },
        {
            label: 'Escalated',
            value: '5',
            change: null, // No percentage change shown in the image
            subtext: 'Awaiting tech team', // Corresponds to the text below the value
            trend: null,
        },
    ];

    const supportData = [
        {
            serviceName: "TXN-001",
            name: "Eleanor Pena",
            issues: "Payment delayed due to discount adjustment",
            progress: "Completed",
            priority: "Low"
        },
        {
            serviceName: "TXN-002",
            name: "Esther Howard",
            issues: "Outstanding balance requires confirmation",
            progress: "Processed",
            priority: "Medium"
        },
        {
            serviceName: "TXN-003",
            name: "Theresa Webb",
            issues: "Awaiting approval from finance department",
            progress: "Pending",
            priority: "Medium"
        },
        {
            serviceName: "TXN-004",
            name: "Floyd Miles",
            issues: "High outstanding balance flagged for review",
            progress: "Completed",
            priority: "High"
        }
    ]



    return (
        <div className="flex-1 p-4 md:p-8 ">
            <div className="mb-4 md:mb-6">
                <h1 className="text-lg md:text-2xl font-bold text-gray-900">
                    Support Management
                </h1>
                <p className="text-xs md:text-base text-gray-600">
                    Create and manage support tickets and escalations
                </p>
            </div>
            <div className="flex  gap-2 md:gap-3 mb-2 md:mb-4">
                <button className="px-4 md:px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium text-sm md:text-base">
                    <Plus className="inline-block w-6 h-8 mr-1 -ml-1 " />
                    Create SUPPORT TICKET
                </button>
                <button className="px-4 md:px-6 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 font-medium text-sm md:text-base">
                    <Calendar className="inline-block w-6 h-8 mr-1 -ml-1" />
                    Manage Ticket
                </button>

                <button className="px-4 md:px-6 py-2 bg-[#DC3545] text-white rounded-lg hover:bg-red-700 font-medium text-sm md:text-base">
                    <X className="inline-block w-6 h-8 mr-1 -ml-1" />
                    Escalate to technical team
                </button>
            </div>


            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                {stats.map((stat, index) => {
                    // Determine the text content for the bottom line (either change or subtext)
                    const bottomContent = stat.change || stat.subtext;

                    return (
                        <div
                            key={index}
                            // Applied a faint blue border-b for "Open Tickets" to match the image's highlighted look
                            className={`bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 ${stat.label === 'Open Tickets' ? 'border-b-4 border-blue-500' : ''}`}
                        >
                            <div className="flex items-start justify-between mb-3 md:mb-4">
                                <span className="text-gray-600 text-xs md:text-sm">{stat.label}</span>
                            </div>

                            {/* Main Value */}
                            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                {stat.value}
                            </div>

                            {/* Bottom Line Content (Change or Subtext) */}
                            {bottomContent && (
                                <div
                                    // Conditional styling for the 'change' or 'subtext' line
                                    className={`text-xs md:text-sm flex items-center gap-1 ${stat.change // If it's a 'change' (percentage)
                                        ? stat.trend === "up" ? "text-green-600" : "text-red-600" // Apply color based on trend
                                        : "text-gray-500" // If it's a simple 'subtext', use a neutral gray
                                        }`}
                                >
                                    {/* Only show the trend icon if there's a 'change' AND a 'trend' status */}
                                    {stat.change && stat.trend && stat.trend === "up" && (
                                        // You need to ensure 'TrendingUp' and 'TrendingDown' are imported components
                                        <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                                    )}
                                    {stat.change && stat.trend && stat.trend !== "up" && (
                                        <TrendingDown className="w-3 h-3 md:w-4 md:h-4" />
                                    )}

                                    {/* Display the content */}
                                    {bottomContent}
                                </div>
                            )}

                            {/* Optional: Add a placeholder div if bottomContent is missing, to keep card height consistent (not strictly needed for the image, but good practice) */}
                            {!bottomContent && <div className="text-xs md:text-sm h-4 md:h-5"></div>}
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
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">Issues</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">Progress</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">Priority</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {supportData.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    {/* Service / Name */}
                                    <td className="px-3 md:px-6 py-4">
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <div className="min-w-0">
                                                <div className="font-medium text-gray-900 text-sm md:text-base whitespace-nowrap">
                                                    {item.serviceName}
                                                </div>
                                                <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">
                                                    {item.name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Issues */}
                                    <td className="px-3 md:px-6 py-4 text-xs md:text-[16px] text-gray-900 whitespace-nowrap">
                                        {item.issues}
                                    </td>

                                    {/* Progress */}
                                    <td className="px-3 md:px-6 py-4">
                                        <span
                                            className={`inline-flex px-2 md:px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap ${item.progress === "Completed"
                                                ? "bg-[#EAF6EC] text-[#24963E]"
                                                : item.progress === "Processed"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : item.progress === "Pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-gray-100 text-gray-700"
                                                }`}
                                        >
                                            {item.progress}
                                        </span>
                                    </td>

                                    {/* Priority */}
                                    <td className="px-3 md:px-6 py-4 text-xs md:text-sm whitespace-nowrap">
                                        {item.priority === "High" ? (
                                            <span className="text-red-600 font-medium">High</span>
                                        ) : item.priority === "Medium" ? (
                                            <span className="text-orange-500 font-medium">Medium</span>
                                        ) : (
                                            <span className="text-green-600 font-medium">Low</span>
                                        )}
                                    </td>

                                    {/* Action */}
                                    <td className="px-3 md:px-6 py-4 text-xs md:text-sm whitespace-nowrap">
                                        <button className="text-blue-600 hover:underline"><Eye/></button>
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

export default SupportPage
