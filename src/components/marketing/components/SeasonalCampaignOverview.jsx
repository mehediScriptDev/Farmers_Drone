import React, { useState, useEffect } from "react";
import axiosInstance from "../../../config/axiosConfig";
import { Link, useLocation } from "react-router-dom";
import CampaignModal from "./modals/CampaignModal";

export default function SeasonalCampaignOverview() {
  const location = useLocation();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [campaignModal, setCampaignModal] = useState(false);

  const resultsPerPage = 6;
  const url =
    location.pathname === "/marketing/campaigns"
      ? "/marketing/campaigns/seasonal"
      : "/marketing/campaigns/seasonal";

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      // API endpoint ba JSON file URL ekhane diben
      const response = await axiosInstance.get(
        "/MarketingDashboard/data/marketingLandingPage.json"
      );

      setCampaigns(response.data.allSeasonalCampaigns);
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Data fetch korte problem hoyeche"
      );
      console.error("Error fetching campaigns:", err);
    } finally {
      setLoading(false);
    }
  };
  console.log(campaigns);
  const totalResults = campaigns.length;
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);
  const paginatedCampaigns = campaigns.slice(startResult - 1, endResult);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
          <button
            onClick={fetchCampaigns}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-white">
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 py-2 md:py-4 lg:py-6 mx-2 md:mx-4 lg:mx-6">
          <h1 className="font-bold  text-[#000000] text-xl md:text-2xl lg:text-3xl w-1/2 ml-4">
            Seasonal Campaign Overview
          </h1>
          <button
            onClick={() => setCampaignModal(true)}
            className="bg-[#28A844] hover:bg-green-600 text-black px-2 md:px-4 py-2 rounded flex  items-center gap-1 md:gap-2"
          >
            <span className="text-xl ">+</span>
            <span className="text-base md:text-lg">Create Campaign</span>
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-b-lg shadow overflow-hidden">
          {campaigns.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No campaigns found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-sm md:text-base font-semibold text-black whitespace-nowrap">
                      Campaign Name
                    </th>
                    <th className="text-left px-6 py-3 text-sm md:text-base font-semibold text-black whitespace-nowrap">
                      Campaign Types
                    </th>
                    <th className="text-left px-6 py-3 text-sm md:text-base font-semibold text-black whitespace-nowrap">
                      Leads Generated
                    </th>
                    <th className="text-left px-6 py-3 text-sm md:text-base font-semibold text-black whitespace-nowrap">
                      ROI
                    </th>
                    <th className="px-6 py-3 text-sm md:text-base font-semibold text-black text-right whitespace-nowrap">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCampaigns.map((campaign, index) => (
                    <tr
                      key={campaign.id || index}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm md:text-base text-black">
                        {campaign.title || campaign.campaignName}
                      </td>
                      <td className="px-6 py-4 text-sm md:text-base text-black">
                        {campaign.type || campaign.campaignType}
                      </td>
                      <td className="px-6 py-4 text-sm md:text-base text-black">
                        {campaign.leads || campaign.leadsGenerated}
                      </td>
                      <td className="px-6 py-4 text-sm md:text-base text-black">
                        {campaign.roi}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`${url}/${campaign.id}`}
                          className="inline-block whitespace-nowrap bg-[#28A844] hover:bg-green-600 text-white font-semibold px-4 py-2 rounded text-sm min-w-[96px] text-center"
                        >
                          See details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Footer */}
              <div className="flex justify-between items-center px-6 py-4 bg-white border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {startResult} to {endResult} of {totalResults} results
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    Previous
                  </button>
                  <button
                    className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={endResult >= totalResults}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {campaignModal && (
        <CampaignModal onClose={() => setCampaignModal(false)} />
      )}
    </div>
  );
}
