import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DataManagement from "./pages/dataManagement/DataManagement";
import KmeansModel from "./pages/models/KmeansModel";
import HeatMap from "./pages/models/HeatMap";
import OhcaHeatMap from "./pages/models/OhcaHeatMap";

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/dataManagement">
            <DataManagement />
          </Route>
          <Route path="/kmeans">
            <KmeansModel />
          </Route>
          <Route path="/heatmap">
            <HeatMap />
          </Route>
          <Route path="/ohcaheatmap">
            <OhcaHeatMap />
          </Route>          
          <Route path="/pcm">
            <KmeansModel />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
