import HeatMap from "./components/HeatMap";
import TargetedAudience from "./components/TargetedAudience";

const MapAudience = () => {
    return (
        <div className="grid lg:grid-cols-2 gap-6 mt-5">
        {/* Heatmap Card */}
        <HeatMap/>

        {/* Targeted Audience Card */}
        <TargetedAudience/>
      </div>
    );
};

export default MapAudience;