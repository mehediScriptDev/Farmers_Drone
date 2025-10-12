import React, { useState } from "react";
import {
  TrendingUp,
  Sparkles,
  DollarSign,
  ArrowUpRight,
  Calendar,
} from "lucide-react";
import { CiClock1 } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { LuMousePointerClick } from "react-icons/lu";

export default function Dashboards() {
  const [selectedPeriod, setSelectedPeriod] = useState("Last 30 days");
  //   const [currentPage, setCurrentPage] = useState(1);

  const metrics = [
    {
      label: "Click through rate",
      value: "3.2%",
      change: "+0.4%",
      icon: LuMousePointerClick,
      positive: true,
    },
    {
      label: "Conversion Rate",
      value: "2.8%",
      change: "-0.6%",
      icon: TrendingUp,
      positive: false,
    },
    {
      label: "Customer Acquisition Cost",
      value: "$42",
      change: "$8",
      icon: DollarSign,
      positive: true,
    },
    {
      label: "ROI",
      value: "285%",
      change: "-1.2%",
      icon: TrendingUp,
      positive: false,
    },
  ];

  const leads = [
    {
      id: 1,
      company: "Agritech Solutions",
      email: "John@agritech.com",
      phone: "(225) 555-0118",
      source: "Email campaign",
      location: "Gujrat, India",
      score: 95,
      status: "Hot",
    },
    {
      id: 2,
      company: "Agritech Solutions",
      email: "John@agritech.com",
      phone: "(225) 555-0118",
      source: "Email campaign",
      location: "Gujrat, India",
      score: 75,
      status: "Warm",
    },
    {
      id: 3,
      company: "Agritech Solutions",
      email: "John@agritech.com",
      phone: "(225) 555-0118",
      source: "Email campaign",
      location: "Gujrat, India",
      score: 65,
      status: "Cool",
    },
    {
      id: 4,
      company: "Agritech Solutions",
      email: "John@agritech.com",
      phone: "(225) 555-0118",
      source: "Email campaign",
      location: "Gujrat, India",
      score: 85,
      status: "Hot",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Hot":
        return "text-red-500 bg-red-50";
      case "Warm":
        return "text-yellow-500 bg-yellow-50";
      case "Cool":
        return "text-green-500 bg-green-50";
      default:
        return "text-gray-500 bg-gray-50";
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-red-600";
    if (score >= 70) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between space-y- md:flex-row flex-col items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Marketing Dashboard
            </h1>
            <p className="text-gray-600">Monitor campaigns and drive growth</p>
          </div>
          <button className=" bg-green-500 flex justify-center items-center gap-1 hover:bg-green-600 text-white px-6  py-3 rounded-lg font-medium transition-colors">
            <FaPlus /> Create Campaign
          </button>
        </div>

        {/* Time Period Selector */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Last 30 days overview
          </h3>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{selectedPeriod}</span>
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-center">
                  <div >
                    <div className="flex items-start justify-between mb-3">
                      <p className="text-sm text-gray-600">{metric.label}</p>
                    </div>
                    <div className="flex items-start space-y-2 flex-col justify-between">
                      <p className="text-3xl font-bold text-gray-900">
                        {metric.value}
                      </p>
                      <span
                        className={`text-sm font-medium ${
                          metric.positive ? "text-yellow-600" : "text-gray-500"
                        }`}
                      >
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`p-2 rounded-lg ${
                      metric.positive ? "bg-green-50" : "bg-gray-50"
                    }`}
                  >
                    <Icon className="xl:w-10 xl:h-10 w-6 h-6 text-gray-600" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lead Management Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row items-center justify-between mb-2">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  Lead Management
                </h2>
                <p className="text-sm text-gray-600">
                  Track and nurture your marketing leads
                </p>
              </div>
              <div className="flex flex-wrap py-3 lg:flex-row gap-3">
                <select className=" lg:px-4 lg:py-2 border border-gray-300 rounded-lg text-sm bg-white">
                  <option>All lead</option>
                  <option>Hot</option>
                  <option>Warm</option>
                  <option>Cool</option>
                </select>
                <button className="lg:btn-md btn-xs btn bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Export Leads
                </button>
                <button className="btn lg:btn-md btn-xs bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-medium transition-colors">
                  Automation
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-100">
                <tr className="text-left">
                  <th className="px-6 py-4 text-sm font-medium text-gray-700">
                    Lead
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-700">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-700">
                    Source
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-700">
                    Location
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-700">
                    Score
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {lead.company}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="text-gray-900">{lead.email}</div>
                        <div className="text-gray-500">{lead.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">
                        {lead.source}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">
                        {lead.location}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-sm font-semibold ${getScoreColor(
                          lead.score
                        )}`}
                      >
                        {lead.score}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          lead.status
                        )}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center hover:bg-green-200 transition-colors">
                        <CiClock1 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100">
            <p className="text-sm text-gray-600">Showing 1 to 4 of 4 results</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
          
     
    </div>
  );
}
