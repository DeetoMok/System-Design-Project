import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./kmeansModel.css"
import { PredictorSelect, ResponseSelect, ModelSelect } from "./selectdropdown";
import KmeansMap from "./KmeansMap";
import MetricTable from "./MetricTable";
//import CSRFToken from "./csrf";
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import {
  Typography,
  Select,
  Button,
  Card,
  CardActions,
  CardContent,
  InputLabel,
  MenuItem,
  Chip,
} from "@material-ui/core";
// import { PredictorSelect, ResponseSelect, ModelSelect } from "./selectdropdown";


export default function KmeansModel() {
//   const classes = useStyles();
//   const bull = <span className={classes.bullet}>•</span>;
    const [data, setData] = React.useState({
        columns: ['a', 'b'],
    });
    const [config, setConfig] = React.useState({
        predictor: [],
        response: "",
        model: "KNN",
        params: {
        knn: { neighbour: 0, "random state": 0 },
        "random forest": {
            "number of trees": 0,
            height: 0,
            depth: 0,
            max_depth: 0,
        },
        },
        columns: data.columns,
        predictorsOptions: data.columns,
        responseOptions: data.columns,
        clientData: data.csvData,
    });

  return (
    <div className="main">
        <Card className="map" variant="outlined">
            <KmeansMap />
        </Card>
        <div className="body">
            <Card className="root" variant="outlined">
                <CardContent >
                    <Typography
                        className="title"
                        color="textSecondary"
                        gutterBottom
                    >
                        Tune Machine Learning Model
                    </Typography>
                    <PredictorSelect config={config} setConfig={setConfig} />
                    <ResponseSelect config={config} setConfig={setConfig} />
                    <ModelSelect config={config} setConfig={setConfig} />
                </CardContent>

                <div className="buttonBody">
                    <Button variant="contained" color="primary">
                        Train Model
                    </Button>
                </div>
            </Card>

            {/* <MetricTable hasTrain={hasTrain} /> */}
            <MetricTable hasTrain={true} />
        </div>
    </div>
  );
}

