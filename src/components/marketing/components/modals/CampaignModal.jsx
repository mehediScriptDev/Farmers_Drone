import React, { useState } from "react";
import {
  FaBullhorn,
  FaRetweet,
  FaUserFriends,
  FaShare ,
  FaChevronDown 
} from "react-icons/fa";
import { IoClose } from "react-icons/io5"; // close icon

export default function CampaignModal({ onClose }) {
  const [selectedSegment, setSelectedSegment] = useState("");
  console.log(selectedSegment)

  const objectives = [
    {
      icon: <FaBullhorn className="w-5 h-5 text-black" />,
      title: "Brand Awareness",
      description: "Spread brand visibility and recognition",
    },
    {
      icon: <FaUserFriends   className="w-5 h-5 text-black" />,
      title: "Customer Acquisition",
      description: "Attract new customers and leads",
    },
    {
      icon: <FaRetweet className="w-5 h-5 text-black" />,
      title: "Retargeting",
      description: "Re-engage existing visitors and customers",
    },
    {
      icon: <FaShare  className="w-5 h-5 text-black" />,
      title: "Referral Program",
      description: "Increase existing customers for growth",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-black">
            Create New Campaign
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 pt-1 md:pt-2 lg:pt-3">
          <div className="relative">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FFC107] rounded-full"
                style={{ width: "25%" }}
              ></div>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs">
              <span className="text-[#002244]">Step 1 of 4</span>
              <span className="text-[#002244] text-lg lg:text-xl">25%</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-4">
            Create New Campaign
          </h3>

          {/* Objectives Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {objectives.map((obj, index) => (
              <button
                key={index}
                className="flex flex-col items-start p-3 border bg-[#E2E8F0] border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
              >
                <div className="mb-2">{obj.icon}</div>
                <h4 className="font-medium text-sm md:text-16 mb-1">
                  {obj.title}
                </h4>
                <p className="text-xs text-black">{obj.description}</p>
              </button>
            ))}
          </div>

          {/* Target Segment */}
          <div>
            <label className="block text-base md:text-lg lg:text-xl font-medium mb-2 text-black">
              Define Target Segment
            </label>
            <div className="relative">
              <select
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select target segment</option>
                <option value="Customers">Customers</option>
                <option value="Operator">Operator</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <FaChevronDown/>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-4  bg-gray-50 rounded-b-lg">
          <button className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
