import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import Regions from "./Regions";
import PlanningAreas from "./PlanningAreas";
import Subzones from "./Subzones";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <Regions />
      </div>
      <div className="featuredItem">
        <PlanningAreas />
      </div>
      <div className="featuredItem">
        <Subzones />
      </div>
    </div>
  );
}
