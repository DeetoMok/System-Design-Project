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
      {/* <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>       */}
    </div>
  );
}
