import LoyalityCampaingnOverview from "./LoyalityCampaingnOverview";
import SeasonalCampaignOverview from "./SeasonalCampaignOverview";

const Campaigns = () => {
  return (
    <div className="bg-[#fafffd] p-4 lg:pt-5 md:px-12">
      <SeasonalCampaignOverview />
      <LoyalityCampaingnOverview />
    </div>
  );
};

export default Campaigns;
