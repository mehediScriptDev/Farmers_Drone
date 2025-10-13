import axios from "axios";
import React, { useState, useRef, useEffect } from "react";


const Campaigns = () => {
  const [seasonalCampaigns, setSeasonalCampaigns] = useState([]);
  const [loyaltyCampaigns, setLoyaltyCampaigns] = useState([]);
  const [seasonalPage, setSeasonalPage] = useState(1);
  const [loyaltyPage, setLoyaltyPage] = useState(1);
  // campaigns create btns modal
  const [seasonalModalOpen, setSeasonalModalOpen] = useState(false);
  const [loyaltyCampagnMopen, setLoyaltyCampagnMopen] = useState(false);

  console.log(
    "season modal",
    seasonalModalOpen,
    "loyaltimodal",
    loyaltyCampagnMopen
  );

  useEffect(() => {
    axios
      .get("/Campaigns.json")
      .then((res) => {
        setSeasonalCampaigns(res.data.seasonalCampaigns);
        setLoyaltyCampaigns(res.data.loyaltyCampaigns);
      })
      .catch((err) => console.log(err));
  }, []);

  const itemsPerPage = 5;

  const paginateData = (data, currentPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const totalSeasonalPages = Math.ceil(seasonalCampaigns.length / itemsPerPage);
  const totalLoyaltyPages = Math.ceil(loyaltyCampaigns.length / itemsPerPage);

  const paginatedSeasonalCampaigns = paginateData(
    seasonalCampaigns,
    seasonalPage
  );
  const paginatedLoyaltyCampaigns = paginateData(loyaltyCampaigns, loyaltyPage);


  // Ref for the second table
  const loyaltyTableRef = useRef(null);

  // Handler for loyalty table pagination
  const handleLoyaltyPageChange = (newPage) => {
    setLoyaltyPage(newPage);
    setTimeout(() => {
      loyaltyTableRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  const CampaignTable = ({
    title,
    campaigns,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
    createClick,
  }) => (
    <div className="bg-white w-11/12 lg:w-[96%] mx-auto rounded-lg shadow mb-8 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-xl lg:text-3xl  font-bold text-center lg:text-left text-gray-900">
          {title}
        </h2>
        <button
          onClick={createClick}
          className="bg-green-500 mt-2 hover:bg-green-600 text-gray-900 px-4 py-2 rounded text-sm font-medium flex items-center"
        >
          <span className="mr-1">+</span> Create Campaign
        </button>
      </div>

      <div className="overflow-x-auto h-[500px]">
        <table className="w-full lg:table-auto">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr className="border border-gray-200">
              <th className="px-4 py-3 w-1/4 text-left text-sm font-medium text-gray-600">
                Campaign Name
              </th>
              <th className="px-4 py-3 w-1/4 text-left text-sm font-medium text-gray-600">
                Campaign Type
              </th>
              <th className="px-4 py-3 w-1/6 text-left text-sm font-medium text-gray-600">
                Leads
              </th>
              <th className="px-4 py-3 w-1/6 text-left text-sm font-medium text-gray-600">
                ROI
              </th>
              <th className="px-4 py-3 w-1/6 text-right text-sm font-medium text-gray-600">
                ACTIONS
              </th>
            </tr>
          </thead>

          <tbody className="">
            {campaigns?.map((campaign) => (
              <tr key={campaign.id} className="border border-gray-200">
                <td className="px-4 py-6 text-[16px] font-semibold text-gray-900">
                  {campaign.name}
                </td>
                <td className="px-4 py-6 text-[16px] text-black">
                  {campaign.type}
                </td>
                <td className="px-4 py-6 text-[16px] text-black">
                  {campaign.leads}
                </td>
                <td className="px-4 py-6 text-[16px] text-black">
                  {campaign.roi}
                </td>
                <td className="px-4 py-6 text-sm text-right">
                  <button className="bg-green-500 w-[120px] hover:bg-green-600 text-gray-900 font-semibold px-4 py-2 rounded-lg text-sm">
                    See details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center flex-col sm:flex-row space-y-1.5 justify-between">
        <div className="lg:text-sm text-xs text-sky-500">
          Page {currentPage} of {totalPages} (Total: {totalItems} results)
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded-lg text-sm ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                : "bg-transparent text-sky-500 border-sky-500"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded-lg text-sm ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                : "bg-transparent text-sky-500 border-sky-500"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafffd] w-full">
      <div className="w-full  py-6">
        {/* Seasonal Campaign Table */}
        <CampaignTable
          title="Seasonal Campaign Overview"
          campaigns={paginatedSeasonalCampaigns}
          currentPage={seasonalPage}
          setCurrentPage={setSeasonalPage}
          totalPages={totalSeasonalPages}
          totalItems={seasonalCampaigns.length}
          createClick={() => setSeasonalModalOpen(true)}
        />

        {/* Loyalty Campaign Table */}
        <div ref={loyaltyTableRef}>
          <CampaignTable
            title="Loyalty Campaign Overview"
            campaigns={paginatedLoyaltyCampaigns}
            currentPage={loyaltyPage}
            setCurrentPage={handleLoyaltyPageChange}
            totalPages={totalLoyaltyPages}
            totalItems={loyaltyCampaigns.length}
            createClick={() => setLoyaltyCampagnMopen(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
