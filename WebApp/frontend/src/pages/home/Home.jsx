import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import GoogleMapReact from "google-map-react";

export default function Home() {

  return (
    <div className="home">
      <FeaturedInfo />
      {/* <Chart data={userData} title="User Analytics" grid dataKey="Active User"/> */}

      <div className="reactMap">
        <GoogleMapReact 
          bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_KEY}}
          defaultCenter={{ lat: 1.290270, lng: 103.851959 }}
          defaultZoom={11.5}
          >

        </GoogleMapReact>
      </div>

    
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
