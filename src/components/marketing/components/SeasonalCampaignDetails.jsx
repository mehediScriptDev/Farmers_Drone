import React, { useMemo } from "react";
import { ArrowLeft, Eye, MousePointer, Users, TrendingUp } from "lucide-react";
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import MapAudience from "./MapAudience";

const ChannelCard = ({
  leads,
  budget,
  engagement,
  progress,
  budgetPercent,
  logo,
}) => (
  <div className="bg-white rounded-lg shadow-md p-3 md:p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center gap-2 mb-2 md:mb-4">{logo}</div>
    <div className="space-y-1 md:space-y-2">
      <p className="text-[#5B5B5B] text-base font-medium">{leads} leads</p>
      <p className="text-[#5B5B5B] text-base font-medium">
        {budget} total budget
      </p>
      <p className="text-[#FFC107] text-sm font-medium">
        {engagement} total engagement
      </p>

      {/* Progress Bar */}
      <div className="pt-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div
            className="bg-[#9FF625] h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-[#0E3A18] text-xs">
          {budgetPercent} of total budget
        </p>
      </div>
    </div>
  </div>
);

const SeasonalCampaignDetails = () => {
  // const [timeRange, setTimeRange] = useState("Last 30 days overview");

  const data = useLoaderData();
  const { id } = useParams();
  const navigate = useNavigate();
  const channels = [
    {
      platform: "facebook",
      leads: "156 leads",
      budget: "$3,200 total budget",
      engagement: "+12.5% total engagement",
      progress: 65,
      budgetPercent: "21.3% of total budget",
      logo: (
        <span className="text-xl md:text-2xl font-bold text-[#1877F2]">
          facebook
        </span>
      ),
    },
    {
      platform: "Instagram",
      leads: "156 leads",
      budget: "$3,200 total budget",
      engagement: "+2.5% total engagement",
      progress: 65,
      budgetPercent: "21.3% of total budget",
      logo: (
        <span className="text-xl md:text-2xl font-serif italic">Instagram</span>
      ),
    },
    {
      platform: "Google",
      leads: "156 leads",
      budget: "$3,200 total budget",
      engagement: "+2.5% total engagement",
      progress: 65,
      budgetPercent: "21.3% of total budget",
      logo: (
        <svg
          className="h-6"
          viewBox="0 0 120 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="0"
            y="28"
            fontFamily="Product Sans, Arial, sans-serif"
            fontSize="36"
            fontWeight="600"
          >
            <tspan fill="#4285F4">G</tspan>
            <tspan fill="#EA4335">o</tspan>
            <tspan fill="#FBBC04">o</tspan>
            <tspan fill="#4285F4">g</tspan>
            <tspan fill="#34A853">l</tspan>
            <tspan fill="#EA4335">e</tspan>
          </text>
        </svg>
      ),
    },
    {
      platform: "LinkedIn",
      leads: "156 leads",
      budget: "$3,200 total budget",
      engagement: "+12.5% total engagement",
      progress: 65,
      budgetPercent: "21.3% of total budget",
      logo: (
        <span className="text-xl md:text-2xl font-bold text-blue-700">
          Linked<span className="bg-blue-700 text-white px-1">in</span>
        </span>
      ),
    },
  ];

  // Derive from loader data instead of setting state during render
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const seasonalCampaigns = data?.data?.allSeasonalCampaigns ?? [];
  const campaignId = Number(id);

  // Memoize the selected campaign to avoid recomputation
  const currentCampaign = useMemo(
    () => seasonalCampaigns.find((c) => c.id === campaignId),
    [seasonalCampaigns, campaignId]
  );
  console.log(currentCampaign);

  const stats = [
    { label: "Impressions", value: "245,000", icon: Eye, trend: "+12%" },
    { label: "Clicks", value: "12,300", icon: MousePointer, trend: "+8%" },
    { label: "Lead Genetation", value: "387", icon: Users, trend: "+15%" },
    { label: "Conversions Rate", value: "387", icon: Users, trend: "+15%" },
    {
      label: "RIO",
      value: "3.15%",
      icon: TrendingUp,
      trend: "+5%",
    },
  ];

  return (
    <div className="bg-[#F9FAFB] p-4 md:px-12">
      <div>
        {/* Header */}
        <div className="mb-2 md:mb-4 lg:mb-8">
          <div className="">
            <div className="flex items-center justify-between">
              <button
                className="flex items-center text-black hover:text-gray-900 cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span>Back</span>
              </button>
              <div className="flex gap-3">
                <button className="px-4 md:px-6 py-2 bg-[#28A844] text-white rounded-lg hover:bg-green-600 transition cursor-pointer">
                  Export
                </button>
                <button className="px-4 md:px-6 py-2 bg-red-500 text-black rounded-lg hover:bg-[#DC3545] transition cursor-pointer">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          {/* Campaign Overview */}
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-8 mb-8">
            <h1 className="text-xl md:text-2xl font-bold text-balck mb-3 md:mb-6">
              Campaign Overview
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 mb-4 md:mb-8">
              <div>
                <p className="text-sm text-black md:mb-1">Campaign Name</p>
                <p className="font-semibold text-black">
                  {currentCampaign?.title ??
                    "Luxury Real Estate Drone Photography Campaign"}
                </p>
              </div>
              <div>
                <p className="text-sm text-black md:mb-1">Objective</p>
                <p className="font-semibold text-black">Lead Generation</p>
              </div>
              <div>
                <p className="text-sm text-black md:mb-1">Duration</p>
                <p className="font-semibold text-black">1/6/2024 - 21/6/2024</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 md:mb-1">Campaign Type</p>
                <p className="font-semibold text-black">Multi-Channel</p>
              </div>
            </div>

            {/* Time Range Selector */}
            <div className="relative mb-4 md:mb-6 w-34">
              <select
                // value={selectedPeriod}
                // onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-2 md:px-4 py-1.5 md:py-2 bg-white border border-gray-300 rounded-lg text-xs md:text-base text-[#1A1A1A] appearance-none"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <FaChevronDown />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-6">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-3 ">
                    <p className="text-sm text-[#464646] font-medium">
                      {stat.label}
                    </p>
                  </div>
                  <div className="flex items-center  justify-between flex-row">
                    <p className="text-3xl font-bold text-[#464646]">
                      {stat.value}
                    </p>
                    <p className="bg-[#F7FFE5] p-3">
                      <stat.icon className="w-5 h-5 text-black " />
                    </p>
                  </div>
                  <div>
                    <span className="text-[#FFC107] text-sm font-semibold flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {stat.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campaign Story */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              Campaign Story
            </h2>

            {/* Drone Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="rounded-xl overflow-hidden shadow-md h-80">
                <img
                  src={currentCampaign.image}
                  alt="Drone over house"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-md h-80">
                <img
                  src="https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=600&h=400&fit=crop"
                  alt="White drone in flight"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Story Content */}
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-black">
                {currentCampaign.title}
              </h3>

              <p className="leading-relaxed text-black">
                {currentCampaign.description}
              </p>
            </div>
          </div>
        </div>

        {/* map start */}


        <MapAudience/>
        {/* map end */}
        {/* social */}
        <div className=" bg-white p-4 sm:p-6 lg:p-8 mt-3 md:mt-6 lg:mt-10 rounded-xl">
          <div className="mx-auto">
            <h1 className="text-xl md:text-2xl lg:text-3xl  font-bold text-gray-900 mb-6 sm:mb-8">
              Channel Performance
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {channels.map((channel, index) => (
                <ChannelCard key={index} {...channel} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonalCampaignDetails;
