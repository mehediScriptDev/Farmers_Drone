import HeatMap from "./components/HeatMap";
import TargetedAudience from "./components/TargetedAudience";

const MapAudience = () => {
    return (
        <div className="grid lg:grid-cols-2 gap-6 mt-4 md:mt-6 lg:mt-10">
        {/* Heatmap Card */}
        <HeatMap/>

        {/* Targeted Audience Card */}
        <TargetedAudience/>
      </div>
    );
};

export default MapAudience;